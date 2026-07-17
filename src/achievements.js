import { state } from './state.js';
import {
  achievementKey, conceptAchievement, fullBoardAchievement,
} from './constants.js';

const groupSpecs = [
  {
    id: 'starts',
    title: '开始制作',
    description: '开始新的图纸',
    patternId: 'rocket',
    milestones: [
      ['first-start', '1 张', 'starts', 1],
      ['five-starts', '5 张', 'starts', 5],
      ['twenty-starts', '20 张', 'starts', 20],
    ],
  },
  {
    id: 'completed',
    title: '完成作品',
    description: '收入作品集',
    patternId: 'berry-cat',
    milestones: [
      ['first-finish', '1 件', 'completed', 1],
      ['three-finishes', '3 件', 'completed', 3],
      ['ten-finishes', '10 件', 'completed', 10],
      ['collection-full', '24 件', 'completed', 24],
    ],
  },
  {
    id: 'patterns',
    title: '不同图纸',
    description: '完成不同图纸',
    patternId: 'instant-photo',
    milestones: [
      ['three-patterns', '3 张', 'uniquePatterns', 3],
      ['eight-patterns', '8 张', 'uniquePatterns', 8],
      ['fifteen-patterns', '15 张', 'uniquePatterns', 15],
    ],
  },
  {
    id: 'quality',
    title: '高分作品',
    description: '获得 A 或 S 评级',
    patternId: 'ribbon-clip',
    milestones: [
      ['high-grade', '1 件', 'highGrades', 1],
      ['five-high-grades', '5 件', 'highGrades', 5],
      ['twelve-high-grades', '12 件', 'highGrades', 12],
    ],
  },
  {
    id: 'perfect',
    title: 'S级作品',
    description: '获得 S 评级',
    patternId: 'sweet-heart',
    milestones: [
      ['first-s-grade', '1 件', 'sGrades', 1],
      ['five-s-grades', '5 件', 'sGrades', 5],
    ],
  },
  {
    id: 'colors',
    title: '作品用色',
    description: '单件作品使用的颜色',
    patternId: 'lake-whale',
    milestones: [
      ['four-colors', '4 色', 'maxColors', 4],
      ['eight-colors', '8 色', 'maxColors', 8],
      ['twelve-colors', '12 色', 'maxColors', 12],
    ],
  },
  {
    id: 'themes',
    title: '背景主题',
    description: '使用不同背景',
    patternId: 'moon',
    milestones: [
      ['two-themes', '2 种', 'themes', 2],
      ['three-themes', '3 种', 'themes', 3],
      ['five-themes', '5 种', 'themes', 5],
    ],
  },
  {
    id: 'time',
    title: '制作时长',
    description: '单件作品的制作时间',
    patternId: 'panda',
    milestones: [
      ['ten-minutes', '10 分钟', 'longestBuildMs', 10 * 60 * 1000],
      ['thirty-minutes', '30 分钟', 'longestBuildMs', 30 * 60 * 1000],
      ['sixty-minutes', '60 分钟', 'longestBuildMs', 60 * 60 * 1000],
    ],
  },
  {
    id: 'crafts',
    title: '成品类型',
    description: '使用不同成品类型',
    patternId: 'mini-bouquet',
    milestones: [
      ['two-crafts', '2 种', 'crafts', 2],
      ['four-crafts', '4 种', 'crafts', 4],
    ],
  },
  {
    id: 'custom',
    title: '自制图纸',
    description: '完成绘制或导入的图纸',
    patternId: 'game-date',
    milestones: [
      ['first-custom-work', '1 件', 'customWorks', 1],
      ['five-custom-works', '5 件', 'customWorks', 5],
    ],
  },
  {
    id: 'scale',
    title: '作品规模',
    description: '单件作品的拼豆数量',
    patternId: 'boba',
    milestones: [
      ['hundred-beads', '100 颗', 'largestWork', 100],
      ['three-hundred-beads', '300 颗', 'largestWork', 300],
      ['six-hundred-beads', '600 颗', 'largestWork', 600],
    ],
  },
  {
    id: 'inspection',
    title: '检查通过',
    description: '无缺漏或错位后完成',
    patternId: 'strawberry',
    milestones: [
      ['first-clean-work', '1 件', 'cleanWorks', 1],
      ['five-clean-works', '5 件', 'cleanWorks', 5],
    ],
  },
  {
    id: 'remix',
    title: '图纸换色',
    description: '修改图纸配色后完成',
    patternId: 'milk-tea',
    milestones: [
      ['first-remix', '1 件', 'remixWorks', 1],
      ['five-remixes', '5 件', 'remixWorks', 5],
    ],
  },
  {
    id: 'flip',
    title: '双面熨烫',
    description: '翻面后完成',
    patternId: 'mushroom',
    milestones: [
      ['first-flipped-work', '1 件', 'flippedWorks', 1],
      ['five-flipped-works', '5 件', 'flippedWorks', 5],
    ],
  },
  {
    id: 'sharing',
    title: '分享方式',
    description: '使用不同分享方式',
    patternId: 'ghost',
    milestones: [
      ['first-share-kind', '1 种', 'shareKinds', 1],
      ['three-share-kinds', '3 种', 'shareKinds', 3],
    ],
  },
];

