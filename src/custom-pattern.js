import { patterns } from './patterns-data.js';
import { state } from './state.js';
import { els } from './dom.js';
import { clamp } from './color-utils.js';
import { loadImageFromDataUrl, convertImageToPattern } from './image-convert.js';
import {
  baseIdFor, findBasePattern, invalidatePatternDataCaches,
  isCustomFromImagePattern, normalizePatternSize,
} from './pattern.js';
import { setSizeControls as uiSetSizeControls } from './ui.js';
import { showToast } from './notify.js';
import { pickCustomPatternNote } from './utils.js';

const customPatternActions = {
  loadPattern: () => {},
};

export function setCustomPatternActions(actions = {}) {
  Object.assign(customPatternActions, actions);
}

function normalizedCustomDenoiseLevel(value) {
  return clamp(Math.round(Number(value) || 0), 0, 100);
}

export function setCustomDenoiseControls(level) {
  const normalized = normalizedCustomDenoiseLevel(level);
  state.customDenoiseLevel = normalized;
  if (els.customDenoiseSlider) els.customDenoiseSlider.value = String(normalized);
  if (els.customDenoiseValue) els.customDenoiseValue.textContent = `${normalized}%`;
  return normalized;
}

async function reconvertCustomPatternAtSize(basePattern, size, keepPhase = false) {
  try {
    const image = await loadImageFromDataUrl(basePattern.sourceImageDataUrl);
    const removeWhite = basePattern.sourceRemoveWhite !== false;
    const denoiseLevel = normalizedCustomDenoiseLevel(basePattern.sourceDenoiseLevel ?? state.customDenoiseLevel);
    const result = convertImageToPattern(image, { removeWhite, size, denoiseLevel });
    const rows = result.rows;
    const beadCount = rows.join("").replace(/\./g, "").length;
    if (!beadCount) {
      showToast("这个尺寸下识别不到可用豆子。");
      return;
    }
    const updated = {
      ...basePattern,
      size,
      rows,
      sourceRows: rows,
      sourceSize: size,
      sourceDenoiseLevel: denoiseLevel,
      conversionStats: result.stats,
      note: pickCustomPatternNote(
        "image",
        size,
        basePattern.sourceImageDataUrl || `${size}|${rows.join("")}`,
      ),
    };
    invalidatePatternDataCaches(updated);
    const idx = patterns.findIndex((item) => baseIdFor(item) === baseIdFor(basePattern));
    if (idx >= 0) patterns[idx] = updated;
    state.lastConversionStats = result.stats;
    customPatternActions.loadPattern(updated, keepPhase);
    showToast(`已按 ${size}x${size} 重新识别图片图纸。`);
  } catch (error) {
    showToast("图片重新识别失败。");
  }
}

function handleCustomImage(event) {
  const file = event.target.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = async () => {
    try {
      const sourceImageDataUrl = String(reader.result || "");
      const image = await loadImageFromDataUrl(sourceImageDataUrl);
      const size = normalizePatternSize();
      const removeWhite = els.customWhiteToggle.checked;
      const denoiseLevel = setCustomDenoiseControls(els.customDenoiseSlider?.value ?? state.customDenoiseLevel);
      uiSetSizeControls(size);
      // Yield a frame so the "正在识别图片…" toast paints before the
      // synchronous conversion (which can briefly block on large images).
      await new Promise((resolve) => setTimeout(resolve, 16));
      const result = convertImageToPattern(image, {
        removeWhite,
        size,
        denoiseLevel,
      });
      const rows = result.rows;
      const beadCount = rows.join("").replace(/\./g, "").length;
      if (!beadCount) {
        showToast("这张图转换后没有可用豆子。");
        return;
      }
      const pattern = {
        id: "custom-user",
        name: "自定义图纸",
        size,
        craft: "原版",
        rows,
        sourceRows: rows,
        sourceSize: size,
        sourceImageDataUrl,
        sourceRemoveWhite: removeWhite,
        sourceDenoiseLevel: denoiseLevel,
        conversionStats: result.stats,
        note: pickCustomPatternNote("image", size, sourceImageDataUrl),
      };
      state.lastConversionStats = result.stats;
      for (let i = patterns.length - 1; i >= 0; i -= 1) {
        if (patterns[i].id.startsWith("custom-")) patterns.splice(i, 1);
      }
      patterns.unshift(pattern);
      customPatternActions.loadPattern(pattern);
      showToast(`自定义图纸已生成：${result.stats.total}颗 / ${result.stats.colors.length}色。`);
    } catch (error) {
      showToast("图片读取失败。");
    } finally {
      event.target.value = "";
    }
  };
  reader.onerror = () => {
    showToast("图片读取失败。");
    event.target.value = "";
  };
  showToast("正在识别图片…");
  reader.readAsDataURL(file);
}

export function initCustomPatternEvents() {
  let customDenoiseTimer = null;
  els.customDenoiseSlider?.addEventListener("input", () => {
    const level = setCustomDenoiseControls(els.customDenoiseSlider.value);
    const current = state.selectedPattern;
    if (!isCustomFromImagePattern(current)) return;
    if (customDenoiseTimer) window.clearTimeout(customDenoiseTimer);
    customDenoiseTimer = window.setTimeout(() => {
      const base = findBasePattern(current);
      base.sourceDenoiseLevel = level;
      reconvertCustomPatternAtSize(base, current.size, state.phase !== "choose");
    }, 140);
  });
  els.customDenoiseSlider?.addEventListener("change", () => {
    const level = setCustomDenoiseControls(els.customDenoiseSlider.value);
    const current = state.selectedPattern;
    if (!isCustomFromImagePattern(current)) return;
    if (customDenoiseTimer) {
      window.clearTimeout(customDenoiseTimer);
      customDenoiseTimer = null;
    }
    const base = findBasePattern(current);
    base.sourceDenoiseLevel = level;
    reconvertCustomPatternAtSize(base, current.size, state.phase !== "choose");
  });
  els.customImageInput?.addEventListener("change", handleCustomImage);
}
