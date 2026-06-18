import { state } from './state.js';
import { palette, beadIds, workshopCodeForMard } from './palette.js';
import { clamp, rgbToOklab, oklabDistance, hexToRgb, beadOklab } from './color-utils.js';
import { allColorCodes, normalizePatternSize } from './pattern.js';

export function loadImageFromDataUrl(dataUrl) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = dataUrl;
  });
}

export function imageToPatternRows(image, removeWhite, size = state.patternSize) {
  return convertImageToPattern(image, { removeWhite, size }).rows;
}

// Convert an image into an exact W×H bead grid for "image stamp" placement on the
// draw board. Unlike convertImageToPattern (square center-crop + dominant-region
// pipeline), this does a straight cover-resample to the target rectangle and maps
// each cell to its nearest palette bead by OkLab distance — used when the placement
// rectangle is already locked to the image's aspect ratio, so the cover crop is
// negligible and there is no distortion. Returns rows[] (transparent/whites → ".").
export function convertImageToRectRows(image, targetW, targetH, options = {}) {
  const w = Math.max(1, Math.round(targetW));
  const h = Math.max(1, Math.round(targetH));
  const removeWhite = options.removeWhite === true; // default: keep whites (photos)
  const codes = allColorCodes();
  if (!codes.length) return Array.from({ length: h }, () => ".".repeat(w));
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  // Cover-fit: crop source to the target aspect (normally ~equal → tiny crop).
  const targetAspect = w / h;
  const iw = image.naturalWidth || image.width || 1;
  const ih = image.naturalHeight || image.height || 1;
  const imgAspect = iw / ih;
  let sw = iw;
  let sh = ih;
  let sx = 0;
  let sy = 0;
  if (imgAspect > targetAspect) {
    sw = ih * targetAspect;
    sx = (iw - sw) / 2;
  } else {
    sh = iw / targetAspect;
    sy = (ih - sh) / 2;
  }
  ctx.drawImage(image, sx, sy, sw, sh, 0, 0, w, h);
  const data = ctx.getImageData(0, 0, w, h).data;
  const rows = [];
  for (let y = 0; y < h; y += 1) {
    let row = "";
    for (let x = 0; x < w; x += 1) {
      const o = (y * w + x) * 4;
      const a = data[o + 3];
      const r = data[o];
      const g = data[o + 1];
      const b = data[o + 2];
      if (a < 32 || (removeWhite && isWhiteLike(r, g, b, a))) {
        row += ".";
        continue;
      }
      row += nearestCodeFromSet(rgbToOklab(r, g, b), codes) || ".";
    }
    rows.push(row);
  }
  return rows;
}

export function convertImageToPattern(image, options = {}) {
  const targetSize = normalizePatternSize(options.size || state.patternSize);
  const removeWhite = options.removeWhite !== false;
  const denoiseSliderLevel = clamp(Math.round(Number(options.denoiseLevel) || 0), 0, 100);
  const denoiseLevel = clamp(denoiseSliderLevel + 25, 0, 100);
  const denoiseEffect = denoiseLevel - 50;
  const excludedCodes = new Set((options.excludedCodes || []).filter((code) => palette[code]));
  const allowExpansion = Boolean(options.allowPaletteExpansionOnExclude) && excludedCodes.size > 0;
  const raw = sampleImageToRgba(image, targetSize, false);
  const rawMask = buildActiveMask(raw, removeWhite);
  const sourceProfile = estimateSourceProfile(raw, rawMask);
  if (denoiseEffect > 0) sourceProfile.useDenoise = true;
  if (denoiseEffect < 0) sourceProfile.useDenoise = false;
  const dominant = convertImageToDominantGrid(
    image,
    targetSize,
    removeWhite,
    sourceProfile,
    excludedCodes,
    allowExpansion,
    denoiseEffect
  );
  if (!dominant.activeCells.length) {
    return makeConversionResult(Array(targetSize).fill(".".repeat(targetSize)), targetSize, 0, 0, sourceProfile, denoiseSliderLevel);
  }
  const grid = dominant.grid;
  const preCleanupColorCount = countGridColors(grid).colors.length;
  const speckRounds = denoiseEffect > 0 ? 1 + Math.floor(denoiseEffect / 20) : 0;
  let cleaned = speckRounds > 0 ? removeSpeckles(grid, targetSize, speckRounds, sourceProfile) : grid.slice();
  if (denoiseEffect >= 15) cleaned = cleanupSmallComponents(cleaned, targetSize, sourceProfile);
  if (denoiseEffect >= 30) cleaned = cleanupSmallComponents(cleaned, targetSize, { ...sourceProfile, likelyPixelArt: false });
  if (denoiseEffect >= 40) cleaned = consensusRebalanceGrid(cleaned, targetSize, sourceProfile);
  if (sourceProfile.logoLike || targetSize <= 16) {
    cleaned = bridgeLineGaps(cleaned, targetSize, sourceProfile);
  }
  cleaned = collapseToPalette(cleaned, targetSize, dominant.lockedPalette);
  const rows = gridToRows(cleaned, targetSize);
  return makeConversionResult(rows, targetSize, dominant.lockedPalette.length, preCleanupColorCount, sourceProfile, denoiseSliderLevel);
}

