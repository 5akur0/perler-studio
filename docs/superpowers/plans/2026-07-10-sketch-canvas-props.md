# Sketch-Language Canvas Props Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert every canvas-drawn workbench prop (bead tray, pegboard skin, papers, lamp, tools, iron, finish-stand props, share poster) from the realistic gradient/soft-shadow style to the hand-drawn sketch language (flat fills, square corners, solid ink outlines, hard offset shadows) — beads and gameplay feedback effects untouched.

**Architecture:** A new pure leaf module `src/sketch-style.js` holds canvas-side constants mirroring `src/styles/tokens.css` plus one `sketchRect()` primitive. Each prop's draw function swaps its gradient/`shadowBlur`/rounded-corner shell for that primitive (or inline flat fills where the shape isn't a rect). A source-scan regression pins the allowed remaining gradient/`shadowBlur` call sites.

**Tech Stack:** Vanilla ES modules, Canvas 2D, esbuild (`npm run build` — committed bundles), standalone Node regression scripts.

**Spec:** `docs/superpowers/specs/2026-07-10-sketch-canvas-props-design.md`

## Global Constraints

- After any `src/` change: `npm run build` and commit rebuilt `app.bundle.js` together with the source (CLAUDE.md hard rule). No CSS files change in this plan, but `npm run build` rebuilds both; only commit `styles.css` if it actually changed.
- Code comments and commit messages in English (Conventional Commits); UI copy in Chinese.
- Do NOT touch: `drawBead`, `drawTrayBeadRandomized`, `drawFallenBead`, `drawSpillMarker` (fallen-bead soft shadow = bead content), fusion bridges (`drawFusionBridgeTo`, `drawGradientCapsuleBridge` call sites), cooling shimmer + scraper trail gradient, lamp glow radial gradient, heat tint, `drawMaterialHighlight` sheen, checkerboard tint, board guides, peg caches, progress bars, empty-state copy, `paintWorkbench` (already line-art).
- Sketch constants (from tokens.css): ink `#26242b`, hard-shadow ink `rgba(38,36,43,0.55)`, border 2 / 1.5 (control), shadow offset 3 / 2 (small). Square corners everywhere; genuine circles/pills stay round.
- Hover/active feedback: color/shadow only, no translation (existing ui-quality contract).
- **Pre-flight:** the working tree currently holds the uncommitted step-2 CSS migration (`src/render.js`, `src/styles/*`, `styles.css`, `app.bundle.js`, `DESIGN.md`, `CLAUDE.md`). Commit that work first (its own commit, after the user's pending browser acceptance — ask the user) so this plan's per-task commits stay clean. Do not start Task 1 on a dirty tree.

---

### Task 1: Sketch primitives module + unit regression

**Files:**
- Create: `src/sketch-style.js`
- Create: `scripts/canvas-sketch-regression.mjs`
- Modify: `package.json` (add `"test:canvas-sketch"` next to the other `test:*` entries — `scripts/test-all.mjs` auto-discovers it)

**Interfaces:**
- Produces: `SKETCH_INK: string`, `SKETCH_INK_SOFT: string`, `SKETCH_PAPER: string`, `SKETCH_BW: number (2)`, `SKETCH_BW_CTL: number (1.5)`, `SKETCH_SHADOW: number (3)`, `SKETCH_SHADOW_SM: number (2)`, and `sketchRect(ctx, x, y, w, h, opts?)`. Every later task imports these from `'./sketch-style.js'`. The module must stay import-free (no `dom.js`/`palette.js`) so Node can load it.

- [ ] **Step 1: Write the failing test**

Create `scripts/canvas-sketch-regression.mjs`:

```js
// Canvas sketch-language regression.
// Part 1 (this task): unit-checks sketchRect() against a recording stub ctx —
// hard offset shadow first, flat body fill, inset ink outline, no curves.
// Part 2 (final task) adds the gradient/shadowBlur source-scan allowlist.
import assert from "node:assert/strict";
import {
  sketchRect, SKETCH_INK, SKETCH_INK_SOFT, SKETCH_PAPER,
  SKETCH_BW, SKETCH_SHADOW,
} from "../src/sketch-style.js";

function stubCtx() {
  const ops = [];
  return {
    ops,
    set fillStyle(v) { ops.push(["fillStyle", v]); },
    set strokeStyle(v) { ops.push(["strokeStyle", v]); },
    set lineWidth(v) { ops.push(["lineWidth", v]); },
    fillRect(...a) { ops.push(["fillRect", ...a]); },
    strokeRect(...a) { ops.push(["strokeRect", ...a]); },
    arc() { ops.push(["arc"]); },
    quadraticCurveTo() { ops.push(["quadraticCurveTo"]); },
  };
}

// Token mirror values must not drift from src/styles/tokens.css.
assert.equal(SKETCH_INK, "#26242b");
assert.equal(SKETCH_INK_SOFT, "rgba(38, 36, 43, 0.55)");
assert.equal(SKETCH_BW, 2);
assert.equal(SKETCH_SHADOW, 3);

// Default draw order: shadow block at +3,+3 → paper body → inset ink outline.
{
  const ctx = stubCtx();
  sketchRect(ctx, 10, 20, 100, 50);
  const fills = ctx.ops.filter(([op]) => op === "fillRect");
  assert.deepEqual(fills[0], ["fillRect", 13, 23, 100, 50], "hard shadow first, offset by SKETCH_SHADOW");
  assert.deepEqual(fills[1], ["fillRect", 10, 20, 100, 50], "flat body second");
  const stroke = ctx.ops.find(([op]) => op === "strokeRect");
  assert.deepEqual(stroke, ["strokeRect", 11, 21, 98, 48], "ink outline inset by bw/2");
  assert.equal(ctx.ops.find(([op, v]) => op === "fillStyle" && v === SKETCH_INK_SOFT)[1], SKETCH_INK_SOFT);
  assert.equal(ctx.ops.find(([op, v]) => op === "fillStyle" && v === SKETCH_PAPER)[1], SKETCH_PAPER);
  assert.ok(!ctx.ops.some(([op]) => op === "arc" || op === "quadraticCurveTo"), "square corners only");
}

// shadow: 0 skips the shadow block; fill: null skips the body.
{
  const ctx = stubCtx();
  sketchRect(ctx, 0, 0, 10, 10, { shadow: 0, fill: null });
  assert.equal(ctx.ops.filter(([op]) => op === "fillRect").length, 0);
  assert.equal(ctx.ops.filter(([op]) => op === "strokeRect").length, 1);
}

console.log("canvas-sketch regression: OK");
```

- [ ] **Step 2: Run it to verify it fails**

Run: `node scripts/canvas-sketch-regression.mjs`
Expected: FAIL — `Cannot find module '.../src/sketch-style.js'`

- [ ] **Step 3: Implement the module**

Create `src/sketch-style.js`:

```js
// Canvas-side sketch-language constants + primitive (2026-07 redesign).
//
// Pure leaf module — no imports, no DOM — so Node regression scripts can load
// it directly and any render module can import it without cycles.
// Values mirror src/styles/tokens.css; keep the two files in sync:
//   SKETCH_INK        = --ink / --ink-line
//   SKETCH_INK_SOFT   = --ink-line-soft (55% ink — hard-shadow color)
//   SKETCH_BW / _CTL  = --sketch-bw / --sketch-bw-ctl
//   SKETCH_SHADOW(_SM)= --sketch-shadow / --sketch-shadow-sm offsets

export const SKETCH_INK = "#26242b";
export const SKETCH_INK_SOFT = "rgba(38, 36, 43, 0.55)";
export const SKETCH_PAPER = "#ffffff";
export const SKETCH_BW = 2;
export const SKETCH_BW_CTL = 1.5;
export const SKETCH_SHADOW = 3;
export const SKETCH_SHADOW_SM = 2;

// Draw a prop shell in the sketch language: hard offset shadow block (solid
// ink, zero blur), square-cornered flat fill, solid ink outline inset by half
// the border width (border-box, like the CSS panels). Replaces gradient faces
// and ctx.shadowBlur soft shadows on canvas props. All args are CSS px — the
// scene contexts are already dpr-scaled.
export function sketchRect(ctx, x, y, w, h, {
  fill = SKETCH_PAPER,
  bw = SKETCH_BW,
  shadow = SKETCH_SHADOW,
  ink = SKETCH_INK,
  shadowColor = SKETCH_INK_SOFT,
} = {}) {
  if (shadow > 0) {
    ctx.fillStyle = shadowColor;
    ctx.fillRect(x + shadow, y + shadow, w, h);
  }
  if (fill) {
    ctx.fillStyle = fill;
    ctx.fillRect(x, y, w, h);
  }
  if (bw > 0) {
    ctx.strokeStyle = ink;
    ctx.lineWidth = bw;
    ctx.strokeRect(x + bw / 2, y + bw / 2, w - bw, h - bw);
  }
}
```

- [ ] **Step 4: Register the test and verify it passes**

In `package.json`, after the `"test:build-timer"` line add:

```json
    "test:canvas-sketch": "node scripts/canvas-sketch-regression.mjs",
```

Run: `npm run test:canvas-sketch`
Expected: `canvas-sketch regression: OK`

- [ ] **Step 5: Build and commit**

```bash
npm run build
git add src/sketch-style.js scripts/canvas-sketch-regression.mjs package.json app.bundle.js
git commit -m "feat(render): add canvas sketch-language primitives + regression"
```

---

### Task 2: Bead tray (`drawTray`)

**Files:**
- Modify: `src/render-tray.js` (drawTray, lines ~171–308)

**Interfaces:**
- Consumes: `sketchRect`, `SKETCH_PAPER`, `SKETCH_BW_CTL`, `SKETCH_SHADOW_SM`, `SKETCH_INK` from `'./sketch-style.js'` (add to imports).
- Produces: no signature changes — `drawTray(layout, compact)` unchanged.

- [ ] **Step 1: Replace the tray shell**

In `drawTray`, replace the body block (the `ctx.shadowColor…` through the two decorative inlay fills — currently lines 181–199):

```js
  ctx.save();
  ctx.shadowColor = "rgba(38, 36, 43, 0.13)";
  ctx.shadowBlur = 20;
  ctx.shadowOffsetY = 10;
  const trayGradient = ctx.createLinearGradient(trayX, trayY, trayX, trayY + trayH);
  trayGradient.addColorStop(0, compact ? "rgba(255,255,255,0.72)" : "#fbfdff");
  trayGradient.addColorStop(1, compact ? "rgba(227,235,239,0.72)" : "#e7eff3");
  ctx.fillStyle = trayGradient;
  roundedRect(trayX, trayY, trayW, trayH, 8);
  ctx.fill();
  ctx.shadowColor = "transparent";
  ctx.strokeStyle = "rgba(87, 104, 116, 0.24)";
  ctx.stroke();

  ctx.fillStyle = "rgba(63, 81, 91, 0.08)";
  roundedRect(trayX + trayW - 44, trayY + 16, 24, trayH - 32, 8);
  ctx.fill();
  ctx.fillStyle = "rgba(87, 184, 167, 0.08)";
  roundedRect(trayX + 10, trayY + 10, trayW - 20, trayH - 20, 6);
  ctx.fill();
```

with:

```js
  ctx.save();
  // Sketch shell: flat paper + ink outline + hard sticker shadow (no gradient,
  // no soft blur, square corners). Grooves below carry the slot affordance.
  sketchRect(ctx, trayX, trayY, trayW, trayH);
```

- [ ] **Step 2: Flatten the grooves**

In the groove loop, delete the white highlight pass and recolor the groove to flat light ink. Replace:

```js
    ctx.strokeStyle = "rgba(75, 90, 98, 0.22)";
    ctx.lineWidth = grooveWidth;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(g.lineStartX, y);
    ctx.lineTo(g.lineEndX, y);
    ctx.stroke();
    ctx.strokeStyle = "rgba(255,255,255,0.58)";
    ctx.lineWidth = Math.max(1, grooveWidth * 0.18);
    ctx.beginPath();
    ctx.moveTo(g.lineStartX + 2, y - 1);
    ctx.lineTo(g.lineEndX - 2, y - 1);
    ctx.stroke();
```

with:

```js
    ctx.strokeStyle = "rgba(38, 36, 43, 0.12)";
    ctx.lineWidth = grooveWidth;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(g.lineStartX, y);
    ctx.lineTo(g.lineEndX, y);
    ctx.stroke();
```

- [ ] **Step 3: Square the progress bar**

Replace the two `roundedRect(trayX + 18, trayY + trayH - 30, …, 7, 4); ctx.fill();` pairs with plain `ctx.fillRect(...)` (same coords/colors, no radius):

```js
    ctx.fillStyle = "rgba(38, 36, 43, 0.11)";
    ctx.fillRect(trayX + 18, trayY + trayH - 30, trayW - 36, 7);
    ctx.fillStyle = progress >= 70 ? "#57b8a7" : progress >= 35 ? "#d99b3d" : "#e7645f";
    ctx.fillRect(trayX + 18, trayY + trayH - 30, (trayW - 36) * (progress / 100), 7);
```

- [ ] **Step 4: Restyle the dump button shell**

Replace the dump-button fill/stroke block (keep the glyph strokes that follow):

```js
  ctx.fillStyle = hoverDump ? "rgba(231, 100, 95, 0.22)" : "rgba(255,255,255,0.85)";
  roundedRect(dump.x, dump.y, dump.w, dump.h, 7);
  ctx.fill();
  ctx.strokeStyle = color ? "rgba(189, 72, 67, 0.62)" : "rgba(122, 130, 140, 0.42)";
  ctx.lineWidth = 1.3;
  roundedRect(dump.x, dump.y, dump.w, dump.h, 7);
  ctx.stroke();
```

with:

```js
  sketchRect(ctx, dump.x, dump.y, dump.w, dump.h, {
    fill: hoverDump ? "rgba(231, 100, 95, 0.22)" : SKETCH_PAPER,
    bw: SKETCH_BW_CTL,
    shadow: SKETCH_SHADOW_SM,
    ink: color ? "rgba(189, 72, 67, 0.88)" : SKETCH_INK,
  });
```

Update the import block: add `import { sketchRect, SKETCH_PAPER, SKETCH_BW_CTL, SKETCH_SHADOW_SM, SKETCH_INK } from './sketch-style.js';` and remove `roundedRect` from the `render-primitives.js` import **only if** no other call site in the file still uses it (after these edits none should; `roundedPath` stays for `drawTrayBeadRandomized`).

- [ ] **Step 5: Build, test, commit**

```bash
npm run build && npm run test:canvas-sketch && npm test
git add src/render-tray.js app.bundle.js
git commit -m "style(render): flatten bead tray to sketch language"
```
Expected: all suites pass (this change is visual-only; no regression asserts tray pixels).

---

### Task 3: Pegboard skin + pattern previews (`board-skin.js`) — **user checkpoint after this task**

**Files:**
- Modify: `src/board-skin.js` (`drawBoardSkin` lines 48–116, `drawPixelPatternPreview` lines 142–213)

**Interfaces:**
- Consumes: `sketchRect`, `SKETCH_BW`, `SKETCH_SHADOW`, `SKETCH_SHADOW_SM` from `'./sketch-style.js'`.
- Produces: `drawBoardSkin(ctx, layout, options)` keeps its signature; `outerRadius`/`innerRadius` options become no-ops (callers in `render.js`/`draw.js` may keep passing them — do not break them). `traceBoardPath` keeps its signature (still used for clipping; radius arg now always passed as 0 internally).

- [ ] **Step 1: Replace the frame + inner plate**

In `drawBoardSkin`, replace the shadow/gradient frame and inner plate block (from `if (shadow) {` through the inner `ctx.strokeStyle = "rgba(70, 84, 96, 0.18)"; ctx.stroke();`):

```js
  // Sketch shell: flat frame + ink outline + hard sticker shadow. Thumbnails
  // (frameInset < 10) get a thinner line and smaller offset so tiny previews
  // don't drown in ink.
  const compactSkin = frameInset < 10;
  const bw = compactSkin ? 1 : SKETCH_BW;
  const shadowOff = shadow ? (compactSkin ? SKETCH_SHADOW_SM : SKETCH_SHADOW) : 0;
  sketchRect(
    ctx,
    boardX - frameInset,
    boardY - frameInset,
    boardW + frameInset * 2,
    boardH + frameInset * 2,
    { fill: "#f2f5f7", bw, shadow: shadowOff },
  );
  ctx.fillStyle = "#fbfcfd";
  ctx.fillRect(boardX, boardY, boardW, boardH);
  ctx.strokeStyle = "rgba(38, 36, 43, 0.22)";
  ctx.lineWidth = 1;
  ctx.strokeRect(boardX + 0.5, boardY + 0.5, boardW - 1, boardH - 1);
```

Then change the checkerboard clip call from `traceBoardPath(ctx, layout, innerRadius)` to `traceBoardPath(ctx, layout, 0)`. Remove the now-unused `outerRadius`/`innerRadius` destructuring defaults (keep accepting them in `options` without reading them, or read-and-ignore — simplest is to delete them from the destructuring).

- [ ] **Step 2: Flatten the preview background**

In `drawPixelPatternPreview`, replace:

```js
  const background = ctx.createLinearGradient(0, 0, width, height);
  background.addColorStop(0, table[0]);
  background.addColorStop(0.55, table[1] || table[0]);
  background.addColorStop(1, table[2] || table[1] || table[0]);
  ctx.fillStyle = background;
  ctx.fillRect(0, 0, width, height);
```

with:

```js
  ctx.fillStyle = table[1] || table[0];
  ctx.fillRect(0, 0, width, height);
```

Also update its two `traceBoardPath(ctx, layout, …radius…)` clip calls to pass `0`, and drop the `outerRadius`/`innerRadius` entries from its `drawBoardSkin` options object.

- [ ] **Step 3: Build, test, commit**

```bash
npm run build && npm test
git add src/board-skin.js app.bundle.js
git commit -m "style(render): flatten pegboard skin and pattern previews to sketch language"
```

- [ ] **Step 4: USER CHECKPOINT — browser acceptance of tray + board**

Serve with `npm run dev`, ask the user to check the place phase (tray + board) and the choose/gallery/collection thumbnails on desktop + mobile. **Do not proceed to Task 4 without approval** — these are the two props the user called out; the treatment here (fill tones, line weights) calibrates every later task.

---

### Task 4: Papers — choose card, paper texture, reference sheet, tape

**Files:**
- Modify: `src/render.js` — `drawPaper` (~1074), `getPaperTexture` (~1759), `drawReferenceTape` (~1906), `drawReferenceSheet` shell (~1976–1989)

**Interfaces:**
- Consumes: `sketchRect`, `SKETCH_INK_SOFT`, `SKETCH_SHADOW` from `'./sketch-style.js'` (add one import line to render.js).
- Produces: no signature changes.

- [ ] **Step 1: `drawPaper` → sketch shell**

Replace the body of `drawPaper`:

```js
export function drawPaper(x, y, w, h) {
  const ctx = scene;
  ctx.save();
  sketchRect(ctx, x, y, w, h, { fill: "#fffdf8" });
  ctx.restore();
}
```

- [ ] **Step 2: Flatten `getPaperTexture`**

Keep the fold creases (line art) and fibre speckle (flat pixels). Replace the base gradient:

```js
  const base = p.createLinearGradient(0, 0, 0, h);
  base.addColorStop(0, "#fffefb");
  base.addColorStop(1, "#f3ecdd");
  p.fillStyle = base;
  p.fillRect(0, 0, w, h);
```

with:

```js
  p.fillStyle = "#faf5e9";
  p.fillRect(0, 0, w, h);
```

Delete the whole “Broad crumple shading” loop (the 9-blob radial-gradient block) and the trailing “Top sheen” block (gradient + fillRect). Keep the inner edge stroke.

- [ ] **Step 3: Flatten the tape**

In `drawReferenceTape`, delete the cast-shadow `ctx.save()…ctx.restore()` block (shadowBlur 5) and replace the gradient body + gloss band + edge line:

```js
  const body = ctx.createLinearGradient(0, -halfH, 0, halfH);
  …
  ctx.fillRect(-halfW + 2, halfH - 2, halfW * 2 - 4, 1);
```

with:

```js
  // Flat translucent tape + thin ink edge (paper still shows through).
  ctx.fillStyle = "rgba(216, 190, 124, 0.34)";
  tapeTornPath(ctx, halfW, halfH);
  ctx.fill();
  ctx.strokeStyle = "rgba(38, 36, 43, 0.35)";
  ctx.lineWidth = 1;
  tapeTornPath(ctx, halfW, halfH);
  ctx.stroke();
```

- [ ] **Step 4: Reference sheet — hard shadow + ink deckle, drop worn-ink patches**

Replace the soft-shadow card block in `drawReferenceSheet`:

```js
  ctx.save();
  ctx.shadowColor = "rgba(38, 36, 43, 0.18)";
  ctx.shadowBlur = 16;
  ctx.shadowOffsetY = 8;
  ctx.fillStyle = "#fbf6ea";
  tornPaperPath(ctx, px, py, pw, ph, tearSeed);
  ctx.fill();
  ctx.shadowColor = "transparent";
  ctx.strokeStyle = "rgba(150, 134, 100, 0.30)";
  ctx.lineWidth = 1;
  tornPaperPath(ctx, px, py, pw, ph, tearSeed);
  ctx.stroke();
```

with:

```js
  ctx.save();
  // Hard sticker shadow under the torn card (same seed → same silhouette).
  ctx.save();
  ctx.translate(SKETCH_SHADOW, SKETCH_SHADOW);
  ctx.fillStyle = SKETCH_INK_SOFT;
  tornPaperPath(ctx, px, py, pw, ph, tearSeed);
  ctx.fill();
  ctx.restore();
  ctx.fillStyle = "#fbf6ea";
  tornPaperPath(ctx, px, py, pw, ph, tearSeed);
  ctx.fill();
  ctx.strokeStyle = "rgba(38, 36, 43, 0.75)";
  ctx.lineWidth = 1.5;
  tornPaperPath(ctx, px, py, pw, ph, tearSeed);
  ctx.stroke();
```

Then delete the “Uneven / worn ink: broad roller patches” loop (the 6-iteration `createRadialGradient` block inside the printed-plate clip). Keep the halftone dot grid, faded ink fills, printed chart rules, creases — they carry the worn-print character and are all flat.

- [ ] **Step 5: Build, test, commit**

```bash
npm run build && npm test
git add src/render.js app.bundle.js
git commit -m "style(render): flatten choose card, paper texture, reference sheet and tape"
```

---

### Task 5: Lamp, tools, iron, scraper, inspect stage, drawing screen, concept scene, finish badge

**Files:**
- Modify: `src/render.js` — `drawLampSwitch` (~747), `drawNeedleEntity` (~877), `drawTweezersEntity` (~933), `drawIronLayer` pad (~2148), `drawIron` (~2199), scraper in `drawCoolingLayer` (~2286–2302), `drawFinishLayer` badge (~2318)
- Modify: `src/render-inspect.js` — preview canvas background (~175)
- Modify: `src/render-finish.js` — `drawConceptEasterScene` card (~116)
- Modify: `src/draw.js` — workbench gradient (~725)

**Interfaces:**
- Consumes: `sketchRect`, `SKETCH_BW_CTL`, `SKETCH_SHADOW_SM`, `SKETCH_INK`, `SKETCH_PAPER` from `'./sketch-style.js'` (render-inspect.js, render-finish.js get their own import line).
- Produces: no signature changes.

- [ ] **Step 1: Lamp switch**

In `drawLampSwitch`:
1. Delete the `cordHighlight` gradient stroke block (keep the first `cordGrad` stroke — it *is* the approved fade-out line).
2. Keep the `state.lampOn` glow block untouched.
3. Replace the plate block (shadow + `plate` gradient + two `roundedPath` calls + hover stroke):

```js
  sketchRect(ctx, rect.x, rect.y, rect.w, rect.h, {
    bw: SKETCH_BW_CTL,
    shadow: SKETCH_SHADOW_SM,
    ink: hover ? "rgba(87, 184, 167, 0.9)" : SKETCH_INK,
  });
```

4. Square the little base stand: replace its `roundedPath(ctx, cx - baseW / 2, cy + rect.h * 0.09, baseW, baseH, baseH * 0.45); ctx.fill();` with `ctx.fillRect(cx - baseW / 2, cy + rect.h * 0.09, baseW, baseH);` (same fillStyle line above it stays).
5. Flatten the bulb — replace the `bulb` radial gradient + fill:

```js
  ctx.fillStyle = state.lampOn ? "#ffe9a8" : "#e7edf3";
  ctx.beginPath();
  ctx.arc(cx, cy - rect.h * 0.02, bodyR, 0, Math.PI * 2);
  ctx.fill();
```

Keep the existing bulb outline stroke and filament arc below it (the bulb is a genuine circle — stays round).

- [ ] **Step 2: Tools**

In `drawNeedleEntity` delete the two lines `ctx.shadowColor = "rgba(38, 36, 43, 0.1)";` and `ctx.shadowBlur = inUse ? 4 : 10;` (the later `ctx.shadowColor = "transparent";` line then becomes dead — delete it too). Same two/three lines in `drawTweezersEntity`. No other changes — bodies are already flat strokes.

- [ ] **Step 3: Iron layer pad + iron**

In `drawIronLayer`, square the pad: replace `roundedRect(boardX - 2, boardY - 2, boardSize + 4, boardSize + 4, 7); ctx.fill();` with `ctx.fillRect(boardX - 2, boardY - 2, boardSize + 4, boardSize + 4);` (translucent fill + fibre beziers stay).

In `drawIron`, replace the body (shadow + three roundedRects + gloss strip):

```js
  ctx.shadowColor = "rgba(38, 36, 43, 0.22)";
  ctx.shadowBlur = 16;
  ctx.shadowOffsetY = 9;
  ctx.fillStyle = "#f4f7fa";
  roundedRect(-42, -25, 84, 50, 8);
  ctx.fill();
  ctx.shadowColor = "transparent";
  ctx.fillStyle = "#d7e0e5";
  roundedRect(-40, 11, 80, 15, 7);
  ctx.fill();
  ctx.fillStyle = color;
  roundedRect(-30, -15, 60, 30, 6);
  ctx.fill();
  ctx.fillStyle = "rgba(255,255,255,0.34)";
  roundedRect(-24, -10, 28, 6, 3);
  ctx.fill();
```

with:

```js
  sketchRect(ctx, -42, -25, 84, 50, { fill: "#f4f7fa", bw: SKETCH_BW_CTL, shadow: SKETCH_SHADOW_SM });
  ctx.fillStyle = "#d7e0e5";
  ctx.fillRect(-40, 11, 80, 15);
  ctx.fillStyle = color;
  ctx.fillRect(-30, -15, 60, 30);
```

(`color` is the heat readout — functional, kept.) The handle arc stroke below stays; bump its `strokeStyle` from `"rgba(38, 36, 43, 0.2)"` to `"rgba(38, 36, 43, 0.75)"` so the handle reads as an ink line.

- [ ] **Step 4: Scraper body + flattening slab in `drawCoolingLayer`**

Keep the trail gradient (functional press feedback). In the `state.flattening > 5` block, delete the three soft-shadow lines (`ctx.shadowColor = "rgba(38, 36, 43, 0.18)"; ctx.shadowBlur = 18; ctx.shadowOffsetY = 10;`) and the `ctx.shadowColor = "transparent";` reset, and square the slab: `roundedRect(boardX + 20, …, 6); ctx.fill();` → `ctx.fillRect(boardX + 20, boardY + boardSize * 0.32, boardSize - 40, boardSize * 0.26);` (the white strip and dark strip fills stay — they read as the slab’s edge lines). Replace the scraper-body block (shadow + `bodyGrad` + roundedRect + highlight):

```js
      ctx.shadowColor = "rgba(0,0,0,0.32)";
      ctx.shadowBlur = 14;
      ctx.shadowOffsetY = 4;
      const bodyGrad = ctx.createLinearGradient(0, cy, 0, cy + bladeH);
      bodyGrad.addColorStop(0, "#dfe6ec");
      bodyGrad.addColorStop(0.5, "#aeb8c6");
      bodyGrad.addColorStop(1, "#828c9b");
      ctx.fillStyle = bodyGrad;
      roundedRect(bladeX, cy, blade, bladeH, 4);
      ctx.fill();
      // Blade edge (the pressing line)
      ctx.shadowColor = "transparent";
      ctx.fillStyle = "rgba(40, 46, 56, 0.8)";
      ctx.fillRect(bladeX + 2, cy - 1, blade - 4, 2);
      // Highlight
      ctx.fillStyle = "rgba(255,255,255,0.6)";
      ctx.fillRect(bladeX + 6, cy + 4, blade - 12, 2);
```

with:

```js
      sketchRect(ctx, bladeX, cy, blade, bladeH, { fill: "#aeb8c6", bw: SKETCH_BW_CTL, shadow: 0 });
      // Blade edge (the pressing line)
      ctx.fillStyle = "rgba(40, 46, 56, 0.8)";
      ctx.fillRect(bladeX + 2, cy - 1, blade - 4, 2);
```

(Grip dots below stay.)

- [ ] **Step 5: Finish grade badge, inspect background, concept card, drawing screen**

`drawFinishLayer` — replace the badge block (softShadow + fill + double stroke):

```js
  sketchRect(ctx, bx, by, badgeW, badgeH, { bw: SKETCH_BW_CTL, shadow: SKETCH_SHADOW_SM });
```

(Text fills below stay; delete the now-unused `softShadow` import from render.js **only if** no other call site remains — check with `grep -n 'softShadow' src/render.js` first.)

`render-inspect.js` `drawInspectFusePreviewCanvas` — replace the gradient background block:

```js
  ctx.fillStyle = "#f5f8fb";
  ctx.fillRect(0, 0, w, h);
  ctx.strokeStyle = "rgba(38, 36, 43, 0.75)";
  ctx.lineWidth = 1.5;
  ctx.strokeRect(0.75, 0.75, w - 1.5, h - 1.5);
```

`render-finish.js` `drawConceptEasterScene` — replace the museum-plinth card block (shadowBlur 28 + two roundedRects):

```js
  ctx.save();
  sketchRect(ctx, bx - 18, by - 18, displaySize + 36, displaySize + 36);
  ctx.fillStyle = "#fcfcfd";
  ctx.fillRect(bx, by, displaySize, displaySize);
  ctx.restore();
```

`draw.js` `paintDrawCanvas` — replace the `workbenchGradient` block:

```js
  ctx.fillStyle = theme.table[1];
  ctx.fillRect(0, 0, cssW, cssH);
```

- [ ] **Step 6: Build, test, commit**

```bash
npm run build && npm test
git add src/render.js src/render-inspect.js src/render-finish.js src/draw.js app.bundle.js
git commit -m "style(render): flatten lamp, tools, iron, scraper, inspect stage and drawing desk"
```

---

### Task 6: Finish-stand props (`render-finish.js`)

**Files:**
- Modify: `src/render-finish.js` — `drawAcrylicPlate` (~34), `drawFinishShowcase` card (~73), `drawFinishKeychain` ring/connector (~299), `drawFinishOriginal` frame (~347), `drawFinishCoaster` (~415), `drawFinishFigurine` base (~494)

**Interfaces:**
- Consumes: `sketchRect`, `SKETCH_PAPER`, `SKETCH_BW_CTL`, `SKETCH_SHADOW`, `SKETCH_SHADOW_SM`, `SKETCH_INK_SOFT` from `'./sketch-style.js'`.
- Produces: no signature changes. `drawMaterialHighlight` is untouched (kept artwork sheen).

- [ ] **Step 1: Showcase card + acrylic plate shadows**

`drawFinishShowcase` — replace the card block (softShadow + translucent fill):

```js
  sketchRect(ctx, card.x, card.y, card.w, card.h, { fill: SKETCH_PAPER });
```

`drawAcrylicPlate` — the plate is the crafted keepsake’s clear acrylic (content-adjacent): keep its translucent fill, rounded silhouette and edge strokes, but swap the soft shadow for a hard one. Replace `if (shadow) softShadow(ctx, { blur: 18, dy: 9, color: "rgba(38,36,43,0.13)" });` and add before the body fill:

```js
  if (shadow) {
    ctx.save();
    ctx.fillStyle = SKETCH_INK_SOFT;
    roundedPath(ctx, x + SKETCH_SHADOW_SM, y + SKETCH_SHADOW_SM, w, h, r);
    ctx.fill();
    ctx.restore();
  }
```

(and remove the `ctx.shadowColor = "transparent";` reset that followed the old soft shadow).

- [ ] **Step 2: Keychain metal ring → flat**

Replace the `metal` gradient definition with a flat color and drop the white highlight arc:

```js
  ctx.strokeStyle = "#9aa5b1";
  ctx.lineWidth = Math.max(5, cell * 0.28);
  ctx.beginPath();
  ctx.arc(centerX, ringY, ringR, 0, Math.PI * 2);
  ctx.stroke();
```

The connector below used `ctx.fillStyle = metal;` twice — change both to `ctx.fillStyle = "#9aa5b1";` and the two-plate link stroke `ctx.strokeStyle = metal;` to `"#9aa5b1"`. (Ring/connector stay round — genuine circle/pill.)

- [ ] **Step 3: Original wood frame → flat sketch frame**

In `drawFinishOriginal`, replace the softShadow + `woodFrame` gradient + three roundedRects:

```js
  sketchRect(ctx, boardX - frame, boardY - frame, boardW + frame * 2, boardH + frame * 2, { fill: "#d8c8ad" });
  ctx.fillStyle = "#fffdf8";
  ctx.fillRect(boardX - 6, boardY - 6, boardW + 12, boardH + 12);
  ctx.fillStyle = "#fbfcfd";
  ctx.fillRect(boardX, boardY, boardW, boardH);
```

(Peg loop and `drawMaterialHighlight` stay.)

- [ ] **Step 4: Coaster → flat cork, square**

Replace the softShadow + `edge` gradient + `cork` gradient blocks; keep the speckle loop and its clip:

```js
  ctx.save();
  // Hard shadow via the edge slab: flat side face + flat cork top, square.
  ctx.fillStyle = "#b08f5e";
  ctx.fillRect(left, top + thickness, side, side);
  ctx.fillStyle = "#d8b783";
  ctx.fillRect(left, top, side, side);
  ctx.beginPath();
  ctx.rect(left, top, side, side);
  ctx.clip();
```

(The speckle loop then runs inside the clip as before; `ctx.restore()` already follows it. The `radius` const becomes unused — delete it. Update the final `drawMaterialHighlight` call’s `r: radius` to `r: 0`.)

- [ ] **Step 5: Figurine base → flat faces**

Replace the contact-shadow block’s `ctx.shadowColor`/`ctx.shadowBlur` lines (keep the flat ellipse fill), then replace the `front` gradient with `ctx.fillStyle = "#78502f";` + `ctx.fillRect(targetX - baseW / 2, baseY, baseW, baseH);`, the `topFace` gradient with `ctx.fillStyle = "#9b6d4c";` (ellipse fill stays — genuine ellipse), and delete the white gloss strip (`rgba(255,255,255,0.18)` roundedPath + fill). The dark seam stroke stays.

- [ ] **Step 6: Build, test, commit**

```bash
npm run build && npm run test:finish-showcase && npm test
git add src/render-finish.js app.bundle.js
git commit -m "style(render): flatten finish-stand props to sketch language"
```
Expected: `test:finish-showcase` green (it asserts showcase behavior, not pixels — if it scans for removed identifiers, update the scan to the new flat fills and note it in the commit).

---

### Task 7: Share poster (`render-export.js`) — sketch card redesign

**Files:**
- Modify: `src/render-export.js` — `drawShareImage` (~82) and `drawCleanVariant` (~288)

**Interfaces:**
- Consumes: `SKETCH_INK`, `SKETCH_INK_SOFT` from `'./sketch-style.js'`.
- Produces: no signature changes. Poster-scale constants local to the file: `const POSTER_BW = 4; const POSTER_SHADOW = 10;` (≈ 2px border / 5px `--sketch-shadow-lg` at the ~2× poster resolution).

- [ ] **Step 1: Page ground**

Replace the `bg` gradient + `glowA` + `glowB` blocks with a flat paper ground:

```js
  // Sketch card: plain paper ground — the artwork and flat brand shapes carry
  // the color (no page wash, no corner glows).
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, w, h);
```

- [ ] **Step 2: Grade badge → flat + ink + hard shadow, square**

Replace the `badgeGrad` block:

```js
  ctx.fillStyle = SKETCH_INK_SOFT;
  ctx.fillRect(badgeX + POSTER_SHADOW, top + POSTER_SHADOW, badgeSize, badgeSize);
  ctx.fillStyle = p.accent;
  ctx.fillRect(badgeX, top, badgeSize, badgeSize);
  ctx.strokeStyle = SKETCH_INK;
  ctx.lineWidth = POSTER_BW;
  ctx.strokeRect(badgeX + POSTER_BW / 2, top + POSTER_BW / 2, badgeSize - POSTER_BW, badgeSize - POSTER_BW);
```

(Badge text fills below stay.)

- [ ] **Step 3: Artwork well → ink frame + hard sticker shadow, square**

Replace the well block (shadowBlur 48 save/restore + roundedPath fill + `wellEdge` stroke):

```js
  ctx.fillStyle = SKETCH_INK_SOFT;
  ctx.fillRect(PAD + POSTER_SHADOW, wellTop + POSTER_SHADOW, innerW, wellH);
  ctx.fillStyle = p.well;
  ctx.fillRect(PAD, wellTop, innerW, wellH);
  ctx.strokeStyle = SKETCH_INK;
  ctx.lineWidth = POSTER_BW;
  ctx.strokeRect(PAD + POSTER_BW / 2, wellTop + POSTER_BW / 2, innerW - POSTER_BW, wellH - POSTER_BW);
```

Keep the acrylic sheen block (content) and the craft capsule (genuine pill — keep the pill, keep `chipEdge`).

- [ ] **Step 4: KPI pills + QR card + clean variant**

KPI pills: keep (genuine pills, flat `p.glow` fill already). QR card — replace its shadowBlur block + rounded fill/stroke:

```js
  ctx.fillStyle = SKETCH_INK_SOFT;
  ctx.fillRect(PAD + POSTER_SHADOW / 2, footTop + POSTER_SHADOW / 2, qrBox, qrBox);
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(PAD, footTop, qrBox, qrBox);
  ctx.strokeStyle = SKETCH_INK;
  ctx.lineWidth = POSTER_BW / 2;
  ctx.strokeRect(PAD + POSTER_BW / 4, footTop + POSTER_BW / 4, qrBox - POSTER_BW / 2, qrBox - POSTER_BW / 2);
```

`drawCleanVariant`: apply the same well treatment as Step 3 (its own PAD/wellTop/innerW/wellH names; radius 44 → square; shadowBlur 48 → `POSTER_SHADOW` block; `wellEdge` stroke → `SKETCH_INK` at `POSTER_BW`).

- [ ] **Step 5: Build, test, export a sample, commit**

```bash
npm run build && npm run test:share-export && npm test
git add src/render-export.js app.bundle.js
git commit -m "style(share): redesign share poster as sketch-language paper card"
```
Then produce one real export (dev server → complete a small pattern → 分享导出) and hand the image to the user — **poster has its own user acceptance** per the spec.

---

### Task 8: Source-scan allowlist, docs sync, full acceptance

**Files:**
- Modify: `scripts/canvas-sketch-regression.mjs` (append Part 2)
- Modify: `DESIGN.md` (new canvas-props section, Chinese)
- Modify: `design-system/MASTER.md` (§2/§5 pending sync debt)

**Interfaces:**
- Consumes: final gradient/shadowBlur census of `src/` render files (run the grep below and reconcile before writing EXPECTED).

- [ ] **Step 1: Take the census**

Run: `grep -c 'createLinearGradient\|createRadialGradient' src/render.js src/render-tray.js src/board-skin.js src/render-finish.js src/render-export.js src/render-inspect.js src/render-fusion.js src/draw.js; grep -c 'shadowBlur' <same files>`

Expected survivors (verify — the numbers below are the design intent, trust the grep):
- `render.js`: linear ≤3 (lamp cord fade, scraper trail, fusion bridge), radial 1 (lamp glow), shadowBlur 1 (`drawSpillMarker` fallen bead — bead content)
- `render-fusion.js`: 2 gradients (sheen + bridge — functional, kept)
- `render-inspect.js`: 1 gradient (bridge)
- `render-finish.js`: 1 gradient (`drawMaterialHighlight`), shadowBlur 0
- `render-export.js`: 1 gradient (artwork sheen), shadowBlur 0
- `render-tray.js`, `board-skin.js`, `draw.js`: 0 and 0

If the census disagrees with the plan’s intent, investigate the call site before adjusting EXPECTED — a stray gradient means a missed task step.

- [ ] **Step 2: Append the scan to the regression**

Add to `scripts/canvas-sketch-regression.mjs`:

```js
// Part 2: pin the allowed gradient/shadowBlur call sites. Props must stay
// flat; only gameplay-feedback and content-sheen effects may keep gradients.
// If you add a legitimate functional gradient, update EXPECTED with a comment.
import { readFileSync } from "node:fs";
const EXPECTED = {
  // file: [gradients, shadowBlurs]  ← fill from the Step 1 census
  "src/render.js": [4, 1],
  "src/render-fusion.js": [2, 0],
  "src/render-inspect.js": [1, 0],
  "src/render-finish.js": [1, 0],
  "src/render-export.js": [1, 0],
  "src/render-tray.js": [0, 0],
  "src/board-skin.js": [0, 0],
  "src/draw.js": [0, 0],
};
for (const [file, [grads, blurs]] of Object.entries(EXPECTED)) {
  const src = readFileSync(new URL(`../${file}`, import.meta.url), "utf8");
  const g = (src.match(/create(?:Linear|Radial)Gradient/g) || []).length;
  const b = (src.match(/shadowBlur/g) || []).length;
  assert.equal(g, grads, `${file}: gradient count drifted (${g} vs ${grads})`);
  assert.equal(b, blurs, `${file}: shadowBlur count drifted (${b} vs ${blurs})`);
}
```

Run: `npm run test:canvas-sketch` — expected PASS (fix counts from the census, with a one-line comment naming each survivor).

- [ ] **Step 3: Docs**

- `DESIGN.md`: add a section under the sketch-language chapter — 「canvas 道具素描语言」: props drawn on canvas follow the same paper+ink rules (平涂、直角、墨线、硬贴纸投影 via `src/sketch-style.js`); list the keep-exemptions (豆子本体、玩法反馈光效、作品 sheen、真圆/药丸). Chinese, matching the file’s voice.
- `design-system/MASTER.md`: sync §2/§5 to the straight-corner + ink-outline language (the pending debt noted in the step-2 work) and mention `sketch-style.js` as the canvas mirror of the tokens.

- [ ] **Step 4: Full verification**

```bash
npm run build && npm test
```
Expected: all suites green. Then browser acceptance with the user on **desktop, mobile, and tablet landscape** (shared canvas code — CLAUDE.md hard rule): place phase (tray/board/lamp/tools), iron + cooling, inspect, finish (all four crafts), drawing screen, choose/gallery thumbnails, and one share export.

- [ ] **Step 5: Commit**

```bash
git add scripts/canvas-sketch-regression.mjs DESIGN.md design-system/MASTER.md
git commit -m "test(render): pin canvas gradient allowlist; sync sketch docs"
```
