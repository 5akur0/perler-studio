import { decodePatternCode } from "./src/pattern-code.js";
import { palette } from "./src/palette.js";
import { escapeHtml } from "./src/utils.js";
import { icon, hydrateIcons } from "./src/icons.js";

const apiBase = String(document.querySelector('meta[name="beam-share-api-base"]')?.content || "").replace(/\/+$/, "");
const tokenInput = document.querySelector("#adminToken");
const loadButton = document.querySelector("#loadButton");
const statusEl = document.querySelector("#status");
const grid = document.querySelector("#grid");
const tabsEl = document.querySelector("#filterTabs");

hydrateIcons(document);

// In-memory store of every card. `state` is "pending" or "published".
let items = [];
let activeFilter = "all";
let hasLoaded = false;

function setStatus(text, tone = "") {
  statusEl.textContent = text;
  statusEl.dataset.tone = tone;
}

async function request(path, payload = {}) {
  // Send the admin token as a header, not in the JSON body, so gateways and
  // function logs that capture request bodies don't record the secret.
  const response = await fetch(`${apiBase}${path}`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-admin-token": tokenInput.value.trim(),
    },
    body: JSON.stringify(payload),
  });
  const json = await response.json().catch(() => null);
  if (!response.ok || !json?.ok) {
    throw new Error(json?.error?.message || "请求失败。");
  }
  return json.data;
}

function drawPattern(canvas, pattern) {
  if (!pattern) return;
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

function formatDate(value) {
  if (!value) return "";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return String(value);
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function counts() {
  return {
    all: items.length,
    pending: items.filter((it) => it.state === "pending").length,
    published: items.filter((it) => it.state === "published").length,
  };
}

function updateTabs() {
  const c = counts();
  tabsEl.querySelectorAll("[data-count]").forEach((el) => {
    el.textContent = String(c[el.dataset.count] ?? 0);
  });
  tabsEl.querySelectorAll(".admin-tab").forEach((tab) => {
    const active = tab.dataset.filter === activeFilter;
    tab.classList.toggle("is-active", active);
    tab.setAttribute("aria-selected", active ? "true" : "false");
  });
}

function visibleItems() {
  if (activeFilter === "all") return items;
  return items.filter((it) => it.state === activeFilter);
}

function buildCard(item) {
  let pattern;
  try {
    pattern = decodePatternCode(item.patternCode, { name: item.name });
  } catch {
    pattern = null;
  }

  const card = document.createElement("article");
  card.className = "admin-card";
  card.dataset.state = item.state;

  const isPending = item.state === "pending";
  const chipLabel = isPending ? "待审核" : "已发布";
  const date = formatDate(item.publishedAt || item.createdAt);
  const sizeText = item.size ? `${escapeHtml(item.size)}×${escapeHtml(item.size)}` : "";
  const promoteBtn = isPending
    ? `<button class="admin-act admin-act-add" type="button" data-action="approve" title="加入画廊" aria-label="加入画廊">
         ${icon("plus", { size: 18 })}<span>加入画廊</span>
       </button>`
    : `<button class="admin-act admin-act-pull" type="button" data-action="unpublish" title="退回审核区" aria-label="退回审核区">
         ${icon("minus", { size: 18 })}<span>退回审核</span>
       </button>`;

  card.innerHTML = `
    <div class="admin-thumb-wrap">
      <canvas class="admin-thumb" aria-label="图纸预览"></canvas>
      <span class="admin-chip admin-chip-${item.state}">${chipLabel}</span>
    </div>
    <div class="admin-meta">
      <strong title="${escapeHtml(item.name || "投稿图纸")}">${escapeHtml(item.name || "投稿图纸")}</strong>
      <span>${escapeHtml(item.author || "匿名投稿")}${sizeText ? ` · ${sizeText}` : ""}</span>
      <span class="admin-meta-date">${escapeHtml(date)}</span>
    </div>
    <div class="admin-actions">
      ${promoteBtn}
      <button class="admin-act admin-act-del" type="button" data-action="delete" title="彻底删除" aria-label="彻底删除">
        ${icon("trash-2", { size: 18 })}
      </button>
    </div>
  `;

  drawPattern(card.querySelector("canvas"), pattern);

  card.querySelectorAll("button[data-action]").forEach((button) => {
    button.addEventListener("click", () => handleAction(button.dataset.action, item, card));
  });

  return card;
}

function render() {
  updateTabs();
  grid.innerHTML = "";
  const list = visibleItems();
  if (!list.length) {
    grid.classList.add("is-empty");
    grid.innerHTML = `<div class="admin-empty">${icon("clipboard-list", { size: 40, strokeWidth: 1.8 })}<p>${
      hasLoaded ? "这里还没有内容。" : "尚未读取。"
    }</p></div>`;
    return;
  }
  grid.classList.remove("is-empty");
  list.forEach((item) => grid.appendChild(buildCard(item)));
}

function setCardBusy(card, busy) {
  card.classList.toggle("is-busy", busy);
  card.querySelectorAll("button").forEach((btn) => {
    btn.disabled = busy;
  });
}

async function handleAction(action, item, card) {
  if (action === "delete") {
    const label = item.name || "这张图纸";
    if (!window.confirm(`彻底删除「${label}」？此操作不可恢复。`)) return;
  }

  setCardBusy(card, true);
  try {
    if (action === "approve") {
      const data = await request("/api/gallery/approve", { id: item.id });
      item.state = "published";
      item.publicId = data?.publicId || item.publicId;
      item.publishedAt = new Date().toISOString();
      setStatus(`已加入画廊：${item.name || "投稿图纸"}`, "ok");
    } else if (action === "unpublish") {
      const data = await request("/api/gallery/unpublish", { publicId: item.publicId });
      item.state = "pending";
      item.id = data?.submissionId || item.id;
      item.createdAt = item.createdAt || new Date().toISOString();
      setStatus(`已退回审核区：${item.name || "投稿图纸"}`, "ok");
    } else if (action === "delete") {
      await request("/api/gallery/delete", item.state === "published" ? { publicId: item.publicId } : { id: item.id });
      items = items.filter((it) => it !== item);
      setStatus(`已删除：${item.name || "投稿图纸"}`, "ok");
    }
    render();
  } catch (err) {
    setStatus(err.message || "操作失败。", "err");
    setCardBusy(card, false);
  }
}

async function loadAll() {
  if (!tokenInput.value.trim()) {
    setStatus("请先输入 ADMIN_TOKEN。", "err");
    return;
  }
  setStatus("正在读取…");
  loadButton.disabled = true;
  try {
    const [pending, published] = await Promise.all([
      request("/api/gallery/pending", { limit: 96 }),
      request("/api/gallery/list", { limit: 96 }),
    ]);
    const pendingItems = (Array.isArray(pending?.items) ? pending.items : []).map((it) => ({
      state: "pending",
      id: it.id,
      name: it.name,
      author: it.author || "",
      size: it.size,
      patternCode: it.patternCode,
      createdAt: it.createdAt,
    }));
    const publishedItems = (Array.isArray(published?.items) ? published.items : []).map((it) => ({
      state: "published",
      publicId: it.id,
      name: it.name,
      author: it.author || "",
      size: it.size,
      patternCode: it.patternCode,
      publishedAt: it.publishedAt,
    }));
    items = [...pendingItems, ...publishedItems];
    hasLoaded = true;
    const c = counts();
    setStatus(`待审核 ${c.pending} · 已发布 ${c.published}`, "ok");
    render();
  } catch (err) {
    setStatus(err.message || "读取失败。", "err");
  } finally {
    loadButton.disabled = false;
  }
}

tabsEl.addEventListener("click", (event) => {
  const tab = event.target.closest(".admin-tab");
  if (!tab) return;
  activeFilter = tab.dataset.filter;
  render();
});

loadButton.addEventListener("click", loadAll);
tokenInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") loadAll();
});

