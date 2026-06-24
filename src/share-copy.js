// Xiaohongshu-native share copy. The first line is the hook that drives clicks;
// it rotates across four angles (治愈 / 打卡 / 教程 / 解压) so a creator can copy
// repeatedly without posting the same opener twice. Stats + CTA + hashtags stay
// stable. Kept dependency-light: buildShareText takes the values it needs so the
// module is pure and unit-testable.

export const HOOKS = [
  // 治愈
  "今天也给自己拼了一颗糖 🫧",
  "慢慢摆豆的两小时，比刷手机治愈多了",
  "粉粉嫩嫩一盘豆，看着就解压",
  // 打卡
  "赛博拼豆打卡，今天又上头了",
  "手作打卡 | 一格一格摆出来的小确幸",
  // 教程
  "零基础也能拼，手机点点就出片",
  "新手第一块，分享下我的配色思路",
  "想入坑拼豆的姐妹，先在手机上试试这个",
  // 解压
  "压力大的时候就来摆两颗豆豆",
  "无限重开的赛博拼豆，手残党友好",
];

export function pickHook() {
  return HOOKS[Math.floor(Math.random() * HOOKS.length)];
}

// values: { name, total, colors, grade, timeText }
export function buildShareText(values) {
  const { name, total, colors, grade, timeText = "" } = values;
  return [
    pickHook(),
    `今天拼了「${name}」，${total}颗、${colors}个色号，最后评级 ${grade}${timeText}。`,
    "一部手机就能拼，碎片时间随手来一块～",
    "#拼豆 #手作 #像素画 #解压 #小游戏 #拼豆工坊",
  ].join("\n");
}
