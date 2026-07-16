import { state } from './state.js';
import { palette, beadIds } from './palette.js';
import { phases, toolStyles, craftOptions, backgroundThemes } from './constants.js';
import { patterns } from './patterns-data.js';
import {
  allColorCodes, beadLabel, getTargetCounts, getTargetTotal, getSourceCounts,
  getPatternColors, getPatternAnalysis, getPlacedCounts, getSourcePatternColors,
  getEffectivePatternResult, normalizeCraft, resizePattern,
  baseIdFor, boardCols, boardRows,
} from './pattern.js';
import {
  getLibraryView, isDefaultPatternId, toggleStar, removeFromLibrary,
  renameInLibrary, restoreDefaults, hasHiddenDefaults,
} from './pattern-library.js';
import { showToast, hidePlaceHint, showPlaceHint } from './notify.js';
import {
  confirmModal, textInputModal, onModalOpened, restoreModalFocus,
} from './modal-controller.js';
import {
  markDirty, setupHiDpiCanvas, updateInspectAssistCanvases,
  inspectionSummary, placementAccuracy, scoreLabel, finalGrade, placedCount,
  needleCapacity,
  useMobileDirectPlacement, useStackedMobileLayout,
} from './render.js';
import { els, sideReferenceCanvas, sideReferenceCtx, previewCanvas } from './dom.js';
import { escapeHtml, prefersReducedMotion } from './utils.js';
import { icon } from './icons.js';
import { workflowSummary } from './workflow.js';
import { currentBackgroundTheme } from './theme.js';
import { drawPixelPatternPreview } from './board-skin.js';

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
  triggerHaptic: () => {},
  returnTweezerBead: () => {},
  tweezerFromBox: () => {},
};

export function setUIActions(nextActions = {}) {
  uiActions = { ...uiActions, ...nextActions };
}

// #stageControls has two explicit host slots: the left rail on desktop and
// #mobileActionHost (placed after the board) on phones. Capture the desktop slot
// from the authored markup so we can mount back to the exact same position.
const desktopActionSlot = els.stageControls?.parentElement || null;
const desktopActionSlotNext = els.stageControls?.nextElementSibling || null;
const mobileActionSlot = els.mobileActionHost || document.getElementById("mobileActionHost");

// Semantic composition, NOT geometry. CSS owns size and visual layout; the DOM
// composition must make the visual, keyboard (Tab) and screen-reader order agree.
// Because the board sits before the actions visually on phones but the actions
// precede the board in the desktop markup, the accessible fix is to mount
// #stageControls into the platform's slot — a host switch, not a position
// computation. (CSS `order` alone would desync Tab/AT order from the visuals.)
function mountActionControls() {
  if (!els.stageControls) return;
  // Slot is a LAYOUT decision (width-based), not a flow decision: only the narrow
  // single-column phone shell mounts controls into the in-board action slot. A
  // landscape tablet runs the lightweight flow but keeps the desktop multi-column
  // layout, so its controls stay in the left rail (desktop slot).
  const mobileWorking = useStackedMobileLayout() && state.phase !== "choose";
  els.stageControls.dataset.mobilePhase = mobileWorking ? state.phase : "";
  const host = mobileWorking ? mobileActionSlot : desktopActionSlot;
  if (!host || els.stageControls.parentElement === host) return;
  if (!mobileWorking && desktopActionSlotNext?.parentElement === host) {
    host.insertBefore(els.stageControls, desktopActionSlotNext);
  } else {
    host.appendChild(els.stageControls);
  }
}

