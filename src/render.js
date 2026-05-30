import { state } from './state.js';
import { sceneCanvas, scene, previewCanvas, preview, sideReferenceCtx, els } from './dom.js';
import { palette, beadIds } from './palette.js';
import {
  phases, backgroundThemes, toolStyles, craftOptions,
  TRAY_DESKTOP_ROWS, TRAY_DESKTOP_COLS, TRAY_MOBILE_ROWS, TRAY_MOBILE_COLS,
  collectionLimit, conceptAchievement, fullBoardAchievement,
} from './constants.js';
import { clamp, lerp, easeOut, mixColor } from './color-utils.js';
import { currentBackgroundTheme, currentToolStyle } from './theme.js';
import {
  targetAt, indexFor, getEffectiveTargetRows, getTargetCounts, getTargetTotal,
  beadLabel, getPatternColors, getPlacedCounts, baseIdFor, getPatternColorMap,
} from './pattern.js';

export function useMobileTrayGrid() {
  return window.matchMedia("(max-width: 860px)").matches;
}

export function useMobileDirectPlacement() {
  return window.matchMedia("(max-width: 860px)").matches;
}

// True on any touch-primary device (phone + tablet); false on mouse/trackpad desktop.
export function isTouchDevice() {
  return window.matchMedia("(hover: none) and (pointer: coarse)").matches;
}

export function maxBoardScale() {
  // Touch devices (phone + tablet) benefit from a higher ceiling for close-up work.
  return isTouchDevice() ? 6 : 2.8;
}

export function shouldShowTray(layout = currentLayout()) {
  return !useMobileDirectPlacement() && layout.trayW > 0 && layout.trayH > 0;
}

export function trayDimensions() {
  return useMobileTrayGrid()
    ? { rows: TRAY_MOBILE_ROWS, cols: TRAY_MOBILE_COLS }
    : { rows: TRAY_DESKTOP_ROWS, cols: TRAY_DESKTOP_COLS };
}

export function traySlotCapacity() {
  const { rows, cols } = trayDimensions();
  return rows * cols;
}

export function makeTrayMatrix(count = 0, rowsOverride = null, colsOverride = null) {
  const rows = rowsOverride ?? trayDimensions().rows;
  const cols = colsOverride ?? trayDimensions().cols;
  const matrix = Array.from({ length: rows }, () => Array(cols).fill(false));
  let left = clamp(count, 0, rows * cols);
  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      if (left <= 0) break;
      matrix[row][col] = true;
      left -= 1;
    }
  }
  return matrix;
}

export function makeTraySeeds(code, amount = null) {
  const needed = getTargetCounts()[code] || 12;
  const count = clamp(amount ?? (needed + 14), 8, traySlotCapacity());
  return Array.from({ length: count }, (_, i) => ({
    sx: pseudoRandom(`${state.selectedPattern.id}-${code}-${i}-x`),
    sy: pseudoRandom(`${state.selectedPattern.id}-${code}-${i}-y`),
    wobble: pseudoRandom(`${state.selectedPattern.id}-${code}-${i}-w`) * Math.PI * 2,
  }));
}

export function syncTrayMatrixShape() {
  const { rows, cols } = trayDimensions();
  const matrix = state.trayMatrix || [];
  const sameRows = matrix.length === rows;
  const sameCols = sameRows && matrix.every((row) => row.length === cols);
  if (sameCols) return;
  const count = matrix.reduce((sum, row) => sum + row.filter(Boolean).length, 0);
  state.trayMatrix = makeTrayMatrix(count, rows, cols);
  state.trayBeans = countTrayBeans();
}

export function countTrayBeans() {
  return state.trayMatrix.reduce((sum, row) => sum + row.filter(Boolean).length, 0);
}

export function syncTrayBeans() {
  state.trayBeans = countTrayBeans();
}

export function trayGeometry(layout, compact = false) {
  const { rows, cols } = trayDimensions();
  const inset = compact ? 18 : 24;
  const slotGap = (layout.trayH - inset * 2) / rows;
  const lineStartX = layout.trayX + 22;
  const lineEndX = layout.trayX + layout.trayW - 24;
  const startY = layout.trayY + inset + slotGap * 0.5;
  const startX = lineStartX + 10;
  const endX = lineEndX - 10;
  const stepX = cols > 1 ? (endX - startX) / (cols - 1) : 0;
  const stepY = slotGap;
  const beadR = clamp(Math.min(stepX * 0.41, slotGap * 0.25), 4.9, compact ? 8.2 : 9.3);
  return { rows, cols, inset, slotGap, lineStartX, lineEndX, startX, startY, endX, stepX, stepY, beadR };
}

export function trayCellCenter(layout, row, col, compact = false) {
  const g = trayGeometry(layout, compact);
  return {
    x: g.startX + col * g.stepX,
    y: g.startY + row * g.stepY,
    r: g.beadR,
  };
}

export function trayCellFromPoint(x, y, compact = false) {
  if (!pointInTray(x, y)) return null;
  const g = trayGeometry(currentLayout(), compact);
  const row = clamp(Math.round((y - g.startY) / Math.max(1, g.stepY)), 0, g.rows - 1);
  const col = clamp(Math.round((x - g.startX) / Math.max(1, g.stepX)), 0, g.cols - 1);
  const center = trayCellCenter(currentLayout(), row, col, compact);
  const maxDist = Math.max(g.stepX, g.stepY) * 0.62;
  if (Math.hypot(x - center.x, y - center.y) > maxDist) return null;
  return { row, col };
}

export function trayRowFromPoint(x, y, compact = false) {
  if (!pointInTray(x, y)) return null;
  const g = trayGeometry(currentLayout(), compact);
  return clamp(Math.round((y - g.startY) / Math.max(1, g.stepY)), 0, g.rows - 1);
}

export function needleCapacity() {
  return 12;
}

export function calcTrayFillAmount(code = state.selectedColor) {
  return traySlotCapacity();
}

export function pseudoRandom(seed) {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i += 1) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  h += h << 13;
  h ^= h >>> 7;
  h += h << 3;
  h ^= h >>> 17;
  h += h << 5;
  return ((h >>> 0) % 10000) / 10000;
}
// Autosave is owned by main.js (persistence layer). main.js injects it via
// setAutoSaveHook so render.js stays free of a main.js dependency.
let autoSaveHook = null;
export function setAutoSaveHook(fn) {
  autoSaveHook = fn;
}
export function markCanvasDirty(save = false) {
  state.renderDirty = true;
  if (save) autoSaveHook?.();
}
export function markDirty() {
  state.renderDirty = true;
  state.uiDirty = true;
  autoSaveHook?.();
}
// Quantize the canvas bounding rect so 1–2 px wiggles (e.g. from right-panel
 // content changing height between place↔inspect) don't recompute boardSize
 // and make the board visibly resize between phases.
export function quantizedCanvasRect(rect = sceneCanvas.getBoundingClientRect()) {
  const q = 8;
  return {
    width: Math.floor(rect.width / q) * q,
    height: Math.floor(rect.height / q) * q,
  };
}

export let _layoutCache = null;
export let _layoutCacheKey = "";
export function invalidateLayoutCache() {
  _layoutCache = null;
}

export function currentLayout(canvasRect = null) {
  const rect = quantizedCanvasRect(canvasRect || sceneCanvas.getBoundingClientRect());
  const key = `${rect.width}x${rect.height}:${state.selectedPattern.size}`;
  if (_layoutCache && _layoutCacheKey === key) return _layoutCache;
  _layoutCache = computeLayout(rect);
  _layoutCacheKey = key;
  return _layoutCache;
}

export function boardViewTransform(layout = currentLayout()) {
  const scale = clamp(state.boardView.scale || 1, 1, maxBoardScale());
  const extra = (layout.boardSize * scale - layout.boardSize) * 0.5;
  const basePan = isTouchDevice() ? layout.boardSize * 0.36 : 28;
  const maxPan = extra + basePan;
  const panX = clamp(state.boardView.panX || 0, -maxPan, maxPan);
  const panY = clamp(state.boardView.panY || 0, -maxPan, maxPan);
  state.boardView.scale = scale;
  state.boardView.panX = panX;
  state.boardView.panY = panY;
  const cx = layout.boardX + layout.boardSize * 0.5;
  const cy = layout.boardY + layout.boardSize * 0.5;
  return { scale, panX, panY, cx, cy };
}

export function setBoardZoom(nextScale, nextPanX = state.boardView.panX, nextPanY = state.boardView.panY) {
  state.boardView.scale = clamp(nextScale, 1, maxBoardScale());
  state.boardView.panX = nextPanX;
  state.boardView.panY = nextPanY;
  boardViewTransform();
  markCanvasDirty();
}

export function resetBoardView() {
  state.boardView.scale = 1;
  state.boardView.panX = 0;
  state.boardView.panY = 0;
  markCanvasDirty();
}

export function gesturePointerCount() {
  return Object.keys(state.gesture.pointers).length;
}

export function gesturePrimaryPair() {
  const ids = Object.keys(state.gesture.pointers);
  if (ids.length < 2) return null;
  return [state.gesture.pointers[ids[0]], state.gesture.pointers[ids[1]]];
}

export function pointerDistance(a, b) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

export function pointerMid(a, b) {
  return { x: (a.x + b.x) * 0.5, y: (a.y + b.y) * 0.5 };
}

export function startBoardGesture(p1, p2, touchActive = false) {
  const mid = pointerMid(p1, p2);
  state.gesture.active = true;
  state.gesture.touchActive = Boolean(touchActive);
  state.gesture.startDistance = Math.max(16, pointerDistance(p1, p2));
  state.gesture.startScale = state.boardView.scale;
  state.gesture.startPanX = state.boardView.panX;
  state.gesture.startPanY = state.boardView.panY;
  state.gesture.startMidX = mid.x;
  state.gesture.startMidY = mid.y;
  state.pointer.down = false;
  state.pointer.mode = "gesture";
  state.pointer.trayTapPending = false;
  state.pointer.pendingCell = null;
  markCanvasDirty();
}

export function updateBoardGesture(p1, p2) {
  const mid = pointerMid(p1, p2);
  const distance = Math.max(16, pointerDistance(p1, p2));
  const nextScale = clamp(
    state.gesture.startScale * (distance / Math.max(16, state.gesture.startDistance)),
    1,
    maxBoardScale()
  );
  // Anchor the zoom on the fingers: keep the board point that was under the
  // initial two-finger midpoint locked under the current midpoint. This makes
  // pinch feel natural (zoom toward the pinch center) and folds pure two-finger
  // panning into the same formula (when distance is unchanged).
  const layout = currentLayout();
  const cx = layout.boardX + layout.boardSize * 0.5;
  const cy = layout.boardY + layout.boardSize * 0.5;
  const startScale = Math.max(0.0001, state.gesture.startScale);
  const anchorX = (state.gesture.startMidX - cx - state.gesture.startPanX) / startScale + cx;
  const anchorY = (state.gesture.startMidY - cy - state.gesture.startPanY) / startScale + cy;
  const panX = mid.x - cx - (anchorX - cx) * nextScale;
  const panY = mid.y - cy - (anchorY - cy) * nextScale;
  setBoardZoom(nextScale, panX, panY);
}

export function touchToCanvas(touch) {
  const rect = sceneCanvas.getBoundingClientRect();
  return {
    x: touch.clientX - rect.left,
    y: touch.clientY - rect.top,
  };
}

export function computeLayout(rect) {
  const w = rect.width;
  const h = rect.height;
  if (useMobileDirectPlacement()) {
    const boardY = 16;
    const refH = clamp(Math.round(h * 0.18), 92, 124);
    const maxBoardByHeight = h - boardY - 14 - refH - 18;
    const rawBoard = clamp(maxBoardByHeight, 240, Math.min(w - 24, 468));
    const boardSize = Math.floor(rawBoard / 8) * 8;
    const boardX = Math.floor((w - boardSize) / 2);
    const refX = 12;
    const refY = boardY + boardSize + 14;
    const refW = w - 24;
    return {
      w,
      h,
      boardX,
      boardY,
      boardSize,
      cell: boardSize / state.selectedPattern.size,
      refX,
      refY,
      refW,
      refH,
      trayX: 0,
      trayY: 0,
      trayW: 0,
      trayH: 0,
    };
  }
  const boardX = 34;
  const boardY = 42;
  const trayGap = 34;       // gap between right edge of board and left edge of tray
  const trayRightMargin = 34;
  const minTrayW = 180;     // minimum tray width; board shrinks to guarantee this fits
  const maxBoardForTray = w - boardX - trayGap - minTrayW - trayRightMargin;
  const rawBoard = Math.min(h - 78, w * 0.64, 590, maxBoardForTray);
  const boardSize = Math.floor(rawBoard / 8) * 8;
  const trayX = boardX + boardSize + trayGap;
  const naturalTrayW = w - trayX - trayRightMargin;
  const trayW = Math.max(minTrayW, naturalTrayW);
  const refH = clamp(boardSize * 0.26, 130, 158);
  const trayY = boardY + refH + 16;
  return {
    w,
    h,
    boardX,
    boardY,
    boardSize,
    cell: boardSize / state.selectedPattern.size,
    refX: trayX,
    refY: boardY,
    refW: trayW,
    refH,
    trayX,
    trayY,
    trayW,
    trayH: Math.max(220, boardY + boardSize - trayY),
  };
}

export function setupHiDpiCanvas(canvas, ctx, rect = canvas.getBoundingClientRect()) {
  const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
  const width = Math.max(1, Math.round(rect.width * dpr));
  const height = Math.max(1, Math.round(rect.height * dpr));
  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width;
    canvas.height = height;
  }
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

export function render() {
  // UI (DOM) rendering is driven by the tick loop in main.js before render()
  // is called — see the uiDirty handling there. render() only paints canvases.
  const sceneRect = sceneCanvas.getBoundingClientRect();
  setupHiDpiCanvas(sceneCanvas, scene, sceneRect);
  const layout = currentLayout(sceneRect);
  scene.clearRect(0, 0, layout.w, layout.h);
  drawWorkbench(layout);
  if (state.phase !== "choose") drawFloorDrops(layout);

  if (state.phase === "choose") {
    drawChooseScene(layout);
  } else if (state.phase === "finish") {
    if (state.conceptEaster) {
      drawConceptEasterScene(layout);
    } else {
      drawFinishShowcase(layout);
      drawFinishLayer(layout);
    }
  } else {
    drawBoard(layout);
    drawReferenceSheet(layout);
    if ((state.phase === "place" || state.phase === "inspect") && shouldShowTray(layout)) {
      if (state.trayColor) syncTrayMatrixShape();
      drawTray(layout, true);
    }
    if (state.phase === "inspect") updateInspectAssistCanvases();
    if (state.phase === "iron") drawIronLayer(layout);
    if (state.phase === "cool") drawCoolingLayer(layout);
  }
  drawLampSwitch(layout);
  if (!useMobileDirectPlacement()) drawToolEntities(layout.w, layout.h);

  if (state.previewDirty) {
    drawPreview();
    state.previewDirty = false;
  }
  state.renderDirty = false;
}

export function drawWorkbench(layout) {
  const { w, h, boardX, boardY, boardSize, trayX, trayY, trayW, trayH } = layout;
  const ctx = scene;
  const theme = currentBackgroundTheme();
  ctx.save();

  // Table edge: stop the table at this Y; below it is the floor.
  const activeBottom = trayH > 0 ? Math.max(boardY + boardSize + 24, trayY + trayH + 10) : Math.max(boardY + boardSize + 24, layout.refY + layout.refH + 14);
  const matBottom = Math.min(h - 90, activeBottom);
  const tableEdgeY = Math.min(h - 18, matBottom + 30);
  const floorTop = tableEdgeY;

  // Floor (a slightly cooler shade than table)
  const floorGradient = ctx.createLinearGradient(0, floorTop, 0, h);
  floorGradient.addColorStop(0, "rgba(54, 60, 72, 0.20)");
  floorGradient.addColorStop(1, "rgba(40, 46, 56, 0.30)");
  ctx.fillStyle = floorGradient;
  ctx.fillRect(0, floorTop, w, h - floorTop);

  // Floor planks (subtle vertical seams)
  ctx.strokeStyle = "rgba(20, 24, 32, 0.10)";
  ctx.lineWidth = 1;
  for (let x = 0; x < w; x += 78) {
    ctx.beginPath();
    ctx.moveTo(x, floorTop);
    ctx.lineTo(x, h);
    ctx.stroke();
  }

  // Table
  const tableGradient = ctx.createLinearGradient(0, 0, w, floorTop);
  tableGradient.addColorStop(0, theme.table[0]);
  tableGradient.addColorStop(0.48, theme.table[1]);
  tableGradient.addColorStop(1, theme.table[2]);
  ctx.fillStyle = tableGradient;
  ctx.fillRect(0, 0, w, floorTop);

  ctx.fillStyle = "rgba(255, 255, 255, 0.26)";
  for (let y = 0; y < floorTop; y += 34) {
    ctx.fillRect(0, y, w, 1);
  }
  ctx.strokeStyle = "rgba(71, 86, 91, 0.07)";
  ctx.lineWidth = 1;
  for (let x = -floorTop; x < w; x += 42) {
    ctx.beginPath();
    ctx.moveTo(x, floorTop);
    ctx.lineTo(x + floorTop, 0);
    ctx.stroke();
  }

  // Table front edge shadow
  ctx.fillStyle = "rgba(28, 32, 40, 0.18)";
  ctx.fillRect(0, floorTop - 4, w, 4);
  ctx.fillStyle = "rgba(28, 32, 40, 0.10)";
  ctx.fillRect(0, floorTop, w, 6);

  ctx.restore();
}

