// Mockup builder for the redesigned in-app share card (A3 approach).
// Renders a pastel 3:4 social card from the REAL 甜心草莓 pattern, in two brand
// palettes, plus a fixed "进 app" QR with the 拼豆工坊 name. Output: output/*.png.
import { chromium } from 'playwright';
import QRCode from 'qrcode';
import { writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const DIR = path.dirname(fileURLToPath(import.meta.url));

// ── Real pattern: 甜心草莓 (16×16) ───────────────────────────────────────────
const NAME = '甜心草莓';
const CRAFT = '钥匙扣';
const GRADE = 'S';
const TIME = '18分'; // PLACEHOLDER — app must track active build time for this KPI
// Footer slogan — picked at random per render.
const SLOGANS = [
  '想拼就拼，走到哪拼到哪',
  '碎片时间，玩会赛博拼豆',
  '一部手机，随身的拼豆台',
];
const ROWS = [
  '................', '.......GG.......', '......GGGG......', '.....GGGGGG.....',
  '....GGGTTGGG....', '...RRRRRRRRRR...', '..RRyRRWWRRyRR..', '.RRRRyRRRRyRRRR.',
  '.RRyRRRRRRRRyRR.', '.RRRRyRRRRyRRRR.', '..RRyRRRRRRyRR..', '..RRRRyRRyRRRR..',
  '...RRRRRRRRRR...', '....RRRRRRRR....', '.....RRRRRR.....', '......RRRR......',
];
const HEX = { G: '#1C9C4F', T: '#166F41', R: '#FC283C', y: '#FFE36E', W: '#FDFBFF' };
const W = ROWS[0].length, H = ROWS.length;

// ── Real stats ──────────────────────────────────────────────────────────────
let beads = 0; const colors = new Set();
for (const row of ROWS) for (const ch of row) if (ch !== '.') { beads++; colors.add(ch); }
const SIZE_LABEL = `${W}×${H}`;
const COLOR_COUNT = colors.size;
const QR_URL = 'https://perler-studio.pages.dev';

// ── Bead grid HTML ────────────────────────────────────────────────────────────
function beadGrid() {
  let cells = '';
  for (const row of ROWS) for (const ch of row) {
    if (ch === '.') { cells += '<i class="bead empty"></i>'; continue; }
    cells += `<i class="bead" style="--c:${HEX[ch]}"></i>`;
  }
  return `<div class="grid" style="--cols:${W}">${cells}</div>`;
}

// ── Two pastel themes (守粉彩) ─────────────────────────────────────────────────
const THEMES = {
  sakura: {
    label: '奶杏浅樱',
    pageA: '#fff8f4', pageB: '#fdecef', well: '#ffffff', wellEdge: 'rgba(231,138,160,.28)',
    ink: '#3a2d31', muted: '#8a7077', accent: '#e87a92', accentDeep: '#d65c79',
    chip: 'rgba(255,255,255,.78)', chipEdge: 'rgba(214,92,121,.20)', glow: 'rgba(231,138,160,.22)',
  },
  mist: {
    label: '雾青',
    pageA: '#eef4f3', pageB: '#e3efec', well: '#ffffff', wellEdge: 'rgba(63,152,139,.26)',
    ink: '#26303033', muted: '#5a6b67', accent: '#3f988b', accentDeep: '#1f6153',
    chip: 'rgba(255,255,255,.80)', chipEdge: 'rgba(63,152,139,.20)', glow: 'rgba(87,184,167,.22)',
  },
};
THEMES.mist.ink = '#27302f';

function posterHTML(t) {
  const slogan = SLOGANS[Math.floor(Math.random() * SLOGANS.length)];
  return `
  <section class="poster" data-variant>
    <div class="bgwash"></div>
    <header class="top">
      <div class="titleblock">
        <h1 class="name">${NAME}</h1>
      </div>
      <div class="badge"><span class="g">${GRADE}</span><span class="gl">评级</span></div>
    </header>

    <div class="well">
      ${beadGrid()}
      <div class="craft-tag">${CRAFT}</div>
    </div>

    <div class="kpis">
      <div class="kpi"><b>${SIZE_LABEL}</b><span>尺寸</span></div>
      <div class="kpi"><b>${beads}</b><span>颗数</span></div>
      <div class="kpi"><b>${COLOR_COUNT}</b><span>色号</span></div>
      <div class="kpi"><b>${TIME}</b><span>用时</span></div>
    </div>

    <footer class="foot">
      <div class="qr"><img src="assets/qr.png" alt="qr"><span>拼豆工坊</span></div>
      <div class="sign">
        <div class="brand">拼豆工坊</div>
        <div class="slogan">${slogan}</div>
        <div class="cta">扫码 · 开始你的拼豆</div>
      </div>
    </footer>
  </section>`;
}

function pageHTML(theme) {
  const t = THEMES[theme];
  return `<!doctype html><html><head><meta charset="utf-8">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fontsource/lxgw-marker-gothic@5.2.3/400.css">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700&display=swap">
<style>
  :root{
    --cute:'LXGW Marker Gothic','Noto Sans SC',sans-serif;
    --clear:'Noto Sans SC',sans-serif;
    --page-a:${t.pageA};--page-b:${t.pageB};--well:${t.well};--well-edge:${t.wellEdge};
    --ink:${t.ink};--muted:${t.muted};--accent:${t.accent};--accent-deep:${t.accentDeep};
    --chip:${t.chip};--chip-edge:${t.chipEdge};--glow:${t.glow};
  }
  *{margin:0;padding:0;box-sizing:border-box;}
  body{background:#ddd;}
  .poster{
    width:1080px;height:1440px;position:relative;overflow:hidden;
    background:linear-gradient(168deg,var(--page-a),var(--page-b));
    padding:80px 80px 64px;display:flex;flex-direction:column;
    font-family:var(--clear);color:var(--ink);
  }
  .bgwash{position:absolute;inset:0;pointer-events:none;
    background:
      radial-gradient(620px 480px at 84% 8%,var(--glow),transparent 70%),
      radial-gradient(560px 520px at 6% 96%,var(--glow),transparent 72%);}
  .poster>*{position:relative;z-index:1;}

  .top{display:flex;justify-content:space-between;align-items:center;}
  .name{font-family:var(--cute);font-size:92px;line-height:1.0;color:var(--ink);letter-spacing:.01em;}
  .badge{flex:0 0 auto;width:148px;height:148px;border-radius:34px;
    background:linear-gradient(160deg,var(--accent),var(--accent-deep));
    box-shadow:0 16px 30px var(--glow),inset 0 2px 0 rgba(255,255,255,.5);
    display:flex;flex-direction:column;align-items:center;justify-content:center;color:#fff;}
  .badge .g{font-family:var(--cute);font-size:84px;line-height:.9;}
  .badge .gl{font-family:var(--clear);font-size:24px;font-weight:500;opacity:.92;margin-top:3px;}

  .well{position:relative;margin:40px 0 0;background:var(--well);border:1px solid var(--well-edge);
    border-radius:40px;padding:40px;flex:1 1 auto;display:flex;align-items:center;justify-content:center;
    box-shadow:0 26px 60px rgba(49,54,68,.13),inset 0 1px 0 rgba(255,255,255,.8);}
  .craft-tag{position:absolute;right:30px;bottom:30px;font-family:var(--cute);font-size:26px;
    color:var(--accent-deep);background:var(--chip);border:1px solid var(--chip-edge);
    border-radius:999px;padding:8px 20px 5px;box-shadow:0 4px 12px rgba(49,54,68,.07);}
  .grid{display:grid;grid-template-columns:repeat(var(--cols),1fr);gap:5px;width:100%;max-width:600px;aspect-ratio:1;}
  .bead{aspect-ratio:1;border-radius:34%;background:var(--c);position:relative;
    box-shadow:inset 0 2.5px 3px rgba(255,255,255,.55),inset 0 -2.5px 4px rgba(0,0,0,.14),0 1.5px 1.5px rgba(0,0,0,.16);}
  .bead::after{content:'';position:absolute;inset:33%;border-radius:50%;
    background:rgba(255,255,255,.28);box-shadow:inset 0 0 0 1.5px rgba(0,0,0,.12);}
  .bead.empty{background:transparent;box-shadow:none;}
  .bead.empty::after{display:none;}

  .kpis{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-top:32px;}
  .kpi{background:var(--chip);border:1px solid var(--chip-edge);border-radius:22px;
    padding:22px 10px 16px;text-align:center;box-shadow:0 6px 16px rgba(49,54,68,.06);}
  .kpi b{display:block;font-family:var(--clear);font-weight:700;font-size:42px;color:var(--ink);line-height:1;}
  .kpi span{display:block;font-family:var(--clear);font-size:26px;color:var(--muted);margin-top:10px;}

  .foot{display:flex;align-items:center;gap:30px;margin-top:32px;}
  .qr{flex:0 0 auto;display:flex;flex-direction:column;align-items:center;gap:8px;
    background:#fff;border:1px solid var(--chip-edge);border-radius:24px;padding:18px 18px 12px;
    box-shadow:0 10px 24px rgba(49,54,68,.10);}
  .qr img{width:150px;height:150px;display:block;border-radius:8px;}
  .qr span{font-family:var(--cute);font-size:26px;color:var(--ink);}
  .sign{flex:1 1 auto;}
  .sign .brand{font-family:var(--cute);font-size:52px;color:var(--ink);line-height:1;}
  .sign .slogan{font-family:var(--cute);font-size:34px;color:var(--accent-deep);margin-top:12px;}
  .sign .cta{font-family:var(--clear);font-size:26px;color:var(--muted);margin-top:14px;}
</style></head>
<body>${posterHTML(t)}</body></html>`;
}

// ── Render ────────────────────────────────────────────────────────────────────
const qrBuf = await QRCode.toBuffer(QR_URL, {
  margin: 1, width: 300, color: { dark: '#2b2430ff', light: '#ffffffff' },
  errorCorrectionLevel: 'M',
});
await writeFile(path.join(DIR, 'assets', 'qr.png'), qrBuf);

for (const theme of ['sakura', 'mist']) {
  await writeFile(path.join(DIR, `_page-${theme}.html`), pageHTML(theme));
}

const browser = await chromium.launch();
for (const theme of ['sakura', 'mist']) {
  const page = await browser.newPage({ viewport: { width: 1080, height: 1440 }, deviceScaleFactor: 2 });
  await page.goto('file://' + path.join(DIR, `_page-${theme}.html`));
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(400);
  const el = await page.$('.poster');
  await el.screenshot({ path: path.join(DIR, 'output', `share-${theme}.png`) });
  await page.close();
  console.log(`rendered share-${theme}.png  (${beads}颗 · ${COLOR_COUNT}色 · ${SIZE_LABEL})`);
}
await browser.close();
