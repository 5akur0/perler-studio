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

console.log("canvas-sketch regression: OK");
