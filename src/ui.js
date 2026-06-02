import { state } from './state.js';
import { palette, beadIds } from './palette.js';
import { phases, toolStyles, craftOptions } from './constants.js';
import { patterns } from './patterns-data.js';
import {
  allColorCodes, beadLabel, getTargetCounts, getTargetTotal, getSourceCounts,
  getPatternColors, getPatternAnalysis, getPlacedCounts, getSourcePatternColors,
  getEffectivePatternResult, normalizeCraft, findCustomPattern, resizePattern,
  baseIdFor,
} from './pattern.js';
import { showToast, hidePlaceHint, showPlaceHint } from './notify.js';
import {
  markDirty, setupHiDpiCanvas, updateInspectAssistCanvases,
  inspectionSummary, placementAccuracy, scoreLabel, finalGrade, placedCount,
  needleCapacity, statusText,
  useMobileDirectPlacement,
} from './render.js';
import { els, sideReferenceCanvas, sideReferenceCtx, previewCanvas } from './dom.js';
import { escapeHtml, prefersReducedMotion } from './utils.js';

let uiActions = {
  getCollection: () => [],
  updateCollection: () => {},
  loadPattern: () => {},
  setPhase: () => {},
  openRemapModal: () => {},
  setPatternColorMapping: () => {},
  resetPatternColorMapping: () => {},
  pourSelectedColor: () => {},
  clearBoard: () => {},
  startIroning: () => {},
  pressFlat: () => {},
  flipAndIron: () => {},
  completeWork: () => {},
  saveCurrentWork: () => {},
  openShareModal: () => {},
  openCollectionEntry: () => {},
  exportShareImage: () => {},
  copyShareText: () => {},
  createCloudShare: async () => null,
  importPatternCode: async () => false,
  openImportCodeModal: () => {},
  submitCurrentToGallery: () => {},
};

export function setUIActions(nextActions = {}) {
  uiActions = { ...uiActions, ...nextActions };
}

export function setSizeControls(size) {
  const normalized = Number(size);
  if (els.patternSizeSlider) {
    els.patternSizeSlider.value = String(normalized);
    const min = Number(els.patternSizeSlider.min) || 12;
    const max = Number(els.patternSizeSlider.max) || 100;
    const progress = Math.max(0, Math.min(1, (normalized - min) / Math.max(1, max - min)));
    els.patternSizeSlider.style.setProperty("--size-progress", `${Math.round(progress * 100)}%`);
  }
  if (els.patternSizeValue) els.patternSizeValue.textContent = String(normalized);
  if (els.customSizeMeta) els.customSizeMeta.textContent = `${normalized}x${normalized}`;
}


let patternColorStatsRenderKey = "";
export function renderPatternColorStats() {
  if (!els.patternColorStats) return;
  const sourceCounts = getSourceCounts();
  const map = state.patternColorMap || {};
  const activeCodes = new Set(allColorCodes());
  const items = Object.entries(sourceCounts)
    .map(([sourceCode, count]) => {
      const targetCode = activeCodes.has(map[sourceCode]) ? map[sourceCode] : sourceCode;
      return { sourceCode, targetCode, count };
    })
    .sort((a, b) => b.count - a.count || (beadIds[a.targetCode] || a.targetCode).localeCompare(beadIds[b.targetCode] || b.targetCode, "zh-Hans-CN", { numeric: true }))
    .slice(0, 10);
  const key = items.map((item) => `${item.sourceCode}:${item.targetCode}:${item.count}`).join("|");
  if (key === patternColorStatsRenderKey) return;
  patternColorStatsRenderKey = key;
  els.patternColorStats.innerHTML = items.map((item) => `
      <button type="button" class="pattern-color-chip" data-source-code="${item.sourceCode}" title="点击换色：${beadIds[item.targetCode] || item.targetCode}" aria-label="换色 ${beadIds[item.targetCode] || item.targetCode}">
        <span class="dot" style="background:${palette[item.targetCode]}"></span>
        <span class="code">${beadIds[item.targetCode] || item.targetCode}</span>
        <span class="count">${item.count}</span>
      </button>
    `).join("");
  els.patternColorStats.querySelectorAll(".pattern-color-chip[data-source-code]").forEach((button) => {
    button.addEventListener("click", () => {
      const sourceCode = button.getAttribute("data-source-code");
      if (sourceCode) uiActions.openRemapModal(sourceCode);
    });
  });
}

