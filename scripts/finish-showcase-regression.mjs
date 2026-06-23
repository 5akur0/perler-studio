import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");
const [renderSource, primitivesSource, stateSource, uiSource, mainSource] = await Promise.all([
  read("src/render.js"),
  read("src/render-primitives.js"),
  read("src/state.js"),
  read("src/ui.js"),
  read("src/main.js"),
]);
const functionSource = (name, nextName) => (
  renderSource.match(new RegExp(`export function ${name}\\b[\\s\\S]*?(?=export function ${nextName}\\b)`))?.[0] || ""
);

assert.match(renderSource, /export function computeShowcaseLayout\(rect\)/);
assert.match(
  renderSource,
  /const showcase = computeShowcaseLayout\(sceneRect\);[\s\S]*drawFinishShowcase\(showcase\);[\s\S]*drawFinishLayer\(showcase\);/,
  "finish should use a dedicated centered layout",
);
assert.match(renderSource, /export function getShowcaseBounds\(pieces/);
// softShadow now lives in the extracted render-primitives.js leaf module.
assert.match(primitivesSource, /export function softShadow\(ctx/);
assert.match(renderSource, /function drawAcrylicPlate\(/);
assert.match(renderSource, /function drawMaterialHighlight\(/);
assert.match(renderSource, /function finishMaterialColor\(color, material\)/);
assert.match(renderSource, /material === "wax"[\s\S]*#8f877c/);

assert.match(renderSource, /drawFinishOriginal[\s\S]*#e7dccb[\s\S]*#d8c8ad/);
assert.match(renderSource, /drawFinishKeychain[\s\S]*#f0f3f6[\s\S]*#7c8893/);
assert.match(renderSource, /drawFinishCoaster[\s\S]*#d8b783/);
assert.match(renderSource, /drawFinishCoaster[\s\S]*#b08f5e/);
assert.match(renderSource, /drawFinishFigurine[\s\S]*#9b6d4c/);
assert.match(renderSource, /drawFinishFigurine[\s\S]*#71462f/);

const keychainSource = functionSource("drawFinishKeychain", "drawFinishOriginal");
const originalSource = functionSource("drawFinishOriginal", "drawFinishCoaster");
const coasterSource = functionSource("drawFinishCoaster", "drawFinishFigurine");
const figurineSource = functionSource("drawFinishFigurine", "drawFusionBridgeTo");
assert.doesNotMatch(keychainSource, /material:\s*"wax"/);
assert.doesNotMatch(originalSource, /material:\s*"wax"/);
assert.match(coasterSource, /material:\s*"wax"/);
assert.match(figurineSource, /material:\s*"wax"/);
assert.match(renderSource, /drawBead\([^)]*material = null\)/);
const beadSource = functionSource("drawBead", "drawPegInBead");
assert.doesNotMatch(beadSource, /const waxSurface = ctx\.createLinearGradient/);
assert.match(renderSource, /function drawWaxSheenForPiece\(/);
assert.match(renderSource, /if \(material === "wax"\) drawWaxSheenForPiece\(/);

assert.match(stateSource, /craftSwitchAt:\s*0/);
assert.match(uiSource, /state\.craftSwitchAt\s*=\s*performance\.now\(\)/);
assert.match(renderSource, /prefersReducedMotion\(\)/);
assert.match(renderSource, /state\.craftSwitchAt/);
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

console.log("Finish showcase regression checks passed.");
