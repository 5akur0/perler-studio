import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");
const [renderSource, primitivesSource, fusionSource, finishSource, stateSource, uiSource, mainSource] = await Promise.all([
  read("src/render.js"),
  read("src/render-primitives.js"),
  read("src/render-fusion.js"),
  read("src/render-finish.js"),
  read("src/state.js"),
  read("src/ui.js"),
  read("src/main.js"),
]);
const functionSource = (name, nextName) => (
  renderSource.match(new RegExp(`export function ${name}\\b[\\s\\S]*?(?=export function ${nextName}\\b)`))?.[0] || ""
);
// The finish craft scenes now live in render-finish.js. Extract one function's
// source up to the next export (or end of file for the last one).
const finishFunctionSource = (name) => (
  finishSource.match(new RegExp(`export function ${name}\\b[\\s\\S]*?(?=export function |$)`))?.[0] || ""
);

assert.match(renderSource, /export function computeShowcaseLayout\(rect\)/);
assert.match(
  renderSource,
  /const showcase = computeShowcaseLayout\(sceneRect\);[\s\S]*drawFinishShowcase\(showcase\);[\s\S]*drawFinishLayer\(showcase\);/,
  "finish should use a dedicated centered layout",
);
// getShowcaseBounds now lives in the extracted render-fusion.js module.
assert.match(fusionSource, /export function getShowcaseBounds\(pieces/);
// softShadow now lives in the extracted render-primitives.js leaf module.
assert.match(primitivesSource, /export function softShadow\(ctx/);
// drawAcrylicPlate + drawMaterialHighlight moved with the scenes to render-finish.js.
assert.match(finishSource, /function drawAcrylicPlate\(/);
assert.match(finishSource, /function drawMaterialHighlight\(/);
// finishMaterialColor stays in core render.js (shared with in-core bead drawing).
assert.match(renderSource, /function finishMaterialColor\(color, material\)/);
assert.match(renderSource, /material === "wax"[\s\S]*#8f877c/);

assert.match(finishSource, /drawFinishOriginal[\s\S]*#d8c8ad/);
assert.match(finishSource, /drawFinishKeychain[\s\S]*#9aa5b1/);
assert.match(finishSource, /drawFinishCoaster[\s\S]*#d8b783/);
assert.match(finishSource, /drawFinishCoaster[\s\S]*#b08f5e/);
assert.match(finishSource, /drawFinishFigurine[\s\S]*#9b6d4c/);
assert.match(finishSource, /drawFinishFigurine[\s\S]*#78502f/);

const keychainSource = finishFunctionSource("drawFinishKeychain");
const originalSource = finishFunctionSource("drawFinishOriginal");
const coasterSource = finishFunctionSource("drawFinishCoaster");
const figurineSource = finishFunctionSource("drawFinishFigurine");
assert.doesNotMatch(keychainSource, /material:\s*"wax"/);
assert.doesNotMatch(originalSource, /material:\s*"wax"/);
assert.match(coasterSource, /material:\s*"wax"/);
assert.match(figurineSource, /material:\s*"wax"/);
assert.match(renderSource, /drawBead\([^)]*material = null\)/);
const beadSource = functionSource("drawBead", "drawPegInBead");
assert.doesNotMatch(beadSource, /const waxSurface = ctx\.createLinearGradient/);
// drawWaxSheenForPiece + its caller (drawFusedPieceTransformed) moved to render-fusion.js.
assert.match(fusionSource, /function drawWaxSheenForPiece\(/);
assert.match(fusionSource, /if \(material === "wax"\) drawWaxSheenForPiece\(/);

assert.match(stateSource, /craftSwitchAt:\s*0/);
assert.match(uiSource, /state\.craftSwitchAt\s*=\s*performance\.now\(\)/);
// finishIntroProgress (the reduced-motion-aware intro easing) moved to render-finish.js.
assert.match(finishSource, /prefersReducedMotion\(\)/);
assert.match(finishSource, /state\.craftSwitchAt/);
assert.match(mainSource, /state\.craftSwitchAt[\s\S]*260/);

assert.match(
  uiSource,
  /const showRightPanelUi = state\.phase === "place" \|\| state\.phase === "inspect"/,
  "finish should keep the palette panel hidden",
);
assert.match(
  uiSource,
  /const visible = !\["choose", "cool", "finish"\]\.includes\(state\.phase\)/,
  "detached stages should hide the sidebar reference sheet",
);
assert.match(uiSource, /els\.sideReference\.style\.display = visible \? "" : "none"/);

// Burnt/fused bead colors are rgb() strings (fusedColor mixes once); wax-finish
// crafts (杯垫/摆件) re-tint them via finishMaterialColor → mixColor a second
// time. mixColor must therefore round-trip its own rgb() output instead of
// parsing it to NaN and rendering the bead black. Guard the round-trip directly.
const { mixColor } = await import("../src/color-utils.js");
const fusedHot = mixColor("#57b8a7", "#e8a472", 0.3); // a "burnt" bead color (rgb())
assert.match(fusedHot, /^rgb\(/, "fusedColor output should be an rgb() string");
const waxed = mixColor(fusedHot, "#8f877c", 0.11); // finishMaterialColor("wax") re-mix
const [wr, wg, wb] = waxed.match(/\d+/g).map(Number);
assert.ok(
  wr + wg + wb > 120,
  `re-mixing a burnt bead for a wax craft must not collapse to black; got ${waxed}`,
);

console.log("Finish showcase regression checks passed.");