// Re-mount when crossing the phone breakpoint, so the slot follows the platform
// even without a content re-render (e.g. rotate / window resize).
if (typeof window !== "undefined" && window.matchMedia) {
  const mq = window.matchMedia("(max-width: 860px)");
  mq.addEventListener?.("change", () => mountActionControls());
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
      <button type="button" class="pattern-color-chip" data-source-code="${escapeHtml(item.sourceCode)}" title="点击换色：${escapeHtml(beadIds[item.targetCode] || item.targetCode)}" aria-label="换色 ${escapeHtml(beadIds[item.targetCode] || item.targetCode)}">
        <span class="dot" style="background:${escapeHtml(palette[item.targetCode])}"></span>
        <span class="code">${escapeHtml(beadIds[item.targetCode] || item.targetCode)}</span>
        <span class="count">${Number(item.count) || 0}</span>
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
  const visible = !["choose", "cool", "finish"].includes(state.phase);
  els.sideReference.hidden = !visible;
  els.sideReference.style.display = visible ? "" : "none";
  if (!visible) {
    sidebarReferenceRenderKey = "hidden";
    return;
  }

  const pattern = state.selectedPattern;
  const cols = boardCols(pattern);
  const rowCount = boardRows(pattern);
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
  const rows = effective.rows;
  const theme = currentBackgroundTheme();
  drawPixelPatternPreview(ctx, {
    width: w,
    height: h,
    cols,
    rows: rowCount,
    pixels: rows,
    colors: palette,
    brand: theme.brand,
    table: theme.table,
  });

  if (els.sideReferenceMeta) {
    els.sideReferenceMeta.textContent = `${pattern.name} · ${cols}x${rowCount}`;
  }
  if (els.sideReferenceLegend) {
    const counts = getTargetCounts(pattern);
    const list = Object.entries(counts)
      .sort((a, b) => b[1] - a[1] || (beadIds[a[0]] || a[0]).localeCompare(beadIds[b[0]] || b[0], "zh-Hans-CN", { numeric: true }))
      .slice(0, 8);
    els.sideReferenceLegend.innerHTML = list.map(([code, count]) => `
        <span class="side-reference-chip">
          <i style="background:${escapeHtml(palette[code])}"></i>
          <b>${escapeHtml(beadIds[code] || code)}</b>
          <em>${Number(count) || 0}</em>
        </span>
      `).join("");
  }
}

function makeLibraryToolbarButton(label, iconName, onClick, extraClass = "") {
  const button = document.createElement("button");
  button.type = "button";
  button.className = `library-tool-button${extraClass ? ` ${extraClass}` : ""}`;
  button.innerHTML = `${icon(iconName, { size: 16 })}<span>${escapeHtml(label)}</span>`;
  button.addEventListener("click", onClick);
  return button;
}

// The 图纸库: the bead studio's choose screen, a gallery-style card grid of the
// user's patterns (defaults + imported + drawn). The card grid scrolls in the
// middle; a single 导入分享码 button stays pinned at the bottom. Tap a card to
// start beading; star to pin to top; rename via the name; delete.
export function renderPatterns() {
  // Star / delete / rename all re-run this full rebuild; capture the card-grid
  // scroll offset first and restore it below so the list doesn't jump to the top.
  const prevScroll = els.patternList.querySelector(".library-scroll")?.scrollTop || 0;
  els.patternList.innerHTML = "";

  const view = getLibraryView();
  if (els.patternMeta) els.patternMeta.textContent = view.length ? `${view.length} 张图纸` : "";

  // ── scrollable middle: the card grid (or empty state) ──
  const scroll = document.createElement("div");
  scroll.className = "library-scroll";
  if (!view.length) {
    const empty = document.createElement("div");
    empty.className = "library-empty";
    empty.innerHTML = `<strong>图纸库是空的</strong><span>用下方的分享码导入一张图纸吧。</span>`;
    scroll.appendChild(empty);
  } else {
    scroll.appendChild(buildLibraryGrid(view));
  }
  els.patternList.appendChild(scroll);
  scroll.scrollTop = prevScroll;

  // ── pinned footer: 导入分享码 (+ 恢复默认 when defaults were deleted) ──
  const footer = document.createElement("div");
  footer.className = "library-footer";
  footer.append(makeLibraryToolbarButton("导入分享码", "upload",
    () => uiActions.openImportCodeModal(), "library-add-code"));
  if (hasHiddenDefaults()) {
    footer.append(makeLibraryToolbarButton("恢复默认", "refresh-cw", () => {
      restoreDefaults();
      renderPatterns();
      showToast("已恢复默认图纸。");
    }, "library-tool-button-restore"));
  }
  els.patternList.appendChild(footer);
}

