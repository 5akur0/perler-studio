import { state } from './state.js';
import { achievementKey } from './constants.js';

export function readAchievements() {
  try {
    const parsed = JSON.parse(localStorage.getItem(achievementKey) || "[]");
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((item) => typeof item === "string");
  } catch (error) {
    return [];
  }
}

export function writeAchievements() {
  try {
    localStorage.setItem(achievementKey, JSON.stringify(state.achievements.slice(0, 24)));
    return true;
  } catch (error) {
    return false;
  }
}

export function hasAchievement(name) {
  return state.achievements.includes(name);
}

export function unlockAchievement(name, onToast) {
  if (hasAchievement(name)) return false;
  state.achievements.unshift(name);
  state.achievements = [...new Set(state.achievements)].slice(0, 24);
  writeAchievements();
  onToast?.(name);
  return true;
}

