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

function normalizePatternSizeFromSession(value, fallback) {
  if (value === undefined || value === null) return normalizePatternSize(fallback);
  const parsed = Number.parseInt(value, 10);
  if (!Number.isFinite(parsed)) return null;
  return normalizePatternSize(parsed);
}

function normalizeSpill(spill, total = Number.MAX_SAFE_INTEGER) {
  if (!spill || typeof spill !== "object") return null;
  const index = Number(spill.index);
  const code = spill.code;
  if (!Number.isInteger(index) || index < 0 || index >= total) return null;
  if (!code || !palette[code]) return null;
  return {
    ...spill,
    index,
    code,
  };
}

function normalizeTrayMatrix(matrix) {
  if (!Array.isArray(matrix)) return [];
  return matrix
    .filter((row) => Array.isArray(row))
    .map((row) => row.map(Boolean));
}

function normalizeBoardView(boardView) {
  if (!boardView || typeof boardView !== "object") return { scale: 1, panX: 0, panY: 0 };
  return {
    scale: Number(boardView.scale) || 1,
    panX: Number(boardView.panX) || 0,
    panY: Number(boardView.panY) || 0,
  };
}

function normalizeToolPose(toolPose) {
  if (!toolPose || typeof toolPose !== "object") return { x: 0, y: 0, visible: false };
  return {
    x: Number(toolPose.x) || 0,
    y: Number(toolPose.y) || 0,
    visible: Boolean(toolPose.visible),
  };
}

function normalizeMoveDir(dir) {
  if (!dir || typeof dir !== "object") return { x: 1, y: 0 };
  const x = Math.sign(Number(dir.x) || 0);
  const y = Math.sign(Number(dir.y) || 0);
  return x || y ? { x, y } : { x: 1, y: 0 };
}

function snapshotCustomPattern(pattern) {
  if (!pattern || !baseIdFor(pattern).startsWith("custom-")) return null;
  return {
    kind: "custom-pattern",
    sourceKind: pattern.sourceImageDataUrl ? "image" : "rows",
    sourceWasImage: Boolean(pattern.sourceImageDataUrl),
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

function isSupportedSessionVersion(version) {
  if (version === undefined || version === null) return true;
  return Number.isInteger(version) && version > 0 && version <= sessionVersion;
}

function captureSession() {
  const patternSize = state.selectedPattern?.size || state.patternSize;
  return {
    version: sessionVersion,
    phase: state.phase,
    sandboxMode: state.sandboxMode,
    lampOn: state.lampOn,
    selectedPatternId: state.selectedPattern ? baseIdFor(state.selectedPattern) : null,
    customPattern: snapshotCustomPattern(state.selectedPattern),
    patternColorMaps: state.patternColorMaps,
    patternHiddenSources: state.patternHiddenSources,
    patternSize,
    placed: state.placed,
    heat: state.heat,
    tool: state.tool,
    selectedColor: state.selectedColor,
    trayColor: state.trayColor,
    trayProgress: state.trayProgress,
    trayBeans: state.trayBeans,
    trayCapacity: state.trayCapacity,
    trayMatrix: state.trayMatrix,
    trayPourId: state.trayPourId,
    tweezerBead: state.tweezerBead,
    needleLoaded: state.needleLoaded,
    toolPose: state.toolPose,
    lastMoveDir: state.lastMoveDir,
    errors: state.errors,
    warp: state.warp,
    cooling: state.cooling,
    spill: state.spill,
    boardView: {
      scale: state.boardView.scale,
      panX: state.boardView.panX,
      panY: state.boardView.panY,
    },
  };
}

export function autoSave() {
  if (state.phase === "choose") {
    clearStoredSession();
    return false;
  }
  if (!restorablePhases.has(state.phase) || !state.selectedPattern) return false;
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
    if (
      !session ||
      !isSupportedSessionVersion(session.version) ||
      !restorablePhases.has(session.phase)
    ) {
      clearStoredSession();
      return false;
    }

    const pattern = restoreCustomPattern(session.customPattern) || findStoredPattern(session.selectedPatternId);
    if (!pattern) {
      clearStoredSession();
      return false;
    }

    if (session.patternColorMaps && typeof session.patternColorMaps === "object") state.patternColorMaps = session.patternColorMaps;
    if (session.patternHiddenSources && typeof session.patternHiddenSources === "object") state.patternHiddenSources = session.patternHiddenSources;
    const restoredSize = normalizePatternSizeFromSession(session.patternSize, pattern.size);
    if (!restoredSize) {
      clearStoredSession();
      return false;
    }
    state.patternSize = restoredSize;
    const restoredPattern = resizePattern(pattern, state.patternSize);

    sessionActions.loadPattern(restoredPattern, true);

    state.phase = session.phase;
    state.sandboxMode = session.sandboxMode;
    state.lampOn = Boolean(session.lampOn);
    state.patternSize = restoredPattern.size;
    const total = restoredPattern.size * restoredPattern.size;
    state.placed = normalizePlaced(session.placed, total);
    invalidatePlacedCounts();
    state.heat = normalizeHeat(session.heat, total);
    const spill = normalizeSpill(session.spill, total);
    state.tool = session.tool === "tweezers" ? "tweezers" : "needle";
    state.selectedColor = session.selectedColor && palette[session.selectedColor] ? session.selectedColor : state.selectedColor;
    state.trayColor = session.trayColor && palette[session.trayColor] ? session.trayColor : null;
    state.trayProgress = Math.max(0, Number(session.trayProgress) || 0);
    state.trayBeans = Math.max(0, Number(session.trayBeans) || 0);
    state.trayCapacity = Math.max(0, Number(session.trayCapacity) || 0);
    state.trayMatrix = normalizeTrayMatrix(session.trayMatrix);
    state.trayPourId = Math.max(0, Number(session.trayPourId) || 0);
    state.tweezerBead = session.tweezerBead && palette[session.tweezerBead] ? session.tweezerBead : null;
    state.needleLoaded = Math.max(0, Number(session.needleLoaded) || 0);
    state.toolPose = normalizeToolPose(session.toolPose);
    state.lastMoveDir = normalizeMoveDir(session.lastMoveDir);
    state.errors = session.errors || [];
    state.warp = session.warp || 18;
    state.cooling = session.cooling || 0;
    state.spill = spill;
    state.boardView = {
      ...state.boardView,
      ...normalizeBoardView(session.boardView),
    };

    sessionActions.setPhase(state.phase);
    return true;
  } catch {
    clearStoredSession();
    return false;
  }
}
