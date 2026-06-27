// Regression: shared codes are titled (【标题】+短码) and the offline BEAM1 text
// code is gone from every user-facing path.
//
// Contracts asserted (static source checks, matching the repo convention):
//   1. The draw studio gates code generation on a non-empty title and wraps the
//      result as 【title】+shortId.
//   2. There is no offline-code fallback: a failed share surfaces 服务器繁忙
//      rather than copying a raw BEAM1 string.
//   3. Import resolves a cloud short id only — the raw-text BEAM1 branch is gone
//      from both the draw studio and the gallery.
//   4. The main-app cloud share also emits the 【title】 prefix, so both share
//      entry points produce a self-describing string.
//   5. The export modal exposes a 10-char title input and a generate button.
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const read = (p) => readFile(new URL(`../${p}`, import.meta.url), "utf8");
const [draw, gallery, html] = await Promise.all([
  read("src/draw.js"),
  read("src/gallery.js"),
  read("index.html"),
]);

// 1. Title gate + 【title】+shortId wrapping in the draw studio.
assert.match(
  draw,
  /drawCodeGenerateBtn\?\.addEventListener\("click"/,
  "draw studio must have a dedicated generate handler",
);
assert.match(
  draw,
  /const title = \(els\.drawCodeTitleInput\?\.value \|\| ""\)\.trim\(\);[\s\S]*?if \(!title\)/,
  "generate must read and require a trimmed title",
);
assert.match(draw, /请先给图纸起个名字/, "empty title must be rejected with a prompt");
assert.match(
  draw,
  /const display = `【\$\{title\}】\$\{share\.shortId\}`/,
  "the shared string must be 【title】+shortId",
);

// 2. No offline fallback; failure shows 服务器繁忙.
assert.doesNotMatch(draw, /exportDrawPatternCode/, "offline pattern-code export must be removed");
assert.doesNotMatch(draw, /extractPatternCode/, "draw studio must not parse raw BEAM1 text codes");
assert.match(draw, /服务器繁忙，请稍后再试/, "share failure must surface 服务器繁忙");

// 3. Import is short-code only.
assert.match(
  draw,
  /const shortId = extractCloudShortId\(raw\);\s*\n\s*if \(!shortId\)/,
  "draw import must resolve a cloud short id only",
);
assert.doesNotMatch(gallery, /extractPatternCode/, "gallery import must not parse raw BEAM1 text codes");

// 3b. extractCloudShortId must tolerate the 【title】 prefix: a Latin title of
// base58-looking chars must not be mistaken for the short id. Guard the two
// pieces of the fix — strip the prefix, then prefer the trailing run.
assert.match(gallery, /replace\(\/\^【/, "extractCloudShortId must strip a leading 【title】 prefix");
assert.match(
  gallery,
  /matches\[matches\.length - 1\]/,
  "extractCloudShortId must prefer the trailing run, not the first",
);

// 4. Main-app cloud share carries the same 【title】 prefix.
assert.match(
  gallery,
  /const display = title \? `【\$\{title\}】\$\{share\.shortId\}` : share\.shortId/,
  "main-app cloud share must also wrap as 【title】+shortId",
);

// 5. Export modal: 10-char title input + generate button.
assert.match(
  html,
  /id="drawCodeTitleInput"[^>]*maxlength="10"/,
  "title input must cap at 10 characters",
);
assert.match(html, /id="drawCodeGenerateBtn"/, "export modal must have a generate button");

console.log("share-code-title-regression: OK");