function buildLibraryGrid(view) {
  const grid = document.createElement("div");
  grid.className = "library-grid";
  const activeId = baseIdFor(state.selectedPattern);

  view.forEach((pattern) => {
    const isCustom = !isDefaultPatternId(pattern.id);
    const displayPattern = isCustom ? pattern : resizePattern(pattern, state.patternSize);

    const card = document.createElement("div");
    card.className = `library-card${activeId === pattern.id ? " active" : ""}`;

    // Tap the preview to load + start beading. Artwork stays clean — management
    // lives in the footer row below, never over the art.
    const open = document.createElement("button");
    open.type = "button";
    open.className = "library-card-open";
    open.setAttribute("aria-label", `开始拼 ${pattern.displayName}`);
    open.innerHTML = `<canvas class="pattern-thumb" width="120" height="120" aria-hidden="true"></canvas>`;
    open.addEventListener("click", () => {
      uiActions.loadPattern(displayPattern, true);
      uiActions.setPhase("place");
      showToast(`开始拼 ${pattern.displayName}`);
    });

    // Footer action row: star (pin) · name (rename) · delete. Quiet by default;
    // star/delete light up on hover/active. Touch targets expanded via ::before.
    const actions = document.createElement("div");
    actions.className = "library-card-actions";

    const star = document.createElement("button");
    star.type = "button";
    star.className = `library-card-star${pattern.starred ? " is-on" : ""}`;
    star.setAttribute("aria-label", pattern.starred ? "取消置顶" : "星标置顶");
    star.setAttribute("aria-pressed", String(pattern.starred));
    star.innerHTML = icon("star", { size: 16 });
    star.addEventListener("click", () => {
      toggleStar(pattern.id);
      renderPatterns();
    });

    const name = document.createElement("button");
    name.type = "button";
    name.className = "library-card-name";
    name.setAttribute("aria-label", `重命名 ${pattern.displayName}`);
    name.innerHTML = `<strong>${escapeHtml(pattern.displayName)}</strong>`;
    name.addEventListener("click", async () => {
      const next = await textInputModal({
        title: "重命名图纸",
        label: "图纸名",
        value: pattern.displayName,
        okText: "保存",
        maxLength: 20,
      });
      if (next == null) return;
      if (renameInLibrary(pattern.id, next)) renderPatterns();
    });

    const del = document.createElement("button");
    del.type = "button";
    del.className = "library-card-del";
    del.setAttribute("aria-label", `删除 ${pattern.displayName}`);
    del.innerHTML = icon("trash-2", { size: 15 });
    del.addEventListener("click", async () => {
      const ok = await confirmModal({
        message: `从图纸库删除「${pattern.displayName}」？`,
        okText: "删除",
        danger: true,
      });
      if (!ok) return;
      removeFromLibrary(pattern.id);
      renderPatterns();
      showToast("已从图纸库删除。");
    });

    actions.append(star, name, del);
    card.append(open, actions);
    grid.appendChild(card);
    drawPatternThumb(card.querySelector("canvas"), displayPattern, { referenceBoard: true });
  });

  return grid;
}

