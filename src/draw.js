import { palette, beadIds } from './palette.js';
import { patterns } from './patterns-data.js';
import { allColorCodes } from './pattern.js';
import { encodePatternCode, decodePatternCode, extractPatternCode } from './pattern-code.js';
import { els } from './dom.js';
import { clamp } from './color-utils.js';
import { maxBoardScale } from './render.js';
import { showToast } from './notify.js';
import { confirmModal } from './modal-controller.js';
import { pickCustomPatternNote, escapeHtml } from './utils.js';
import { state } from './state.js';
import { extractCloudShortId, requestShareApi } from './gallery.js';
import { icon } from './icons.js';
import { BOARD_SIZE } from './constants.js';
import { fitGridToBoardTiles, tileKey } from './board-layout.js';
import { loadImageFromDataUrl, convertImageToRectRows } from './image-convert.js';
import { currentBackgroundTheme } from './theme.js';
import { drawBoardGuides, drawBoardSkin } from './board-skin.js';

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
  size: BOARD_SIZE,
  width: BOARD_SIZE,
  height: BOARD_SIZE,
  tiles: new Set([tileKey(0, 0)]),
  tileOriginX: 0,
  tileOriginY: 0,
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
  stampImage: null,
  paletteQuery: "",
};
const drawKbdNav = { up: false, down: false, left: false, right: false, zoomIn: false, zoomOut: false };
const drawPointers = {};
let drawGesture = null;
let drawRenderKey = "";
const MAX_DRAW_DIMENSION = BOARD_SIZE * 3;
function normalizeDrawDimension() {
  // Drawing board matches the fixed 30×30 pegboard tile.
  return BOARD_SIZE;
}

function drawWidth() {
  return drawState.width || drawState.size || BOARD_SIZE;
}

function drawHeight() {
  return drawState.height || drawState.size || BOARD_SIZE;
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
  const tabSpace = 44;
  const cell = Math.max(1, Math.floor(Math.min((cssW - tabSpace * 2) / width, (cssH - tabSpace * 2) / height)));
  const gridW = cell * width;
  const gridH = cell * height;
  const gridSize = Math.max(gridW, gridH);
  const x0 = Math.floor((cssW - gridW) / 2);
  const y0 = Math.floor((cssH - gridH) / 2);
  const cx = x0 + gridW / 2;
  const cy = y0 + gridH / 2;
  return { cssW, cssH, width, height, size: Math.max(width, height), cell, gridW, gridH, gridSize, x0, y0, cx, cy };
}

function isCellActive(x, y) {
  const tx = Math.floor(x / BOARD_SIZE) + drawState.tileOriginX;
  const ty = Math.floor(y / BOARD_SIZE) + drawState.tileOriginY;
  return drawState.tiles.has(tileKey(tx, ty));
}

function addTileAt(tx, ty) {
  const T = BOARD_SIZE;
  const oldMinTx = drawState.tileOriginX;
  const oldMinTy = drawState.tileOriginY;
  const oldWidth = drawWidth();
  const oldHeight = drawHeight();
  const newMinTx = Math.min(oldMinTx, tx);
  const newMinTy = Math.min(oldMinTy, ty);
  const newMaxTx = Math.max(oldMinTx + oldWidth / T - 1, tx);
  const newMaxTy = Math.max(oldMinTy + oldHeight / T - 1, ty);
  const newWidth = (newMaxTx - newMinTx + 1) * T;
  const newHeight = (newMaxTy - newMinTy + 1) * T;
  const offsetX = (oldMinTx - newMinTx) * T;
  const offsetY = (oldMinTy - newMinTy) * T;
  const newGrid = Array(newWidth * newHeight).fill(".");
  for (let oy = 0; oy < oldHeight; oy++) {
    for (let ox = 0; ox < oldWidth; ox++) {
      const val = drawState.grid[oy * oldWidth + ox];
      if (val && val !== ".") {
        newGrid[(oy + offsetY) * newWidth + (ox + offsetX)] = val;
      }
    }
  }
  drawState.tiles.add(tileKey(tx, ty));
  drawState.tileOriginX = newMinTx;
  drawState.tileOriginY = newMinTy;
  drawState.width = newWidth;
  drawState.height = newHeight;
  drawState.size = Math.max(newWidth, newHeight);
  drawState.grid = newGrid;
  drawState.lastCellKey = "";
}

