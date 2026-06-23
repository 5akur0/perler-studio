// Finish-phase showcase + concept-museum easter-egg scenes extracted from render.js.
//
// These draw the framed "finished craft" presentations (keychain / original /
// coaster / figurine) and the hidden concept-museum scene. They import pure helpers
// from render-primitives.js, the fused-piece model from render-fusion.js, and
// drawBead/pseudoRandom/getFinishCardRect/CANVAS_FONT_STACK back from render.js (a
// call-time cycle, safe in the single esbuild IIFE). render.js re-exports the scene
// entry points so render()'s scene loop and main.js keep importing from './render.js'.

import { state } from './state.js';
import { scene } from './dom.js';
import { clamp } from './color-utils.js';
import { prefersReducedMotion } from './utils.js';
import { boardCols, boardRows, indexFor } from './pattern.js';
import { softShadow, roundedPath, roundedRect } from './render-primitives.js';
import {
  getFusedPieces, pieceSortByArea, getShowcaseBounds, drawFusedPieceTransformed,
} from './render-fusion.js';
import { drawBead, pseudoRandom, getFinishCardRect, CANVAS_FONT_STACK } from './render.js';

function drawMaterialHighlight(ctx, { x, y, w, h, r, alpha = 0.18 }) {
  ctx.save();
  roundedPath(ctx, x, y, w, h, r);
  ctx.clip();
  const shine = ctx.createLinearGradient(x, y, x + w * 0.72, y + h * 0.62);
  shine.addColorStop(0, `rgba(255,255,255,${alpha})`);
  shine.addColorStop(0.36, `rgba(255,255,255,${alpha * 0.45})`);
  shine.addColorStop(0.58, "rgba(255,255,255,0)");
  ctx.fillStyle = shine;
  ctx.fillRect(x, y, w, h);
  ctx.restore();
}

function drawAcrylicPlate(ctx, { x, y, w, h, r = 14, shadow = true }) {
  ctx.save();
  if (shadow) softShadow(ctx, { blur: 18, dy: 9, color: "rgba(38,36,43,0.13)" });
  ctx.fillStyle = "rgba(255,255,255,0.82)";
  roundedPath(ctx, x, y, w, h, r);
  ctx.fill();
  ctx.shadowColor = "transparent";
  ctx.strokeStyle = "rgba(255,255,255,0.92)";
  ctx.lineWidth = 2;
  roundedPath(ctx, x + 1, y + 1, w - 2, h - 2, Math.max(2, r - 1));
  ctx.stroke();
  ctx.strokeStyle = "rgba(124,136,147,0.2)";
  ctx.lineWidth = 1;
  roundedPath(ctx, x + 2.5, y + 2.5, w - 5, h - 5, Math.max(2, r - 2));
  ctx.stroke();
  ctx.restore();
  drawMaterialHighlight(ctx, { x, y, w, h, r, alpha: 0.24 });
}

function finishIntroProgress() {
  if (prefersReducedMotion() || !state.craftSwitchAt) return 1;
  const t = clamp((performance.now() - state.craftSwitchAt) / 260, 0, 1);
  return 1 - ((1 - t) ** 3);
}

