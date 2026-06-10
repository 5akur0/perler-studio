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
  if (state.lastPlaceHintKey === key) return;
  state.lastPlaceHintKey = key;
  window.clearTimeout(state.placeHintTimer);
  els.placeHint.textContent = message;
  els.placeHint.classList.add("show");
  state.placeHintTimer = window.setTimeout(() => {
    hidePlaceHint();
  }, duration);
}

export function showAchievementToast(name) {
  if (!els.achievementToast) {
    showToast(`隐藏成就解锁：${name}`);
    return;
  }
  window.clearTimeout(state.achievementTimer);
  els.achievementToast.innerHTML = `<span class="label">隐藏成就</span><strong>${name}</strong>`;
  els.achievementToast.classList.add("show");
  state.achievementTimer = window.setTimeout(() => {
    els.achievementToast.classList.remove("show");
  }, 2600);
}
