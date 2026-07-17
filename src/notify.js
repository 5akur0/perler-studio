import { state } from './state.js';
import { els } from './dom.js';

export function showToast(message) {
  window.clearTimeout(state.toastTimer);
  els.toast.textContent = message;
  els.toast.classList.add("show");
  state.toastTimer = window.setTimeout(() => {
    els.toast.classList.remove("show");
  }, 2000);
}

export function hidePlaceHint() {
  if (!els.placeHint) return;
  els.placeHint.classList.remove("show");
}

export function showPlaceHint(message, key = message, duration = 2000) {
  if (!els.placeHint || !message) return;
  // The place hint belongs to the bead workbench only — never leak it onto the
  // home screen (e.g. after a refresh restores an in-progress "place" phase).
  if (state.appMode !== "bead") return;
  if (state.lastPlaceHintKey === key) return;
  state.lastPlaceHintKey = key;
  window.clearTimeout(state.placeHintTimer);
  els.placeHint.textContent = message;
  els.placeHint.classList.add("show");
  state.placeHintTimer = window.setTimeout(() => {
    hidePlaceHint();
  }, duration);
}

export function celebrate() {
  const layer = els.celebrateLayer;
  if (!layer) return;
  window.clearTimeout(state.celebrateTimer);
  layer.classList.remove("show");
  void layer.offsetWidth; // force reflow so the animation re-triggers on the next save
  layer.classList.add("show");
  state.celebrateTimer = window.setTimeout(() => {
    layer.classList.remove("show");
  }, 760);
}

function showNextAchievementToast() {
  if (!els.achievementToast || state.achievementShowing || !state.achievementQueue.length) return;
  const achievement = state.achievementQueue.shift();
  state.achievementShowing = true;
  const label = document.createElement('span');
  label.className = 'label';
  label.textContent = achievement.hidden ? '隐藏成就' : '成就解锁';
  const title = document.createElement('strong');
  title.textContent = achievement.name;
  els.achievementToast.replaceChildren(label, title);
  els.achievementToast.classList.add('show');
  state.achievementTimer = window.setTimeout(() => {
    els.achievementToast.classList.remove('show');
    window.setTimeout(() => {
      state.achievementShowing = false;
      showNextAchievementToast();
    }, 200);
  }, 2600);
}

export function showAchievementToast(achievement) {
  const normalized = typeof achievement === 'string'
    ? { name: achievement, hidden: true }
    : achievement;
  if (!normalized?.name) return;
  if (!els.achievementToast) {
    showToast(`${normalized.hidden ? '隐藏成就' : '成就'}解锁：${normalized.name}`);
    return;
  }
  state.achievementQueue.push(normalized);
  showNextAchievementToast();
}
