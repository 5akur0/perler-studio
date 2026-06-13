import { palette, beadIds } from './palette.js';
import { patterns } from './patterns-data.js';
import { allColorCodes } from './pattern.js';
import { encodePatternCode, decodePatternCode, extractPatternCode } from './pattern-code.js';
import { els } from './dom.js';
import { clamp } from './color-utils.js';
import { maxBoardScale } from './render.js';
import { showToast } from './notify.js';
import { confirmModal } from './modal-controller.js';
import { pickCustomPatternNote } from './utils.js';
import { state } from './state.js';
import { extractCloudShortId, requestShareApi } from './gallery.js';
import { icon } from './icons.js';

const drawActions = {
  loadPattern: () => {},
  setAppMode: () => {},
  openSettingsModal: () => {},
  openGallerySubmitModal: () => {},
  importPatternCode: async () => false,
  autoCopyText: async () => false,
  requestCloudShareForPattern: async () => null,
};

export function setDrawActions(actions) {
  Object.assign(drawActions, actions);
}

export function getDrawKeyboardNav() {
  return drawKbdNav;
}

const drawState = {
  size: 24,
  width: 24,
  height: 24,
  tool: "brush",
  shapeMode: "rect",
  selectedColor: "K",
  grid: [],
  drawing: false,
  lastCellKey: "",
  view: { scale: 1, panX: 0, panY: 0, velX: 0, velY: 0, velScale: 0 },
  recentColors: [],
  undoStack: [],
  undoStrokeSnapshotTaken: false,
  shapeDrag: null,
  shapeDragEnd: null,
};
const drawKbdNav = { up: false, down: false, left: false, right: false, zoomIn: false, zoomOut: false };
const drawPointers = {};
let drawGesture = null;
let drawRenderKey = "";
const minDrawDimension = 3;
const maxDrawDimension = 100;

function normalizeDrawDimension(value, fallback = 24) {
  const parsed = Number.parseInt(value, 10);
  const fallbackValue = Number.parseInt(fallback, 10);
  if (!Number.isFinite(parsed)) {
    return clamp(Number.isFinite(fallbackValue) ? fallbackValue : 24, minDrawDimension, maxDrawDimension);
  }
  return clamp(parsed, minDrawDimension, maxDrawDimension);
}

function normalizeDrawSizeValues(
  widthValue,
  heightValue,
  fallbackWidth = drawWidth(),
  fallbackHeight = drawHeight()
) {
  return {
    width: normalizeDrawDimension(widthValue, fallbackWidth),
    height: normalizeDrawDimension(heightValue, fallbackHeight),
  };
}

function drawWidth() {
  return drawState.width || drawState.size || 24;
}

function drawHeight() {
  return drawState.height || drawState.size || 24;
}

function drawSquareSize() {
  return Math.max(drawWidth(), drawHeight());
}

function createDrawGrid(width, height = width, fill = ".") {
  return Array(width * height).fill(fill);
}

function drawIndex(x, y, width = drawWidth()) {
  return y * width + x;
}

function recordRecentColor(code) {
  if (!code || code === ".") return false;
  const arr = drawState.recentColors;
  const i = arr.indexOf(code);
  if (i === 0) return false;
  if (i !== -1) arr.splice(i, 1);
  arr.unshift(code);
  if (arr.length > 5) arr.length = 5;
  return true;
}

function ensureDrawPaletteColor() {
  const codes = allColorCodes();
  if (!codes.length) return;
  if (!codes.includes(drawState.selectedColor)) {
    drawState.selectedColor = codes[0];
  }
}

function ensureDrawGrid() {
  const width = drawWidth();
  const height = drawHeight();
  drawState.size = drawSquareSize();
  if (drawState.grid.length !== width * height) {
    drawState.grid = createDrawGrid(width, height);
  }
}

function getDrawGeometry() {
  const canvas = els.drawCanvas;
  if (!canvas) return null;
  const cssW = Math.max(220, Math.round(canvas.clientWidth || 640));
  const cssH = Math.max(220, Math.round(canvas.clientHeight || 640));
  const width = drawWidth();
  const height = drawHeight();
  const cell = Math.floor(Math.min(cssW / width, cssH / height));
  const gridW = cell * width;
  const gridH = cell * height;
  const gridSize = Math.max(gridW, gridH);
  const x0 = Math.floor((cssW - gridW) / 2);
  const y0 = Math.floor((cssH - gridH) / 2);
  const cx = x0 + gridW / 2;
  const cy = y0 + gridH / 2;
  return { cssW, cssH, width, height, size: Math.max(width, height), cell, gridW, gridH, gridSize, x0, y0, cx, cy };
}

function clampDrawView() {
  const v = drawState.view;
  const g = getDrawGeometry();
  if (g) v.scale = clamp(v.scale, 1, maxBoardScale(g));
  if (v.scale <= 1.001) {
    v.scale = 1;
    v.panX = 0;
    v.panY = 0;
    return;
  }
  if (!g) return;
  const maxPan = g.gridSize * (v.scale - 1) / 2 + 32;
  v.panX = clamp(v.panX, -maxPan, maxPan);
  v.panY = clamp(v.panY, -maxPan, maxPan);
}

function setDrawZoom(nextScale, nextPanX, nextPanY) {
  const v = drawState.view;
  const g = getDrawGeometry();
  v.scale = clamp(nextScale, 1, maxBoardScale(g));
  v.panX = nextPanX ?? v.panX;
  v.panY = nextPanY ?? v.panY;
  clampDrawView();
  paintDrawCanvas();
}

