# XHS Launch P0 Implementation Plan

> **For agentic workers:** Steps use checkbox (`- [ ]`) syntax. Build after every frontend change with `npm run build`; run regression scripts as written. Frontend bundles (`app.bundle.js`/`styles.css`) are committed.

**Goal:** Ship the six P0 workstreams for the Xiaohongshu launch: og-image link preview, copy-hook system, clean-artwork export, message board, update board, and a visible version number.

**Architecture:** Frontend stays ES-modules → esbuild IIFE. Community features extend the existing single `share-api` CloudBase function with new `/api/messages/*` and `/api/roadmap/*` routes, reusing its rate-limit / IP-hash / admin-token / lockout machinery, and surface in one new `community` app mode (two tabs).

**Tech Stack:** Vanilla ES modules, esbuild, HTML canvas, CloudBase Node18 function (`@cloudbase/node-sdk`), Playwright (already installed) for og-image generation.

---

## File Structure

- `src/constants.js` — add `APP_VERSION`, `clientIdKey`, community API note.
- `src/share-copy.js` *(new)* — `HOOKS`, `buildShareText(state)`.
- `src/render-export.js` — `drawShareImage(..., variant)` clean branch.
- `src/main.js` — wire clean export, version label, community mode glue.
- `src/ui.js` — third "纯作品图" share button + version line in settings.
- `src/community.js` *(new)* — message board + update board UI, network calls.
- `src/community-api.js` *(new)* — thin client wrappers over `requestShareApi`.
- `index.html` — og/twitter meta, community screen markup + entry.
- `cloudbase/share-api/index.js` — new message/roadmap routes + collections.
- `admin.js` — message moderation + roadmap management sections.
- `scripts/*-regression.mjs` — new static regressions.
- `scripts/gen-og-image.mjs` *(new)* — render `og-image.png`.

---

## Task 1: Version number (WS7)

**Files:** Modify `src/constants.js`, `src/ui.js`, `src/render-export.js`; Test `scripts/version-regression.mjs` (new).

- [ ] Add `export const APP_VERSION = "1.0.0";` and `export const clientIdKey = "beadWorkshopClientId.v1";` to `src/constants.js`.
- [ ] In `src/ui.js` settings modal render, append a muted line `拼豆工坊 v{APP_VERSION}` using `--font-clear`.
- [ ] In `src/render-export.js` card footer (not clean variant), draw tiny `v{APP_VERSION}` right of the brand block.
- [ ] Write `scripts/version-regression.mjs`: assert `APP_VERSION` matches `/^\d+\.\d+\.\d+$/`, is imported by `ui.js` and `render-export.js`.
- [ ] `npm run build` → `node scripts/version-regression.mjs` passes. Commit.

## Task 2: Copy-hook system (WS2)

**Files:** Create `src/share-copy.js`; Modify `src/main.js::copyShareText`; Test `scripts/share-copy-regression.mjs` (new).

- [ ] Create `src/share-copy.js` exporting `HOOKS` (10 strings, covering 治愈/打卡/教程/解压) and `buildShareText(state, deps)` returning the multi-line string (hook + stats line + CTA + hashtags incl. `#拼豆工坊`).
- [ ] Rewrite `main.js::copyShareText` to delegate to `buildShareText`.
- [ ] Write `scripts/share-copy-regression.mjs`: assert ≥8 hooks, hashtags present, no empty first line, `buildShareText` referenced by `main.js`.
- [ ] `npm run build` → regression passes. Commit.

## Task 3: Clean-artwork export (WS3-core)

**Files:** Modify `src/render-export.js`, `src/main.js::exportShareImage`, `src/ui.js`.

- [ ] `drawShareImage(ctx, w, h, portrait, qrImg, variant="card")`; add `if (variant === "clean")` branch: page wash + centered well artwork + tiny `拼豆工坊 · 扫码同款` watermark + optional corner QR; skip badge/KPI/slogan.
- [ ] `exportShareImage(format)`: accept `"clean"` → 1080×1080, pass `variant:"clean"`.
- [ ] `ui.js`: add third button `纯作品图` → `uiActions.exportShareImage("clean")`.
- [ ] Extend `scripts/finish-showcase-regression.mjs` (or new `scripts/share-export-regression.mjs`): assert `drawShareImage` signature has `variant`, clean branch exists.
- [ ] `npm run build` → regressions pass. Commit.

## Task 4: og-image + meta (WS1)

**Files:** Create `scripts/gen-og-image.mjs`, `og-image.png`, `apple-touch-icon.png`; Modify `index.html`.

