import { mixColor } from './color-utils.js';

export function traceBoardPath(ctx, layout, radius = 6) {
  const boardW = layout.boardW || layout.boardSize;
  const boardH = layout.boardH || layout.boardSize;
  const r = Math.min(radius, boardW / 2, boardH / 2);
  const { boardX, boardY } = layout;
  ctx.beginPath();
  ctx.moveTo(boardX + r, boardY);
  ctx.lineTo(boardX + boardW - r, boardY);
  ctx.quadraticCurveTo(boardX + boardW, boardY, boardX + boardW, boardY + r);
  ctx.lineTo(boardX + boardW, boardY + boardH - r);
  ctx.quadraticCurveTo(boardX + boardW, boardY + boardH, boardX + boardW - r, boardY + boardH);
  ctx.lineTo(boardX + r, boardY + boardH);
  ctx.quadraticCurveTo(boardX, boardY + boardH, boardX, boardY + boardH - r);
  ctx.lineTo(boardX, boardY + r);
  ctx.quadraticCurveTo(boardX, boardY, boardX + r, boardY);
}

export function drawBoardGuides(ctx, layout, cols, rows, scale = 1) {
  const { boardX, boardY, cell } = layout;
  const boardW = layout.boardW || layout.boardSize;
  const boardH = layout.boardH || layout.boardSize;
  ctx.save();
  const stroke = (n, vertical) => {
    const major = n % 10 === 0;
    ctx.strokeStyle = major ? "rgba(70, 84, 96, 0.5)" : "rgba(70, 84, 96, 0.26)";
    ctx.lineWidth = major ? Math.max(1.2 / scale, cell * 0.07) : 1 / scale;
    ctx.setLineDash(major ? [] : [cell * 0.32, cell * 0.32]);
    ctx.beginPath();
    if (vertical) {
      const px = boardX + n * cell;
      ctx.moveTo(px, boardY);
      ctx.lineTo(px, boardY + boardH);
    } else {
      const py = boardY + n * cell;
      ctx.moveTo(boardX, py);
      ctx.lineTo(boardX + boardW, py);
    }
    ctx.stroke();
  };
  for (let x = 5; x < cols; x += 5) stroke(x, true);
  for (let y = 5; y < rows; y += 5) stroke(y, false);
  ctx.setLineDash([]);
  ctx.restore();
}

export function drawBoardSkin(ctx, layout, options = {}) {
  const {
    cols,
    rows,
    brand = "#57b8a7",
    shadow = true,
    guides = true,
    frameInset = 14,
    outerRadius = 8,
    innerRadius = 6,
  } = options;
  const { boardX, boardY, cell } = layout;
  const boardW = layout.boardW || layout.boardSize;
  const boardH = layout.boardH || layout.boardSize;

  ctx.save();
  if (shadow) {
    ctx.shadowColor = "rgba(38, 36, 43, 0.15)";
    ctx.shadowBlur = 26;
    ctx.shadowOffsetY = 14;
  }
  const baseGradient = ctx.createLinearGradient(
    boardX,
    boardY - frameInset,
    boardX,
    boardY + boardH + frameInset,
  );
  baseGradient.addColorStop(0, "#f6f8fa");
  baseGradient.addColorStop(1, "#d9e0e4");
  ctx.fillStyle = baseGradient;
  traceBoardPath(ctx, {
    boardX: boardX - frameInset,
    boardY: boardY - frameInset,
    boardW: boardW + frameInset * 2,
    boardH: boardH + frameInset * 2,
  }, outerRadius);
  ctx.fill();
  ctx.shadowColor = "transparent";
  ctx.strokeStyle = "rgba(108, 118, 130, 0.34)";
  ctx.stroke();

  ctx.fillStyle = "#fbfcfd";
  traceBoardPath(ctx, layout, innerRadius);
  ctx.fill();
  ctx.strokeStyle = "rgba(70, 84, 96, 0.18)";
  ctx.stroke();

  ctx.save();
  traceBoardPath(ctx, layout, innerRadius);
  ctx.clip();
  const tintLight = mixColor("#ffffff", brand, 0.06);
  const tintDark = mixColor("#ffffff", brand, 0.15);
  for (let by = 0; by * 10 < rows; by += 1) {
    for (let bx = 0; bx * 10 < cols; bx += 1) {
      ctx.fillStyle = (bx + by) % 2 ? tintDark : tintLight;
      const px = boardX + bx * 10 * cell;
      const py = boardY + by * 10 * cell;
      const pw = Math.min(10, cols - bx * 10) * cell;
      const ph = Math.min(10, rows - by * 10) * cell;
      ctx.fillRect(px, py, pw, ph);
    }
  }
  ctx.restore();

  if (guides) drawBoardGuides(ctx, layout, cols, rows);
  ctx.restore();
}

