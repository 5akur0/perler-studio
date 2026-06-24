// Inspect-assist mini-canvases extracted from render.js.
//
// These render the zoom loupe and the fuse-preview into dedicated DOM canvases
// shown beside the palette during the inspect phase. They pull pure helpers from
// render-primitives.js and a few board/layout functions back from render.js (a
// call-time cycle, safe in the single esbuild IIFE). render.js re-exports them so
// ui.js/main.js keep importing from './render.js'.

import { els } from './dom.js';
import { state } from './state.js';
import { palette } from './palette.js';
import { clamp, lerp, easeOut, mixColor } from './color-utils.js';
import { boardCols, boardRows, indexFor, targetAt } from './pattern.js';
import { roundedPath, fusedColor } from './render-primitives.js';
import {
  boardCellFromPoint, setupHiDpiCanvas, boardFusionShapeProfile,
  drawGradientCapsuleBridge, CANVAS_CLEAR_FONT,
} from './render.js';

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
  const cols = boardCols();
  if (state.spill) {
    const index = state.spill.index;
    return { x: index % cols, y: Math.floor(index / cols) };
  }
  if (state.errors.length) {
    const index = state.errors[0].index;
    return { x: index % cols, y: Math.floor(index / cols) };
  }
  const index = state.placed.findIndex(Boolean);
  if (index >= 0) {
    return { x: index % cols, y: Math.floor(index / cols) };
  }
  return { x: Math.floor((cols - 1) / 2), y: Math.floor((boardRows() - 1) / 2) };
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
  const cols = boardCols();
  const rows = boardRows();
  const radius = 3;
  const gridCount = radius * 2 + 1;
  const padding = 10;
  const cell = Math.floor(Math.min((w - padding * 2) / gridCount, (h - padding * 2) / gridCount));
  if (!Number.isFinite(cell) || cell <= 0) return;
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
      const inRange = bx >= 0 && by >= 0 && bx < cols && by < rows;
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

  const cols = boardCols();
  const rows = boardRows();
  const cells = [];
  let minX = cols;
  let minY = rows;
  let maxX = -1;
  let maxY = -1;
  for (let y = 0; y < rows; y += 1) {
    for (let x = 0; x < cols; x += 1) {
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
    ctx.font = "600 13px " + CANVAS_CLEAR_FONT;
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
