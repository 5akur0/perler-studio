# Lucide Icons Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace functional inline SVGs and text close glyphs across the main app and admin page with a single local Lucide icon registry.

**Architecture:** `src/icons.js` owns icon geometry and SVG rendering. Dynamic modules call `icon()`, while static HTML uses `data-lucide-icon` placeholders hydrated by `hydrateIcons()`. A Node regression script imports the module through a data URL and tests rendering without adding a DOM dependency.

**Tech Stack:** Browser ES modules, esbuild, Node.js regression scripts, Better Icons CLI, Lucide SVG paths.

---

### Task 1: Icon Renderer Contract

**Files:**
- Create: `scripts/icons-regression.mjs`
- Modify: `src/icons.js`
- Modify: `package.json`

- [ ] **Step 1: Write the failing renderer test**

Create a Node script that imports `src/icons.js` through a `data:` URL and asserts:

```js
assert.match(icon("settings", { size: 18 }), /width="18"/);
assert.match(icon("settings", { size: 18 }), /stroke-width="2"/);
assert.equal(icon("missing-icon"), "");
assert.equal(hydrateIcons(fakeRoot), 1);
assert.match(fakePlaceholder.outerHTML, /<svg/);
```

- [ ] **Step 2: Run the test and verify RED**

Run: `node scripts/icons-regression.mjs`

Expected: FAIL because `hydrateIcons` is not exported.

- [ ] **Step 3: Fetch official Lucide geometry**

Use `better-icons get lucide:<name>` for all registry entries. Required names include:

```text
arrow-left chevron-right settings refresh-cw rotate-ccw pencil image
clipboard-list paintbrush eraser paint-bucket square circle pipette undo-2
trash-2 upload download share-2 copy check scaling sparkles eye eye-off
reply flask-conical search x badge-check badge-x
```

Keep the product-specific `pegboard` geometry local.

- [ ] **Step 4: Implement hydration**

Add `hydrateIcons(root = document)` that reads:

```text
data-lucide-icon
data-icon-size
data-icon-stroke-width
data-icon-class
data-icon-label
```

It must replace known placeholders, preserve the placeholder class, return the replacement count, and leave unknown names untouched.

- [ ] **Step 5: Add the regression command**

Add:

```json
"test:icons": "node scripts/icons-regression.mjs"
```

- [ ] **Step 6: Run the test and verify GREEN**

Run: `npm run test:icons`

Expected: PASS with the renderer, accessibility, unknown-name, and hydration assertions.

### Task 2: Main Application Migration

**Files:**
- Modify: `index.html`
- Modify: `src/main.js`
- Modify: `src/ui.js`
- Modify: `src/draw.js`
- Modify: `src/gallery.js`
- Modify: `src/styles/components.css`

- [ ] **Step 1: Write failing migration assertions**

Extend `scripts/icons-regression.mjs` to assert:

```js
assert.doesNotMatch(indexHtml, /<button[^>]+aria-label="[^"]*关闭[^"]*"[^>]*>×<\/button>/);
assert.doesNotMatch(uiSource, /const (beakerIcon|loupeIcon) = '<svg/);
assert.doesNotMatch(drawSource, /shapeBtn\.innerHTML = isCircle\s*\?\s*`<svg/);
assert.doesNotMatch(gallerySource, /const galleryIcon = '<svg/);
assert.match(indexHtml, /data-lucide-icon="x"/);
```

- [ ] **Step 2: Run the test and verify RED**

Run: `npm run test:icons`

Expected: FAIL on existing inline SVG and text `×` assertions.

- [ ] **Step 3: Migrate static HTML**

Replace functional SVGs in `index.html` with `data-lucide-icon` placeholders. Keep brand and illustration SVGs. Convert every modal close button to a Lucide `x` placeholder without changing IDs or labels.

- [ ] **Step 4: Migrate dynamic modules**

Import `icon` where required:

```js
import { icon } from "./icons.js";
```

Replace dynamic inline strings in `src/ui.js`, `src/draw.js`, and `src/gallery.js` with named calls. Call `hydrateIcons(document)` from `src/main.js` before the first UI render.

- [ ] **Step 5: Normalize icon alignment**

Only where needed, add:

```css
[data-lucide-icon],
.lucide-icon {
  display: inline-grid;
  place-items: center;
  line-height: 0;
}

.lucide-icon {
  display: block;
  flex: 0 0 auto;
}
```

Do not change button dimensions or theme tokens.

- [ ] **Step 6: Run migration tests**

Run: `npm run test:icons`

Expected: PASS.

### Task 3: Admin Migration and Full Verification

**Files:**
- Modify: `admin.html`
- Modify: `admin.js`
- Modify: `scripts/icons-regression.mjs`
- Generated: `app.bundle.js`
- Generated: `styles.css`

- [ ] **Step 1: Write failing admin assertions**

Require `admin.html` to contain Lucide placeholders for load/approve/reject actions, and require `admin.js` to call `hydrateIcons()` after rendering dynamic cards.

- [ ] **Step 2: Run the test and verify RED**

Run: `npm run test:icons`

Expected: FAIL because the admin actions are text-only.

- [ ] **Step 3: Migrate admin actions**

Use `refresh-cw`, `badge-check`, and `badge-x` with visible text retained. Import `hydrateIcons` in `admin.js`, hydrate the initial document, and hydrate each rendered card.

- [ ] **Step 4: Run automated verification**

Run:

```bash
npm run test:icons
npm run test:session
npm run build
git diff --check
```

Expected: all commands exit `0`.

- [ ] **Step 5: Scan residual markup**

Run:

```bash
rg -n "<svg|>×<" index.html admin.html src/*.js
```

Expected: only allowlisted brand/illustration SVGs and the SVG renderer template in `src/icons.js`.

- [ ] **Step 6: Browser verification**

Start `npm run dev`, then inspect the main app and `admin.html` in the in-app browser. Verify icon geometry, baseline, hover/focus states, modal close buttons, and browser console errors at desktop and mobile widths.

- [ ] **Step 7: Request code review**

Review the final diff against `docs/superpowers/specs/2026-06-13-lucide-icons-design.md`, fix all Critical and Important findings, then rerun Step 4.
