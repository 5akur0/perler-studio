import { palette, beadIds } from './palette.js';
import { clamp } from './color-utils.js';

export const patternSeeds = [
  {
    id: "berry-cat",
    name: "莓果小猫",
    size: 24,
    craft: "钥匙扣",
    rows: [
      "........................",
      "........................",
      ".......K........K.......",
      "......KWK......KWK......",
      ".....KWWWK....KWWWK.....",
      "....KWWWWWK..KWWWWWK....",
      ".....KKKKKKKKKKKKKK.....",
      "....KWWWWWWWWWWWWWWK....",
      "....KWWWWWWWWWWWWWWK....",
      "....KWWRRWWWWWWWWWWK....",
      "....KWWWWWWWWWWWWWWK....",
      "....KWWWWWWWWWWWWWWK....",
      "....KWWWKKWWWWKKWWWK....",
      "....KWWWKKWWWWKKWWWK....",
      "....KWWWKKWWWWKKWWWK....",
      "....KWppWWWPPWWWppWK....",
      "....KWppWWpWWpWWppWK....",
      "....KWWWWWWWWWWWWWWK....",
      "....KWWWWWWWWWWWWWWK....",
      "....KWWWWWWWWWWWWWWK....",
      ".....KKKKKKKKKKKKKK.....",
      "........................",
      "........................",
      "........................",
    ],
    note: "猫猫蹭到果汁啦",
  },
  {
    id: "rocket",
    name: "桌面火箭",
    size: 16,
    craft: "冰箱贴",
    rows: [
      ".......R........",
      "......RWR.......",
      ".....RWWWR......",
      ".....RBBBR......",
      "....RBBBBBR.....",
      "....RBYBYBR.....",
      "....RBBBBBR.....",
      "....RBBBBBR.....",
      "...ORBBBBBRO....",
      "..OORBBBBBROO...",
      "..OOORRRRROOO...",
      "...OOYYYYOO.....",
      "....OYYYYO......",
      ".....OYYO.......",
      "......OO........",
      "................",
    ],
    note: "贴在冰箱也会飞",
  },
  {
    id: "lake-whale",
    name: "热带小鱼",
    size: 16,
    craft: "杯垫",
    rows: [
      "................",
      "................",
      "........Y.......",
      ".......YYY......",
      ".....OOOYY......",
      "...OOOORYYY..Y..",
      "..OOOOKRYYYY.YY.",
      ".OOOOORRYYYYYYYY",
      ".OOOOORRYYYYYYYY",
      "..OOOORYYYYY.YY.",
      "...OOOYYYYY..Y..",
      ".....OOYYYY.....",
      ".......YY.......",
      "........Y.......",
      "................",
      "................",
    ],
    note: "不用喂的小鱼",
  },
  {
    id: "sweet-heart",
    name: "心动信号",
    size: 16,
    craft: "钥匙扣",
    rows: [
      "................",
      "....RR....RR....",
      "...RPRR..RRPR...",
      "..RPPPRRRRPPPR..",
      ".RPPPPPPPPPPPPR.",
      ".RPPPPPUPPPPPPR.",
      ".RPPPPUUUPPPPPR.",
      "..RPPUUUUUPPPR..",
      "...RPPUUUPPPR...",
      "....RPPUPPPR....",
      ".....RPPPPR.....",
      "......RPPR......",
      ".......RR.......",
      "................",
      "................",
      "................",
    ],
    note: "心跳有点快",
  },
  {
    id: "milk-tea",
    name: "奶茶约会",
    size: 16,
    craft: "冰箱贴",
    rows: [
      "................",
      "....KKKKKKKK....",
      "...KUUUUUUUK....",
      "...KUUUUUUUK....",
      "...KAAAAAAAKKK..",
      "...KAAAAAAAKMMK.",
      "...KZZZZZZZKMMK.",
      "...KZZZZZZZKKK..",
      "...KMMMMMMMK....",
      "...KMMMMMMMK....",
      "....KMMMMMK.....",
      ".....KKKKK......",
      "....SSSSSSS.....",
      "...SSSSSSSSS....",
      "................",
      "................",
    ],
    note: "两杯刚刚好",
  },
  {
    id: "ribbon-clip",
    name: "蝴蝶结发夹",
    size: 16,
    craft: "钥匙扣",
    rows: [
      "................",
      "................",
      "...HHH....HHH...",
      "..HPPPH..HPPPH..",
      ".HPPPPPHHPPPPPH.",
      "HPPPPPPPPPPPPPPH",
      "HPPPPPHHHHPPPPPH",
      ".HPPPHHPPHHPPPH.",
      "..HHHHPWWPHHHH..",
      "..HHHHPWWPHHHH..",
      ".HPPPHHPPHHPPPH.",
      "HPPPPPHHHHPPPPPH",
      ".HPPPPPPPPPPPPH.",
      "..HPPPH...HPPH..",
      ".....SSSSSS.....",
      "................",
    ],
    note: "戴上就好看",
  },
  {
    id: "game-date",
    name: "双人手柄",
    size: 16,
    craft: "摆件",
    rows: [
      "................",
      "................",
      ".....NNNNNN.....",
      "...NNSSSSSSNN...",
      "..NSSSSSSSSSSN..",
      ".NSSSKSSSSKSSSN.",
      "NSSKKSSJJSSKKSSN",
      "NSSKSSJSSJSSKSSN",
      "NSSSSSSSSSSSSSSN",
      "NSSPPSSYYSSPPSSN",
      ".NSSSSSKKKSSSSN.",
      "..NSSSSSSSSSSN..",
      "...NNSSSSSSNN...",
      ".....NNNNNN.....",
      "................",
      "................",
    ],
    note: "找个人一起玩",
  },
  {
    id: "mini-bouquet",
    name: "迷你花束",
    size: 16,
    craft: "冰箱贴",
    rows: [
      "................",
      ".....P....Y.....",
      "....PPPY.YYY....",
      ".....P..G.Y.....",
      ".......GG.......",
      "..H....GG....F..",
      ".HHH...GG...FFF.",
      "..H....GG....F..",
      ".......GG.......",
      "......GGGG......",
      ".....GTGGTG.....",
      "....GTTGGTTG....",
      "...GTTTGGTTTG...",
      "....GGGMMGGG....",
      "......MMMM......",
      "................",
    ],
    note: "送谁都合适",
  },
  {
    id: "instant-photo",
    name: "拍立得回忆",
    size: 16,
    craft: "杯垫",
    rows: [
      "................",
      "..SSSSSSSSSSSS..",
      ".SWWWWWWWWWWWWS.",
      ".SWBBBBBBBBBBWS.",
      ".SWBBLLLLLLBBWS.",
      ".SWBBLLYYLLBBWS.",
      ".SWBBLLYYLLBBWS.",
      ".SWBBLLLLLLBBWS.",
      ".SWBBBBBBBBBBWS.",
      ".SWWWWWWWWWWWWS.",
      ".SWWKKKWWWYYWWS.",
      ".SWWKKKWWWYYWWS.",
      ".SWWWWWWWWWWWWS.",
      "..SSSSSSSSSSSS..",
      "................",
      "................",
    ],
    note: "像刚冲出来",
  },
  {
    id: "panda",
    name: "竹林熊猫",
    size: 16,
    craft: "钥匙扣",
    rows: [
      "................",
      "....KKKK..KKKK..",
      "...KKKKKKKKKKK..",
      "..KKWWWWWWWWKK..",
      ".KWWWWWWWWWWWWK.",
      ".KWWKKWWWWKKWWK.",
      ".KWKWKWWWWKWKWK.",
      ".KWWKWWFFWWKWWK.",
      ".KWWWWWWWWWWWWK.",
      ".KWWWWKKKKWWWWK.",
      ".KWWWWWWWWWWWWK.",
      "..KWWWWWWWWWWK..",
      "...KKWWWWWWKK...",
      "....KKKKKKKK....",
      "................",
      "................",
    ],
    note: "吃饱就发呆",
  },
  {
    id: "mushroom",
    name: "蘑菇屋",
    size: 16,
    craft: "冰箱贴",
    rows: [
      "................",
      ".....RRRRRR.....",
      "...RRWWRRWWRRR..",
      "..RWWRRWWRRWWRR.",
      ".RRRWWRRWWRRWRR.",
      ".RWWRRWWRRWWRRR.",
      "..RRRRRRRRRRRR..",
      "...mmmmmmmmmm...",
      "...mmmKKKKmmm...",
      "...mmmKWWKmmm...",
      "...mmmKWWKmmm...",
      "...mmmKKKKmmm...",
      "...mmmmmmmmmm...",
      "...mmmmmmmmmm...",
      "................",
      "................",
    ],
    note: "下雨正好躲",
  },
  {
    id: "strawberry",
    name: "甜心草莓",
    size: 16,
    craft: "钥匙扣",
    rows: [
      "................",
      ".......GG.......",
      "......GGGG......",
      ".....GGGGGG.....",
      "....GGGTTGGG....",
      "...RRRRRRRRRR...",
      "..RRyRRWWRRyRR..",
      ".RRRRyRRRRyRRRR.",
      ".RRyRRRRRRRRyRR.",
      ".RRRRyRRRRyRRRR.",
      "..RRyRRRRRRyRR..",
      "..RRRRyRRyRRRR..",
      "...RRRRRRRRRR...",
      "....RRRRRRRR....",
      ".....RRRRRR.....",
      "......RRRR......",
    ],
    note: "尝了，不酸",
  },
  {
    id: "boba",
    name: "珍珠奶茶",
    size: 16,
    craft: "冰箱贴",
    rows: [
      "................",
      ".....jjjjjj.....",
      "....jWWWWWWj....",
      "....jWmAAmWj....",
      "....jmAAAAmj....",
      "....jAAAAAAj....",
      "....jAAAAAAj....",
      "....jmAAAAmj....",
      "....jMMMMMMj....",
      "....jMKMMKMj....",
      "....jMMMMMMj....",
      "....jMKMMKMj....",
      "....jMMMMMMj....",
      ".....jjjjjj.....",
      "................",
      "................",
    ],
    note: "珍珠多加点",
  },
  {
    id: "ghost",
    name: "小幽灵",
    size: 16,
    craft: "钥匙扣",
    rows: [
      "................",
      "................",
      ".....UUUUUU.....",
      "....UUUUUUUU....",
      "...UUUUUUUUUU...",
      "...UUKKUUKKUU...",
      "...UUKKUUKKUU...",
      "...UUUUUUUUUU...",
      "...UUUFFFFUUUU..",
      "...UUUUUUUUUUU..",
      "...UUUUUUUUUUU..",
      "...UUUUUUUUUUU..",
      "...UUUUUUUUUUU..",
      "...UU.UU.UU.UU..",
      "....U..U..U..U..",
      "................",
    ],
    note: "不吓人，还乖",
  },
  {
    id: "moon",
    name: "夜空弯月",
    size: 16,
    craft: "杯垫",
    rows: [
      "................",
      "...y............",
      "..............y.",
      ".....YYYYY......",
      "....YYYYYYY.....",
      "...YYYYYNNNN....",
      "...YYYYNNNN.....",
      "...YYYYNNN......",
      "...YYYYYNNN.....",
      "....YYYYYYY...y.",
      "y....YYYYY......",
      "................",
      "............y...",
      "...y............",
      ".........y......",
      "................",
    ],
    note: "今晚月亮不错",
  },
];

