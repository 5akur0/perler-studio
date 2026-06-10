import { state } from './state.js';
import { els } from './dom.js';
import { onboardingKey } from './constants.js';
import { useMobileDirectPlacement } from './render.js';

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
  if (state.onboardingModalOpen) return els.onboardingModal;
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
  // 锁背景滚动：移动端 overflow:hidden 只在 ≥861px 生效，否则弹窗背后页面仍可滚（scroll bleed-through）。
  document.body.classList.add("modal-open");
  const focusables = focusablesIn(modalEl);
  if (focusables.length) focusables[0].focus();
}

export function restoreModalFocus() {
  if (getOpenModalEl()) return;
  // 已无任何弹窗打开 → 解除背景滚动锁。
  document.body.classList.remove("modal-open");
  const el = state.modalReturnFocus;
  state.modalReturnFocus = null;
  if (el && typeof el.focus === "function" && document.contains(el)) el.focus();
  // 兜底：若上面的恢复没生效（返回目标已不在 DOM，或已不可聚焦），焦点会滞留在刚隐藏的
  // 弹窗里形成键盘死角。检查最终焦点，必要时回落到顶栏第一个可用按钮这一稳定锚点。
  const active = document.activeElement;
  if (active && active.closest && active.closest(".remap-modal")) {
    // 每个屏都有自己的 .topbar，非活动屏 display:none。只取当前可见屏里的可聚焦按钮
    // （offsetParent 非 null）作为锚点；都找不到就 blur 以释放键盘焦点。
    const anchor = [...document.querySelectorAll(".topbar button:not([disabled])")].find((b) => b.offsetParent !== null);
    if (anchor && typeof anchor.focus === "function") anchor.focus();
    else if (typeof active.blur === "function") active.blur();
  }
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

/** Show the onboarding once, the first time the player reaches the place phase (skips sandbox). */
export function maybeShowOnboarding() {
  if (state.sandboxMode) return;
  if (getOpenModalEl()) return;
  let seen = false;
  try { seen = localStorage.getItem(onboardingKey) === "seen"; } catch { seen = false; }
  if (seen) return;
  openOnboardingModal();
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