export const standardAchievementGroups = Object.freeze(groupSpecs.map((group) => Object.freeze({
  ...group,
  milestones: Object.freeze(group.milestones.map(([id, label, metric, target]) => Object.freeze({
    id,
    label,
    name: `${group.title} · ${label}`,
    description: group.description,
    metric,
    target,
    groupId: group.id,
    patternId: group.patternId,
    hidden: false,
  }))),
})));

export const standardAchievements = Object.freeze(
  standardAchievementGroups.flatMap((group) => group.milestones),
);

export const hiddenAchievements = Object.freeze([
  Object.freeze({
    id: 'concept-empty',
    name: conceptAchievement,
    description: '用空板完成沙盒流程',
    patternId: 'ghost',
    hidden: true,
  }),
  Object.freeze({
    id: 'concept-full',
    name: fullBoardAchievement,
    description: '在沙盒中铺满整块板',
    patternId: 'mushroom',
    hidden: true,
  }),
]);

export const achievementDefinitions = Object.freeze([
  ...standardAchievements,
  ...hiddenAchievements,
]);

const definitionById = new Map(achievementDefinitions.map((definition) => [definition.id, definition]));
const definitionByName = new Map(achievementDefinitions.map((definition) => [definition.name, definition]));
const legacyNames = new Map([
  ['开始制作', 'first-start'],
  ['第一件作品', 'first-finish'],
  ['三件作品', 'three-finishes'],
  ['十件作品', 'ten-finishes'],
  ['A级作品', 'high-grade'],
  ['八种颜色', 'eight-colors'],
  ['三个背景', 'three-themes'],
  ['制作十分钟', 'ten-minutes'],
]);
const numericMetrics = Object.freeze([
  'starts',
  'completed',
  'highGrades',
  'sGrades',
  'maxColors',
  'longestBuildMs',
  'customWorks',
  'largestWork',
  'cleanWorks',
  'remixWorks',
  'flippedWorks',
]);
const arrayMetrics = Object.freeze(['uniquePatterns', 'themes', 'crafts', 'shareKinds']);
const achievementTiers = Object.freeze({
  locked: Object.freeze({ key: 'locked', label: '未解锁' }),
  bronze: Object.freeze({ key: 'bronze', label: '铜' }),
  silver: Object.freeze({ key: 'silver', label: '银' }),
  gold: Object.freeze({ key: 'gold', label: '金' }),
  master: Object.freeze({ key: 'master', label: '满级' }),
});
const achievementTierLadders = Object.freeze({
  2: Object.freeze(['bronze', 'gold']),
  3: Object.freeze(['bronze', 'silver', 'gold']),
  4: Object.freeze(['bronze', 'silver', 'gold', 'master']),
});

export function achievementTier(completed, total) {
  const ladder = achievementTierLadders[total] || achievementTierLadders[3];
  const level = Math.max(0, Math.min(ladder.length, Math.floor(Number(completed) || 0)));
  return level > 0 ? achievementTiers[ladder[level - 1]] : achievementTiers.locked;
}

export function emptyAchievementState() {
  return {
    version: 3,
    unlocked: [],
    seen: [],
    stats: {
      starts: 0,
      completed: 0,
      highGrades: 0,
      sGrades: 0,
      maxColors: 0,
      longestBuildMs: 0,
      customWorks: 0,
      largestWork: 0,
      cleanWorks: 0,
      remixWorks: 0,
      flippedWorks: 0,
      uniquePatterns: [],
      themes: [],
      crafts: [],
      shareKinds: [],
    },
  };
}

function normalizeIds(items) {
  if (!Array.isArray(items)) return [];
  const ids = items.map((item) => {
    if (typeof item !== 'string') return '';
    const legacyId = legacyNames.get(item);
    return definitionById.get(item)?.id || definitionByName.get(item)?.id || legacyId || '';
  }).filter(Boolean);
  return [...new Set(ids)].slice(0, achievementDefinitions.length);
}

