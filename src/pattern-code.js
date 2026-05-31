import { palette, beadIds, normalizeMardCode, workshopCodeForMard } from './palette.js';

export const PATTERN_CODE_PREFIX = "BEAM1";

const VALUE_ALPHABET = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
const RUN_SEPARATOR = ".";
const PALETTE_SEPARATOR = "_";
const EMPTY_PALETTE = "-";
const EMPTY_CELL = ".";

function valueTokenWidth(maxValue) {
  let width = 1;
  let capacity = VALUE_ALPHABET.length;
  while (capacity <= maxValue) {
    width += 1;
    capacity *= VALUE_ALPHABET.length;
  }
  return width;
}

function encodeFixedValue(value, width) {
  if (!Number.isInteger(value) || value < 0) {
    throw new Error("Pattern code value must be a non-negative integer.");
  }
  let remaining = value;
  let token = "";
  for (let i = 0; i < width; i += 1) {
    token = VALUE_ALPHABET[remaining % VALUE_ALPHABET.length] + token;
    remaining = Math.floor(remaining / VALUE_ALPHABET.length);
  }
  if (remaining > 0) throw new Error("Pattern code value exceeds token width.");
  return token;
}

function decodeFixedValue(token) {
  let value = 0;
  for (const char of token) {
    const digit = VALUE_ALPHABET.indexOf(char);
    if (digit < 0) throw new Error("Pattern code contains an invalid value token.");
    value = value * VALUE_ALPHABET.length + digit;
  }
  return value;
}

function normalizeDimension(value, fallback = 0) {
  const normalized = Number.parseInt(value, 10);
  return Number.isFinite(normalized) && normalized > 0 ? normalized : fallback;
}

function rowToCells(row) {
  return Array.isArray(row) ? row.slice() : Array.from(String(row || ""));
}

function patternDimensions(pattern) {
  const rows = Array.isArray(pattern?.rows) ? pattern.rows : [];
  const firstRowWidth = rows.length ? rowToCells(rows[0]).length : 0;
  const width = normalizeDimension(pattern?.width, normalizeDimension(pattern?.size, firstRowWidth));
  const height = normalizeDimension(pattern?.height, normalizeDimension(pattern?.size, rows.length));
  if (!width || !height || !rows.length) throw new Error("Pattern code needs a non-empty pattern.");
  if (width !== height) throw new Error("Pattern code currently supports square patterns only.");
  if (rows.length !== height) throw new Error("Pattern row count does not match pattern height.");
  rows.forEach((row) => {
    if (rowToCells(row).length !== width) {
      throw new Error("Pattern row width does not match pattern width.");
    }
  });
  return { width, height, rows };
}

function cellToMardCode(cell) {
  if (!cell || cell === EMPTY_CELL) return null;
  if (palette[cell]) {
    const beadId = beadIds[cell];
    if (!beadId) throw new Error(`Pattern colour ${cell} has no MARD bead id.`);
    return normalizeMardCode(beadId);
  }
  const normalized = normalizeMardCode(cell);
  const workshopCode = workshopCodeForMard(normalized);
  if (palette[workshopCode]) return normalized;
  throw new Error(`Pattern colour ${cell} is not available in the palette.`);
}

function mardCodeToCell(code) {
  const normalized = normalizeMardCode(code);
  const workshopCode = workshopCodeForMard(normalized);
  if (!palette[workshopCode]) throw new Error(`Pattern code colour ${normalized} is not available.`);
  return workshopCode;
}

function encodeRuns(values, paletteSize) {
  if (!values.length) return "";
  const width = valueTokenWidth(paletteSize);
  const runs = [];
  let current = values[0];
  let count = 1;
  const pushRun = () => {
    runs.push(`${count.toString(36).toUpperCase()}${encodeFixedValue(current, width)}`);
  };
  for (let i = 1; i < values.length; i += 1) {
    if (values[i] === current) {
      count += 1;
    } else {
      pushRun();
      current = values[i];
      count = 1;
    }
  }
  pushRun();
  return runs.join(RUN_SEPARATOR);
}

function decodeRuns(runText, paletteSize, expectedLength) {
  if (!runText) throw new Error("Pattern code is missing cell data.");
  const width = valueTokenWidth(paletteSize);
  const values = [];
  runText.split(RUN_SEPARATOR).forEach((token) => {
    if (token.length <= width) throw new Error("Pattern code contains an invalid run.");
    const count = Number.parseInt(token.slice(0, -width), 36);
    const value = decodeFixedValue(token.slice(-width));
    if (!Number.isFinite(count) || count <= 0) throw new Error("Pattern code contains an invalid run length.");
    if (value > paletteSize) throw new Error("Pattern code references a missing colour.");
    if (values.length + count > expectedLength) throw new Error("Pattern code has too many cells.");
    for (let i = 0; i < count; i += 1) values.push(value);
  });
  if (values.length !== expectedLength) throw new Error("Pattern code cell count does not match its size.");
  return values;
}

export function extractPatternCode(text) {
  const source = String(text || "").trim();
  const match = source.match(/\bBEAM1:[^\s，。；;]+/);
  return match ? match[0].replace(/[,.!?！？、，。]+$/, "") : "";
}

export function encodePatternCode(pattern) {
  const { width, height, rows } = patternDimensions(pattern);
  const paletteCodes = [];
  const paletteIndex = new Map();
  const values = [];
  rows.forEach((row) => {
    rowToCells(row).forEach((cell) => {
      const mardCode = cellToMardCode(cell);
      if (!mardCode) {
        values.push(0);
        return;
      }
      if (!paletteIndex.has(mardCode)) {
        paletteCodes.push(mardCode);
        paletteIndex.set(mardCode, paletteCodes.length);
      }
      values.push(paletteIndex.get(mardCode));
    });
  });
  const paletteText = paletteCodes.length ? paletteCodes.join(PALETTE_SEPARATOR) : EMPTY_PALETTE;
  return [
    PATTERN_CODE_PREFIX,
    `${width}x${height}`,
    paletteText,
    encodeRuns(values, paletteCodes.length),
  ].join(":");
}

export function decodePatternCode(input, options = {}) {
  const code = extractPatternCode(input) || String(input || "").trim();
  const parts = code.split(":");
  if (parts.length !== 4 || parts[0] !== PATTERN_CODE_PREFIX) {
    throw new Error("Pattern code must start with BEAM1.");
  }
  const sizeMatch = parts[1].match(/^(\d+)x(\d+)$/);
  if (!sizeMatch) throw new Error("Pattern code has an invalid size.");
  const width = Number.parseInt(sizeMatch[1], 10);
  const height = Number.parseInt(sizeMatch[2], 10);
  if (!width || !height || width !== height) {
    throw new Error("Pattern code currently supports square patterns only.");
  }
  const paletteCodes = parts[2] === EMPTY_PALETTE
    ? []
    : parts[2].split(PALETTE_SEPARATOR).map(normalizeMardCode);
  const values = decodeRuns(parts[3], paletteCodes.length, width * height);
  const rows = [];
  for (let y = 0; y < height; y += 1) {
    let row = "";
    for (let x = 0; x < width; x += 1) {
      const value = values[y * width + x];
      row += value === 0 ? EMPTY_CELL : mardCodeToCell(paletteCodes[value - 1]);
    }
    rows.push(row);
  }
  return {
    id: options.id || "shared-pattern",
    name: options.name || "分享图纸",
    size: width,
    width,
    height,
    craft: options.craft || "钥匙扣",
    rows,
    note: "",
    sourceFormat: PATTERN_CODE_PREFIX,
    mardPalette: paletteCodes,
  };
}

