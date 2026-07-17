import { els } from './dom.js';
import { escapeHtml } from './utils.js';
import {
  achievementProgress,
  achievementTier,
  hasAchievement,
  hasUnseenAchievements,
  hiddenAchievements,
  standardAchievementGroups,
  standardAchievementSummary,
} from './achievements.js';

const PIXEL_MOTIF_SIZE = 5;
const achievementPixelMotifs = Object.freeze({
  starts: ['#....', '###..', '#####', '###..', '#....'],
  completed: ['....#', '...##', '#.##.', '####.', '.##..'],
  patterns: ['##.##', '##.##', '.....', '##.##', '##.##'],
  quality: ['..#..', '#.#.#', '.###.', '#####', '.#.#.'],
  perfect: ['.####', '##...', '.###.', '...##', '####.'],
  colors: ['#.#.#', '.....', '.#.#.', '.....', '#.#.#'],
  themes: ['..#..', '.#.#.', '.....', '#...#', '.###.'],
  time: ['#####', '.###.', '..#..', '.###.', '#####'],
  crafts: ['#...#', '.#.#.', '..#..', '.#.#.', '#...#'],
  custom: ['....#', '...##', '..##.', '.##..', '#....'],
  scale: ['....#', '..#.#', '..#.#', '#.#.#', '#####'],
  inspection: ['.###.', '#...#', '#...#', '.####', '....#'],
  remix: ['####.', '...##', '.....', '##...', '.####'],
  flip: ['..#..', '.###.', '.....', '.###.', '..#..'],
  sharing: ['...#.', '...##', '#####', '...##', '...#.'],
  'concept-empty': ['#####', '#...#', '#...#', '#...#', '#####'],
  'concept-full': ['#####', '#####', '#####', '#####', '#####'],
});
const fallbackPixelMotif = ['..#..', '.###.', '#####', '.###.', '..#..'];

// Render every achievement motif from the same strict 5 x 5 bitmap grid.
// Horizontal runs keep the SVG compact while preserving crisp whole-cell edges.
function achievementPixelArt(motifId) {
  const rows = achievementPixelMotifs[motifId] || fallbackPixelMotif;
  const runs = [];

  for (let y = 0; y < PIXEL_MOTIF_SIZE; y += 1) {
    let x = 0;
    while (x < PIXEL_MOTIF_SIZE) {
      if (rows[y][x] === '.') {
        x += 1;
        continue;
      }
      const start = x;
      while (x < PIXEL_MOTIF_SIZE && rows[y][x] !== '.') x += 1;
      runs.push(`M${start} ${y}h${x - start}v1H${start}Z`);
    }
  }

  return `
    <svg class="achievement-motif" viewBox="0 0 ${PIXEL_MOTIF_SIZE} ${PIXEL_MOTIF_SIZE}" aria-hidden="true" focusable="false" shape-rendering="crispEdges">
      <path d="${runs.join('')}" />
    </svg>
  `;
}

function visibleProgress(definition) {
  const progress = Math.min(achievementProgress(definition), definition.target);
  const current = definition.metric === 'longestBuildMs'
    ? Math.floor(progress / (60 * 1000))
    : progress;
  const target = definition.metric === 'longestBuildMs'
    ? definition.target / (60 * 1000)
    : definition.target;
  return { current, target, text: String(current) };
}

function achievementGroupItem(group) {
  const completed = group.milestones.filter((definition) => hasAchievement(definition.id)).length;
  const currentIndex = group.milestones.findIndex((definition) => !hasAchievement(definition.id));
  const complete = completed === group.milestones.length;
  const tier = achievementTier(completed, group.milestones.length);
  const activeMilestone = group.milestones[currentIndex < 0 ? group.milestones.length - 1 : currentIndex];
  const progress = visibleProgress(activeMilestone);
  const progressLabel = escapeHtml(`${group.title}，进度 ${progress.current}/${progress.target}`);
  return `
    <article class="achievement-item is-tier-${tier.key}${complete ? ' is-unlocked' : ''}${completed ? ' has-progress' : ' is-locked'}">
      <div class="achievement-item-heading">
        <div class="achievement-motif-wrap" role="img" aria-label="${progressLabel}">
          ${achievementPixelArt(group.id)}
        </div>
        <div>
          <strong>${escapeHtml(group.title)}</strong>
          <p>${escapeHtml(group.description)}</p>
        </div>
        <span class="achievement-motif-count" aria-hidden="true">${progress.text}</span>
      </div>
    </article>
  `;
}

function hiddenAchievementItem(definition) {
  return `
    <article class="achievement-hidden-item">
      ${achievementPixelArt(definition.id)}
      <div>
        <strong>${escapeHtml(definition.name)}</strong>
        <p>${escapeHtml(definition.description)}</p>
      </div>
    </article>
  `;
}

export function renderAchievementEntry() {
  if (!els.achievementButton) return;
  const summary = standardAchievementSummary();
  els.achievementButton.setAttribute(
    'aria-label',
    `查看成就，普通成就已完成 ${summary.unlocked}/${summary.total}`,
  );
  els.achievementButton.title = '成就';
  if (els.achievementNewDot) els.achievementNewDot.hidden = !hasUnseenAchievements();
}

export function renderAchievementScreen() {
  const summary = standardAchievementSummary();
  if (els.achievementProgress) {
    els.achievementProgress.textContent = String(summary.unlocked);
  }
  if (els.achievementGrid) {
    els.achievementGrid.innerHTML = standardAchievementGroups.map(achievementGroupItem).join('');
  }
  const unlockedHidden = hiddenAchievements.filter((definition) => hasAchievement(definition.id));
  if (els.hiddenAchievementsSection) {
    els.hiddenAchievementsSection.hidden = unlockedHidden.length === 0;
  }
  if (els.hiddenAchievementList) {
    els.hiddenAchievementList.innerHTML = unlockedHidden.map(hiddenAchievementItem).join('');
  }
  renderAchievementEntry();
}
