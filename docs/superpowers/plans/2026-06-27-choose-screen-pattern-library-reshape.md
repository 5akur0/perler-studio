# Choose-Screen Pattern Library Reshape — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reshape the bead-studio choose screen (图纸库) into a cozy "糖豆托盘" card grid — clean artwork, management moved into a quiet footer row, a real primary CTA, softened thumbnail grid, and a calmer shared workflow stepper.

**Architecture:** Pure DOM + CSS reshape. Card structure changes in `src/ui.js` (`buildLibraryGrid`); all styling in `src/styles/components.css`; thumbnail grid alpha gated by a new `subtleGrid` flag threaded `drawPatternThumb` → `drawPixelPatternPreview` (`src/board-skin.js`). No data-layer or behavior change. Stepper restyle is state-only (no DOM change), so it improves every phase.

**Tech Stack:** Vanilla ES modules, esbuild bundling (`npm run build`), Node regression scripts, Playwright for visual verification.

Spec: `docs/superpowers/specs/2026-06-27-choose-screen-pattern-library-reshape-design.md`

---

## File Structure

- `src/board-skin.js` — `drawPixelPatternPreview`: add optional `cellGridAlpha` so callers can soften the cell grid.
- `src/ui.js` — `drawPatternThumb`: accept `{ subtleGrid }` and pass softened grid + no major guides; `buildLibraryGrid`: drop the over-art controls overlay, add a footer action row (star · name · delete).
- `src/styles/components.css` — 图纸库 block: footer action row, quiet row chips, themed preview mat, primary CTA, and the shared `.workflow-step` dot restyle.
- `scripts/ui-quality-regression.mjs` — lock the reshape: footer row present, no over-art overlay, CTA is a gradient, stepper dot uses a token (no `#cbd1dc`).

---

## Task 0: Branch

- [ ] **Step 1: Create a working branch**

We are currently on `feat/xhs-launch-p0` (== `main`). Do not implement on it directly.

Run:
```bash
git checkout -b feat/choose-library-reshape
git rev-parse --abbrev-ref HEAD
```
Expected: `feat/choose-library-reshape`

---

## Task 1: Soften the thumbnail grid

**Files:**
- Modify: `src/board-skin.js` (`drawPixelPatternPreview`, ~line 142-208)
- Modify: `src/ui.js` (`drawPatternThumb`, line 343-374; call site line 337)

- [ ] **Step 1: Add `cellGridAlpha` to `drawPixelPatternPreview`**

In `src/board-skin.js`, in the destructure block at line 143-152, add `cellGridAlpha`:

```js
  const {
    width,
    height,
    cols,
    rows,
    pixels = [],
    colors = {},
    brand = "#57b8a7",
    table = ["#eef2f4", "#e4eceb", "#d7e2e0"],
    cellGridAlpha = 0.13,
  } = options;
```

Then replace the hardcoded cell-grid stroke (line 192):

```js
    ctx.strokeStyle = `rgba(70, 84, 96, ${cellGridAlpha})`;
```

- [ ] **Step 2: Thread a `subtleGrid` option through `drawPatternThumb`**

In `src/ui.js`, change the signature (line 343) and the `drawPixelPatternPreview` call (line 362-373):

```js
export function drawPatternThumb(canvas, pattern, { subtleGrid = false } = {}) {
```

```js
  drawPixelPatternPreview(ctx, {
    width: w,
    height: h,
    cols,
    rows: rowCount,
    pixels: rows,
    colors: palette,
    brand: theme.brand,
    table: theme.table,
    compact: true,
    shadow: false,
    ...(subtleGrid ? { guides: false, cellGridAlpha: 0.07 } : {}),
  });
```

- [ ] **Step 3: Pass `subtleGrid` only for the library card preview**

In `src/ui.js` `buildLibraryGrid`, line 337, change the draw call:

```js
    drawPatternThumb(card.querySelector("canvas"), displayPattern, { subtleGrid: true });
```

(Other callers — current-pattern thumb, mobile selection, start-showcase — keep the default `subtleGrid:false`, so only the library softens.)

- [ ] **Step 4: Build and verify it compiles**