render();

// ── 留言审核 ────────────────────────────────────────────────────────────────
const messagesStatusEl = document.querySelector("#messagesStatus");
const messagesGrid = document.querySelector("#messagesGrid");
const loadMessagesButton = document.querySelector("#loadMessagesButton");

function setMessagesStatus(text, tone = "") {
  messagesStatusEl.textContent = text;
  messagesStatusEl.dataset.tone = tone;
}

function renderMessages(list) {
  if (!list.length) { messagesGrid.innerHTML = "<p class='admin-empty'>没有待审核留言。</p>"; return; }
  messagesGrid.innerHTML = list.map((m) => `
    <div class="admin-card" data-msg-id="${escapeHtml(m.id)}">
      <div class="admin-card-body">
        <strong>${m.nickname ? escapeHtml(m.nickname) : "匿名豆友"}</strong>
        <p>${escapeHtml(m.content)}</p>
        <small>${escapeHtml(m.createdAt || "")}</small>
      </div>
      <div class="admin-actions">
        <button class="admin-act admin-act-add" type="button" data-msg-approve="${escapeHtml(m.id)}" aria-label="通过">${icon("badge-check", { size: 18 })}</button>
        <button class="admin-act admin-act-del" type="button" data-msg-delete="${escapeHtml(m.id)}" aria-label="删除">${icon("trash-2", { size: 18 })}</button>
      </div>
    </div>`).join("");
  messagesGrid.querySelectorAll("[data-msg-approve]").forEach((b) =>
    b.addEventListener("click", () => moderateMessage("/api/messages/approve", { id: b.dataset.msgApprove })));
  messagesGrid.querySelectorAll("[data-msg-delete]").forEach((b) =>
    b.addEventListener("click", () => moderateMessage("/api/messages/delete", { id: b.dataset.msgDelete })));
}

async function loadMessages() {
  if (!tokenInput.value.trim()) { setMessagesStatus("请先输入 ADMIN_TOKEN。", "err"); return; }
  setMessagesStatus("正在读取…");
  loadMessagesButton.disabled = true;
  try {
    const data = await request("/api/messages/pending", { limit: 96 });
    const list = Array.isArray(data?.items) ? data.items : [];
    setMessagesStatus(`待审核 ${list.length}`, "ok");
    renderMessages(list);
  } catch (err) {
    setMessagesStatus(err.message || "读取失败。", "err");
  } finally {
    loadMessagesButton.disabled = false;
  }
}

