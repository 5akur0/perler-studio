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

export function getPatternHiddenSourceList(pattern = state.selectedPattern) {
  const id = baseIdFor(pattern);
  if (state.patternHiddenSources[id]?.length) {
    state.patternHiddenSources[id] = [];
    delete state.customHiddenRecalcCache[id];
    delete state.customHiddenRecalcPending[id];
    delete state.customHiddenRecalcQueued[id];
    invalidateEffectiveMap(pattern);
  }
  return [];
}

export function getPatternHiddenSourceSet(pattern = state.selectedPattern) {
  return new Set(getPatternHiddenSourceList(pattern));
}

export function hiddenSignature(list) {
  return list.slice().sort((a, b) => (beadIds[a] || a).localeCompare(beadIds[b] || b, "zh-Hans-CN", { numeric: true })).join("|");
}

export function customRecalcSignature(pattern = state.selectedPattern, hiddenList = null) {
  const hidden = hiddenList || getPatternHiddenSourceList(pattern);
  return `${pattern.size}:${hiddenSignature(hidden)}:${pattern.sourceRemoveWhite !== false ? 1 : 0}`;
}

export function isCustomFromImagePattern(pattern = state.selectedPattern) {
  return baseIdFor(pattern).startsWith("custom-") && Boolean(pattern.sourceImageDataUrl);
}

export function findPatternByBaseId(id) {
  if (!id) return null;
  if (baseIdFor(state.selectedPattern) === id) return state.selectedPattern;
  return patterns.find((item) => baseIdFor(item) === id) || null;
}

export function getCustomRecalcRowsIfReady(pattern = state.selectedPattern, hiddenList = null) {
  if (!isCustomFromImagePattern(pattern)) return null;
  const hidden = hiddenList || getPatternHiddenSourceList(pattern);
  if (!hidden.length) return null;
  const id = baseIdFor(pattern);
  const expectedSignature = customRecalcSignature(pattern, hidden);
  const entry = state.customHiddenRecalcCache[id];
  if (!entry || entry.signature !== expectedSignature) return null;
  return entry.rows;
}


export function hiddenNeighborVotes(grid, size, x, y) {
  const votes = {};
  for (let dy = -1; dy <= 1; dy += 1) {
    for (let dx = -1; dx <= 1; dx += 1) {
      if (dx === 0 && dy === 0) continue;
      const nx = x + dx;
      const ny = y + dy;
      if (nx < 0 || ny < 0 || nx >= size || ny >= size) continue;
      const neighbor = grid[ny * size + nx];
      if (!neighbor || neighbor === ".") continue;
      const weight = dx === 0 || dy === 0 ? 2 : 1;
      votes[neighbor] = (votes[neighbor] || 0) + weight;
    }
  }
  return votes;
}

export function voteWinner(votes) {
  let winner = null;
  let best = -1;
  Object.entries(votes).forEach(([code, score]) => {
    if (score > best) {
      winner = code;
      best = score;
    }
  });
  return winner;
}

export function fillNullCellsByBfs(grid, size) {
  const nearest = Array(grid.length).fill(null);
  const queue = [];
  for (let i = 0; i < grid.length; i += 1) {
    const code = grid[i];
    if (!code || code === ".") continue;
    nearest[i] = code;
    queue.push(i);
  }
  let head = 0;
  while (head < queue.length) {
    const index = queue[head++];
    const code = nearest[index];
    const x = index % size;
    const y = Math.floor(index / size);
    const neighbors = [
      [x + 1, y],
      [x - 1, y],
      [x, y + 1],
      [x, y - 1],
    ];
    neighbors.forEach(([nx, ny]) => {
      if (nx < 0 || ny < 0 || nx >= size || ny >= size) return;
      const next = ny * size + nx;
      if (nearest[next] || grid[next] === ".") return;
      nearest[next] = code;
      queue.push(next);
    });
  }
  for (let i = 0; i < grid.length; i += 1) {
    if (grid[i] === null) grid[i] = nearest[i];
  }
}