export function tickDrawKbdNav(dtSec) {
  if (state.appMode !== "draw") return;
  const nav = drawKbdNav;
  const v = drawState.view;

  const PAN_ACCEL = 2200;
  const PAN_DECEL = 5000;
  const PAN_MAX   = 560;
  const ZOOM_ACCEL = 4.5;
  const ZOOM_DECEL = 10;
  const ZOOM_MAX   = maxBoardScale(getDrawGeometry()) - 1;

  const wantLeft  = nav.left  && !nav.right;
  const wantRight = nav.right && !nav.left;
  if (wantLeft)         v.velX = Math.min( PAN_MAX,  v.velX + PAN_ACCEL * dtSec);
  else if (wantRight)   v.velX = Math.max(-PAN_MAX,  v.velX - PAN_ACCEL * dtSec);
  else if (v.velX > 0)  v.velX = Math.max(0, v.velX - PAN_DECEL * dtSec);
  else if (v.velX < 0)  v.velX = Math.min(0, v.velX + PAN_DECEL * dtSec);

  const wantUp   = nav.up   && !nav.down;
  const wantDown = nav.down && !nav.up;
  if (wantUp)           v.velY = Math.min( PAN_MAX,  v.velY + PAN_ACCEL * dtSec);
  else if (wantDown)    v.velY = Math.max(-PAN_MAX,  v.velY - PAN_ACCEL * dtSec);
  else if (v.velY > 0)  v.velY = Math.max(0, v.velY - PAN_DECEL * dtSec);
  else if (v.velY < 0)  v.velY = Math.min(0, v.velY + PAN_DECEL * dtSec);

  const wantIn  = nav.zoomIn  && !nav.zoomOut;
  const wantOut = nav.zoomOut && !nav.zoomIn;
  if (wantIn)               v.velScale = Math.min( ZOOM_MAX, v.velScale + ZOOM_ACCEL * dtSec);
  else if (wantOut)         v.velScale = Math.max(-ZOOM_MAX, v.velScale - ZOOM_ACCEL * dtSec);
  else if (v.velScale > 0)  v.velScale = Math.max(0, v.velScale - ZOOM_DECEL * dtSec);
  else if (v.velScale < 0)  v.velScale = Math.min(0, v.velScale + ZOOM_DECEL * dtSec);

  const movingPan  = Math.abs(v.velX) > 0.5 || Math.abs(v.velY) > 0.5;
  const movingZoom = Math.abs(v.velScale) > 0.001;
  if (movingPan || movingZoom) {
    const prevX = v.panX;
    const prevY = v.panY;
    setDrawZoom(v.scale + v.velScale * dtSec, v.panX + v.velX * dtSec, v.panY + v.velY * dtSec);
    if (v.panX === prevX) v.velX = 0;
    if (v.panY === prevY) v.velY = 0;
  }
}

function startDrawGesture() {
  const ids = Object.keys(drawPointers);
  if (ids.length < 2) return;
  const p1 = drawPointers[ids[0]];
  const p2 = drawPointers[ids[1]];
  const mid = { x: (p1.x + p2.x) / 2, y: (p1.y + p2.y) / 2 };
  const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
  drawGesture = {
    active: true,
    startDist: Math.max(16, dist),
    startScale: drawState.view.scale,
    startPanX: drawState.view.panX,
    startPanY: drawState.view.panY,
    startMidX: mid.x,
    startMidY: mid.y,
  };
}

function updateDrawGesture() {
  if (!drawGesture?.active) return;
  const ids = Object.keys(drawPointers);
  if (ids.length < 2) return;
  const p1 = drawPointers[ids[0]];
  const p2 = drawPointers[ids[1]];
  const mid = { x: (p1.x + p2.x) / 2, y: (p1.y + p2.y) / 2 };
  const dist = Math.max(16, Math.hypot(p1.x - p2.x, p1.y - p2.y));
  const g = getDrawGeometry();
  if (!g) return;
  const nextScale = clamp(drawGesture.startScale * (dist / drawGesture.startDist), 1, maxBoardScale(g));
  const { cx, cy } = g;
  const startScale = Math.max(0.0001, drawGesture.startScale);
  // Keep the midpoint pinch-center locked to the same grid point
  const anchorX = (drawGesture.startMidX - cx - drawGesture.startPanX) / startScale + cx;
  const anchorY = (drawGesture.startMidY - cy - drawGesture.startPanY) / startScale + cy;
  drawState.view.panX = mid.x - cx - (anchorX - cx) * nextScale;
  drawState.view.panY = mid.y - cy - (anchorY - cy) * nextScale;
  drawState.view.scale = nextScale;
  clampDrawView();
  paintDrawCanvas();
}

function resetDrawView() {
  drawState.view.scale = 1;
  drawState.view.panX = 0;
  drawState.view.panY = 0;
}

function setDrawSize(nextWidth, nextHeight = nextWidth) {
  const { width, height } = normalizeDrawSizeValues(nextWidth, nextHeight);
  drawState.width = width;
  drawState.height = height;
  drawState.size = Math.max(width, height);
  drawState.grid = createDrawGrid(width, height);
  drawState.undoStack = [];
  drawState.undoStrokeSnapshotTaken = false;
  if (els.drawUndoButton) els.drawUndoButton.disabled = true;
  resetDrawView();
  setDrawSizeControlValue(width, height);
  drawState.lastCellKey = "";
  renderDrawStudio();
}

