// Pattern library (图纸库) data-layer regression. Runs in plain Node — the
// library module is intentionally DOM-free (persistence inlined, no storage.js →
// notify.js → dom.js chain) so it imports here with only a localStorage mock.
import assert from "node:assert/strict";

let store = {};
globalThis.localStorage = {
  getItem: (k) => (k in store ? store[k] : null),
  setItem: (k, v) => { store[k] = String(v); },
  removeItem: (k) => { delete store[k]; },
};

const LIB_KEY = "beadWorkshopPatternLibrary.v1";
const lib = await import("../src/pattern-library.js");
const { patternSeeds } = await import("../src/patterns-data.js");
const defaultCount = patternSeeds.length;

// ── fresh load: every default present, nothing starred/hidden ──
lib.loadLibrary();
let view = lib.getLibraryView();
assert.equal(view.length, defaultCount, "fresh library shows all defaults");
assert.ok(view.every((p) => !p.starred), "nothing starred initially");

// ── sort: pinyin (zh-CN) ascending among non-starred ──
const names = view.map((p) => p.displayName);
const sorted = [...names].sort((a, b) => a.localeCompare(b, "zh-CN"));
assert.deepEqual(names, sorted, "view is sorted by pinyin");

// ── star pins to top and persists ──
const target = view[3];
lib.toggleStar(target.id);
view = lib.getLibraryView();
assert.equal(view[0].id, target.id, "starred item floats to the top");
assert.ok(view[0].starred, "starred flag set");
assert.ok(JSON.parse(store[LIB_KEY]).stars[target.id], "star persisted");

// star round-trips through a reload
lib.loadLibrary();
assert.ok(lib.isStarred(target.id), "star survives reload");
assert.equal(lib.getLibraryView()[0].id, target.id, "still pinned after reload");

// unstar
lib.toggleStar(target.id);
assert.ok(!lib.isStarred(target.id), "unstar clears it");

// ── recency: the most recently starred item sits at the very top ──
const first = lib.getLibraryView()[0].id;
const second = lib.getLibraryView()[1].id;
lib.toggleStar(first);
lib.toggleStar(second); // starred later → should outrank `first`
let starredView = lib.getLibraryView();
assert.equal(starredView[0].id, second, "most recently starred is first");
assert.equal(starredView[1].id, first, "earlier star comes next");
// re-starring `first` floats it back to the top
lib.toggleStar(first);   // unstar
lib.toggleStar(first);   // re-star (newest)
assert.equal(lib.getLibraryView()[0].id, first, "re-starring floats it to the top");
// recency order survives a reload
lib.loadLibrary();
assert.equal(lib.getLibraryView()[0].id, first, "recency order persists across reload");
// clean up so later assertions see an unstarred library
lib.toggleStar(first);
lib.toggleStar(second);
assert.ok(!lib.isStarred(first) && !lib.isStarred(second), "cleanup unstars both");

// ── add an imported pattern (persists, unnamed → 未命名) ──
const imported = {
  id: lib.newLibraryId("custom"),
  name: "",
  size: 30, width: 30, height: 30,
  rows: Array.from({ length: 30 }, () => "K".repeat(30)),
  craft: "原版",
};
lib.addToLibrary(imported);
view = lib.getLibraryView();
assert.equal(view.length, defaultCount + 1, "imported pattern shows up");
const stored = JSON.parse(store[LIB_KEY]);
assert.equal(stored.imported.length, 1, "import persisted");
assert.equal(stored.imported[0].name, "未命名", "blank name stored as 未命名");
assert.ok(!("sourceImageDataUrl" in stored.imported[0]), "heavy fields stripped before persist");

// ── rename (persists, applies to display) ──
lib.renameInLibrary(imported.id, "我的图纸");
view = lib.getLibraryView();
assert.ok(view.some((p) => p.displayName === "我的图纸"), "rename reflected in view");
assert.equal(JSON.parse(store[LIB_KEY]).renames[imported.id] || JSON.parse(store[LIB_KEY]).imported[0].name, "我的图纸", "rename persisted");