export function convertImageToDominantGrid(image, targetSize, removeWhite, sourceProfile, excludedCodes, allowExpansion, denoiseEffect = 0) {
  const analysisSize = clamp(
    Math.round(targetSize * (sourceProfile.logoLike ? 7.5 : sourceProfile.likelyPixelArt ? 6.5 : 6)),
    targetSize,
    960
  );
  const analysis = sampleImageToRgba(image, analysisSize, true);
  const externalWhiteMask = removeWhite ? buildExternalWhiteMask(analysis) : null;
  const transparentWhiteCode = workshopCodeForMard("H1");
  const opaqueWhiteCode = workshopCodeForMard("H2");
  const avoidTransparentWhite = transparentWhiteCode && opaqueWhiteCode && !excludedCodes.has(opaqueWhiteCode);
  const effectiveExcluded = new Set(excludedCodes);
  if (avoidTransparentWhite) effectiveExcluded.add(transparentWhiteCode);
  const availableCodes = allColorCodes().filter((code) => !effectiveExcluded.has(code));
  if (!availableCodes.length) {
    return { grid: Array(targetSize * targetSize).fill("."), activeCells: [], lockedPalette: [] };
  }
  const activeCells = [];
  for (let y = 0; y < targetSize; y += 1) {
    const y0 = Math.floor((y * analysisSize) / targetSize);
    const y1 = Math.max(y0 + 1, Math.floor(((y + 1) * analysisSize) / targetSize));
    for (let x = 0; x < targetSize; x += 1) {
      const x0 = Math.floor((x * analysisSize) / targetSize);
      const x1 = Math.max(x0 + 1, Math.floor(((x + 1) * analysisSize) / targetSize));
      const dominant = dominantColorInRegion(
        analysis,
        analysisSize,
        x0,
        y0,
        x1,
        y1,
        removeWhite,
        externalWhiteMask
      );
      if (!dominant) continue;
      activeCells.push({
        index: y * targetSize + x,
        r: dominant.r,
        g: dominant.g,
        b: dominant.b,
        lab: rgbToOklab(dominant.r, dominant.g, dominant.b),
      });
    }
  }
  if (!activeCells.length) {
    return { grid: Array(targetSize * targetSize).fill("."), activeCells: [], lockedPalette: [] };
  }
  let maxColors = chooseSimplifiedColorCount(targetSize, activeCells.length, sourceProfile);
  if (allowExpansion) maxColors = clamp(maxColors + 2, 2, 16);
  maxColors = applyDenoiseColorCompression(maxColors, denoiseEffect);
  const clusters = simplifyColors(activeCells, maxColors);
  const paletteHint = getPaletteLimitHint(sourceProfile);
  let finalPaletteCap = chooseFinalPaletteCap(targetSize, activeCells.length, sourceProfile, clusters.length);
  if (allowExpansion) finalPaletteCap = clamp(finalPaletteCap + 2, 2, 14);
  finalPaletteCap = applyDenoiseColorCompression(finalPaletteCap, denoiseEffect);
  if (paletteHint <= 3) finalPaletteCap = Math.min(finalPaletteCap, paletteHint);
  const lockedPalette = selectPaletteCodes(clusters, finalPaletteCap, effectiveExcluded);
  if (!lockedPalette.length) {
    return { grid: Array(targetSize * targetSize).fill("."), activeCells, lockedPalette: [] };
  }
  const grid = Array(targetSize * targetSize).fill(".");
  activeCells.forEach((cell) => {
    grid[cell.index] = nearestCodeFromSet(cell.lab, lockedPalette, effectiveExcluded);
  });
  return { grid, activeCells, lockedPalette };
}

export function applyDenoiseColorCompression(limit, denoiseEffect = 0) {
  const effect = clamp(Math.round(Number(denoiseEffect) || 0), -50, 50);
  if (effect === 0) return limit;
  if (effect < 0) {
    let expanded = Math.round(limit * (1 + Math.abs(effect) * 0.0045));
    if (effect <= -20) expanded += 1;
    if (effect <= -40) expanded += 1;
    return clamp(expanded, 2, 14);
  }
  let compressed = Math.max(2, Math.round(limit * (1 - effect * 0.0068)));
  if (effect >= 24) compressed = Math.min(compressed, limit - 1);
  if (effect >= 34) compressed = Math.min(compressed, limit - 2);
  if (effect >= 42) compressed = Math.min(compressed, limit - 3);
  if (effect >= 48) compressed = Math.min(compressed, limit - 4);
  return clamp(compressed, 2, 14);
}

