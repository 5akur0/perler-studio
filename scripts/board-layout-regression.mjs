import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const {
  growGridByTile,
  shouldUseBoardPegCache,
  visibleBoardCellRange,
} = await import("../src/board-layout.js");
const { encodePatternCode, decodePatternCode } = await import("../src/pattern-code.js");

const tile = 30;
const source = Array.from({ length: tile }, (_, y) => (
  Array.from({ length: tile }, (_, x) => (x === 2 && y === 3 ? "K" : ".")).join("")
));

for (const side of ["right", "bottom", "left", "top"]) {
  const grown = growGridByTile({ rows: source, width: tile, height: tile }, side, tile);
  assert.equal(grown.width, side === "left" || side === "right" ? tile * 2 : tile);
  assert.equal(grown.height, side === "top" || side === "bottom" ? tile * 2 : tile);
  assert.equal(grown.rows.length, grown.height);
  assert(grown.rows.every((row) => row.length === grown.width));

  const expectedX = side === "left" ? 2 + tile : 2;
  const expectedY = side === "top" ? 3 + tile : 3;
  assert.equal(grown.rows[expectedY][expectedX], "K", `${side} keeps existing content aligned`);
  assert.equal(
    grown.rows.join("").split("").filter((cell) => cell === "K").length,
    1,
    `${side} adds only blank cells`,
  );
}

const patternCodeSource = await readFile(new URL("../src/pattern-code.js", import.meta.url), "utf8");
assert.doesNotMatch(patternCodeSource, /width !== height/);
const rectangularPattern = {
  width: tile * 2,
  height: tile,
  size: tile * 2,
  rows: Array.from({ length: tile }, (_, y) => (
    Array.from({ length: tile * 2 }, (_, x) => (x === 45 && y === 10 ? "K" : ".")).join("")
  )),
};
const decoded = decodePatternCode(encodePatternCode(rectangularPattern));
assert.equal(decoded.width, tile * 2);
assert.equal(decoded.height, tile);
assert.equal(decoded.rows[10][45], "K");

assert.equal(shouldUseBoardPegCache(1), true, "native scale may reuse the peg bitmap");
assert.equal(shouldUseBoardPegCache(1.01), false, "zoomed boards must keep pegs vector-sharp");
assert.deepEqual(
  visibleBoardCellRange(
    { w: 320, h: 480, boardX: 10, boardY: 90, cell: 10 },
    { scale: 4, panX: 0, panY: 0, cx: 160, cy: 240 },
    30,
    30,
  ),
  { startCol: 11, endCol: 19, startRow: 9, endRow: 21 },
  "zoomed peg rendering is limited to cells visible in the canvas",
);

const mainSource = await readFile(new URL("../src/main.js", import.meta.url), "utf8");
const renderSource = await readFile(new URL("../src/render.js", import.meta.url), "utf8");
const patternSource = await readFile(new URL("../src/pattern.js", import.meta.url), "utf8");
const gallerySource = await readFile(new URL("../src/gallery.js", import.meta.url), "utf8");
const drawSource = await readFile(new URL("../src/draw.js", import.meta.url), "utf8");
const uiSource = await readFile(new URL("../src/ui.js", import.meta.url), "utf8");
assert.doesNotMatch(mainSource, /\bgrowBoard\b/);
assert.doesNotMatch(mainSource, /\bboardTabAtPoint\b/);
assert.doesNotMatch(mainSource, /mode = "add-tile"/);
assert.doesNotMatch(renderSource, /drawBoardTabs\(/);
assert.doesNotMatch(patternSource, /export function growBoard/);
assert.match(gallerySource, /\n\s+width,\n\s+height,/);
assert.match(renderSource, /import\s+\{[^}]*\bdrawBoardSkin\b[^}]*\}\s+from\s+['"]\.\/board-skin\.js['"]/);
assert.match(drawSource, /import\s+\{[^}]*\bdrawBoardSkin\b[^}]*\}\s+from\s+['"]\.\/board-skin\.js['"]/);
assert.match(renderSource, /drawBoardSkin\(/);
assert.match(drawSource, /drawBoardSkin\(/);
assert.match(renderSource, /drawBoardGuides\(/);
assert.match(drawSource, /drawBoardGuides\(/);
assert.doesNotMatch(drawSource, /\bdrawPegInBead\b|\bdrawBead\(/);
assert.match(renderSource, /import\s+\{[^}]*\bdrawPixelPatternPreview\b[^}]*\}\s+from\s+['"]\.\/board-skin\.js['"]/);
assert.match(uiSource, /import\s+\{[^}]*\bdrawPixelPatternPreview\b[^}]*\}\s+from\s+['"]\.\/board-skin\.js['"]/);
assert.match(renderSource, /drawPixelPatternPreview\(/);
assert.match(uiSource, /drawPixelPatternPreview\(/);
assert.doesNotMatch(uiSource, /function drawPatternThumb[\s\S]*?ctx\.fillRect\(px,\s*py,\s*pw,\s*ph\)/);
assert.doesNotMatch(mainSource, /function drawPatternThumb\(/);

console.log("Board layout regression checks passed.");
