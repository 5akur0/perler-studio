// src/pattern-library.js — the 图纸库 (pattern library) model.
//
// The library is the user's personal, persisted collection of patterns: the
// built-in defaults plus anything imported (图纸码) or saved from 绘图台. It can
// be starred (pin to top), renamed, deleted, and restored. It replaces the old
// 拼豆台 "choose" wall, where imported patterns lived only in memory (one at a
// time) and never survived a reload.
//
// `patterns` (patterns-data.js) stays the canonical in-memory POOL that the rest
// of the app reads (findPatternByBaseId, the daily showcase, session restore).
// This module keeps that pool in sync with the persisted store and exposes a
// sorted VIEW for rendering. The persisted store is the source of truth for
// imported items / stars / hidden-defaults / renames; transient work-in-progress
// customs (e.g. a restored session) live in the pool only and never appear here.

import { patterns, patternSeeds } from './patterns-data.js';
import { patternLibraryKey } from './constants.js';

const defaultIds = new Set(patternSeeds.map((seed) => seed.id));

let store = { imported: [], stars: {}, hidden: {}, renames: {} };

// Persistence is inlined here (not via storage.js) so the data layer stays free
// of the dom.js dependency that storage.js → notify.js pulls in — keeps this
// module importable in plain Node for tests and from session.js.
function readStore() {
  try {
    const parsed = JSON.parse(localStorage.getItem(patternLibraryKey) || "null");
    if (!parsed || typeof parsed !== "object") return { imported: [], stars: {}, hidden: {}, renames: {} };
    return {
      imported: Array.isArray(parsed.imported) ? parsed.imported : [],
      stars: parsed.stars && typeof parsed.stars === "object" ? parsed.stars : {},
      hidden: parsed.hidden && typeof parsed.hidden === "object" ? parsed.hidden : {},
      renames: parsed.renames && typeof parsed.renames === "object" ? parsed.renames : {},
    };
  } catch (error) {
    return { imported: [], stars: {}, hidden: {}, renames: {} };
  }
}

export function isDefaultPatternId(id) {
  return defaultIds.has(id);
}

// Strip heavy / volatile fields before persisting. Source image data URLs in
// particular can be 100KB+ each and would blow the localStorage budget; the
// converted rows are enough to rebuild and re-bead. To re-convert at another
// size, the user goes back to 绘图台.
function toStorable(pattern) {
  const {
    sourceImageDataUrl, conversionStats, __gridFingerprint, __effectiveMap, ...rest
  } = pattern;
  return { ...rest };
}

function poolIndexOf(id) {
  return patterns.findIndex((p) => p.id === id);
}

// Add or replace a pattern in the in-memory pool WITHOUT persisting. Used for
// transient customs (session restore) so they're findable during the session
// without polluting the saved library.
export function upsertPoolPattern(pattern) {
  const at = poolIndexOf(pattern.id);
  if (at >= 0) patterns[at] = pattern;
  else patterns.push(pattern);
  return pattern;
}

function removeFromPool(id) {
  const at = poolIndexOf(id);
  if (at >= 0) patterns.splice(at, 1);
}

// Rebuild the in-memory pool to match the persisted store: drop hidden defaults,
// make sure every persisted import is present, and apply rename overrides to the
// live objects so toasts / share text use the chosen names.
function syncPool() {
  for (let i = patterns.length - 1; i >= 0; i -= 1) {
    const p = patterns[i];
    if (defaultIds.has(p.id) && store.hidden[p.id]) patterns.splice(i, 1);
  }
  // Re-add any default that is no longer hidden but missing from the pool.
  patternSeeds.forEach((seed) => {
    if (store.hidden[seed.id]) return;
    if (poolIndexOf(seed.id) < 0) {
      const original = defaultPoolSnapshot.get(seed.id);
      if (original) patterns.push({ ...original });
    }
  });
  store.imported.forEach((p) => upsertPoolPattern({ ...p }));
  // Apply renames to live pool objects.
  patterns.forEach((p) => {
    if (store.renames[p.id]) p.name = store.renames[p.id];
  });
}

