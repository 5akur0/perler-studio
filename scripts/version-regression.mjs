import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");
const [constants, main, exporter, indexHtml] = await Promise.all([
  read("src/constants.js"),
  read("src/main.js"),
  read("src/render-export.js"),
  read("index.html"),
]);

// APP_VERSION is the single source of truth, semver-shaped.
const match = constants.match(/export const APP_VERSION = "([^"]+)"/);
assert.ok(match, "APP_VERSION must be exported from constants.js");
assert.match(match[1], /^\d+\.\d+\.\d+$/, "APP_VERSION must be semver-shaped");

// clientId key for vote dedup lives alongside it.
assert.match(constants, /export const clientIdKey = "/, "clientIdKey must be exported");

// Surfaced in the settings modal (DOM hook + JS wiring).
assert.match(indexHtml, /id="settingsVersion"/, "settings modal needs a version slot");
assert.match(main, /settingsVersion/, "main.js must populate the settings version");
assert.match(main, /APP_VERSION/, "main.js must import APP_VERSION");

// Tiny tag on the share-card footer.
assert.match(exporter, /APP_VERSION/, "render-export.js must stamp the version on the card");
assert.match(exporter, /v\$\{APP_VERSION\}/, "card footer should render v{APP_VERSION}");

console.log("version-regression: OK");
