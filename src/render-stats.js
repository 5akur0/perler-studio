// Scoring, accuracy, heat, and status-text derivations extracted from render.js.
//
// These read game state and pattern data and return plain values/strings — they
// never touch a canvas context. They depend only on state/pattern/palette/const
// utils, plus one call-time back-reference to render.js (`useMobileDirectPlacement`,
// a layout predicate). That back-edge forms a render.js<->render-stats.js cycle,
// which is safe: it is dereferenced inside function bodies at call time, and
// esbuild bundles everything into one IIFE. render.js re-exports these so
// main.js/ui.js keep importing them from './render.js'.

import { state } from './state.js';
import { beadIds } from './palette.js';
import { clamp } from './color-utils.js';
import { HEAT_LEVELS } from './constants.js';
import {
  getPlacedCounts, getTargetTotal, targetAt, indexFor, boardCols, boardRows, beadLabel,
} from './pattern.js';
import { useMobileDirectPlacement } from './render.js';

export function placedCount() {
  return Object.values(getPlacedCounts()).reduce((sum, count) => sum + count, 0);
}

export function inspectionSummary() {
  return state.errors.reduce((summary, error) => {
    summary[error.type] += 1;
    return summary;
  }, { missing: 0, wrong: 0, extra: 0 });
}

export function placementAccuracy() {
  if (state.sandboxMode) return 1;
  const total = getTargetTotal();
  if (!total) return 1;
  let correct = 0;
  const cols = boardCols();
  const rows = boardRows();
  for (let y = 0; y < rows; y += 1) {
    for (let x = 0; x < cols; x += 1) {
      const target = targetAt(x, y);
      if (target && state.placed[indexFor(x, y)] === target) correct += 1;
    }
  }
  return correct / total;
}

export function heatStats() {
  const total = getTargetTotal();
  let bonded = 0;
  let ideal = 0;
  let over = 0;
  let heated = 0;
  state.heat.forEach((heat, index) => {
    if (!state.placed[index]) return;
    if (heat > HEAT_LEVELS.visible) heated += 1;
    if (heat >= HEAT_LEVELS.bonded) bonded += 1;
    if (heat >= HEAT_LEVELS.idealMin && heat <= HEAT_LEVELS.idealMax) ideal += 1;
    if (heat > HEAT_LEVELS.over) over += 1;
  });
  return {
    total,
    bonded,
    ideal,
    over,
    heated,
    bondedPercent: total ? (bonded / total) * 100 : 0,
    idealPercent: total ? (ideal / total) * 100 : 0,
    overPercent: total ? (over / total) * 100 : 0,
  };
}

export function estimateWarp() {
  const stats = heatStats();
  const under = Math.max(0, stats.total - stats.bonded);
  return clamp(14 + under * 0.08 + stats.over * 0.42, 0, 75);
}

export function scoreLabel() {
  if (state.sandboxMode) return "沙盒";
  if (state.phase === "choose") return "未开始";
  if (state.phase === "finish") return `评级 ${finalGrade()}`;
  const acc = placementAccuracy();
  if (acc >= 0.92) return "出色";
  if (acc >= 0.78) return "良好";
  if (acc >= 0.55) return "一般";
  return "需调整";
}

export function finalGrade() {
  if (state.sandboxMode) return "沙盒";
  const accuracy = placementAccuracy();
  const heat = heatStats();
  const mildYellow = Math.max(0, heat.overPercent - 8);
  const severeBurn = Math.max(0, heat.overPercent - 24);
  const yellowPenalty = mildYellow * 0.28 + severeBurn * 0.4;
  const heatScore = clamp(heat.idealPercent - yellowPenalty, 0, 100) / 100;
  const flat = clamp(100 - state.warp, 0, 100) / 100;
  const cool = clamp(state.cooling, 0, 100) / 100;
  const score = accuracy * 0.42 + heatScore * 0.36 + flat * 0.14 + cool * 0.08;
  if (score >= 0.93) return "S";
  if (score >= 0.84) return "A";
  if (score >= 0.72) return "B";
  if (score >= 0.58) return "C";
  return "D";
}

export function statusText() {
  const phase = state.phase;
  if (state.sandboxMode && phase === "place") {
    return useMobileDirectPlacement()
      ? "沙盒模式：自由拼摆中。"
      : "沙盒模式：自由拼摆中。";
  }
  if (phase === "choose") return "选择一张图纸，开始今天的手作。";
  if (phase === "place") {
    if (state.spill) return "有豆子倒下来卡住了。可先继续摆放，熨烫前再处理。";
    if (useMobileDirectPlacement()) {
      return `已选 ${beadLabel(state.selectedColor)}${state.lampOn ? " · 投影开" : ""}`;
    }
    if (state.tool === "needle") {
      if (!state.trayColor) return `豆针 · 未倒豆${state.lampOn ? " · 投影开" : ""}`;
      return `豆筛 ${state.trayBeans} 颗 ${beadIds[state.trayColor]} · ${state.lampOn ? "投影开" : "投影关"}`;
    }
    return state.tweezerBead
      ? `镊子夹着 ${beadLabel(state.tweezerBead)} · ${state.lampOn ? "投影开" : "投影关"}`
      : `镊子 · 空夹${state.lampOn ? " · 投影开" : ""}`;
  }
  if (phase === "inspect") {
    if (state.spill) return "还有倒下的豆子未处理。继续熨烫会糊坏该位置。";
    return state.errors.length ? "检查到需要修正的位置。" : "板面检查通过，可以盖纸熨烫。";
  }
  if (phase === "iron") return "熨烫中。";
  if (phase === "cool") return "冷却中。";
  return `${state.selectedPattern.name}完成，已进入收藏阶段。`;
}
