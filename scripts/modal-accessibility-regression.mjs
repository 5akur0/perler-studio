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
const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
const errors = [];
page.on('pageerror', (error) => errors.push(error.message));

await page.addInitScript(() => {
  const entry = {
    id: 'viewer-regression',
    name: '测试作品',
    craft: '钥匙扣',
    grade: 'A',
    date: '07/16',
    size: 30,
    width: 30,
    height: 30,
    buildMs: 1200,
    placed: Array(900).fill(null),
  };
  localStorage.setItem('beadWorkshopCollection.v1', JSON.stringify([entry]));
});

try {
  await page.goto(url, { waitUntil: 'networkidle' });
  assert.equal(
    await page.locator('#drawCodeInput').evaluate((input) => input.labels?.[0]?.textContent?.trim()),
    '要导入的分享码',
    'share-code textarea must have a persistent programmatic label',
  );

  await page.click('#collectionButton');
  const trigger = page.locator('.collection-tile-body');
  await trigger.waitFor({ state: 'visible' });
  await trigger.focus();
  await trigger.click();

  const dialog = page.locator('.collection-enlarged.show');
  await dialog.waitFor({ state: 'visible' });
  assert.equal(await dialog.getAttribute('role'), 'dialog');
  assert.equal(await dialog.getAttribute('aria-modal'), 'true');
  assert.equal(await dialog.getAttribute('aria-hidden'), 'false');
  assert.equal(await page.locator('#collectionEnlargedTitle').innerText(), '测试作品 · 钥匙扣 · 评级 A · 07/16');

  const openState = await page.evaluate(() => ({
    activeClass: document.activeElement?.className || '',
    backgroundInert: [...document.querySelector('.collection-enlarged').parentElement.children]
      .filter((element) => !element.classList.contains('collection-enlarged'))
      .every((element) => element.inert),
  }));
  assert.match(openState.activeClass, /collection-enlarged-close/, 'focus should enter the viewer');
  assert.equal(openState.backgroundInert, true, 'collection content behind the viewer should be inert');

  await page.keyboard.press('Shift+Tab');
  assert.equal(await page.evaluate(() => document.activeElement?.classList.contains('collection-enlarged-open')), true);
  await page.keyboard.press('Tab');
  assert.equal(await page.evaluate(() => document.activeElement?.classList.contains('collection-enlarged-close')), true);

  const material = await page.evaluate(() => {
    const card = getComputedStyle(document.querySelector('.collection-enlarged-card'));
    const canvas = getComputedStyle(document.querySelector('.collection-enlarged-canvas'));
    return { cardBorder: card.borderStyle, cardShadow: card.boxShadow, canvasBorder: canvas.borderWidth, canvasShadow: canvas.boxShadow };
  });
  assert.equal(material.cardBorder, 'solid');
  assert.match(material.cardShadow, /0px 0px$/);
  assert.ok(
    Number.parseFloat(material.canvasBorder) >= 1,
    `Expected a visible ink border, got ${material.canvasBorder}`
  );
  assert.match(material.canvasShadow, /0px 0px$/);

  await page.keyboard.press('Escape');
  await dialog.waitFor({ state: 'hidden' });
  assert.equal(await page.evaluate(() => document.activeElement?.classList.contains('collection-tile-body')), true, 'focus should return to the originating tile');
  assert.equal(await page.evaluate(() => [...document.querySelector('.collection-enlarged').parentElement.children].some((element) => element.inert)), false, 'background inert state should be released');
  assert.deepEqual(errors, []);
} finally {
  await browser.close();
  await new Promise((resolve) => server.close(resolve));
}

console.log('modal-accessibility-regression: labels, focus lifecycle and square material passed');
