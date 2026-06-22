import assert from "node:assert/strict";
import { workflowSummary } from "../src/workflow.js";
import { beadSettleScale } from "../src/utils.js";

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

console.log("Mobile UI behavior checks passed.");
