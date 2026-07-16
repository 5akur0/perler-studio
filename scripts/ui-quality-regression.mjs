import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");
const stylesDir = new URL("../src/styles/", import.meta.url);
const cssFileNames = (await readdir(stylesDir)).filter((name) => name.endsWith(".css")).sort();
const cssFiles = Object.fromEntries(
  await Promise.all(cssFileNames.map(async (name) => [name, await readFile(new URL(name, stylesDir), "utf8")])),
);
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
  indexHtml,
  modalController,
] = await Promise.all([
  read("src/styles/base.css"),
  read("src/styles/responsive.css"),
  read("src/styles/screens.css"),
  read("index.html"),
  read("src/modal-controller.js"),
]);

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

// Mobile-working order is composed in the DOM (board → actions → bean box) so the
// keyboard/screen-reader order matches the visuals. The mobile action host is
// display:contents and the emptied left rail is hidden. (Tab order itself is
// verified end-to-end in mobile-tab-order-regression.)
assert.match(
  responsiveCss,
  /\.bead-studio-grid:not\(\[data-phase="choose"\]\)\s+\.mobile-action-host[\s\S]{0,90}display:\s*contents/,
  "mobile action host is display:contents so the mounted actions take their DOM grid position under the board",
);
assert.match(
  responsiveCss,
  /\.bead-studio-grid:not\(\[data-phase="choose"\]\)\s+\.left-panel[\s\S]{0,90}display:\s*none/,
  "mobile left rail is hidden (actions are mounted in the host after the board, not the rail)",
);
assert.match(
  responsiveCss,
  /\.bead-studio-grid:not\(\[data-phase="choose"\]\)\s+\.side-reference\s*\{[\s\S]*?display:\s*none/,
  "mobile should hide the reference sheet (light hint guides placement; counts live on the 豆盒 chips)",
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
assert.ok(
  indexHtml.indexOf('id="drawUsePatternButton"') < indexHtml.indexOf('id="drawImageStampButton"'),
  "mobile drawing primary CTA should lead secondary actions in DOM and visual order",
);
assert.equal(
  cssBlocks(responsiveCss, "#drawUsePatternButton").some((block) => /order:/.test(block)),
  false,
  "mobile drawing action order should follow the DOM instead of CSS order overrides",
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

for (const text of [
  "选择图纸，开始摆豆和熨烫。",
  "绘制、导入和整理自己的图纸。",
  "浏览已审核图纸，也可以投稿给我审核。",
  "查看已经保存的完成品。",
  "留言板和更新板，一起把工坊做得更好。",
]) {
  assert.equal(indexHtml.includes(text), false, `home page should not use explanatory copy: ${text}`);
}

for (const text of [
  "今天想做什么？",
  "从图纸开始拼豆。",
  "创建和编辑图纸。",
  "浏览公开图纸。",
  "查看已保存作品。",
  "查看留言与更新。",
  "今日精选",
  "摆这个",
]) {
  assert.ok(indexHtml.includes(text), `home page should include concise functional copy: ${text}`);
}

// ── 图纸库 reshape (2026-06-27): tray cards, footer action row, primary CTA ──
const componentsCss = cssFiles["components.css"];

assert.ok(
  /\.library-card-actions\s*\{[^}]*display:\s*flex/.test(componentsCss),
  "library card must have a footer action row (.library-card-actions)",
);
assert.equal(
  /\.library-card-controls\b/.test(componentsCss),
  false,
  "library card must not keep the over-art controls overlay (.library-card-controls)",
);
assert.ok(
  /\.library-add-code\s*\{[^}]*var\(--brand-cta\)[^}]*\}/.test(componentsCss) &&
    /\.library-add-code\s*\{[^}]*var\(--sketch-shadow\)/.test(componentsCss),
  "导入分享码 must be a promoted primary CTA — flat brand fill + sketch sticker shadow (.library-add-code)",
);
assert.equal(
  componentsCss.includes("#cbd1dc"),
  false,
  "workflow step dot must use a theme token, not hardcoded #cbd1dc",
);

console.log("UI quality regression checks passed.");