function drawBoardTabRects(geometry = getDrawGeometry()) {
  if (!geometry) return [];
  const { x0, y0, cell } = geometry;
  const T = BOARD_SIZE;
  const tileW = T * cell;
  const tileH = T * cell;
  const long = Math.max(30, Math.min(56, cell * 3));
  const short = Math.max(16, Math.min(24, cell * 1.1));
  const tabs = [];
  const curMaxTx = drawState.tileOriginX + drawWidth() / T - 1;
  const curMaxTy = drawState.tileOriginY + drawHeight() / T - 1;
  for (const key of drawState.tiles) {
    const [tx, ty] = key.split(",").map(Number);
    const bx = x0 + (tx - drawState.tileOriginX) * tileW;
    const by = y0 + (ty - drawState.tileOriginY) * tileH;
    const candidates = [
      { targetTx: tx, targetTy: ty - 1,
        rect: { x: bx + tileW / 2 - long / 2, y: by - short, w: long, h: short + 4 } },
      { targetTx: tx + 1, targetTy: ty,
        rect: { x: bx + tileW - 4, y: by + tileH / 2 - long / 2, w: short + 4, h: long } },
      { targetTx: tx, targetTy: ty + 1,
        rect: { x: bx + tileW / 2 - long / 2, y: by + tileH - 4, w: long, h: short + 4 } },
      { targetTx: tx - 1, targetTy: ty,
        rect: { x: bx - short, y: by + tileH / 2 - long / 2, w: short + 4, h: long } },
    ];
    for (const { targetTx, targetTy, rect } of candidates) {
      if (drawState.tiles.has(tileKey(targetTx, targetTy))) continue;
      const newMinTx = Math.min(drawState.tileOriginX, targetTx);
      const newMinTy = Math.min(drawState.tileOriginY, targetTy);
      const nextWidth = (Math.max(curMaxTx, targetTx) - newMinTx + 1) * T;
      const nextHeight = (Math.max(curMaxTy, targetTy) - newMinTy + 1) * T;
      if (nextWidth <= MAX_DRAW_DIMENSION && nextHeight <= MAX_DRAW_DIMENSION) {
        tabs.push({ targetTx, targetTy, ...rect });
      }
    }
  }
  return tabs;
}