async function moderateMessage(path, payload) {
  try {
    await request(path, payload);
    loadMessages();
  } catch (err) {
    setMessagesStatus(err.message || "操作失败。", "err");
  }
}

loadMessagesButton.addEventListener("click", loadMessages);

// ── 更新板管理 ──────────────────────────────────────────────────────────────
const roadmapStatusElNode = document.querySelector("#roadmapStatusEl");
const roadmapGrid = document.querySelector("#roadmapGrid");
const loadRoadmapButton = document.querySelector("#loadRoadmapButton");
const roadmapForm = document.querySelector("#roadmapForm");
const roadmapFields = {
  itemId: document.querySelector("#roadmapItemId"),
  title: document.querySelector("#roadmapTitle"),
  desc: document.querySelector("#roadmapDesc"),
  status: document.querySelector("#roadmapStatus"),
  version: document.querySelector("#roadmapVersion"),
  order: document.querySelector("#roadmapOrder"),
};

function setRoadmapStatus(text, tone = "") {
  roadmapStatusElNode.textContent = text;
  roadmapStatusElNode.dataset.tone = tone;
}

function resetRoadmapForm() {
  roadmapFields.itemId.value = "";
  roadmapFields.title.value = "";
  roadmapFields.desc.value = "";
  roadmapFields.status.value = "planned";
  roadmapFields.version.value = "";
  roadmapFields.order.value = "";
}

function renderRoadmap(list) {
  if (!list.length) { roadmapGrid.innerHTML = "<p class='admin-empty'>还没有更新条目。</p>"; return; }
  roadmapGrid.innerHTML = list.map((it) => `
    <div class="admin-card" data-road-id="${escapeHtml(it.id)}">
      <div class="admin-card-body">
        <strong>${escapeHtml(it.title)} <small>[${escapeHtml(it.status)}${it.version ? " v" + escapeHtml(it.version) : ""}]</small></strong>
        <p>${escapeHtml(it.desc || "")}</p>
        <small>赞 ${Number(it.votes) || 0} · 排序 ${Number(it.order) || 0}</small>
      </div>
      <div class="admin-actions">
        <button class="admin-act" type="button" data-road-edit="${escapeHtml(it.id)}" aria-label="编辑">${icon("pencil", { size: 18 })}</button>
        <button class="admin-act admin-act-del" type="button" data-road-delete="${escapeHtml(it.id)}" aria-label="删除">${icon("trash-2", { size: 18 })}</button>
      </div>
    </div>`).join("");
  roadmapGrid.querySelectorAll("[data-road-edit]").forEach((b) =>
    b.addEventListener("click", () => {
      const it = list.find((x) => x.id === b.dataset.roadEdit);
      if (!it) return;
      roadmapFields.itemId.value = it.id;
      roadmapFields.title.value = it.title;
      roadmapFields.desc.value = it.desc || "";
      roadmapFields.status.value = it.status;
      roadmapFields.version.value = it.version || "";
      roadmapFields.order.value = Number(it.order) || 0;
      setRoadmapStatus("已载入条目，修改后保存。", "ok");
    }));
  roadmapGrid.querySelectorAll("[data-road-delete]").forEach((b) =>
    b.addEventListener("click", async () => {
      try { await request("/api/roadmap/delete", { itemId: b.dataset.roadDelete }); loadRoadmap(); }
      catch (err) { setRoadmapStatus(err.message || "删除失败。", "err"); }
    }));
}

async function loadRoadmap() {
  setRoadmapStatus("正在读取…");
  loadRoadmapButton.disabled = true;
  try {
    const data = await request("/api/roadmap/list", {});
    const list = Array.isArray(data?.items) ? data.items : [];
    setRoadmapStatus(`共 ${list.length} 条`, "ok");
    renderRoadmap(list);
  } catch (err) {
    setRoadmapStatus(err.message || "读取失败。", "err");
  } finally {
    loadRoadmapButton.disabled = false;
  }
}

roadmapForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!tokenInput.value.trim()) { setRoadmapStatus("请先输入 ADMIN_TOKEN。", "err"); return; }
  if (!roadmapFields.title.value.trim()) { setRoadmapStatus("标题不能为空。", "err"); return; }
  try {
    await request("/api/roadmap/upsert", {
      itemId: roadmapFields.itemId.value || undefined,
      title: roadmapFields.title.value.trim(),
      desc: roadmapFields.desc.value.trim(),
      status: roadmapFields.status.value,
      version: roadmapFields.version.value.trim(),
      order: Number(roadmapFields.order.value) || 0,
    });
    resetRoadmapForm();
    setRoadmapStatus("已保存。", "ok");
    loadRoadmap();
  } catch (err) {
    setRoadmapStatus(err.message || "保存失败。", "err");
  }
});

document.querySelector("#roadmapResetButton").addEventListener("click", () => { resetRoadmapForm(); setRoadmapStatus(""); });
loadRoadmapButton.addEventListener("click", loadRoadmap);

hydrateIcons(document);