export function darkerVariant(code) {
  const upper = code.toUpperCase();
  const lower = code.toLowerCase();
  if (code === lower && upper !== lower && palette[upper]) return upper;
  return code;
}

export function detailedRowsFromSeed(seed, targetSize = 24) {
  const rows = resamplePatternRows(seed.rows, seed.size, targetSize);
  const grid = rows.map((row) => row.split(""));
  const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
  for (let y = 0; y < targetSize; y += 1) {
    for (let x = 0; x < targetSize; x += 1) {
      const code = grid[y][x];
      if (!code || code === ".") continue;
      let same4 = 0;
      let touchesBlank = false;
      dirs.forEach(([dx, dy]) => {
        const nx = x + dx;
        const ny = y + dy;
        if (nx < 0 || ny < 0 || nx >= targetSize || ny >= targetSize) {
          touchesBlank = true;
          return;
        }
        const next = grid[ny][nx];
        if (next === code) same4 += 1;
        if (next === ".") touchesBlank = true;
      });
      if (touchesBlank && same4 <= 2) {
        grid[y][x] = darkerVariant(code);
      }
    }
  }
  return grid.map((row) => row.join(""));
}

// Center a square grid of `rows` inside a larger `target`×`target` board,
// padding the margin with empty pegs ('.'). Keeps pixel art crisp (no scaling).
export function padRowsTo(rows, target) {
  const src = rows.length;
  if (src >= target) return rows;
  const padTop = Math.floor((target - src) / 2);
  const blankRow = ".".repeat(target);
  const out = [];
  for (let i = 0; i < padTop; i += 1) out.push(blankRow);
  for (const row of rows) {
    const left = ".".repeat(padTop);
    const right = ".".repeat(target - src - padTop);
    out.push(left + row + right);
  }
  while (out.length < target) out.push(blankRow);
  return out;
}

