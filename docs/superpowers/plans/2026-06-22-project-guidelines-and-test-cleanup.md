# Project Guidelines and Regression Test Cleanup Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Establish a non-duplicated documentation hierarchy, document the intended zoomable mobile board behavior, and replace four obsolete implementation-detail regressions with a smaller all-green behavior-focused suite.

**Architecture:** `AGENTS.md` becomes the single agent-facing engineering contract and `CLAUDE.md` becomes a thin Claude-specific index. Chinese product intent remains in `PRODUCT.md` and measurable visual/interaction rules remain in `DESIGN.md`. Tests are consolidated by responsibility: static CSS validity in `ui-quality`, pure mobile calculations in `mobile-ui`, projection rendering contracts in `projection`, and real responsive behavior in `mobile-unification`/`mobile-tab-order`.

**Tech Stack:** Markdown, ES modules, Node `node:assert`, Playwright, CSS, esbuild, Git.

---

## File Map

- Create/track: `AGENTS.md` — shared English engineering instructions for all agents.
- Modify: `CLAUDE.md` — short English Claude-specific index that defers to `AGENTS.md`.
- Modify: `PRODUCT.md` — Chinese mobile viewport product intent.
- Modify: `DESIGN.md` — Chinese measurable board viewport and tablet bounding contract.
- Modify: `scripts/ui-quality-regression.mjs` — absorb the useful CSS declaration-scope check.
- Delete: `scripts/layout-ownership-regression.mjs` — remove the obsolete standalone implementation-ownership suite.
- Modify: `scripts/mobile-ui-regression.mjs` — retain pure behavior tests only.
- Modify: `scripts/projection-regression.mjs` — align the guide halo contract with the intentional 0.49 radius.
- Modify: `scripts/mobile-unification-regression.mjs` — remove old variable/DOM-position assertions and add zoom/pan reachability plus rectangular-tablet bounding behavior.
- Modify: `src/styles/responsive.css` — keep the tablet canvas DOM box inside its workbench while preserving square-board hugging.
- Modify: `package.json` — remove `test:layout-ownership`.
- Rebuild: `app.bundle.js`, `styles.css` — committed runtime assets.

### Task 1: Establish the Documentation Hierarchy

**Files:**
- Create/track: `AGENTS.md`
- Modify: `CLAUDE.md`
- Modify: `PRODUCT.md:58-65`
- Modify: `DESIGN.md:240-263`

- [ ] **Step 1: Rewrite `AGENTS.md` as the shared English contract**

Keep the existing repository structure and style sections, then replace the testing section with the following complete policy and add the language/source-of-truth sections:

```markdown
## Sources of Truth

- `AGENTS.md` owns shared engineering workflow, code style, build, test, and commit rules.
- `PRODUCT.md` owns product strategy and platform intent. It is maintained in Chinese.
- `DESIGN.md` owns measurable UI and interaction contracts. It is maintained in Chinese.
- `design-system/MASTER.md` contains deeper implementation history; `DESIGN.md` wins on conflict.
- `README.md` owns end-user usage details and general project setup.

## Language Policy

Use English for agent instructions, implementation specifications, plans, source comments, JSDoc, regression-test comments, and Conventional Commit messages. Keep `PRODUCT.md`, `DESIGN.md`, user-facing documentation, and interface copy in Chinese unless a document explicitly requires another language.

## Testing Guidelines

Regression checks are standalone Node scripts using `node:assert`; UI checks may use Playwright. Name new checks `scripts/<area>-regression.mjs` and add a matching `test:<area>` script to `package.json`.

Prefer observable user behavior or stable public contracts. Do not require a private helper to live in a particular file, preserve a private variable name, or keep a source literal that has no product meaning. When an architectural change invalidates an old contract, update, merge, or remove its regression test in the same change.

Run the focused regression plus `npm run build` while developing. Before merging to main, run every registered `test:<area>` command. Known failing tests are not an acceptable baseline. For interaction or responsive changes, verify desktop and mobile behavior; include tablet landscape when the change affects shared canvas or layout code.
```

