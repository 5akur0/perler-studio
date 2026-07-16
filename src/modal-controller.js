import { state } from './state.js';
import { els } from './dom.js';
import { onboardingKey } from './constants.js';
import { useMobileDirectPlacement } from './render.js';
import { playSfx } from './sfx.js';

const modalActions = {
  renderRemapModal: () => {},
  uiRenderSharePanel: () => {},
};

export function setModalActions(actions = {}) {
  Object.assign(modalActions, actions);
}

export function getOpenModalEl() {
  // The confirm dialog is always on top and takes priority in the Tab focus trap.
  if (state.confirmModalOpen) return els.confirmModal;
  if (state.textInputModalOpen) return els.textInputModal;
  if (state.remapModalOpen) return els.remapModal;
  if (state.settingsModalOpen) return els.settingsModal;
  if (state.onboardingModalOpen) return els.onboardingModal;
  if (state.shareModalOpen) return els.shareModal;
  if (state.gallerySubmitModalOpen) return els.gallerySubmitModal;
  if (state.drawCodeModalOpen) return els.drawCodeModal;
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
  // Lock background scroll: the mobile overflow:hidden only applies at ≥861px, otherwise the page behind the modal can still scroll (scroll bleed-through).
  document.body.classList.add("modal-open");
  playSfx("modal-open");
  const focusables = focusablesIn(modalEl);
  if (focusables.length) focusables[0].focus();
}

export function restoreModalFocus() {
  if (getOpenModalEl()) return;
  // No modal is open anymore → release the background scroll lock.
  document.body.classList.remove("modal-open");
  playSfx("modal-close");
  const el = state.modalReturnFocus;
  state.modalReturnFocus = null;
  if (el && typeof el.focus === "function" && document.contains(el)) el.focus();
  // Fallback: if the restore above didn't take effect (the return target is no longer in the DOM, or no longer
  // focusable), focus would be stranded inside the just-hidden modal, creating a keyboard dead end. Check the
  // final focus and, if needed, fall back to the first usable topbar button as a stable anchor.
  const active = document.activeElement;
  if (active && active.closest && active.closest(".remap-modal")) {
    // Each screen has its own .topbar; inactive screens are display:none. Take only a focusable button in the
    // currently visible screen (offsetParent non-null) as the anchor; if none is found, blur to release keyboard focus.
    const anchor = [...document.querySelectorAll(".topbar button:not([disabled])")].find((b) => b.offsetParent !== null);
    if (anchor && typeof anchor.focus === "function") anchor.focus();
    else if (typeof active.blur === "function") active.blur();
  }
}

// —— In-page confirm dialog. Returns Promise<boolean>. ——
let confirmResolve = null;
let textInputResolve = null;

export function confirmModal({ message, okText = "确定", cancelText = "取消", danger = false, title = "确认一下" } = {}) {
  return new Promise((resolve) => {
    const modal = els.confirmModal;
    if (!modal || !els.confirmModalOk) {
      console.warn("Confirm dialog is unavailable; cancelling guarded action.");
      resolve(false);
      return;
    }
    if (els.confirmModalTitle) els.confirmModalTitle.textContent = title;
    if (els.confirmModalMessage) els.confirmModalMessage.textContent = message;
    els.confirmModalOk.textContent = okText;
    if (els.confirmModalCancel) els.confirmModalCancel.textContent = cancelText;
    els.confirmModalOk.classList.toggle("danger-button", danger);
    els.confirmModalOk.classList.toggle("primary-button", !danger);
    confirmResolve = resolve;
    state.confirmModalOpen = true;
    modal.classList.add("show");
    modal.setAttribute("aria-hidden", "false");
    onModalOpened(modal);
    // Focusing "Cancel" by default is safer (especially for destructive actions).
    if (els.confirmModalCancel) els.confirmModalCancel.focus();
  });
}

export function resolveConfirm(result) {
  if (!state.confirmModalOpen) return;
  state.confirmModalOpen = false;
  if (els.confirmModal) {
    els.confirmModal.classList.remove("show");
    els.confirmModal.setAttribute("aria-hidden", "true");
  }
  const resolve = confirmResolve;
  confirmResolve = null;
  restoreModalFocus();
  if (resolve) resolve(Boolean(result));
}