function setDrawSizeControlValue(width = drawWidth(), height = drawHeight()) {
  const { width: normalizedWidth, height: normalizedHeight } = normalizeDrawSizeValues(width, height);
  if (els.drawSizeValue) els.drawSizeValue.textContent = `${normalizedWidth}×${normalizedHeight}`;
  if (els.drawWidthInput) els.drawWidthInput.value = String(normalizedWidth);
  if (els.drawHeightInput) els.drawHeightInput.value = String(normalizedHeight);
}

function resizeDrawGrid(oldGrid, oldWidth, oldHeight, newWidth, newHeight, anchorRow, anchorCol) {
  const offsetX = Math.round((anchorCol / 2) * (newWidth - oldWidth));
  const offsetY = Math.round((anchorRow / 2) * (newHeight - oldHeight));
  const newGrid = [];
  for (let ny = 0; ny < newHeight; ny += 1) {
    for (let nx = 0; nx < newWidth; nx += 1) {
      const ox = nx - offsetX;
      const oy = ny - offsetY;
      newGrid.push(
        ox >= 0 && ox < oldWidth && oy >= 0 && oy < oldHeight
          ? oldGrid[oy * oldWidth + ox]
          : "."
      );
    }
  }
  return newGrid;
}

let drawResizePending = { width: 0, height: 0, anchorRow: 1, anchorCol: 1 };

function openDrawResizeModal(newWidth, newHeight) {
  drawResizePending.width = newWidth;
  drawResizePending.height = newHeight;
  drawResizePending.anchorRow = 1;
  drawResizePending.anchorCol = 1;
  if (els.drawAnchorGrid) {
    els.drawAnchorGrid.querySelectorAll(".anchor-cell").forEach((btn) => {
      const r = Number(btn.dataset.row);
      const c = Number(btn.dataset.col);
      btn.setAttribute("aria-pressed", r === 1 && c === 1 ? "true" : "false");
    });
  }
  if (els.drawResizeModal) {
    els.drawResizeModal.classList.add("show");
    els.drawResizeModal.setAttribute("aria-hidden", "false");
  }
}

export function closeDrawResizeModal(restoreSelectValue) {
  if (els.drawResizeModal) {
    els.drawResizeModal.classList.remove("show");
    els.drawResizeModal.setAttribute("aria-hidden", "true");
  }
  if (restoreSelectValue) setDrawSizeControlValue(drawWidth(), drawHeight());
}

let drawCodeMode = "import";
export function openDrawCodeModal(mode, value = "") {
  if (!els.drawCodeModal) return;
  drawCodeMode = mode;
  const isExport = mode === "export";
  const isBead = mode === "import-bead";
  if (els.drawCodeModalTitle) els.drawCodeModalTitle.textContent = isExport ? "导出图纸" : "导入图纸";
  if (els.drawCodeHint) {
    els.drawCodeHint.textContent = isExport
      ? "已生成图纸短码或图纸码，可直接复制分享。"
      : (isBead ? "粘贴图纸码或短码，导入到拼豆台。" : "粘贴图纸码或短码，然后导入到绘图台。");
  }
  if (els.drawCodeInput) {
    els.drawCodeInput.value = value;
    els.drawCodeInput.readOnly = isExport;
    els.drawCodeInput.placeholder = isExport ? "这里会显示导出的图纸码或短码" : "粘贴图纸码或短码";
  }
  if (els.drawCodeCopyBtn) els.drawCodeCopyBtn.hidden = !isExport;
  if (els.drawCodeImportConfirmBtn) els.drawCodeImportConfirmBtn.hidden = isExport;
  els.drawCodeModal.classList.add("show");
  els.drawCodeModal.setAttribute("aria-hidden", "false");
  requestAnimationFrame(() => {
    if (isExport) els.drawCodeCopyBtn?.focus();
    else els.drawCodeInput?.focus();
  });
}

export function closeDrawCodeModal() {
  if (!els.drawCodeModal) return;
  els.drawCodeModal.classList.remove("show");
  els.drawCodeModal.setAttribute("aria-hidden", "true");
}

function drawRowsFromGrid() {
  const width = drawWidth();
  const height = drawHeight();
  const rows = [];
  for (let y = 0; y < height; y += 1) {
    rows.push(drawState.grid.slice(y * width, (y + 1) * width).join(""));
  }
  return rows;
}

function squareDrawRowsFromGrid() {
  const rows = drawRowsFromGrid();
  const width = drawWidth();
  const height = drawHeight();
  const size = Math.max(width, height);
  return Array.from({ length: size }, (_, y) => {
    const row = y < height ? rows[y] : "";
    return row.padEnd(size, ".");
  });
}

function makeDrawPattern(name = "绘制图纸") {
  ensureDrawGrid();
  const rows = squareDrawRowsFromGrid();
  const width = drawWidth();
  const height = drawHeight();
  const size = Math.max(width, height);
  return {
    id: "draw-export",
    name,
    size,
    width: size,
    height: size,
    sourceWidth: width,
    sourceHeight: height,
    rows,
    craft: "原版",
  };
}

function showDrawCodeOutput(value) {
  openDrawCodeModal("export", value);
}

