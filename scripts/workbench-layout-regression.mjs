import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { createReadStream, existsSync } from 'node:fs';
import { extname, join, normalize, resolve } from 'node:path';
import { chromium } from 'playwright';

const root = resolve(new URL('..', import.meta.url).pathname);
const mime = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.mp3': 'audio/mpeg',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
};

const server = createServer((req, res) => {
  const requestUrl = new URL(req.url || '/', 'http://127.0.0.1');
  const pathname = decodeURIComponent(requestUrl.pathname === '/' ? '/index.html' : requestUrl.pathname);
  const filePath = normalize(join(root, pathname));
  if (!filePath.startsWith(root) || !existsSync(filePath)) {
    res.writeHead(404);
    res.end('Not found');
    return;
  }
  res.writeHead(200, { 'content-type': mime[extname(filePath)] || 'application/octet-stream' });
  createReadStream(filePath).pipe(res);
});

await new Promise((resolveListen) => server.listen(0, '127.0.0.1', resolveListen));
const url = `http://127.0.0.1:${server.address().port}/`;
const browser = await chromium.launch({ headless: true });

function paneMetrics() {
  const rect = (selector) => {
    const bounds = document.querySelector(selector).getBoundingClientRect();
    return {
      bottom: bounds.bottom,
      height: bounds.height,
      left: bounds.left,
      top: bounds.top,
      width: bounds.width,
    };
  };
  const grid = rect('.bead-studio-grid');
  const left = rect('.bead-studio-grid > .left-panel');
  const center = rect('.bead-studio-grid > .workbench');
  const right = rect('.bead-studio-grid > .right-panel');
  const topbar = rect('.bead-topbar');
  const trackTotal = left.width + center.width + right.width;
  return {
    center,
    documentScrollHeight: document.documentElement.scrollHeight,
    grid,
    horizontalOverflow: document.documentElement.scrollWidth > innerWidth + 1,
    left,
    right,
    shares: [left.width / trackTotal, center.width / trackTotal, right.width / trackTotal],
    topGap: grid.top - topbar.bottom,
    viewportHeight: innerHeight,
  };
}

