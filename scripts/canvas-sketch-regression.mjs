// Canvas sketch-language regression.
// Part 1 (this task): unit-checks sketchRect() against a recording stub ctx —
// hard offset shadow first, flat body fill, inset ink outline, no curves.
// Part 2 (final task) adds the gradient/shadowBlur source-scan allowlist.
import assert from "node:assert/strict";
import {
  sketchRect, SKETCH_INK, SKETCH_INK_SOFT, SKETCH_PAPER,
  SKETCH_BW, SKETCH_SHADOW,
} from "../src/sketch-style.js";

function stubCtx() {
  const ops = [];
  return {
    ops,
    set fillStyle(v) { ops.push(["fillStyle", v]); },
    set strokeStyle(v) { ops.push(["strokeStyle", v]); },
    set lineWidth(v) { ops.push(["lineWidth", v]); },
    fillRect(...a) { ops.push(["fillRect", ...a]); },
    strokeRect(...a) { ops.push(["strokeRect", ...a]); },
    arc() { ops.push(["arc"]); },
    quadraticCurveTo() { ops.push(["quadraticCurveTo"]); },
  };
}

// Token mirror values must not drift from src/styles/tokens.css.
assert.equal(SKETCH_INK, "#26242b");
assert.equal(SKETCH_INK_SOFT, "rgba(38, 36, 43, 0.55)");
assert.equal(SKETCH_BW, 2);
assert.equal(SKETCH_SHADOW, 3);

// Default draw order: shadow block at +3,+3 → paper body → inset ink outline.
{
  const ctx = stubCtx();
  sketchRect(ctx, 10, 20, 100, 50);
  const fills = ctx.ops.filter(([op]) => op === "fillRect");
  assert.deepEqual(fills[0], ["fillRect", 13, 23, 100, 50], "hard shadow first, offset by SKETCH_SHADOW");
  assert.deepEqual(fills[1], ["fillRect", 10, 20, 100, 50], "flat body second");
  const stroke = ctx.ops.find(([op]) => op === "strokeRect");
  assert.deepEqual(stroke, ["strokeRect", 11, 21, 98, 48], "ink outline inset by bw/2");
  assert.equal(ctx.ops.find(([op, v]) => op === "fillStyle" && v === SKETCH_INK_SOFT)[1], SKETCH_INK_SOFT);
  assert.equal(ctx.ops.find(([op, v]) => op === "fillStyle" && v === SKETCH_PAPER)[1], SKETCH_PAPER);
  assert.ok(!ctx.ops.some(([op]) => op === "arc" || op === "quadraticCurveTo"), "square corners only");
}

// shadow: 0 skips the shadow block; fill: null skips the body.
{
  const ctx = stubCtx();
  sketchRect(ctx, 0, 0, 10, 10, { shadow: 0, fill: null });
  assert.equal(ctx.ops.filter(([op]) => op === "fillRect").length, 0);
  assert.equal(ctx.ops.filter(([op]) => op === "strokeRect").length, 1);
}

console.log("canvas-sketch Part 1 (sketchRect unit): OK");

// Part 2: pin the allowed gradient/shadowBlur call sites. Props must stay
// flat; only gameplay-feedback and content-sheen effects may keep gradients.
// If you add a legitimate functional gradient, update EXPECTED with a comment.
import { readFileSync } from "node:fs";
const EXPECTED = {
  // file: [gradients, shadowBlurs]
  // render.js: lamp cord fade (linear) + lamp glow (radial) + fusion bridge (linear) + scraper trail (linear) = 4; shadowBlur = 1 (drawSpillMarker fallen bead)
  "src/render.js": [4, 1],
  // render-fusion.js: sheen (linear) + bridge (linear) = 2; no shadowBlur
  "src/render-fusion.js": [2, 0],
  // render-inspect.js: bridge (linear) = 1; no shadowBlur
  "src/render-inspect.js": [1, 0],
  // render-finish.js: drawMaterialHighlight (linear) = 1; no shadowBlur
  "src/render-finish.js": [1, 0],
  // render-export.js: artwork sheen (linear) = 1; no shadowBlur
  "src/render-export.js": [1, 0],
  // render-tray.js: fully flat — 0 gradients, 0 shadowBlur
  "src/render-tray.js": [0, 0],
  // board-skin.js: fully flat — 0 gradients, 0 shadowBlur
  "src/board-skin.js": [0, 0],
  // draw.js: fully flat — 0 gradients, 0 shadowBlur
  "src/draw.js": [0, 0],
};
for (const [file, [grads, blurs]] of Object.entries(EXPECTED)) {
  const src = readFileSync(new URL(`../${file}`, import.meta.url), "utf8");
  const g = (src.match(/create(?:Linear|Radial)Gradient/g) || []).length;
  const b = (src.match(/shadowBlur/g) || []).length;
  assert.equal(g, grads, `${file}: gradient count drifted (${g} vs ${grads})`);
  assert.equal(b, blurs, `${file}: shadowBlur count drifted (${b} vs ${blurs})`);
}

console.log("canvas-sketch Part 2 (gradient/shadowBlur allowlist): OK");
console.log("canvas-sketch regression: OK");
