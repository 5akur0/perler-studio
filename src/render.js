import { state } from './state.js';
import { sceneCanvas, scene, previewCanvas, preview, sideReferenceCtx, els } from './dom.js';
import { palette, beadIds } from './palette.js';
import {
  phases, BOARD_SIZE, HEAT_LEVELS, DESK_WOOD,
} from './constants.js';
import { clamp, lerp, easeOut, mixColor, fadedPrintColor, hexToRgb } from './color-utils.js';
import { currentBackgroundTheme, currentToolStyle } from './theme.js';
import {
  targetAt, indexFor, getEffectiveTargetRows, getTargetCounts, getTargetTotal,
  beadLabel, getPatternColors, getPlacedCounts, baseIdFor, getPatternColorMap,
  boardCols, boardRows, isActiveTileCell,
} from './pattern.js';
import { beadSettleScale } from './utils.js';
import { formatBuildTime } from './build-timer.js';
import {
  drawBoardGuides, drawBoardSkin, drawPixelPatternPreview, pixelPatternPreviewLayout,
} from './board-skin.js';
import { shouldUseBoardPegCache, visibleBoardCellRange } from './board-layout.js';
// Pure ctx/text primitives live in their own leaf module. Import them back for
// this file's many internal call-sites and re-export so existing consumers
// (main.js, ui.js, …) keep importing them from './render.js'.
import {
  softShadow, fusedColor, roundedRect, roundedPath, wrapText, fitText,
} from './render-primitives.js';
export {
  softShadow, fusedColor, roundedRect, roundedPath, wrapText, fitText,
};
// Canvas-free scoring/status derivations. render-stats.js imports
// useMobileDirectPlacement back from this file (a call-time cycle, safe in the
// single esbuild IIFE). Re-exported so main.js/ui.js keep their import paths.
import {
  placedCount, inspectionSummary, placementAccuracy, heatStats, estimateWarp,
  scoreLabel, finalGrade, statusText,
} from './render-stats.js';
export {
  placedCount, inspectionSummary, placementAccuracy, heatStats, estimateWarp,
  scoreLabel, finalGrade, statusText,
};
// Share-card export pipeline. render-export.js imports drawBead + the canvas font
// constants back from this file (call-time cycle, safe in the single IIFE).
// Re-exported so main.js keeps importing sharePalette/drawShareImage from here.
export { sharePalette, drawShareImage } from './render-export.js';

// The canvas/share-image font system mirrors the DOM's two-token system
// (--font-clear / --font-cute, see DESIGN.md §3): CLEAR for data / labels / body,
// CUTE for titles / brand moments. Both prepend "Avenir Next" as the canvas's
// deliberate Latin face (numbers, color codes, year) and include the loaded
// "Noto Sans SC" webfont so CJK renders identically on every platform (the old
// third "legacy" stack omitted Noto and fell back to system CJK off-Apple — now
// removed). Single source: render-export / -tray / -inspect / -finish reuse these.
export const CANVAS_CLEAR_FONT = "Avenir Next, Noto Sans SC, PingFang SC, Hiragino Sans GB, Microsoft YaHei, sans-serif";
export const CANVAS_CUTE_FONT = "LXGW Marker Gothic, Avenir Next, Noto Sans SC, PingFang SC, Hiragino Sans GB, Microsoft YaHei, sans-serif";

// Inspect-assist mini-canvases (zoom loupe + fuse preview). render-inspect.js
// imports board/layout helpers + CANVAS_CLEAR_FONT back from this file (call-time
// cycle, safe in the single IIFE). updateInspectAssistCanvases is also called
// internally (inspect phase), so it is imported here too.
import { updateInspectAssistCanvases } from './render-inspect.js';
export {
  updateInspectAssistCanvases, inspectFocusCell,
  drawInspectZoomCanvas, drawInspectFusePreviewCanvas,
} from './render-inspect.js';

// Detached fused-piece model + drawing. render-fusion.js imports bead/bridge/
// material helpers back from this file (call-time cycle). The in-core finish
// scenes call several of these, so they are imported here too; all public ones
// are re-exported for main.js.
import {
  getFusedPieces, pieceSortByArea, getShowcaseBounds,
  drawDetachedFusedPieces, drawFusedPieceTransformed,
} from './render-fusion.js';
export {
  buildFusedPiecesFromPlaced, getFusedPieces, pieceSortByArea, getShowcaseBounds,
  drawDetachedFusedPieces, drawDetachedFusionBridgeByCenters,
  drawFusedPieceTransformed, pieceFusionShapeProfile,
} from './render-fusion.js';

// Finish + concept scenes. render-finish.js imports drawBead/pseudoRandom/
// getFinishCardRect back from this file (call-time cycle). render()'s scene loop
// calls drawFinishShowcase/drawConceptEasterScene, so they are imported here too;
// all scene entry points are re-exported for main.js.
import { drawFinishShowcase, drawConceptEasterScene } from './render-finish.js';
export {
  drawFinishShowcase, drawConceptEasterScene, conceptWrappedLines,
  buildConceptLabelMetrics, drawConceptMuseumLabel, drawFinishKeychain,
  drawFinishOriginal, drawFinishCoaster, drawFinishFigurine,
} from './render-finish.js';

// Bead-tray model + geometry + drawing. render-tray.js imports layout/hit-test/
// util helpers back from this file (call-time cycle). Core calls a few internally;
// all are re-exported for main.js/ui.js.
import {
  shouldShowTray, syncTrayMatrixShape, needleCapacity, drawTray,
} from './render-tray.js';
export {
  useMobileTrayGrid, shouldShowTray, trayDimensions, traySlotCapacity,
  makeTrayMatrix, makeTraySeeds, syncTrayMatrixShape, countTrayBeans, syncTrayBeans,
  trayGeometry, trayCellCenter, trayCellFromPoint, trayRowFromPoint, needleCapacity,
  calcTrayFillAmount, drawTray, drawTrayBeadRandomized, visibleTraySeedCount,
} from './render-tray.js';


// FLOW predicate (not layout): lightweight direct-placement flow — pick a color
// from the bead box and tap to place, with no 豆筛 / 豆针 / 镊子. True when the
// device is touch-primary (phones AND landscape tablets) OR the viewport is the
// narrow single-column shell (≤860, e.g. a resized desktop window). Only a wide
// mouse/trackpad desktop keeps the full handcraft flow. The OR is what keeps flow
// and layout from disagreeing: the narrow stacked layout ALWAYS pairs with the
// lightweight flow (so tools never land in the hidden left rail), while a wide
// touch tablet runs the lightweight flow inside the desktop multi-column layout.
export function useMobileDirectPlacement() {
  return isTouchDevice() || useStackedMobileLayout();
}

// LAYOUT predicate (not flow): true only on the narrow single-column phone shell,
// where #stageControls mounts into the in-board mobile action slot. Tablets/desktop
// (≥861) keep the multi-column distribution with controls in the left rail.
export function useStackedMobileLayout() {
  return window.matchMedia("(max-width: 860px)").matches;
}

// True on any touch-primary device (phone + tablet); false on mouse/trackpad desktop.
export function isTouchDevice() {
  return window.matchMedia("(hover: none) and (pointer: coarse)").matches;
}

