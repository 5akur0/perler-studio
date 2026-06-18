import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const componentsCss = await readFile(new URL("../src/styles/components.css", import.meta.url), "utf8");
const responsiveCss = await readFile(new URL("../src/styles/responsive.css", import.meta.url), "utf8");

const activeRule = componentsCss.match(/\.color-chip\.active\s*\{([\s\S]*?)\n\}/)?.[1] || "";
assert.match(activeRule, /outline:\s*2px solid var\(--ink\)/);
assert.match(activeRule, /outline-offset:\s*2px/);
assert.match(activeRule, /0 0 0 4px rgba\(38,\s*36,\s*43,\s*0\.06\)/);
assert.doesNotMatch(activeRule, /inset 0 0 0 3\.5px var\(--ink\)/);

const activeNeededRule = componentsCss.match(/\.color-chip\.active\.needed\s*\{([\s\S]*?)\n\}/)?.[1] || "";
assert.match(activeNeededRule, /outline-color:\s*rgba\(20,\s*20,\s*26,\s*0\.8\)/);
assert.doesNotMatch(responsiveCss, /\.color-chip\.active\s*\{/);

console.log("Color chip selection regression checks passed.");
