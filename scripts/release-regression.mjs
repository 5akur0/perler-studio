import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const files = [
  ["index.html", await readFile(new URL("../index.html", import.meta.url), "utf8")],
  ["_headers", await readFile(new URL("../_headers", import.meta.url), "utf8")],
];

const forbidden = [
  "impeccable-live",
  "impeccable-variants",
  "localhost:8400",
  "live.js",
  "data-impeccable-variant",
];

for (const [name, source] of files) {
  for (const marker of forbidden) {
    assert.equal(
      source.includes(marker),
      false,
      `${name} contains development-only marker: ${marker}`,
    );
  }
}

console.log("Release regression checks passed.");
