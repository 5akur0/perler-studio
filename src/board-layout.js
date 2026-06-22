export function tileKey(tx, ty) { return `${tx},${ty}`; }

export function shouldUseBoardPegCache(scale) {
  return Number.isFinite(scale) && scale <= 1.001;
}

export function visibleBoardCellRange(layout, view, cols, rows) {
  const scale = Math.max(0.0001, Number(view?.scale) || 1);
  const cx = Number(view?.cx) || 0;
  const cy = Number(view?.cy) || 0;
  const panX = Number(view?.panX) || 0;
  const panY = Number(view?.panY) || 0;
  const cell = Math.max(0.0001, Number(layout?.cell) || 1);
  const boardX = Number(layout?.boardX) || 0;
  const boardY = Number(layout?.boardY) || 0;
  const viewportW = Math.max(0, Number(layout?.w) || 0);
  const viewportH = Math.max(0, Number(layout?.h) || 0);
  const columnCount = Math.max(0, Number.parseInt(cols, 10) || 0);
  const rowCount = Math.max(0, Number.parseInt(rows, 10) || 0);
  const localLeft = (0 - cx - panX) / scale + cx;
  const localRight = (viewportW - cx - panX) / scale + cx;
  const localTop = (0 - cy - panY) / scale + cy;
  const localBottom = (viewportH - cy - panY) / scale + cy;
  const clampIndex = (value, max) => Math.min(max, Math.max(0, value));

  return {
    startCol: clampIndex(Math.floor((localLeft - boardX) / cell), columnCount),
    endCol: clampIndex(Math.ceil((localRight - boardX) / cell), columnCount),
    startRow: clampIndex(Math.floor((localTop - boardY) / cell), rowCount),
    endRow: clampIndex(Math.ceil((localBottom - boardY) / cell), rowCount),
  };
}

function normalizedRows(rows, width, height) {
  return Array.from({ length: height }, (_, y) => String(rows?.[y] || "").slice(0, width).padEnd(width, "."));
}

export function growGridByTile(grid, side, tileSize) {
  const width = Number.parseInt(grid?.width, 10);
  const height = Number.parseInt(grid?.height, 10);
  const tile = Number.parseInt(tileSize, 10);
  if (!Number.isFinite(width) || !Number.isFinite(height) || width <= 0 || height <= 0 || !Number.isFinite(tile) || tile <= 0) {
    throw new Error("Board dimensions must be positive integers.");
  }

  let nextWidth = width;
  let nextHeight = height;
  let offsetX = 0;
  let offsetY = 0;
  if (side === "right") nextWidth += tile;
  else if (side === "bottom") nextHeight += tile;
  else if (side === "left") {
    nextWidth += tile;
    offsetX = tile;
  } else if (side === "top") {
    nextHeight += tile;
    offsetY = tile;
  } else {
    throw new Error(`Unknown board side: ${side}`);
  }

  const sourceRows = normalizedRows(grid.rows, width, height);
  const rows = Array.from({ length: nextHeight }, (_, y) => {
    const sourceY = y - offsetY;
    return Array.from({ length: nextWidth }, (_, x) => {
      const sourceX = x - offsetX;
      return sourceY >= 0 && sourceY < height && sourceX >= 0 && sourceX < width
        ? sourceRows[sourceY][sourceX]
        : ".";
    }).join("");
  });

  return { width: nextWidth, height: nextHeight, rows };
}

export function fitGridToBoardTiles(rows, sourceWidth, sourceHeight, tileSize, maxDimension) {
  const tile = Number.parseInt(tileSize, 10);
  const max = Number.parseInt(maxDimension, 10);
  const rawWidth = Math.max(1, Number.parseInt(sourceWidth, 10) || 1);
  const rawHeight = Math.max(1, Number.parseInt(sourceHeight, 10) || 1);
  const width = Math.min(max, Math.max(tile, Math.ceil(rawWidth / tile) * tile));
  const height = Math.min(max, Math.max(tile, Math.ceil(rawHeight / tile) * tile));
  const offsetX = Math.floor((width - rawWidth) / 2);
  const offsetY = Math.floor((height - rawHeight) / 2);

  const fittedRows = Array.from({ length: height }, (_, y) => {
    const sourceY = y - offsetY;
    const sourceRow = sourceY >= 0 && sourceY < rawHeight ? String(rows?.[sourceY] || "") : "";
    return Array.from({ length: width }, (_, x) => {
      const sourceX = x - offsetX;
      return sourceX >= 0 && sourceX < rawWidth ? (sourceRow[sourceX] || ".") : ".";
    }).join("");
  });

  return { width, height, rows: fittedRows };
}
