import { collectionKey, collectionLimit } from './constants.js';

export function readCollection() {
  try {
    const parsed = JSON.parse(localStorage.getItem(collectionKey) || "[]");
    if (!Array.isArray(parsed)) return [];
    return parsed.slice(0, collectionLimit);
  } catch (error) {
    return [];
  }
}

export function writeCollection(coll) {
  try {
    localStorage.setItem(collectionKey, JSON.stringify(coll.slice(0, collectionLimit)));
    return true;
  } catch (error) {
    showToast("浏览器阻止了本地保存，但作品已经完成。");
    return false;
  }
}

