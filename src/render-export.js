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
import { SKETCH_INK, SKETCH_INK_SOFT } from './sketch-style.js';

// Poster-scale sketch constants: ≈2px border / 5px --sketch-shadow-lg at ~2× poster resolution.
const POSTER_BW = 4;
const POSTER_SHADOW = 10;

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
export function drawShareImage(ctx, w, h, portrait, qrImg = null, variant = "card", logoImg = null) {
  const p = sharePalette();
  const PAD = 80;
  const innerW = w - PAD * 2;

  // Sketch card: plain paper ground — the artwork and flat brand shapes carry
  // the color (no page wash, no corner glows).
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, w, h);

  // ── clean variant: artwork-as-object, no stats chrome ────────────────────────
  // For people who just want a clean pixel-art post. One big well, the artwork,
  // a whisper-quiet brand watermark + optional corner QR. No badge/KPI/slogan.
  if (variant === "clean") {
    drawCleanVariant(ctx, w, h, PAD, innerW, p, qrImg, logoImg);
    ctx.textBaseline = "alphabetic";
    ctx.textAlign = "left";
    return;
  }

  // ── header: pattern name (hero) + grade badge ────────────────────────────────
  const top = 80;
  const badgeSize = 148;
  const badgeX = w - PAD - badgeSize;
  ctx.textBaseline = "alphabetic";
  // grade badge
  ctx.fillStyle = SKETCH_INK_SOFT;
  ctx.fillRect(badgeX + POSTER_SHADOW, top + POSTER_SHADOW, badgeSize, badgeSize);
  ctx.fillStyle = p.accent;
  ctx.fillRect(badgeX, top, badgeSize, badgeSize);
  ctx.strokeStyle = SKETCH_INK;
  ctx.lineWidth = POSTER_BW;
  ctx.strokeRect(badgeX + POSTER_BW / 2, top + POSTER_BW / 2, badgeSize - POSTER_BW, badgeSize - POSTER_BW);
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
  ctx.fillStyle = SKETCH_INK_SOFT;
  ctx.fillRect(PAD + POSTER_SHADOW, wellTop + POSTER_SHADOW, innerW, wellH);
  ctx.fillStyle = p.well;
  ctx.fillRect(PAD, wellTop, innerW, wellH);
  ctx.strokeStyle = SKETCH_INK;
  ctx.lineWidth = POSTER_BW;
  ctx.strokeRect(PAD + POSTER_BW / 2, wellTop + POSTER_BW / 2, innerW - POSTER_BW, wellH - POSTER_BW);
  // artwork centered in the well, inset by 40
  const wellPad = 40;
  const gridSize = Math.min(innerW - wellPad * 2, wellH - wellPad * 2, 600);
  const artX = PAD + (innerW - gridSize) / 2;
  const artY = wellTop + (wellH - gridSize) / 2;
  drawShareGrid(ctx, artX, artY, gridSize);
  // Finished-keepsake cue: a soft acrylic sheen laminating the artwork so it
  // reads as a made object (钥匙扣 / 杯垫 / 摆件), not a flat grid. 原版 stays matte.
  const craftName = state.craft || state.selectedPattern.craft || "";
  if (craftName && craftName !== "原版") {
    ctx.save();
    roundedPath(ctx, artX, artY, gridSize, gridSize, 26);
    ctx.clip();
    const sheen = ctx.createLinearGradient(artX, artY, artX + gridSize * 0.7, artY + gridSize * 0.62);
    sheen.addColorStop(0, "rgba(255,255,255,0.26)");
    sheen.addColorStop(0.38, "rgba(255,255,255,0.09)");
    sheen.addColorStop(0.6, "rgba(255,255,255,0)");
    ctx.fillStyle = sheen;
    ctx.fillRect(artX, artY, gridSize, gridSize);
    ctx.restore();
  }
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
    // Softer than a stats dashboard: warm brand-tint pills, label riding above a
    // lighter-weight value, so the strip reads as a cozy keepsake tag, not a KPI row.
    ctx.fillStyle = p.glow;
    roundedPath(ctx, kx, kpiY, kpiW, kpiH, kpiH / 2);
    ctx.fill();
    ctx.textAlign = "center";
    ctx.fillStyle = p.accentDeep;
    ctx.font = `24px ${CANVAS_CLEAR_FONT}`;
    ctx.fillText(label, kx + kpiW / 2, kpiY + 42);
    ctx.fillStyle = p.ink;
    ctx.font = `600 40px ${CANVAS_CLEAR_FONT}`;
    ctx.fillText(value, kx + kpiW / 2, kpiY + 88);
  });

  // ── footer: QR + brand + random slogan + CTA ─────────────────────────────────
  const footTop = kpiY + kpiH + gap;
  const qrBox = footerH;
  // QR card
  ctx.fillStyle = SKETCH_INK_SOFT;
  ctx.fillRect(PAD + POSTER_SHADOW / 2, footTop + POSTER_SHADOW / 2, qrBox, qrBox);
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(PAD, footTop, qrBox, qrBox);
  ctx.strokeStyle = SKETCH_INK;
  ctx.lineWidth = POSTER_BW / 2;
  ctx.strokeRect(PAD + POSTER_BW / 4, footTop + POSTER_BW / 4, qrBox - POSTER_BW / 2, qrBox - POSTER_BW / 2);
  const qrImgSize = 150;
  if (qrImg) {
    ctx.drawImage(qrImg, PAD + (qrBox - qrImgSize) / 2, footTop + 18, qrImgSize, qrImgSize);
  }
  ctx.fillStyle = p.ink;
  ctx.textAlign = "center";
  ctx.font = `26px ${CANVAS_CUTE_FONT}`;
  ctx.fillText("拼豆工坊", PAD + qrBox / 2, footTop + qrBox - 18);
  // sign block: SVG logo mark badges the wordmark, then version / slogan / CTA
  const blockX = PAD + qrBox + 30;
  ctx.textAlign = "left";
  let textX = blockX;
  if (logoImg) {
    const logoSize = 60;
    ctx.drawImage(logoImg, blockX, footTop + 4, logoSize, logoSize);
    textX = blockX + logoSize + 18;
  }
  ctx.fillStyle = p.ink;
  ctx.font = `52px ${CANVAS_CUTE_FONT}`;
  ctx.fillText("拼豆工坊", textX, footTop + 56);
  // tiny version tag so Xiaohongshu readers can cite which build this is
  const brandW = ctx.measureText("拼豆工坊").width;
  ctx.fillStyle = p.muted;
  ctx.font = `22px ${CANVAS_CLEAR_FONT}`;
  ctx.fillText(`v${APP_VERSION}`, textX + brandW + 14, footTop + 56);
  ctx.fillStyle = p.accentDeep;
  ctx.font = `34px ${CANVAS_CUTE_FONT}`;
  const slogan = SHARE_SLOGANS[Math.floor(Math.random() * SHARE_SLOGANS.length)];
  ctx.fillText(slogan, textX, footTop + 108);
  ctx.fillStyle = p.muted;
  ctx.font = `26px ${CANVAS_CLEAR_FONT}`;
  ctx.fillText("扫码 · 开始你的拼豆", textX, footTop + 150);

  ctx.textBaseline = "alphabetic";
  ctx.textAlign = "left";
}