Run:
```bash
npm run build
```
Expected: `BUILD OK` (no esbuild errors).

- [ ] **Step 5: Commit**

```bash
git add src/board-skin.js src/ui.js app.bundle.js
git commit -m "feat(choose): soften library thumbnail grid (subtleGrid flag)"
```

---

## Task 2: Reshape the card DOM — footer action row

**Files:**
- Modify: `src/ui.js` (`buildLibraryGrid`, lines 268-337)

- [ ] **Step 1: Replace the over-art controls overlay with a footer action row**

In `src/ui.js`, replace the card-building body (from `const card = document.createElement("div");` at line 268 through `drawPatternThumb(...)` at line 337) with the following. The artwork preview stays clean; star/name/delete move into one footer row:

```js
    const card = document.createElement("div");
    card.className = `library-card${activeId === pattern.id ? " active" : ""}`;

    // Tap the preview to load + start beading. Artwork stays clean — management
    // lives in the footer row below, never over the art.
    const open = document.createElement("button");
    open.type = "button";
    open.className = "library-card-open";
    open.setAttribute("aria-label", `开始拼 ${pattern.displayName}`);
    open.innerHTML = `<canvas class="pattern-thumb" width="120" height="120" aria-hidden="true"></canvas>`;
    open.addEventListener("click", () => {
      uiActions.loadPattern(displayPattern, true);
      uiActions.setPhase("place");
      showToast(`开始拼 ${pattern.displayName}`);
    });

    // Footer action row: star (pin) · name (rename) · delete. Quiet by default;
    // star/delete light up on hover/active. Touch targets expanded via ::before.
    const actions = document.createElement("div");
    actions.className = "library-card-actions";

    const star = document.createElement("button");
    star.type = "button";
    star.className = `library-card-star${pattern.starred ? " is-on" : ""}`;
    star.setAttribute("aria-label", pattern.starred ? "取消置顶" : "星标置顶");
    star.setAttribute("aria-pressed", String(pattern.starred));
    star.innerHTML = icon("star", { size: 16 });
    star.addEventListener("click", () => {
      toggleStar(pattern.id);
      renderPatterns();
    });

    const name = document.createElement("button");
    name.type = "button";
    name.className = "library-card-name";
    name.setAttribute("aria-label", `重命名 ${pattern.displayName}`);
    name.innerHTML = `<strong>${escapeHtml(pattern.displayName)}</strong>`;
    name.addEventListener("click", async () => {
      const next = await textInputModal({
        title: "重命名图纸",
        label: "图纸名",
        value: pattern.displayName,
        okText: "保存",
        maxLength: 20,
      });
      if (next == null) return;
      if (renameInLibrary(pattern.id, next)) renderPatterns();
    });

    const del = document.createElement("button");
    del.type = "button";
    del.className = "library-card-del";
    del.setAttribute("aria-label", `删除 ${pattern.displayName}`);
    del.innerHTML = icon("trash-2", { size: 15 });
    del.addEventListener("click", async () => {
      const ok = await confirmModal({
        message: `从图纸库删除「${pattern.displayName}」？`,
        okText: "删除",
        danger: true,
      });
      if (!ok) return;
      removeFromLibrary(pattern.id);
      renderPatterns();
      showToast("已从图纸库删除。");
    });

    actions.append(star, name, del);
    card.append(open, actions);
    grid.appendChild(card);
    drawPatternThumb(card.querySelector("canvas"), displayPattern, { subtleGrid: true });
```

(Note: the `drawPatternThumb` subtleGrid argument was added in Task 1 Step 3; it appears here because this block replaces the same trailing line.)

- [ ] **Step 2: Build**

Run:
```bash
npm run build
```
Expected: `BUILD OK`.

- [ ] **Step 3: Commit**

```bash
git add src/ui.js app.bundle.js
git commit -m "feat(choose): move card star/delete off the artwork into a footer row"
```

---

## Task 3: Card CSS — tray look, themed mat, footer row chips

**Files:**
- Modify: `src/styles/components.css` (图纸库 block, lines 962-1083)

- [ ] **Step 1: Themed preview mat**

