# Review Rules v2 + Pre-publish Verification Audit — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

Status: Approved (user, 2026-07-16). Spec: `docs/superpowers/specs/2026-07-16-review-rules-v2-prepublish-audit-design.md`.

**Goal:** Right-size the UI review rules into a tiered protocol with a release gate, then run the pre-publish verification audit (spot-check the closed 2026-07-16 review, upgrade its source-only cells to live evidence, run Gate R, fix what surfaces, and hand off credential-gated steps).

**Architecture:** Three document rewrites (protocol, template, AGENTS section) + housekeeping, then an evidence-driven audit executed with a small committed Playwright driver (`scripts/evidence-capture-lib.mjs`) writing durable evidence into `docs/ui-audits/evidence/2026-07-16-prepublish/`, tracked in a new ledger.

**Tech Stack:** Markdown docs; Node ES modules; Playwright (`^1.61.0`, already a devDependency); esbuild bundles committed to the repo.

## Global Constraints

- After any `src/` change: `npm run build`, commit rebuilt `app.bundle.js` / `styles.css` **in the same commit** as the source change.
- Commits: English, Conventional Commits, ending with `Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>`.
- Docs/specs/plans/comments: English. UI copy, `PRODUCT.md`, `DESIGN.md`: Chinese.
- CSS uses tokens from `src/styles/tokens.css` only; CSP changes update both `_headers` and the `index.html` meta tag.
- All registered suites (`npm test`, currently 27) must pass before the audit closes. Do not push; do not create branches — work on `main`.
- Evidence budget: total `docs/ui-audits/evidence/2026-07-16-prepublish/` < 2 MB. Screenshots at `deviceScaleFactor: 1`; shrink with `sips -Z 900 <file>` if a file exceeds ~120 KB. The repo deploys publicly — commit nothing sensitive.
- Viewports: phone 390×844, phone-landscape 844×390, tablet 1024×768, tablet-portrait 768×1024, desktop 1440×1000.
- The executor updates the ledger `docs/ui-audits/2026-07-16-prepublish-verification.md` in the same commit as each phase's evidence.

---

### Task 1: Rewrite `docs/UI_REVIEW_PROTOCOL.md` to v2

**Files:**
- Modify: `docs/UI_REVIEW_PROTOCOL.md` (full replacement)

**Interfaces:**
- Produces: tier names (`Tier 1/2/3`), result states, evidence-dir convention, and Gate R checklist that Tasks 2, 3, 5, 11–16 reference verbatim.

- [ ] **Step 1: Replace the entire file content with:**

````markdown
# UI Review & Release Protocol (v2)

Process rules for UI work, scaled by blast radius. `PRODUCT.md` and `DESIGN.md`
own taste and direction; this document owns evidence and completion. v1
(2026-07-16) governed the full review closed the same day; v2 adds tiers,
honest independence, durable evidence, and a release gate.

## Tier router

| Tier | Trigger | Required process |
|---|---|---|
| 1 · Focused fix | 1–2 screens or one component family | No ledger, no gates. Verification disciplines below + desktop & mobile check (tablet landscape when shared canvas/layout code is touched) + focused regression + rebuilt bundles committed with source. |
| 2 · Multi-screen pass | Consistency/polish across several screens; no product-wide claim | Tier 1 requirements + mini-ledger (scope, findings, evidence, results) + an independent-context verification pass before closing. |
| 3 · Full audit | Product-wide / exhaustive / maturity / redesign / pre-release | Gates A–D below; Gate R before any public deploy. |

Pick the lowest tier that covers the blast radius. State the chosen tier (and
why) in the commit body or ledger when not obvious; the user can overrule.

## Verification disciplines (all tiers)

1. **Sibling-screen check** — after changing any shared primitive
   (`.studio-shell` members, topbar, modals, shared tokens), verify at least
   one sibling screen that consumes it. The library/gallery/collection/
   community screens share one layout contract; no per-screen width caps.
2. **Four async states** — changes touching gallery/community/collection must
   verify loading / empty / error / content, forcing states via network
   interception or fixtures, never one static frame.
3. **Scroll/mask contract** — fade masks and overscroll rules live only on the
   actual scrolling element; when moving scroll containers, grep the old
   container name for leftovers.
4. **Modal self-description** — a modal reused by several entry points states
   its destination in the title, not in small-print hints.

## Core rules (Tiers 2–3)

- Review the running product, not source alone.
- Evidence binds to a candidate ID: `git rev-parse --short HEAD` + a
  `git status --porcelain` snapshot + `shasum -a 256 app.bundle.js styles.css`.
  Later relevant changes invalidate affected evidence.
- Result states: `not-run | pass:<candidate> | fail:<issue> |
  retest-pending:<issue> | waived:<decision> | n/a:<reason> |
  source-pass:<what remains unseen> | tool-invalid:<cause>`.
  `source-pass` and `tool-invalid` are provisional: upgrade them to live
  evidence or a recorded user waiver before Gate D. They are forbidden in a
  Gate R sign-off.
- Durable evidence: a frozen ledger cites only paths under
  `docs/ui-audits/evidence/<ledger-date>/` (compressed, keep an audit under
  ~2 MB; the repo is deployed publicly). `/tmp` paths are allowed mid-flight
  only.
- Severity: P0 blocks a core journey, data safety, or security; P1 seriously
  breaks a frequent task, accessibility, or multiple surfaces; P2 visible
  inconsistency or polish/edge defect; P3 preference. P0/P1 are never
  self-waived; P2 waivers need the user. Issue states:
  `open | in-progress | ready-for-verification | verified | reopened | waived`.
