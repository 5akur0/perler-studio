import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { createReadStream, existsSync } from 'node:fs';
import { extname, join, normalize, resolve } from 'node:path';
import { chromium } from 'playwright';

const root = resolve(new URL('..', import.meta.url).pathname);
const mime = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.mp3': 'audio/mpeg',
};

const server = createServer((req, res) => {
  const url = new URL(req.url || '/', 'http://127.0.0.1');
  const pathname = decodeURIComponent(url.pathname === '/' ? '/index.html' : url.pathname);
  const filePath = normalize(join(root, pathname));
  if (!filePath.startsWith(root) || !existsSync(filePath)) {
    res.writeHead(404);
    res.end('not found');
    return;
  }
  res.writeHead(200, { 'content-type': mime[extname(filePath)] || 'application/octet-stream' });
  createReadStream(filePath).pipe(res);
});

await new Promise((resolveListen) => server.listen(0, '127.0.0.1', resolveListen));
const { port } = server.address();
const browser = await chromium.launch({ headless: true });

try {
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    hasTouch: true,
    isMobile: true,
  });
  const page = await context.newPage();
  await page.goto(`http://127.0.0.1:${port}/`);

  await page.click('#startDrawButton');
  const paletteSearchSize = await page.$eval('#drawPaletteSearch', (el) => parseFloat(getComputedStyle(el).fontSize));
  await page.click('#drawImportButton');
  const drawCodeSize = await page.$eval('#drawCodeInput', (el) => parseFloat(getComputedStyle(el).fontSize));

  await page.goto(`http://127.0.0.1:${port}/`);
  await page.click('#startGalleryButton');
  await page.click('#gallerySubmitButton');
  const galleryCodeSize = await page.$eval('#gallerySubmitCode', (el) => parseFloat(getComputedStyle(el).fontSize));

  assert.ok(paletteSearchSize >= 16, `draw palette search must be at least 16px; got ${paletteSearchSize}px`);
  assert.ok(drawCodeSize >= 16, `draw code input must be at least 16px; got ${drawCodeSize}px`);
  assert.ok(galleryCodeSize >= 16, `gallery code input must be at least 16px; got ${galleryCodeSize}px`);

  await context.close();
  console.log('Input font regression checks passed.');
} finally {
  await browser.close();
  await new Promise((resolveClose) => server.close(resolveClose));
}
