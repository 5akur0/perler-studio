import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const indexHtml = await readFile(new URL("../index.html", import.meta.url), "utf8");
const mainSource = await readFile(new URL("../src/main.js", import.meta.url), "utf8");
const stateSource = await readFile(new URL("../src/state.js", import.meta.url), "utf8");
const renderSource = await readFile(new URL("../src/render.js", import.meta.url), "utf8");
const gridModule = await import("../src/keyboard-grid.js");

assert.match(indexHtml, /id="sceneCanvas"[^>]*tabindex="0"/);
assert.match(indexHtml, /id="sceneCanvas"[^>]*aria-describedby="boardKeyboardHelp"/);
assert.doesNotMatch(mainSource, /Block browser pinch-zoom/);
assert.doesNotMatch(mainSource, /ctrlKey \|\| e\.metaKey/);
assert.doesNotMatch(mainSource, /event\.key === "\+"[\s\S]*preventDefault/);
assert.match(stateSource, /keyboardGrid:/);
assert.match(mainSource, /moveGridCursor/);
assert.match(mainSource, /placeSelectedBead\(cursor\.x, cursor\.y/);
assert.match(mainSource, /sceneCanvas\.matches\(":focus-visible"\)/);
assert.match(renderSource, /state\.keyboardGrid\.visible/);

assert.deepEqual(
  gridModule.moveGridCursor({ x: 0, y: 0 }, "ArrowLeft", 24),
  { x: 0, y: 0 },
);
assert.deepEqual(
  gridModule.moveGridCursor({ x: 0, y: 0 }, "ArrowDown", 24),
  { x: 0, y: 1 },
);
assert.deepEqual(
  gridModule.moveGridCursor({ x: 23, y: 23 }, "ArrowRight", 24),
  { x: 23, y: 23 },
);
assert.deepEqual(
  gridModule.normalizeGridCursor({ x: 99, y: -3 }, 24),
  { x: 23, y: 0 },
);
assert.equal(gridModule.keyboardGridAction(" "), "place");
assert.equal(gridModule.keyboardGridAction("Enter"), "place");
assert.equal(gridModule.keyboardGridAction("Escape"), "clear");
assert.equal(gridModule.keyboardGridAction("x"), null);

console.log("Keyboard regression checks passed.");