function dominantColorInRegion(data, width, startX, startY, endX, endY, removeWhite, externalWhiteMask = null) {
  const buckets = new Map();
  let nonExternalCount = 0;
  const area = Math.max(1, (endX - startX) * (endY - startY));
  for (let y = startY; y < endY; y += 1) {
    for (let x = startX; x < endX; x += 1) {
      const offset = (y * width + x) * 4;
      const index = y * width + x;
      const r = data[offset];
      const g = data[offset + 1];
      const b = data[offset + 2];
      const a = data[offset + 3];
      if (a < 64) continue;
      if (removeWhite && externalWhiteMask?.[index]) continue;
      nonExternalCount += 1;
      const key = `${r >> 3}:${g >> 3}:${b >> 3}`;
      const bucket = buckets.get(key) || { count: 0, r: 0, g: 0, b: 0 };
      bucket.count += 1;
      bucket.r += r;
      bucket.g += g;
      bucket.b += b;
      buckets.set(key, bucket);
    }
  }
  if (!buckets.size) return null;
  if (removeWhite && nonExternalCount / area < 0.16) return null;
  let best = null;
  buckets.forEach((bucket) => {
    if (!best || bucket.count > best.count) best = bucket;
  });
  if (!best) return null;
  const r = Math.round(best.r / best.count);
  const g = Math.round(best.g / best.count);
  const b = Math.round(best.b / best.count);
  return { r, g, b };
}

export function sampleImageToRgba(image, targetSize, smooth = true) {
  const canvas = document.createElement("canvas");
  canvas.width = targetSize;
  canvas.height = targetSize;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  ctx.imageSmoothingEnabled = smooth;
  ctx.imageSmoothingQuality = smooth ? "high" : "low";
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, targetSize, targetSize);
  const crop = Math.min(image.width, image.height);
  const sx = (image.width - crop) / 2;
  const sy = (image.height - crop) / 2;
  ctx.drawImage(image, sx, sy, crop, crop, 0, 0, targetSize, targetSize);
  return Array.from(ctx.getImageData(0, 0, targetSize, targetSize).data);
}

export function edgeAwarePreprocessRgba(raw, size, sourceProfile) {
  const softened = sourceProfile.useDenoise ? smoothRgba(raw, size) : raw.slice();
  const out = softened.slice();
  const edgeThreshold = sourceProfile.logoLike ? 16 : sourceProfile.likelyPixelArt ? 18 : 13;
  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      const idx = (y * size + x) * 4;
      const center = [softened[idx], softened[idx + 1], softened[idx + 2]];
      let gx = 0;
      let gy = 0;
      let sumR = 0;
      let sumG = 0;
      let sumB = 0;
      let weightSum = 0;
      for (let dy = -1; dy <= 1; dy += 1) {
        for (let dx = -1; dx <= 1; dx += 1) {
          const nx = clamp(x + dx, 0, size - 1);
          const ny = clamp(y + dy, 0, size - 1);
          const nIdx = (ny * size + nx) * 4;
          const nr = softened[nIdx];
          const ng = softened[nIdx + 1];
          const nb = softened[nIdx + 2];
          const nGray = nr * 0.299 + ng * 0.587 + nb * 0.114;
          const wx = dx === 0 ? 2 : 1;
          const wy = dy === 0 ? 2 : 1;
          gx += dx * nGray * wy;
          gy += dy * nGray * wx;
          const colorDiff = Math.abs(nr - center[0]) + Math.abs(ng - center[1]) + Math.abs(nb - center[2]);
          const spatial = dx === 0 && dy === 0 ? 2.2 : (Math.abs(dx) + Math.abs(dy) === 1 ? 1.1 : 0.7);
          const w = spatial * (1 / (1 + colorDiff / 42));
          sumR += nr * w;
          sumG += ng * w;
          sumB += nb * w;
          weightSum += w;
        }
      }
      const edgeMag = Math.hypot(gx, gy);
      if (edgeMag > edgeThreshold) continue;
      out[idx] = Math.round(sumR / weightSum);
      out[idx + 1] = Math.round(sumG / weightSum);
      out[idx + 2] = Math.round(sumB / weightSum);
    }
  }
  return out;
}

export function smoothRgba(data, size) {
  const out = data.slice();
  const kernel = [[1, 2, 1], [2, 5, 2], [1, 2, 1]];
  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      let wr = 0;
      let r = 0;
      let g = 0;
      let b = 0;
      let a = 0;
      for (let ky = -1; ky <= 1; ky += 1) {
        for (let kx = -1; kx <= 1; kx += 1) {
          const nx = clamp(x + kx, 0, size - 1);
          const ny = clamp(y + ky, 0, size - 1);
          const weight = kernel[ky + 1][kx + 1];
          const offset = (ny * size + nx) * 4;
          r += data[offset] * weight;
          g += data[offset + 1] * weight;
          b += data[offset + 2] * weight;
          a += data[offset + 3] * weight;
          wr += weight;
        }
      }
      const offset = (y * size + x) * 4;
      out[offset] = Math.round(r / wr);
      out[offset + 1] = Math.round(g / wr);
      out[offset + 2] = Math.round(b / wr);
      out[offset + 3] = Math.round(a / wr);
    }
  }
  return out;
}

export function isWhiteLike(r, g, b, a) {
  if (a < 72) return true;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const chroma = max - min;
  const luma = r * 0.299 + g * 0.587 + b * 0.114;
  const brightNeutral = luma >= 236 && chroma <= 26;
  const nearPaper = max >= 224 && min >= 206 && chroma <= 20;
  return brightNeutral || nearPaper;
}

