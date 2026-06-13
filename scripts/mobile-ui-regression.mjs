import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const indexHtml = await readFile(new URL("../index.html", import.meta.url), "utf8");
const uiSource = await readFile(new URL("../src/ui.js", import.meta.url), "utf8");
const mainSource = await readFile(new URL("../src/main.js", import.meta.url), "utf8");
const stateSource = await readFile(new URL("../src/state.js", import.meta.url), "utf8");
const renderSource = await readFile(new URL("../src/render.js", import.meta.url), "utf8");
const drawSource = await readFile(new URL("../src/draw.js", import.meta.url), "utf8");
const responsiveCss = await readFile(new URL("../src/styles/responsive.css", import.meta.url), "utf8");
const { workflowSummary } = await import("../src/workflow.js");
const { beadSettleScale } = await import("../src/utils.js");

assert.match(indexHtml, /id="mobileWorkflowSummary"/);
assert.match(indexHtml, /id="mobilePatternThumb"/);
assert.match(indexHtml, /id="mobileWorkflowCurrent"/);
assert.match(indexHtml, /id="mobileWorkflowNext"/);
assert.match(indexHtml, /id="mobileSelectionSummary"/);
assert.match(indexHtml, /id="mobileSelectionStartButton"/);
assert.match(uiSource, /workflowSummary\(phases, state\.phase\)/);
assert.match(uiSource, /drawPatternThumb\(els\.mobilePatternThumb/);
assert.match(uiSource, /drawPatternThumb\(els\.mobileSelectionThumb/);
assert.match(uiSource, /sourceImageDataUrl/);
assert.match(
  uiSource,
  /const codes = isMobile \? allCodes\.filter\(\(code\) => \(counts\[code\] \|\| 0\) > 0\) : allCodes;/,
);
assert.match(drawSource, /const codes = allColorCodes\(\);/);
assert.match(uiSource, /mobileColorPulseId/);
assert.match(stateSource, /mobileBeadSettle:/);
assert.match(mainSource, /triggerHaptic\("light"\)/);
assert.match(renderSource, /beadSettleScale/);
assert.match(responsiveCss, /\.mobile-workflow-summary/);
assert.match(responsiveCss, /\.mobile-selection-summary/);
assert.match(responsiveCss, /\.color-chip\.picked/);

const phases = [
  { id: "choose", name: "选图" },
  { id: "place", name: "摆放" },
  { id: "inspect", name: "检查" },
];

assert.deepEqual(workflowSummary(phases, "place"), {
  index: 1,
  total: 3,
  current: "摆放",
  next: "检查",
});
assert.deepEqual(workflowSummary(phases, "inspect"), {
  index: 2,
  total: 3,
  current: "检查",
  next: "",
});
assert.equal(beadSettleScale(0, 180, false), 0.72);
assert.equal(beadSettleScale(90, 180, false) > 0.95, true);
assert.equal(beadSettleScale(180, 180, false), 1);
assert.equal(beadSettleScale(0, 180, true), 1);

console.log("Mobile UI regression checks passed.");
