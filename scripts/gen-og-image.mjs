// Generates og-image.png (1200×630) and apple-touch-icon.png (180×180) for link
// previews. Renders inside a real page load of the app so the brand webfonts
// (Noto Sans SC / LXGW Marker Gothic) are available, then draws a pastel branded
// card with a pixel-bead motif on an offscreen canvas. Deterministic: the motif
// is a fixed bitmap, so re-running produces the same image.
//
// Usage: node scripts/gen-og-image.mjs   (server is started/stopped automatically)
import { chromium } from "playwright";
import { spawn } from "child_process";
import http from "http";
import { writeFile } from "fs/promises";

const BASE = "http://localhost:5173";

function waitForServer() {
  return new Promise((resolve) => {
    let tries = 0;
    const tick = () => {
      const req = http.get(BASE, (r) => { r.resume(); resolve(true); });
      req.on("error", () => {
        tries += 1;
        if (tries > 40) return resolve(false);
        setTimeout(tick, 250);
      });
    };
    tick();
  });
}

const srv = spawn("node", ["server.cjs"], { cwd: process.cwd(), stdio: "ignore" });
try {
  const ok = await waitForServer();
  if (!ok) throw new Error("local server did not start");
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  await page.goto(BASE, { waitUntil: "networkidle" });
  // Ensure brand fonts are decoded before we paint text to canvas.
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(400);

  const draw = ({ w, h, mode }) => {
    const c = document.createElement("canvas");
    c.width = w; c.height = h;
    const ctx = c.getContext("2d");
    // pastel wash
    const bg = ctx.createLinearGradient(0, 0, w * 0.5, h);
    bg.addColorStop(0, "#eef2f4");
    bg.addColorStop(1, "#dceee8");
    ctx.fillStyle = bg; ctx.fillRect(0, 0, w, h);
    const glow = ctx.createRadialGradient(w * 0.82, h * 0.1, 0, w * 0.82, h * 0.1, w * 0.5);
    glow.addColorStop(0, "rgba(87,184,167,0.18)");
    glow.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = glow; ctx.fillRect(0, 0, w, h);

    const round = (x, y, ww, hh, r) => {
      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.arcTo(x + ww, y, x + ww, y + hh, r);
      ctx.arcTo(x + ww, y + hh, x, y + hh, r);
      ctx.arcTo(x, y + hh, x, y, r);
      ctx.arcTo(x, y, x + ww, y, r);
      ctx.closePath();
    };

    // heart pixel-bead motif (1 = light pink, 2 = deep pink)
    const H = [
      "0110110",
      "1221221",
      "1222221",
      "1222221",
      "0122210",
      "0012100",
      "0001000",
    ];
    const cols = H[0].length, rows = H.length;
    const isIcon = mode === "icon";
    const well = isIcon ? Math.min(w, h) : Math.min(h - 120, 430);
    const wx = isIcon ? 0 : 90;
    const wy = (h - well) / 2;
    if (!isIcon) {
      ctx.save();
      ctx.shadowColor = "rgba(49,54,68,0.16)"; ctx.shadowBlur = 40; ctx.shadowOffsetY = 18;
      ctx.fillStyle = "#ffffff"; round(wx, wy, well, well, 36); ctx.fill();
      ctx.restore();
      ctx.strokeStyle = "#3f988b"; ctx.lineWidth = 2; round(wx, wy, well, well, 36); ctx.stroke();
    }
    const pad = isIcon ? well * 0.16 : 56;
    const cell = (well - pad * 2) / Math.max(cols, rows);
    const gx = wx + (well - cell * cols) / 2;
    const gy = wy + (well - cell * rows) / 2;
    for (let y = 0; y < rows; y += 1) {
      for (let x = 0; x < cols; x += 1) {
        const v = H[y][x];
        if (v === "0") continue;
        ctx.fillStyle = v === "2" ? "#e7645f" : "#f3a7a3";
        round(gx + x * cell + cell * 0.06, gy + y * cell + cell * 0.06, cell * 0.88, cell * 0.88, cell * 0.22);
        ctx.fill();
        ctx.fillStyle = "rgba(255,255,255,0.35)";
        ctx.beginPath();
        ctx.ellipse(gx + x * cell + cell * 0.36, gy + y * cell + cell * 0.32, cell * 0.16, cell * 0.1, 0, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    if (isIcon) return c.toDataURL("image/png");

    // brand text block on the right
    const tx = wx + well + 70;
    ctx.textAlign = "left";
    ctx.fillStyle = "#1f6153";
    ctx.font = '700 92px "LXGW Marker Gothic", "Noto Sans SC", sans-serif';
    ctx.fillText("拼豆工坊", tx, h * 0.42);
    ctx.fillStyle = "#26242b";
    ctx.font = '400 36px "Noto Sans SC", sans-serif';
    ctx.fillText("在浏览器里慢慢做一颗颗治愈的拼豆", tx, h * 0.42 + 64);
    ctx.fillStyle = "#5a5763";
    ctx.font = '400 28px "Noto Sans SC", sans-serif';
    ctx.fillText("选图 · 摆豆 · 熨烫 · 收藏 · 分享", tx, h * 0.42 + 116);
    return c.toDataURL("image/png");
  };

  const ogData = await page.evaluate(draw, { w: 1200, h: 630, mode: "og" });
  const iconData = await page.evaluate(draw, { w: 180, h: 180, mode: "icon" });
  await writeFile("og-image.png", Buffer.from(ogData.split(",")[1], "base64"));
  await writeFile("apple-touch-icon.png", Buffer.from(iconData.split(",")[1], "base64"));
  console.log("wrote og-image.png + apple-touch-icon.png");
  await browser.close();
} finally {
  srv.kill();
}
process.exit(0);
