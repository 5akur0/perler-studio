// Bead-tray model, geometry, and drawing extracted from render.js.
//
// Covers the tray matrix/seed model (makeTray*/syncTray*/countTrayBeans), tray
// geometry + hit-mapping (trayGeometry/trayCell*), capacity helpers, and the tray
// rendering (drawTray/drawTrayBeadRandomized/visibleTraySeedCount). It imports pure
// helpers from render-primitives.js and layout/hit-test/util functions back from
// render.js (a call-time cycle, safe in the single esbuild IIFE). render.js
// re-exports everything so main.js/ui.js keep importing from './render.js'.

import { state } from './state.js';
import { scene } from './dom.js';
import { palette } from './palette.js';
import { clamp, lerp, easeOut } from './color-utils.js';
import {
  TRAY_DESKTOP_ROWS, TRAY_DESKTOP_COLS, TRAY_MOBILE_ROWS, TRAY_MOBILE_COLS,
} from './constants.js';
import { getTargetCounts } from './pattern.js';
import { roundedPath, roundedRect } from './render-primitives.js';
import {
  currentLayout, useMobileDirectPlacement, pseudoRandom,
  pointInTray, pointInTrayDumpButton, trayDumpButtonRect, CANVAS_CLEAR_FONT,
} from './render.js';

export function useMobileTrayGrid() {
  return window.matchMedia("(max-width: 860px)").matches;
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

export function drawTrayBeadRandomized(ctx, x, y, r, code, angle = 0, tilt = 1, heightLift = 0) {
  const base = palette[code] || "#999";
  const length = r * 2.22;
  const thickness = r * 1.88 * tilt;
  const corner = Math.max(1.8, thickness * 0.2);
  ctx.save();
  ctx.translate(x, y - heightLift);
  ctx.rotate(angle);

  // Contact shadow (simulates slight hover and pose variation)
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

  // Empty-state hint: before any color is poured, the bare grooves can read like an
  // unloaded skeleton. A soft centered label makes the empty tray feel intentional.
  if (!color) {
    ctx.save();
    ctx.fillStyle = "rgba(63, 81, 91, 0.46)";
    ctx.font = "600 12px " + CANVAS_CLEAR_FONT;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("点色号倒豆", trayX + trayW / 2, trayY + trayH / 2 - 8);
    ctx.fillText("豆筛就满啦", trayX + trayW / 2, trayY + trayH / 2 + 9);
    ctx.restore();
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
        // Per-bead independent gather progress: avoids "everyone snaps into line at once", closer to a real tidying process
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

  ctx.restore();
}

export function visibleTraySeedCount() {
  return state.trayBeans;
}
