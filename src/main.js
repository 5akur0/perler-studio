import {
  palette, beadIds, palettePresetMardCodes, workshopCodeForMard,
} from './palette.js';
import { patterns, resamplePatternRows, validatePatterns } from './patterns-data.js';
import {
  phases, backgroundThemes, toolStyles, craftOptions,
  TRAY_DESKTOP_ROWS, TRAY_DESKTOP_COLS, TRAY_MOBILE_ROWS, TRAY_MOBILE_COLS,
  collectionKey, sessionKey, collectionLimit, achievementKey,
  conceptAchievement, fullBoardAchievement, needleLoadSortThreshold,
} from './constants.js';
import {
  clamp, lerp, easeOut, mixColor, rgbToOklab, oklabDistance,
  hexToRgb, beadOklab,
} from './color-utils.js';
import { state } from './state.js';
import { readCollection, writeCollection } from './storage.js';
import { readAchievements, writeAchievements, hasAchievement, unlockAchievement } from './achievements.js';
import { currentBackgroundTheme, currentToolStyle } from './theme.js';
import {
  targetAt, indexFor, sourceTargetAt, isBuiltInPattern, getPatternColorMap,
  invalidateEffectiveMap, invalidatePatternDataCaches, getPatternHiddenSourceList, getPatternHiddenSourceSet,
  hiddenSignature, customRecalcSignature, isCustomFromImagePattern, findPatternByBaseId,
  getCustomRecalcRowsIfReady, getEffectiveTargetRows, getEffectivePatternResult,
  getTargetCounts, getTargetTotal, allColorCodes, beadLabel, activePaletteColorCount,
  normalizePatternColorMapForActivePalette, getPatternColors, getPatternAnalysis,
  getSourceCounts, getSourcePatternColors, getSourcePatternAnalysis,
  invalidatePlacedCounts, getPlacedCounts, normalizePatternSize, baseIdFor,
  patternFingerprint, normalizeCraft, resizePattern, findBasePattern, findCustomPattern,
} from './pattern.js';
import {
  loadImageFromDataUrl, imageToPatternRows, convertImageToPattern,
  nearestColorCodeByLab, nearestColorCode,
} from './image-convert.js';
import { encodePatternCode, decodePatternCode, extractPatternCode } from './pattern-code.js';
import { sceneCanvas, scene, previewCanvas, preview, sideReferenceCanvas, sideReferenceCtx, els } from './dom.js';
import {
  useMobileTrayGrid, useMobileDirectPlacement, isTouchDevice, maxBoardScale,
  shouldShowTray, trayDimensions, traySlotCapacity, makeTrayMatrix, makeTraySeeds,
  syncTrayMatrixShape, countTrayBeans, syncTrayBeans, trayGeometry, trayCellCenter,
  trayCellFromPoint, trayRowFromPoint, needleCapacity, calcTrayFillAmount, pseudoRandom,
  markCanvasDirty, invalidateLayoutCache, currentLayout, boardViewTransform,
  setBoardZoom, resetBoardView, gesturePointerCount, gesturePrimaryPair,
  startBoardGesture, updateBoardGesture, touchToCanvas,
  computeLayout, setupHiDpiCanvas, render,
  drawBead, drawBoard, drawTray, drawPreview, drawChooseScene, drawFinishShowcase,
  boardFusionShapeProfile, buildFusedPiecesFromPlaced, getFusedPieces, pieceSortByArea,
  drawGradientCapsuleBridge, roundedPath, fusedColor, previewCellFromPoint,
  inspectionSummary, placementAccuracy, heatStats, estimateWarp,
  scoreLabel, finalGrade, statusText,
  boardCellFromPoint, pointInTray, trayDumpButtonRect, pointInTrayDumpButton,
  isSpillDamagedIndex, drawSpillDamages, drawInspectionHints, pointerToCanvas, pointInLampSwitch,
  drawShareImage, setAutoSaveHook, markDirty,
} from './render.js';
import { placedCount } from './pattern.js';
import { showToast, hidePlaceHint, showPlaceHint, showAchievementToast } from './notify.js';
import {
  setUIActions, setSizeControls as uiSetSizeControls, updateSelectedPaletteCount as uiUpdateSelectedPaletteCount,
  renderUI as uiRenderUI, renderCollection as uiRenderCollection, renderSharePanel as uiRenderSharePanel,
} from './ui.js';
import { escapeHtml, pickCustomPatternNote } from './utils.js';
import {
  setGalleryActions, enterGalleryMode, renderGallery, loadGallery,
  openGallerySubmitModal, closeGallerySubmitModal, submitGalleryPattern,
  createCloudShare, importPatternCode, submitCurrentToGallery,
  autoCopyText, applyImportedPattern,
  extractCloudShortId, requestShareApi,
} from './gallery.js';




  let collection = readCollection();
  state.achievements = readAchievements();
  let lastFrame = performance.now();

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
  const IRON_DEFAULT_TEMPERATURE = 62;
  const IRON_DEFAULT_PRESSURE = 56;
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
    drawCanvasPaint();
  }

  function tickDrawKbdNav(dtSec) {
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
    drawCanvasPaint();
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

  function closeDrawResizeModal(restoreSelectValue) {
    if (els.drawResizeModal) {
      els.drawResizeModal.classList.remove("show");
      els.drawResizeModal.setAttribute("aria-hidden", "true");
    }
    if (restoreSelectValue) setDrawSizeControlValue(drawWidth(), drawHeight());
  }

  let drawCodeMode = "import";
  function openDrawCodeModal(mode, value = "") {
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

  function closeDrawCodeModal() {
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
    await autoCopyText(code, successMessage, "图纸码已生成（复制失败，请手动复制）。");
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
    drawCanvasPaint();
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

  function drawCanvasPaint() {
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
      shapeBtn.innerHTML = isCircle
        ? `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/></svg>`
        : `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/></svg>`;
    }
    if (els.drawUndoButton) els.drawUndoButton.disabled = drawState.undoStack.length === 0;
  }

  function renderDrawStudio() {
    if (state.appMode !== "draw") return;
    ensureDrawGrid();
    renderDrawPalette();
    renderDrawToolButtons();
    drawCanvasPaint();
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
    loadPattern(pattern, false);
    setAppMode("bead");
    showToast("绘图已生成图纸，开始拼豆。");
  }









  function applyBackgroundTheme(themeId = state.bgTheme) {
    state.bgTheme = backgroundThemes[themeId] ? themeId : "mist";
    const theme = currentBackgroundTheme();
    const root = document.documentElement;
    root.style.setProperty("--page-base", theme.pageBase);
    root.style.setProperty("--page-glow-a", theme.pageGlowA);
    root.style.setProperty("--page-glow-b", theme.pageGlowB);
    root.style.setProperty("--table", theme.table[1]);
    root.style.setProperty("--table-deep", theme.table[2]);
    root.style.setProperty("--brand", theme.brand || "#57b8a7");
    root.style.setProperty("--brand-ink", theme.brandInk || "#1f6153");
    root.style.setProperty("--brand-edge", theme.brandEdge || "#3f988b");
    root.style.setProperty("--brand-tint", theme.brandTint || "rgba(87, 184, 167, 0.16)");
    root.style.setProperty("--brand-tint-strong", theme.brandTintStrong || "rgba(87, 184, 167, 0.25)");
    if (els.bgThemeSelect) els.bgThemeSelect.value = state.bgTheme;
    markDirty();
  }

  // Keep only the active screen exposed to assistive tech / the doc outline,
  // so the per-screen <h1>s don't stack up as multiple level-1 headings (A3).
  function applyScreenAria() {
    const mode = state.appMode;
    const beadActive = mode === "bead";
    [
      [els.startScreen, mode === "home"],
      [els.galleryScreen, mode === "gallery"],
      [els.collectionScreen, mode === "collection"],
      [els.drawingStudio, mode === "draw"],
      [document.querySelector(".bead-topbar"), beadActive],
      [els.studioGrid, beadActive],
    ].forEach(([el, active]) => {
      if (el) el.setAttribute("aria-hidden", active ? "false" : "true");
    });
  }

  function setAppMode(mode) {
    state.appMode = mode === "draw" ? "draw" : mode === "bead" ? "bead" : mode === "gallery" ? "gallery" : mode === "collection" ? "collection" : "home";
    state.collectionPageOpen = state.appMode === "collection";
    document.body.dataset.appMode = state.appMode;
    applyScreenAria();
    if (state.appMode === "bead") {
      state.uiDirty = true;
      state.previewDirty = true;
      state.renderDirty = true;
      markDirty();
      return;
    }
    if (state.appMode === "draw") {
      ensureDrawPaletteColor();
      renderDrawStudio();
    }
    if (state.appMode === "gallery") {
      enterGalleryMode();
      return;
    }
    if (state.appMode === "collection") {
      state.collectionPageOpen = true;
      uiRenderCollection();
    }
  }

  function normalizedCustomDenoiseLevel(value) {
    return clamp(Math.round(Number(value) || 0), 0, 100);
  }

  function setCustomDenoiseControls(level) {
    const normalized = normalizedCustomDenoiseLevel(level);
    state.customDenoiseLevel = normalized;
    if (els.customDenoiseSlider) els.customDenoiseSlider.value = String(normalized);
    if (els.customDenoiseValue) els.customDenoiseValue.textContent = `${normalized}%`;
    return normalized;
  }


  async function recomputeCustomHiddenRowsFromOriginal(pattern = state.selectedPattern) {
    if (!isCustomFromImagePattern(pattern)) return false;
    const hidden = getPatternHiddenSourceList(pattern);
    const id = baseIdFor(pattern);
    if (!hidden.length) {
      delete state.customHiddenRecalcCache[id];
      invalidateEffectiveMap(pattern);
      return true;
    }
    const signature = customRecalcSignature(pattern, hidden);
    if (state.customHiddenRecalcCache[id]?.signature === signature) return true;
    if (state.customHiddenRecalcPending[id]) {
      if (state.customHiddenRecalcPending[id] !== signature) {
        state.customHiddenRecalcQueued[id] = signature;
      }
      return false;
    }
    state.customHiddenRecalcPending[id] = signature;
    try {
      const image = await loadImageFromDataUrl(pattern.sourceImageDataUrl);
      const result = convertImageToPattern(image, {
        removeWhite: pattern.sourceRemoveWhite !== false,
        size: pattern.size,
        denoiseLevel: pattern.sourceDenoiseLevel ?? state.customDenoiseLevel,
        excludedCodes: hidden,
        allowPaletteExpansionOnExclude: true,
      });
      state.customHiddenRecalcCache[id] = {
        signature,
        rows: result.rows,
        stats: result.stats,
      };
      if (baseIdFor(state.selectedPattern) === id && customRecalcSignature(state.selectedPattern) === signature) {
        invalidateEffectiveMap(state.selectedPattern);
        state.previewDirty = true;
        const available = getPatternColors();
        if (!available.includes(state.selectedColor)) state.selectedColor = available[0] || state.selectedColor;
        showToast("已按原图完成重算。");
        markDirty();
      }
      return true;
    } catch (error) {
      showToast("按原图重算失败。");
      return false;
    } finally {
      if (state.customHiddenRecalcPending[id] === signature) {
        delete state.customHiddenRecalcPending[id];
      }
      const queued = state.customHiddenRecalcQueued[id];
      if (queued && queued !== signature) {
        delete state.customHiddenRecalcQueued[id];
        const nextPattern = findPatternByBaseId(id);
        if (nextPattern) {
          void recomputeCustomHiddenRowsFromOriginal(nextPattern);
        }
      }
    }
  }



  function setSizeControls(size) {
    const normalized = normalizePatternSize(size);
    state.patternSize = normalized;
    if (els.patternSizeSlider) {
      els.patternSizeSlider.value = String(normalized);
      const min = Number(els.patternSizeSlider.min) || 12;
      const max = Number(els.patternSizeSlider.max) || 100;
      const progress = clamp((normalized - min) / Math.max(1, max - min), 0, 1);
      els.patternSizeSlider.style.setProperty("--size-progress", `${Math.round(progress * 100)}%`);
    }
    if (els.patternSizeValue) els.patternSizeValue.textContent = String(normalized);
    if (els.customSizeMeta) els.customSizeMeta.textContent = `${normalized}x${normalized}`;
  }

  function applyPatternSize(size) {
    const normalized = normalizePatternSize(size);
    if (normalized === state.selectedPattern.size) {
      uiSetSizeControls(normalized);
      return;
    }
    uiSetSizeControls(normalized);
    const base = findBasePattern();
    if (baseIdFor(base).startsWith("custom-") && base.sourceImageDataUrl) {
      reconvertCustomPatternAtSize(base, normalized, state.phase !== "choose");
      return;
    }
    loadPattern(resizePattern(base, normalized), state.phase !== "choose");
    showToast(`图纸已调整为 ${normalized}x${normalized}。`);
  }

  function loadPattern(pattern, keepPhase = false) {
    state.selectedPattern = pattern;
    if (baseIdFor(pattern).startsWith("custom-")) {
      setCustomDenoiseControls(pattern.sourceDenoiseLevel ?? state.customDenoiseLevel);
    }
    invalidateLayoutCache();
    if (baseIdFor(pattern).startsWith("custom-")) {
      closeRemapModal();
    }
    const patternId = baseIdFor(pattern);
    const previousHidden = state.patternHiddenSources[patternId] || [];
    const sourceColors = getSourcePatternColors(pattern);
    const normalizedMap = normalizePatternColorMapForActivePalette(pattern);
    state.patternHiddenSources[patternId] = [...new Set(previousHidden.filter((code) => sourceColors.includes(code)))];
    invalidateEffectiveMap(pattern);
    if (isCustomFromImagePattern(pattern) && state.patternHiddenSources[patternId].length) {
      void recomputeCustomHiddenRowsFromOriginal(pattern);
    }
    state.patternColorMap = normalizedMap;
    uiSetSizeControls(pattern.size);
    const total = pattern.size * pattern.size;
    state.placed = Array(total).fill(null);
    invalidatePlacedCounts();
    state.heat = Array(total).fill(0);
    state.trayColor = null;
    state.trayProgress = 0;
    state.trayBeans = 0;
    state.trayCapacity = 0;
    state.trayMatrix = makeTrayMatrix(0);
    state.trayPourId = 0;
    state.spill = null;
    state.spillDamages = [];
    state.fusedPieces = [];
    state.floorDrops = [];
    state.conceptEaster = false;
    state.conceptEasterType = null;
    state.projectedGuideCache = null;
    state.lampOn = false;
    state.boardView.scale = 1;
    state.boardView.panX = 0;
    state.boardView.panY = 0;
    state.gesture.active = false;
    state.gesture.touchActive = false;
    state.gesture.pointers = {};
    state.tweezerBead = null;
    state.needleLoaded = 0;
    state.errors = [];
    state.showHints = false;
    state.cooling = 0;
    state.flattening = 0;
    state.warp = 18;
    state.flipCount = 0;
    state.craft = normalizeCraft(pattern.craft);
    state.savedCurrent = false;
    state.tool = "needle";
    state.needleTier = 1;
    const firstColor = getPatternColors(pattern)[0] || "K";
    state.selectedColor = firstColor;
    state.previewDirty = true;
    state.patternsDirty = true;
    if (!keepPhase) state.phase = "choose";
    markDirty();
  }



  // --- Audio & Haptics ---
  let audioCtx = null;
  function initAudio() {
    if (!audioCtx) {
      try {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      } catch (e) { }
    }
  }

  function playClickSound(type = "light") {
    if (!audioCtx) return;
    if (audioCtx.state === "suspended") audioCtx.resume();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    
    if (type === "light") {
      osc.type = "sine";
      osc.frequency.setValueAtTime(800, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, audioCtx.currentTime + 0.04);
      gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.04);
      osc.start(audioCtx.currentTime);
      osc.stop(audioCtx.currentTime + 0.04);
    } else if (type === "heavy") {
      osc.type = "triangle";
      osc.frequency.setValueAtTime(200, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(50, audioCtx.currentTime + 0.06);
      gain.gain.setValueAtTime(0.4, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.06);
      osc.start(audioCtx.currentTime);
      osc.stop(audioCtx.currentTime + 0.06);
    }
  }

  function triggerHaptic(type = "light") {
    initAudio();
    if (navigator.vibrate) {
      if (type === "light") navigator.vibrate(5);
      else if (type === "heavy") navigator.vibrate(10);
      else if (type === "error") navigator.vibrate([15, 30, 15]);
    }
    playClickSound(type);
  }

  function setPhase(phase) {
    state.phase = phase;
    state.pointer.down = false;
    state.pointer.mode = null;
    state.pointer.trayTapPending = false;
    state.pointer.pendingCell = null;
    state.gesture.active = false;
    state.gesture.touchActive = false;
    state.gesture.pointers = {};
    if (phase !== "place" && phase !== "inspect") {
      if (state.boardView.scale > 1.01) {
        state.boardView.scale = 1;
        state.boardView.panX = 0;
        state.boardView.panY = 0;
      }
    }
    state.ironPos = null;
    if (phase !== "iron") state.emptyIronEaster = false;
    if (phase !== "finish") state.conceptEaster = false;
    if (phase !== "finish") state.conceptEasterType = null;
    if (phase !== "cool" && phase !== "finish") state.fusedPieces = [];
    if (phase !== "place") state.tweezerBead = null;
    if (phase !== "choose" && state.remapModalOpen) closeRemapModal();
    if (phase === "inspect") runInspection();
    if (phase === "iron") {
      state.temperature = IRON_DEFAULT_TEMPERATURE;
      state.pressure = IRON_DEFAULT_PRESSURE;
      state.showHints = false;
    }
    if (phase === "cool" && state.cooling < 12) {
      state.cooling = 12;
      state.warp = Math.max(state.warp, estimateWarp());
    }
    if (phase === "cool" || phase === "finish") {
      state.fusedPieces = buildFusedPiecesFromPlaced();
    }
    state.pendingWorkflowScroll = true;
    schedulePhaseViewportReset();
    markDirty();
  }


  function schedulePhaseViewportReset() {
    state.pendingPageReset = true;
  }

  function resetPhaseViewport() {
    const reset = () => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "auto",
      });
    };
    reset();
    window.requestAnimationFrame(() => {
      reset();
      window.requestAnimationFrame(reset);
    });
    window.setTimeout(reset, 120);
  }

  function toggleSandboxMode(next = !state.sandboxMode) {
    const enabled = Boolean(next);
    if (state.sandboxMode === enabled) return;
    state.sandboxMode = enabled;
    state.errors = [];
    if (state.phase === "inspect") runInspection();
    showToast(enabled ? "沙盒模式已开启：自由拼摆，不做图纸校验。" : "沙盒模式已关闭：恢复图纸校验流程。");
    markDirty();
  }

  function toggleLamp(next = !state.lampOn) {
    state.lampOn = Boolean(next);
    state.lampSwitchFlashUntil = performance.now() + 140;
    showToast(state.lampOn ? "工作灯已打开：投影色稿可见。" : "工作灯已关闭：关闭投影色稿。");
    markDirty();
  }


  // --- Auto Save ---
  let autoSaveTimer = 0;

  function autoSave() {
    if (state.phase === "choose") {
      localStorage.removeItem(sessionKey);
      return;
    }
    const session = {
      phase: state.phase,
      sandboxMode: state.sandboxMode,
      selectedPatternId: state.selectedPattern ? state.selectedPattern.id : null,
      patternColorMaps: state.patternColorMaps,
      patternSize: state.patternSize,
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
      spill: state.spill
    };
    try {
      localStorage.setItem(sessionKey, JSON.stringify(session));
    } catch(e) {}
  }

  function scheduleAutoSave(delay = 550) {
    window.clearTimeout(autoSaveTimer);
    autoSaveTimer = window.setTimeout(autoSave, delay);
  }

  function loadAutoSave() {
    try {
      const data = localStorage.getItem(sessionKey);
      if (!data) return false;
      const session = JSON.parse(data);
      if (!session || session.phase === "choose") return false;
      
      const pattern = patterns.find(p => p.id === session.selectedPatternId);
      if (!pattern) return false;
      
      state.phase = session.phase;
      state.sandboxMode = session.sandboxMode;
      state.selectedPattern = pattern;
      if (session.patternColorMaps) state.patternColorMaps = session.patternColorMaps;
      if (session.patternSize) state.patternSize = session.patternSize;
      state.placed = session.placed || [];
      invalidatePlacedCounts();
      state.heat = session.heat || [];
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
      
      // restore transient states
      if (state.selectedPattern) loadPattern(state.selectedPattern);
      if (state.phase !== "choose") compileCurrentPattern();
      syncFusionMatrix();
      setPhase(state.phase);
      return true;
    } catch(e) {
      return false;
    }
  }



  function canDropToFloorAt(x, y) {
    if (boardCellFromPoint(x, y)) return false;
    if (shouldShowTray() && pointInTray(x, y)) return false;
    if (shouldShowTray() && pointInTrayDumpButton(x, y)) return false;
    if (pointInReferenceSheet(x, y)) return false;
    if (pointInLampSwitch(x, y)) return false;
    return true;
  }

  function dropHeldBeadToFloor(x, y) {
    if (state.phase !== "place") return false;
    if (useMobileDirectPlacement()) return false;
    if (!canDropToFloorAt(x, y)) return false;
    let code = null;
    if (state.tool === "tweezers") {
      if (!state.tweezerBead) return false;
      code = state.tweezerBead;
      state.tweezerBead = null;
    } else {
      if (!state.needleLoaded || !state.trayColor) return false;
      code = state.trayColor;
      state.needleLoaded = Math.max(0, state.needleLoaded - 1);
      state.trayProgress = clamp(state.trayProgress - 0.06, 0, 100);
    }
    const drop = {
      x,
      y,
      code,
      orientation: Math.random() < 0.5 ? "h" : "v",
      seed: pseudoRandom(`${state.selectedPattern.id}-${Date.now()}-${x}-${y}`),
      bornAt: performance.now(),
      duration: 760 + Math.round(pseudoRandom(`${state.selectedPattern.id}-${x}-${y}-dur`) * 260),
      spinDir: pseudoRandom(`${state.selectedPattern.id}-${x}-${y}-spin`) > 0.5 ? 1 : -1,
    };
    state.floorDrops.push(drop);
    if (state.floorDrops.length > 52) state.floorDrops.shift();
    showToast(`${beadLabel(code)} 掉到地板上了。`);
    state.savedCurrent = false;
    markDirty();
    return true;
  }

  function handlePreviewPickRemap(event) {
    if (state.phase !== "choose") return;
    const cell = previewCellFromPoint(event.clientX, event.clientY);
    if (!cell) return;
    const sourceCode = state.selectedPattern.rows[cell.y]?.[cell.x] || ".";
    if (sourceCode === ".") return;
    openRemapModal(sourceCode);
  }

  function drawPatternThumb(canvas, pattern) {
    // Render at the real device resolution so the small bitmap is never blurrily
    // upscaled (which would leave light halos / seams between cells on HiDPI screens).
    const dpr = Math.min(3, Math.max(1, window.devicePixelRatio || 1));
    const cssSize = canvas.clientWidth || Number(canvas.getAttribute("width")) || 58;
    const dim = Math.round(cssSize * dpr);
    if (canvas.width !== dim || canvas.height !== dim) {
      canvas.width = dim;
      canvas.height = dim;
    }
    const ctx = canvas.getContext("2d");
    const size = pattern.size;
    const cell = dim / size;
    const rows = getEffectiveTargetRows(pattern);
    ctx.clearRect(0, 0, dim, dim);
    ctx.fillStyle = "#eef2f7";
    ctx.fillRect(0, 0, dim, dim);
    for (let y = 0; y < size; y++) {
      const row = rows[y] || "";
      for (let x = 0; x < size; x++) {
        const code = row[x];
        if (!code || code === ".") continue;
        const px = Math.round(x * cell);
        const py = Math.round(y * cell);
        const pw = Math.round((x + 1) * cell) - px;
        const ph = Math.round((y + 1) * cell) - py;
        ctx.fillStyle = palette[code] || "#ccc";
        ctx.fillRect(px, py, pw, ph);
      }
    }
  }

  async function reconvertCustomPatternAtSize(basePattern, size, keepPhase = false) {
    try {
      const image = await loadImageFromDataUrl(basePattern.sourceImageDataUrl);
      const removeWhite = basePattern.sourceRemoveWhite !== false;
      const denoiseLevel = normalizedCustomDenoiseLevel(basePattern.sourceDenoiseLevel ?? state.customDenoiseLevel);
      const result = convertImageToPattern(image, { removeWhite, size, denoiseLevel });
      const rows = result.rows;
      const beadCount = rows.join("").replace(/\./g, "").length;
      if (!beadCount) {
        showToast("这个尺寸下识别不到可用豆子。");
        return;
      }
      const updated = {
        ...basePattern,
        size,
        rows,
        sourceRows: rows,
        sourceSize: size,
        sourceDenoiseLevel: denoiseLevel,
        conversionStats: result.stats,
        note: pickCustomPatternNote(
          "image",
          size,
          basePattern.sourceImageDataUrl || `${size}|${rows.join("")}`,
        ),
      };
      invalidatePatternDataCaches(updated);
      const idx = patterns.findIndex((item) => baseIdFor(item) === baseIdFor(basePattern));
      if (idx >= 0) patterns[idx] = updated;
      state.lastConversionStats = result.stats;
      loadPattern(updated, keepPhase);
      showToast(`已按 ${size}x${size} 重新识别图片图纸。`);
    } catch (error) {
      showToast("图片重新识别失败。");
    }
  }

  function handleCustomImage(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const sourceImageDataUrl = String(reader.result || "");
        const image = await loadImageFromDataUrl(sourceImageDataUrl);
        const size = normalizePatternSize(els.patternSizeSlider?.value || state.patternSize);
        const removeWhite = els.customWhiteToggle.checked;
        const denoiseLevel = setCustomDenoiseControls(els.customDenoiseSlider?.value ?? state.customDenoiseLevel);
        uiSetSizeControls(size);
        // Yield a frame so the "正在识别图片…" toast paints before the
        // synchronous conversion (which can briefly block on large images).
        await new Promise((resolve) => setTimeout(resolve, 16));
        const result = convertImageToPattern(image, {
          removeWhite,
          size,
          denoiseLevel,
        });
        const rows = result.rows;
        const beadCount = rows.join("").replace(/\./g, "").length;
        if (!beadCount) {
          showToast("这张图转换后没有可用豆子。");
          return;
        }
        const pattern = {
          id: "custom-user",
          name: "自定义图纸",
          size,
          craft: "原版",
          rows,
          sourceRows: rows,
          sourceSize: size,
          sourceImageDataUrl,
          sourceRemoveWhite: removeWhite,
          sourceDenoiseLevel: denoiseLevel,
          conversionStats: result.stats,
          note: pickCustomPatternNote("image", size, sourceImageDataUrl),
        };
        state.lastConversionStats = result.stats;
        for (let i = patterns.length - 1; i >= 0; i -= 1) {
          if (patterns[i].id.startsWith("custom-")) patterns.splice(i, 1);
        }
        patterns.unshift(pattern);
        loadPattern(pattern);
        showToast(`自定义图纸已生成：${result.stats.total}颗 / ${result.stats.colors.length}色。`);
      } catch (error) {
        showToast("图片读取失败。");
      } finally {
        event.target.value = "";
      }
    };
    reader.onerror = () => {
      showToast("图片读取失败。");
      event.target.value = "";
    };
    showToast("正在识别图片…");
    reader.readAsDataURL(file);
  }



  // --- Modal focus management (a11y): trap focus and restore on close ---
  function getOpenModalEl() {
    if (state.remapModalOpen) return els.remapModal;
    if (state.settingsModalOpen) return els.settingsModal;
    if (state.shareModalOpen) return els.shareModal;
    if (state.gallerySubmitModalOpen) return els.gallerySubmitModal;
    return null;
  }

  function focusablesIn(modalEl) {
    if (!modalEl) return [];
    return [...modalEl.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )].filter((el) => !el.disabled && el.offsetParent !== null && el.getAttribute("aria-hidden") !== "true");
  }

  function onModalOpened(modalEl) {
    if (!modalEl) return;
    const active = document.activeElement;
    // Remember the real trigger (skip if focus is already inside any modal).
    if (active && active !== document.body && !active.closest(".remap-modal")) {
      state.modalReturnFocus = active;
    }
    const focusables = focusablesIn(modalEl);
    if (focusables.length) focusables[0].focus();
  }

  function restoreModalFocus() {
    if (getOpenModalEl()) return; // another modal is still open
    const el = state.modalReturnFocus;
    state.modalReturnFocus = null;
    if (el && typeof el.focus === "function" && document.contains(el)) el.focus();
  }

  function openCollectionPage() {
    if (!els.collectionScreen) return;
    state.collectionPageOpen = true;
    setAppMode("collection");
    uiRenderCollection();
  }

  function closeCollectionPage() {
    if (!els.collectionScreen) return;
    state.collectionPageOpen = false;
    const viewer = els.collectionScreen.querySelector(".collection-enlarged");
    if (viewer) viewer.classList.remove("show");
    setAppMode("home");
    requestAnimationFrame(() => els.collectionButton?.focus?.());
  }

  function openShareModal() {
    if (!els.shareModal) return;
    state.shareModalOpen = true;
    els.shareModal.classList.add("show");
    els.shareModal.setAttribute("aria-hidden", "false");
    uiRenderSharePanel();
    onModalOpened(els.shareModal);
  }

  function closeShareModal() {
    if (!els.shareModal) return;
    state.shareModalOpen = false;
    els.shareModal.classList.remove("show");
    els.shareModal.setAttribute("aria-hidden", "true");
    restoreModalFocus();
  }

  function openSettingsModal() {
    if (!els.settingsModal) return;
    state.settingsModalOpen = true;
    els.settingsModal.classList.add("show");
    els.settingsModal.setAttribute("aria-hidden", "false");
    onModalOpened(els.settingsModal);
  }

  function closeSettingsModal() {
    if (!els.settingsModal) return;
    state.settingsModalOpen = false;
    els.settingsModal.classList.remove("show");
    els.settingsModal.setAttribute("aria-hidden", "true");
    restoreModalFocus();
  }

  function startIroning(forceSpill = false) {
    if (placedCount() <= 0) {
      state.emptyIronEaster = true;
      showToast("空板熨烫彩蛋触发：出现隐藏压纹。");
      setPhase("iron");
      return;
    }
    if (state.spill && !forceSpill) {
      showToast("还有倒下的豆子未处理。");
      return;
    }
    if (state.spill && forceSpill) {
      state.spillDamages.push({
        index: state.spill.index,
        code: state.spill.code,
      });
      state.heat[state.spill.index] = Math.max(state.heat[state.spill.index] || 0, 118);
      state.spill = null;
      state.warp = clamp(state.warp + 8, 0, 80);
      showToast("你选择直接熨烫，倒下的豆子已经糊在一起。");
    }
    state.temperature = IRON_DEFAULT_TEMPERATURE;
    state.pressure = IRON_DEFAULT_PRESSURE;
    setPhase("iron");
  }

  function openRemapModal(focusSource = null) {
    if (state.phase !== "choose") return;
    state.remapFocusSource = focusSource || null;
    state.remapModalOpen = true;
    if (els.remapModal) {
      els.remapModal.classList.add("show");
      els.remapModal.setAttribute("aria-hidden", "false");
    }
    renderRemapModal();
    onModalOpened(els.remapModal);
  }

  function closeRemapModal() {
    state.remapModalOpen = false;
    if (els.remapModal) {
      els.remapModal.classList.remove("show");
      els.remapModal.setAttribute("aria-hidden", "true");
    }
    restoreModalFocus();
  }

  function resetPatternColorMapping() {
    const map = state.patternColorMap || {};
    const patternId = baseIdFor(state.selectedPattern);
    const sourceColors = getSourcePatternColors();
    const hiddenCount = getPatternHiddenSourceList().length;
    const changed = sourceColors.some((code) => (map[code] || code) !== code) || hiddenCount > 0;
    if (!changed) {
      showToast("当前就是原始配色。");
      return;
    }
    sourceColors.forEach((code) => {
      map[code] = code;
    });
    state.patternColorMaps[patternId] = map;
    state.patternHiddenSources[patternId] = [];
    invalidateEffectiveMap();
    state.previewDirty = true;
    if (state.phase !== "choose" && (placedCount() > 0 || state.trayBeans > 0 || state.needleLoaded > 0 || state.tweezerBead || state.spill)) {
      resetPlacementForRemap();
      showToast("已恢复原色，当前摆放已重置。");
    } else {
      showToast("已恢复官方原色。");
    }
    markDirty();
    renderRemapModal();
  }

  function renderRemapModal() {
    const allSourceColors = getSourcePatternColors();
    const focus = state.remapFocusSource;
    const sourceColors = focus && allSourceColors.includes(focus) ? [focus] : allSourceColors;
    if (!els.remapModalBody) return;
    if (!sourceColors.length) {
      els.remapModalBody.innerHTML = "";
      return;
    }
    if (els.remapModalTitle) {
      els.remapModalTitle.textContent = sourceColors.length === 1
        ? `换色：${beadIds[sourceColors[0]]}`
        : "图纸换色";
    }
    const map = state.patternColorMap || {};
    const allCodes = allColorCodes();
    const activeCodes = new Set(allCodes);
    els.remapModalBody.innerHTML = "";
    sourceColors.forEach((sourceCode) => {
      const card = document.createElement("div");
      card.className = "remap-card";
      const currentTarget = activeCodes.has(map[sourceCode]) ? map[sourceCode] : sourceCode;
      card.innerHTML = `
        <div class="remap-card-head">
          <span class="remap-to">
            <span class="remap-swatch${beadIds[currentTarget] === "H1" ? " is-transparent" : ""}" style="${beadIds[currentTarget] === "H1" ? "" : `background:${palette[currentTarget]}`}"></span>
            <span class="remap-label">${beadIds[currentTarget]}</span>
          </span>
        </div>
      `;
      const swatchGrid = document.createElement("div");
      swatchGrid.className = "swatch-grid";
      allCodes.forEach((code) => {
        const cell = document.createElement("button");
        cell.type = "button";
        const isCellTransparent = beadIds[code] === "H1";
        cell.className = `swatch-cell${currentTarget === code ? " active" : ""}${isCellTransparent ? " is-transparent" : ""}`;
        if (!isCellTransparent) cell.style.background = palette[code];
        cell.title = beadIds[code] || code;
        cell.setAttribute("aria-label", cell.title);
        cell.addEventListener("click", () => {
          setPatternColorMapping(sourceCode, code);
          renderRemapModal();
        });
        swatchGrid.appendChild(cell);
      });
      card.appendChild(swatchGrid);
      els.remapModalBody.appendChild(card);
    });
  }

  function openCollectionEntry(entry) {
    const rawId = String(entry?.id || "");
    const firstDash = rawId.indexOf("-");
    const patternId = firstDash >= 0 ? rawId.slice(firstDash + 1) : "";
    const found = patterns.find((item) => item.id === patternId || baseIdFor(item) === patternId);
    if (!found) {
      showToast("这条收藏对应的图纸当前不可用。");
      return;
    }
    loadPattern(resizePattern(found, state.patternSize), false);
    setAppMode("bead");
    showToast(`已打开收藏：${found.name}`);
  }

  function pourSelectedColor() {
    if (state.trayColor && state.trayColor !== state.selectedColor && state.trayBeans > 0) {
      showToast(`豆筛里还有 ${beadLabel(state.trayColor)}，先倒掉才能换色。`);
      return;
    }
    if (state.trayColor === state.selectedColor && state.trayBeans > 0) {
      showToast(`${beadLabel(state.trayColor)} 已在豆筛中。`);
      return;
    }
    state.trayColor = state.selectedColor;
    state.trayCapacity = calcTrayFillAmount(state.trayColor);
    state.trayPourId += 1;
    state.trayMatrix = makeTrayMatrix(state.trayCapacity);
    syncTrayBeans();
    state.traySeeds = makeTraySeeds(state.trayColor, state.trayCapacity);
    state.trayProgress = Math.max(state.trayProgress, 4);
    state.needleLoaded = 0;
    showToast(`${beadLabel(state.trayColor)} 倒入豆筛（${state.trayBeans} 颗）。`);
    markDirty();
  }

  function improveSort(amount, message) {
    if (!state.trayColor) {
      showToast("豆筛是空的，先从豆盒倒入一种颜色。");
      return;
    }
    state.trayProgress = clamp(state.trayProgress + amount, 0, 100);
    showToast(message);
    markDirty();
  }

  function dumpTray() {
    if (!state.trayColor) {
      showToast("豆筛已经是空的。");
      return;
    }
    const oldColor = state.trayColor;
    state.trayColor = null;
    state.trayProgress = 0;
    state.trayBeans = 0;
    state.trayCapacity = 0;
    state.trayMatrix = makeTrayMatrix(0);
    state.needleLoaded = 0;
    state.traySeeds = [];
    showToast(`${beadLabel(oldColor)} 已倒回豆盒。`);
    markDirty();
  }

  function loadNeedleFromTray(rowIndex = null) {
    if (!state.trayColor || state.trayBeans <= 0) {
      showToast("豆筛里没有可取的豆子。");
      return;
    }
    if (state.trayProgress <= needleLoadSortThreshold) {
      showToast("豆筛还不够整齐，多筛几下再上豆针。");
      return;
    }
    const cap = needleCapacity();
    const need = cap - state.needleLoaded;
    if (need <= 0) {
      showToast("豆针已装满。");
      return;
    }
    const row = rowIndex === null || rowIndex === undefined
      ? 0
      : clamp(rowIndex, 0, Math.max(0, state.trayMatrix.length - 1));
    const trayRow = state.trayMatrix[row] || [];
    let grabbed = 0;
    for (let col = trayRow.length - 1; col >= 0 && grabbed < need; col -= 1) {
      if (!trayRow[col]) continue;
      trayRow[col] = false;
      grabbed += 1;
    }
    if (!grabbed) {
      showToast("这一条槽已经没豆子了，点另一条槽。");
      return;
    }
    state.needleLoaded += grabbed;
    syncTrayBeans();
    state.trayProgress = clamp(state.trayProgress - grabbed * 0.12, 0, 100);
    showToast(`豆针从第 ${row + 1} 条槽取到 ${grabbed} 颗 ${beadIds[state.trayColor]}。`);
    markDirty();
  }

  function loadTweezersFromTray(rowIndex = null, colIndex = null) {
    if (!state.trayColor || state.trayBeans <= 0) {
      showToast("豆筛里没有可夹的豆子。");
      return;
    }
    if (state.tweezerBead) {
      showToast("镊子上已经夹着一颗，先放下或放回豆盒。");
      return;
    }
    let row = rowIndex;
    let col = colIndex;
    if (row === null || col === null || row === undefined || col === undefined) {
      outer: for (let r = 0; r < state.trayMatrix.length; r += 1) {
        for (let c = 0; c < (state.trayMatrix[r]?.length || 0); c += 1) {
          if (state.trayMatrix[r]?.[c]) {
            row = r;
            col = c;
            break outer;
          }
        }
      }
    }
    if (!state.trayMatrix[row]?.[col]) {
      showToast("点击到的位置没有豆子。");
      return;
    }
    state.trayMatrix[row][col] = false;
    syncTrayBeans();
    state.tweezerBead = state.trayColor;
    state.trayProgress = clamp(state.trayProgress - 0.08, 0, 100);
    showToast(`镊子从豆筛夹起 ${beadLabel(state.tweezerBead)}。`);
    markDirty();
  }

  function handleTrayTap(pos) {
    if (!pos) return;
    setToolPose(pos.x, pos.y);
    const row = trayRowFromPoint(pos.x, pos.y, true);
    const cell = trayCellFromPoint(pos.x, pos.y, true);
    if (state.tool === "needle") {
      if (state.trayProgress <= needleLoadSortThreshold) {
        improveSort(7, "先把豆筛抖整齐，豆针才能上豆。");
        return;
      }
      loadNeedleFromTray(row);
      return;
    }
    if (!cell) {
      showToast("用镊子时请点在豆子上。");
      return;
    }
    loadTweezersFromTray(cell.row, cell.col);
  }

  function pickTweezerFromBox(code) {
    if (state.tweezerBead) {
      showToast("镊子上已经夹着一颗，先放下或放回豆盒。");
      return;
    }
    state.tweezerBead = code;
    showToast(`镊子夹起 ${beadLabel(code)}。`);
  }

  function toggleTweezerBean() {
    if (state.tweezerBead) {
      const oldColor = state.tweezerBead;
      state.tweezerBead = null;
      showToast(`${beadLabel(oldColor)} 放回豆盒。`);
    } else {
      pickTweezerFromBox(state.selectedColor);
    }
    markDirty();
  }

  function clearBoard() {
    const hasContent =
      placedCount() > 0 ||
      state.trayBeans > 0 ||
      state.needleLoaded > 0 ||
      state.tweezerBead ||
      state.spill ||
      state.fusedPieces.length > 0;
    if (hasContent && !window.confirm("清空板面会移除已摆的全部豆子，确定吗？")) return;
    state.placed.fill(null);
    invalidatePlacedCounts();
    state.heat.fill(0);
    state.errors = [];
    state.cooling = 0;
    state.flattening = 0;
    state.warp = 18;
    state.savedCurrent = false;
    state.spill = null;
    state.spillDamages = [];
    state.fusedPieces = [];
    state.floorDrops = [];
    state.tweezerBead = null;
    state.needleLoaded = 0;
    showToast("板面已清空。");
    markDirty();
  }

  function resetPlacementForRemap() {
    state.placed.fill(null);
    invalidatePlacedCounts();
    state.heat.fill(0);
    state.errors = [];
    state.showHints = false;
    state.cooling = 0;
    state.flattening = 0;
    state.warp = 18;
    state.flipCount = 0;
    state.savedCurrent = false;
    state.spill = null;
    state.spillDamages = [];
    state.fusedPieces = [];
    state.floorDrops = [];
    state.tweezerBead = null;
    state.needleLoaded = 0;
    state.trayColor = null;
    state.trayProgress = 0;
    state.trayBeans = 0;
    state.trayCapacity = 0;
    state.trayMatrix = makeTrayMatrix(0);
    state.traySeeds = [];
    if (state.phase !== "choose" && state.phase !== "place" && state.phase !== "inspect") {
      setPhase("place");
    }
  }

  function setPatternColorMapping(sourceCode, targetCode) {
    if (state.phase !== "choose") {
      showToast("图纸换色只能在开始前设置。");
      return;
    }
    const map = state.patternColorMap || {};
    if (!palette[sourceCode] || !allColorCodes().includes(targetCode)) return;
    if (map[sourceCode] === targetCode) return;
    map[sourceCode] = targetCode;
    const patternId = baseIdFor(state.selectedPattern);
    state.patternColorMaps[patternId] = map;
    invalidateEffectiveMap();
    state.previewDirty = true;
    if (state.phase !== "choose" && (placedCount() > 0 || state.trayBeans > 0 || state.needleLoaded > 0 || state.tweezerBead || state.spill)) {
      resetPlacementForRemap();
      showToast("图纸换色已应用，当前摆放已重置。");
    } else {
      showToast(`已将 ${beadLabel(sourceCode)} 改为 ${beadLabel(targetCode)}。`);
    }
    const available = getPatternColors();
    if (!available.includes(state.selectedColor)) {
      state.selectedColor = available[0] || sourceCode;
    }
    markDirty();
  }


  function setToolPose(x, y) {
    state.toolPose.x = x;
    state.toolPose.y = y;
    state.toolPose.visible = true;
  }

  function setToolPoseFromCell(x, y) {
    const layout = currentLayout();
    const view = boardViewTransform(layout);
    const rawX = layout.boardX + x * layout.cell + layout.cell / 2;
    const rawY = layout.boardY + y * layout.cell + layout.cell / 2;
    setToolPose(
      (rawX - view.cx) * view.scale + view.cx + view.panX,
      (rawY - view.cy) * view.scale + view.cy + view.panY
    );
  }

  function onPointerDown(event) {
    event.preventDefault();
    if (state.gesture.touchActive) return;
    const pos = pointerToCanvas(event);
    if (state.phase === "place" || state.phase === "inspect") {
      state.gesture.pointers[event.pointerId] = { x: pos.x, y: pos.y };
    }
    state.pointer.down = true;
    state.pointer.x = pos.x;
    state.pointer.y = pos.y;
    state.pointer.lastX = pos.x;
    state.pointer.lastY = pos.y;
    state.pointer.lastT = performance.now();
    state.lastCellKey = "";
    sceneCanvas.setPointerCapture?.(event.pointerId);

    if ((state.phase === "place" || state.phase === "inspect") && gesturePointerCount() >= 2) {
      const pair = gesturePrimaryPair();
      if (pair) {
        const [p1, p2] = pair;
        startBoardGesture(p1, p2);
        return;
      }
    }

    if (!useMobileDirectPlacement() && (state.phase === "place" || state.phase === "inspect") && pointInLampSwitch(pos.x, pos.y)) {
      toggleLamp();
      state.pointer.down = false;
      state.pointer.mode = "lamp";
      state.pointer.trayTapPending = false;
      return;
    }

    if (state.phase === "place" && shouldShowTray() && pointInTrayDumpButton(pos.x, pos.y)) {
      dumpTray();
      state.pointer.mode = null;
      state.pointer.trayTapPending = false;
      state.pointer.pendingCell = null;
      return;
    }

    if (state.phase === "place" && shouldShowTray() && pointInTray(pos.x, pos.y)) {
      state.pointer.mode = "tray";
      state.pointer.trayTapPending = true;
      return;
    }

    if (state.phase === "place") {
      const cell = boardCellFromPoint(pos.x, pos.y);
      if (cell) {
        if (isTouchDevice()) {
          // Don't place immediately on any touch device — wait to see if a second
          // finger arrives (gesture). Committed on first move or on pointerup (tap).
          state.pointer.mode = "place-pending";
          state.pointer.pendingCell = { x: cell.x, y: cell.y };
          setToolPoseFromCell(cell.x, cell.y);
          return;
        }
        state.pointer.mode = "place";
        setToolPoseFromCell(cell.x, cell.y);
        handlePlaceAt(cell.x, cell.y, true);
      } else {
        dropHeldBeadToFloor(pos.x, pos.y);
      }
      return;
    }

    if (state.phase === "iron") {
      const cell = boardCellFromPoint(pos.x, pos.y);
      if (cell) {
        state.pointer.mode = "iron";
        state.ironPos = pos;
        applyIronHeat(pos.x, pos.y, 16, 0);
        markCanvasDirty();
      }
    }
  }

  function onPointerMove(event) {
    event.preventDefault();
    if (state.gesture.touchActive) return;
    const pos = pointerToCanvas(event);
    if (state.phase === "place" || state.phase === "inspect") {
      if (state.gesture.pointers[event.pointerId]) {
        state.gesture.pointers[event.pointerId] = { x: pos.x, y: pos.y };
      }
      if (state.gesture.active) {
        if (gesturePointerCount() < 2) {
          state.gesture.active = false;
        } else {
          const pair = gesturePrimaryPair();
          if (pair) {
            const [p1, p2] = pair;
            updateBoardGesture(p1, p2);
            return;
          }
        }
      }
    }
    const dx = pos.x - state.pointer.lastX;
    const dy = pos.y - state.pointer.lastY;
    const dt = Math.max(10, performance.now() - state.pointer.lastT);
    state.pointer.x = pos.x;
    state.pointer.y = pos.y;

    if (state.pointer.down && state.pointer.mode === "tray") {
      const amount = clamp(Math.hypot(dx, dy) / 18, 0, 3.5);
      if (amount > 0.2 && state.trayColor) {
        state.pointer.trayTapPending = false;
        state.trayProgress = clamp(state.trayProgress + amount, 0, 100);
        markCanvasDirty();
      }
    }

    if (state.pointer.down && state.pointer.mode === "place-pending") {
      // Finger moved before a second finger arrived → commit the first bead and start continuous painting.
      const pending = state.pointer.pendingCell;
      if (pending) {
        handlePlaceAt(pending.x, pending.y, true);
        state.pointer.pendingCell = null;
      }
      state.pointer.mode = "place";
      // fall through to the "place" block below to also handle the current cell
    }

    if (state.pointer.down && state.pointer.mode === "place") {
      if (Math.abs(dx) > 2 || Math.abs(dy) > 2) {
        state.lastMoveDir = Math.abs(dx) > Math.abs(dy) ? { x: Math.sign(dx) || 1, y: 0 } : { x: 0, y: Math.sign(dy) || 1 };
      }
      const cell = boardCellFromPoint(pos.x, pos.y);
      if (cell) handlePlaceAt(cell.x, cell.y, false);
    }

    if (state.pointer.down && state.pointer.mode === "iron") {
      state.ironPos = pos;
      applyIronHeat(pos.x, pos.y, dt, Math.hypot(dx, dy));
      markCanvasDirty();
    }

    if (!state.pointer.down && (state.phase === "place" || state.phase === "inspect")) {
      markCanvasDirty();
    }

    state.pointer.lastX = pos.x;
    state.pointer.lastY = pos.y;
    state.pointer.lastT = performance.now();
  }

  function onPointerUp(event) {
    event.preventDefault();
    if (state.gesture.touchActive) return;
    const pos = pointerToCanvas(event);
    if (state.gesture.pointers[event.pointerId]) delete state.gesture.pointers[event.pointerId];
    if (state.gesture.active && gesturePointerCount() < 2) {
      state.gesture.active = false;
    }
    if (state.phase === "place" && state.pointer.mode === "tray" && state.pointer.trayTapPending) {
      handleTrayTap(pos);
    }
    // Commit a pending mobile tap (finger lifted without moving = single-bead tap).
    if (state.phase === "place" && state.pointer.mode === "place-pending") {
      const pending = state.pointer.pendingCell;
      if (pending) handlePlaceAt(pending.x, pending.y, true);
    }
    state.pointer.down = false;
    state.pointer.mode = null;
    state.pointer.trayTapPending = false;
    state.pointer.pendingCell = null;
    state.lastCellKey = "";
    if (state.phase === "iron") state.ironPos = pos;
    markCanvasDirty();
  }

  function onTouchStart(event) {
    if (state.phase !== "place" && state.phase !== "inspect") return;
    if (event.touches.length < 2) return;
    event.preventDefault();
    startBoardGesture(touchToCanvas(event.touches[0]), touchToCanvas(event.touches[1]), true);
  }

  function onTouchMove(event) {
    if (!state.gesture.touchActive) return;
    event.preventDefault();
    if (event.touches.length < 2) {
      state.gesture.active = false;
      state.gesture.touchActive = false;
      return;
    }
    updateBoardGesture(touchToCanvas(event.touches[0]), touchToCanvas(event.touches[1]));
  }

  function onTouchEnd(event) {
    if (!state.gesture.touchActive) return;
    event.preventDefault();
    if (event.touches.length >= 2) {
      startBoardGesture(touchToCanvas(event.touches[0]), touchToCanvas(event.touches[1]), true);
      return;
    }
    state.gesture.active = false;
    state.gesture.touchActive = false;
    state.gesture.pointers = {};
    state.pointer.down = false;
    state.pointer.mode = null;
    state.pointer.pendingCell = null;
    markCanvasDirty();
  }

  function handlePlaceAt(x, y, initial) {
    setToolPoseFromCell(x, y);
    const spillKey = state.spill ? `${state.spill.index}:${state.spill.code}` : "-";
    const key = useMobileDirectPlacement()
      ? `${x}:${y}:mobile:${state.selectedColor}:${spillKey}`
      : `${x}:${y}:${state.tool}:${state.selectedColor}:${state.trayColor || "-"}:${state.tweezerBead || "-"}:${spillKey}`;
    if (!initial && key === state.lastCellKey) return;
    state.lastCellKey = key;
    if (useMobileDirectPlacement()) {
      placeSelectedBead(x, y, initial);
      return;
    }
    if (state.tool === "tweezers") {
      useTweezers(x, y);
      return;
    }
    useNeedle(x, y);
  }

  function placeSelectedBead(x, y, initial = true) {
    const index = indexFor(x, y);
    if (state.spill && state.spill.index === index) {
      state.spill = null;
    }
    const current = state.placed[index];
    if (current === state.selectedColor && initial) {
      state.placed[index] = null;
      state.heat[index] = 0;
    } else if (current === state.selectedColor) {
      return;
    } else {
      state.placed[index] = state.selectedColor;
      state.heat[index] = 0;
    }
    invalidatePlacedCounts();
    state.savedCurrent = false;
    uiUpdateSelectedPaletteCount();
    markCanvasDirty(true);
  }

  function useTweezers(x, y) {
    const index = indexFor(x, y);
    if (state.spill && state.spill.index === index) {
      if (state.tweezerBead) {
        showToast("镊子上已经夹着一颗，先放下或放回豆盒。");
        return;
      }
      state.tweezerBead = state.spill.code;
      state.placed[index] = null;
      invalidatePlacedCounts();
      state.heat[index] = 0;
      state.spill = null;
      state.savedCurrent = false;
      showToast("卡住的豆子已经夹起，可以继续摆放。");
      markDirty();
      return;
    }
    if (state.placed[index]) {
      if (state.tweezerBead) {
        showToast("镊子上已经夹着一颗，先放下或放回豆盒。");
        return;
      }
      state.tweezerBead = state.placed[index];
      state.placed[index] = null;
      invalidatePlacedCounts();
      state.heat[index] = 0;
      showToast("镊子取下一颗豆子。");
    } else {
      if (!state.tweezerBead) {
        showToast("先从豆盒夹一颗豆子。");
        return;
      }
      state.placed[index] = state.tweezerBead;
      invalidatePlacedCounts();
      state.tweezerBead = null;
    }
    state.savedCurrent = false;
    markDirty();
  }

  function useNeedle(x, y) {
    if (!state.trayColor) {
      showToast("针工具需要先从豆盒倒豆进豆筛。");
      return;
    }
    if (state.needleLoaded <= 0) {
      showToast("豆针空了，先从豆筛取豆。");
      return;
    }
    const quality = state.trayProgress;
    if (quality < 12) {
      showToast("豆筛还没排齐，先抖动一下。");
      return;
    }
    const spillChance = quality < 45 ? 0.12 : quality < 70 ? 0.07 : 0.035;
    if (!state.spill && Math.random() < spillChance) {
      const spill = createSpillAt(x, y, state.trayColor);
      if (spill) {
        state.spill = spill;
        state.placed[spill.index] = spill.code;
        invalidatePlacedCounts();
        state.heat[spill.index] = 0;
        state.needleLoaded = Math.max(0, state.needleLoaded - 1);
        state.trayProgress = clamp(state.trayProgress - 0.3, 0, 100);
        showToast("豆子倒下来卡住了，先继续也行，熨烫前记得处理。");
        markDirty();
        return;
      }
      return;
    }
    const cells = [[x, y]];
    if (state.needleTier === 3 && state.needleLoaded > 1) {
      cells.push([x + state.lastMoveDir.x, y + state.lastMoveDir.y]);
    }
    if (state.needleTier === 3 && state.needleLoaded > 2) {
      cells.push([x + state.lastMoveDir.x * 2, y + state.lastMoveDir.y * 2]);
    }
    let placedAny = false;
    let used = 0;
    cells.forEach(([cx, cy]) => {
      if (used >= state.needleLoaded) return;
      if (cx < 0 || cy < 0 || cx >= state.selectedPattern.size || cy >= state.selectedPattern.size) return;
      const index = indexFor(cx, cy);
      if (state.placed[index]) return;
      state.placed[index] = state.trayColor;
      invalidatePlacedCounts();
      placedAny = true;
      used += 1;
    });
    if (placedAny) {
      state.needleLoaded = Math.max(0, state.needleLoaded - used);
      const drain = Math.max(0.1, used * 0.12);
      state.trayProgress = clamp(state.trayProgress - drain, 0, 100);
      state.savedCurrent = false;
      if (state.needleLoaded <= 0) showToast("豆针已空，请重新取豆。");
      markDirty();
    }
  }

  function createSpillAt(x, y, code) {
    const size = state.selectedPattern.size;
    const spots = [
      [x, y],
      [x + 1, y],
      [x - 1, y],
      [x, y + 1],
      [x, y - 1],
      [x + 1, y + 1],
      [x - 1, y + 1],
      [x + 1, y - 1],
      [x - 1, y - 1],
    ];
    for (let i = 0; i < spots.length; i += 1) {
      const [sx, sy] = spots[i];
      if (sx < 0 || sy < 0 || sx >= size || sy >= size) continue;
      const index = indexFor(sx, sy);
      if (state.placed[index]) continue;
      const jitterSeed = pseudoRandom(`${state.selectedPattern.id}-${index}-${Date.now()}`);
      const orientation = Math.random() < 0.5 ? "h" : "v";
      return { index, code, jitterSeed, orientation };
    }
    return null;
  }

  function applyIronHeat(x, y, dt, distance) {
    const layout = currentLayout();
    const cell = boardCellFromPoint(x, y);
    if (!cell) return;
    const speed = distance / Math.max(dt, 1);
    const speedFactor = clamp(1.42 - speed * 1.45, 0.42, 1.55);
    const pressure = state.pressure / 58;
    const temp = state.temperature / 62;
    const base = (dt / 16) * pressure * temp * speedFactor * 0.6;
    const radius = layout.cell * 1.65;
    const size = state.selectedPattern.size;

    for (let cy = cell.y - 2; cy <= cell.y + 2; cy += 1) {
      for (let cx = cell.x - 2; cx <= cell.x + 2; cx += 1) {
        if (cx < 0 || cy < 0 || cx >= size || cy >= size) continue;
        const index = indexFor(cx, cy);
        if (!state.placed[index]) continue;
        const centerX = layout.boardX + cx * layout.cell + layout.cell / 2;
        const centerY = layout.boardY + cy * layout.cell + layout.cell / 2;
        const falloff = clamp(1 - Math.hypot(centerX - x, centerY - y) / radius, 0, 1);
        const add = base * (0.35 + falloff * 0.9);
        state.heat[index] = clamp((state.heat[index] || 0) + add, 0, 138);
        if (state.heat[index] > 108) state.warp = clamp(state.warp + add * 0.022, 0, 80);
      }
    }
  }

  function runInspection() {
    state.errors = [];
    if (state.sandboxMode) return;
    const size = state.selectedPattern.size;
    for (let y = 0; y < size; y += 1) {
      for (let x = 0; x < size; x += 1) {
        const index = indexFor(x, y);
        const target = targetAt(x, y);
        const placed = state.placed[index];
        if (target && !placed) state.errors.push({ index, type: "missing" });
        if (target && placed && target !== placed) state.errors.push({ index, type: "wrong" });
        if (!target && placed) state.errors.push({ index, type: "extra" });
      }
    }
  }

  function pressFlat() {
    const heat = heatStats();
    const heatedFactor = clamp(heat.heated / Math.max(1, heat.total), 0, 1);
    const bondedFactor = clamp(heat.bonded / Math.max(1, heat.total), 0, 1);
    const effective = clamp(heatedFactor * 0.45 + bondedFactor * 0.55, 0, 1);
    const flattenGain = lerp(5, 30, effective);
    const warpReduce = lerp(2, 12, effective);
    state.flattening = clamp(state.flattening + flattenGain, 0, 100);
    state.warp = clamp(state.warp - warpReduce, 0, 80);
    // Trigger the scraper-from-bottom animation.
    state.pressAnim = { startedAt: performance.now(), duration: 820 };
    if (effective < 0.2) {
      showToast("受热不足，压平效果很小。再熨一会儿会更好压。");
    } else {
      showToast("压板压住作品，边缘更平了。");
    }
    markDirty();
  }

  function flipAndIron() {
    state.flipCount += 1;
    state.cooling = 20;
    state.heat = state.heat.map((heat) => heat * 0.82);
    showToast("翻面完成，再轻熨一次。");
    setPhase("iron");
  }

  function completeWork() {
    if (state.sandboxMode) {
      const placed = placedCount();
      const totalSlots = state.placed.length;
      if (placed === 0) {
        enterConceptEaster("empty");
        return;
      }
      if (placed === totalSlots && totalSlots > 0) {
        enterConceptEaster("full");
        return;
      }
    }
    setPhase("finish");
    saveCurrentWork();
  }

  function enterConceptEaster(type) {
    state.conceptEaster = true;
    state.conceptEasterType = type;
    if (type === "full") {
      unlockAchievement(fullBoardAchievement, showAchievementToast);
    } else {
      unlockAchievement(conceptAchievement, showAchievementToast);
    }
    setPhase("finish");
    state.savedCurrent = false;
    markDirty();
  }

  function saveCurrentWork() {
    const entry = {
      id: `${Date.now()}-${state.selectedPattern.id}`,
      name: state.selectedPattern.name,
      craft: state.craft,
      grade: finalGrade(),
      date: new Date().toLocaleDateString("zh-CN", { month: "2-digit", day: "2-digit" }),
      size: state.selectedPattern.size,
      placed: state.placed.slice(),
    };
    if (!state.savedCurrent) {
      collection.unshift(entry);
      collection = collection.slice(0, collectionLimit);
      const stored = writeCollection(collection);
      state.savedCurrent = true;
      if (stored) showToast("作品已收入作品集。");
    } else {
      showToast("这个版本已经保存过。");
    }
    markDirty();
  }

  function exportShareImage(format) {
    const portrait = format === "portrait";
    const canvas = document.createElement("canvas");
    canvas.width = portrait ? 1080 : 1080;
    canvas.height = portrait ? 1440 : 1080;
    const ctx = canvas.getContext("2d");
    drawShareImage(ctx, canvas.width, canvas.height, portrait);

    const filename = `拼豆工坊-${state.selectedPattern.name}-${portrait ? "竖图" : "方图"}.png`;
    const link = document.createElement("a");
    link.download = filename;
    link.href = canvas.toDataURL("image/png");
    link.click();
    showToast("已导出带水印分享图。");
  }

  function copyShareText() {
    const flowText = useMobileDirectPlacement()
      ? `从豆盒选色、直接摆放，到熨烫冷却定型，真的很像坐在桌前慢慢做手工。`
      : `从豆盒选色、豆筛抖豆、镊子修正，到熨烫冷却定型，真的很像坐在桌前慢慢做手工。`;
    const text = [
      `女朋友爱玩的拼豆，我做成了浏览器小游戏。`,
      `今天做的是「${state.selectedPattern.name}」，${getTargetTotal()}颗、${getPatternColors().length}个色号，最后评级 ${finalGrade()}。`,
      flowText,
      `#拼豆 #手作 #像素画 #情侣日常 #小游戏`,
    ].join("\n");
    autoCopyText(text, "文案已复制。", "复制失败，请手动复制。");
  }



  function shouldAnimateCanvas(now) {
    if (state.pointer.down) return true;
    if (state.phase === "cool" && (state.cooling < 100 || state.flattening > 0)) return true;
    if (now < state.lampSwitchFlashUntil) return true;
    if (state.floorDrops.length > 0) return true;
    if (state.pressAnim && now - state.pressAnim.startedAt < state.pressAnim.duration) return true;
    const nav = state.kbdNav;
    if (nav.up || nav.down || nav.left || nav.right || nav.zoomIn || nav.zoomOut) return true;
    const bv = state.boardView;
    if (Math.abs(bv.velX) > 0.5 || Math.abs(bv.velY) > 0.5 || Math.abs(bv.velScale) > 0.001) return true;
    return false;
  }

  function tickKbdNav(dtSec) {
    const nav = state.kbdNav;
    const bv = state.boardView;
    const boardPhase = state.phase === "place" || state.phase === "inspect";
    if (!boardPhase) return;

    const PAN_ACCEL = 2200;  // px/s²  — acceleration while key held
    const PAN_DECEL = 5000;  // px/s²  — deceleration after release (snappy stop)
    const PAN_MAX   = 560;   // px/s   — top pan speed
    const ZOOM_ACCEL = 4.5;  // scale/s²
    const ZOOM_DECEL = 10;
    const ZOOM_MAX   = maxBoardScale(currentLayout()) - 1;

    // Horizontal: A/← moves viewport left → board pans right → panX increases
    const wantLeft  = nav.left  && !nav.right;
    const wantRight = nav.right && !nav.left;
    if (wantLeft)         bv.velX = Math.min( PAN_MAX,  bv.velX + PAN_ACCEL * dtSec);
    else if (wantRight)   bv.velX = Math.max(-PAN_MAX,  bv.velX - PAN_ACCEL * dtSec);
    else if (bv.velX > 0) bv.velX = Math.max(0, bv.velX - PAN_DECEL * dtSec);
    else if (bv.velX < 0) bv.velX = Math.min(0, bv.velX + PAN_DECEL * dtSec);

    // Vertical: W/↑ moves viewport up → board pans down → panY increases
    const wantUp   = nav.up   && !nav.down;
    const wantDown = nav.down && !nav.up;
    if (wantUp)           bv.velY = Math.min( PAN_MAX,  bv.velY + PAN_ACCEL * dtSec);
    else if (wantDown)    bv.velY = Math.max(-PAN_MAX,  bv.velY - PAN_ACCEL * dtSec);
    else if (bv.velY > 0) bv.velY = Math.max(0, bv.velY - PAN_DECEL * dtSec);
    else if (bv.velY < 0) bv.velY = Math.min(0, bv.velY + PAN_DECEL * dtSec);

    // Zoom
    const wantIn  = nav.zoomIn  && !nav.zoomOut;
    const wantOut = nav.zoomOut && !nav.zoomIn;
    if (wantIn)            bv.velScale = Math.min( ZOOM_MAX, bv.velScale + ZOOM_ACCEL * dtSec);
    else if (wantOut)      bv.velScale = Math.max(-ZOOM_MAX, bv.velScale - ZOOM_ACCEL * dtSec);
    else if (bv.velScale > 0) bv.velScale = Math.max(0, bv.velScale - ZOOM_DECEL * dtSec);
    else if (bv.velScale < 0) bv.velScale = Math.min(0, bv.velScale + ZOOM_DECEL * dtSec);

    // Apply
    const movingPan  = Math.abs(bv.velX) > 0.5 || Math.abs(bv.velY) > 0.5;
    const movingZoom = Math.abs(bv.velScale) > 0.001;
    if (movingPan || movingZoom) {
      const prevX = bv.panX;
      const prevY = bv.panY;
      setBoardZoom(
        bv.scale + bv.velScale * dtSec,
        bv.panX  + bv.velX    * dtSec,
        bv.panY  + bv.velY    * dtSec
      );
      // If clamped at boundary, kill velocity in that axis to prevent "sticky wall"
      if (bv.panX === prevX) bv.velX = 0;
      if (bv.panY === prevY) bv.velY = 0;
    }
  }

  function tick(now) {
    const dt = Math.min(48, now - lastFrame);
    lastFrame = now;
    tickKbdNav(dt / 1000);
    tickDrawKbdNav(dt / 1000);
    if (state.phase === "cool") {
      const heat = heatStats();
      const overPenalty = heat.overPercent > 18 ? 0.04 : 0;
      const prevCooling = state.cooling;
      const prevFlatten = state.flattening;
      state.cooling = clamp(state.cooling + dt * (0.012 - overPenalty / 100), 0, 100);
      if (state.flattening > 0) state.flattening = clamp(state.flattening - dt * 0.008, 0, 100);
      if (Math.abs(state.cooling - prevCooling) > 0.0001 || Math.abs(state.flattening - prevFlatten) > 0.0001) {
        state.renderDirty = true;
      }
    }
    if (state.uiDirty) {
      uiRenderUI();
      state.uiDirty = false;
    }
    if (state.renderDirty || state.previewDirty || shouldAnimateCanvas(now)) {
      render();
    }
    requestAnimationFrame(tick);
  }

  function onResize() {
    invalidateLayoutCache();
    if (state.trayColor) syncTrayMatrixShape();
    markDirty();
    if (document.body.dataset.appMode === "draw") drawCanvasPaint();
  }

  sceneCanvas.addEventListener("pointerdown", onPointerDown);
  sceneCanvas.addEventListener("pointermove", onPointerMove);
  sceneCanvas.addEventListener("pointerup", onPointerUp);
  sceneCanvas.addEventListener("pointercancel", onPointerUp);
  sceneCanvas.addEventListener("touchstart", onTouchStart, { passive: false });
  sceneCanvas.addEventListener("touchmove", onTouchMove, { passive: false });
  sceneCanvas.addEventListener("touchend", onTouchEnd, { passive: false });
  sceneCanvas.addEventListener("touchcancel", onTouchEnd, { passive: false });
  sceneCanvas.addEventListener("contextmenu", (event) => event.preventDefault());
  sceneCanvas.addEventListener("wheel", (event) => {
    if (state.phase !== "place" && state.phase !== "inspect") return;
    event.preventDefault();
    const rect = sceneCanvas.getBoundingClientRect();
    const mx = event.clientX - rect.left;
    const my = event.clientY - rect.top;
    const layout = currentLayout();
    const view = boardViewTransform(layout);
    const factor = event.deltaY < 0 ? 1.15 : 1 / 1.15;
    const nextScale = clamp(view.scale * factor, 1, maxBoardScale(layout));
    const ratio = nextScale / view.scale;
    const nextPanX = mx - view.cx - (mx - view.cx - view.panX) * ratio;
    const nextPanY = my - view.cy - (my - view.cy - view.panY) * ratio;
    setBoardZoom(nextScale, nextPanX, nextPanY);
  }, { passive: false });

  els.resetButton.addEventListener("click", () => {
    const hasProgress = state.phase !== "choose" || placedCount() > 0;
    if (hasProgress && !window.confirm("重置会清空当前所有进度，确定吗？")) return;
    loadPattern(state.selectedPattern);
    showToast("已重置当前作品。");
  });
  els.startBeadButton?.addEventListener("click", () => {
    setAppMode("bead");
  });
  els.startDrawButton?.addEventListener("click", () => {
    setAppMode("draw");
  });
  els.startGalleryButton?.addEventListener("click", () => {
    setAppMode("gallery");
  });
  els.galleryBackButton?.addEventListener("click", () => {
    setAppMode("home");
  });
  els.gallerySettingsButton?.addEventListener("click", () => openSettingsModal());
  els.galleryRefreshButton?.addEventListener("click", () => {
    void loadGallery();
  });
  els.gallerySubmitButton?.addEventListener("click", () => {
    openGallerySubmitModal();
  });
  els.drawingBackButton?.addEventListener("click", () => {
    setAppMode("home");
  });
  els.drawSettingsButton?.addEventListener("click", () => openSettingsModal());
  els.drawResetButton?.addEventListener("click", () => {
    ensureDrawGrid();
    const hasContent = drawState.grid.some((cell) => cell && cell !== ".");
    if (hasContent && !window.confirm("清空会丢失当前绘图，确定吗？")) return;
    drawState.grid = createDrawGrid(drawWidth(), drawHeight());
    drawState.lastCellKey = "";
    drawCanvasPaint();
    showToast("绘图已清空。");
  });
  els.beadBackButton?.addEventListener("click", () => {
    const hasProgress = state.phase !== "choose" || placedCount() > 0;
    if (hasProgress && !window.confirm("返回首页将退出当前进度，确定吗？")) return;
    setAppMode("home");
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
    drawCanvasPaint();
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
      const share = await requestCloudShareForPattern(pattern, { signal: controller.signal });
      window.clearTimeout(timeout);
      if (share?.shortId) {
        showDrawCodeOutput(share.shortId);
        await autoCopyText(
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
      openGallerySubmitModal({
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
      const ok = await importPatternCode(raw);
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
    await autoCopyText(els.drawCodeInput?.value || "", "已复制。", "复制失败，请手动复制。");
  });
  [els.drawCodeCancelBtn, els.drawCodeCloseBtn].forEach((btn) => {
    btn?.addEventListener("click", closeDrawCodeModal);
  });
  [els.gallerySubmitCancelBtn, els.gallerySubmitCloseBtn].forEach((btn) => {
    btn?.addEventListener("click", closeGallerySubmitModal);
  });
  els.gallerySubmitConfirmBtn?.addEventListener("click", () => {
    void submitGalleryPattern();
  });
  els.gallerySubmitModal?.addEventListener("click", (event) => {
    if (event.target === els.gallerySubmitModal) closeGallerySubmitModal();
  });
  const handleDrawPointer = (event) => {
    const cell = drawCellFromPointer(event);
    if (!cell) return;
    const changed = applyDrawToolAt(cell.x, cell.y);
    if (changed || drawState.tool === "fill") drawCanvasPaint();
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
          drawCanvasPaint();
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
          drawCanvasPaint();
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
      drawCanvasPaint();
    });
  }
  els.sandboxButton?.addEventListener("click", () => toggleSandboxMode());
  els.chooseStartButton?.addEventListener("click", () => {
    if (state.phase === "choose") setPhase("place");
  });
  previewCanvas.addEventListener("click", handlePreviewPickRemap);
  els.bgThemeSelect?.addEventListener("change", () => {
    applyBackgroundTheme(els.bgThemeSelect.value);
    showToast(`背景已切换为 ${currentBackgroundTheme().name}。`);
  });
  els.topToolStyleSelect?.addEventListener("change", (event) => {
    const next = event.target.value;
    if (!toolStyles[next] || state.toolStyle === next) return;
    state.toolStyle = next;
    showToast(`工具换成${currentToolStyle().name}款。`);
    markDirty();
  });
  let sizeSliderTimer = null;
  els.patternSizeSlider?.addEventListener("input", () => {
    const size = normalizePatternSize(els.patternSizeSlider.value);
    setSizeControls(size);
    if (sizeSliderTimer) window.clearTimeout(sizeSliderTimer);
    sizeSliderTimer = window.setTimeout(() => applyPatternSize(size), 110);
  });
  els.patternSizeSlider?.addEventListener("change", () => {
    const size = normalizePatternSize(els.patternSizeSlider.value);
    setSizeControls(size);
    applyPatternSize(size);
  });

  let customDenoiseTimer = null;
  els.customDenoiseSlider?.addEventListener("input", () => {
    const level = setCustomDenoiseControls(els.customDenoiseSlider.value);
    const current = state.selectedPattern;
    if (!isCustomFromImagePattern(current)) return;
    if (customDenoiseTimer) window.clearTimeout(customDenoiseTimer);
    customDenoiseTimer = window.setTimeout(() => {
      const base = findBasePattern(current);
      base.sourceDenoiseLevel = level;
      reconvertCustomPatternAtSize(base, current.size, state.phase !== "choose");
    }, 140);
  });
  els.customDenoiseSlider?.addEventListener("change", () => {
    const level = setCustomDenoiseControls(els.customDenoiseSlider.value);
    const current = state.selectedPattern;
    if (!isCustomFromImagePattern(current)) return;
    if (customDenoiseTimer) {
      window.clearTimeout(customDenoiseTimer);
      customDenoiseTimer = null;
    }
    const base = findBasePattern(current);
    base.sourceDenoiseLevel = level;
    reconvertCustomPatternAtSize(base, current.size, state.phase !== "choose");
  });
  els.customImageInput.addEventListener("change", handleCustomImage);
  els.remapModalClose?.addEventListener("click", () => closeRemapModal());
  els.remapDoneButton?.addEventListener("click", () => closeRemapModal());
  els.remapResetButton?.addEventListener("click", () => resetPatternColorMapping());
  els.remapModal?.addEventListener("click", (event) => {
    if (event.target === els.remapModal) closeRemapModal();
  });
  els.settingsButton?.addEventListener("click", () => openSettingsModal());
  els.settingsModalClose?.addEventListener("click", () => closeSettingsModal());
  els.settingsModal?.addEventListener("click", (event) => {
    if (event.target === els.settingsModal) closeSettingsModal();
  });
  els.collectionButton?.addEventListener("click", () => {
    openCollectionPage();
  });
  els.collectionBackButton?.addEventListener("click", () => closeCollectionPage());
  els.collectionSettingsButton?.addEventListener("click", () => openSettingsModal());
  els.collectionRefreshButton?.addEventListener("click", () => {
    uiRenderCollection();
  });
  els.shareModalClose?.addEventListener("click", () => closeShareModal());
  els.shareModal?.addEventListener("click", (event) => {
    if (event.target === els.shareModal) closeShareModal();
  });
  // Block browser pinch-zoom (mobile) and Ctrl/Cmd +/- wheel zoom (desktop).
  window.addEventListener("wheel", (e) => {
    if (e.ctrlKey || e.metaKey) e.preventDefault();
  }, { passive: false });

  window.addEventListener("keydown", (event) => {
    // Block Ctrl/Cmd + or - browser zoom on desktop.
    if ((event.ctrlKey || event.metaKey) && (event.key === "+" || event.key === "-" || event.key === "=" || event.key === "_")) {
      event.preventDefault();
      return;
    }

    // WASD / Arrow keys: pan board.  Z / X: zoom in / out.
    // Desktop only (non-touch), place/inspect phase, no modal open, no input focused.
    if (!isTouchDevice()) {
      const tag = document.activeElement?.tagName;
      const inputFocused = tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT";
      if (!inputFocused && !getOpenModalEl()) {
        const k = event.key;
        const boardPhase = state.phase === "place" || state.phase === "inspect";
        if (boardPhase) {
          const nav = state.kbdNav;
          if (k === "w" || k === "W" || k === "ArrowUp")    { event.preventDefault(); nav.up     = true; return; }
          if (k === "s" || k === "S" || k === "ArrowDown")  { event.preventDefault(); nav.down   = true; return; }
          if (k === "a" || k === "A" || k === "ArrowLeft")  { event.preventDefault(); nav.left   = true; return; }
          if (k === "d" || k === "D" || k === "ArrowRight") { event.preventDefault(); nav.right  = true; return; }
          if (k === "z" || k === "Z") { event.preventDefault(); nav.zoomIn  = true; return; }
          if (k === "x" || k === "X") { event.preventDefault(); nav.zoomOut = true; return; }
        }
        if (state.appMode === "draw") {
          const k = event.key;
          const nav = drawKbdNav;
          if (k === "w" || k === "W" || k === "ArrowUp")    { event.preventDefault(); nav.up     = true; return; }
          if (k === "s" || k === "S" || k === "ArrowDown")  { event.preventDefault(); nav.down   = true; return; }
          if (k === "a" || k === "A" || k === "ArrowLeft")  { event.preventDefault(); nav.left   = true; return; }
          if (k === "d" || k === "D" || k === "ArrowRight") { event.preventDefault(); nav.right  = true; return; }
          if (k === "z" || k === "Z") { event.preventDefault(); nav.zoomIn  = true; return; }
          if (k === "x" || k === "X") { event.preventDefault(); nav.zoomOut = true; return; }
        }
      }
    }

    // Trap Tab focus within the open modal (a11y).
    if (event.key === "Tab") {
      const modal = getOpenModalEl();
      if (!modal) return;
      const focusables = focusablesIn(modal);
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (!modal.contains(document.activeElement)) {
        event.preventDefault();
        first.focus();
      } else if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
      return;
    }
    if (event.key !== "Escape") return;
    // If the enlarge viewer is open within the collection modal, close it first.
    const enlarged = els.collectionScreen?.querySelector(".collection-enlarged.show");
    if (enlarged) { enlarged.classList.remove("show"); return; }
    if (state.gallerySubmitModalOpen) { closeGallerySubmitModal(); return; }
    if (els.drawCodeModal?.classList.contains("show")) { closeDrawCodeModal(); return; }
    if (els.drawResizeModal?.classList.contains("show")) { closeDrawResizeModal(true); return; }
    if (state.remapModalOpen) closeRemapModal();
    if (state.collectionPageOpen || state.appMode === "collection") { closeCollectionPage(); return; }
    if (state.settingsModalOpen) closeSettingsModal();
    if (state.shareModalOpen) closeShareModal();
  });

  window.addEventListener("keyup", (event) => {
    const k = event.key;
    const nav = state.kbdNav;
    if (k === "w" || k === "W" || k === "ArrowUp")    { nav.up     = false; drawKbdNav.up     = false; }
    if (k === "s" || k === "S" || k === "ArrowDown")  { nav.down   = false; drawKbdNav.down   = false; }
    if (k === "a" || k === "A" || k === "ArrowLeft")  { nav.left   = false; drawKbdNav.left   = false; }
    if (k === "d" || k === "D" || k === "ArrowRight") { nav.right  = false; drawKbdNav.right  = false; }
    if (k === "z" || k === "Z") { nav.zoomIn  = false; drawKbdNav.zoomIn  = false; }
    if (k === "x" || k === "X") { nav.zoomOut = false; drawKbdNav.zoomOut = false; }
  });

  window.addEventListener("resize", onResize);

  setAutoSaveHook(scheduleAutoSave);
  setGalleryActions({ loadPattern, setAppMode, onModalOpened, restoreModalFocus, uiRenderUI });
  setUIActions({
    getCollection: () => collection,
    updateCollection: (nextCollection) => {
      collection = nextCollection;
      writeCollection(collection);
    },
    loadPattern,
    setPhase,
    openRemapModal,
    setPatternColorMapping,
    resetPatternColorMapping,
    pourSelectedColor,
    clearBoard,
    startIroning,
    pressFlat,
    flipAndIron,
    completeWork,
    saveCurrentWork,
    openShareModal,
    openCollectionEntry,
    exportShareImage,
    copyShareText,
    createCloudShare,
    importPatternCode,
    openImportCodeModal: () => openDrawCodeModal("import-bead"),
    submitCurrentToGallery,
  });
  validatePatterns();
  setAppMode("home");
  loadPattern(resizePattern(patterns[0], state.patternSize));
  setCustomDenoiseControls(state.customDenoiseLevel);
  applyBackgroundTheme(state.bgTheme);
  if (!loadAutoSave()) {
    setPhase("choose");
  }
  uiRenderUI();
  requestAnimationFrame(tick);