async function openBead(viewport) {
  const page = await browser.newPage({ viewport });
  await page.goto(url, { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('#startBeadButton');
  await page.evaluate(() => document.querySelector('#startBeadButton').click());
  await page.waitForSelector('#patternList .library-card-open');
  await page.evaluate(() => document.querySelector('#patternList .library-card-open').click());
  await page.waitForFunction(() => document.querySelector('.bead-studio-grid')?.dataset.phase === 'place');
  return page;
}

async function inspectBead(viewport) {
  const page = await openBead(viewport);
  try {
    return await page.evaluate(paneMetrics);
  } finally {
    await page.close();
  }
}

async function inspectDrawing(viewport) {
  const page = await browser.newPage({ viewport });
  try {
    await page.goto(url, { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('#startDrawButton');
    await page.evaluate(() => document.querySelector('#startDrawButton').click());
    await page.waitForSelector('.drawing-studio-grid');
    return await page.evaluate(() => {
      const box = (selector) => {
        const bounds = document.querySelector(selector).getBoundingClientRect();
        return { height: bounds.height, left: bounds.left, top: bounds.top, width: bounds.width };
      };
      return {
        center: box('.drawing-studio-grid > .workbench'),
        documentScrollHeight: document.documentElement.scrollHeight,
        grid: box('.drawing-studio-grid'),
        horizontalOverflow: document.documentElement.scrollWidth > innerWidth + 1,
        left: box('.drawing-studio-grid > .left-panel'),
        right: box('.drawing-studio-grid > .right-panel'),
        viewportHeight: innerHeight,
      };
    });
  } finally {
    await page.close();
  }
}

try {
  for (const width of [861, 1007]) {
    const bead = await inspectBead({ width, height: 900 });
    assert.ok(bead.center.width >= 540, `compact bead workbench must preserve a 540px stage at ${width}px: ${JSON.stringify(bead)}`);
    assert.ok(Math.abs(bead.left.left - bead.right.left) <= 1, `compact bead panes must share one rail at ${width}px: ${JSON.stringify(bead)}`);
    assert.ok(bead.right.top > bead.left.top, `compact bead panes must stack at ${width}px: ${JSON.stringify(bead)}`);
    assert.equal(bead.horizontalOverflow, false, `compact bead layout must not overflow at ${width}px`);

    const drawing = await inspectDrawing({ width, height: 900 });
    assert.ok(drawing.center.width >= 540, `compact drawing workbench must preserve a 540px stage at ${width}px: ${JSON.stringify(drawing)}`);
    assert.ok(Math.abs(drawing.left.left - drawing.right.left) <= 1, `compact drawing panes must share one rail at ${width}px: ${JSON.stringify(drawing)}`);
    assert.ok(drawing.right.top > drawing.left.top, `compact drawing panes must stack at ${width}px: ${JSON.stringify(drawing)}`);
    assert.equal(drawing.horizontalOverflow, false, `compact drawing layout must not overflow at ${width}px`);
  }

  const fullEdge = await inspectBead({ width: 1008, height: 900 });
  assert.ok(fullEdge.left.width >= 196, `full left pane must meet its floor: ${JSON.stringify(fullEdge)}`);
  assert.ok(fullEdge.center.width >= 540, `full workbench must meet its floor: ${JSON.stringify(fullEdge)}`);
  assert.ok(fullEdge.right.width >= 204, `full right pane must meet its floor: ${JSON.stringify(fullEdge)}`);
  assert.ok(fullEdge.left.left < fullEdge.center.left && fullEdge.center.left < fullEdge.right.left, `1008px must use the full three-column topology: ${JSON.stringify(fullEdge)}`);

  const medium = await inspectBead({ width: 1440, height: 900 });
  const large = await inspectBead({ width: 1600, height: 1000 });
  medium.shares.forEach((share, index) => {
    assert.ok(Math.abs(share - large.shares[index]) <= 0.02, `full track ${index} share must remain stable: medium=${medium.shares} large=${large.shares}`);
  });
  assert.ok(large.grid.height - medium.grid.height >= 80, `workbench height must grow without the retired 780px cap: medium=${medium.grid.height} large=${large.grid.height}`);
  assert.ok(Math.abs(medium.topGap - 16) <= 1, `bead workbench must preserve the authored 16px top gap: ${JSON.stringify(medium)}`);

  const zoomedBead = await inspectBead({ width: 640, height: 360 });
  assert.ok(zoomedBead.center.height >= 320, `200% bead proxy must retain a 320px canvas module: ${JSON.stringify(zoomedBead)}`);
  assert.ok(zoomedBead.documentScrollHeight > zoomedBead.viewportHeight, `200% bead proxy must provide vertical scroll escape: ${JSON.stringify(zoomedBead)}`);
  assert.equal(zoomedBead.horizontalOverflow, false, '200% bead proxy must not overflow horizontally');

  const zoomedDrawing = await inspectDrawing({ width: 640, height: 360 });
  assert.ok(zoomedDrawing.center.height >= 320, `200% drawing proxy must retain a 320px canvas module: ${JSON.stringify(zoomedDrawing)}`);
  assert.ok(zoomedDrawing.documentScrollHeight > zoomedDrawing.viewportHeight, `200% drawing proxy must provide vertical scroll escape: ${JSON.stringify(zoomedDrawing)}`);
  assert.equal(zoomedDrawing.horizontalOverflow, false, '200% drawing proxy must not overflow horizontally');
} finally {
  await browser.close();
  await new Promise((resolveClose) => server.close(resolveClose));
}

console.log('workbench-layout-regression: adaptive topology, stable shares, height growth, and 200% reflow passed');
