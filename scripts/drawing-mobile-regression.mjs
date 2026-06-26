import assert from "node:assert/strict";
import { createServer } from "node:http";
import { createReadStream, existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { extname, join, normalize, resolve } from "node:path";
import { chromium } from "playwright";

const root = resolve(new URL("..", import.meta.url).pathname);
const drawSource = await readFile(new URL("../src/draw.js", import.meta.url), "utf8");

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
  return { server, url: `http://127.0.0.1:${server.address().port}/` };
}

async function drawingMobileMetrics(baseUrl, viewport) {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
  try {
    await page.goto(baseUrl, { waitUntil: "networkidle" });
    await page.click("#startDrawButton");
    await page.waitForTimeout(180);
    return await page.evaluate(() => {
      const rect = (selector) => {
        const r = document.querySelector(selector).getBoundingClientRect();
        return { top: r.top, bottom: r.bottom, width: r.width, height: r.height };
      };
      const grid = rect(".drawing-studio-grid");
      const panel = rect(".drawing-canvas-panel");
      const wrap = rect(".drawing-canvas-wrap");
      const footer = rect(".drawing-footer-actions");
      return {
        grid,
        panel,
        wrap,
        footer,
        bottomSlack: grid.bottom - footer.bottom,
      };
    });
  } finally {
    await browser.close();
  }
}

const { server, url } = await startServer();
try {
  assert.match(
    drawSource,
    /const long = cell \* 3;[\s\S]*const short = cell \* 1\.1;[\s\S]*const tabOverlap = cell \* 0\.22;/,
    "drawing add-board buttons must stay proportional to one grid cell",
  );
  assert.match(
    drawSource,
    /const pegR = cell \* 0\.138;/,
    "drawing board peg nubs must stay proportional to one grid cell",
  );
  assert.doesNotMatch(
    drawSource,
    /const pegR = Math\.max\(0\.6, cell \* 0\.138\)/,
    "drawing pegs must not use a fixed minimum that becomes oversized on multi-board layouts",
  );

  const tall = await drawingMobileMetrics(url, { width: 430, height: 932 });
  assert.ok(
    tall.bottomSlack <= 16,
    `mobile drawing controls should sit at the bottom, not leave empty space: ${JSON.stringify(tall)}`,
  );
  assert.ok(
    tall.panel.height >= tall.grid.height * 0.58,
    `mobile drawing canvas panel should grow with available height: ${JSON.stringify(tall)}`,
  );

  const short = await drawingMobileMetrics(url, { width: 375, height: 667 });
  assert.ok(
    tall.panel.height - short.panel.height >= 120,
    `canvas panel height should respond to taller phones: tall=${JSON.stringify(tall)} short=${JSON.stringify(short)}`,
  );
} finally {
  server.close();
}

console.log("Mobile drawing layout checks passed.");
