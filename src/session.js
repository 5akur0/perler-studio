import { patterns } from './patterns-data.js';
import { upsertPoolPattern } from './pattern-library.js';
import { state } from './state.js';
import { sessionKey, BOARD_SIZE } from './constants.js';
import { palette } from './palette.js';
import { baseIdFor, boardCols, boardRows, invalidatePatternDataCaches, invalidatePlacedCounts, normalizePatternSize, resizePattern } from './pattern.js';
import { buildElapsedMs, setBuildElapsedMs } from './build-timer.js';

const sessionVersion = 2;
const restorablePhases = new Set(["place", "inspect", "iron", "cool", "finish"]);

const sessionActions = {
  loadPattern: () => {},
  setPhase: () => {},
};

export function setSessionActions(actions = {}) {
  Object.assign(sessionActions, actions);
}

function clearStoredSession() {
  try {
    localStorage.removeItem(sessionKey);
  } catch {
    // Ignore storage failures.
  }
}

export function clearAutoSave() {
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

// Center a square grid of row strings onto a board of `toSize`, padding or
// cropping the margin with empty pegs ('.'). Used to fit a legacy custom
// pattern (authored at a different stride) onto the fixed board.
function regridRows(rows, fromSize, toSize) {
  if (!Array.isArray(rows)) return null;
  const offset = Math.floor((toSize - fromSize) / 2);
  const out = [];
  for (let ty = 0; ty < toSize; ty += 1) {
    const sy = ty - offset;
    let line = "";
    for (let tx = 0; tx < toSize; tx += 1) {
      const sx = tx - offset;
      const code = sy >= 0 && sy < fromSize && sx >= 0 && sx < fromSize ? rows[sy]?.[sx] : ".";
      line += code && code !== "." ? code : ".";
    }
    out.push(line);
  }
  return out;
}

// Top-left pad/crop a square grid of row strings to new board dimensions.
function padGridTo(oldRows, oldW, oldH, newW, newH) {
  const out = [];
  for (let y = 0; y < newH; y += 1) {
    let line = "";
    for (let x = 0; x < newW; x += 1) {
      line += y < oldH && x < oldW ? (oldRows[y]?.[x] || ".") : ".";
    }
    out.push(line);
  }
  return out;
}

// Re-apply a saved board's exact dimensions (and rows, if stored) to a resolved
// pattern, so a grown multi-tile board survives save/restore.
function applyBoardGeometry(pattern, session) {
  const bw = Number.parseInt(session.boardWidth, 10);
  const bh = Number.parseInt(session.boardHeight, 10);
  if (!Number.isFinite(bw) || !Number.isFinite(bh) || bw <= 0 || bh <= 0) return;
  if (bw === boardCols(pattern) && bh === boardRows(pattern)) return;
  let rows = null;
  if (Array.isArray(session.boardRows) && session.boardRows.length === bh) {
    const candidate = session.boardRows.map((r) => String(r || "").slice(0, bw).padEnd(bw, "."));
    if (candidate.every((r) => [...r].every((c) => c === "." || palette[c]))) rows = candidate;
  }
  if (!rows) rows = padGridTo(pattern.rows || [], boardCols(pattern), boardRows(pattern), bw, bh);
  pattern.rows = rows;
  pattern.sourceRows = rows;
  pattern.width = bw;
  pattern.height = bh;
  pattern.size = Math.max(bw, bh);
  pattern.sourceSize = pattern.size;
  invalidatePatternDataCaches(pattern);
}

// Re-grid a square cell array from one board stride to another, centering the
// old content (mirrors how seeds are center-padded to the fixed board). Lets a
// legacy in-progress work survive the move to the fixed 30×30 board aligned.
function regridSquare(arr, fromSize, toSize, fill) {
  const out = Array(toSize * toSize).fill(fill);
  if (!Array.isArray(arr)) return out;
  const offset = Math.floor((toSize - fromSize) / 2);
  for (let y = 0; y < fromSize; y += 1) {
    const ty = y + offset;
    if (ty < 0 || ty >= toSize) continue;
    for (let x = 0; x < fromSize; x += 1) {
      const tx = x + offset;
      if (tx < 0 || tx >= toSize) continue;
      out[ty * toSize + tx] = arr[y * fromSize + x];
    }
  }
  return out;
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
  const scale = Number(boardView.scale);
  const panX = Number(boardView.panX);
  const panY = Number(boardView.panY);
  return {
    scale: Number.isFinite(scale) && scale > 0 ? Math.min(scale, 8) : 1,
    panX: Number.isFinite(panX) ? panX : 0,
    panY: Number.isFinite(panY) ? panY : 0,
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

function normalizeRectRows(rows, width, height) {
  if (!Array.isArray(rows) || rows.length !== height) return null;
  const normalized = rows.map((row) => String(row || "").slice(0, width).padEnd(width, "."));
  const valid = normalized.every((row) => row.length === width && [...row].every((code) => code === "." || palette[code]));
  return valid ? normalized : null;
}

function restoreCustomPattern(snapshot) {
  if (!snapshot || !snapshot.size) return null;
  const savedWidth = Number.parseInt(snapshot.width, 10);
  const savedHeight = Number.parseInt(snapshot.height, 10);
  const isBoardLayout = Number.isFinite(savedWidth)
    && Number.isFinite(savedHeight)
    && savedWidth >= BOARD_SIZE
    && savedHeight >= BOARD_SIZE
    && savedWidth % BOARD_SIZE === 0
    && savedHeight % BOARD_SIZE === 0;
  if (isBoardLayout) {
    const rows = normalizeRectRows(snapshot.rows, savedWidth, savedHeight);
    if (!rows) return null;
    const pattern = {
      ...snapshot,
      id: snapshot.id || "custom-session",
      name: snapshot.name || "自定义图纸",
      craft: snapshot.craft || "原版",
      size: Math.max(savedWidth, savedHeight),
      width: savedWidth,
      height: savedHeight,
      rows,
      sourceRows: rows,
      sourceSize: Math.max(savedWidth, savedHeight),
      sourceWidth: savedWidth,
      sourceHeight: savedHeight,
    };
    // The restored work-in-progress pattern only needs to be findable in the
    // pool; it must NOT wipe or get persisted into the 图纸库.
    upsertPoolPattern(pattern);
    state.patternsDirty = true;
    return pattern;
  }
  const size = normalizePatternSize(); // fixed board
  // Fit saved rows onto the fixed board, center-remapping a legacy stride.
  const fitRows = (src, fromValue) => {
    if (!Array.isArray(src)) return null;
    const direct = normalizeRows(src, size);
    if (direct) return direct;
    const fromSize = Number.parseInt(fromValue, 10);
    if (Number.isFinite(fromSize) && fromSize > 0 && fromSize !== size) {
      return normalizeRows(regridRows(src, fromSize, size), size);
    }
    return null;
  };
  const rows = fitRows(snapshot.rows, snapshot.size);
  if (!rows) return null;
  const sourceRows = fitRows(snapshot.sourceRows || snapshot.rows, snapshot.sourceSize || snapshot.size) || rows;
  const pattern = {
    ...snapshot,
    id: snapshot.id || "custom-session",
    name: snapshot.name || "自定义图纸",
    craft: snapshot.craft || "原版",
    size,
    width: size,
    height: size,
    rows,
    sourceRows,
    sourceSize: size,
  };
  upsertPoolPattern(pattern);
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
    buildMs: buildElapsedMs(),
    sandboxMode: state.sandboxMode,
    lampOn: state.lampOn,
    selectedPatternId: state.selectedPattern ? baseIdFor(state.selectedPattern) : null,
    customPattern: snapshotCustomPattern(state.selectedPattern),
    patternColorMaps: state.patternColorMaps,
    patternSize,
    boardWidth: boardCols(state.selectedPattern),
    boardHeight: boardRows(state.selectedPattern),
    // Stored only for grown multi-tile boards so they restore exactly.
    boardRows: (boardCols(state.selectedPattern) !== boardRows(state.selectedPattern)
      || boardCols(state.selectedPattern) > BOARD_SIZE
      || boardRows(state.selectedPattern) > BOARD_SIZE)
      ? state.selectedPattern?.rows
      : undefined,
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
    clearStoredSession();
    return false;
  }
}

// Persist the current in-progress work to the restore slot immediately. Called
// only at exit boundaries (leaving to home, tab hide/close) — never per edit.
export function flushAutoSave() {
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
    // Old saves may carry patternHiddenSources (hidden-color feature removed) — silently ignore.
    const restoredSize = normalizePatternSizeFromSession(session.patternSize, pattern.size);
    if (!restoredSize) {
      clearStoredSession();
      return false;
    }
    state.patternSize = restoredSize;
    const restoredPattern = resizePattern(pattern, state.patternSize);
    // Restore a grown (multi-tile) board: re-apply its exact dimensions and rows.
    applyBoardGeometry(restoredPattern, session);

    sessionActions.loadPattern(restoredPattern, true);

    state.phase = session.phase;
    state.sandboxMode = Boolean(session.sandboxMode);
    state.lampOn = Boolean(session.lampOn);
    state.patternSize = restoredPattern.size;
    const cols = boardCols(restoredPattern);
    const rows = boardRows(restoredPattern);
    const total = cols * rows;
    // A legacy square save from a different stride is center-remapped; a grown
    // board restores exactly via geometry above. Transient errors/spill drop.
    const savedSize = Number.parseInt(session.patternSize, 10);
    const isGrown = cols !== rows || cols > BOARD_SIZE || rows > BOARD_SIZE;
    const needRegrid = !isGrown && Number.isFinite(savedSize) && savedSize > 0 && savedSize !== cols;
    const placedSource = needRegrid ? regridSquare(session.placed, savedSize, cols, null) : session.placed;
    const heatSource = needRegrid ? regridSquare(session.heat, savedSize, cols, 0) : session.heat;
    state.placed = normalizePlaced(placedSource, total);
    invalidatePlacedCounts();
    state.heat = normalizeHeat(heatSource, total);
    const spill = needRegrid ? null : normalizeSpill(session.spill, total);
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
    state.errors = needRegrid ? [] : (session.errors || []);
    state.warp = session.warp || 18;
    state.cooling = session.cooling || 0;
    // Restore the accumulated build time (loadPattern above reset it to 0).
    setBuildElapsedMs(Number(session.buildMs) || 0);
    state.buildMs = buildElapsedMs();
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
