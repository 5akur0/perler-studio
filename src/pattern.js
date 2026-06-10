import { state } from './state.js';
import { palette, beadIds, palettePresetMardCodes, workshopCodeForMard } from './palette.js';
import { patterns, resamplePatternRows } from './patterns-data.js';
import { clamp, beadOklab, nearestCodeFromSet } from './color-utils.js';
import { craftOptions } from './constants.js';

const transparentWhiteCode = workshopCodeForMard("H1");
const opaqueWhiteCode = workshopCodeForMard("H2");
const builtInTransparentWhitePatternIds = new Set(["ghost", "milk-tea", "sweet-heart"]);

export function targetAt(x, y) {
  const pattern = state.selectedPattern;
  const row = getEffectiveTargetRows(pattern)[y];
  if (!row) return null;
  const code = row[x] || ".";
  return code === "." ? null : code;
}

export function indexFor(x, y) {
  return y * state.selectedPattern.size + x;
}

export function sourceTargetAt(x, y, pattern = state.selectedPattern) {
  const code = pattern.rows[y]?.[x] || ".";
  return code === "." ? null : code;
}

export function isBuiltInPattern(pattern = state.selectedPattern) {
  return !baseIdFor(pattern).startsWith("custom-");
}

export function getPatternColorMap(pattern = state.selectedPattern) {
  const id = baseIdFor(pattern);
  return state.patternColorMaps[id] || {};
}

export function invalidateEffectiveMap(pattern = state.selectedPattern) {
  if (!pattern) return;
  const id = baseIdFor(pattern);
  delete state.patternEffectiveMapCache[id];
  delete state.patternAnalysisCache[id];
}

export function invalidatePatternDataCaches(pattern = state.selectedPattern) {
  if (!pattern) return;
  delete pattern.__gridFingerprint;
  delete pattern.__sourceAnalysis;
  invalidateEffectiveMap(pattern);
}

export function isCustomFromImagePattern(pattern = state.selectedPattern) {
  return baseIdFor(pattern).startsWith("custom-") && Boolean(pattern.sourceImageDataUrl);
}

export function findPatternByBaseId(id) {
  if (!id) return null;
  if (baseIdFor(state.selectedPattern) === id) return state.selectedPattern;
  return patterns.find((item) => baseIdFor(item) === id) || null;
}

export function getEffectivePatternMap(pattern = state.selectedPattern) {
  return getEffectivePatternResult(pattern).map;
}

export function getEffectiveTargetRows(pattern = state.selectedPattern) {
  return getEffectivePatternResult(pattern).rows;
}

export function getEffectivePatternResult(pattern = state.selectedPattern) {
  const id = baseIdFor(pattern);
  const fingerprint = patternFingerprint(pattern);
  const sourceColors = getSourcePatternColors(pattern);
  const map = getPatternColorMap(pattern);
  const mapSignature = sourceColors.map((code) => `${code}:${map[code] || code}`).join("|");
  const cacheKey = `${fingerprint}:${mapSignature}`;
  const cached = state.patternEffectiveMapCache[id];
  if (cached?.key === cacheKey) return cached;

  const baseMap = {};
  const activeCodes = new Set(allColorCodes());
  sourceColors.forEach((code) => {
    const mapped = map[code];
    baseMap[code] = mapped && activeCodes.has(mapped) ? mapped : code;
  });
  const size = pattern.size;
  const sourceRows = pattern.rows;
  const grid = Array(size * size).fill(".");
  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      const sourceCode = sourceRows[y][x];
      const index = y * size + x;
      grid[index] = sourceCode === "." ? "." : (baseMap[sourceCode] || sourceCode);
    }
  }
  const rows = [];
  for (let y = 0; y < size; y += 1) rows.push(grid.slice(y * size, y * size + size).map((code) => code || ".").join(""));

  const result = { key: cacheKey, map: { ...baseMap }, rows };
  state.patternEffectiveMapCache[id] = result;
  return result;
}

export function getTargetCounts(pattern = state.selectedPattern) {
  return getPatternAnalysis(pattern).counts;
}

export function getTargetTotal(pattern = state.selectedPattern) {
  return getPatternAnalysis(pattern).total;
}

export let colorCodesCache = null;
export function allColorCodes() {
  if (colorCodesCache) return colorCodesCache;
  const preset = palettePresetMardCodes[221];
  colorCodesCache = [...new Set(preset.map(workshopCodeForMard).filter((code) => palette[code]))]
    .sort((a, b) => (beadIds[a] || a).localeCompare(beadIds[b] || b, "zh-Hans-CN", { numeric: true }));
  return colorCodesCache;
}

export function beadLabel(code) {
  return beadIds[code] || code;
}

export function activePaletteColorCount() {
  return allColorCodes().length;
}

export function normalizePatternColorMapForActivePalette(pattern = state.selectedPattern) {
  const patternId = baseIdFor(pattern);
  const activeCodes = new Set(allColorCodes());
  const activeCodesArr = [...activeCodes];
  const previousMap = state.patternColorMaps[patternId] || {};
  const normalizedMap = {};
  const lockOpaqueWhite = !patternId.startsWith("custom-") && !builtInTransparentWhitePatternIds.has(patternId);
  getSourcePatternColors(pattern).forEach((code) => {
    const mapped = previousMap[code];
    if (lockOpaqueWhite && code === opaqueWhiteCode) {
      normalizedMap[code] = opaqueWhiteCode;
      return;
    }
    if (lockOpaqueWhite && code === transparentWhiteCode) {
      normalizedMap[code] = opaqueWhiteCode;
      return;
    }
    if (mapped && activeCodes.has(mapped)) {
      // user's manual remap is still valid
      normalizedMap[code] = mapped;
    } else if (activeCodes.has(code)) {
      // colour is directly in the active palette — use as-is
      normalizedMap[code] = code;
    } else {
      // colour not in active palette → auto-remap to perceptually nearest
      normalizedMap[code] = nearestCodeFromSet(beadOklab(code), activeCodesArr);
    }
  });
  state.patternColorMaps[patternId] = normalizedMap;
  if (baseIdFor(state.selectedPattern) === patternId) state.patternColorMap = normalizedMap;
  return normalizedMap;
}


