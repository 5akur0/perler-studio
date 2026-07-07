// src/gallery.js — Gallery, share, and network layer.
// Callbacks that would create circular imports are injected by main.js via setGalleryActions().

import { state } from './state.js';
import { els } from './dom.js';
import { decodePatternCode, encodePatternCode } from './pattern-code.js';
import { addToLibrary, newLibraryId } from './pattern-library.js';
import { showToast } from './notify.js';
import { escapeHtml, stableHash, pickCustomPatternNote } from './utils.js';
import { drawPatternThumb } from './ui.js';
import { icon } from './icons.js';

// ─── Injected callbacks (set by main.js at startup) ──────────────────────────

let galleryActions = {
  loadPattern: () => {},
  setAppMode: () => {},
  onModalOpened: () => {},
  restoreModalFocus: () => {},
  uiRenderUI: () => {},
};

export function setGalleryActions(actions) {
  galleryActions = { ...galleryActions, ...actions };
}

// ─── API base ─────────────────────────────────────────────────────────────────

function readShareApiBase() {
  const metaBase = document.querySelector('meta[name="beam-share-api-base"]')?.content
    || window.BEAM_SHARE_API_BASE || "";
  return String(metaBase).replace(/\/+$/, "");
}

const shareApiBase = readShareApiBase();
const cloudShortIdPattern = /^[23456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]{8}$/;

// ─── Gallery state ────────────────────────────────────────────────────────────

let galleryItems = [];
let galleryLoaded = false;
let galleryError = false;

// ─── Network helpers ──────────────────────────────────────────────────────────

function shareApiUrl(path) {
  return `${shareApiBase}${path}`;
}

export function extractCloudShortId(text) {
  const raw = String(text || "").trim();
  // A titled share code is 【标题】+短码. Strip a leading 【…】 title first, so a
  // title made of base58-looking Latin characters (e.g. 【ABCDEFGH】) can't be
  // mistaken for the code itself.
  const source = raw.replace(/^【[^】]*】\s*/, "");
  if (cloudShortIdPattern.test(source)) return source;
  // The short id trails any descriptive text, so prefer the LAST 8-char run
  // rather than the first.
  const matches = source.match(/[23456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]{8}/g);
  const candidate = matches ? matches[matches.length - 1] : "";
  return cloudShortIdPattern.test(candidate) ? candidate : "";
}

export async function requestShareApi(path, payload, options = {}) {
  const response = await fetch(shareApiUrl(path), {
    method: "POST",
    headers: { "content-type": "application/json" },
    signal: options.signal,
    body: JSON.stringify(payload),
  });
  const json = await response.json().catch(() => null);
  if (!response.ok || !json?.ok) {
    throw new Error(json?.error?.message || "Share request failed.");
  }
  return json.data;
}

// Whether a backend base URL is configured. Community/gallery UIs use this to
// show a graceful "service not configured" state on offline file:// builds.
export function shareApiConfigured() {
  return Boolean(shareApiBase);
}

async function requestGalleryApi(path, payload = {}, options = {}) {
  return requestShareApi(path, payload, options);
}

function normalizeGalleryText(value, fallback = "") {
  return String(value || fallback)
    .replace(/[\u0000-\u001F\u007F]/g, "")
    .trim();
}

function patternFromGalleryItem(item) {
  const decoded = decodePatternCode(item.patternCode, { name: item.name || "画廊图纸" });
  return {
    ...decoded,
    id: `gallery-${item.id || item._id || stableHash(item.patternCode)}`,
    name: item.name || decoded.name || "画廊图纸",
    note: item.author ? `来自 ${item.author}` : "画廊图纸",
    craft: decoded.craft || "原版",
  };
}

// ─── Gallery rendering ────────────────────────────────────────────────────────

// Count the grid's resolved auto-fill columns so skeletons (and any whole-row
// math) fill complete rows instead of leaving an orphaned remainder.
function galleryColumnCount(fallback = 4) {
  if (!els.galleryGrid) return fallback;
  const tracks = getComputedStyle(els.galleryGrid).gridTemplateColumns;
  // A laid-out grid resolves to a pixel track list ("200px 200px …"); if it's
  // still the unresolved function form (contains "(") or "none" — e.g. measured
  // while hidden — fall back rather than miscount the tokens.
  if (!tracks || tracks === "none" || tracks.includes("(")) return fallback;
  const n = tracks.split(" ").filter(Boolean).length;
  return n > 0 ? n : fallback;
}

