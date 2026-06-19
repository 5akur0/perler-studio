import { palette } from './palette.js';

export function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

export function lerp(a, b, t) {
  return a + (b - a) * t;
}

export function easeOut(t) {
  return 1 - Math.pow(1 - clamp(t, 0, 1), 3);
}

export function mixColor(hex, target, amount) {
  const a = parseInt(hex.slice(1), 16);
  const b = parseInt(target.slice(1), 16);
  const ar = (a >> 16) & 255;
  const ag = (a >> 8) & 255;
  const ab = a & 255;
  const br = (b >> 16) & 255;
  const bg = (b >> 8) & 255;
  const bb = b & 255;
  const rr = Math.round(lerp(ar, br, amount));
  const rg = Math.round(lerp(ag, bg, amount));
  const rb = Math.round(lerp(ab, bb, amount));
  return `rgb(${rr}, ${rg}, ${rb})`;
}

export function fadedPrintColor(hex) {
  return mixColor(hex, "#eadfc6", 0.58);
}

export function srgbToLinear(value) {
  const v = value / 255;
  return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
}

export function rgbToOklab(r, g, b) {
  const lr = srgbToLinear(r);
  const lg = srgbToLinear(g);
  const lb = srgbToLinear(b);
  const l = 0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb;
  const m = 0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb;
  const s = 0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb;
  const l3 = Math.cbrt(l);
  const m3 = Math.cbrt(m);
  const s3 = Math.cbrt(s);
  return {
    l: 0.2104542553 * l3 + 0.793617785 * m3 - 0.0040720468 * s3,
    a: 1.9779984951 * l3 - 2.428592205 * m3 + 0.4505937099 * s3,
    b: 0.0259040371 * l3 + 0.7827717662 * m3 - 0.808675766 * s3,
  };
}

export function oklabDistance(a, b) {
  const dl = (a.l - b.l) * 1.05;
  const da = (a.a - b.a) * 1.35;
  const db = (a.b - b.b) * 1.25;
  return dl * dl + da * da + db * db;
}

export function hexToRgb(hex) {
  const value = parseInt(hex.slice(1), 16);
  return {
    r: (value >> 16) & 255,
    g: (value >> 8) & 255,
    b: value & 255,
  };
}

const beadOklabCache = {};

export function beadOklab(code) {
  if (!beadOklabCache[code]) {
    const rgb = hexToRgb(palette[code]);
    beadOklabCache[code] = rgbToOklab(rgb.r, rgb.g, rgb.b);
  }
  return beadOklabCache[code];
}

// Find the nearest bead code within a given candidate array by OkLab distance.
// When no candidate survives the excludedCodes filter, returns the first candidate.
// For full-palette fallback, use nearestColorCodeByLab (image-convert.js).
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
  return best;
}
