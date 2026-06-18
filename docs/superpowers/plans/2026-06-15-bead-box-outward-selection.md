# Bead Box Outward Selection Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make every selected bead-color chip use the approved outward 2px ink outline without shrinking its internal swatch.

**Architecture:** Define the selected appearance once in `src/styles/components.css` so desktop bead placement, mobile bead placement, recent drawing colors, and the full drawing palette share the same rule. Keep responsive CSS responsible only for palette spacing, retain existing needed-color glow, and protect the contract with a source-level regression script.

**Tech Stack:** CSS, Node.js regression scripts, esbuild, static HTML application.

---

## File Map

- Create `scripts/color-chip-selection-regression.mjs`: asserts the source CSS contract for outward selection and absence of the old inset/mobile-only implementations.
- Modify `package.json`: exposes the regression script as `test:color-chip-selection`.
- Modify `src/styles/components.css`: replaces the inset selected ring with the approved global outward outline.
- Modify `src/styles/responsive.css`: removes the duplicate mobile-only selected-ring override while preserving mobile palette padding.
- Modify `DESIGN.md`: updates the canonical chip-state rule.
- Modify `design-system/MASTER.md`: records the same outward-selection requirement in the compact system checklist.
- Rebuild `styles.css`: updates the generated CSS bundle.

### Task 1: Lock the outward-selection contract

**Files:**
- Create: `scripts/color-chip-selection-regression.mjs`
- Modify: `package.json`

- [ ] **Step 1: Write the failing regression test**

```js
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const componentsCss = await readFile(new URL("../src/styles/components.css", import.meta.url), "utf8");
const responsiveCss = await readFile(new URL("../src/styles/responsive.css", import.meta.url), "utf8");

const activeRule = componentsCss.match(/\.color-chip\.active\s*\{([\s\S]*?)\n\}/)?.[1] || "";
assert.match(activeRule, /outline:\s*2px solid var\(--ink\)/);
assert.match(activeRule, /outline-offset:\s*2px/);
assert.match(activeRule, /0 0 0 4px rgba\(38,\s*36,\s*43,\s*0\.06\)/);
assert.doesNotMatch(activeRule, /inset 0 0 0 3\.5px var\(--ink\)/);

const activeNeededRule = componentsCss.match(/\.color-chip\.active\.needed\s*\{([\s\S]*?)\n\}/)?.[1] || "";
assert.match(activeNeededRule, /outline-color:\s*rgba\(20,\s*20,\s*26,\s*0\.8\)/);
assert.doesNotMatch(responsiveCss, /\.color-chip\.active\s*\{/);

console.log("Color chip selection regression checks passed.");
```

- [ ] **Step 2: Add the package script**

Add to `package.json`:

```json
"test:color-chip-selection": "node scripts/color-chip-selection-regression.mjs"
```

- [ ] **Step 3: Run the test and verify RED**

Run:

```bash
npm run test:color-chip-selection
```

Expected: FAIL because the global `.color-chip.active` rule still uses inset rings and the responsive stylesheet still owns an active override.

### Task 2: Implement the global outward ring

**Files:**
- Modify: `src/styles/components.css`
- Modify: `src/styles/responsive.css`

- [ ] **Step 1: Replace the global active rule**

Use:

```css
/* The selected ring expands outside the chip so the swatch keeps its full area.
   Palette padding reserves space at scroll edges for the outline and soft halo. */
.color-chip.active {
  border-color: var(--ink);
  outline: 2px solid var(--ink);
  outline-offset: 2px;
  box-shadow:
    inset 0 0 0 2px rgba(38, 36, 43, 0.08),
    0 0 0 4px rgba(38, 36, 43, 0.06);
}
```

- [ ] **Step 2: Preserve needed-color glow under the outward ring**

Use:

```css
.color-chip.active.needed {
  border-color: var(--ink);
  outline-color: rgba(20, 20, 26, 0.8);
  box-shadow:
    inset 0 0 0 2px rgba(38, 36, 43, 0.08),
    0 0 0 4px rgba(38, 36, 43, 0.06),
    0 0 16px var(--brand-tint),
    0 0 24px color-mix(in srgb, var(--brand) 30%, transparent);
  animation: none;
}
```

- [ ] **Step 3: Remove the mobile-only active overrides**

Delete the `.color-chip.active` and `.color-chip.active.needed` blocks from the mobile media query in `src/styles/responsive.css`. Keep:

```css
.color-palette {
  padding: var(--sp-1);
}
```

- [ ] **Step 4: Run the regression test and verify GREEN**

Run:

```bash
npm run test:color-chip-selection
```

Expected: `Color chip selection regression checks passed.`

### Task 3: Synchronize design documentation

**Files:**
- Modify: `DESIGN.md`
- Modify: `design-system/MASTER.md`

- [ ] **Step 1: Update the canonical chip rule**

Replace the inset-ring statement in `DESIGN.md` with:

```markdown
- **State:** `.active` 用 `2px --ink` 外描边并向外偏移 `2px`，保留低透明度外晕圈；选中态不得侵占色样面积。`.color-palette` 必须保留至少 `4px` 内边距，避免边缘 chip 被 `overflow:auto` 裁切。`.needed`（当前图纸所需色号）保留品牌色辉光 + `needed-chip-glow/-aura` 呼吸动画（环境型循环，受 reduced-motion 覆盖）。
```

- [ ] **Step 2: Add the compact MASTER rule**

Add under the responsive/platform guidance in `design-system/MASTER.md`:

```markdown
- **豆盒选中态**：桌面、手机和绘图台统一使用向外扩展的 `2px` 深色描边（offset `2px`），不得用内嵌环压缩色样；滚动色板保留至少 `4px` 安全内边距。
```

- [ ] **Step 3: Check documentation consistency**

Run:

```bash
rg -n "内嵌双环|不要用 outer|豆盒选中态|outline-offset" DESIGN.md design-system/MASTER.md
```

Expected: no obsolete inset-ring prohibition; the new outward rule appears in both documents.

### Task 4: Build and verify

**Files:**
- Rebuild: `styles.css`

- [ ] **Step 1: Build generated assets**

Run:

```bash
npm run build
```

Expected: esbuild completes with exit code 0.

- [ ] **Step 2: Run focused and existing regressions**

Run:

```bash
npm run test:color-chip-selection
npm run test:mobile-ui
npm run test:release
```

Expected: all three scripts pass.

- [ ] **Step 3: Verify source and generated CSS**

Run:

```bash
rg -n -A8 "\.color-chip\.active" src/styles/components.css styles.css
git diff --check
```

Expected: source and bundle contain the outward outline; no whitespace errors.

- [ ] **Step 4: Inspect the application at desktop and mobile widths**

Start the local app with `npm run dev`, open the bead-placement screen, and verify:

- 1440px desktop: selected chip outline expands outward and is not clipped at top/left/right palette edges.
- 375px mobile: selected chip uses the same outline and retains its full swatch area.
- Selected `.needed` chip keeps the brand glow beneath the dark outline.
- Drawing studio recent colors and full palette use the same selected appearance.
- Keyboard focus remains visually distinguishable from selection.

- [ ] **Step 5: Review the final diff**

Run:

```bash
git diff -- scripts/color-chip-selection-regression.mjs package.json src/styles/components.css src/styles/responsive.css DESIGN.md design-system/MASTER.md styles.css
```

Expected: only the selection-state contract, documentation, test script, package script, and generated bundle change.
