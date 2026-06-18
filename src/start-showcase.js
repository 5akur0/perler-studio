// Home (start screen) hero showcase: rotates through a curated set of finished
// bead patterns rendered with the live theme tint, so the very first frame the
// user sees is the product's output — "出片即门面" (PRODUCT.md §1).
// Reuses drawPatternThumb (theme-aware) so there is zero new art and the preview
// matches what the studio renders.
import { els } from './dom.js';
import { patterns } from './patterns-data.js';
import { drawPatternThumb } from './ui.js';
import { prefersReducedMotion } from './utils.js';

// Curated, visually varied featured set (falls back to the first patterns if an
// id is ever renamed). Order is the rotation order.
const FEATURED_IDS = ['berry-cat', 'strawberry', 'panda', 'boba', 'moon'];
const ROTATE_MS = 4200;

let featured = [];
let index = 0;
let timer = null;
let active = false;
let onPick = null;

function resolveFeatured() {
  const byId = new Map(patterns.map((p) => [p.id, p]));
  const picked = FEATURED_IDS.map((id) => byId.get(id)).filter(Boolean);
  return picked.length ? picked : patterns.slice(0, 5);
}

function buildDots() {
  const host = els.startShowcaseDots;
  if (!host) return;
  host.textContent = '';
  featured.forEach((_, i) => {
    const dot = document.createElement('span');
    dot.className = 'start-showcase-dot';
    host.appendChild(dot);
  });
}


function paint() {
  const pattern = featured[index];
  if (!pattern || !els.startShowcaseCanvas) return;
  drawPatternThumb(els.startShowcaseCanvas, pattern);
  if (els.startShowcaseName) els.startShowcaseName.textContent = pattern.name;
  if (els.startShowcaseCraft) {
    const craft = pattern.craft ? `${pattern.craft} · ` : '';
    els.startShowcaseCraft.textContent = `${craft}${pattern.width}×${pattern.height}`;
  }
  if (els.startShowcaseDots) {
    const dots = els.startShowcaseDots.children;
    for (let i = 0; i < dots.length; i += 1) {
      dots[i].classList.toggle('is-active', i === index);
    }
  }
}

// Soft crossfade on the canvas element (instant under reduced-motion).
function show(next, { animate = true } = {}) {
  index = (next + featured.length) % featured.length;
  const canvas = els.startShowcaseCanvas;
  if (!canvas || !animate || prefersReducedMotion()) {
    paint();
    return;
  }
  canvas.classList.add('is-swapping');
  window.setTimeout(() => {
    paint();
    canvas.classList.remove('is-swapping');
  }, 160);
}

function stopTimer() {
  if (timer) {
    window.clearInterval(timer);
    timer = null;
  }
}

function startTimer() {
  stopTimer();
  if (!active || prefersReducedMotion() || featured.length < 2) return;
  timer = window.setInterval(() => show(index + 1), ROTATE_MS);
}

export function initStartShowcase(options = {}) {
  onPick = typeof options.onPick === 'function' ? options.onPick : null;
  featured = resolveFeatured();
  if (!featured.length) return;
  buildDots();

  els.startShowcaseDots?.addEventListener('click', (e) => {
    const dots = Array.from(els.startShowcaseDots.children);
    const i = dots.indexOf(e.target.closest('.start-showcase-dot'));
    if (i >= 0) {
      // Dots live inside the showcase button — don't let the click bubble up
      // and trigger the "摆这个" deep-link.
      e.stopPropagation();
      show(i);
      startTimer();
    }
  });

  els.startShowcaseButton?.addEventListener('click', () => {
    const pattern = featured[index];
    if (pattern && onPick) onPick(pattern);
  });

  paint();
}

// Re-tint after a theme switch.
export function refreshShowcaseTheme() {
  if (featured.length) paint();
}

// Pause rotation while the home screen is not the active surface.
export function setShowcaseActive(isActive) {
  active = !!isActive;
  if (active) {
    paint();
    startTimer();
  } else {
    stopTimer();
  }
}