async function exportDrawPatternCode(pattern, successMessage = "图纸码已复制。") {
  const code = encodePatternCode(pattern);
  showDrawCodeOutput(code);
  await drawActions.autoCopyText(code, successMessage, "图纸码已生成（复制失败，请手动复制）。");
}

function loadDrawRows(rows) {
  const height = rows.length;
  const width = Math.max(1, ...rows.map((row) => String(row || "").length));
  const normalizedSize = normalizeDrawSizeValues(width, height, 24, 24);
  drawState.width = normalizedSize.width;
  drawState.height = normalizedSize.height;
  drawState.size = Math.max(drawState.width, drawState.height);
  drawState.grid = [];
  for (let y = 0; y < drawState.height; y += 1) {
    const row = rows[y] || "";
    for (let x = 0; x < drawState.width; x += 1) {
      const code = row[x] || ".";
      drawState.grid.push(code === "." || palette[code] ? code : ".");
    }
  }
  setDrawSizeControlValue(drawState.width, drawState.height);
  drawState.lastCellKey = "";
  drawState.undoStack = [];
  drawState.undoStrokeSnapshotTaken = false;
  if (els.drawUndoButton) els.drawUndoButton.disabled = true;
  resetDrawView();
  ensureDrawPaletteColor();
  renderDrawStudio();
}

function drawCellFromPointer(event) {
  if (!els.drawCanvas) return null;
  const rect = els.drawCanvas.getBoundingClientRect();
  if (!rect.width || !rect.height) return null;
  const g = getDrawGeometry();
  if (!g) return null;
  const { x0, y0, cell, width, height, cx, cy } = g;
  const v = drawState.view;
  const rawX = event.clientX - rect.left;
  const rawY = event.clientY - rect.top;
  // Invert zoom/pan transform to get logical canvas coordinates
  const logX = (rawX - cx - v.panX) / v.scale + cx;
  const logY = (rawY - cy - v.panY) / v.scale + cy;
  const x = clamp(Math.floor((logX - x0) / cell), 0, width - 1);
  const y = clamp(Math.floor((logY - y0) / cell), 0, height - 1);
  return { x, y };
}

function paintDrawCell(x, y, code) {
  const idx = drawIndex(x, y);
  if (drawState.grid[idx] === code) return false;
  drawState.grid[idx] = code;
  return true;
}

function floodFillDraw(x, y, fillCode) {
  const width = drawWidth();
  const height = drawHeight();
  const start = drawState.grid[drawIndex(x, y, width)];
  if (start === fillCode) return false;
  const queue = [[x, y]];
  const seen = new Set();
  let changed = false;
  while (queue.length) {
    const [cx, cy] = queue.pop();
    const key = `${cx},${cy}`;
    if (seen.has(key)) continue;
    seen.add(key);
    const idx = drawIndex(cx, cy, width);
    if (drawState.grid[idx] !== start) continue;
    drawState.grid[idx] = fillCode;
    changed = true;
    if (cx > 0) queue.push([cx - 1, cy]);
    if (cx < width - 1) queue.push([cx + 1, cy]);
    if (cy > 0) queue.push([cx, cy - 1]);
    if (cy < height - 1) queue.push([cx, cy + 1]);
  }
  return changed;
}

const DRAW_UNDO_LIMIT = 40;

function updateUndoButton() {
  if (els.drawUndoButton) els.drawUndoButton.disabled = drawState.undoStack.length === 0;
}

// Push the pre-edit grid onto the undo stack once an action is confirmed to change state.
function saveUndoSnapshot() {
  drawState.undoStack.push([...drawState.grid]);
  if (drawState.undoStack.length > DRAW_UNDO_LIMIT) drawState.undoStack.shift();
  updateUndoButton();
}

function doUndo() {
  if (!drawState.undoStack.length) return;
  drawState.grid = drawState.undoStack.pop();
  drawState.lastCellKey = "";
  drawState.undoStrokeSnapshotTaken = false;
  paintDrawCanvas();
  updateUndoButton();
}

function getShapeCells(sx, sy, ex, ey) {
  const width = drawWidth();
  const height = drawHeight();
  const cells = [];
  if (drawState.shapeMode === "circle") {
    const r = Math.sqrt((ex - sx) ** 2 + (ey - sy) ** 2);
    const minX = Math.max(0, Math.floor(sx - r));
    const maxX = Math.min(width - 1, Math.ceil(sx + r));
    const minY = Math.max(0, Math.floor(sy - r));
    const maxY = Math.min(height - 1, Math.ceil(sy + r));
    for (let cy = minY; cy <= maxY; cy++) {
      for (let cx = minX; cx <= maxX; cx++) {
        if (Math.sqrt((cx - sx) ** 2 + (cy - sy) ** 2) <= r + 0.5) cells.push([cx, cy]);
      }
    }
  } else {
    const x0 = Math.max(0, Math.min(sx, ex));
    const x1 = Math.min(width - 1, Math.max(sx, ex));
    const y0 = Math.max(0, Math.min(sy, ey));
    const y1 = Math.min(height - 1, Math.max(sy, ey));
    for (let cy = y0; cy <= y1; cy++) {
      for (let cx = x0; cx <= x1; cx++) cells.push([cx, cy]);
    }
  }
  return cells;
}