function normalizedStringList(items) {
  if (!Array.isArray(items)) return [];
  return [...new Set(items.filter((item) => typeof item === 'string' && item))].slice(0, 64);
}

function normalizeState(raw) {
  const next = emptyAchievementState();
  if (Array.isArray(raw)) {
    next.unlocked = normalizeIds(raw);
    return next;
  }
  if (!raw || typeof raw !== 'object') return next;
  next.unlocked = normalizeIds(raw.unlocked);
  next.seen = normalizeIds(raw.seen).filter((id) => next.unlocked.includes(id));
  numericMetrics.forEach((metric) => {
    next.stats[metric] = Math.max(0, Number(raw.stats?.[metric]) || 0);
  });
  arrayMetrics.forEach((metric) => {
    next.stats[metric] = normalizedStringList(raw.stats?.[metric]);
  });

  // v2 stored these two goals as counts. Preserve the earned progress while
  // migrating them to the more useful "best single work" metrics.
  if ((Number(raw.stats?.colorfulWorks) || 0) > 0) {
    next.stats.maxColors = Math.max(next.stats.maxColors, 8);
  }
  if ((Number(raw.stats?.patientWorks) || 0) > 0) {
    next.stats.longestBuildMs = Math.max(next.stats.longestBuildMs, 10 * 60 * 1000);
  }
  return next;
}

export function readAchievements() {
  try {
    return normalizeState(JSON.parse(localStorage.getItem(achievementKey) || 'null'));
  } catch (error) {
    return emptyAchievementState();
  }
}

export function writeAchievements() {
  try {
    localStorage.setItem(achievementKey, JSON.stringify(normalizeState(state.achievements)));
    return true;
  } catch (error) {
    return false;
  }
}

export function getAchievement(idOrName) {
  const legacyId = legacyNames.get(idOrName);
  return definitionById.get(idOrName) || definitionByName.get(idOrName) || definitionById.get(legacyId) || null;
}

export function hasAchievement(idOrName) {
  const definition = getAchievement(idOrName);
  return Boolean(definition && state.achievements.unlocked.includes(definition.id));
}

export function achievementProgress(definition) {
  if (!definition || definition.hidden) return hasAchievement(definition?.id) ? 1 : 0;
  const value = state.achievements.stats[definition.metric];
  if (arrayMetrics.includes(definition.metric)) return Array.isArray(value) ? value.length : 0;
  return Math.max(0, Number(value) || 0);
}

export function unlockAchievement(idOrName, onUnlock) {
  const definition = getAchievement(idOrName);
  if (!definition || hasAchievement(definition.id)) return false;
  state.achievements.unlocked.unshift(definition.id);
  state.achievements.unlocked = [...new Set(state.achievements.unlocked)]
    .slice(0, achievementDefinitions.length);
  writeAchievements();
  onUnlock?.(definition);
  return true;
}

export function evaluateAchievements(onUnlock) {
  const unlocked = [];
  standardAchievements.forEach((definition) => {
    if (achievementProgress(definition) < definition.target) return;
    if (unlockAchievement(definition.id, onUnlock)) unlocked.push(definition);
  });
  return unlocked;
}

export function setAchievementStat(metric, value, onUnlock) {
  if (!numericMetrics.includes(metric)) return [];
  const nextValue = Math.max(0, Number(value) || 0);
  state.achievements.stats[metric] = Math.max(state.achievements.stats[metric] || 0, nextValue);
  writeAchievements();
  return evaluateAchievements(onUnlock);
}

export function incrementAchievementStat(metric, onUnlock) {
  if (!numericMetrics.includes(metric)) return [];
  return setAchievementStat(metric, (state.achievements.stats[metric] || 0) + 1, onUnlock);
}

export function rememberAchievementValue(metric, value, onUnlock) {
  if (!arrayMetrics.includes(metric) || typeof value !== 'string' || !value) return [];
  const values = Array.isArray(state.achievements.stats[metric])
    ? state.achievements.stats[metric]
    : [];
  if (!values.includes(value)) values.push(value);
  state.achievements.stats[metric] = values.slice(0, 64);
  writeAchievements();
  return evaluateAchievements(onUnlock);
}

export function rememberAchievementTheme(themeId, onUnlock) {
  return rememberAchievementValue('themes', themeId, onUnlock);
}

function isCustomCollectionEntry(entry) {
  if (entry?.customWork) return true;
  const source = `${entry?.patternId || ''} ${entry?.id || ''}`;
  return /(?:^|-)custom-|(?:^|-)draw-/.test(source);
}

