import {
  palette, beadIds, palettePresetMardCodes,
  paletteSizeOptions, paletteSizeKey, readPaletteSize, workshopCodeForMard,
} from './palette.js';
import { patterns, resamplePatternRows, validatePatterns } from './patterns-data.js';
import {
  phases, backgroundThemes, toolStyles, craftOptions,
  TRAY_DESKTOP_ROWS, TRAY_DESKTOP_COLS, TRAY_MOBILE_ROWS, TRAY_MOBILE_COLS,
  collectionKey, sessionKey, collectionLimit, achievementKey,
  conceptAchievement, fullBoardAchievement, needleLoadSortThreshold,
} from './constants.js';
import {
  clamp, lerp, easeOut, mixColor, rgbToOklab, oklabDistance,
  hexToRgb, beadOklab,
} from './color-utils.js';
import { state } from './state.js';
import { readCollection, writeCollection } from './storage.js';
import { readAchievements, writeAchievements, hasAchievement, unlockAchievement } from './achievements.js';
import { currentBackgroundTheme, currentToolStyle } from './theme.js';
import {
  targetAt, indexFor, sourceTargetAt, isBuiltInPattern, getPatternColorMap,
  invalidateEffectiveMap, getPatternHiddenSourceList, getPatternHiddenSourceSet,
  hiddenSignature, customRecalcSignature, isCustomFromImagePattern, findPatternByBaseId,
  getCustomRecalcRowsIfReady, getEffectiveTargetRows, getEffectivePatternResult,
  getTargetCounts, getTargetTotal, allColorCodes, beadLabel, activePaletteColorCount,
  normalizePatternColorMapForActivePalette, getPatternColors, getPatternAnalysis,
  getSourceCounts, getSourcePatternColors, getSourcePatternAnalysis,
  invalidatePlacedCounts, getPlacedCounts, normalizePatternSize, baseIdFor,
  patternFingerprint, normalizeCraft, resizePattern, findBasePattern, findCustomPattern,
} from './pattern.js';
import {
  loadImageFromDataUrl, imageToPatternRows, convertImageToPattern,
  nearestColorCodeByLab, nearestColorCode,
} from './image-convert.js';
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
  drawShareImage, setAutoSaveHook, markDirty,
} from './render.js';
import { placedCount } from './pattern.js';
import { showToast, hidePlaceHint, showPlaceHint, showAchievementToast } from './notify.js';
import {
  setUIActions, setSizeControls as uiSetSizeControls, updateSelectedPaletteCount as uiUpdateSelectedPaletteCount,
  renderUI as uiRenderUI, renderCollection as uiRenderCollection, renderSharePanel as uiRenderSharePanel,
} from './ui.js';




  let collection = readCollection();
  state.achievements = readAchievements();
  let lastFrame = performance.now();









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
    if (els.bgThemeSelect) els.bgThemeSelect.value = state.bgTheme;
    markDirty();
  }


  async function recomputeCustomHiddenRowsFromOriginal(pattern = state.selectedPattern) {
    if (!isCustomFromImagePattern(pattern)) return false;
    const hidden = getPatternHiddenSourceList(pattern);
    const id = baseIdFor(pattern);
    if (!hidden.length) {
      delete state.customHiddenRecalcCache[id];
      invalidateEffectiveMap(pattern);
      return true;
    }
    const signature = customRecalcSignature(pattern, hidden);
    if (state.customHiddenRecalcCache[id]?.signature === signature) return true;
    if (state.customHiddenRecalcPending[id]) {
      if (state.customHiddenRecalcPending[id] !== signature) {
        state.customHiddenRecalcQueued[id] = signature;
      }
      return false;
    }
    state.customHiddenRecalcPending[id] = signature;
    try {
      const image = await loadImageFromDataUrl(pattern.sourceImageDataUrl);
      const result = convertImageToPattern(image, {
        removeWhite: pattern.sourceRemoveWhite !== false,
        size: pattern.size,
        excludedCodes: hidden,
        allowPaletteExpansionOnExclude: true,
      });
      state.customHiddenRecalcCache[id] = {
        signature,
        rows: result.rows,
        stats: result.stats,
      };
      if (baseIdFor(state.selectedPattern) === id && customRecalcSignature(state.selectedPattern) === signature) {
        invalidateEffectiveMap(state.selectedPattern);
        state.previewDirty = true;
        const available = getPatternColors();
        if (!available.includes(state.selectedColor)) state.selectedColor = available[0] || state.selectedColor;
        showToast("已按原图完成重算。");
        markDirty();
      }
      return true;
    } catch (error) {
      showToast("按原图重算失败。");
      return false;
    } finally {
      if (state.customHiddenRecalcPending[id] === signature) {
        delete state.customHiddenRecalcPending[id];
      }
      const queued = state.customHiddenRecalcQueued[id];
      if (queued && queued !== signature) {
        delete state.customHiddenRecalcQueued[id];
        const nextPattern = findPatternByBaseId(id);
        if (nextPattern) {
          void recomputeCustomHiddenRowsFromOriginal(nextPattern);
        }
      }
    }
  }

  function renderPaletteSizeControls() {
    [els.paletteSizePicker, els.settingsPaletteSizePicker].forEach((picker) => {
      if (!picker) return;
      picker.querySelectorAll("[data-palette-size]").forEach((button) => {
        const size = Number.parseInt(button.dataset.paletteSize, 10);
        const active = size === state.paletteSize;
        button.classList.toggle("active", active);
        button.setAttribute("aria-pressed", active ? "true" : "false");
      });
    });
  }

  async function setPaletteSize(size, silent = false) {
    const next = Number.parseInt(size, 10);
    if (!paletteSizeOptions.includes(next) || next === state.paletteSize) return;
    state.paletteSize = next;
    localStorage.setItem(paletteSizeKey, String(next));
    const codes = allColorCodes();
    if (!codes.includes(state.selectedColor)) {
      state.selectedColor = codes[0] || "K";
    }
    state.trayColor = null;
    state.trayBeans = 0;
    state.trayCapacity = 0;
    state.trayMatrix = [];
    state.tweezerBead = null;
    invalidateEffectiveMap();
    state.previewDirty = true;
    state.uiDirty = true;
    if (isCustomFromImagePattern(state.selectedPattern)) {
      try {
        const image = await loadImageFromDataUrl(state.selectedPattern.sourceImageDataUrl);
        const result = convertImageToPattern(image, {
          removeWhite: state.selectedPattern.sourceRemoveWhite !== false,
          size: state.selectedPattern.size,
        });
        Object.assign(state.selectedPattern, {
          rows: result.rows,
          sourceRows: result.rows,
          conversionStats: result.stats,
        });
        state.lastConversionStats = result.stats;
      } catch (error) {
        showToast("色板已切换，但自定义图纸重算失败。");
      }
    }
    normalizePatternColorMapForActivePalette();
    invalidateEffectiveMap();
    const patternColors = getPatternColors();
    if (!patternColors.includes(state.selectedColor)) {
      state.selectedColor = patternColors[0] || codes[0] || "K";
    }
    if (!silent) showToast(`色板已切换为 ${next} 色。`);
    markDirty();
  }

  function setSizeControls(size) {
    const normalized = normalizePatternSize(size);
    state.patternSize = normalized;
    if (els.patternSizeSlider) {
      els.patternSizeSlider.value = String(normalized);
      const min = Number(els.patternSizeSlider.min) || 12;
      const max = Number(els.patternSizeSlider.max) || 48;
      const progress = clamp((normalized - min) / Math.max(1, max - min), 0, 1);
      els.patternSizeSlider.style.setProperty("--size-progress", `${Math.round(progress * 100)}%`);
    }
    if (els.patternSizeValue) els.patternSizeValue.textContent = String(normalized);
    if (els.customSizeMeta) els.customSizeMeta.textContent = `${normalized}x${normalized}`;
  }

  function applyPatternSize(size) {
    const normalized = normalizePatternSize(size);
    if (normalized === state.selectedPattern.size) {
      uiSetSizeControls(normalized);
      return;
    }
    uiSetSizeControls(normalized);
    const base = findBasePattern();
    if (baseIdFor(base).startsWith("custom-") && base.sourceImageDataUrl) {
      reconvertCustomPatternAtSize(base, normalized, state.phase !== "choose");
      return;
    }
    loadPattern(resizePattern(base, normalized), state.phase !== "choose");
    showToast(`图纸已调整为 ${normalized}x${normalized}。`);
  }

  function loadPattern(pattern, keepPhase = false) {
    state.selectedPattern = pattern;
    invalidateLayoutCache();
    if (baseIdFor(pattern).startsWith("custom-")) {
      closeRemapModal();
    }
    const patternId = baseIdFor(pattern);
    const previousHidden = state.patternHiddenSources[patternId] || [];
    const sourceColors = getSourcePatternColors(pattern);
    const normalizedMap = normalizePatternColorMapForActivePalette(pattern);
    state.patternHiddenSources[patternId] = [...new Set(previousHidden.filter((code) => sourceColors.includes(code)))];
    invalidateEffectiveMap(pattern);
    if (isCustomFromImagePattern(pattern) && state.patternHiddenSources[patternId].length) {
      void recomputeCustomHiddenRowsFromOriginal(pattern);
    }
    state.patternColorMap = normalizedMap;
    uiSetSizeControls(pattern.size);
    const total = pattern.size * pattern.size;
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
  let audioCtx = null;
  function initAudio() {
    if (!audioCtx) {
      try {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      } catch (e) { }
    }
  }

  function playClickSound(type = "light") {
    if (!audioCtx) return;
    if (audioCtx.state === "suspended") audioCtx.resume();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    
    if (type === "light") {
      osc.type = "sine";
      osc.frequency.setValueAtTime(800, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, audioCtx.currentTime + 0.04);
      gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.04);
      osc.start(audioCtx.currentTime);
      osc.stop(audioCtx.currentTime + 0.04);
    } else if (type === "heavy") {
      osc.type = "triangle";
      osc.frequency.setValueAtTime(200, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(50, audioCtx.currentTime + 0.06);
      gain.gain.setValueAtTime(0.4, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.06);
      osc.start(audioCtx.currentTime);
      osc.stop(audioCtx.currentTime + 0.06);
    }
  }

  function triggerHaptic(type = "light") {
    initAudio();
    if (navigator.vibrate) {
      if (type === "light") navigator.vibrate(5);
      else if (type === "heavy") navigator.vibrate(10);
      else if (type === "error") navigator.vibrate([15, 30, 15]);
    }
    playClickSound(type);
  }

  function setPhase(phase) {
    state.phase = phase;
    state.pointer.down = false;
    state.pointer.mode = null;
    state.pointer.trayTapPending = false;
    state.pointer.pendingCell = null;
    state.gesture.active = false;
    state.gesture.touchActive = false;
    state.gesture.pointers = {};
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
    if (phase === "inspect") runInspection();
    if (phase === "iron") {
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
    markDirty();
  }

  function prefersReducedMotion() {
    return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
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
    state.lampSwitchFlashUntil = performance.now() + 140;
    showToast(state.lampOn ? "工作灯已打开：投影色稿可见。" : "工作灯已关闭：关闭投影色稿。");
    markDirty();
  }


  // --- Auto Save ---
  let autoSaveTimer = 0;

  function autoSave() {
    if (state.phase === "choose") {
      localStorage.removeItem(sessionKey);
      return;
    }
    const session = {
      phase: state.phase,
      sandboxMode: state.sandboxMode,
      selectedPatternId: state.selectedPattern ? state.selectedPattern.id : null,
      patternColorMaps: state.patternColorMaps,
      patternSize: state.patternSize,
      placed: state.placed,
      heat: state.heat,
      tool: state.tool,
      trayColor: state.trayColor,
      trayBeans: state.trayBeans,
      trayMatrix: state.trayMatrix,
      tweezerBead: state.tweezerBead,
      needleLoaded: state.needleLoaded,
      errors: state.errors,
      temperature: state.temperature,
      pressure: state.pressure,
      warp: state.warp,
      cooling: state.cooling,
      spill: state.spill
    };
    try {
      localStorage.setItem(sessionKey, JSON.stringify(session));
    } catch(e) {}
  }

  function scheduleAutoSave(delay = 550) {
    window.clearTimeout(autoSaveTimer);
    autoSaveTimer = window.setTimeout(autoSave, delay);
  }

  function loadAutoSave() {
    try {
      const data = localStorage.getItem(sessionKey);
      if (!data) return false;
      const session = JSON.parse(data);
      if (!session || session.phase === "choose") return false;
      
      const pattern = patterns.find(p => p.id === session.selectedPatternId);
      if (!pattern) return false;
      
      state.phase = session.phase;
      state.sandboxMode = session.sandboxMode;
      state.selectedPattern = pattern;
      if (session.patternColorMaps) state.patternColorMaps = session.patternColorMaps;
      if (session.patternSize) state.patternSize = session.patternSize;
      state.placed = session.placed || [];
      invalidatePlacedCounts();
      state.heat = session.heat || [];
      state.tool = session.tool || "needle";
      state.trayColor = session.trayColor || null;
      state.trayBeans = ~~session.trayBeans;
      state.trayMatrix = session.trayMatrix || [];
      state.tweezerBead = session.tweezerBead || null;
      state.needleLoaded = ~~session.needleLoaded;
      state.errors = session.errors || [];
      state.temperature = session.temperature || 62;
      state.pressure = session.pressure || 56;
      state.warp = session.warp || 18;
      state.cooling = session.cooling || 0;
      state.spill = session.spill || null;
      
      // restore transient states
      if (state.selectedPattern) loadPattern(state.selectedPattern);
      if (state.phase !== "choose") compileCurrentPattern();
      syncFusionMatrix();
      setPhase(state.phase);
      return true;
    } catch(e) {
      return false;
    }
  }



  function canDropToFloorAt(x, y) {
    if (boardCellFromPoint(x, y)) return false;
    if (shouldShowTray() && pointInTray(x, y)) return false;
    if (shouldShowTray() && pointInTrayDumpButton(x, y)) return false;
    if (pointInReferenceSheet(x, y)) return false;
    if (pointInLampSwitch(x, y)) return false;
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

  function renderUI() {
    if (els.studioGrid) els.studioGrid.dataset.phase = state.phase;
    if (state.patternsDirty) {
      renderPatterns();
      state.patternsDirty = false;
    }
    renderPhases();
    renderCurrentPatternChip();
    renderControls();
    renderToolRack();
    renderPalette();
    renderPaletteSizeControls();
    renderCustomStats();
    renderPatternColorStats();
    renderSidebarReference();
    const counts = getTargetCounts();
    const colorCount = Object.keys(counts).length;
    els.patternMeta.textContent = `${state.selectedPattern.size}x${state.selectedPattern.size} · ${state.paletteSize}色板`;
    els.targetCount.textContent = `${getTargetTotal()} 颗 / ${colorCount} 色`;
    els.collectionCount.textContent = String(collection.length);
    if (els.settingsDot) els.settingsDot.hidden = collection.length === 0;
    if (state.phase === "inspect") {
      els.colorMeta.textContent = "检查辅助";
    } else {
      els.colorMeta.textContent = beadLabel(state.selectedColor);
    }
    if (els.rightPanelTitle) {
      els.rightPanelTitle.textContent = state.phase === "inspect" ? "检查台" : "豆盒";
    }
    if (els.sandboxButton) {
      const beakerIcon = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 3h6"/><path d="M10 3v6.5L5 19a1.6 1.6 0 0 0 1.4 2.4h11.2A1.6 1.6 0 0 0 19 19l-5-9.5V3"/><path d="M7.5 14h9"/></svg>';
      const loupeIcon = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.2-3.2"/></svg>';
      els.sandboxButton.innerHTML = state.sandboxMode ? beakerIcon : loupeIcon;
      els.sandboxButton.title = state.sandboxMode ? "沙盒：开（自由拼摆不校验）" : "沙盒：自由拼摆不校验";
      els.sandboxButton.setAttribute("aria-label", state.sandboxMode ? "沙盒模式：开" : "沙盒模式：关");
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
    if (toolStyleField) toolStyleField.style.display = useMobileDirectPlacement() ? "none" : "";
    els.statusLine.textContent = statusText();
    const showPlacementUi = state.phase === "place";
    const showToolUi = showPlacementUi && !useMobileDirectPlacement();
    const showBoardZoomUi = state.phase === "place" || state.phase === "inspect";
    if (!showPlacementUi) {
      state.lastPlaceHintKey = "";
      hidePlaceHint();
    }
    const showRightPanelUi = state.phase === "place" || state.phase === "inspect";
    if (els.toolRack) els.toolRack.style.display = showToolUi ? "" : "none";
    if (els.colorPalette) els.colorPalette.style.display = showRightPanelUi ? "" : "none";
    if (els.colorMeta) els.colorMeta.style.display = showRightPanelUi ? "" : "none";
    if (els.toolMeta) els.toolMeta.style.display = showToolUi ? "" : "none";
    if (els.boardZoomControls) els.boardZoomControls.hidden = !showBoardZoomUi;
    if (state.remapModalOpen) renderRemapModal();
  }

  let patternColorStatsRenderKey = "";
  function renderPatternColorStats() {
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
    els.patternColorStats.innerHTML = items.map((item) => {
      return `
      <button type="button" class="pattern-color-chip" data-source-code="${item.sourceCode}" title="点击换色：${beadIds[item.targetCode] || item.targetCode}" aria-label="换色 ${beadIds[item.targetCode] || item.targetCode}">
        <span class="dot" style="background:${palette[item.targetCode]}"></span>
        <span class="code">${beadIds[item.targetCode] || item.targetCode}</span>
        <span class="count">${item.count}</span>
      </button>
    `;
    }).join("");
  }

  let sidebarReferenceRenderKey = "";
  function renderSidebarReference() {
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

  function clearHiddenPreviewSources(silent = false) {
    const pattern = state.selectedPattern;
    const patternId = baseIdFor(pattern);
    const hidden = getPatternHiddenSourceList();
    if (!hidden.length) return false;
    state.patternHiddenSources[patternId] = [];
    if (isCustomFromImagePattern(pattern)) {
      delete state.customHiddenRecalcCache[patternId];
      delete state.customHiddenRecalcPending[patternId];
      delete state.customHiddenRecalcQueued[patternId];
    }
    invalidateEffectiveMap();
    state.previewDirty = true;
    const available = getPatternColors();
    if (!available.includes(state.selectedColor)) state.selectedColor = available[0] || state.selectedColor;
    if (!silent) showToast("已恢复所有隐藏颜色。");
    markDirty();
    return true;
  }

  function handlePatternColorChipToggle(event) {
    const button = event.target.closest(".pattern-color-chip[data-source-code]");
    if (!button) return;
    const sourceCode = button.getAttribute("data-source-code");
    if (!sourceCode) return;
    openRemapModal(sourceCode);
  }

  function renderPatterns() {
    els.patternList.innerHTML = "";
    const customPattern = findCustomPattern();
    const customButton = document.createElement("button");
    customButton.className = `pattern-card${state.selectedPattern.id.startsWith("custom-") ? " active" : ""}`;
    customButton.type = "button";
    customButton.innerHTML = `
      <canvas class="pattern-thumb" width="58" height="58" aria-hidden="true"></canvas>
      <span><strong>自定义图纸</strong><span>${customPattern ? `${customPattern.size}x${customPattern.size}` : "--"}</span></span>
    `;
    customButton.addEventListener("click", () => {
      const customSelected = state.selectedPattern.id.startsWith("custom-");
      if (!customPattern || customSelected) {
        els.customImageInput?.click();
        return;
      }
      loadPattern(customPattern, state.phase !== "choose");
      if (state.phase !== "choose") setPhase("place");
      showToast("已切换到自定义图纸。");
    });
    els.patternList.appendChild(customButton);
    if (customPattern) drawPatternThumb(customButton.querySelector("canvas"), customPattern);
    else drawCustomPatternPlaceholder(customButton.querySelector("canvas"));

    patterns.filter((item) => !item.id.startsWith("custom-")).forEach((pattern) => {
      const displayPattern = resizePattern(pattern, state.patternSize);
      const button = document.createElement("button");
      button.className = `pattern-card${baseIdFor(state.selectedPattern) === pattern.id ? " active" : ""}`;
      button.type = "button";
      button.innerHTML = `
        <canvas class="pattern-thumb" width="58" height="58" aria-hidden="true"></canvas>
        <span><strong>${pattern.name}</strong><span>${displayPattern.size}x${displayPattern.size}</span></span>
      `;
      button.addEventListener("click", () => {
        loadPattern(resizePattern(pattern, state.patternSize), state.phase !== "choose");
        if (state.phase !== "choose") setPhase("place");
        showToast(`已换成 ${pattern.name}`);
      });
      els.patternList.appendChild(button);
      drawPatternThumb(button.querySelector("canvas"), displayPattern);
    });
  }

  function drawPatternThumb(canvas, pattern) {
    const ctx = canvas.getContext("2d");
    const cell = Math.floor(canvas.width / pattern.size);
    const offset = Math.floor((canvas.width - cell * pattern.size) / 2);
    const rows = getEffectiveTargetRows(pattern);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#f4f6f8";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    rows.forEach((row, y) => {
      [...row].forEach((code, x) => {
        if (code === ".") return;
        ctx.fillStyle = palette[code];
        ctx.fillRect(offset + x * cell, offset + y * cell, Math.max(1, cell - 1), Math.max(1, cell - 1));
      });
    });
  }

  function drawCustomPatternPlaceholder(canvas) {
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


  async function reconvertCustomPatternAtSize(basePattern, size, keepPhase = false) {
    try {
      const image = await loadImageFromDataUrl(basePattern.sourceImageDataUrl);
      const removeWhite = basePattern.sourceRemoveWhite !== false;
      const result = convertImageToPattern(image, { removeWhite, size });
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
        conversionStats: result.stats,
        note: `图片自动转色号 · ${size}x${size}`,
      };
      const idx = patterns.findIndex((item) => baseIdFor(item) === baseIdFor(basePattern));
      if (idx >= 0) patterns[idx] = updated;
      state.lastConversionStats = result.stats;
      loadPattern(updated, keepPhase);
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
        const size = normalizePatternSize(els.patternSizeSlider?.value || state.patternSize);
        const removeWhite = els.customWhiteToggle.checked;
        uiSetSizeControls(size);
        // Yield a frame so the "正在识别图片…" toast paints before the
        // synchronous conversion (which can briefly block on large images).
        await new Promise((resolve) => setTimeout(resolve, 16));
        const result = convertImageToPattern(image, {
          removeWhite,
          size,
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
          conversionStats: result.stats,
          note: "图片自动转色号",
        };
        state.lastConversionStats = result.stats;
        for (let i = patterns.length - 1; i >= 0; i -= 1) {
          if (patterns[i].id.startsWith("custom-")) patterns.splice(i, 1);
        }
        patterns.unshift(pattern);
        loadPattern(pattern);
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



  function renderPhases() {
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
          setPhase("choose");
          return;
        }
        const losesFused =
          state.fusedPieces.length > 0 &&
          (target === "place" || target === "inspect" || target === "iron");
        if (losesFused && !window.confirm("回退到该步会清除已熨烫/冷却的结果，确定吗？")) {
          return;
        }
        setPhase(target);
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

  function scrollActiveWorkflowStep() {
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

  function renderCurrentPatternChip() {
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


  // --- Modal focus management (a11y): trap focus and restore on close ---
  function getOpenModalEl() {
    if (state.remapModalOpen) return els.remapModal;
    if (state.collectionModalOpen) return els.collectionModal;
    if (state.settingsModalOpen) return els.settingsModal;
    if (state.shareModalOpen) return els.shareModal;
    return null;
  }

  function focusablesIn(modalEl) {
    if (!modalEl) return [];
    return [...modalEl.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )].filter((el) => !el.disabled && el.offsetParent !== null && el.getAttribute("aria-hidden") !== "true");
  }

  function onModalOpened(modalEl) {
    if (!modalEl) return;
    const active = document.activeElement;
    // Remember the real trigger (skip if focus is already inside any modal).
    if (active && active !== document.body && !active.closest(".remap-modal")) {
      state.modalReturnFocus = active;
    }
    const focusables = focusablesIn(modalEl);
    if (focusables.length) focusables[0].focus();
  }

  function restoreModalFocus() {
    if (getOpenModalEl()) return; // another modal is still open
    const el = state.modalReturnFocus;
    state.modalReturnFocus = null;
    if (el && typeof el.focus === "function" && document.contains(el)) el.focus();
  }

  function openCollectionModal() {
    if (!els.collectionModal) return;
    state.collectionModalOpen = true;
    els.collectionModal.classList.add("show");
    els.collectionModal.setAttribute("aria-hidden", "false");
    uiRenderCollection();
    onModalOpened(els.collectionModal);
  }

  function closeCollectionModal() {
    if (!els.collectionModal) return;
    state.collectionModalOpen = false;
    els.collectionModal.classList.remove("show");
    els.collectionModal.setAttribute("aria-hidden", "true");
    const viewer = els.collectionModal.querySelector(".collection-enlarged");
    if (viewer) viewer.classList.remove("show");
    restoreModalFocus();
  }

  function openShareModal() {
    if (!els.shareModal) return;
    state.shareModalOpen = true;
    els.shareModal.classList.add("show");
    els.shareModal.setAttribute("aria-hidden", "false");
    uiRenderSharePanel();
    onModalOpened(els.shareModal);
  }

  function closeShareModal() {
    if (!els.shareModal) return;
    state.shareModalOpen = false;
    els.shareModal.classList.remove("show");
    els.shareModal.setAttribute("aria-hidden", "true");
    restoreModalFocus();
  }

  function openSettingsModal() {
    if (!els.settingsModal) return;
    state.settingsModalOpen = true;
    els.settingsModal.classList.add("show");
    els.settingsModal.setAttribute("aria-hidden", "false");
    onModalOpened(els.settingsModal);
  }

  function closeSettingsModal() {
    if (!els.settingsModal) return;
    state.settingsModalOpen = false;
    els.settingsModal.classList.remove("show");
    els.settingsModal.setAttribute("aria-hidden", "true");
    restoreModalFocus();
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
    setPhase("iron");
  }

  function renderControls() {
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
      addControlRow([
        ["检查作品", "primary-button", () => setPhase("inspect")],
        ["清空板面", "danger-button", () => clearBoard()],
      ]);      return;
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
        ["", `icon-pill ${hintsOn ? "active" : ""}`, () => {
          state.showHints = !state.showHints;
          markDirty();
        }, false, {
          icon: hintsOn
            ? '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3l18 18"/><path d="M9.88 5.07A11 11 0 0 1 12 5c5.5 0 9.27 4.07 10 7-0.42 1.66-1.66 3.6-3.5 5.06"/><path d="M6.13 6.13C4.06 7.62 2.59 9.79 2 12c0.73 2.93 4.5 7 10 7 1.7 0 3.27-0.38 4.66-1"/><path d="M10.59 10.59A2 2 0 0 0 13.41 13.41"/></svg>'
            : '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg>',
          ariaLabel: hintsOn ? "隐藏提示" : "显示提示",
          title: hintsOn ? "隐藏提示" : "显示提示",
        }],
        ["", "icon-pill", () => setPhase("place"), false, {
          icon: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 14 4 9 9 4"/><path d="M20 20v-7a4 4 0 0 0-4-4H4"/></svg>',
          ariaLabel: "返回修正",
          title: "返回修正",
        }],
      ], "control-row-icons");
      if (state.spill) {
        addControlRow([
          ["先去夹起", "", () => setPhase("place")],
          ["仍然熨烫", "danger-button", () => startIroning(true)],
        ]);
      } else {
        addButton("盖纸熨烫", "primary-button", () => startIroning(false), !state.sandboxMode && state.errors.length > 0 && placementAccuracy() < 0.72);
      }
      if (!state.sandboxMode && state.errors.length > 0 && placementAccuracy() < 0.72) {
        addHint("误差较多，建议先修正再熨烫。");
      }      return;
    }

    if (state.phase === "iron") {
      addHint("按住并移动熨斗。慢、热、重会增加粘连，也更容易糊孔和变形。");
      addSlider("温度", "temperature", 35, 90, state.temperature, (value) => {
        state.temperature = Number(value);
      });
      addSlider("压力", "pressure", 25, 90, state.pressure, (value) => {
        state.pressure = Number(value);
      });
      addControlRow([
        ["查看检查", "", () => setPhase("inspect")],
        ["进入冷却", "primary-button", () => setPhase("cool")],
      ]);      return;
    }

    if (state.phase === "cool") {
      addHint("冷却过程中压平可以减少翘曲。温度稳定后就能取下作品。");
      addControlRow([
        ["压平", "", () => pressFlat()],
        ["翻面再熨", "", () => flipAndIron(), state.flipCount >= 1],
      ]);
      addButton("完成收藏", "primary-button", () => completeWork());
      if (state.cooling < 78) addHint("提前取下也能完成，但冷却不足会影响最终评级。");      return;
    }

    if (state.phase === "finish") {
      if (state.conceptEaster) {
        const full = state.conceptEasterType === "full";
        addHint(full ? "满板彩蛋已解锁。" : "空板彩蛋已解锁。");
        addHint(`隐藏成就：${full ? fullBoardAchievement : conceptAchievement}`);
        addControlRow([
          ["保存作品", "primary-button", () => saveCurrentWork()],
          ["再做一张", "", () => {
            loadPattern(state.selectedPattern);
            setPhase("choose");
          }],
        ]);
        addButton("分享小红书", "", () => openShareModal());        return;
      }
      addCraftToggle();
      addHint(`评级 ${finalGrade()}。可以换一种成品形式后再次保存。`);
      addControlRow([
        ["保存作品", "primary-button", () => saveCurrentWork()],
        ["再做一张", "", () => {
          loadPattern(state.selectedPattern);
          setPhase("choose");
        }],
      ]);
      addButton("分享小红书", "", () => openShareModal());    }
  }

  function addButton(label, className, handler, disabled = false) {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = label;
    button.className = className || "";
    button.disabled = disabled;
    button.addEventListener("click", handler);
    els.stageControls.appendChild(button);
  }

  function addControlRow(items, extraClass = "") {
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

  function addHint(text) {
    const box = document.createElement("div");
    box.className = "hint-box";
    box.textContent = text;
    els.stageControls.appendChild(box);
  }

  function openRemapModal(focusSource = null) {
    if (state.phase !== "choose") return;
    state.remapFocusSource = focusSource || null;
    state.remapModalOpen = true;
    if (els.remapModal) {
      els.remapModal.classList.add("show");
      els.remapModal.setAttribute("aria-hidden", "false");
    }
    renderRemapModal();
    onModalOpened(els.remapModal);
  }

  function closeRemapModal() {
    state.remapModalOpen = false;
    if (els.remapModal) {
      els.remapModal.classList.remove("show");
      els.remapModal.setAttribute("aria-hidden", "true");
    }
    restoreModalFocus();
  }

  function resetPatternColorMapping() {
    const map = state.patternColorMap || {};
    const patternId = baseIdFor(state.selectedPattern);
    const sourceColors = getSourcePatternColors();
    const hiddenCount = getPatternHiddenSourceList().length;
    const changed = sourceColors.some((code) => (map[code] || code) !== code) || hiddenCount > 0;
    if (!changed) {
      showToast("当前就是原始配色。");
      return;
    }
    sourceColors.forEach((code) => {
      map[code] = code;
    });
    state.patternColorMaps[patternId] = map;
    state.patternHiddenSources[patternId] = [];
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

  function addToolToggle() {
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

  function addSlider(label, key, min, max, value, onChange) {
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

  function addCraftToggle() {
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

  function renderToolRack() {
    if (!els.toolRack) return;
    if (state.phase !== "place" || useMobileDirectPlacement()) {
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

  function renderBeadStrip(codes) {
    return `
      <div class="bead-strip" style="grid-template-columns: repeat(${Math.max(1, codes.length)}, minmax(0, 1fr));">
        ${codes.map((code) => `
          <span class="bead-slot${code ? " loaded" : ""}" style="${code ? `background:${palette[code]};` : ""}"></span>
        `).join("")}
      </div>
    `;
  }

  let paletteRenderKey = "";
  function renderPalette() {
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
    const counts = getTargetCounts();
    const placedCounts = getPlacedCounts();
    const codes = allColorCodes();
    const key = [
      "place",
      state.paletteSize,
      state.selectedColor,
      state.tweezerBead || "",
      state.placedVersion,
      getPatternAnalysis().key,
      useMobileDirectPlacement() ? "mobile" : "desktop",
    ].join(":");
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
      const isHeld = !useMobileDirectPlacement() && state.tweezerBead === code;
      button.className = `color-chip${isSelected ? " active" : ""}${inPattern ? " needed" : ""}${isHeld ? " held" : ""}`;
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
        if (state.phase === "place" && !useMobileDirectPlacement()) pourSelectedColor();
        markDirty();
      });
      els.colorPalette.appendChild(button);
    });
  }

  function updateSelectedPaletteCount() {
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

  function renderInspectAssistPanel() {
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


  function renderSharePanel() {
    els.sharePanel.innerHTML = "";
    const card = document.createElement("div");
    card.className = "share-card";
    card.innerHTML = `
      <strong>${state.selectedPattern.name}</strong>
      <span>${normalizeCraft(state.selectedPattern.craft)} · 评级 ${state.phase === "finish" ? finalGrade() : scoreLabel()} · ${placedCount()}/${getTargetTotal()} 颗</span>
    `;
    els.sharePanel.appendChild(card);

    const row = document.createElement("div");
    row.className = "control-row";
    [
      ["导出竖图", () => exportShareImage("portrait")],
      ["导出方图", () => exportShareImage("square")],
    ].forEach(([label, handler]) => {
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = label;
      button.addEventListener("click", handler);
      row.appendChild(button);
    });
    els.sharePanel.appendChild(row);
    addShareButton("复制文案", () => copyShareText());
  }

  function addShareButton(label, handler) {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = label;
    button.addEventListener("click", handler);
    els.sharePanel.appendChild(button);
  }

  function renderCustomStats() {
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

  function renderCollection() {
    if (!els.collectionPanel) return;
    els.collectionPanel.innerHTML = "";
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
      collection = [];
      writeCollection(collection);
      renderCollection();
      showToast("作品集已清空。");
    });
    els.collectionPanel.appendChild(toolbar);

    const grid = document.createElement("div");
    grid.className = "collection-grid";
    els.collectionPanel.appendChild(grid);

    collection.forEach((item) => {
      const tile = document.createElement("div");
      tile.className = "collection-tile";
      const thumbSize = 168;
      tile.innerHTML = `
        <button type="button" class="collection-tile-body" aria-label="放大 ${item.name}">
          <canvas class="collection-thumb" width="${thumbSize}" height="${thumbSize}" aria-hidden="true"></canvas>
          <div class="collection-tile-meta">
            <strong>${item.name}</strong>
            <span>${normalizeCraft(item.craft)} · 评级 ${item.grade} · ${item.date}</span>
          </div>
        </button>
        <button type="button" class="collection-tile-delete" aria-label="删除这件作品" title="删除">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-2 14a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
        </button>
      `;
      tile.querySelector(".collection-tile-body").addEventListener("click", () => enlargeCollectionEntry(item));
      tile.querySelector(".collection-tile-delete").addEventListener("click", (e) => {
        e.stopPropagation();
        if (!window.confirm(`删除 ${item.name}？`)) return;
        collection = collection.filter((entry) => entry.id !== item.id);
        writeCollection(collection);
        renderCollection();
        showToast("已删除。");
      });
      grid.appendChild(tile);
      const canvas = tile.querySelector("canvas");
      drawCollectionThumb(canvas, item);
    });
  }

  function drawCollectionThumb(canvas, item) {
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    setupHiDpiCanvas(canvas, ctx);
    const rect = canvas.getBoundingClientRect();
    const w = rect.width;
    const h = rect.height;
    ctx.clearRect(0, 0, w, h);
    // Soft paper-ish background.
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

    // Per-cell helpers — render as if just ironed: rounded-square bead shapes
    // with neighbor-aware corners so it matches the in-game fused look.
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

        const path = () => {
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
        };

        ctx.fillStyle = palette[code] || "#bbb";
        path();
        ctx.fill();

        // Subtle highlight on isolated edge sides
        ctx.fillStyle = "rgba(255,255,255,0.16)";
        ctx.beginPath();
        ctx.arc(cx - cell * 0.18, cy - cell * 0.18, cell * 0.12, 0, Math.PI * 2);
        ctx.fill();

        // Center hole hint for fully exposed (isolated) beads only
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
    if (!els.collectionModal) return;
    let viewer = els.collectionModal.querySelector(".collection-enlarged");
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
      els.collectionModal.appendChild(viewer);
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
      openCollectionEntry(entry);
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
    setPhase("choose");
    closeCollectionModal();
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
    showToast(message);
    markDirty();
  }

  function dumpTray() {
    if (!state.trayColor) {
      showToast("豆筛已经是空的。");
      return;
    }
    const oldColor = state.trayColor;
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

  function pickTweezerFromBox(code) {
    if (state.tweezerBead) {
      showToast("镊子上已经夹着一颗，先放下或放回豆盒。");
      return;
    }
    state.tweezerBead = code;
    showToast(`镊子夹起 ${beadLabel(code)}。`);
  }

  function toggleTweezerBean() {
    if (state.tweezerBead) {
      const oldColor = state.tweezerBead;
      state.tweezerBead = null;
      showToast(`${beadLabel(oldColor)} 放回豆盒。`);
    } else {
      pickTweezerFromBox(state.selectedColor);
    }
    markDirty();
  }

  function clearBoard() {
    const hasContent =
      placedCount() > 0 ||
      state.trayBeans > 0 ||
      state.needleLoaded > 0 ||
      state.tweezerBead ||
      state.spill ||
      state.fusedPieces.length > 0;
    if (hasContent && !window.confirm("清空板面会移除已摆的全部豆子，确定吗？")) return;
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
    if (state.phase !== "choose" && (placedCount() > 0 || state.trayBeans > 0 || state.needleLoaded > 0 || state.tweezerBead || state.spill)) {
      resetPlacementForRemap();
      showToast("图纸换色已应用，当前摆放已重置。");
    } else {
      showToast(`已将 ${beadLabel(sourceCode)} 改为 ${beadLabel(targetCode)}。`);
    }
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
      useTweezers(x, y);
      return;
    }
    useNeedle(x, y);
  }

  function placeSelectedBead(x, y, initial = true) {
    const index = indexFor(x, y);
    if (state.spill && state.spill.index === index) {
      state.spill = null;
    }
    const current = state.placed[index];
    if (current === state.selectedColor && initial) {
      state.placed[index] = null;
      state.heat[index] = 0;
    } else if (current === state.selectedColor) {
      return;
    } else {
      state.placed[index] = state.selectedColor;
      state.heat[index] = 0;
    }
    invalidatePlacedCounts();
    state.savedCurrent = false;
    uiUpdateSelectedPaletteCount();
    markCanvasDirty(true);
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
      showToast("镊子取下一颗豆子。");
    } else {
      if (!state.tweezerBead) {
        showToast("先从豆盒夹一颗豆子。");
        return;
      }
      state.placed[index] = state.tweezerBead;
      invalidatePlacedCounts();
      state.tweezerBead = null;
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
      if (cx < 0 || cy < 0 || cx >= state.selectedPattern.size || cy >= state.selectedPattern.size) return;
      const index = indexFor(cx, cy);
      if (state.placed[index]) return;
      state.placed[index] = state.trayColor;
      invalidatePlacedCounts();
      placedAny = true;
      used += 1;
    });
    if (placedAny) {
      state.needleLoaded = Math.max(0, state.needleLoaded - used);
      const drain = Math.max(0.1, used * 0.12);
      state.trayProgress = clamp(state.trayProgress - drain, 0, 100);
      state.savedCurrent = false;
      if (state.needleLoaded <= 0) showToast("豆针已空，请重新取豆。");
      markDirty();
    }
  }

  function createSpillAt(x, y, code) {
    const size = state.selectedPattern.size;
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
      if (sx < 0 || sy < 0 || sx >= size || sy >= size) continue;
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
    const speed = distance / Math.max(dt, 1);
    const speedFactor = clamp(1.42 - speed * 1.45, 0.42, 1.55);
    const pressure = state.pressure / 58;
    const temp = state.temperature / 62;
    const base = (dt / 16) * pressure * temp * speedFactor * 0.6;
    const radius = layout.cell * 1.65;
    const size = state.selectedPattern.size;

    for (let cy = cell.y - 2; cy <= cell.y + 2; cy += 1) {
      for (let cx = cell.x - 2; cx <= cell.x + 2; cx += 1) {
        if (cx < 0 || cy < 0 || cx >= size || cy >= size) continue;
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
    const size = state.selectedPattern.size;
    for (let y = 0; y < size; y += 1) {
      for (let x = 0; x < size; x += 1) {
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
    const heat = heatStats();
    const heatedFactor = clamp(heat.heated / Math.max(1, heat.total), 0, 1);
    const bondedFactor = clamp(heat.bonded / Math.max(1, heat.total), 0, 1);
    const effective = clamp(heatedFactor * 0.45 + bondedFactor * 0.55, 0, 1);
    const flattenGain = lerp(5, 30, effective);
    const warpReduce = lerp(2, 12, effective);
    state.flattening = clamp(state.flattening + flattenGain, 0, 100);
    state.warp = clamp(state.warp - warpReduce, 0, 80);
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
      unlockAchievement(fullBoardAchievement, showAchievementToast);
    } else {
      unlockAchievement(conceptAchievement, showAchievementToast);
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
      placed: state.placed.slice(),
    };
    if (!state.savedCurrent) {
      collection.unshift(entry);
      collection = collection.slice(0, collectionLimit);
      const stored = writeCollection(collection);
      state.savedCurrent = true;
      if (stored) showToast("作品已收入作品集。");
    } else {
      showToast("这个版本已经保存过。");
    }
    markDirty();
  }

  function exportShareImage(format) {
    const portrait = format === "portrait";
    const canvas = document.createElement("canvas");
    canvas.width = portrait ? 1080 : 1080;
    canvas.height = portrait ? 1440 : 1080;
    const ctx = canvas.getContext("2d");
    drawShareImage(ctx, canvas.width, canvas.height, portrait);

    const filename = `拼豆工坊-${state.selectedPattern.name}-${portrait ? "竖图" : "方图"}.png`;
    const link = document.createElement("a");
    link.download = filename;
    link.href = canvas.toDataURL("image/png");
    link.click();
    showToast("已导出带水印分享图。");
  }

  function copyShareText() {
    const flowText = useMobileDirectPlacement()
      ? `从豆盒选色、直接摆放，到熨烫冷却定型，真的很像坐在桌前慢慢做手工。`
      : `从豆盒选色、豆筛抖豆、镊子修正，到熨烫冷却定型，真的很像坐在桌前慢慢做手工。`;
    const text = [
      `女朋友爱玩的拼豆，我做成了浏览器小游戏。`,
      `今天做的是「${state.selectedPattern.name}」，${getTargetTotal()}颗、${getPatternColors().length}个色号，最后评级 ${finalGrade()}。`,
      flowText,
      `#拼豆 #手作 #像素画 #情侣日常 #小游戏`,
    ].join("\n");
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(text).then(() => showToast("文案已复制。")).catch(() => fallbackCopy(text));
    } else {
      fallbackCopy(text);
    }
  }

  function fallbackCopy(text) {
    const area = document.createElement("textarea");
    area.value = text;
    document.body.appendChild(area);
    area.select();
    document.execCommand?.("copy");
    area.remove();
    showToast("文案已复制。");
  }



  function shouldAnimateCanvas(now) {
    if (state.pointer.down) return true;
    if (state.phase === "cool" && (state.cooling < 100 || state.flattening > 0)) return true;
    if (now < state.lampSwitchFlashUntil) return true;
    if (state.floorDrops.length > 0) return true;
    if (state.pressAnim && now - state.pressAnim.startedAt < state.pressAnim.duration) return true;
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
    const ZOOM_MAX   = 2.2;

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
      render();
    }
    requestAnimationFrame(tick);
  }

  function onResize() {
    invalidateLayoutCache();
    if (state.trayColor) syncTrayMatrixShape();
    markDirty();
  }

  sceneCanvas.addEventListener("pointerdown", onPointerDown);
  sceneCanvas.addEventListener("pointermove", onPointerMove);
  sceneCanvas.addEventListener("pointerup", onPointerUp);
  sceneCanvas.addEventListener("pointercancel", onPointerUp);
  sceneCanvas.addEventListener("touchstart", onTouchStart, { passive: false });
  sceneCanvas.addEventListener("touchmove", onTouchMove, { passive: false });
  sceneCanvas.addEventListener("touchend", onTouchEnd, { passive: false });
  sceneCanvas.addEventListener("touchcancel", onTouchEnd, { passive: false });
  sceneCanvas.addEventListener("contextmenu", (event) => event.preventDefault());
  sceneCanvas.addEventListener("wheel", (event) => {
    if (state.phase !== "place" && state.phase !== "inspect") return;
    event.preventDefault();
    const delta = event.deltaY < 0 ? 0.14 : -0.14;
    setBoardZoom(state.boardView.scale + delta, state.boardView.panX, state.boardView.panY);
  }, { passive: false });

  els.resetButton.addEventListener("click", () => {
    const hasProgress = state.phase !== "choose" || placedCount() > 0;
    if (hasProgress && !window.confirm("重置会清空当前所有进度，确定吗？")) return;
    loadPattern(state.selectedPattern);
    showToast("已重置当前作品。");
  });
  els.sandboxButton?.addEventListener("click", () => toggleSandboxMode());
  els.chooseStartButton?.addEventListener("click", () => {
    if (state.phase === "choose") setPhase("place");
  });
  previewCanvas.addEventListener("click", handlePreviewPickRemap);
  els.bgThemeSelect?.addEventListener("change", () => {
    applyBackgroundTheme(els.bgThemeSelect.value);
    showToast(`背景已切换为 ${currentBackgroundTheme().name}。`);
  });
  els.topToolStyleSelect?.addEventListener("change", (event) => {
    const next = event.target.value;
    if (!toolStyles[next] || state.toolStyle === next) return;
    state.toolStyle = next;
    showToast(`工具换成${currentToolStyle().name}款。`);
    markDirty();
  });
  let sizeSliderTimer = null;
  els.patternSizeSlider?.addEventListener("input", () => {
    const size = normalizePatternSize(els.patternSizeSlider.value);
    setSizeControls(size);
    if (sizeSliderTimer) window.clearTimeout(sizeSliderTimer);
    sizeSliderTimer = window.setTimeout(() => applyPatternSize(size), 110);
  });
  els.patternSizeSlider?.addEventListener("change", () => {
    const size = normalizePatternSize(els.patternSizeSlider.value);
    setSizeControls(size);
    applyPatternSize(size);
  });
  [els.paletteSizePicker, els.settingsPaletteSizePicker].forEach((picker) => {
    picker?.addEventListener("click", (event) => {
      const button = event.target.closest("[data-palette-size]");
      if (!button) return;
      setPaletteSize(button.dataset.paletteSize);
    });
  });
  els.zoomInButton?.addEventListener("click", () => {
    setBoardZoom(state.boardView.scale + 0.2, state.boardView.panX, state.boardView.panY);
  });
  els.zoomOutButton?.addEventListener("click", () => {
    setBoardZoom(state.boardView.scale - 0.2, state.boardView.panX, state.boardView.panY);
  });
  els.zoomResetButton?.addEventListener("click", () => {
    resetBoardView();
  });
  els.customImageInput.addEventListener("change", handleCustomImage);
  els.remapModalClose?.addEventListener("click", () => closeRemapModal());
  els.remapDoneButton?.addEventListener("click", () => closeRemapModal());
  els.remapResetButton?.addEventListener("click", () => resetPatternColorMapping());
  els.remapModal?.addEventListener("click", (event) => {
    if (event.target === els.remapModal) closeRemapModal();
  });
  els.settingsButton?.addEventListener("click", () => openSettingsModal());
  els.settingsModalClose?.addEventListener("click", () => closeSettingsModal());
  els.settingsModal?.addEventListener("click", (event) => {
    if (event.target === els.settingsModal) closeSettingsModal();
  });
  els.collectionButton?.addEventListener("click", () => {
    closeSettingsModal();
    openCollectionModal();
  });
  els.collectionModalClose?.addEventListener("click", () => closeCollectionModal());
  els.collectionModal?.addEventListener("click", (event) => {
    if (event.target === els.collectionModal) closeCollectionModal();
  });
  els.shareModalClose?.addEventListener("click", () => closeShareModal());
  els.shareModal?.addEventListener("click", (event) => {
    if (event.target === els.shareModal) closeShareModal();
  });
  window.addEventListener("keydown", (event) => {
    // WASD / Arrow keys: pan board.  Z / X: zoom in / out.
    // Desktop only (non-touch), place/inspect phase, no modal open, no input focused.
    if (!isTouchDevice()) {
      const boardPhase = state.phase === "place" || state.phase === "inspect";
      const tag = document.activeElement?.tagName;
      const inputFocused = tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT";
      if (boardPhase && !inputFocused && !getOpenModalEl()) {
        const k = event.key;
        const nav = state.kbdNav;
        if (k === "w" || k === "W" || k === "ArrowUp")    { event.preventDefault(); nav.up     = true; return; }
        if (k === "s" || k === "S" || k === "ArrowDown")  { event.preventDefault(); nav.down   = true; return; }
        if (k === "a" || k === "A" || k === "ArrowLeft")  { event.preventDefault(); nav.left   = true; return; }
        if (k === "d" || k === "D" || k === "ArrowRight") { event.preventDefault(); nav.right  = true; return; }
        if (k === "z" || k === "Z") { event.preventDefault(); nav.zoomIn  = true; return; }
        if (k === "x" || k === "X") { event.preventDefault(); nav.zoomOut = true; return; }
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
    // If the enlarge viewer is open within the collection modal, close it first.
    const enlarged = els.collectionModal?.querySelector(".collection-enlarged.show");
    if (enlarged) { enlarged.classList.remove("show"); return; }
    if (state.remapModalOpen) closeRemapModal();
    if (state.collectionModalOpen) closeCollectionModal();
    if (state.settingsModalOpen) closeSettingsModal();
    if (state.shareModalOpen) closeShareModal();
  });

  window.addEventListener("keyup", (event) => {
    const nav = state.kbdNav;
    const k = event.key;
    if (k === "w" || k === "W" || k === "ArrowUp")    nav.up     = false;
    if (k === "s" || k === "S" || k === "ArrowDown")  nav.down   = false;
    if (k === "a" || k === "A" || k === "ArrowLeft")  nav.left   = false;
    if (k === "d" || k === "D" || k === "ArrowRight") nav.right  = false;
    if (k === "z" || k === "Z") nav.zoomIn  = false;
    if (k === "x" || k === "X") nav.zoomOut = false;
  });

  window.addEventListener("resize", onResize);

  setAutoSaveHook(scheduleAutoSave);
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
  });
  validatePatterns();
  loadPattern(resizePattern(patterns[0], state.patternSize));
  applyBackgroundTheme(state.bgTheme);
  if (!loadAutoSave()) {
    setPhase("choose");
  }
  uiRenderUI();
  requestAnimationFrame(tick);
