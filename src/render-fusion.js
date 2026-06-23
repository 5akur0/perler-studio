// Detached fused-piece model + drawing extracted from render.js.
//
// buildFusedPiecesFromPlaced flood-fills the placed beads into connected pieces;
// the draw helpers render those pieces (used by the finish showcase). This module
// imports pure helpers from render-primitives.js, placedCount from render-stats.js,
// and bead/bridge/material helpers back from render.js (a call-time cycle, safe in
// the single esbuild IIFE). render.js re-exports the public functions so main.js
// and the in-core finish scenes keep importing them from './render.js'.

import { state } from './state.js';
import { scene } from './dom.js';
import { clamp, lerp, easeOut } from './color-utils.js';
import { boardCols, boardRows, indexFor } from './pattern.js';
import { fusedColor } from './render-primitives.js';
import { placedCount } from './render-stats.js';
import {
  pseudoRandom, drawGradientCapsuleBridge, isSpillDamagedIndex,
  drawDamagedBead, drawBead, finishMaterialColor,
} from './render.js';

export function buildFusedPiecesFromPlaced() {
  const cols = boardCols();
  const rows = boardRows();
  const total = cols * rows;
  const visited = Array(total).fill(false);
  const pieces = [];
  const boardCenterX = (cols - 1) / 2;
  const boardCenterY = (rows - 1) / 2;

  for (let index = 0; index < total; index += 1) {
    if (visited[index] || !state.placed[index]) continue;
    const queue = [index];
    visited[index] = true;
    const cells = [];
    let minX = cols;
    let minY = rows;
    let maxX = 0;
    let maxY = 0;
    let sumX = 0;
    let sumY = 0;

    for (let head = 0; head < queue.length; head += 1) {
      const current = queue[head];
      const code = state.placed[current];
      if (!code) continue;
      const x = current % cols;
      const y = Math.floor(current / cols);
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
        if (nx < 0 || ny < 0 || nx >= cols || ny >= rows) return;
        const next = indexFor(nx, ny);
        if (visited[next] || !state.placed[next]) return;
        visited[next] = true;
        queue.push(next);
      });
    }

    if (!cells.length) continue;
    const centerX = sumX / cells.length;
    const centerY = sumY / cells.length;
    const dx = centerX - boardCenterX;
    const dy = centerY - boardCenterY;
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

function drawWaxSheenForPiece(layout, piece, { scale, resolveCenter }) {
  const ctx = scene;
  const centers = piece.cells.map((cell) => ({ cell, center: resolveCenter(cell, piece) }));
  if (!centers.length) return;
  const radius = layout.cell * scale * 0.52;
  const bridgeHalf = layout.cell * scale * 0.36;
  const xs = centers.map(({ center }) => center.x);
  const ys = centers.map(({ center }) => center.y);
  const left = Math.min(...xs) - radius;
  const top = Math.min(...ys) - radius;
  const right = Math.max(...xs) + radius;
  const bottom = Math.max(...ys) + radius;

  ctx.save();
  ctx.beginPath();
  centers.forEach(({ cell, center }) => {
    ctx.moveTo(center.x + radius, center.y);
    ctx.arc(center.x, center.y, radius, 0, Math.PI * 2);
    const rightCell = piece.map[`${cell.x + 1},${cell.y}`];
    if (rightCell) {
      const next = resolveCenter(rightCell, piece);
      ctx.rect(center.x, center.y - bridgeHalf, next.x - center.x, bridgeHalf * 2);
    }
    const downCell = piece.map[`${cell.x},${cell.y + 1}`];
    if (downCell) {
      const next = resolveCenter(downCell, piece);
      ctx.rect(center.x - bridgeHalf, center.y, bridgeHalf * 2, next.y - center.y);
    }
  });
  ctx.clip();
  const sheen = ctx.createLinearGradient(left, top, right, bottom);
  sheen.addColorStop(0, "rgba(255,248,235,0.075)");
  sheen.addColorStop(0.46, "rgba(255,248,235,0.025)");
  sheen.addColorStop(1, "rgba(255,248,235,0)");
  ctx.fillStyle = sheen;
  ctx.fillRect(left, top, right - left, bottom - top);
  ctx.restore();
}

