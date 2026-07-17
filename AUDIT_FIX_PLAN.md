# Audit Fix Plan — security & correctness hardening

Status: audit complete (2026-07-07), fixes approved by the user, **not yet implemented**.
This file is the execution spec. Follow it exactly; every change has old/new code below.

**Do NOT commit this plan file. Do NOT stage or commit `CLAUDE.md`** (it has an
unrelated pre-existing local modification that belongs to the user).

## Background

A full code audit found the codebase healthy: all 24 regression suites pass
(`npm test`), committed bundles match a fresh build, no dead exports, no XSS.
Four low-severity fixes were approved. Everything else in the audit is **out of
scope** — change nothing beyond the four fixes specified here.

Repo hard rules that apply (from `CLAUDE.md` / `AGENTS.md`):
- After any `src/` change, run `npm run build` and commit the rebuilt
  `app.bundle.js` (and `styles.css` if it changed) **in the same commit** as the
  source change.
- Commit messages: English, Conventional Commits.
- All `npm test` suites must pass before the work is considered done.
- Work on the current branch (`feat/choose-library-reshape`); do not create
  branches or push unless the user asks.

---

## Fix 1 — `server.cjs`: directory-prefix check needs a path separator

Hardening only, **not exploitable today**: `safePath()` runs `path.normalize()`
on the URL path *before* `path.join`, and normalize collapses leading `..` on
absolute paths (`/../x` → `/x`), so traversal can't actually reach a sibling
directory on POSIX. But `startsWith(ROOT)` without a trailing separator would
silently admit `/Users/Sakuro/beam-anything` if the sequencing ever changed.
Make the check self-sufficient.

In `server.cjs` (around line 51), change:

```js
  if (!filePath.startsWith(ROOT)) {
    send(res, 403, "Forbidden");
    return;
  }
```

to:

```js
  if (!filePath.startsWith(ROOT + path.sep)) {
    send(res, 403, "Forbidden");
    return;
  }
```

`path` is already required at the top of the file. Leave `server.listen(PORT)`
(all-interfaces binding) as is — LAN access is intentionally kept for real-device
mobile testing, which this repo's workflow requires.

## Fix 2 — `cloudbase/share-api/index.js`: share codes must use a CSPRNG

`randomShortId()` mints 7-day share codes with `Math.random()`, whose V8 state
is recoverable from observed outputs. Use `crypto.randomInt` (unbiased, CSPRNG);
`crypto` is already required at the top of the file.

Around line 346, change:

```js
function randomShortId() {
  let out = "";
  for (let i = 0; i < SHORT_ID_LENGTH; i += 1) {
    out += SHORT_ID_ALPHABET[Math.floor(Math.random() * SHORT_ID_ALPHABET.length)];
  }
  return out;
}
```

to:

```js
function randomShortId() {
  let out = "";
  for (let i = 0; i < SHORT_ID_LENGTH; i += 1) {
    out += SHORT_ID_ALPHABET[crypto.randomInt(SHORT_ID_ALPHABET.length)];
  }
  return out;
}
```

Do NOT change the other `Math.random()` uses in this file (`publicId`,
`itemId`, `msg-` ids) — those are non-secret identifiers.

Note: `crypto.randomInt` needs Node ≥ 12.19 / ≥ 14.10. CloudBase runtimes are
Node 16+, so this is fine.

## Fix 3 — `src/ui.js`: escape palette-chip interpolations (defense in depth)

Two `innerHTML` templates interpolate pattern cell codes without `escapeHtml`.
They are currently safe only because `mardCodeToCell` in `src/pattern-code.js`
rejects any code not in the internal palette — a non-local invariant. Escape
locally so a future decoder change can't open a stored-XSS path via imported
share codes. `escapeHtml` is already imported in `ui.js`.

### 3a. `renderPatternColorStats` (around line 129), change:

```js
  els.patternColorStats.innerHTML = items.map((item) => `
      <button type="button" class="pattern-color-chip" data-source-code="${item.sourceCode}" title="点击换色：${beadIds[item.targetCode] || item.targetCode}" aria-label="换色 ${beadIds[item.targetCode] || item.targetCode}">
        <span class="dot" style="background:${palette[item.targetCode]}"></span>
        <span class="code">${beadIds[item.targetCode] || item.targetCode}</span>
        <span class="count">${item.count}</span>
      </button>
    `).join("");
```

to:

```js
  els.patternColorStats.innerHTML = items.map((item) => `
      <button type="button" class="pattern-color-chip" data-source-code="${escapeHtml(item.sourceCode)}" title="点击换色：${escapeHtml(beadIds[item.targetCode] || item.targetCode)}" aria-label="换色 ${escapeHtml(beadIds[item.targetCode] || item.targetCode)}">
        <span class="dot" style="background:${escapeHtml(palette[item.targetCode])}"></span>
        <span class="code">${escapeHtml(beadIds[item.targetCode] || item.targetCode)}</span>
        <span class="count">${Number(item.count) || 0}</span>
      </button>
    `).join("");
```

### 3b. `renderSidebarReference` legend (around line 199), change:

```js
    els.sideReferenceLegend.innerHTML = list.map(([code, count]) => `
        <span class="side-reference-chip">
          <i style="background:${palette[code]}"></i>
          <b>${beadIds[code] || code}</b>
          <em>${count}</em>
        </span>
      `).join("");
```

to:

```js
    els.sideReferenceLegend.innerHTML = list.map(([code, count]) => `
        <span class="side-reference-chip">
          <i style="background:${escapeHtml(palette[code])}"></i>
          <b>${escapeHtml(beadIds[code] || code)}</b>
          <em>${Number(count) || 0}</em>
        </span>
      `).join("");
```

This is the only fix that touches `src/`, so it is the one that requires the
bundle rebuild (see Build & verify).

## Fix 4 — preserve rectangle width/height through unpublish + admin UI

(This was finding #5 in the audit.) Rectangular patterns (e.g. 90×30) lose their
shape metadata when unpublished, and the admin UI always displays a square size.
Rendering is unaffected (clients decode `patternCode` directly); this fixes the
persisted metadata and the review display.

### 4a. `cloudbase/share-api/index.js` — `unpublishGallery` recreate branch

Around line 730, change:

```js
    const added = await db.collection(GALLERY_SUBMISSIONS).add({
      name: item.name,
      author: item.author || "",
      patternCode: item.patternCode,
      size: item.size,
      status: "pending",
      createdAt: item.createdAt || now,
      updatedAt: now,
    });
```

to:

```js
    const added = await db.collection(GALLERY_SUBMISSIONS).add({
      name: item.name,
      author: item.author || "",
      patternCode: item.patternCode,
      size: item.size,
      width: item.width ?? item.size,
      height: item.height ?? item.size,
      status: "pending",
      createdAt: item.createdAt || now,
      updatedAt: now,
    });
```

### 4b. `admin.js` — carry width/height into the card model

The API already returns `width`/`height` (with legacy fallback), but `loadAll()`
drops them. In the `pendingItems` mapping (around line 213), add two fields:

```js
      size: it.size,
      width: it.width ?? it.size,
      height: it.height ?? it.size,
```

Do the same in the `publishedItems` mapping just below (around line 222).

### 4c. `admin.js` — show true dimensions in `buildCard`

Around line 111, change:

```js
  const sizeText = item.size ? `${escapeHtml(item.size)}×${escapeHtml(item.size)}` : "";
```

to:

```js
  const cardWidth = item.width ?? item.size;
  const cardHeight = item.height ?? item.size;
  const sizeText = cardWidth && cardHeight ? `${escapeHtml(cardWidth)}×${escapeHtml(cardHeight)}` : "";
```

`admin.js` is loaded directly as an ES module by `admin.html`; it is NOT part of
`app.bundle.js`, so no rebuild is needed for it.

---

## Build & verify

1. `npm run build` — required because of Fix 3 (`src/ui.js`). Then check
   `git status`: `app.bundle.js` should be modified; `styles.css` should be
   unchanged (no CSS was touched — if it shows as modified, still commit it
   together per repo rule).
2. `npm test` — all 24 suites must pass. If any fail, stop and report the
   failure output instead of committing.

## Commits

Two commits on the current branch. Stage only the files named below — never
`CLAUDE.md`, never `AUDIT_FIX_PLAN.md`.

Commit 1 — files: `server.cjs`, `cloudbase/share-api/index.js` (randomShortId
part), `src/ui.js`, `app.bundle.js` (+ `styles.css` only if modified):

```
fix(security): harden dev-server path check, CSPRNG share codes, escape palette chips

- server.cjs: require a path separator after the root prefix (defensive;
  normalize-before-join already prevents traversal)
- share-api: mint share short codes with crypto.randomInt instead of Math.random
- ui.js: escape palette chip/legend interpolations so their safety no longer
  depends solely on pattern-code decoder validation

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>
```

Commit 2 — files: `cloudbase/share-api/index.js` (unpublish part), `admin.js`:

```
fix(gallery): preserve rectangle width/height through unpublish and admin review

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>
```

(Both fixes touch `cloudbase/share-api/index.js`; make the randomShortId edit
before commit 1 and the unpublishGallery edit after it, or just put that file's
combined change in commit 1 and mention it — either is acceptable, the split
above is preferred.)

Do not push. Do not merge to `main`.

## Handoff notes for the user (report these after finishing)

- The two `cloudbase/share-api/index.js` changes only take effect after the
  CloudBase function is **redeployed** — the executor cannot deploy (needs
  credentials). See `DEPLOY_CLOUDFLARE_PAGES.md` / `cloudbaserc.json`.
- Out of scope, deliberately not done (from the audit, user did not approve):
  dev-server `res.destroy()` on stream error; roadmap vote stuffing via rotated
  clientIds (accepted tradeoff); splitting the large files (`render.js`,
  `main.js`, `draw.js`, `ui.js`, `components.css`); collapsing the backend
  `is*Path` helpers onto `pathIs`; deleting the stray untracked `functions/`
  directory.