let sidebarReferenceRenderKey = "";
export function renderSidebarReference() {
  if (!els.sideReference || !sideReferenceCanvas || !sideReferenceCtx) return;
  const visible = state.phase !== "choose";
  els.sideReference.hidden = !visible;
  if (!visible) {
    sidebarReferenceRenderKey = "hidden";
    return;
  }

  const pattern = state.selectedPattern;
  const size = pattern.size;
  const ctx = sideReferenceCtx;
  const rect = sideReferenceCanvas.getBoundingClientRect();
  const cssW = Math.max(1, Math.round(rect.width || 300));
  const cssH = Math.max(1, Math.round(rect.height || cssW));
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const pixelW = Math.max(1, Math.round(cssW * dpr));
  const pixelH = Math.max(1, Math.round(cssH * dpr));
  const effective = getEffectivePatternResult(pattern);
  const key = `${baseIdFor(pattern)}:${effective.key}:${cssW}x${cssH}:${dpr}`;
  if (key === sidebarReferenceRenderKey) return;
  sidebarReferenceRenderKey = key;
  if (sideReferenceCanvas.width !== pixelW || sideReferenceCanvas.height !== pixelH) {
    sideReferenceCanvas.width = pixelW;
    sideReferenceCanvas.height = pixelH;
  }
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, pixelW, pixelH);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  const w = cssW;
  const h = cssH;
  const cell = Math.max(2, Math.floor(Math.min((w - 24) / size, (h - 24) / size)));
  const gridSize = cell * size;
  const x0 = Math.floor((w - gridSize) / 2);
  const y0 = Math.floor((h - gridSize) / 2);
  const rows = effective.rows;

  ctx.fillStyle = "#f7f9fc";
  ctx.fillRect(0, 0, w, h);
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(x0 - 6, y0 - 6, gridSize + 12, gridSize + 12);
  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      ctx.strokeStyle = "rgba(100, 109, 126, 0.16)";
      ctx.lineWidth = 1;
      ctx.strokeRect(x0 + x * cell, y0 + y * cell, cell, cell);
      const code = rows[y]?.[x] || ".";
      if (code === ".") continue;
      ctx.fillStyle = palette[code];
      ctx.fillRect(x0 + x * cell + 0.5, y0 + y * cell + 0.5, Math.max(1, cell - 1), Math.max(1, cell - 1));
    }
  }
  ctx.strokeStyle = "rgba(79, 92, 116, 0.32)";
  ctx.lineWidth = 1.2;
  ctx.strokeRect(x0 - 6, y0 - 6, gridSize + 12, gridSize + 12);

  if (els.sideReferenceMeta) {
    els.sideReferenceMeta.textContent = `${pattern.name} · ${size}x${size}`;
  }
  if (els.sideReferenceLegend) {
    const counts = getTargetCounts(pattern);
    const list = Object.entries(counts)
      .sort((a, b) => b[1] - a[1] || (beadIds[a[0]] || a[0]).localeCompare(beadIds[b[0]] || b[0], "zh-Hans-CN", { numeric: true }))
      .slice(0, 8);
    els.sideReferenceLegend.innerHTML = list.map(([code, count]) => `
        <span class="side-reference-chip">
          <i style="background:${palette[code]}"></i>
          <b>${beadIds[code] || code}</b>
          <em>${count}</em>
        </span>
      `).join("");
  }
}

export function renderPatterns() {
  els.patternList.innerHTML = "";
  const customPattern = findCustomPattern();

  const importRow = document.createElement("div");
  importRow.className = "pattern-import-row";

  const imageButton = document.createElement("button");
  imageButton.className = `pattern-import-half${customPattern && state.selectedPattern.id.startsWith("custom-") ? " active" : ""}`;
  imageButton.type = "button";
  imageButton.textContent = "导入图片";
  imageButton.addEventListener("click", () => els.customImageInput?.click());

  const codeButton = document.createElement("button");
  codeButton.className = "pattern-import-half";
  codeButton.type = "button";
  codeButton.textContent = "导入短码";
  codeButton.addEventListener("click", () => {
    uiActions.openImportCodeModal();
  });

  importRow.appendChild(imageButton);
  importRow.appendChild(codeButton);
  els.patternList.appendChild(importRow);

  patterns.forEach((pattern) => {
    const isCustom = pattern.id.startsWith("custom-");
    const displayPattern = isCustom ? pattern : resizePattern(pattern, state.patternSize);
    const safePatternName = escapeHtml(pattern.name);
    const safePatternMeta = escapeHtml(displayPattern.note || `${displayPattern.size}x${displayPattern.size}`);
    const button = document.createElement("button");
    button.className = `pattern-card${baseIdFor(state.selectedPattern) === pattern.id ? " active" : ""}`;
    button.type = "button";
    button.innerHTML = `
        <canvas class="pattern-thumb" width="58" height="58" aria-hidden="true"></canvas>
        <span><strong>${safePatternName}</strong><span>${safePatternMeta}</span></span>
      `;
    button.addEventListener("click", () => {
      uiActions.loadPattern(displayPattern, state.phase !== "choose");
      if (state.phase !== "choose") uiActions.setPhase("place");
      showToast(`已换成 ${pattern.name}`);
    });
    els.patternList.appendChild(button);
    drawPatternThumb(button.querySelector("canvas"), displayPattern);
  });
}

export function drawPatternThumb(canvas, pattern) {
  const dpr = Math.min(3, Math.max(1, window.devicePixelRatio || 1));
  const cssSize = canvas.clientWidth || Number(canvas.getAttribute("width")) || 58;
  const dim = Math.round(cssSize * dpr);
  if (canvas.width !== dim || canvas.height !== dim) {
    canvas.width = dim;
    canvas.height = dim;
  }
  const ctx = canvas.getContext("2d");
  const cell = dim / pattern.size;
  const rows = pattern.rows || [];
  ctx.clearRect(0, 0, dim, dim);
  ctx.fillStyle = "#f4f6f8";
  ctx.fillRect(0, 0, dim, dim);
  rows.forEach((row, y) => {
    [...row].forEach((code, x) => {
      if (code === ".") return;
      const px = Math.round(x * cell);
      const py = Math.round(y * cell);
      const pw = Math.round((x + 1) * cell) - px;
      const ph = Math.round((y + 1) * cell) - py;
      ctx.fillStyle = palette[code];
      ctx.fillRect(px, py, pw, ph);
    });
  });
}

