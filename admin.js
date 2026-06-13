import { decodePatternCode } from "./src/pattern-code.js";
import { palette } from "./src/palette.js";
import { escapeHtml } from "./src/utils.js";
import { hydrateIcons } from "./src/icons.js";

const apiBase = String(document.querySelector('meta[name="beam-share-api-base"]')?.content || "").replace(/\/+$/, "");
const tokenInput = document.querySelector("#adminToken");
const loadButton = document.querySelector("#loadButton");
const statusEl = document.querySelector("#status");
const grid = document.querySelector("#grid");

hydrateIcons(document);

function setStatus(text) {
  statusEl.textContent = text;
}

async function request(path, payload = {}) {
  const response = await fetch(`${apiBase}${path}`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ ...payload, adminToken: tokenInput.value.trim() }),
  });
  const json = await response.json().catch(() => null);
  if (!response.ok || !json?.ok) {
    throw new Error(json?.error?.message || "Request failed.");
  }
  return json.data;
}

function drawPattern(canvas, pattern) {
  const dpr = Math.min(2, window.devicePixelRatio || 1);
  const rect = canvas.getBoundingClientRect();
  const dim = Math.max(180, Math.round((rect.width || 240) * dpr));
  canvas.width = dim;
  canvas.height = dim;
  const ctx = canvas.getContext("2d");
  const cell = dim / pattern.size;
  ctx.fillStyle = "#f6f8fc";
  ctx.fillRect(0, 0, dim, dim);
  pattern.rows.forEach((row, y) => {
    Array.from(row).forEach((code, x) => {
      if (code === ".") return;
      ctx.fillStyle = palette[code] || "#bbb";
      ctx.fillRect(Math.floor(x * cell), Math.floor(y * cell), Math.ceil(cell), Math.ceil(cell));
    });
  });
}

function render(items) {
  grid.innerHTML = "";
  if (!items.length) {
    setStatus("没有待审核投稿。");
    return;
  }
  setStatus(`共 ${items.length} 条待审核。`);
  items.forEach((item) => {
    let pattern;
    try {
      pattern = decodePatternCode(item.patternCode, { name: item.name });
    } catch {
      pattern = null;
    }
    const card = document.createElement("article");
    card.className = "card";
    card.innerHTML = `
      <canvas aria-label="图纸预览"></canvas>
      <div class="meta">
        <strong>${escapeHtml(item.name || "投稿图纸")}</strong>
        <span>${escapeHtml(item.author || "匿名投稿")} · ${escapeHtml(item.size)}x${escapeHtml(item.size)}</span>
        <span>${escapeHtml(item.createdAt)}</span>
      </div>
      <div class="actions">
        <button class="primary icon-text-button" type="button" data-action="approve">
          <span class="btn-glyph" data-lucide-icon="badge-check" data-icon-size="16"></span>
          <span class="btn-label">通过</span>
        </button>
        <button class="danger icon-text-button" type="button" data-action="reject">
          <span class="btn-glyph" data-lucide-icon="badge-x" data-icon-size="16"></span>
          <span class="btn-label">拒绝</span>
        </button>
      </div>
    `;
    hydrateIcons(card);
    const canvas = card.querySelector("canvas");
    if (pattern) drawPattern(canvas, pattern);
    card.querySelectorAll("button[data-action]").forEach((button) => {
      button.addEventListener("click", async () => {
        const action = button.dataset.action;
        card.querySelectorAll("button").forEach((btn) => {
          btn.disabled = true;
        });
        try {
          await request(`/api/gallery/${action}`, { id: item.id });
          card.remove();
          setStatus(action === "approve" ? "已通过。" : "已拒绝。");
        } catch (error) {
          card.querySelectorAll("button").forEach((btn) => {
            btn.disabled = false;
          });
          setStatus(error.message || "操作失败。");
        }
      });
    });
    grid.appendChild(card);
  });
}

async function loadPending() {
  if (!tokenInput.value.trim()) {
    setStatus("请先输入 ADMIN_TOKEN。");
    return;
  }
  setStatus("正在读取...");
  loadButton.disabled = true;
  try {
    const data = await request("/api/gallery/pending", { limit: 96 });
    render(Array.isArray(data.items) ? data.items : []);
  } catch (error) {
    setStatus(error.message || "读取失败。");
  } finally {
    loadButton.disabled = false;
  }
}

loadButton.addEventListener("click", loadPending);
