import { state } from './state.js';
import { els } from './dom.js';

const modalActions = {
  renderRemapModal: () => {},
  uiRenderSharePanel: () => {},
};

export function setModalActions(actions = {}) {
  Object.assign(modalActions, actions);
}

export function getOpenModalEl() {
  if (state.remapModalOpen) return els.remapModal;
  if (state.settingsModalOpen) return els.settingsModal;
  if (state.shareModalOpen) return els.shareModal;
  if (state.gallerySubmitModalOpen) return els.gallerySubmitModal;
  return null;
}

export function focusablesIn(modalEl) {
  if (!modalEl) return [];
  return [...modalEl.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  )].filter((el) => !el.disabled && el.offsetParent !== null && el.getAttribute("aria-hidden") !== "true");
}

export function onModalOpened(modalEl) {
  if (!modalEl) return;
  const active = document.activeElement;
  if (active && active !== document.body && !active.closest(".remap-modal")) {
    state.modalReturnFocus = active;
  }
  const focusables = focusablesIn(modalEl);
  if (focusables.length) focusables[0].focus();
}

export function restoreModalFocus() {
  if (getOpenModalEl()) return;
  const el = state.modalReturnFocus;
  state.modalReturnFocus = null;
  if (el && typeof el.focus === "function" && document.contains(el)) el.focus();
}

export function openShareModal() {
  if (!els.shareModal) return;
  state.shareModalOpen = true;
  els.shareModal.classList.add("show");
  els.shareModal.setAttribute("aria-hidden", "false");
  modalActions.uiRenderSharePanel();
  onModalOpened(els.shareModal);
}

export function closeShareModal() {
  if (!els.shareModal) return;
  state.shareModalOpen = false;
  els.shareModal.classList.remove("show");
  els.shareModal.setAttribute("aria-hidden", "true");
  restoreModalFocus();
}

export function openSettingsModal() {
  if (!els.settingsModal) return;
  state.settingsModalOpen = true;
  els.settingsModal.classList.add("show");
  els.settingsModal.setAttribute("aria-hidden", "false");
  onModalOpened(els.settingsModal);
}

export function closeSettingsModal() {
  if (!els.settingsModal) return;
  state.settingsModalOpen = false;
  els.settingsModal.classList.remove("show");
  els.settingsModal.setAttribute("aria-hidden", "true");
  restoreModalFocus();
}

export function openRemapModal(focusSource = null) {
  if (state.phase !== "choose") return;
  state.remapFocusSource = focusSource || null;
  state.remapModalOpen = true;
  if (els.remapModal) {
    els.remapModal.classList.add("show");
    els.remapModal.setAttribute("aria-hidden", "false");
  }
  modalActions.renderRemapModal();
  onModalOpened(els.remapModal);
}

export function closeRemapModal() {
  state.remapModalOpen = false;
  if (els.remapModal) {
    els.remapModal.classList.remove("show");
    els.remapModal.setAttribute("aria-hidden", "true");
  }
  restoreModalFocus();
}
