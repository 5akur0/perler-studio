import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import { chromium } from 'playwright';

const root = new URL('..', import.meta.url).pathname;
const mime = {
  '.css': 'text/css',
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.mp3': 'audio/mpeg',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
};
const server = createServer(async (req, res) => {
  try {
    let path = decodeURIComponent((req.url || '/').split('?')[0]);
    if (path === '/') path = '/index.html';
    const filePath = join(root, normalize(path).replace(/^(\.\.[/\\])+/, ''));
    const body = await readFile(filePath);
    res.writeHead(200, { 'content-type': mime[extname(filePath)] || 'application/octet-stream' });
    res.end(body);
  } catch {
    res.writeHead(404);
    res.end('Not found');
  }
});

await new Promise((resolve) => server.listen(0, resolve));
const url = `http://127.0.0.1:${server.address().port}/`;
const browser = await chromium.launch({ headless: true });

async function inspect(viewport) {
  const page = await browser.newPage({ viewport });
  await page.goto(url, { waitUntil: 'networkidle' });
  const result = await page.evaluate(() => {
    const screen = document.querySelector('.start-screen');
    const targets = [...document.querySelectorAll('.start-row, .start-showcase')];
    const rects = targets.map((target) => {
      const rect = target.getBoundingClientRect();
      return { left: rect.left, right: rect.right, height: rect.height };
    });
    return {
      innerWidth,
      pageScrollWidth: document.documentElement.scrollWidth,
      screenClientHeight: screen.clientHeight,
      screenScrollHeight: screen.scrollHeight,
      screenOverflowY: getComputedStyle(screen).overflowY,
      rects,
    };
  });
  await page.close();
  return result;
}

try {
  const portrait = await inspect({ width: 390, height: 844 });
  assert.ok(portrait.pageScrollWidth <= portrait.innerWidth, 'portrait home must not overflow horizontally');
  assert.ok(portrait.rects.every((rect) => rect.left >= 0 && rect.right <= portrait.innerWidth), 'portrait cards stay inside the viewport');

  // A 1280x720 desktop window at 200% zoom exposes roughly a 640x360 CSS viewport.
  const zoomed = await inspect({ width: 640, height: 360 });
  assert.ok(zoomed.pageScrollWidth <= zoomed.innerWidth, '200% reflow must not overflow horizontally');
  assert.match(zoomed.screenOverflowY, /auto|scroll/, '200% reflow must provide a vertical scroll escape');
  assert.ok(zoomed.screenScrollHeight > zoomed.screenClientHeight, '200% reflow should preserve content height instead of shrinking it away');
  assert.ok(zoomed.rects.every((rect) => rect.left >= 0 && rect.right <= zoomed.innerWidth), 'reflowed cards stay inside the viewport');
  assert.ok(zoomed.rects.slice(0, 5).every((rect) => rect.height >= 44), 'reflowed home destinations preserve touch-size height');
} finally {
  await browser.close();
  await new Promise((resolve) => server.close(resolve));
}

console.log('home-reflow-regression: portrait and 200% reflow checks passed');