Retain these existing hard requirements elsewhere in the file:

- `npm run build` after every `src/` change, with generated assets committed.
- CSP changes must update `_headers` and the `index.html` meta tag together.
- Read `PRODUCT.md` and `DESIGN.md` before user-facing UI work.
- English Conventional Commits and English source comments.
- Never commit real secrets such as `ADMIN_TOKEN`.

- [ ] **Step 2: Replace `CLAUDE.md` with a thin English index**

Use this complete structure:

```markdown
# CLAUDE.md

Perler Studio is a static browser craft game built from ES modules and CSS with esbuild. It runs from committed `app.bundle.js` and `styles.css`, including through `file://`; CloudBase provides gallery review and short-code sharing APIs.

## Required Reading

Follow `AGENTS.md` first for repository workflow, build, test, style, security, and commit rules.

Before product or UI work, read:

- `PRODUCT.md` — product strategy, users, platform intent, and accessibility goals.
- `DESIGN.md` — current visual and interaction contracts; it wins over older design notes.
- `design-system/MASTER.md` — deeper implementation history and supporting details.

Deployment and CloudBase administration are documented in `DEPLOY_CLOUDFLARE_PAGES.md` and `README.md`.

## Claude-Specific Notes

- `/impeccable ...` commands read `PRODUCT.md` and `DESIGN.md` automatically.
- Live design configuration lives at `.impeccable/live/config.json`.
- Agent-facing instructions, implementation specs, plans, code comments, JSDoc, test comments, and commit messages use English. Product/design documentation and UI copy remain Chinese.
```

- [ ] **Step 3: Add the mobile viewport intent to `PRODUCT.md`**

Append these bullets under `## Platform Interaction Strategy`:

```markdown
- **手机棋盘是工作视窗，不是全览缩略图**：初始状态不要求一次显示完整棋盘；用户可以自然地缩放、平移到任意有效格子。
- **可达性优先于强制全览**：成功标准是所有有效格子都能被看见并操作，而不是把整块棋盘强行缩小。不得为了初始全览牺牲豆子辨识度、落点精度或沉浸感。
- **跨端取景可以不同**：手机、平板和桌面可以使用不同的初始缩放、取景和工具密度，但必须共享作品状态与阶段语义。
```

- [ ] **Step 4: Add the measurable viewport contract to `DESIGN.md`**

Add this named rule immediately after the current `mobile-working` layout paragraph:

```markdown
**The Board-Viewport Rule（棋盘视窗规则）.** 手机与平板的 canvas 是观察和操作棋盘的**有界视窗**，不是必须完整包住棋盘的内容盒。棋盘可以超出当前取景，但绘制、命中测试、缩放和平移必须共享同一坐标变换，保证任意有效格子均可到达。页面级 canvas DOM 盒不得随图纸长宽比无限扩张，也不得把阶段操作或豆盒推出视口；超出部分由画布内部导航处理。手机初始不要求全览，平板横屏长方形图纸也必须受工作区可用高度约束。输入字号继续保持 ≥16px，触控目标继续保持 ≥44×44px。
```

- [ ] **Step 5: Review and commit the documentation changes**

Run:

```bash
git diff --check
rg -n "mobile-board-size.*must|完整显示完整棋盘|must show the complete board" AGENTS.md CLAUDE.md PRODUCT.md DESIGN.md
```

Expected: `git diff --check` prints nothing; the search finds no active requirement that the initial mobile view show the complete board.

Commit:

```bash
git add AGENTS.md CLAUDE.md PRODUCT.md DESIGN.md
git commit -m "docs: align agent rules with mobile board intent"
```

### Task 2: Remove Obsolete Static Test Contracts

**Files:**
- Modify: `scripts/ui-quality-regression.mjs`
- Delete: `scripts/layout-ownership-regression.mjs`
- Modify: `scripts/mobile-ui-regression.mjs`
- Modify: `scripts/projection-regression.mjs`
- Modify: `package.json`

- [ ] **Step 1: Capture the existing red baseline**