function applyDrawToolAt(x, y) {
  const key = `${x},${y}`;
  if (drawState.tool !== "fill" && drawState.tool !== "picker" && drawState.lastCellKey === key) return false;
  drawState.lastCellKey = key;
  if (drawState.tool === "eraser") {
    if (drawState.grid[drawIndex(x, y)] === ".") return false;
    if (!drawState.undoStrokeSnapshotTaken) {
      saveUndoSnapshot();
      drawState.undoStrokeSnapshotTaken = true;
    }
    return paintDrawCell(x, y, ".");
  }
  if (drawState.tool === "picker") {
    const pick = drawState.grid[drawIndex(x, y)];
    if (pick && pick !== "." && pick !== drawState.selectedColor) {
      drawState.selectedColor = pick;
      recordRecentColor(pick);
      renderDrawStudio();
    }
    return false;
  }
  if (drawState.tool === "fill") {
    const start = drawState.grid[drawIndex(x, y)];
    if (start === drawState.selectedColor) return false;
    saveUndoSnapshot();
    drawState.undoStrokeSnapshotTaken = true;
    const result = floodFillDraw(x, y, drawState.selectedColor);
    if (result && recordRecentColor(drawState.selectedColor)) { drawRenderKey = ""; renderDrawPalette(); }
    return result;
  }
  if (drawState.grid[drawIndex(x, y)] === drawState.selectedColor) return false;
  if (!drawState.undoStrokeSnapshotTaken) {
    saveUndoSnapshot();
    drawState.undoStrokeSnapshotTaken = true;
  }
  const result = paintDrawCell(x, y, drawState.selectedColor);
  if (result && recordRecentColor(drawState.selectedColor)) { drawRenderKey = ""; renderDrawPalette(); }
  return result;
}

export function paintDrawCanvas() {
  if (!els.drawCanvas) return;
  ensureDrawGrid();
  const canvas = els.drawCanvas;
  const ctx = canvas.getContext("2d");
  const dpr = Math.min(2, Math.max(1, window.devicePixelRatio || 1));
  const cssW = Math.max(220, Math.round(canvas.clientWidth || 640));
  const cssH = Math.max(220, Math.round(canvas.clientHeight || 640));
  const pxW = Math.round(cssW * dpr);
  const pxH = Math.round(cssH * dpr);
  if (canvas.width !== pxW || canvas.height !== pxH) {
    canvas.width = pxW;
    canvas.height = pxH;
  }
  const width = drawWidth();
  const height = drawHeight();
  const cell = Math.floor(Math.min(cssW / width, cssH / height));
  const gridW = cell * width;
  const gridH = cell * height;
  const x0 = Math.floor((cssW - gridW) / 2);
  const y0 = Math.floor((cssH - gridH) / 2);
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, pxW, pxH);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.fillStyle = "#f5f8fb";
  ctx.fillRect(0, 0, cssW, cssH);

  // Apply zoom/pan transform anchored to grid center
  const v = drawState.view;
  const cx = x0 + gridW / 2;
  const cy = y0 + gridH / 2;
  ctx.save();
  ctx.translate(cx + v.panX, cy + v.panY);
  ctx.scale(v.scale, v.scale);
  ctx.translate(-cx, -cy);

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const code = drawState.grid[drawIndex(x, y, width)];
      if (code && code !== ".") {
        ctx.fillStyle = palette[code] || "#9aa4b3";
        ctx.fillRect(x0 + x * cell, y0 + y * cell, cell, cell);
      } else {
        ctx.fillStyle = (x + y) % 2 ? "#f0f4f9" : "#ffffff";
        ctx.fillRect(x0 + x * cell, y0 + y * cell, cell, cell);
      }
    }
  }
  ctx.strokeStyle = "rgba(116, 126, 147, 0.26)";
  ctx.lineWidth = 1;
  for (let i = 0; i <= width; i += 1) {
    const offset = i * cell;
    ctx.beginPath();
    ctx.moveTo(x0 + offset + 0.5, y0 + 0.5);
    ctx.lineTo(x0 + offset + 0.5, y0 + gridH + 0.5);
    ctx.stroke();
  }
  for (let i = 0; i <= height; i += 1) {
    const offset = i * cell;
    ctx.beginPath();
    ctx.moveTo(x0 + 0.5, y0 + offset + 0.5);
    ctx.lineTo(x0 + gridW + 0.5, y0 + offset + 0.5);
    ctx.stroke();
  }
  ctx.strokeStyle = "rgba(69, 93, 122, 0.38)";
  ctx.lineWidth = 1.2;
  ctx.strokeRect(x0 + 0.5, y0 + 0.5, gridW, gridH);
  if (drawState.tool === "shape" && drawState.shapeDrag && drawState.shapeDragEnd) {
    const previewCells = getShapeCells(
      drawState.shapeDrag.x, drawState.shapeDrag.y,
      drawState.shapeDragEnd.x, drawState.shapeDragEnd.y
    );
    ctx.save();
    ctx.globalAlpha = 0.55;
    ctx.fillStyle = palette[drawState.selectedColor] || "#9aa4b3";
    for (const [px, py] of previewCells) {
      ctx.fillRect(x0 + px * cell, y0 + py * cell, cell, cell);
    }
    ctx.restore();
  }
  ctx.restore();
}

