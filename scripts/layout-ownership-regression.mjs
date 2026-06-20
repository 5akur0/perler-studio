// Layout size-ownership regression.
//
// Validates the *effective scope* of CSS declarations and the layout size
// contracts via a brace-aware parse that preserves full at-rule/selector
// ancestry — not string matching — so the class of bug where a budget token is
// declared in an invalid place (and silently dropped), or pretends to own an axis
// it does not control, cannot recur.
//
// Contracts enforced:
//  1. Valid scope — no declaration sits directly inside an @media / @supports body
//     (a conditional group rule may only contain rules, so it would be discarded).
//  2. The mobile board budget is defined EXACTLY twice, each in a :root whose
//     ancestor is @media ≤860 and @media ≤620 respectively, and owns only the
//     vertical cap (no 100vw / width term).
//  3. Every consumer of the budget lives in the mobile-working scope (#sceneCanvas
//     under a ≤860 media) and composes it with the container width: min(100cqi, …).
//     The workbench is the width owner (container-type: inline-size).
//  4. desktop-working stays a rectangular composite workbench (fills its column),
//     never sized from the mobile budget or squared.
//  5. The identical ≥861 working track recipe has a single source (--studio-cols-work),
//     consumed by both the bead studio and the drawing studio.

import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";

const stylesDir = new URL("../src/styles/", import.meta.url);
const cssFileNames = (await readdir(stylesDir)).filter((f) => f.endsWith(".css")).sort();
const cssFiles = Object.fromEntries(
  await Promise.all(cssFileNames.map(async (name) => [name, await readFile(new URL(name, stylesDir), "utf8")])),
);