export const patterns = patternSeeds.map((seed) => ({
  ...seed,
  size: 30,
  width: 30,
  height: 30,
  rows: padRowsTo(detailedRowsFromSeed(seed, 24), 30),
  note: seed.note || "",
}));

export function resamplePatternRows(sourceRows, sourceSize, targetSize) {
  const rows = [];
  const scale = sourceSize / targetSize;
  const epsilon = 1e-6;
  for (let ty = 0; ty < targetSize; ty += 1) {
    const y0 = ty * scale;
    const y1 = (ty + 1) * scale;
    const syStart = clamp(Math.floor(y0), 0, sourceSize - 1);
    const syEnd = clamp(Math.floor(y1 - epsilon), 0, sourceSize - 1);
    let row = "";
    for (let tx = 0; tx < targetSize; tx += 1) {
      const x0 = tx * scale;
      const x1 = (tx + 1) * scale;
      const sxStart = clamp(Math.floor(x0), 0, sourceSize - 1);
      const sxEnd = clamp(Math.floor(x1 - epsilon), 0, sourceSize - 1);
      const weights = {};

      for (let sy = syStart; sy <= syEnd; sy += 1) {
        const overlapY = Math.max(0, Math.min(y1, sy + 1) - Math.max(y0, sy));
        if (overlapY <= 0) continue;
        for (let sx = sxStart; sx <= sxEnd; sx += 1) {
          const overlapX = Math.max(0, Math.min(x1, sx + 1) - Math.max(x0, sx));
          if (overlapX <= 0) continue;
          const code = sourceRows[sy][sx];
          const occupiedBoost = code === "." ? 1 : 1.06;
          const weight = overlapX * overlapY * occupiedBoost;
          weights[code] = (weights[code] || 0) + weight;
        }
      }

      const cx = clamp(Math.floor((x0 + x1) * 0.5), 0, sourceSize - 1);
      const cy = clamp(Math.floor((y0 + y1) * 0.5), 0, sourceSize - 1);
      const centerCode = sourceRows[cy][cx];
      // Tie-break stably so a mirrored source pattern stays mirrored after
      // resampling: prefer the code at the nearest source pixel center, and
      // when still tied prefer non-background ('.') and non-white codes.
      const tieRank = (code) => {
        if (code === ".") return 0;
        if (code === "W" || code === "q") return 1; // background-ish whites
        return 2; // detail (outline/eyes/etc.)
      };
      const entries = Object.entries(weights).sort((a, b) => {
        if (Math.abs(a[1] - b[1]) > 1e-6) return b[1] - a[1];
        if (a[0] === centerCode) return -1;
        if (b[0] === centerCode) return 1;
        const rankDiff = tieRank(b[0]) - tieRank(a[0]);
        if (rankDiff !== 0) return rankDiff;
        return a[0].localeCompare(b[0]);
      });
      let pick = entries[0]?.[0] || ".";

      if (entries.length > 1) {
        const bestWeight = entries[0][1];
        const secondWeight = entries[1][1];
        const centerWeight = weights[centerCode] || 0;
        const closeRace = bestWeight > 0 && (bestWeight - secondWeight) / bestWeight < 0.2;
        if (closeRace && centerCode !== "." && centerWeight >= secondWeight * 0.92) {
          pick = centerCode;
        }
        if (pick === "." && centerCode !== "." && centerWeight > 0 && (bestWeight / centerWeight) < 1.25) {
          pick = centerCode;
        }
      }

      row += pick;
    }
    rows.push(row);
  }
  if (targetSize < sourceSize) {
    return restoreTinyComponents(rows, sourceRows, sourceSize, targetSize, scale);
  }
  return rows;
}