export function drawCustomPatternPlaceholder(canvas) {
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#f3f6fa";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = "rgba(128, 140, 156, 0.46)";
  ctx.lineWidth = 1;
  ctx.strokeRect(6.5, 6.5, canvas.width - 13, canvas.height - 13);
  ctx.strokeStyle = "rgba(102, 116, 134, 0.72)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(canvas.width / 2, 18);
  ctx.lineTo(canvas.width / 2, canvas.height - 18);
  ctx.moveTo(18, canvas.height / 2);
  ctx.lineTo(canvas.width - 18, canvas.height / 2);
  ctx.stroke();
}

function schedulePhaseViewportReset() {
  state.pendingPageReset = true;
}

function resetPhaseViewport() {
  const reset = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  };
  reset();
  window.requestAnimationFrame(() => {
    reset();
    window.requestAnimationFrame(reset);
  });
  window.setTimeout(reset, 120);
}

export function renderPhases() {
  if (!els.workflowProgress) return;
  const activeIndex = phases.findIndex((phase) => phase.id === state.phase);
  els.workflowProgress.innerHTML = "";
  phases.forEach((phase, index) => {
    if (index > 0) {
      const sep = document.createElement("span");
      sep.className = "workflow-sep";
      sep.setAttribute("aria-hidden", "true");
      els.workflowProgress.appendChild(sep);
    }
    const item = document.createElement("button");
    item.type = "button";
    item.className = `workflow-step${index === activeIndex ? " active" : ""}${index < activeIndex ? " done" : ""}`;
    item.setAttribute("aria-label", `${index + 1} ${phase.name}`);
    item.innerHTML = `<span class="step-dot">${index + 1}</span><span>${phase.name}</span>`;
    item.disabled = index >= activeIndex;
    item.addEventListener("click", () => {
      if (index >= activeIndex) return;
      const target = phase.id;
      if (target === "choose") {
        if (
          (placedCount() > 0 || state.fusedPieces.length > 0) &&
          !window.confirm("回到选图会离开当前作品的进度，确定吗？")
        ) {
          return;
        }
        uiActions.setPhase("choose");
        return;
      }
      const losesFused =
        state.fusedPieces.length > 0 &&
        (target === "place" || target === "inspect" || target === "iron");
      if (losesFused && !window.confirm("回退到该步会清除已熨烫/冷却的结果，确定吗？")) {
        return;
      }
      uiActions.setPhase(target);
    });
    els.workflowProgress.appendChild(item);
  });
  if (state.pendingWorkflowScroll) {
    state.pendingWorkflowScroll = false;
    scrollActiveWorkflowStep();
  }
  if (state.pendingPageReset) {
    state.pendingPageReset = false;
    resetPhaseViewport();
  }
}

export function scrollActiveWorkflowStep() {
  const activeStep = els.workflowProgress?.querySelector(".workflow-step.active");
  if (!activeStep) return;
  window.requestAnimationFrame(() => {
    activeStep.scrollIntoView({
      block: "nearest",
      inline: "center",
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    });
  });
}

export function renderCurrentPatternChip() {
  if (!els.currentPatternChip) return;
  const visible = state.phase !== "choose";
  els.currentPatternChip.dataset.visible = visible ? "true" : "false";
  if (!visible) return;
  if (els.currentPatternName) els.currentPatternName.textContent = state.selectedPattern.name;
  if (els.currentPatternMeta) {
    const counts = getTargetCounts();
    const colorCount = Object.keys(counts).length;
    els.currentPatternMeta.textContent = `${state.selectedPattern.size}×${state.selectedPattern.size} · ${getTargetTotal()}颗 · ${colorCount}色`;
  }
  if (els.currentPatternThumb) {
    drawPatternThumb(els.currentPatternThumb, state.selectedPattern);
  }
}