export function drawFinishShowcase(layout) {
  const pieces = getFusedPieces();
  if (!pieces.length) return;

  const ctx = scene;
  const card = getFinishCardRect(layout);
  const intro = finishIntroProgress();
  const centerX = card.x + card.w / 2;
  const centerY = card.y + card.h / 2;
  ctx.save();
  ctx.globalAlpha = 0.6 + intro * 0.4;
  ctx.translate(centerX, centerY);
  ctx.scale(0.96 + intro * 0.04, 0.96 + intro * 0.04);
  ctx.translate(-centerX, -centerY);
  softShadow(ctx, { blur: 26, dy: 14, color: "rgba(38,36,43,0.14)" });
  ctx.fillStyle = "rgba(255,255,255,0.42)";
  roundedRect(card.x, card.y, card.w, card.h, 14);
  ctx.fill();
  ctx.shadowColor = "transparent";

  if (state.craft === "原版") {
    drawFinishOriginal(layout, pieces);
  } else if (state.craft === "钥匙扣") {
    drawFinishKeychain(layout, pieces);
  } else if (state.craft === "摆件") {
    drawFinishFigurine(layout, pieces);
  } else if (state.craft === "杯垫") {
    drawFinishCoaster(layout, pieces);
  } else {
    drawFinishOriginal(layout, pieces);
  }
  ctx.restore();
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
  const cols = boardCols();
  const rows = boardRows();

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

  const displayCell = displaySize / Math.max(cols, rows);
  const fullMode = type === "full";
  for (let y = 0; y < rows; y += 1) {
    for (let x = 0; x < cols; x += 1) {
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
        drawBead(ctx, px + displayCell / 2, py + displayCell / 2, displayCell * 0.43, code, heat, true, null, index);
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
      { text: "2026", font: "500 15px " + CANVAS_FONT_STACK, color: "#2f333b", lineHeight: 22 },
      { text: "塑料拼豆、网格、完全占据的表面", font: "500 14px " + CANVAS_FONT_STACK, color: "#4f5560", lineHeight: 22 },
      { gap: 10 },
      { text: "这件作品拒绝留白，整块板面成为图像本身。", font: "500 15px " + CANVAS_FONT_STACK, color: "#2f333b", lineHeight: 22 },
      { text: "每个孔位都被占据，每个位置都同等重要。", font: "500 15px " + CANVAS_FONT_STACK, color: "#2f333b", lineHeight: 22 },
    ]
    : [
      { text: "2026", font: "500 15px " + CANVAS_FONT_STACK, color: "#2f333b", lineHeight: 22 },
      { text: "空白拼豆板、未放置的塑料豆、玩家的观看", font: "500 14px " + CANVAS_FONT_STACK, color: "#4f5560", lineHeight: 22 },
      { gap: 10 },
      { text: "没有颜色，也是一种结构。", font: "500 15px " + CANVAS_FONT_STACK, color: "#2f333b", lineHeight: 22 },
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
  ctx.font = "700 23px " + CANVAS_FONT_STACK;
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
  const { boardX, boardY, boardW, boardH, cell } = layout;
  const selected = pieceSortByArea(pieces).slice(0, 2);
  const centerX = boardX + boardW / 2;
  const slots = selected.length === 1
    ? [boardY + boardH * 0.57]
    : [boardY + boardH * 0.38, boardY + boardH * 0.73];
  const placed = [];
  selected.forEach((piece, index) => {
    const pieceW = (piece.maxX - piece.minX + 1) * cell;
    const pieceH = (piece.maxY - piece.minY + 1) * cell;
    const maxW = boardW * (selected.length === 1 ? 0.58 : 0.46);
    const maxH = boardH * (selected.length === 1 ? 0.48 : 0.25);
    const scale = clamp(Math.min(maxW / pieceW, maxH / pieceH, 1.22), 0.48, 1.22);
    const pad = Math.max(cell * 0.68, 12);
    const plateW = pieceW * scale + pad * 2;
    const plateH = pieceH * scale + pad * 2.15;
    const target = { x: centerX, y: slots[index] + pad * 0.2 };
    const plate = {
      x: centerX - plateW / 2,
      y: slots[index] - plateH / 2,
      w: plateW,
      h: plateH,
      r: Math.max(12, cell * 0.72),
    };
    placed.push({ piece, scale, target, plate, pad });
    drawAcrylicPlate(ctx, plate);
    const holeY = plate.y + pad * 0.52;
    ctx.save();
    ctx.fillStyle = "rgba(124,136,147,0.22)";
    ctx.strokeStyle = "rgba(83,94,105,0.68)";
    ctx.lineWidth = Math.max(1.5, cell * 0.09);
    ctx.beginPath();
    ctx.arc(centerX, holeY, Math.max(4, cell * 0.22), 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.restore();
    drawFusedPieceTransformed(layout, piece, {
      scale,
      resolveCenter: (cellData) => ({
        x: target.x + (cellData.x - piece.centerX) * cell * scale,
        y: target.y + (cellData.y - piece.centerY) * cell * scale,
      }),
    });
    drawMaterialHighlight(ctx, { ...plate, alpha: 0.14 });
  });

  const ringY = boardY + boardH * 0.1;
  const ringR = Math.max(18, boardW * 0.055);
  ctx.save();
  const metal = ctx.createLinearGradient(centerX - ringR, ringY - ringR, centerX + ringR, ringY + ringR);
  metal.addColorStop(0, "#f0f3f6");
  metal.addColorStop(0.46, "#aab4c0");
  metal.addColorStop(1, "#7c8893");
  ctx.strokeStyle = metal;
  ctx.lineWidth = Math.max(5, cell * 0.28);
  ctx.beginPath();
  ctx.arc(centerX, ringY, ringR, 0, Math.PI * 2);
  ctx.stroke();
  ctx.strokeStyle = "rgba(255,255,255,0.82)";
  ctx.lineWidth = Math.max(1.4, cell * 0.075);
  ctx.beginPath();
  ctx.arc(centerX, ringY, ringR, Math.PI * 1.08, Math.PI * 1.76);
  ctx.stroke();
  if (placed.length) {
    const first = placed[0];
    const holeY = first.plate.y + first.pad * 0.52;
    const connectorTop = ringY + ringR * 0.76;
    const connectorH = Math.max(8, holeY - connectorTop + cell * 0.1);
    ctx.fillStyle = metal;
    roundedPath(ctx, centerX - Math.max(3, cell * 0.14), connectorTop, Math.max(6, cell * 0.28), connectorH, Math.max(3, cell * 0.14));
    ctx.fill();
  }
  if (placed.length > 1) {
    const top = placed[0];
    const bottom = placed[1];
    const topBottomY = top.plate.y + top.plate.h;
    const bottomTopY = bottom.plate.y;
    ctx.strokeStyle = metal;
    ctx.lineCap = "round";
    ctx.lineWidth = Math.max(2.8, cell * 0.16);
    ctx.beginPath();
    ctx.moveTo(centerX, topBottomY + cell * 0.06);
    ctx.lineTo(centerX, bottomTopY - cell * 0.06);
    ctx.stroke();
  }
  ctx.restore();
}

export function drawFinishOriginal(layout, pieces) {
  const ctx = scene;
  const { boardX, boardY, cell } = layout;
  const boardW = layout.boardW || layout.boardSize;
  const boardH = layout.boardH || layout.boardSize;
  const frame = 14;
  ctx.save();
  softShadow(ctx, { blur: 24, dy: 14, color: "rgba(38,36,43,0.16)" });
  const woodFrame = ctx.createLinearGradient(boardX - frame, boardY - frame, boardX + boardW + frame, boardY + boardH + frame);
  woodFrame.addColorStop(0, "#e7dccb");
  woodFrame.addColorStop(0.55, "#d8c8ad");
  woodFrame.addColorStop(1, "#cdbb9f");
  ctx.fillStyle = woodFrame;
  roundedRect(boardX - frame, boardY - frame, boardW + frame * 2, boardH + frame * 2, 12);
  ctx.fill();
  ctx.shadowColor = "transparent";
  ctx.fillStyle = "#fffdf8";
  roundedRect(boardX - 6, boardY - 6, boardW + 12, boardH + 12, 8);
  ctx.fill();
  ctx.fillStyle = "#fbfcfd";
  roundedRect(boardX, boardY, boardW, boardH, 6);
  ctx.fill();
  const cols = boardCols();
  const rows = boardRows();
  const spillIndex = state.spill ? state.spill.index : -1;
  for (let y = 0; y < rows; y += 1) {
    for (let x = 0; x < cols; x += 1) {
      const index = indexFor(x, y);
      if (index === spillIndex) continue;
      const px = boardX + x * cell;
      const py = boardY + y * cell;
      const pegR = cell * 0.138;
      ctx.fillStyle = "rgba(91, 104, 118, 0.16)";
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
  drawMaterialHighlight(ctx, {
    x: boardX,
    y: boardY,
    w: boardW,
    h: boardH,
    r: 6,
    alpha: 0.12,
  });
}

export function drawFinishCoaster(layout, pieces) {
  const ctx = scene;
  const bounds = getShowcaseBounds(pieces);
  if (!bounds) return;
  const { boardX, boardY, boardW, boardH, cell } = layout;
  const side = Math.min(boardW, boardH) * 0.84;
  const pad = Math.max(cell * 1.05, side * 0.055);
  const scale = clamp(Math.min(
    (side - pad * 2) / (bounds.width * cell),
    (side - pad * 2) / (bounds.height * cell),
    1.08,
  ), 0.42, 1.08);
  const left = boardX + (boardW - side) / 2;
  const top = boardY + (boardH - side) / 2;
  const thickness = Math.max(7, cell * 0.35);
  const radius = Math.max(18, cell * 0.9);
  ctx.save();
  softShadow(ctx, { blur: 24, dy: 13, color: "rgba(38,36,43,0.18)" });
  const edge = ctx.createLinearGradient(left, top + thickness, left, top + side + thickness);
  edge.addColorStop(0, "#c8a877");
  edge.addColorStop(1, "#b08f5e");
  ctx.fillStyle = edge;
  roundedPath(ctx, left, top + thickness, side, side, radius);
  ctx.fill();
  ctx.shadowColor = "transparent";
  const cork = ctx.createLinearGradient(left, top, left + side, top + side);
  cork.addColorStop(0, "#e2c493");
  cork.addColorStop(0.52, "#d8b783");
  cork.addColorStop(1, "#cda66d");
  ctx.fillStyle = cork;
  roundedPath(ctx, left, top, side, side, radius);
  ctx.fill();
  roundedPath(ctx, left, top, side, side, radius);
  ctx.clip();
  for (let i = 0; i < 150; i += 1) {
    const px = left + pseudoRandom(`coaster-x-${i}`) * side;
    const py = top + pseudoRandom(`coaster-y-${i}`) * side;
    const pr = 0.45 + pseudoRandom(`coaster-r-${i}`) * 1.25;
    ctx.fillStyle = pseudoRandom(`coaster-c-${i}`) > 0.5
      ? "rgba(113,70,47,0.16)"
      : "rgba(255,247,225,0.28)";
    ctx.beginPath();
    ctx.arc(px, py, pr, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();

  const centerX = boardX + boardW / 2;
  const centerY = boardY + boardH / 2;
  pieces.forEach((piece) => {
    drawFusedPieceTransformed(layout, piece, {
      scale,
      material: "wax",
      resolveCenter: (cellData) => ({
        x: centerX + (cellData.x - bounds.centerX) * cell * scale,
        y: centerY + (cellData.y - bounds.centerY) * cell * scale,
      }),
    });
  });
  drawMaterialHighlight(ctx, { x: left, y: top, w: side, h: side, r: radius, alpha: 0.14 });
}

export function drawFinishFigurine(layout, pieces) {
  const selected = pieceSortByArea(pieces).slice(0, Math.min(4, pieces.length));
  const count = selected.length;
  if (!count) return;
  const ctx = scene;
  const { boardX, boardY, boardW, boardH, cell } = layout;
  const baseline = boardY + boardH * 0.66;
  const slotW = boardW / count;
  selected.forEach((piece, i) => {
    const targetX = boardX + slotW * (i + 0.5);
    const pieceW = (piece.maxX - piece.minX + 1) * cell;
    const pieceH = (piece.maxY - piece.minY + 1) * cell;
    const maxW = slotW * (count === 1 ? 0.7 : 0.72);
    const maxH = boardH * (count === 1 ? 0.48 : 0.38);
    const scale = clamp(Math.min(maxW / pieceW, maxH / pieceH, count === 1 ? 1.22 : 1), 0.4, count === 1 ? 1.22 : 1);
    const pieceWidth = pieceW * scale;
    const pieceHeight = pieceH * scale;
    const platePad = Math.max(7, cell * 0.44);
    const plateW = pieceWidth + platePad * 2;
    const plateH = pieceHeight + platePad * 1.65;
    const plateBottom = baseline + cell * 0.18;
    const plate = {
      x: targetX - plateW / 2,
      y: plateBottom - plateH,
      w: plateW,
      h: plateH,
      r: Math.max(9, cell * 0.52),
    };
    const targetY = plateBottom - platePad * 0.72 - pieceHeight / 2;
    const baseW = clamp(pieceWidth * 1.05 + cell * 1.05, cell * 2.3, slotW * 0.9);
    const baseH = clamp(cell * 0.72, 12, 24);
    const baseY = baseline + cell * 0.12;

    ctx.save();
    ctx.fillStyle = "rgba(38,36,43,0.16)";
    ctx.shadowColor = "rgba(38,36,43,0.16)";
    ctx.shadowBlur = 13;
    ctx.beginPath();
    ctx.ellipse(targetX, baseY + baseH * 1.05, baseW * 0.48, Math.max(4, baseH * 0.38), 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    drawAcrylicPlate(ctx, plate);
    drawFusedPieceTransformed(layout, piece, {
      scale,
      material: "wax",
      resolveCenter: (cellData) => ({
        x: targetX + (cellData.x - piece.centerX) * cell * scale,
        y: targetY + (cellData.y - piece.centerY) * cell * scale,
      }),
    });
    drawMaterialHighlight(ctx, { ...plate, alpha: 0.13 });

    ctx.save();
    const front = ctx.createLinearGradient(targetX, baseY, targetX, baseY + baseH);
    front.addColorStop(0, "#805538");
    front.addColorStop(1, "#71462f");
    ctx.fillStyle = front;
    roundedPath(ctx, targetX - baseW / 2, baseY, baseW, baseH, Math.min(8, baseH / 2));
    ctx.fill();
    const topFace = ctx.createLinearGradient(targetX - baseW / 2, baseY - baseH * 0.18, targetX + baseW / 2, baseY + baseH * 0.18);
    topFace.addColorStop(0, "#b88a67");
    topFace.addColorStop(0.5, "#9b6d4c");
    topFace.addColorStop(1, "#805538");
    ctx.fillStyle = topFace;
    ctx.beginPath();
    ctx.ellipse(targetX, baseY, baseW / 2, Math.max(4, baseH * 0.34), 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "rgba(61,37,25,0.72)";
    ctx.lineWidth = Math.max(1.4, cell * 0.08);
    ctx.beginPath();
    ctx.moveTo(targetX - Math.min(plateW * 0.38, baseW * 0.34), baseY - 0.5);
    ctx.lineTo(targetX + Math.min(plateW * 0.38, baseW * 0.34), baseY - 0.5);
    ctx.stroke();
    ctx.fillStyle = "rgba(255,255,255,0.18)";
    roundedPath(ctx, targetX - baseW * 0.4, baseY + baseH * 0.25, baseW * 0.8, Math.max(1.5, baseH * 0.14), Math.max(1, baseH * 0.08));
    ctx.fill();
    ctx.restore();
  });
}