const stripComments = (css) => css.replace(/\/\*[\s\S]*?\*\//g, "");

// Brace-aware walk → every declaration with its FULL ancestry (outermost→immediate
// block header). A declaration is text containing ':' terminated by ';' or '}'.
function declarations(css) {
  const src = stripComments(css);
  const stack = [];
  const out = [];
  let buf = "";
  for (const ch of src) {
    if (ch === "{") {
      stack.push(buf.trim());
      buf = "";
    } else if (ch === "}") {
      const seg = buf.trim();
      if (seg.includes(":")) out.push({ decl: seg, ancestry: [...stack] });
      buf = "";
      stack.pop();
    } else if (ch === ";") {
      const seg = buf.trim();
      if (seg.includes(":")) out.push({ decl: seg, ancestry: [...stack] });
      buf = "";
    } else {
      buf += ch;
    }
  }
  return out;
}

const allDeclarations = Object.entries(cssFiles).flatMap(([file, css]) =>
  declarations(css).map((d) => ({ ...d, file })),
);

const immediate = (d) => (d.ancestry[d.ancestry.length - 1] || "").split("{").pop().trim();
const mediaCaps = (d) =>
  d.ancestry
    .map((h) => h.match(/@media[^{]*max-width:\s*(\d+)px/))
    .filter(Boolean)
    .map((m) => Number(m[1]));
const ancestryHas = (d, re) => d.ancestry.some((h) => re.test(h));

// 1. Valid scope across ALL stylesheets.
function assertNoDeclarationsBareInConditionalGroups() {
  for (const d of allDeclarations) {
    assert.ok(
      !/^@(media|supports)\b/.test(immediate(d)),
      `${d.file}: "${d.decl.slice(0, 48)}" is declared directly inside "${immediate(d).slice(0, 40)}" — invalid scope; wrap it in a selector (e.g. :root).`,
    );
  }
}

// 2. Budget defined exactly twice: ≤860 :root and ≤620 :root, vertical cap only.
function assertBudgetOwnedInRootAtBothBreakpoints() {
  const defs = allDeclarations.filter((d) => /^--mobile-board-size\s*:/.test(d.decl));
  assert.equal(defs.length, 2, `--mobile-board-size must be defined exactly twice; found ${defs.length}`);

  const caps = new Set();
  for (const d of defs) {
    assert.equal(immediate(d), ":root", `--mobile-board-size must be declared inside :root (got "${immediate(d)}")`);
    const ms = mediaCaps(d);
    assert.equal(ms.length, 1, "each budget definition must sit under exactly one max-width @media");
    caps.add(ms[0]);
    assert.doesNotMatch(d.decl, /vw|100%/, "the budget owns only the vertical cap — it must not reference container width (vw/%)");
    assert.match(d.decl, /vh/, "the budget must be a vertical (vh) cap");
  }
  assert.deepEqual([...caps].sort((a, b) => a - b), [620, 860], "the two budgets must live under ≤620 and ≤860");
}

// 3. Every consumer is in mobile-working scope and composes width with the cap.
function assertConsumersAreMobileWorkingScoped() {
  const consumers = allDeclarations.filter((d) => /var\(--mobile-board-size\)/.test(d.decl));
  assert.ok(consumers.length >= 2, "expected the mobile #sceneCanvas to consume the budget for both axes");
  for (const d of consumers) {
    assert.ok(
      ancestryHas(d, /#sceneCanvas/) && ancestryHas(d, /\.bead-studio-grid:not\(\[data-phase="choose"\]\)/),
      `consumer "${d.decl}" must live in the mobile-working #sceneCanvas scope`,
    );
    assert.ok(mediaCaps(d).includes(860), `consumer "${d.decl}" must be under the ≤860 media`);
    assert.match(
      d.decl,
      /min\(\s*100cqi\s*,\s*var\(--mobile-board-size\)\s*\)/,
      "the board edge must compose the container width (100cqi) with the vertical cap",
    );
  }

  // The workbench is the width owner (a query container) in mobile-working.
  const responsive = cssFiles["responsive.css"];
  const workbench = responsive.match(
    /\.bead-studio-grid:not\(\[data-phase="choose"\]\) \.workbench\s*\{([^}]*)\}/,
  );
  assert.ok(workbench, "mobile-working workbench rule should exist");
  assert.match(workbench[1], /container-type:\s*inline-size/, "the workbench must own the available width as a query container");
  assert.doesNotMatch(workbench[1], /height:\s*var\(--mobile-board-size\)/, "the workbench must not also claim the board height");
  assert.doesNotMatch(responsive, /min-height:\s*500px/, "no competing ≤620 #sceneCanvas height floor");
}

// 4. Desktop-working stays a rectangular composite: never reads the mobile budget,
//    never squared, fills its column.
function assertDesktopWorkingRectangular() {
  const componentsNoComments = stripComments(cssFiles["components.css"]);
  const sceneBase = componentsNoComments.match(/(?:^|\n)#sceneCanvas\s*\{([^}]*)\}/);
  assert.ok(sceneBase, "base #sceneCanvas rule should exist in components.css");
  assert.match(sceneBase[1], /height:\s*100%/, "desktop-working board fills its workbench column (rectangular composite)");
  assert.doesNotMatch(sceneBase[1], /--mobile-board-size/, "desktop-working board must not use the mobile budget");
  assert.doesNotMatch(componentsNoComments, /#sceneCanvas[^}]*aspect-ratio:\s*1\s*\/\s*1/, "desktop #sceneCanvas must not be forced square");
}

// 5. Single source for the shared ≥861 working track recipe.
function assertSharedTrackSingleSource() {
  const raw = /clamp\(208px, 25vw, 300px\)/g;
  let total = 0;
  for (const [file, css] of Object.entries(cssFiles)) {
    const n = (css.match(raw) || []).length;
    if (file !== "tokens.css") assert.equal(n, 0, `${file} must not inline the working track recipe`);
    total += n;
  }
  assert.equal(total, 1, "the working track recipe must be defined once, in tokens.css (--studio-cols-work)");

  const responsive = cssFiles["responsive.css"];
  assert.match(
    responsive,
    /\.bead-studio-grid:not\(\[data-phase="choose"\]\)\s*\{[^}]*grid-template-columns:\s*var\(--studio-cols-work\)/,
    "bead-working should consume var(--studio-cols-work)",
  );
  assert.match(
    responsive,
    /\.studio-grid\.drawing-studio-grid\s*\{[^}]*grid-template-columns:\s*var\(--studio-cols-work\)/,
    "drawing studio should consume var(--studio-cols-work)",
  );
}

const tests = [
  ["valid declaration scope (all stylesheets)", assertNoDeclarationsBareInConditionalGroups],
  ["budget owned in :root at ≤860 and ≤620 (exactly twice, vertical cap only)", assertBudgetOwnedInRootAtBothBreakpoints],
  ["all budget consumers are mobile-working scoped + composite width", assertConsumersAreMobileWorkingScoped],
  ["desktop-working stays rectangular composite", assertDesktopWorkingRectangular],
  ["shared working track single source", assertSharedTrackSingleSource],
];

let failed = 0;
for (const [label, fn] of tests) {
  try {
    fn();
    console.log(`  ✓ ${label}`);
  } catch (err) {
    failed += 1;
    console.error(`  ✗ ${label}\n    ${err.message}`);
  }
}

if (failed > 0) {
  console.error(`\nlayout-ownership-regression: ${failed} contract(s) failed`);
  process.exit(1);
}
console.log(`\nlayout-ownership-regression: all layout size-ownership contracts hold (scanned ${cssFileNames.length} stylesheets)`);