export function renderControls() {
  els.stageControls.innerHTML = "";
  els.controlTitle.textContent = phases.find((phase) => phase.id === state.phase)?.name || "工具台";
  els.toolMeta.textContent = state.phase === "place" && !useMobileDirectPlacement()
    ? (state.tool === "needle"
      ? "豆针"
      : `镊子${state.tweezerBead ? ` · ${beadIds[state.tweezerBead]}` : " · 空夹"}`)
    : "";

  if (state.phase === "choose") {
    return;
  }

  if (state.phase === "place") {
    const placeHintText = state.spill
      ? "有一颗豆子倒下来卡住了。你可以先继续摆放，熨烫前记得处理。"
      : (useMobileDirectPlacement()
        ? "从豆盒选颜色，点格子放置或替换；同色再点一次会取下。"
        : (state.tool === "needle"
        ? `点击豆盒倒豆进筛；点豆筛某条槽给豆针上豆（最多 ${needleCapacity()} 颗）。`
        : (state.tweezerBead ? `镊子正夹着 ${beadLabel(state.tweezerBead)}，点击空格放下。` : "镊子可从豆筛点取一颗，或从板面夹起一颗再放下。")));
    const placeHintKey = state.spill
      ? `spill:${state.spill.index}:${state.spill.code}`
      : (useMobileDirectPlacement()
        ? `mobile:${state.selectedColor}`
        : `${state.tool}:${state.trayColor || "-"}:${state.trayBeans}:${state.needleLoaded}:${state.tweezerBead || "-"}`);
    showPlaceHint(placeHintText, placeHintKey);
    addButton("检查作品", "primary-button", () => uiActions.setPhase("inspect"));
    addButton("清空板面", "danger-text-button", () => uiActions.clearBoard?.());
    return;
  }

  if (state.phase === "inspect") {
    const summary = inspectionSummary();
    addHint(state.sandboxMode
      ? "沙盒模式不做漏放/错色校验，可直接进入熨烫。"
      : `漏放 ${summary.missing}，错色 ${summary.wrong}，多放 ${summary.extra}。`);
    if (state.spill) {
      addHint("还有倒下的豆子没夹起。继续熨烫会把这颗豆糊在板面上。");
    }
    const hintsOn = state.showHints;
    addControlRow([
      [hintsOn ? "隐藏提示" : "显示提示", `inspect-action-btn ${hintsOn ? "active" : ""}`, () => {
        state.showHints = !state.showHints;
        markDirty();
      }, false, {
        icon: hintsOn
          ? '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3l18 18"/><path d="M9.88 5.07A11 11 0 0 1 12 5c5.5 0 9.27 4.07 10 7-0.42 1.66-1.66 3.6-3.5 5.06"/><path d="M6.13 6.13C4.06 7.62 2.59 9.79 2 12c0.73 2.93 4.5 7 10 7 1.7 0 3.27-0.38 4.66-1"/><path d="M10.59 10.59A2 2 0 0 0 13.41 13.41"/></svg>'
          : '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg>',
        ariaLabel: hintsOn ? "隐藏提示" : "显示提示",
        title: hintsOn ? "隐藏提示" : "显示提示",
      }],
      ["返回修正", "inspect-action-btn", () => uiActions.setPhase("place"), false, {
        icon: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 14 4 9 9 4"/><path d="M20 20v-7a4 4 0 0 0-4-4H4"/></svg>',
        ariaLabel: "返回修正",
        title: "返回修正",
      }],
    ], "control-row-icons");
    if (state.spill) {
      addControlRow([
        ["先去夹起", "", () => uiActions.setPhase("place")],
        ["仍然熨烫", "danger-button", () => uiActions.startIroning(true)],
      ]);
    } else {
      addButton("盖纸熨烫", "primary-button", () => uiActions.startIroning(false), !state.sandboxMode && state.errors.length > 0 && placementAccuracy() < 0.72);
    }
    if (!state.sandboxMode && state.errors.length > 0 && placementAccuracy() < 0.72) {
      addHint("误差较多，建议先修正再熨烫。");
    }
    return;
  }

  if (state.phase === "iron") {
    addHint("按住并移动熨斗，慢一点、稳一点，让豆子刚好粘连。");
    addControlRow([
      ["查看检查", "", () => uiActions.setPhase("inspect")],
      ["进入冷却", "primary-button", () => uiActions.setPhase("cool")],
    ]);
    return;
  }

  if (state.phase === "cool") {
    addHint("冷却过程中压平可以减少翘曲。等它慢慢稳下来再取下作品。");
    addControlRow([
      ["压平", "", () => uiActions.pressFlat()],
      ["翻面再熨", "", () => uiActions.flipAndIron(), state.flipCount >= 1],
    ]);
    addButton("完成收藏", "primary-button", () => uiActions.completeWork());
    if (state.cooling < 78) addHint("提前取下也能完成，但冷却不足会影响最终评级。");
    return;
  }

  if (state.phase === "finish") {
    if (state.conceptEaster) {
      const full = state.conceptEasterType === "full";
      addHint(full ? "满板彩蛋已解锁。" : "空板彩蛋已解锁。");
      addHint(`隐藏成就：${full ? "满板" : "空板"}`);
      addControlRow([
        ["保存作品", "primary-button", () => uiActions.saveCurrentWork()],
        ["再做一张", "", () => {
          uiActions.loadPattern(state.selectedPattern);
          uiActions.setPhase("choose");
        }],
      ]);
      addButton("分享小红书", "", () => uiActions.openShareModal());
      return;
    }
    addCraftToggle();
    addHint(`评级 ${finalGrade()}。可以换一种成品形式后再次保存。`);
    addControlRow([
      ["保存作品", "primary-button", () => uiActions.saveCurrentWork()],
      ["再做一张", "", () => {
        uiActions.loadPattern(state.selectedPattern);
        uiActions.setPhase("choose");
      }],
    ]);
    addButton("分享小红书", "", () => uiActions.openShareModal());
  }
}

export function addButton(label, className, handler, disabled = false) {
  const button = document.createElement("button");
  button.type = "button";
  button.textContent = label;
  button.className = className || "";
  button.disabled = disabled;
  button.addEventListener("click", handler);
  els.stageControls.appendChild(button);
}

export function addControlRow(items, extraClass = "") {
  const row = document.createElement("div");
  row.className = `control-row ${extraClass}`.trim();
  items.forEach((entry) => {
    const button = document.createElement("button");
    button.type = "button";
    const [label, className, handler, disabled, options] = entry;
    const opts = options || {};
    if (opts.icon && label) {
      button.innerHTML = `<span class="btn-glyph" aria-hidden="true">${opts.icon}</span><span class="btn-label">${label}</span>`;
      button.classList.add("icon-text-button");
    } else if (opts.icon) {
      button.innerHTML = `<span class="btn-glyph" aria-hidden="true">${opts.icon}</span>`;
      button.classList.add("icon-only-button");
    } else {
      button.textContent = label;
    }
    if (opts.title) button.title = opts.title;
    if (opts.ariaLabel) button.setAttribute("aria-label", opts.ariaLabel);
    button.className = `${button.className} ${className || ""}`.trim();
    button.disabled = Boolean(disabled);
    button.addEventListener("click", handler);
    row.appendChild(button);
  });
  els.stageControls.appendChild(row);
}

export function addHint(text) {
  const box = document.createElement("div");
  box.className = "hint-box";
  box.textContent = text;
  els.stageControls.appendChild(box);
}