Run:

```bash
npm run test:layout-ownership
npm run test:mobile-ui
npm run test:projection
```

Expected: failures mention missing `--mobile-board-size`, missing `triggerHaptic("light")` in `main.js`, and expected projected radius `0.43`.

- [ ] **Step 2: Move CSS declaration-scope validation into `ui-quality`**

Extend the imports and stylesheet loading in `scripts/ui-quality-regression.mjs`:

```js
import { readFile, readdir } from "node:fs/promises";

const stylesDir = new URL("../src/styles/", import.meta.url);
const cssFileNames = (await readdir(stylesDir)).filter((name) => name.endsWith(".css")).sort();
const cssFiles = Object.fromEntries(
  await Promise.all(cssFileNames.map(async (name) => [name, await readFile(new URL(name, stylesDir), "utf8")])),
);
```

Add this parser and assertion before the existing UI-quality assertions:

```js
function declarations(css) {
  const source = css.replace(/\/\*[\s\S]*?\*\//g, "");
  const stack = [];
  const found = [];
  let buffer = "";
  for (const char of source) {
    if (char === "{") {
      stack.push(buffer.trim());
      buffer = "";
    } else if (char === "}") {
      const segment = buffer.trim();
      if (segment.includes(":")) found.push({ declaration: segment, ancestry: [...stack] });
      buffer = "";
      stack.pop();
    } else if (char === ";") {
      const segment = buffer.trim();
      if (segment.includes(":")) found.push({ declaration: segment, ancestry: [...stack] });
      buffer = "";
    } else {
      buffer += char;
    }
  }
  return found;
}

for (const [file, css] of Object.entries(cssFiles)) {
  for (const item of declarations(css)) {
    const owner = item.ancestry[item.ancestry.length - 1] || "";
    assert.doesNotMatch(
      owner,
      /^@(media|supports)\b/,
      `${file}: declaration "${item.declaration.slice(0, 48)}" must be inside a selector`,
    );
  }
}
```

Run:

```bash
npm run test:ui-quality
```

Expected: PASS.

- [ ] **Step 3: Delete the redundant layout-ownership suite**

Delete `scripts/layout-ownership-regression.mjs` and remove this package entry:

```json
"test:layout-ownership": "node scripts/layout-ownership-regression.mjs",
```

Run:

```bash
test ! -e scripts/layout-ownership-regression.mjs
! rg -n "test:layout-ownership|layout-ownership-regression" package.json scripts
```

Expected: both commands exit successfully with no matches.

- [ ] **Step 4: Replace `mobile-ui` with pure behavior checks**

Replace `scripts/mobile-ui-regression.mjs` with:

```js
import assert from "node:assert/strict";
import { workflowSummary } from "../src/workflow.js";
import { beadSettleScale } from "../src/utils.js";

const phases = [
  { id: "choose", name: "选图" },
  { id: "place", name: "摆放" },
  { id: "inspect", name: "检查" },
];

assert.deepEqual(workflowSummary(phases, "place"), {
  index: 1,
  total: 3,
  current: "摆放",
  next: "检查",
});
assert.deepEqual(workflowSummary(phases, "inspect"), {
  index: 2,
  total: 3,
  current: "检查",
  next: "",
});

assert.equal(beadSettleScale(0, 180, false), 0.72);
assert.equal(beadSettleScale(90, 180, false) > 0.95, true);
assert.equal(beadSettleScale(180, 180, false), 1);
assert.equal(beadSettleScale(0, 180, true), 1);

console.log("Mobile UI behavior checks passed.");
```

Run:

```bash
npm run test:mobile-ui
```

Expected: PASS without reading `main.js`, `ui.js`, or CSS source text.

- [ ] **Step 5: Align the projection halo contract**

In `scripts/projection-regression.mjs`, replace the radius assertion with:

```js
assert.match(
  guideCacheSource,
  /projectedBeadRadius\s*=\s*cell\s*\*\s*0\.49/,
  "projected beads should remain slightly larger than real beads so the guide halo stays visible",
);
```

