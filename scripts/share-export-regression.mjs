import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");
const [exporter, main, ui] = await Promise.all([
  read("src/render-export.js"),
  read("src/main.js"),
  read("src/ui.js"),
]);

// drawShareImage carries a variant param with a default.
assert.match(
  exporter,
  /export function drawShareImage\(ctx, w, h, portrait, qrImg = null, variant = "card", logoImg = null\)/,
  "drawShareImage must accept variant + logo image",
);
// The SVG brand logo is drawn onto the card (both the footer sign block and the
// clean watermark), loaded as an untainted data-URL image from logo.js.
assert.match(exporter, /if \(logoImg\) \{[\s\S]*?drawImage\(logoImg/, "share card must draw the logo image");
assert.match(main, /loadLogoImage\(\)/, "exportShareImage must load the logo image");
assert.match(main, /drawShareImage\([^)]*logoImg\)/, "exportShareImage must pass the logo through");
// Clean branch returns early and uses a dedicated helper.
assert.match(exporter, /if \(variant === "clean"\)/, "clean branch must exist");
assert.match(exporter, /function drawCleanVariant\(/, "drawCleanVariant helper must exist");
// Clean variant must NOT draw the grade badge / KPI chrome (it returns before them).
const cleanFn = exporter.match(/function drawCleanVariant\([\s\S]*?\n}/)[0];
assert.doesNotMatch(cleanFn, /评级/, "clean variant must not render the grade badge");
assert.doesNotMatch(cleanFn, /尺寸|颗数|色号/, "clean variant must not render the KPI strip");

// main.js maps the "clean" format to a square canvas + clean variant.
assert.match(main, /format === "clean"/, "exportShareImage must handle clean format");
assert.match(main, /clean \? "clean" : "card"/, "exportShareImage must pass the variant through");

// UI exposes the third button.
assert.match(ui, /纯作品图.*exportShareImage\("clean"\)/, "ui.js must add the 纯作品图 button");

console.log("share-export-regression: OK");