export function addToolToggle() {
  const wrap = document.createElement("div");
  wrap.className = "tool-toggle";
  [
    ["needle", "针工具"],
    ["tweezers", "镊子"],
  ].forEach(([tool, label]) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = label;
    button.className = state.tool === tool ? "active" : "";
    button.addEventListener("click", () => {
      state.tool = tool;
      markDirty();
    });
    wrap.appendChild(button);
  });
  els.stageControls.appendChild(wrap);
}

export function addSlider(label, key, min, max, value, onChange) {
  const field = document.createElement("div");
  field.className = "slider-field";
  field.innerHTML = `<label><span>${label}</span><strong>${value}</strong></label>`;
  const input = document.createElement("input");
  input.type = "range";
  input.min = min;
  input.max = max;
  input.value = value;
  input.addEventListener("input", () => {
    onChange(input.value);
    field.querySelector("strong").textContent = input.value;
  });
  field.appendChild(input);
  els.stageControls.appendChild(field);
}

export function addCraftToggle() {
  const wrap = document.createElement("div");
  wrap.className = "craft-toggle";
  craftOptions.forEach((craft) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = craft;
    button.className = state.craft === craft ? "active" : "";
    button.addEventListener("click", () => {
      state.craft = craft;
      state.savedCurrent = false;
      markDirty();
    });
    wrap.appendChild(button);
  });
  els.stageControls.appendChild(wrap);
}

export function renderToolRack() {
  if (!els.toolRack) return;
  if (state.phase !== "place") {
    els.toolRack.innerHTML = "";
    return;
  }
  const trayLabel = state.trayColor ? beadIds[state.trayColor] : "空";
  const needleCap = needleCapacity();
  const needleSlots = Array.from({ length: needleCap }, (_, i) => i < state.needleLoaded ? state.trayColor : null);
  const tweezerSlots = [state.tweezerBead];
  const needleFoot = state.trayColor
    ? `豆筛 ${trayLabel} · 剩余 ${state.trayBeans}`
    : "先倒入一种颜色，再从豆筛取豆";
  const needleFootText = state.spill ? "先用镊子夹起卡住豆" : needleFoot;
  const tweezerFoot = state.tweezerBead
    ? `夹着 ${beadIds[state.tweezerBead]}`
    : `从豆盒夹一颗 ${beadIds[state.selectedColor]}`;
  els.toolRack.innerHTML = `
      <button type="button" class="tool-card${state.tool === "needle" ? " active" : ""}" data-tool="needle">
        <div class="tool-head"><span>豆针</span></div>
        ${renderBeadStrip(needleSlots)}
        <div class="tool-foot">${needleFootText}</div>
      </button>
      <button type="button" class="tool-card${state.tool === "tweezers" ? " active" : ""}" data-tool="tweezers">
        <div class="tool-head"><span>镊子</span><span class="tool-count">${state.tweezerBead ? "1/1" : "0/1"}</span></div>
        ${renderBeadStrip(tweezerSlots)}
        <div class="tool-foot">${tweezerFoot}</div>
      </button>
    `;
  els.toolRack.querySelectorAll("[data-tool]").forEach((button) => {
    button.addEventListener("click", () => {
      const tool = button.getAttribute("data-tool");
      if (!tool || state.tool === tool) return;
      state.tool = tool;
      markDirty();
    });
  });
}

export function renderBeadStrip(codes) {
  return `
      <div class="bead-strip" style="grid-template-columns: repeat(${Math.max(1, codes.length)}, minmax(0, 1fr));">
        ${codes.map((code) => `
          <span class="bead-slot${code ? " loaded" : ""}" style="${code ? `background:${palette[code]};` : ""}"></span>
        `).join("")}
      </div>
    `;
}

let paletteRenderKey = "";
export function renderPalette() {
  if (state.phase === "inspect") {
    els.colorPalette.classList.add("inspect-mode");
    renderInspectAssistPanel();
    paletteRenderKey = "inspect";
    return;
  }
  els.colorPalette.classList.remove("inspect-mode");
  if (state.phase !== "place") {
    if (paletteRenderKey !== `phase:${state.phase}`) {
      els.colorPalette.innerHTML = "";
      paletteRenderKey = `phase:${state.phase}`;
    }
    return;
  }
  const isMobile = useMobileDirectPlacement();
  const counts = getTargetCounts();
  const placedCounts = getPlacedCounts();
  const allCodes = allColorCodes();
  const codes = isMobile ? allCodes.filter((code) => (counts[code] || 0) > 0) : allCodes;
  const key = ["place", isMobile ? "m" : "d", state.selectedColor, state.tweezerBead || "", state.placedVersion, getPatternAnalysis().key].join(":");
  if (key === paletteRenderKey) return;
  paletteRenderKey = key;
  els.colorPalette.innerHTML = "";
  codes.forEach((code) => {
    const placed = placedCounts[code] || 0;
    const needed = counts[code] || 0;
    const inPattern = needed > 0;
    const remaining = Math.max(0, needed - placed);
    const isSelected = state.selectedColor === code;
    const button = document.createElement("button");
    const isHeld = !isMobile && state.tweezerBead === code;
    button.className = `color-chip${isSelected ? " active" : ""}${inPattern && !isMobile ? " needed" : ""}${isHeld ? " held" : ""}`;
    button.type = "button";
    button.title = `${beadLabel(code)}：${placed}/${needed}`;
    const isTransparent = beadIds[code] === "H1";
    button.innerHTML = `
        <span class="swatch${isTransparent ? " is-transparent" : ""}" style="${isTransparent ? "" : `background:${palette[code]}`}"></span>
        <span class="chip-label">${beadIds[code] || code}</span>
        ${inPattern && isSelected ? `<span class="chip-count">${remaining}</span>` : ""}
      `;
    button.addEventListener("click", () => {
      state.selectedColor = code;
      if (state.phase === "place" && !isMobile) uiActions.pourSelectedColor?.();
      markDirty();
    });
    els.colorPalette.appendChild(button);
  });
}