- Contracts: validate documents and regressions against confirmed intent and
  live behavior; update stale contracts in the same change as the fix; record
  conflicts as ledger Decisions.
- Aesthetic findings cite a screenshot plus a sibling, contract, product
  principle, or named reference; "feels off" alone is insufficient.

## Independence

Verification happens in an independent context: a subagent with a task-scoped
brief, a fresh session, or — at minimum — a counterexample pass executed
before reading the implementation narrative. Batches default to
implementer ≠ verifier. When tooling prevents real independence, record an
explicit waiver in the ledger; never degrade silently.

## Gate A — Scope and baseline (Tier 3)

Record: candidate ID and dirty paths; in/out scope and observable success
conditions; sources reviewed (docs, tokens, breakpoints, commit range); core
journeys; evidence directory; aggregate test command and baseline result;
reviewer/pass assignments. Run the app and capture core-journey baselines.
Gate A passes when every field is concrete and the candidate reproducible.

## Gate B — Discovery and coverage freeze (Tier 3)

Scenario rows, not a Cartesian matrix. Inventory at minimum: home; bead
choose/place/inspect/iron/cool/finish; drawing; gallery; collection;
community; modals; overlays/feedback; shared components;
empty/loading/error/disabled/destructive states. Default viewports 390×844,
1024×768, 1440×1000; derive breakpoint-edge cases from current contracts; add
mouse/hover/drag, touch, keyboard/focus/dialog, reduced-motion, zoom, and
theme scenarios (all themes for global token/material changes). Run discovery
as three lenses — visual system, interaction/accessibility,
responsive/coverage — as independent passes (separate agents when available,
separate context otherwise). High-risk seams get a second cross-check. Raw
findings are append-only; map to canonical issues without deleting evidence.
Gate B passes when every inventory item has a scenario, findings are
synthesized with acceptance criteria, and scope plus issue ledger v1 freeze.

**Verification mode:** when re-auditing a closed ledger, Gate B is replaced by
the prior frozen ledger + its recorded gaps + a new-risk scan of commits since
its final candidate.

## Gate C — Batch implementation (Tier 3; Tier 2 uses the batch shape without ceremony)

Each batch declares issue IDs, owned paths, affected scenarios, acceptance
criteria, and a verifier. Parallel implementation requires isolated worktrees;
shared-worktree implementation is single-writer and serialized. Batches are
vertically complete: source, rebuilt bundles, tests, affected contracts,
browser rerun, console/page-error check, before/after evidence. The
implementer sets `ready-for-verification`; only the verifier sets `verified`.

## Gate D — Independent closeout (Tier 3)

A non-implementer (independent context per above) runs a counterexample pass
over the user goal, changed/high-risk scenarios, a full-surface smoke, and a
predeclared sample of unaffected scenarios — before reading the
implementation narrative — then retests every fix and sibling consumer. New
P0/P1 or change-induced P2 reopens targeted work, not the whole audit.
Completion: every scenario terminal (`pass`/`waived`/justified `n/a`), no open
P0/P1, every P2 verified or user-waived, tests green, contracts updated,
sign-off recorded against the final candidate.

## Gate R — Release (any tier, before any public deploy)

Run at the exact release candidate; record results in the ledger:

1. `npm test` — every registered suite green.
2. Bundle parity — `npm run build` then `git status --porcelain app.bundle.js
   styles.css` prints nothing.
3. `npm run test:release` and `npm run test:csp-sync` individually confirmed.
4. Offline smoke — `index.html` over `file://`: app boots, core screens
   render, cloud-backed screens degrade gracefully, no console errors.
5. Page metadata audit — title, description, favicon, `lang`, viewport,
   social/OG tags; recommend additions when absent.
6. Console sweep — core journeys on the served build with zero console or
   page errors.
7. Copy proofread — Chinese UI copy against the `PRODUCT.md` register.
8. Backend state — deployed CloudBase function matches the repo;
   `ADMIN_TOKEN` set only as env; `ALLOWED_ORIGINS` matches the public
   origin. Credential-gated items become a numbered user handoff list with
   exact steps — never silent skips.
9. No `source-pass` / `tool-invalid` cell remains anywhere in the ledger.
````

- [ ] **Step 2: Verify structure**

Run: `grep -c "^## " docs/UI_REVIEW_PROTOCOL.md`
Expected: `9` (Tier router, Verification disciplines, Core rules, Independence, Gates A, B, C, D, R).

- [ ] **Step 3: Commit**