In `src/styles/components.css`, replace the `.library-card-open` background (line 992) and `.library-card .pattern-thumb` background (line 1001):

`.library-card-open` block becomes:
```css
.library-card-open {
  display: block;
  width: 100%;
  padding: 0;
  border: 0;
  background: color-mix(in srgb, var(--brand-tint) 55%, var(--surface-2));
  cursor: pointer;
}
```

`.library-card .pattern-thumb` block becomes:
```css
.library-card .pattern-thumb {
  display: block;
  width: 100%;
  height: auto;
  aspect-ratio: 1 / 1;
  background: transparent;
}
```

- [ ] **Step 2: Remove the over-art controls overlay rules**

Delete the two now-dead blocks `.library-card-controls { ... }` (lines 1004-1015) and `.library-card-controls > button { ... }` (lines 1017-1019), including their leading comment block (lines 1004-1006).

- [ ] **Step 3: Add the footer action row**

Immediately after the `.library-card .pattern-thumb` block, add:
```css
/* Footer action row: star · name · delete. Artwork above stays clean. */
.library-card-actions {
  display: flex;
  align-items: center;
  gap: var(--sp-1);
  padding: 5px 6px;
  border-top: 1px solid color-mix(in srgb, var(--line) 80%, white);
  background: var(--surface);
}
```

- [ ] **Step 4: Restyle the star/delete chips as quiet row chips**

Replace the `.library-card-star, .library-card-del` block (lines 1021-1036) and its hover/active rules (lines 1048-1061) with:
```css
.library-card-star,
.library-card-del {
  position: relative;
  flex: 0 0 auto;
  width: 28px;
  height: 28px;
  display: grid;
  place-items: center;
  border: 0;
  border-radius: var(--r-pill);
  background: transparent;
  color: var(--muted);
  cursor: pointer;
  transition: color 0.15s ease, background 0.15s ease;
}

.library-card-star:hover,
.library-card-star:focus-visible,
.library-card-star.is-on {
  color: var(--amber);
  background: color-mix(in srgb, var(--amber) 14%, transparent);
}

.library-card-star.is-on svg {
  fill: var(--amber);
}

.library-card-del:hover,
.library-card-del:focus-visible {
  color: var(--coral);
  background: color-mix(in srgb, var(--coral) 14%, transparent);
}
```

The `::before` touch-target overlay (lines 1040-1046) stays as-is — `inset: -6px` on a 28px chip gives 40px; widen it to `-8px` for ≥44px:
```css
.library-card-star::before,
.library-card-del::before {
  content: "";
  position: absolute;
  inset: -8px;
  border-radius: inherit;
}
```

- [ ] **Step 5: Make the name the flexible center of the row**

Replace the `.library-card-name` block (lines 1064-1073) with:
```css
.library-card-name {
  flex: 1 1 auto;
  min-width: 0;
  display: block;
  padding: 6px 4px;
  border: 0;
  background: transparent;
  text-align: center;
  cursor: pointer;
}
```
(`.library-card-name strong` at lines 1075-1083 stays unchanged — cute font, ellipsis.)

- [ ] **Step 6: Build and screenshot-check**

Run:
```bash
npm run build
```
Expected: `BUILD OK`. (Visual verification batched in Task 6.)

- [ ] **Step 7: Commit**

```bash
git add src/styles/components.css styles.css app.bundle.js
git commit -m "style(choose): tray cards — themed mat + quiet footer action row"
```

---

## Task 4: Primary CTA — 导入分享码

**Files:**
- Modify: `src/styles/components.css` (`.library-add-code`, lines 917-926)

- [ ] **Step 1: Promote 导入分享码 to the screen's primary CTA**

Replace the `.library-add-code` and `.library-add-code:hover` blocks (lines 917-926) with:
```css
/* 导入分享码 is the screen's single primary CTA — brand gradient pill. */
.library-add-code {
  flex: 1 1 auto;
  border: 0;
  color: #fff;
  background: linear-gradient(180deg, var(--brand-cta), var(--brand-cta-strong));
  box-shadow: var(--sh-inset), 0 6px 16px color-mix(in srgb, var(--brand) 30%, transparent);
}

.library-add-code:hover {
  border: 0;
  background: linear-gradient(
    180deg,
    color-mix(in srgb, var(--brand-cta) 94%, black),
    color-mix(in srgb, var(--brand-cta-strong) 94%, black)
  );
  box-shadow: var(--sh-inset), 0 8px 20px color-mix(in srgb, var(--brand) 36%, transparent);
}
```

