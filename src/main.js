import {
  palette, beadIds, palettePresetMardCodes, workshopCodeForMard,
} from './palette.js';
import { patterns, resamplePatternRows, validatePatterns } from './patterns-data.js';
import {
  backgroundThemes, toolStyles, craftOptions,
  TRAY_DESKTOP_ROWS, TRAY_DESKTOP_COLS, TRAY_MOBILE_ROWS, TRAY_MOBILE_COLS,
  collectionKey, collectionLimit, achievementKey,
  conceptAchievement, fullBoardAchievement, needleLoadSortThreshold,
  APP_VERSION,
} from './constants.js';
import {
  clamp, lerp, easeOut, mixColor, rgbToOklab, oklabDistance,
  hexToRgb, beadOklab,
} from './color-utils.js';
import { state } from './state.js';
import { readCollection, writeCollection } from './storage.js';
import { toggleBgm, isBgmPlaying } from './bgm.js';
import {
  feedback as sfxFeedback, playSfx, vibrate as sfxVibrate,
  isSfxEnabled, setSfxEnabled, isHapticEnabled, setHapticEnabled,
} from './sfx.js';
import { readAchievements, writeAchievements, hasAchievement, unlockAchievement } from './achievements.js';
import { currentBackgroundTheme, currentToolStyle } from './theme.js';
import { initStartShowcase, refreshShowcaseTheme, setShowcaseActive } from './start-showcase.js';
import {
  targetAt, indexFor, sourceTargetAt, isBuiltInPattern, getPatternColorMap,
  invalidateEffectiveMap,
  getEffectiveTargetRows, getEffectivePatternResult,
  getTargetCounts, getTargetTotal, allColorCodes, beadLabel, activePaletteColorCount,
  normalizePatternColorMapForActivePalette, getPatternColors, getPatternAnalysis,
  getSourceCounts, getSourcePatternColors, getSourcePatternAnalysis,
  invalidatePlacedCounts, getPlacedCounts, baseIdFor,
  patternFingerprint, normalizeCraft, resizePattern,
  boardCols, boardRows, isActiveTileCell,
} from './pattern.js';
import { sceneCanvas, scene, previewCanvas, preview, sideReferenceCanvas, sideReferenceCtx, els } from './dom.js';
import {
  useMobileTrayGrid, useMobileDirectPlacement, isTouchDevice, maxBoardScale,
  shouldShowTray, trayDimensions, traySlotCapacity, makeTrayMatrix, makeTraySeeds,
  syncTrayMatrixShape, countTrayBeans, syncTrayBeans, trayGeometry, trayCellCenter,
  trayCellFromPoint, trayRowFromPoint, needleCapacity, calcTrayFillAmount, pseudoRandom,
  markCanvasDirty, invalidateLayoutCache, currentLayout, boardViewTransform,
  setBoardZoom, resetBoardView, gesturePointerCount, gesturePrimaryPair,
  startBoardGesture, updateBoardGesture, touchToCanvas,
  computeLayout, setupHiDpiCanvas, render,
  drawBead, drawBoard, drawTray, drawPreview, drawChooseScene, drawFinishShowcase,
  boardFusionShapeProfile, buildFusedPiecesFromPlaced, getFusedPieces, pieceSortByArea,
  drawGradientCapsuleBridge, roundedPath, fusedColor, previewCellFromPoint,
  inspectionSummary, placementAccuracy, heatStats, estimateWarp,
  scoreLabel, finalGrade, statusText,
  boardCellFromPoint, pointInTray, trayDumpButtonRect, pointInTrayDumpButton,
  isSpillDamagedIndex, drawSpillDamages, drawInspectionHints, pointerToCanvas, pointInLampSwitch,
  drawShareImage, markDirty,
} from './render.js';
import { placedCount } from './pattern.js';
import { showToast, hidePlaceHint, showPlaceHint, showAchievementToast, celebrate } from './notify.js';
import {
  setUIActions, setSizeControls as uiSetSizeControls, updateSelectedPaletteCount as uiUpdateSelectedPaletteCount,
  renderUI as uiRenderUI, renderCollection as uiRenderCollection, renderSharePanel as uiRenderSharePanel,
} from './ui.js';
import {
  setGalleryActions, enterGalleryMode, renderGallery, loadGallery,
  openGallerySubmitModal, closeGallerySubmitModal, submitGalleryPattern,
  createCloudShare, importPatternCode, submitCurrentToGallery,
  autoCopyText, applyImportedPattern,
  requestCloudShareForPattern,
} from './gallery.js';
import {
  setDrawActions, initDrawingStudioEvents, enterDrawMode, tickDrawKbdNav,
  paintDrawCanvas, openDrawCodeModal, closeDrawCodeModal,
  getDrawKeyboardNav,
} from './draw.js';
import {
  setCustomPatternActions, initCustomPatternEvents, setCustomDenoiseControls,
} from './custom-pattern.js';
import {
  setSessionActions, flushAutoSave, clearAutoSave, loadAutoSave,
} from './session.js';
import {
  setModalActions, getOpenModalEl, focusablesIn, onModalOpened, restoreModalFocus,
  openShareModal, closeShareModal, openSettingsModal, closeSettingsModal,
  openRemapModal, closeRemapModal,
  closeOnboardingModal, maybeShowOnboarding,
  confirmModal, resolveConfirm,
} from './modal-controller.js';
import { hydrateIcons } from './icons.js';
import { keyboardGridAction, moveGridCursor, normalizeGridCursor } from './keyboard-grid.js';
import { prefersReducedMotion } from './utils.js';
import {
  resetBuildTimer, startBuildTimer, pauseBuildTimer, buildElapsedMs, setBuildElapsedMs, formatBuildTime,
} from './build-timer.js';
import { SHARE_QR_DATA_URL } from './share-qr.js';

  hydrateIcons(document);

  let collection = readCollection();
  state.achievements = readAchievements();
  let lastFrame = performance.now();
  const IRON_DEFAULT_TEMPERATURE = 62;
  const IRON_DEFAULT_PRESSURE = 56;

  // Reflect the selected value across a swatch-chip radiogroup (data-<attr> buttons).
  function syncChipGroup(container, attr, value) {
    if (!container) return;
    for (const b of container.querySelectorAll('[role="radio"]')) {
      b.setAttribute("aria-checked", b.dataset[attr] === value ? "true" : "false");
    }
  }

  // Arrow-key roving for the swatch-chip radiogroups (keeps the native-select keyboard UX).
  function chipRoving(event, container) {
    const radios = Array.from(container.querySelectorAll('[role="radio"]'));
    const i = radios.indexOf(document.activeElement);
    if (i < 0) return;
    let ni = -1;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") ni = (i + 1) % radios.length;
    else if (event.key === "ArrowLeft" || event.key === "ArrowUp") ni = (i - 1 + radios.length) % radios.length;
    if (ni < 0) return;
    event.preventDefault();
    radios[ni].focus();
    radios[ni].click();
  }

  function applyBackgroundTheme(themeId = state.bgTheme) {
    state.bgTheme = backgroundThemes[themeId] ? themeId : "mist";
    const theme = currentBackgroundTheme();
    const root = document.documentElement;
    root.style.setProperty("--page-base", theme.pageBase);
    root.style.setProperty("--page-glow-a", theme.pageGlowA);
    root.style.setProperty("--page-glow-b", theme.pageGlowB);
    root.style.setProperty("--table", theme.table[1]);
    root.style.setProperty("--table-deep", theme.table[2]);
    root.style.setProperty("--brand", theme.brand || "#57b8a7");
    root.style.setProperty("--brand-ink", theme.brandInk || "#1f6153");
    root.style.setProperty("--brand-edge", theme.brandEdge || "#3f988b");
    root.style.setProperty("--brand-tint", theme.brandTint || "rgba(87, 184, 167, 0.16)");
    root.style.setProperty("--brand-tint-strong", theme.brandTintStrong || "rgba(87, 184, 167, 0.25)");
    root.style.setProperty("--brand-cta", theme.cta?.[0] || "#3D9C8C");
    root.style.setProperty("--brand-cta-strong", theme.cta?.[1] || "#389586");
    root.style.setProperty("--bg-scrim", theme.scrim || "rgba(255, 255, 255, 0.16)");
    syncChipGroup(els.bgThemeChips, "theme", state.bgTheme);
    refreshShowcaseTheme();
    markDirty();
  }

  // Keep only the active screen exposed to assistive tech / the doc outline,
  // so the per-screen <h1>s don't stack up as multiple level-1 headings (A3).
  function applyScreenAria() {
    const mode = state.appMode;
    const beadActive = mode === "bead";
    [
      [els.startScreen, mode === "home"],
      [els.galleryScreen, mode === "gallery"],
      [els.collectionScreen, mode === "collection"],
      [els.drawingStudio, mode === "draw"],
      [document.querySelector(".bead-topbar"), beadActive],
      [els.studioGrid, beadActive],
    ].forEach(([el, active]) => {
      if (el) el.setAttribute("aria-hidden", active ? "false" : "true");
    });
  }

  const PHASE_BG = {
    choose: "--bg-select-image", place: "--bg-place-image", inspect: "--bg-inspect-image",
    iron: "--bg-iron-image", cool: "--bg-cool-image", finish: "--bg-gallery-image",
  };
  const MODE_BG = {
    draw: "--bg-draw-image", gallery: "--bg-gallery-image", collection: "--bg-collection-image",
  };
  // Full-window background layer (body::before): choose the image var for current mode/phase.
  function updateFullBg() {
    const v = state.appMode === "bead" ? PHASE_BG[state.phase] : MODE_BG[state.appMode];
    const root = document.documentElement;
    if (v) {
      root.style.setProperty("--bg-current", `var(${v})`);
      root.style.setProperty("--bg-current-on", "1");
    } else {
      root.style.setProperty("--bg-current-on", "0");
    }
  }

  // Lazily prefetch stage background images: while the first screen is idle, pull the
  // remaining stages' WebP into cache to remove the fade-in gap when switching.
  // Each image is < 64KB; respect data-saver (skip in data-saver mode). Single source of
  // truth for paths — read the --bg-* variables from index.html.
  let backgroundsPreloaded = false;
  function preloadBackgrounds() {
    if (backgroundsPreloaded) return;
    backgroundsPreloaded = true;
    if (navigator.connection && navigator.connection.saveData) return;
    const cs = getComputedStyle(document.documentElement);
    const seen = new Set();
    for (const v of [...Object.values(PHASE_BG), ...Object.values(MODE_BG)]) {
      const m = cs.getPropertyValue(v).trim().match(/url\(["']?(.*?)["']?\)/);
      if (m && m[1] && !seen.has(m[1])) {
        seen.add(m[1]);
        new Image().src = m[1];
      }
    }
  }

  function setAppMode(mode) {
    const prevMode = state.appMode;
    state.appMode = mode === "draw" ? "draw" : mode === "bead" ? "bead" : mode === "gallery" ? "gallery" : mode === "collection" ? "collection" : "home";
    if (prevMode && prevMode !== state.appMode) playSfx("nav"); // soft swish on real page switches only
    state.collectionPageOpen = state.appMode === "collection";
    document.body.dataset.appMode = state.appMode;
    syncBuildTimer();
    if (state.appMode !== "bead") {
      state.lastPlaceHintKey = "";
      hidePlaceHint();
    }
    applyScreenAria();
    updateFullBg();
    setShowcaseActive(state.appMode === "home");
    if (state.appMode === "bead") {
      state.uiDirty = true;
      state.previewDirty = true;
      state.renderDirty = true;
      markDirty();
      return;
    }
    if (state.appMode === "draw") {
      enterDrawMode();
    }
    if (state.appMode === "gallery") {
      enterGalleryMode();
      return;
    }
    if (state.appMode === "collection") {
      state.collectionPageOpen = true;
      uiRenderCollection();
    }
  }

  function loadPattern(pattern, keepPhase = false) {
    state.selectedPattern = pattern;
    if (baseIdFor(pattern).startsWith("custom-")) {
      setCustomDenoiseControls(pattern.sourceDenoiseLevel ?? state.customDenoiseLevel);
    }
    invalidateLayoutCache();
    if (baseIdFor(pattern).startsWith("custom-")) {
      closeRemapModal();
    }
    const normalizedMap = normalizePatternColorMapForActivePalette(pattern);
    invalidateEffectiveMap(pattern);
    state.patternColorMap = normalizedMap;
    uiSetSizeControls(pattern.size);
    const total = boardCols(pattern) * boardRows(pattern);
    state.placed = Array(total).fill(null);
    invalidatePlacedCounts();
    state.heat = Array(total).fill(0);
    state.trayColor = null;
    state.trayProgress = 0;
    state.trayBeans = 0;
    state.trayCapacity = 0;
    state.trayMatrix = makeTrayMatrix(0);
    state.trayPourId = 0;
    state.spill = null;
    state.spillDamages = [];
    state.fusedPieces = [];
    state.floorDrops = [];
    state.conceptEaster = false;
    state.conceptEasterType = null;
    state.projectedGuideCache = null;
    state.lampOn = false;
    state.boardView.scale = 1;
    state.boardView.panX = 0;
    state.boardView.panY = 0;
    state.gesture.active = false;
    state.gesture.touchActive = false;
    state.gesture.pointers = {};
    state.tweezerBead = null;
    state.needleLoaded = 0;
    state.errors = [];
    state.showHints = false;
    state.cooling = 0;
    state.flattening = 0;
    state.warp = 18;
    state.flipCount = 0;
    state.craft = normalizeCraft(pattern.craft);
    state.savedCurrent = false;
    resetBuildTimer();
    state.buildMs = 0;
    state.tool = "needle";
    state.needleTier = 1;
    const firstColor = getPatternColors(pattern)[0] || "K";
    state.selectedColor = firstColor;
    state.previewDirty = true;
    state.patternsDirty = true;
    if (!keepPhase) state.phase = "choose";
    markDirty();
  }



  // --- Audio & Haptics ---
  // Sound + vibration now live in sfx.js (synthesized foley + paired haptics).
  // triggerHaptic stays as a generic UI shim for existing callers; craft actions
  // call sfxFeedback("<event>") directly for their own characterful sound.
  function triggerHaptic(type = "light") {
    if (type === "error") return sfxFeedback("error");
    if (type === "heavy") return sfxFeedback("drop");
    return sfxFeedback("ui-tap");
  }

  // --- Active build timer (feeds the share card's 用时 KPI) ---
  // Runs only while actively making the current piece: in the bead studio's
  // working phases and with the tab visible. Paused on home/gallery, tab hide,
  // and completion (finish). main.js calls syncBuildTimer() on every phase /
  // mode / visibility change; loadPattern resets it for a new work.
  const BUILD_PHASES = new Set(["place", "inspect", "iron", "cool"]);
  function buildTimerShouldRun() {
    return state.appMode === "bead"
      && BUILD_PHASES.has(state.phase)
      && document.visibilityState !== "hidden";
  }
  function syncBuildTimer() {
    if (buildTimerShouldRun()) startBuildTimer();
    else pauseBuildTimer();
    state.buildMs = buildElapsedMs();
  }

  function setPhase(phase) {
    if (phase !== state.phase) {
      if (phase === "finish") sfxFeedback("finish");
      else if (phase === "cool") playSfx("cool");
    }
    state.phase = phase;
    state.pointer.down = false;
    state.pointer.mode = null;
    state.pointer.trayTapPending = false;
    state.pointer.pendingCell = null;
    state.gesture.active = false;
    state.gesture.touchActive = false;
    state.gesture.pointers = {};
    if (phase !== "place") state.keyboardGrid.visible = false;
    if (phase !== "place" && phase !== "inspect") {
      if (state.boardView.scale > 1.01) {
        state.boardView.scale = 1;
        state.boardView.panX = 0;
        state.boardView.panY = 0;
      }
    }
    state.ironPos = null;
    if (phase !== "iron") state.emptyIronEaster = false;
    if (phase !== "finish") state.conceptEaster = false;
    if (phase !== "finish") state.conceptEasterType = null;
    if (phase !== "cool" && phase !== "finish") state.fusedPieces = [];
    if (phase !== "place") state.tweezerBead = null;
    if (phase !== "choose" && state.remapModalOpen) closeRemapModal();
    if (phase === "inspect") {
      runInspection();
      // Result chime on entering the check: positive if flawless, neutral scan otherwise.
      if (!state.sandboxMode) sfxFeedback(state.errors.length ? "inspect" : "success");
    }
    if (phase === "iron") {
      state.temperature = IRON_DEFAULT_TEMPERATURE;
      state.pressure = IRON_DEFAULT_PRESSURE;
      state.showHints = false;
    }
    if (phase === "cool" && state.cooling < 12) {
      state.cooling = 12;
      state.warp = Math.max(state.warp, estimateWarp());
    }
    if (phase === "cool" || phase === "finish") {
      state.fusedPieces = buildFusedPiecesFromPlaced();
    }
    state.pendingWorkflowScroll = true;
    schedulePhaseViewportReset();
    syncBuildTimer();
    markDirty();
    updateFullBg();
    if (phase === "place") maybeShowOnboarding();
  }


  function schedulePhaseViewportReset() {
    state.pendingPageReset = true;
  }

  function resetPhaseViewport() {
    const reset = () => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "auto",
      });
    };
    reset();
    window.requestAnimationFrame(() => {
      reset();
      window.requestAnimationFrame(reset);
    });
    window.setTimeout(reset, 120);
  }

  function toggleSandboxMode(next = !state.sandboxMode) {
    const enabled = Boolean(next);
    if (state.sandboxMode === enabled) return;
    state.sandboxMode = enabled;
    state.errors = [];
    if (state.phase === "inspect") runInspection();
    showToast(enabled ? "沙盒模式已开启：自由拼摆，不做图纸校验。" : "沙盒模式已关闭：恢复图纸校验流程。");
    markDirty();
  }

  function toggleLamp(next = !state.lampOn) {
    state.lampOn = Boolean(next);
    sfxFeedback("lamp");
    state.lampSwitchFlashUntil = performance.now() + 140;
    showToast(state.lampOn ? "工作灯已打开：投影色稿可见。" : "工作灯已关闭：关闭投影色稿。");
    markDirty();
  }




  function canDropToFloorAt(x, y) {
    // Anywhere that isn't an interactive zone counts as "floor" — keeping the
    // reference sheet droppable too gives a reliably clickable discard area.
    if (boardCellFromPoint(x, y)) return false;
    if (shouldShowTray() && pointInTray(x, y)) return false;
    if (shouldShowTray() && pointInTrayDumpButton(x, y)) return false;
    if (pointInLampSwitch(x, y)) return false; // lamp toggle owns its hit area
    return true;
  }

  function dropHeldBeadToFloor(x, y) {
    if (state.phase !== "place") return false;
    if (useMobileDirectPlacement()) return false;
    if (!canDropToFloorAt(x, y)) return false;
    let code = null;
    if (state.tool === "tweezers") {
      if (!state.tweezerBead) return false;
      code = state.tweezerBead;
      state.tweezerBead = null;
    } else {
      if (!state.needleLoaded || !state.trayColor) return false;
      code = state.trayColor;
      state.needleLoaded = Math.max(0, state.needleLoaded - 1);
      state.trayProgress = clamp(state.trayProgress - 0.06, 0, 100);
    }
    const drop = {
      x,
      y,
      code,
      orientation: Math.random() < 0.5 ? "h" : "v",
      seed: pseudoRandom(`${state.selectedPattern.id}-${Date.now()}-${x}-${y}`),
      bornAt: performance.now(),
      duration: 760 + Math.round(pseudoRandom(`${state.selectedPattern.id}-${x}-${y}-dur`) * 260),
      spinDir: pseudoRandom(`${state.selectedPattern.id}-${x}-${y}-spin`) > 0.5 ? 1 : -1,
    };
    state.floorDrops.push(drop);
    if (state.floorDrops.length > 52) state.floorDrops.shift();
    sfxFeedback("floor-drop");
    showToast(`${beadLabel(code)} 掉到地板上了。`);
    state.savedCurrent = false;
    markDirty();
    return true;
  }

  function handlePreviewPickRemap(event) {
    if (state.phase !== "choose") return;
    const cell = previewCellFromPoint(event.clientX, event.clientY);
    if (!cell) return;
    const sourceCode = state.selectedPattern.rows[cell.y]?.[cell.x] || ".";
    if (sourceCode === ".") return;
    openRemapModal(sourceCode);
  }

  function openCollectionPage() {
    if (!els.collectionScreen) return;
    state.collectionPageOpen = true;
    setAppMode("collection");
    uiRenderCollection();
  }

  function closeCollectionPage() {
    if (!els.collectionScreen) return;
    state.collectionPageOpen = false;
    const viewer = els.collectionScreen.querySelector(".collection-enlarged");
    if (viewer) viewer.classList.remove("show");
    setAppMode("home");
    requestAnimationFrame(() => els.collectionButton?.focus?.());
  }

  function startIroning(forceSpill = false) {
    if (placedCount() <= 0) {
      state.emptyIronEaster = true;
      showToast("空板熨烫彩蛋触发：出现隐藏压纹。");
      setPhase("iron");
      return;
    }
    if (state.spill && !forceSpill) {
      showToast("还有倒下的豆子未处理。");
      return;
    }
    if (state.spill && forceSpill) {
      state.spillDamages.push({
        index: state.spill.index,
        code: state.spill.code,
      });
      state.heat[state.spill.index] = Math.max(state.heat[state.spill.index] || 0, 118);
      state.spill = null;
      state.warp = clamp(state.warp + 8, 0, 80);
      showToast("你选择直接熨烫，倒下的豆子已经糊在一起。");
    }
    state.temperature = IRON_DEFAULT_TEMPERATURE;
    state.pressure = IRON_DEFAULT_PRESSURE;
    setPhase("iron");
  }

  function resetPatternColorMapping() {
    const map = state.patternColorMap || {};
    const patternId = baseIdFor(state.selectedPattern);
    const sourceColors = getSourcePatternColors();
    const changed = sourceColors.some((code) => (map[code] || code) !== code);
    if (!changed) {
      showToast("当前就是原始配色。");
      return;
    }
    sourceColors.forEach((code) => {
      map[code] = code;
    });
    state.patternColorMaps[patternId] = map;
    invalidateEffectiveMap();
    state.previewDirty = true;
    if (state.phase !== "choose" && (placedCount() > 0 || state.trayBeans > 0 || state.needleLoaded > 0 || state.tweezerBead || state.spill)) {
      resetPlacementForRemap();
      showToast("已恢复原色，当前摆放已重置。");
    } else {
      showToast("已恢复官方原色。");
    }
    markDirty();
    renderRemapModal();
  }

  function renderRemapModal() {
    const allSourceColors = getSourcePatternColors();
    const focus = state.remapFocusSource;
    const sourceColors = focus && allSourceColors.includes(focus) ? [focus] : allSourceColors;
    if (!els.remapModalBody) return;
    if (!sourceColors.length) {
      els.remapModalBody.innerHTML = "";
      return;
    }
    if (els.remapModalTitle) {
      els.remapModalTitle.textContent = sourceColors.length === 1
        ? `换色：${beadIds[sourceColors[0]]}`
        : "图纸换色";
    }
    const map = state.patternColorMap || {};
    const allCodes = allColorCodes();
    const activeCodes = new Set(allCodes);
    els.remapModalBody.innerHTML = "";
    sourceColors.forEach((sourceCode) => {
      const card = document.createElement("div");
      card.className = "remap-card";
      const currentTarget = activeCodes.has(map[sourceCode]) ? map[sourceCode] : sourceCode;
      card.innerHTML = `
        <div class="remap-card-head">
          <span class="remap-to">
            <span class="remap-swatch${beadIds[currentTarget] === "H1" ? " is-transparent" : ""}" style="${beadIds[currentTarget] === "H1" ? "" : `background:${palette[currentTarget]}`}"></span>
            <span class="remap-label">${beadIds[currentTarget]}</span>
          </span>
        </div>
      `;
      const swatchGrid = document.createElement("div");
      swatchGrid.className = "swatch-grid";
      allCodes.forEach((code) => {
        const cell = document.createElement("button");
        cell.type = "button";
        const isCellTransparent = beadIds[code] === "H1";
        cell.className = `swatch-cell${currentTarget === code ? " active" : ""}${isCellTransparent ? " is-transparent" : ""}`;
        if (!isCellTransparent) cell.style.background = palette[code];
        cell.title = beadIds[code] || code;
        cell.setAttribute("aria-label", cell.title);
        cell.addEventListener("click", () => {
          setPatternColorMapping(sourceCode, code);
          renderRemapModal();
        });
        swatchGrid.appendChild(cell);
      });
      card.appendChild(swatchGrid);
      els.remapModalBody.appendChild(card);
    });
  }

  function openCollectionEntry(entry) {
    const rawId = String(entry?.id || "");
    const firstDash = rawId.indexOf("-");
    const patternId = firstDash >= 0 ? rawId.slice(firstDash + 1) : "";
    const found = patterns.find((item) => item.id === patternId || baseIdFor(item) === patternId);
    if (!found) {
      showToast("这条收藏对应的图纸当前不可用。");
      return;
    }
    loadPattern(resizePattern(found, state.patternSize), false);
    setAppMode("bead");
    showToast(`已打开收藏：${found.name}`);
  }

  function pourSelectedColor() {
    if (state.trayColor && state.trayColor !== state.selectedColor && state.trayBeans > 0) {
      showToast(`豆筛里还有 ${beadLabel(state.trayColor)}，先倒掉才能换色。`);
      return;
    }
    if (state.trayColor === state.selectedColor && state.trayBeans > 0) {
      showToast(`${beadLabel(state.trayColor)} 已在豆筛中。`);
      return;
    }
    state.trayColor = state.selectedColor;
    state.trayCapacity = calcTrayFillAmount(state.trayColor);
    state.trayPourId += 1;
    sfxFeedback("pour");
    state.trayMatrix = makeTrayMatrix(state.trayCapacity);
    syncTrayBeans();
    state.traySeeds = makeTraySeeds(state.trayColor, state.trayCapacity);
    state.trayProgress = Math.max(state.trayProgress, 4);
    state.needleLoaded = 0;
    showToast(`${beadLabel(state.trayColor)} 倒入豆筛（${state.trayBeans} 颗）。`);
    markDirty();
  }

  function improveSort(amount, message) {
    if (!state.trayColor) {
      showToast("豆筛是空的，先从豆盒倒入一种颜色。");
      return;
    }
    state.trayProgress = clamp(state.trayProgress + amount, 0, 100);
    sfxFeedback("sift");
    showToast(message);
    markDirty();
  }

  function dumpTray() {
    if (!state.trayColor) {
      showToast("豆筛已经是空的。");
      return;
    }
    const oldColor = state.trayColor;
    sfxFeedback("dump");
    state.trayColor = null;
    state.trayProgress = 0;
    state.trayBeans = 0;
    state.trayCapacity = 0;
    state.trayMatrix = makeTrayMatrix(0);
    state.needleLoaded = 0;
    state.traySeeds = [];
    showToast(`${beadLabel(oldColor)} 已倒回豆盒。`);
    markDirty();
  }

  function loadNeedleFromTray(rowIndex = null) {
    if (!state.trayColor || state.trayBeans <= 0) {
      showToast("豆筛里没有可取的豆子。");
      return;
    }
    if (state.trayProgress <= needleLoadSortThreshold) {
      showToast("豆筛还不够整齐，多筛几下再上豆针。");
      return;
    }
    const cap = needleCapacity();
    const need = cap - state.needleLoaded;
    if (need <= 0) {
      showToast("豆针已装满。");
      return;
    }
    const row = rowIndex === null || rowIndex === undefined
      ? 0
      : clamp(rowIndex, 0, Math.max(0, state.trayMatrix.length - 1));
    const trayRow = state.trayMatrix[row] || [];
    let grabbed = 0;
    for (let col = trayRow.length - 1; col >= 0 && grabbed < need; col -= 1) {
      if (!trayRow[col]) continue;
      trayRow[col] = false;
      grabbed += 1;
    }
    if (!grabbed) {
      showToast("这一条槽已经没豆子了，点另一条槽。");
      return;
    }
    state.needleLoaded += grabbed;
    sfxFeedback("grab");
    syncTrayBeans();
    state.trayProgress = clamp(state.trayProgress - grabbed * 0.12, 0, 100);
    showToast(`豆针从第 ${row + 1} 条槽取到 ${grabbed} 颗 ${beadIds[state.trayColor]}。`);
    markDirty();
  }

  function loadTweezersFromTray(rowIndex = null, colIndex = null) {
    if (!state.trayColor || state.trayBeans <= 0) {
      showToast("豆筛里没有可夹的豆子。");
      return;
    }
    if (state.tweezerBead) {
      showToast("镊子上已经夹着一颗，先放下或放回豆盒。");
      return;
    }
    let row = rowIndex;
    let col = colIndex;
    if (row === null || col === null || row === undefined || col === undefined) {
      outer: for (let r = 0; r < state.trayMatrix.length; r += 1) {
        for (let c = 0; c < (state.trayMatrix[r]?.length || 0); c += 1) {
          if (state.trayMatrix[r]?.[c]) {
            row = r;
            col = c;
            break outer;
          }
        }
      }
    }
    if (!state.trayMatrix[row]?.[col]) {
      showToast("点击到的位置没有豆子。");
      return;
    }
    state.trayMatrix[row][col] = false;
    syncTrayBeans();
    state.tweezerBead = state.trayColor;
    sfxFeedback("grab");
    state.trayProgress = clamp(state.trayProgress - 0.08, 0, 100);
    showToast(`镊子从豆筛夹起 ${beadLabel(state.tweezerBead)}。`);
    markDirty();
  }

  function handleTrayTap(pos) {
    if (!pos) return;
    setToolPose(pos.x, pos.y);
    const row = trayRowFromPoint(pos.x, pos.y, true);
    const cell = trayCellFromPoint(pos.x, pos.y, true);
    if (state.tool === "needle") {
      if (state.trayProgress <= needleLoadSortThreshold) {
        improveSort(7, "先把豆筛抖整齐，豆针才能上豆。");
        return;
      }
      loadNeedleFromTray(row);
      return;
    }
    if (!cell) {
      showToast("用镊子时请点在豆子上。");
      return;
    }
    loadTweezersFromTray(cell.row, cell.col);
  }

  // Return the bead currently held in the tweezers back to the box (discard it).
  function returnTweezerBead() {
    if (!state.tweezerBead) return false;
    const oldColor = state.tweezerBead;
    state.tweezerBead = null;
    sfxFeedback("drop");
    showToast(`${beadLabel(oldColor)} 放回豆盒。`);
    markDirty();
    return true;
  }

  // Pick a color straight from the bead box onto the tweezers (no tray needed).
  // Clicking the color already held returns it; a different color swaps.
  function tweezerFromBox(code) {
    if (!code) return;
    if (state.tweezerBead === code) {
      returnTweezerBead();
      return;
    }
    state.tweezerBead = code;
    sfxFeedback("grab");
    showToast(`镊子夹起 ${beadLabel(code)}。`);
    markDirty();
  }

  async function clearBoard() {
    const hasContent =
      placedCount() > 0 ||
      state.trayBeans > 0 ||
      state.needleLoaded > 0 ||
      state.tweezerBead ||
      state.spill ||
      state.fusedPieces.length > 0;
    if (hasContent && !(await confirmModal({ message: "清空板面会移除已摆的全部豆子，确定吗？", okText: "清空", danger: true }))) return;
    state.placed.fill(null);
    invalidatePlacedCounts();
    state.heat.fill(0);
    state.errors = [];
    state.cooling = 0;
    state.flattening = 0;
    state.warp = 18;
    state.savedCurrent = false;
    state.spill = null;
    state.spillDamages = [];
    state.fusedPieces = [];
    state.floorDrops = [];
    state.tweezerBead = null;
    state.needleLoaded = 0;
    showToast("板面已清空。");
    markDirty();
  }

  function resetPlacementForRemap() {
    state.placed.fill(null);
    invalidatePlacedCounts();
    state.heat.fill(0);
    state.errors = [];
    state.showHints = false;
    state.cooling = 0;
    state.flattening = 0;
    state.warp = 18;
    state.flipCount = 0;
    state.savedCurrent = false;
    state.spill = null;
    state.spillDamages = [];
    state.fusedPieces = [];
    state.floorDrops = [];
    state.tweezerBead = null;
    state.needleLoaded = 0;
    state.trayColor = null;
    state.trayProgress = 0;
    state.trayBeans = 0;
    state.trayCapacity = 0;
    state.trayMatrix = makeTrayMatrix(0);
    state.traySeeds = [];
    if (state.phase !== "choose" && state.phase !== "place" && state.phase !== "inspect") {
      setPhase("place");
    }
  }

  function setPatternColorMapping(sourceCode, targetCode) {
    if (state.phase !== "choose") {
      showToast("图纸换色只能在开始前设置。");
      return;
    }
    const map = state.patternColorMap || {};
    if (!palette[sourceCode] || !allColorCodes().includes(targetCode)) return;
    if (map[sourceCode] === targetCode) return;
    map[sourceCode] = targetCode;
    const patternId = baseIdFor(state.selectedPattern);
    state.patternColorMaps[patternId] = map;
    invalidateEffectiveMap();
    state.previewDirty = true;
    // The early return above guarantees phase === "choose", so nothing is placed
    // yet — no placement reset is ever needed here, just confirm the swap.
    showToast(`已将 ${beadLabel(sourceCode)} 改为 ${beadLabel(targetCode)}。`);
    const available = getPatternColors();
    if (!available.includes(state.selectedColor)) {
      state.selectedColor = available[0] || sourceCode;
    }
    markDirty();
  }


  function setToolPose(x, y) {
    state.toolPose.x = x;
    state.toolPose.y = y;
    state.toolPose.visible = true;
  }

  function setToolPoseFromCell(x, y) {
    const layout = currentLayout();
    const view = boardViewTransform(layout);
    const rawX = layout.boardX + x * layout.cell + layout.cell / 2;
    const rawY = layout.boardY + y * layout.cell + layout.cell / 2;
    setToolPose(
      (rawX - view.cx) * view.scale + view.cx + view.panX,
      (rawY - view.cy) * view.scale + view.cy + view.panY
    );
  }

  function onPointerDown(event) {
    event.preventDefault();
    if (state.gesture.touchActive) return;
    const pos = pointerToCanvas(event);
    if (state.phase === "place" || state.phase === "inspect") {
      state.gesture.pointers[event.pointerId] = { x: pos.x, y: pos.y };
    }
    state.pointer.down = true;
    state.pointer.x = pos.x;
    state.pointer.y = pos.y;
    state.pointer.lastX = pos.x;
    state.pointer.lastY = pos.y;
    state.pointer.lastT = performance.now();
    state.lastCellKey = "";
    sceneCanvas.setPointerCapture?.(event.pointerId);

    if ((state.phase === "place" || state.phase === "inspect") && gesturePointerCount() >= 2) {
      const pair = gesturePrimaryPair();
      if (pair) {
        const [p1, p2] = pair;
        startBoardGesture(p1, p2);
        return;
      }
    }

    if (!useMobileDirectPlacement() && (state.phase === "place" || state.phase === "inspect") && pointInLampSwitch(pos.x, pos.y)) {
      toggleLamp();
      state.pointer.down = false;
      state.pointer.mode = "lamp";
      state.pointer.trayTapPending = false;
      return;
    }

    if (state.phase === "place" && shouldShowTray() && pointInTrayDumpButton(pos.x, pos.y)) {
      dumpTray();
      state.pointer.mode = null;
      state.pointer.trayTapPending = false;
      state.pointer.pendingCell = null;
      return;
    }

    if (state.phase === "place" && shouldShowTray() && pointInTray(pos.x, pos.y)) {
      state.pointer.mode = "tray";
      state.pointer.trayTapPending = true;
      return;
    }

    if (state.phase === "place") {
      const cell = boardCellFromPoint(pos.x, pos.y);
      if (cell) {
        if (isTouchDevice()) {
          // Don't place immediately on any touch device — wait to see if a second
          // finger arrives (gesture). Committed on first move or on pointerup (tap).
          state.pointer.mode = "place-pending";
          state.pointer.pendingCell = { x: cell.x, y: cell.y };
          setToolPoseFromCell(cell.x, cell.y);
          return;
        }
        state.pointer.mode = "place";
        setToolPoseFromCell(cell.x, cell.y);
        handlePlaceAt(cell.x, cell.y, true);
      } else {
        dropHeldBeadToFloor(pos.x, pos.y);
      }
      return;
    }

    if (state.phase === "iron") {
      const cell = boardCellFromPoint(pos.x, pos.y);
      if (cell) {
        state.pointer.mode = "iron";
        state.ironPos = pos;
        applyIronHeat(pos.x, pos.y, 16, 0);
        markCanvasDirty();
      }
    }
  }

  function onPointerMove(event) {
    event.preventDefault();
    if (state.gesture.touchActive) return;
    const pos = pointerToCanvas(event);
    if (state.phase === "place" || state.phase === "inspect") {
      if (state.gesture.pointers[event.pointerId]) {
        state.gesture.pointers[event.pointerId] = { x: pos.x, y: pos.y };
      }
      if (state.gesture.active) {
        if (gesturePointerCount() < 2) {
          state.gesture.active = false;
        } else {
          const pair = gesturePrimaryPair();
          if (pair) {
            const [p1, p2] = pair;
            updateBoardGesture(p1, p2);
            return;
          }
        }
      }
    }
    const dx = pos.x - state.pointer.lastX;
    const dy = pos.y - state.pointer.lastY;
    const dt = Math.max(10, performance.now() - state.pointer.lastT);
    state.pointer.x = pos.x;
    state.pointer.y = pos.y;

    if (state.pointer.down && state.pointer.mode === "tray") {
      const amount = clamp(Math.hypot(dx, dy) / 18, 0, 3.5);
      if (amount > 0.2 && state.trayColor) {
        state.pointer.trayTapPending = false;
        state.trayProgress = clamp(state.trayProgress + amount, 0, 100);
        markCanvasDirty();
      }
    }

    if (state.pointer.down && state.pointer.mode === "place-pending") {
      // Finger moved before a second finger arrived → commit the first bead and start continuous painting.
      const pending = state.pointer.pendingCell;
      if (pending) {
        handlePlaceAt(pending.x, pending.y, true);
        state.pointer.pendingCell = null;
      }
      state.pointer.mode = "place";
      // fall through to the "place" block below to also handle the current cell
    }

    if (state.pointer.down && state.pointer.mode === "place") {
      if (Math.abs(dx) > 2 || Math.abs(dy) > 2) {
        state.lastMoveDir = Math.abs(dx) > Math.abs(dy) ? { x: Math.sign(dx) || 1, y: 0 } : { x: 0, y: Math.sign(dy) || 1 };
      }
      const cell = boardCellFromPoint(pos.x, pos.y);
      if (cell) handlePlaceAt(cell.x, cell.y, false);
    }

    if (state.pointer.down && state.pointer.mode === "iron") {
      state.ironPos = pos;
      applyIronHeat(pos.x, pos.y, dt, Math.hypot(dx, dy));
      markCanvasDirty();
    }

    if (!state.pointer.down && (state.phase === "place" || state.phase === "inspect")) {
      markCanvasDirty();
    }

    state.pointer.lastX = pos.x;
    state.pointer.lastY = pos.y;
    state.pointer.lastT = performance.now();
  }

  function onPointerUp(event) {
    event.preventDefault();
    if (state.gesture.touchActive) return;
    const pos = pointerToCanvas(event);
    if (state.gesture.pointers[event.pointerId]) delete state.gesture.pointers[event.pointerId];
    if (state.gesture.active && gesturePointerCount() < 2) {
      state.gesture.active = false;
    }
    if (state.phase === "place" && state.pointer.mode === "tray" && state.pointer.trayTapPending) {
      handleTrayTap(pos);
    }
    // Commit a pending mobile tap (finger lifted without moving = single-bead tap).
    if (state.phase === "place" && state.pointer.mode === "place-pending") {
      const pending = state.pointer.pendingCell;
      if (pending) handlePlaceAt(pending.x, pending.y, true);
    }
    state.pointer.down = false;
    state.pointer.mode = null;
    state.pointer.trayTapPending = false;
    state.pointer.pendingCell = null;
    state.lastCellKey = "";
    if (state.phase === "iron") state.ironPos = pos;
    markCanvasDirty();
  }

  function onTouchStart(event) {
    if (state.phase !== "place" && state.phase !== "inspect") return;
    if (event.touches.length < 2) return;
    event.preventDefault();
    startBoardGesture(touchToCanvas(event.touches[0]), touchToCanvas(event.touches[1]), true);
  }

  function onTouchMove(event) {
    if (!state.gesture.touchActive) return;
    event.preventDefault();
    if (event.touches.length < 2) {
      state.gesture.active = false;
      state.gesture.touchActive = false;
      return;
    }
    updateBoardGesture(touchToCanvas(event.touches[0]), touchToCanvas(event.touches[1]));
  }

  function onTouchEnd(event) {
    if (!state.gesture.touchActive) return;
    event.preventDefault();
    if (event.touches.length >= 2) {
      startBoardGesture(touchToCanvas(event.touches[0]), touchToCanvas(event.touches[1]), true);
      return;
    }
    state.gesture.active = false;
    state.gesture.touchActive = false;
    state.gesture.pointers = {};
    state.pointer.down = false;
    state.pointer.mode = null;
    state.pointer.pendingCell = null;
    markCanvasDirty();
  }

  function handlePlaceAt(x, y, initial) {
    setToolPoseFromCell(x, y);
    const spillKey = state.spill ? `${state.spill.index}:${state.spill.code}` : "-";
    const key = useMobileDirectPlacement()
      ? `${x}:${y}:mobile:${state.selectedColor}:${spillKey}`
      : `${x}:${y}:${state.tool}:${state.selectedColor}:${state.trayColor || "-"}:${state.tweezerBead || "-"}:${spillKey}`;
    if (!initial && key === state.lastCellKey) return;
    state.lastCellKey = key;
    if (useMobileDirectPlacement()) {
      placeSelectedBead(x, y, initial);
      return;
    }
    if (state.tool === "tweezers") {
      // Tweezers act once per click — never along a drag, otherwise a long-press
      // move picks/places on every cell tick. (The needle is allowed to paint.)
      if (initial) useTweezers(x, y);
      return;
    }
    useNeedle(x, y);
  }

  function placeSelectedBead(x, y, initial = true) {
    if (!isActiveTileCell(x, y)) return;
    // No bead box selected → look-without-placing: a board tap places nothing.
    if (!state.selectedColor) {
      if (initial) showPlaceHint("先在豆盒里选一个颜色再放置。", "place:no-color");
      return;
    }
    const index = indexFor(x, y);
    if (state.spill && state.spill.index === index) {
      state.spill = null;
    }
    const current = state.placed[index];
    // Drag-paint (initial=false) only fills empty cells — a continuous swipe
    // must never overwrite a different color or erase a bead you already placed.
    // Deliberate taps still toggle (same color removes) and replace.
    if (!initial && current) return;
    const removing = current === state.selectedColor;
    if (removing) {
      state.placed[index] = null;
      state.heat[index] = 0;
    } else {
      state.placed[index] = state.selectedColor;
      state.heat[index] = 0;
    }
    sfxFeedback(removing ? "bead-remove" : "bead-place");
    if (useMobileDirectPlacement()) {
      state.mobileBeadSettle = !removing && !prefersReducedMotion()
        ? { index, startedAt: performance.now(), duration: 180 }
        : null;
    }
    invalidatePlacedCounts();
    state.savedCurrent = false;
    uiUpdateSelectedPaletteCount();
    markCanvasDirty();
  }

  function announceKeyboardGrid(message) {
    showPlaceHint(message, `keyboard-grid:${message}`);
  }

  function showKeyboardGrid() {
    if (state.phase !== "place") return;
    if (!sceneCanvas.matches(":focus-visible")) return;
    const cursor = normalizeGridCursor(state.keyboardGrid, boardCols(), boardRows());
    state.keyboardGrid = { ...cursor, visible: true };
    announceKeyboardGrid(
      `键盘格点：第 ${cursor.y + 1} 行，第 ${cursor.x + 1} 列，当前颜色 ${beadLabel(state.selectedColor)}。`,
    );
    markCanvasDirty();
  }

  function hideKeyboardGrid() {
    if (!state.keyboardGrid.visible) return;
    state.keyboardGrid.visible = false;
    markCanvasDirty();
  }

  function handleKeyboardGridKey(event) {
    if (document.activeElement !== sceneCanvas || state.phase !== "place") return false;
    const action = keyboardGridAction(event.key);
    if (action === "clear") {
      event.preventDefault();
      hideKeyboardGrid();
      sceneCanvas.blur();
      return true;
    }
    if (event.key.startsWith("Arrow")) {
      event.preventDefault();
      const cursor = moveGridCursor(state.keyboardGrid, event.key, boardCols(), boardRows());
      state.keyboardGrid = { ...cursor, visible: true };
      announceKeyboardGrid(
        `第 ${cursor.y + 1} 行，第 ${cursor.x + 1} 列，当前颜色 ${beadLabel(state.selectedColor)}。`,
      );
      markCanvasDirty();
      return true;
    }
    if (action === "place") {
      event.preventDefault();
      const cursor = normalizeGridCursor(state.keyboardGrid, boardCols(), boardRows());
      const index = indexFor(cursor.x, cursor.y);
      const removed = state.placed[index] === state.selectedColor;
      placeSelectedBead(cursor.x, cursor.y, true);
      announceKeyboardGrid(
        `${removed ? "已取下" : "已放置"} ${beadLabel(state.selectedColor)}，第 ${cursor.y + 1} 行，第 ${cursor.x + 1} 列。`,
      );
      return true;
    }
    return false;
  }

  function useTweezers(x, y) {
    const index = indexFor(x, y);
    if (state.spill && state.spill.index === index) {
      if (state.tweezerBead) {
        showToast("镊子上已经夹着一颗，先放下或放回豆盒。");
        return;
      }
      state.tweezerBead = state.spill.code;
      state.placed[index] = null;
      invalidatePlacedCounts();
      state.heat[index] = 0;
      state.spill = null;
      state.savedCurrent = false;
      sfxFeedback("pick");
      showToast("卡住的豆子已经夹起，可以继续摆放。");
      markDirty();
      return;
    }
    if (state.placed[index]) {
      if (state.tweezerBead) {
        showToast("镊子上已经夹着一颗，先放下或放回豆盒。");
        return;
      }
      state.tweezerBead = state.placed[index];
      state.placed[index] = null;
      invalidatePlacedCounts();
      state.heat[index] = 0;
      sfxFeedback("pick");
      showToast("镊子取下一颗豆子。");
    } else {
      if (!state.tweezerBead) {
        showToast("先从豆盒夹一颗豆子。");
        return;
      }
      if (!isActiveTileCell(x, y)) return;
      state.placed[index] = state.tweezerBead;
      invalidatePlacedCounts();
      state.tweezerBead = null;
      sfxFeedback("bead-place");
    }
    state.savedCurrent = false;
    markDirty();
  }

  function useNeedle(x, y) {
    if (!state.trayColor) {
      showToast("针工具需要先从豆盒倒豆进豆筛。");
      return;
    }
    if (state.needleLoaded <= 0) {
      showToast("豆针空了，先从豆筛取豆。");
      return;
    }
    const quality = state.trayProgress;
    if (quality < 12) {
      showToast("豆筛还没排齐，先抖动一下。");
      return;
    }
    const spillChance = quality < 45 ? 0.12 : quality < 70 ? 0.07 : 0.035;
    if (!state.spill && Math.random() < spillChance) {
      const spill = createSpillAt(x, y, state.trayColor);
      if (spill) {
        state.spill = spill;
        state.placed[spill.index] = spill.code;
        invalidatePlacedCounts();
        state.heat[spill.index] = 0;
        state.needleLoaded = Math.max(0, state.needleLoaded - 1);
        state.trayProgress = clamp(state.trayProgress - 0.3, 0, 100);
        showToast("豆子倒下来卡住了，先继续也行，熨烫前记得处理。");
        markDirty();
        return;
      }
      return;
    }
    const cells = [[x, y]];
    if (state.needleTier === 3 && state.needleLoaded > 1) {
      cells.push([x + state.lastMoveDir.x, y + state.lastMoveDir.y]);
    }
    if (state.needleTier === 3 && state.needleLoaded > 2) {
      cells.push([x + state.lastMoveDir.x * 2, y + state.lastMoveDir.y * 2]);
    }
    let placedAny = false;
    let used = 0;
    cells.forEach(([cx, cy]) => {
      if (used >= state.needleLoaded) return;
      if (cx < 0 || cy < 0 || cx >= boardCols() || cy >= boardRows()) return;
      if (!isActiveTileCell(cx, cy)) return;
      const index = indexFor(cx, cy);
      if (state.placed[index]) return;
      state.placed[index] = state.trayColor;
      invalidatePlacedCounts();
      placedAny = true;
      used += 1;
    });
    if (placedAny) {
      sfxFeedback("bead-place");
      state.needleLoaded = Math.max(0, state.needleLoaded - used);
      const drain = Math.max(0.1, used * 0.12);
      state.trayProgress = clamp(state.trayProgress - drain, 0, 100);
      state.savedCurrent = false;
      if (state.needleLoaded <= 0) showToast("豆针已空，请重新取豆。");
      markDirty();
    }
  }

  function createSpillAt(x, y, code) {
    sfxFeedback("spill");
    const cols = boardCols();
    const rows = boardRows();
    const spots = [
      [x, y],
      [x + 1, y],
      [x - 1, y],
      [x, y + 1],
      [x, y - 1],
      [x + 1, y + 1],
      [x - 1, y + 1],
      [x + 1, y - 1],
      [x - 1, y - 1],
    ];
    for (let i = 0; i < spots.length; i += 1) {
      const [sx, sy] = spots[i];
      if (sx < 0 || sy < 0 || sx >= cols || sy >= rows) continue;
      if (!isActiveTileCell(sx, sy)) continue;
      const index = indexFor(sx, sy);
      if (state.placed[index]) continue;
      const jitterSeed = pseudoRandom(`${state.selectedPattern.id}-${index}-${Date.now()}`);
      const orientation = Math.random() < 0.5 ? "h" : "v";
      return { index, code, jitterSeed, orientation };
    }
    return null;
  }

  function applyIronHeat(x, y, dt, distance) {
    const layout = currentLayout();
    const cell = boardCellFromPoint(x, y);
    if (!cell) return;
    sfxFeedback("iron"); // throttled inside sfx.js → a continuous sizzle while ironing
    const speed = distance / Math.max(dt, 1);
    const speedFactor = clamp(1.42 - speed * 1.45, 0.42, 1.55);
    const pressure = state.pressure / 58;
    const temp = state.temperature / 62;
    const base = (dt / 16) * pressure * temp * speedFactor * 0.6;
    const radius = layout.cell * 1.65;
    const cols = boardCols();
    const rows = boardRows();

    for (let cy = cell.y - 2; cy <= cell.y + 2; cy += 1) {
      for (let cx = cell.x - 2; cx <= cell.x + 2; cx += 1) {
        if (cx < 0 || cy < 0 || cx >= cols || cy >= rows) continue;
        const index = indexFor(cx, cy);
        if (!state.placed[index]) continue;
        const centerX = layout.boardX + cx * layout.cell + layout.cell / 2;
        const centerY = layout.boardY + cy * layout.cell + layout.cell / 2;
        const falloff = clamp(1 - Math.hypot(centerX - x, centerY - y) / radius, 0, 1);
        const add = base * (0.35 + falloff * 0.9);
        state.heat[index] = clamp((state.heat[index] || 0) + add, 0, 138);
        if (state.heat[index] > 108) state.warp = clamp(state.warp + add * 0.022, 0, 80);
      }
    }
  }

  function runInspection() {
    state.errors = [];
    if (state.sandboxMode) return;
    const cols = boardCols();
    const rows = boardRows();
    for (let y = 0; y < rows; y += 1) {
      for (let x = 0; x < cols; x += 1) {
        const index = indexFor(x, y);
        const target = targetAt(x, y);
        const placed = state.placed[index];
        if (target && !placed) state.errors.push({ index, type: "missing" });
        if (target && placed && target !== placed) state.errors.push({ index, type: "wrong" });
        if (!target && placed) state.errors.push({ index, type: "extra" });
      }
    }
  }

  function pressFlat() {
    // Block re-press while the scraper stroke is still mid-animation, so the
    // press button can't be rapidly spammed (one full stroke per press).
    const anim = state.pressAnim;
    if (anim && performance.now() - anim.startedAt < anim.duration) return;
    const heat = heatStats();
    const heatedFactor = clamp(heat.heated / Math.max(1, heat.total), 0, 1);
    const bondedFactor = clamp(heat.bonded / Math.max(1, heat.total), 0, 1);
    const effective = clamp(heatedFactor * 0.45 + bondedFactor * 0.55, 0, 1);
    const flattenGain = lerp(5, 30, effective);
    const warpReduce = lerp(2, 12, effective);
    state.flattening = clamp(state.flattening + flattenGain, 0, 100);
    state.warp = clamp(state.warp - warpReduce, 0, 80);
    sfxFeedback("press");
    // Trigger the scraper-from-bottom animation.
    state.pressAnim = { startedAt: performance.now(), duration: 820 };
    if (effective < 0.2) {
      showToast("受热不足，压平效果很小。再熨一会儿会更好压。");
    } else {
      showToast("压板压住作品，边缘更平了。");
    }
    markDirty();
  }

  function flipAndIron() {
    sfxFeedback("flip");
    state.flipCount += 1;
    state.cooling = 20;
    state.heat = state.heat.map((heat) => heat * 0.82);
    showToast("翻面完成，再轻熨一次。");
    setPhase("iron");
  }

  function completeWork() {
    if (state.sandboxMode) {
      const placed = placedCount();
      const totalSlots = state.placed.length;
      if (placed === 0) {
        enterConceptEaster("empty");
        return;
      }
      if (placed === totalSlots && totalSlots > 0) {
        enterConceptEaster("full");
        return;
      }
    }
    setPhase("finish");
    saveCurrentWork();
  }

  function enterConceptEaster(type) {
    state.conceptEaster = true;
    state.conceptEasterType = type;
    if (type === "full") {
      unlockAchievement(fullBoardAchievement, (a) => { sfxFeedback("achievement"); showAchievementToast(a); });
    } else {
      unlockAchievement(conceptAchievement, (a) => { sfxFeedback("achievement"); showAchievementToast(a); });
    }
    setPhase("finish");
    state.savedCurrent = false;
    markDirty();
  }

  function saveCurrentWork() {
    const entry = {
      id: `${Date.now()}-${state.selectedPattern.id}`,
      name: state.selectedPattern.name,
      craft: state.craft,
      grade: finalGrade(),
      date: new Date().toLocaleDateString("zh-CN", { month: "2-digit", day: "2-digit" }),
      size: state.selectedPattern.size,
      width: boardCols(),
      height: boardRows(),
      buildMs: buildElapsedMs(),
      placed: state.placed.slice(),
    };
    if (!state.savedCurrent) {
      collection.unshift(entry);
      collection = collection.slice(0, collectionLimit);
      const stored = writeCollection(collection);
      state.savedCurrent = true;
      if (stored) {
        showToast("作品已收入作品集。");
        celebrate();
      }
    } else {
      showToast("这个版本已经保存过。");
    }
    markDirty();
  }

  // Ensure LXGW Marker Gothic is loaded before the canvas draws, or the cute font
  // silently falls back (canvas FOUT). Resolves immediately once cached.
  function ensureShareFonts() {
    if (!document.fonts?.load) return Promise.resolve();
    return Promise.all([
      document.fonts.load("400 92px 'LXGW Marker Gothic'"),
      document.fonts.load("500 26px 'Noto Sans SC'"),
      document.fonts.load("700 42px 'Noto Sans SC'"),
    ]).then(() => document.fonts.ready).catch(() => {});
  }

  // Decode the baked QR data: URL once. data: images don't taint the canvas, so
  // the result is safe to draw and still export via toBlob() under file://.
  let shareQrPromise = null;
  function loadShareQR() {
    if (!shareQrPromise) {
      shareQrPromise = new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = () => resolve(null);
        img.src = SHARE_QR_DATA_URL;
      });
    }
    return shareQrPromise;
  }

  async function exportShareImage(format) {
    const portrait = format !== "square";
    const [, qrImg] = await Promise.all([ensureShareFonts(), loadShareQR()]);
    const canvas = document.createElement("canvas");
    canvas.width = 1080;
    canvas.height = portrait ? 1440 : 1080;
    const ctx = canvas.getContext("2d");
    drawShareImage(ctx, canvas.width, canvas.height, portrait, qrImg);

    const filename = `拼豆工坊-${state.selectedPattern.name}-${portrait ? "竖图" : "方图"}.png`;
    const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/png"));
    if (!blob) {
      showToast("导出失败，请重试。");
      return;
    }

    // P0: Web Share API — on iOS Safari an <a download> click is a no-op, so the
    // native share sheet is the only way to actually save/share the image there.
    const file = new File([blob], filename, { type: "image/png" });
    if (navigator.canShare?.({ files: [file] })) {
      try {
        await navigator.share({ files: [file], title: "拼豆工坊" });
        return;
      } catch (err) {
        if (err?.name === "AbortError") return; // user dismissed the sheet
      }
    }

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = filename;
    link.href = url;
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    showToast("已导出分享图。");
  }

  function copyShareText() {
    const slogans = ["想拼就拼，走到哪拼到哪", "碎片时间，玩会赛博拼豆", "一部手机，随身的拼豆台"];
    const slogan = slogans[Math.floor(Math.random() * slogans.length)];
    const timeText = state.buildMs > 0 ? `，花了 ${formatBuildTime(state.buildMs)}` : "";
    const text = [
      `赛博拼豆，${slogan}。`,
      `今天拼了「${state.selectedPattern.name}」，${getTargetTotal()}颗、${getPatternColors().length}个色号，最后评级 ${finalGrade()}${timeText}。`,
      `一部手机就能拼，碎片时间随手来一块。`,
      `#拼豆 #手作 #像素画 #解压 #小游戏`,
    ].join("\n");
    autoCopyText(text, "文案已复制。", "复制失败，请手动复制。");
  }



  function shouldAnimateCanvas(now) {
    if (state.pointer.down) return true;
    if (state.phase === "cool" && (state.cooling < 100 || state.flattening > 0)) return true;
    if (now < state.lampSwitchFlashUntil) return true;
    if (state.floorDrops.length > 0) return true;
    if (state.pressAnim && now - state.pressAnim.startedAt < state.pressAnim.duration) return true;
    if (!prefersReducedMotion() && state.craftSwitchAt && now - state.craftSwitchAt < 260) return true;
    if (
      state.mobileBeadSettle
      && now - state.mobileBeadSettle.startedAt < state.mobileBeadSettle.duration
    ) return true;
    const nav = state.kbdNav;
    if (nav.up || nav.down || nav.left || nav.right || nav.zoomIn || nav.zoomOut) return true;
    const bv = state.boardView;
    if (Math.abs(bv.velX) > 0.5 || Math.abs(bv.velY) > 0.5 || Math.abs(bv.velScale) > 0.001) return true;
    return false;
  }

  function tickKbdNav(dtSec) {
    const nav = state.kbdNav;
    const bv = state.boardView;
    const boardPhase = state.phase === "place" || state.phase === "inspect";
    if (!boardPhase) return;

    const PAN_ACCEL = 2200;  // px/s²  — acceleration while key held
    const PAN_DECEL = 5000;  // px/s²  — deceleration after release (snappy stop)
    const PAN_MAX   = 560;   // px/s   — top pan speed
    const ZOOM_ACCEL = 4.5;  // scale/s²
    const ZOOM_DECEL = 10;
    const ZOOM_MAX   = maxBoardScale(currentLayout()) - 1;

    // Horizontal: A/← moves viewport left → board pans right → panX increases
    const wantLeft  = nav.left  && !nav.right;
    const wantRight = nav.right && !nav.left;
    if (wantLeft)         bv.velX = Math.min( PAN_MAX,  bv.velX + PAN_ACCEL * dtSec);
    else if (wantRight)   bv.velX = Math.max(-PAN_MAX,  bv.velX - PAN_ACCEL * dtSec);
    else if (bv.velX > 0) bv.velX = Math.max(0, bv.velX - PAN_DECEL * dtSec);
    else if (bv.velX < 0) bv.velX = Math.min(0, bv.velX + PAN_DECEL * dtSec);

    // Vertical: W/↑ moves viewport up → board pans down → panY increases
    const wantUp   = nav.up   && !nav.down;
    const wantDown = nav.down && !nav.up;
    if (wantUp)           bv.velY = Math.min( PAN_MAX,  bv.velY + PAN_ACCEL * dtSec);
    else if (wantDown)    bv.velY = Math.max(-PAN_MAX,  bv.velY - PAN_ACCEL * dtSec);
    else if (bv.velY > 0) bv.velY = Math.max(0, bv.velY - PAN_DECEL * dtSec);
    else if (bv.velY < 0) bv.velY = Math.min(0, bv.velY + PAN_DECEL * dtSec);

    // Zoom
    const wantIn  = nav.zoomIn  && !nav.zoomOut;
    const wantOut = nav.zoomOut && !nav.zoomIn;
    if (wantIn)            bv.velScale = Math.min( ZOOM_MAX, bv.velScale + ZOOM_ACCEL * dtSec);
    else if (wantOut)      bv.velScale = Math.max(-ZOOM_MAX, bv.velScale - ZOOM_ACCEL * dtSec);
    else if (bv.velScale > 0) bv.velScale = Math.max(0, bv.velScale - ZOOM_DECEL * dtSec);
    else if (bv.velScale < 0) bv.velScale = Math.min(0, bv.velScale + ZOOM_DECEL * dtSec);

    // Apply
    const movingPan  = Math.abs(bv.velX) > 0.5 || Math.abs(bv.velY) > 0.5;
    const movingZoom = Math.abs(bv.velScale) > 0.001;
    if (movingPan || movingZoom) {
      const prevX = bv.panX;
      const prevY = bv.panY;
      setBoardZoom(
        bv.scale + bv.velScale * dtSec,
        bv.panX  + bv.velX    * dtSec,
        bv.panY  + bv.velY    * dtSec
      );
      // If clamped at boundary, kill velocity in that axis to prevent "sticky wall"
      if (bv.panX === prevX) bv.velX = 0;
      if (bv.panY === prevY) bv.velY = 0;
    }
  }

  function tick(now) {
    const dt = Math.min(48, now - lastFrame);
    lastFrame = now;
    tickKbdNav(dt / 1000);
    tickDrawKbdNav(dt / 1000);
    if (state.phase === "cool") {
      const heat = heatStats();
      const overPenalty = heat.overPercent > 18 ? 0.04 : 0;
      const prevCooling = state.cooling;
      const prevFlatten = state.flattening;
      state.cooling = clamp(state.cooling + dt * (0.012 - overPenalty / 100), 0, 100);
      if (state.flattening > 0) state.flattening = clamp(state.flattening - dt * 0.008, 0, 100);
      if (Math.abs(state.cooling - prevCooling) > 0.0001 || Math.abs(state.flattening - prevFlatten) > 0.0001) {
        state.renderDirty = true;
      }
    }
    if (state.uiDirty) {
      uiRenderUI();
      state.uiDirty = false;
    }
    if (state.renderDirty || state.previewDirty || shouldAnimateCanvas(now)) {
      // The render loop must be self-perpetuating: a single bad frame may not
      // tear down the rAF chain (which would freeze the app permanently). Isolate
      // the frame so the next one is always scheduled.
      try {
        render();
      } catch (err) {
        console.error("[render] frame skipped after error:", err);
      }
    }
    requestAnimationFrame(tick);
  }

  function onResize() {
    invalidateLayoutCache();
    if (state.trayColor) syncTrayMatrixShape();
    markDirty();
    if (document.body.dataset.appMode === "draw") paintDrawCanvas();
  }

  sceneCanvas.addEventListener("pointerdown", onPointerDown);
  sceneCanvas.addEventListener("pointermove", onPointerMove);
  sceneCanvas.addEventListener("pointerup", onPointerUp);
  sceneCanvas.addEventListener("pointercancel", onPointerUp);
  sceneCanvas.addEventListener("touchstart", onTouchStart, { passive: false });
  sceneCanvas.addEventListener("touchmove", onTouchMove, { passive: false });
  sceneCanvas.addEventListener("touchend", onTouchEnd, { passive: false });
  sceneCanvas.addEventListener("touchcancel", onTouchEnd, { passive: false });
  sceneCanvas.addEventListener("contextmenu", (event) => {
    event.preventDefault();
    // Right-click discards the bead held in the tweezers.
    if (state.phase === "place" && state.tweezerBead) returnTweezerBead();
  });
  sceneCanvas.addEventListener("focus", showKeyboardGrid);
  sceneCanvas.addEventListener("blur", hideKeyboardGrid);
  sceneCanvas.addEventListener("wheel", (event) => {
    if (state.phase !== "place" && state.phase !== "inspect") return;
    if (event.ctrlKey || event.metaKey) return;
    event.preventDefault();
    const rect = sceneCanvas.getBoundingClientRect();
    const mx = event.clientX - rect.left;
    const my = event.clientY - rect.top;
    const layout = currentLayout();
    const view = boardViewTransform(layout);
    const factor = event.deltaY < 0 ? 1.15 : 1 / 1.15;
    const nextScale = clamp(view.scale * factor, 1, maxBoardScale(layout));
    const ratio = nextScale / view.scale;
    const nextPanX = mx - view.cx - (mx - view.cx - view.panX) * ratio;
    const nextPanY = my - view.cy - (my - view.cy - view.panY) * ratio;
    setBoardZoom(nextScale, nextPanX, nextPanY);
  }, { passive: false });

  els.resetButton.addEventListener("click", async () => {
    const hasProgress = state.phase !== "choose" || placedCount() > 0;
    if (hasProgress && !(await confirmModal({ message: "重置会清空当前所有进度，确定吗？", okText: "重置", danger: true }))) return;
    loadPattern(state.selectedPattern);
    clearAutoSave();
    showToast("已重置当前作品。");
  });
  els.startBeadButton?.addEventListener("click", () => {
    setAppMode("bead");
  });
  initStartShowcase({
    onPick: (pattern) => {
      loadPattern(pattern);
      setAppMode("bead");
    },
  });
  // The 拼豆台 entry resumes whatever work is in memory — a restored session
  // (loadAutoSave) continues automatically, so no separate "继续做" affordance.
  els.startDrawButton?.addEventListener("click", () => {
    setAppMode("draw");
  });
  els.startGalleryButton?.addEventListener("click", () => {
    setAppMode("gallery");
  });
  els.galleryBackButton?.addEventListener("click", () => {
    setAppMode("home");
  });
  els.gallerySettingsButton?.addEventListener("click", () => openSettingsModal());
  els.galleryRefreshButton?.addEventListener("click", () => {
    void loadGallery();
  });
  els.gallerySubmitButton?.addEventListener("click", () => {
    openGallerySubmitModal();
  });
  [els.gallerySubmitCancelBtn, els.gallerySubmitCloseBtn].forEach((btn) => {
    btn?.addEventListener("click", closeGallerySubmitModal);
  });
  els.gallerySubmitConfirmBtn?.addEventListener("click", () => {
    void submitGalleryPattern();
  });
  els.gallerySubmitModal?.addEventListener("click", (event) => {
    if (event.target === els.gallerySubmitModal) closeGallerySubmitModal();
  });
  els.beadBackButton?.addEventListener("click", () => {
    // Exit boundary: persist the in-progress work so it can be resumed, then
    // leave. flushAutoSave() writes when there is a real work-in-progress and
    // clears the slot when only browsing (phase "choose"). The work also stays
    // in memory, so re-entering the 拼豆台 continues right where you left off.
    flushAutoSave();
    setAppMode("home");
  });
  els.sandboxButton?.addEventListener("click", () => toggleSandboxMode());

  function reflectBgmButton() {
    if (!els.bgmButton) return;
    const on = isBgmPlaying();
    els.bgmButton.setAttribute("aria-checked", on ? "true" : "false");
    els.bgmButton.setAttribute("aria-label", `背景音乐：${on ? "开" : "关"}`);
  }
  async function setBgm(next) {
    await toggleBgm(next);
    try { localStorage.setItem("perler-bgm", isBgmPlaying() ? "on" : "off"); } catch (e) { /* noop */ }
    reflectBgmButton();
  }
  els.bgmButton?.addEventListener("click", () => {
    void setBgm(!isBgmPlaying());
  });
  // If BGM was on last time, resume it on the first user gesture (works around autoplay restrictions).
  let bgmPref = "off";
  try { bgmPref = localStorage.getItem("perler-bgm") || "off"; } catch (e) { /* noop */ }
  if (bgmPref === "on") {
    const resume = () => {
      document.removeEventListener("pointerdown", resume);
      document.removeEventListener("keydown", resume);
      void setBgm(true);
    };
    document.addEventListener("pointerdown", resume, { once: true });
    document.addEventListener("keydown", resume, { once: true });
  }

  // Sound-effects + vibration toggles (persisted in sfx.js).
  function reflectFxToggle(btn, on, label) {
    if (!btn) return;
    btn.setAttribute("aria-checked", on ? "true" : "false");
    btn.setAttribute("aria-label", `${label}：${on ? "开" : "关"}`);
  }
  reflectFxToggle(els.sfxButton, isSfxEnabled(), "音效");
  reflectFxToggle(els.hapticButton, isHapticEnabled(), "震动");
  els.sfxButton?.addEventListener("click", () => {
    setSfxEnabled(!isSfxEnabled());
    reflectFxToggle(els.sfxButton, isSfxEnabled(), "音效");
    if (isSfxEnabled()) playSfx("ui-tap"); // preview the sound on enable
  });
  els.hapticButton?.addEventListener("click", () => {
    setHapticEnabled(!isHapticEnabled());
    reflectFxToggle(els.hapticButton, isHapticEnabled(), "震动");
    if (isHapticEnabled()) sfxVibrate(8); // preview the buzz on enable
  });

  // Soft tap on UI controls (DOM buttons/chips/cards). Craft sounds come from the
  // canvas, so this never doubles up with them. Settings switches have their own feedback.
  document.addEventListener("click", (event) => {
    const el = event.target.closest?.(
      "button, [role='button'], .color-chip, .tool-card, .gallery-card, .collection-card, .tile, a.settings-link"
    );
    if (!el || el.closest(".settings-toggle")) return;
    playSfx("ui-tap");
  }, true);

  reflectBgmButton();
  const startSelectedPattern = () => {
    if (state.phase === "choose") {
      setPhase("place");
      flushAutoSave();
    }
  };
  els.chooseStartButton?.addEventListener("click", startSelectedPattern);
  els.mobileSelectionStartButton?.addEventListener("click", startSelectedPattern);
  previewCanvas.addEventListener("click", handlePreviewPickRemap);
  els.bgThemeChips?.addEventListener("click", (event) => {
    const btn = event.target.closest("[data-theme]");
    if (!btn || state.bgTheme === btn.dataset.theme) return;
    applyBackgroundTheme(btn.dataset.theme);
    showToast(`背景已切换为 ${currentBackgroundTheme().name}。`);
  });
  els.toolStyleChips?.addEventListener("click", (event) => {
    const btn = event.target.closest("[data-tool]");
    if (!btn) return;
    const next = btn.dataset.tool;
    if (!toolStyles[next] || state.toolStyle === next) return;
    state.toolStyle = next;
    syncChipGroup(els.toolStyleChips, "tool", next);
    showToast(`工具换成${currentToolStyle().name}款。`);
    markDirty();
  });
  els.bgThemeChips?.addEventListener("keydown", (e) => chipRoving(e, els.bgThemeChips));
  els.toolStyleChips?.addEventListener("keydown", (e) => chipRoving(e, els.toolStyleChips));
  els.confirmModalOk?.addEventListener("click", () => resolveConfirm(true));
  els.confirmModalCancel?.addEventListener("click", () => resolveConfirm(false));
  els.confirmModal?.addEventListener("click", (event) => {
    if (event.target === els.confirmModal) resolveConfirm(false);
  });
  els.remapModalClose?.addEventListener("click", () => closeRemapModal());
  els.remapDoneButton?.addEventListener("click", () => closeRemapModal());
  els.remapResetButton?.addEventListener("click", () => resetPatternColorMapping());
  els.remapModal?.addEventListener("click", (event) => {
    if (event.target === els.remapModal) closeRemapModal();
  });
  els.settingsButton?.addEventListener("click", () => openSettingsModal());
  const settingsVersionEl = document.getElementById("settingsVersion");
  if (settingsVersionEl) settingsVersionEl.textContent = `拼豆工坊 v${APP_VERSION}`;
  els.settingsModalClose?.addEventListener("click", () => closeSettingsModal());
  els.settingsModal?.addEventListener("click", (event) => {
    if (event.target === els.settingsModal) closeSettingsModal();
  });
  els.onboardingDoneBtn?.addEventListener("click", () => closeOnboardingModal());
  els.onboardingCloseBtn?.addEventListener("click", () => closeOnboardingModal());
  els.onboardingModal?.addEventListener("click", (event) => {
    if (event.target === els.onboardingModal) closeOnboardingModal();
  });
  els.collectionButton?.addEventListener("click", () => {
    openCollectionPage();
  });
  els.collectionBackButton?.addEventListener("click", () => closeCollectionPage());
  els.collectionSettingsButton?.addEventListener("click", () => openSettingsModal());
  els.collectionRefreshButton?.addEventListener("click", () => {
    uiRenderCollection();
  });
  els.shareModalClose?.addEventListener("click", () => closeShareModal());
  els.shareModal?.addEventListener("click", (event) => {
    if (event.target === els.shareModal) closeShareModal();
  });
  window.addEventListener("keydown", (event) => {
    if (handleKeyboardGridKey(event)) return;

    // Esc discards the bead held in the tweezers (returns it to the box).
    if (event.key === "Escape" && !getOpenModalEl() && state.phase === "place" && state.tweezerBead) {
      event.preventDefault();
      returnTweezerBead();
      return;
    }

    // WASD / Arrow keys: pan board.  Z / X: zoom in / out.
    // Desktop only (non-touch), place/inspect phase, no modal open, no input focused.
    if (!isTouchDevice()) {
      const tag = document.activeElement?.tagName;
      const inputFocused = tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT";
      if (!inputFocused && !getOpenModalEl()) {
        const k = event.key;
        const boardPhase = state.phase === "place" || state.phase === "inspect";
        if (boardPhase) {
          const nav = state.kbdNav;
          if (k === "w" || k === "W" || k === "ArrowUp")    { event.preventDefault(); nav.up     = true; return; }
          if (k === "s" || k === "S" || k === "ArrowDown")  { event.preventDefault(); nav.down   = true; return; }
          if (k === "a" || k === "A" || k === "ArrowLeft")  { event.preventDefault(); nav.left   = true; return; }
          if (k === "d" || k === "D" || k === "ArrowRight") { event.preventDefault(); nav.right  = true; return; }
          if (k === "z" || k === "Z") { event.preventDefault(); nav.zoomIn  = true; return; }
          if (k === "x" || k === "X") { event.preventDefault(); nav.zoomOut = true; return; }
        }
        if (state.appMode === "draw") {
          const k = event.key;
          const nav = getDrawKeyboardNav();
          if (k === "w" || k === "W" || k === "ArrowUp")    { event.preventDefault(); nav.up     = true; return; }
          if (k === "s" || k === "S" || k === "ArrowDown")  { event.preventDefault(); nav.down   = true; return; }
          if (k === "a" || k === "A" || k === "ArrowLeft")  { event.preventDefault(); nav.left   = true; return; }
          if (k === "d" || k === "D" || k === "ArrowRight") { event.preventDefault(); nav.right  = true; return; }
          if (k === "z" || k === "Z") { event.preventDefault(); nav.zoomIn  = true; return; }
          if (k === "x" || k === "X") { event.preventDefault(); nav.zoomOut = true; return; }
        }
      }
    }

    // Trap Tab focus within the open modal (a11y).
    if (event.key === "Tab") {
      const modal = getOpenModalEl();
      if (!modal) return;
      const focusables = focusablesIn(modal);
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (!modal.contains(document.activeElement)) {
        event.preventDefault();
        first.focus();
      } else if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
      return;
    }
    if (event.key !== "Escape") return;
    // The confirm dialog sits on top; Esc cancels it first (same as clicking "Cancel").
    if (state.confirmModalOpen) { resolveConfirm(false); return; }
    // If the enlarge viewer is open within the collection modal, close it first.
    const enlarged = els.collectionScreen?.querySelector(".collection-enlarged.show");
    if (enlarged) { enlarged.classList.remove("show"); return; }
    if (state.gallerySubmitModalOpen) { closeGallerySubmitModal(); return; }
    if (els.drawCodeModal?.classList.contains("show")) { closeDrawCodeModal(); return; }
    if (state.onboardingModalOpen) { closeOnboardingModal(); return; }
    if (state.remapModalOpen) closeRemapModal();
    if (state.collectionPageOpen || state.appMode === "collection") { closeCollectionPage(); return; }
    if (state.settingsModalOpen) closeSettingsModal();
    if (state.shareModalOpen) closeShareModal();
  });

  window.addEventListener("keyup", (event) => {
    const k = event.key;
    const nav = state.kbdNav;
    const drawNav = getDrawKeyboardNav();
    if (k === "w" || k === "W" || k === "ArrowUp")    { nav.up     = false; drawNav.up     = false; }
    if (k === "s" || k === "S" || k === "ArrowDown")  { nav.down   = false; drawNav.down   = false; }
    if (k === "a" || k === "A" || k === "ArrowLeft")  { nav.left   = false; drawNav.left   = false; }
    if (k === "d" || k === "D" || k === "ArrowRight") { nav.right  = false; drawNav.right  = false; }
    if (k === "z" || k === "Z") { nav.zoomIn  = false; drawNav.zoomIn  = false; }
    if (k === "x" || k === "X") { nav.zoomOut = false; drawNav.zoomOut = false; }
  });

  window.addEventListener("resize", onResize);

  // A `window.resize` only fires for viewport changes, not for container reflow.
  // The scene canvas grows from 0×0 (hidden behind the start screen) to full
  // size when the studio is entered, and can shift on flex reflow / font load /
  // scrollbar changes — none of which is a window resize. Without recomputing
  // there, the layout stays cached at the transitional size and the board, tray
  // and reference note pile up on top of each other. Observe the canvas so any
  // size change invalidates the layout. (Coalesced via rAF; render only changes
  // the canvas bitmap, not its CSS box, so this can't feed back into a loop.)
  if (typeof ResizeObserver === "function") {
    let pending = false;
    const ro = new ResizeObserver(() => {
      if (pending) return;
      pending = true;
      requestAnimationFrame(() => { pending = false; onResize(); });
    });
    ro.observe(sceneCanvas);
  }

  setSessionActions({
    loadPattern,
    setPhase,
  });
  setModalActions({
    renderRemapModal,
    uiRenderSharePanel,
  });
  setGalleryActions({ loadPattern, setAppMode, onModalOpened, restoreModalFocus, uiRenderUI });
  setDrawActions({
    loadPattern,
    setAppMode,
    openSettingsModal,
    openGallerySubmitModal,
    importPatternCode,
    autoCopyText,
    requestCloudShareForPattern,
  });
  initDrawingStudioEvents();
  setCustomPatternActions({ loadPattern });
  initCustomPatternEvents();
  setUIActions({
    getCollection: () => collection,
    updateCollection: (nextCollection) => {
      collection = nextCollection;
      writeCollection(collection);
    },
    loadPattern,
    setPhase,
    openRemapModal,
    setPatternColorMapping,
    resetPatternColorMapping,
    pourSelectedColor,
    clearBoard,
    startIroning,
    pressFlat,
    flipAndIron,
    completeWork,
    saveCurrentWork,
    openShareModal,
    openCollectionEntry,
    exportShareImage,
    copyShareText,
    createCloudShare,
    importPatternCode,
    openImportCodeModal: () => openDrawCodeModal("import-bead"),
    submitCurrentToGallery,
    triggerHaptic,
    returnTweezerBead,
    tweezerFromBox,
  });
  validatePatterns();
  loadPattern(resizePattern(patterns[0], state.patternSize));
  setCustomDenoiseControls(state.customDenoiseLevel);
  applyBackgroundTheme(state.bgTheme);
  const sessionRestored = loadAutoSave();
  setAppMode("home");
  if (!sessionRestored) setPhase("choose");
  // Session archiving happens only at exit boundaries (no per-edit autosave):
  // leaving to home (beadBackButton), tab hide, and page close.
  window.addEventListener("pagehide", () => flushAutoSave());
  document.addEventListener("visibilitychange", () => {
    syncBuildTimer();
    if (document.visibilityState === "hidden") flushAutoSave();
  });
  uiRenderUI();
  requestAnimationFrame(tick);
  // After the first screen settles, idle-prefetch the remaining stage backgrounds (removes the fade-in gap on stage switch).
  (window.requestIdleCallback || ((cb) => setTimeout(cb, 1200)))(preloadBackgrounds);