export function drawDetachedFusionBridgeByCenters(ctx, cellSize, cellA, cellB, centerA, centerB, material = null) {
  const heat = Math.min(cellA.heat || 0, cellB.heat || 0);
  const pressBoost = clamp(state.flattening / 100, 0, 1);
  const fuse = clamp((heat - 36) / 56 + pressBoost * 0.42, 0, 1);
  if (fuse <= 0) return;
  const spread = lerp(cellSize * 0.24, cellSize * (0.8 + pressBoost * 0.1), easeOut(fuse));
  const over = clamp((heat - 88) / 34, 0, 1);
  const colorA = finishMaterialColor(fusedColor(cellA.code, heat), material);
  const colorB = finishMaterialColor(fusedColor(cellB.code, heat), material);
  const gradient = ctx.createLinearGradient(centerA.x, centerA.y, centerB.x, centerB.y);
  gradient.addColorStop(0, colorA);
  gradient.addColorStop(1, colorB);

  drawGradientCapsuleBridge(ctx, centerA, centerB, spread, lerp(spread / 2, 3, over), gradient, 0.92);
}

export function drawFusedPieceTransformed(layout, piece, options = {}) {
  const ctx = scene;
  const scale = clamp(options.scale ?? 1, 0.28, 1.4);
  const resolveCenter = options.resolveCenter;
  const material = options.material || null;
  if (!resolveCenter) return;
  piece.cells.forEach((cell) => {
    const right = piece.map[`${cell.x + 1},${cell.y}`];
    if (right) {
      const centerA = resolveCenter(cell, piece);
      const centerB = resolveCenter(right, piece);
      drawDetachedFusionBridgeByCenters(ctx, layout.cell * scale, cell, right, centerA, centerB, material);
    }
    const down = piece.map[`${cell.x},${cell.y + 1}`];
    if (down) {
      const centerA = resolveCenter(cell, piece);
      const centerB = resolveCenter(down, piece);
      drawDetachedFusionBridgeByCenters(ctx, layout.cell * scale, cell, down, centerA, centerB, material);
    }
  });

  piece.cells.forEach((cell) => {
    const center = resolveCenter(cell, piece);
    const shapeProfile = pieceFusionShapeProfile(piece, cell);
    if (isSpillDamagedIndex(cell.index)) {
      drawDamagedBead(ctx, center.x, center.y, layout.cell * 0.43 * scale, cell.code, cell.heat, true, shapeProfile);
    } else {
      drawBead(ctx, center.x, center.y, layout.cell * 0.43 * scale, cell.code, cell.heat, true, shapeProfile, cell.index, material);
    }
  });
  if (material === "wax") drawWaxSheenForPiece(layout, piece, { scale, resolveCenter });
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

export function getShowcaseBounds(pieces) {
  const bounds = {
    minX: Infinity,
    minY: Infinity,
    maxX: -Infinity,
    maxY: -Infinity,
  };
  pieces.forEach((piece) => {
    bounds.minX = Math.min(bounds.minX, piece.minX);
    bounds.minY = Math.min(bounds.minY, piece.minY);
    bounds.maxX = Math.max(bounds.maxX, piece.maxX);
    bounds.maxY = Math.max(bounds.maxY, piece.maxY);
  });
  if (!Number.isFinite(bounds.minX)) return null;
  return {
    ...bounds,
    width: bounds.maxX - bounds.minX + 1,
    height: bounds.maxY - bounds.minY + 1,
    centerX: (bounds.minX + bounds.maxX) / 2,
    centerY: (bounds.minY + bounds.maxY) / 2,
  };
}
