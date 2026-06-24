import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { execFileSync } from "node:child_process";

const src = await readFile(new URL("../cloudbase/share-api/index.js", import.meta.url), "utf8");

// The function must parse (catches the control-char-in-regex class of bug).
execFileSync(process.execPath, ["--check", new URL("../cloudbase/share-api/index.js", import.meta.url).pathname]);

// Collections declared.
for (const c of ["messages", "messages_submissions", "roadmap_items", "roadmap_votes"]) {
  assert.ok(src.includes(`"${c}"`), `collection ${c} must be declared`);
}

// Routes wired.
for (const r of [
  "messages/submit", "messages/list", "messages/pending", "messages/approve", "messages/delete",
  "roadmap/list", "roadmap/vote", "roadmap/upsert", "roadmap/delete",
]) {
  assert.match(src, new RegExp(`pathIs\\(path, "${r.replace("/", "\\/")}"\\)`), `route ${r} must be dispatched`);
}

// Pre-moderation: public list returns approved only; submit writes pending.
assert.match(src, /db\.collection\(MESSAGES\)\s*\n?\s*\.where\(\{ status: "approved" \}\)/, "listMessages must filter approved");
assert.match(src, /MESSAGES_SUBMISSIONS\).add\(\{[\s\S]*?status: "pending"/, "submitMessage must write pending");

// Anti-abuse: link denial + length cap + escape-unsafe rejection.
assert.match(src, /no_links/, "message content must deny links");
assert.match(src, /slice\(0, MAX_MESSAGE_LEN\)/, "message content must be length-capped");
assert.match(src, /content contains unsafe characters/, "message content must reject unsafe chars");

// Vote dedup by (itemId, clientId) + ipHash, toggle, transactional-ish inc.
assert.match(src, /where\(\{ itemId, clientId \}\)/, "vote must dedup by (itemId, clientId)");
assert.match(src, /_\.inc\(1\)/, "vote must increment count");
assert.match(src, /_\.inc\(-1\)/, "vote toggle must decrement");
assert.match(src, /const ipHash = hashIp\(clientIp/, "vote must derive an ip hash");
const voteBody = src.match(/async function voteRoadmap\([\s\S]*?\n\}/)[0];
assert.match(voteBody, /ipHash,/, "vote row must persist the ip hash");

// Admin gating on moderation endpoints.
for (const fn of ["approveMessage", "deleteMessage", "upsertRoadmap", "deleteRoadmap", "listPendingMessages"]) {
  const body = src.match(new RegExp(`async function ${fn}\\([^)]*\\) \\{[\\s\\S]*?\\n\\}`))[0];
  assert.match(body, /await requireAdmin\(/, `${fn} must require admin`);
}

console.log("community-api-regression: OK");