```bash
git add docs/UI_REVIEW_PROTOCOL.md
git commit -m "docs(process): tier the UI review protocol and add release gate

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 2: Align `docs/ui-audits/TEMPLATE.md` with protocol v2

**Files:**
- Modify: `docs/ui-audits/TEMPLATE.md` (full replacement)

- [ ] **Step 1: Replace the entire file content with:**

````markdown
# UI Audit: <scope>

Status: Gate A / B / C / D / R
Tier: 2 (mini-ledger) | 3 (full)
Candidate ID: `<git rev-parse --short HEAD>-<bundle-hash-prefixes>`
Evidence dir: `docs/ui-audits/evidence/<YYYY-MM-DD-slug>/`

Result-state legend: `not-run | pass:<candidate> | fail:<issue> |
retest-pending:<issue> | waived:<decision> | n/a:<reason> |
source-pass:<unseen> | tool-invalid:<cause>` — `source-pass`/`tool-invalid`
must be upgraded or user-waived before Gate D; forbidden in Gate R.

## Charter

| Candidate/dirty paths | In/out scope | Success conditions | Sources/commit range | Themes/breakpoints | Core journeys | Tests/baseline | Reviewers/passes |
|---|---|---|---|---|---|---|---|
| | | | | | | | |

## Decisions

| ID | Conflict/question | Evidence | Decision/rationale | Affected contracts | Approver |
|---|---|---|---|---|---|

## Inventory and scenarios

| Inventory ID | Surface/component/behavior | Scenario IDs |
|---|---|---|

| Scenario ID | Trigger/fixture | Viewport | Theme | Input/state | Observable expectation | Evidence | Primary/cross-check | Result |
|---|---|---|---|---|---|---|---|---|

## Findings and issues

| Raw ID | Reviewer | Severity | Scenarios | Observation/expected | Evidence | Root-cause hypothesis | Gaps/conflicts |
|---|---|---|---|---|---|---|---|

| Issue ID | Raw IDs | Severity/reason | Acceptance criteria | Fix+sibling scope | Implementer | Verifier | Candidate | Status |
|---|---|---|---|---|---|---|---|---|

## Batches

| Batch | Issues | Owned paths | Tests/contracts/bundles | Scenarios/evidence | Runtime errors | Implementer | Verifier | Result |
|---|---|---|---|---|---|---|---|---|

## Gate R — Release checklist

| # | Check | Result | Evidence/notes |
|---|---|---|---|
| 1 | All registered suites green | | |
| 2 | Bundle parity after rebuild | | |
| 3 | `test:release` + `test:csp-sync` | | |
| 4 | Offline `file://` smoke | | |
| 5 | Page metadata audit | | |
| 6 | Console sweep, core journeys | | |
| 7 | Chinese copy proofread | | |
| 8 | Backend state / handoffs | | |
| 9 | No `source-pass`/`tool-invalid` left | | |

## User handoffs

Numbered, credential-gated steps the user must run, with exact commands.

## Sign-off

| Final candidate | Reviewer | Changed/high-risk cases | Smoke/sample cases | Counterexamples | Retest evidence | Verdict |
|---|---|---|---|---|---|---|

Commands run / coverage / P3 items / waivers / risks:
````

- [ ] **Step 2: Commit**

```bash
git add docs/ui-audits/TEMPLATE.md
git commit -m "docs(ui): align audit ledger template with protocol v2

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 3: Reroute `AGENTS.md` and add plan hygiene rules

**Files:**
- Modify: `AGENTS.md`

- [ ] **Step 1: Update the Sources of Truth line.** Replace:

```
- `docs/UI_REVIEW_PROTOCOL.md` owns the mandatory process for broad UI audits and polish passes. It defines evidence and completion rules, not visual taste or product direction.
```

with:

```
- `docs/UI_REVIEW_PROTOCOL.md` owns the tiered process for UI changes, audits, and release readiness. It defines evidence and completion rules, not visual taste or product direction.
```

- [ ] **Step 2: Replace the whole `## Comprehensive UI Review Workflow` section** (heading plus its two paragraphs, ending before `## Build, Test, and Development Commands`) with:

```markdown
## UI Review & Release Workflow

Route UI work through `docs/UI_REVIEW_PROTOCOL.md` by blast radius. Tier 1 (one or two screens, or one component family): no ledger — the protocol's verification disciplines, desktop + mobile checks (tablet landscape when shared canvas/layout code changes), focused regressions, and rebuilt bundles. Tier 2 (multi-screen consistency or polish): Tier 1 plus a mini-ledger and an independent-context verification pass. Tier 3 (product-wide, exhaustive, maturity, redesign, or pre-release): Gates A–D, and Gate R before any public deploy. State the chosen tier when it is not obvious; the user can overrule.

In Tier 3, do not begin implementation before Gate B freezes the discovery ledger. Shared-worktree implementation stays single-writer and serialized by batch; parallel implementation requires isolated worktrees. Verification happens in an independent context (subagent, fresh session, or a counterexample pass executed before reading the implementation narrative); when tooling prevents real independence, record a waiver in the ledger instead of degrading silently. Treat design documents and regression checks as contracts to validate, not excuses to preserve stale behavior: on conflict, record the decision and update the stale contract in the same change.

## Plans & Specs Hygiene

Design specs live in `docs/superpowers/specs/`, implementation plans in `docs/superpowers/plans/`, audit ledgers in `docs/ui-audits/` — always committed, always English (language policy). Every spec/plan starts with a `Status:` line — `Draft`, `Approved`, `Executed <commit>`, or `Obsolete <reason>` — updated in the same session that changes its state. Root-level scratch plan files are forbidden; when a plan file dies, delete it together with any `.gitignore` entry that existed only for it.
```

- [ ] **Step 3: Verify**

Run: `grep -n "^## " AGENTS.md`
Expected: the old `Comprehensive UI Review Workflow` heading is gone; `UI Review & Release Workflow` and `Plans & Specs Hygiene` appear between `Project Structure & Module Organization` and `Build, Test, and Development Commands`.

- [ ] **Step 4: Commit**

