import assert from "node:assert/strict";
import fs from "node:fs";

import { fadedPrintColor } from "../src/color-utils.js";

function rgbParts(value) {
  const match = value.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
  assert(match, `expected rgb() color, got ${value}`);
  return match.slice(1).map(Number);
}

const [blackR, blackG, blackB] = rgbParts(fadedPrintColor("#000000"));
assert(
  blackR >= 130 && blackR <= 155 && blackG >= 124 && blackG <= 148 && blackB >= 108 && blackB <= 136,
  `printed black should become a visible faded warm gray, got ${fadedPrintColor("#000000")}`,
);

const [redR, redG, redB] = rgbParts(fadedPrintColor("#e7645f"));
assert(
  Math.max(redR, redG, redB) - Math.min(redR, redG, redB) <= 78,
  `printed red should be visibly desaturated, got ${fadedPrintColor("#e7645f")}`,
);

const renderSource = fs.readFileSync(new URL("../src/render.js", import.meta.url), "utf8");
assert.match(
  renderSource,
  /const CANVAS_CUTE_FONT = /,
  "reference sheet title font constant should be defined before canvas rendering uses it",
);

assert.match(
  renderSource,
  /ctx\.fillStyle = fadedPrintColor\(palette\[code\]\);[\s\S]*?ctx\.arc\(x \+ 4/,
  "reference sheet legend dots should use the same faded print color as the chart",
);

assert.match(
  renderSource,
  /ctx\.fillStyle = "rgba\(58, 50, 38, 0\.72\)";[\s\S]*?ctx\.fillText\(fitText\(ctx, pattern\.name/,
  "reference sheet title should be faded print ink instead of near-black screen text",
);