function drawBoardTabAtPointer(event) {
  if (!els.drawCanvas) return null;
  const rect = els.drawCanvas.getBoundingClientRect();
  const geometry = getDrawGeometry();
  if (!rect.width || !rect.height || !geometry) return null;
  const rawX = event.clientX - rect.left;
  const rawY = event.clientY - rect.top;
  const { cx, cy } = geometry;
  const view = drawState.view;
  const x = (rawX - cx - view.panX) / view.scale + cx;
  const y = (rawY - cy - view.panY) / view.scale + cy;
  const hitPadding = 10;
  const tabs = drawBoardTabRects(geometry);
  const hit = tabs.find((tab) =>
    x >= tab.x - hitPadding && x <= tab.x + tab.w + hitPadding
    && y >= tab.y - hitPadding && y <= tab.y + tab.h + hitPadding
  );
  return hit ? { tx: hit.targetTx, ty: hit.targetTy } : null;
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

function makeDrawPattern(name = "绘制图纸") {
  ensureDrawGrid();
  const rows = drawRowsFromGrid();
  const width = drawWidth();
  const height = drawHeight();
  const size = Math.max(width, height);
  return {
    id: "draw-export",
    name,
    size,
    width,
    height,
    sourceWidth: width,
    sourceHeight: height,
    rows,
    craft: "原版",
    tiles: [...drawState.tiles],
    tileOriginX: drawState.tileOriginX,
    tileOriginY: drawState.tileOriginY,
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

function loadDrawPattern(pattern) {
  const rows = Array.isArray(pattern?.rows) ? pattern.rows : [];
  const srcHeight = Number.parseInt(pattern?.height, 10) || rows.length;
  const srcWidth = Number.parseInt(pattern?.width, 10)
    || Math.max(1, ...rows.map((row) => String(row || "").length));
  const fitted = fitGridToBoardTiles(rows, srcWidth, srcHeight, BOARD_SIZE, MAX_DRAW_DIMENSION);
  drawState.width = fitted.width;
  drawState.height = fitted.height;
  drawState.size = Math.max(fitted.width, fitted.height);
  drawState.grid = fitted.rows.join("").split("").map((code) => (code === "." || palette[code] ? code : "."));
  // Initialize tile set as full rectangle matching fitted dimensions
  const tilesX = fitted.width / BOARD_SIZE;
  const tilesY = fitted.height / BOARD_SIZE;
  drawState.tiles = new Set();
  for (let ty = 0; ty < tilesY; ty++) {
    for (let tx = 0; tx < tilesX; tx++) {
      drawState.tiles.add(tileKey(tx, ty));
    }
  }
  drawState.tileOriginX = 0;
  drawState.tileOriginY = 0;
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
    if (!isCellActive(cx, cy)) continue;
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
  drawState.undoStack.push({
    grid: [...drawState.grid],
    width: drawWidth(),
    height: drawHeight(),
    tiles: new Set(drawState.tiles),
    tileOriginX: drawState.tileOriginX,
    tileOriginY: drawState.tileOriginY,
  });
  if (drawState.undoStack.length > DRAW_UNDO_LIMIT) drawState.undoStack.shift();
  updateUndoButton();
}

function doUndo() {
  if (!drawState.undoStack.length) return;
  const snapshot = drawState.undoStack.pop();
  drawState.grid = [...snapshot.grid];
  drawState.width = snapshot.width;
  drawState.height = snapshot.height;
  drawState.size = Math.max(snapshot.width, snapshot.height);
  if (snapshot.tiles) {
    drawState.tiles = new Set(snapshot.tiles);
    drawState.tileOriginX = snapshot.tileOriginX ?? 0;
    drawState.tileOriginY = snapshot.tileOriginY ?? 0;
  }
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
  return cells.filter(([cx, cy]) => isCellActive(cx, cy));
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// Given the drag start cell and the current cell, return the integer board rectangle
// that keeps the loaded stamp image's aspect ratio, anchored at the start corner and
// clamped inside the board. The box binds to whichever axis the user dragged further
// (relative to aspect) so it hugs the pointer. Returns null when no image is loaded.
function imageStampBox(sx, sy, ex, ey) {
  const img = drawState.stampImage;
  if (!img) return null;
  const boardW = drawWidth();
  const boardH = drawHeight();
  const aspect = (img.naturalWidth || img.width || 1) / (img.naturalHeight || img.height || 1);
  const dirX = ex >= sx ? 1 : -1;
  const dirY = ey >= sy ? 1 : -1;
  const dragW = Math.abs(ex - sx) + 1;
  const dragH = Math.abs(ey - sy) + 1;
  let w;
  let h;
  if (dragW / dragH >= aspect) {
    w = dragW;
    h = Math.max(1, Math.round(w / aspect));
  } else {
    h = dragH;
    w = Math.max(1, Math.round(h * aspect));
  }
  // Shrink (keeping aspect) if the box can't fit the board.
  if (w > boardW || h > boardH) {
    const s = Math.min(boardW / w, boardH / h);
    w = Math.max(1, Math.floor(w * s));
    h = Math.max(1, Math.floor(h * s));
  }
  let x0 = dirX > 0 ? sx : sx - (w - 1);
  let y0 = dirY > 0 ? sy : sy - (h - 1);
  x0 = clamp(x0, 0, boardW - w);
  y0 = clamp(y0, 0, boardH - h);
  return { x0, y0, w, h };
}

// On pointer-up of an image-stamp drag: convert the loaded image into the locked-aspect
// rectangle and write the beads into the grid (transparent cells leave existing beads).
function commitImageStamp() {
  const drag = drawState.shapeDrag;
  const end = drawState.shapeDragEnd;
  drawState.shapeDrag = null;
  drawState.shapeDragEnd = null;
  if (!drag || !end || !drawState.stampImage) {
    paintDrawCanvas();
    return;
  }
  const box = imageStampBox(drag.x, drag.y, end.x, end.y);
  if (!box || box.w < 1 || box.h < 1) {
    paintDrawCanvas();
    return;
  }
  const rows = convertImageToRectRows(drawState.stampImage, box.w, box.h, { removeWhite: false });
  const width = drawWidth();
  let painted = false;
  saveUndoSnapshot();
  for (let ry = 0; ry < box.h; ry += 1) {
    const row = rows[ry] || "";
    for (let rx = 0; rx < box.w; rx += 1) {
      const code = row[rx] || ".";
      if (code === ".") continue;
      drawState.grid[drawIndex(box.x0 + rx, box.y0 + ry, width)] = code;
      painted = true;
    }
  }
  if (!painted) {
    drawState.undoStack.pop();
    updateUndoButton();
  }
  drawState.lastCellKey = "";
  paintDrawCanvas();
  if (painted) showToast(`已放入图片：${box.w}×${box.h} 豆。`);
}

function applyDrawToolAt(x, y) {
  if (!isCellActive(x, y)) return false;
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
  const geometry = getDrawGeometry();
  if (!geometry) return;
  const { cssW, cssH, width, height, cell, gridW, gridH, x0, y0, cx, cy } = geometry;
  const pxW = Math.round(cssW * dpr);
  const pxH = Math.round(cssH * dpr);
  if (canvas.width !== pxW || canvas.height !== pxH) {
    canvas.width = pxW;
    canvas.height = pxH;
  }
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, pxW, pxH);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  const theme = currentBackgroundTheme();
  const workbenchGradient = ctx.createLinearGradient(0, 0, cssW, cssH);
  workbenchGradient.addColorStop(0, theme.table[0]);
  workbenchGradient.addColorStop(0.48, theme.table[1]);
  workbenchGradient.addColorStop(1, theme.table[2]);
  ctx.fillStyle = workbenchGradient;
  ctx.fillRect(0, 0, cssW, cssH);

  // Apply zoom/pan transform anchored to grid center
  const v = drawState.view;
  ctx.save();
  ctx.translate(cx + v.panX, cy + v.panY);
  ctx.scale(v.scale, v.scale);
  ctx.translate(-cx, -cy);

  const T = BOARD_SIZE;
  const tileW = T * cell;
  const tileH = T * cell;

  const blocksPerTile = T / 10;
  for (const key of drawState.tiles) {
    const [tx, ty] = key.split(",").map(Number);
    const tileBoardX = x0 + (tx - drawState.tileOriginX) * tileW;
    const tileBoardY = y0 + (ty - drawState.tileOriginY) * tileH;
    drawBoardSkin(ctx, {
      boardX: tileBoardX,
      boardY: tileBoardY,
      boardW: tileW,
      boardH: tileH,
      boardSize: Math.max(tileW, tileH),
      cell,
    }, {
      cols: T,
      rows: T,
      brand: theme.brand,
      shadow: false,
      guides: false,
      frameInset: 0,
      outerRadius: 0,
      innerRadius: 0,
      blockOffsetX: (tx - drawState.tileOriginX) * blocksPerTile,
      blockOffsetY: (ty - drawState.tileOriginY) * blocksPerTile,
    });
  }

  // Pegboard texture: a soft nub on every empty cell (matches the placing board),
  // batched into two fills so cost stays flat regardless of tile count.
  const pegR = Math.max(0.6, cell * 0.138);
  const pegCenters = [];
  for (const key of drawState.tiles) {
    const [tx, ty] = key.split(",").map(Number);
    const tileBoardX = x0 + (tx - drawState.tileOriginX) * tileW;
    const tileBoardY = y0 + (ty - drawState.tileOriginY) * tileH;
    const startX = (tx - drawState.tileOriginX) * T;
    const startY = (ty - drawState.tileOriginY) * T;
    for (let ly = 0; ly < T; ly++) {
      for (let lx = 0; lx < T; lx++) {
        const code = drawState.grid[drawIndex(startX + lx, startY + ly, width)];
        if (code && code !== ".") continue;
        pegCenters.push([tileBoardX + lx * cell + cell / 2, tileBoardY + ly * cell + cell / 2]);
      }
    }
  }
  if (pegCenters.length) {
    ctx.beginPath();
    for (const [pcx, pcy] of pegCenters) {
      ctx.moveTo(pcx + pegR, pcy);
      ctx.arc(pcx, pcy, pegR, 0, Math.PI * 2);
    }
    ctx.fillStyle = "rgba(91, 104, 118, 0.30)";
    ctx.fill();
    const hlR = pegR * 0.36;
    const hlOff = pegR * 0.22;
    ctx.beginPath();
    for (const [pcx, pcy] of pegCenters) {
      ctx.moveTo(pcx - hlOff + hlR, pcy - hlOff);
      ctx.arc(pcx - hlOff, pcy - hlOff, hlR, 0, Math.PI * 2);
    }
    ctx.fillStyle = "rgba(255, 255, 255, 0.55)";
    ctx.fill();
  }

  // Per-tile: cells + cell grid
  for (const key of drawState.tiles) {
    const [tx, ty] = key.split(",").map(Number);
    const tileBoardX = x0 + (tx - drawState.tileOriginX) * tileW;
    const tileBoardY = y0 + (ty - drawState.tileOriginY) * tileH;
    const tileLayout = { boardX: tileBoardX, boardY: tileBoardY, boardW: tileW, boardH: tileH, boardSize: Math.max(tileW, tileH), cell };
    const startX = (tx - drawState.tileOriginX) * T;
    const startY = (ty - drawState.tileOriginY) * T;
    for (let ly = 0; ly < T; ly++) {
      for (let lx = 0; lx < T; lx++) {
        const code = drawState.grid[drawIndex(startX + lx, startY + ly, width)];
        if (code && code !== ".") {
          ctx.fillStyle = palette[code] || "#9aa4b3";
          ctx.fillRect(tileBoardX + lx * cell, tileBoardY + ly * cell, cell, cell);
        }
      }
    }
    ctx.strokeStyle = "rgba(70, 84, 96, 0.08)";
    ctx.lineWidth = 1 / v.scale;
    // No +0.5 pixel-snap: these lines live inside the zoom/pan transform, so a
    // half-pixel logical nudge scales to 0.5*v.scale device px and drifts the thin
    // cell grid off the pegs (cell centers) and the major guides (cell boundaries),
    // which becomes a visible misalignment when zoomed in. Share the exact origin.
    for (let i = 0; i <= T; i++) {
      const offset = i * cell;
      ctx.beginPath();
      ctx.moveTo(tileBoardX + offset, tileBoardY);
      ctx.lineTo(tileBoardX + offset, tileBoardY + tileH);
      ctx.stroke();
    }
    for (let i = 0; i <= T; i++) {
      const offset = i * cell;
      ctx.beginPath();
      ctx.moveTo(tileBoardX, tileBoardY + offset);
      ctx.lineTo(tileBoardX + tileW, tileBoardY + offset);
      ctx.stroke();
    }
    drawBoardGuides(ctx, tileLayout, T, T, v.scale);
  }

  // Internal seams: a restrained snap-fit hint where two tiles meet — the seam
  // hairline detours into two small interlocking tabs (alternating sides), so joined
  // boards read as "clicked together" without becoming busy.
  ctx.save();
  ctx.strokeStyle = "rgba(70, 84, 96, 0.16)";
  ctx.lineWidth = 1 / v.scale;
  ctx.lineJoin = "round";
  const tabLen = cell * 0.9;
  const tabDepth = cell * 0.5;
  for (const key of drawState.tiles) {
    const [tx, ty] = key.split(",").map(Number);
    const bx = x0 + (tx - drawState.tileOriginX) * tileW;
    const by = y0 + (ty - drawState.tileOriginY) * tileH;
    if (drawState.tiles.has(tileKey(tx + 1, ty))) {
      const sx = bx + tileW;
      const c1 = by + tileH / 3;
      const c2 = by + (tileH * 2) / 3;
      ctx.beginPath();
      ctx.moveTo(sx, by);
      ctx.lineTo(sx, c1 - tabLen);
      ctx.lineTo(sx + tabDepth, c1 - tabLen);
      ctx.lineTo(sx + tabDepth, c1 + tabLen);
      ctx.lineTo(sx, c1 + tabLen);
      ctx.lineTo(sx, c2 - tabLen);
      ctx.lineTo(sx - tabDepth, c2 - tabLen);
      ctx.lineTo(sx - tabDepth, c2 + tabLen);
      ctx.lineTo(sx, c2 + tabLen);
      ctx.lineTo(sx, by + tileH);
      ctx.stroke();
    }
    if (drawState.tiles.has(tileKey(tx, ty + 1))) {
      const sy = by + tileH;
      const c1 = bx + tileW / 3;
      const c2 = bx + (tileW * 2) / 3;
      ctx.beginPath();
      ctx.moveTo(bx, sy);
      ctx.lineTo(c1 - tabLen, sy);
      ctx.lineTo(c1 - tabLen, sy + tabDepth);
      ctx.lineTo(c1 + tabLen, sy + tabDepth);
      ctx.lineTo(c1 + tabLen, sy);
      ctx.lineTo(c2 - tabLen, sy);
      ctx.lineTo(c2 - tabLen, sy - tabDepth);
      ctx.lineTo(c2 + tabLen, sy - tabDepth);
      ctx.lineTo(c2 + tabLen, sy);
      ctx.lineTo(bx + tileW, sy);
      ctx.stroke();
    }
  }
  ctx.restore();

  // Outer perimeter: clean flat border on edges that face empty space.
  ctx.strokeStyle = "rgba(70, 84, 96, 0.35)";
  ctx.lineWidth = 1.5 / v.scale;
  for (const key of drawState.tiles) {
    const [tx, ty] = key.split(",").map(Number);
    const tileBoardX = x0 + (tx - drawState.tileOriginX) * tileW;
    const tileBoardY = y0 + (ty - drawState.tileOriginY) * tileH;
    if (!drawState.tiles.has(tileKey(tx, ty - 1))) {
      ctx.beginPath(); ctx.moveTo(tileBoardX, tileBoardY); ctx.lineTo(tileBoardX + tileW, tileBoardY); ctx.stroke();
    }
    if (!drawState.tiles.has(tileKey(tx + 1, ty))) {
      ctx.beginPath(); ctx.moveTo(tileBoardX + tileW, tileBoardY); ctx.lineTo(tileBoardX + tileW, tileBoardY + tileH); ctx.stroke();
    }
    if (!drawState.tiles.has(tileKey(tx, ty + 1))) {
      ctx.beginPath(); ctx.moveTo(tileBoardX, tileBoardY + tileH); ctx.lineTo(tileBoardX + tileW, tileBoardY + tileH); ctx.stroke();
    }
    if (!drawState.tiles.has(tileKey(tx - 1, ty))) {
      ctx.beginPath(); ctx.moveTo(tileBoardX, tileBoardY); ctx.lineTo(tileBoardX, tileBoardY + tileH); ctx.stroke();
    }
  }

  const tabs = drawBoardTabRects(geometry);
  ctx.fillStyle = "#ffffff";
  ctx.strokeStyle = "rgba(69, 93, 122, 0.38)";
  ctx.lineWidth = 1.2 / v.scale;
  tabs.forEach((tab) => {
    ctx.beginPath();
    ctx.roundRect(tab.x, tab.y, tab.w, tab.h, Math.min(tab.w, tab.h) * 0.35);
    ctx.fill();
    ctx.stroke();
    const tabCx = tab.x + tab.w / 2;
    const tabCy = tab.y + tab.h / 2;
    const arm = Math.min(tab.w, tab.h) * 0.24;
    ctx.beginPath();
    ctx.moveTo(tabCx - arm, tabCy);
    ctx.lineTo(tabCx + arm, tabCy);
    ctx.moveTo(tabCx, tabCy - arm);
    ctx.lineTo(tabCx, tabCy + arm);
    ctx.stroke();
  });
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
  if (drawState.tool === "image" && drawState.stampImage && drawState.shapeDrag && drawState.shapeDragEnd) {
    const box = imageStampBox(drawState.shapeDrag.x, drawState.shapeDrag.y, drawState.shapeDragEnd.x, drawState.shapeDragEnd.y);
    if (box) {
      const px = x0 + box.x0 * cell;
      const py = y0 + box.y0 * cell;
      const pw = box.w * cell;
      const ph = box.h * cell;
      ctx.save();
      ctx.globalAlpha = 0.88;
      ctx.imageSmoothingEnabled = true;
      // Aspect is locked to the image, so a straight stretch into the box ≈ cover.
      ctx.drawImage(drawState.stampImage, px, py, pw, ph);
      ctx.restore();
      ctx.save();
      ctx.strokeStyle = theme.brand || "#57b8a7";
      ctx.lineWidth = 2;
      ctx.strokeRect(px + 1, py + 1, pw - 2, ph - 2);
      ctx.restore();
    }
  }
  ctx.restore();
}

// ── Mobile color sheet ───────────────────────────────────────────────────────
// On phones the palette is a bottom sheet opened by the 选颜色 trigger, so the
// canvas + tools own the screen. The trigger shows the current color. (On desktop
// the palette is a permanent side column; these toggles are harmless there.)
function openDrawPaletteSheet() {
  els.drawingPalettePanel?.classList.add("is-open");
  if (els.drawPaletteBackdrop) els.drawPaletteBackdrop.hidden = false;
  els.drawColorTrigger?.setAttribute("aria-expanded", "true");
}

function closeDrawPaletteSheet() {
  els.drawingPalettePanel?.classList.remove("is-open");
  if (els.drawPaletteBackdrop) els.drawPaletteBackdrop.hidden = true;
  els.drawColorTrigger?.setAttribute("aria-expanded", "false");
}

function updateDrawColorTrigger() {
  const code = drawState.selectedColor;
  const isTransparent = beadIds[code] === "H1";
  if (els.drawColorTriggerSwatch) {
    els.drawColorTriggerSwatch.style.background = isTransparent ? "" : (palette[code] || "#9aa4b3");
    els.drawColorTriggerSwatch.classList.toggle("is-transparent", isTransparent);
  }
  if (els.drawColorTriggerCode) els.drawColorTriggerCode.textContent = beadIds[code] || code || "";
}

function renderDrawPalette() {
  if (!els.drawPalette) return;
  ensureDrawPaletteColor();
  updateDrawColorTrigger();
  const allCodes = allColorCodes();
  const query = (drawState.paletteQuery || "").trim().toUpperCase().replace(/\s+/g, "");
  const codes = query
    ? allCodes.filter((code) => (beadIds[code] || code).toUpperCase().includes(query))
    : allCodes;
  const key = `${drawState.selectedColor}:${drawState.recentColors.join(",")}:${query}:${allCodes.join(",")}`;
  if (key === drawRenderKey) return;
  drawRenderKey = key;
  if (els.drawPaletteMeta) {
    els.drawPaletteMeta.textContent = query ? `${codes.length} / ${allCodes.length} 色` : `221色板`;
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
  if (!codes.length) {
    els.drawPalette.innerHTML = `<p class="palette-empty">没有匹配「${escapeHtml(drawState.paletteQuery || "")}」的色号</p>`;
    return;
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
  if (els.drawImageStampButton) {
    els.drawImageStampButton.classList.toggle("active", drawState.tool === "image");
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
  const rows = drawRowsFromGrid();
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
    width: sourceWidth,
    height: sourceHeight,
    craft: "原版",
    rows,
    sourceRows: rows,
    sourceSize: size,
    sourceWidth,
    sourceHeight,
    note: pickCustomPatternNote("draw", size, rows.join("")),
    tiles: [...drawState.tiles],
    tileOriginX: drawState.tileOriginX,
    tileOriginY: drawState.tileOriginY,
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
        closeDrawPaletteSheet();
      }
    }
  });
  // Mobile color sheet: the palette is a bottom sheet opened by the 选颜色 trigger.
  els.drawColorTrigger?.addEventListener("click", openDrawPaletteSheet);
  els.drawPaletteCloseButton?.addEventListener("click", closeDrawPaletteSheet);
  els.drawPaletteBackdrop?.addEventListener("click", closeDrawPaletteSheet);
  els.drawPaletteSearch?.addEventListener("input", (event) => {
    drawState.paletteQuery = event.target.value || "";
    drawRenderKey = "";
    renderDrawPalette();
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
  els.drawImageStampButton?.addEventListener("click", () => {
    els.drawImageInput?.click();
  });
  els.drawImageInput?.addEventListener("change", async (event) => {
    const file = event.target.files?.[0];
    event.target.value = ""; // allow re-picking the same file
    if (!file) return;
    try {
      const dataUrl = await readFileAsDataUrl(file);
      const image = await loadImageFromDataUrl(dataUrl);
      drawState.stampImage = image;
      drawState.tool = "image";
      drawState.lastCellKey = "";
      drawState.shapeDrag = null;
      drawState.shapeDragEnd = null;
      renderDrawToolButtons();
      showToast("在版面上拖一个框放图片（自动锁定原图比例）。");
    } catch {
      showToast("图片读取失败，换一张试试。");
    }
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
      loadDrawPattern(decoded);
      closeDrawCodeModal();
      showToast(`已导入图纸：${decoded.width}x${decoded.height}。`);
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
      const tileToAdd = drawBoardTabAtPointer(event);
      if (tileToAdd) {
        const { tx, ty } = tileToAdd;
        saveUndoSnapshot();
        addTileAt(tx, ty);
        resetDrawView();
        paintDrawCanvas();
        showToast("已添加一块板。");
        return;
      }
      const rect = els.drawCanvas.getBoundingClientRect();
      drawPointers[event.pointerId] = { x: event.clientX - rect.left, y: event.clientY - rect.top };
      if (Object.keys(drawPointers).length >= 2) {
        drawState.drawing = false;
        drawState.lastCellKey = "";
        drawState.shapeDrag = null;
        startDrawGesture();
      } else if (drawState.tool === "shape" || drawState.tool === "image") {
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
      if (drawState.tool === "shape" || drawState.tool === "image") {
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
        if (drawState.tool === "image" && drawState.shapeDrag && drawState.shapeDragEnd) {
          commitImageStamp();
        } else if (drawState.tool === "shape" && drawState.shapeDrag && drawState.shapeDragEnd) {
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
