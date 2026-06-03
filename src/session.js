import { patterns } from './patterns-data.js';
import { state } from './state.js';
import { sessionKey } from './constants.js';
import { palette } from './palette.js';
import { baseIdFor, invalidatePlacedCounts, normalizePatternSize, resizePattern } from './pattern.js';

const sessionVersion = 2;
const restorablePhases = new Set(["place", "inspect", "iron", "cool", "finish"]);

const sessionActions = {
  loadPattern: () => {},
  setPhase: () => {},
};

export function setSessionActions(actions = {}) {
  Object.assign(sessionActions, actions);
}

let autoSaveTimer = 0;

function hasValidPlacedCells(placed) {
  return Array.isArray(placed) && placed.some((code) => Boolean(code && palette[code]));
}

function hasBoardProgress(source) {
  return Boolean(
    hasValidPlacedCells(source.placed) ||
    source.spill ||
    (Array.isArray(source.heat) && source.heat.some((value) => Number(value) > 0)) ||
    source.cooling > 0
  );
}

function clearStoredSession() {
  try {
    localStorage.removeItem(sessionKey);
  } catch {
    // Ignore storage failures.
  }
}

export function clearAutoSave() {
  window.clearTimeout(autoSaveTimer);
  clearStoredSession();
}

function normalizePlaced(placed, total) {
  if (!Array.isArray(placed)) return Array(total).fill(null);
  return Array.from({ length: total }, (_, index) => {
    const code = placed[index];
    return code && palette[code] ? code : null;
  });
}

function normalizeHeat(heat, total) {
  if (!Array.isArray(heat)) return Array(total).fill(0);
  return Array.from({ length: total }, (_, index) => Number(heat[index]) || 0);
}

function snapshotCustomPattern(pattern) {
  if (!pattern || !baseIdFor(pattern).startsWith("custom-")) return null;
  return {
    kind: "custom-pattern",
    id: baseIdFor(pattern),
    name: pattern.name,
    size: pattern.size,
    width: pattern.width,
    height: pattern.height,
    craft: pattern.craft,
    rows: pattern.rows,
    sourceRows: pattern.sourceRows,
    sourceSize: pattern.sourceSize,
    sourceWidth: pattern.sourceWidth,
    sourceHeight: pattern.sourceHeight,
    sourceRemoveWhite: pattern.sourceRemoveWhite,
    sourceDenoiseLevel: pattern.sourceDenoiseLevel,
    conversionStats: pattern.conversionStats,
    note: pattern.note,
  };
}

function normalizeRows(rows, size) {
  if (!Array.isArray(rows) || rows.length !== size) return null;
  const normalized = rows.map((row) => String(row || "").slice(0, size).padEnd(size, "."));
  const valid = normalized.every((row) => row.length === size && [...row].every((code) => code === "." || palette[code]));
  return valid ? normalized : null;
}

function restoreCustomPattern(snapshot) {
  if (!snapshot || !snapshot.size) return null;
  const size = normalizePatternSize(snapshot.size);
  const rows = normalizeRows(snapshot.rows, size);
  if (!rows) return null;
  const sourceSize = normalizePatternSize(snapshot.sourceSize || size);
  const sourceRows = normalizeRows(snapshot.sourceRows || rows, sourceSize) || rows;
  const pattern = {
    ...snapshot,
    id: snapshot.id || "custom-session",
    name: snapshot.name || "自定义图纸",
    craft: snapshot.craft || "原版",
    size,
    rows,
    sourceRows,
    sourceSize,
  };
  for (let i = patterns.length - 1; i >= 0; i -= 1) {
    if (patterns[i].id.startsWith("custom-")) patterns.splice(i, 1);
  }
  patterns.unshift(pattern);
  state.patternsDirty = true;
  return pattern;
}

function findStoredPattern(id) {
  const storedId = String(id || "");
  const fallbackId = storedId.replace(/-\d+$/, "");
  return patterns.find((pattern) => pattern.id === storedId || pattern.id === fallbackId) || null;
}

function captureSession() {
  const patternSize = state.selectedPattern?.size || state.patternSize;
  return {
    version: sessionVersion,
    phase: state.phase,
    sandboxMode: state.sandboxMode,
    selectedPatternId: state.selectedPattern ? baseIdFor(state.selectedPattern) : null,
    customPattern: snapshotCustomPattern(state.selectedPattern),
    patternColorMaps: state.patternColorMaps,
    patternSize,
    placed: state.placed,
    heat: state.heat,
    tool: state.tool,
    trayColor: state.trayColor,
    trayBeans: state.trayBeans,
    trayMatrix: state.trayMatrix,
    tweezerBead: state.tweezerBead,
    needleLoaded: state.needleLoaded,
    errors: state.errors,
    warp: state.warp,
    cooling: state.cooling,
    spill: state.spill,
  };
}

export function autoSave() {
  if (state.phase === "choose" || !hasBoardProgress(state)) {
    clearStoredSession();
    return false;
  }
  try {
    localStorage.setItem(sessionKey, JSON.stringify(captureSession()));
    return true;
  } catch {
    // Ignore quota / storage failures.
    return false;
  }
}

export function scheduleAutoSave(delay = 550) {
  window.clearTimeout(autoSaveTimer);
  autoSaveTimer = window.setTimeout(autoSave, delay);
}

export function flushAutoSave() {
  window.clearTimeout(autoSaveTimer);
  return autoSave();
}

export function loadAutoSave() {
  try {
    const data = localStorage.getItem(sessionKey);
    if (!data) return false;
    const session = JSON.parse(data);
    if (!session || !restorablePhases.has(session.phase) || !hasBoardProgress(session)) {
      clearStoredSession();
      return false;
    }

    const pattern = restoreCustomPattern(session.customPattern) || findStoredPattern(session.selectedPatternId);
    if (!pattern) {
      clearStoredSession();
      return false;
    }

    if (session.patternColorMaps && typeof session.patternColorMaps === "object") state.patternColorMaps = session.patternColorMaps;
    if (session.patternSize) state.patternSize = normalizePatternSize(session.patternSize);
    const restoredPattern = resizePattern(pattern, state.patternSize);

    sessionActions.loadPattern(restoredPattern, true);

    state.phase = session.phase;
    state.sandboxMode = session.sandboxMode;
    state.patternSize = restoredPattern.size;
    const total = restoredPattern.size * restoredPattern.size;
    state.placed = normalizePlaced(session.placed, total);
    invalidatePlacedCounts();
    state.heat = normalizeHeat(session.heat, total);
    state.tool = session.tool || "needle";
    state.trayColor = session.trayColor || null;
    state.trayBeans = ~~session.trayBeans;
    state.trayMatrix = session.trayMatrix || [];
    state.tweezerBead = session.tweezerBead || null;
    state.needleLoaded = ~~session.needleLoaded;
    state.errors = session.errors || [];
    state.warp = session.warp || 18;
    state.cooling = session.cooling || 0;
    state.spill = session.spill || null;

    sessionActions.setPhase(state.phase);
    return true;
  } catch {
    return false;
  }
}