function renderDrawPalette() {
  if (!els.drawPalette) return;
  ensureDrawPaletteColor();
  const codes = allColorCodes();
  const key = `${drawState.selectedColor}:${drawState.recentColors.join(",")}:${codes.join(",")}`;
  if (key === drawRenderKey) return;
  drawRenderKey = key;
  if (els.drawPaletteMeta) {
    els.drawPaletteMeta.textContent = `221色板`;
  }
  if (els.drawRecentColors) {
    els.drawRecentColors.innerHTML = drawState.recentColors.map((code) => {
      const selected = drawState.selectedColor === code;
      const label = beadIds[code] || code;
      const isTransparent = beadIds[code] === "H1";
      return `<button type="button" class="color-chip${selected ? " active" : ""}" data-draw-code="${code}" aria-label="选择 ${label}" title="${label}">
        <span class="swatch${isTransparent ? " is-transparent" : ""}" style="${isTransparent ? "" : `background:${palette[code]}`}"></span>
        <span class="chip-label">${label}</span>
      </button>`;
    }).join("");
  }
  els.drawPalette.innerHTML = codes.map((code) => {
    const selected = drawState.selectedColor === code;
    const label = beadIds[code] || code;
    const isTransparent = beadIds[code] === "H1";
    return `<button type="button" class="color-chip${selected ? " active" : ""}" data-draw-code="${code}" aria-label="选择 ${label}" title="${label}">
      <span class="swatch${isTransparent ? " is-transparent" : ""}" style="${isTransparent ? "" : `background:${palette[code]}`}"></span>
      <span class="chip-label">${label}</span>
    </button>`;
  }).join("");
}

function renderDrawToolButtons() {
  if (!els.drawingStudio) return;
  els.drawingStudio.querySelectorAll("[data-draw-tool]").forEach((button) => {
    const active = button.dataset.drawTool === drawState.tool;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", active ? "true" : "false");
  });
  const shapeBtn = els.drawingStudio.querySelector("[data-draw-tool='shape']");
  if (shapeBtn) {
    const isCircle = drawState.shapeMode === "circle";
    shapeBtn.setAttribute("aria-label", isCircle ? "圆形" : "矩形");
    shapeBtn.innerHTML = icon(isCircle ? "circle" : "square", { size: 16 });
  }
  if (els.drawUndoButton) els.drawUndoButton.disabled = drawState.undoStack.length === 0;
}

function renderDrawStudio() {
  if (state.appMode !== "draw") return;
  ensureDrawGrid();
  renderDrawPalette();
  renderDrawToolButtons();
  paintDrawCanvas();
}

export function enterDrawMode() {
  ensureDrawPaletteColor();
  renderDrawStudio();
}

function useDrawPattern() {
  ensureDrawGrid();
  const rows = squareDrawRowsFromGrid();
  const beadCount = rows.join("").replace(/\./g, "").length;
  if (!beadCount) {
    showToast("请先在绘图台放一些颜色。");
    return;
  }
  const sourceWidth = drawWidth();
  const sourceHeight = drawHeight();
  const size = Math.max(sourceWidth, sourceHeight);
  const pattern = {
    id: "custom-draw",
    name: "绘制图纸",
    size,
    width: size,
    height: size,
    craft: "原版",
    rows,
    sourceRows: rows,
    sourceSize: size,
    sourceWidth,
    sourceHeight,
    note: pickCustomPatternNote("draw", size, rows.join("")),
  };
  for (let i = patterns.length - 1; i >= 0; i -= 1) {
    if (patterns[i].id.startsWith("custom-")) patterns.splice(i, 1);
  }
  patterns.unshift(pattern);
  drawActions.loadPattern(pattern, false);
  drawActions.setAppMode("bead");
  showToast("绘图已生成图纸，开始拼豆。");
}