```bash
git add AGENTS.md
git commit -m "docs: route UI work by tier and add plan hygiene rules

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 4: Housekeeping — delete dead plan files, prune `.gitignore`

**Files:**
- Delete: `AUDIT_FIX_PLAN.md` (untracked), `docs/superpowers/specs/2026-07-08-sketch-ui-step2.md` (untracked)
- Modify: `.gitignore` (conditional)

- [ ] **Step 1: Confirm the audit fixes really are in code** (idempotent re-check):

```bash
grep -n "startsWith(ROOT + path.sep)" server.cjs
grep -n "crypto.randomInt(SHORT_ID_ALPHABET.length)" cloudbase/share-api/index.js
grep -n 'data-source-code="${escapeHtml(item.sourceCode)}"' src/ui.js
grep -n "const cardWidth = item.width ?? item.size;" admin.js
```
Expected: one hit each. If any is missing, STOP and report — do not delete the plan file.

- [ ] **Step 2: Delete the dead files** (both untracked; plain `rm`):

```bash
rm AUDIT_FIX_PLAN.md docs/superpowers/specs/2026-07-08-sketch-ui-step2.md
```

- [ ] **Step 3: Prune `.gitignore` name-by-name entries whose files are gone.**

```bash
for f in CLAUDE-FABLE-5.md FINISH_REDESIGN_PLAN.md SHARE_CARD_INTEGRATION_PLAN.md; do
  [ -e "$f" ] && echo "EXISTS: $f" || echo "gone: $f"
done
ls social-card-share/_*.mjs 2>/dev/null || echo "gone: social-card-share/_*.mjs"
```

Rule: for each `gone` name, delete its `.gitignore` line. For each `EXISTS`, keep the file and its line, and add a ledger note under User handoffs ("local scratch file X still exists — delete or keep?"). Keep the generic patterns (`_*.png`, `_*.html`, `preview-*.html`, `.superpowers/`, `.claude/`) untouched.

- [ ] **Step 4: Commit** (only if `.gitignore` changed; deletions of untracked files don't need git):

```bash
git add .gitignore
git commit -m "chore: drop gitignore entries for removed scratch plans

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 5: Open the pre-publish verification ledger

**Files:**
- Create: `docs/ui-audits/2026-07-16-prepublish-verification.md`
- Create: `docs/ui-audits/evidence/2026-07-16-prepublish/` (directory, created implicitly by first evidence file)

**Interfaces:**
- Produces: the ledger every later task appends to; the candidate ID string used in all result cells.

- [ ] **Step 1: Compute the candidate ID**

```bash
git rev-parse --short HEAD
git status --porcelain          # expected: empty (clean tree)
shasum -a 256 app.bundle.js styles.css
```

Candidate ID format: `<short-head>-<first 8 of app.bundle.js hash>-<first 8 of styles.css hash>`.

- [ ] **Step 2: Create the ledger** from the new TEMPLATE.md with these charter values:

- Status: `Gate A`; Tier: `3 (verification mode)`.
- In scope: independently confirm the closed `2026-07-16-full-ui-review.md` sign-off; upgrade all its `source-pass`/`tool-invalid` cells to live evidence; Gate R.
- Out of scope: new full-product discovery; deployment actions requiring credentials (handoffs instead); design-direction changes.
- Sources: the closed ledger; commits since its final candidate `9d4866c` (`git log --oneline 9d4866c..HEAD`); spec `docs/superpowers/specs/2026-07-16-review-rules-v2-prepublish-audit-design.md`.
- Tests/baseline: `npm test` (aggregate; auto-resolves all `test:*`).
- Reviewers/passes: primary agent capture + independent-context closeout (Task 16).
- Decisions: carry over one row — `D-101: CloudBase share-api fixes (CSPRNG short codes, unpublish width/height) are committed but NOT deployed; redeploy is a user handoff (from retired AUDIT_FIX_PLAN.md).`

- [ ] **Step 3: Commit**

```bash
git add docs/ui-audits/2026-07-16-prepublish-verification.md
git commit -m "docs(audit): open pre-publish verification ledger

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 6: Shared evidence-capture driver

**Files:**
- Create: `scripts/evidence-capture-lib.mjs`
- Test: smoke script in scratchpad (not committed)

**Interfaces:**
- Produces: `withApp(options, scenario) -> Promise<string[]>` (returns console/page errors) and `VIEWPORTS` map. Options: `{ viewport, hasTouch, reducedMotion, blockCloud, cloudStub: {status, body}, initScript }`. Scenario signature: `async (page, { consoleErrors, port }) => {}`. Tasks 7–12 depend on these exact names.

- [ ] **Step 1: Create `scripts/evidence-capture-lib.mjs`:**

```js
// Shared Playwright driver for UI-audit evidence capture (tooling, not a
// regression). Serves the repo root over HTTP, opens Chromium at a given
// viewport, optionally intercepts CloudBase traffic to force async states,
// and hands the page to a scenario callback. Returns collected console and
// page errors so callers can assert on them.
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import { chromium } from 'playwright';

const root = new URL('..', import.meta.url).pathname;
const mime = {
  '.css': 'text/css',
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.mp3': 'audio/mpeg',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
};

export const VIEWPORTS = {
  phone: { width: 390, height: 844 },
  phoneLandscape: { width: 844, height: 390 },
  tablet: { width: 1024, height: 768 },
  tabletPortrait: { width: 768, height: 1024 },
  desktop: { width: 1440, height: 1000 },
};