// Minimal "纯作品图" layout: a single centered white well holding the artwork,
// with a quiet brand watermark and (if available) a small corner QR. Shares the
// flat paper ground painted by the caller. Square canvases look best here (1080×1080).
function drawCleanVariant(ctx, w, h, PAD, innerW, p, qrImg, logoImg = null) {
  const wellTop = PAD;
  const wellBottom = h - PAD;
  const wellH = wellBottom - wellTop;

  ctx.fillStyle = SKETCH_INK_SOFT;
  ctx.fillRect(PAD + POSTER_SHADOW, wellTop + POSTER_SHADOW, innerW, wellH);
  ctx.fillStyle = p.well;
  ctx.fillRect(PAD, wellTop, innerW, wellH);
  ctx.strokeStyle = SKETCH_INK;
  ctx.lineWidth = POSTER_BW;
  ctx.strokeRect(PAD + POSTER_BW / 2, wellTop + POSTER_BW / 2, innerW - POSTER_BW, wellH - POSTER_BW);

  // artwork centered, leaving a bottom band for the watermark
  const wellPad = 56;
  const bottomBand = 64;
  const gridSize = Math.min(innerW - wellPad * 2, wellH - wellPad * 2 - bottomBand);
  drawShareGrid(
    ctx,
    PAD + (innerW - gridSize) / 2,
    wellTop + (wellH - bottomBand - gridSize) / 2,
    gridSize,
  );

  // quiet brand watermark (SVG logo + wordmark), centered in the bottom band
  const markY = wellBottom - 34;
  ctx.textBaseline = "alphabetic";
  ctx.font = `28px ${CANVAS_CUTE_FONT}`;
  const markText = "拼豆工坊 · 扫码同款";
  const markTextW = ctx.measureText(markText).width;
  const markLogo = logoImg ? 34 : 0;
  const markGap = logoImg ? 12 : 0;
  let markX = (w - (markLogo + markGap + markTextW)) / 2;
  if (logoImg) {
    ctx.drawImage(logoImg, markX, markY - 27, markLogo, markLogo);
    markX += markLogo + markGap;
  }
  ctx.textAlign = "left";
  ctx.fillStyle = p.muted;
  ctx.fillText(markText, markX, markY);

  // small corner QR (optional)
  if (qrImg) {
    const qrSize = 96;
    ctx.globalAlpha = 0.92;
    ctx.drawImage(qrImg, PAD + innerW - qrSize - 28, wellBottom - qrSize - 28, qrSize, qrSize);
    ctx.globalAlpha = 1;
  }
}