Also update the earlier negative assertion so it no longer embeds `cell * 0.43`; it should only ensure the overall lamp spot is not expanded by any projected bead radius:

```js
assert.doesNotMatch(
  guideCacheSource,
  /spotRadius\s*=\s*Math\.min\(canvasW,\s*canvasH\)\s*\*\s*0\.425\s*\+\s*projectedBeadRadius/,
  "do not enlarge the whole lamp spot by the projected bead radius",
);
```

Run:

```bash
npm run test:projection
```

Expected: PASS.

- [ ] **Step 6: Commit the static test cleanup**

Run:

```bash
npm run test:ui-quality
npm run test:mobile-ui
npm run test:projection
git diff --check
```

Expected: all three tests pass and `git diff --check` prints nothing.

Commit:

```bash
git add package.json scripts/ui-quality-regression.mjs scripts/mobile-ui-regression.mjs scripts/projection-regression.mjs
git add -u scripts/layout-ownership-regression.mjs
git commit -m "test: remove obsolete implementation contracts"
```

### Task 3: Protect Bounded Tablet Layout and Mobile Edge Reachability

**Files:**
- Modify: `scripts/mobile-unification-regression.mjs`
- Modify: `src/styles/responsive.css:541-564`
- Rebuild: `styles.css`

- [ ] **Step 1: Remove the obsolete CSS-variable assertion and current DOM-position assumptions**

Replace `assertMobileCssDefinesLayoutContract()` with:

```js
function assertMobileCssDefinesLayoutContract() {
  assert.doesNotMatch(tokensCss, /--mobile-board-size:/, "removed mobile board budget must not return");
  assert.match(tokensCss, /--mobile-dock-h:/, "phone working layout should reserve a stable bottom dock");
  assert.doesNotMatch(
    responsiveCss,
    /@media[^{]*\{\s*(?:\/\*[\s\S]*?\*\/\s*)*--[a-z-]+\s*:/,
    "custom properties must not be declared bare inside an @media body",
  );
  assert.match(
    responsiveCss,
    /\.bead-studio-grid:not\(\[data-phase="choose"\]\) \.mobile-action-host[\s\S]{0,90}display:\s*contents/,
    "mobile action host must preserve board → actions → bead-box DOM order",
  );
  assert.match(responsiveCss, /\.start-screen[\s\S]*overflow-y:\s*auto/, "mobile home must remain recoverably scrollable");
}
```

Inside `assertMobilePhasePanelsAndControls()`, remove `mobileControls` and `controlsAfterWorkbench` from the snapshot and replace the two corresponding assertions with:

```js
assert.match(
  result.controlsParentClass,
  /mobile-action-host/,
  `phone controls must mount in the authored mobile action host: ${JSON.stringify(result)}`,
);
```

- [ ] **Step 2: Add a failing rectangular-tablet browser regression**

Add this session fixture after `sessionForPhase()`:

```js
function rectangularTabletSession() {
  const width = 30;
  const height = 60;
  const rows = Array.from({ length: height }, () => "K".repeat(width));
  return {
    version: 2,
    phase: "place",
    selectedPatternId: "custom-tablet-tall",
    patternSize: height,
    boardWidth: width,
    boardHeight: height,
    boardRows: rows,
    customPattern: {
      id: "custom-tablet-tall",
      name: "纵向测试图纸",
      size: height,
      width,
      height,
      rows,
      sourceRows: rows,
      sourceSize: height,
      sourceWidth: width,
      sourceHeight: height,
      craft: "原版",
    },
    placed: Array(width * height).fill(null),
    heat: Array(width * height).fill(0),
    selectedColor: "K",
    sandboxMode: true,
    boardView: { scale: 1, panX: 0, panY: 0 },
  };
}
```

Add this Playwright check before the final assertions:

```js
async function assertRectangularTabletCanvasIsBounded(baseUrl) {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1024, height: 768 },
    hasTouch: true,
    isMobile: true,
  });
  const page = await context.newPage();
  try {
    await page.addInitScript((session) => {
      localStorage.setItem("beadWorkshopSession.v1", JSON.stringify(session));
    }, rectangularTabletSession());
    await page.goto(baseUrl, { waitUntil: "networkidle" });
    await page.click("#startResumeBtn");
    await page.waitForTimeout(200);
    const result = await page.evaluate(() => {
      const grid = document.querySelector("#studioGrid").getBoundingClientRect();
      const canvas = document.querySelector("#sceneCanvas").getBoundingClientRect();
      const controls = document.querySelector("#stageControls").getBoundingClientRect();
      return {
        grid: { top: grid.top, bottom: grid.bottom },
        canvas: { top: canvas.top, bottom: canvas.bottom, height: canvas.height },
        controls: { top: controls.top, bottom: controls.bottom },
        viewportHeight: innerHeight,
      };
    });
    assert.ok(result.canvas.top >= result.grid.top - 1, JSON.stringify(result));
    assert.ok(result.canvas.bottom <= result.grid.bottom + 1, JSON.stringify(result));
    assert.ok(result.controls.top >= 0 && result.controls.bottom <= result.viewportHeight, JSON.stringify(result));
  } finally {
    await context.close();
    await browser.close();
  }
}
```

Call `await assertRectangularTabletCanvasIsBounded(url)` inside the existing server `try` block.

Run:

```bash
npm run test:mobile-unification
```

Expected: FAIL because the 1:2 canvas DOM box extends above and below the tablet studio grid.

- [ ] **Step 3: Bound the tablet canvas without forcing square boards to fill the column**

Update the coarse-pointer tablet rule in `src/styles/responsive.css`:

```css
@media (hover: none) and (pointer: coarse) and (min-width: 861px) {
  .bead-studio-grid:not([data-phase="choose"]) .workbench {
    container-type: inline-size;
    align-self: stretch;
    justify-content: center;
    overflow: hidden;
  }

  .bead-studio-grid:not([data-phase="choose"]) #sceneCanvas {
    flex: 0 1 auto;
    width: 100cqi;
    height: auto;
    aspect-ratio: var(--board-aspect, 1 / 1);
    min-height: 0;
    max-width: 100%;
    max-height: 100%;
  }
}
```

This keeps square/wide boards hugged by their aspect ratio while capping tall canvas boxes to the definite stretched workbench height. Canvas drawing remains undistorted because `setupHiDpiCanvas()` measures the final DOM rect and `computeLayout()` fits the board into both available axes.

Run:

```bash
npm run build:css
npm run test:mobile-unification
```

Expected: the rectangular-tablet assertion passes; if another stale assertion is exposed, update it only when it encodes the old detached-control implementation rather than user behavior.

- [ ] **Step 4: Add a mobile edge-cell reachability regression**

Add this check to `scripts/mobile-unification-regression.mjs`:

```js
async function assertMobileBoardEdgesAreReachable(baseUrl) {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 320, height: 568 },
    hasTouch: true,
    isMobile: true,
  });
  const page = await context.newPage();
  try {
    await page.goto(baseUrl, { waitUntil: "networkidle" });
    await page.click("#startBeadButton");
    await page.click("#mobileSelectionStartButton");
    await page.waitForTimeout(100);
    const result = await page.evaluate(async () => {
      const render = await import("/src/render.js");
      render.invalidateLayoutCache();
      const layout = render.currentLayout();

      function pointForCell(x, y, view) {
        const localX = layout.boardX + (x + 0.5) * layout.cell;
        const localY = layout.boardY + (y + 0.5) * layout.cell;
        return {
          x: view.cx + view.panX + (localX - view.cx) * view.scale,
          y: view.cy + view.panY + (localY - view.cy) * view.scale,
        };
      }

      render.setBoardZoom(2, 1e6, 1e6);
      const topLeftView = render.boardViewTransform(layout);
      const topLeftPoint = pointForCell(0, 0, topLeftView);
      const topLeft = render.boardCellFromPoint(topLeftPoint.x, topLeftPoint.y);

      render.setBoardZoom(2, -1e6, -1e6);
      const bottomRightView = render.boardViewTransform(layout);
      const bottomRightPoint = pointForCell(29, 29, bottomRightView);
      const bottomRight = render.boardCellFromPoint(bottomRightPoint.x, bottomRightPoint.y);

      return { topLeft, bottomRight };
    });
    assert.deepEqual(result.topLeft, { x: 0, y: 0 }, JSON.stringify(result));
    assert.deepEqual(result.bottomRight, { x: 29, y: 29 }, JSON.stringify(result));
  } finally {
    await context.close();
    await browser.close();
  }
}
```

