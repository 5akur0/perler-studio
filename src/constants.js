// Phase/workflow enums
export const phases = [
  { id: "choose", name: "选图" },
  { id: "place", name: "摆放" },
  { id: "inspect", name: "检查" },
  { id: "iron", name: "熨烫" },
  { id: "cool", name: "冷却" },
  { id: "finish", name: "收藏" },
];

// Background themes
export const backgroundThemes = {
  mist: {
    name: "雾青",
    pageBase: "#eef2f4",
    pageGlowA: "rgba(87, 184, 167, 0.14)",
    pageGlowB: "rgba(231, 100, 95, 0.11)",
    table: ["#e4eceb", "#d7e2e0", "#c8d6d5"],
    matFill: "rgba(60, 133, 119, 0.12)",
    matStroke: "rgba(40, 96, 87, 0.16)",
    gridStroke: "rgba(255, 255, 255, 0.22)",
  },
  apricot: {
    name: "奶杏",
    pageBase: "#f6f0e8",
    pageGlowA: "rgba(216, 170, 92, 0.16)",
    pageGlowB: "rgba(119, 170, 143, 0.11)",
    table: ["#eee8dc", "#e4dbc9", "#d7cfbf"],
    matFill: "rgba(191, 151, 88, 0.13)",
    matStroke: "rgba(139, 111, 69, 0.16)",
    gridStroke: "rgba(255, 255, 255, 0.2)",
  },
  sakura: {
    name: "浅樱",
    pageBase: "#f6eef0",
    pageGlowA: "rgba(231, 142, 150, 0.14)",
    pageGlowB: "rgba(105, 166, 158, 0.1)",
    table: ["#efe4e6", "#e4d8dc", "#d8cbd1"],
    matFill: "rgba(195, 120, 132, 0.12)",
    matStroke: "rgba(151, 84, 97, 0.15)",
    gridStroke: "rgba(255, 255, 255, 0.23)",
  },
  sky: {
    name: "晴蓝",
    pageBase: "#edf4f7",
    pageGlowA: "rgba(101, 157, 194, 0.14)",
    pageGlowB: "rgba(219, 176, 101, 0.1)",
    table: ["#e2edf1", "#d4e4ea", "#c7d8df"],
    matFill: "rgba(75, 132, 163, 0.12)",
    matStroke: "rgba(54, 99, 124, 0.15)",
    gridStroke: "rgba(255, 255, 255, 0.22)",
  },
  herb: {
    name: "草木",
    pageBase: "#eef3ec",
    pageGlowA: "rgba(116, 158, 112, 0.16)",
    pageGlowB: "rgba(213, 165, 96, 0.11)",
    table: ["#e4eadf", "#d8e1d2", "#cbd6c4"],
    matFill: "rgba(94, 135, 86, 0.13)",
    matStroke: "rgba(68, 104, 64, 0.15)",
    gridStroke: "rgba(255, 255, 255, 0.21)",
  },
};

export const toolStyles = {
  candy: { name: "糖果", primary: "#f08a9d", secondary: "#ffd5dc", accent: "#fff0a8", tip: "#5c5264", deco: "heart" },
  mint: { name: "薄荷", primary: "#57b8a7", secondary: "#c8f0e8", accent: "#fff6bf", tip: "#455f60", deco: "leaf" },
  sky: { name: "晴空", primary: "#6daedb", secondary: "#d6ecf8", accent: "#f7d28b", tip: "#465e72", deco: "cloud" },
  lavender: { name: "薰衣草", primary: "#9b8bd3", secondary: "#e2dbff", accent: "#f2c4d6", tip: "#5d5673", deco: "flower" },
};

// Craft options
export const craftOptions = ["原版", "钥匙扣", "杯垫", "摆件"];

// Tray grid dimensions
export const TRAY_DESKTOP_ROWS = 10;
export const TRAY_DESKTOP_COLS = 12;
export const TRAY_MOBILE_ROWS = 5;
export const TRAY_MOBILE_COLS = 24;

// localStorage keys and limits
export const collectionKey = "beadWorkshopCollection.v1";
export const sessionKey = "beadWorkshopSession.v1";
export const collectionLimit = 24;
export const achievementKey = "beadWorkshopAchievements.v1";
export const conceptAchievement = "观念先于熨烫";
export const fullBoardAchievement = "没有一个孔位是无辜的";
export const needleLoadSortThreshold = 70;
