import { clamp } from "./color-utils.js";

export function normalizeGridCursor(cursor, cols, rows = cols) {
  const maxX = Math.max(0, Number(cols) - 1);
  const maxY = Math.max(0, Number(rows) - 1);
  return {
    x: clamp(Math.round(Number(cursor?.x) || 0), 0, maxX),
    y: clamp(Math.round(Number(cursor?.y) || 0), 0, maxY),
  };
}

export function moveGridCursor(cursor, key, cols, rows = cols) {
  const next = normalizeGridCursor(cursor, cols, rows);
  if (key === "ArrowLeft") next.x -= 1;
  if (key === "ArrowRight") next.x += 1;
  if (key === "ArrowUp") next.y -= 1;
  if (key === "ArrowDown") next.y += 1;
  return normalizeGridCursor(next, cols, rows);
}

export function keyboardGridAction(key) {
  if (key === " " || key === "Enter") return "place";
  if (key === "Escape") return "clear";
  return null;
}
