import assert from "node:assert/strict";
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { createReadStream, existsSync } from "node:fs";
import { extname, join, normalize, resolve } from "node:path";
import { chromium } from "playwright";

const root = resolve(new URL("..", import.meta.url).pathname);
const renderSource = await readFile(new URL("../src/render.js", import.meta.url), "utf8");
const responsiveCss = await readFile(new URL("../src/styles/responsive.css", import.meta.url), "utf8");
const tokensCss = await readFile(new URL("../src/styles/tokens.css", import.meta.url), "utf8");
const constantsSource = await readFile(new URL("../src/constants.js", import.meta.url), "utf8");

function assertRenderUsesUnifiedBoardTransform() {
  assert.match(renderSource, /function withBoardViewTransform\(/, "render.js should define one shared board-view transform helper");
  assert.match(renderSource, /withBoardViewTransform\(layout, \(\) => \{\s*drawBoard\(layout\);/s, "board-bound layers should be drawn inside the shared transform scope");
  assert.match(renderSource, /if \(state\.phase === "iron"\) drawIronLayer\(layout\);/s, "iron heat layer should be inside the shared transform scope");
}

function assertHeatModelIsUnified() {
  assert.match(constantsSource, /export const HEAT_LEVELS = Object\.freeze/, "heat thresholds should live in constants.js as HEAT_LEVELS");
  assert.match(renderSource, /HEAT_LEVELS/, "render.js should consume HEAT_LEVELS instead of scattering heat thresholds");
  assert.match(renderSource, /function averageHeatUnderIron\(/, "render.js should compute the average heat under the iron footprint");
  assert.match(renderSource, /function ironColorForHeat\(/, "render.js should map average heat to the iron body color");
  assert.match(renderSource, /function boardLocalPointFromCanvasPoint\(/, "render.js should convert canvas pointer coordinates into board-local draw coordinates");
  assert.match(renderSource, /const ironPoint = boardLocalPointFromCanvasPoint\(layout, state\.ironPos\);/, "drawIronLayer should draw the iron in the same transformed board coordinate space as the beads");
  assert.match(renderSource, /drawIron\(ironPoint\.x, ironPoint\.y, ironColorForHeat\(averageHeatUnderIron\(layout, ironPoint\)\)\)/, "drawIronLayer should color the iron from the average heat underneath it");
  assert.doesNotMatch(renderSource, /stats\.over > 0 \? "#e7645f" : "#4d77b8"/, "iron color should not be based on whole-board overheat state");
  assert.doesNotMatch(renderSource, /heat > 124 \?/, "iron overlay color should not hard-code the scorched threshold inline");
  assert.doesNotMatch(renderSource, /heat >= 52 && heat <= 96/, "heatStats should not hard-code ideal heat range inline");
}

function assertMobileCssDefinesLayoutContract() {
  // The board-size budget now lives in tokens.css inside :root @media redefines.
  // It must NOT be declared bare in responsive.css's at-rule body (invalid scope).
  assert.match(tokensCss, /--mobile-board-size:/, "tokens.css should define the single board-size budget owner");
  assert.doesNotMatch(
    responsiveCss,
    /@media[^{]*\{\s*(?:\/\*[\s\S]*?\*\/\s*)*--mobile-board-size\s*:/,
    "--mobile-board-size must not be declared bare inside an @media body (invalid, dropped by the parser)",
  );
  assert.match(responsiveCss, /\.bead-studio-grid\[data-phase="iron"\] \.left-panel[\s\S]*display:\s*none/, "iron stage should not leave an empty left-panel shell on phones");
  assert.match(responsiveCss, /\.start-screen[\s\S]*overflow-y:\s*auto/, "mobile home should allow vertical recovery instead of hard clipping content");
}

const mime = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".mp3": "audio/mpeg",
  ".json": "application/json; charset=utf-8",
};

async function startServer() {
  const server = createServer((req, res) => {
    const url = new URL(req.url || "/", "http://127.0.0.1");
    const pathname = decodeURIComponent(url.pathname === "/" ? "/index.html" : url.pathname);
    const filePath = normalize(join(root, pathname));
    if (!filePath.startsWith(root) || !existsSync(filePath)) {
      res.writeHead(404);
      res.end("not found");
      return;
    }
    res.writeHead(200, { "content-type": mime[extname(filePath)] || "application/octet-stream" });
    createReadStream(filePath).pipe(res);
  });
  await new Promise((resolveListen) => server.listen(0, "127.0.0.1", resolveListen));
  const { port } = server.address();
  return { server, url: `http://127.0.0.1:${port}/` };
}

const berryCatRows = [
  "........................",
  "........................",
  ".......K........K.......",
  "......KWK......KWK......",
  ".....KWWWK....KWWWK.....",
  "....KWWWWWK..KWWWWWK....",
  ".....KKKKKKKKKKKKKK.....",
  "....KWWWWWWWWWWWWWWK....",
  "....KWWWWWWWWWWWWWWK....",
  "....KWWRRWWWWWWWWWWK....",
  "....KWWWWWWWWWWWWWWK....",
  "....KWWWWWWWWWWWWWWK....",
  "....KWWWKKWWWWKKWWWK....",
  "....KWWWKKWWWWKKWWWK....",
  "....KWWWKKWWWWKKWWWK....",
  "....KWppWWWPPWWWppWK....",
  "....KWppWWpWWpWWppWK....",
  "....KWWWWWWWWWWWWWWK....",
  "....KWWWWWWWWWWWWWWK....",
  "....KWWWWWWWWWWWWWWK....",
  ".....KKKKKKKKKKKKKK.....",
  "........................",
  "........................",
  "........................",
];

function ironSession() {
  const placed = [];
  const heat = [];
  for (let y = 0; y < 24; y += 1) {
    for (let x = 0; x < 24; x += 1) {
      const code = berryCatRows[y][x];
      placed.push(code === "." ? null : code);
      heat.push(code === "." ? 0 : 70);
    }
  }
  return {
    version: 2,
    phase: "iron",
    selectedPatternId: "berry-cat",
    patternSize: 24,
    boardWidth: 24,
    boardHeight: 24,
    placed,
    heat,
    tool: "needle",
    selectedColor: "K",
    sandboxMode: true,
    trayMatrix: [],
    errors: [],
    warp: 18,
    cooling: 0,
    boardView: { scale: 1.6, panX: 72, panY: -48 },
  };
}

function sessionForPhase(phase) {
  const placed = [];
  const heat = [];
  for (let y = 0; y < 24; y += 1) {
    for (let x = 0; x < 24; x += 1) {
      const code = berryCatRows[y][x];
      placed.push(code === "." ? null : code);
      heat.push(code === "." ? 0 : 70);
    }
  }
  return {
    version: 2,
    phase,
    selectedPatternId: "berry-cat",
    patternSize: 24,
    boardWidth: 24,
    boardHeight: 24,
    placed,
    heat,
    tool: "needle",
    selectedColor: "K",
    sandboxMode: true,
    trayMatrix: [],
    errors: [],
    warp: 18,
    cooling: 0,
    boardView: { scale: 1.3, panX: 0, panY: 0 },
  };
}

async function assertHomeShowcaseReachable(baseUrl) {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 320, height: 568 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
  try {
    await page.goto(baseUrl, { waitUntil: "networkidle" });
    const result = await page.evaluate(() => {
      const screen = document.querySelector(".start-screen");
      const showcase = document.querySelector(".start-showcase");
      const screenRect = screen.getBoundingClientRect();
      const showcaseRect = showcase.getBoundingClientRect();
      const style = getComputedStyle(screen);
      const canScroll = ["auto", "scroll"].includes(style.overflowY) && screen.scrollHeight > screen.clientHeight;
      if (canScroll) {
        screen.scrollTop = screen.scrollHeight;
      }
      const after = showcase.getBoundingClientRect();
      return {
        overflowY: style.overflowY,
        canScroll,
        screenBottom: screenRect.bottom,
        showcaseBottom: showcaseRect.bottom,
        afterBottom: after.bottom,
        viewportHeight: window.innerHeight,
      };
    });
    assert.ok(
      result.afterBottom <= result.viewportHeight + 1,
      `home showcase must be fully reachable at 320x568; got ${JSON.stringify(result)}`,
    );
  } finally {
    await browser.close();
  }
}

async function assertMobilePhasePanelsAndControls(baseUrl) {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
  const pageErrors = [];
  page.on("pageerror", (error) => pageErrors.push(error.message));
  try {
    await page.addInitScript((session) => localStorage.setItem("beadWorkshopSession.v1", JSON.stringify(session)), sessionForPhase("place"));
    await page.goto(baseUrl, { waitUntil: "networkidle" });
    await page.click("#startResumeBtn");
    await page.waitForTimeout(250);

    async function snapshot(label) {
      return page.evaluate((snapshotLabel) => {
        const grid = document.querySelector(".bead-studio-grid");
        const workbench = document.querySelector(".bead-studio-grid .workbench");
        const controls = document.querySelector("#stageControls");
        const leftPanel = document.querySelector(".bead-studio-grid .left-panel");
        const rightPanel = document.querySelector(".bead-studio-grid .right-panel");

        function boxState(node) {
          const rect = node.getBoundingClientRect();
          const style = getComputedStyle(node);
          return {
            display: style.display,
            visibility: style.visibility,
            pointerEvents: style.pointerEvents,
            width: rect.width,
            height: rect.height,
          };
        }

        function isCollapsed(state) {
          return state.display === "none" || state.visibility === "hidden" || state.height <= 1 || state.width <= 1;
        }

        function isVisibleHitTarget(node) {
          const rect = node.getBoundingClientRect();
          const style = getComputedStyle(node);
          if (style.display === "none" || style.visibility === "hidden" || style.pointerEvents === "none" || rect.width < 44 || rect.height < 44) {
            return false;
          }
          const x = rect.left + rect.width / 2;
          const y = rect.top + rect.height / 2;
          const top = document.elementFromPoint(x, y);
          return top === node || node.contains(top);
        }

        const left = boxState(leftPanel);
        const right = boxState(rightPanel);
        const buttons = [...controls.querySelectorAll("button")].map((button) => ({
          text: button.textContent.trim(),
          hitTarget: isVisibleHitTarget(button),
        }));
        return {
          label: snapshotLabel,
          phase: grid?.dataset.phase,
          mobileControls: grid?.dataset.mobileControls,
          controlsParentClass: controls?.parentElement?.className || "",
          controlsAfterWorkbench: controls?.previousElementSibling === workbench,
          left,
          right,
          leftCollapsed: isCollapsed(left),
          rightCollapsed: isCollapsed(right),
          buttons,
        };
      }, label);
    }

    let result = await snapshot("place");
    assert.equal(result.phase, "place", JSON.stringify(result));
    assert.equal(result.mobileControls, "detached", JSON.stringify(result));
    assert.equal(result.controlsAfterWorkbench, true, JSON.stringify(result));
    assert.equal(result.leftCollapsed, true, `place should not leave the detached left-panel shell below the bean box: ${JSON.stringify(result)}`);
    assert.equal(result.rightCollapsed, false, `place should keep the bean box visible: ${JSON.stringify(result)}`);
    assert.ok(result.buttons.some((button) => button.text.includes("检查作品") && button.hitTarget), `place controls must be clickable: ${JSON.stringify(result)}`);

    await page.getByRole("button", { name: "检查作品" }).click();
    await page.waitForTimeout(150);
    result = await snapshot("inspect");
    assert.equal(result.phase, "inspect", JSON.stringify(result));
    assert.equal(result.leftCollapsed, true, `inspect should not leave an empty side shell: ${JSON.stringify(result)}`);
    assert.equal(result.rightCollapsed, true, `inspect should not keep the bean box in the action stack: ${JSON.stringify(result)}`);
    assert.ok(result.buttons.some((button) => button.text.includes("返回修正") && button.hitTarget), `inspect back control must be clickable: ${JSON.stringify(result)}`);

    await page.getByRole("button", { name: "返回修正" }).click();
    await page.waitForTimeout(150);
    result = await snapshot("place-after-back");
    assert.equal(result.phase, "place", JSON.stringify(result));
    assert.equal(result.rightCollapsed, false, `returning to place should restore the bean box: ${JSON.stringify(result)}`);
    assert.ok(result.buttons.some((button) => button.text.includes("检查作品") && button.hitTarget), `place controls should stay clickable after returning: ${JSON.stringify(result)}`);

    await page.getByRole("button", { name: "检查作品" }).click();
    await page.waitForTimeout(100);
    await page.getByRole("button", { name: "盖纸熨烫" }).click();
    await page.waitForTimeout(180);
    result = await snapshot("iron");
    assert.equal(result.phase, "iron", JSON.stringify(result));
    assert.equal(result.leftCollapsed, true, `iron should not leave an empty side shell: ${JSON.stringify(result)}`);
    assert.equal(result.rightCollapsed, true, `iron should not show the bean box: ${JSON.stringify(result)}`);
    assert.ok(result.buttons.some((button) => button.text.includes("进入冷却") && button.hitTarget), `iron controls must be clickable: ${JSON.stringify(result)}`);
    assert.deepEqual(pageErrors, [], `mobile phase controls should not throw runtime errors: ${pageErrors.join(" | ")}`);
  } finally {
    await browser.close();
  }
}

async function assertIronHasNoEmptyMobilePanel(baseUrl) {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
  const pageErrors = [];
  page.on("pageerror", (error) => pageErrors.push(error.message));
  try {
    await page.addInitScript((session) => localStorage.setItem("beadWorkshopSession.v1", JSON.stringify(session)), ironSession());
    await page.goto(baseUrl, { waitUntil: "networkidle" });
    await page.click("#startResumeBtn");
    await page.waitForTimeout(250);
    const canvasBox = await page.locator("#sceneCanvas").boundingBox();
    await page.mouse.move(canvasBox.x + canvasBox.width * 0.5, canvasBox.y + canvasBox.height * 0.5);
    await page.mouse.down();
    await page.mouse.move(canvasBox.x + canvasBox.width * 0.55, canvasBox.y + canvasBox.height * 0.52);
    await page.mouse.up();
    await page.waitForTimeout(120);
    const result = await page.evaluate(() => {
      const grid = document.querySelector(".bead-studio-grid");
      const panel = document.querySelector(".bead-studio-grid .left-panel");
      const rect = panel.getBoundingClientRect();
      const style = getComputedStyle(panel);
      const canvas = document.querySelector("#sceneCanvas");
      const ctx = canvas.getContext("2d");
      const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
      let painted = 0;
      for (let i = 3; i < pixels.length; i += 4) {
        if (pixels[i] > 0) painted += 1;
      }
      return {
        phase: grid?.dataset.phase,
        display: style.display,
        visibility: style.visibility,
        height: rect.height,
        width: rect.width,
        canvasWidth: canvas.width,
        canvasHeight: canvas.height,
        painted,
      };
    });
    assert.deepEqual(pageErrors, [], `iron page should render without runtime errors: ${pageErrors.join(" | ")}`);
    assert.equal(result.phase, "iron");
    assert.ok(result.canvasWidth > 1 && result.canvasHeight > 1 && result.painted > 1000, `iron canvas should be painted; got ${JSON.stringify(result)}`);
    assert.ok(
      result.display === "none" || result.height <= 1 || result.visibility === "hidden",
      `iron mobile must not leave an empty left panel; got ${JSON.stringify(result)}`,
    );
  } finally {
    await browser.close();
  }
}

assertRenderUsesUnifiedBoardTransform();
assertHeatModelIsUnified();
assertMobileCssDefinesLayoutContract();
const { server, url } = await startServer();
try {
  await assertHomeShowcaseReachable(url);
  await assertMobilePhasePanelsAndControls(url);
  await assertIronHasNoEmptyMobilePanel(url);
} finally {
  await new Promise((resolveClose) => server.close(resolveClose));
}
console.log("Mobile unification regression checks passed.");
