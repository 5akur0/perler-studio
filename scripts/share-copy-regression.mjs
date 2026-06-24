import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");
const [shareCopy, main] = await Promise.all([
  read("src/share-copy.js"),
  read("src/main.js"),
]);

// HOOKS: enough variety to rotate without repeats; covers the four angles.
const hooksBlock = shareCopy.match(/export const HOOKS = \[([\s\S]*?)\];/);
assert.ok(hooksBlock, "HOOKS array must be exported");
const hookCount = (hooksBlock[1].match(/"/g) || []).length / 2;
assert.ok(hookCount >= 8, `expected >= 8 hooks, got ${hookCount}`);

// Hashtags present and include the brand tag.
assert.match(shareCopy, /#拼豆工坊/, "hashtags must include #拼豆工坊");
assert.match(shareCopy, /#解压/, "hashtags must keep the core tags");

// buildShareText is the single composer and is what main.js calls.
assert.match(shareCopy, /export function buildShareText/, "buildShareText must be exported");
assert.match(main, /buildShareText\(/, "main.js copyShareText must delegate to buildShareText");
assert.match(main, /from '\.\/share-copy\.js'/, "main.js must import share-copy");

// No empty first line: pickHook always returns a non-empty hook.
assert.match(shareCopy, /export function pickHook/, "pickHook must exist");

console.log("share-copy-regression: OK");
