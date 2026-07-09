// Canvas-side sketch-language constants + primitive (2026-07 redesign).
//
// Pure leaf module — no imports, no DOM — so Node regression scripts can load
// it directly and any render module can import it without cycles.
// Values mirror src/styles/tokens.css; keep the two files in sync:
//   SKETCH_INK        = --ink / --ink-line
//   SKETCH_INK_SOFT   = --ink-line-soft (55% ink — hard-shadow color)
//   SKETCH_BW / _CTL  = --sketch-bw / --sketch-bw-ctl
//   SKETCH_SHADOW(_SM)= --sketch-shadow / --sketch-shadow-sm offsets

export const SKETCH_INK = "#26242b";
export const SKETCH_INK_SOFT = "rgba(38, 36, 43, 0.55)";
export const SKETCH_PAPER = "#ffffff";
export const SKETCH_BW = 2;
export const SKETCH_BW_CTL = 1.5;
export const SKETCH_SHADOW = 3;
export const SKETCH_SHADOW_SM = 2;

// Draw a prop shell in the sketch language: hard offset shadow block (solid
// ink, zero blur), square-cornered flat fill, solid ink outline inset by half
// the border width (border-box, like the CSS panels). Replaces gradient faces
// and ctx.shadowBlur soft shadows on canvas props. All args are CSS px — the
// scene contexts are already dpr-scaled.
export function sketchRect(ctx, x, y, w, h, {
  fill = SKETCH_PAPER,
  bw = SKETCH_BW,
  shadow = SKETCH_SHADOW,
  ink = SKETCH_INK,
  shadowColor = SKETCH_INK_SOFT,
} = {}) {
  if (shadow > 0) {
    ctx.fillStyle = shadowColor;
    ctx.fillRect(x + shadow, y + shadow, w, h);
  }
  if (fill) {
    ctx.fillStyle = fill;
    ctx.fillRect(x, y, w, h);
  }
  if (bw > 0) {
    ctx.strokeStyle = ink;
    ctx.lineWidth = bw;
    ctx.strokeRect(x + bw / 2, y + bw / 2, w - bw, h - bw);
  }
}
