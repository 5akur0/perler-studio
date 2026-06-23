// Regression: pattern-code decoding must reject hostile/oversized dimensions
// before expanding cells, while still round-tripping every board the studio can
// actually produce (squares up to 90×90 and multi-tile rectangles like 90×30).
import assert from "node:assert/strict";
import {
  encodePatternCode,
  decodePatternCode,
  MAX_PATTERN_DIMENSION,
  MAX_PATTERN_CELLS,
} from "../src/pattern-code.js";

assert.equal(MAX_PATTERN_DIMENSION, 90, "max dimension should track the 3×3 tile board");
assert.equal(MAX_PATTERN_CELLS, 8100, "max cells should be 90×90");

const emptyRows = (w, h) => Array.from({ length: h }, () => ".".repeat(w));

// 1. Hostile code: tiny string claiming a 100000×100000 board with a giant RLE
//    run. Without the bound this pushes billions of cells; it must throw fast.
const start = Date.now();
assert.throws(
  () => decodePatternCode("BEAM1:100000x100000:-:ZZZZZZ0"),
  /out of range/,
  "oversized dimensions must be rejected",
);
assert.ok(Date.now() - start < 1000, "rejection must be immediate, not after expansion");

// 2. A square board at the limit round-trips.
const square = decodePatternCode(encodePatternCode({ width: 90, height: 90, rows: emptyRows(90, 90) }));
assert.equal(square.width, 90);
assert.equal(square.height, 90);

// 3. A legal multi-tile rectangle round-trips (must NOT be rejected as non-square).
const rect = decodePatternCode(encodePatternCode({ width: 90, height: 30, rows: emptyRows(90, 30) }));
assert.equal(rect.width, 90);
assert.equal(rect.height, 30);

// 4. A small default board round-trips.
const small = decodePatternCode(encodePatternCode({ width: 30, height: 30, rows: emptyRows(30, 30) }));
assert.equal(small.width, 30);

// 5. One cell past the per-side limit is rejected (dimension check fires before
//    the run section is ever decoded, so the run body is irrelevant here).
assert.throws(
  () => decodePatternCode("BEAM1:91x30:-:10"),
  /out of range/,
  "91 wide must be rejected",
);

console.log("pattern-code-bounds-regression: OK");