`.library-tool-button-restore` (恢复默认) stays as the default ghost `.library-tool-button` — that is the intended secondary. No change needed.

- [ ] **Step 2: Build**

Run:
```bash
npm run build
```
Expected: `BUILD OK`.

- [ ] **Step 3: Commit**

```bash
git add src/styles/components.css styles.css app.bundle.js
git commit -m "style(choose): 导入分享码 becomes the primary gradient CTA"
```

---

## Task 5: Calmer workflow stepper (shared, state-only)

**Files:**
- Modify: `src/styles/components.css` (`.workflow-step .step-dot`, lines 307-317)

- [ ] **Step 1: Replace the dead-grey upcoming dot with a themed to-do dot**

In `src/styles/components.css`, in `.workflow-step .step-dot` (lines 307-317) replace the two hardcoded colors:

```css
.workflow-step .step-dot {
  display: grid;
  place-items: center;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: var(--brand-tint-strong);
  color: var(--brand-ink);
  font-size: var(--fs-2xs);
  font-weight: 800;
}
```

This is the upcoming/default state; `.workflow-step.done .step-dot` and `.workflow-step.active .step-dot` (lines 330-332, 344-347) already override to solid brand and are unchanged. The change removes the hardcoded `#cbd1dc` / `#fff` (also satisfies the Theme-Token Rule) and reads as a calm to-do across every phase.

- [ ] **Step 2: Build**

Run:
```bash
npm run build
```
Expected: `BUILD OK`.

- [ ] **Step 3: Commit**

```bash
git add src/styles/components.css styles.css app.bundle.js
git commit -m "style(studio): calmer workflow stepper upcoming dot (theme token)"
```

---

## Task 6: Lock with regressions + visual verification

**Files:**
- Modify: `scripts/ui-quality-regression.mjs` (append before the final `console.log`)
- Create (temporary): `/Users/Sakuro/beam/_shot.mjs` (deleted after use)

- [ ] **Step 1: Add structural assertions to ui-quality-regression**

In `scripts/ui-quality-regression.mjs`, add this block immediately before the final `console.log("UI quality regression checks passed.");` line. It reads `components.css` from the already-loaded `cssFiles` map:

```js
// ── 图纸库 reshape (2026-06-27): tray cards, footer action row, primary CTA ──
const componentsCss = cssFiles["components.css"];

assert.ok(
  /\.library-card-actions\s*\{[^}]*border-top/.test(componentsCss),
  "library card must have a footer action row (.library-card-actions)",
);
assert.equal(
  /\.library-card-controls\b/.test(componentsCss),
  false,
  "library card must not keep the over-art controls overlay (.library-card-controls)",
);
assert.ok(
  /\.library-add-code\s*\{[^}]*linear-gradient/.test(componentsCss),
  "导入分享码 must be a gradient primary CTA (.library-add-code)",
);
assert.equal(
  componentsCss.includes("#cbd1dc"),
  false,
  "workflow step dot must use a theme token, not hardcoded #cbd1dc",
);
```

- [ ] **Step 2: Run the targeted test and confirm it passes**

Run:
```bash
node scripts/ui-quality-regression.mjs
```
Expected: `UI quality regression checks passed.`

- [ ] **Step 3: Run the full suite**

Run:
```bash
npm test 2>&1 | tail -5
```
Expected: `test-all: all 24 suites passed`

- [ ] **Step 4: Visual verification (desktop + mobile)**