export function updateSelectedPaletteCount() {
  if (!els.colorPalette || state.phase !== "place") return;
  const chip = els.colorPalette.querySelector(".color-chip.active");
  if (!chip) return;
  const counts = getTargetCounts();
  const placedCounts = getPlacedCounts();
  const placed = placedCounts[state.selectedColor] || 0;
  const needed = counts[state.selectedColor] || 0;
  const remaining = Math.max(0, needed - placed);
  chip.title = `${beadLabel(state.selectedColor)}：${placed}/${needed}`;
  const count = chip.querySelector(".chip-count");
  if (count) count.textContent = String(remaining);
}

export function renderInspectAssistPanel() {
  if (!els.colorPalette) return;
  if (!els.colorPalette.querySelector(".inspect-assist")) {
    els.colorPalette.innerHTML = `
        <div class="inspect-assist">
          <section class="inspect-card">
            <div class="inspect-card-head">
              <strong>局部放大镜</strong>
              <span>查看当前孔位与邻域</span>
            </div>
            <canvas class="inspect-canvas inspect-zoom" width="360" height="212" aria-label="局部放大镜"></canvas>
          </section>
          <section class="inspect-card">
            <div class="inspect-card-head">
              <strong>烫完预览图</strong>
              <span>融合轮廓预估</span>
            </div>
            <canvas class="inspect-canvas inspect-fuse" width="360" height="212" aria-label="烫完预览图"></canvas>
          </section>
        </div>
      `;
  }
  updateInspectAssistCanvases();
}

export function renderSharePanel() {
  els.sharePanel.innerHTML = "";
  const safePatternName = escapeHtml(state.selectedPattern.name);
  const card = document.createElement("div");
  card.className = "share-card";
  card.innerHTML = `
      <strong>${safePatternName}</strong>
      <span>${normalizeCraft(state.selectedPattern.craft)} · 评级 ${state.phase === "finish" ? finalGrade() : scoreLabel()} · ${placedCount()}/${getTargetTotal()} 颗</span>
    `;
  els.sharePanel.appendChild(card);

  const row = document.createElement("div");
  row.className = "control-row";
  [
    ["导出竖图", () => uiActions.exportShareImage("portrait")],
    ["导出方图", () => uiActions.exportShareImage("square")],
  ].forEach(([label, handler]) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = label;
    button.addEventListener("click", handler);
    row.appendChild(button);
  });
  els.sharePanel.appendChild(row);
  const cloudResult = document.createElement("div");
  cloudResult.className = "share-code-result";
  const cloudButton = document.createElement("button");
  cloudButton.type = "button";
  cloudButton.className = "primary-button";
  cloudButton.textContent = "生成短码";
  cloudButton.addEventListener("click", async () => {
    cloudButton.disabled = true;
    cloudButton.textContent = "生成中";
    cloudResult.textContent = "";
    try {
      const share = await uiActions.createCloudShare();
      if (share?.shortId) {
        cloudResult.innerHTML = `<strong>${share.shortId}</strong><span>7天内有效</span>`;
      }
    } finally {
      cloudButton.disabled = false;
      cloudButton.textContent = "生成短码";
    }
  });
  els.sharePanel.appendChild(cloudButton);
  els.sharePanel.appendChild(cloudResult);
  addShareButton("投稿画廊", () => uiActions.submitCurrentToGallery());
  addShareButton("复制文案", () => uiActions.copyShareText());
}

export function addShareButton(label, handler) {
  const button = document.createElement("button");
  button.type = "button";
  button.textContent = label;
  button.addEventListener("click", handler);
  els.sharePanel.appendChild(button);
}

export function renderCustomStats() {
  if (!els.customStats) return;
  const stats = state.selectedPattern.conversionStats;
  if (!stats) {
    els.customStats.classList.add("is-empty");
    els.customStats.innerHTML = "";
    return;
  }
  els.customStats.classList.remove("is-empty");
  const list = stats.colors.slice(0, 8).map((item) => `${beadIds[item.code]} ${item.count}`).join(" · ");
  els.customStats.innerHTML = `
      <strong>${stats.size}x${stats.size} · ${stats.total}颗 · ${stats.colors.length}色</strong>
      <span>源图估计 ${stats.sourceSignificantCount} 色 · 聚类 ${stats.simplifiedColorCount} 色 · 清理前 ${stats.preCleanupColorCount} 色</span>
      <span>${stats.denoised ? "已启用轻度降噪" : "保留像素边缘（未降噪）"}</span>
      <span>${list}${stats.colors.length > 8 ? " · ..." : ""}</span>
    `;
}

