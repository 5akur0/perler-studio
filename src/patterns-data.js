import { palette, beadIds } from './palette.js';
import { clamp } from './color-utils.js';

export const patternSeeds = [
  {
    id: "berry-cat",
    name: "莓果小猫",
    size: 16,
    craft: "钥匙扣",
    rows: [
      "................",
      "....K......K....",
      "...KKK....KKK...",
      "..KWWWK..KWWWK..",
      "..KWWWWKKWWWWK..",
      ".KWWWWWWWWWWWWK.",
      ".KWWKWWWWWWKWWK.",
      ".KWWWWPWWPWWWWK.",
      ".KWWWWWWWWWWWWK.",
      ".KWWWDWWWWDWWWK.",
      "..KWWWWKKWWWWK..",
      "...KWWWWWWWWK...",
      "....KWWWWWWK....",
      ".....KKKKKK.....",
      "................",
      "................",
    ],
    note: "",
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
    note: "",
  },
  {
    id: "lake-whale",
    name: "湖边小鲸",
    size: 16,
    craft: "杯垫",
    rows: [
      "................",
      ".......W........",
      "......W.W.......",
      "................",
      "................",
      ".....BBBBBB.....",
      "...BBBBBBBBBB...",
      "..BBBBBBBBBBBB..",
      ".BBBBWWBBBBBBBB.",
      "BBBBWWBBBBBBBBBB",
      "BBBBBBBBBBBBBBBB",
      ".BBBBBBBBBBBBBB.",
      "..BBBBBBBBBBBB..",
      "...BBBB..BBBB...",
      ".....BB..BB.....",
      "................",
    ],
    note: "",
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
      ".RPPPPPWPPPPPPR.",
      ".RPPPPWWWPPPPPR.",
      "..RPPWWWWWPPPR..",
      "...RPPWWWPPPR...",
      "....RPPWPPPR....",
      ".....RPPPPR.....",
      "......RPPR......",
      ".......RR.......",
      "................",
      "................",
      "................",
    ],
    note: "",
  },
  {
    id: "milk-tea",
    name: "奶茶约会",
    size: 16,
    craft: "冰箱贴",
    rows: [
      "................",
      "....KKKKKKKK....",
      "...KWWWWWWWK....",
      "...KWWWWWWWK....",
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
    note: "",
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
    note: "",
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
    note: "",
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
    note: "",
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
    note: "",
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
    note: "",
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
    note: "",
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
    note: "",
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
    note: "",
  },
  {
    id: "ghost",
    name: "小幽灵",
    size: 16,
    craft: "钥匙扣",
    rows: [
      "................",
      "................",
      ".....WWWWWW.....",
      "....WWWWWWWW....",
      "...WWWWWWWWWW...",
      "...WWKKWWKKWW...",
      "...WWKKWWKKWW...",
      "...WWWWWWWWWW...",
      "...WWWFFFFWWWW..",
      "...WWWWWWWWWWW..",
      "...WWWWWWWWWWW..",
      "...WWWWWWWWWWW..",
      "...WWWWWWWWWWW..",
      "...WW.WW.WW.WW..",
      "....W..W..W..W..",
      "................",
    ],
    note: "",
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
    note: "",
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

export const patterns = patternSeeds.map((seed) => ({
  ...seed,
  size: 24,
  rows: detailedRowsFromSeed(seed, 24),
  note: "",
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
  return rows;
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