// Snapshot the pristine default pool objects (the 30×30 expanded seeds built in
// patterns-data.js) so a deleted-then-restored default comes back intact.
const defaultPoolSnapshot = new Map(
  patterns.filter((p) => defaultIds.has(p.id)).map((p) => [p.id, { ...p }]),
);

export function loadLibrary() {
  store = readStore();
  syncPool();
  return store;
}

function persist() {
  try {
    localStorage.setItem(patternLibraryKey, JSON.stringify({
      imported: store.imported,
      stars: store.stars,
      hidden: store.hidden,
      renames: store.renames,
    }));
  } catch (error) {
    // Library persistence is best-effort; a blocked/full localStorage just means
    // this change won't survive a reload. Don't break the in-memory experience.
    if (typeof console !== "undefined") console.warn("[pattern-library] persist failed", error);
  }
}

export function effectiveName(pattern) {
  return store.renames[pattern.id] || pattern.name || "未命名";
}

export function isStarred(id) {
  return Boolean(store.stars[id]);
}

// Stars persist as a monotonically increasing order value (most recent = highest)
// so the starred group can be shown newest-first. Legacy stars stored as `true`
// coerce to 1, so they sort below any freshly (re)starred item.
let starSeq = 0;
function nextStarOrder() {
  starSeq = Math.max(Date.now(), starSeq + 1);
  return starSeq;
}
function starOrder(id) {
  return Number(store.stars[id]) || 0;
}

// The sorted list for rendering: starred first (most recently starred at the very
// top), then unstarred by name in pinyin order (localeCompare zh-CN handles
// Chinese first-letter ordering with no lookup table). Returns shallow clones
// tagged with { starred, displayName }.
export function getLibraryView() {
  const defaults = patterns.filter((p) => defaultIds.has(p.id) && !store.hidden[p.id]);
  const items = [...defaults, ...store.imported].map((p) => ({
    ...p,
    starred: isStarred(p.id),
    displayName: effectiveName(p),
  }));
  items.sort((a, b) => {
    if (a.starred !== b.starred) return a.starred ? -1 : 1;
    if (a.starred && b.starred) {
      const byRecency = starOrder(b.id) - starOrder(a.id); // newest star first
      if (byRecency) return byRecency;
    }
    return a.displayName.localeCompare(b.displayName, "zh-CN");
  });
  return items;
}

export function libraryCount() {
  const defaults = patterns.filter((p) => defaultIds.has(p.id) && !store.hidden[p.id]).length;
  return defaults + store.imported.length;
}

// Persist an imported / drawn pattern into the library (and the pool). Returns
// the stored object. Caller is responsible for giving it a unique id.
export function addToLibrary(pattern) {
  const storable = toStorable(pattern);
  if (!storable.name) storable.name = "未命名";
  const existing = store.imported.findIndex((p) => p.id === storable.id);
  if (existing >= 0) store.imported[existing] = storable;
  else store.imported.push(storable);
  upsertPoolPattern({ ...pattern });
  persist();
  return storable;
}

export function removeFromLibrary(id) {
  if (defaultIds.has(id)) {
    store.hidden[id] = true;
  } else {
    store.imported = store.imported.filter((p) => p.id !== id);
  }
  delete store.stars[id];
  delete store.renames[id];
  removeFromPool(id);
  persist();
}

export function toggleStar(id) {
  if (store.stars[id]) delete store.stars[id];
  else store.stars[id] = nextStarOrder();
  persist();
  return Boolean(store.stars[id]);
}

export function renameInLibrary(id, rawName) {
  const name = String(rawName || "").trim().slice(0, 20);
  if (!name) return false;
  store.renames[id] = name;
  const imported = store.imported.find((p) => p.id === id);
  if (imported) imported.name = name;
  const at = poolIndexOf(id);
  if (at >= 0) patterns[at].name = name;
  persist();
  return true;
}

// Bring back every deleted default (does not touch imported items or stars).
export function restoreDefaults() {
  store.hidden = {};
  syncPool();
  persist();
}

export function hasHiddenDefaults() {
  return Object.keys(store.hidden).length > 0;
}

// A short unique id for newly imported / drawn library items.
export function newLibraryId(prefix = "custom") {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}