export function maxBoardScale(layout = null) {
  const cell = Number(layout?.cell || 0);
  if (!Number.isFinite(cell) || cell <= 0) {
    return isTouchDevice() ? 6 : 2.8;
  }
  const targetCellPx = isTouchDevice() ? 56 : 48;
  return clamp(targetCellPx / cell, 1, isTouchDevice() ? 10 : 8);
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
// markDirty / markCanvasDirty are pure dirty-flag setters — render.js owns no
// persistence. Session archiving is an exit-boundary concern handled in main.js
// (no per-edit writes), so an edit no longer triggers a save.
export function markCanvasDirty() {
  state.renderDirty = true;
}
export function markDirty() {
  state.renderDirty = true;
  state.uiDirty = true;
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
  const key = `${rect.width}x${rect.height}:${boardCols()}x${boardRows()}`;
  if (_layoutCache && _layoutCacheKey === key) return _layoutCache;
  _layoutCache = computeLayout(rect);
  _layoutCacheKey = key;
  return _layoutCache;
}

export function boardViewTransform(layout = currentLayout()) {
  const scale = clamp(state.boardView.scale || 1, 1, maxBoardScale(layout));
  const extra = (layout.boardSize * scale - layout.boardSize) * 0.5;
  const basePan = isTouchDevice() ? layout.boardSize * 0.36 : 28;
  const maxPan = extra + basePan;
  const panX = clamp(state.boardView.panX || 0, -maxPan, maxPan);
  const panY = clamp(state.boardView.panY || 0, -maxPan, maxPan);
  state.boardView.scale = scale;
  state.boardView.panX = panX;
  state.boardView.panY = panY;
  const cx = layout.boardX + (layout.boardW || layout.boardSize) * 0.5;
  const cy = layout.boardY + (layout.boardH || layout.boardSize) * 0.5;
  return { scale, panX, panY, cx, cy };
}

export function withBoardViewTransform(layout = currentLayout(), draw) {
  const view = boardViewTransform(layout);
  scene.save();
  scene.translate(view.cx + view.panX, view.cy + view.panY);
  scene.scale(view.scale, view.scale);
  scene.translate(-view.cx, -view.cy);
  try {
    return draw?.(view);
  } finally {
    scene.restore();
  }
}
export function boardLocalPointFromCanvasPoint(layout = currentLayout(), point = null) {
  if (!point) return null;
  const view = boardViewTransform(layout);
  return {
    x: (point.x - (view.cx + view.panX)) / view.scale + view.cx,
    y: (point.y - (view.cy + view.panY)) / view.scale + view.cy,
  };
}

export function averageHeatUnderIron(layout = currentLayout(), ironPoint = null) {
  if (!ironPoint) return 0;
  const radius = layout.cell * 1.65;
  const cols = boardCols();
  const rows = boardRows();
  let total = 0;
  let weight = 0;
  for (let y = 0; y < rows; y += 1) {
    for (let x = 0; x < cols; x += 1) {
      const index = indexFor(x, y);
      if (!state.placed[index]) continue;
      const cx = layout.boardX + x * layout.cell + layout.cell / 2;
      const cy = layout.boardY + y * layout.cell + layout.cell / 2;
      const falloff = clamp(1 - Math.hypot(cx - ironPoint.x, cy - ironPoint.y) / radius, 0, 1);
      if (falloff <= 0) continue;
      const cellWeight = 0.35 + falloff * 0.9;
      total += (state.heat[index] || 0) * cellWeight;
      weight += cellWeight;
    }
  }
  return weight ? total / weight : 0;
}

export function ironColorForHeat(heat = 0) {
  if (heat >= HEAT_LEVELS.scorched) return "#e7645f";
  if (heat > HEAT_LEVELS.idealMax) return "#d99b3d";
  if (heat >= HEAT_LEVELS.bonded) return "#57b8a7";
  return "#4d77b8";
}


export function setBoardZoom(nextScale, nextPanX = state.boardView.panX, nextPanY = state.boardView.panY) {
  const layout = currentLayout();
  state.boardView.scale = clamp(nextScale, 1, maxBoardScale(layout));
  state.boardView.panX = nextPanX;
  state.boardView.panY = nextPanY;
  boardViewTransform(layout);
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
  const layout = currentLayout();
  const nextScale = clamp(
    state.gesture.startScale * (distance / Math.max(16, state.gesture.startDistance)),
    1,
    maxBoardScale(layout)
  );
  // Anchor the zoom on the fingers: keep the board point that was under the
  // initial two-finger midpoint locked under the current midpoint. This makes
  // pinch feel natural (zoom toward the pinch center) and folds pure two-finger
  // panning into the same formula (when distance is unchanged).
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

// Smallest viewport computeLayout will reason about. A hidden / unmounted
// canvas measures 0×0, but callers (zoom limits, tray geometry) may still ask
// for a layout while off-screen. Flooring here keeps computeLayout a *total*
// function — a degenerate viewport yields a minimal but valid layout instead of
// negative boardSize/cell (which previously produced negative arc radii and
// crashed the frame). Real frames are gated upstream in render().
const MIN_LAYOUT_VIEWPORT = 320;

export function computeLayout(rect) {
  const w = Math.max(rect.width, MIN_LAYOUT_VIEWPORT);
  const h = Math.max(rect.height, MIN_LAYOUT_VIEWPORT);
  if (useMobileDirectPlacement()) {
    const cols = boardCols();
    const rows = boardRows();
    if (useStackedMobileLayout()) {
      // PHONE (stacked): a desk + floor scene (like desktop, minus tray /
      // reference / lamp). The canvas fills the flexed module; the desk is the top
      // 4/5 and the floor the bottom 1/5, with the board resting (centred) on the
      // desk so it reads as sitting ON the table.
      const marginX = 16;
      const restGap = 14;
      const floorTop = Math.round(h * 0.8);   // desk : floor = 4 : 1
      const availW = Math.max(1, w - marginX * 2);
      const availH = Math.max(1, floorTop - restGap * 2);
      const cellM = clamp(Math.min(availW / cols, availH / rows), 4, 64);
      const boardWM = cellM * cols;
      const boardHM = cellM * rows;
      const boardX = Math.floor((w - boardWM) / 2);
      const boardY = Math.floor((floorTop - boardHM) / 2); // centred on the desk, above the floor
      return {
        w, h, boardX, boardY,
        boardSize: Math.max(boardWM, boardHM),
        boardW: boardWM, boardH: boardHM, cell: cellM,
        refX: 0, refY: 0, refW: 0, refH: 0,
        trayX: 0, trayY: 0, trayW: 0, trayH: 0,
        floorTop,
      };
    }
    // TABLET (touch, ≥861): the board hugs its square canvas (sized in CSS), so
    // no desk/floor scene — fill the box edge-to-edge (floorTop = h ⇒ flat wood).
    const margin = 12;
    const availW = Math.max(1, w - margin * 2);
    const availH = Math.max(1, h - margin * 2);
    const cellM = clamp(Math.min(availW / cols, availH / rows), 4, 64);
    const boardWM = cellM * cols;
    const boardHM = cellM * rows;
    return {
      w, h,
      boardX: Math.floor((w - boardWM) / 2),
      boardY: Math.floor((h - boardHM) / 2),
      boardSize: Math.max(boardWM, boardHM),
      boardW: boardWM, boardH: boardHM, cell: cellM,
      refX: 0, refY: 0, refW: 0, refH: 0,
      trayX: 0, trayY: 0, trayW: 0, trayH: 0,
      floorTop: h,
    };
  }
  const boardX = 34;
  const boardY = 42;
  const trayGap = 34;       // gap between right edge of board and left edge of tray
  const trayRightMargin = 12;
  const minTrayW = 180;     // minimum tray width; board shrinks to guarantee this fits
  const maxBoardForTray = w - boardX - trayGap - minTrayW - trayRightMargin;
  const rawBoard = Math.min(h - 78, w * 0.64, 590, maxBoardForTray);
  const boardSize = Math.floor(rawBoard / 8) * 8;
  const cell = boardSize / Math.max(boardCols(), boardRows());
  const boardW = cell * boardCols();
  const boardH = cell * boardRows();
  const trayX = boardX + boardSize + trayGap;
  const naturalTrayW = w - trayX - trayRightMargin;
  const trayW = Math.max(minTrayW, naturalTrayW);
  // The board skin draws an outer frame `frameInset` beyond boardX/boardY (see
  // drawBoardSkin), so the board's *visual* edges are boardY ∓ frameInset. Align
  // the reference note's top to the board's frame top and the tray's bottom to
  // the board's frame bottom, so all three line up edge-to-edge.
  const frameInset = 14;
  const boardTopOuter = boardY - frameInset;
  const boardBottomOuter = boardY + boardH + frameInset;
  const refH = clamp(boardSize * 0.26, 130, 158);
  const refY = boardTopOuter;
  const trayY = refY + refH + 16;
  const trayH = Math.max(120, boardBottomOuter - trayY);
  // Desk/floor split: the table stops at floorTop, the darker floor runs below it.
  // Kept here (not in drawWorkbench) so the lamp switch can be placed against the
  // same boundary. Guarantee a tall-enough dark floor band so the lamp fits at a
  // natural size, but never let the floor rise above the board/tray content.
  const contentBottom = boardBottomOuter;
  const minFloorBand = 66;
  const floorTop = clamp(h - minFloorBand, contentBottom + 16, h - 18);
  return {
    w,
    h,
    boardX,
    boardY,
    boardSize,
    boardW,
    boardH,
    cell,
    refX: trayX,
    refY,
    refW: trayW,
    refH,
    trayX,
    trayY,
    trayW,
    trayH,
    floorTop,
  };
}

// Finish owns the whole scene: with the tray gone, its display should not reuse
// the place-stage board rectangle pinned to the upper-left corner.
export function computeShowcaseLayout(rect) {
  const w = Math.max(rect.width, MIN_LAYOUT_VIEWPORT);
  const h = Math.max(rect.height, MIN_LAYOUT_VIEWPORT);
  const cols = boardCols();
  const rows = boardRows();
  const marginX = Math.max(24, w * 0.06);
  const marginTop = Math.max(28, h * 0.07);
  const marginBottom = Math.max(28, h * 0.07);
  const availW = w - marginX * 2;
  const availH = h - marginTop - marginBottom;
  const display = clamp(Math.min(availW, availH), 240, 760);
  const cell = display / Math.max(cols, rows);
  const boardW = cell * cols;
  const boardH = cell * rows;
  const boardX = Math.round((w - boardW) / 2);
  const boardY = Math.round(marginTop + (availH - boardH) / 2);
  return {
    w,
    h,
    boardX,
    boardY,
    boardSize: display,
    boardW,
    boardH,
    cell,
    refX: 0,
    refY: 0,
    refW: 0,
    refH: 0,
    trayX: 0,
    trayY: 0,
    trayW: 0,
    trayH: 0,
    floorTop: h,
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

// Whether a canvas is currently a paintable surface. It is not while it is
// `display:none` (another appMode active, or a stage that hides it), during a
// screen transition, or before first layout — all of which measure as 0×0.
function canvasRenderable(canvas) {
  const rect = canvas.getBoundingClientRect();
  return rect.width > 0 && rect.height > 0;
}

export function render() {
  // UI (DOM) rendering is driven by the tick loop in main.js before render()
  // is called — see the uiDirty handling there. render() only paints canvases.
  //
  // Each canvas paints on its OWN renderability — they are independent surfaces.
  // The preview canvas is shown on the choose stage *while #sceneCanvas is
  // display:none*, so it must not be gated behind the scene canvas below.
  if (state.previewDirty && canvasRenderable(previewCanvas)) {
    drawPreview();
    state.previewDirty = false;
  }

  // Mobile-working board hugs the pattern: the canvas box aspect follows the board
  // (cols:rows) so a non-square pattern fills the canvas instead of letterboxing
  // inside a forced square. Consumed by the ≤860 #sceneCanvas rule via
  // var(--board-aspect). Set before measuring so this frame reads the hugged box.
  const boardAspect = `${boardCols()} / ${boardRows()}`;
  if (sceneCanvas.style.getPropertyValue("--board-aspect") !== boardAspect) {
    sceneCanvas.style.setProperty("--board-aspect", boardAspect);
  }

  const sceneRect = sceneCanvas.getBoundingClientRect();
  // Contract: render paints only a live, measured scene canvas. When it is
  // unmounted or zero-sized, there is nothing meaningful to paint — skip the
  // frame, leaving the dirty flags set so the pending paint lands once the
  // canvas is mounted again. (Avoids fabricating geometry off a degenerate rect
  // and polluting the layout cache with a hidden-state entry.)
  if (sceneRect.width <= 0 || sceneRect.height <= 0) return;
  setupHiDpiCanvas(sceneCanvas, scene, sceneRect);
  const layout = currentLayout(sceneRect);
  scene.clearRect(0, 0, sceneRect.width, sceneRect.height);
  drawWorkbench(layout);
  if (state.phase !== "choose") drawFloorDrops(layout);

  if (state.phase === "choose") {
    drawChooseScene(layout);
  } else if (state.phase === "finish") {
    if (state.conceptEaster) {
      drawConceptEasterScene(layout);
    } else {
      const showcase = computeShowcaseLayout(sceneRect);
      drawFinishShowcase(showcase);
      drawFinishLayer(showcase);
    }
  } else {
    withBoardViewTransform(layout, () => {
      drawBoard(layout);
      if (state.phase === "iron") drawIronLayer(layout);
      if (state.phase === "cool") drawCoolingLayer(layout);
    });
    // Mobile keeps only the board itself — no taped reference note.
    if (!useMobileDirectPlacement()) drawReferenceSheet(layout);
    if ((state.phase === "place" || state.phase === "inspect") && shouldShowTray(layout)) {
      if (state.trayColor) syncTrayMatrixShape();
      drawTray(layout, true);
    }
    if (state.phase === "inspect") updateInspectAssistCanvases();
  }
  // Mobile removes the desk lamp entirely — board only.
  if (!useMobileDirectPlacement()) drawLampSwitch(layout);
  if (!useMobileDirectPlacement()) drawToolEntities(layout.w, layout.h);

  state.renderDirty = false;
}

// The desk + floor scene depends only on (w, h, floorTop, flat, dpr) — never on the
// animation/board state — so cache it offscreen at device resolution and blit it
// each frame instead of re-running the gradient + wood-grain loops (~900 strokes)
// on every animated frame. Rebuilt only when the layout/DPR changes.
let _workbenchCache = null;

export function drawWorkbench(layout) {
  const { w, h, floorTop } = layout;
  const OVER = 8;
  const flat = useMobileDirectPlacement() && !useStackedMobileLayout();
  const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
  const key = `${Math.round(w)}x${Math.round(h)}|${Math.round(floorTop)}|${flat ? "f" : "d"}|${dpr}`;
  if (!_workbenchCache || _workbenchCache.key !== key) {
    const c = document.createElement("canvas");
    c.width = Math.max(1, Math.round((w + OVER) * dpr));
    c.height = Math.max(1, Math.round((h + OVER) * dpr));
    const cctx = c.getContext("2d");
    if (cctx) {
      cctx.scale(dpr, dpr);
      paintWorkbench(cctx, w, h, floorTop, flat);
    }
    _workbenchCache = { key, canvas: cctx ? c : null };
  }
  if (_workbenchCache.canvas) {
    scene.drawImage(_workbenchCache.canvas, 0, 0, w + OVER, h + OVER);
  } else {
    paintWorkbench(scene, w, h, floorTop, flat); // fallback if offscreen ctx failed
  }
}

function paintWorkbench(ctx, w, h, floorTop, flat) {
  ctx.save();

  // layout w/h are quantized down to a multiple of 8 (see quantizedCanvasRect),
  // so the real canvas can be up to 7px wider/taller. Overdraw the opaque
  // background by one quantum past the right/bottom edges so the theme-tinted
  // canvas backdrop can't peek through as a seam (the overdraw is clipped away).
  const OVER = 8;
  const fw = w + OVER;

  // Tablet (touch, ≥861): the board hugs its square canvas, so the desk only shows
  // as a thin warm border — keep it a flat solid wood fill (no floor, no grain).
  // Phone (stacked) and desktop fall through to the full desk + floor scene below.
  if (flat) {
    ctx.fillStyle = DESK_WOOD.mid;
    ctx.fillRect(0, 0, fw, h + OVER);
    ctx.restore();
    return;
  }

  // Floor — an opaque, darker wood shade under the desk (opaque so it never lets
  // the theme-tinted canvas background bleed through like a color filter).
  const floorGradient = ctx.createLinearGradient(0, floorTop, 0, h);
  floorGradient.addColorStop(0, "#9c7a52");
  floorGradient.addColorStop(1, "#79593a");
  ctx.fillStyle = floorGradient;
  ctx.fillRect(0, floorTop, fw, h - floorTop + OVER);

  // Floor planks (subtle vertical seams)
  ctx.strokeStyle = "rgba(30, 20, 12, 0.18)";
  ctx.lineWidth = 1;
  for (let x = 0; x < fw; x += 78) {
    ctx.beginPath();
    ctx.moveTo(x, floorTop);
    ctx.lineTo(x, h + OVER);
    ctx.stroke();
  }

  // Desk — a warm wood surface with deterministic grain (index-seeded, so it
  // stays stable across redraws instead of shimmering frame to frame).
  drawWoodDesk(ctx, fw, floorTop);

  // Table front edge shadow
  ctx.fillStyle = "rgba(34, 22, 12, 0.22)";
  ctx.fillRect(0, floorTop - 4, fw, 4);
  ctx.fillStyle = "rgba(34, 22, 12, 0.12)";
  ctx.fillRect(0, floorTop, fw, 6);

  ctx.restore();
}

// Paint a warm wooden desktop into [0,0]..[w,top]. Grain is seeded by row index
// (a stable hash), never Math.random, so the texture doesn't flicker on redraw.
function drawWoodDesk(ctx, w, top) {
  if (top <= 0) return;
  // Base wood gradient (lighter sheen near the back, deeper toward the front edge)
  const base = ctx.createLinearGradient(0, 0, 0, top);
  base.addColorStop(0, DESK_WOOD.light);
  base.addColorStop(0.5, DESK_WOOD.mid);
  base.addColorStop(1, DESK_WOOD.deep);
  ctx.fillStyle = base;
  ctx.fillRect(0, 0, w, top);

  // Plank seams: a few long boards running the width of the desk.
  const plankH = 132;
  for (let py = plankH; py < top; py += plankH) {
    ctx.fillStyle = `rgba(${DESK_WOOD.seam}, 0.30)`;
    ctx.fillRect(0, py, w, 1.4);
    ctx.fillStyle = "rgba(255, 246, 230, 0.18)";
    ctx.fillRect(0, py + 1.4, w, 1);
  }

  // Flowing grain streaks along the boards.
  ctx.lineWidth = 1;
  let gi = 0;
  for (let y = 6; y < top; y += 11, gi += 1) {
    const hashed = Math.sin(gi * 12.9898) * 43758.5453;
    const frac = hashed - Math.floor(hashed);           // stable 0..1 per row
    const alpha = 0.025 + frac * 0.06;
    const amp = 1.1 + frac * 2.6;
    ctx.strokeStyle = `rgba(${DESK_WOOD.grain}, ${alpha.toFixed(3)})`;
    ctx.beginPath();
    for (let x = 0; x <= w; x += 18) {
      const yy = y + Math.sin(x * 0.014 + gi * 1.7) * amp + Math.sin(x * 0.06 + gi) * 0.5;
      if (x === 0) ctx.moveTo(x, yy); else ctx.lineTo(x, yy);
    }
    ctx.stroke();
  }

  // Soft top sheen so the back of the desk catches a little light.
  ctx.fillStyle = "rgba(255, 248, 234, 0.12)";
  ctx.fillRect(0, 0, w, Math.min(40, top));
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
  const margin = 12;
  const gap = 10; // clearance below the desk/floor boundary line so the lamp never touches it
  const floorTop = layout.floorTop ?? (layout.h - 60);
  // Vertical room available inside the dark floor band (between the boundary +
  // clearance and the bottom margin). The lamp is sized to fit so it stays fully
  // in the dark zone instead of straddling the line.
  const room = (layout.h - margin) - (floorTop + gap);
  const size = clamp(Math.min(layout.boardSize * 0.10, room), 34, 46);
  return {
    x: layout.w - size - margin,
    y: layout.h - size - margin, // anchored to the bottom-right corner
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
  // P2-1: draw cord with a gradient stroke that fades to invisible at the far end
  {
    const cordGrad = ctx.createLinearGradient(cordStartX, cordStartY, cordEndX, cordEndY);
    cordGrad.addColorStop(0, "rgba(36, 40, 50, 0.44)");
    cordGrad.addColorStop(0.68, "rgba(36, 40, 50, 0.28)");
    cordGrad.addColorStop(1, "rgba(36, 40, 50, 0)");
    ctx.strokeStyle = cordGrad;
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
    const cordHighlight = ctx.createLinearGradient(cordStartX, cordStartY, cordEndX, cordEndY);
    cordHighlight.addColorStop(0, "rgba(255, 255, 255, 0.22)");
    cordHighlight.addColorStop(0.7, "rgba(255, 255, 255, 0.08)");
    cordHighlight.addColorStop(1, "rgba(255, 255, 255, 0)");
    ctx.strokeStyle = cordHighlight;
    ctx.lineWidth = 0.9;
    ctx.beginPath();
    ctx.moveTo(cordStartX, cordStartY);
    ctx.bezierCurveTo(
      cordStartX + 22, cordStartY - 50,
      cordEndX - 24, cordEndY + 80,
      cordEndX, cordEndY
    );
    ctx.stroke();
  }
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

  ctx.textAlign = "left";
  ctx.restore();
}

export function drawToolEntities(w, h) {
  if (state.phase !== "place") return;
  const ctx = scene;
  const follow = state.phase === "place" && state.toolPose.visible;
  // Clamp the resting anchor so the tool entity stays fully on a narrow/short
  // canvas (on small widths/heights w-168 / h-172 could push it off-screen).
  const defaultX = clamp(w - 168, 24, Math.max(24, w - 96));
  const defaultY = clamp(h - 172, 24, Math.max(24, h - 152));
  const needleTipX = follow ? clamp(state.toolPose.x, 28, w - 28) : defaultX + 72;
  const needleTipY = follow ? clamp(state.toolPose.y, 148, h - 12) : defaultY + 146;
  const tweezerHeadX = follow ? clamp(state.toolPose.x, 20, w - 20) : defaultX + 46;
  const tweezerHeadY = follow ? clamp(state.toolPose.y, 30, h - 20) : defaultY + 90;
  if (state.tool === "needle") {
    drawNeedleEntityAtTip(needleTipX, needleTipY);
  } else {
    drawTweezersEntityAtHead(tweezerHeadX, tweezerHeadY);
  }
}

export function drawNeedleEntityAtTip(tipX, tipY) {
  drawNeedleEntity(tipX, tipY - 150);
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
  ctx.moveTo(x, y + 146);
  ctx.lineTo(x, y + 8);
  ctx.stroke();
  ctx.shadowColor = "transparent";
  ctx.strokeStyle = style.secondary;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(x - 2.2, y + 134);
  ctx.lineTo(x - 2.2, y + 20);
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
  ctx.moveTo(x, y + 150);
  ctx.lineTo(x - 3.2, y + 140);
  ctx.lineTo(x + 3.2, y + 140);
  ctx.closePath();
  ctx.fill();
  for (let i = 0; i < cap; i += 1) {
    const by = y + 10 + i * 11.5;
    const fillStart = Math.max(0, cap - state.needleLoaded);
    if (i >= fillStart) {
      ctx.save();
      ctx.globalAlpha = 0.52;
      drawFallenBead(ctx, x, by, 12, loadedCode, "v");
      ctx.restore();
    } else {
      ctx.fillStyle = "rgba(102, 116, 128, 0.18)";
      roundedPath(ctx, x - 4.5, by - 5.75, 9, 11.5, 2.6);
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
  // Enlarge the whole tweezers (body + held bead) a touch, anchored on the tip
  // (x+46, y+66) so the held position still tracks the cursor.
  const tweezerScale = 1.18;
  ctx.translate(x + 46, y + 66);
  ctx.scale(tweezerScale, tweezerScale);
  ctx.translate(-(x + 46), -(y + 66));
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
    drawBead(ctx, x + 46, y + 66, 7.2, state.tweezerBead, 0, false);
  } else {
    ctx.fillStyle = "rgba(102, 116, 128, 0.2)";
    ctx.beginPath();
    ctx.arc(x + 46, y + 66, 6.2, 0, Math.PI * 2);
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
  ctx.font = "700 28px " + CANVAS_CLEAR_FONT;
  ctx.fillText("今天的工作台已经清空", x + 28, y + 48);
  ctx.fillStyle = "#686572";
  ctx.font = "15px " + CANVAS_CLEAR_FONT;
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

// The empty peg-holes are identical every frame for a given layout/pattern, so
// rasterise them once (at device resolution) and blit. This removes up to
// cols×rows×2 arc fills (≈20k on a 100×100 board) from every animated frame.
let _boardPegCache = null;

function getBoardPegCache(layout, cols, rows, patTiles) {
  const boardW = layout.boardW || layout.boardSize;
  const boardH = layout.boardH || layout.boardSize;
  const cell = layout.cell;
  const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
  const tileSig = patTiles
    ? `${state.selectedPattern?.tileOriginX ?? 0},${state.selectedPattern?.tileOriginY ?? 0}:${[...patTiles].sort().join("|")}`
    : "";
  const key = `${cols}x${rows}|${Math.round(boardW)}x${Math.round(boardH)}|${Math.round(cell * 100)}|${dpr}|${tileSig}`;
  if (_boardPegCache && _boardPegCache.key === key) return _boardPegCache.canvas;

  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(boardW * dpr));
  canvas.height = Math.max(1, Math.round(boardH * dpr));
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    _boardPegCache = { key, canvas: null };
    return null;
  }
  ctx.scale(dpr, dpr);
  const pegR = cell * 0.138;
  for (let y = 0; y < rows; y += 1) {
    for (let x = 0; x < cols; x += 1) {
      if (patTiles && !isActiveTileCell(x, y)) continue;
      const cx = x * cell + cell / 2;
      const cy = y * cell + cell / 2;
      ctx.fillStyle = "rgba(91, 104, 118, 0.32)";
      ctx.beginPath();
      ctx.arc(cx, cy, pegR, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "rgba(255,255,255,0.58)";
      ctx.beginPath();
      ctx.arc(cx - pegR * 0.22, cy - pegR * 0.22, pegR * 0.36, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  _boardPegCache = { key, canvas };
  return canvas;
}

function drawVisibleBoardPegs(ctx, layout, view, cols, rows, patTiles) {
  const { startCol, endCol, startRow, endRow } = visibleBoardCellRange(layout, view, cols, rows);
  const { boardX, boardY, cell } = layout;
  const pegR = cell * 0.138;
  for (let y = startRow; y < endRow; y += 1) {
    for (let x = startCol; x < endCol; x += 1) {
      if (patTiles && !isActiveTileCell(x, y)) continue;
      const cx = boardX + x * cell + cell / 2;
      const cy = boardY + y * cell + cell / 2;
      ctx.fillStyle = 'rgba(91, 104, 118, 0.32)';
      ctx.beginPath();
      ctx.arc(cx, cy, pegR, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = 'rgba(255,255,255,0.58)';
      ctx.beginPath();
      ctx.arc(cx - pegR * 0.22, cy - pegR * 0.22, pegR * 0.36, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}

export function drawBoard(layout) {
  const ctx = scene;
  const { boardX, boardY, cell } = layout;
  const boardW = layout.boardW || layout.boardSize;
  const boardH = layout.boardH || layout.boardSize;
  const cols = boardCols();
  const rows = boardRows();
  const boardView = boardViewTransform(layout);
  const theme = currentBackgroundTheme();
  const brand = theme.brand || "#57b8a7";

  const patTiles = state.selectedPattern?.tiles
    ? new Set(state.selectedPattern.tiles)
    : null;
  const patOriginX = state.selectedPattern?.tileOriginX ?? 0;
  const patOriginY = state.selectedPattern?.tileOriginY ?? 0;
  const T = BOARD_SIZE;

  if (patTiles) {
    // Non-rectangular: per-tile board skin (no frame, strict rectangles)
    const tileW = T * cell;
    const tileH = T * cell;
    const tintLight = mixColor("#ffffff", brand, 0.06);
    const tintDark = mixColor("#ffffff", brand, 0.15);
    const blocksPerTile = T / 10;
    for (const key of patTiles) {
      const [tx, ty] = key.split(",").map(Number);
      const tbx = boardX + (tx - patOriginX) * tileW;
      const tby = boardY + (ty - patOriginY) * tileH;
      ctx.fillStyle = "#fbfcfd";
      ctx.fillRect(tbx, tby, tileW, tileH);
      for (let by = 0; by < blocksPerTile; by++) {
        for (let bx = 0; bx < blocksPerTile; bx++) {
          ctx.fillStyle = (bx + by) % 2 ? tintDark : tintLight;
          ctx.fillRect(tbx + bx * 10 * cell, tby + by * 10 * cell, 10 * cell, 10 * cell);
        }
      }
    }
    ctx.strokeStyle = "rgba(70, 84, 96, 0.35)";
    ctx.lineWidth = 1.5 / boardView.scale;
    for (const key of patTiles) {
      const [tx, ty] = key.split(",").map(Number);
      const tbx = boardX + (tx - patOriginX) * tileW;
      const tby = boardY + (ty - patOriginY) * tileH;
      if (!patTiles.has(`${tx},${ty - 1}`)) { ctx.beginPath(); ctx.moveTo(tbx, tby); ctx.lineTo(tbx + tileW, tby); ctx.stroke(); }
      if (!patTiles.has(`${tx + 1},${ty}`)) { ctx.beginPath(); ctx.moveTo(tbx + tileW, tby); ctx.lineTo(tbx + tileW, tby + tileH); ctx.stroke(); }
      if (!patTiles.has(`${tx},${ty + 1}`)) { ctx.beginPath(); ctx.moveTo(tbx, tby + tileH); ctx.lineTo(tbx + tileW, tby + tileH); ctx.stroke(); }
      if (!patTiles.has(`${tx - 1},${ty}`)) { ctx.beginPath(); ctx.moveTo(tbx, tby); ctx.lineTo(tbx, tby + tileH); ctx.stroke(); }
    }
  } else {
    drawBoardSkin(ctx, layout, { cols, rows, brand, shadow: true, guides: false });
  }

  // Mobile has no lamp switch and no reference sheet, so the placement guide is
  // always on there; desktop keeps it behind the lamp toggle.
  const guideVisible = (state.lampOn || useMobileDirectPlacement()) && (state.phase === "place" || state.phase === "inspect");
  const templateOpacity = guideVisible ? (state.phase === "place" ? 0.1 : 0.08) : 0;
  if (guideVisible) {
    drawProjectedGuide(layout, templateOpacity);
  }
  // At native scale, reuse the full-board bitmap. Once zoomed, drawing only the
  // visible pegs as vectors avoids enlarging cached pixels while keeping the loop
  // bounded to the small portion of the board currently inside the viewport.
  if (shouldUseBoardPegCache(boardView.scale)) {
    const pegCanvas = getBoardPegCache(layout, cols, rows, patTiles);
    if (pegCanvas) ctx.drawImage(pegCanvas, boardX, boardY, boardW, boardH);
  } else {
    drawVisibleBoardPegs(ctx, layout, boardView, cols, rows, patTiles);
  }

  if (patTiles) {
    const tileW = T * cell;
    const tileH = T * cell;
    for (const key of patTiles) {
      const [tx, ty] = key.split(",").map(Number);
      const tbx = boardX + (tx - patOriginX) * tileW;
      const tby = boardY + (ty - patOriginY) * tileH;
      drawBoardGuides(ctx, { boardX: tbx, boardY: tby, boardW: tileW, boardH: tileH, boardSize: Math.max(tileW, tileH), cell }, T, T, boardView.scale);
    }
  } else {
    drawBoardGuides(ctx, layout, cols, rows, boardView.scale);
  }

  const boardFusedPhase = state.phase === "iron";
  const detachedPhase = state.phase === "cool" || state.phase === "finish";
  if (boardFusedPhase) drawFusionBridges(layout);
  if (detachedPhase) {
    drawDetachedFusedPieces(layout);
  } else {
    state.placed.forEach((code, index) => {
      if (!code) return;
      const x = index % cols;
      const y = Math.floor(index / cols);
      const heat = state.heat[index] || 0;
      const cx = boardX + x * cell + cell / 2;
      const cy = boardY + y * cell + cell / 2;
      if (state.spill && state.spill.index === index) {
        drawFallenBead(ctx, cx, cy, cell, code, state.spill.orientation || "h");
        return;
      }
      const shapeProfile = boardFusionShapeProfile(x, y);
      const settle = state.mobileBeadSettle?.index === index ? state.mobileBeadSettle : null;
      const settleElapsed = settle ? performance.now() - settle.startedAt : 0;
      const settleScale = settle ? beadSettleScale(settleElapsed, settle.duration, false) : 1;
      if (settle) {
        ctx.save();
        ctx.translate(cx, cy);
        ctx.scale(settleScale, settleScale);
        ctx.translate(-cx, -cy);
      }
      if (isSpillDamagedIndex(index)) {
        drawDamagedBead(ctx, cx, cy, cell * 0.43, code, heat, boardFusedPhase, shapeProfile);
      } else {
        drawBead(ctx, cx, cy, cell * 0.43, code, heat, boardFusedPhase, shapeProfile, index);
      }
      drawPegInBead(ctx, cx, cy, cell * 0.43, heat, boardFusedPhase);
      if (settle) {
        ctx.restore();
        if (settleElapsed >= settle.duration) state.mobileBeadSettle = null;
      }
    });
  }

  if (state.phase === "inspect" && state.showHints) {
    drawInspectionHints(layout);
  }

  if (state.phase === "place" && state.keyboardGrid.visible) {
    const x = clamp(state.keyboardGrid.x, 0, cols - 1);
    const y = clamp(state.keyboardGrid.y, 0, rows - 1);
    const px = boardX + x * cell;
    const py = boardY + y * cell;
    ctx.save();
    ctx.strokeStyle = "rgba(31, 97, 83, 0.96)";
    ctx.lineWidth = Math.max(2, cell * 0.09);
    ctx.strokeRect(px + 2, py + 2, Math.max(1, cell - 4), Math.max(1, cell - 4));
    ctx.strokeStyle = "rgba(255, 255, 255, 0.96)";
    ctx.lineWidth = Math.max(1, cell * 0.04);
    ctx.strokeRect(px + 5, py + 5, Math.max(1, cell - 10), Math.max(1, cell - 10));
    ctx.restore();
  }

}

export function drawProjectedGuide(layout, templateOpacity = 0) {
  const key = projectedGuideCacheKey(layout, templateOpacity);
  if (!state.projectedGuideCache || state.projectedGuideCache.key !== key) {
    state.projectedGuideCache = buildProjectedGuideCache(layout, key, templateOpacity);
  }
  if (!state.projectedGuideCache?.canvas) return;
  scene.drawImage(
    state.projectedGuideCache.canvas,
    layout.boardX,
    layout.boardY,
    layout.boardW || layout.boardSize,
    layout.boardH || layout.boardSize
  );
}

export function projectedGuideCacheKey(layout, templateOpacity = 0) {
  const map = getPatternColorMap();
  const mapSig = Object.keys(map).sort().map((code) => `${code}:${map[code]}`).join(",");
  return [
    baseIdFor(state.selectedPattern),
    `${boardCols()}x${boardRows()}`,
    Math.round(layout.boardW || layout.boardSize),
    Math.round(layout.boardH || layout.boardSize),
    // Cache is rasterised at device pixels, so it must rebuild if the DPR changes.
    Math.min(window.devicePixelRatio || 1, 1.75),
    Math.round(templateOpacity * 1000),
    mapSig,
  ].join("|");
}

function projectedGuideLightness(code) {
  const rgb = hexToRgb(palette[code] || "#bbbbbb");
  return (Math.max(rgb.r, rgb.g, rgb.b) + Math.min(rgb.r, rgb.g, rgb.b)) / 2;
}

function projectedGuideColor(code) {
  // No warm tint at all — the guide shows every bead's true color; visibility is
  // carried purely by opacity (see projectedGuideAlpha).
  return palette[code] || "#bbbbbb";
}

function projectedGuideAlpha(code, alpha) {
  // Light colors read faintly on the board, so make them more opaque (compensates
  // for no longer warming them up).
  const lightness = projectedGuideLightness(code);
  if (lightness >= 228) return Math.min(alpha * 2.2, 0.6);
  if (lightness >= 205) return Math.min(alpha * 1.7, 0.5);
  return alpha;
}

function drawProjectedTemplateLayer(ctx, cols, rows, cell, templateOpacity) {
  if (templateOpacity <= 0) return;
  const projectedBeadRadius = cell * 0.49; // slightly larger than the bead (0.43) so the guide peeks out as a ring around placed beads — a wrong bead shows a mismatched halo
  ctx.save();
  for (let y = 0; y < rows; y += 1) {
    for (let x = 0; x < cols; x += 1) {
      const code = targetAt(x, y);
      if (!code) continue;
      const cx = x * cell + cell / 2;
      const cy = y * cell + cell / 2;
      ctx.fillStyle = projectedGuideColor(code);
      ctx.globalAlpha = projectedGuideAlpha(code, templateOpacity);
      ctx.beginPath();
      ctx.arc(cx, cy, projectedBeadRadius, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  ctx.restore();
}

export function buildProjectedGuideCache(layout, key, templateOpacity = 0) {
  const cols = boardCols();
  const rows = boardRows();
  const cell = (layout.boardW || layout.boardSize) / cols;
  // CSS-pixel size of the guide (drawing coordinates) …
  const canvasW = Math.max(1, Math.round((layout.boardW || layout.boardSize)));
  const canvasH = Math.max(1, Math.round((layout.boardH || layout.boardSize)));
  // … rasterised at device pixels so it stays crisp on HiDPI screens (the scene
  // is DPR-scaled; a 1x cache would be upscaled by DPR and look blurry).
  const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(canvasW * dpr));
  canvas.height = Math.max(1, Math.round(canvasH * dpr));
  const ctx = canvas.getContext("2d");
  if (!ctx) return { key, canvas: null };
  ctx.scale(dpr, dpr); // draw in CSS coordinates; output is device-resolution

  const blur = Math.max(1.45, cell * 0.24);
  const projectedBeadRadius = cell * 0.49; // slightly larger than the bead (0.43) so the guide peeks out as a ring around placed beads — a wrong bead shows a mismatched halo
  const spotCx = canvasW / 2;
  const spotCy = canvasH / 2;
  const spotRadius = Math.min(canvasW, canvasH) * 0.425;

  // A flat neutral wash over the whole board — uniform (no spotlight/falloff) so
  // every bead's guide reads at the same strength. Neutral white, not warm.
  ctx.fillStyle = "rgba(255, 255, 255, 0.14)";
  ctx.fillRect(0, 0, canvasW, canvasH);

  ctx.save();
  ctx.filter = `blur(${blur}px)`;
  for (let y = 0; y < rows; y += 1) {
    for (let x = 0; x < cols; x += 1) {
      const code = targetAt(x, y);
      if (!code) continue;
      const cx = x * cell + cell / 2;
      const cy = y * cell + cell / 2;
      ctx.fillStyle = projectedGuideColor(code);
      ctx.globalAlpha = projectedGuideAlpha(code, 0.28);
      ctx.beginPath();
      ctx.arc(cx, cy, projectedBeadRadius, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  ctx.filter = "none";
  ctx.globalAlpha = 0.16;
  for (let y = 0; y < rows; y += 1) {
    for (let x = 0; x < cols; x += 1) {
      const code = targetAt(x, y);
      if (!code) continue;
      const cx = x * cell + cell / 2;
      const cy = y * cell + cell / 2;
      ctx.fillStyle = projectedGuideColor(code);
      ctx.globalAlpha = projectedGuideAlpha(code, 0.14);
      ctx.beginPath();
      ctx.arc(cx, cy, projectedBeadRadius, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  ctx.restore();

  drawProjectedTemplateLayer(ctx, cols, rows, cell, templateOpacity);

  ctx.save();
  ctx.globalCompositeOperation = "destination-in";
  ctx.fillStyle = "#000";
  ctx.beginPath();
  ctx.arc(spotCx, spotCy, spotRadius, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  return { key, canvas };
}

export function drawFusionBridges(layout) {
  const ctx = scene;
  const cols = boardCols();
  const rows = boardRows();
  ctx.save();
  for (let y = 0; y < rows; y += 1) {
    for (let x = 0; x < cols; x += 1) {
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
  const cols = boardCols();
  const rows = boardRows();
  const has = (cx, cy) => {
    if (cx < 0 || cy < 0 || cx >= cols || cy >= rows) return false;
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



// Exported so render-fusion.js can tint detached pieces identically; still used
// by the in-core bead drawing, so it stays defined here (single source).
export function finishMaterialColor(color, material) {
  return material === "wax" ? mixColor(color, "#8f877c", 0.11) : color;
}








// softShadow moved to ./render-primitives.js (imported back near the top).

// Exported so render-finish.js can frame the showcase identically; still used by
// the in-core drawFinishLayer, so it stays defined here (single source).
export function getFinishCardRect(layout, craft = state.craft) {
  const { boardX, boardY, boardW, boardH } = layout;
  if (craft === "钥匙扣") {
    return {
      x: boardX + boardW * 0.1,
      y: boardY - 10,
      w: boardW * 0.8,
      h: boardH + 20,
    };
  }
  if (craft === "摆件") {
    return {
      x: boardX + boardW * 0.035,
      y: boardY + boardH * 0.14,
      w: boardW * 0.93,
      h: boardH * 0.72,
    };
  }
  return {
    x: boardX - 18,
    y: boardY - 18,
    w: boardW + 36,
    h: boardH + 36,
  };
}













export function drawFusionBridgeTo(ctx, layout, x1, y1, x2, y2) {
  if (x2 < 0 || y2 < 0 || x2 >= boardCols() || y2 >= boardRows()) return;
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
    const x = error.index % boardCols();
    const y = Math.floor(error.index / boardCols());
    ctx.strokeStyle = error.type === "missing" ? "#d99b3d" : "#e7645f";
    ctx.strokeRect(boardX + x * cell + 2, boardY + y * cell + 2, cell - 4, cell - 4);
  });
  ctx.restore();
}

export function drawSpillMarker(layout) {
  if (!state.spill) return;
  const ctx = scene;
  const index = state.spill.index;
  const x = index % boardCols();
  const y = Math.floor(index / boardCols());
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
  const burnt = mixColor(base, "#b86f4f", 0.7);
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
    const x = damage.index % boardCols();
    const y = Math.floor(damage.index / boardCols());
    const cx = boardX + x * cell + cell / 2;
    const cy = boardY + y * cell + cell / 2;
    const melted = mixColor(palette[damage.code] || "#999", "#b86f4f", 0.68);
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




// Cached paper texture for the reference note. Keyed by size so it's only
// rebuilt when the note's dimensions change (not every redraw), and the grain is
// position-seeded so it never shimmers. The scene clips it to the rounded card,
// so this only needs to fill a plain rectangle.
let _paperTextureCache = null;
function getPaperTexture(w, h) {
  const key = `${Math.round(w)}x${Math.round(h)}`;
  if (_paperTextureCache && _paperTextureCache.key === key) return _paperTextureCache.canvas;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(w * dpr));
  canvas.height = Math.max(1, Math.round(h * dpr));
  const p = canvas.getContext("2d");
  p.scale(dpr, dpr);

  // Warm cream base.
  const base = p.createLinearGradient(0, 0, 0, h);
  base.addColorStop(0, "#fffefb");
  base.addColorStop(1, "#f3ecdd");
  p.fillStyle = base;
  p.fillRect(0, 0, w, h);

  // Seeded PRNG → deterministic texture (never shimmers between redraws).
  let seed = 0;
  const rnd = () => { seed += 1; const r = Math.sin(seed * 127.1 + 311.7) * 43758.5453; return r - Math.floor(r); };

  // Broad crumple shading: large soft light/dark blotches — this carries most of
  // the "handled paper" feel (low contrast, very diffuse).
  for (let i = 0; i < 9; i += 1) {
    const cx = rnd() * w;
    const cy = rnd() * h;
    const rad = 50 + rnd() * 110;
    const light = rnd() > 0.5;
    const a = 0.05 + rnd() * 0.045;
    const blob = p.createRadialGradient(cx, cy, 0, cx, cy, rad);
    blob.addColorStop(0, light ? `rgba(255,255,250,${a.toFixed(3)})` : `rgba(112,96,68,${a.toFixed(3)})`);
    blob.addColorStop(1, "rgba(255,255,255,0)");
    p.fillStyle = blob;
    p.fillRect(cx - rad, cy - rad, rad * 2, rad * 2);
  }

  // Soft folds: each crease is a gentle valley + ridge, but drawn as several
  // stacked low-alpha passes (wide→narrow) so the edge feathers out instead of
  // looking like a hard ink line.
  p.lineCap = "round";
  const softStroke = (x1, y1, cx, cy, x2, y2, rgb, peak) => {
    const passes = [[5.5, peak * 0.4], [3, peak * 0.65], [1.5, peak]];
    for (const [lw, a] of passes) {
      p.strokeStyle = `rgba(${rgb},${a.toFixed(3)})`;
      p.lineWidth = lw;
      p.beginPath();
      p.moveTo(x1, y1);
      p.quadraticCurveTo(cx, cy, x2, y2);
      p.stroke();
    }
  };
  const creases = 6;
  for (let i = 0; i < creases; i += 1) {
    const vertical = rnd() > 0.5;
    let x1; let y1; let x2; let y2; let cx; let cy;
    if (vertical) {
      x1 = w * (0.15 + rnd() * 0.7); x2 = x1 + (rnd() * 70 - 35); y1 = -8; y2 = h + 8;
      cx = (x1 + x2) / 2 + (rnd() * 44 - 22); cy = h * (0.3 + rnd() * 0.4);
    } else {
      y1 = h * (0.15 + rnd() * 0.7); y2 = y1 + (rnd() * 44 - 22); x1 = -8; x2 = w + 8;
      cx = w * (0.3 + rnd() * 0.4); cy = (y1 + y2) / 2 + (rnd() * 30 - 15);
    }
    const inten = 0.6 + rnd() * 0.5;
    softStroke(x1, y1, cx, cy, x2, y2, "108,92,64", 0.055 * inten);            // valley
    softStroke(x1 + 2.2, y1 + 0.8, cx + 2.2, cy + 0.8, x2 + 2.2, y2 + 0.8, "255,253,246", 0.07 * inten); // ridge highlight
  }
  p.lineCap = "butt";

  // Paper-fibre speckle on top of the folds.
  const specks = Math.floor((w * h) / 150);
  for (let i = 0; i < specks; i += 1) {
    const sx = rnd() * w;
    const sy = rnd() * h;
    const a = 0.015 + rnd() * 0.03;
    p.fillStyle = rnd() > 0.5 ? `rgba(138, 122, 92, ${a.toFixed(3)})` : `rgba(255, 255, 255, ${(a * 1.4).toFixed(3)})`;
    p.fillRect(sx, sy, 1, 1);
  }

  // Soft inner edge shadow for a little depth.
  p.strokeStyle = "rgba(120, 100, 70, 0.10)";
  p.lineWidth = 2;
  p.strokeRect(1, 1, w - 2, h - 2);

  // Top sheen.
  const sheen = p.createLinearGradient(0, 0, 0, Math.min(26, h));
  sheen.addColorStop(0, "rgba(255, 255, 255, 0.4)");
  sheen.addColorStop(1, "rgba(255, 255, 255, 0)");
  p.fillStyle = sheen;
  p.fillRect(0, 0, w, Math.min(26, h));

  _paperTextureCache = { key, canvas };
  return canvas;
}

// A short strip of tape over the note corner: translucent (the paper shows
// through), softly shadowed, slightly rotated, with torn ends and a gloss band —
// so it reads as a real piece of tape rather than a flat rounded rectangle.
function tapeTornPath(ctx, halfW, halfH) {
  const teeth = 6;
  ctx.beginPath();
  ctx.moveTo(-halfW - 3.4, -halfH);
  for (let i = 0; i <= teeth; i += 1) {
    const t = i / teeth;
    const y = -halfH + 2 * halfH * t;
    ctx.lineTo(-halfW + (i % 2 ? 3.6 : -3.4), y);
  }
  for (let i = 0; i <= teeth; i += 1) {
    const t = i / teeth;
    const y = halfH - 2 * halfH * t;
    ctx.lineTo(halfW + (i % 2 ? -3.6 : 3.4), y);
  }
  ctx.closePath();
}

// Build an irregular hand-torn paper outline (no rounded corners, no straight
// rectangle) into ctx, deckle-jittered along every edge. Seeded so the shape is
// stable across redraws but differs per note. Re-callable with the same seed to
// reproduce the exact path (for fill / stroke / clip).
function tornPaperPath(ctx, x, y, w, h, seedBase) {
  let s = seedBase;
  const rnd = () => { s += 1; const r = Math.sin(s * 78.233 + 12.9898) * 43758.5453; return r - Math.floor(r); };
  const pts = [];
  // Walk each edge in random-sized steps, alternating big out-teeth and small
  // in-notches — an irregular bold sawtooth (random spacing + random depth).
  const edge = (x1, y1, x2, y2, nx, ny) => {
    const len = Math.hypot(x2 - x1, y2 - y1);
    const ux = (x2 - x1) / len;
    const uy = (y2 - y1) / len;
    let d = 0;
    let toggle = 0;
    while (d < len - 0.5) {
      d = Math.min(len, d + 26 + rnd() * 24);                          // random spacing 26..50 (fewer, larger teeth)
      const out = (toggle % 2 === 0) ? 5 + rnd() * 7 : -(rnd() * 2.6);  // big random tooth / slight notch
      pts.push([x1 + ux * d + nx * out, y1 + uy * d + ny * out]);
      toggle += 1;
    }
  };
  edge(x, y, x + w, y, 0, -1);          // top
  edge(x + w, y, x + w, y + h, 1, 0);   // right
  edge(x + w, y + h, x, y + h, 0, 1);   // bottom
  edge(x, y + h, x, y, -1, 0);          // left
  ctx.beginPath();
  ctx.moveTo(pts[0][0], pts[0][1]);
  for (let i = 1; i < pts.length; i += 1) ctx.lineTo(pts[i][0], pts[i][1]);
  ctx.closePath();
}

function drawReferenceTape(cx, cy, angle) {
  const ctx = scene;
  const halfW = 43;
  const halfH = 13;
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(angle);

  // Cast shadow under the tape.
  ctx.save();
  ctx.shadowColor = "rgba(46, 38, 26, 0.22)";
  ctx.shadowBlur = 5;
  ctx.shadowOffsetY = 2;
  ctx.fillStyle = "rgba(150, 130, 90, 0.01)";
  tapeTornPath(ctx, halfW, halfH);
  ctx.fill();
  ctx.restore();

  // Translucent tape body (lets the paper tone show through).
  const body = ctx.createLinearGradient(0, -halfH, 0, halfH);
  body.addColorStop(0, "rgba(232, 212, 154, 0.40)");
  body.addColorStop(0.5, "rgba(216, 190, 124, 0.30)");
  body.addColorStop(1, "rgba(200, 172, 108, 0.40)");
  ctx.fillStyle = body;
  tapeTornPath(ctx, halfW, halfH);
  ctx.fill();

  // Gloss highlight band across the top third.
  ctx.fillStyle = "rgba(255, 255, 255, 0.22)";
  ctx.fillRect(-halfW + 2, -halfH + 1.5, halfW * 2 - 4, 2.4);
  // Faint lower edge line for thickness.
  ctx.fillStyle = "rgba(150, 120, 70, 0.12)";
  ctx.fillRect(-halfW + 2, halfH - 2, halfW * 2 - 4, 1);

  ctx.restore();
}

export function drawReferenceSheet(layout) {
  const ctx = scene;
  const { refX, refY, refW, refH } = layout;
  if (!refW || !refH) return;
  const pattern = state.selectedPattern;
  const legendAll = getPatternColors(pattern);
  const preferSingleLegend = legendAll.length <= 6;

  // Seed for the hand-torn outline: stable per note (so it doesn't wobble between
  // redraws) but different across patterns/sizes.
  let nameHash = 0;
  for (const ch of (pattern?.name || "note")) nameHash = (nameHash * 31 + ch.charCodeAt(0)) % 100000;
  const tearSeed = nameHash + Math.round(refW) * 7 + Math.round(refH) * 3 + 1;

  // Content box (uniform padding); the grid swatch sits left, text column right.
  const pad = 13;
  const contentTop = refY + pad;
  const contentH = refH - pad * 2;
  const gridSize = Math.min(contentH, refW * 0.4);
  const cols = boardCols(pattern);
  const rowCount = boardRows(pattern);
  const cell = gridSize / Math.max(cols, rowCount);
  const gridW = cell * cols;
  const gridH = cell * rowCount;
  const gridX = refX + pad + (gridSize - gridW) / 2;
  const gridY = contentTop + (contentH - gridH) / 2;

  // --- hand-torn paper card + shadow + tape ---
  // Inset a touch so the deckle jitter stays inside the layout's ref rect.
  const px = refX + 5;
  const py = refY + 5;
  const pw = refW - 10;
  const ph = refH - 10;
  ctx.save();
  ctx.shadowColor = "rgba(38, 36, 43, 0.18)";
  ctx.shadowBlur = 16;
  ctx.shadowOffsetY = 8;
  ctx.fillStyle = "#fbf6ea";
  tornPaperPath(ctx, px, py, pw, ph, tearSeed);
  ctx.fill();
  ctx.shadowColor = "transparent";
  ctx.strokeStyle = "rgba(150, 134, 100, 0.30)";
  ctx.lineWidth = 1;
  tornPaperPath(ctx, px, py, pw, ph, tearSeed);
  ctx.stroke();
  drawReferenceTape(px + 38, py - 3, -0.12);
  drawReferenceTape(px + pw - 38, py - 3, 0.13);

  // --- paper interior (clipped to the torn outline) ---
  ctx.save();
  tornPaperPath(ctx, px, py, pw, ph, tearSeed);
  ctx.clip();
  ctx.drawImage(getPaperTexture(refW, refH), refX, refY, refW, refH);

  // --- pattern printed directly onto the note ---
  // Faint printed plate border (thin ink rule, no glossy white sticker frame).
  ctx.strokeStyle = "rgba(120, 108, 86, 0.30)";
  ctx.lineWidth = 1;
  ctx.strokeRect(gridX - 4, gridY - 4, gridW + 8, gridH + 8);

  const rows = getEffectiveTargetRows(pattern);
  let ink = tearSeed;
  const inkRnd = () => { ink += 1; const r = Math.sin(ink * 53.17 + 7.13) * 43758.5453; return r - Math.floor(r); };

  // 1) Heavily faded ink: pushed far toward warm cream so even pure black reads as
  //    a soft brown-grey, not deep black.
  ctx.save();
  rows.forEach((row, y) => {
    [...row].forEach((code, x) => {
      if (code === ".") return;
      ctx.fillStyle = fadedPrintColor(palette[code]);
      ctx.fillRect(gridX + x * cell, gridY + y * cell, cell + 0.4, cell + 0.4);
    });
  });
  ctx.restore();

  // Everything below is confined to the printed plate.
  ctx.save();
  ctx.beginPath();
  ctx.rect(gridX, gridY, gridW, gridH);
  ctx.clip();

  // 2) Uneven / worn ink: broad roller patches, mostly bleached where the ink
  //    ran thin, with a couple of heavier areas so the coverage visibly varies
  //    without covering the pattern itself.
  for (let i = 0; i < 6; i += 1) {
    const cx = gridX + inkRnd() * gridW;
    const cy = gridY + inkRnd() * gridH;
    const rad = gridW * (0.40 + inkRnd() * 0.48);
    const light = i < 4;
    const a = light ? 0.16 + inkRnd() * 0.08 : 0.08 + inkRnd() * 0.05;
    const patch = ctx.createRadialGradient(cx, cy, 0, cx, cy, rad);
    patch.addColorStop(0, light ? `rgba(250,244,230,${a.toFixed(3)})` : `rgba(86,70,46,${a.toFixed(3)})`);
    patch.addColorStop(0.42, light ? `rgba(250,244,230,${(a * 0.56).toFixed(3)})` : `rgba(86,70,46,${(a * 0.48).toFixed(3)})`);
    patch.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = patch;
    ctx.fillRect(cx - rad, cy - rad, rad * 2, rad * 2);
  }

  // 3) Print screen: a visible halftone dot grid.
  const dotSize = Math.max(1.1, Math.min(1.7, cell * 0.25));
  ctx.fillStyle = "rgba(62, 50, 34, 0.12)";
  for (let yy = gridY + 1; yy < gridY + gridH; yy += 3) {
    for (let xx = gridX + 1; xx < gridX + gridW; xx += 3) {
      ctx.fillRect(xx, yy, dotSize, dotSize);
    }
  }
  ctx.restore();

  // 4) Printed chart grid: fine warm rules plus bold every-10 divisions. These
  //    stay visible without turning faded dark cells back into solid black.
  ctx.strokeStyle = "rgba(92, 76, 50, 0.26)";
  ctx.lineWidth = 0.7;
  for (let gx = 0; gx <= cols; gx += 1) {
    if (gx % 10 === 0) continue;
    ctx.beginPath(); ctx.moveTo(gridX + gx * cell, gridY); ctx.lineTo(gridX + gx * cell, gridY + gridH); ctx.stroke();
  }
  for (let gy = 0; gy <= rowCount; gy += 1) {
    if (gy % 10 === 0) continue;
    ctx.beginPath(); ctx.moveTo(gridX, gridY + gy * cell); ctx.lineTo(gridX + gridW, gridY + gy * cell); ctx.stroke();
  }
  ctx.strokeStyle = "rgba(54, 42, 26, 0.58)";
  ctx.lineWidth = 1.05;
  for (let gx = 0; gx <= cols; gx += 10) {
    ctx.beginPath(); ctx.moveTo(gridX + gx * cell, gridY); ctx.lineTo(gridX + gx * cell, gridY + gridH); ctx.stroke();
  }
  for (let gy = 0; gy <= rowCount; gy += 10) {
    ctx.beginPath(); ctx.moveTo(gridX, gridY + gy * cell); ctx.lineTo(gridX + gridW, gridY + gy * cell); ctx.stroke();
  }

  // --- text column (top-aligned to the content box) ---
  const textX = gridX + gridW + 18;
  const textAreaW = Math.max(64, refX + refW - pad - textX);
  let nameSize = preferSingleLegend ? 13 : 12;
  while (nameSize > 10.5) {
    ctx.font = `700 ${nameSize}px ${CANVAS_CUTE_FONT}`;
    if (ctx.measureText(pattern.name).width <= textAreaW) break;
    nameSize -= 0.5;
  }
  const metaSize = preferSingleLegend ? 9.5 : 9;
  const nameY = contentTop + nameSize + 1;
  const metaY = nameY + 13;
  const legendStartY = metaY + 15;

  ctx.textBaseline = "alphabetic";
  ctx.fillStyle = "rgba(58, 50, 38, 0.72)";
  ctx.font = `700 ${nameSize}px ${CANVAS_CUTE_FONT}`;
  ctx.fillText(fitText(ctx, pattern.name, textAreaW), textX, nameY);
  ctx.fillStyle = "rgba(94, 80, 58, 0.60)";
  ctx.font = `600 ${metaSize}px ${CANVAS_CLEAR_FONT}`;
  ctx.fillText(fitText(ctx, `${cols}×${rowCount} · ${getTargetTotal()} 颗 · ${legendAll.length} 色`, textAreaW), textX, metaY);
  ctx.strokeStyle = "rgba(122, 108, 82, 0.16)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(textX, metaY + 6);
  ctx.lineTo(textX + textAreaW, metaY + 6);
  ctx.stroke();

  // Colour legend, auto-fitting the rows that remain below the heading.
  const counts = getTargetCounts(pattern);
  const legendCols = (preferSingleLegend || textAreaW < 150) ? 1 : 2;
  const colW = legendCols === 1 ? textAreaW : Math.max(60, Math.floor((textAreaW - 8) / 2));
  const legendBottom = refY + refH - pad;
  const availableLegendH = Math.max(1, legendBottom - legendStartY);
  const rowH = preferSingleLegend ? clamp(availableLegendH / Math.max(1, legendAll.length - 0.15), 11.5, 16) : 16;
  const rowsThatFit = Math.max(1, Math.floor(availableLegendH / rowH) + 1);
  const maxRows = preferSingleLegend ? Math.min(6, legendAll.length) : Math.min(5, rowsThatFit);
  const maxLegend = legendCols * maxRows;
  const truncated = legendAll.length > maxLegend;
  const shown = truncated ? maxLegend - 1 : Math.min(legendAll.length, maxLegend);
  const colors = legendAll.slice(0, shown);
  colors.forEach((code, i) => {
    const col = i % legendCols;
    const row = Math.floor(i / legendCols);
    const x = textX + col * (colW + 8);
    const y = legendStartY + row * rowH;
    ctx.fillStyle = fadedPrintColor(palette[code]);
    ctx.beginPath();
    ctx.arc(x + 4, y - 4, legendCols === 1 ? 5.1 : 4.8, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "rgba(80, 74, 62, 0.22)";
    ctx.lineWidth = 0.8;
    ctx.stroke();
    ctx.fillStyle = "rgba(86, 78, 60, 0.64)";
    ctx.font = `${legendCols === 1 ? 12 : 11.5}px ${CANVAS_CLEAR_FONT}`;
    const label = fitText(ctx, `${beadIds[code] || code} ×${counts[code] || 0}`, Math.max(22, colW - 16));
    ctx.fillText(label, x + 13, y);
  });
  if (truncated) {
    const i = shown;
    const col = i % legendCols;
    const row = Math.floor(i / legendCols);
    ctx.fillStyle = "#9a9484";
    ctx.font = `${legendCols === 1 ? 12 : 11.5}px ${CANVAS_CLEAR_FONT}`;
    ctx.fillText(`+${legendAll.length - shown} 色`, textX + col * (colW + 8), legendStartY + row * rowH);
  }

  ctx.restore();
  ctx.restore();
}

export function drawIronLayer(layout) {
  const ctx = scene;
  const { boardX, boardY, boardSize, cell } = layout;
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

  for (let y = 0; y < boardRows(); y += 1) {
    for (let x = 0; x < boardCols(); x += 1) {
      const index = indexFor(x, y);
      if (!state.placed[index]) continue;
      const heat = state.heat[index] || 0;
      if (heat < HEAT_LEVELS.visible) continue;
      // Shared heat levels: green = bonded/ideal, amber = above ideal, red = scorched.
      ctx.globalAlpha = clamp(heat / 140, 0, 0.5);
      ctx.fillStyle = heat >= HEAT_LEVELS.scorched ? "#e7645f" : heat > HEAT_LEVELS.idealMax ? "#d99b3d" : "#57b8a7";
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
    const ironPoint = boardLocalPointFromCanvasPoint(layout, state.ironPos);
    drawIron(ironPoint.x, ironPoint.y, ironColorForHeat(averageHeatUnderIron(layout, ironPoint)));
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
  const card = getFinishCardRect(layout);
  const badgeW = 76;
  const badgeH = 30;
  const bx = card.x + card.w - badgeW - 8;
  const by = card.y + card.h - badgeH - 8;
  ctx.save();
  softShadow(ctx, { blur: 14, dy: 7, color: "rgba(38,36,43,0.15)" });
  ctx.fillStyle = "rgba(255,255,255,0.9)";
  roundedRect(bx, by, badgeW, badgeH, 8);
  ctx.fill();
  ctx.shadowColor = "transparent";
  ctx.strokeStyle = "rgba(38,36,43,0.1)";
  ctx.lineWidth = 1;
  roundedRect(bx + 0.5, by + 0.5, badgeW - 1, badgeH - 1, 7.5);
  ctx.stroke();
  ctx.fillStyle = "#26242b";
  ctx.font = "800 14px " + CANVAS_CLEAR_FONT;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(`评级 ${finalGrade()}`, bx + badgeW / 2, by + badgeH / 2 + 0.5);
  ctx.restore();
}

// `seed` (board cell index) is kept threaded through callers so a per-bead
// specular highlight can be re-introduced on a stable random subset later;
// highlights are currently removed entirely.
export function drawBead(ctx, x, y, r, code, heat = 0, fused = false, shape = null, seed = null, material = null) {
  const base = palette[code] || "#999";
  const color = finishMaterialColor(fusedColor(code, heat), material);
  const pressRaw = fused ? ((state.phase === "cool" || state.phase === "finish") ? clamp(state.flattening / 100, 0, 1) : 0) : 0;
  const heatWeight = clamp((heat - 28) / 46, 0, 1);
  const pressBoost = pressRaw * (0.12 + heatWeight * 0.88);
  // melt: 0 (raw cylinder) → 1 (fully fused).
  const melt = fused ? clamp((heat - 30) / 70 + pressBoost * 0.6, 0, 1) : 0;

  const edges = shape?.edges || { left: true, right: true, up: true, down: true };
  const exposedCount = (edges.left ? 1 : 0) + (edges.right ? 1 : 0) + (edges.up ? 1 : 0) + (edges.down ? 1 : 0);

  // Physics: the side touching a neighbor is squashed flat, filling exactly to the cell midline (r·1.18);
  // the exposed side is unconstrained, the melted plastic overflows outward, bulging past the cell edge (r·1.32).
  const halfConnected = r * lerp(1.0, 1.18, melt);
  const halfExposed = r * lerp(1.0, 1.32, melt);
  const halfL = edges.left ? halfExposed : halfConnected;
  const halfR = edges.right ? halfExposed : halfConnected;
  const halfU = edges.up ? halfExposed : halfConnected;
  const halfD = edges.down ? halfExposed : halfConnected;

  // Each corner's radius depends on whether its two adjacent sides are exposed; when both are exposed, take the smaller of the adjacent halves to form a full quarter-circle.
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

  // Fused beads that touch a neighbor must merge seamlessly: only the piece's
  // OUTER silhouette (exposed edges) gets an outline; connected seams get none —
  // otherwise every bead is ringed by a dark line and the fused piece reads as a grid.
  const strokeExposedEdges = (cx, cy, style, lw) => {
    const left = cx - halfL, right = cx + halfR, top = cy - halfU, bottom = cy + halfD;
    ctx.strokeStyle = style;
    ctx.lineWidth = lw;
    ctx.lineCap = "round";
    ctx.beginPath();
    if (edges.up) { ctx.moveTo(left + rTL, top); ctx.lineTo(right - rTR, top); }
    if (edges.right) { ctx.moveTo(right, top + rTR); ctx.lineTo(right, bottom - rBR); }
    if (edges.down) { ctx.moveTo(right - rBR, bottom); ctx.lineTo(left + rBL, bottom); }
    if (edges.left) { ctx.moveTo(left, bottom - rBL); ctx.lineTo(left, top + rTL); }
    ctx.stroke();
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
  // When fused, the per-bead drop shadow falls onto the touching neighbor and
  // reads as a dark seam — fade it out as the bead melts so connected beads merge.
  const seamShadowAlpha = fused ? 0.12 * (1 - melt * 0.85) : 0.12;
  if (seamShadowAlpha > 0.004) {
    ctx.fillStyle = `rgba(0,0,0,${seamShadowAlpha})`;
    buildPath(x + r * 0.08, y + r * 0.13);
    ctx.fill();
  }

  ctx.fillStyle = color;
  buildPath(x, y);
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

  if (fused) {
    // Only outline the exposed silhouette; connected seams stay invisible so the
    // ironed piece reads as one continuous melt (matches the collection thumbnails).
    strokeExposedEdges(x, y, "rgba(0,0,0,0.12)", Math.max(1, r * 0.07));
  } else {
    ctx.strokeStyle = "rgba(0,0,0,0.12)";
    ctx.lineWidth = Math.max(1, r * 0.07);
    buildPath(x, y);
    ctx.stroke();
  }
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

// fusedColor, roundedRect, roundedPath, wrapText, fitText moved to
// ./render-primitives.js (imported back near the top of this file).

export function drawPreview() {
  setupHiDpiCanvas(previewCanvas, preview);
  const { w, h, cols, rows: rowCount } = getPreviewLayout();
  const pattern = state.selectedPattern;
  const rows = getEffectiveTargetRows(pattern);
  const theme = currentBackgroundTheme();
  drawPixelPatternPreview(preview, {
    width: w,
    height: h,
    cols,
    rows: rowCount,
    pixels: rows,
    colors: palette,
    brand: theme.brand,
    table: theme.table,
  });
}

export function getPreviewLayout() {
  const rect = previewCanvas.getBoundingClientRect();
  const w = rect.width;
  const h = rect.height;
  const cols = boardCols();
  const rows = boardRows();
  const layout = pixelPatternPreviewLayout(w, h, cols, rows);
  return {
    w,
    h,
    cell: layout.cell,
    x0: layout.boardX,
    y0: layout.boardY,
    cols,
    rows,
    boardW: layout.boardW,
    boardH: layout.boardH,
    size: Math.max(cols, rows),
  };
}

export function previewCellFromPoint(clientX, clientY) {
  const rect = previewCanvas.getBoundingClientRect();
  const x = clientX - rect.left;
  const y = clientY - rect.top;
  const layout = getPreviewLayout();
  if (x < layout.x0 || y < layout.y0) return null;
  if (x > layout.x0 + layout.boardW || y > layout.y0 + layout.boardH) return null;
  return {
    x: clamp(Math.floor((x - layout.x0) / layout.cell), 0, layout.cols - 1),
    y: clamp(Math.floor((y - layout.y0) / layout.cell), 0, layout.rows - 1),
  };
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
  const { boardX, boardY, cell } = layout;
  const boardW = layout.boardW || layout.boardSize;
  const boardH = layout.boardH || layout.boardSize;
  const pad = Math.max(5, cell * 0.24);
  if (ux < boardX - pad || uy < boardY - pad || ux > boardX + boardW + pad || uy > boardY + boardH + pad) return null;
  const clampedX = clamp(ux, boardX, boardX + boardW - 0.01);
  const clampedY = clamp(uy, boardY, boardY + boardH - 0.01);
  return {
    x: clamp(Math.floor((clampedX - boardX) / cell), 0, boardCols() - 1),
    y: clamp(Math.floor((clampedY - boardY) / cell), 0, boardRows() - 1),
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
// placedCount, inspectionSummary, placementAccuracy, heatStats, estimateWarp,
// scoreLabel, finalGrade, statusText moved to ./render-stats.js (imported back
// near the top of this file).