export function pixelPatternPreviewLayout(width, height, cols, rows, options = {}) {
  const minSide = Math.max(1, Math.min(width, height));
  const compact = options.compact ?? minSide < 120;
  const frameInset = options.frameInset
    ?? (compact ? Math.max(2, Math.min(5, minSide * 0.055)) : Math.max(7, Math.min(14, minSide * 0.035)));
  const padding = options.padding
    ?? (compact ? Math.max(1, minSide * 0.025) : Math.max(8, minSide * 0.025));
  const availableW = Math.max(1, width - (padding + frameInset) * 2);
  const availableH = Math.max(1, height - (padding + frameInset) * 2);
  const cell = Math.max(0.01, Math.min(availableW / cols, availableH / rows));
  const boardW = cell * cols;
  const boardH = cell * rows;
  return {
    boardX: (width - boardW) / 2,
    boardY: (height - boardH) / 2,
    boardW,
    boardH,
    boardSize: Math.max(boardW, boardH),
    cell,
    frameInset,
    compact,
  };
}

export function drawPixelPatternPreview(ctx, options = {}) {
  const {
    width,
    height,
    cols,
    rows,
    pixels = [],
    colors = {},
    brand = "#57b8a7",
    table = ["#eef2f4", "#e4eceb", "#d7e2e0"],
  } = options;
  const layout = pixelPatternPreviewLayout(width, height, cols, rows, options);
  const showGuides = options.guides ?? layout.cell >= 4;
  const showCellGrid = options.cellGrid ?? layout.cell >= 2.5;
  const shadow = options.shadow ?? !layout.compact;

  ctx.save();
  const background = ctx.createLinearGradient(0, 0, width, height);
  background.addColorStop(0, table[0]);
  background.addColorStop(0.55, table[1] || table[0]);
  background.addColorStop(1, table[2] || table[1] || table[0]);
  ctx.fillStyle = background;
  ctx.fillRect(0, 0, width, height);

  drawBoardSkin(ctx, layout, {
    cols,
    rows,
    brand,
    shadow,
    guides: false,
    frameInset: layout.frameInset,
    outerRadius: layout.compact ? Math.max(2, layout.frameInset * 0.8) : 8,
    innerRadius: layout.compact ? Math.max(1, layout.frameInset * 0.5) : 6,
  });

  ctx.save();
  traceBoardPath(ctx, layout, layout.compact ? Math.max(1, layout.frameInset * 0.5) : 6);
  ctx.clip();
  for (let y = 0; y < rows; y += 1) {
    const row = pixels[y] || "";
    for (let x = 0; x < cols; x += 1) {
      const code = row[x] || ".";
      if (code === ".") continue;
      const px = layout.boardX + x * layout.cell;
      const py = layout.boardY + y * layout.cell;
      ctx.fillStyle = colors[code] || "#9aa4b3";
      ctx.fillRect(px, py, layout.cell, layout.cell);
    }
  }
  if (showCellGrid) {
    ctx.strokeStyle = "rgba(70, 84, 96, 0.13)";
    ctx.lineWidth = Math.min(1, Math.max(0.5, layout.cell * 0.06));
    for (let x = 1; x < cols; x += 1) {
      const px = layout.boardX + x * layout.cell;
      ctx.beginPath();
      ctx.moveTo(px, layout.boardY);
      ctx.lineTo(px, layout.boardY + layout.boardH);
      ctx.stroke();
    }
    for (let y = 1; y < rows; y += 1) {
      const py = layout.boardY + y * layout.cell;
      ctx.beginPath();
      ctx.moveTo(layout.boardX, py);
      ctx.lineTo(layout.boardX + layout.boardW, py);
      ctx.stroke();
    }
  }
  ctx.restore();
  if (showGuides) drawBoardGuides(ctx, layout, cols, rows);
  ctx.restore();
  return layout;
}