Call `await assertMobileBoardEdgesAreReachable(url)` in the server `try` block.

Run:

```bash
npm run test:mobile-unification
```

Expected: PASS, proving that an initially clipped board is intentional and both corner cells remain addressable through the shared zoom/pan transform.

- [ ] **Step 5: Commit responsive behavior and its regression**

Run:

```bash
npm run build
npm run test:mobile-unification
npm run test:mobile-tab-order
git diff --check
```

Expected: all commands pass; `styles.css` is updated and `app.bundle.js` has no content drift unless another current source change required rebuilding it.

Commit:

```bash
git add src/styles/responsive.css scripts/mobile-unification-regression.mjs styles.css app.bundle.js
git commit -m "fix(tablet): bound rectangular board viewport"
```

### Task 4: Verify the All-Green Main-Branch Contract

**Files:**
- Verify only: `package.json`, generated assets, repository status

- [ ] **Step 1: Build from source**

Run:

```bash
npm run build
git diff --exit-code -- app.bundle.js styles.css
```

Expected: build passes and generated assets have no uncommitted drift.

- [ ] **Step 2: Run every registered regression**

Run:

```bash
set -e
for script in $(node -e 'const p=require("./package.json"); for (const k of Object.keys(p.scripts).filter(k=>k.startsWith("test:")).sort()) console.log(k)'); do
  npm run "$script"
done
```

Expected: every remaining `test:<area>` command exits 0. `test:layout-ownership` is no longer listed.

- [ ] **Step 3: Run a desktop Playwright smoke check**

Run:

```bash
node server.cjs >/tmp/beam-guidelines-server.log 2>&1 &
server_pid=$!
trap 'kill "$server_pid" 2>/dev/null' EXIT
sleep 0.5
node --input-type=module <<'NODE'
import assert from "node:assert/strict";
import { chromium } from "playwright";

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const errors = [];
page.on("pageerror", (error) => errors.push(error.message));
await page.goto("http://127.0.0.1:5173/", { waitUntil: "networkidle" });
await page.click("#startBeadButton");
await page.click("#chooseStartButton");
await page.waitForTimeout(100);
const result = await page.evaluate(() => ({
  mode: document.body.dataset.appMode,
  phase: document.querySelector("#studioGrid")?.dataset.phase,
  horizontalOverflow: document.documentElement.scrollWidth > innerWidth,
}));
assert.deepEqual(errors, []);
assert.equal(result.mode, "bead");
assert.equal(result.phase, "place");
assert.equal(result.horizontalOverflow, false);
await browser.close();
NODE
kill "$server_pid"
wait "$server_pid" 2>/dev/null || true
trap - EXIT
```

Expected: exit 0 with no page errors or horizontal overflow.

- [ ] **Step 4: Verify language and documentation boundaries**

Run:

```bash
git diff --check
rg -n "^#|^##" AGENTS.md CLAUDE.md docs/superpowers/specs docs/superpowers/plans
git status --short
```

Expected: agent-facing headings are English; only unrelated pre-existing untracked files remain.

- [ ] **Step 5: Record final verification**

If verification produces no further changes, do not create an empty commit. Report:

- build result;
- number of remaining registered regressions and pass count;
- browser coverage for 320×568 phone portrait, 1024×768 tablet landscape with a 1:2 pattern, and desktop;
- confirmation that generated assets match source;
- unrelated pre-existing untracked files left untouched.