- [ ] `scripts/gen-og-image.mjs`: launch Playwright, load app on local server, drive a seed pattern (or call a tiny exposed render path) to paint a 1200×630 branded card to `og-image.png`. If driving the live finish flow is heavy, render a static branded composition via node-canvas-free Playwright `page.evaluate` drawing on an offscreen canvas with the same palette tokens.
- [ ] Generate `apple-touch-icon.png` (180×180) from brand mark.
- [ ] `index.html`: uncomment/point `og:image` to `og-image.png`, add `og:image:width=1200`/`height=630`, `twitter:card=summary_large_image`, `twitter:image`, `apple-touch-icon` link.
- [ ] Verify meta via grep; commit `og-image.png`, `apple-touch-icon.png`, `index.html`.

## Task 5: Community backend routes (WS6 backend)

**Files:** Modify `cloudbase/share-api/index.js`; Test `scripts/community-api-regression.mjs` (new).

- [ ] Add collection consts: `MESSAGES`, `MESSAGES_SUBMISSIONS`, `ROADMAP_ITEMS`, `ROADMAP_VOTES`; caps `MAX_MESSAGE_LEN=200`, `MAX_NICKNAME_LEN=16`, `MESSAGE_WRITE_MAX_PER_IP=6`.
- [ ] `/api/messages/submit`: validate length, strip/deny URLs, write `messages_submissions` status=pending, write rate-limited.
- [ ] `/api/messages/list`: read rate-limited, return approved `messages`, newest-first, limit ≤20.
- [ ] `/api/messages/approve` + `/api/messages/delete`: admin-token gated (reuse guard).
- [ ] `/api/roadmap/list`: return items + votes + viewer-voted flag (by clientId).
- [ ] `/api/roadmap/vote`: write rate-limited, dedup `(itemId, clientId)`+ipHash, toggle, transactional vote count.
- [ ] `/api/roadmap/upsert` + `/api/roadmap/delete`: admin-gated.
- [ ] `scripts/community-api-regression.mjs`: assert each route string present, escape/length/URL-strip/dedup code paths referenced.
- [ ] `node scripts/community-api-regression.mjs` passes. Commit.

## Task 6: Community frontend (WS6 frontend + 4.4 entry)

**Files:** Create `src/community.js`, `src/community-api.js`; Modify `src/main.js` (mode glue), `index.html` (screen + entry), `src/constants.js` (already has clientIdKey).

- [ ] `src/community-api.js`: `submitMessage`, `listMessages`, `listRoadmap`, `voteRoadmap` wrapping `requestShareApi`; `getClientId()` from localStorage (`clientIdKey`) generating a uuid if absent.
- [ ] `index.html`: add `<section id="communityScreen">` with two tab buttons (留言板/更新板) + containers; add a low-key "社区" entry near the start-screen footer.
- [ ] `src/main.js`: register `community` in `setAppMode` screen toggles + `aria-hidden`, MODE_BG entry, nav binding from the 社区 entry; lazy-load community data on first open.
- [ ] `src/community.js`: render message list (escaped nickname→「匿名豆友」 + content + relative time), submit form (optional nickname, ≤200 char counter, single CTA), optimistic "等待审核" toast; roadmap list (status pill, title, desc, like button with count + voted state, optimistic + rollback); header shows `当前版本 v{APP_VERSION}`.
- [ ] `npm run build`; smoke via local server screenshot. Commit.

## Task 7: Admin moderation (WS6 admin)

**Files:** Modify `admin.js`, `admin.html`.

- [ ] `admin.js`: add 留言审核 section (list pending → approve/delete via `/api/messages/*`) and 更新板管理 section (list/upsert/delete via `/api/roadmap/*`), reusing `request()` + token + card pattern.
- [ ] `admin.html`: containers/tabs for the two new sections.
- [ ] Manual smoke note in commit body. Commit.

## Task 8: Final integration

- [ ] Run full `npm run test:*` suite + new regressions; fix any regressions.
- [ ] `npm run build`; confirm committed bundles current.
- [ ] Update spec §7 deploy checklist if collection names changed.
- [ ] Final commit; summary to user.

---

## Self-Review

- **Coverage:** WS1→T4, WS2→T2, WS3-core→T3, WS6 board→T5/T6/T7, WS7→T1. All spec §3/§4 covered.
- **Types:** `variant` param consistent (T3); `getClientId`/`clientIdKey` consistent (T1/T6); route strings consistent (T5/T6/T7).
- **Placeholders:** og-image generation approach has a documented fallback; acceptable for execution.
