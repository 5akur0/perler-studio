import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");
const cssBlock = (source, selector) => {
  const match = source.match(new RegExp(`${selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\s*\\{([^}]*)\\}`));
  return match?.[1] || "";
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

assert.match(
  responsiveCss,
  /\.bead-studio-grid:not\(\[data-phase="choose"\]\)\s+\.left-panel\s*\{[\s\S]*?order:\s*1/,
  "mobile reference panel should appear before the bean box",
);
assert.match(
  responsiveCss,
  /\.bead-studio-grid:not\(\[data-phase="choose"\]\)\s+\.side-reference\s*\{[\s\S]*?grid-template-columns:\s*72px\s+minmax\(0,\s*1fr\)/,
  "mobile reference should collapse into a compact screenshot-friendly card",
);
assert.match(
  responsiveCss,
  /\.bead-studio-grid:not\(\[data-phase="choose"\]\)\s+\.right-panel\s*\{[\s\S]*?order:\s*2/,
  "mobile bean box should follow the compact reference card",
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

console.log("UI quality regression checks passed.");