export async function withApp(options, scenario) {
  const {
    viewport = VIEWPORTS.desktop,
    hasTouch = false,
    reducedMotion = false,
    blockCloud = false,
    cloudStub = null,
    initScript = null,
  } = options;
  const server = createServer(async (req, res) => {
    try {
      let path = decodeURIComponent((req.url || '/').split('?')[0]);
      if (path === '/') path = '/index.html';
      const filePath = join(root, normalize(path).replace(/^(\.\.[/\\])+/, ''));
      const body = await readFile(filePath);
      res.writeHead(200, { 'content-type': mime[extname(filePath)] || 'application/octet-stream' });
      res.end(body);
    } catch {
      res.writeHead(404);
      res.end('Not found');
    }
  });
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const { port } = server.address();
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport,
    hasTouch,
    deviceScaleFactor: 1,
    reducedMotion: reducedMotion ? 'reduce' : 'no-preference',
  });
  if (cloudStub) {
    await context.route(/tcloudbase/, (route) => route.fulfill({
      status: cloudStub.status ?? 200,
      contentType: 'application/json',
      body: JSON.stringify(cloudStub.body ?? { ok: true, items: [] }),
    }));
  } else if (blockCloud) {
    await context.route(/tcloudbase/, (route) => route.abort());
  }
  if (initScript) await context.addInitScript(initScript);
  const page = await context.newPage();
  const consoleErrors = [];
  page.on('console', (msg) => { if (msg.type() === 'error') consoleErrors.push(msg.text()); });
  page.on('pageerror', (err) => consoleErrors.push(String(err)));
  try {
    await page.goto(`http://127.0.0.1:${port}/`);
    await scenario(page, { consoleErrors, port });
  } finally {
    await browser.close();
    await new Promise((resolve) => server.close(resolve));
  }
  return consoleErrors;
}
```

- [ ] **Step 2: Smoke-test it.** Write to scratchpad `smoke.mjs`:

```js
import { withApp } from '/Users/Sakuro/beam/scripts/evidence-capture-lib.mjs';
const out = '/Users/Sakuro/beam/docs/ui-audits/evidence/2026-07-16-prepublish/smoke--home--desktop.png';
const errors = await withApp({}, async (page) => {
  await page.waitForSelector('#startBeadButton', { timeout: 15000 });
  await page.screenshot({ path: out });
});
if (errors.length) { console.error('console errors:', errors); process.exit(1); }
console.log('ok');
```

Run: `node <scratchpad>/smoke.mjs`
Expected: `ok`, and the PNG exists. (This also creates the evidence dir.)

- [ ] **Step 3: Commit**

```bash
git add scripts/evidence-capture-lib.mjs docs/ui-audits/evidence/2026-07-16-prepublish/smoke--home--desktop.png
git commit -m "chore(scripts): add shared evidence capture driver

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 7: Phase 1 — spot-check the ten fixed issues

**Files:**
- Create: evidence PNGs under `docs/ui-audits/evidence/2026-07-16-prepublish/` (naming: `p1-<issue>--<surface>--<viewport>.png`)
- Modify: ledger (scenario rows + results)
- Scenario scripts: scratchpad only (import the lib by absolute path)

**Interfaces:**
- Consumes: `withApp`, `VIEWPORTS` from Task 6.

Procedure notes used below: "3 viewports" = phone/tablet/desktop from `VIEWPORTS`; every check records a ledger scenario row with result `pass:<candidate>` or `fail:<new issue id>`; hover checks run desktop only; discovery greps run before scripting when a selector is listed as *(grep)*.