export function drawPatternThumb(canvas, pattern, { referenceBoard = false } = {}) {
  const dpr = Math.min(3, Math.max(1, window.devicePixelRatio || 1));
  // Respect the element's actual rendered box so each preview gets a matching
  // bitmap (the library card thumb is a 1:1 square; the pattern is centered and
  // letterboxed inside it by pixelPatternPreviewLayout). Square thumbs (current /
  // mobile selection) are unaffected since their box is square.
  const fallback = Number(canvas.getAttribute("width")) || 58;
  const cssW = canvas.clientWidth || fallback;
  const cssH = canvas.clientHeight || cssW;
  const w = Math.round(cssW * dpr);
  const h = Math.round(cssH * dpr);
  if (canvas.width !== w) canvas.width = w;
  if (canvas.height !== h) canvas.height = h;
  const ctx = canvas.getContext("2d");
  const cols = boardCols(pattern);
  const rowCount = boardRows(pattern);
  const rows = pattern.rows || [];
  ctx.clearRect(0, 0, w, h);
  const theme = currentBackgroundTheme();
  if (referenceBoard) {
    // Library cards reuse the studio "参考背景" rendering: the full pegboard board
    // skin (frame + section tint + guides + shadow), exactly like renderSidebarReference.
    drawPixelPatternPreview(ctx, {
      width: w,
      height: h,
      cols,
      rows: rowCount,
      pixels: rows,
      colors: palette,
      brand: theme.brand,
      table: theme.table,
    });
    return;
  }
  drawPixelPatternPreview(ctx, {
    width: w,
    height: h,
    cols,
    rows: rowCount,
    pixels: rows,
    colors: palette,
    brand: theme.brand,
    table: theme.table,
    compact: true,
    shadow: false,
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
    if (index === activeIndex) item.setAttribute("aria-current", "step");
    item.innerHTML = `<span class="step-dot">${index + 1}</span><span>${phase.name}</span>`;
    item.disabled = index >= activeIndex;
    item.addEventListener("click", async () => {
      if (index >= activeIndex) return;
      const target = phase.id;
      if (target === "choose") {
        if (
          (placedCount() > 0 || state.fusedPieces.length > 0) &&
          !(await confirmModal({ message: "回到选图会离开当前作品的进度，确定吗？", okText: "回到选图", danger: true }))
        ) {
          return;
        }
        uiActions.setPhase("choose");
        return;
      }
      const losesFused =
        state.fusedPieces.length > 0 &&
        (target === "place" || target === "inspect" || target === "iron");
      if (losesFused && !(await confirmModal({ message: "回退到该步会清除已熨烫/冷却的结果，确定吗？", okText: "回退", danger: true }))) {
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
    els.currentPatternMeta.textContent = `${boardCols()}×${boardRows()} · ${getTargetTotal()}颗 · ${colorCount}色`;
  }
  if (els.currentPatternThumb) {
    drawPatternThumb(els.currentPatternThumb, state.selectedPattern);
  }
}

export function renderMobileWorkflowSummary() {
  if (!els.mobileWorkflowSummary) return;
  const visible = state.phase !== "choose";
  els.mobileWorkflowSummary.hidden = !visible;
  if (!visible) return;
  const summary = workflowSummary(phases, state.phase);
  if (els.mobilePatternName) els.mobilePatternName.textContent = state.selectedPattern.name;
  if (els.mobileWorkflowCurrent) {
    els.mobileWorkflowCurrent.textContent = `${summary.index + 1}/${summary.total} · ${summary.current}`;
  }
  if (els.mobileWorkflowNext) {
    els.mobileWorkflowNext.textContent = summary.next ? `下一步 ${summary.next}` : "最后一步";
  }
  if (els.mobilePatternThumb) drawPatternThumb(els.mobilePatternThumb, state.selectedPattern);
}

export function renderMobileSelectionSummary() {
  if (!els.mobileSelectionSummary) return;
  const visible = state.phase === "choose";
  els.mobileSelectionSummary.hidden = !visible;
  if (!visible) return;
  const counts = getTargetCounts();
  if (els.mobileSelectionName) els.mobileSelectionName.textContent = state.selectedPattern.name;
  if (els.mobileSelectionMeta) {
    els.mobileSelectionMeta.textContent =
      `${boardCols()}×${boardRows()} · ${getTargetTotal()}颗 · ${Object.keys(counts).length}色`;
  }
  if (els.mobileSelectionThumb) drawPatternThumb(els.mobileSelectionThumb, state.selectedPattern);
}

export function renderControls() {
  mountActionControls();
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
    if (state.spill) {
      showPlaceHint(
        "有一颗豆子倒下来卡住了。你可以先继续摆放，熨烫前记得处理。",
        `spill:${state.spill.index}:${state.spill.code}`,
      );
    } else {
      hidePlaceHint();
    }
    addButton("检查作品", "primary-button", () => uiActions.setPhase("inspect"));
    addButton("清空板面", "danger-text-button", () => uiActions.clearBoard?.(), false, {
      icon: icon("trash-2", { size: 16 }),
    });
    return;
  }

  if (state.phase === "inspect") {
    const summary = inspectionSummary();
    if (!state.sandboxMode) {
      addInspectStats(summary);
    }
    if (state.spill) {
      addHint("还有倒下的豆子没夹起。继续熨烫会把这颗豆糊在板面上。");
    }
    const hintsOn = state.showHints;
    addControlRow([
      [hintsOn ? "隐藏提示" : "显示提示", `inspect-action-btn ${hintsOn ? "active" : ""}`, () => {
        state.showHints = !state.showHints;
        markDirty();
      }, false, {
        icon: icon(hintsOn ? "eye-off" : "eye", { size: 16 }),
        ariaLabel: hintsOn ? "隐藏提示" : "显示提示",
        title: hintsOn ? "隐藏提示" : "显示提示",
      }],
      ["返回修正", "inspect-action-btn", () => uiActions.setPhase("place"), false, {
        icon: icon("reply", { size: 16 }),
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
    return;
  }

  if (state.phase === "iron") {
    addControlRow([
      ["查看检查", "", () => uiActions.setPhase("inspect")],
      ["进入冷却", "primary-button", () => uiActions.setPhase("cool")],
    ]);
    return;
  }

  if (state.phase === "cool") {
    addControlRow([
      ["压平", "", () => uiActions.pressFlat()],
      ["翻面再熨", "", () => uiActions.flipAndIron(), state.flipCount >= 1],
    ]);
    addButton("完成收藏", "primary-button", () => uiActions.completeWork());
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

export function addButton(label, className, handler, disabled = false, options = {}) {
  const button = document.createElement("button");
  button.type = "button";
  if (options.icon) {
    button.innerHTML = `<span class="btn-glyph" aria-hidden="true">${options.icon}</span><span class="btn-label">${escapeHtml(label)}</span>`;
    button.classList.add("icon-text-button");
  } else {
    button.textContent = label;
  }
  button.className = `${button.className} ${className || ""}`.trim();
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

/** Inspection result as three semantic status chips (scannable, screenshot-friendly). */
export function addInspectStats(summary) {
  const wrap = document.createElement("div");
  wrap.className = "inspect-stats";
  wrap.setAttribute("role", "group");
  wrap.setAttribute("aria-label", "检查结果");
  const stats = [
    { key: "missing", label: "漏放", value: summary.missing },
    { key: "wrong", label: "错色", value: summary.wrong },
    { key: "extra", label: "多放", value: summary.extra },
  ];
  wrap.innerHTML = stats
    .map(({ key, label, value }) =>
      `<span class="inspect-stat is-${key}${value > 0 ? "" : " is-zero"}">${label}<b>${value}</b></span>`)
    .join("");
  els.stageControls.appendChild(wrap);
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
      state.craftSwitchAt = performance.now();
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
    ? `夹着 ${beadIds[state.tweezerBead]} · 点此放回`
    : `点豆盒色号直接夹起`;
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
      if (!tool) return;
      if (state.tool === tool) {
        // Clicking the already-active tweezers card while holding returns the bead.
        if (tool === "tweezers" && state.tweezerBead) uiActions.returnTweezerBead?.();
        return;
      }
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
    if (useMobileDirectPlacement()) {
      els.colorPalette.classList.remove("inspect-mode");
      if (paletteRenderKey !== "inspect:mobile-hidden") {
        els.colorPalette.innerHTML = "";
        paletteRenderKey = "inspect:mobile-hidden";
      }
      return;
    }
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
  // Desktop: float the pattern's own colors ("本图用色") to the top of the wall so
  // they're not buried among 221 swatches, then the rest in MARD order. Mobile already
  // only shows needed colors.
  const neededCodes = isMobile ? [] : allCodes.filter((code) => (counts[code] || 0) > 0);
  const neededSet = new Set(neededCodes);
  const rest = isMobile
    ? allCodes.filter((code) => (counts[code] || 0) > 0)
    : allCodes.filter((code) => !neededSet.has(code));
  const codes = isMobile ? rest : [...neededCodes, ...rest];
  const hasNeededGroup = !isMobile && neededCodes.length > 0;
  // Full-width group headers inserted before these indices (only when the pattern has colors).
  const neededHeaderAt = hasNeededGroup ? 0 : -1;
  const restHeaderAt = hasNeededGroup ? neededCodes.length : -1;
  const key = [
    "place",
    isMobile ? "m" : "d",
    state.selectedColor,
    state.tweezerBead || "",
    state.placedVersion,
    state.mobileColorPulseId,
    getPatternAnalysis().key,
  ].join(":");
  if (key === paletteRenderKey) return;
  paletteRenderKey = key;
  els.colorPalette.innerHTML = "";
  const addHeader = (text) => {
    const h = document.createElement("div");
    h.className = "palette-group-head";
    h.setAttribute("aria-hidden", "true");
    h.textContent = text;
    els.colorPalette.appendChild(h);
  };
  codes.forEach((code, idx) => {
    if (idx === neededHeaderAt) addHeader(`本图用色 · ${neededCodes.length}`);
    if (idx === restHeaderAt) addHeader("全部颜色");
    const placed = placedCounts[code] || 0;
    const needed = counts[code] || 0;
    const inPattern = needed > 0;
    const remaining = Math.max(0, needed - placed);
    const isSelected = state.selectedColor === code;
    const button = document.createElement("button");
    const isHeld = !isMobile && state.tweezerBead === code;
    const picked = isMobile && isSelected && state.mobileColorPulsePending;
    button.className = `color-chip${isSelected ? " active" : ""}${inPattern && !isMobile ? " needed" : ""}${isHeld ? " held" : ""}${picked ? " picked" : ""}`;
    button.type = "button";
    button.title = `${beadLabel(code)}：${placed}/${needed}`;
    const isTransparent = beadIds[code] === "H1";
    button.innerHTML = `
        <span class="swatch${isTransparent ? " is-transparent" : ""}" style="${isTransparent ? "" : `background:${palette[code]}`}"></span>
        <span class="chip-label">${beadIds[code] || code}</span>
        ${inPattern && isSelected ? `<span class="chip-count">${remaining}</span>` : ""}
      `;
    button.addEventListener("click", () => {
      if (isMobile) {
        // Toggle: tapping the already-selected swatch clears the selection, so
        // the next board taps place nothing — a safe look-without-placing state.
        if (state.selectedColor === code) {
          state.selectedColor = null;
        } else {
          state.selectedColor = code;
          state.mobileColorPulseId += 1;
          state.mobileColorPulsePending = true;
          uiActions.triggerHaptic("light");
        }
      } else {
        state.selectedColor = code;
        if (state.phase === "place") {
          // Tweezers pick straight from the box (clicking the held color returns it);
          // the needle pours the color into the tray.
          if (state.tool === "tweezers") uiActions.tweezerFromBox?.(code);
          else uiActions.pourSelectedColor?.();
        }
      }
      markDirty();
    });
    els.colorPalette.appendChild(button);
  });
  state.mobileColorPulsePending = false;
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
  // Three equal export options — use the 3-column row so 纯作品图 doesn't sit
  // alone beside an empty cell in the default 2-column grid.
  row.className = "control-row three";
  [
    ["导出竖图", () => uiActions.exportShareImage("portrait")],
    ["导出方图", () => uiActions.exportShareImage("square")],
    ["纯作品图", () => uiActions.exportShareImage("clean")],
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
  cloudButton.textContent = "生成分享码";
  cloudButton.addEventListener("click", async () => {
    cloudButton.disabled = true;
    cloudButton.textContent = "生成中";
    cloudResult.textContent = "";
    try {
      const share = await uiActions.createCloudShare();
      if (share?.shortId) {
        const title = String(share.name || state.selectedPattern?.name || "").trim().slice(0, 10);
        const display = title ? `【${title}】${share.shortId}` : share.shortId;
        cloudResult.innerHTML = `<strong>${escapeHtml(display)}</strong><span>7天内有效</span>`;
      }
    } finally {
      cloudButton.disabled = false;
      cloudButton.textContent = "生成分享码";
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
      <span>${list}${stats.colors.length > 8 ? " · …" : ""}</span>
    `;
}

export function renderCollection() {
  if (!els.collectionPanel) return;
  els.collectionPanel.innerHTML = "";
  const collection = uiActions.getCollection?.() || [];
  if (!collection.length) {
    const empty = document.createElement("div");
    empty.className = "empty-state";
    empty.innerHTML = `${icon("clipboard-list", { size: 44, strokeWidth: 1.8, class: "empty-state-icon" })}<p class="empty-state-text">还没有完成品</p><p class="empty-state-sub">做完第一件，它就会摆在这里。</p><button type="button" class="primary-button" data-collection-start>去拼豆</button>`;
    empty.querySelector("[data-collection-start]")?.addEventListener("click", () => els.startBeadButton?.click());
    els.collectionPanel.appendChild(empty);
    return;
  }
  const toolbar = document.createElement("div");
  toolbar.className = "collection-toolbar";
  // Quiet coral text treatment (not a filled danger button): clearing the whole
  // collection is destructive and rare, so it shouldn't be the loudest element
  // on the screen. Mirrors the bead studio's 清空板面 danger-text-button.
  toolbar.innerHTML = `
      <span class="collection-toolbar-count">共 ${collection.length} 件</span>
      <button type="button" class="danger-text-button icon-text-button collection-clear-all">
        <span class="btn-glyph" aria-hidden="true">${icon("trash-2", { size: 16 })}</span>
        <span class="btn-label">清空作品集</span>
      </button>
    `;
  toolbar.querySelector(".collection-clear-all").addEventListener("click", async () => {
    if (!collection.length) return;
    if (!(await confirmModal({ message: "确定清空所有作品？此操作不可撤销。", okText: "清空", danger: true }))) return;
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
            <span>${normalizeCraft(item.craft)} · 评级 ${escapeHtml(item.grade)} · ${escapeHtml(item.date)}</span>
          </div>
        </button>
        <button type="button" class="collection-tile-delete" aria-label="删除这件作品" title="删除">
          ${icon("trash-2", { size: 14 })}
        </button>
      `;
    tile.querySelector(".collection-tile-body").addEventListener("click", () => enlargeCollectionEntry(item));
    tile.querySelector(".collection-tile-delete").addEventListener("click", async (event) => {
      event.stopPropagation();
      if (!(await confirmModal({ message: `删除作品「${item.name}」？`, okText: "删除", danger: true }))) return;
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

  const cols = item.width || item.size || 30;
  const rowCount = item.height || item.size || 30;
  const placed = item.placed || [];
  const fallback = !placed.length ? patterns.find((p) => p.id === (item.id || "").split("-").slice(1).join("-")) : null;
  const pad = 10;
  const cell = Math.floor(Math.min((w - pad * 2) / cols, (h - pad * 2) / rowCount));
  const gridW = cell * cols;
  const gridH = cell * rowCount;
  const x0 = Math.floor((w - gridW) / 2);
  const y0 = Math.floor((h - gridH) / 2);

  const cellCode = (x, y) => {
    if (x < 0 || y < 0 || x >= cols || y >= rowCount) return null;
    if (placed.length) {
      const c = placed[y * cols + x];
      return c && c !== "." ? c : null;
    }
    if (fallback) {
      const c = (fallback.rows[y] || "")[x];
      return c && c !== "." ? c : null;
    }
    return null;
  };

  for (let y = 0; y < rowCount; y += 1) {
    for (let x = 0; x < cols; x += 1) {
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

function setCollectionViewerBackgroundInert(viewer, inert) {
  if (!viewer?.parentElement) return;
  [...viewer.parentElement.children].forEach((sibling) => {
    if (sibling !== viewer) sibling.inert = inert;
  });
}

export function closeCollectionViewer() {
  const viewer = els.collectionScreen?.querySelector('.collection-enlarged');
  if (!viewer || !state.collectionViewerOpen) return;
  state.collectionViewerOpen = false;
  viewer.classList.remove('show');
  viewer.setAttribute('aria-hidden', 'true');
  setCollectionViewerBackgroundInert(viewer, false);
  restoreModalFocus();
}

function enlargeCollectionEntry(entry) {
  if (!els.collectionScreen) return;
  let viewer = els.collectionScreen.querySelector(".collection-enlarged");
  if (!viewer) {
    viewer = document.createElement("div");
    viewer.className = "collection-enlarged";
    viewer.setAttribute('role', 'dialog');
    viewer.setAttribute('aria-modal', 'true');
    viewer.setAttribute('aria-labelledby', 'collectionEnlargedTitle');
    viewer.setAttribute('aria-hidden', 'true');
    viewer.innerHTML = `
        <div class="collection-enlarged-card">
          <button type="button" class="collection-enlarged-close" aria-label="关闭放大">${icon("x", { size: 18 })}</button>
          <canvas class="collection-enlarged-canvas" width="640" height="640"></canvas>
          <div class="collection-enlarged-meta" id="collectionEnlargedTitle"></div>
          <div class="collection-enlarged-actions">
            <button type="button" class="primary-button collection-enlarged-open">打开这张图纸</button>
          </div>
        </div>
      `;
    els.collectionScreen.appendChild(viewer);
    viewer.querySelector(".collection-enlarged-close").addEventListener("click", closeCollectionViewer);
  }
  const canvas = viewer.querySelector("canvas");
  // Keep the preview square AND inside the viewport: on phones 78vh alone
  // overflows the (narrower) screen width, so clamp by 86vw too.
  const previewSize = "min(640px, 66vh, calc(86vw - 2 * var(--sp-4)))";
  canvas.style.width = previewSize;
  canvas.style.height = previewSize;
  requestAnimationFrame(() => drawCollectionThumb(canvas, entry));
  viewer.querySelector(".collection-enlarged-meta").textContent =
    `${entry.name} · ${normalizeCraft(entry.craft)} · 评级 ${entry.grade} · ${entry.date}`;
  const openBtn = viewer.querySelector(".collection-enlarged-open");
  const newBtn = openBtn.cloneNode(true);
  openBtn.replaceWith(newBtn);
  newBtn.addEventListener("click", () => {
    closeCollectionViewer();
    uiActions.openCollectionEntry(entry);
  });
  state.collectionViewerOpen = true;
  setCollectionViewerBackgroundInert(viewer, true);
  viewer.classList.add('show');
  viewer.setAttribute('aria-hidden', 'false');
  onModalOpened(viewer);
}

export function renderUI() {
  if (els.studioGrid) els.studioGrid.dataset.phase = state.phase;
  renderPatterns();
  renderPhases();
  renderCurrentPatternChip();
  renderMobileWorkflowSummary();
  renderMobileSelectionSummary();
  renderControls();
  renderToolRack();
  renderPalette();

  renderCustomStats();
  renderPatternColorStats();
  renderSidebarReference();
  const collection = uiActions.getCollection?.() || [];
  const counts = getTargetCounts();
  const colorCount = Object.keys(counts).length;
  if (els.patternMeta && state.phase !== "choose") els.patternMeta.textContent = `${boardCols()}×${boardRows()}`;
  if (els.targetCount) els.targetCount.textContent = `${getTargetTotal()} 颗 / ${colorCount} 色`;
  if (els.collectionCount) els.collectionCount.textContent = String(collection.length);
  if (els.settingsDot) els.settingsDot.hidden = collection.length === 0;
  if (els.colorMeta) els.colorMeta.textContent = state.phase === "inspect" ? "检查辅助" : beadLabel(state.selectedColor);
  if (els.rightPanelTitle) els.rightPanelTitle.textContent = state.phase === "inspect" ? "检查台" : "豆盒";
  if (els.sandboxButton) {
    // Sandbox lives in the topbar as an icon toggle: the flask icon is always present (in HTML); on/off is distinguished by .active + aria/title.
    const stateLabel = state.sandboxMode ? "开" : "关";
    els.sandboxButton.title = state.sandboxMode ? "沙盒模式：开（自由拼摆不校验）" : "沙盒模式：关（按图纸校验）";
    els.sandboxButton.setAttribute("aria-label", `沙盒模式：${stateLabel}`);
    els.sandboxButton.setAttribute("aria-pressed", state.sandboxMode ? "true" : "false");
    els.sandboxButton.classList.toggle("active", state.sandboxMode);
  }
  if (els.chooseStartButton) els.chooseStartButton.hidden = state.phase !== "choose";
  if (els.mobileSelectionStartButton) els.mobileSelectionStartButton.hidden = state.phase !== "choose";
  if (els.customImageControls) {
    els.customImageControls.hidden = !state.selectedPattern?.sourceImageDataUrl;
  }
  if (els.bgThemeChips) {
    if (!els.bgThemeChips.children.length) {
      els.bgThemeChips.innerHTML = Object.entries(backgroundThemes).map(([id, t]) =>
        `<button type="button" role="radio" class="swatch-pick" data-theme="${id}" aria-checked="${id === state.bgTheme}" aria-label="${t.name}主题" title="${t.name}">
          <span class="swatch-pick-chip" style="--a:${t.pageBase};--b:${t.brand}"></span>
          <span class="swatch-pick-name">${t.name}</span>
        </button>`).join("");
    }
    for (const b of els.bgThemeChips.children) {
      b.setAttribute("aria-checked", b.dataset.theme === state.bgTheme ? "true" : "false");
    }
  }
  if (els.toolStyleChips) {
    if (!els.toolStyleChips.children.length) {
      els.toolStyleChips.innerHTML = Object.entries(toolStyles).map(([id, s]) =>
        `<button type="button" role="radio" class="swatch-pick tool-pick" data-tool="${id}" aria-checked="${id === state.toolStyle}" aria-label="${s.name}款工具" title="${s.name}">
          <span class="swatch-pick-chip" style="--a:${s.secondary};--b:${s.primary};--c:${s.accent}"></span>
          <span class="swatch-pick-name">${s.name}</span>
        </button>`).join("");
    }
    for (const b of els.toolStyleChips.children) {
      b.setAttribute("aria-checked", b.dataset.tool === state.toolStyle ? "true" : "false");
    }
  }
  if (els.toolStyleField) {
    els.toolStyleField.style.display = (state.appMode === "gallery" || useMobileDirectPlacement()) ? "none" : "";
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