export function initDrawingStudioEvents() {
  els.drawingBackButton?.addEventListener("click", () => {
    drawActions.setAppMode("home");
  });
  els.drawSettingsButton?.addEventListener("click", () => drawActions.openSettingsModal());
  els.drawResetButton?.addEventListener("click", async () => {
    ensureDrawGrid();
    const hasContent = drawState.grid.some((cell) => cell && cell !== ".");
    if (hasContent && !(await confirmModal({ message: "清空会丢失当前绘图，确定吗？", okText: "清空", danger: true }))) return;
    drawState.grid = createDrawGrid(drawWidth(), drawHeight());
    drawState.lastCellKey = "";
    paintDrawCanvas();
    showToast("绘图已清空。");
  });
  function commitDrawSizeControlValue(widthValue = els.drawWidthInput?.value, heightValue = els.drawHeightInput?.value) {
    const { width: newWidth, height: newHeight } = normalizeDrawSizeValues(widthValue, heightValue);
    if (newWidth === drawWidth() && newHeight === drawHeight()) {
      setDrawSizeControlValue(drawWidth(), drawHeight());
      return;
    }
    setDrawSizeControlValue(newWidth, newHeight);
    openDrawResizeModal(newWidth, newHeight);
  }

  [els.drawWidthInput, els.drawHeightInput].forEach((input) => {
    input?.addEventListener("input", () => {
      const { width, height } = normalizeDrawSizeValues(
        els.drawWidthInput?.value,
        els.drawHeightInput?.value
      );
      if (els.drawSizeValue) els.drawSizeValue.textContent = `${width}×${height}`;
    });
    input?.addEventListener("keydown", (event) => {
      if (event.key === "Enter") commitDrawSizeControlValue();
    });
  });
  els.drawSizeApplyButton?.addEventListener("click", () => {
    commitDrawSizeControlValue();
  });
  els.drawAnchorGrid?.addEventListener("click", (event) => {
    const cell = event.target.closest(".anchor-cell");
    if (!cell) return;
    drawResizePending.anchorRow = Number(cell.dataset.row);
    drawResizePending.anchorCol = Number(cell.dataset.col);
    els.drawAnchorGrid.querySelectorAll(".anchor-cell").forEach((btn) => {
      btn.setAttribute("aria-pressed", btn === cell ? "true" : "false");
    });
  });
  els.drawResizeConfirmBtn?.addEventListener("click", () => {
    const { width: newWidth, height: newHeight } = normalizeDrawSizeValues(
      drawResizePending.width,
      drawResizePending.height
    );
    const { anchorRow, anchorCol } = drawResizePending;
    const oldGrid = drawState.grid.slice();
    const oldWidth = drawWidth();
    const oldHeight = drawHeight();
    drawState.width = newWidth;
    drawState.height = newHeight;
    drawState.size = Math.max(newWidth, newHeight);
    drawState.grid = resizeDrawGrid(oldGrid, oldWidth, oldHeight, newWidth, newHeight, anchorRow, anchorCol);
    drawState.lastCellKey = "";
    drawState.undoStack = [];
    drawState.undoStrokeSnapshotTaken = false;
    if (els.drawUndoButton) els.drawUndoButton.disabled = true;
    setDrawSizeControlValue(newWidth, newHeight);
    closeDrawResizeModal(false);
    renderDrawStudio();
    showToast(`画布已调整为 ${newWidth}x${newHeight}。`);
  });
  [els.drawResizeCancelBtn, els.drawResizeCloseBtn].forEach((btn) => {
    btn?.addEventListener("click", () => closeDrawResizeModal(true));
  });
  els.drawingStudio?.addEventListener("click", (event) => {
    const actionBtn = event.target.closest("[data-draw-action]");
    if (actionBtn?.dataset.drawAction === "undo") { doUndo(); return; }
    const toolBtn = event.target.closest("[data-draw-tool]");
    if (toolBtn) {
      const tool = toolBtn.dataset.drawTool || "brush";
      if (tool === "shape" && drawState.tool === "shape") {
        drawState.shapeMode = drawState.shapeMode === "rect" ? "circle" : "rect";
      } else {
        drawState.tool = tool;
        drawState.lastCellKey = "";
      }
      renderDrawToolButtons();
      return;
    }
    const colorBtn = event.target.closest("[data-draw-code]");
    if (colorBtn) {
      const code = colorBtn.dataset.drawCode;
      if (code && palette[code]) {
        drawState.selectedColor = code;
        drawRenderKey = "";
        renderDrawPalette();
      }
    }
  });
  els.drawClearButton?.addEventListener("click", () => {
    ensureDrawGrid();
    drawState.grid = createDrawGrid(drawWidth(), drawHeight());
    drawState.lastCellKey = "";
    drawState.undoStack = [];
    drawState.undoStrokeSnapshotTaken = false;
    if (els.drawUndoButton) els.drawUndoButton.disabled = true;
    paintDrawCanvas();
    showToast("绘图已清空。");
  });
  els.drawUsePatternButton?.addEventListener("click", () => {
    useDrawPattern();
  });
  els.drawShortCodeButton?.addEventListener("click", async () => {
    const button = els.drawShortCodeButton;
    const pattern = makeDrawPattern();
    if (button) {
      button.disabled = true;
      button.textContent = "导出中";
    }
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 5000);
    try {
      const share = await drawActions.requestCloudShareForPattern(pattern, { signal: controller.signal });
      window.clearTimeout(timeout);
      if (share?.shortId) {
        showDrawCodeOutput(share.shortId);
        await drawActions.autoCopyText(
          share.shortId,
          `短码已复制：${share.shortId}`,
          `短码已生成：${share.shortId}（复制失败，请手动复制）`,
        );
      } else {
        await exportDrawPatternCode(pattern, "图纸码已复制。");
      }
    } catch {
      window.clearTimeout(timeout);
      await exportDrawPatternCode(pattern, "短码连接失败，已改为复制图纸码。");
    }
    if (button) {
      button.disabled = false;
      button.textContent = "导出图纸";
    }
  });
  els.drawSubmitGalleryButton?.addEventListener("click", () => {
    const pattern = makeDrawPattern("绘制图纸");
    const beadCount = pattern.rows.join("").replace(/\./g, "").length;
    if (!beadCount) {
      showToast("请先在绘图台放一些颜色。");
      return;
    }
    try {
      drawActions.openGallerySubmitModal({
        name: pattern.name,
        patternCode: encodePatternCode(pattern),
      });
    } catch {
      showToast("当前图纸无法投稿。");
    }
  });
  els.drawImportButton?.addEventListener("click", async () => {
    openDrawCodeModal("import");
  });
  els.drawCodeImportConfirmBtn?.addEventListener("click", async () => {
    const raw = els.drawCodeInput?.value || "";
    if (drawCodeMode === "import-bead") {
      const ok = await drawActions.importPatternCode(raw);
      if (ok) closeDrawCodeModal();
      return;
    }
    const extracted = extractPatternCode(raw);
    const shortId = extractCloudShortId(raw);
    if (!extracted && !shortId) {
      showToast("请先粘贴图纸码或短码。");
      return;
    }
    try {
      const code = extracted || (await requestShareApi("/api/share/open", { shortId })).patternCode;
      const decoded = decodePatternCode(code);
      loadDrawRows(decoded.rows);
      closeDrawCodeModal();
      showToast(`已导入图纸：${decoded.size}x${decoded.size}。`);
    } catch (error) {
      showToast("图纸码无效或已过期。");
    }
  });
  els.drawCodeCopyBtn?.addEventListener("click", async () => {
    await drawActions.autoCopyText(els.drawCodeInput?.value || "", "已复制。", "复制失败，请手动复制。");
  });
  [els.drawCodeCancelBtn, els.drawCodeCloseBtn].forEach((btn) => {
    btn?.addEventListener("click", closeDrawCodeModal);
  });
  const handleDrawPointer = (event) => {
    const cell = drawCellFromPointer(event);
    if (!cell) return;
    const changed = applyDrawToolAt(cell.x, cell.y);
    if (changed || drawState.tool === "fill") paintDrawCanvas();
  };
  if (els.drawCanvas) {
    els.drawCanvas.addEventListener("pointerdown", (event) => {
      els.drawCanvas.setPointerCapture(event.pointerId);
      const rect = els.drawCanvas.getBoundingClientRect();
      drawPointers[event.pointerId] = { x: event.clientX - rect.left, y: event.clientY - rect.top };
      if (Object.keys(drawPointers).length >= 2) {
        drawState.drawing = false;
        drawState.lastCellKey = "";
        drawState.shapeDrag = null;
        startDrawGesture();
      } else if (drawState.tool === "shape") {
        const cell = drawCellFromPointer(event);
        if (cell) {
          drawState.undoStrokeSnapshotTaken = false;
          drawState.shapeDrag = { x: cell.x, y: cell.y };
          drawState.shapeDragEnd = { x: cell.x, y: cell.y };
          drawState.drawing = true;
        }
      } else {
        drawState.undoStrokeSnapshotTaken = false;
        drawState.drawing = true;
        drawState.lastCellKey = "";
        handleDrawPointer(event);
      }
    });
    els.drawCanvas.addEventListener("pointermove", (event) => {
      const rect = els.drawCanvas.getBoundingClientRect();
      if (drawPointers[event.pointerId]) {
        drawPointers[event.pointerId] = { x: event.clientX - rect.left, y: event.clientY - rect.top };
      }
      if (Object.keys(drawPointers).length >= 2 && drawGesture?.active) {
        updateDrawGesture();
        return;
      }
      if (!drawState.drawing) return;
      if (drawState.tool === "shape") {
        const cell = drawCellFromPointer(event);
        if (cell && drawState.shapeDrag) {
          drawState.shapeDragEnd = { x: cell.x, y: cell.y };
          paintDrawCanvas();
        }
        return;
      }
      if (drawState.tool === "fill" || drawState.tool === "picker") return;
      handleDrawPointer(event);
    });
    const endDrawPointer = (event) => {
      delete drawPointers[event.pointerId];
      if (Object.keys(drawPointers).length < 2 && drawGesture) {
        drawGesture.active = false;
      }
      if (Object.keys(drawPointers).length === 0) {
        if (drawState.tool === "shape" && drawState.shapeDrag && drawState.shapeDragEnd) {
          const cells = getShapeCells(
            drawState.shapeDrag.x, drawState.shapeDrag.y,
            drawState.shapeDragEnd.x, drawState.shapeDragEnd.y
          );
          const code = drawState.selectedColor;
          const shouldSaveUndo = cells.some(([cx, cy]) => drawState.grid[drawIndex(cx, cy)] !== code);
          if (shouldSaveUndo) saveUndoSnapshot();
          let painted = false;
          for (const [cx, cy] of cells) painted = paintDrawCell(cx, cy, code) || painted;
          if (painted) {
            recordRecentColor(code);
            drawRenderKey = "";
            renderDrawPalette();
          }
          drawState.shapeDrag = null;
          drawState.shapeDragEnd = null;
          paintDrawCanvas();
        }
        drawState.drawing = false;
        drawState.lastCellKey = "";
        drawState.undoStrokeSnapshotTaken = false;
      }
    };
    els.drawCanvas.addEventListener("pointerup", endDrawPointer);
    els.drawCanvas.addEventListener("pointerleave", (event) => {
      endDrawPointer(event);
    });
    els.drawCanvas.addEventListener("pointercancel", endDrawPointer);
    els.drawCanvas.addEventListener("wheel", (event) => {
      event.preventDefault();
      const rect = els.drawCanvas.getBoundingClientRect();
      const mx = event.clientX - rect.left;
      const my = event.clientY - rect.top;
      const g = getDrawGeometry();
      if (!g) return;
      const { cx, cy } = g;
      const v = drawState.view;
      const factor = event.deltaY < 0 ? 1.15 : 1 / 1.15;
      const nextScale = clamp(v.scale * factor, 1, maxBoardScale(g));
      const ratio = nextScale / v.scale;
      const nextPanX = mx - cx - (mx - cx - v.panX) * ratio;
      const nextPanY = my - cy - (my - cy - v.panY) * ratio;
      setDrawZoom(nextScale, nextPanX, nextPanY);
    }, { passive: false });
    els.drawCanvas.addEventListener("dblclick", () => {
      resetDrawView();
      paintDrawCanvas();
    });
  }
}