- [ ] **Step 1: UI-001 home hover/scatter.** Desktop: `page.hover('#startBeadButton')`, screenshot; `page.hover('#startDrawButton')`, screenshot. Assert via `getComputedStyle`: `document.querySelector('.start-row-bead')` has no `::after` content (`getComputedStyle(el,'::after').content === 'none'`). Expect: identical structural hover vocabulary across rows (border/fill/shadow), no bead scatter. 3 viewports for the static row layout, hover desktop-only.
- [ ] **Step 2: UI-002 zoom reflow.** Run `npm run test:home-reflow` (expected PASS). Live: viewport `{width: 640, height: 360}` (=1280×720 at 200%), assert `document.scrollingElement.scrollWidth <= window.innerWidth`, scroll to bottom, all five `id="start*Button"` (enumerate: `grep -o 'id="start[A-Za-z]*Button"' index.html | sort -u`) plus featured section visible after scrolling. Screenshot top + bottom.
- [ ] **Step 3: UI-003 collection viewer dialog.** Seed one work via `initScript`: `localStorage.setItem('beadWorkshopCollection.v1', JSON.stringify([entry]))` where `entry` uses the shape from `src/main.js` `saveCurrentWork()` — `{id:'1720000000-seed', name:'验收种子', craft:<default from src/state.js (grep "craft:")>, grade:'A', date:'07-16', size:<first pattern size>, width:<same>, height:<same>, buildMs:60000, placed:<first pattern's cells array>}`; get the first pattern's `id/size/cells` with `node -e "import('./src/patterns.js').then(m => { const p = Object.values(m)[0][0] ?? m.patterns?.[0]; console.log(JSON.stringify(p).slice(0, 400)); })"` (adjust to the module's actual export, inspect with `grep -n "export" src/patterns.js | head`). Open collection (`#collectionButton` from home topbar or `#startCollectionButton` — use the enumerated ids), click the seeded card, expect enlarged viewer: focus trapped (Tab cycles inside), `Escape` closes and returns focus to the card, background inert, square ink-paper frame (`border-radius` computed `0px`). Screenshot open state, 3 viewports. Also run `npm run test:modal-accessibility` (expected PASS).
- [ ] **Step 4: UI-004 showcase dots.** Locate indicator selector *(grep: `grep -n "dots\|indicator\|carousel" index.html src/styles/components.css | head`)*. On phone + desktop: assert indicators have no `role="button"`, no `tabindex`, computed `pointer-events: none` (or are ≥44px labeled controls if the fix chose that branch — record which). Screenshot.
- [ ] **Step 5: UI-005 share-code labels + modal self-description.** Open the drawing short-code modal via `#drawShortCodeButton`; assert the textarea has `aria-label` or `aria-labelledby` resolving to a non-empty string; title states the drawing destination. Open the bead-side import entry *(grep: `grep -n "短码\|导入" index.html | head` for the opener id)*; assert its title states the bead destination (discipline 4). Run `npm run test:share-code-title` (expected PASS). Screenshots both, phone + desktop.
- [ ] **Step 6: UI-007 tab order.** Run `npm run test:ui-quality` and `npm run test:mobile-tab-order` (both expected PASS). Live phone: on drawing screen, Tab from top; record the first five focus stops (`document.activeElement.id`) into the ledger row.
- [ ] **Step 7: UI-008 status tokens.** On choose screen open the remap panel; for two themes (default + 草木, switched via settings modal swatches `[data-theme]`, opener: `#gallerySettingsButton` equivalent on the current screen or home settings), read `getComputedStyle` of the status chip *(grep: `grep -n "remap-status\|choose-status" src/styles/components.css | head` for the selector)*; assert its colors match `tokens.css` custom-property values, not the retired fixed neutrals. Screenshot both themes.
- [ ] **Step 8: UI-009 work-frame tier.** Screenshot the drawing board (desktop) and the bead board (desktop, place phase via `#startBeadButton` → choose first pattern → `#chooseStartButton`); assert both primary squares share border-width and shadow tier (`getComputedStyle` on both, values equal). Record values in ledger.
- [ ] **Step 9: UI-010 collection empty state.** With `initScript` clearing the key (`localStorage.removeItem('beadWorkshopCollection.v1')`), open collection; assert empty-state frame has no dashed border (`border-style` ≠ `dashed`); screenshot, 3 viewports.
- [ ] **Step 10: UI-011 PRODUCT.md prose.** Run `grep -n "玻璃\|圆角\|glass" PRODUCT.md` — expected: no hits describing the retired rounded/glass language as current (mentions inside anti-reference/history context are acceptable; record the hits and verdict in the ledger).
- [ ] **Step 11: Ledger + commit.** Add one scenario row per check with evidence paths and `pass:<candidate>`/`fail:` results. Any `fail:` becomes a new issue row (P-severity per protocol).

```bash
git add docs/ui-audits/2026-07-16-prepublish-verification.md docs/ui-audits/evidence/2026-07-16-prepublish/
git commit -m "docs(audit): phase 1 spot-check evidence for closed-review fixes

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 8: Phase 2A — async four-states, live (gallery / community / collection)

**Files:**
- Create: evidence `p2a-*.png`; Modify: ledger

**Interfaces:**
- Consumes: `withApp` options `blockCloud` (error state), `cloudStub` (empty/content states).

State forcing map (applies to every step): **loading** = `cloudStub` with a `route.fulfill` delayed via `await new Promise(r => setTimeout(r, 4000))` before fulfilling (screenshot during the wait); **empty** = `cloudStub: { body: { ok: true, items: [] } }`; **error** = `blockCloud: true`; **content** = `cloudStub: { body: <captured real shape> }` — capture one real response shape first by running once without interception and logging `page.on('response')` bodies for `/api/gallery/list` (or reuse the shape asserted in `scripts/community-api-regression.mjs`, check with `grep -n "items" scripts/community-api-regression.mjs | head`).

- [ ] **Step 1: Gallery, tablet 1024×768** — all four states, screenshot each; assert per state: spinner/skeleton visible; empty copy + no orphan buttons; error state shows retry control; content grid renders. Error state additionally at phone + desktop (the closed review only source-reviewed error branches everywhere).
- [ ] **Step 2: Gallery retry works** — from error state, re-enable network (`context.unroute(/tcloudbase/)` — expose by running this scenario with `cloudStub: null, blockCloud: true` then calling `page.context().unroute(/tcloudbase/)` before clicking `#galleryRefreshButton`), expect content/empty replaces error. Ledger row.
- [ ] **Step 3: Community, tablet** — compose box + tabs across the four states (same forcing map, endpoint `/api/community/*` — confirm paths with `grep -n "api/" src/community-api.js | head`); failure/rollback: with `blockCloud`, submit a message, expect optimistic entry rolls back + error toast (the exact contract: `grep -n "rollback\|回滚\|失败" src/community.js | head`). Screenshots.
- [ ] **Step 4: Collection viewer keyboard lifecycle on tablet** (closed review verified phone/desktop rows fully, tablet cell relied on shared code — re-verify): seeded entry, open viewer, Escape closes, focus returns. Screenshot.
- [ ] **Step 5: Ledger + commit** (message: `docs(audit): phase 2a live async-state evidence`).

---

### Task 9: Phase 2B — drawing mobile/tablet, settings + five themes, modal recaptures

**Files:**
- Create: evidence `p2b-*.png`; Modify: ledger

