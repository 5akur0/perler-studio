import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");
const cssBlock = (source, selector) => {
  const match = source.match(new RegExp(`${selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\s*\\{([^}]*)\\}`));
  return match?.[1] || "";
};
const cssBlocks = (source, selector) => {
  const pattern = new RegExp(`${selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\s*\\{([^}]*)\\}`, "g");
  return [...source.matchAll(pattern)].map((match) => match[1] || "");
};

const [
  baseCss,
  responsiveCss,
  screensCss,
  modalController,
] = await Promise.all([
  read("src/styles/base.css"),
  read("src/styles/responsive.css"),
  read("src/styles/screens.css"),
  read("src/modal-controller.js"),
]);

assert.equal(
  responsiveCss.includes("background: var(--bg);"),
  false,
  "orientation overlay must use a defined theme background token",
);

assert.equal(
  /transition:[^;]*transform/.test(cssBlock(baseCss, "button")),
  false,
  "global button transitions must not animate transform",
);
assert.equal(
  /transform:/.test(cssBlock(baseCss, "button:hover")),
  false,
  "global button hover must not move or scale controls",
);
assert.equal(
  /transform:/.test(cssBlock(baseCss, "button:active")),
  false,
  "global button active state must not move or scale controls",
);

assert.equal(
  modalController.includes("window.confirm"),
  false,
  "confirmModal must never fall back to native window.confirm",
);

assert.equal(
  /display:\s*none/.test(cssBlock(responsiveCss, ".start-showcase")),
  false,
  "mobile home must keep a compact showcase preview",
);

assert.match(
  responsiveCss,
  /\.start-showcase\s*\{[\s\S]*?grid-template-columns:\s*72px\s+minmax\(0,\s*1fr\)/,
  "mobile showcase should render as a compact bead preview row",
);

// Mobile-working slot order owned by CSS: 1 board · 2 actions · 3 bean box.
assert.match(
  responsiveCss,
  /\.bead-studio-grid:not\(\[data-phase="choose"\]\)\s+\.workbench\s*\{[\s\S]*?order:\s*1/,
  "mobile slot 1: the board sits at the top",
);
assert.match(
  responsiveCss,
  /\.bead-studio-grid:not\(\[data-phase="choose"\]\)\s+#stageControls\s*\{[\s\S]*?order:\s*2/,
  "mobile slot 2: the action buttons sit right under the board",
);
assert.match(
  responsiveCss,
  /\.bead-studio-grid:not\(\[data-phase="choose"\]\)\s+\.right-panel\s*\{[\s\S]*?order:\s*3/,
  "mobile slot 3: the bean box (color picker) sits under the actions",
);
assert.match(
  responsiveCss,
  /\.bead-studio-grid:not\(\[data-phase="choose"\]\)\s+\.side-reference\s*\{[\s\S]*?display:\s*none/,
  "mobile should hide the reference sheet (light hint guides placement; counts live on the 豆盒 chips)",
);
assert.match(
  responsiveCss,
  /\.bead-studio-grid:not\(\[data-phase="choose"\]\)\s+\.left-panel[\s\S]{0,180}display:\s*contents/,
  "mobile left rail is dissolved (display:contents) so CSS slots #stageControls — no JS DOM move",
);

assert.match(
  responsiveCss,
  /\.place-hint\s*\{[\s\S]*?top:\s*auto[\s\S]*?bottom:/,
  "mobile placement hint should avoid covering the top edge of the board",
);

assert.match(
  responsiveCss,
  /\.drawing-tools-panel\s+\.tool-toggle\s+button::after\s*\{[\s\S]*?content:\s*attr\(aria-label\)/,
  "mobile drawing tool buttons should show visible labels",
);
assert.match(
  responsiveCss,
  /#drawUsePatternButton\s*\{[\s\S]*?order:\s*-1/,
  "mobile drawing primary CTA should be promoted above secondary actions",
);

assert.match(
  screensCss,
  /\.gallery-empty\s*\{[\s\S]*?background:[\s\S]*?var\(--surface\)/,
  "gallery empty state should be a deliberate screenshot-ready surface",
);

assert.equal(
  cssBlocks(screensCss, ".start-row-bead").some((block) => /background:/.test(block)),
  false,
  "home bead entry should not look pre-selected; its fill should only appear on hover",
);
assert.match(
  cssBlock(screensCss, ".start-row-bead:hover"),
  /background:/,
  "home bead entry should gain the bead-tinted fill on hover",
);

console.log("UI quality regression checks passed.");
