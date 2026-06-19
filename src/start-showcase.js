// Home (start screen) hero showcase: rotates through a curated set of finished
// bead patterns rendered with the live theme tint, so the very first frame the
// user sees is the product's output — "出片即门面" (PRODUCT.md §1).
// Reuses drawPatternThumb (theme-aware) so there is zero new art and the preview
// matches what the studio renders.
import { els } from './dom.js';
import { patterns } from './patterns-data.js';
import { drawPatternThumb } from './ui.js';
import { prefersReducedMotion, stableHash } from './utils.js';

const FEATURED_COUNT = 5;
const ROTATE_MS = 4200;

let featured = [];
let index = 0;
let timer = null;
let active = false;
let onPick = null;

// The calendar day, in the user's local timezone, so "今日" matches their day.
function todayKey() {
  const d = new Date();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${m}-${day}`;
}

// "今日精选": a genuinely daily selection — a deterministic, date-seeded pick
// from the whole catalog. Stable for the whole calendar day (same seed → same
// set + order), but different day to day, so it stops looking like a canned,
// always-identical row. Seeded Fisher–Yates (per-step hash, no global RNG).
function resolveFeatured() {
  const pool = patterns.slice();
  if (pool.length <= FEATURED_COUNT) return pool;
  const key = todayKey();
  for (let i = pool.length - 1; i > 0; i -= 1) {
    const j = stableHash(`${key}:${i}`) % (i + 1);
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, FEATURED_COUNT);
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
