// Shared tiny utilities used across modules (extracted to avoid duplication).

export function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export function prefersReducedMotion() {
  return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
}

export function beadSettleScale(elapsed, duration = 180, reducedMotion = false) {
  if (reducedMotion) return 1;
  const safeDuration = Math.max(1, Number(duration) || 180);
  const t = Math.max(0, Math.min(1, (Number(elapsed) || 0) / safeDuration));
  const eased = 1 - Math.pow(1 - t, 4);
  return 0.72 + (1 - 0.72) * eased;
}

// ─── Text / hash utilities ────────────────────────────────────────────────────

/** FNV-1a 32-bit hash — fast, deterministic, no crypto dependency. */
export function stableHash(text) {
  const source = String(text || "");
  let hash = 2166136261 >>> 0;
  for (let i = 0; i < source.length; i += 1) {
    hash ^= source.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function pickWeightedText(entries, fallback = "", seedText = "") {
  if (!Array.isArray(entries) || !entries.length) return fallback;
  const normalized = entries
    .map((entry) => ({ text: String(entry?.text || ""), weight: Number(entry?.weight) > 0 ? Number(entry.weight) : 0 }))
    .filter((entry) => entry.text && entry.weight > 0);
  if (!normalized.length) return fallback;
  const total = normalized.reduce((sum, entry) => sum + entry.weight, 0);
  const ratio = (stableHash(seedText) + 0.5) / 4294967296;
  let cursor = ratio * total;
  for (let i = 0; i < normalized.length; i += 1) {
    cursor -= normalized[i].weight;
    if (cursor <= 0) return normalized[i].text;
  }
  return normalized[normalized.length - 1].text || fallback;
}

const sharedNotes = [
  { text: "这张图可以直接开拼", weight: 30 },
  { text: "今天就做这张吧", weight: 24 },
  { text: "看着就想开工", weight: 18 },
  { text: "先收着，晚点拼", weight: 14 },
  { text: "配色看着很顺眼", weight: 10 },
  { text: "这张有点上头", weight: 4 },
];

const customPatternNotePool = {
  draw: [
    { text: "手绘完成，准备开拼", weight: 40 },
    { text: "自己画的，越看越顺眼", weight: 35 },
    { text: "刚画完，手感正热", weight: 25 },
    ...sharedNotes,
  ],
  image: [
    { text: "图片转好了，直接开拼", weight: 45 },
    { text: "这张转出来还不错", weight: 35 },
    { text: "配色已经整理好", weight: 20 },
    ...sharedNotes,
  ],
  imported: [
    { text: "分享码导入成功", weight: 45 },
    { text: "新图纸已就位", weight: 35 },
    { text: "这张先放到待拼", weight: 20 },
    ...sharedNotes,
  ],
};

export function pickCustomPatternNote(kind = "generic", size = 0, seedText = "") {
  const pool = customPatternNotePool[kind]
    || [...customPatternNotePool.draw, ...customPatternNotePool.image, ...customPatternNotePool.imported];
  const fallbackSize = Number(size);
  const fallback = Number.isFinite(fallbackSize) && fallbackSize > 0
    ? `自定义图纸 ${fallbackSize}x${fallbackSize}`
    : "自定义图纸";
  return pickWeightedText(pool, fallback, seedText);
}
