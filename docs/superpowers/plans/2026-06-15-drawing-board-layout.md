# Drawing Board Layout Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make 30×30 board tiles addable only in the drawing studio and immutable in the bead studio.

**Architecture:** Keep board geometry in pattern/drawing data as rectangular `width`, `height`, and `rows`. Give the drawing studio its own pure grid-growth operation and edge-tab interaction; remove the bead studio's growth affordance and mutation path while retaining rectangular rendering and session restoration.

**Tech Stack:** Vanilla JavaScript modules, Canvas 2D, Node regression scripts, esbuild.

---

### Task 1: Regression Contract

**Files:**
- Create: `scripts/board-layout-regression.mjs`
- Modify: `package.json`

- [ ] Test pure drawing-grid growth in all four directions.
- [ ] Test that left/top growth offsets existing content by one 30-cell tile.
- [ ] Test that the bead studio source has no `growBoard` or add-tile pointer path.
- [ ] Run `npm run test:board-layout` and confirm it fails for the missing drawing operation and existing bead-studio path.

### Task 2: Drawing Studio Board Growth

**Files:**
- Modify: `src/draw.js`
- Modify: `src/render.js` only if shared geometry helpers are reused without bead-studio interaction.

- [ ] Add a pure rectangular grid-growth helper.
- [ ] Render four edge `+` tabs around the drawing grid.
- [ ] Hit-test tabs before drawing cells and grow in the selected direction.
- [ ] Push the pre-growth drawing state onto undo history.
- [ ] Preserve rectangular dimensions when creating, importing, exporting, and starting a pattern.
- [ ] Run `npm run test:board-layout` and confirm the drawing tests pass.

### Task 3: Shared Board Skin

**Files:**
- Create: `src/board-skin.js`
- Modify: `src/draw.js`
- Modify: `src/render.js`
- Modify: `scripts/board-layout-regression.mjs`

- [x] Add failing regression checks that both studios use one shared board-skin renderer.
- [x] Add a shared Canvas helper for the themed 10×10 tile tint, rounded inner board, outer frame, shadow, and 5/10-cell guide lines.
- [x] Keep the drawing studio's one-cell editing grid and flat square color pixels above the shared skin.
- [x] Keep peg and bead rendering exclusively in `src/render.js`.
- [x] Run `npm run test:board-layout` and confirm the shared-skin checks pass.

### Task 4: Bead Studio Lock

**Files:**
- Modify: `src/main.js`
- Modify: `src/render.js`
- Modify: `src/pattern.js`
- Modify: `src/session.js`

- [ ] Remove bead-studio tab drawing, hit-testing, `growBoard` imports, and add-tile pointer mode.
- [ ] Keep rectangular board rendering and restored multi-board sessions.
- [ ] Ensure new board layout changes can only originate from drawing data.
- [ ] Run `npm run test:board-layout` and confirm the lock test passes.

### Task 5: Shared Pattern Previews

**Files:**
- Modify: `src/board-skin.js`
- Modify: `src/render.js`
- Modify: `src/ui.js`
- Modify: `scripts/board-layout-regression.mjs`

- [x] Add failing regression checks for a shared `drawPixelPatternPreview()` renderer.
- [x] Render the choose preview, pattern thumbnails, current-pattern thumbnails, gallery thumbnails, and sidebar reference through the shared renderer.
- [x] Preserve rectangular hit-testing and flat square pixels.
- [x] Disable shadows and simplify guide lines automatically for small thumbnails.
- [x] Run `npm run test:board-layout` and confirm the preview checks pass.

### Task 6: End-to-End Verification

**Files:**
- Regenerate: `app.bundle.js`

- [ ] Run all regression scripts.
- [ ] Run `npm run build`.
- [ ] Open the local app in the in-app browser.
- [ ] Add a board in the drawing studio, start bead placement, and confirm the same layout appears without add controls.