- [ ] **Step 1: Drawing idle/palette, phone + tablet** (`hasTouch: true` for phone): open via `#startDrawButton`; screenshot idle; open mobile palette (opener: `grep -n "drawPalette\|调色" index.html | head` → the toggle id), screenshot open; close via `#drawPaletteCloseButton`. Assert every `.color-chip` bounding box ≥ 44×44 on phone (`el.getBoundingClientRect()`).
- [ ] **Step 2: Settings modal, phone + tablet** — open (home settings opener: enumerate `grep -o 'id="[a-z]*SettingsButton"' index.html | sort -u`, use the home/bead one), screenshot; verify all controls reachable and modal scrolls inside itself (no page scroll behind).
- [ ] **Step 3: Five themes sweep, phone + tablet** — enumerate swatches at runtime: `const ids = [...document.querySelectorAll('[data-theme]')].map(b => b.dataset.theme)`; for each: click swatch, wait 300 ms, screenshot home. Assert per theme: body background changes (record computed `background-color`/table token), text/ink contrast is not visibly broken (spot: `getComputedStyle(document.body).color` unchanged ink token). 10 screenshots (5 themes × 2 viewports) — keep each < 100 KB via `sips -Z 700`.
- [ ] **Step 4: Recapture previously `tool-invalid` shots** — the closed ledger marked settings/theme-modal captures compositor-invalid; these are the Step 2–3 captures above; mark the old cells `pass:<candidate>` with new evidence paths.
- [ ] **Step 5: Ledger + commit** (`docs(audit): phase 2b drawing, settings and theme evidence`).

---

### Task 10: Phase 2C — breakpoint seams, orientation, hover vocabulary, reduced motion

**Files:**
- Create: evidence `p2c-*.png`; Modify: ledger

- [ ] **Step 1: Seam sweep on home + gallery (stubbed content)** — widths 375, 420, 620, 860, 861, 1179, 1180, 1280 at height 900: for each, assert no horizontal overflow (`document.scrollingElement.scrollWidth <= window.innerWidth`) and screenshot only the four seam pairs (860/861, 1179/1180) plus 375; record the rest as asserted-no-screenshot ledger rows (budget).
- [ ] **Step 2: Orientation** — phoneLandscape 844×390 on home + bead place; tabletPortrait 768×1024 on gallery. Assert no overflow; screenshot each.
- [ ] **Step 3: Hover vocabulary, desktop** (never captured at the final candidate): hover one exemplar per family — start row, gallery card (stubbed content), collection card (seeded), library pattern card, primary button (`#chooseStartButton`), topbar icon button — screenshot each hovered. Assert cards do not translate/move on hover (the Gate D counterexample fixed in `9d4866c`): compare `getBoundingClientRect().top` before/after hover, delta 0.
- [ ] **Step 4: Reduced motion** — `reducedMotion: true`: home carousel does not auto-advance (capture two screenshots 3 s apart, assert same active slide), no CSS animation on start rows (`getComputedStyle(el).animationName === 'none'`). Ledger rows.
- [ ] **Step 5: Ledger + commit** (`docs(audit): phase 2c seams, hover and reduced-motion evidence`). After this commit, **zero `source-pass`/`tool-invalid` cells may remain** — verify with `grep -n "source-pass\|tool-invalid" docs/ui-audits/2026-07-16-prepublish-verification.md` → only the legend line.

---

### Task 11: Gate R (1–3) — suites, bundle parity, release/CSP checks

- [ ] **Step 1:** `npm test` — expected: every registered suite passes (aggregate runner auto-resolves `test:*`; currently 27). Paste the summary line into the ledger Gate R table row 1.
- [ ] **Step 2:** `npm run build && git status --porcelain app.bundle.js styles.css` — expected: no output. If bundles change, the committed bundles were stale: STOP, commit the rebuilt bundles as `fix(build): refresh stale committed bundles`, re-run Task 11 from Step 1, and record the incident in the ledger.
- [ ] **Step 3:** `npm run test:release` and `npm run test:csp-sync` individually — expected: PASS each. Ledger rows.
- [ ] **Step 4: Commit ledger** (`docs(audit): gate R automated checks`).

---

### Task 12: Gate R (4–6) — offline smoke, metadata audit, console sweep

- [ ] **Step 1: Offline `file://` smoke** via Playwright (no HTTP server): `chromium.launch()`, `page.goto('file:///Users/Sakuro/beam/index.html')`; collect console/page errors; visit home → bead choose → drawing; expect: screens render, gallery/community entries show their offline/error state gracefully, **zero uncaught errors** (CSP-blocked cloud fetches must surface as handled UI states, not exceptions). Screenshot home. Ledger row.
- [ ] **Step 2: Metadata audit** — read `index.html` head (`sed -n '1,60p' index.html`) and check: `<html lang>` value; title; `meta description`; `og:title/site_name/type/image/description/url`; twitter card; favicon + apple-touch-icon + manifest present (already partially confirmed: title/OG basics/manifest exist). For each missing/incorrect item add a P2 recommendation row to the ledger findings (additions are user-approved fixes, not silent edits). Verify `images/` contains the OG image referenced (cross-check `scripts/gen-og-image.mjs` output path).
- [ ] **Step 3: Console sweep** — reuse Task 7/8 scenario runs' collected `consoleErrors`: assert all were empty; additionally one full core-journey run (home → choose → place a few beads (sandbox toggle `#sandboxButton`) → inspect → iron → cool → finish → collection) at desktop with zero console/page errors. Ledger row 6.
- [ ] **Step 4: Commit ledger + evidence** (`docs(audit): gate R offline, metadata and console evidence`).

---

### Task 13: Gate R (7) — Chinese copy proofread