export function isBackgroundLike(r, g, b, a) {
  if (a < 96) return true;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const chroma = max - min;
  const luma = r * 0.299 + g * 0.587 + b * 0.114;
  if (luma >= 246 && chroma <= 36) return true;
  if (luma >= 232 && chroma <= 24) return true;
  if (luma >= 218 && chroma <= 14) return true;
  return false;
}

export function inferSquareSizeFromRgba(data) {
  const pixels = Math.floor(data.length / 4);
  const side = Math.round(Math.sqrt(pixels));
  return side > 0 ? side : 1;
}

export function buildExternalWhiteMask(data, size = null) {
  const side = size || inferSquareSizeFromRgba(data);
  const total = side * side;
  const external = Array(total).fill(false);
  const visited = Array(total).fill(false);
  const stack = [];

  function pushIfEdgeWhite(x, y) {
    if (x < 0 || y < 0 || x >= side || y >= side) return;
    const index = y * side + x;
    if (visited[index]) return;
    const offset = index * 4;
    const r = data[offset];
    const g = data[offset + 1];
    const b = data[offset + 2];
    const a = data[offset + 3];
    if (!isBackgroundLike(r, g, b, a)) return;
    visited[index] = true;
    stack.push(index);
  }

  for (let x = 0; x < side; x += 1) {
    pushIfEdgeWhite(x, 0);
    pushIfEdgeWhite(x, side - 1);
  }
  for (let y = 1; y < side - 1; y += 1) {
    pushIfEdgeWhite(0, y);
    pushIfEdgeWhite(side - 1, y);
  }

  while (stack.length) {
    const index = stack.pop();
    external[index] = true;
    const x = index % side;
    const y = Math.floor(index / side);
    [[1, 0], [-1, 0], [0, 1], [0, -1]].forEach(([dx, dy]) => {
      const nx = x + dx;
      const ny = y + dy;
      if (nx < 0 || ny < 0 || nx >= side || ny >= side) return;
      const next = ny * side + nx;
      if (visited[next]) return;
      const offset = next * 4;
      const r = data[offset];
      const g = data[offset + 1];
      const b = data[offset + 2];
      const a = data[offset + 3];
      if (!isBackgroundLike(r, g, b, a)) return;
      visited[next] = true;
      stack.push(next);
    });
  }

  return external;
}

export function buildActiveMask(data, removeWhite) {
  const externalWhite = removeWhite ? buildExternalWhiteMask(data) : null;
  const mask = [];
  for (let i = 0, p = 0; i < data.length; i += 4, p += 1) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const a = data[i + 3];
    const externalWhiteCell = Boolean(removeWhite && externalWhite?.[p]);
    mask.push(!(a < 48 || externalWhiteCell));
  }
  return mask;
}

export function estimateSourceProfile(data, mask) {
  const activeCount = mask.reduce((sum, active) => sum + (active ? 1 : 0), 0);
  if (!activeCount) {
    return {
      activeCount: 0,
      coarseCount: 0,
      significantCount: 0,
      topTwoRatio: 0,
      likelyPixelArt: true,
      useDenoise: false,
    };
  }
  const bins = countCoarseColorBins(data, mask, 4);
  const sorted = [...bins.values()].sort((a, b) => b - a);
  const threshold = Math.max(2, Math.round(activeCount * 0.007));
  const significantCount = sorted.filter((count) => count >= threshold).length || 1;
  const topTwoRatio = ((sorted[0] || 0) + (sorted[1] || 0)) / activeCount;
  const coarseCount = bins.size;
  const likelyPixelArt = coarseCount <= 18 || (coarseCount <= 26 && topTwoRatio >= 0.78);
  const logoLike = significantCount <= 4 && topTwoRatio >= 0.72 && coarseCount <= 28;
  const useDenoise = !likelyPixelArt && coarseCount >= 12;
  return {
    activeCount,
    coarseCount,
    significantCount,
    topTwoRatio,
    likelyPixelArt,
    logoLike,
    useDenoise,
  };
}

export function countCoarseColorBins(data, mask, shift) {
  const bins = new Map();
  let maskIndex = 0;
  for (let i = 0; i < data.length; i += 4) {
    if (!mask[maskIndex]) {
      maskIndex += 1;
      continue;
    }
    const key = `${data[i] >> shift}:${data[i + 1] >> shift}:${data[i + 2] >> shift}`;
    bins.set(key, (bins.get(key) || 0) + 1);
    maskIndex += 1;
  }
  return bins;
}

export function chooseSimplifiedColorCount(size, activeCount, sourceProfile) {
  if (sourceProfile.logoLike) {
    if (sourceProfile.topTwoRatio >= 0.86) return 2;
    return 3;
  }
  const density = activeCount / (size * size);
  const hint = sourceProfile.significantCount;
  if (sourceProfile.topTwoRatio >= 0.9) return 2;
  if (hint <= 3 && sourceProfile.topTwoRatio >= 0.7) return 3;
  if (hint <= 4 && sourceProfile.topTwoRatio >= 0.62) return 4;
  if (hint <= 2) return 2;
  if (hint <= 4) return clamp(hint + 1, 2, 6);
  let maxColors = size <= 16 ? 8 : size <= 24 ? 10 : size <= 32 ? 11 : 12;
  if (density > 0.82) maxColors += 1;
  if (density < 0.22) maxColors -= 1;
  if (sourceProfile.coarseCount > 80) maxColors += 1;
  if (sourceProfile.coarseCount < 18) maxColors -= 1;
  if (sourceProfile.likelyPixelArt && hint <= 8) maxColors = Math.min(maxColors, hint + 2);
  maxColors = Math.min(maxColors, hint + 3);
  if (density < 0.3) maxColors -= 1;
  return clamp(maxColors, 2, 14);
}

