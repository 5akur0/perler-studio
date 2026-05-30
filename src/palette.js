import { MARD_COLOR_DATA } from '../mard-palette.js';

export function normalizeMardCode(code) {
  return String(code || "").replace(/^([A-Z]+)0?(\d+)$/, "$1$2");
}

export function mardCodeSort(a, b) {
  const matchA = normalizeMardCode(a).match(/^([A-Z]+)(\d+)$/);
  const matchB = normalizeMardCode(b).match(/^([A-Z]+)(\d+)$/);
  if (matchA && matchB) {
    if (matchA[1] !== matchB[1]) return matchA[1].localeCompare(matchB[1]);
    return Number(matchA[2]) - Number(matchB[2]);
  }
  return String(a).localeCompare(String(b), "zh-Hans-CN", { numeric: true });
}

export const palette = {
  Q: "#FAF4C8",
  q: "#FFFFFF",
  W: "#FDFBFF",
  w: "#F2D9BA",
  A: "#FFDD99",
  a: "#FEBE7D",
  C: "#ADE946",
  c: "#C5ED9C",
  E: "#156A6B",
  e: "#95D3C2",
  F: "#F78FC3",
  f: "#FFE2EA",
  H: "#B5006D",
  h: "#D33793",
  I: "#494FC7",
  i: "#D5B9F8",
  J: "#50AAF0",
  j: "#C8E2FF",
  K: "#000000",
  k: "#89858C",
  N: "#1C334D",
  n: "#34488E",
  T: "#166F41",
  t: "#9EE5B9",
  P: "#E970CC",
  p: "#FFB7E7",
  R: "#FC283C",
  r: "#F67E66",
  G: "#1C9C4F",
  g: "#2E5132",
  L: "#A0E2FB",
  l: "#3EBCE2",
  B: "#0F54C0",
  b: "#3677D2",
  Y: "#FFC830",
  y: "#FFE36E",
  O: "#F77C31",
  o: "#FF995B",
  S: "#B6B1BA",
  s: "#EDEDED",
  M: "#753832",
  m: "#E6B483",
  V: "#AC7BDE",
  v: "#EBDAFC",
  D: "#971937",
  d: "#937A8D",
  Z: "#E99C17",
  z: "#EDB045",
};

export const beadIds = {
  Q: "A1",
  q: "T1",
  W: "H1",
  w: "G16",
  A: "A11",
  a: "A18",
  s: "H9",
  S: "H3",
  k: "H4",
  N: "C12",
  n: "C29",
  d: "E23",
  j: "C23",
  L: "C3",
  l: "C10",
  J: "C6",
  B: "C8",
  b: "C7",
  e: "B10",
  E: "B21",
  c: "B16",
  C: "B14",
  t: "B28",
  T: "B12",
  y: "A17",
  Y: "A26",
  o: "A9",
  O: "A10",
  z: "G5",
  Z: "G6",
  f: "E17",
  F: "E12",
  p: "E3",
  P: "E9",
  h: "E10",
  H: "E13",
  v: "D23",
  i: "D9",
  V: "D6",
  I: "D25",
  m: "G9",
  M: "G8",
  r: "F23",
  R: "F4",
  g: "B15",
  G: "B8",
  K: "H7",
  D: "F7",
};

// Extend palette and beadIds with all MARD color data (beyond the built-in 50 codes).
const mardColorData = MARD_COLOR_DATA;
export const mardCodeToWorkshopCode = {};
Object.entries(beadIds).forEach(([code, mardCode]) => {
  mardCodeToWorkshopCode[normalizeMardCode(mardCode)] = code;
});
// basePaletteMardCodes captures the built-in set BEFORE extension
export const basePaletteMardCodes = Object.values(beadIds).map(normalizeMardCode);
let nextExtendedColorCode = 0;
Object.entries(mardColorData).forEach(([mardCode, hex]) => {
  const normalized = normalizeMardCode(mardCode);
  const internalCode = mardCodeToWorkshopCode[normalized] || String.fromCharCode(0xe000 + nextExtendedColorCode++);
  mardCodeToWorkshopCode[normalized] = internalCode;
  palette[internalCode] = hex;
  beadIds[internalCode] = normalized;
});

export const paletteSizeOptions = [48, 96, 221];
export const paletteSizeKey = "beadWorkshopPaletteSize.v1";

export function readPaletteSize() {
  const stored = Number.parseInt(localStorage.getItem(paletteSizeKey) || "", 10);
  return paletteSizeOptions.includes(stored) ? stored : 48;
}

export function workshopCodeForMard(mardCode) {
  return mardCodeToWorkshopCode[normalizeMardCode(mardCode)] || normalizeMardCode(mardCode);
}

export const sortedColorCodes = Object.keys(palette).sort((a, b) => (beadIds[a] || a).localeCompare(beadIds[b] || b, "zh-Hans-CN", { numeric: true }));
export const mardCodes = Object.keys(mardColorData).map(normalizeMardCode).sort(mardCodeSort);

// Explicit MARD colour sets — 48 ⊂ 96 ⊂ 221
export const MARD_SET_48 = [
  "A4","A6","A7","A10","A11","A13",
  "B3","B5","B8","B12",
  "C2","C3","C5","C6","C7","C8","C10","C11","C13",
  "D3","D6","D7","D9","D13","D15","D18","D19","D21",
  "E2","E3","E4","E7","E8",
  "F5","F8","F13",
  "G1","G5","G7","G8","G9","G13",
  "H1","H2","H3","H4","H5","H7",
];
// 96-colour expanded palette — strict superset of 48
export const MARD_SET_96 = [
  "A3","A4","A6","A7","A10","A11","A13","A14",
  "B3","B5","B7","B8","B10","B12","B14","B17","B18","B19","B20",
  "C2","C3","C5","C6","C7","C8","C10","C11","C13","C16",
  "D2","D3","D5","D6","D7","D8","D9","D11","D12","D13","D14","D15","D16","D18","D19","D20","D21",
  "E1","E2","E3","E4","E5","E6","E7","E8","E9","E10","E11","E12","E13","E14","E15",
  "F1","F2","F3","F4","F5","F6","F7","F8","F9","F10","F11","F12","F13","F14",
  "G1","G2","G3","G5","G7","G8","G9","G13","G14","G17",
  "H1","H2","H3","H4","H5","H6","H7",
  "M5","M6","M9","M12",
];

export const palettePresetMardCodes = {
  48: MARD_SET_48.map(normalizeMardCode).sort(mardCodeSort),
  96: MARD_SET_96.map(normalizeMardCode).sort(mardCodeSort),
  221: mardCodes.filter((code) => /^[A-HM]\d+$/.test(code)).sort(mardCodeSort),
};