Start the server (if not already up) and screenshot the reshaped choose screen:
```bash
(PORT=5179 node server.cjs >/tmp/beam-server.log 2>&1 &) ; sleep 1.5
cat > /Users/Sakuro/beam/_shot.mjs <<'EOF'
import { chromium } from 'playwright';
const url = 'http://localhost:5179/';
const b = await chromium.launch();
async function shot(name, w, h){
  const ctx = await b.newContext({ viewport:{width:w,height:h}, deviceScaleFactor:2, isMobile: w<860, hasTouch: w<860 });
  const p = await ctx.newPage();
  await p.goto(url, {waitUntil:'networkidle'});
  await p.waitForTimeout(600);
  await p.click('#startBeadButton').catch(()=>{});
  await p.waitForTimeout(900);
  await p.screenshot({path:`/tmp/reshape-${name}.png`});
  await ctx.close();
}
await shot('desktop',1280,820);
await shot('mobile',390,844);
await b.close();
console.log('done');
EOF
node /Users/Sakuro/beam/_shot.mjs
rm -f /Users/Sakuro/beam/_shot.mjs
```
Then view `/tmp/reshape-desktop.png` and `/tmp/reshape-mobile.png`. Confirm: artwork is clean (no chips on art), footer row shows star · name · delete, 导入分享码 is a solid gradient button, thumbnail grid is faint, stepper dots are mint-tinted (not grey).

- [ ] **Step 5: Stepper no-regression check (other phases)**

The stepper change is global. Spot-check one working phase by loading a pattern then screenshotting:
```bash
(PORT=5179 node server.cjs >/tmp/beam-server.log 2>&1 &) ; sleep 1.5
cat > /Users/Sakuro/beam/_shot2.mjs <<'EOF'
import { chromium } from 'playwright';
const b = await chromium.launch();
const ctx = await b.newContext({ viewport:{width:1280,height:820}, deviceScaleFactor:2 });
const p = await ctx.newPage();
await p.goto('http://localhost:5179/', {waitUntil:'networkidle'});
await p.waitForTimeout(600);
await p.click('#startBeadButton').catch(()=>{});
await p.waitForTimeout(700);
await p.click('.library-card-open');           // load first pattern → place phase
await p.waitForTimeout(900);
await p.screenshot({path:'/tmp/reshape-place.png'});
await b.close();
console.log('done');
EOF
node /Users/Sakuro/beam/_shot2.mjs
rm -f /Users/Sakuro/beam/_shot2.mjs
```
View `/tmp/reshape-place.png`: the stepper should show step 1 done (brand), step 2 active, later steps as calm mint-tinted dots — no visual breakage.

- [ ] **Step 6: Commit the regression update**

```bash
git add scripts/ui-quality-regression.mjs
git commit -m "test(choose): lock library footer row, primary CTA, themed stepper dot"
```

---

## Task 7: Finish

- [ ] **Step 1: Stop the dev server**

```bash
pkill -f "node server.cjs" 2>/dev/null; echo "server stopped"
```

- [ ] **Step 2: Hand off**

Report results (screenshots + suite status) to the user. Do NOT push or open a PR unless the user asks — per AGENTS.md, push only on request.

---

## Self-Review (completed by plan author)

**Spec coverage:**
- ① clean artwork + footer row → Task 2 (DOM) + Task 3 (CSS). ✓
- ① themed preview mat → Task 3 Step 1. ✓
- ② thumbnail grid softened → Task 1. ✓
- ③ primary CTA + ghost 恢复默认 → Task 4 (恢复默认 already ghost, noted). ✓
- ④ stepper state-only restyle + no-regression check → Task 5 + Task 6 Step 5. ✓
- ⑤ anti-AI/cohesion (tokens, SVG icons) → enforced throughout; ui-quality token check in Task 6. ✓
- Verification (pattern-library + ui-quality + Playwright) → Task 6. ✓

**Placeholder scan:** none — every code/CSS step shows full content and exact line anchors.

**Type/name consistency:** `subtleGrid` (ui.js) → `cellGridAlpha`/`guides` (board-skin) consistent across Tasks 1-2; class names `.library-card-actions` / `.library-card-star` / `.library-card-del` / `.library-card-name` / `.library-add-code` consistent across Tasks 2-3-4-6.

**Note on line numbers:** anchors reflect the pre-edit files; after each task earlier line numbers shift — match on the quoted code, not the line number.