export function chooseFinalPaletteCap(size, activeCount, sourceProfile, clusterCount) {
  if (sourceProfile.logoLike) {
    return clamp(sourceProfile.topTwoRatio >= 0.86 ? 2 : 3, 2, 3);
  }
  const hint = sourceProfile.significantCount;
  if (sourceProfile.topTwoRatio >= 0.9) return 2;
  if (hint <= 3 && sourceProfile.topTwoRatio >= 0.7) return 3;
  if (hint <= 4 && sourceProfile.topTwoRatio >= 0.62) return 4;
  if (hint <= 2) return 2;
  if (hint <= 4) return clamp(hint + 1, 2, 6);
  let cap = size <= 16 ? 8 : size <= 24 ? 10 : size <= 32 ? 10 : 12;
  if (activeCount < 128) cap = Math.min(cap, 7);
  if (sourceProfile.coarseCount < 18) cap -= 1;
  if (sourceProfile.likelyPixelArt && hint <= 8) cap = Math.min(cap, hint + 2);
  cap = Math.min(cap, clusterCount, hint + 3);
  return clamp(cap, 2, 12);
}

export function getPaletteLimitHint(sourceProfile) {
  if (sourceProfile.significantCount <= 2) return 2;
  if (sourceProfile.topTwoRatio >= 0.9) return 2;
  if (sourceProfile.topTwoRatio >= 0.82 && sourceProfile.significantCount <= 6) return 3;
  if (sourceProfile.significantCount <= 4 && sourceProfile.topTwoRatio >= 0.62) return 4;
  if (sourceProfile.likelyPixelArt && sourceProfile.significantCount <= 8) return 6;
  return 12;
}

export function selectPaletteCodes(clusters, paletteCap, excludedCodes = null) {
  const weighted = new Map();
  clusters.forEach((cluster) => {
    const code = nearestColorCode(cluster.r, cluster.g, cluster.b, excludedCodes);
    if (!code) return;
    weighted.set(code, (weighted.get(code) || 0) + (cluster.count || 1));
  });
  const sorted = [...weighted.entries()]
    .sort((a, b) => b[1] - a[1] || (beadIds[a[0]] || a[0]).localeCompare(beadIds[b[0]] || b[0], "zh-Hans-CN", { numeric: true }))
    .map(([code]) => code);
  const selected = sorted.slice(0, Math.max(1, paletteCap));
  if (selected.length) return selected;
  const fallback = clusters
    .slice()
    .sort((a, b) => (b.count || 0) - (a.count || 0))
    .map((cluster) => nearestColorCode(cluster.r, cluster.g, cluster.b, excludedCodes))
    .find((code) => Boolean(code));
  return fallback ? [fallback] : [];
}

export function nearestCodeFromSet(lab, codes, excludedCodes = null) {
  let best = codes[0] || "K";
  let bestDistance = Infinity;
  codes.forEach((code) => {
    if (excludedCodes?.has(code)) return;
    const distance = oklabDistance(lab, beadOklab(code));
    if (distance < bestDistance) {
      bestDistance = distance;
      best = code;
    }
  });
  // All candidates were excluded — fall back to full-palette search
  if (bestDistance === Infinity) return nearestColorCodeByLab(lab, excludedCodes);
  return best;
}

export function simplifyColors(pixels, maxColors) {
  const seeds = seedClusters(pixels, maxColors);
  let clusters = seeds.map((seed) => ({ ...seed }));
  for (let iteration = 0; iteration < 6; iteration += 1) {
    const sums = clusters.map(() => ({ l: 0, a: 0, b: 0, r: 0, g: 0, blue: 0, count: 0 }));
    pixels.forEach((pixel) => {
      let best = 0;
      let bestDistance = Infinity;
      clusters.forEach((cluster, index) => {
        const distance = oklabDistance(pixel.lab, cluster.lab);
        if (distance < bestDistance) {
          bestDistance = distance;
          best = index;
        }
      });
      const sum = sums[best];
      sum.l += pixel.lab.l;
      sum.a += pixel.lab.a;
      sum.b += pixel.lab.b;
      sum.r += pixel.r;
      sum.g += pixel.g;
      sum.blue += pixel.b;
      sum.count += 1;
    });
    clusters = clusters.map((cluster, index) => {
      const sum = sums[index];
      if (!sum.count) return cluster;
      const lab = { l: sum.l / sum.count, a: sum.a / sum.count, b: sum.b / sum.count };
      return { lab, r: Math.round(sum.r / sum.count), g: Math.round(sum.g / sum.count), b: Math.round(sum.blue / sum.count), count: sum.count };
    });
  }
  return clusters.filter((cluster) => cluster.count !== 0);
}

