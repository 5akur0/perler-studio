// Thin client wrappers over the share-api community routes. Keeps community.js
// free of transport details. getClientId() mints a stable per-device id (used to
// dedup update-board votes) without any account system.
import { requestShareApi, shareApiConfigured } from './gallery.js';
import { clientIdKey } from './constants.js';

export { shareApiConfigured };

export function getClientId() {
  try {
    let id = localStorage.getItem(clientIdKey);
    if (!id) {
      id = (crypto?.randomUUID?.() || `c-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`);
      localStorage.setItem(clientIdKey, id);
    }
    return id;
  } catch {
    // Private mode / storage blocked: a volatile id still works for one session.
    return `c-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
  }
}

export function submitMessage({ nickname, content }) {
  return requestShareApi("/api/messages/submit", { nickname, content });
}

export function listMessages({ limit = 20 } = {}) {
  return requestShareApi("/api/messages/list", { limit });
}

export function listRoadmap() {
  return requestShareApi("/api/roadmap/list", { clientId: getClientId() });
}

export function voteRoadmap(itemId) {
  return requestShareApi("/api/roadmap/vote", { itemId, clientId: getClientId() });
}