// —— In-page text input dialog. Returns Promise<string|null>. ——
export function textInputModal({
  title = "改个名字",
  label = "名称",
  value = "",
  hint = "",
  okText = "保存",
  cancelText = "取消",
  maxLength = 20,
} = {}) {
  return new Promise((resolve) => {
    const modal = els.textInputModal;
    const input = els.textInputModalInput;
    if (!modal || !input || !els.textInputModalOk) {
      console.warn("Text input dialog is unavailable; cancelling input action.");
      resolve(null);
      return;
    }
    if (els.textInputModalTitle) els.textInputModalTitle.textContent = title;
    if (els.textInputModalLabel) els.textInputModalLabel.textContent = label;
    if (els.textInputModalHint) {
      els.textInputModalHint.textContent = hint || "";
      els.textInputModalHint.hidden = !hint;
    }
    input.value = String(value || "");
    input.maxLength = Math.max(1, Number(maxLength) || 20);
    els.textInputModalOk.textContent = okText;
    if (els.textInputModalCancel) els.textInputModalCancel.textContent = cancelText;
    textInputResolve = resolve;
    state.textInputModalOpen = true;
    modal.classList.add("show");
    modal.setAttribute("aria-hidden", "false");
    onModalOpened(modal);
    input.focus();
    input.select();
  });
}

export function resolveTextInput(result) {
  if (!state.textInputModalOpen) return;
  const value = result ? (els.textInputModalInput?.value ?? "") : null;
  state.textInputModalOpen = false;
  if (els.textInputModal) {
    els.textInputModal.classList.remove("show");
    els.textInputModal.setAttribute("aria-hidden", "true");
  }
  const resolve = textInputResolve;
  textInputResolve = null;
  restoreModalFocus();
  if (resolve) resolve(value);
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

function onboardingHtml() {
  const mobile = useMobileDirectPlacement();
  const steps = mobile
    ? [
        ["选颜色", "点下方豆盒里的色号（只显示本图用到的色）。"],
        ["放豆", "点拼豆板的格子放下；同色再点一次会取下。"],
        ["对照", "照着参考图纸，把每个格子填好。"],
        ["熨烫定型", "检查 → 盖纸熨烫 → 冷却压平 → 保存到作品集。"],
      ]
    : [
        ["选颜色", "点右侧豆盒里的色号，把豆子倒进豆筛。"],
        ["取豆", "点豆筛给「豆针」上豆铺大面积；或用「镊子」从豆筛/板面夹单颗。"],
        ["摆放", "在拼豆板对应孔位放下豆子，照着左侧参考图纸拼。"],
        ["熨烫定型", "检查 → 盖纸熨烫 → 冷却压平 → 保存到作品集。"],
      ];
  const lead = mobile ? "在手机上拼豆很简单：" : "在浏览器里完整体验拼豆手作：";
  const tip = mobile ? "双指可缩放板面。" : "按住板面可拖动，滚轮缩放。";
  const items = steps
    .map(([t, d], i) => `<li><span class="onboarding-step-no">${i + 1}</span><span><strong>${t}</strong>${d}</span></li>`)
    .join("");
  return `<p class="onboarding-lead">${lead}</p><ol class="onboarding-steps">${items}</ol><p class="onboarding-tip">${tip}</p>`;
}

export function openOnboardingModal() {
  if (!els.onboardingModal) return;
  if (els.onboardingBody) els.onboardingBody.innerHTML = onboardingHtml();
  state.onboardingModalOpen = true;
  els.onboardingModal.classList.add("show");
  els.onboardingModal.setAttribute("aria-hidden", "false");
  onModalOpened(els.onboardingModal);
}

export function closeOnboardingModal() {
  if (!els.onboardingModal) return;
  state.onboardingModalOpen = false;
  els.onboardingModal.classList.remove("show");
  els.onboardingModal.setAttribute("aria-hidden", "true");
  try { localStorage.setItem(onboardingKey, "seen"); } catch { /* ignore quota */ }
  restoreModalFocus();
}

/** Mark first-run help as handled; placement hints now teach inline without covering the workbench. */
export function maybeShowOnboarding() {
  if (state.sandboxMode) return;
  if (getOpenModalEl()) return;
  let seen = false;
  try { seen = localStorage.getItem(onboardingKey) === "seen"; } catch { seen = false; }
  if (seen) return;
  try { localStorage.setItem(onboardingKey, "seen"); } catch { /* ignore quota */ }
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