export function renderGallery() {
  if (!els.galleryGrid || !els.galleryEmpty) return;
  els.galleryGrid.innerHTML = "";
  const items = Array.isArray(galleryItems) ? galleryItems : [];
  // The toolbar submit button shows only where it's the sole submit entry point:
  // the populated grid and the error state. Hidden while LOADING (a lone button
  // floating over skeleton tiles reads as a glitch, and it may vanish a moment
  // later if the result is empty) and in the loaded-empty state (the empty-state
  // CTA carries its own 投稿图纸 button).
  if (els.gallerySubmitButton) {
    els.gallerySubmitButton.hidden = !galleryLoaded || (items.length === 0 && !galleryError);
  }
  // While loading, fill the grid with glass skeleton tiles so the wait reads as
  // "content arriving" rather than a bare status line (product register: skeletons,
  // not spinners/text). Render two full rows so there's no ragged orphan row.
  if (items.length === 0 && !galleryLoaded) {
    els.galleryEmpty.hidden = true;
    els.galleryGrid.innerHTML = Array.from({ length: galleryColumnCount() * 2 }, () => `
      <article class="gallery-card gallery-card-skeleton" aria-hidden="true">
        <div class="gallery-skeleton-thumb"></div>
        <div class="gallery-skeleton-meta">
          <span class="gallery-skeleton-line"></span>
          <span class="gallery-skeleton-line short"></span>
        </div>
      </article>`).join("");
    return;
  }
  els.galleryEmpty.hidden = items.length > 0;
  if (items.length === 0) {
    const galleryIcon = icon("image", { size: 40, strokeWidth: 1.8, class: "gallery-empty-icon" });
    const galleryBadge = `<span class="gallery-empty-badge">${galleryIcon}</span>`;
    if (galleryError) {
      els.galleryEmpty.innerHTML = `${galleryBadge}<p class="gallery-empty-text">画廊读取失败</p><button type="button" class="ghost-button" data-gallery-retry>点此重试</button>`;
      els.galleryEmpty.querySelector("[data-gallery-retry]")?.addEventListener("click", () => { void loadGallery(); });
    } else {
      els.galleryEmpty.innerHTML = `${galleryBadge}<p class="gallery-empty-text">画廊还没有公开图纸</p><p class="gallery-empty-sub">来当第一个投稿的人吧</p><button type="button" class="primary-button" data-gallery-submit>投稿图纸</button>`;
      els.galleryEmpty.querySelector("[data-gallery-submit]")?.addEventListener("click", () => openGallerySubmitModal());
    }
  }
  items.forEach((item) => {
    let pattern = null;
    try {
      pattern = patternFromGalleryItem(item);
    } catch {
      return;
    }
    const card = document.createElement("article");
    card.className = "gallery-card";
    const safeName = escapeHtml(item.name || pattern.name || "画廊图纸");
    const safeAuthor = escapeHtml(item.author || "匿名投稿");
    const safeSize = escapeHtml(`${pattern.width || pattern.size}x${pattern.height || pattern.size}`);
    card.innerHTML = `
      <button type="button" class="gallery-card-body" aria-label="打开 ${safeName}">
        <canvas class="gallery-thumb" width="180" height="180" aria-hidden="true"></canvas>
        <span class="gallery-card-meta">
          <strong>${safeName}</strong>
          <span>${safeSize} · ${safeAuthor}</span>
        </span>
      </button>
    `;
    card.querySelector(".gallery-card-body").addEventListener("click", () => {
      galleryActions.loadPattern(pattern, false);
      galleryActions.setAppMode("bead");
      showToast(`已打开画廊图纸：${pattern.name}`);
    });
    els.galleryGrid.appendChild(card);
    drawPatternThumb(card.querySelector("canvas"), pattern);
  });
}

export async function loadGallery({ silent = false } = {}) {
  if (!shareApiBase) {
    galleryLoaded = true;
    galleryItems = [];
    renderGallery();
    if (!silent) showToast("画廊服务还没有配置。");
    return;
  }
  if (!silent) {
    galleryLoaded = false;
    renderGallery();
  }
  try {
    const data = await requestGalleryApi("/api/gallery/list", { limit: 48 });
    galleryItems = Array.isArray(data?.items) ? data.items : [];
    galleryError = false;
    galleryLoaded = true;
    renderGallery();
  } catch {
    galleryLoaded = true;
    galleryError = true;
    galleryItems = [];
    renderGallery();
    if (!silent) showToast("画廊读取失败，请稍后再试。");
  }
}

/** Called by setAppMode("gallery") — renders current state then fetches if not yet loaded. */
export function enterGalleryMode() {
  renderGallery();
  if (!galleryLoaded) void loadGallery({ silent: true });
}

async function resolvePatternCodeInput(raw) {
  const shortId = extractCloudShortId(raw);
  if (!shortId) throw new Error("missing_pattern_code");
  const share = await requestShareApi("/api/share/open", { shortId });
  const code = share.patternCode;
  decodePatternCode(code);
  return code;
}

// ─── Gallery submit modal ─────────────────────────────────────────────────────

export function openGallerySubmitModal(options = {}) {
  if (!els.gallerySubmitModal) return;
  const name = normalizeGalleryText(options.name || state.selectedPattern?.name || "", "自定义图纸");
  if (els.gallerySubmitName) els.gallerySubmitName.value = name;
  if (els.gallerySubmitAuthor && !els.gallerySubmitAuthor.value) els.gallerySubmitAuthor.value = "";
  if (els.gallerySubmitCode) {
    els.gallerySubmitCode.value = options.patternCode || "";
    els.gallerySubmitCode.readOnly = Boolean(options.patternCode);
  }
  state.gallerySubmitModalOpen = true;
  els.gallerySubmitModal.classList.add("show");
  els.gallerySubmitModal.setAttribute("aria-hidden", "false");
  galleryActions.onModalOpened(els.gallerySubmitModal);
}