- [ ] **Step 1: Extract copy.** `grep -oE '"[^"]*[一-龥][^"]*"' src/*.js | sort -u > <scratchpad>/copy-js.txt` and read `index.html` body text; also toasts (`grep -n "showToast" src/*.js`).
- [ ] **Step 2: Proofread** against `PRODUCT.md` Register section (read it first): typos, tone drift (治愈系 register), inconsistent terminology (e.g., 图纸/作品/短码 used consistently), punctuation width consistency. Output: a ledger findings list, each item `copy-<n>` with location + suggested wording, severity P2/P3. No edits in this task.
- [ ] **Step 3: Commit ledger** (`docs(audit): gate R copy proofread findings`).

---

### Task 14: Gate R (8) — backend state + user handoff list

- [ ] **Step 1: Verify repo-side backend facts:** `cat cloudbaserc.json` (envId `beam-prod-d7g2xz88ee6532631`, runtime `Nodejs18.15`); `grep -n "ALLOWED_ORIGINS\|ADMIN_TOKEN" cloudbase/share-api/index.js | head` (defaults); confirm no secret committed: `grep -rn "ADMIN_TOKEN" --include="*.js" --include="*.json" . | grep -v "process.env\|例\|env" ` → expected no literal token.
- [ ] **Step 2: Write the User handoffs section** of the ledger, numbered:
  1. `tcb login` && `tcb env list` (confirm env `beam-prod-d7g2xz88ee6532631`).
  2. CloudBase console → database: collections `shares`, `gallery_submissions`, `gallery_items`, `rate_limits`, `admin_guards` all exist, admin-only permissions.
  3. Function env vars: `ADMIN_TOKEN` (long random, never in git), `ALLOWED_ORIGINS` = final public origin(s), comma-separated — **must include the Cloudflare Pages domain and any custom domain**.
  4. Deploy: `cd cloudbase/share-api && npm install && cd ../.. && tcb fn deploy share-api --env-id beam-prod-d7g2xz88ee6532631` (this ships the CSPRNG short-code + unpublish width/height fixes — D-101).
  5. Post-deploy smoke: `curl -s -X POST <API_BASE>/api/gallery/list -H "content-type: application/json" -d '{"limit":3}'` → `{"ok":true,...}`.
  6. Cloudflare Pages: connect repo, Framework preset None, build command empty, output `/`; no env vars; after first deploy `curl -sI <pages-url> | grep -i content-security-policy` → header present.
  7. Optional custom domain → then update `ALLOWED_ORIGINS` (step 3) accordingly.
  8. Final human acceptance: real phone / tablet / desktop pass + export one real share poster (outstanding from the sketch redesign).
  9. Any `EXISTS` scratch files from Task 4 Step 3 — keep or delete.
- [ ] **Step 3: Commit ledger** (`docs(audit): gate R backend checks and user handoff list`).

---

### Task 15: Phase 4 — fix batches (loop, only if findings exist)

For each P0–P2 issue recorded in Tasks 7–14, in severity order:

- [ ] **Step 1:** Declare a batch row in the ledger: issue IDs, owned paths, affected scenarios, acceptance criteria.
- [ ] **Step 2:** Fix. If `src/` changed: `npm run build`; stage bundles with source. If a contract (regression, DESIGN.md, PRODUCT.md) is stale per the fix, update it in the same commit.
- [ ] **Step 3:** Focused regression(s) for the area + re-run the affected evidence scenario(s) — same script, new screenshot suffixed `--fixed`; sibling-screen recheck per discipline 1.
- [ ] **Step 4:** Commit (`fix(<area>)`/`polish(<area>)`: describe the issue, reference the ledger issue ID in the body). Set the issue `ready-for-verification`.
- [ ] **Step 5:** After all batches: recompute the candidate ID (Task 5 Step 1 commands) — evidence for re-run scenarios binds to the new candidate; unaffected evidence remains valid per protocol (record the mapping in the ledger).

P2 copy/metadata recommendations the user hasn't approved stay `open` with `waived:` pending user decision — list them in the final report instead of fixing silently.

---

### Task 16: Independent closeout + sign-off

- [ ] **Step 1: Independent counterexample pass** — dispatch a fresh subagent whose brief contains ONLY: repo path, `npm run dev`/lib usage, the ledger's scenario ID list + viewports (no fix narrative, no issue table), and the instruction: "Drive these journeys on the current build; report anything broken, inconsistent, or off-contract as counterexamples with screenshots." If subagents are unavailable, run the pass in a fresh session before re-reading the ledger, and record the independence method used.
- [ ] **Step 2:** Triage counterexamples: new P0/P1 or change-induced P2 → back to Task 15 (targeted), else record as P3/waived.
- [ ] **Step 3:** Final verification: `npm test` green; bundle parity (Task 11 Step 2 command, empty output); `grep -n "source-pass\|tool-invalid" <ledger>` → legend only; every Gate R row filled `pass`/`handoff`.
- [ ] **Step 4:** Fill the Sign-off table with the final candidate ID; set ledger Status: `Gate R passed — release ready pending user handoffs`.
- [ ] **Step 5:** Update this plan's `Status:` line and the spec's to `Executed <final-commit>`.
- [ ] **Step 6: Final commit**

```bash
git add docs/ui-audits/2026-07-16-prepublish-verification.md docs/ui-audits/evidence/2026-07-16-prepublish/ docs/superpowers/plans/2026-07-16-review-rules-v2-prepublish-audit.md docs/superpowers/specs/2026-07-16-review-rules-v2-prepublish-audit-design.md
git commit -m "docs(audit): close pre-publish verification with release sign-off

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

- [ ] **Step 7:** Report to the user: sign-off status, any open P2 recommendations awaiting their call, and the numbered handoff list (the release is NOT public until they run it).