export function pointInReferenceSheet(x, y) {
  const layout = currentLayout();
  return x >= layout.refX && y >= layout.refY && x <= layout.refX + layout.refW && y <= layout.refY + layout.refH;
}
export function drawFloorDrops(layout) {
  if (!state.floorDrops.length) return;
  const ctx = scene;
  const beadCell = Math.max(14, layout.cell * 0.92);
  const now = performance.now();
  const survivors = [];
  ctx.save();
  state.floorDrops.forEach((drop, i) => {
    const bornAt = typeof drop.bornAt === "number" ? drop.bornAt : now;
    const duration = Math.max(380, Number(drop.duration) || 860);
    const t = clamp((now - bornAt) / duration, 0, 1);
    if (t >= 1) return;
    survivors.push(drop);
    const jitterX = (drop.seed - 0.5) * 1.8;
    const jitterY = ((i % 3) - 1) * 0.26;
    const x = drop.x + jitterX;
    const y = drop.y + jitterY;
    const fade = 1 - t;
    const spin = (drop.spinDir || 1) * easeOut(t) * Math.PI * 1.7;
    const scale = lerp(1, 0.24, easeOut(t));
    ctx.fillStyle = `rgba(34, 38, 48, ${0.14 * fade})`;
    ctx.beginPath();
    ctx.ellipse(
      x + (drop.orientation === "v" ? 0 : 1.4),
      y + beadCell * 0.36 * scale,
      beadCell * 0.42 * scale,
      beadCell * 0.16 * scale,
      0,
      0,
      Math.PI * 2
    );
    ctx.fill();
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(spin);
    ctx.scale(scale, scale);
    ctx.globalAlpha = fade;
    drawFallenBead(ctx, 0, 0, beadCell, drop.code, drop.orientation);
    ctx.restore();
  });
  if (survivors.length !== state.floorDrops.length) {
    state.floorDrops = survivors;
  }
  ctx.restore();
}

function lampSwitchRect(layout = currentLayout()) {
  const size = clamp(layout.boardSize * 0.09, 34, 56);
  return {
    x: layout.w - size - 14,
    y: layout.h - size - 14,
    w: size,
    h: size,
  };
}

export function pointInLampSwitch(x, y) {
  if (!(state.phase === "place" || state.phase === "inspect")) return false;
  const rect = lampSwitchRect();
  return x >= rect.x && y >= rect.y && x <= rect.x + rect.w && y <= rect.y + rect.h;
}