// ── delete a default → hidden, count drops, restorable ──
const someDefault = patternSeeds[0].id;
assert.ok(lib.isDefaultPatternId(someDefault));
lib.removeFromLibrary(someDefault);
view = lib.getLibraryView();
assert.ok(!view.some((p) => p.id === someDefault), "deleted default is gone");
assert.ok(lib.hasHiddenDefaults(), "hasHiddenDefaults true after deleting a default");
assert.ok(JSON.parse(store[LIB_KEY]).hidden[someDefault], "hidden default persisted");

// deletion survives reload
lib.loadLibrary();
assert.ok(!lib.getLibraryView().some((p) => p.id === someDefault), "deleted default stays gone after reload");

// ── restore defaults brings it back, keeps imported ──
lib.restoreDefaults();
view = lib.getLibraryView();
assert.ok(view.some((p) => p.id === someDefault), "restore brings the default back");
assert.ok(!lib.hasHiddenDefaults(), "no hidden defaults after restore");
assert.ok(view.some((p) => p.id === imported.id), "restore keeps imported items");

// ── delete an imported item → removed from persisted imported[] ──
lib.removeFromLibrary(imported.id);
assert.equal(JSON.parse(store[LIB_KEY]).imported.length, 0, "imported removed from store");
assert.ok(!lib.getLibraryView().some((p) => p.id === imported.id), "imported gone from view");

// ── UI contract: library renaming must use the in-app modal vocabulary, not the
// native browser prompt (which looks inconsistent and is hard to style/test). ──
const { readFile } = await import("node:fs/promises");
const uiSource = await readFile(new URL("../src/ui.js", import.meta.url), "utf8");
assert.doesNotMatch(uiSource, /window\.prompt\s*\(/, "pattern renaming must not use native window.prompt");

const indexSource = await readFile(new URL("../index.html", import.meta.url), "utf8");
const drawSource = await readFile(new URL("../src/draw.js", import.meta.url), "utf8");
const communitySource = await readFile(new URL("../src/community.js", import.meta.url), "utf8");
const renderStatsSource = await readFile(new URL("../src/render-stats.js", import.meta.url), "utf8");

for (const [sourceName, source, text] of [
  ["index.html", indexSource, "最多 20 字。"],
  ["src/ui.js", uiSource, "最多 20 字，留空会保持原名。"],
  ["index.html", indexSource, "placeholder=\"可留空\""],
  ["src/community.js", communitySource, "昵称（可不填"],
  ["src/ui.js", uiSource, "从豆盒选颜色，点格子放置或替换"],
  ["src/ui.js", uiSource, "点击豆盒倒豆进筛"],
  ["src/ui.js", uiSource, "镊子可从豆筛点取一颗"],
  ["src/draw.js", drawSource, "在版面上拖一个框放图片"],
  ["src/ui.js", uiSource, "沙盒模式不做漏放/错色校验"],
  ["src/ui.js", uiSource, "误差较多，建议先修正再熨烫"],
  ["src/ui.js", uiSource, "按住并移动熨斗"],
  ["src/ui.js", uiSource, "冷却过程中压平可以减少翘曲"],
  ["src/ui.js", uiSource, "提前取下也能完成"],
  ["src/ui.js", uiSource, "可以换一种成品形式后再次保存"],
  ["src/render-stats.js", renderStatsSource, "从豆盒选色，直接点格子摆放"],
  ["src/render-stats.js", renderStatsSource, "点格子放置或替换"],
  ["src/render-stats.js", renderStatsSource, "点豆筛夹一颗"],
  ["src/render-stats.js", renderStatsSource, "慢慢移动熨斗"],
  ["src/render-stats.js", renderStatsSource, "等待冷却，压平边缘"],
]) {
  assert.ok(!source.includes(text), `${sourceName} should not contain low-value helper copy: ${text}`);
}

assert.match(indexSource, /class="gallery-submit-note">审核后公开。<\/p>/, "gallery submission note should be brief");
assert.match(indexSource, /placeholder="搜色号"/, "palette search placeholder should be brief");
assert.match(indexSource, /placeholder="图纸名"/, "share-code title placeholder should be brief");
assert.ok(drawSource.includes('? "生成分享码"'), "export share-code hint should be brief");
assert.ok(drawSource.includes('? "导入到拼豆台" : "导入到绘图台"'), "import share-code hints should be brief");

console.log("pattern-library-regression: OK");
