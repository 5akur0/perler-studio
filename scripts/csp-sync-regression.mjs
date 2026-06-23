// Regression: the Content-Security-Policy is duplicated in _headers (Cloudflare)
// and the index.html <meta http-equiv>. They must stay byte-identical so the two
// hosting paths enforce the same policy; this catches the easy "edited one, not
// the other" drift.
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

function normalize(csp) {
  return csp.replace(/\s+/g, " ").trim();
}

const headers = readFileSync(join(root, "_headers"), "utf8");
const html = readFileSync(join(root, "index.html"), "utf8");

const headerMatch = headers.match(/Content-Security-Policy:\s*([^\n]+)/);
assert.ok(headerMatch, "_headers must define a Content-Security-Policy");

const metaMatch = html.match(/http-equiv="Content-Security-Policy"\s*content="([^"]+)"/s);
assert.ok(metaMatch, "index.html must define a CSP <meta http-equiv>");

assert.equal(
  normalize(headerMatch[1]),
  normalize(metaMatch[1]),
  "CSP in _headers and index.html must match — sync both when changing one",
);

console.log("csp-sync-regression: OK");