export function seedClusters(pixels, maxColors) {
  const buckets = new Map();
  pixels.forEach((pixel) => {
    const key = `${pixel.r >> 4}:${pixel.g >> 4}:${pixel.b >> 4}`;
    const bucket = buckets.get(key) || { r: 0, g: 0, b: 0, l: 0, aa: 0, bb: 0, count: 0 };
    bucket.r += pixel.r;
    bucket.g += pixel.g;
    bucket.b += pixel.b;
    bucket.l += pixel.lab.l;
    bucket.aa += pixel.lab.a;
    bucket.bb += pixel.lab.b;
    bucket.count += 1;
    buckets.set(key, bucket);
  });
  const candidates = [...buckets.values()].map((bucket) => ({
    r: Math.round(bucket.r / bucket.count),
    g: Math.round(bucket.g / bucket.count),
    b: Math.round(bucket.b / bucket.count),
    lab: { l: bucket.l / bucket.count, a: bucket.aa / bucket.count, b: bucket.bb / bucket.count },
    count: bucket.count,
  })).sort((a, b) => b.count - a.count);
  const seeds = [];
  candidates.forEach((candidate) => {
    if (seeds.length >= maxColors) return;
    const farEnough = seeds.every((seed) => oklabDistance(seed.lab, candidate.lab) > 0.0009);
    if (farEnough || seeds.length < Math.min(4, maxColors)) seeds.push(candidate);
  });
  for (const candidate of candidates) {
    if (seeds.length >= maxColors) break;
    if (!seeds.includes(candidate)) seeds.push(candidate);
  }
  return seeds.length ? seeds : [pixels[0]];
}

export function removeSpeckles(grid, size, rounds, sourceProfile = null) {
  let current = grid.slice();
  const strict = getPaletteLimitHint(sourceProfile || { significantCount: 99, topTwoRatio: 0, likelyPixelArt: false }) <= 3;
  const effectiveRounds = (sourceProfile?.logoLike || (sourceProfile?.likelyPixelArt && size <= 16))
    ? Math.min(1, rounds)
    : rounds;
  for (let round = 0; round < effectiveRounds; round += 1) {
    const next = current.slice();
    for (let y = 0; y < size; y += 1) {
      for (let x = 0; x < size; x += 1) {
        const index = y * size + x;
        const code = current[index];
        const neighbors = neighborCodes(current, size, x, y, true);
        const majority = majorityCode(neighbors);
        if (!majority) continue;
        const same8 = neighbors.filter((item) => item === code).length;
        const same4 = neighborCodes(current, size, x, y, false).filter((item) => item === code).length;
        const majorityCount = neighbors.filter((item) => item === majority).length;
        if (code !== "." && shouldKeepIsolatedFeature(current, size, x, y, code, neighbors, same4, same8)) continue;
        if (sourceProfile?.logoLike && code !== ".") {
          continue;
        }
        if (code === "." && majority !== "." && majorityCount >= 7) {
          next[index] = majority;
        } else if (code !== "." && same8 <= 1 && same4 === 0 && majorityCount >= (strict ? 6 : 5)) {
          next[index] = majority;
        }
      }
    }
    current = next;
  }
  return current;
}

export function cleanupSmallComponents(grid, size, sourceProfile = null) {
  if (sourceProfile?.logoLike && size <= 20) {
    return grid.slice();
  }
  const out = grid.slice();
  const visited = Array(size * size).fill(false);
  const paletteHint = getPaletteLimitHint(sourceProfile || { significantCount: 99, topTwoRatio: 0, likelyPixelArt: false });
  let threshold = size <= 24 ? 1 : size <= 36 ? 2 : 3;
  if (sourceProfile?.likelyPixelArt) threshold = Math.max(1, threshold - 1);
  if (paletteHint <= 3) threshold = 1;
  for (let index = 0; index < out.length; index += 1) {
    if (visited[index] || out[index] === ".") continue;
    const component = collectComponent(out, size, index, visited);
    if (component.cells.length > threshold) continue;
    if (shouldPreserveSmallDetail(out, size, component, sourceProfile)) continue;
    const boundary = [];
    component.cells.forEach((cellIndex) => {
      const x = cellIndex % size;
      const y = Math.floor(cellIndex / size);
      boundary.push(...neighborCodes(out, size, x, y, false).filter((code) => code !== component.code));
    });
    const replacement = majorityCode(boundary) || ".";
    component.cells.forEach((cellIndex) => {
      out[cellIndex] = replacement;
    });
  }
  return out;
}

