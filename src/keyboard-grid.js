import { clamp } from "./color-utils.js";

export function normalizeGridCursor(cursor, size) {
  const max = Math.max(0, Number(size) - 1);
  return {
    x: clamp(Math.round(Number(cursor?.x) || 0), 0, max),
    y: clamp(Math.round(Number(cursor?.y) || 0), 0, max),
  };
}

export function moveGridCursor(cursor, key, size) {
  const next = normalizeGridCursor(cursor, size);
  if (key === "ArrowLeft") next.x -= 1;
  if (key === "ArrowRight") next.x += 1;
  if (key === "ArrowUp") next.y -= 1;
  if (key === "ArrowDown") next.y += 1;
  return normalizeGridCursor(next, size);
}

export function keyboardGridAction(key) {
  if (key === " " || key === "Enter") return "place";
  if (key === "Escape") return "clear";
  return null;
}
