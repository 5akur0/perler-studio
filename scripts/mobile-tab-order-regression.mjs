// Mobile keyboard/Tab order regression.
//
// CSS `order` changes only the visual order, not the DOM / Tab / screen-reader
// order. This test drives the real app on a phone viewport into the placing phase
// and verifies the focus order matches the visual order: board → actions → bean box.
// It is the guard that the #stageControls slot move (mountActionControls) keeps DOM
// order aligned with the layout.

import assert from "node:assert/strict";
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join, normalize } from "node:path";
import { chromium } from "playwright";

const root = new URL("..", import.meta.url).pathname;
const mime = { ".html":"text/html",".js":"text/javascript",".css":"text/css",".svg":"image/svg+xml",".webp":"image/webp",".json":"application/json",".mp3":"audio/mpeg",".png":"image/png" };
const server = createServer(async (req, res) => {
  try {
    let p = decodeURIComponent((req.url || "/").split("?")[0]);
    if (p === "/") p = "/index.html";
    const fp = join(root, normalize(p).replace(/^(\.\.[/\\])+/, ""));
    const body = await readFile(fp);
    res.writeHead(200, { "content-type": mime[extname(fp)] || "application/octet-stream" });
    res.end(body);
  } catch { res.writeHead(404); res.end("nf"); }
});
await new Promise((r) => server.listen(0, r));
const url = `http://127.0.0.1:${server.address().port}/`;

const browser = await chromium.launch({ headless: true });
let failed = 0;

async function run(viewport, label) {
  const page = await browser.newPage({ viewport, isMobile: true, hasTouch: true });
  const errs = [];
  page.on("pageerror", (e) => errs.push(e.message));
  try {
    await page.goto(url, { waitUntil: "networkidle" });
    await page.click("#startBeadButton");
    await page.waitForSelector("#patternList .pattern-card", { timeout: 8000 });
    await page.click("#patternList .pattern-card");
    await page.evaluate(() => {
      const b = [document.querySelector("#mobileSelectionStartButton"), document.querySelector("#chooseStartButton")].find((x) => x && x.offsetParent !== null);
      if (b) b.click();
    });
    await page.waitForFunction(() => document.querySelector(".bead-studio-grid")?.dataset.phase === "place", { timeout: 8000 });
    await page.waitForTimeout(250);

    // DOM composition: #stageControls must sit after the board and before the bean box.
    const domOrder = await page.evaluate(() => {
      const board = document.querySelector("#sceneCanvas");
      const sc = document.querySelector("#stageControls");
      const beanBox = document.querySelector(".bead-studio-grid .right-panel");
      const POS = Node.DOCUMENT_POSITION_FOLLOWING;
      return {
        scParentId: sc?.parentElement?.id || "",
        boardBeforeActions: !!(board.compareDocumentPosition(sc) & POS),
        actionsBeforeBeanBox: !!(sc.compareDocumentPosition(beanBox) & POS),
      };
    });
    assert.equal(domOrder.scParentId, "mobileActionHost", `${label}: #stageControls must be mounted in #mobileActionHost on phones`);
    assert.ok(domOrder.boardBeforeActions, `${label}: board must precede actions in the DOM`);
    assert.ok(domOrder.actionsBeforeBeanBox, `${label}: actions must precede bean box in the DOM`);

    // Live Tab order: focus the board, then Tab forward and classify each stop.
    await page.evaluate(() => document.querySelector("#sceneCanvas").focus());
    const regionOf = `(el) => {
      if (!el) return "none";
      if (el.id === "sceneCanvas") return "board";
      if (el.closest("#stageControls")) return "actions";
      if (el.closest("#colorPalette")) return "beanbox";
      return "other";
    }`;
    const seq = [];
    seq.push(await page.evaluate(`(${regionOf})(document.activeElement)`));
    for (let i = 0; i < 40; i += 1) {
      await page.keyboard.press("Tab");
      const region = await page.evaluate(`(${regionOf})(document.activeElement)`);
      seq.push(region);
      if (region === "beanbox" && seq.includes("actions")) break;
    }
    const firstBoard = seq.indexOf("board");
    const firstActions = seq.indexOf("actions");
    const firstBeanBox = seq.indexOf("beanbox");
    assert.ok(firstBoard === 0, `${label}: board should be the focus start (seq=${seq.join(">")})`);
    assert.ok(firstActions > -1, `${label}: actions must be reachable by Tab (seq=${seq.join(">")})`);
    assert.ok(firstBeanBox > -1, `${label}: bean box must be reachable by Tab (seq=${seq.join(">")})`);
    assert.ok(firstBoard < firstActions && firstActions < firstBeanBox, `${label}: Tab order must be board → actions → bean box (seq=${seq.join(">")})`);
    assert.equal(errs.length, 0, `${label}: no page errors (${errs.join(";")})`);
    console.log(`  ✓ ${label}: Tab order board → actions → bean box (${seq.slice(0, firstBeanBox + 1).join(" → ")})`);
  } catch (err) {
    failed += 1;
    console.error(`  ✗ ${label}: ${err.message}`);
  } finally {
    await page.close();
  }
}

await run({ width: 390, height: 844 }, "iPhone 390x844");
await run({ width: 360, height: 640 }, "small 360x640");

await browser.close();
await new Promise((r) => server.close(r));

if (failed > 0) {
  console.error(`\nmobile-tab-order-regression: ${failed} viewport(s) failed`);
  process.exit(1);
}
console.log("\nmobile-tab-order-regression: keyboard order matches visual order on all viewports");