function restoreTinyComponents(rows, sourceRows, sourceSize, targetSize, scale) {
  const grid = rows.map((row) => row.split(""));
  const visited = Array(sourceSize * sourceSize).fill(false);
  const detailLimit = Math.max(2, Math.round(scale * scale * 2));
  const sourceCounts = {};
  for (let y = 0; y < sourceSize; y += 1) {
    const row = sourceRows[y] || "";
    for (let x = 0; x < sourceSize; x += 1) {
      const code = row[x];
      if (!code || code === ".") continue;
      sourceCounts[code] = (sourceCounts[code] || 0) + 1;
    }
  }
  const sparseColorLimit = Math.max(8, Math.round(sourceSize * sourceSize * 0.02));

  for (let sy = 0; sy < sourceSize; sy += 1) {
    for (let sx = 0; sx < sourceSize; sx += 1) {
      const start = sy * sourceSize + sx;
      if (visited[start]) continue;
      visited[start] = true;
      const code = sourceRows[sy][sx];
      if (!code || code === "." || code === "W" || code === "q") continue;
      if ((sourceCounts[code] || 0) > sparseColorLimit) continue;

      const queue = [start];
      const cells = [{ x: sx, y: sy }];
      let head = 0;
      while (head < queue.length) {
        const index = queue[head++];
        const x = index % sourceSize;
        const y = Math.floor(index / sourceSize);
        const neighbors = [
          [x + 1, y],
          [x - 1, y],
          [x, y + 1],
          [x, y - 1],
        ];
        neighbors.forEach(([nx, ny]) => {
          if (nx < 0 || ny < 0 || nx >= sourceSize || ny >= sourceSize) return;
          const next = ny * sourceSize + nx;
          if (visited[next]) return;
          visited[next] = true;
          if (sourceRows[ny][nx] !== code) return;
          queue.push(next);
          cells.push({ x: nx, y: ny });
        });
      }

      if (!cells.length || cells.length > detailLimit) continue;
      const targetVotes = new Map();
      let sumTx = 0;
      let sumTy = 0;

      cells.forEach(({ x, y }) => {
        const tx = clamp(Math.floor((x + 0.5) / scale), 0, targetSize - 1);
        const ty = clamp(Math.floor((y + 0.5) / scale), 0, targetSize - 1);
        sumTx += tx;
        sumTy += ty;
        const key = `${tx},${ty}`;
        const hit = targetVotes.get(key) || { tx, ty, count: 0 };
        hit.count += 1;
        targetVotes.set(key, hit);
      });

      const entries = [...targetVotes.values()];
      if (!entries.length) continue;
      const exists = entries.some(({ tx, ty }) => grid[ty]?.[tx] === code);
      if (exists) continue;

      const cx = sumTx / cells.length;
      const cy = sumTy / cells.length;
      entries.sort((a, b) => {
        if (b.count !== a.count) return b.count - a.count;
        const da = (a.tx - cx) ** 2 + (a.ty - cy) ** 2;
        const db = (b.tx - cx) ** 2 + (b.ty - cy) ** 2;
        return da - db;
      });

      const pick = entries.find(({ tx, ty }) => {
        const current = grid[ty]?.[tx];
        return current === "." || current === "W" || current === "q";
      });
      if (!pick) continue;
      grid[pick.ty][pick.tx] = code;
    }
  }

  return grid.map((row) => row.join(""));
}


export function validatePatterns() {
  patterns.forEach((pattern) => {
    const badRow = pattern.rows.findIndex((row) => row.length !== pattern.size);
    if (badRow >= 0) {
      throw new Error(`${pattern.name} 第 ${badRow + 1} 行长度不是 ${pattern.size}`);
    }
    const unknownCodes = [...new Set(pattern.rows.join("").replace(/\./g, "").split(""))].filter((code) => !palette[code] || !beadIds[code]);
    if (unknownCodes.length) {
      throw new Error(`${pattern.name} 使用了未登记颜色：${unknownCodes.join(", ")}`);
    }
  });
}
