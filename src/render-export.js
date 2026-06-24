// Share-card image pipeline extracted from render.js.
//
// drawShareImage paints the pastel social card entirely on a caller-supplied
// canvas context (the only raster is the optional pre-decoded QR image). It pulls
// pure helpers from render-primitives.js and scoring from render-stats.js, and
// imports drawBead + the canvas font constants back from render.js (a call-time
// cycle, safe in the single esbuild IIFE — bindings are read when drawShareImage
// runs, not at module init). render.js re-exports sharePalette/drawShareImage so
// main.js keeps importing them from './render.js'.

import { state } from './state.js';
import { mixColor } from './color-utils.js';
import { currentBackgroundTheme } from './theme.js';
import { backgroundThemes, APP_VERSION } from './constants.js';
import {
  boardCols, boardRows, indexFor, targetAt, getTargetTotal, getPatternColors,
} from './pattern.js';
import { formatBuildTime } from './build-timer.js';
import { roundedPath, fitText, fusedColor } from './render-primitives.js';
import { finalGrade, placedCount } from './render-stats.js';
import { drawBead, CANVAS_CUTE_FONT, CANVAS_CLEAR_FONT } from './render.js';

// Footer slogans — one picked at random per export (cyber-perler casual voice).
const SHARE_SLOGANS = [
  "想拼就拼，走到哪拼到哪",
  "碎片时间，玩会赛博拼豆",
  "一部手机，随身的拼豆台",
];

// Derive a pastel share-card palette from the active background theme so the card
// reads as the same brand the user is looking at (守粉彩 + theme-following).
export function sharePalette() {
  const t = currentBackgroundTheme() || backgroundThemes.mist;
  const ink = mixColor(t.brandInk, "#2c2630", 0.5);
  return {
    pageA: t.pageBase,
    pageB: mixColor(t.pageBase, t.brand, 0.12),
    well: "#ffffff",
    wellEdge: t.brandTintStrong,
    chip: "rgba(255, 255, 255, 0.82)",
    chipEdge: t.brandTint,
    glow: t.brandTint,
    accent: t.brand,
    accentDeep: t.brandEdge,
    ink,
    muted: mixColor(ink, "#ffffff", 0.46),
  };
}

// Render the bead artwork (placed beads, or the target pattern before placing)
// centered inside a square region of side `size` at (x, y).
function drawShareGrid(ctx, x, y, size) {
  const pattern = state.selectedPattern;
  const cols = boardCols(pattern);
  const rows = boardRows(pattern);
  const cell = size / Math.max(cols, rows);
  const gx = x + (size - cell * cols) / 2;
  const gy = y + (size - cell * rows) / 2;
  const hasPlaced = placedCount() > 0;
  for (let py = 0; py < rows; py += 1) {
    for (let px = 0; px < cols; px += 1) {
      const index = indexFor(px, py);
      const code = hasPlaced ? state.placed[index] : targetAt(px, py);
      if (!code) continue;
      const cx = gx + px * cell + cell / 2;
      const cy = gy + py * cell + cell / 2;
      const heat = state.heat[index] || (state.phase === "finish" ? 66 : 0);
      if (heat > 34 || state.phase === "finish") {
        ctx.fillStyle = fusedColor(code, Math.max(heat, 58));
        roundedPath(ctx, gx + px * cell + cell * 0.04, gy + py * cell + cell * 0.04, cell * 0.92, cell * 0.92, cell * 0.18);
        ctx.fill();
      } else {
        drawBead(ctx, cx, cy, cell * 0.42, code, heat, false, null, index);
      }
    }
  }
}