export function consensusRebalanceGrid(grid, size, sourceProfile = null) {
  const out = grid.slice();
  const passes = sourceProfile?.logoLike ? 1 : (size <= 20 ? 2 : 3);
  const softThreshold = sourceProfile?.logoLike ? 0.0026 : 0.0019;
  for (let pass = 0; pass < passes; pass += 1) {
    const next = out.slice();
    for (let y = 1; y < size - 1; y += 1) {
      for (let x = 1; x < size - 1; x += 1) {
        const index = y * size + x;
        const code = out[index];
        if (code === ".") continue;
        const neighbors = neighborCodes(out, size, x, y, true).filter((item) => item !== ".");
        if (neighbors.length < 5) continue;
        const counts = {};
        neighbors.forEach((n) => {
          counts[n] = (counts[n] || 0) + 1;
        });
        const candidate = Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0];
        if (!candidate || candidate === code) continue;
        const support = counts[candidate] || 0;
        if (support < (sourceProfile?.logoLike ? 7 : 6)) continue;
        const dist = oklabDistance(beadOklab(candidate), beadOklab(code));
        if (dist <= softThreshold || support >= 8) {
          next[index] = candidate;
        }
      }
    }
    for (let i = 0; i < out.length; i += 1) out[i] = next[i];
  }
  return out;
}

export function bridgeLineGaps(grid, size, sourceProfile = null) {
  if (!sourceProfile?.logoLike && size > 16) return grid;
  const out = grid.slice();
  for (let y = 1; y < size - 1; y += 1) {
    for (let x = 1; x < size - 1; x += 1) {
      const index = y * size + x;
      if (out[index] !== ".") continue;
      const left = out[y * size + (x - 1)];
      const right = out[y * size + (x + 1)];
      const up = out[(y - 1) * size + x];
      const down = out[(y + 1) * size + x];
      const ul = out[(y - 1) * size + (x - 1)];
      const ur = out[(y - 1) * size + (x + 1)];
      const dl = out[(y + 1) * size + (x - 1)];
      const dr = out[(y + 1) * size + (x + 1)];
      if (left !== "." && left === right) {
        out[index] = left;
        continue;
      }
      if (up !== "." && up === down) {
        out[index] = up;
        continue;
      }
      if (ul !== "." && ul === dr) {
        out[index] = ul;
        continue;
      }
      if (ur !== "." && ur === dl) {
        out[index] = ur;
      }
    }
  }
  return out;
}

export function collectComponent(grid, size, start, visited) {
  const code = grid[start];
  const cells = [];
  const stack = [start];
  visited[start] = true;
  while (stack.length) {
    const index = stack.pop();
    cells.push(index);
    const x = index % size;
    const y = Math.floor(index / size);
    [[1, 0], [-1, 0], [0, 1], [0, -1]].forEach(([dx, dy]) => {
      const nx = x + dx;
      const ny = y + dy;
      if (nx < 0 || ny < 0 || nx >= size || ny >= size) return;
      const nextIndex = ny * size + nx;
      if (!visited[nextIndex] && grid[nextIndex] === code) {
        visited[nextIndex] = true;
        stack.push(nextIndex);
      }
    });
  }
  return { code, cells };
}

export function shouldPreserveSmallDetail(grid, size, component, sourceProfile = null) {
  const darkDetail = new Set(["K", "k", "D", "d", "N", "n", "b"]);
  const lowPalette = getPaletteLimitHint(sourceProfile || { significantCount: 99, topTwoRatio: 0, likelyPixelArt: false }) <= 3;
  const xs = component.cells.map((index) => index % size);
  const ys = component.cells.map((index) => Math.floor(index / size));
  const lineLike = component.cells.length >= 2 && (new Set(xs).size > 1 || new Set(ys).size > 1);
  let nonDotBoundary = 0;
  let boundary = 0;
  component.cells.forEach((cellIndex) => {
    const x = cellIndex % size;
    const y = Math.floor(cellIndex / size);
    neighborCodes(grid, size, x, y, false).forEach((code) => {
      if (code === component.code) return;
      boundary += 1;
      if (code !== ".") nonDotBoundary += 1;
    });
  });
  const embedded = boundary > 0 && nonDotBoundary / boundary >= 0.6;
  const singlePixel = component.cells.length === 1 && darkDetail.has(component.code) && embedded;
  const highContrastDot = component.cells.length === 1 && hasStrongContrastBoundary(grid, size, component);
  const lowPaletteDot = lowPalette && component.cells.length === 1 && embedded;
  return lineLike || singlePixel || highContrastDot || lowPaletteDot || (darkDetail.has(component.code) && embedded);
}

export function shouldKeepIsolatedFeature(grid, size, x, y, code, neighbors8, same4, same8) {
  if (same4 >= 1 || same8 >= 2) return false;
  const darkDetail = new Set(["K", "k", "D", "d", "N", "n", "b"]);
  if (!darkDetail.has(code)) return false;
  const nonDot = neighbors8.filter((item) => item !== ".").length;
  if (nonDot < 5) return false;
  const distinct = new Set(neighbors8.filter((item) => item !== "." && item !== code));
  if (distinct.size > 2) return false;
  return hasStrongContrastBoundary(grid, size, { code, cells: [y * size + x] });
}

export function hasStrongContrastBoundary(grid, size, component) {
  let contrasted = 0;
  let sampled = 0;
  const selfLab = beadOklab(component.code);
  component.cells.forEach((cellIndex) => {
    const x = cellIndex % size;
    const y = Math.floor(cellIndex / size);
    neighborCodes(grid, size, x, y, true).forEach((code) => {
      if (code === "." || code === component.code) return;
      sampled += 1;
      if (oklabDistance(selfLab, beadOklab(code)) > 0.0038) contrasted += 1;
    });
  });
  return sampled >= 3 && contrasted / sampled >= 0.6;
}

