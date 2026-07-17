import assert from 'node:assert/strict';

const values = new Map();
globalThis.localStorage = {
  getItem(key) {
    return values.has(key) ? values.get(key) : null;
  },
  setItem(key, value) {
    values.set(key, String(value));
  },
  removeItem(key) {
    values.delete(key);
  },
};

const { state } = await import('../src/state.js');
const {
  achievementDefinitions,
  achievementTier,
  emptyAchievementState,
  evaluateAchievements,
  hasAchievement,
  hasUnseenAchievements,
  hiddenAchievements,
  incrementAchievementStat,
  markAchievementsSeen,
  readAchievements,
  recordCompletedWorkAchievement,
  rememberAchievementTheme,
  rememberAchievementValue,
  setAchievementStat,
  standardAchievementGroups,
  standardAchievements,
  standardAchievementSummary,
  syncAchievementCollection,
  unlockAchievement,
} = await import('../src/achievements.js');
const {
  achievementKey, conceptAchievement, fullBoardAchievement,
} = await import('../src/constants.js');

assert.equal(standardAchievementGroups.length, 15);
assert.equal(standardAchievements.length, 39);
assert.equal(hiddenAchievements.length, 2);
assert.equal(achievementDefinitions.length, 41);
assert.ok(standardAchievementGroups.every((group) => group.milestones.length >= 2));
assert.deepEqual(
  standardAchievementGroups.find((group) => group.id === 'completed').milestones.map((item) => item.target),
  [1, 3, 10, 24],
);
assert.ok(standardAchievements.every((achievement) => !achievement.hidden));
assert.ok(hiddenAchievements.every((achievement) => achievement.hidden));
assert.deepEqual([0, 1, 2].map((level) => achievementTier(level, 2).key), ['locked', 'bronze', 'gold']);
assert.deepEqual(
  [0, 1, 2, 3].map((level) => achievementTier(level, 3).key),
  ['locked', 'bronze', 'silver', 'gold'],
);
assert.deepEqual(
  [0, 1, 2, 3, 4].map((level) => achievementTier(level, 4).key),
  ['locked', 'bronze', 'silver', 'gold', 'master'],
);

localStorage.setItem(achievementKey, JSON.stringify({
  version: 2,
  unlocked: ['第一件作品', '八种颜色', conceptAchievement],
  seen: ['第一件作品'],
  stats: {
    completed: 1,
    colorfulWorks: 1,
    patientWorks: 1,
    themes: ['mist'],
  },
}));
state.achievements = readAchievements();
assert.equal(state.achievements.version, 3);
assert.equal(hasAchievement('first-finish'), true);
assert.equal(hasAchievement('eight-colors'), true);
assert.equal(hasAchievement('concept-empty'), true);
assert.equal(state.achievements.stats.maxColors, 8);
assert.equal(state.achievements.stats.longestBuildMs, 10 * 60 * 1000);

state.achievements = emptyAchievementState();
const unlocked = [];
setAchievementStat('starts', 5, (achievement) => unlocked.push(achievement.id));
assert.deepEqual(unlocked, ['first-start', 'five-starts']);
assert.equal(hasAchievement('twenty-starts'), false);

recordCompletedWorkAchievement({
  patternId: 'custom-test',
  name: '自制图纸',
  craft: '杯垫',
  grade: 'S',
  buildMs: 12 * 60 * 1000,
  colorCount: 8,
  beadCount: 320,
  customWork: true,
  inspectionClean: true,
  remixed: true,
  flipped: true,
});
assert.equal(hasAchievement('first-finish'), true);
assert.equal(hasAchievement('high-grade'), true);
assert.equal(hasAchievement('first-s-grade'), true);
assert.equal(hasAchievement('eight-colors'), true);
assert.equal(hasAchievement('ten-minutes'), true);
assert.equal(hasAchievement('three-hundred-beads'), true);
assert.equal(hasAchievement('first-custom-work'), true);
assert.equal(hasAchievement('first-clean-work'), true);
assert.equal(hasAchievement('first-remix'), true);
assert.equal(hasAchievement('first-flipped-work'), true);

rememberAchievementTheme('mist');
rememberAchievementTheme('sand');
rememberAchievementTheme('mist');
assert.equal(hasAchievement('two-themes'), true);
assert.equal(state.achievements.stats.themes.length, 2);

rememberAchievementValue('shareKinds', 'image');
rememberAchievementValue('shareKinds', 'text');
rememberAchievementValue('shareKinds', 'code');
assert.equal(hasAchievement('first-share-kind'), true);
assert.equal(hasAchievement('three-share-kinds'), true);

syncAchievementCollection([
  { patternId: 'berry-cat', name: '莓果小猫', craft: '钥匙扣', grade: 'A', buildMs: 1000, beadCount: 180 },
  { patternId: 'rocket', name: '桌面火箭', craft: '摆件', grade: 'B', buildMs: 2000, beadCount: 90 },
  { patternId: 'moon', name: '夜空弯月', craft: '冰箱贴', grade: 'S', buildMs: 3000, beadCount: 110 },
]);
assert.equal(hasAchievement('three-patterns'), true);
assert.equal(hasAchievement('two-crafts'), true);
assert.equal(state.achievements.stats.completed >= 3, true);

unlockAchievement('concept-full');
assert.equal(hasAchievement(fullBoardAchievement), true);
assert.equal(hasUnseenAchievements(), true);
markAchievementsSeen();
assert.equal(hasUnseenAchievements(), false);

incrementAchievementStat('starts');
evaluateAchievements();
const summary = standardAchievementSummary();
assert.equal(summary.total, 39);
assert.equal(summary.unlocked > 0, true);

const persisted = JSON.parse(localStorage.getItem(achievementKey));
assert.equal(persisted.version, 3);
assert.ok(Array.isArray(persisted.stats.uniquePatterns));
assert.ok(Array.isArray(persisted.stats.shareKinds));

console.log('Achievement regression checks passed.');