export function renderCollection() {
  if (!els.collectionPanel) return;
  els.collectionPanel.innerHTML = "";
  const collection = uiActions.getCollection?.() || [];
  if (!collection.length) {
    const empty = document.createElement("div");
    empty.className = "empty-state";
    empty.textContent = "还没有完成品";
    els.collectionPanel.appendChild(empty);
    return;
  }
  const toolbar = document.createElement("div");
  toolbar.className = "collection-toolbar";
  toolbar.innerHTML = `
      <span class="collection-toolbar-count">共 ${collection.length} 件</span>
      <button type="button" class="danger-button collection-clear-all">清空作品集</button>
    `;
  toolbar.querySelector(".collection-clear-all").addEventListener("click", () => {
    if (!collection.length) return;
    if (!window.confirm("确定清空所有作品？此操作不可撤销。")) return;
    uiActions.updateCollection([]);
    renderCollection();
    showToast("作品集已清空。");
  });
  els.collectionPanel.appendChild(toolbar);

  const grid = document.createElement("div");
  grid.className = "collection-grid";
  els.collectionPanel.appendChild(grid);

  collection.forEach((item) => {
    const safeItemName = escapeHtml(item.name);
    const tile = document.createElement("div");
    tile.className = "collection-tile";
    const thumbSize = 168;
    tile.innerHTML = `
        <button type="button" class="collection-tile-body" aria-label="放大 ${safeItemName}">
          <canvas class="collection-thumb" width="${thumbSize}" height="${thumbSize}" aria-hidden="true"></canvas>
          <div class="collection-tile-meta">
            <strong>${safeItemName}</strong>
            <span>${normalizeCraft(item.craft)} · 评级 ${item.grade} · ${item.date}</span>
          </div>
        </button>
        <button type="button" class="collection-tile-delete" aria-label="删除这件作品" title="删除">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-2 14a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
        </button>
      `;
    tile.querySelector(".collection-tile-body").addEventListener("click", () => enlargeCollectionEntry(item));
    tile.querySelector(".collection-tile-delete").addEventListener("click", (event) => {
      event.stopPropagation();
      if (!window.confirm(`删除 ${item.name}？`)) return;
      uiActions.updateCollection(collection.filter((entry) => entry.id !== item.id));
      renderCollection();
      showToast("已删除。");
    });
    grid.appendChild(tile);
    const canvas = tile.querySelector("canvas");
    drawCollectionThumb(canvas, item);
  });
}

export function drawCollectionThumb(canvas, item) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  setupHiDpiCanvas(canvas, ctx);
  const rect = canvas.getBoundingClientRect();
  const w = rect.width;
  const h = rect.height;
  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = "#f3f5f8";
  ctx.fillRect(0, 0, w, h);

  const size = item.size || state.selectedPattern.size || 16;
  const placed = item.placed || [];
  const fallback = !placed.length ? patterns.find((p) => p.id === (item.id || "").split("-").slice(1).join("-")) : null;
  const pad = 10;
  const cell = Math.floor(Math.min((w - pad * 2) / size, (h - pad * 2) / size));
  const gridSize = cell * size;
  const x0 = Math.floor((w - gridSize) / 2);
  const y0 = Math.floor((h - gridSize) / 2);

  const cellCode = (x, y) => {
    if (x < 0 || y < 0 || x >= size || y >= size) return null;
    if (placed.length) {
      const c = placed[y * size + x];
      return c && c !== "." ? c : null;
    }
    if (fallback) {
      const c = (fallback.rows[y] || "")[x];
      return c && c !== "." ? c : null;
    }
    return null;
  };

  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      const code = cellCode(x, y);
      if (!code) continue;
      const px = x0 + x * cell;
      const py = y0 + y * cell;
      const cx = px + cell / 2;
      const cy = py + cell / 2;
      const edges = {
        left: !cellCode(x - 1, y),
        right: !cellCode(x + 1, y),
        up: !cellCode(x, y - 1),
        down: !cellCode(x, y + 1),
      };
      const halfConnected = cell * 0.5;
      const halfExposed = cell * 0.6;
      const halfL = edges.left ? halfExposed : halfConnected;
      const halfR = edges.right ? halfExposed : halfConnected;
      const halfU = edges.up ? halfExposed : halfConnected;
      const halfD = edges.down ? halfExposed : halfConnected;
      const cornerFor = (a, b, hA, hB) => {
        const cap = Math.min(hA, hB);
        if (a && b) return cap;
        if (a || b) return cap * 0.55;
        return cap * 0.08;
      };
      const rTL = cornerFor(edges.up, edges.left, halfU, halfL);
      const rTR = cornerFor(edges.up, edges.right, halfU, halfR);
      const rBR = cornerFor(edges.down, edges.right, halfD, halfR);
      const rBL = cornerFor(edges.down, edges.left, halfD, halfL);
      const left = cx - halfL;
      const right = cx + halfR;
      const top = cy - halfU;
      const bottom = cy + halfD;

      ctx.beginPath();
      ctx.moveTo(left + rTL, top);
      ctx.lineTo(right - rTR, top);
      ctx.arcTo(right, top, right, top + rTR, rTR);
      ctx.lineTo(right, bottom - rBR);
      ctx.arcTo(right, bottom, right - rBR, bottom, rBR);
      ctx.lineTo(left + rBL, bottom);
      ctx.arcTo(left, bottom, left, bottom - rBL, rBL);
      ctx.lineTo(left, top + rTL);
      ctx.arcTo(left, top, left + rTL, top, rTL);
      ctx.closePath();

      ctx.fillStyle = palette[code] || "#bbb";
      ctx.fill();

      ctx.fillStyle = "rgba(255,255,255,0.16)";
      ctx.beginPath();
      ctx.arc(cx - cell * 0.18, cy - cell * 0.18, cell * 0.12, 0, Math.PI * 2);
      ctx.fill();

      const exposedCount = (edges.left ? 1 : 0) + (edges.right ? 1 : 0) + (edges.up ? 1 : 0) + (edges.down ? 1 : 0);
      if (exposedCount >= 3 && cell >= 8) {
        ctx.fillStyle = "rgba(0,0,0,0.18)";
        ctx.beginPath();
        ctx.arc(cx, cy, cell * 0.14, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }
}