export function collapseToPalette(grid, size, paletteCodes) {
  const allowed = new Set(paletteCodes);
  const out = grid.slice();
  for (let i = 0; i < out.length; i += 1) {
    const code = out[i];
    if (code === "." || allowed.has(code)) continue;
    const x = i % size;
    const y = Math.floor(i / size);
    const neighborMajority = majorityCode(
      neighborCodes(out, size, x, y, true).filter((item) => allowed.has(item))
    );
    if (neighborMajority) {
      out[i] = neighborMajority;
      continue;
    }
    const selfLab = beadOklab(code);
    let best = paletteCodes[0] || "K";
    let bestDistance = Infinity;
    paletteCodes.forEach((candidate) => {
      const distance = oklabDistance(selfLab, beadOklab(candidate));
      if (distance < bestDistance) {
        bestDistance = distance;
        best = candidate;
      }
    });
    out[i] = best;
  }
  return out;
}

export function compressNeutralPalette(grid, size, sourceProfile, paletteCodes) {
  if (!sourceProfile?.logoLike) return grid;
  const neutralCodes = paletteCodes.filter((code) => {
    const rgb = hexToRgb(palette[code]);
    return Math.max(rgb.r, rgb.g, rgb.b) - Math.min(rgb.r, rgb.g, rgb.b) <= 22;
  });
  if (neutralCodes.length < 3) return grid;
  const ranked = neutralCodes
    .map((code) => {
      const rgb = hexToRgb(palette[code]);
      const luma = rgb.r * 0.299 + rgb.g * 0.587 + rgb.b * 0.114;
      return { code, luma };
    })
    .sort((a, b) => a.luma - b.luma);
  const dark = ranked[0];
  const light = ranked[ranked.length - 1];
  if (!dark || !light || dark.code === light.code) return grid;
  const boundary = (dark.luma + light.luma) / 2;
  const neutralSet = new Set(neutralCodes);
  const out = grid.slice();
  for (let i = 0; i < out.length; i += 1) {
    const code = out[i];
    if (!neutralSet.has(code)) continue;
    const rgb = hexToRgb(palette[code]);
    const luma = rgb.r * 0.299 + rgb.g * 0.587 + rgb.b * 0.114;
    out[i] = luma <= boundary ? dark.code : light.code;
  }
  return out;
}

export function neighborCodes(grid, size, x, y, includeDiagonal) {
  const dirs = includeDiagonal
    ? [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [1, -1], [-1, 1], [-1, -1]]
    : [[1, 0], [-1, 0], [0, 1], [0, -1]];
  const codes = [];
  dirs.forEach(([dx, dy]) => {
    const nx = x + dx;
    const ny = y + dy;
    if (nx < 0 || ny < 0 || nx >= size || ny >= size) return;
    codes.push(grid[ny * size + nx]);
  });
  return codes;
}

export function majorityCode(codes) {
  if (!codes.length) return null;
  const counts = {};
  codes.forEach((code) => {
    counts[code] = (counts[code] || 0) + 1;
  });
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] || null;
}

export function gridToRows(grid, size) {
  const rows = [];
  for (let y = 0; y < size; y += 1) {
    rows.push(grid.slice(y * size, y * size + size).join(""));
  }
  return rows;
}

export function countGridColors(grid) {
  const counts = {};
  grid.forEach((code) => {
    if (code !== ".") counts[code] = (counts[code] || 0) + 1;
  });
  const colors = Object.entries(counts)
    .map(([code, count]) => ({ code, count }))
    .sort((a, b) => b.count - a.count || (beadIds[a.code] || a.code).localeCompare(beadIds[b.code] || b.code, "zh-Hans-CN", { numeric: true }));
  return {
    colors,
    total: colors.reduce((sum, item) => sum + item.count, 0),
  };
}

export function makeConversionResult(rows, size, simplifiedColorCount, preCleanupColorCount, sourceProfile = null, denoiseLevel = 0) {
  const stats = countGridColors(rows.join("").split(""));
  return {
    rows,
    stats: {
      size,
      total: stats.total,
      colors: stats.colors,
      simplifiedColorCount,
      preCleanupColorCount,
      sourceSignificantCount: sourceProfile?.significantCount || stats.colors.length,
      sourceCoarseCount: sourceProfile?.coarseCount || stats.colors.length,
      denoised: Boolean(sourceProfile?.useDenoise),
      denoiseLevel: clamp(Math.round(Number(denoiseLevel) || 0), 0, 100),
    },
  };
}

export function nearestColorCodeByLab(lab, excludedCodes = null) {
  let best = "K";
  let bestDistance = Infinity;
  allColorCodes().forEach((code) => {
    if (excludedCodes?.has(code)) return;
    const distance = oklabDistance(lab, beadOklab(code));
    if (distance < bestDistance) {
      bestDistance = distance;
      best = code;
    }
  });
  if (bestDistance === Infinity) return null;
  return best;
}

export function nearestColorCode(r, g, b, excludedCodes = null) {
  const lab = rgbToOklab(r, g, b);
  return nearestColorCodeByLab(lab, excludedCodes);
}