export function closeGallerySubmitModal() {
  if (!els.gallerySubmitModal) return;
  state.gallerySubmitModalOpen = false;
  els.gallerySubmitModal.classList.remove("show");
  els.gallerySubmitModal.setAttribute("aria-hidden", "true");
  if (els.gallerySubmitCode) els.gallerySubmitCode.readOnly = false;
  galleryActions.restoreModalFocus();
}

export async function submitGalleryPattern() {
  const button = els.gallerySubmitConfirmBtn;
  const name = normalizeGalleryText(els.gallerySubmitName?.value, "自定义图纸");
  const author = normalizeGalleryText(els.gallerySubmitAuthor?.value);
  const raw = els.gallerySubmitCode?.value || "";
  if (!name) { showToast("请填写图纸名称。"); return; }
  if (!raw.trim()) { showToast("请粘贴分享码。"); return; }
  if (!shareApiBase) { showToast("投稿服务还没有配置。"); return; }
  if (button) { button.disabled = true; button.textContent = "提交中"; }
  try {
    const patternCode = await resolvePatternCodeInput(raw);
    const decoded = decodePatternCode(patternCode);
    await requestGalleryApi("/api/gallery/submit", { name, author, patternCode, size: decoded.size });
    closeGallerySubmitModal();
    showToast("投稿已进入审核队列。");
  } catch {
    showToast("投稿失败，请检查分享码或稍后再试。");
  } finally {
    if (button) { button.disabled = false; button.textContent = "提交审核"; }
  }
}

// ─── Copy helpers ─────────────────────────────────────────────────────────────

function fallbackCopyText(text) {
  try {
    const area = document.createElement("textarea");
    area.value = text;
    document.body.appendChild(area);
    area.select();
    const copied = Boolean(document.execCommand?.("copy"));
    area.remove();
    return copied;
  } catch {
    return false;
  }
}

export async function autoCopyText(text, successMessage, failureMessage) {
  const content = String(text || "");
  if (!content) return false;
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(content);
      showToast(successMessage);
      return true;
    } catch {
      // Fallback below.
    }
  }
  if (fallbackCopyText(content)) {
    showToast(successMessage);
    return true;
  }
  showToast(failureMessage);
  return false;
}

// ─── Pattern import / share ───────────────────────────────────────────────────

export function applyImportedPattern(decoded, name = "") {
  const width = decoded.width || decoded.size;
  const height = decoded.height || decoded.size;
  const finalName = String(name || "").trim() || "未命名";
  const seedText = `${finalName}|${width}x${height}|${(decoded.rows || []).join("")}`;
  const imported = {
    id: newLibraryId("custom"),
    name: finalName,
    size: decoded.size,
    width,
    height,
    rows: decoded.rows,
    sourceRows: decoded.rows,
    sourceSize: decoded.size,
    sourceWidth: width,
    sourceHeight: height,
    craft: decoded.craft || state.craft,
    note: pickCustomPatternNote("imported", decoded.size, seedText),
  };
  // Persist into the 图纸库 (many can coexist now) and open it for beading.
  addToLibrary(imported);
  galleryActions.loadPattern(imported, false);
  state.patternsDirty = true;
  galleryActions.uiRenderUI();
  showToast(`已导入图纸：${width}x${height}。`);
  return imported;
}

export async function requestCloudShareForPattern(pattern, options = {}) {
  const patternCode = encodePatternCode(pattern);
  return requestShareApi("/api/share/create", { name: pattern.name, patternCode }, options);
}

async function createCloudShareForPattern(pattern) {
  try {
    const share = await requestCloudShareForPattern(pattern);
    if (share?.shortId) {
      // Keep the shared string self-describing: 【title】+short code, matching the
      // draw studio. The title rides along server-side as `name` already.
      const title = String(pattern?.name || "").trim().slice(0, 10);
      const display = title ? `【${title}】${share.shortId}` : share.shortId;
      await autoCopyText(
        display,
        `分享码已复制：${display}`,
        `分享码已生成：${display}（复制失败，请手动复制）`,
      );
    }
    return share;
  } catch {
    showToast("服务器繁忙，请稍后再试。");
    return null;
  }
}

export async function createCloudShare() {
  return createCloudShareForPattern(state.selectedPattern);
}

export function submitCurrentToGallery() {
  try {
    openGallerySubmitModal({
      name: state.selectedPattern?.name || "自定义图纸",
      patternCode: encodePatternCode(state.selectedPattern),
    });
  } catch {
    showToast("当前图纸无法投稿。");
  }
}

export async function importPatternCode(raw) {
  const shortId = extractCloudShortId(raw);
  if (!shortId) {
    showToast("分享码无效。");
    return false;
  }
  try {
    const share = await requestShareApi("/api/share/open", { shortId });
    const decoded = decodePatternCode(share.patternCode, { name: share.name });
    applyImportedPattern(decoded, share.name || "导入图纸");
    return true;
  } catch {
    showToast("分享码无效或已过期。");
    return false;
  }
}