export function drawLampSwitch(layout) {
  if (!(state.phase === "place" || state.phase === "inspect")) return;
  const ctx = scene;
  const rect = lampSwitchRect(layout);
  const cx = rect.x + rect.w / 2;
  const cy = rect.y + rect.h / 2;
  const hover = pointInLampSwitch(state.pointer.x, state.pointer.y);
  const pressed = performance.now() < state.lampSwitchFlashUntil;
  const lift = pressed ? 0.95 : 1;
  const bodyR = rect.w * 0.34 * lift;

  ctx.save();

  // Power cord runs upward from the switch and vanishes at the table top edge
  // (the lamp body is conceptually behind/above the workspace).
  const cordStartX = rect.x + rect.w * 0.5;
  const cordStartY = rect.y - 2;
  const cordEndX = layout.w - 22;
  const cordEndY = 2;
  ctx.strokeStyle = "rgba(36, 40, 50, 0.42)";
  ctx.lineWidth = 2.6;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(cordStartX, cordStartY);
  ctx.bezierCurveTo(
    cordStartX + 22, cordStartY - 50,
    cordEndX - 24, cordEndY + 80,
    cordEndX, cordEndY
  );
  ctx.stroke();
  ctx.strokeStyle = "rgba(255, 255, 255, 0.22)";
  ctx.lineWidth = 0.9;
  ctx.beginPath();
  ctx.moveTo(cordStartX, cordStartY);
  ctx.bezierCurveTo(
    cordStartX + 22, cordStartY - 50,
    cordEndX - 24, cordEndY + 80,
    cordEndX, cordEndY
  );
  ctx.stroke();
  if (state.lampOn) {
    const glow = ctx.createRadialGradient(cx, cy, bodyR * 0.5, cx, cy, rect.w * 1.45);
    glow.addColorStop(0, "rgba(255, 235, 166, 0.34)");
    glow.addColorStop(0.55, "rgba(255, 238, 184, 0.16)");
    glow.addColorStop(1, "rgba(255, 238, 184, 0)");
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(cx, cy, rect.w * 1.45, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.shadowColor = "rgba(30, 36, 44, 0.2)";
  ctx.shadowBlur = hover ? 16 : 11;
  ctx.shadowOffsetY = hover ? 5 : 4;
  const plate = ctx.createLinearGradient(rect.x, rect.y, rect.x, rect.y + rect.h);
  plate.addColorStop(0, "rgba(255,255,255,0.95)");
  plate.addColorStop(1, "rgba(228, 235, 240, 0.95)");
  ctx.fillStyle = plate;
  roundedPath(ctx, rect.x, rect.y, rect.w, rect.h, rect.w * 0.29);
  ctx.fill();
  ctx.shadowColor = "transparent";
  ctx.strokeStyle = hover ? "rgba(87, 184, 167, 0.58)" : "rgba(96, 110, 122, 0.36)";
  ctx.lineWidth = 1.2;
  roundedPath(ctx, rect.x, rect.y, rect.w, rect.h, rect.w * 0.29);
  ctx.stroke();

  const baseW = rect.w * 0.28;
  const baseH = rect.h * 0.16 * lift;
  ctx.fillStyle = "rgba(112, 121, 132, 0.85)";
  roundedPath(ctx, cx - baseW / 2, cy + rect.h * 0.09, baseW, baseH, baseH * 0.45);
  ctx.fill();

  const bulb = ctx.createRadialGradient(cx - bodyR * 0.2, cy - bodyR * 0.28, bodyR * 0.2, cx, cy, bodyR);
  bulb.addColorStop(0, state.lampOn ? "#fffdf3" : "#f8fbff");
  bulb.addColorStop(0.58, state.lampOn ? "#ffe9a8" : "#dfe7ef");
  bulb.addColorStop(1, state.lampOn ? "#efbe65" : "#bcc8d4");
  ctx.fillStyle = bulb;
  ctx.beginPath();
  ctx.arc(cx, cy - rect.h * 0.02, bodyR, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = state.lampOn ? "rgba(193, 141, 61, 0.76)" : "rgba(103, 117, 131, 0.55)";
  ctx.lineWidth = 1.2;
  ctx.stroke();

  ctx.strokeStyle = state.lampOn ? "rgba(136, 92, 38, 0.62)" : "rgba(103, 117, 131, 0.52)";
  ctx.lineWidth = 1.35;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(cx - bodyR * 0.34, cy - rect.h * 0.06);
  ctx.quadraticCurveTo(cx, cy + bodyR * 0.18, cx + bodyR * 0.34, cy - rect.h * 0.06);
  ctx.stroke();

  ctx.fillStyle = "rgba(38, 36, 43, 0.72)";
  ctx.font = "700 10px Avenir Next, PingFang SC, Hiragino Sans GB, Microsoft YaHei, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText(state.lampOn ? "ON" : "OFF", cx, rect.y + rect.h + 12);
  ctx.textAlign = "left";
  ctx.restore();
}

export function drawToolEntities(w, h) {
  if (state.phase !== "place") return;
  const ctx = scene;
  const follow = state.phase === "place" && state.toolPose.visible;
  const defaultX = w - 168;
  const defaultY = h - 172;
  const needleTipX = follow ? clamp(state.toolPose.x, 28, w - 28) : defaultX + 72;
  const needleTipY = follow ? clamp(state.toolPose.y, 148, h - 12) : defaultY + 146;
  const tweezerHeadX = follow ? clamp(state.toolPose.x, 20, w - 20) : defaultX + 46;
  const tweezerHeadY = follow ? clamp(state.toolPose.y, 30, h - 20) : defaultY + 90;
  if (state.tool === "needle") {
    drawNeedleEntityAtTip(needleTipX, needleTipY);
  } else {
    drawTweezersEntityAtHead(tweezerHeadX, tweezerHeadY);
  }
  ctx.save();
  ctx.globalAlpha = follow ? 0.46 : 0.72;
  ctx.fillStyle = "rgba(38, 36, 43, 0.62)";
  ctx.font = "700 11px Avenir Next, PingFang SC, Hiragino Sans GB, Microsoft YaHei, sans-serif";
  const infoX = follow ? clamp(state.toolPose.x - 16, 14, w - 172) : defaultX + 8;
  const infoY = follow ? clamp(state.toolPose.y - 14, 18, h - 62) : defaultY + 14;
  ctx.fillText("针", infoX, infoY);
  ctx.fillText(`镊 ${state.tweezerBead ? beadIds[state.tweezerBead] : "空"}`, infoX, infoY + 14);
  ctx.restore();
}

export function drawNeedleEntityAtTip(tipX, tipY) {
  drawNeedleEntity(tipX, tipY - 142);
}

export function drawNeedleEntity(x, y) {
  const ctx = scene;
  const loadedCode = state.trayColor || state.selectedColor;
  const cap = needleCapacity();
  const style = currentToolStyle();
  const inUse = state.phase === "place" && state.tool === "needle";
  ctx.save();
  ctx.globalAlpha = inUse ? 0.46 : 0.76;
  ctx.shadowColor = "rgba(38, 36, 43, 0.1)";
  ctx.shadowBlur = inUse ? 4 : 10;
  ctx.strokeStyle = style.primary;
  ctx.lineWidth = 5;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(x, y + 138);
  ctx.lineTo(x, y + 8);
  ctx.stroke();
  ctx.shadowColor = "transparent";
  ctx.strokeStyle = style.secondary;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(x - 2.2, y + 126);
  ctx.lineTo(x - 2.2, y + 18);
  ctx.stroke();
  ctx.fillStyle = style.secondary;
  ctx.beginPath();
  ctx.arc(x, y + 6, 6.5, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = style.primary;
  ctx.stroke();
  drawToolDecoration(ctx, x, y + 7, style);
  ctx.fillStyle = style.tip;
  ctx.beginPath();
  ctx.moveTo(x, y + 142);
  ctx.lineTo(x - 3.2, y + 132);
  ctx.lineTo(x + 3.2, y + 132);
  ctx.closePath();
  ctx.fill();
  for (let i = 0; i < cap; i += 1) {
    const by = y + 20 + i * 11.8;
    const fillStart = Math.max(0, cap - state.needleLoaded);
    if (i >= fillStart) {
      drawFallenBead(ctx, x, by, 12, loadedCode, "v");
    } else {
      ctx.fillStyle = "rgba(102, 116, 128, 0.18)";
      roundedPath(ctx, x - 4.5, by - 5.9, 9, 11.8, 2.6);
      ctx.fill();
    }
  }
  drawToolDecoration(ctx, x + 8, y + 42, style);
  ctx.restore();
}

export function drawTweezersEntity(x, y) {
  const ctx = scene;
  const style = currentToolStyle();
  const inUse = state.phase === "place" && state.tool === "tweezers";
  ctx.save();
  ctx.globalAlpha = inUse ? 0.46 : 0.76;
  ctx.shadowColor = "rgba(38, 36, 43, 0.1)";
  ctx.shadowBlur = inUse ? 4 : 10;
  ctx.strokeStyle = style.primary;
  ctx.lineWidth = 5;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(x + 8, y + 8);
  ctx.lineTo(x + 42, y + 76);
  ctx.moveTo(x + 30, y + 8);
  ctx.lineTo(x + 52, y + 76);
  ctx.stroke();
  ctx.shadowColor = "transparent";
  ctx.strokeStyle = style.secondary;
  ctx.lineWidth = 1.4;
  ctx.beginPath();
  ctx.moveTo(x + 10, y + 10);
  ctx.lineTo(x + 41, y + 72);
  ctx.moveTo(x + 32, y + 10);
  ctx.lineTo(x + 51, y + 72);
  ctx.stroke();
  ctx.fillStyle = style.accent;
  roundedPath(ctx, x + 14, y + 1, 18, 10, 5);
  ctx.fill();
  drawToolDecoration(ctx, x + 24, y + 6, style);
  if (state.tweezerBead) {
    drawBead(ctx, x + 46, y + 66, 5.8, state.tweezerBead, 0, false);
  } else {
    ctx.fillStyle = "rgba(102, 116, 128, 0.2)";
    ctx.beginPath();
    ctx.arc(x + 46, y + 66, 5.3, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

export function drawTweezersEntityAtHead(headX, headY) {
  drawTweezersEntity(headX - 46, headY - 66);
}

export function drawToolDecoration(ctx, x, y, style) {
  ctx.save();
  ctx.fillStyle = style.accent;
  ctx.strokeStyle = "rgba(255,255,255,0.72)";
  ctx.lineWidth = 1;
  if (style.deco === "heart") {
    ctx.beginPath();
    ctx.moveTo(x, y + 3.8);
    ctx.bezierCurveTo(x - 7, y - 1.5, x - 3.8, y - 7, x, y - 3.2);
    ctx.bezierCurveTo(x + 3.8, y - 7, x + 7, y - 1.5, x, y + 3.8);
    ctx.fill();
    ctx.stroke();
    ctx.restore();
    return;
  }
  if (style.deco === "leaf") {
    ctx.beginPath();
    ctx.ellipse(x, y, 6, 3.2, -0.68, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.strokeStyle = "rgba(69, 122, 101, 0.42)";
    ctx.beginPath();
    ctx.moveTo(x - 4.4, y + 2.4);
    ctx.lineTo(x + 4.8, y - 2.5);
    ctx.stroke();
    ctx.restore();
    return;
  }
  if (style.deco === "cloud") {
    ctx.beginPath();
    ctx.arc(x - 4, y + 1, 3.2, Math.PI * 0.6, Math.PI * 1.8);
    ctx.arc(x, y - 1, 4.2, Math.PI, Math.PI * 2);
    ctx.arc(x + 4.4, y + 1, 3, Math.PI * 1.15, Math.PI * 0.4);
    ctx.lineTo(x - 5.8, y + 3.5);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();
    return;
  }
  if (style.deco === "flower") {
    for (let i = 0; i < 5; i += 1) {
      const angle = i * Math.PI * 2 / 5;
      ctx.beginPath();
      ctx.ellipse(x + Math.cos(angle) * 3.4, y + Math.sin(angle) * 3.4, 2.8, 1.8, angle, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    }
    ctx.fillStyle = "#fff7a8";
    ctx.beginPath();
    ctx.arc(x, y, 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
    return;
  }
  ctx.beginPath();
  for (let i = 0; i < 5; i += 1) {
    const angle = -Math.PI / 2 + i * (Math.PI * 2 / 5);
    const outerX = x + Math.cos(angle) * 4.2;
    const outerY = y + Math.sin(angle) * 4.2;
    const innerAngle = angle + Math.PI / 5;
    const innerX = x + Math.cos(innerAngle) * 1.9;
    const innerY = y + Math.sin(innerAngle) * 1.9;
    if (i === 0) ctx.moveTo(outerX, outerY);
    else ctx.lineTo(outerX, outerY);
    ctx.lineTo(innerX, innerY);
  }
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  ctx.restore();
}

export function drawChooseScene(layout) {
  const ctx = scene;
  const cardW = Math.min(540, layout.w - 60);
  const x = (layout.w - cardW) / 2;
  const y = Math.max(42, layout.h * 0.15);
  ctx.save();
  drawPaper(x, y, cardW, 230);
  ctx.fillStyle = "#26242b";
  ctx.font = "700 28px Avenir Next, PingFang SC, Hiragino Sans GB, Microsoft YaHei, sans-serif";
  ctx.fillText("今天的工作台已经清空", x + 28, y + 48);
  ctx.fillStyle = "#686572";
  ctx.font = "15px Avenir Next, PingFang SC, Hiragino Sans GB, Microsoft YaHei, sans-serif";
  wrapText("从左侧挑一张图纸，照着色号从豆盒取豆。豆筛只有一个，针工具从豆筛取豆，镊子必须先夹住一颗再放下。", x + 28, y + 82, cardW - 56, 25);
  drawMiniSupplies(x + 32, y + 145, cardW - 64, 54);
  ctx.restore();
}

export function drawPaper(x, y, w, h) {
  const ctx = scene;
  ctx.save();
  ctx.shadowColor = "rgba(38, 36, 43, 0.16)";
  ctx.shadowBlur = 26;
  ctx.shadowOffsetY = 15;
  ctx.fillStyle = "#fffdf8";
  roundedRect(x, y, w, h, 8);
  ctx.fill();
  ctx.shadowColor = "transparent";
  ctx.strokeStyle = "rgba(99, 91, 79, 0.18)";
  ctx.stroke();
  ctx.restore();
}

export function drawMiniSupplies(x, y, w, h) {
  const ctx = scene;
  ctx.save();
  const colors = getPatternColors();
  colors.forEach((code, i) => {
    const cx = x + 16 + i * Math.min(38, w / Math.max(colors.length, 1));
    drawBead(ctx, cx, y + h / 2, 12, code, 0, false);
  });
  ctx.strokeStyle = "rgba(38, 36, 43, 0.28)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(x + w - 96, y + 46);
  ctx.lineTo(x + w - 70, y + 6);
  ctx.moveTo(x + w - 58, y + 46);
  ctx.lineTo(x + w - 70, y + 6);
  ctx.moveTo(x + w - 34, y + 46);
  ctx.lineTo(x + w - 20, y + 8);
  ctx.stroke();
  ctx.restore();
}

export function drawBoard(layout) {
  const ctx = scene;
  const { boardX, boardY, boardSize, cell } = layout;
  const boardView = boardViewTransform(layout);
  const size = state.selectedPattern.size;
  ctx.save();
  ctx.translate(boardView.cx + boardView.panX, boardView.cy + boardView.panY);
  ctx.scale(boardView.scale, boardView.scale);
  ctx.translate(-boardView.cx, -boardView.cy);

  ctx.shadowColor = "rgba(38, 36, 43, 0.15)";
  ctx.shadowBlur = 26;
  ctx.shadowOffsetY = 14;
  const baseGradient = ctx.createLinearGradient(boardX, boardY - 14, boardX, boardY + boardSize + 14);
  baseGradient.addColorStop(0, "#f6f8fa");
  baseGradient.addColorStop(1, "#d9e0e4");
  ctx.fillStyle = baseGradient;
  roundedRect(boardX - 14, boardY - 14, boardSize + 28, boardSize + 28, 8);
  ctx.fill();
  ctx.shadowColor = "transparent";
  ctx.strokeStyle = "rgba(108, 118, 130, 0.34)";
  ctx.stroke();

  ctx.fillStyle = "#fbfcfd";
  roundedRect(boardX, boardY, boardSize, boardSize, 6);
  ctx.fill();
  ctx.strokeStyle = "rgba(70, 84, 96, 0.18)";
  ctx.stroke();

  const guideVisible = state.lampOn && (state.phase === "place" || state.phase === "inspect");
  const templateOpacity = guideVisible ? (state.phase === "place" ? 0.1 : 0.08) : 0;
  if (guideVisible) {
    drawProjectedGuide(layout);
  }
  const spillIndex = state.spill ? state.spill.index : -1;
  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      const index = indexFor(x, y);
      const px = boardX + x * cell;
      const py = boardY + y * cell;
      const code = targetAt(x, y);
      ctx.strokeStyle = "rgba(117, 126, 139, 0.18)";
      ctx.lineWidth = 1;
      ctx.strokeRect(px, py, cell, cell);
      if (code && templateOpacity > 0) {
        ctx.globalAlpha = templateOpacity;
        ctx.fillStyle = palette[code];
        ctx.fillRect(px + 1, py + 1, cell - 2, cell - 2);
        ctx.globalAlpha = 1;
      }
      if (index !== spillIndex) {
        const pegR = cell * 0.138;
        ctx.fillStyle = "rgba(91, 104, 118, 0.32)";
        ctx.beginPath();
        ctx.arc(px + cell / 2, py + cell / 2, pegR, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "rgba(255,255,255,0.58)";
        ctx.beginPath();
        ctx.arc(px + cell / 2 - pegR * 0.22, py + cell / 2 - pegR * 0.22, pegR * 0.36, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }

  const boardFusedPhase = state.phase === "iron";
  const detachedPhase = state.phase === "cool" || state.phase === "finish";
  if (boardFusedPhase) drawFusionBridges(layout);
  if (detachedPhase) {
    drawDetachedFusedPieces(layout);
  } else {
    state.placed.forEach((code, index) => {
      if (!code) return;
      const x = index % size;
      const y = Math.floor(index / size);
      const heat = state.heat[index] || 0;
      const cx = boardX + x * cell + cell / 2;
      const cy = boardY + y * cell + cell / 2;
      if (state.spill && state.spill.index === index) {
        drawFallenBead(ctx, cx, cy, cell, code, state.spill.orientation || "h");
        return;
      }
      const shapeProfile = boardFusionShapeProfile(x, y);
      if (isSpillDamagedIndex(index)) {
        drawDamagedBead(ctx, cx, cy, cell * 0.43, code, heat, boardFusedPhase, shapeProfile);
      } else {
        drawBead(ctx, cx, cy, cell * 0.43, code, heat, boardFusedPhase, shapeProfile);
      }
      drawPegInBead(ctx, cx, cy, cell * 0.43, heat, boardFusedPhase);
    });
  }

  if (state.phase === "inspect" && state.showHints) {
    drawInspectionHints(layout);
  }

  ctx.restore();
}

export function drawProjectedGuide(layout) {
  const key = projectedGuideCacheKey(layout);
  if (!state.projectedGuideCache || state.projectedGuideCache.key !== key) {
    state.projectedGuideCache = buildProjectedGuideCache(layout, key);
  }
  if (!state.projectedGuideCache?.canvas) return;
  scene.drawImage(
    state.projectedGuideCache.canvas,
    layout.boardX,
    layout.boardY,
    layout.boardSize,
    layout.boardSize
  );
}

export function projectedGuideCacheKey(layout) {
  const map = getPatternColorMap();
  const mapSig = Object.keys(map).sort().map((code) => `${code}:${map[code]}`).join(",");
  return [
    baseIdFor(state.selectedPattern),
    state.selectedPattern.size,
    Math.round(layout.boardSize),
    mapSig,
  ].join("|");
}

export function buildProjectedGuideCache(layout, key) {
  const size = state.selectedPattern.size;
  const boardPx = Math.max(1, Math.round(layout.boardSize));
  const cell = boardPx / size;
  const canvas = document.createElement("canvas");
  canvas.width = boardPx;
  canvas.height = boardPx;
  const ctx = canvas.getContext("2d");
  if (!ctx) return { key, canvas: null };

  const blur = Math.max(1.45, cell * 0.24);

  ctx.save();
  ctx.filter = `blur(${blur}px)`;
  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      const code = targetAt(x, y);
      if (!code) continue;
      const cx = x * cell + cell / 2;
      const cy = y * cell + cell / 2;
      ctx.fillStyle = palette[code];
      ctx.globalAlpha = 0.28;
      ctx.beginPath();
      ctx.arc(cx, cy, cell * 0.44, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  ctx.filter = "none";
  ctx.globalAlpha = 0.16;
  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      const code = targetAt(x, y);
      if (!code) continue;
      const cx = x * cell + cell / 2;
      const cy = y * cell + cell / 2;
      ctx.fillStyle = palette[code];
      ctx.globalAlpha = 0.14;
      ctx.beginPath();
      ctx.arc(cx, cy, cell * 0.3, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  ctx.restore();

  return { key, canvas };
}

export function drawFusionBridges(layout) {
  const ctx = scene;
  const size = state.selectedPattern.size;
  ctx.save();
  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      const index = indexFor(x, y);
      const code = state.placed[index];
      if (!code) continue;
      drawFusionBridgeTo(ctx, layout, x, y, x + 1, y);
      drawFusionBridgeTo(ctx, layout, x, y, x, y + 1);
    }
  }
  ctx.restore();
}

export function boardFusionShapeProfile(x, y) {
  const size = state.selectedPattern.size;
  const has = (cx, cy) => {
    if (cx < 0 || cy < 0 || cx >= size || cy >= size) return false;
    return Boolean(state.placed[indexFor(cx, cy)]);
  };
  const orth =
    Number(has(x - 1, y))
    + Number(has(x + 1, y))
    + Number(has(x, y - 1))
    + Number(has(x, y + 1));
  const edges = {
    left: !has(x - 1, y),
    right: !has(x + 1, y),
    up: !has(x, y - 1),
    down: !has(x, y + 1),
  };
  const cluster = clamp(orth / 4, 0, 1);
  const edgeExposure = 1 - clamp(orth / 4, 0, 1);
  return { cluster, edgeExposure, edges };
}

export function buildFusedPiecesFromPlaced() {
  const size = state.selectedPattern.size;
  const total = size * size;
  const visited = Array(total).fill(false);
  const pieces = [];
  const boardCenter = (size - 1) / 2;

  for (let index = 0; index < total; index += 1) {
    if (visited[index] || !state.placed[index]) continue;
    const queue = [index];
    visited[index] = true;
    const cells = [];
    let minX = size;
    let minY = size;
    let maxX = 0;
    let maxY = 0;
    let sumX = 0;
    let sumY = 0;

    for (let head = 0; head < queue.length; head += 1) {
      const current = queue[head];
      const code = state.placed[current];
      if (!code) continue;
      const x = current % size;
      const y = Math.floor(current / size);
      const heat = state.heat[current] || 0;
      cells.push({ index: current, x, y, code, heat });
      minX = Math.min(minX, x);
      minY = Math.min(minY, y);
      maxX = Math.max(maxX, x);
      maxY = Math.max(maxY, y);
      sumX += x;
      sumY += y;

      const neighbors = [
        [x - 1, y],
        [x + 1, y],
        [x, y - 1],
        [x, y + 1],
      ];
      neighbors.forEach(([nx, ny]) => {
        if (nx < 0 || ny < 0 || nx >= size || ny >= size) return;
        const next = indexFor(nx, ny);
        if (visited[next] || !state.placed[next]) return;
        visited[next] = true;
        queue.push(next);
      });
    }

    if (!cells.length) continue;
    const centerX = sumX / cells.length;
    const centerY = sumY / cells.length;
    const dx = centerX - boardCenter;
    const dy = centerY - boardCenter;
    const dist = Math.hypot(dx, dy) || 1;
    const seed = `${state.selectedPattern.id}:${state.flipCount}:${minX}:${minY}:${cells.length}`;
    const jitterX = (pseudoRandom(`${seed}-jx`) - 0.5) * 0.05;
    const jitterY = (pseudoRandom(`${seed}-jy`) - 0.5) * 0.05;
    const offsetX = clamp((dx / dist) * 0.08 + jitterX, -0.14, 0.14);
    const offsetY = clamp((dy / dist) * 0.02 + jitterY, -0.06, 0.06);
    const lift = 0.14 + pseudoRandom(`${seed}-lift`) * 0.08;
    const map = {};
    const relCells = cells.map((cell) => {
      map[`${cell.x},${cell.y}`] = cell;
      return {
        ...cell,
        rx: cell.x - minX,
        ry: cell.y - minY,
      };
    });

    pieces.push({
      id: `${pieces.length + 1}`,
      cells: relCells,
      map,
      minX,
      minY,
      maxX,
      maxY,
      centerX,
      centerY,
      offsetX,
      offsetY,
      lift,
    });
  }
  return pieces;
}

export function drawDetachedFusedPieces(layout) {
  const pieces = getFusedPieces();
  if (!pieces.length) return;
  const sorted = [...pieces].sort((a, b) => a.centerY - b.centerY);
  sorted.forEach((piece) => {
    const dx = piece.offsetX * layout.cell;
    const dy = (piece.offsetY - piece.lift - clamp(state.flattening / 100, 0, 1) * 0.09) * layout.cell;
    drawFusedPieceTransformed(layout, piece, {
      scale: 1,
      resolveCenter: (cell) => ({
        x: layout.boardX + cell.x * layout.cell + layout.cell / 2 + dx,
        y: layout.boardY + cell.y * layout.cell + layout.cell / 2 + dy,
      }),
    });
  });
}

export function drawDetachedFusionBridgeByCenters(ctx, cellSize, cellA, cellB, centerA, centerB) {
  const heat = Math.min(cellA.heat || 0, cellB.heat || 0);
  const pressBoost = clamp(state.flattening / 100, 0, 1);
  const fuse = clamp((heat - 36) / 56 + pressBoost * 0.42, 0, 1);
  if (fuse <= 0) return;
  const spread = lerp(cellSize * 0.24, cellSize * (0.8 + pressBoost * 0.1), easeOut(fuse));
  const over = clamp((heat - 88) / 34, 0, 1);
  const colorA = fusedColor(cellA.code, heat);
  const colorB = fusedColor(cellB.code, heat);
  const gradient = ctx.createLinearGradient(centerA.x, centerA.y, centerB.x, centerB.y);
  gradient.addColorStop(0, colorA);
  gradient.addColorStop(1, colorB);

  drawGradientCapsuleBridge(ctx, centerA, centerB, spread, lerp(spread / 2, 3, over), gradient, 0.92);
}

export function drawFusedPieceTransformed(layout, piece, options = {}) {
  const ctx = scene;
  const scale = clamp(options.scale ?? 1, 0.28, 1.4);
  const resolveCenter = options.resolveCenter;
  if (!resolveCenter) return;
  piece.cells.forEach((cell) => {
    const right = piece.map[`${cell.x + 1},${cell.y}`];
    if (right) {
      const centerA = resolveCenter(cell, piece);
      const centerB = resolveCenter(right, piece);
      drawDetachedFusionBridgeByCenters(ctx, layout.cell * scale, cell, right, centerA, centerB);
    }
    const down = piece.map[`${cell.x},${cell.y + 1}`];
    if (down) {
      const centerA = resolveCenter(cell, piece);
      const centerB = resolveCenter(down, piece);
      drawDetachedFusionBridgeByCenters(ctx, layout.cell * scale, cell, down, centerA, centerB);
    }
  });

  piece.cells.forEach((cell) => {
    const center = resolveCenter(cell, piece);
    const shapeProfile = pieceFusionShapeProfile(piece, cell);
    if (isSpillDamagedIndex(cell.index)) {
      drawDamagedBead(ctx, center.x, center.y, layout.cell * 0.43 * scale, cell.code, cell.heat, true, shapeProfile);
    } else {
      drawBead(ctx, center.x, center.y, layout.cell * 0.43 * scale, cell.code, cell.heat, true, shapeProfile);
    }
  });
}

export function pieceFusionShapeProfile(piece, cell) {
  const has = (x, y) => Boolean(piece.map[`${x},${y}`]);
  const orth =
    Number(has(cell.x - 1, cell.y))
    + Number(has(cell.x + 1, cell.y))
    + Number(has(cell.x, cell.y - 1))
    + Number(has(cell.x, cell.y + 1));
  const edges = {
    left: !has(cell.x - 1, cell.y),
    right: !has(cell.x + 1, cell.y),
    up: !has(cell.x, cell.y - 1),
    down: !has(cell.x, cell.y + 1),
  };
  const cluster = clamp(orth / 4, 0, 1);
  const edgeExposure = 1 - clamp(orth / 4, 0, 1);
  return { cluster, edgeExposure, edges };
}

export function getFusedPieces() {
  if (!state.fusedPieces.length && placedCount() > 0) {
    state.fusedPieces = buildFusedPiecesFromPlaced();
  }
  return state.fusedPieces;
}

export function pieceSortByArea(pieces) {
  return [...pieces].sort((a, b) => b.cells.length - a.cells.length);
}

export function drawFinishShowcase(layout) {
  const pieces = getFusedPieces();
  if (!pieces.length) return;

  const ctx = scene;
  const { boardX, boardY, boardSize } = layout;
  ctx.save();
  ctx.shadowColor = "rgba(38, 36, 43, 0.12)";
  ctx.shadowBlur = 26;
  ctx.shadowOffsetY = 14;
  ctx.fillStyle = "rgba(255,255,255,0.42)";
  roundedRect(boardX - 12, boardY - 12, boardSize + 24, boardSize + 24, 14);
  ctx.fill();
  ctx.shadowColor = "transparent";
  ctx.restore();

  if (state.craft === "原版") {
    drawFinishOriginal(layout, pieces);
    return;
  }
  if (state.craft === "钥匙扣") {
    drawFinishKeychain(layout, pieces);
    return;
  }
  if (state.craft === "摆件") {
    drawFinishFigurine(layout, pieces);
    return;
  }
  if (state.craft === "杯垫") {
    drawFinishCoaster(layout, pieces);
    return;
  }
  drawFinishOriginal(layout, pieces);
}

export function drawConceptEasterScene(layout) {
  const type = state.conceptEasterType || "empty";
  const ctx = scene;
  const { w, h, boardSize } = layout;
  const topPad = 28;
  const bottomPad = 20;
  const gap = 22;
  const initDisplay = Math.min(boardSize, Math.min(w, h) * 0.58);
  const roughLabelW = Math.min(initDisplay, 640);
  const roughMetrics = buildConceptLabelMetrics(type, roughLabelW);
  const maxDisplayByHeight = Math.max(180, h - topPad - bottomPad - gap - roughMetrics.boxH);
  const displaySize = Math.min(initDisplay, maxDisplayByHeight);
  const bx = (w - displaySize) / 2;
  const by = Math.max(topPad, Math.min(h * 0.26, h - displaySize - bottomPad - gap - roughMetrics.boxH));
  const size = state.selectedPattern.size;

  ctx.save();
  ctx.fillStyle = "#eef0f3";
  ctx.fillRect(0, 0, w, h);
  ctx.restore();

  ctx.save();
  ctx.shadowColor = "rgba(30, 33, 40, 0.13)";
  ctx.shadowBlur = 28;
  ctx.shadowOffsetY = 13;
  ctx.fillStyle = "rgba(255,255,255,0.95)";
  roundedRect(bx - 18, by - 18, displaySize + 36, displaySize + 36, 14);
  ctx.fill();
  ctx.shadowColor = "transparent";
  ctx.fillStyle = "#fcfcfd";
  roundedRect(bx, by, displaySize, displaySize, 6);
  ctx.fill();
  ctx.restore();

  const displayCell = displaySize / size;
  const fullMode = type === "full";
  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      const px = bx + x * displayCell;
      const py = by + y * displayCell;
      const index = indexFor(x, y);
      const pegR = displayCell * 0.122;
      ctx.fillStyle = "rgba(97, 107, 120, 0.22)";
      ctx.beginPath();
      ctx.arc(px + displayCell / 2, py + displayCell / 2, pegR, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "rgba(255,255,255,0.52)";
      ctx.beginPath();
      ctx.arc(px + displayCell / 2 - pegR * 0.22, py + displayCell / 2 - pegR * 0.22, pegR * 0.35, 0, Math.PI * 2);
      ctx.fill();
      if (fullMode) {
        const code = state.placed[index] || state.selectedColor;
        const heat = Math.max(62, state.heat[index] || 0);
        drawBead(ctx, px + displayCell / 2, py + displayCell / 2, displayCell * 0.43, code, heat, true);
      }
    }
  }

  drawConceptMuseumLabel({
    x: bx,
    y: by + displaySize + 26,
    w: displaySize,
    type,
    maxBottom: h - 18,
  });
}

export function conceptWrappedLines(text, maxWidth, font) {
  const ctx = scene;
  if (!text) return [""];
  ctx.save();
  ctx.font = font;
  let line = "";
  const lines = [];
  [...text].forEach((ch) => {
    const test = line + ch;
    if (line && ctx.measureText(test).width > maxWidth) {
      lines.push(line);
      line = ch;
    } else {
      line = test;
    }
  });
  if (line) lines.push(line);
  ctx.restore();
  return lines.length ? lines : [text];
}

export function buildConceptLabelMetrics(type, labelW) {
  const title = type === "full" ? "《满格构图》" : "《无题》";
  const paragraphs = type === "full"
    ? [
      { text: "2026", font: "500 15px Avenir Next, PingFang SC, Hiragino Sans GB, Microsoft YaHei, sans-serif", color: "#2f333b", lineHeight: 22 },
      { text: "塑料拼豆、网格、完全占据的表面", font: "500 14px Avenir Next, PingFang SC, Hiragino Sans GB, Microsoft YaHei, sans-serif", color: "#4f5560", lineHeight: 22 },
      { gap: 10 },
      { text: "这件作品拒绝留白，整块板面成为图像本身。", font: "500 15px Avenir Next, PingFang SC, Hiragino Sans GB, Microsoft YaHei, sans-serif", color: "#2f333b", lineHeight: 22 },
      { text: "每个孔位都被占据，每个位置都同等重要。", font: "500 15px Avenir Next, PingFang SC, Hiragino Sans GB, Microsoft YaHei, sans-serif", color: "#2f333b", lineHeight: 22 },
    ]
    : [
      { text: "2026", font: "500 15px Avenir Next, PingFang SC, Hiragino Sans GB, Microsoft YaHei, sans-serif", color: "#2f333b", lineHeight: 22 },
      { text: "空白拼豆板、未放置的塑料豆、玩家的观看", font: "500 14px Avenir Next, PingFang SC, Hiragino Sans GB, Microsoft YaHei, sans-serif", color: "#4f5560", lineHeight: 22 },
      { gap: 10 },
      { text: "没有颜色，也是一种结构。", font: "500 15px Avenir Next, PingFang SC, Hiragino Sans GB, Microsoft YaHei, sans-serif", color: "#2f333b", lineHeight: 22 },
    ];
  const bodyMaxW = labelW - 36;
  const rows = [];
  paragraphs.forEach((item) => {
    if (item.gap) {
      rows.push({ gap: item.gap });
      return;
    }
    const wrapped = conceptWrappedLines(item.text, bodyMaxW, item.font);
    wrapped.forEach((line) => {
      rows.push({
        text: line,
        font: item.font,
        color: item.color,
        lineHeight: item.lineHeight,
      });
    });
  });
  const boxH = 24 + 28 + 14 + rows.reduce((sum, row) => sum + (row.gap || row.lineHeight), 0) + 18;
  return { title, rows, boxH };
}

export function drawConceptMuseumLabel({ x, y, w, type, maxBottom }) {
  const ctx = scene;
  const labelW = Math.min(w, 640);
  const labelX = x + (w - labelW) / 2;
  const metrics = buildConceptLabelMetrics(type, labelW);
  const { title, rows, boxH } = metrics;
  const labelY = Math.max(14, Math.min(y, maxBottom - boxH));
  ctx.save();
  ctx.fillStyle = "rgba(255,255,255,0.95)";
  roundedRect(labelX, labelY, labelW, boxH, 6);
  ctx.fill();
  ctx.strokeStyle = "rgba(38, 36, 43, 0.16)";
  ctx.lineWidth = 1;
  roundedRect(labelX, labelY, labelW, boxH, 6);
  ctx.stroke();
  ctx.fillStyle = "#22242a";
  ctx.font = "700 23px Avenir Next, PingFang SC, Hiragino Sans GB, Microsoft YaHei, sans-serif";
  ctx.fillText(title, labelX + 18, labelY + 36);
  let cursorY = labelY + 66;
  rows.forEach((row) => {
    if (row.gap) {
      cursorY += row.gap;
      return;
    }
    ctx.fillStyle = row.color;
    ctx.font = row.font;
    ctx.fillText(row.text, labelX + 18, cursorY);
    cursorY += row.lineHeight;
  });
  ctx.restore();
}

export function drawFinishKeychain(layout, pieces) {
  const ctx = scene;
  const { boardX, boardY, boardSize, cell } = layout;
  const selected = pieceSortByArea(pieces).slice(0, 2);
  const centerX = boardX + boardSize / 2;
  const slots = [boardY + boardSize * 0.34, boardY + boardSize * 0.7];
  const placed = [];
  selected.forEach((piece, index) => {
    const pieceW = (piece.maxX - piece.minX + 1) * cell;
    const pieceH = (piece.maxY - piece.minY + 1) * cell;
    const scale = clamp(Math.min(boardSize * 0.58 / pieceW, boardSize * 0.28 / pieceH, 1), 0.52, 1);
    const target = { x: centerX, y: slots[index] };
    placed.push({ piece, scale, target });
    drawFusedPieceTransformed(layout, piece, {
      scale,
      resolveCenter: (cellData) => ({
        x: target.x + (cellData.x - piece.centerX) * cell * scale,
        y: target.y + (cellData.y - piece.centerY) * cell * scale,
      }),
    });
  });

  const ringY = boardY + boardSize * 0.11;
  ctx.save();
  ctx.strokeStyle = "#b2bcc8";
  ctx.lineWidth = Math.max(5, cell * 0.3);
  ctx.beginPath();
  ctx.arc(centerX, ringY, boardSize * 0.065, 0, Math.PI * 2);
  ctx.stroke();
  if (placed.length) {
    const first = placed[0];
    const firstTop = first.target.y - ((first.piece.maxY - first.piece.minY + 1) * cell * first.scale) / 2;
    ctx.lineWidth = Math.max(3, cell * 0.18);
    ctx.beginPath();
    ctx.moveTo(centerX, ringY + boardSize * 0.065);
    ctx.lineTo(centerX, firstTop - cell * 0.45);
    ctx.stroke();
  }
  if (placed.length > 1) {
    const top = placed[0];
    const bottom = placed[1];
    const topBottomY = top.target.y + ((top.piece.maxY - top.piece.minY + 1) * cell * top.scale) / 2;
    const bottomTopY = bottom.target.y - ((bottom.piece.maxY - bottom.piece.minY + 1) * cell * bottom.scale) / 2;
    ctx.lineWidth = Math.max(2.4, cell * 0.14);
    ctx.beginPath();
    ctx.moveTo(centerX, topBottomY + cell * 0.2);
    ctx.lineTo(centerX, bottomTopY - cell * 0.2);
    ctx.stroke();
  }
  ctx.restore();
}

export function drawFinishOriginal(layout, pieces) {
  const ctx = scene;
  const { boardX, boardY, boardSize, cell } = layout;
  ctx.save();
  ctx.shadowColor = "rgba(38, 36, 43, 0.14)";
  ctx.shadowBlur = 20;
  ctx.shadowOffsetY = 10;
  const baseGradient = ctx.createLinearGradient(boardX, boardY - 10, boardX, boardY + boardSize + 10);
  baseGradient.addColorStop(0, "#f6f8fa");
  baseGradient.addColorStop(1, "#d9e0e4");
  ctx.fillStyle = baseGradient;
  roundedRect(boardX - 9, boardY - 9, boardSize + 18, boardSize + 18, 9);
  ctx.fill();
  ctx.shadowColor = "transparent";
  ctx.fillStyle = "#fbfcfd";
  roundedRect(boardX, boardY, boardSize, boardSize, 6);
  ctx.fill();
  const size = state.selectedPattern.size;
  const spillIndex = state.spill ? state.spill.index : -1;
  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      const index = indexFor(x, y);
      if (index === spillIndex) continue;
      const px = boardX + x * cell;
      const py = boardY + y * cell;
      const pegR = cell * 0.138;
      ctx.fillStyle = "rgba(91, 104, 118, 0.24)";
      ctx.beginPath();
      ctx.arc(px + cell / 2, py + cell / 2, pegR, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  ctx.restore();
  pieces.forEach((piece) => {
    drawFusedPieceTransformed(layout, piece, {
      scale: 1,
      resolveCenter: (cell) => ({
        x: layout.boardX + cell.x * layout.cell + layout.cell / 2,
        y: layout.boardY + cell.y * layout.cell + layout.cell / 2,
      }),
    });
  });
}

export function drawFinishCoaster(layout, pieces) {
  drawFinishOriginal(layout, pieces);
  drawCoasterEdge(layout, pieces);
}

export function drawCoasterEdge(layout, pieces) {
  if (!pieces.length) return;
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  pieces.forEach((piece) => {
    minX = Math.min(minX, piece.minX);
    minY = Math.min(minY, piece.minY);
    maxX = Math.max(maxX, piece.maxX);
    maxY = Math.max(maxY, piece.maxY);
  });
  if (!Number.isFinite(minX)) return;
  const pad = layout.cell * 0.68;
  const left = layout.boardX + minX * layout.cell - pad;
  const top = layout.boardY + minY * layout.cell - pad;
  const width = (maxX - minX + 1) * layout.cell + pad * 2;
  const height = (maxY - minY + 1) * layout.cell + pad * 2;
  const ctx = scene;
  const petalR = clamp(layout.cell * 0.18, 3.4, 8.4);
  const spacing = petalR * 1.7;
  ctx.save();
  ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
  for (let x = left; x <= left + width + 0.01; x += spacing) {
    ctx.beginPath();
    ctx.arc(x, top - petalR * 0.25, petalR, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(x, top + height + petalR * 0.25, petalR, 0, Math.PI * 2);
    ctx.fill();
  }
  for (let y = top + spacing * 0.5; y <= top + height - spacing * 0.5 + 0.01; y += spacing) {
    ctx.beginPath();
    ctx.arc(left - petalR * 0.25, y, petalR, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(left + width + petalR * 0.25, y, petalR, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.strokeStyle = "rgba(87, 184, 167, 0.65)";
  ctx.lineWidth = Math.max(2.8, layout.cell * 0.12);
  roundedPath(ctx, left, top, width, height, Math.max(8, layout.cell * 0.56));
  ctx.stroke();
  ctx.restore();
}

export function drawFinishFigurine(layout, pieces) {
  const selected = pieceSortByArea(pieces).slice(0, Math.min(4, pieces.length));
  const count = selected.length;
  if (!count) return;
  const centerY = layout.boardY + layout.boardSize * 0.57;
  const gap = layout.boardSize / (count + 1);
  selected.forEach((piece, i) => {
    const targetX = layout.boardX + gap * (i + 1);
    const pieceW = (piece.maxX - piece.minX + 1) * layout.cell;
    const pieceH = (piece.maxY - piece.minY + 1) * layout.cell;
    const maxW = gap * 0.85;
    const maxH = layout.boardSize * 0.34;
    const scale = clamp(Math.min(maxW / pieceW, maxH / pieceH, 1), 0.48, 1);
    const pieceWidth = pieceW * scale;
    const pieceHeight = pieceH * scale;
    drawFusedPieceTransformed(layout, piece, {
      scale,
      resolveCenter: (cell) => ({
        x: targetX + (cell.x - piece.centerX) * layout.cell * scale,
        y: centerY + (cell.y - piece.centerY) * layout.cell * scale,
      }),
    });
    const baseW = clamp(pieceWidth * 0.95 + layout.cell * 0.7, layout.cell * 1.8, gap * 0.92);
    const baseH = clamp(layout.cell * 0.46, 8, 16);
    const topY = centerY + pieceHeight / 2 + layout.cell * 0.24;
    const ctx = scene;
    ctx.save();
    const wood = ctx.createLinearGradient(targetX - baseW / 2, topY, targetX + baseW / 2, topY + baseH);
    wood.addColorStop(0, "#9b6d4c");
    wood.addColorStop(0.5, "#805538");
    wood.addColorStop(1, "#71462f");
    ctx.fillStyle = wood;
    roundedPath(ctx, targetX - baseW / 2, topY, baseW, baseH, Math.min(6, baseH / 2));
    ctx.fill();
    ctx.fillStyle = "rgba(255,255,255,0.2)";
    roundedPath(ctx, targetX - baseW * 0.42, topY + 1.5, baseW * 0.84, Math.max(1.5, baseH * 0.18), Math.max(1, baseH * 0.1));
    ctx.fill();
    ctx.restore();
  });
}

export function drawFusionBridgeTo(ctx, layout, x1, y1, x2, y2) {
  const size = state.selectedPattern.size;
  if (x2 < 0 || y2 < 0 || x2 >= size || y2 >= size) return;
  const indexA = indexFor(x1, y1);
  const indexB = indexFor(x2, y2);
  const codeA = state.placed[indexA];
  const codeB = state.placed[indexB];
  if (!codeA || !codeB) return;
  const heat = Math.min(state.heat[indexA] || 0, state.heat[indexB] || 0);
  const pressBoost = (state.phase === "cool" || state.phase === "finish") ? clamp(state.flattening / 100, 0, 1) : 0;
  const fuse = clamp((heat - 36) / 56 + pressBoost * 0.42, 0, 1);
  if (fuse <= 0) return;

  const { boardX, boardY, cell } = layout;
  const centerA = {
    x: boardX + x1 * cell + cell / 2,
    y: boardY + y1 * cell + cell / 2,
  };
  const centerB = {
    x: boardX + x2 * cell + cell / 2,
    y: boardY + y2 * cell + cell / 2,
  };
  const spread = lerp(cell * 0.24, cell * (0.8 + pressBoost * 0.1), easeOut(fuse));
  const over = clamp((heat - 88) / 34, 0, 1);
  const colorA = fusedColor(codeA, heat);
  const colorB = fusedColor(codeB, heat);
  const gradient = ctx.createLinearGradient(centerA.x, centerA.y, centerB.x, centerB.y);
  gradient.addColorStop(0, colorA);
  gradient.addColorStop(1, colorB);
  drawGradientCapsuleBridge(ctx, centerA, centerB, spread, lerp(spread / 2, 3, over), gradient, 0.9);
}

export function drawGradientCapsuleBridge(ctx, centerA, centerB, width, radius, fillStyle, alpha = 1) {
  const dx = centerB.x - centerA.x;
  const dy = centerB.y - centerA.y;
  const length = Math.hypot(dx, dy);
  if (length < 0.001) return;
  const safeRadius = Math.max(0.8, Math.min(radius, width * 0.5));
  ctx.save();
  ctx.translate(centerA.x, centerA.y);
  ctx.rotate(Math.atan2(dy, dx));
  ctx.globalAlpha = alpha;
  ctx.fillStyle = fillStyle;
  roundedPath(ctx, 0, -width / 2, length, width, safeRadius);
  ctx.fill();
  ctx.restore();
}

export function drawInspectionHints(layout) {
  const ctx = scene;
  const { boardX, boardY, cell } = layout;
  const limit = state.errors.length > 22 ? 22 : state.errors.length;
  ctx.save();
  ctx.lineWidth = Math.max(2, cell * 0.08);
  state.errors.slice(0, limit).forEach((error) => {
    const x = error.index % state.selectedPattern.size;
    const y = Math.floor(error.index / state.selectedPattern.size);
    ctx.strokeStyle = error.type === "missing" ? "#d99b3d" : "#e7645f";
    ctx.strokeRect(boardX + x * cell + 2, boardY + y * cell + 2, cell - 4, cell - 4);
  });
  ctx.restore();
}

export function drawSpillMarker(layout) {
  if (!state.spill) return;
  const ctx = scene;
  const index = state.spill.index;
  const x = index % state.selectedPattern.size;
  const y = Math.floor(index / state.selectedPattern.size);
  const { boardX, boardY, cell } = layout;
  const cx = boardX + x * cell + cell / 2;
  const cy = boardY + y * cell + cell / 2;
  ctx.save();
  ctx.shadowColor = "rgba(38, 36, 43, 0.2)";
  ctx.shadowBlur = 8;
  ctx.shadowOffsetY = 3;
  drawFallenBead(ctx, cx, cy, cell, state.spill.code, state.spill.orientation || "h");
  ctx.restore();
}

export function isSpillDamagedIndex(index) {
  return state.spillDamages.some((damage) => damage.index === index);
}

export function drawDamagedBead(ctx, x, y, r, code, heat = 0, fused = false, shape = null) {
  const base = palette[code] || "#999";
  const burnt = mixColor(base, "#6b4b44", 0.5);
  const pressRaw = fused ? ((state.phase === "cool" || state.phase === "finish") ? clamp(state.flattening / 100, 0, 1) : 0) : 0;
  const spread = clamp((heat - 30) / 50 + pressRaw * 0.5, 0.35, 1);
  const cluster = shape?.cluster ?? 0.5;
  const edgeExposure = shape?.edgeExposure ?? 0.5;
  const width = r * lerp(2.12, 2.38, spread);
  const height = r * lerp(2.02, 2.24, spread);
  const cornerMin = r * lerp(0.3, 0.14, cluster);
  const corner = lerp(r * 0.58, cornerMin, clamp(spread + (1 - edgeExposure) * 0.18, 0, 1));
  ctx.save();
  ctx.fillStyle = "rgba(62, 39, 34, 0.26)";
  roundedPath(ctx, x - width / 2 + r * 0.06, y - height / 2 + r * 0.11, width, height, corner);
  ctx.fill();
  ctx.fillStyle = burnt;
  roundedPath(ctx, x - width / 2, y - height / 2, width, height, corner);
  ctx.fill();
  ctx.fillStyle = "rgba(255, 188, 129, 0.18)";
  roundedPath(ctx, x - width * 0.34, y - height * 0.31, width * 0.68, Math.max(1.6, height * 0.12), Math.max(1, corner * 0.45));
  ctx.fill();
  ctx.strokeStyle = "rgba(56, 33, 30, 0.38)";
  ctx.lineWidth = Math.max(1, r * 0.07);
  roundedPath(ctx, x - width / 2, y - height / 2, width, height, corner);
  ctx.stroke();
  ctx.restore();
}

export function drawSpillDamages(layout) {
  const ctx = scene;
  const { boardX, boardY, cell } = layout;
  ctx.save();
  state.spillDamages.forEach((damage) => {
    const x = damage.index % state.selectedPattern.size;
    const y = Math.floor(damage.index / state.selectedPattern.size);
    const cx = boardX + x * cell + cell / 2;
    const cy = boardY + y * cell + cell / 2;
    const melted = mixColor(palette[damage.code] || "#999", "#6b4b44", 0.45);
    ctx.fillStyle = melted;
    const blob = cell * 0.92;
    roundedPath(ctx, cx - blob / 2, cy - blob / 2, blob, blob, Math.max(2, cell * 0.12));
    ctx.fill();
    ctx.globalAlpha = 0.72;
    ctx.fillStyle = "rgba(96, 50, 42, 0.5)";
    roundedPath(ctx, cx - blob * 0.32, cy - blob * 0.08, blob * 0.64, blob * 0.28, Math.max(2, cell * 0.08));
    ctx.fill();
    ctx.globalAlpha = 1;
    ctx.strokeStyle = "rgba(92, 48, 42, 0.5)";
    ctx.lineWidth = Math.max(1, cell * 0.055);
    roundedPath(ctx, cx - blob / 2, cy - blob / 2, blob, blob, Math.max(2, cell * 0.12));
    ctx.stroke();
  });
  ctx.restore();
}

export function drawFallenBead(ctx, x, y, cell, code, orientation = "h") {
  const base = palette[code] || "#999";
  const diameter = cell * 0.8;
  const length = diameter * 1.22;
  const thickness = diameter;
  const angle = orientation === "v" ? Math.PI * 0.5 : 0;
  const corner = Math.max(2.2, thickness * 0.16);

  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);

  ctx.fillStyle = base;
  roundedPath(ctx, -length / 2, -thickness / 2, length, thickness, corner);
  ctx.fill();

  ctx.fillStyle = "rgba(255,255,255,0.18)";
  roundedPath(ctx, -length * 0.42, -thickness * 0.34, length * 0.84, thickness * 0.18, Math.max(1.2, corner * 0.45));
  ctx.fill();

  ctx.strokeStyle = "rgba(0,0,0,0.16)";
  ctx.lineWidth = Math.max(1, cell * 0.045);
  roundedPath(ctx, -length / 2, -thickness / 2, length, thickness, corner);
  ctx.stroke();
  ctx.restore();
}

export function drawHorizontalBead(ctx, x, y, r, code) {
  const base = palette[code] || "#999";
  const length = r * 2.22;
  const thickness = r * 1.88;
  const corner = Math.max(1.8, thickness * 0.2);
  ctx.save();
  ctx.fillStyle = base;
  roundedPath(ctx, x - length / 2, y - thickness / 2, length, thickness, corner);
  ctx.fill();
  ctx.fillStyle = "rgba(255,255,255,0.2)";
  roundedPath(
    ctx,
    x - length * 0.4,
    y - thickness * 0.34,
    length * 0.8,
    Math.max(1.1, thickness * 0.16),
    Math.max(1, corner * 0.45)
  );
  ctx.fill();
  ctx.strokeStyle = "rgba(0,0,0,0.16)";
  ctx.lineWidth = Math.max(0.9, r * 0.15);
  roundedPath(ctx, x - length / 2, y - thickness / 2, length, thickness, corner);
  ctx.stroke();
  ctx.restore();
}

export function drawTrayBeadRandomized(ctx, x, y, r, code, angle = 0, tilt = 1, heightLift = 0) {
  const base = palette[code] || "#999";
  const length = r * 2.22;
  const thickness = r * 1.88 * tilt;
  const corner = Math.max(1.8, thickness * 0.2);
  ctx.save();
  ctx.translate(x, y - heightLift);
  ctx.rotate(angle);

  // 接触阴影（模拟轻微悬浮和姿态变化）
  ctx.fillStyle = "rgba(0,0,0,0.14)";
  ctx.beginPath();
  ctx.ellipse(0.3, thickness * 0.26, length * 0.42, Math.max(1.2, thickness * 0.22), 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = base;
  roundedPath(ctx, -length / 2, -thickness / 2, length, thickness, corner);
  ctx.fill();
  ctx.fillStyle = "rgba(255,255,255,0.2)";
  roundedPath(
    ctx,
    -length * 0.4,
    -thickness * 0.34,
    length * 0.8,
    Math.max(1.1, thickness * 0.16),
    Math.max(1, corner * 0.45)
  );
  ctx.fill();
  ctx.strokeStyle = "rgba(0,0,0,0.16)";
  ctx.lineWidth = Math.max(0.9, r * 0.15);
  roundedPath(ctx, -length / 2, -thickness / 2, length, thickness, corner);
  ctx.stroke();
  ctx.restore();
}

export function drawTray(layout, compact = false) {
  const ctx = scene;
  const { trayX, trayY, trayW, trayH } = layout;
  const color = state.trayColor;
  const progress = color ? state.trayProgress : 0;
  const p = easeOut(progress / 100);
  const g = trayGeometry(layout, compact);
  const beadR = g.beadR;

  ctx.save();
  ctx.shadowColor = "rgba(38, 36, 43, 0.13)";
  ctx.shadowBlur = 20;
  ctx.shadowOffsetY = 10;
  const trayGradient = ctx.createLinearGradient(trayX, trayY, trayX, trayY + trayH);
  trayGradient.addColorStop(0, compact ? "rgba(255,255,255,0.72)" : "#fbfdff");
  trayGradient.addColorStop(1, compact ? "rgba(227,235,239,0.72)" : "#e7eff3");
  ctx.fillStyle = trayGradient;
  roundedRect(trayX, trayY, trayW, trayH, 8);
  ctx.fill();
  ctx.shadowColor = "transparent";
  ctx.strokeStyle = "rgba(87, 104, 116, 0.24)";
  ctx.stroke();

  ctx.fillStyle = "rgba(63, 81, 91, 0.08)";
  roundedRect(trayX + trayW - 44, trayY + 16, 24, trayH - 32, 8);
  ctx.fill();
  ctx.fillStyle = "rgba(87, 184, 167, 0.08)";
  roundedRect(trayX + 10, trayY + 10, trayW - 20, trayH - 20, 6);
  ctx.fill();

  for (let i = 0; i < g.rows; i += 1) {
    const y = g.startY + g.stepY * i;
    const grooveWidth = Math.max(7.6, beadR * 2.25, g.slotGap * 0.44);
    ctx.strokeStyle = "rgba(75, 90, 98, 0.22)";
    ctx.lineWidth = grooveWidth;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(g.lineStartX, y);
    ctx.lineTo(g.lineEndX, y);
    ctx.stroke();
    ctx.strokeStyle = "rgba(255,255,255,0.58)";
    ctx.lineWidth = Math.max(1, grooveWidth * 0.18);
    ctx.beginPath();
    ctx.moveTo(g.lineStartX + 2, y - 1);
    ctx.lineTo(g.lineEndX - 2, y - 1);
    ctx.stroke();
  }

  if (color) {
    const animateScatter = state.pointer.down && state.pointer.mode === "tray";
    const now = animateScatter ? performance.now() / 680 : 0;
    const rowNormDiv = Math.max(1, g.rows - 1);
    for (let row = 0; row < g.rows; row += 1) {
      for (let col = 0; col < g.cols; col += 1) {
        if (!state.trayMatrix[row]?.[col]) continue;
        const center = trayCellCenter(layout, row, col, compact);
        const seedX = pseudoRandom(`${state.selectedPattern.id}-${state.trayColor}-${state.trayPourId}-${row}-${col}-x`);
        const seedY = pseudoRandom(`${state.selectedPattern.id}-${state.trayColor}-${state.trayPourId}-${row}-${col}-y`);
        const seedA = pseudoRandom(`${state.selectedPattern.id}-${state.trayColor}-${state.trayPourId}-${row}-${col}-a`);
        const seedT = pseudoRandom(`${state.selectedPattern.id}-${state.trayColor}-${state.trayPourId}-${row}-${col}-t`);
        const seedH = pseudoRandom(`${state.selectedPattern.id}-${state.trayColor}-${state.trayPourId}-${row}-${col}-h`);
        const seedL = pseudoRandom(`${state.selectedPattern.id}-${state.trayColor}-${state.trayPourId}-${row}-${col}-l`);
        const randX = trayX + 20 + seedX * (trayW - 40);
        const randY = trayY + 20 + seedY * (trayH - 54);
        // 每颗豆独立收拢进度：避免“全体同步排齐”，更接近真实整理过程
        const lag = seedL * 0.58 + (row / rowNormDiv) * 0.14;
        const localP = p <= lag ? 0 : clamp((p - lag) / Math.max(0.08, 1 - lag), 0, 1);
        const settleNoiseX = (seedX - 0.5) * lerp(1.9, 0.55, localP);
        const settleNoiseY = (seedY - 0.5) * lerp(1.4, 0.4, localP);
        const targetX = center.x + settleNoiseX;
        const targetY = center.y + settleNoiseY;
        const jitterX = animateScatter ? Math.sin(now + row * 0.6 + col * 0.35) * (1 - localP) * 6.2 : 0;
        const jitterY = animateScatter ? Math.cos(now * 0.8 + row * 0.4 + col * 0.45) * (1 - localP) * 5.1 : 0;
        const x = lerp(randX, targetX, localP) + jitterX;
        const y = lerp(randY, targetY, localP) + jitterY;
        const chaos = 1 - localP;
        const randomAngle = (seedA - 0.5) * Math.PI * 0.95;
        const angle = randomAngle * (0.14 + chaos * 0.86);
        const randomTilt = 0.72 + seedT * 0.5;
        const tilt = lerp(randomTilt, 1 - (seedT - 0.5) * 0.12, localP);
        const lift = chaos * (seedH * 1.5);
        drawTrayBeadRandomized(ctx, x, y, beadR, color, angle, tilt, lift);
      }
    }
  }

  if (!color || state.trayBeans <= 0) {
    ctx.fillStyle = "rgba(75, 90, 98, 0.28)";
    ctx.font = "700 18px Avenir Next, PingFang SC, Hiragino Sans GB, Microsoft YaHei, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("空", trayX + trayW / 2, trayY + trayH / 2 + 6);
    ctx.textAlign = "left";
  }

  if (color) {
    ctx.fillStyle = "rgba(38, 36, 43, 0.11)";
    roundedRect(trayX + 18, trayY + trayH - 30, trayW - 36, 7, 4);
    ctx.fill();
    ctx.fillStyle = progress >= 70 ? "#57b8a7" : progress >= 35 ? "#d99b3d" : "#e7645f";
    roundedRect(trayX + 18, trayY + trayH - 30, (trayW - 36) * (progress / 100), 7, 4);
    ctx.fill();
  }

  const dump = trayDumpButtonRect(layout);
  const hoverDump = state.phase === "place" && pointInTrayDumpButton(state.pointer.x, state.pointer.y);
  ctx.fillStyle = hoverDump ? "rgba(231, 100, 95, 0.22)" : "rgba(255,255,255,0.85)";
  roundedRect(dump.x, dump.y, dump.w, dump.h, 7);
  ctx.fill();
  ctx.strokeStyle = color ? "rgba(189, 72, 67, 0.62)" : "rgba(122, 130, 140, 0.42)";
  ctx.lineWidth = 1.3;
  roundedRect(dump.x, dump.y, dump.w, dump.h, 7);
  ctx.stroke();
  ctx.strokeStyle = color ? "rgba(189, 72, 67, 0.88)" : "rgba(122, 130, 140, 0.65)";
  ctx.fillStyle = "transparent";
  ctx.lineWidth = 1.9;
  ctx.lineCap = "round";
  const cx = dump.x + dump.w / 2;
  const cy = dump.y + dump.h / 2 + 1;
  ctx.beginPath();
  ctx.moveTo(cx - 5.5, cy - 5);
  ctx.lineTo(cx + 5.5, cy - 5);
  ctx.moveTo(cx - 4.2, cy - 5);
  ctx.lineTo(cx - 3, cy + 4.8);
  ctx.moveTo(cx, cy - 5);
  ctx.lineTo(cx, cy + 5.2);
  ctx.moveTo(cx + 4.2, cy - 5);
  ctx.lineTo(cx + 3, cy + 4.8);
  ctx.moveTo(cx - 1.8, cy - 7.2);
  ctx.lineTo(cx + 1.8, cy - 7.2);
  ctx.stroke();

  ctx.fillStyle = "rgba(38, 36, 43, 0.72)";
  ctx.font = "700 13px Avenir Next, PingFang SC, Hiragino Sans GB, Microsoft YaHei, sans-serif";
  if (color) {
    ctx.fillText(`豆筛 ${beadLabel(color)}`, trayX + 18, trayY + trayH - 14);
  } else {
    ctx.fillText("豆筛 空", trayX + 18, trayY + trayH - 14);
  }
  ctx.restore();
}

export function visibleTraySeedCount() {
  return state.trayBeans;
}

export function drawReferenceSheet(layout) {
  const ctx = scene;
  const { refX, refY, refW, refH } = layout;
  if (!refW || !refH) return;
  const pattern = state.selectedPattern;
  const legendAll = getPatternColors(pattern);
  const preferSingleLegend = legendAll.length <= 6;
  const sheetPad = 12;
  const gridSize = Math.min(refH - sheetPad * 2, refW * 0.36);
  const gridX = refX + sheetPad;
  const gridY = refY + (refH - gridSize) / 2;
  const cell = gridSize / pattern.size;

  ctx.save();
  ctx.shadowColor = "rgba(38, 36, 43, 0.13)";
  ctx.shadowBlur = 18;
  ctx.shadowOffsetY = 9;
  ctx.fillStyle = "#fffdf8";
  roundedRect(refX, refY, refW, refH, 8);
  ctx.fill();
  ctx.shadowColor = "transparent";
  ctx.strokeStyle = "rgba(111, 105, 92, 0.2)";
  ctx.stroke();
  ctx.fillStyle = "rgba(216, 170, 92, 0.24)";
  roundedRect(refX + 14, refY - 4, 48, 12, 3);
  ctx.fill();
  roundedRect(refX + refW - 62, refY - 4, 48, 12, 3);
  ctx.fill();
  ctx.save();
  roundedPath(ctx, refX + 3, refY + 3, refW - 6, refH - 6, 6);
  ctx.clip();

  ctx.fillStyle = "#f7f4ec";
  roundedRect(gridX - 5, gridY - 5, gridSize + 10, gridSize + 10, 5);
  ctx.fill();
  const rows = getEffectiveTargetRows(pattern);
  rows.forEach((row, y) => {
    [...row].forEach((code, x) => {
      ctx.strokeStyle = "rgba(103, 98, 86, 0.12)";
      ctx.lineWidth = 0.7;
      ctx.strokeRect(gridX + x * cell, gridY + y * cell, cell, cell);
      if (code === ".") return;
      const px = gridX + x * cell + 0.5;
      const py = gridY + y * cell + 0.5;
      ctx.fillStyle = palette[code];
      ctx.fillRect(px, py, Math.max(1, cell - 1), Math.max(1, cell - 1));
    });
  });

  const textX = gridX + gridSize + 14;
  const textAreaW = Math.max(72, refX + refW - textX - 12);
  let nameSize = preferSingleLegend ? 16 : 14;
  while (nameSize > 12) {
    ctx.font = `700 ${nameSize}px Avenir Next, PingFang SC, Hiragino Sans GB, Microsoft YaHei, sans-serif`;
    if (ctx.measureText(pattern.name).width <= textAreaW) break;
    nameSize -= 1;
  }
  const metaSize = preferSingleLegend ? 12 : 11;
  const nameY = refY + 34;
  const metaY = nameY + 18;
  const legendStartY = metaY + 16;

  ctx.fillStyle = "#26242b";
  ctx.font = `700 ${nameSize}px Avenir Next, PingFang SC, Hiragino Sans GB, Microsoft YaHei, sans-serif`;
  ctx.fillText(fitText(ctx, pattern.name, textAreaW), textX, nameY);
  ctx.fillStyle = "#686572";
  ctx.font = `${metaSize}px Avenir Next, PingFang SC, Hiragino Sans GB, Microsoft YaHei, sans-serif`;
  ctx.fillText(fitText(ctx, `${pattern.size}x${pattern.size} · ${getTargetTotal()} 颗`, textAreaW), textX, metaY);

  const counts = getTargetCounts(pattern);
  const legendAreaW = textAreaW;
  const legendCols = (preferSingleLegend || legendAreaW < 154) ? 1 : 2;
  const colW = legendCols === 1
    ? legendAreaW
    : Math.max(60, Math.floor((legendAreaW - 8) / 2));
  const rowH = legendCols === 1 ? 16 : 15;
  const maxRows = 5;
  const maxLegend = legendCols * maxRows;
  const colors = legendAll.slice(0, maxLegend);
  colors.forEach((code, i) => {
    const col = i % legendCols;
    const row = Math.floor(i / legendCols);
    const x = textX + col * (colW + 8);
    const y = legendStartY + row * rowH;
    ctx.fillStyle = palette[code];
    ctx.beginPath();
    ctx.arc(x, y - 4, legendCols === 1 ? 5.1 : 4.8, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#686572";
    ctx.font = `${legendCols === 1 ? 12 : 11.5}px Avenir Next, PingFang SC, Hiragino Sans GB, Microsoft YaHei, sans-serif`;
    const label = fitText(ctx, `${beadIds[code] || code} x${counts[code] || 0}`, Math.max(22, colW - 12));
    ctx.fillText(label, x + 9, y);
  });
  ctx.restore();
  ctx.restore();
}

export function drawIronLayer(layout) {
  const ctx = scene;
  const { boardX, boardY, boardSize, cell } = layout;
  const stats = heatStats();
  ctx.save();
  ctx.fillStyle = "rgba(255, 255, 255, 0.42)";
  roundedRect(boardX - 2, boardY - 2, boardSize + 4, boardSize + 4, 7);
  ctx.fill();
  ctx.strokeStyle = "rgba(150, 132, 98, 0.18)";
  ctx.lineWidth = 1.2;
  for (let i = 0; i < 7; i += 1) {
    const y = boardY + 18 + i * (boardSize - 36) / 6;
    ctx.beginPath();
    ctx.moveTo(boardX + 10, y + Math.sin(i) * 3);
    ctx.bezierCurveTo(boardX + boardSize * 0.34, y - 7, boardX + boardSize * 0.62, y + 8, boardX + boardSize - 10, y - 2);
    ctx.stroke();
  }

  for (let y = 0; y < state.selectedPattern.size; y += 1) {
    for (let x = 0; x < state.selectedPattern.size; x += 1) {
      const index = indexFor(x, y);
      if (!state.placed[index]) continue;
      const heat = state.heat[index] || 0;
      if (heat < 8) continue;
      // Mostly green-tinted (well-melted); amber only when noticeably hot,
      // red only when truly scorched. Real perler beads tolerate a lot.
      ctx.globalAlpha = clamp(heat / 140, 0, 0.5);
      ctx.fillStyle = heat > 124 ? "#e7645f" : heat > 96 ? "#d99b3d" : "#57b8a7";
      ctx.fillRect(boardX + x * cell + 2, boardY + y * cell + 2, cell - 4, cell - 4);
    }
  }
  ctx.globalAlpha = 1;
  if (state.emptyIronEaster) {
    const cx = boardX + boardSize * 0.5;
    const cy = boardY + boardSize * 0.5;
    ctx.save();
    ctx.globalAlpha = 0.24;
    ctx.fillStyle = "#d9dadd";
    roundedPath(ctx, cx - boardSize * 0.14, cy - boardSize * 0.14, boardSize * 0.28, boardSize * 0.28, boardSize * 0.014);
    ctx.fill();
    ctx.globalAlpha = 0.38;
    ctx.strokeStyle = "rgba(88, 95, 105, 0.32)";
    ctx.lineWidth = Math.max(1.5, boardSize * 0.006);
    roundedPath(ctx, cx - boardSize * 0.1, cy - boardSize * 0.1, boardSize * 0.2, boardSize * 0.2, boardSize * 0.008);
    ctx.stroke();
    ctx.restore();
  }

  if (state.ironPos) {
    drawIron(state.ironPos.x, state.ironPos.y, stats.over > 0 ? "#e7645f" : "#4d77b8");
  } else {
    drawIron(boardX + boardSize + 42, boardY + 64, "#4d77b8");
  }
  ctx.restore();
}

export function drawIron(x, y, color) {
  const ctx = scene;
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(-0.14);
  ctx.shadowColor = "rgba(38, 36, 43, 0.22)";
  ctx.shadowBlur = 16;
  ctx.shadowOffsetY = 9;
  ctx.fillStyle = "#f4f7fa";
  roundedRect(-42, -25, 84, 50, 8);
  ctx.fill();
  ctx.shadowColor = "transparent";
  ctx.fillStyle = "#d7e0e5";
  roundedRect(-40, 11, 80, 15, 7);
  ctx.fill();
  ctx.fillStyle = color;
  roundedRect(-30, -15, 60, 30, 6);
  ctx.fill();
  ctx.fillStyle = "rgba(255,255,255,0.34)";
  roundedRect(-24, -10, 28, 6, 3);
  ctx.fill();
  ctx.strokeStyle = "rgba(38, 36, 43, 0.2)";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(-22, -22);
  ctx.quadraticCurveTo(0, -45, 22, -22);
  ctx.stroke();
  ctx.restore();
}

export function drawCoolingLayer(layout) {
  const ctx = scene;
  const { boardX, boardY, boardSize } = layout;
  ctx.save();
  ctx.fillStyle = `rgba(128, 201, 222, ${0.08 + state.cooling / 280})`;
  roundedRect(boardX - 10, boardY - 10, boardSize + 20, boardSize + 20, 8);
  ctx.fill();
  ctx.strokeStyle = `rgba(77, 119, 184, ${0.12 + state.cooling / 520})`;
  ctx.lineWidth = 2;
  for (let i = 0; i < 5; i += 1) {
    const y = boardY + 28 + i * (boardSize - 56) / 4;
    ctx.beginPath();
    ctx.moveTo(boardX + 18, y);
    ctx.bezierCurveTo(boardX + boardSize * 0.28, y - 10, boardX + boardSize * 0.63, y + 12, boardX + boardSize - 18, y - 4);
    ctx.stroke();
  }
  if (state.flattening > 5) {
    ctx.shadowColor = "rgba(38, 36, 43, 0.18)";
    ctx.shadowBlur = 18;
    ctx.shadowOffsetY = 10;
    ctx.fillStyle = "rgba(50, 58, 68, 0.16)";
    roundedRect(boardX + 20, boardY + boardSize * 0.32, boardSize - 40, boardSize * 0.26, 6);
    ctx.fill();
    ctx.shadowColor = "transparent";
    ctx.fillStyle = "rgba(255,255,255,0.28)";
    ctx.fillRect(boardX + 32, boardY + boardSize * 0.35, boardSize - 64, 4);
    ctx.fillStyle = "rgba(38,36,43,0.16)";
    ctx.fillRect(boardX + 34, boardY + boardSize * 0.32, 8, boardSize * 0.26);
  }

  // Scraper animation: a thin blade sliding from below the board up over it.
  if (state.pressAnim) {
    const elapsed = performance.now() - state.pressAnim.startedAt;
    const dur = state.pressAnim.duration;
    const t = clamp(elapsed / dur, 0, 1);
    if (t >= 1) {
      state.pressAnim = null;
    } else {
      // Ease in-out for the sweep
      const ease = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
      const startY = boardY + boardSize + 60; // start below board
      const endY = boardY - 24;               // exit above board
      const cy = lerp(startY, endY, ease);
      const blade = boardSize + 32;
      const bladeX = boardX - 16;
      const bladeH = 22;
      ctx.save();
      // Thin shadow trail showing where it pressed
      const trailH = startY - cy;
      if (trailH > 0) {
        const trailGrad = ctx.createLinearGradient(0, cy, 0, startY);
        trailGrad.addColorStop(0, "rgba(38, 36, 43, 0.18)");
        trailGrad.addColorStop(1, "rgba(38, 36, 43, 0)");
        ctx.fillStyle = trailGrad;
        ctx.fillRect(bladeX, cy, blade, trailH);
      }
      // Scraper body
      ctx.shadowColor = "rgba(0,0,0,0.32)";
      ctx.shadowBlur = 14;
      ctx.shadowOffsetY = 4;
      const bodyGrad = ctx.createLinearGradient(0, cy, 0, cy + bladeH);
      bodyGrad.addColorStop(0, "#dfe6ec");
      bodyGrad.addColorStop(0.5, "#aeb8c6");
      bodyGrad.addColorStop(1, "#828c9b");
      ctx.fillStyle = bodyGrad;
      roundedRect(bladeX, cy, blade, bladeH, 4);
      ctx.fill();
      // Blade edge (the pressing line)
      ctx.shadowColor = "transparent";
      ctx.fillStyle = "rgba(40, 46, 56, 0.8)";
      ctx.fillRect(bladeX + 2, cy - 1, blade - 4, 2);
      // Highlight
      ctx.fillStyle = "rgba(255,255,255,0.6)";
      ctx.fillRect(bladeX + 6, cy + 4, blade - 12, 2);
      // Handle grip dots
      ctx.fillStyle = "rgba(60, 68, 80, 0.55)";
      const dotY = cy + bladeH * 0.55;
      for (let i = 0; i < 5; i += 1) {
        const dx = bladeX + blade * 0.5 + (i - 2) * 18;
        ctx.beginPath();
        ctx.arc(dx, dotY, 1.6, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }
  }
  ctx.restore();
}

export function drawFinishLayer(layout) {
  const ctx = scene;
  const { boardX, boardY, boardSize } = layout;
  ctx.save();
  ctx.shadowColor = "rgba(38, 36, 43, 0.18)";
  ctx.shadowBlur = 22;
  ctx.shadowOffsetY = 12;
  ctx.fillStyle = "rgba(255,255,255,0.28)";
  roundedRect(boardX + boardSize - 74, boardY + boardSize - 42, 62, 28, 6);
  ctx.fill();
  ctx.shadowColor = "transparent";
  ctx.fillStyle = "#26242b";
  ctx.font = "800 13px Avenir Next, PingFang SC, Hiragino Sans GB, Microsoft YaHei, sans-serif";
  ctx.fillText(`评级 ${finalGrade()}`, boardX + boardSize - 64, boardY + boardSize - 23);
  ctx.restore();
}

export function drawBead(ctx, x, y, r, code, heat = 0, fused = false, shape = null) {
  const base = palette[code] || "#999";
  const color = fusedColor(code, heat);
  const pressRaw = fused ? ((state.phase === "cool" || state.phase === "finish") ? clamp(state.flattening / 100, 0, 1) : 0) : 0;
  const heatWeight = clamp((heat - 28) / 46, 0, 1);
  const pressBoost = pressRaw * (0.12 + heatWeight * 0.88);
  // melt: 0 (raw cylinder) → 1 (fully fused).
  const melt = fused ? clamp((heat - 30) / 70 + pressBoost * 0.6, 0, 1) : 0;

  const edges = shape?.edges || { left: true, right: true, up: true, down: true };
  const exposedCount = (edges.left ? 1 : 0) + (edges.right ? 1 : 0) + (edges.up ? 1 : 0) + (edges.down ? 1 : 0);

  // 物理：贴邻居的一侧被挤平，恰好填到 cell 中线（r·1.18）；
  // 暴露的一侧无约束，融化的塑料向外溢出，凸出 cell 边界（r·1.32）。
  const halfConnected = r * lerp(1.0, 1.18, melt);
  const halfExposed = r * lerp(1.0, 1.32, melt);
  const halfL = edges.left ? halfExposed : halfConnected;
  const halfR = edges.right ? halfExposed : halfConnected;
  const halfU = edges.up ? halfExposed : halfConnected;
  const halfD = edges.down ? halfExposed : halfConnected;

  // 每个角的半径取决于相邻两边是否暴露；两边都暴露时取相邻 half 的较小者以形成完整四分之一圆。
  const cornerFor = (sideA, sideB, halfA, halfB) => {
    const a = edges[sideA];
    const b = edges[sideB];
    const cap = Math.min(halfA, halfB);
    let target;
    if (a && b) target = cap;
    else if (a || b) target = cap * 0.55;
    else target = cap * 0.08;
    return lerp(cap, target, melt);
  };
  const rTL = cornerFor("up", "left", halfU, halfL);
  const rTR = cornerFor("up", "right", halfU, halfR);
  const rBR = cornerFor("down", "right", halfD, halfR);
  const rBL = cornerFor("down", "left", halfD, halfL);

  const buildPath = (cx, cy) => {
    const left = cx - halfL;
    const right = cx + halfR;
    const top = cy - halfU;
    const bottom = cy + halfD;
    ctx.beginPath();
    ctx.moveTo(left + rTL, top);
    ctx.lineTo(right - rTR, top);
    ctx.arcTo(right, top, right, top + rTR, rTR);
    ctx.lineTo(right, bottom - rBR);
    ctx.arcTo(right, bottom, right - rBR, bottom, rBR);
    ctx.lineTo(left + rBL, bottom);
    ctx.arcTo(left, bottom, left, bottom - rBL, rBL);
    ctx.lineTo(left, top + rTL);
    ctx.arcTo(left, top, left + rTL, top, rTL);
    ctx.closePath();
  };

  // H1 = semi-transparent/frosted bead: visible but lets background show through
  if (beadIds[code] === "H1") {
    ctx.save();
    // soft shadow so it reads against the board
    ctx.globalAlpha = 0.18;
    ctx.fillStyle = "rgba(0,0,0,0.3)";
    buildPath(x + r * 0.06, y + r * 0.1);
    ctx.fill();
    // semi-transparent frosted body
    ctx.globalAlpha = 0.5;
    ctx.fillStyle = "#e8f4ff";
    buildPath(x, y);
    ctx.fill();
    // outline to define the shape
    ctx.globalAlpha = 0.5;
    ctx.strokeStyle = "rgba(100, 140, 195, 0.9)";
    ctx.lineWidth = Math.max(0.8, r * 0.1);
    buildPath(x, y);
    ctx.stroke();
    // specular highlight
    ctx.globalAlpha = 0.85;
    ctx.fillStyle = "rgba(255,255,255,0.95)";
    ctx.beginPath();
    ctx.arc(x - r * 0.28, y - r * 0.28, r * 0.22, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
    return;
  }

  ctx.save();
  ctx.fillStyle = "rgba(0,0,0,0.12)";
  buildPath(x + r * 0.08, y + r * 0.13);
  ctx.fill();

  ctx.fillStyle = color;
  buildPath(x, y);
  ctx.fill();

  ctx.fillStyle = "rgba(255,255,255,0.35)";
  ctx.beginPath();
  ctx.arc(x - r * 0.28, y - r * 0.28, r * lerp(0.25, 0.14, melt), 0, Math.PI * 2);
  ctx.fill();

  const holeFade = fused ? clamp((heat - 42) / 52 + pressBoost * 0.95, 0, 1) : 0;
  const holeR = r * clamp(0.39 - heat / 250 - pressBoost * 0.18, 0, 0.39);
  if (holeR > r * 0.035 && holeFade < 0.98) {
    const holeColor = mixColor("#f6f8fa", color, holeFade);
    ctx.globalAlpha = 1 - holeFade * 0.72;
    ctx.fillStyle = heat > 112 ? mixColor(base, "#6b4b44", 0.35) : holeColor;
    if (exposedCount === 0 && melt > 0.5 && heat < 108) {
      roundedPath(ctx, x - holeR, y - holeR, holeR * 2, holeR * 2, holeR * 0.38);
      ctx.fill();
    } else {
      ctx.beginPath();
      ctx.arc(x, y, holeR, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }

  ctx.strokeStyle = "rgba(0,0,0,0.12)";
  ctx.lineWidth = Math.max(1, r * 0.07);
  buildPath(x, y);
  ctx.stroke();
  ctx.restore();
}

export function drawPegInBead(ctx, x, y, r, heat = 0, fused = false) {
  const pressRaw = fused ? ((state.phase === "cool" || state.phase === "finish") ? clamp(state.flattening / 100, 0, 1) : 0) : 0;
  const heatWeight = clamp((heat - 28) / 46, 0, 1);
  const pressBoost = pressRaw * (0.12 + heatWeight * 0.88);
  const holeFade = fused ? clamp((heat - 42) / 52 + pressBoost * 0.95, 0, 1) : 0;
  const holeR = r * clamp(0.39 - heat / 250 - pressBoost * 0.18, 0, 0.39);
  if (holeR <= r * 0.035 || holeFade >= 0.98) return;
  const pegR = holeR * 0.8;
  ctx.save();
  ctx.globalAlpha = 1 - holeFade * 0.66;
  ctx.fillStyle = "rgba(99, 112, 126, 0.5)";
  ctx.beginPath();
  ctx.arc(x, y, pegR, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "rgba(255,255,255,0.42)";
  ctx.beginPath();
  ctx.arc(x - pegR * 0.22, y - pegR * 0.22, pegR * 0.36, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

export function fusedColor(code, heat) {
  const base = palette[code] || "#999";
  // Only beads that are really cooked start tinting — real perler beads keep
  // their color through most of the iron pass and only yellow when scorched.
  const hotAmount = clamp((heat - 105) / 60, 0, 0.34);
  return heat > 105 ? mixColor(base, "#e8a472", hotAmount) : base;
}

export function roundedRect(x, y, w, h, r) {
  const ctx = scene;
  const radius = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + w - radius, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + radius);
  ctx.lineTo(x + w, y + h - radius);
  ctx.quadraticCurveTo(x + w, y + h, x + w - radius, y + h);
  ctx.lineTo(x + radius, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
}

export function roundedPath(ctx, x, y, w, h, r) {
  const radius = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + w - radius, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + radius);
  ctx.lineTo(x + w, y + h - radius);
  ctx.quadraticCurveTo(x + w, y + h, x + w - radius, y + h);
  ctx.lineTo(x + radius, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
}

export function wrapText(text, x, y, maxWidth, lineHeight) {
  const ctx = scene;
  let line = "";
  const chars = [...text];
  chars.forEach((char) => {
    const test = line + char;
    if (ctx.measureText(test).width > maxWidth && line) {
      ctx.fillText(line, x, y);
      line = char;
      y += lineHeight;
    } else {
      line = test;
    }
  });
  if (line) ctx.fillText(line, x, y);
}

export function fitText(ctx, text, maxWidth) {
  if (maxWidth <= 0) return "";
  if (ctx.measureText(text).width <= maxWidth) return text;
  const ellipsis = "…";
  let out = text;
  while (out.length > 0 && ctx.measureText(`${out}${ellipsis}`).width > maxWidth) {
    out = out.slice(0, -1);
  }
  return out ? `${out}${ellipsis}` : ellipsis;
}

export function drawPreview() {
  setupHiDpiCanvas(previewCanvas, preview);
  const { w, h, cell, x0, y0 } = getPreviewLayout();
  preview.clearRect(0, 0, w, h);
  preview.fillStyle = "#f7f8fa";
  preview.fillRect(0, 0, w, h);
  const pattern = state.selectedPattern;
  preview.save();
  preview.fillStyle = "#fbfcfe";
  roundedPath(preview, x0 - 8, y0 - 8, cell * pattern.size + 16, cell * pattern.size + 16, 8);
  preview.fill();
  const rows = getEffectiveTargetRows(pattern);
  for (let y = 0; y < pattern.size; y += 1) {
    for (let x = 0; x < pattern.size; x += 1) {
      const code = rows[y]?.[x] || ".";
      const px = x0 + x * cell;
      const py = y0 + y * cell;
      if (code === ".") {
        preview.fillStyle = (x + y) % 2 === 0 ? "#e8edf3" : "#eef2f7";
        preview.fillRect(px, py, cell - 1, cell - 1);
        continue;
      }
      preview.fillStyle = palette[code] || "#bbb";
      preview.fillRect(px, py, cell - 1, cell - 1);
    }
  }
  preview.strokeStyle = "rgba(120, 132, 148, 0.3)";
  preview.lineWidth = 1;
  preview.strokeRect(x0 - 0.5, y0 - 0.5, cell * pattern.size + 1, cell * pattern.size + 1);
  preview.restore();
}

export function getPreviewLayout() {
  const rect = previewCanvas.getBoundingClientRect();
  const w = rect.width;
  const h = rect.height;
  const size = state.selectedPattern.size;
  // Fix the board to a constant square footprint so changing the grid
  // resolution (size) only changes cell density, not the total board area.
  const boardSide = Math.max(1, Math.min(w - 28, h - 28));
  const cell = boardSide / size;
  const x0 = (w - boardSide) / 2;
  const y0 = (h - boardSide) / 2;
  return { w, h, cell, x0, y0, size };
}

export function previewCellFromPoint(clientX, clientY) {
  const rect = previewCanvas.getBoundingClientRect();
  const x = clientX - rect.left;
  const y = clientY - rect.top;
  const layout = getPreviewLayout();
  if (x < layout.x0 || y < layout.y0) return null;
  if (x > layout.x0 + layout.cell * layout.size || y > layout.y0 + layout.cell * layout.size) return null;
  return {
    x: clamp(Math.floor((x - layout.x0) / layout.cell), 0, layout.size - 1),
    y: clamp(Math.floor((y - layout.y0) / layout.cell), 0, layout.size - 1),
  };
}

export function updateInspectAssistCanvases() {
  if (!els.colorPalette || state.phase !== "inspect") return;
  const zoomCanvas = els.colorPalette.querySelector(".inspect-zoom");
  const fuseCanvas = els.colorPalette.querySelector(".inspect-fuse");
  if (!zoomCanvas || !fuseCanvas) return;
  drawInspectZoomCanvas(zoomCanvas);
  drawInspectFusePreviewCanvas(fuseCanvas);
}

export function inspectFocusCell() {
  const pointerCell = boardCellFromPoint(state.pointer.x, state.pointer.y);
  if (pointerCell) return pointerCell;
  if (state.spill) {
    const index = state.spill.index;
    const size = state.selectedPattern.size;
    return { x: index % size, y: Math.floor(index / size) };
  }
  if (state.errors.length) {
    const index = state.errors[0].index;
    const size = state.selectedPattern.size;
    return { x: index % size, y: Math.floor(index / size) };
  }
  const index = state.placed.findIndex(Boolean);
  if (index >= 0) {
    const size = state.selectedPattern.size;
    return { x: index % size, y: Math.floor(index / size) };
  }
  const center = Math.floor((state.selectedPattern.size - 1) / 2);
  return { x: center, y: center };
}

export function drawInspectZoomCanvas(canvas) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  setupHiDpiCanvas(canvas, ctx);
  const rect = canvas.getBoundingClientRect();
  const w = Math.max(1, rect.width);
  const h = Math.max(1, rect.height);
  ctx.clearRect(0, 0, w, h);

  const focus = inspectFocusCell();
  const size = state.selectedPattern.size;
  const radius = 3;
  const gridCount = radius * 2 + 1;
  const padding = 10;
  const cell = Math.floor(Math.min((w - padding * 2) / gridCount, (h - padding * 2) / gridCount));
  const gridW = cell * gridCount;
  const gridH = cell * gridCount;
  const x0 = Math.floor((w - gridW) / 2);
  const y0 = Math.floor((h - gridH) / 2);
  const errorMap = new Map(state.errors.map((error) => [error.index, error.type]));

  // Looks like a zoomed-in slice of the real board: same matte board surface,
  // empty cells show a peg, placed cells show a real bead.
  ctx.fillStyle = "#eef2f4";
  roundedPath(ctx, 0.5, 0.5, w - 1, h - 1, 10);
  ctx.fill();
  ctx.strokeStyle = "rgba(101, 115, 130, 0.28)";
  ctx.lineWidth = 1;
  ctx.stroke();

  // Board panel under the grid
  const boardPad = 4;
  ctx.fillStyle = "#cfd7d9";
  roundedPath(ctx, x0 - boardPad, y0 - boardPad, gridW + boardPad * 2, gridH + boardPad * 2, 6);
  ctx.fill();
  ctx.strokeStyle = "rgba(99, 112, 132, 0.32)";
  ctx.stroke();

  for (let gy = 0; gy < gridCount; gy += 1) {
    for (let gx = 0; gx < gridCount; gx += 1) {
      const bx = focus.x + gx - radius;
      const by = focus.y + gy - radius;
      const px = x0 + gx * cell;
      const py = y0 + gy * cell;
      const inRange = bx >= 0 && by >= 0 && bx < size && by < size;
      if (!inRange) continue;

      const index = indexFor(bx, by);
      const placed = state.placed[index];
      const target = targetAt(bx, by);
      const cx = px + cell / 2;
      const cy = py + cell / 2;

      // Empty pegboard hole (looks like the real board)
      ctx.fillStyle = "rgba(120, 128, 140, 0.28)";
      ctx.beginPath();
      ctx.arc(cx, cy, cell * 0.18, 0, Math.PI * 2);
      ctx.fill();

      if (target && !placed) {
        // Target hint: faint colored ring
        ctx.strokeStyle = palette[target] || "#bbb";
        ctx.globalAlpha = 0.55;
        ctx.lineWidth = Math.max(1.4, cell * 0.05);
        ctx.beginPath();
        ctx.arc(cx, cy, cell * 0.36, 0, Math.PI * 2);
        ctx.stroke();
        ctx.globalAlpha = 1;
      }

      if (placed) {
        const beadR = cell * 0.42;
        // Soft drop shadow
        ctx.fillStyle = "rgba(0,0,0,0.16)";
        ctx.beginPath();
        ctx.arc(cx + cell * 0.04, cy + cell * 0.06, beadR, 0, Math.PI * 2);
        ctx.fill();
        // Bead body
        ctx.fillStyle = palette[placed] || "#bbb";
        ctx.beginPath();
        ctx.arc(cx, cy, beadR, 0, Math.PI * 2);
        ctx.fill();
        // Outline
        ctx.strokeStyle = "rgba(0,0,0,0.18)";
        ctx.lineWidth = Math.max(1, cell * 0.04);
        ctx.beginPath();
        ctx.arc(cx, cy, beadR, 0, Math.PI * 2);
        ctx.stroke();
        // Highlight
        ctx.fillStyle = "rgba(255,255,255,0.34)";
        ctx.beginPath();
        ctx.arc(cx - beadR * 0.28, cy - beadR * 0.28, beadR * 0.22, 0, Math.PI * 2);
        ctx.fill();
        // Center hole (matches real beads)
        ctx.fillStyle = "rgba(60, 68, 80, 0.36)";
        ctx.beginPath();
        ctx.arc(cx, cy, beadR * 0.24, 0, Math.PI * 2);
        ctx.fill();
      }

      if (state.showHints && errorMap.has(index)) {
        const type = errorMap.get(index);
        ctx.strokeStyle = type === "wrong" ? "rgba(220, 68, 76, 0.9)" : "rgba(217, 143, 48, 0.92)";
        ctx.lineWidth = 2;
        ctx.strokeRect(px + 1.5, py + 1.5, cell - 3, cell - 3);
      }
    }
  }

  // Center reticle marking the focus cell
  const centerX = x0 + radius * cell + cell / 2;
  const centerY = y0 + radius * cell + cell / 2;
  ctx.strokeStyle = "rgba(66, 96, 131, 0.85)";
  ctx.lineWidth = 2;
  ctx.strokeRect(centerX - cell / 2 + 1, centerY - cell / 2 + 1, cell - 2, cell - 2);
}

export function drawInspectFusePreviewCanvas(canvas) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  setupHiDpiCanvas(canvas, ctx);
  const rect = canvas.getBoundingClientRect();
  const w = Math.max(1, rect.width);
  const h = Math.max(1, rect.height);
  ctx.clearRect(0, 0, w, h);
  const bg = ctx.createLinearGradient(0, 0, 0, h);
  bg.addColorStop(0, "#fbfcfe");
  bg.addColorStop(1, "#edf2f7");
  ctx.fillStyle = bg;
  roundedPath(ctx, 0.5, 0.5, w - 1, h - 1, 10);
  ctx.fill();
  ctx.strokeStyle = "rgba(101, 115, 130, 0.28)";
  ctx.lineWidth = 1;
  ctx.stroke();

  const size = state.selectedPattern.size;
  const cells = [];
  let minX = size;
  let minY = size;
  let maxX = -1;
  let maxY = -1;
  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      const index = indexFor(x, y);
      const code = state.placed[index];
      if (!code) continue;
      cells.push({ x, y, index, code });
      minX = Math.min(minX, x);
      minY = Math.min(minY, y);
      maxX = Math.max(maxX, x);
      maxY = Math.max(maxY, y);
    }
  }

  if (!cells.length) {
    ctx.fillStyle = "rgba(67, 77, 91, 0.58)";
    ctx.font = "600 13px Avenir Next, PingFang SC, Hiragino Sans GB, Microsoft YaHei, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("还没有可预览的拼豆", w / 2, h / 2 + 4);
    return;
  }

  const spanX = maxX - minX + 1;
  const spanY = maxY - minY + 1;
  const padding = 16;
  const cell = Math.max(4, Math.floor(Math.min((w - padding * 2) / spanX, (h - padding * 2) / spanY)));
  const drawW = spanX * cell;
  const drawH = spanY * cell;
  const x0 = Math.floor((w - drawW) / 2);
  const y0 = Math.floor((h - drawH) / 2);
  const placedSet = new Set(cells.map((cellData) => `${cellData.x}:${cellData.y}`));
  const has = (x, y) => placedSet.has(`${x}:${y}`);
  const centerMap = new Map();

  cells.forEach((cellData) => {
    centerMap.set(`${cellData.x}:${cellData.y}`, {
      x: x0 + (cellData.x - minX) * cell + cell / 2,
      y: y0 + (cellData.y - minY) * cell + cell / 2,
    });
  });

  cells.forEach((cellData) => {
    const { x, y, code, index } = cellData;
    const centerA = centerMap.get(`${x}:${y}`);
    const heatA = clamp((state.heat[index] || 0) + 68, 0, 138);
    const colorA = fusedColor(code, heatA);
    const drawBridge = (nx, ny) => {
      if (!has(nx, ny)) return;
      const nIndex = indexFor(nx, ny);
      const heatB = clamp((state.heat[nIndex] || 0) + 68, 0, 138);
      const centerB = centerMap.get(`${nx}:${ny}`);
      if (!centerB) return;
      const colorB = fusedColor(state.placed[nIndex], heatB);
      const gradient = ctx.createLinearGradient(centerA.x, centerA.y, centerB.x, centerB.y);
      gradient.addColorStop(0, colorA);
      gradient.addColorStop(1, colorB);
      const blendHeat = Math.min(heatA, heatB);
      const fuse = clamp((blendHeat - 30) / 58 + 0.32, 0, 1);
      const spread = lerp(cell * 0.44, cell * 0.86, easeOut(fuse));
      drawGradientCapsuleBridge(ctx, centerA, centerB, spread, spread * 0.38, gradient, 0.96);
    };

    drawBridge(x + 1, y);
    drawBridge(x, y + 1);
  });

  cells.forEach((cellData) => {
    const { x, y, code, index } = cellData;
    const center = centerMap.get(`${x}:${y}`);
    const heat = clamp((state.heat[index] || 0) + 68, 0, 138);
    const color = fusedColor(code, heat);
    const edge = mixColor(color, "#ffffff", 0.18);
    const shape = boardFusionShapeProfile(x, y);
    const edges = shape.edges;
    const halfConnected = cell * 0.5;
    const halfExposed = cell * 0.62;
    const halfL = edges.left ? halfExposed : halfConnected;
    const halfR = edges.right ? halfExposed : halfConnected;
    const halfU = edges.up ? halfExposed : halfConnected;
    const halfD = edges.down ? halfExposed : halfConnected;
    const cornerFor = (sideA, sideB, hA, hB) => {
      const a = edges[sideA];
      const b = edges[sideB];
      const cap = Math.min(hA, hB);
      if (a && b) return cap;
      if (a || b) return cap * 0.55;
      return cap * 0.08;
    };
    const rTL = cornerFor("up", "left", halfU, halfL);
    const rTR = cornerFor("up", "right", halfU, halfR);
    const rBR = cornerFor("down", "right", halfD, halfR);
    const rBL = cornerFor("down", "left", halfD, halfL);
    const buildPath = () => {
      const left = center.x - halfL;
      const right = center.x + halfR;
      const top = center.y - halfU;
      const bottom = center.y + halfD;
      ctx.beginPath();
      ctx.moveTo(left + rTL, top);
      ctx.lineTo(right - rTR, top);
      ctx.arcTo(right, top, right, top + rTR, rTR);
      ctx.lineTo(right, bottom - rBR);
      ctx.arcTo(right, bottom, right - rBR, bottom, rBR);
      ctx.lineTo(left + rBL, bottom);
      ctx.arcTo(left, bottom, left, bottom - rBL, rBL);
      ctx.lineTo(left, top + rTL);
      ctx.arcTo(left, top, left + rTL, top, rTL);
      ctx.closePath();
    };

    ctx.fillStyle = color;
    buildPath();
    ctx.fill();

    ctx.strokeStyle = edge;
    ctx.lineWidth = Math.max(0.9, cell * 0.052);
    buildPath();
    ctx.stroke();
  });
}
export function placedCount() {
  return Object.values(getPlacedCounts()).reduce((sum, count) => sum + count, 0);
}

export function pointerToCanvas(event) {
  const rect = sceneCanvas.getBoundingClientRect();
  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top,
  };
}

export function boardCellFromPoint(x, y) {
  const layout = currentLayout();
  const view = boardViewTransform(layout);
  const ux = (x - (view.cx + view.panX)) / view.scale + view.cx;
  const uy = (y - (view.cy + view.panY)) / view.scale + view.cy;
  const { boardX, boardY, boardSize, cell } = layout;
  const pad = Math.max(5, cell * 0.24);
  if (ux < boardX - pad || uy < boardY - pad || ux > boardX + boardSize + pad || uy > boardY + boardSize + pad) return null;
  const clampedX = clamp(ux, boardX, boardX + boardSize - 0.01);
  const clampedY = clamp(uy, boardY, boardY + boardSize - 0.01);
  return {
    x: clamp(Math.floor((clampedX - boardX) / cell), 0, state.selectedPattern.size - 1),
    y: clamp(Math.floor((clampedY - boardY) / cell), 0, state.selectedPattern.size - 1),
  };
}

export function pointInTray(x, y) {
  const layout = currentLayout();
  return x >= layout.trayX && y >= layout.trayY && x <= layout.trayX + layout.trayW && y <= layout.trayY + layout.trayH;
}

export function trayDumpButtonRect(layout = currentLayout()) {
  const size = clamp(layout.trayW * 0.06, 22, 28);
  return {
    x: layout.trayX + layout.trayW - size - 8,
    y: layout.trayY + 8,
    w: size,
    h: size,
  };
}

export function pointInTrayDumpButton(x, y) {
  const rect = trayDumpButtonRect();
  return x >= rect.x && y >= rect.y && x <= rect.x + rect.w && y <= rect.y + rect.h;
}
export function inspectionSummary() {
  return state.errors.reduce((summary, error) => {
    summary[error.type] += 1;
    return summary;
  }, { missing: 0, wrong: 0, extra: 0 });
}

export function placementAccuracy() {
  if (state.sandboxMode) return 1;
  const total = getTargetTotal();
  if (!total) return 1;
  let correct = 0;
  const size = state.selectedPattern.size;
  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      const target = targetAt(x, y);
      if (target && state.placed[indexFor(x, y)] === target) correct += 1;
    }
  }
  return correct / total;
}

export function heatStats() {
  const total = getTargetTotal();
  let bonded = 0;
  let ideal = 0;
  let over = 0;
  let heated = 0;
  state.heat.forEach((heat, index) => {
    if (!state.placed[index]) return;
    if (heat > 8) heated += 1;
    if (heat >= 38) bonded += 1;
    if (heat >= 52 && heat <= 96) ideal += 1;
    if (heat > 108) over += 1;
  });
  return {
    total,
    bonded,
    ideal,
    over,
    heated,
    bondedPercent: total ? (bonded / total) * 100 : 0,
    idealPercent: total ? (ideal / total) * 100 : 0,
    overPercent: total ? (over / total) * 100 : 0,
  };
}

export function estimateWarp() {
  const stats = heatStats();
  const under = Math.max(0, stats.total - stats.bonded);
  return clamp(14 + under * 0.08 + stats.over * 0.42, 0, 75);
}


export function drawShareImage(ctx, w, h, portrait) {
  const bg = ctx.createLinearGradient(0, 0, w, h);
  bg.addColorStop(0, "#fff7f3");
  bg.addColorStop(0.52, "#eef8f5");
  bg.addColorStop(1, "#f6f1ff");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  ctx.fillStyle = "rgba(231, 100, 95, 0.12)";
  for (let i = 0; i < 18; i += 1) {
    const x = (i * 137) % w;
    const y = (i * 211) % h;
    ctx.beginPath();
    ctx.arc(x, y, 18 + (i % 4) * 7, 0, Math.PI * 2);
    ctx.fill();
  }

  const margin = portrait ? 88 : 72;
  const artSize = portrait ? 760 : 610;
  const artX = (w - artSize) / 2;
  const artY = portrait ? 300 : 220;

  ctx.fillStyle = "#26242b";
  ctx.font = "800 54px Avenir Next, PingFang SC, Hiragino Sans GB, Microsoft YaHei, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("女朋友爱玩的拼豆", w / 2, portrait ? 126 : 108);
  ctx.font = "700 32px Avenir Next, PingFang SC, Hiragino Sans GB, Microsoft YaHei, sans-serif";
  ctx.fillStyle = "#686572";
  ctx.fillText(`今天做：${state.selectedPattern.name}`, w / 2, portrait ? 178 : 154);

  drawShareArtwork(ctx, artX, artY, artSize);

  const statsY = artY + artSize + (portrait ? 86 : 70);
  drawShareStats(ctx, margin, statsY, w - margin * 2);

  ctx.textAlign = "center";
  ctx.fillStyle = "rgba(38, 36, 43, 0.72)";
  ctx.font = "700 28px Avenir Next, PingFang SC, Hiragino Sans GB, Microsoft YaHei, sans-serif";
  ctx.fillText("拼豆工坊 · 浏览器手作模拟", w / 2, h - 76);
  ctx.font = "600 22px Avenir Next, PingFang SC, Hiragino Sans GB, Microsoft YaHei, sans-serif";
  ctx.fillStyle = "rgba(38, 36, 43, 0.46)";
  ctx.fillText(useMobileDirectPlacement() ? "从豆盒选色、直接摆放到熨烫定型" : "从散豆、豆筛、镊子到熨烫定型", w / 2, h - 42);

  ctx.save();
  ctx.translate(w - 42, h * 0.55);
  ctx.rotate(-Math.PI / 2);
  ctx.fillStyle = "rgba(38, 36, 43, 0.18)";
  ctx.font = "800 24px Avenir Next, PingFang SC, Hiragino Sans GB, Microsoft YaHei, sans-serif";
  ctx.fillText("拼豆工坊 WATERMARK", 0, 0);
  ctx.restore();
}

export function drawShareArtwork(ctx, x, y, size) {
  ctx.save();
  ctx.shadowColor = "rgba(38, 36, 43, 0.2)";
  ctx.shadowBlur = 34;
  ctx.shadowOffsetY = 22;
  ctx.fillStyle = "rgba(255,255,255,0.86)";
  roundedPath(ctx, x - 26, y - 26, size + 52, size + 52, 22);
  ctx.fill();
  ctx.shadowColor = "transparent";

  ctx.fillStyle = "#fbfcfd";
  roundedPath(ctx, x, y, size, size, 16);
  ctx.fill();
  const pattern = state.selectedPattern;
  const cell = size / pattern.size;
  const hasPlaced = placedCount() > 0;
  for (let py = 0; py < pattern.size; py += 1) {
    for (let px = 0; px < pattern.size; px += 1) {
      const index = indexFor(px, py);
      const code = hasPlaced ? state.placed[index] : targetAt(px, py);
      const cx = x + px * cell + cell / 2;
      const cy = y + py * cell + cell / 2;
      ctx.strokeStyle = "rgba(117, 126, 139, 0.12)";
      ctx.strokeRect(x + px * cell, y + py * cell, cell, cell);
      if (!code) continue;
      const heat = state.heat[index] || (state.phase === "finish" ? 66 : 0);
      if (heat > 34 || state.phase === "finish") {
        ctx.fillStyle = fusedColor(code, Math.max(heat, 58));
        roundedPath(ctx, x + px * cell + cell * 0.04, y + py * cell + cell * 0.04, cell * 0.92, cell * 0.92, cell * 0.12);
        ctx.fill();
      } else {
        drawBead(ctx, cx, cy, cell * 0.39, code, heat, false);
      }
    }
  }
  ctx.strokeStyle = "rgba(38, 36, 43, 0.18)";
  ctx.lineWidth = 5;
  roundedPath(ctx, x, y, size, size, 16);
  ctx.stroke();
  ctx.restore();
}

export function drawShareStats(ctx, x, y, w) {
  const stats = [
    ["图纸", state.selectedPattern.name],
    ["颗数", `${getTargetTotal()}颗`],
    ["色号", `${getPatternColors().length}色`],
    ["评级", finalGrade()],
  ];
  const gap = 14;
  const boxW = (w - gap * 3) / 4;
  stats.forEach(([label, value], i) => {
    const bx = x + i * (boxW + gap);
    ctx.fillStyle = "rgba(255,255,255,0.78)";
    roundedPath(ctx, bx, y, boxW, 92, 14);
    ctx.fill();
    ctx.fillStyle = "#8a8792";
    ctx.font = "700 20px Avenir Next, PingFang SC, Hiragino Sans GB, Microsoft YaHei, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(label, bx + boxW / 2, y + 32);
    ctx.fillStyle = "#26242b";
    ctx.font = "800 26px Avenir Next, PingFang SC, Hiragino Sans GB, Microsoft YaHei, sans-serif";
    ctx.fillText(value, bx + boxW / 2, y + 66);
  });
}


export function scoreLabel() {
  if (state.sandboxMode) return "沙盒";
  if (state.phase === "choose") return "未开始";
  if (state.phase === "finish") return `评级 ${finalGrade()}`;
  const acc = placementAccuracy();
  if (acc >= 0.92) return "出色";
  if (acc >= 0.78) return "良好";
  if (acc >= 0.55) return "一般";
  return "需调整";
}

export function finalGrade() {
  if (state.sandboxMode) return "沙盒";
  const accuracy = placementAccuracy();
  const heat = heatStats();
  const mildYellow = Math.max(0, heat.overPercent - 8);
  const severeBurn = Math.max(0, heat.overPercent - 24);
  const yellowPenalty = mildYellow * 0.28 + severeBurn * 0.4;
  const heatScore = clamp(heat.idealPercent - yellowPenalty, 0, 100) / 100;
  const flat = clamp(100 - state.warp, 0, 100) / 100;
  const cool = clamp(state.cooling, 0, 100) / 100;
  const score = accuracy * 0.42 + heatScore * 0.36 + flat * 0.14 + cool * 0.08;
  if (score >= 0.93) return "S";
  if (score >= 0.84) return "A";
  if (score >= 0.72) return "B";
  if (score >= 0.58) return "C";
  return "D";
}

export function statusText() {
  const phase = state.phase;
  if (state.sandboxMode && phase === "place") {
    return useMobileDirectPlacement()
      ? "沙盒模式：自由拼摆中。从豆盒选色，直接点格子摆放。"
      : "沙盒模式：自由拼摆中。点豆筛取豆、任意排布，不受图纸限制。";
  }
  if (phase === "choose") return "选择一张图纸，开始今天的手作。";
  if (phase === "place") {
    if (state.spill) return "有豆子倒下来卡住了。可先继续摆放，熨烫前再处理。";
    if (useMobileDirectPlacement()) {
      return `已选 ${beadLabel(state.selectedColor)} · 点格子放置或替换。${state.lampOn ? " 投影开" : ""}`;
    }
    if (state.tool === "needle") {
      if (!state.trayColor) return `针工具需要先把某个色号倒入豆筛。${state.lampOn ? " 投影色稿已开启。" : " 可打开工作灯查看投影色稿。"} `;
      return `豆筛 ${state.trayBeans} 颗 ${beadIds[state.trayColor]} · ${state.lampOn ? "投影开" : "投影关"}`;
    }
    return state.tweezerBead
      ? `镊子夹着 ${beadLabel(state.tweezerBead)} · ${state.lampOn ? "投影开" : "投影关"}`
      : `点豆筛夹一颗，或从板面取一颗，再放到板上。${state.lampOn ? " 投影色稿已开启。" : ""}`;
  }
  if (phase === "inspect") {
    if (state.spill) return "还有倒下的豆子未处理。继续熨烫会糊坏该位置。";
    return state.errors.length ? "检查到需要修正的位置。" : "板面检查通过，可以盖纸熨烫。";
  }
  if (phase === "iron") return "控制速度、压力和温度，让豆子刚好粘连。";
  if (phase === "cool") return "等待冷却，压平边缘，准备取下作品。";
  return `${state.selectedPattern.name}完成，已进入收藏阶段。`;
}