export function recomputeHiddenCells(grid, sourceRows, size, hiddenSet) {
  if (!hiddenSet.size) return;
  const hiddenMask = Array(grid.length).fill(false);
  for (let y = 0; y < size; y += 1) {
    const row = sourceRows[y];
    for (let x = 0; x < size; x += 1) {
      const sourceCode = row[x];
      if (sourceCode !== "." && hiddenSet.has(sourceCode)) {
        hiddenMask[y * size + x] = true;
      }
    }
  }
  let changed = false;
  for (let pass = 0; pass < 4; pass += 1) {
    const snapshot = grid.slice();
    let passChanged = false;
    for (let i = 0; i < snapshot.length; i += 1) {
      if (!hiddenMask[i] || snapshot[i] !== null) continue;
      const x = i % size;
      const y = Math.floor(i / size);
      const winner = voteWinner(hiddenNeighborVotes(snapshot, size, x, y));
      if (!winner) continue;
      grid[i] = winner;
      passChanged = true;
    }
    changed = changed || passChanged;
    if (!passChanged) break;
  }
  if (grid.some((code) => code === null)) fillNullCellsByBfs(grid, size);
  for (let pass = 0; pass < 2; pass += 1) {
    const snapshot = grid.slice();
    for (let i = 0; i < snapshot.length; i += 1) {
      if (!hiddenMask[i] || snapshot[i] === "." || snapshot[i] === null) continue;
      const x = i % size;
      const y = Math.floor(i / size);
      const votes = hiddenNeighborVotes(snapshot, size, x, y);
      const winner = voteWinner(votes);
      if (!winner) continue;
      if ((votes[winner] || 0) >= 5 && winner !== snapshot[i]) grid[i] = winner;
    }
  }
  if (!changed && hiddenSet.size) {
    const fallback = grid.find((code) => code && code !== ".");
    if (fallback) {
      for (let i = 0; i < grid.length; i += 1) {
        if (hiddenMask[i] && !grid[i]) grid[i] = fallback;
      }
    }
  }
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
  const hidden = getPatternHiddenSourceList(pattern);
  const map = getPatternColorMap(pattern);
  const mapSignature = sourceColors.map((code) => `${code}:${map[code] || code}`).join("|");
  const hiddenKey = hiddenSignature(hidden);
  const customRows = getCustomRecalcRowsIfReady(pattern, hidden);
  const cacheKey = `${fingerprint}:${mapSignature}:${hiddenKey}:${customRows ? "orig" : "local"}`;
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
  const workingRows = customRows || sourceRows;
  const hiddenSet = new Set(hidden);
  const waitOriginal = isCustomFromImagePattern(pattern) && hiddenSet.size > 0 && !customRows;
  const grid = Array(size * size).fill(".");
  for (let y = 0; y < size; y += 1) {
    const row = workingRows[y];
    for (let x = 0; x < size; x += 1) {
      const sourceCode = sourceRows[y][x];
      const index = y * size + x;
      if (sourceCode === ".") {
        grid[index] = ".";
      } else if (customRows) {
        grid[index] = row[x] || ".";
      } else if (hiddenSet.has(sourceCode)) {
        grid[index] = waitOriginal ? (baseMap[sourceCode] || sourceCode) : null;
      } else {
        grid[index] = baseMap[sourceCode] || sourceCode;
      }
    }
  }
  if (hiddenSet.size && !customRows && !waitOriginal) recomputeHiddenCells(grid, sourceRows, size, hiddenSet);
  const fallbackCode = grid.find((code) => code && code !== ".") || "K";
  for (let i = 0; i < grid.length; i += 1) {
    if (grid[i] === null) grid[i] = fallbackCode;
  }
  const rows = [];
  for (let y = 0; y < size; y += 1) rows.push(grid.slice(y * size, y * size + size).map((code) => code || ".").join(""));

  const effectiveMap = { ...baseMap };
  if (hiddenSet.size) {
    hidden.forEach((sourceCode) => {
      const votes = {};
      for (let y = 0; y < size; y += 1) {
        const row = sourceRows[y];
        for (let x = 0; x < size; x += 1) {
          if (row[x] !== sourceCode) continue;
          const code = grid[y * size + x];
          if (!code || code === ".") continue;
          votes[code] = (votes[code] || 0) + 1;
        }
      }
      const winner = voteWinner(votes);
      if (winner) effectiveMap[sourceCode] = winner;
    });
  }
  const result = { key: cacheKey, map: effectiveMap, rows };
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