// New pastel social card (A3 port). All chrome is canvas-drawn; the only raster is
// the optional pre-decoded QR Image (`qrImg`) composited in the footer. Caller is
// responsible for awaiting `document.fonts.ready` before drawing (LXGW gate).
export function drawShareImage(ctx, w, h, portrait, qrImg = null) {
  const p = sharePalette();
  const PAD = 80;
  const innerW = w - PAD * 2;

  // ── page wash ──────────────────────────────────────────────────────────────
  const bg = ctx.createLinearGradient(0, 0, w * 0.4, h);
  bg.addColorStop(0, p.pageA);
  bg.addColorStop(1, p.pageB);
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);
  const glowA = ctx.createRadialGradient(w * 0.84, h * 0.06, 0, w * 0.84, h * 0.06, 560);
  glowA.addColorStop(0, p.glow);
  glowA.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = glowA;
  ctx.fillRect(0, 0, w, h);
  const glowB = ctx.createRadialGradient(w * 0.06, h * 0.96, 0, w * 0.06, h * 0.96, 540);
  glowB.addColorStop(0, p.glow);
  glowB.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = glowB;
  ctx.fillRect(0, 0, w, h);

  // ── header: pattern name (hero) + grade badge ────────────────────────────────
  const top = 80;
  const badgeSize = 148;
  const badgeX = w - PAD - badgeSize;
  ctx.textBaseline = "alphabetic";
  // grade badge
  const badgeGrad = ctx.createLinearGradient(badgeX, top, badgeX, top + badgeSize);
  badgeGrad.addColorStop(0, p.accent);
  badgeGrad.addColorStop(1, p.accentDeep);
  ctx.fillStyle = badgeGrad;
  roundedPath(ctx, badgeX, top, badgeSize, badgeSize, 34);
  ctx.fill();
  ctx.fillStyle = "#ffffff";
  ctx.textAlign = "center";
  ctx.font = `84px ${CANVAS_CUTE_FONT}`;
  ctx.fillText(finalGrade(), badgeX + badgeSize / 2, top + 96);
  ctx.font = `500 24px ${CANVAS_CLEAR_FONT}`;
  ctx.globalAlpha = 0.92;
  ctx.fillText("评级", badgeX + badgeSize / 2, top + 128);
  ctx.globalAlpha = 1;
  // title — shrink to fit the space left of the badge
  const titleMaxW = badgeX - PAD - 28;
  ctx.textAlign = "left";
  ctx.fillStyle = p.ink;
  let titleSize = 92;
  ctx.font = `${titleSize}px ${CANVAS_CUTE_FONT}`;
  while (titleSize > 52 && ctx.measureText(state.selectedPattern.name).width > titleMaxW) {
    titleSize -= 4;
    ctx.font = `${titleSize}px ${CANVAS_CUTE_FONT}`;
  }
  ctx.fillText(fitText(ctx, state.selectedPattern.name, titleMaxW), PAD, top + badgeSize / 2 + titleSize * 0.34);

  // ── layout math (well flexes between header and the KPI/footer stack) ─────────
  const gap = 32;
  const kpiH = 116;
  const footerH = 210;
  const wellTop = top + badgeSize + 40;
  const wellBottom = h - 64 - footerH - gap - kpiH - gap;
  const wellH = wellBottom - wellTop;

  // ── well: white card holding the artwork + craft capsule ─────────────────────
  ctx.save();
  ctx.shadowColor = "rgba(49, 54, 68, 0.13)";
  ctx.shadowBlur = 48;
  ctx.shadowOffsetY = 24;
  ctx.fillStyle = p.well;
  roundedPath(ctx, PAD, wellTop, innerW, wellH, 40);
  ctx.fill();
  ctx.restore();
  ctx.strokeStyle = p.wellEdge;
  ctx.lineWidth = 2;
  roundedPath(ctx, PAD, wellTop, innerW, wellH, 40);
  ctx.stroke();
  // artwork centered in the well, inset by 40
  const wellPad = 40;
  const gridSize = Math.min(innerW - wellPad * 2, wellH - wellPad * 2, 600);
  drawShareGrid(ctx, PAD + (innerW - gridSize) / 2, wellTop + (wellH - gridSize) / 2, gridSize);
  // craft capsule, bottom-right of the well
  const craft = state.craft || state.selectedPattern.craft || "钥匙扣";
  ctx.font = `26px ${CANVAS_CUTE_FONT}`;
  const craftW = ctx.measureText(craft).width + 40;
  const craftH = 46;
  const craftX = PAD + innerW - 30 - craftW;
  const craftY = wellTop + wellH - 30 - craftH;
  ctx.fillStyle = p.chip;
  roundedPath(ctx, craftX, craftY, craftW, craftH, craftH / 2);
  ctx.fill();
  ctx.strokeStyle = p.chipEdge;
  ctx.lineWidth = 1.5;
  roundedPath(ctx, craftX, craftY, craftW, craftH, craftH / 2);
  ctx.stroke();
  ctx.fillStyle = p.accentDeep;
  ctx.textAlign = "center";
  ctx.fillText(craft, craftX + craftW / 2, craftY + craftH / 2 + 9);

  // ── KPI strip: 尺寸 / 颗数 / 色号 / 用时 ───────────────────────────────────────
  const kpis = [
    [`${boardCols(state.selectedPattern)}×${boardRows(state.selectedPattern)}`, "尺寸"],
    [`${getTargetTotal()}`, "颗数"],
    [`${getPatternColors().length}`, "色号"],
    [state.buildMs > 0 ? formatBuildTime(state.buildMs) : "—", "用时"],
  ];
  const kpiGap = 16;
  const kpiW = (innerW - kpiGap * 3) / 4;
  const kpiY = wellBottom + gap;
  kpis.forEach(([value, label], i) => {
    const kx = PAD + i * (kpiW + kpiGap);
    ctx.fillStyle = p.chip;
    roundedPath(ctx, kx, kpiY, kpiW, kpiH, 22);
    ctx.fill();
    ctx.strokeStyle = p.chipEdge;
    ctx.lineWidth = 1.5;
    roundedPath(ctx, kx, kpiY, kpiW, kpiH, 22);
    ctx.stroke();
    ctx.textAlign = "center";
    ctx.fillStyle = p.ink;
    ctx.font = `700 42px ${CANVAS_CLEAR_FONT}`;
    ctx.fillText(value, kx + kpiW / 2, kpiY + 60);
    ctx.fillStyle = p.muted;
    ctx.font = `26px ${CANVAS_CLEAR_FONT}`;
    ctx.fillText(label, kx + kpiW / 2, kpiY + 96);
  });

  // ── footer: QR + brand + random slogan + CTA ─────────────────────────────────
  const footTop = kpiY + kpiH + gap;
  const qrBox = footerH;
  // QR card
  ctx.save();
  ctx.shadowColor = "rgba(49, 54, 68, 0.10)";
  ctx.shadowBlur = 24;
  ctx.shadowOffsetY = 10;
  ctx.fillStyle = "#ffffff";
  roundedPath(ctx, PAD, footTop, qrBox, qrBox, 24);
  ctx.fill();
  ctx.restore();
  ctx.strokeStyle = p.chipEdge;
  ctx.lineWidth = 1.5;
  roundedPath(ctx, PAD, footTop, qrBox, qrBox, 24);
  ctx.stroke();
  const qrImgSize = 150;
  if (qrImg) {
    ctx.drawImage(qrImg, PAD + (qrBox - qrImgSize) / 2, footTop + 18, qrImgSize, qrImgSize);
  }
  ctx.fillStyle = p.ink;
  ctx.textAlign = "center";
  ctx.font = `26px ${CANVAS_CUTE_FONT}`;
  ctx.fillText("拼豆工坊", PAD + qrBox / 2, footTop + qrBox - 18);
  // sign block
  const signX = PAD + qrBox + 30;
  ctx.textAlign = "left";
  ctx.fillStyle = p.ink;
  ctx.font = `52px ${CANVAS_CUTE_FONT}`;
  ctx.fillText("拼豆工坊", signX, footTop + 56);
  // tiny version tag so Xiaohongshu readers can cite which build this is
  const brandW = ctx.measureText("拼豆工坊").width;
  ctx.fillStyle = p.muted;
  ctx.font = `22px ${CANVAS_CLEAR_FONT}`;
  ctx.fillText(`v${APP_VERSION}`, signX + brandW + 14, footTop + 56);
  ctx.fillStyle = p.accentDeep;
  ctx.font = `34px ${CANVAS_CUTE_FONT}`;
  const slogan = SHARE_SLOGANS[Math.floor(Math.random() * SHARE_SLOGANS.length)];
  ctx.fillText(slogan, signX, footTop + 108);
  ctx.fillStyle = p.muted;
  ctx.font = `26px ${CANVAS_CLEAR_FONT}`;
  ctx.fillText("扫码 · 开始你的拼豆", signX, footTop + 150);

  ctx.textBaseline = "alphabetic";
  ctx.textAlign = "left";
}
