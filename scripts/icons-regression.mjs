import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const iconsSource = await readFile(new URL("../src/icons.js", import.meta.url), "utf8");
const indexHtml = await readFile(new URL("../index.html", import.meta.url), "utf8");
const uiSource = await readFile(new URL("../src/ui.js", import.meta.url), "utf8");
const drawSource = await readFile(new URL("../src/draw.js", import.meta.url), "utf8");
const gallerySource = await readFile(new URL("../src/gallery.js", import.meta.url), "utf8");
const adminHtml = await readFile(new URL("../admin.html", import.meta.url), "utf8");
const adminSource = await readFile(new URL("../admin.js", import.meta.url), "utf8");
const iconsModuleUrl = `data:text/javascript;base64,${Buffer.from(iconsSource).toString("base64")}`;
const { icon, hasIcon, hydrateIcons } = await import(iconsModuleUrl);

const iconKeys = [...iconsSource.matchAll(/^\s*(?:"([^"]+)"|([A-Za-z][\w-]*))\s*:/gm)]
  .map((match) => match[1] || match[2]);
const duplicateIconKeys = iconKeys.filter((name, index) => iconKeys.indexOf(name) !== index);
assert.deepEqual(duplicateIconKeys, [], `Duplicate icon keys: ${duplicateIconKeys.join(", ")}`);

assert.match(icon("settings", { size: 18 }), /width="18"/);
assert.match(icon("settings", { size: 18 }), /height="18"/);
assert.match(icon("settings", { size: 18 }), /stroke-width="2"/);
assert.match(icon("settings", { label: "设置" }), /role="img" aria-label="设置"/);
const warnings = [];
const originalWarn = console.warn;
console.warn = (message) => warnings.push(message);
assert.equal(icon("missing-icon"), "");

const placeholder = {
  dataset: {
    lucideIcon: "settings",
    iconSize: "20",
    iconStrokeWidth: "1.8",
    iconClass: "test-icon",
  },
  className: "placeholder-class",
  outerHTML: "",
};
const unknownPlaceholder = {
  dataset: { lucideIcon: "missing-icon" },
  className: "",
  outerHTML: '<span data-lucide-icon="missing-icon"></span>',
};
const fakeRoot = {
  querySelectorAll(selector) {
    assert.equal(selector, "[data-lucide-icon]");
    return [placeholder, unknownPlaceholder];
  },
};

assert.equal(hydrateIcons(fakeRoot), 1);
assert.match(placeholder.outerHTML, /^<svg/);
assert.match(placeholder.outerHTML, /width="20"/);
assert.match(placeholder.outerHTML, /stroke-width="1.8"/);
assert.match(placeholder.outerHTML, /class="placeholder-class test-icon lucide-icon"/);
assert.equal(unknownPlaceholder.outerHTML, '<span data-lucide-icon="missing-icon"></span>');
console.warn = originalWarn;
assert.deepEqual(warnings, [
  "[icons] unknown icon: missing-icon",
  "[icons] unknown icon: missing-icon",
]);

assert.doesNotMatch(
  indexHtml,
  /<button[^>]+aria-label="[^"]*(?:关闭|取消)[^"]*"[^>]*>×<\/button>/,
);
assert.doesNotMatch(uiSource, /const (?:beakerIcon|loupeIcon) = '<svg/);
assert.doesNotMatch(uiSource, /<button[^>]+collection-tile-delete[^>]*>[\s\S]*?<svg/);
assert.doesNotMatch(drawSource, /shapeBtn\.innerHTML = isCircle\s*\?\s*`<svg/);
assert.doesNotMatch(gallerySource, /const galleryIcon = '<svg/);
assert.match(indexHtml, /data-lucide-icon="x"/);
const staticIconNames = [...`${indexHtml}\n${adminHtml}`.matchAll(/data-lucide-icon="([^"]+)"/g)]
  .map((match) => match[1]);
assert.ok(staticIconNames.length > 0);
staticIconNames.forEach((name) => assert.equal(hasIcon(name), true, `Missing icon: ${name}`));
assert.equal((indexHtml.match(/<svg\b/g) || []).length, 1);
assert.match(indexHtml, /<svg viewBox="0 0 64 64"/);

assert.match(adminHtml, /data-lucide-icon="refresh-cw"/);
// Admin renders action glyphs through the unified icon() helper (plus / minus / trash-2).
assert.match(adminSource, /icon\("plus"/);
assert.match(adminSource, /icon\("minus"/);
assert.match(adminSource, /icon\("trash-2"/);
// Every icon() name used in admin must exist in the registry.
const adminIconNames = [...adminSource.matchAll(/\bicon\("([^"]+)"/g)].map((match) => match[1]);
assert.ok(adminIconNames.length > 0);
adminIconNames.forEach((name) => assert.equal(hasIcon(name), true, `Missing admin icon: ${name}`));

console.log("Icon regression checks passed.");