function enlargeCollectionEntry(entry) {
  if (!els.collectionScreen) return;
  let viewer = els.collectionScreen.querySelector(".collection-enlarged");
  if (!viewer) {
    viewer = document.createElement("div");
    viewer.className = "collection-enlarged";
    viewer.innerHTML = `
        <button type="button" class="collection-enlarged-close" aria-label="关闭放大">×</button>
        <canvas class="collection-enlarged-canvas" width="640" height="640"></canvas>
        <div class="collection-enlarged-meta"></div>
        <div class="collection-enlarged-actions">
          <button type="button" class="primary-button collection-enlarged-open">打开这张图纸</button>
        </div>
      `;
    els.collectionScreen.appendChild(viewer);
    viewer.querySelector(".collection-enlarged-close").addEventListener("click", () => {
      viewer.classList.remove("show");
    });
  }
  viewer.classList.add("show");
  const canvas = viewer.querySelector("canvas");
  canvas.style.width = "min(640px, 78vh)";
  canvas.style.height = "min(640px, 78vh)";
  requestAnimationFrame(() => drawCollectionThumb(canvas, entry));
  viewer.querySelector(".collection-enlarged-meta").textContent =
    `${entry.name} · ${normalizeCraft(entry.craft)} · 评级 ${entry.grade} · ${entry.date}`;
  const openBtn = viewer.querySelector(".collection-enlarged-open");
  const newBtn = openBtn.cloneNode(true);
  openBtn.replaceWith(newBtn);
  newBtn.addEventListener("click", () => {
    viewer.classList.remove("show");
    uiActions.openCollectionEntry(entry);
  });
}

export function renderUI() {
  if (els.studioGrid) els.studioGrid.dataset.phase = state.phase;
  renderPatterns();
  renderPhases();
  renderCurrentPatternChip();
  renderControls();
  renderToolRack();
  renderPalette();

  renderCustomStats();
  renderPatternColorStats();
  renderSidebarReference();
  const collection = uiActions.getCollection?.() || [];
  const counts = getTargetCounts();
  const colorCount = Object.keys(counts).length;
  if (els.patternMeta) els.patternMeta.textContent = `${state.selectedPattern.size}x${state.selectedPattern.size}`;
  if (els.targetCount) els.targetCount.textContent = `${getTargetTotal()} 颗 / ${colorCount} 色`;
  if (els.collectionCount) els.collectionCount.textContent = String(collection.length);
  if (els.settingsDot) els.settingsDot.hidden = collection.length === 0;
  if (els.colorMeta) els.colorMeta.textContent = state.phase === "inspect" ? "检查辅助" : beadLabel(state.selectedColor);
  if (els.rightPanelTitle) els.rightPanelTitle.textContent = state.phase === "inspect" ? "检查台" : "豆盒";
  if (els.sandboxButton) {
    const beakerIcon = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 3h6"/><path d="M10 3v6.5L5 19a1.6 1.6 0 0 0 1.4 2.4h11.2A1.6 1.6 0 0 0 19 19l-5-9.5V3"/><path d="M7.5 14h9"/></svg>';
    const loupeIcon = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.2-3.2"/></svg>';
    const stateLabel = state.sandboxMode ? "开" : "关";
    els.sandboxButton.innerHTML = `${state.sandboxMode ? beakerIcon : loupeIcon}<span class="sandbox-state">${stateLabel}</span>`;
    els.sandboxButton.title = state.sandboxMode ? "沙盒：开（自由拼摆不校验）" : "沙盒：关（按图纸校验）";
    els.sandboxButton.setAttribute("aria-label", `沙盒模式：${stateLabel}`);
    els.sandboxButton.setAttribute("aria-pressed", state.sandboxMode ? "true" : "false");
    els.sandboxButton.classList.toggle("active", state.sandboxMode);
  }
  if (els.chooseStartButton) els.chooseStartButton.hidden = state.phase !== "choose";
  if (els.bgThemeSelect) els.bgThemeSelect.value = state.bgTheme;
  if (els.topToolStyleSelect) {
    if (!els.topToolStyleSelect.options.length) {
      const options = Object.entries(toolStyles)
        .map(([id, style]) => `<option value="${id}">${style.name}</option>`)
        .join("");
      els.topToolStyleSelect.innerHTML = options;
    }
    els.topToolStyleSelect.value = state.toolStyle;
  }
  const toolStyleField = els.topToolStyleSelect?.closest(".tool-style-picker");
  if (toolStyleField) {
    toolStyleField.style.display = (state.appMode === "gallery" || useMobileDirectPlacement()) ? "none" : "";
  }
  if (els.statusLine) {
    const phaseObj = phases.find(p => p.id === state.phase);
    els.statusLine.textContent = phaseObj?.name ?? statusText();
  }
  const showPlacementUi = state.phase === "place";
  // Mobile uses direct tap-to-place — no needle/tweezers tool selection.
  const showToolUi = showPlacementUi && !useMobileDirectPlacement();
  if (!showPlacementUi) {
    state.lastPlaceHintKey = "";
    hidePlaceHint();
  }
  const showRightPanelUi = state.phase === "place" || state.phase === "inspect";
  if (els.toolRack) els.toolRack.style.display = showToolUi ? "" : "none";
  if (els.colorPalette) els.colorPalette.style.display = showRightPanelUi ? "" : "none";
  if (els.colorMeta) els.colorMeta.style.display = showRightPanelUi ? "" : "none";
  if (els.toolMeta) els.toolMeta.style.display = showToolUi ? "" : "none";

}