export function getPatternColors(pattern = state.selectedPattern) {
  return getPatternAnalysis(pattern).colors.slice();
}

export function getPatternAnalysis(pattern = state.selectedPattern) {
  const id = baseIdFor(pattern);
  const effective = getEffectivePatternResult(pattern);
  const cache = state.patternAnalysisCache[id];
  if (cache?.key === effective.key) return cache;
  const counts = {};
  effective.rows.forEach((row) => {
    [...row].forEach((code) => {
      if (code === ".") return;
      counts[code] = (counts[code] || 0) + 1;
    });
  });
  const colors = Object.keys(counts)
    .sort((a, b) => (beadIds[a] || a).localeCompare(beadIds[b] || b, "zh-Hans-CN", { numeric: true }));
  const total = Object.values(counts).reduce((sum, count) => sum + count, 0);
  const next = { key: effective.key, counts, colors, total };
  state.patternAnalysisCache[id] = next;
  return next;
}

export function getSourceCounts(pattern = state.selectedPattern) {
  return getSourcePatternAnalysis(pattern).counts;
}

export function getSourcePatternColors(pattern = state.selectedPattern) {
  return getSourcePatternAnalysis(pattern).colors.slice();
}

export function getSourcePatternAnalysis(pattern = state.selectedPattern) {
  const fingerprint = patternFingerprint(pattern);
  if (pattern.__sourceAnalysis?.key === fingerprint) return pattern.__sourceAnalysis;
  const counts = {};
  pattern.rows.forEach((row) => {
    [...row].forEach((code) => {
      if (code !== ".") counts[code] = (counts[code] || 0) + 1;
    });
  });
  const colors = Object.keys(counts)
    .sort((a, b) => (beadIds[a] || a).localeCompare(beadIds[b] || b, "zh-Hans-CN", { numeric: true }));
  const total = Object.values(counts).reduce((sum, count) => sum + count, 0);
  pattern.__sourceAnalysis = { key: fingerprint, counts, colors, total };
  return pattern.__sourceAnalysis;
}

export let placedCountsCacheVersion = -1;
let placedCountsCache = {};
export function invalidatePlacedCounts() {
  state.placedVersion += 1;
}

export function getPlacedCounts() {
  if (placedCountsCacheVersion === state.placedVersion) return placedCountsCache;
  const counts = {};
  state.placed.forEach((code) => {
    if (!code) return;
    counts[code] = (counts[code] || 0) + 1;
  });
  placedCountsCache = counts;
  placedCountsCacheVersion = state.placedVersion;
  return placedCountsCache;
}

export function placedCount() {
  return Object.values(getPlacedCounts()).reduce((sum, count) => sum + count, 0);
}

export function normalizePatternSize(value) {
  const parsed = Number.parseInt(value, 10);
  if (!Number.isFinite(parsed)) return 48;
  return clamp(parsed, 12, 100);
}

export function baseIdFor(pattern) {
  return pattern.sourceId || pattern.id;
}

export function patternFingerprint(pattern) {
  if (pattern.__gridFingerprint) return pattern.__gridFingerprint;
  const rows = pattern.rows || [];
  let hash = 2166136261 >>> 0;
  for (let y = 0; y < rows.length; y += 1) {
    const row = rows[y] || "";
    for (let i = 0; i < row.length; i += 1) {
      hash ^= row.charCodeAt(i);
      hash = Math.imul(hash, 16777619);
    }
    hash ^= 124;
    hash = Math.imul(hash, 16777619);
  }
  pattern.__gridFingerprint = `${pattern.size}:${rows.length}:${(hash >>> 0).toString(36)}`;
  return pattern.__gridFingerprint;
}

export function normalizeCraft(craft) {
  if (craft === "冰箱贴") return "原版";
  return craftOptions.includes(craft) ? craft : "钥匙扣";
}

export function resizePattern(pattern, targetSize) {
  const size = normalizePatternSize(targetSize);
  const sourceRows = pattern.sourceRows || pattern.rows;
  const sourceSize = pattern.sourceSize || pattern.size;
  if (sourceSize === size) {
    return {
      ...pattern,
      id: pattern.id,
      sourceId: baseIdFor(pattern),
      sourceSize,
      sourceRows,
    };
  }
  const rows = resamplePatternRows(sourceRows, sourceSize, size);
  const resized = {
    ...pattern,
    id: `${baseIdFor(pattern)}-${size}`,
    sourceId: baseIdFor(pattern),
    sourceSize,
    sourceRows,
    size,
    rows,
    note: pattern.note || "",
  };
  delete resized.__gridFingerprint;
  delete resized.__sourceAnalysis;
  return resized;
}

export function findBasePattern(pattern = state.selectedPattern) {
  const id = baseIdFor(pattern);
  return patterns.find((item) => item.id === id) || pattern;
}

export function findCustomPattern() {
  return patterns.find((item) => item.id.startsWith("custom-")) || null;
}
