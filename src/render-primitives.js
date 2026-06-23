// Pure canvas drawing/text primitives extracted from render.js.
//
// These are leaf helpers: they take an explicit `ctx` (or use the shared `scene`
// context) and depend only on color/palette utilities — never on render.js. This
// one-directional dependency lets render.js import them back for its many internal
// call-sites without creating an import cycle. render.js re-exports them so
// existing consumers keep importing from './render.js'.

import { scene } from './dom.js';
import { palette } from './palette.js';
import { clamp, mixColor } from './color-utils.js';

export function softShadow(ctx, {
  blur = 20,
  dy = 10,
  color = "rgba(38,36,43,0.14)",
} = {}) {
  ctx.shadowColor = color;
  ctx.shadowBlur = blur;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = dy;
}

export function fusedColor(code, heat) {
  const base = palette[code] || "#999";
  // Only beads that are really cooked start tinting — real perler beads keep
  // their color through most of the iron pass and only yellow when scorched.
  const hotAmount = clamp((heat - 105) / 60, 0, 0.34);
  return heat > 105 ? mixColor(base, "#e8a472", hotAmount) : base;
}

export function roundedRect(x, y, w, h, r) {
  const ctx = scene;
  const radius = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + w - radius, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + radius);
  ctx.lineTo(x + w, y + h - radius);
  ctx.quadraticCurveTo(x + w, y + h, x + w - radius, y + h);
  ctx.lineTo(x + radius, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
}

export function roundedPath(ctx, x, y, w, h, r) {
  const radius = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + w - radius, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + radius);
  ctx.lineTo(x + w, y + h - radius);
  ctx.quadraticCurveTo(x + w, y + h, x + w - radius, y + h);
  ctx.lineTo(x + radius, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
}

export function wrapText(text, x, y, maxWidth, lineHeight) {
  const ctx = scene;
  let line = "";
  const chars = [...text];
  chars.forEach((char) => {
    const test = line + char;
    if (ctx.measureText(test).width > maxWidth && line) {
      ctx.fillText(line, x, y);
      line = char;
      y += lineHeight;
    } else {
      line = test;
    }
  });
  if (line) ctx.fillText(line, x, y);
}

export function fitText(ctx, text, maxWidth) {
  if (maxWidth <= 0) return "";
  if (ctx.measureText(text).width <= maxWidth) return text;
  const ellipsis = "…";
  let out = text;
  while (out.length > 0 && ctx.measureText(`${out}${ellipsis}`).width > maxWidth) {
    out = out.slice(0, -1);
  }
  return out ? `${out}${ellipsis}` : ellipsis;
}
