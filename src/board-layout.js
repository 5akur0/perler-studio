export function tileKey(tx, ty) { return `${tx},${ty}`; }

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