export function syncAchievementCollection(collection, onUnlock) {
  const entries = Array.isArray(collection) ? collection : [];
  const highGrades = entries.filter((entry) => entry.grade === 'A' || entry.grade === 'S').length;
  const sGrades = entries.filter((entry) => entry.grade === 'S').length;
  const customWorks = entries.filter(isCustomCollectionEntry).length;
  const cleanWorks = entries.filter((entry) => entry.inspectionClean === true).length;
  const remixWorks = entries.filter((entry) => entry.remixed === true).length;
  const flippedWorks = entries.filter((entry) => entry.flipped === true).length;
  const maxOf = (field) => entries.reduce((max, entry) => Math.max(max, Number(entry[field]) || 0), 0);

  state.achievements.stats.completed = Math.max(state.achievements.stats.completed || 0, entries.length);
  state.achievements.stats.highGrades = Math.max(state.achievements.stats.highGrades || 0, highGrades);
  state.achievements.stats.sGrades = Math.max(state.achievements.stats.sGrades || 0, sGrades);
  state.achievements.stats.maxColors = Math.max(state.achievements.stats.maxColors || 0, maxOf('colorCount'));
  state.achievements.stats.longestBuildMs = Math.max(state.achievements.stats.longestBuildMs || 0, maxOf('buildMs'));
  state.achievements.stats.customWorks = Math.max(state.achievements.stats.customWorks || 0, customWorks);
  state.achievements.stats.largestWork = Math.max(
    state.achievements.stats.largestWork || 0,
    entries.reduce((max, entry) => Math.max(
      max,
      Number(entry.beadCount) || (Array.isArray(entry.placed) ? entry.placed.filter(Boolean).length : 0),
    ), 0),
  );
  state.achievements.stats.cleanWorks = Math.max(state.achievements.stats.cleanWorks || 0, cleanWorks);
  state.achievements.stats.remixWorks = Math.max(state.achievements.stats.remixWorks || 0, remixWorks);
  state.achievements.stats.flippedWorks = Math.max(state.achievements.stats.flippedWorks || 0, flippedWorks);

  const mergeEntryValues = (metric, valueFor) => {
    const values = new Set(state.achievements.stats[metric] || []);
    entries.map(valueFor).filter(Boolean).forEach((value) => values.add(String(value)));
    state.achievements.stats[metric] = [...values].slice(0, 64);
  };
  mergeEntryValues('uniquePatterns', (entry) => entry.patternId || entry.name);
  mergeEntryValues('crafts', (entry) => entry.craft);
  writeAchievements();
  return evaluateAchievements(onUnlock);
}

export function recordCompletedWorkAchievement(work, onUnlock) {
  const stats = state.achievements.stats;
  stats.completed = (stats.completed || 0) + 1;
  if (work.grade === 'A' || work.grade === 'S') stats.highGrades = (stats.highGrades || 0) + 1;
  if (work.grade === 'S') stats.sGrades = (stats.sGrades || 0) + 1;
  stats.maxColors = Math.max(stats.maxColors || 0, Number(work.colorCount) || 0);
  stats.longestBuildMs = Math.max(stats.longestBuildMs || 0, Number(work.buildMs) || 0);
  stats.largestWork = Math.max(stats.largestWork || 0, Number(work.beadCount) || 0);
  if (work.customWork) stats.customWorks = (stats.customWorks || 0) + 1;
  if (work.inspectionClean) stats.cleanWorks = (stats.cleanWorks || 0) + 1;
  if (work.remixed) stats.remixWorks = (stats.remixWorks || 0) + 1;
  if (work.flipped) stats.flippedWorks = (stats.flippedWorks || 0) + 1;

  const addValue = (metric, value) => {
    if (!value) return;
    const values = new Set(stats[metric] || []);
    values.add(String(value));
    stats[metric] = [...values].slice(0, 64);
  };
  addValue('uniquePatterns', work.patternId || work.name);
  addValue('crafts', work.craft);
  writeAchievements();
  return evaluateAchievements(onUnlock);
}

export function markAchievementsSeen() {
  state.achievements.seen = [...state.achievements.unlocked];
  writeAchievements();
}

export function hasUnseenAchievements() {
  return state.achievements.unlocked.some((id) => !state.achievements.seen.includes(id));
}

export function standardAchievementSummary() {
  const unlocked = standardAchievements.filter((definition) => hasAchievement(definition.id)).length;
  return { unlocked, total: standardAchievements.length };
}
