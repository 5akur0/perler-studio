(() => {
  const palette = {
    Q: "#FAF4C8",
    q: "#FFFFFF",
    W: "#FDFBFF",
    w: "#F2D9BA",
    A: "#FFDD99",
    a: "#FEBE7D",
    C: "#ADE946",
    c: "#C5ED9C",
    E: "#156A6B",
    e: "#95D3C2",
    F: "#F78FC3",
    f: "#FFE2EA",
    H: "#B5006D",
    h: "#D33793",
    I: "#494FC7",
    i: "#D5B9F8",
    J: "#50AAF0",
    j: "#C8E2FF",
    K: "#000000",
    k: "#89858C",
    N: "#1C334D",
    n: "#34488E",
    T: "#166F41",
    t: "#9EE5B9",
    P: "#E970CC",
    p: "#FFB7E7",
    R: "#FC283C",
    r: "#F67E66",
    G: "#1C9C4F",
    g: "#2E5132",
    L: "#A0E2FB",
    l: "#3EBCE2",
    B: "#0F54C0",
    b: "#3677D2",
    Y: "#FFC830",
    y: "#FFE36E",
    O: "#F77C31",
    o: "#FF995B",
    S: "#B6B1BA",
    s: "#EDEDED",
    M: "#753832",
    m: "#E6B483",
    V: "#AC7BDE",
    v: "#EBDAFC",
    D: "#971937",
    d: "#937A8D",
    Z: "#E99C17",
    z: "#EDB045",
  };

  const colorNames = {
    A: "香草",
    a: "杏橙",
    C: "青绿",
    c: "嫩绿",
    E: "孔雀绿",
    e: "薄荷",
    F: "樱粉",
    f: "浅樱",
    H: "莓红",
    h: "玫红",
    I: "靛紫",
    i: "浅紫",
    J: "天蓝",
    j: "雾蓝",
    K: "黑",
    k: "炭灰",
    N: "夜蓝",
    n: "牛仔蓝",
    Q: "米白",
    q: "纯白",
    T: "松绿",
    t: "豆绿",
    W: "奶白",
    w: "燕麦",
    P: "粉",
    p: "蜜桃粉",
    R: "红",
    r: "珊瑚红",
    G: "绿",
    g: "深绿",
    L: "浅蓝",
    l: "湖蓝",
    B: "蓝",
    b: "深蓝",
    Y: "黄",
    y: "柠檬黄",
    O: "橙",
    o: "浅橙",
    S: "灰",
    s: "浅灰",
    M: "棕",
    m: "焦糖",
    V: "紫",
    v: "薰衣草",
    D: "酒莓",
    d: "雾梅",
    Z: "南瓜",
    z: "蜂蜜橙",
  };

  const beadIds = {
    Q: "A1",
    q: "T1",
    W: "H1",
    w: "G16",
    A: "A11",
    a: "A18",
    s: "H9",
    S: "H3",
    k: "H4",
    N: "C12",
    n: "C29",
    d: "E23",
    j: "C23",
    L: "C3",
    l: "C10",
    J: "C6",
    B: "C8",
    b: "C7",
    e: "B10",
    E: "B21",
    c: "B16",
    C: "B14",
    t: "B28",
    T: "B12",
    y: "A17",
    Y: "A26",
    o: "A9",
    O: "A10",
    z: "G5",
    Z: "G6",
    f: "E17",
    F: "E12",
    p: "E3",
    P: "E9",
    h: "E10",
    H: "E13",
    v: "D23",
    i: "D9",
    V: "D6",
    I: "D25",
    m: "G9",
    M: "G8",
    r: "F23",
    R: "F4",
    g: "B15",
    G: "B8",
    K: "H7",
    D: "F7",
  };

  const patterns = [
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
        ".KWWWDWWWDWWWWK.",
        "..KWWWWKKWWWWK..",
        "...KWWWWWWWWK...",
        "....KWWWWWWK....",
        ".....KKKKKK.....",
        "................",
        "................",
      ],
      note: "边缘和表情需要镊子收尾",
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
      note: "大块蓝色适合针工具连铺",
    },
    {
      id: "lake-whale",
      name: "湖边小鲸",
      size: 16,
      craft: "杯垫",
      rows: [
        "................",
        "................",
        ".....LLLLLL.....",
        "...LLBBBBBBLL...",
        "..LBBBBBBBBBBL..",
        ".LBBBBBWBWBBBBL.",
        ".LBBBBBBBBBBBBL.",
        ".LBBBBBBBBBBBBL.",
        "..LBBBBBBBBBBL..",
        "...LLBBBBBBLL...",
        ".....LLLLLL.....",
        ".......L........",
        "......LLL.......",
        "................",
        "...YYYYYYYYYY...",
        "..YYYYYYYYYYYY..",
      ],
      note: "适合练习熨烫均匀度",
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
      note: "适合做情侣款挂件",
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
      note: "生活感题材更适合发笔记",
    },
    {
      id: "ribbon-clip",
      name: "蝴蝶结发夹",
      size: 16,
      craft: "钥匙扣",
      rows: [
        "................",
        "................",
        "..HHH......HHH..",
        ".HPPPH....HPPPH.",
        "HPPPPPH..HPPPPPH",
        "HPPPPPHHHHPPPPPH",
        ".HPPPHHPPHHPPPH.",
        "..HHHHPWWPHHHH..",
        "..HHHHPWWPHHHH..",
        ".HPPPHHPPHHPPPH.",
        "HPPPPPHHHHPPPPPH",
        "HPPPPPH..HPPPPPH",
        ".HPPPH....HPPPH.",
        "..HHH......HHH..",
        "................",
        "................",
      ],
      note: "粉色系成品很上镜",
    },
    {
      id: "game-date",
      name: "双人手柄",
      size: 16,
      craft: "摆件",
      rows: [
        "................",
        "................",
        "....NNNNNNNN....",
        "..NNSSSSSSSSNN..",
        ".NSSSSSSSSSSSSN.",
        "NSKSSSSSSSSSSKSN",
        "NSSKKSSJJSSKKSSN",
        "NSSKSSJSSJSSKSSN",
        "NSSSSSSSSSSSSSSN",
        "NSSPPSSYYSSPPSSN",
        ".NSSSSSSSSSSSSN.",
        "..NNSSSSSSSSNN..",
        "....NNNNNNNN....",
        "................",
        "................",
        "................",
      ],
      note: "适合做同款桌面摆件",
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
      note: "礼物感强，颜色也丰富",
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
      note: "适合做纪念款分享图",
    },
  ];

  const phases = [
    { id: "choose", name: "选图" },
    { id: "place", name: "摆放" },
    { id: "inspect", name: "检查" },
    { id: "iron", name: "熨烫" },
    { id: "cool", name: "冷却" },
    { id: "finish", name: "收藏" },
  ];

  const $ = (selector) => document.querySelector(selector);
  const sceneCanvas = $("#sceneCanvas");
  const scene = sceneCanvas.getContext("2d");
  const previewCanvas = $("#previewCanvas");
  const preview = previewCanvas.getContext("2d");

  const els = {
    statusLine: $("#statusLine"),
    patternMeta: $("#patternMeta"),
    phaseMeta: $("#phaseMeta"),
    patternList: $("#patternList"),
    phaseList: $("#phaseList"),
    customImageInput: $("#customImageInput"),
    customImageButton: $("#customImageButton"),
    customWhiteToggle: $("#customWhiteToggle"),
    patternSizeSelect: $("#patternSizeSelect"),
    patternSizeInput: $("#patternSizeInput"),
    patternSizeButton: $("#patternSizeButton"),
    customSizeMeta: $("#customSizeMeta"),
    customStats: $("#customStats"),
    targetCount: $("#targetCount"),
    controlTitle: $("#controlTitle"),
    toolMeta: $("#toolMeta"),
    stageControls: $("#stageControls"),
    remapModal: $("#remapModal"),
    remapModalBody: $("#remapModalBody"),
    remapModalClose: $("#remapModalClose"),
    remapDoneButton: $("#remapDoneButton"),
    remapResetButton: $("#remapResetButton"),
    controlsModal: $("#controlsModal"),
    controlsModalBody: $("#controlsModalBody"),
    controlsModalClose: $("#controlsModalClose"),
    toolRack: $("#toolRack"),
    colorPalette: $("#colorPalette"),
    colorMeta: $("#colorMeta"),
    scoreMeta: $("#scoreMeta"),
    meterPanel: $("#meterPanel"),
    sharePanel: $("#sharePanel"),
    collectionPanel: $("#collectionPanel"),
    collectionCount: $("#collectionCount"),
    bgThemeSelect: $("#bgThemeSelect"),
    sandboxButton: $("#sandboxButton"),
    resetButton: $("#resetButton"),
    toast: $("#toast"),
    achievementToast: $("#achievementToast"),
  };

  const backgroundThemes = {
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

  const toolStyles = {
    candy: { name: "糖果", primary: "#f08a9d", secondary: "#ffd5dc", accent: "#fff0a8", tip: "#5c5264", deco: "heart" },
    mint: { name: "薄荷", primary: "#57b8a7", secondary: "#c8f0e8", accent: "#fff6bf", tip: "#455f60", deco: "leaf" },
    sky: { name: "晴空", primary: "#6daedb", secondary: "#d6ecf8", accent: "#f7d28b", tip: "#465e72", deco: "cloud" },
    lavender: { name: "薰衣草", primary: "#9b8bd3", secondary: "#e2dbff", accent: "#f2c4d6", tip: "#5d5673", deco: "flower" },
  };
  const craftOptions = ["原版", "钥匙扣", "杯垫", "摆件"];

  const state = {
    phase: "choose",
    patternSize: 24,
    selectedPattern: patterns[0],
    patternColorMaps: {},
    patternColorMap: {},
    remapModalOpen: false,
    controlsModalOpen: false,
    sandboxMode: false,
    bgTheme: "mist",
    toolStyle: "candy",
    selectedColor: "K",
    trayColor: null,
    trayProgress: 0,
    trayBeans: 0,
    trayCapacity: 0,
    trayMatrix: [],
    trayPourId: 0,
    spill: null,
    spillDamages: [],
    fusedPieces: [],
    emptyIronEaster: false,
    conceptEaster: false,
    conceptEasterType: null,
    achievements: [],
    tweezerBead: null,
    needleLoaded: 0,
    placed: [],
    heat: [],
    tool: "needle",
    needleTier: 1,
    lastMoveDir: { x: 1, y: 0 },
    lastCellKey: "",
    errors: [],
    showHints: false,
    pressure: 56,
    temperature: 62,
    ironPos: null,
    cooling: 0,
    flattening: 0,
    warp: 18,
    flipCount: 0,
    craft: "钥匙扣",
    savedCurrent: false,
    lastConversionStats: null,
    pointer: {
      down: false,
      mode: null,
      trayTapPending: false,
      x: 0,
      y: 0,
      lastX: 0,
      lastY: 0,
      lastT: 0,
    },
    toolPose: {
      x: 0,
      y: 0,
      visible: false,
    },
    toastTimer: null,
    achievementTimer: null,
    uiDirty: true,
    meterRefreshAt: 0,
  };

  const collectionKey = "beadWorkshopCollection.v1";
  const achievementKey = "beadWorkshopAchievements.v1";
  const conceptAchievement = "观念先于熨烫";
  const fullBoardAchievement = "没有一个孔位是无辜的";
  const needleLoadSortThreshold = 70;
  let collection = readCollection();
  state.achievements = readAchievements();
  let lastFrame = performance.now();

  function validatePatterns() {
    patterns.forEach((pattern) => {
      const badRow = pattern.rows.findIndex((row) => row.length !== pattern.size);
      if (badRow >= 0) {
        throw new Error(`${pattern.name} 第 ${badRow + 1} 行长度不是 ${pattern.size}`);
      }
      const unknownCodes = [...new Set(pattern.rows.join("").replace(/\./g, "").split(""))].filter((code) => !palette[code] || !colorNames[code] || !beadIds[code]);
      if (unknownCodes.length) {
        throw new Error(`${pattern.name} 使用了未登记颜色：${unknownCodes.join(", ")}`);
      }
    });
  }

  function readCollection() {
    try {
      return JSON.parse(localStorage.getItem(collectionKey) || "[]");
    } catch (error) {
      return [];
    }
  }

  function readAchievements() {
    try {
      const parsed = JSON.parse(localStorage.getItem(achievementKey) || "[]");
      if (!Array.isArray(parsed)) return [];
      return parsed.filter((item) => typeof item === "string");
    } catch (error) {
      return [];
    }
  }

  function writeAchievements() {
    try {
      localStorage.setItem(achievementKey, JSON.stringify(state.achievements.slice(0, 24)));
      return true;
    } catch (error) {
      return false;
    }
  }

  function hasAchievement(name) {
    return state.achievements.includes(name);
  }

  function unlockAchievement(name) {
    if (hasAchievement(name)) return false;
    state.achievements.unshift(name);
    state.achievements = [...new Set(state.achievements)].slice(0, 24);
    writeAchievements();
    showAchievementToast(name);
    return true;
  }

  function writeCollection() {
    try {
      localStorage.setItem(collectionKey, JSON.stringify(collection.slice(0, 12)));
      return true;
    } catch (error) {
      showToast("浏览器阻止了本地保存，但作品已经完成。");
      return false;
    }
  }

  function currentBackgroundTheme() {
    return backgroundThemes[state.bgTheme] || backgroundThemes.mist;
  }

  function currentToolStyle() {
    return toolStyles[state.toolStyle] || toolStyles.candy;
  }

  function applyBackgroundTheme(themeId = state.bgTheme) {
    state.bgTheme = backgroundThemes[themeId] ? themeId : "mist";
    const theme = currentBackgroundTheme();
    const root = document.documentElement;
    root.style.setProperty("--page-base", theme.pageBase);
    root.style.setProperty("--page-glow-a", theme.pageGlowA);
    root.style.setProperty("--page-glow-b", theme.pageGlowB);
    root.style.setProperty("--table", theme.table[1]);
    root.style.setProperty("--table-deep", theme.table[2]);
    if (els.bgThemeSelect) els.bgThemeSelect.value = state.bgTheme;
    markDirty();
  }

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function lerp(a, b, t) {
    return a + (b - a) * t;
  }

  function easeOut(t) {
    return 1 - Math.pow(1 - clamp(t, 0, 1), 3);
  }

  function mixColor(hex, target, amount) {
    const a = parseInt(hex.slice(1), 16);
    const b = parseInt(target.slice(1), 16);
    const ar = (a >> 16) & 255;
    const ag = (a >> 8) & 255;
    const ab = a & 255;
    const br = (b >> 16) & 255;
    const bg = (b >> 8) & 255;
    const bb = b & 255;
    const rr = Math.round(lerp(ar, br, amount));
    const rg = Math.round(lerp(ag, bg, amount));
    const rb = Math.round(lerp(ab, bb, amount));
    return `rgb(${rr}, ${rg}, ${rb})`;
  }

  function srgbToLinear(value) {
    const v = value / 255;
    return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  }

  function rgbToOklab(r, g, b) {
    const lr = srgbToLinear(r);
    const lg = srgbToLinear(g);
    const lb = srgbToLinear(b);
    const l = 0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb;
    const m = 0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb;
    const s = 0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb;
    const l3 = Math.cbrt(l);
    const m3 = Math.cbrt(m);
    const s3 = Math.cbrt(s);
    return {
      l: 0.2104542553 * l3 + 0.793617785 * m3 - 0.0040720468 * s3,
      a: 1.9779984951 * l3 - 2.428592205 * m3 + 0.4505937099 * s3,
      b: 0.0259040371 * l3 + 0.7827717662 * m3 - 0.808675766 * s3,
    };
  }

  function oklabDistance(a, b) {
    const dl = (a.l - b.l) * 1.05;
    const da = (a.a - b.a) * 1.35;
    const db = (a.b - b.b) * 1.25;
    return dl * dl + da * da + db * db;
  }

  function targetAt(x, y) {
    const code = state.selectedPattern.rows[y]?.[x] || ".";
    if (code === ".") return null;
    return state.patternColorMap?.[code] || code;
  }

  function indexFor(x, y) {
    return y * state.selectedPattern.size + x;
  }

  function sourceTargetAt(x, y, pattern = state.selectedPattern) {
    const code = pattern.rows[y]?.[x] || ".";
    return code === "." ? null : code;
  }

  function isBuiltInPattern(pattern = state.selectedPattern) {
    return !baseIdFor(pattern).startsWith("custom-");
  }

  function getPatternColorMap(pattern = state.selectedPattern) {
    const id = baseIdFor(pattern);
    return state.patternColorMaps[id] || {};
  }

  function getTargetCounts(pattern = state.selectedPattern) {
    const counts = {};
    pattern.rows.forEach((row) => {
      [...row].forEach((code) => {
        if (code === ".") return;
        const mapped = getPatternColorMap(pattern)[code] || code;
        counts[mapped] = (counts[mapped] || 0) + 1;
      });
    });
    return counts;
  }

  function getTargetTotal(pattern = state.selectedPattern) {
    return Object.values(getTargetCounts(pattern)).reduce((sum, count) => sum + count, 0);
  }

  function allColorCodes() {
    return Object.keys(palette).sort((a, b) => (beadIds[a] || a).localeCompare(beadIds[b] || b, "zh-Hans-CN", { numeric: true }));
  }

  function beadLabel(code) {
    return `${beadIds[code] || code} ${colorNames[code] || code}`;
  }

  function getPatternColors(pattern = state.selectedPattern) {
    return Object.keys(getTargetCounts(pattern)).sort((a, b) => (beadIds[a] || a).localeCompare(beadIds[b] || b, "zh-Hans-CN", { numeric: true }));
  }

  function getSourceCounts(pattern = state.selectedPattern) {
    const counts = {};
    pattern.rows.forEach((row) => {
      [...row].forEach((code) => {
        if (code !== ".") counts[code] = (counts[code] || 0) + 1;
      });
    });
    return counts;
  }

  function getSourcePatternColors(pattern = state.selectedPattern) {
    return Object.keys(getSourceCounts(pattern)).sort((a, b) => (beadIds[a] || a).localeCompare(beadIds[b] || b, "zh-Hans-CN", { numeric: true }));
  }

  function normalizePatternSize(value) {
    const parsed = Number.parseInt(value, 10);
    if (!Number.isFinite(parsed)) return 48;
    return clamp(parsed, 12, 200);
  }

  function baseIdFor(pattern) {
    return pattern.sourceId || pattern.id;
  }

  function normalizeCraft(craft) {
    if (craft === "冰箱贴") return "原版";
    return craftOptions.includes(craft) ? craft : "钥匙扣";
  }

  function resizePattern(pattern, targetSize) {
    const size = normalizePatternSize(targetSize);
    const sourceRows = pattern.sourceRows || pattern.rows;
    const sourceSize = pattern.sourceSize || pattern.size;
    if (sourceSize === size) {
      return {
        ...pattern,
        id: pattern.id,
        sourceId: baseIdFor(pattern),
        sourceSize,
        sourceRows,
      };
    }
    const rows = resamplePatternRows(sourceRows, sourceSize, size);
    return {
      ...pattern,
      id: `${baseIdFor(pattern)}-${size}`,
      sourceId: baseIdFor(pattern),
      sourceSize,
      sourceRows,
      size,
      rows,
      note: `${pattern.note} · ${size}x${size}`,
    };
  }

  function resamplePatternRows(sourceRows, sourceSize, targetSize) {
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
        const entries = Object.entries(weights).sort((a, b) => b[1] - a[1]);
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

  function findBasePattern(pattern = state.selectedPattern) {
    const id = baseIdFor(pattern);
    return patterns.find((item) => item.id === id) || pattern;
  }

  function setSizeControls(size) {
    const normalized = normalizePatternSize(size);
    state.patternSize = normalized;
    if (els.patternSizeSelect) els.patternSizeSelect.value = ["16", "24", "32", "40", "48"].includes(String(normalized)) ? String(normalized) : "";
    if (els.patternSizeInput) els.patternSizeInput.value = String(normalized);
    if (els.customSizeMeta) els.customSizeMeta.textContent = `${normalized}x${normalized}`;
  }

  function applyPatternSize(size) {
    const normalized = normalizePatternSize(size);
    setSizeControls(normalized);
    const base = findBasePattern();
    if (baseIdFor(base).startsWith("custom-") && base.sourceImageDataUrl) {
      reconvertCustomPatternAtSize(base, normalized, state.phase !== "choose");
      return;
    }
    loadPattern(resizePattern(base, normalized), state.phase !== "choose");
    showToast(`图纸已调整为 ${normalized}x${normalized}。`);
  }

  function loadPattern(pattern, keepPhase = false) {
    state.selectedPattern = pattern;
    if (baseIdFor(pattern).startsWith("custom-")) {
      closeRemapModal();
    }
    const patternId = baseIdFor(pattern);
    const sourceColors = getSourcePatternColors(pattern);
    const previousMap = state.patternColorMaps[patternId] || {};
    const normalizedMap = {};
    sourceColors.forEach((code) => {
      const mapped = previousMap[code];
      normalizedMap[code] = mapped && palette[mapped] ? mapped : code;
    });
    state.patternColorMaps[patternId] = normalizedMap;
    state.patternColorMap = normalizedMap;
    setSizeControls(pattern.size);
    const total = pattern.size * pattern.size;
    state.placed = Array(total).fill(null);
    state.heat = Array(total).fill(0);
    state.trayColor = null;
    state.trayProgress = 0;
    state.trayBeans = 0;
    state.trayCapacity = 0;
    state.trayMatrix = makeTrayMatrix(0);
    state.trayPourId = 0;
    state.spill = null;
    state.spillDamages = [];
    state.fusedPieces = [];
    state.conceptEaster = false;
    state.conceptEasterType = null;
    state.tweezerBead = null;
    state.needleLoaded = 0;
    state.errors = [];
    state.showHints = false;
    state.cooling = 0;
    state.flattening = 0;
    state.warp = 18;
    state.flipCount = 0;
    state.craft = normalizeCraft(pattern.craft);
    state.savedCurrent = false;
    state.tool = "needle";
    state.needleTier = 1;
    const firstColor = getPatternColors(pattern)[0] || "K";
    state.selectedColor = firstColor;
    if (!keepPhase) state.phase = "choose";
    markDirty();
  }

  function makeTrayMatrix(count = 0) {
    const rows = 5;
    const cols = 12;
    const matrix = Array.from({ length: rows }, () => Array(cols).fill(false));
    let left = clamp(count, 0, rows * cols);
    for (let row = 0; row < rows; row += 1) {
      for (let col = 0; col < cols; col += 1) {
        if (left <= 0) break;
        matrix[row][col] = true;
        left -= 1;
      }
    }
    return matrix;
  }

  function countTrayBeans() {
    return state.trayMatrix.reduce((sum, row) => sum + row.filter(Boolean).length, 0);
  }

  function syncTrayBeans() {
    state.trayBeans = countTrayBeans();
  }

  function trayGeometry(layout, compact = false) {
    const rows = 5;
    const cols = 12;
    const inset = compact ? 18 : 24;
    const slotGap = (layout.trayH - inset * 2) / rows;
    const lineStartX = layout.trayX + 22;
    const lineEndX = layout.trayX + layout.trayW - 24;
    const startY = layout.trayY + inset + slotGap * 0.5;
    const startX = lineStartX + 10;
    const endX = lineEndX - 10;
    const stepX = cols > 1 ? (endX - startX) / (cols - 1) : 0;
    const stepY = slotGap;
    const beadR = clamp(Math.min(stepX * 0.4, slotGap * 0.25), 4.8, compact ? 8.1 : 9.2);
    return { rows, cols, inset, slotGap, lineStartX, lineEndX, startX, startY, endX, stepX, stepY, beadR };
  }

  function trayCellCenter(layout, row, col, compact = false) {
    const g = trayGeometry(layout, compact);
    return {
      x: g.startX + col * g.stepX,
      y: g.startY + row * g.stepY,
      r: g.beadR,
    };
  }

  function trayCellFromPoint(x, y, compact = false) {
    if (!pointInTray(x, y)) return null;
    const g = trayGeometry(currentLayout(), compact);
    const row = clamp(Math.round((y - g.startY) / Math.max(1, g.stepY)), 0, g.rows - 1);
    const col = clamp(Math.round((x - g.startX) / Math.max(1, g.stepX)), 0, g.cols - 1);
    const center = trayCellCenter(currentLayout(), row, col, compact);
    const maxDist = Math.max(g.stepX, g.stepY) * 0.62;
    if (Math.hypot(x - center.x, y - center.y) > maxDist) return null;
    return { row, col };
  }

  function trayRowFromPoint(x, y, compact = false) {
    if (!pointInTray(x, y)) return null;
    const g = trayGeometry(currentLayout(), compact);
    return clamp(Math.round((y - g.startY) / Math.max(1, g.stepY)), 0, g.rows - 1);
  }

  function needleCapacity() {
    return 12;
  }

  function calcTrayFillAmount(code = state.selectedColor) {
    return 60;
  }

  function pseudoRandom(seed) {
    let h = 2166136261;
    for (let i = 0; i < seed.length; i += 1) {
      h ^= seed.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    h += h << 13;
    h ^= h >>> 7;
    h += h << 3;
    h ^= h >>> 17;
    h += h << 5;
    return ((h >>> 0) % 10000) / 10000;
  }

  function setPhase(phase) {
    state.phase = phase;
    state.pointer.down = false;
    state.pointer.mode = null;
    state.pointer.trayTapPending = false;
    state.ironPos = null;
    if (phase !== "iron") state.emptyIronEaster = false;
    if (phase !== "finish") state.conceptEaster = false;
    if (phase !== "finish") state.conceptEasterType = null;
    if (phase !== "cool" && phase !== "finish") state.fusedPieces = [];
    if (phase !== "place") state.tweezerBead = null;
    if (phase === "inspect") runInspection();
    if (phase === "iron") {
      state.showHints = false;
    }
    if (phase === "cool" && state.cooling < 12) {
      state.cooling = 12;
      state.warp = Math.max(state.warp, estimateWarp());
    }
    if (phase === "cool" || phase === "finish") {
      state.fusedPieces = buildFusedPiecesFromPlaced();
    }
    markDirty();
  }

  function toggleSandboxMode(next = !state.sandboxMode) {
    const enabled = Boolean(next);
    if (state.sandboxMode === enabled) return;
    state.sandboxMode = enabled;
    state.errors = [];
    if (state.phase === "inspect") runInspection();
    showToast(enabled ? "沙盒模式已开启：自由拼摆，不做图纸校验。" : "沙盒模式已关闭：恢复图纸校验流程。");
    markDirty();
  }

  function markDirty() {
    state.uiDirty = true;
  }

  function showToast(message) {
    window.clearTimeout(state.toastTimer);
    els.toast.textContent = message;
    els.toast.classList.add("show");
    state.toastTimer = window.setTimeout(() => {
      els.toast.classList.remove("show");
    }, 1900);
  }

  function showAchievementToast(name) {
    if (!els.achievementToast) {
      showToast(`隐藏成就解锁：${name}`);
      return;
    }
    window.clearTimeout(state.achievementTimer);
    els.achievementToast.innerHTML = `<span class="label">隐藏成就</span><strong>${name}</strong>`;
    els.achievementToast.classList.add("show");
    state.achievementTimer = window.setTimeout(() => {
      els.achievementToast.classList.remove("show");
    }, 2400);
  }

  function currentLayout() {
    const rect = sceneCanvas.getBoundingClientRect();
    const w = rect.width;
    const h = rect.height;
    if (w < 740) {
      const boardY = 24;
      const refH = 126;
      const trayMinH = 154;
      const maxBoardByHeight = h - boardY - 22 - refH - 12 - trayMinH - 22;
      const boardSize = Math.max(260, Math.min(w - 40, 460, maxBoardByHeight));
      const boardX = (w - boardSize) / 2;
      const refX = 24;
      const refY = boardY + boardSize + 22;
      const refW = w - 48;
      const trayY = refY + refH + 12;
      return {
        w,
        h,
        boardX,
        boardY,
        boardSize,
        cell: boardSize / state.selectedPattern.size,
        refX,
        refY,
        refW,
        refH,
        trayX: 24,
        trayY,
        trayW: w - 48,
        trayH: Math.max(trayMinH, h - trayY - 22),
      };
    }
    const boardSize = Math.min(h - 78, w * 0.64, 590);
    const boardX = 34;
    const boardY = 42;
    const trayX = boardX + boardSize + 34;
    const trayW = Math.max(230, w - (boardX + boardSize + 68));
    const refH = clamp(boardSize * 0.26, 130, 158);
    const trayY = boardY + refH + 16;
    return {
      w,
      h,
      boardX,
      boardY,
      boardSize,
      cell: boardSize / state.selectedPattern.size,
      refX: trayX,
      refY: boardY,
      refW: trayW,
      refH,
      trayX,
      trayY,
      trayW,
      trayH: Math.max(220, boardY + boardSize - trayY),
    };
  }

  function setupHiDpiCanvas(canvas, ctx) {
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    const width = Math.max(1, Math.round(rect.width * dpr));
    const height = Math.max(1, Math.round(rect.height * dpr));
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function render() {
    setupHiDpiCanvas(sceneCanvas, scene);
    const layout = currentLayout();
    scene.clearRect(0, 0, layout.w, layout.h);
    drawWorkbench(layout);

    if (state.phase === "choose") {
      drawChooseScene(layout);
    } else if (state.phase === "finish") {
      if (state.conceptEaster) {
        drawConceptEasterScene(layout);
      } else {
        drawFinishShowcase(layout);
        drawFinishLayer(layout);
      }
    } else {
      drawBoard(layout);
      drawReferenceSheet(layout);
      if (state.phase === "place" || state.phase === "inspect") drawTray(layout, state.phase === "place");
      if (state.phase === "iron") drawIronLayer(layout);
      if (state.phase === "cool") drawCoolingLayer(layout);
    }
    drawToolEntities(layout.w, layout.h);

    drawPreview();
    if (state.uiDirty) {
      renderUI();
      state.uiDirty = false;
    }
  }

  function drawWorkbench(layout) {
    const { w, h, boardX, boardY, boardSize, trayX, trayY, trayW, trayH } = layout;
    const ctx = scene;
    const theme = currentBackgroundTheme();
    ctx.save();
    const tableGradient = ctx.createLinearGradient(0, 0, w, h);
    tableGradient.addColorStop(0, theme.table[0]);
    tableGradient.addColorStop(0.48, theme.table[1]);
    tableGradient.addColorStop(1, theme.table[2]);
    ctx.fillStyle = tableGradient;
    ctx.fillRect(0, 0, w, h);

    ctx.fillStyle = "rgba(255, 255, 255, 0.26)";
    for (let y = 0; y < h; y += 34) {
      ctx.fillRect(0, y, w, 1);
    }
    ctx.strokeStyle = "rgba(71, 86, 91, 0.07)";
    ctx.lineWidth = 1;
    for (let x = -h; x < w; x += 42) {
      ctx.beginPath();
      ctx.moveTo(x, h);
      ctx.lineTo(x + h, 0);
      ctx.stroke();
    }

    const matX = Math.max(16, boardX - 24);
    const matY = Math.max(18, boardY - 24);
    const matRight = Math.min(w - 16, Math.max(boardX + boardSize + 24, trayX + trayW + 10));
    const matBottom = Math.min(h - 18, Math.max(boardY + boardSize + 24, trayY + trayH + 10));
    ctx.fillStyle = theme.matFill;
    roundedRect(matX, matY, matRight - matX, matBottom - matY, 8);
    ctx.fill();
    ctx.strokeStyle = theme.matStroke;
    ctx.stroke();
    ctx.strokeStyle = theme.gridStroke;
    for (let x = matX + 22; x < matRight; x += 24) {
      ctx.beginPath();
      ctx.moveTo(x, matY + 8);
      ctx.lineTo(x, matBottom - 8);
      ctx.stroke();
    }
    for (let y = matY + 22; y < matBottom; y += 24) {
      ctx.beginPath();
      ctx.moveTo(matX + 8, y);
      ctx.lineTo(matRight - 8, y);
      ctx.stroke();
    }

    ctx.fillStyle = "rgba(69, 82, 90, 0.08)";
    ctx.fillRect(0, h - 32, w, 32);
    ctx.restore();
  }

  function drawToolEntities(w, h) {
    if (state.phase !== "place") return;
    const ctx = scene;
    const follow = state.phase === "place" && state.toolPose.visible;
    const defaultX = w - 168;
    const defaultY = h - 172;
    const needleTipX = follow ? clamp(state.toolPose.x, 28, w - 28) : defaultX + 72;
    const needleTipY = follow ? clamp(state.toolPose.y, 148, h - 12) : defaultY + 146;
    const tweezerHeadX = follow ? clamp(state.toolPose.x, 20, w - 20) : defaultX + 46;
    const tweezerHeadY = follow ? clamp(state.toolPose.y, 30, h - 20) : defaultY + 90;
    if (state.tool === "needle") {
      drawNeedleEntityAtTip(needleTipX, needleTipY);
    } else {
      drawTweezersEntityAtHead(tweezerHeadX, tweezerHeadY);
    }
    ctx.save();
    ctx.globalAlpha = follow ? 0.46 : 0.72;
    ctx.fillStyle = "rgba(38, 36, 43, 0.62)";
    ctx.font = "700 11px Avenir Next, PingFang SC, Hiragino Sans GB, Microsoft YaHei, sans-serif";
    const infoX = follow ? clamp(state.toolPose.x - 16, 14, w - 172) : defaultX + 8;
    const infoY = follow ? clamp(state.toolPose.y - 14, 18, h - 62) : defaultY + 14;
    ctx.fillText(`针 ${state.needleLoaded}/${needleCapacity()}`, infoX, infoY);
    ctx.fillText(`镊 ${state.tweezerBead ? beadIds[state.tweezerBead] : "空"}`, infoX, infoY + 14);
    ctx.restore();
  }

  function drawNeedleEntityAtTip(tipX, tipY) {
    drawNeedleEntity(tipX, tipY - 142);
  }

  function drawNeedleEntity(x, y) {
    const ctx = scene;
    const loadedCode = state.trayColor || state.selectedColor;
    const cap = needleCapacity();
    const style = currentToolStyle();
    const inUse = state.phase === "place" && state.tool === "needle";
    ctx.save();
    ctx.globalAlpha = inUse ? 0.46 : 0.76;
    ctx.shadowColor = "rgba(38, 36, 43, 0.1)";
    ctx.shadowBlur = inUse ? 4 : 10;
    ctx.strokeStyle = style.primary;
    ctx.lineWidth = 5;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(x, y + 138);
    ctx.lineTo(x, y + 8);
    ctx.stroke();
    ctx.shadowColor = "transparent";
    ctx.strokeStyle = style.secondary;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x - 2.2, y + 126);
    ctx.lineTo(x - 2.2, y + 18);
    ctx.stroke();
    ctx.fillStyle = style.secondary;
    ctx.beginPath();
    ctx.arc(x, y + 6, 6.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = style.primary;
    ctx.stroke();
    drawToolDecoration(ctx, x, y + 7, style);
    ctx.fillStyle = style.tip;
    ctx.beginPath();
    ctx.moveTo(x, y + 142);
    ctx.lineTo(x - 3.2, y + 132);
    ctx.lineTo(x + 3.2, y + 132);
    ctx.closePath();
    ctx.fill();
    for (let i = 0; i < cap; i += 1) {
      const by = y + 20 + i * 14.2;
      const fillStart = Math.max(0, cap - state.needleLoaded);
      if (i >= fillStart) {
        drawBead(ctx, x, by, 5.2, loadedCode, 0, false);
      } else {
        ctx.fillStyle = "rgba(102, 116, 128, 0.18)";
        ctx.beginPath();
        ctx.arc(x, by, 4.8, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    drawToolDecoration(ctx, x + 8, y + 42, style);
    ctx.restore();
  }

  function drawTweezersEntity(x, y) {
    const ctx = scene;
    const style = currentToolStyle();
    const inUse = state.phase === "place" && state.tool === "tweezers";
    ctx.save();
    ctx.globalAlpha = inUse ? 0.46 : 0.76;
    ctx.shadowColor = "rgba(38, 36, 43, 0.1)";
    ctx.shadowBlur = inUse ? 4 : 10;
    ctx.strokeStyle = style.primary;
    ctx.lineWidth = 5;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(x + 8, y + 8);
    ctx.lineTo(x + 42, y + 76);
    ctx.moveTo(x + 30, y + 8);
    ctx.lineTo(x + 52, y + 76);
    ctx.stroke();
    ctx.shadowColor = "transparent";
    ctx.strokeStyle = style.secondary;
    ctx.lineWidth = 1.4;
    ctx.beginPath();
    ctx.moveTo(x + 10, y + 10);
    ctx.lineTo(x + 41, y + 72);
    ctx.moveTo(x + 32, y + 10);
    ctx.lineTo(x + 51, y + 72);
    ctx.stroke();
    ctx.fillStyle = style.accent;
    roundedPath(ctx, x + 14, y + 1, 18, 10, 5);
    ctx.fill();
    drawToolDecoration(ctx, x + 24, y + 6, style);
    if (state.tweezerBead) {
      drawBead(ctx, x + 46, y + 66, 5.8, state.tweezerBead, 0, false);
    } else {
      ctx.fillStyle = "rgba(102, 116, 128, 0.2)";
      ctx.beginPath();
      ctx.arc(x + 46, y + 66, 5.3, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }

  function drawTweezersEntityAtHead(headX, headY) {
    drawTweezersEntity(headX - 46, headY - 66);
  }

  function drawToolDecoration(ctx, x, y, style) {
    ctx.save();
    ctx.fillStyle = style.accent;
    ctx.strokeStyle = "rgba(255,255,255,0.72)";
    ctx.lineWidth = 1;
    if (style.deco === "heart") {
      ctx.beginPath();
      ctx.moveTo(x, y + 3.8);
      ctx.bezierCurveTo(x - 7, y - 1.5, x - 3.8, y - 7, x, y - 3.2);
      ctx.bezierCurveTo(x + 3.8, y - 7, x + 7, y - 1.5, x, y + 3.8);
      ctx.fill();
      ctx.stroke();
      ctx.restore();
      return;
    }
    if (style.deco === "leaf") {
      ctx.beginPath();
      ctx.ellipse(x, y, 6, 3.2, -0.68, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.strokeStyle = "rgba(69, 122, 101, 0.42)";
      ctx.beginPath();
      ctx.moveTo(x - 4.4, y + 2.4);
      ctx.lineTo(x + 4.8, y - 2.5);
      ctx.stroke();
      ctx.restore();
      return;
    }
    if (style.deco === "cloud") {
      ctx.beginPath();
      ctx.arc(x - 4, y + 1, 3.2, Math.PI * 0.6, Math.PI * 1.8);
      ctx.arc(x, y - 1, 4.2, Math.PI, Math.PI * 2);
      ctx.arc(x + 4.4, y + 1, 3, Math.PI * 1.15, Math.PI * 0.4);
      ctx.lineTo(x - 5.8, y + 3.5);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      ctx.restore();
      return;
    }
    if (style.deco === "flower") {
      for (let i = 0; i < 5; i += 1) {
        const angle = i * Math.PI * 2 / 5;
        ctx.beginPath();
        ctx.ellipse(x + Math.cos(angle) * 3.4, y + Math.sin(angle) * 3.4, 2.8, 1.8, angle, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
      }
      ctx.fillStyle = "#fff7a8";
      ctx.beginPath();
      ctx.arc(x, y, 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
      return;
    }
    ctx.beginPath();
    for (let i = 0; i < 5; i += 1) {
      const angle = -Math.PI / 2 + i * (Math.PI * 2 / 5);
      const outerX = x + Math.cos(angle) * 4.2;
      const outerY = y + Math.sin(angle) * 4.2;
      const innerAngle = angle + Math.PI / 5;
      const innerX = x + Math.cos(innerAngle) * 1.9;
      const innerY = y + Math.sin(innerAngle) * 1.9;
      if (i === 0) ctx.moveTo(outerX, outerY);
      else ctx.lineTo(outerX, outerY);
      ctx.lineTo(innerX, innerY);
    }
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }

  function drawChooseScene(layout) {
    const ctx = scene;
    const cardW = Math.min(540, layout.w - 60);
    const x = (layout.w - cardW) / 2;
    const y = Math.max(42, layout.h * 0.15);
    ctx.save();
    drawPaper(x, y, cardW, 230);
    ctx.fillStyle = "#26242b";
    ctx.font = "700 28px Avenir Next, PingFang SC, Hiragino Sans GB, Microsoft YaHei, sans-serif";
    ctx.fillText("今天的工作台已经清空", x + 28, y + 48);
    ctx.fillStyle = "#686572";
    ctx.font = "15px Avenir Next, PingFang SC, Hiragino Sans GB, Microsoft YaHei, sans-serif";
    wrapText("从左侧挑一张图纸，照着色号从豆盒取豆。豆筛只有一个，针工具从豆筛取豆，镊子必须先夹住一颗再放下。", x + 28, y + 82, cardW - 56, 25);
    drawMiniSupplies(x + 32, y + 145, cardW - 64, 54);
    ctx.restore();
  }

  function drawPaper(x, y, w, h) {
    const ctx = scene;
    ctx.save();
    ctx.shadowColor = "rgba(38, 36, 43, 0.16)";
    ctx.shadowBlur = 26;
    ctx.shadowOffsetY = 15;
    ctx.fillStyle = "#fffdf8";
    roundedRect(x, y, w, h, 8);
    ctx.fill();
    ctx.shadowColor = "transparent";
    ctx.strokeStyle = "rgba(99, 91, 79, 0.18)";
    ctx.stroke();
    ctx.restore();
  }

  function drawMiniSupplies(x, y, w, h) {
    const ctx = scene;
    ctx.save();
    const colors = getPatternColors();
    colors.forEach((code, i) => {
      const cx = x + 16 + i * Math.min(38, w / Math.max(colors.length, 1));
      drawBead(ctx, cx, y + h / 2, 12, code, 0, false);
    });
    ctx.strokeStyle = "rgba(38, 36, 43, 0.28)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x + w - 96, y + 46);
    ctx.lineTo(x + w - 70, y + 6);
    ctx.moveTo(x + w - 58, y + 46);
    ctx.lineTo(x + w - 70, y + 6);
    ctx.moveTo(x + w - 34, y + 46);
    ctx.lineTo(x + w - 20, y + 8);
    ctx.stroke();
    ctx.restore();
  }

  function drawBoard(layout) {
    const ctx = scene;
    const { boardX, boardY, boardSize, cell } = layout;
    const size = state.selectedPattern.size;
    ctx.save();
    ctx.shadowColor = "rgba(38, 36, 43, 0.15)";
    ctx.shadowBlur = 26;
    ctx.shadowOffsetY = 14;
    const baseGradient = ctx.createLinearGradient(boardX, boardY - 14, boardX, boardY + boardSize + 14);
    baseGradient.addColorStop(0, "#f6f8fa");
    baseGradient.addColorStop(1, "#d9e0e4");
    ctx.fillStyle = baseGradient;
    roundedRect(boardX - 14, boardY - 14, boardSize + 28, boardSize + 28, 8);
    ctx.fill();
    ctx.shadowColor = "transparent";
    ctx.strokeStyle = "rgba(108, 118, 130, 0.34)";
    ctx.stroke();

    ctx.fillStyle = "#fbfcfd";
    roundedRect(boardX, boardY, boardSize, boardSize, 6);
    ctx.fill();
    ctx.strokeStyle = "rgba(70, 84, 96, 0.18)";
    ctx.stroke();

    const templateOpacity = state.phase === "place" ? 0.22 : state.phase === "inspect" ? 0.15 : 0;
    const spillIndex = state.spill ? state.spill.index : -1;
    for (let y = 0; y < size; y += 1) {
      for (let x = 0; x < size; x += 1) {
        const index = indexFor(x, y);
        const px = boardX + x * cell;
        const py = boardY + y * cell;
        const code = targetAt(x, y);
        ctx.strokeStyle = "rgba(117, 126, 139, 0.18)";
        ctx.lineWidth = 1;
        ctx.strokeRect(px, py, cell, cell);
        if (code && templateOpacity > 0) {
          ctx.globalAlpha = templateOpacity;
          ctx.fillStyle = palette[code];
          ctx.fillRect(px + 1, py + 1, cell - 2, cell - 2);
          ctx.globalAlpha = 1;
        }
        if (index !== spillIndex) {
          const pegR = Math.max(2, cell * 0.138);
          ctx.fillStyle = "rgba(91, 104, 118, 0.24)";
          ctx.beginPath();
          ctx.arc(px + cell / 2, py + cell / 2, pegR, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = "rgba(255,255,255,0.58)";
          ctx.beginPath();
          ctx.arc(px + cell / 2 - pegR * 0.22, py + cell / 2 - pegR * 0.22, Math.max(0.95, pegR * 0.36), 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    const boardFusedPhase = state.phase === "iron";
    const detachedPhase = state.phase === "cool" || state.phase === "finish";
    if (boardFusedPhase) drawFusionBridges(layout);
    if (detachedPhase) {
      drawDetachedFusedPieces(layout);
    } else {
      state.placed.forEach((code, index) => {
        if (!code) return;
        const x = index % size;
        const y = Math.floor(index / size);
        const heat = state.heat[index] || 0;
        const cx = boardX + x * cell + cell / 2;
        const cy = boardY + y * cell + cell / 2;
        if (state.spill && state.spill.index === index) {
          drawFallenBead(ctx, cx, cy, cell, code, state.spill.orientation || "h");
          return;
        }
        if (isSpillDamagedIndex(index)) {
          drawDamagedBead(ctx, cx, cy, cell * 0.43, code, heat, boardFusedPhase);
        } else {
          drawBead(ctx, cx, cy, cell * 0.43, code, heat, boardFusedPhase);
        }
        drawPegInBead(ctx, cx, cy, cell * 0.43, heat, boardFusedPhase);
      });
    }

    if (state.phase === "inspect" && state.showHints) {
      drawInspectionHints(layout);
    }

    ctx.restore();
  }

  function drawFusionBridges(layout) {
    const ctx = scene;
    const size = state.selectedPattern.size;
    ctx.save();
    for (let y = 0; y < size; y += 1) {
      for (let x = 0; x < size; x += 1) {
        const index = indexFor(x, y);
        const code = state.placed[index];
        if (!code) continue;
        drawFusionBridgeTo(ctx, layout, x, y, x + 1, y);
        drawFusionBridgeTo(ctx, layout, x, y, x, y + 1);
      }
    }
    ctx.restore();
  }

  function buildFusedPiecesFromPlaced() {
    const size = state.selectedPattern.size;
    const total = size * size;
    const visited = Array(total).fill(false);
    const pieces = [];
    const boardCenter = (size - 1) / 2;

    for (let index = 0; index < total; index += 1) {
      if (visited[index] || !state.placed[index]) continue;
      const queue = [index];
      visited[index] = true;
      const cells = [];
      let minX = size;
      let minY = size;
      let maxX = 0;
      let maxY = 0;
      let sumX = 0;
      let sumY = 0;

      for (let head = 0; head < queue.length; head += 1) {
        const current = queue[head];
        const code = state.placed[current];
        if (!code) continue;
        const x = current % size;
        const y = Math.floor(current / size);
        const heat = state.heat[current] || 0;
        cells.push({ index: current, x, y, code, heat });
        minX = Math.min(minX, x);
        minY = Math.min(minY, y);
        maxX = Math.max(maxX, x);
        maxY = Math.max(maxY, y);
        sumX += x;
        sumY += y;

        if (x > 0) {
          const left = current - 1;
          if (!visited[left] && state.placed[left]) {
            visited[left] = true;
            queue.push(left);
          }
        }
        if (x < size - 1) {
          const right = current + 1;
          if (!visited[right] && state.placed[right]) {
            visited[right] = true;
            queue.push(right);
          }
        }
        if (y > 0) {
          const up = current - size;
          if (!visited[up] && state.placed[up]) {
            visited[up] = true;
            queue.push(up);
          }
        }
        if (y < size - 1) {
          const down = current + size;
          if (!visited[down] && state.placed[down]) {
            visited[down] = true;
            queue.push(down);
          }
        }
      }

      if (!cells.length) continue;
      const centerX = sumX / cells.length;
      const centerY = sumY / cells.length;
      const dx = centerX - boardCenter;
      const dy = centerY - boardCenter;
      const dist = Math.hypot(dx, dy) || 1;
      const seed = `${state.selectedPattern.id}:${state.flipCount}:${minX}:${minY}:${cells.length}`;
      const jitterX = (pseudoRandom(`${seed}-jx`) - 0.5) * 0.05;
      const jitterY = (pseudoRandom(`${seed}-jy`) - 0.5) * 0.05;
      const offsetX = clamp((dx / dist) * 0.08 + jitterX, -0.14, 0.14);
      const offsetY = clamp((dy / dist) * 0.02 + jitterY, -0.06, 0.06);
      const lift = 0.14 + pseudoRandom(`${seed}-lift`) * 0.08;
      const map = {};
      const relCells = cells.map((cell) => {
        map[`${cell.x},${cell.y}`] = cell;
        return {
          ...cell,
          rx: cell.x - minX,
          ry: cell.y - minY,
        };
      });

      pieces.push({
        id: `${pieces.length + 1}`,
        cells: relCells,
        map,
        minX,
        minY,
        maxX,
        maxY,
        centerX,
        centerY,
        offsetX,
        offsetY,
        lift,
      });
    }
    return pieces;
  }

  function drawDetachedFusedPieces(layout) {
    const pieces = getFusedPieces();
    if (!pieces.length) return;
    const sorted = [...pieces].sort((a, b) => a.centerY - b.centerY);
    sorted.forEach((piece) => {
      const dx = piece.offsetX * layout.cell;
      const dy = (piece.offsetY - piece.lift - clamp(state.flattening / 100, 0, 1) * 0.09) * layout.cell;
      drawFusedPieceTransformed(layout, piece, {
        scale: 1,
        resolveCenter: (cell) => ({
          x: layout.boardX + cell.x * layout.cell + layout.cell / 2 + dx,
          y: layout.boardY + cell.y * layout.cell + layout.cell / 2 + dy,
        }),
      });
    });
  }

  function drawDetachedFusionBridgeByCenters(ctx, cellSize, cellA, cellB, centerA, centerB) {
    const heat = Math.min(cellA.heat || 0, cellB.heat || 0);
    const pressBoost = clamp(state.flattening / 100, 0, 1);
    const fuse = clamp((heat - 36) / 56 + pressBoost * 0.42, 0, 1);
    if (fuse <= 0) return;
    const spread = lerp(cellSize * 0.24, cellSize * (0.8 + pressBoost * 0.1), easeOut(fuse));
    const over = clamp((heat - 88) / 34, 0, 1);
    const colorA = fusedColor(cellA.code, heat);
    const colorB = fusedColor(cellB.code, heat);
    const gradient = ctx.createLinearGradient(centerA.x, centerA.y, centerB.x, centerB.y);
    gradient.addColorStop(0, colorA);
    gradient.addColorStop(1, colorB);

    ctx.save();
    ctx.globalAlpha = 0.92;
    ctx.fillStyle = gradient;
    if (cellA.x !== cellB.x) {
      roundedPath(ctx, centerA.x, centerA.y - spread / 2, centerB.x - centerA.x, spread, lerp(spread / 2, 3, over));
    } else {
      roundedPath(ctx, centerA.x - spread / 2, centerA.y, spread, centerB.y - centerA.y, lerp(spread / 2, 3, over));
    }
    ctx.fill();
    ctx.restore();
  }

  function drawFusedPieceTransformed(layout, piece, options = {}) {
    const ctx = scene;
    const scale = clamp(options.scale ?? 1, 0.28, 1.4);
    const resolveCenter = options.resolveCenter;
    if (!resolveCenter) return;
    piece.cells.forEach((cell) => {
      const right = piece.map[`${cell.x + 1},${cell.y}`];
      if (right) {
        const centerA = resolveCenter(cell, piece);
        const centerB = resolveCenter(right, piece);
        drawDetachedFusionBridgeByCenters(ctx, layout.cell * scale, cell, right, centerA, centerB);
      }
      const down = piece.map[`${cell.x},${cell.y + 1}`];
      if (down) {
        const centerA = resolveCenter(cell, piece);
        const centerB = resolveCenter(down, piece);
        drawDetachedFusionBridgeByCenters(ctx, layout.cell * scale, cell, down, centerA, centerB);
      }
    });

    piece.cells.forEach((cell) => {
      const center = resolveCenter(cell, piece);
      if (isSpillDamagedIndex(cell.index)) {
        drawDamagedBead(ctx, center.x, center.y, layout.cell * 0.43 * scale, cell.code, cell.heat, true);
      } else {
        drawBead(ctx, center.x, center.y, layout.cell * 0.43 * scale, cell.code, cell.heat, true);
      }
    });
  }

  function getFusedPieces() {
    if (!state.fusedPieces.length && placedCount() > 0) {
      state.fusedPieces = buildFusedPiecesFromPlaced();
    }
    return state.fusedPieces;
  }

  function pieceSortByArea(pieces) {
    return [...pieces].sort((a, b) => b.cells.length - a.cells.length);
  }

  function drawFinishShowcase(layout) {
    const pieces = getFusedPieces();
    if (!pieces.length) return;

    const ctx = scene;
    const { boardX, boardY, boardSize } = layout;
    ctx.save();
    ctx.shadowColor = "rgba(38, 36, 43, 0.12)";
    ctx.shadowBlur = 26;
    ctx.shadowOffsetY = 14;
    ctx.fillStyle = "rgba(255,255,255,0.42)";
    roundedRect(boardX - 12, boardY - 12, boardSize + 24, boardSize + 24, 14);
    ctx.fill();
    ctx.shadowColor = "transparent";
    ctx.restore();

    if (state.craft === "原版") {
      drawFinishOriginal(layout, pieces);
      return;
    }
    if (state.craft === "钥匙扣") {
      drawFinishKeychain(layout, pieces);
      return;
    }
    if (state.craft === "摆件") {
      drawFinishFigurine(layout, pieces);
      return;
    }
    if (state.craft === "杯垫") {
      drawFinishCoaster(layout, pieces);
      return;
    }
    drawFinishOriginal(layout, pieces);
  }

  function drawConceptEasterScene(layout) {
    const type = state.conceptEasterType || "empty";
    const ctx = scene;
    const { w, h, boardSize } = layout;
    const topPad = 28;
    const bottomPad = 20;
    const gap = 22;
    const initDisplay = Math.min(boardSize, Math.min(w, h) * 0.58);
    const roughLabelW = Math.min(initDisplay, 640);
    const roughMetrics = buildConceptLabelMetrics(type, roughLabelW);
    const maxDisplayByHeight = Math.max(180, h - topPad - bottomPad - gap - roughMetrics.boxH);
    const displaySize = Math.min(initDisplay, maxDisplayByHeight);
    const bx = (w - displaySize) / 2;
    const by = Math.max(topPad, Math.min(h * 0.26, h - displaySize - bottomPad - gap - roughMetrics.boxH));
    const size = state.selectedPattern.size;

    ctx.save();
    ctx.fillStyle = "#eef0f3";
    ctx.fillRect(0, 0, w, h);
    ctx.restore();

    ctx.save();
    ctx.shadowColor = "rgba(30, 33, 40, 0.13)";
    ctx.shadowBlur = 28;
    ctx.shadowOffsetY = 13;
    ctx.fillStyle = "rgba(255,255,255,0.95)";
    roundedRect(bx - 18, by - 18, displaySize + 36, displaySize + 36, 14);
    ctx.fill();
    ctx.shadowColor = "transparent";
    ctx.fillStyle = "#fcfcfd";
    roundedRect(bx, by, displaySize, displaySize, 6);
    ctx.fill();
    ctx.restore();

    const displayCell = displaySize / size;
    const fullMode = type === "full";
    for (let y = 0; y < size; y += 1) {
      for (let x = 0; x < size; x += 1) {
        const px = bx + x * displayCell;
        const py = by + y * displayCell;
        const index = indexFor(x, y);
        const pegR = Math.max(1.45, displayCell * 0.122);
        ctx.fillStyle = "rgba(97, 107, 120, 0.22)";
        ctx.beginPath();
        ctx.arc(px + displayCell / 2, py + displayCell / 2, pegR, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "rgba(255,255,255,0.52)";
        ctx.beginPath();
        ctx.arc(px + displayCell / 2 - pegR * 0.22, py + displayCell / 2 - pegR * 0.22, Math.max(0.6, pegR * 0.35), 0, Math.PI * 2);
        ctx.fill();
        if (fullMode) {
          const code = state.placed[index] || state.selectedColor;
          const heat = Math.max(62, state.heat[index] || 0);
          drawBead(ctx, px + displayCell / 2, py + displayCell / 2, displayCell * 0.43, code, heat, true);
        }
      }
    }

    drawConceptMuseumLabel({
      x: bx,
      y: by + displaySize + 26,
      w: displaySize,
      type,
      maxBottom: h - 18,
    });
  }

  function conceptWrappedLines(text, maxWidth, font) {
    const ctx = scene;
    if (!text) return [""];
    ctx.save();
    ctx.font = font;
    let line = "";
    const lines = [];
    [...text].forEach((ch) => {
      const test = line + ch;
      if (line && ctx.measureText(test).width > maxWidth) {
        lines.push(line);
        line = ch;
      } else {
        line = test;
      }
    });
    if (line) lines.push(line);
    ctx.restore();
    return lines.length ? lines : [text];
  }

  function buildConceptLabelMetrics(type, labelW) {
    const title = type === "full" ? "《满格构图》" : "《无题》";
    const paragraphs = type === "full"
      ? [
        { text: "2026", font: "500 15px Avenir Next, PingFang SC, Hiragino Sans GB, Microsoft YaHei, sans-serif", color: "#2f333b", lineHeight: 22 },
        { text: "塑料拼豆、网格、完全占据的表面", font: "500 14px Avenir Next, PingFang SC, Hiragino Sans GB, Microsoft YaHei, sans-serif", color: "#4f5560", lineHeight: 22 },
        { gap: 10 },
        { text: "这件作品拒绝留白，整块板面成为图像本身。", font: "500 15px Avenir Next, PingFang SC, Hiragino Sans GB, Microsoft YaHei, sans-serif", color: "#2f333b", lineHeight: 22 },
        { text: "每个孔位都被占据，每个位置都同等重要。", font: "500 15px Avenir Next, PingFang SC, Hiragino Sans GB, Microsoft YaHei, sans-serif", color: "#2f333b", lineHeight: 22 },
      ]
      : [
        { text: "2026", font: "500 15px Avenir Next, PingFang SC, Hiragino Sans GB, Microsoft YaHei, sans-serif", color: "#2f333b", lineHeight: 22 },
        { text: "空白拼豆板、未放置的塑料豆、玩家的观看", font: "500 14px Avenir Next, PingFang SC, Hiragino Sans GB, Microsoft YaHei, sans-serif", color: "#4f5560", lineHeight: 22 },
        { gap: 10 },
        { text: "没有颜色，也是一种结构。", font: "500 15px Avenir Next, PingFang SC, Hiragino Sans GB, Microsoft YaHei, sans-serif", color: "#2f333b", lineHeight: 22 },
      ];
    const bodyMaxW = labelW - 36;
    const rows = [];
    paragraphs.forEach((item) => {
      if (item.gap) {
        rows.push({ gap: item.gap });
        return;
      }
      const wrapped = conceptWrappedLines(item.text, bodyMaxW, item.font);
      wrapped.forEach((line) => {
        rows.push({
          text: line,
          font: item.font,
          color: item.color,
          lineHeight: item.lineHeight,
        });
      });
    });
    const boxH = 24 + 28 + 14 + rows.reduce((sum, row) => sum + (row.gap || row.lineHeight), 0) + 18;
    return { title, rows, boxH };
  }

  function drawConceptMuseumLabel({ x, y, w, type, maxBottom }) {
    const ctx = scene;
    const labelW = Math.min(w, 640);
    const labelX = x + (w - labelW) / 2;
    const metrics = buildConceptLabelMetrics(type, labelW);
    const { title, rows, boxH } = metrics;
    const labelY = Math.max(14, Math.min(y, maxBottom - boxH));
    ctx.save();
    ctx.fillStyle = "rgba(255,255,255,0.95)";
    roundedRect(labelX, labelY, labelW, boxH, 6);
    ctx.fill();
    ctx.strokeStyle = "rgba(38, 36, 43, 0.16)";
    ctx.lineWidth = 1;
    roundedRect(labelX, labelY, labelW, boxH, 6);
    ctx.stroke();
    ctx.fillStyle = "#22242a";
    ctx.font = "700 23px Avenir Next, PingFang SC, Hiragino Sans GB, Microsoft YaHei, sans-serif";
    ctx.fillText(title, labelX + 18, labelY + 36);
    let cursorY = labelY + 66;
    rows.forEach((row) => {
      if (row.gap) {
        cursorY += row.gap;
        return;
      }
      ctx.fillStyle = row.color;
      ctx.font = row.font;
      ctx.fillText(row.text, labelX + 18, cursorY);
      cursorY += row.lineHeight;
    });
    ctx.restore();
  }

  function drawFinishKeychain(layout, pieces) {
    const ctx = scene;
    const { boardX, boardY, boardSize, cell } = layout;
    const selected = pieceSortByArea(pieces).slice(0, 2);
    const centerX = boardX + boardSize / 2;
    const slots = [boardY + boardSize * 0.34, boardY + boardSize * 0.7];
    const placed = [];
    selected.forEach((piece, index) => {
      const pieceW = (piece.maxX - piece.minX + 1) * cell;
      const pieceH = (piece.maxY - piece.minY + 1) * cell;
      const scale = clamp(Math.min(boardSize * 0.58 / pieceW, boardSize * 0.28 / pieceH, 1), 0.52, 1);
      const target = { x: centerX, y: slots[index] };
      placed.push({ piece, scale, target });
      drawFusedPieceTransformed(layout, piece, {
        scale,
        resolveCenter: (cellData) => ({
          x: target.x + (cellData.x - piece.centerX) * cell * scale,
          y: target.y + (cellData.y - piece.centerY) * cell * scale,
        }),
      });
    });

    const ringY = boardY + boardSize * 0.11;
    ctx.save();
    ctx.strokeStyle = "#b2bcc8";
    ctx.lineWidth = Math.max(5, cell * 0.3);
    ctx.beginPath();
    ctx.arc(centerX, ringY, boardSize * 0.065, 0, Math.PI * 2);
    ctx.stroke();
    if (placed.length) {
      const first = placed[0];
      const firstTop = first.target.y - ((first.piece.maxY - first.piece.minY + 1) * cell * first.scale) / 2;
      ctx.lineWidth = Math.max(3, cell * 0.18);
      ctx.beginPath();
      ctx.moveTo(centerX, ringY + boardSize * 0.065);
      ctx.lineTo(centerX, firstTop - cell * 0.45);
      ctx.stroke();
    }
    if (placed.length > 1) {
      const top = placed[0];
      const bottom = placed[1];
      const topBottomY = top.target.y + ((top.piece.maxY - top.piece.minY + 1) * cell * top.scale) / 2;
      const bottomTopY = bottom.target.y - ((bottom.piece.maxY - bottom.piece.minY + 1) * cell * bottom.scale) / 2;
      ctx.lineWidth = Math.max(2.4, cell * 0.14);
      ctx.beginPath();
      ctx.moveTo(centerX, topBottomY + cell * 0.2);
      ctx.lineTo(centerX, bottomTopY - cell * 0.2);
      ctx.stroke();
    }
    ctx.restore();
  }

  function drawFinishOriginal(layout, pieces) {
    const ctx = scene;
    const { boardX, boardY, boardSize, cell } = layout;
    ctx.save();
    ctx.shadowColor = "rgba(38, 36, 43, 0.14)";
    ctx.shadowBlur = 20;
    ctx.shadowOffsetY = 10;
    const baseGradient = ctx.createLinearGradient(boardX, boardY - 10, boardX, boardY + boardSize + 10);
    baseGradient.addColorStop(0, "#f6f8fa");
    baseGradient.addColorStop(1, "#d9e0e4");
    ctx.fillStyle = baseGradient;
    roundedRect(boardX - 9, boardY - 9, boardSize + 18, boardSize + 18, 9);
    ctx.fill();
    ctx.shadowColor = "transparent";
    ctx.fillStyle = "#fbfcfd";
    roundedRect(boardX, boardY, boardSize, boardSize, 6);
    ctx.fill();
    const size = state.selectedPattern.size;
    const spillIndex = state.spill ? state.spill.index : -1;
    for (let y = 0; y < size; y += 1) {
      for (let x = 0; x < size; x += 1) {
        const index = indexFor(x, y);
        if (index === spillIndex) continue;
        const px = boardX + x * cell;
        const py = boardY + y * cell;
        const pegR = Math.max(2, cell * 0.138);
        ctx.fillStyle = "rgba(91, 104, 118, 0.24)";
        ctx.beginPath();
        ctx.arc(px + cell / 2, py + cell / 2, pegR, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    ctx.restore();
    pieces.forEach((piece) => {
      drawFusedPieceTransformed(layout, piece, {
        scale: 1,
        resolveCenter: (cell) => ({
          x: layout.boardX + cell.x * layout.cell + layout.cell / 2,
          y: layout.boardY + cell.y * layout.cell + layout.cell / 2,
        }),
      });
    });
  }

  function drawFinishCoaster(layout, pieces) {
    drawFinishOriginal(layout, pieces);
    drawCoasterEdge(layout, pieces);
  }

  function drawCoasterEdge(layout, pieces) {
    if (!pieces.length) return;
    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;
    pieces.forEach((piece) => {
      minX = Math.min(minX, piece.minX);
      minY = Math.min(minY, piece.minY);
      maxX = Math.max(maxX, piece.maxX);
      maxY = Math.max(maxY, piece.maxY);
    });
    if (!Number.isFinite(minX)) return;
    const pad = layout.cell * 0.68;
    const left = layout.boardX + minX * layout.cell - pad;
    const top = layout.boardY + minY * layout.cell - pad;
    const width = (maxX - minX + 1) * layout.cell + pad * 2;
    const height = (maxY - minY + 1) * layout.cell + pad * 2;
    const ctx = scene;
    const petalR = clamp(layout.cell * 0.18, 3.4, 8.4);
    const spacing = petalR * 1.7;
    ctx.save();
    ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
    for (let x = left; x <= left + width + 0.01; x += spacing) {
      ctx.beginPath();
      ctx.arc(x, top - petalR * 0.25, petalR, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(x, top + height + petalR * 0.25, petalR, 0, Math.PI * 2);
      ctx.fill();
    }
    for (let y = top + spacing * 0.5; y <= top + height - spacing * 0.5 + 0.01; y += spacing) {
      ctx.beginPath();
      ctx.arc(left - petalR * 0.25, y, petalR, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(left + width + petalR * 0.25, y, petalR, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.strokeStyle = "rgba(87, 184, 167, 0.65)";
    ctx.lineWidth = Math.max(2.8, layout.cell * 0.12);
    roundedPath(ctx, left, top, width, height, Math.max(8, layout.cell * 0.56));
    ctx.stroke();
    ctx.restore();
  }

  function drawFinishFigurine(layout, pieces) {
    const selected = pieceSortByArea(pieces).slice(0, Math.min(4, pieces.length));
    const count = selected.length;
    if (!count) return;
    const centerY = layout.boardY + layout.boardSize * 0.57;
    const gap = layout.boardSize / (count + 1);
    selected.forEach((piece, i) => {
      const targetX = layout.boardX + gap * (i + 1);
      const pieceW = (piece.maxX - piece.minX + 1) * layout.cell;
      const pieceH = (piece.maxY - piece.minY + 1) * layout.cell;
      const maxW = gap * 0.85;
      const maxH = layout.boardSize * 0.34;
      const scale = clamp(Math.min(maxW / pieceW, maxH / pieceH, 1), 0.48, 1);
      const pieceWidth = pieceW * scale;
      const pieceHeight = pieceH * scale;
      drawFusedPieceTransformed(layout, piece, {
        scale,
        resolveCenter: (cell) => ({
          x: targetX + (cell.x - piece.centerX) * layout.cell * scale,
          y: centerY + (cell.y - piece.centerY) * layout.cell * scale,
        }),
      });
      const baseW = clamp(pieceWidth * 0.95 + layout.cell * 0.7, layout.cell * 1.8, gap * 0.92);
      const baseH = clamp(layout.cell * 0.46, 8, 16);
      const topY = centerY + pieceHeight / 2 + layout.cell * 0.24;
      const ctx = scene;
      ctx.save();
      const wood = ctx.createLinearGradient(targetX - baseW / 2, topY, targetX + baseW / 2, topY + baseH);
      wood.addColorStop(0, "#9b6d4c");
      wood.addColorStop(0.5, "#805538");
      wood.addColorStop(1, "#71462f");
      ctx.fillStyle = wood;
      roundedPath(ctx, targetX - baseW / 2, topY, baseW, baseH, Math.min(6, baseH / 2));
      ctx.fill();
      ctx.fillStyle = "rgba(255,255,255,0.2)";
      roundedPath(ctx, targetX - baseW * 0.42, topY + 1.5, baseW * 0.84, Math.max(1.5, baseH * 0.18), Math.max(1, baseH * 0.1));
      ctx.fill();
      ctx.restore();
    });
  }

  function drawFusionBridgeTo(ctx, layout, x1, y1, x2, y2) {
    const size = state.selectedPattern.size;
    if (x2 < 0 || y2 < 0 || x2 >= size || y2 >= size) return;
    const indexA = indexFor(x1, y1);
    const indexB = indexFor(x2, y2);
    const codeA = state.placed[indexA];
    const codeB = state.placed[indexB];
    if (!codeA || !codeB) return;
    const heat = Math.min(state.heat[indexA] || 0, state.heat[indexB] || 0);
    const pressBoost = (state.phase === "cool" || state.phase === "finish") ? clamp(state.flattening / 100, 0, 1) : 0;
    const fuse = clamp((heat - 36) / 56 + pressBoost * 0.42, 0, 1);
    if (fuse <= 0) return;

    const { boardX, boardY, cell } = layout;
    const centerA = {
      x: boardX + x1 * cell + cell / 2,
      y: boardY + y1 * cell + cell / 2,
    };
    const centerB = {
      x: boardX + x2 * cell + cell / 2,
      y: boardY + y2 * cell + cell / 2,
    };
    const spread = lerp(cell * 0.24, cell * (0.8 + pressBoost * 0.1), easeOut(fuse));
    const over = clamp((heat - 88) / 34, 0, 1);
    const colorA = fusedColor(codeA, heat);
    const colorB = fusedColor(codeB, heat);
    const gradient = ctx.createLinearGradient(centerA.x, centerA.y, centerB.x, centerB.y);
    gradient.addColorStop(0, colorA);
    gradient.addColorStop(1, colorB);

    ctx.save();
    ctx.globalAlpha = 0.9;
    ctx.fillStyle = gradient;
    if (x1 !== x2) {
      roundedPath(ctx, centerA.x, centerA.y - spread / 2, centerB.x - centerA.x, spread, lerp(spread / 2, 3, over));
    } else {
      roundedPath(ctx, centerA.x - spread / 2, centerA.y, spread, centerB.y - centerA.y, lerp(spread / 2, 3, over));
    }
    ctx.fill();
    ctx.restore();
  }

  function drawInspectionHints(layout) {
    const ctx = scene;
    const { boardX, boardY, cell } = layout;
    const limit = state.errors.length > 22 ? 22 : state.errors.length;
    ctx.save();
    ctx.lineWidth = Math.max(2, cell * 0.08);
    state.errors.slice(0, limit).forEach((error) => {
      const x = error.index % state.selectedPattern.size;
      const y = Math.floor(error.index / state.selectedPattern.size);
      ctx.strokeStyle = error.type === "missing" ? "#d99b3d" : "#e7645f";
      ctx.strokeRect(boardX + x * cell + 2, boardY + y * cell + 2, cell - 4, cell - 4);
    });
    ctx.restore();
  }

  function drawSpillMarker(layout) {
    if (!state.spill) return;
    const ctx = scene;
    const index = state.spill.index;
    const x = index % state.selectedPattern.size;
    const y = Math.floor(index / state.selectedPattern.size);
    const { boardX, boardY, cell } = layout;
    const cx = boardX + x * cell + cell / 2;
    const cy = boardY + y * cell + cell / 2;
    ctx.save();
    ctx.shadowColor = "rgba(38, 36, 43, 0.2)";
    ctx.shadowBlur = 8;
    ctx.shadowOffsetY = 3;
    drawFallenBead(ctx, cx, cy, cell, state.spill.code, state.spill.orientation || "h");
    ctx.restore();
  }

  function isSpillDamagedIndex(index) {
    return state.spillDamages.some((damage) => damage.index === index);
  }

  function drawDamagedBead(ctx, x, y, r, code, heat = 0, fused = false) {
    const base = palette[code] || "#999";
    const burnt = mixColor(base, "#6b4b44", 0.5);
    const pressRaw = fused ? ((state.phase === "cool" || state.phase === "finish") ? clamp(state.flattening / 100, 0, 1) : 0) : 0;
    const spread = clamp((heat - 30) / 50 + pressRaw * 0.5, 0.35, 1);
    const width = r * lerp(2.12, 2.38, spread);
    const height = r * lerp(2.02, 2.24, spread);
    const corner = r * lerp(0.34, 0.1, spread);
    ctx.save();
    ctx.fillStyle = "rgba(62, 39, 34, 0.26)";
    roundedPath(ctx, x - width / 2 + r * 0.06, y - height / 2 + r * 0.11, width, height, corner);
    ctx.fill();
    ctx.fillStyle = burnt;
    roundedPath(ctx, x - width / 2, y - height / 2, width, height, corner);
    ctx.fill();
    ctx.fillStyle = "rgba(255, 188, 129, 0.18)";
    roundedPath(ctx, x - width * 0.34, y - height * 0.31, width * 0.68, Math.max(1.6, height * 0.12), Math.max(1, corner * 0.45));
    ctx.fill();
    ctx.strokeStyle = "rgba(56, 33, 30, 0.38)";
    ctx.lineWidth = Math.max(1, r * 0.07);
    roundedPath(ctx, x - width / 2, y - height / 2, width, height, corner);
    ctx.stroke();
    ctx.restore();
  }

  function drawSpillDamages(layout) {
    const ctx = scene;
    const { boardX, boardY, cell } = layout;
    ctx.save();
    state.spillDamages.forEach((damage) => {
      const x = damage.index % state.selectedPattern.size;
      const y = Math.floor(damage.index / state.selectedPattern.size);
      const cx = boardX + x * cell + cell / 2;
      const cy = boardY + y * cell + cell / 2;
      const melted = mixColor(palette[damage.code] || "#999", "#6b4b44", 0.45);
      ctx.fillStyle = melted;
      const blob = cell * 0.92;
      roundedPath(ctx, cx - blob / 2, cy - blob / 2, blob, blob, Math.max(2, cell * 0.12));
      ctx.fill();
      ctx.globalAlpha = 0.72;
      ctx.fillStyle = "rgba(96, 50, 42, 0.5)";
      roundedPath(ctx, cx - blob * 0.32, cy - blob * 0.08, blob * 0.64, blob * 0.28, Math.max(2, cell * 0.08));
      ctx.fill();
      ctx.globalAlpha = 1;
      ctx.strokeStyle = "rgba(92, 48, 42, 0.5)";
      ctx.lineWidth = Math.max(1, cell * 0.055);
      roundedPath(ctx, cx - blob / 2, cy - blob / 2, blob, blob, Math.max(2, cell * 0.12));
      ctx.stroke();
    });
    ctx.restore();
  }

  function drawFallenBead(ctx, x, y, cell, code, orientation = "h") {
    const base = palette[code] || "#999";
    const diameter = cell * 0.8;
    const length = diameter * 1.22;
    const thickness = diameter;
    const angle = orientation === "v" ? Math.PI * 0.5 : 0;
    const corner = Math.max(2.2, thickness * 0.16);

    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);

    ctx.fillStyle = base;
    roundedPath(ctx, -length / 2, -thickness / 2, length, thickness, corner);
    ctx.fill();

    ctx.fillStyle = "rgba(255,255,255,0.18)";
    roundedPath(ctx, -length * 0.42, -thickness * 0.34, length * 0.84, thickness * 0.18, Math.max(1.2, corner * 0.45));
    ctx.fill();

    ctx.strokeStyle = "rgba(0,0,0,0.16)";
    ctx.lineWidth = Math.max(1, cell * 0.045);
    roundedPath(ctx, -length / 2, -thickness / 2, length, thickness, corner);
    ctx.stroke();
    ctx.restore();
  }

  function drawTray(layout, compact = false) {
    const ctx = scene;
    const { trayX, trayY, trayW, trayH } = layout;
    const color = state.trayColor;
    const progress = color ? state.trayProgress : 0;
    const p = easeOut(progress / 100);
    const g = trayGeometry(layout, compact);
    const beadR = g.beadR;

    ctx.save();
    ctx.shadowColor = "rgba(38, 36, 43, 0.13)";
    ctx.shadowBlur = 20;
    ctx.shadowOffsetY = 10;
    const trayGradient = ctx.createLinearGradient(trayX, trayY, trayX, trayY + trayH);
    trayGradient.addColorStop(0, compact ? "rgba(255,255,255,0.72)" : "#fbfdff");
    trayGradient.addColorStop(1, compact ? "rgba(227,235,239,0.72)" : "#e7eff3");
    ctx.fillStyle = trayGradient;
    roundedRect(trayX, trayY, trayW, trayH, 8);
    ctx.fill();
    ctx.shadowColor = "transparent";
    ctx.strokeStyle = "rgba(87, 104, 116, 0.24)";
    ctx.stroke();

    ctx.fillStyle = "rgba(63, 81, 91, 0.08)";
    roundedRect(trayX + trayW - 44, trayY + 16, 24, trayH - 32, 8);
    ctx.fill();
    ctx.fillStyle = "rgba(87, 184, 167, 0.08)";
    roundedRect(trayX + 10, trayY + 10, trayW - 20, trayH - 20, 6);
    ctx.fill();

    for (let i = 0; i < g.rows; i += 1) {
      const y = g.startY + g.stepY * i;
      ctx.strokeStyle = "rgba(75, 90, 98, 0.22)";
      ctx.lineWidth = Math.max(5, g.slotGap * 0.22);
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(g.lineStartX, y);
      ctx.lineTo(g.lineEndX, y);
      ctx.stroke();
      ctx.strokeStyle = "rgba(255,255,255,0.58)";
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(g.lineStartX + 2, y - 1);
      ctx.lineTo(g.lineEndX - 2, y - 1);
      ctx.stroke();
    }

    if (color) {
      const now = performance.now() / 680;
      for (let row = 0; row < g.rows; row += 1) {
        for (let col = 0; col < g.cols; col += 1) {
          if (!state.trayMatrix[row]?.[col]) continue;
          const center = trayCellCenter(layout, row, col, compact);
          const seedX = pseudoRandom(`${state.selectedPattern.id}-${state.trayColor}-${state.trayPourId}-${row}-${col}-x`);
          const seedY = pseudoRandom(`${state.selectedPattern.id}-${state.trayColor}-${state.trayPourId}-${row}-${col}-y`);
          const randX = trayX + 20 + seedX * (trayW - 40);
          const randY = trayY + 20 + seedY * (trayH - 54);
          const jitterX = Math.sin(now + row * 0.6 + col * 0.35) * (1 - p) * 6.2;
          const jitterY = Math.cos(now * 0.8 + row * 0.4 + col * 0.45) * (1 - p) * 5.1;
          const x = lerp(randX, center.x, p) + jitterX;
          const y = lerp(randY, center.y, p) + jitterY;
          drawBead(ctx, x, y, beadR, color, 0, false);
        }
      }
    }

    if (!color || state.trayBeans <= 0) {
      ctx.fillStyle = "rgba(75, 90, 98, 0.28)";
      ctx.font = "700 18px Avenir Next, PingFang SC, Hiragino Sans GB, Microsoft YaHei, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("空", trayX + trayW / 2, trayY + trayH / 2 + 6);
      ctx.textAlign = "left";
    }

    if (color) {
      ctx.fillStyle = "rgba(38, 36, 43, 0.11)";
      roundedRect(trayX + 18, trayY + trayH - 30, trayW - 36, 7, 4);
      ctx.fill();
      ctx.fillStyle = progress >= 70 ? "#57b8a7" : progress >= 35 ? "#d99b3d" : "#e7645f";
      roundedRect(trayX + 18, trayY + trayH - 30, (trayW - 36) * (progress / 100), 7, 4);
      ctx.fill();
    }

    const dump = trayDumpButtonRect(layout);
    const hoverDump = state.phase === "place" && pointInTrayDumpButton(state.pointer.x, state.pointer.y);
    ctx.fillStyle = hoverDump ? "rgba(231, 100, 95, 0.22)" : "rgba(255,255,255,0.85)";
    roundedRect(dump.x, dump.y, dump.w, dump.h, 7);
    ctx.fill();
    ctx.strokeStyle = color ? "rgba(189, 72, 67, 0.62)" : "rgba(122, 130, 140, 0.42)";
    ctx.lineWidth = 1.3;
    roundedRect(dump.x, dump.y, dump.w, dump.h, 7);
    ctx.stroke();
    ctx.strokeStyle = color ? "rgba(189, 72, 67, 0.88)" : "rgba(122, 130, 140, 0.65)";
    ctx.fillStyle = "transparent";
    ctx.lineWidth = 1.9;
    ctx.lineCap = "round";
    const cx = dump.x + dump.w / 2;
    const cy = dump.y + dump.h / 2 + 1;
    ctx.beginPath();
    ctx.moveTo(cx - 5.5, cy - 5);
    ctx.lineTo(cx + 5.5, cy - 5);
    ctx.moveTo(cx - 4.2, cy - 5);
    ctx.lineTo(cx - 3, cy + 4.8);
    ctx.moveTo(cx, cy - 5);
    ctx.lineTo(cx, cy + 5.2);
    ctx.moveTo(cx + 4.2, cy - 5);
    ctx.lineTo(cx + 3, cy + 4.8);
    ctx.moveTo(cx - 1.8, cy - 7.2);
    ctx.lineTo(cx + 1.8, cy - 7.2);
    ctx.stroke();

    ctx.fillStyle = "rgba(38, 36, 43, 0.72)";
    ctx.font = "700 13px Avenir Next, PingFang SC, Hiragino Sans GB, Microsoft YaHei, sans-serif";
    if (color) {
      ctx.fillText(`豆筛 ${beadLabel(color)} · ${state.trayBeans}颗 · ${Math.round(progress)}%`, trayX + 18, trayY + trayH - 14);
    } else {
      ctx.fillText("豆筛 空", trayX + 18, trayY + trayH - 14);
    }
    ctx.restore();
  }

  function visibleTraySeedCount() {
    return state.trayBeans;
  }

  function drawReferenceSheet(layout) {
    const ctx = scene;
    const { refX, refY, refW, refH } = layout;
    if (!refW || !refH) return;
    const pattern = state.selectedPattern;
    const sheetPad = 12;
    const gridSize = Math.min(refH - sheetPad * 2, refW * 0.36);
    const gridX = refX + sheetPad;
    const gridY = refY + (refH - gridSize) / 2;
    const cell = gridSize / pattern.size;

    ctx.save();
    ctx.shadowColor = "rgba(38, 36, 43, 0.13)";
    ctx.shadowBlur = 18;
    ctx.shadowOffsetY = 9;
    ctx.fillStyle = "#fffdf8";
    roundedRect(refX, refY, refW, refH, 8);
    ctx.fill();
    ctx.shadowColor = "transparent";
    ctx.strokeStyle = "rgba(111, 105, 92, 0.2)";
    ctx.stroke();
    ctx.fillStyle = "rgba(216, 170, 92, 0.24)";
    roundedRect(refX + 14, refY - 4, 48, 12, 3);
    ctx.fill();
    roundedRect(refX + refW - 62, refY - 4, 48, 12, 3);
    ctx.fill();

    ctx.fillStyle = "#f7f4ec";
    roundedRect(gridX - 5, gridY - 5, gridSize + 10, gridSize + 10, 5);
    ctx.fill();
    const map = getPatternColorMap(pattern);
    pattern.rows.forEach((row, y) => {
      [...row].forEach((sourceCode, x) => {
        ctx.strokeStyle = "rgba(103, 98, 86, 0.12)";
        ctx.lineWidth = 0.7;
        ctx.strokeRect(gridX + x * cell, gridY + y * cell, cell, cell);
        if (sourceCode === ".") return;
        const code = map[sourceCode] || sourceCode;
        ctx.fillStyle = palette[code];
        ctx.fillRect(gridX + x * cell + 0.5, gridY + y * cell + 0.5, Math.max(1, cell - 1), Math.max(1, cell - 1));
      });
    });

    const textX = gridX + gridSize + 14;
    ctx.fillStyle = "#26242b";
    ctx.font = "800 16px Avenir Next, PingFang SC, Hiragino Sans GB, Microsoft YaHei, sans-serif";
    ctx.fillText("图纸", textX, refY + 30);
    ctx.font = "700 14px Avenir Next, PingFang SC, Hiragino Sans GB, Microsoft YaHei, sans-serif";
    ctx.fillText(pattern.name, textX, refY + 54);
    ctx.fillStyle = "#686572";
    ctx.font = "12px Avenir Next, PingFang SC, Hiragino Sans GB, Microsoft YaHei, sans-serif";
    ctx.fillText(`${pattern.size}x${pattern.size} · ${getTargetTotal()} 颗`, textX, refY + 76);

    const counts = getTargetCounts(pattern);
    const legendCols = refW - (textX - refX) > 178 ? 2 : 1;
    const legendGap = legendCols === 2 ? 76 : 0;
    const maxLegend = legendCols * 3;
    const colors = getPatternColors(pattern).slice(0, maxLegend);
    colors.forEach((code, i) => {
      const x = textX + (i % legendCols) * legendGap;
      const y = refY + 96 + Math.floor(i / legendCols) * 16;
      ctx.fillStyle = palette[code];
      ctx.beginPath();
      ctx.arc(x, y - 4, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#686572";
      ctx.fillText(`${beadIds[code] || code} x${counts[code] || 0}`, x + 9, y);
    });
    const remaining = getPatternColors(pattern).length - colors.length;
    if (remaining > 0) {
      ctx.fillStyle = "#8a8792";
      ctx.fillText(`+${remaining}`, textX + (legendCols - 1) * legendGap + 46, refY + 128);
    }
    ctx.restore();
  }

  function drawIronLayer(layout) {
    const ctx = scene;
    const { boardX, boardY, boardSize, cell } = layout;
    const stats = heatStats();
    ctx.save();
    ctx.fillStyle = "rgba(255, 255, 255, 0.42)";
    roundedRect(boardX - 2, boardY - 2, boardSize + 4, boardSize + 4, 7);
    ctx.fill();
    ctx.strokeStyle = "rgba(150, 132, 98, 0.18)";
    ctx.lineWidth = 1.2;
    for (let i = 0; i < 7; i += 1) {
      const y = boardY + 18 + i * (boardSize - 36) / 6;
      ctx.beginPath();
      ctx.moveTo(boardX + 10, y + Math.sin(i) * 3);
      ctx.bezierCurveTo(boardX + boardSize * 0.34, y - 7, boardX + boardSize * 0.62, y + 8, boardX + boardSize - 10, y - 2);
      ctx.stroke();
    }

    for (let y = 0; y < state.selectedPattern.size; y += 1) {
      for (let x = 0; x < state.selectedPattern.size; x += 1) {
        const index = indexFor(x, y);
        if (!state.placed[index]) continue;
        const heat = state.heat[index] || 0;
        if (heat < 8) continue;
        ctx.globalAlpha = clamp(heat / 110, 0, 0.55);
        ctx.fillStyle = heat > 108 ? "#e7645f" : heat > 72 ? "#d99b3d" : "#57b8a7";
        ctx.fillRect(boardX + x * cell + 2, boardY + y * cell + 2, cell - 4, cell - 4);
      }
    }
    ctx.globalAlpha = 1;
    if (state.emptyIronEaster) {
      const cx = boardX + boardSize * 0.5;
      const cy = boardY + boardSize * 0.5;
      ctx.save();
      ctx.globalAlpha = 0.24;
      ctx.fillStyle = "#d9dadd";
      roundedPath(ctx, cx - boardSize * 0.14, cy - boardSize * 0.14, boardSize * 0.28, boardSize * 0.28, boardSize * 0.014);
      ctx.fill();
      ctx.globalAlpha = 0.38;
      ctx.strokeStyle = "rgba(88, 95, 105, 0.32)";
      ctx.lineWidth = Math.max(1.5, boardSize * 0.006);
      roundedPath(ctx, cx - boardSize * 0.1, cy - boardSize * 0.1, boardSize * 0.2, boardSize * 0.2, boardSize * 0.008);
      ctx.stroke();
      ctx.restore();
    }

    if (state.ironPos) {
      drawIron(state.ironPos.x, state.ironPos.y, stats.over > 0 ? "#e7645f" : "#4d77b8");
    } else {
      drawIron(boardX + boardSize + 42, boardY + 64, "#4d77b8");
    }
    ctx.restore();
  }

  function drawIron(x, y, color) {
    const ctx = scene;
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(-0.14);
    ctx.shadowColor = "rgba(38, 36, 43, 0.22)";
    ctx.shadowBlur = 16;
    ctx.shadowOffsetY = 9;
    ctx.fillStyle = "#f4f7fa";
    roundedRect(-42, -25, 84, 50, 8);
    ctx.fill();
    ctx.shadowColor = "transparent";
    ctx.fillStyle = "#d7e0e5";
    roundedRect(-40, 11, 80, 15, 7);
    ctx.fill();
    ctx.fillStyle = color;
    roundedRect(-30, -15, 60, 30, 6);
    ctx.fill();
    ctx.fillStyle = "rgba(255,255,255,0.34)";
    roundedRect(-24, -10, 28, 6, 3);
    ctx.fill();
    ctx.strokeStyle = "rgba(38, 36, 43, 0.2)";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(-22, -22);
    ctx.quadraticCurveTo(0, -45, 22, -22);
    ctx.stroke();
    ctx.restore();
  }

  function drawCoolingLayer(layout) {
    const ctx = scene;
    const { boardX, boardY, boardSize } = layout;
    ctx.save();
    ctx.fillStyle = `rgba(128, 201, 222, ${0.08 + state.cooling / 280})`;
    roundedRect(boardX - 10, boardY - 10, boardSize + 20, boardSize + 20, 8);
    ctx.fill();
    ctx.strokeStyle = `rgba(77, 119, 184, ${0.12 + state.cooling / 520})`;
    ctx.lineWidth = 2;
    for (let i = 0; i < 5; i += 1) {
      const y = boardY + 28 + i * (boardSize - 56) / 4;
      ctx.beginPath();
      ctx.moveTo(boardX + 18, y);
      ctx.bezierCurveTo(boardX + boardSize * 0.28, y - 10, boardX + boardSize * 0.63, y + 12, boardX + boardSize - 18, y - 4);
      ctx.stroke();
    }
    if (state.flattening > 5) {
      ctx.shadowColor = "rgba(38, 36, 43, 0.18)";
      ctx.shadowBlur = 18;
      ctx.shadowOffsetY = 10;
      ctx.fillStyle = "rgba(50, 58, 68, 0.16)";
      roundedRect(boardX + 20, boardY + boardSize * 0.32, boardSize - 40, boardSize * 0.26, 6);
      ctx.fill();
      ctx.shadowColor = "transparent";
      ctx.fillStyle = "rgba(255,255,255,0.28)";
      ctx.fillRect(boardX + 32, boardY + boardSize * 0.35, boardSize - 64, 4);
      ctx.fillStyle = "rgba(38,36,43,0.16)";
      ctx.fillRect(boardX + 34, boardY + boardSize * 0.32, 8, boardSize * 0.26);
    }
    ctx.restore();
  }

  function drawFinishLayer(layout) {
    const ctx = scene;
    const { boardX, boardY, boardSize } = layout;
    ctx.save();
    ctx.shadowColor = "rgba(38, 36, 43, 0.18)";
    ctx.shadowBlur = 22;
    ctx.shadowOffsetY = 12;
    ctx.fillStyle = "rgba(255,255,255,0.28)";
    roundedRect(boardX + boardSize - 74, boardY + boardSize - 42, 62, 28, 6);
    ctx.fill();
    ctx.shadowColor = "transparent";
    ctx.fillStyle = "#26242b";
    ctx.font = "800 13px Avenir Next, PingFang SC, Hiragino Sans GB, Microsoft YaHei, sans-serif";
    ctx.fillText(`评级 ${finalGrade()}`, boardX + boardSize - 64, boardY + boardSize - 23);
    ctx.restore();
  }

  function drawBead(ctx, x, y, r, code, heat = 0, fused = false) {
    const base = palette[code] || "#999";
    const color = fusedColor(code, heat);
    const pressRaw = fused ? ((state.phase === "cool" || state.phase === "finish") ? clamp(state.flattening / 100, 0, 1) : 0) : 0;
    const heatWeight = clamp((heat - 28) / 46, 0, 1);
    const pressBoost = pressRaw * (0.12 + heatWeight * 0.88);
    const flatten = fused ? clamp(heat / 180 + pressBoost * 0.16, 0, 0.3) : 0;
    const square = fused ? clamp((heat - 34) / 62 + pressBoost * 0.64, 0, 1) : 0;
    const spread = easeOut(square);
    const beadW = r * lerp(2.04, 2.28, spread);
    const beadH = r * lerp(1.96, 2.18, clamp(spread - flatten * 0.25, 0, 1));
    const corner = lerp(r, r * 0.16, spread);
    ctx.save();
    ctx.fillStyle = "rgba(0,0,0,0.12)";
    if (square > 0.02) {
      roundedPath(ctx, x - beadW / 2 + r * 0.08, y - beadH / 2 + r * 0.13, beadW, beadH, corner);
      ctx.fill();
    } else {
      ctx.beginPath();
      ctx.ellipse(x + r * 0.08, y + r * 0.13, r * (0.98 + flatten), r * (0.86 - flatten * 0.2), 0, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.fillStyle = color;
    if (square > 0.02) {
      roundedPath(ctx, x - beadW / 2, y - beadH / 2, beadW, beadH, corner);
      ctx.fill();
    } else {
      ctx.beginPath();
      ctx.ellipse(x, y, r * (1.02 + flatten), r * (0.98 - flatten * 0.12), 0, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.fillStyle = "rgba(255,255,255,0.35)";
    ctx.beginPath();
    ctx.arc(x - r * 0.28, y - r * 0.28, r * lerp(0.25, 0.14, spread), 0, Math.PI * 2);
    ctx.fill();
    const holeFade = fused ? clamp((heat - 42) / 52 + pressBoost * 0.95, 0, 1) : 0;
    const holeR = r * clamp(0.39 - heat / 250 - pressBoost * 0.18, 0, 0.39);
    if (holeR > r * 0.035 && holeFade < 0.98) {
      const holeColor = mixColor("#f6f8fa", color, holeFade);
      ctx.globalAlpha = 1 - holeFade * 0.72;
      ctx.fillStyle = heat > 112 ? mixColor(base, "#6b4b44", 0.35) : holeColor;
      if (square > 0.58 && heat < 108) {
        roundedPath(ctx, x - holeR, y - holeR, holeR * 2, holeR * 2, holeR * 0.38);
        ctx.fill();
      } else {
        ctx.beginPath();
        ctx.arc(x, y, holeR, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    }
    ctx.strokeStyle = "rgba(0,0,0,0.12)";
    ctx.lineWidth = Math.max(1, r * 0.07);
    if (square > 0.02) {
      roundedPath(ctx, x - beadW / 2, y - beadH / 2, beadW, beadH, corner);
      ctx.stroke();
    } else {
      ctx.beginPath();
      ctx.arc(x, y, r * 0.98, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.restore();
  }

  function drawPegInBead(ctx, x, y, r, heat = 0, fused = false) {
    const pressRaw = fused ? ((state.phase === "cool" || state.phase === "finish") ? clamp(state.flattening / 100, 0, 1) : 0) : 0;
    const heatWeight = clamp((heat - 28) / 46, 0, 1);
    const pressBoost = pressRaw * (0.12 + heatWeight * 0.88);
    const holeFade = fused ? clamp((heat - 42) / 52 + pressBoost * 0.95, 0, 1) : 0;
    const holeR = r * clamp(0.39 - heat / 250 - pressBoost * 0.18, 0, 0.39);
    if (holeR <= r * 0.035 || holeFade >= 0.98) return;
    const pegR = holeR * 0.8;
    ctx.save();
    ctx.globalAlpha = 1 - holeFade * 0.66;
    ctx.fillStyle = "rgba(99, 112, 126, 0.5)";
    ctx.beginPath();
    ctx.arc(x, y, pegR, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "rgba(255,255,255,0.42)";
    ctx.beginPath();
    ctx.arc(x - pegR * 0.22, y - pegR * 0.22, pegR * 0.36, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  function fusedColor(code, heat) {
    const base = palette[code] || "#999";
    const hotAmount = clamp((heat - 60) / 70, 0, 0.45);
    return heat > 60 ? mixColor(base, "#f2a36d", hotAmount) : base;
  }

  function roundedRect(x, y, w, h, r) {
    const ctx = scene;
    const radius = Math.min(r, w / 2, h / 2);
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + w - radius, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + radius);
    ctx.lineTo(x + w, y + h - radius);
    ctx.quadraticCurveTo(x + w, y + h, x + w - radius, y + h);
    ctx.lineTo(x + radius, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
  }

  function roundedPath(ctx, x, y, w, h, r) {
    const radius = Math.min(r, w / 2, h / 2);
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + w - radius, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + radius);
    ctx.lineTo(x + w, y + h - radius);
    ctx.quadraticCurveTo(x + w, y + h, x + w - radius, y + h);
    ctx.lineTo(x + radius, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
  }

  function wrapText(text, x, y, maxWidth, lineHeight) {
    const ctx = scene;
    let line = "";
    const chars = [...text];
    chars.forEach((char) => {
      const test = line + char;
      if (ctx.measureText(test).width > maxWidth && line) {
        ctx.fillText(line, x, y);
        line = char;
        y += lineHeight;
      } else {
        line = test;
      }
    });
    if (line) ctx.fillText(line, x, y);
  }

  function drawPreview() {
    setupHiDpiCanvas(previewCanvas, preview);
    const rect = previewCanvas.getBoundingClientRect();
    const w = rect.width;
    const h = rect.height;
    preview.clearRect(0, 0, w, h);
    preview.fillStyle = "#f7f8fa";
    preview.fillRect(0, 0, w, h);
    const pattern = state.selectedPattern;
    const cell = Math.floor(Math.min((w - 28) / pattern.size, (h - 28) / pattern.size));
    const x0 = (w - cell * pattern.size) / 2;
    const y0 = (h - cell * pattern.size) / 2;
    preview.save();
    preview.fillStyle = "#fff";
    roundedPath(preview, x0 - 8, y0 - 8, cell * pattern.size + 16, cell * pattern.size + 16, 8);
    preview.fill();
    const map = getPatternColorMap(pattern);
    for (let y = 0; y < pattern.size; y += 1) {
      for (let x = 0; x < pattern.size; x += 1) {
        const sourceCode = pattern.rows[y][x];
        if (sourceCode === ".") continue;
        const code = map[sourceCode] || sourceCode;
        preview.fillStyle = palette[code];
        preview.fillRect(x0 + x * cell, y0 + y * cell, cell - 1, cell - 1);
      }
    }
    preview.restore();
  }

  function renderUI() {
    renderPatterns();
    renderPhases();
    renderControls();
    renderToolRack();
    renderPalette();
    renderMeters();
    renderSharePanel();
    renderCustomStats();
    renderCollection();
    const counts = getTargetCounts();
    const colorCount = Object.keys(counts).length;
    els.patternMeta.textContent = `${state.selectedPattern.size}x${state.selectedPattern.size}`;
    els.phaseMeta.textContent = phases.find((phase) => phase.id === state.phase)?.name || "";
    els.targetCount.textContent = `${getTargetTotal()} 颗 / ${colorCount} 色`;
    els.collectionCount.textContent = String(collection.length);
    els.colorMeta.textContent = beadLabel(state.selectedColor);
    els.scoreMeta.textContent = scoreLabel();
    if (els.sandboxButton) {
      els.sandboxButton.textContent = state.sandboxMode ? "沙盒开" : "沙盒关";
      els.sandboxButton.classList.toggle("active", state.sandboxMode);
    }
    if (els.bgThemeSelect) els.bgThemeSelect.value = state.bgTheme;
    els.statusLine.textContent = statusText();
    const showPlacementUi = state.phase === "place";
    if (els.toolRack) els.toolRack.style.display = showPlacementUi ? "" : "none";
    if (els.colorPalette) els.colorPalette.style.display = showPlacementUi ? "" : "none";
    if (els.colorMeta) els.colorMeta.style.display = showPlacementUi ? "" : "none";
    if (els.toolMeta) els.toolMeta.style.display = showPlacementUi ? "" : "none";
    if (state.remapModalOpen) renderRemapModal();
  }

  function renderPatterns() {
    els.patternList.innerHTML = "";
    patterns.forEach((pattern) => {
      const displayPattern = resizePattern(pattern, state.patternSize);
      const button = document.createElement("button");
      button.className = `pattern-card${baseIdFor(state.selectedPattern) === pattern.id ? " active" : ""}`;
      button.type = "button";
      button.innerHTML = `
        <canvas class="pattern-thumb" width="58" height="58" aria-hidden="true"></canvas>
        <span><strong>${pattern.name}</strong><span>${normalizeCraft(pattern.craft)} · ${displayPattern.size}x${displayPattern.size} · ${pattern.note}</span></span>
      `;
      button.addEventListener("click", () => {
        loadPattern(resizePattern(pattern, state.patternSize), state.phase !== "choose");
        if (state.phase !== "choose") setPhase("place");
        showToast(`已换成 ${pattern.name}`);
      });
      els.patternList.appendChild(button);
      drawPatternThumb(button.querySelector("canvas"), displayPattern);
    });
  }

  function drawPatternThumb(canvas, pattern) {
    const ctx = canvas.getContext("2d");
    const cell = Math.floor(canvas.width / pattern.size);
    const offset = Math.floor((canvas.width - cell * pattern.size) / 2);
    const map = getPatternColorMap(pattern);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#f4f6f8";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    pattern.rows.forEach((row, y) => {
      [...row].forEach((sourceCode, x) => {
        if (sourceCode === ".") return;
        const code = map[sourceCode] || sourceCode;
        ctx.fillStyle = palette[code];
        ctx.fillRect(offset + x * cell, offset + y * cell, Math.max(1, cell - 1), Math.max(1, cell - 1));
      });
    });
  }

  function loadImageFromDataUrl(dataUrl) {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = reject;
      image.src = dataUrl;
    });
  }

  async function reconvertCustomPatternAtSize(basePattern, size, keepPhase = false) {
    try {
      const image = await loadImageFromDataUrl(basePattern.sourceImageDataUrl);
      const removeWhite = basePattern.sourceRemoveWhite !== false;
      const result = convertImageToPattern(image, { removeWhite, size });
      const rows = result.rows;
      const beadCount = rows.join("").replace(/\./g, "").length;
      if (!beadCount) {
        showToast("这个尺寸下识别不到可用豆子。");
        return;
      }
      const updated = {
        ...basePattern,
        size,
        rows,
        sourceRows: rows,
        sourceSize: size,
        conversionStats: result.stats,
        note: `图片自动转色号 · ${size}x${size}`,
      };
      const idx = patterns.findIndex((item) => baseIdFor(item) === baseIdFor(basePattern));
      if (idx >= 0) patterns[idx] = updated;
      state.lastConversionStats = result.stats;
      loadPattern(updated, keepPhase);
      showToast(`已按 ${size}x${size} 重新识别图片图纸。`);
    } catch (error) {
      showToast("图片重新识别失败。");
    }
  }

  function handleCustomImage(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const sourceImageDataUrl = String(reader.result || "");
        const image = await loadImageFromDataUrl(sourceImageDataUrl);
        const size = normalizePatternSize(els.patternSizeInput.value || state.patternSize);
        const removeWhite = els.customWhiteToggle.checked;
        setSizeControls(size);
        const result = convertImageToPattern(image, {
          removeWhite,
          size,
        });
        const rows = result.rows;
        const beadCount = rows.join("").replace(/\./g, "").length;
        if (!beadCount) {
          showToast("这张图转换后没有可用豆子。");
          return;
        }
        const pattern = {
          id: `custom-${Date.now()}`,
          name: `自定义图纸 ${patterns.filter((item) => item.id.startsWith("custom-")).length + 1}`,
          size,
          craft: "原版",
          rows,
          sourceRows: rows,
          sourceSize: size,
          sourceImageDataUrl,
          sourceRemoveWhite: removeWhite,
          conversionStats: result.stats,
          note: "图片自动转色号",
        };
        state.lastConversionStats = result.stats;
        patterns.unshift(pattern);
        loadPattern(pattern);
        showToast(`自定义图纸已生成：${result.stats.total}颗 / ${result.stats.colors.length}色。`);
      } catch (error) {
        showToast("图片读取失败。");
      } finally {
        event.target.value = "";
      }
    };
    reader.onerror = () => {
      showToast("图片读取失败。");
      event.target.value = "";
    };
    reader.readAsDataURL(file);
  }

  function imageToPatternRows(image, removeWhite, size = state.patternSize) {
    return convertImageToPattern(image, { removeWhite, size }).rows;
  }

  function convertImageToPattern(image, options = {}) {
    const targetSize = normalizePatternSize(options.size || state.patternSize);
    const removeWhite = options.removeWhite !== false;
    const raw = sampleImageToRgba(image, targetSize, false);
    const rawMask = buildActiveMask(raw, removeWhite);
    const sourceProfile = estimateSourceProfile(raw, rawMask);
    const working = edgeAwarePreprocessRgba(raw, targetSize, sourceProfile);
    const mask = buildActiveMask(working, removeWhite);
    const activePixels = [];
    for (let i = 0; i < targetSize * targetSize; i += 1) {
      if (!mask[i]) continue;
      const offset = i * 4;
      const r = working[offset];
      const g = working[offset + 1];
      const b = working[offset + 2];
      activePixels.push({ index: i, r, g, b, lab: rgbToOklab(r, g, b) });
    }
    if (!activePixels.length) {
      return makeConversionResult(Array(targetSize).fill(".".repeat(targetSize)), targetSize, 0, 0);
    }

    const maxColors = chooseSimplifiedColorCount(targetSize, activePixels.length, sourceProfile);
    const clusters = simplifyColors(activePixels, maxColors);
    const paletteHint = getPaletteLimitHint(sourceProfile);
    const finalPaletteCap = Math.min(
      chooseFinalPaletteCap(targetSize, activePixels.length, sourceProfile, clusters.length),
      paletteHint
    );
    const lockedPalette = selectPaletteCodes(clusters, finalPaletteCap);
    const grid = Array(targetSize * targetSize).fill(".");
    activePixels.forEach((pixel) => {
      grid[pixel.index] = nearestCodeFromSet(pixel.lab, lockedPalette);
    });

    const preCleanupColorCount = countGridColors(grid).colors.length;
    let cleaned = removeSpeckles(grid, targetSize, 2, sourceProfile);
    if (sourceProfile.logoLike || targetSize <= 16) {
      cleaned = bridgeLineGaps(cleaned, targetSize, sourceProfile);
    }
    cleaned = cleanupSmallComponents(cleaned, targetSize, sourceProfile);
    cleaned = consensusRebalanceGrid(cleaned, targetSize, sourceProfile);
    cleaned = collapseToPalette(cleaned, targetSize, lockedPalette);
    cleaned = compressNeutralPalette(cleaned, targetSize, sourceProfile, lockedPalette);
    const rows = gridToRows(cleaned, targetSize);
    return makeConversionResult(rows, targetSize, clusters.length, preCleanupColorCount, sourceProfile);
  }

  function sampleImageToRgba(image, targetSize, smooth = true) {
    const canvas = document.createElement("canvas");
    canvas.width = targetSize;
    canvas.height = targetSize;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    ctx.imageSmoothingEnabled = smooth;
    ctx.imageSmoothingQuality = smooth ? "high" : "low";
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, targetSize, targetSize);
    const crop = Math.min(image.width, image.height);
    const sx = (image.width - crop) / 2;
    const sy = (image.height - crop) / 2;
    ctx.drawImage(image, sx, sy, crop, crop, 0, 0, targetSize, targetSize);
    return Array.from(ctx.getImageData(0, 0, targetSize, targetSize).data);
  }

  function edgeAwarePreprocessRgba(raw, size, sourceProfile) {
    const softened = sourceProfile.useDenoise ? smoothRgba(raw, size) : raw.slice();
    const out = softened.slice();
    const edgeThreshold = sourceProfile.logoLike ? 16 : sourceProfile.likelyPixelArt ? 18 : 13;
    for (let y = 0; y < size; y += 1) {
      for (let x = 0; x < size; x += 1) {
        const idx = (y * size + x) * 4;
        const center = [softened[idx], softened[idx + 1], softened[idx + 2]];
        let gx = 0;
        let gy = 0;
        let sumR = 0;
        let sumG = 0;
        let sumB = 0;
        let weightSum = 0;
        for (let dy = -1; dy <= 1; dy += 1) {
          for (let dx = -1; dx <= 1; dx += 1) {
            const nx = clamp(x + dx, 0, size - 1);
            const ny = clamp(y + dy, 0, size - 1);
            const nIdx = (ny * size + nx) * 4;
            const nr = softened[nIdx];
            const ng = softened[nIdx + 1];
            const nb = softened[nIdx + 2];
            const nGray = nr * 0.299 + ng * 0.587 + nb * 0.114;
            const wx = dx === 0 ? 2 : 1;
            const wy = dy === 0 ? 2 : 1;
            gx += dx * nGray * wy;
            gy += dy * nGray * wx;
            const colorDiff = Math.abs(nr - center[0]) + Math.abs(ng - center[1]) + Math.abs(nb - center[2]);
            const spatial = dx === 0 && dy === 0 ? 2.2 : (Math.abs(dx) + Math.abs(dy) === 1 ? 1.1 : 0.7);
            const w = spatial * (1 / (1 + colorDiff / 42));
            sumR += nr * w;
            sumG += ng * w;
            sumB += nb * w;
            weightSum += w;
          }
        }
        const edgeMag = Math.hypot(gx, gy);
        if (edgeMag > edgeThreshold) continue;
        out[idx] = Math.round(sumR / weightSum);
        out[idx + 1] = Math.round(sumG / weightSum);
        out[idx + 2] = Math.round(sumB / weightSum);
      }
    }
    return out;
  }

  function smoothRgba(data, size) {
    const out = data.slice();
    const kernel = [[1, 2, 1], [2, 5, 2], [1, 2, 1]];
    for (let y = 0; y < size; y += 1) {
      for (let x = 0; x < size; x += 1) {
        let wr = 0;
        let r = 0;
        let g = 0;
        let b = 0;
        let a = 0;
        for (let ky = -1; ky <= 1; ky += 1) {
          for (let kx = -1; kx <= 1; kx += 1) {
            const nx = clamp(x + kx, 0, size - 1);
            const ny = clamp(y + ky, 0, size - 1);
            const weight = kernel[ky + 1][kx + 1];
            const offset = (ny * size + nx) * 4;
            r += data[offset] * weight;
            g += data[offset + 1] * weight;
            b += data[offset + 2] * weight;
            a += data[offset + 3] * weight;
            wr += weight;
          }
        }
        const offset = (y * size + x) * 4;
        out[offset] = Math.round(r / wr);
        out[offset + 1] = Math.round(g / wr);
        out[offset + 2] = Math.round(b / wr);
        out[offset + 3] = Math.round(a / wr);
      }
    }
    return out;
  }

  function buildActiveMask(data, removeWhite) {
    const mask = [];
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const a = data[i + 3];
      const light = r > 242 && g > 242 && b > 242;
      const lowSaturation = Math.max(r, g, b) - Math.min(r, g, b) < 8;
      mask.push(!(a < 48 || (removeWhite && light && lowSaturation)));
    }
    return mask;
  }

  function estimateSourceProfile(data, mask) {
    const activeCount = mask.reduce((sum, active) => sum + (active ? 1 : 0), 0);
    if (!activeCount) {
      return {
        activeCount: 0,
        coarseCount: 0,
        significantCount: 0,
        topTwoRatio: 0,
        likelyPixelArt: true,
        useDenoise: false,
      };
    }
    const bins = countCoarseColorBins(data, mask, 4);
    const sorted = [...bins.values()].sort((a, b) => b - a);
    const threshold = Math.max(2, Math.round(activeCount * 0.007));
    const significantCount = sorted.filter((count) => count >= threshold).length || 1;
    const topTwoRatio = ((sorted[0] || 0) + (sorted[1] || 0)) / activeCount;
    const coarseCount = bins.size;
    const likelyPixelArt = coarseCount <= 18 || (coarseCount <= 26 && topTwoRatio >= 0.78);
    const logoLike = significantCount <= 4 && topTwoRatio >= 0.72 && coarseCount <= 28;
    const useDenoise = !likelyPixelArt && coarseCount >= 12;
    return {
      activeCount,
      coarseCount,
      significantCount,
      topTwoRatio,
      likelyPixelArt,
      logoLike,
      useDenoise,
    };
  }

  function countCoarseColorBins(data, mask, shift) {
    const bins = new Map();
    let maskIndex = 0;
    for (let i = 0; i < data.length; i += 4) {
      if (!mask[maskIndex]) {
        maskIndex += 1;
        continue;
      }
      const key = `${data[i] >> shift}:${data[i + 1] >> shift}:${data[i + 2] >> shift}`;
      bins.set(key, (bins.get(key) || 0) + 1);
      maskIndex += 1;
    }
    return bins;
  }

  function chooseSimplifiedColorCount(size, activeCount, sourceProfile) {
    if (sourceProfile.logoLike) {
      if (sourceProfile.topTwoRatio >= 0.86) return 2;
      return 3;
    }
    const density = activeCount / (size * size);
    const hint = sourceProfile.significantCount;
    if (sourceProfile.topTwoRatio >= 0.88) return 2;
    if (sourceProfile.topTwoRatio >= 0.78 && hint <= 8) return 3;
    if (hint <= 2) return 2;
    if (hint <= 4) return clamp(hint + (sourceProfile.likelyPixelArt ? 0 : 1), 2, 5);
    let maxColors = size <= 16 ? 5 : size <= 24 ? 7 : size <= 32 ? 8 : 10;
    if (density < 0.3) maxColors -= 1;
    if (sourceProfile.coarseCount > 40) maxColors += 1;
    if (sourceProfile.coarseCount < 14) maxColors -= 1;
    if (sourceProfile.likelyPixelArt) maxColors = Math.min(maxColors, hint + 1);
    maxColors = Math.min(maxColors, hint + 2);
    return clamp(maxColors, 2, 12);
  }

  function chooseFinalPaletteCap(size, activeCount, sourceProfile, clusterCount) {
    if (sourceProfile.logoLike) {
      return clamp(sourceProfile.topTwoRatio >= 0.86 ? 2 : 3, 2, 3);
    }
    const hint = sourceProfile.significantCount;
    if (sourceProfile.topTwoRatio >= 0.88) return 2;
    if (sourceProfile.topTwoRatio >= 0.78 && hint <= 8) return 3;
    if (hint <= 2) return 2;
    if (hint <= 4) return clamp(hint + (sourceProfile.likelyPixelArt ? 0 : 1), 2, 4);
    let cap = size <= 24 ? 6 : size <= 32 ? 8 : 10;
    if (activeCount < 160) cap = Math.min(cap, 5);
    if (sourceProfile.likelyPixelArt) cap = Math.min(cap, hint + 1);
    cap = Math.min(cap, clusterCount, hint + 1);
    return clamp(cap, 2, 10);
  }

  function getPaletteLimitHint(sourceProfile) {
    if (sourceProfile.significantCount <= 2) return 2;
    if (sourceProfile.topTwoRatio >= 0.9) return 2;
    if (sourceProfile.topTwoRatio >= 0.8 && sourceProfile.significantCount <= 6) return 3;
    if (sourceProfile.likelyPixelArt && sourceProfile.significantCount <= 8) return 4;
    return 10;
  }

  function selectPaletteCodes(clusters, paletteCap) {
    const weighted = new Map();
    clusters.forEach((cluster) => {
      const code = nearestColorCode(cluster.r, cluster.g, cluster.b);
      weighted.set(code, (weighted.get(code) || 0) + (cluster.count || 1));
    });
    const sorted = [...weighted.entries()]
      .sort((a, b) => b[1] - a[1] || (beadIds[a[0]] || a[0]).localeCompare(beadIds[b[0]] || b[0], "zh-Hans-CN", { numeric: true }))
      .map(([code]) => code);
    const selected = sorted.slice(0, Math.max(1, paletteCap));
    return selected.length ? selected : ["K"];
  }

  function nearestCodeFromSet(lab, codes) {
    let best = codes[0] || "K";
    let bestDistance = Infinity;
    codes.forEach((code) => {
      const distance = oklabDistance(lab, beadOklab(code));
      if (distance < bestDistance) {
        bestDistance = distance;
        best = code;
      }
    });
    return best;
  }

  function simplifyColors(pixels, maxColors) {
    const seeds = seedClusters(pixels, maxColors);
    let clusters = seeds.map((seed) => ({ ...seed }));
    for (let iteration = 0; iteration < 6; iteration += 1) {
      const sums = clusters.map(() => ({ l: 0, a: 0, b: 0, r: 0, g: 0, blue: 0, count: 0 }));
      pixels.forEach((pixel) => {
        let best = 0;
        let bestDistance = Infinity;
        clusters.forEach((cluster, index) => {
          const distance = oklabDistance(pixel.lab, cluster.lab);
          if (distance < bestDistance) {
            bestDistance = distance;
            best = index;
          }
        });
        const sum = sums[best];
        sum.l += pixel.lab.l;
        sum.a += pixel.lab.a;
        sum.b += pixel.lab.b;
        sum.r += pixel.r;
        sum.g += pixel.g;
        sum.blue += pixel.b;
        sum.count += 1;
      });
      clusters = clusters.map((cluster, index) => {
        const sum = sums[index];
        if (!sum.count) return cluster;
        const lab = { l: sum.l / sum.count, a: sum.a / sum.count, b: sum.b / sum.count };
        return { lab, r: Math.round(sum.r / sum.count), g: Math.round(sum.g / sum.count), b: Math.round(sum.blue / sum.count), count: sum.count };
      });
    }
    return clusters.filter((cluster) => cluster.count !== 0);
  }

  function seedClusters(pixels, maxColors) {
    const buckets = new Map();
    pixels.forEach((pixel) => {
      const key = `${pixel.r >> 4}:${pixel.g >> 4}:${pixel.b >> 4}`;
      const bucket = buckets.get(key) || { r: 0, g: 0, b: 0, l: 0, aa: 0, bb: 0, count: 0 };
      bucket.r += pixel.r;
      bucket.g += pixel.g;
      bucket.b += pixel.b;
      bucket.l += pixel.lab.l;
      bucket.aa += pixel.lab.a;
      bucket.bb += pixel.lab.b;
      bucket.count += 1;
      buckets.set(key, bucket);
    });
    const candidates = [...buckets.values()].map((bucket) => ({
      r: Math.round(bucket.r / bucket.count),
      g: Math.round(bucket.g / bucket.count),
      b: Math.round(bucket.b / bucket.count),
      lab: { l: bucket.l / bucket.count, a: bucket.aa / bucket.count, b: bucket.bb / bucket.count },
      count: bucket.count,
    })).sort((a, b) => b.count - a.count);
    const seeds = [];
    candidates.forEach((candidate) => {
      if (seeds.length >= maxColors) return;
      const farEnough = seeds.every((seed) => oklabDistance(seed.lab, candidate.lab) > 0.0009);
      if (farEnough || seeds.length < Math.min(4, maxColors)) seeds.push(candidate);
    });
    for (const candidate of candidates) {
      if (seeds.length >= maxColors) break;
      if (!seeds.includes(candidate)) seeds.push(candidate);
    }
    return seeds.length ? seeds : [pixels[0]];
  }

  function removeSpeckles(grid, size, rounds, sourceProfile = null) {
    let current = grid.slice();
    const strict = getPaletteLimitHint(sourceProfile || { significantCount: 99, topTwoRatio: 0, likelyPixelArt: false }) <= 3;
    const effectiveRounds = (sourceProfile?.logoLike || (sourceProfile?.likelyPixelArt && size <= 16))
      ? Math.min(1, rounds)
      : rounds;
    for (let round = 0; round < effectiveRounds; round += 1) {
      const next = current.slice();
      for (let y = 0; y < size; y += 1) {
        for (let x = 0; x < size; x += 1) {
          const index = y * size + x;
          const code = current[index];
          const neighbors = neighborCodes(current, size, x, y, true);
          const majority = majorityCode(neighbors);
          if (!majority) continue;
          const same8 = neighbors.filter((item) => item === code).length;
          const same4 = neighborCodes(current, size, x, y, false).filter((item) => item === code).length;
          const majorityCount = neighbors.filter((item) => item === majority).length;
          if (code !== "." && shouldKeepIsolatedFeature(current, size, x, y, code, neighbors, same4, same8)) continue;
          if (sourceProfile?.logoLike && code !== ".") {
            continue;
          }
          if (code === "." && majority !== "." && majorityCount >= 7) {
            next[index] = majority;
          } else if (code !== "." && same8 <= 1 && same4 === 0 && majorityCount >= (strict ? 6 : 5)) {
            next[index] = majority;
          }
        }
      }
      current = next;
    }
    return current;
  }

  function cleanupSmallComponents(grid, size, sourceProfile = null) {
    if (sourceProfile?.logoLike && size <= 20) {
      return grid.slice();
    }
    const out = grid.slice();
    const visited = Array(size * size).fill(false);
    const paletteHint = getPaletteLimitHint(sourceProfile || { significantCount: 99, topTwoRatio: 0, likelyPixelArt: false });
    let threshold = size <= 24 ? 1 : size <= 36 ? 2 : 3;
    if (sourceProfile?.likelyPixelArt) threshold = Math.max(1, threshold - 1);
    if (paletteHint <= 3) threshold = 1;
    for (let index = 0; index < out.length; index += 1) {
      if (visited[index] || out[index] === ".") continue;
      const component = collectComponent(out, size, index, visited);
      if (component.cells.length > threshold) continue;
      if (shouldPreserveSmallDetail(out, size, component, sourceProfile)) continue;
      const boundary = [];
      component.cells.forEach((cellIndex) => {
        const x = cellIndex % size;
        const y = Math.floor(cellIndex / size);
        boundary.push(...neighborCodes(out, size, x, y, false).filter((code) => code !== component.code));
      });
      const replacement = majorityCode(boundary) || ".";
      component.cells.forEach((cellIndex) => {
        out[cellIndex] = replacement;
      });
    }
    return out;
  }

  function consensusRebalanceGrid(grid, size, sourceProfile = null) {
    const out = grid.slice();
    const passes = sourceProfile?.logoLike ? 1 : (size <= 20 ? 2 : 3);
    const softThreshold = sourceProfile?.logoLike ? 0.0026 : 0.0019;
    for (let pass = 0; pass < passes; pass += 1) {
      const next = out.slice();
      for (let y = 1; y < size - 1; y += 1) {
        for (let x = 1; x < size - 1; x += 1) {
          const index = y * size + x;
          const code = out[index];
          if (code === ".") continue;
          const neighbors = neighborCodes(out, size, x, y, true).filter((item) => item !== ".");
          if (neighbors.length < 5) continue;
          const counts = {};
          neighbors.forEach((n) => {
            counts[n] = (counts[n] || 0) + 1;
          });
          const candidate = Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0];
          if (!candidate || candidate === code) continue;
          const support = counts[candidate] || 0;
          if (support < (sourceProfile?.logoLike ? 7 : 6)) continue;
          const dist = oklabDistance(beadOklab(candidate), beadOklab(code));
          if (dist <= softThreshold || support >= 8) {
            next[index] = candidate;
          }
        }
      }
      for (let i = 0; i < out.length; i += 1) out[i] = next[i];
    }
    return out;
  }

  function bridgeLineGaps(grid, size, sourceProfile = null) {
    if (!sourceProfile?.logoLike && size > 16) return grid;
    const out = grid.slice();
    for (let y = 1; y < size - 1; y += 1) {
      for (let x = 1; x < size - 1; x += 1) {
        const index = y * size + x;
        if (out[index] !== ".") continue;
        const left = out[y * size + (x - 1)];
        const right = out[y * size + (x + 1)];
        const up = out[(y - 1) * size + x];
        const down = out[(y + 1) * size + x];
        const ul = out[(y - 1) * size + (x - 1)];
        const ur = out[(y - 1) * size + (x + 1)];
        const dl = out[(y + 1) * size + (x - 1)];
        const dr = out[(y + 1) * size + (x + 1)];
        if (left !== "." && left === right) {
          out[index] = left;
          continue;
        }
        if (up !== "." && up === down) {
          out[index] = up;
          continue;
        }
        if (ul !== "." && ul === dr) {
          out[index] = ul;
          continue;
        }
        if (ur !== "." && ur === dl) {
          out[index] = ur;
        }
      }
    }
    return out;
  }

  function collectComponent(grid, size, start, visited) {
    const code = grid[start];
    const cells = [];
    const stack = [start];
    visited[start] = true;
    while (stack.length) {
      const index = stack.pop();
      cells.push(index);
      const x = index % size;
      const y = Math.floor(index / size);
      [[1, 0], [-1, 0], [0, 1], [0, -1]].forEach(([dx, dy]) => {
        const nx = x + dx;
        const ny = y + dy;
        if (nx < 0 || ny < 0 || nx >= size || ny >= size) return;
        const nextIndex = ny * size + nx;
        if (!visited[nextIndex] && grid[nextIndex] === code) {
          visited[nextIndex] = true;
          stack.push(nextIndex);
        }
      });
    }
    return { code, cells };
  }

  function shouldPreserveSmallDetail(grid, size, component, sourceProfile = null) {
    const darkDetail = new Set(["K", "k", "D", "d", "N", "n", "b"]);
    const lowPalette = getPaletteLimitHint(sourceProfile || { significantCount: 99, topTwoRatio: 0, likelyPixelArt: false }) <= 3;
    const xs = component.cells.map((index) => index % size);
    const ys = component.cells.map((index) => Math.floor(index / size));
    const lineLike = component.cells.length >= 2 && (new Set(xs).size > 1 || new Set(ys).size > 1);
    let nonDotBoundary = 0;
    let boundary = 0;
    component.cells.forEach((cellIndex) => {
      const x = cellIndex % size;
      const y = Math.floor(cellIndex / size);
      neighborCodes(grid, size, x, y, false).forEach((code) => {
        if (code === component.code) return;
        boundary += 1;
        if (code !== ".") nonDotBoundary += 1;
      });
    });
    const embedded = boundary > 0 && nonDotBoundary / boundary >= 0.6;
    const singlePixel = component.cells.length === 1 && darkDetail.has(component.code) && embedded;
    const highContrastDot = component.cells.length === 1 && hasStrongContrastBoundary(grid, size, component);
    const lowPaletteDot = lowPalette && component.cells.length === 1 && embedded;
    return lineLike || singlePixel || highContrastDot || lowPaletteDot || (darkDetail.has(component.code) && embedded);
  }

  function shouldKeepIsolatedFeature(grid, size, x, y, code, neighbors8, same4, same8) {
    if (same4 >= 1 || same8 >= 2) return false;
    const darkDetail = new Set(["K", "k", "D", "d", "N", "n", "b"]);
    if (!darkDetail.has(code)) return false;
    const nonDot = neighbors8.filter((item) => item !== ".").length;
    if (nonDot < 5) return false;
    const distinct = new Set(neighbors8.filter((item) => item !== "." && item !== code));
    if (distinct.size > 2) return false;
    return hasStrongContrastBoundary(grid, size, { code, cells: [y * size + x] });
  }

  function hasStrongContrastBoundary(grid, size, component) {
    let contrasted = 0;
    let sampled = 0;
    const selfLab = beadOklab(component.code);
    component.cells.forEach((cellIndex) => {
      const x = cellIndex % size;
      const y = Math.floor(cellIndex / size);
      neighborCodes(grid, size, x, y, true).forEach((code) => {
        if (code === "." || code === component.code) return;
        sampled += 1;
        if (oklabDistance(selfLab, beadOklab(code)) > 0.0038) contrasted += 1;
      });
    });
    return sampled >= 3 && contrasted / sampled >= 0.6;
  }

  function collapseToPalette(grid, size, paletteCodes) {
    const allowed = new Set(paletteCodes);
    const out = grid.slice();
    for (let i = 0; i < out.length; i += 1) {
      const code = out[i];
      if (code === "." || allowed.has(code)) continue;
      const x = i % size;
      const y = Math.floor(i / size);
      const neighborMajority = majorityCode(
        neighborCodes(out, size, x, y, true).filter((item) => allowed.has(item))
      );
      if (neighborMajority) {
        out[i] = neighborMajority;
        continue;
      }
      const selfLab = beadOklab(code);
      let best = paletteCodes[0] || "K";
      let bestDistance = Infinity;
      paletteCodes.forEach((candidate) => {
        const distance = oklabDistance(selfLab, beadOklab(candidate));
        if (distance < bestDistance) {
          bestDistance = distance;
          best = candidate;
        }
      });
      out[i] = best;
    }
    return out;
  }

  function compressNeutralPalette(grid, size, sourceProfile, paletteCodes) {
    if (!sourceProfile?.logoLike) return grid;
    const neutralCodes = paletteCodes.filter((code) => {
      const rgb = hexToRgb(palette[code]);
      return Math.max(rgb.r, rgb.g, rgb.b) - Math.min(rgb.r, rgb.g, rgb.b) <= 22;
    });
    if (neutralCodes.length < 3) return grid;
    const ranked = neutralCodes
      .map((code) => {
        const rgb = hexToRgb(palette[code]);
        const luma = rgb.r * 0.299 + rgb.g * 0.587 + rgb.b * 0.114;
        return { code, luma };
      })
      .sort((a, b) => a.luma - b.luma);
    const dark = ranked[0];
    const light = ranked[ranked.length - 1];
    if (!dark || !light || dark.code === light.code) return grid;
    const boundary = (dark.luma + light.luma) / 2;
    const neutralSet = new Set(neutralCodes);
    const out = grid.slice();
    for (let i = 0; i < out.length; i += 1) {
      const code = out[i];
      if (!neutralSet.has(code)) continue;
      const rgb = hexToRgb(palette[code]);
      const luma = rgb.r * 0.299 + rgb.g * 0.587 + rgb.b * 0.114;
      out[i] = luma <= boundary ? dark.code : light.code;
    }
    return out;
  }

  function neighborCodes(grid, size, x, y, includeDiagonal) {
    const dirs = includeDiagonal
      ? [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [1, -1], [-1, 1], [-1, -1]]
      : [[1, 0], [-1, 0], [0, 1], [0, -1]];
    const codes = [];
    dirs.forEach(([dx, dy]) => {
      const nx = x + dx;
      const ny = y + dy;
      if (nx < 0 || ny < 0 || nx >= size || ny >= size) return;
      codes.push(grid[ny * size + nx]);
    });
    return codes;
  }

  function majorityCode(codes) {
    if (!codes.length) return null;
    const counts = {};
    codes.forEach((code) => {
      counts[code] = (counts[code] || 0) + 1;
    });
    return Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] || null;
  }

  function gridToRows(grid, size) {
    const rows = [];
    for (let y = 0; y < size; y += 1) {
      rows.push(grid.slice(y * size, y * size + size).join(""));
    }
    return rows;
  }

  function countGridColors(grid) {
    const counts = {};
    grid.forEach((code) => {
      if (code !== ".") counts[code] = (counts[code] || 0) + 1;
    });
    const colors = Object.entries(counts)
      .map(([code, count]) => ({ code, count }))
      .sort((a, b) => b.count - a.count || (beadIds[a.code] || a.code).localeCompare(beadIds[b.code] || b.code, "zh-Hans-CN", { numeric: true }));
    return {
      colors,
      total: colors.reduce((sum, item) => sum + item.count, 0),
    };
  }

  function makeConversionResult(rows, size, simplifiedColorCount, preCleanupColorCount, sourceProfile = null) {
    const stats = countGridColors(rows.join("").split(""));
    return {
      rows,
      stats: {
        size,
        total: stats.total,
        colors: stats.colors,
        simplifiedColorCount,
        preCleanupColorCount,
        sourceSignificantCount: sourceProfile?.significantCount || stats.colors.length,
        sourceCoarseCount: sourceProfile?.coarseCount || stats.colors.length,
        denoised: Boolean(sourceProfile?.useDenoise),
      },
    };
  }

  function nearestColorCode(r, g, b) {
    const lab = rgbToOklab(r, g, b);
    let best = "K";
    let bestDistance = Infinity;
    allColorCodes().forEach((code) => {
      const distance = oklabDistance(lab, beadOklab(code));
      if (distance < bestDistance) {
        bestDistance = distance;
        best = code;
      }
    });
    return best;
  }

  function hexToRgb(hex) {
    const value = parseInt(hex.slice(1), 16);
    return {
      r: (value >> 16) & 255,
      g: (value >> 8) & 255,
      b: value & 255,
    };
  }

  const beadOklabCache = {};

  function beadOklab(code) {
    if (!beadOklabCache[code]) {
      const rgb = hexToRgb(palette[code]);
      beadOklabCache[code] = rgbToOklab(rgb.r, rgb.g, rgb.b);
    }
    return beadOklabCache[code];
  }

  function renderPhases() {
    const activeIndex = phases.findIndex((phase) => phase.id === state.phase);
    els.phaseList.innerHTML = "";
    phases.forEach((phase, index) => {
      const row = document.createElement("div");
      row.className = `phase-item${index === activeIndex ? " active" : ""}${index < activeIndex ? " done" : ""}`;
      row.innerHTML = `<span class="dot">${index + 1}</span><span>${phase.name}</span>`;
      els.phaseList.appendChild(row);
    });
  }

  function isCompactControlsMode() {
    return window.matchMedia("(max-width: 860px)").matches;
  }

  function openControlsModal() {
    if (!els.controlsModal) return;
    state.controlsModalOpen = true;
    els.controlsModal.classList.add("show");
    els.controlsModal.setAttribute("aria-hidden", "false");
  }

  function closeControlsModal() {
    if (!els.controlsModal) return;
    state.controlsModalOpen = false;
    els.controlsModal.classList.remove("show");
    els.controlsModal.setAttribute("aria-hidden", "true");
  }

  function finalizeControlsLayout(compactControls) {
    if (!els.controlsModalBody || !els.stageControls) return;
    if (!compactControls) {
      els.controlsModalBody.innerHTML = "";
      closeControlsModal();
      return;
    }
    const nodes = [...els.stageControls.childNodes];
    els.controlsModalBody.innerHTML = "";
    nodes.forEach((node) => els.controlsModalBody.appendChild(node));
    const openButton = document.createElement("button");
    openButton.type = "button";
    openButton.className = "controls-entry primary-button";
    openButton.textContent = "打开操作面板";
    openButton.addEventListener("click", () => openControlsModal());
    els.stageControls.appendChild(openButton);
  }

  function startIroning(forceSpill = false) {
    if (placedCount() <= 0) {
      state.emptyIronEaster = true;
      showToast("空板熨烫彩蛋触发：出现隐藏压纹。");
      setPhase("iron");
      return;
    }
    if (state.spill && !forceSpill) {
      showToast("还有倒下的豆子未处理。");
      return;
    }
    if (state.spill && forceSpill) {
      state.spillDamages.push({
        index: state.spill.index,
        code: state.spill.code,
      });
      state.heat[state.spill.index] = Math.max(state.heat[state.spill.index] || 0, 118);
      state.spill = null;
      state.warp = clamp(state.warp + 8, 0, 80);
      showToast("你选择直接熨烫，倒下的豆子已经糊在一起。");
    }
    setPhase("iron");
  }

  function renderControls() {
    els.stageControls.innerHTML = "";
    const compactControls = isCompactControlsMode();
    els.controlTitle.textContent = phases.find((phase) => phase.id === state.phase)?.name || "工具台";
    els.toolMeta.textContent = state.phase === "place"
      ? (state.tool === "needle"
        ? `豆针 · 载豆 ${state.needleLoaded}/${needleCapacity()}`
        : `镊子${state.tweezerBead ? ` · ${beadIds[state.tweezerBead]}` : " · 空夹"}`)
      : "";

    if (state.phase === "choose") {
      addHint(state.sandboxMode
        ? "沙盒模式已开启：进工作台后可自由拼摆与熨烫，不受图纸检查限制。"
        : "图纸决定需要的色号和颗数。进入工作台后，豆盒、豆筛、针和镊子会同时可用。");
      addRemapOpenButton();
      addButton("开始拼豆", "primary-button", () => setPhase("place"));
      finalizeControlsLayout(compactControls);
      return;
    }

    if (state.phase === "place") {
      addHint(state.spill
        ? "有一颗豆子倒下来卡住了（横躺在板面上）。你可以先继续摆放，熨烫前记得处理。"
        : (state.tool === "needle"
          ? `点击豆盒色卡会倒入豆筛；点豆筛某一条槽给豆针上豆（只取这一条，最多 ${needleCapacity()} 颗）；拖动豆筛会抖动整理。当前载豆 ${state.needleLoaded}/${needleCapacity()}，豆筛剩余 ${state.trayBeans}。`
          : (state.tweezerBead ? `镊子正夹着 ${beadLabel(state.tweezerBead)}，点击空格放下。` : "镊子可从豆筛点取一颗，或从板面夹起一颗，再放到目标位置。")));
      addRemapOpenButton();
      addControlRow([
        ["检查作品", "primary-button", () => setPhase("inspect")],
        ["清空板面", "danger-button", () => clearBoard()],
      ]);
      finalizeControlsLayout(compactControls);
      return;
    }

    if (state.phase === "inspect") {
      const summary = inspectionSummary();
      addHint(state.sandboxMode
        ? "沙盒模式不做漏放/错色校验，可直接进入熨烫。"
        : `漏放 ${summary.missing}，错色 ${summary.wrong}，多放 ${summary.extra}。`);
      if (state.spill) {
        addHint("还有倒下的豆子没夹起。继续熨烫会把这颗豆糊在板面上。");
      }
      addControlRow([
        [state.showHints ? "隐藏提示" : "显示提示", "", () => {
          state.showHints = !state.showHints;
          markDirty();
        }],
        ["返回修正", "", () => setPhase("place")],
      ]);
      if (state.spill) {
        addControlRow([
          ["先去夹起", "", () => setPhase("place")],
          ["仍然熨烫", "danger-button", () => startIroning(true)],
        ]);
      } else {
        addButton("盖纸熨烫", "primary-button", () => startIroning(false), !state.sandboxMode && state.errors.length > 0 && placementAccuracy() < 0.72);
      }
      if (!state.sandboxMode && state.errors.length > 0 && placementAccuracy() < 0.72) {
        addHint("准确度低于 72% 时先修正，再进入熨烫。");
      }
      finalizeControlsLayout(compactControls);
      return;
    }

    if (state.phase === "iron") {
      addHint("按住并移动熨斗。慢、热、重会增加粘连，也更容易糊孔和变形。");
      addSlider("温度", "temperature", 35, 90, state.temperature, (value) => {
        state.temperature = Number(value);
      });
      addSlider("压力", "pressure", 25, 90, state.pressure, (value) => {
        state.pressure = Number(value);
      });
      addControlRow([
        ["查看检查", "", () => setPhase("inspect")],
        ["进入冷却", "primary-button", () => setPhase("cool")],
      ]);
      finalizeControlsLayout(compactControls);
      return;
    }

    if (state.phase === "cool") {
      addHint("冷却过程中压平可以减少翘曲。温度稳定后就能取下作品。");
      addControlRow([
        ["压平", "", () => pressFlat()],
        ["翻面再熨", "", () => flipAndIron(), state.flipCount >= 1],
      ]);
      addButton("完成收藏", "primary-button", () => completeWork());
      if (state.cooling < 78) addHint("提前取下也能完成，但冷却不足会影响最终评级。");
      finalizeControlsLayout(compactControls);
      return;
    }

    if (state.phase === "finish") {
      if (state.conceptEaster) {
        const full = state.conceptEasterType === "full";
        addHint(full ? "满板彩蛋已解锁。" : "空板彩蛋已解锁。");
        addHint(`隐藏成就：${full ? fullBoardAchievement : conceptAchievement}`);
        addControlRow([
          ["保存作品", "primary-button", () => saveCurrentWork()],
          ["再做一张", "", () => {
            loadPattern(state.selectedPattern);
            setPhase("choose");
          }],
        ]);
        finalizeControlsLayout(compactControls);
        return;
      }
      addCraftToggle();
      addHint(`评级 ${finalGrade()}。可以换一种成品形式后再次保存。`);
      addControlRow([
        ["保存作品", "primary-button", () => saveCurrentWork()],
        ["再做一张", "", () => {
          loadPattern(state.selectedPattern);
          setPhase("choose");
        }],
      ]);
      finalizeControlsLayout(compactControls);
    }
  }

  function addButton(label, className, handler, disabled = false) {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = label;
    button.className = className || "";
    button.disabled = disabled;
    button.addEventListener("click", handler);
    els.stageControls.appendChild(button);
  }

  function addControlRow(items, extraClass = "") {
    const row = document.createElement("div");
    row.className = `control-row ${extraClass}`.trim();
    items.forEach(([label, className, handler, disabled]) => {
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = label;
      button.className = className || "";
      button.disabled = Boolean(disabled);
      button.addEventListener("click", handler);
      row.appendChild(button);
    });
    els.stageControls.appendChild(row);
  }

  function addHint(text) {
    const box = document.createElement("div");
    box.className = "hint-box";
    box.textContent = text;
    els.stageControls.appendChild(box);
  }

  function addRemapOpenButton() {
    if (!isBuiltInPattern()) return;
    addButton("图纸换色", "", () => openRemapModal());
  }

  function openRemapModal() {
    if (!els.remapModal || !isBuiltInPattern()) return;
    state.remapModalOpen = true;
    renderRemapModal();
    els.remapModal.classList.add("show");
    els.remapModal.setAttribute("aria-hidden", "false");
  }

  function closeRemapModal() {
    if (!els.remapModal) return;
    state.remapModalOpen = false;
    els.remapModal.classList.remove("show");
    els.remapModal.setAttribute("aria-hidden", "true");
  }

  function resetPatternColorMapping() {
    if (!isBuiltInPattern()) return;
    const map = state.patternColorMap || {};
    const sourceColors = getSourcePatternColors();
    const changed = sourceColors.some((code) => (map[code] || code) !== code);
    if (!changed) {
      showToast("当前就是原始配色。");
      return;
    }
    sourceColors.forEach((code) => {
      map[code] = code;
    });
    const patternId = baseIdFor(state.selectedPattern);
    state.patternColorMaps[patternId] = map;
    if (state.phase !== "choose" && (placedCount() > 0 || state.trayBeans > 0 || state.needleLoaded > 0 || state.tweezerBead || state.spill)) {
      resetPlacementForRemap();
      showToast("已恢复原色，当前摆放已重置。");
    } else {
      showToast("已恢复官方原色。");
    }
    markDirty();
    renderRemapModal();
  }

  function renderRemapModal() {
    if (!els.remapModalBody) return;
    if (!isBuiltInPattern()) {
      els.remapModalBody.innerHTML = "";
      return;
    }
    const sourceColors = getSourcePatternColors();
    const map = state.patternColorMap || {};
    const allCodes = allColorCodes();
    els.remapModalBody.innerHTML = "";
    sourceColors.forEach((sourceCode) => {
      const row = document.createElement("label");
      row.className = "remap-row";
      row.innerHTML = `
        <span class="remap-from">
          <span class="remap-swatch" style="background:${palette[sourceCode]}"></span>
          <span class="remap-label">${beadIds[sourceCode]} ${colorNames[sourceCode]}</span>
        </span>
        <span class="remap-arrow">→</span>
      `;
      const select = document.createElement("select");
      select.className = "remap-select";
      allCodes.forEach((code) => {
        const option = document.createElement("option");
        option.value = code;
        option.textContent = `${beadIds[code]} ${colorNames[code]}`;
        if ((map[sourceCode] || sourceCode) === code) option.selected = true;
        select.appendChild(option);
      });
      select.addEventListener("change", () => {
        setPatternColorMapping(sourceCode, select.value);
        renderRemapModal();
      });
      row.appendChild(select);
      els.remapModalBody.appendChild(row);
    });
  }

  function addToolToggle() {
    const wrap = document.createElement("div");
    wrap.className = "tool-toggle";
    [
      ["needle", "针工具"],
      ["tweezers", "镊子"],
    ].forEach(([tool, label]) => {
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = label;
      button.className = state.tool === tool ? "active" : "";
      button.addEventListener("click", () => {
        state.tool = tool;
        markDirty();
      });
      wrap.appendChild(button);
    });
    els.stageControls.appendChild(wrap);
  }

  function addSlider(label, key, min, max, value, onChange) {
    const field = document.createElement("div");
    field.className = "slider-field";
    field.innerHTML = `<label><span>${label}</span><strong>${value}</strong></label>`;
    const input = document.createElement("input");
    input.type = "range";
    input.min = min;
    input.max = max;
    input.value = value;
    input.addEventListener("input", () => {
      onChange(input.value);
      field.querySelector("strong").textContent = input.value;
    });
    field.appendChild(input);
    els.stageControls.appendChild(field);
  }

  function addCraftToggle() {
    const wrap = document.createElement("div");
    wrap.className = "craft-toggle";
    craftOptions.forEach((craft) => {
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = craft;
      button.className = state.craft === craft ? "active" : "";
      button.addEventListener("click", () => {
        state.craft = craft;
        state.savedCurrent = false;
        markDirty();
      });
      wrap.appendChild(button);
    });
    els.stageControls.appendChild(wrap);
  }

  function renderToolRack() {
    if (!els.toolRack) return;
    if (state.phase !== "place") {
      els.toolRack.innerHTML = "";
      return;
    }
    const trayLabel = state.trayColor ? beadIds[state.trayColor] : "空";
    const needleCap = needleCapacity();
    const needleSlots = Array.from({ length: needleCap }, (_, i) => i < state.needleLoaded ? state.trayColor : null);
    const tweezerSlots = [state.tweezerBead];
    const needleFoot = state.trayColor
      ? `豆筛 ${trayLabel} · 剩余 ${state.trayBeans}`
      : "先倒入一种颜色，再从豆筛取豆";
    const needleFootText = state.spill ? "先用镊子夹起卡住豆" : needleFoot;
    const tweezerFoot = state.tweezerBead
      ? `夹着 ${beadIds[state.tweezerBead]}`
      : `从豆盒夹一颗 ${beadIds[state.selectedColor]}`;
    const styleOptions = Object.entries(toolStyles)
      .map(([id, style]) => `<option value="${id}"${state.toolStyle === id ? " selected" : ""}>${style.name}</option>`)
      .join("");

    els.toolRack.innerHTML = `
      <label class="tool-style-field">
        <span>工具款式</span>
        <select id="toolStyleSelect" aria-label="工具款式">${styleOptions}</select>
      </label>
      <button type="button" class="tool-card${state.tool === "needle" ? " active" : ""}" data-tool="needle">
        <div class="tool-head"><span>豆针</span><span class="tool-count">${state.needleLoaded}/${needleCap}</span></div>
        ${renderBeadStrip(needleSlots)}
        <div class="tool-foot">${needleFootText}</div>
      </button>
      <button type="button" class="tool-card${state.tool === "tweezers" ? " active" : ""}" data-tool="tweezers">
        <div class="tool-head"><span>镊子</span><span class="tool-count">${state.tweezerBead ? "1/1" : "0/1"}</span></div>
        ${renderBeadStrip(tweezerSlots)}
        <div class="tool-foot">${tweezerFoot}</div>
      </button>
    `;
    els.toolRack.querySelectorAll("[data-tool]").forEach((button) => {
      button.addEventListener("click", () => {
        const tool = button.getAttribute("data-tool");
        if (!tool || state.tool === tool) return;
        state.tool = tool;
        markDirty();
      });
    });
    els.toolRack.querySelector("#toolStyleSelect")?.addEventListener("change", (event) => {
      state.toolStyle = event.target.value;
      showToast(`工具换成${currentToolStyle().name}款。`);
      markDirty();
    });
  }

  function renderBeadStrip(codes) {
    return `
      <div class="bead-strip" style="grid-template-columns: repeat(${Math.max(1, codes.length)}, minmax(0, 1fr));">
        ${codes.map((code) => `
          <span class="bead-slot${code ? " loaded" : ""}" style="${code ? `background:${palette[code]};` : ""}"></span>
        `).join("")}
      </div>
    `;
  }

  function renderPalette() {
    if (state.phase !== "place") {
      els.colorPalette.innerHTML = "";
      return;
    }
    els.colorPalette.innerHTML = "";
    const counts = getTargetCounts();
    allColorCodes().forEach((code) => {
      const placed = state.placed.filter((item) => item === code).length;
      const needed = counts[code] || 0;
      const inPattern = needed > 0;
      const remaining = Math.max(0, needed - placed);
      const isSelected = state.selectedColor === code;
      const button = document.createElement("button");
      button.className = `color-chip${isSelected ? " active" : ""}${inPattern ? " needed" : ""}${state.tweezerBead === code ? " held" : ""}`;
      button.type = "button";
      button.title = `${beadLabel(code)}：${placed}/${needed}`;
      button.innerHTML = `
        <span class="swatch" style="background:${palette[code]}"></span>
        <span class="chip-label">${beadIds[code] || code}</span>
        ${inPattern && isSelected ? `<span class="chip-count">${remaining}</span>` : ""}
      `;
      button.addEventListener("click", () => {
        state.selectedColor = code;
        if (state.phase === "place") pourSelectedColor();
        markDirty();
      });
      els.colorPalette.appendChild(button);
    });
  }

  function renderMeters() {
    els.meterPanel.innerHTML = "";
    const counts = getTargetCounts();
    const sorted = state.trayColor ? state.trayProgress : 0;
    const placed = placementAccuracy() * 100;
    const heat = heatStats();
    addMeter("豆筛整齐度", sorted, sorted < 45 ? "warn" : "");
    addMeter("摆放准确度", placed, placed < 75 ? "warn" : "");
    addMeter("熨烫粘连", heat.bondedPercent, heat.bondedPercent < 58 ? "warn" : "");
    addMeter("过熔风险", heat.overPercent, heat.overPercent > 18 ? "hot" : "");
    addMeter("冷却定型", state.cooling, state.cooling < 78 ? "warn" : "");
    addMeter("平整度", clamp(100 - state.warp, 0, 100), state.warp > 34 ? "warn" : "");

    const selectedNeed = counts[state.selectedColor] || 0;
    const selectedPlaced = state.placed.filter((item) => item === state.selectedColor).length;
    const trayText = state.trayColor ? ` · 筛 ${beadIds[state.trayColor]} ${state.trayBeans}颗` : " · 筛空";
    const heldText = state.tweezerBead ? ` · 镊 ${beadIds[state.tweezerBead]}` : "";
    const needleText = ` · 针 ${state.needleLoaded}/${needleCapacity()}`;
    els.colorMeta.textContent = `${beadIds[state.selectedColor]} ${selectedPlaced}/${selectedNeed}${trayText}${needleText}${heldText}`;
  }

  function addMeter(label, value, kind = "") {
    const meter = document.createElement("div");
    meter.className = "meter";
    const rounded = Math.round(clamp(value, 0, 100));
    meter.innerHTML = `
      <div class="meter-head"><span>${label}</span><strong>${rounded}%</strong></div>
      <div class="meter-track"><div class="meter-fill ${kind}" style="width:${rounded}%"></div></div>
    `;
    els.meterPanel.appendChild(meter);
  }

  function renderSharePanel() {
    els.sharePanel.innerHTML = "";
    const card = document.createElement("div");
    card.className = "share-card";
    card.innerHTML = `
      <strong>${state.selectedPattern.name}</strong>
      <span>${normalizeCraft(state.selectedPattern.craft)} · 评级 ${state.phase === "finish" ? finalGrade() : scoreLabel()} · ${placedCount()}/${getTargetTotal()} 颗</span>
    `;
    els.sharePanel.appendChild(card);

    const row = document.createElement("div");
    row.className = "control-row";
    [
      ["导出竖图", () => exportShareImage("portrait")],
      ["导出方图", () => exportShareImage("square")],
    ].forEach(([label, handler]) => {
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = label;
      button.addEventListener("click", handler);
      row.appendChild(button);
    });
    els.sharePanel.appendChild(row);
    addShareButton("复制文案", () => copyShareText());
  }

  function addShareButton(label, handler) {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = label;
    button.addEventListener("click", handler);
    els.sharePanel.appendChild(button);
  }

  function renderCustomStats() {
    const stats = state.selectedPattern.conversionStats;
    if (!stats) {
      els.customStats.textContent = "导入图片后显示色号统计";
      return;
    }
    const list = stats.colors.slice(0, 8).map((item) => `${beadIds[item.code]} ${item.count}`).join(" · ");
    els.customStats.innerHTML = `
      <strong>${stats.size}x${stats.size} · ${stats.total}颗 · ${stats.colors.length}色</strong>
      <span>源图估计 ${stats.sourceSignificantCount} 色（粗分箱 ${stats.sourceCoarseCount}） · 聚类 ${stats.simplifiedColorCount} 色 · 清理前 ${stats.preCleanupColorCount} 色</span>
      <span>${stats.denoised ? "已启用轻度降噪" : "保留像素边缘（未降噪）"}</span>
      <span>${list}${stats.colors.length > 8 ? " · ..." : ""}</span>
    `;
  }

  function renderCollection() {
    els.collectionPanel.innerHTML = "";
    if (!collection.length) {
      const empty = document.createElement("div");
      empty.className = "empty-state";
      empty.textContent = "还没有完成品";
      els.collectionPanel.appendChild(empty);
      return;
    }
    collection.slice(0, 5).forEach((item) => {
      const row = document.createElement("div");
      row.className = "collection-item";
      row.innerHTML = `<strong>${item.name}</strong><span>${normalizeCraft(item.craft)} · 评级 ${item.grade} · ${item.date}</span>`;
      els.collectionPanel.appendChild(row);
    });
  }

  function pourSelectedColor() {
    if (state.trayColor && state.trayColor !== state.selectedColor && state.trayBeans > 0) {
      showToast(`豆筛里还有 ${beadLabel(state.trayColor)}，先倒掉才能换色。`);
      return;
    }
    if (state.trayColor === state.selectedColor && state.trayBeans > 0) {
      showToast(`${beadLabel(state.trayColor)} 已在豆筛中。`);
      return;
    }
    state.trayColor = state.selectedColor;
    state.trayCapacity = calcTrayFillAmount(state.trayColor);
    state.trayPourId += 1;
    state.trayMatrix = makeTrayMatrix(state.trayCapacity);
    syncTrayBeans();
    state.traySeeds = makeTraySeeds(state.trayColor, state.trayCapacity);
    state.trayProgress = Math.max(state.trayProgress, 4);
    state.needleLoaded = 0;
    showToast(`${beadLabel(state.trayColor)} 倒入豆筛（${state.trayBeans} 颗）。`);
    markDirty();
  }

  function improveSort(amount, message) {
    if (!state.trayColor) {
      showToast("豆筛是空的，先从豆盒倒入一种颜色。");
      return;
    }
    state.trayProgress = clamp(state.trayProgress + amount, 0, 100);
    showToast(message);
    markDirty();
  }

  function dumpTray() {
    if (!state.trayColor) {
      showToast("豆筛已经是空的。");
      return;
    }
    const oldColor = state.trayColor;
    state.trayColor = null;
    state.trayProgress = 0;
    state.trayBeans = 0;
    state.trayCapacity = 0;
    state.trayMatrix = makeTrayMatrix(0);
    state.needleLoaded = 0;
    state.traySeeds = [];
    showToast(`${beadLabel(oldColor)} 已倒回豆盒。`);
    markDirty();
  }

  function loadNeedleFromTray(rowIndex = null) {
    if (!state.trayColor || state.trayBeans <= 0) {
      showToast("豆筛里没有可取的豆子。");
      return;
    }
    if (state.trayProgress <= needleLoadSortThreshold) {
      showToast(`豆筛整齐度要大于 ${needleLoadSortThreshold}% 才能给豆针上豆。`);
      return;
    }
    const cap = needleCapacity();
    const need = cap - state.needleLoaded;
    if (need <= 0) {
      showToast("豆针已装满。");
      return;
    }
    const row = rowIndex === null || rowIndex === undefined
      ? 0
      : clamp(rowIndex, 0, Math.max(0, state.trayMatrix.length - 1));
    const trayRow = state.trayMatrix[row] || [];
    let grabbed = 0;
    for (let col = trayRow.length - 1; col >= 0 && grabbed < need; col -= 1) {
      if (!trayRow[col]) continue;
      trayRow[col] = false;
      grabbed += 1;
    }
    if (!grabbed) {
      showToast("这一条槽已经没豆子了，点另一条槽。");
      return;
    }
    state.needleLoaded += grabbed;
    syncTrayBeans();
    state.trayProgress = clamp(state.trayProgress - grabbed * 0.12, 0, 100);
    showToast(`豆针从第 ${row + 1} 条槽取到 ${grabbed} 颗 ${beadIds[state.trayColor]}。`);
    markDirty();
  }

  function loadTweezersFromTray(rowIndex = null, colIndex = null) {
    if (!state.trayColor || state.trayBeans <= 0) {
      showToast("豆筛里没有可夹的豆子。");
      return;
    }
    if (state.tweezerBead) {
      showToast("镊子上已经夹着一颗，先放下或放回豆盒。");
      return;
    }
    let row = rowIndex;
    let col = colIndex;
    if (row === null || col === null || row === undefined || col === undefined) {
      outer: for (let r = 0; r < state.trayMatrix.length; r += 1) {
        for (let c = 0; c < (state.trayMatrix[r]?.length || 0); c += 1) {
          if (state.trayMatrix[r]?.[c]) {
            row = r;
            col = c;
            break outer;
          }
        }
      }
    }
    if (!state.trayMatrix[row]?.[col]) {
      showToast("点击到的位置没有豆子。");
      return;
    }
    state.trayMatrix[row][col] = false;
    syncTrayBeans();
    state.tweezerBead = state.trayColor;
    state.trayProgress = clamp(state.trayProgress - 0.08, 0, 100);
    showToast(`镊子从豆筛夹起 ${beadLabel(state.tweezerBead)}。`);
    markDirty();
  }

  function handleTrayTap(pos) {
    if (!pos) return;
    setToolPose(pos.x, pos.y);
    const row = trayRowFromPoint(pos.x, pos.y, true);
    const cell = trayCellFromPoint(pos.x, pos.y, true);
    if (state.tool === "needle") {
      if (state.trayProgress <= needleLoadSortThreshold) {
        improveSort(7, `先抖到大于 ${needleLoadSortThreshold}% ，豆针才能上豆。`);
        return;
      }
      loadNeedleFromTray(row);
      return;
    }
    if (!cell) {
      showToast("用镊子时请点在豆子上。");
      return;
    }
    loadTweezersFromTray(cell.row, cell.col);
  }

  function pickTweezerFromBox(code) {
    if (state.tweezerBead) {
      showToast("镊子上已经夹着一颗，先放下或放回豆盒。");
      return;
    }
    state.tweezerBead = code;
    showToast(`镊子夹起 ${beadLabel(code)}。`);
  }

  function toggleTweezerBean() {
    if (state.tweezerBead) {
      const oldColor = state.tweezerBead;
      state.tweezerBead = null;
      showToast(`${beadLabel(oldColor)} 放回豆盒。`);
    } else {
      pickTweezerFromBox(state.selectedColor);
    }
    markDirty();
  }

  function clearBoard() {
    state.placed.fill(null);
    state.heat.fill(0);
    state.errors = [];
    state.cooling = 0;
    state.flattening = 0;
    state.warp = 18;
    state.savedCurrent = false;
    state.spill = null;
    state.spillDamages = [];
    state.fusedPieces = [];
    state.tweezerBead = null;
    state.needleLoaded = 0;
    showToast("板面已清空。");
    markDirty();
  }

  function resetPlacementForRemap() {
    state.placed.fill(null);
    state.heat.fill(0);
    state.errors = [];
    state.showHints = false;
    state.cooling = 0;
    state.flattening = 0;
    state.warp = 18;
    state.flipCount = 0;
    state.savedCurrent = false;
    state.spill = null;
    state.spillDamages = [];
    state.fusedPieces = [];
    state.tweezerBead = null;
    state.needleLoaded = 0;
    state.trayColor = null;
    state.trayProgress = 0;
    state.trayBeans = 0;
    state.trayCapacity = 0;
    state.trayMatrix = makeTrayMatrix(0);
    state.traySeeds = [];
    if (state.phase !== "choose" && state.phase !== "place" && state.phase !== "inspect") {
      setPhase("place");
    }
  }

  function setPatternColorMapping(sourceCode, targetCode) {
    const map = state.patternColorMap || {};
    if (!palette[sourceCode] || !palette[targetCode]) return;
    if (map[sourceCode] === targetCode) return;
    map[sourceCode] = targetCode;
    const patternId = baseIdFor(state.selectedPattern);
    state.patternColorMaps[patternId] = map;
    if (state.phase !== "choose" && (placedCount() > 0 || state.trayBeans > 0 || state.needleLoaded > 0 || state.tweezerBead || state.spill)) {
      resetPlacementForRemap();
      showToast("图纸换色已应用，当前摆放已重置。");
    } else {
      showToast(`已将 ${beadLabel(sourceCode)} 改为 ${beadLabel(targetCode)}。`);
    }
    const available = getPatternColors();
    if (!available.includes(state.selectedColor)) {
      state.selectedColor = available[0] || sourceCode;
    }
    markDirty();
  }

  function placedCount() {
    return state.placed.filter(Boolean).length;
  }

  function pointerToCanvas(event) {
    const rect = sceneCanvas.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
  }

  function boardCellFromPoint(x, y) {
    const layout = currentLayout();
    const { boardX, boardY, boardSize, cell } = layout;
    if (x < boardX || y < boardY || x > boardX + boardSize || y > boardY + boardSize) return null;
    return {
      x: clamp(Math.floor((x - boardX) / cell), 0, state.selectedPattern.size - 1),
      y: clamp(Math.floor((y - boardY) / cell), 0, state.selectedPattern.size - 1),
    };
  }

  function pointInTray(x, y) {
    const layout = currentLayout();
    return x >= layout.trayX && y >= layout.trayY && x <= layout.trayX + layout.trayW && y <= layout.trayY + layout.trayH;
  }

  function trayDumpButtonRect(layout = currentLayout()) {
    const size = clamp(layout.trayW * 0.06, 22, 28);
    return {
      x: layout.trayX + layout.trayW - size - 8,
      y: layout.trayY + 8,
      w: size,
      h: size,
    };
  }

  function pointInTrayDumpButton(x, y) {
    const rect = trayDumpButtonRect();
    return x >= rect.x && y >= rect.y && x <= rect.x + rect.w && y <= rect.y + rect.h;
  }

  function setToolPose(x, y) {
    state.toolPose.x = x;
    state.toolPose.y = y;
    state.toolPose.visible = true;
  }

  function setToolPoseFromCell(x, y) {
    const layout = currentLayout();
    setToolPose(
      layout.boardX + x * layout.cell + layout.cell / 2,
      layout.boardY + y * layout.cell + layout.cell / 2
    );
  }

  function onPointerDown(event) {
    event.preventDefault();
    const pos = pointerToCanvas(event);
    state.pointer.down = true;
    state.pointer.x = pos.x;
    state.pointer.y = pos.y;
    state.pointer.lastX = pos.x;
    state.pointer.lastY = pos.y;
    state.pointer.lastT = performance.now();
    state.lastCellKey = "";
    sceneCanvas.setPointerCapture?.(event.pointerId);

    if (state.phase === "place" && pointInTrayDumpButton(pos.x, pos.y)) {
      dumpTray();
      state.pointer.mode = null;
      state.pointer.trayTapPending = false;
      return;
    }

    if (state.phase === "place" && pointInTray(pos.x, pos.y)) {
      state.pointer.mode = "tray";
      state.pointer.trayTapPending = true;
      return;
    }

    if (state.phase === "place") {
      const cell = boardCellFromPoint(pos.x, pos.y);
      if (cell) {
        state.pointer.mode = "place";
        setToolPoseFromCell(cell.x, cell.y);
        handlePlaceAt(cell.x, cell.y, true);
      }
      return;
    }

    if (state.phase === "iron") {
      const cell = boardCellFromPoint(pos.x, pos.y);
      if (cell) {
        state.pointer.mode = "iron";
        state.ironPos = pos;
        applyIronHeat(pos.x, pos.y, 16, 0);
        markDirty();
      }
    }
  }

  function onPointerMove(event) {
    event.preventDefault();
    const pos = pointerToCanvas(event);
    const dx = pos.x - state.pointer.lastX;
    const dy = pos.y - state.pointer.lastY;
    const dt = Math.max(10, performance.now() - state.pointer.lastT);
    state.pointer.x = pos.x;
    state.pointer.y = pos.y;

    if (state.pointer.down && state.pointer.mode === "tray") {
      const amount = clamp(Math.hypot(dx, dy) / 18, 0, 3.5);
      if (amount > 0.2 && state.trayColor) {
        state.pointer.trayTapPending = false;
        state.trayProgress = clamp(state.trayProgress + amount, 0, 100);
        markDirty();
      }
    }

    if (state.pointer.down && state.pointer.mode === "place") {
      if (Math.abs(dx) > 2 || Math.abs(dy) > 2) {
        state.lastMoveDir = Math.abs(dx) > Math.abs(dy) ? { x: Math.sign(dx) || 1, y: 0 } : { x: 0, y: Math.sign(dy) || 1 };
      }
      const cell = boardCellFromPoint(pos.x, pos.y);
      if (cell) handlePlaceAt(cell.x, cell.y, false);
    }

    if (state.pointer.down && state.pointer.mode === "iron") {
      state.ironPos = pos;
      applyIronHeat(pos.x, pos.y, dt, Math.hypot(dx, dy));
      markDirty();
    }

    state.pointer.lastX = pos.x;
    state.pointer.lastY = pos.y;
    state.pointer.lastT = performance.now();
  }

  function onPointerUp(event) {
    event.preventDefault();
    const pos = pointerToCanvas(event);
    if (state.phase === "place" && state.pointer.mode === "tray" && state.pointer.trayTapPending) {
      handleTrayTap(pos);
    }
    state.pointer.down = false;
    state.pointer.mode = null;
    state.pointer.trayTapPending = false;
    state.lastCellKey = "";
    if (state.phase === "iron") state.ironPos = pos;
    markDirty();
  }

  function handlePlaceAt(x, y, initial) {
    setToolPoseFromCell(x, y);
    const spillKey = state.spill ? `${state.spill.index}:${state.spill.code}` : "-";
    const key = `${x}:${y}:${state.tool}:${state.selectedColor}:${state.trayColor || "-"}:${state.tweezerBead || "-"}:${spillKey}`;
    if (!initial && key === state.lastCellKey) return;
    state.lastCellKey = key;
    if (state.tool === "tweezers") {
      useTweezers(x, y);
      return;
    }
    useNeedle(x, y);
  }

  function useTweezers(x, y) {
    const index = indexFor(x, y);
    if (state.spill && state.spill.index === index) {
      if (state.tweezerBead) {
        showToast("镊子上已经夹着一颗，先放下或放回豆盒。");
        return;
      }
      state.tweezerBead = state.spill.code;
      state.placed[index] = null;
      state.heat[index] = 0;
      state.spill = null;
      state.savedCurrent = false;
      showToast("卡住的豆子已经夹起，可以继续摆放。");
      markDirty();
      return;
    }
    if (state.placed[index]) {
      if (state.tweezerBead) {
        showToast("镊子上已经夹着一颗，先放下或放回豆盒。");
        return;
      }
      state.tweezerBead = state.placed[index];
      state.placed[index] = null;
      state.heat[index] = 0;
      showToast("镊子取下一颗豆子。");
    } else {
      if (!state.tweezerBead) {
        showToast("先从豆盒夹一颗豆子。");
        return;
      }
      state.placed[index] = state.tweezerBead;
      state.tweezerBead = null;
    }
    state.savedCurrent = false;
    markDirty();
  }

  function useNeedle(x, y) {
    if (!state.trayColor) {
      showToast("针工具需要先从豆盒倒豆进豆筛。");
      return;
    }
    if (state.needleLoaded <= 0) {
      showToast("豆针空了，先从豆筛取豆。");
      return;
    }
    const quality = state.trayProgress;
    if (quality < 12) {
      showToast("豆筛还没排齐，先抖动一下。");
      return;
    }
    const spillChance = quality < 45 ? 0.12 : quality < 70 ? 0.07 : 0.035;
    if (!state.spill && Math.random() < spillChance) {
      const spill = createSpillAt(x, y, state.trayColor);
      if (spill) {
        state.spill = spill;
        state.placed[spill.index] = spill.code;
        state.heat[spill.index] = 0;
        state.needleLoaded = Math.max(0, state.needleLoaded - 1);
        state.trayProgress = clamp(state.trayProgress - 0.3, 0, 100);
        showToast("豆子倒下来卡住了，先继续也行，熨烫前记得处理。");
        markDirty();
        return;
      }
      return;
    }
    const cells = [[x, y]];
    if (state.needleTier === 3 && state.needleLoaded > 1) {
      cells.push([x + state.lastMoveDir.x, y + state.lastMoveDir.y]);
    }
    if (state.needleTier === 3 && state.needleLoaded > 2) {
      cells.push([x + state.lastMoveDir.x * 2, y + state.lastMoveDir.y * 2]);
    }
    let placedAny = false;
    let used = 0;
    cells.forEach(([cx, cy]) => {
      if (used >= state.needleLoaded) return;
      if (cx < 0 || cy < 0 || cx >= state.selectedPattern.size || cy >= state.selectedPattern.size) return;
      const index = indexFor(cx, cy);
      if (state.placed[index]) return;
      state.placed[index] = state.trayColor;
      placedAny = true;
      used += 1;
    });
    if (placedAny) {
      state.needleLoaded = Math.max(0, state.needleLoaded - used);
      const drain = Math.max(0.1, used * 0.12);
      state.trayProgress = clamp(state.trayProgress - drain, 0, 100);
      state.savedCurrent = false;
      if (state.needleLoaded <= 0) showToast("豆针已空，请重新取豆。");
      markDirty();
    }
  }

  function createSpillAt(x, y, code) {
    const size = state.selectedPattern.size;
    const spots = [
      [x, y],
      [x + 1, y],
      [x - 1, y],
      [x, y + 1],
      [x, y - 1],
      [x + 1, y + 1],
      [x - 1, y + 1],
      [x + 1, y - 1],
      [x - 1, y - 1],
    ];
    for (let i = 0; i < spots.length; i += 1) {
      const [sx, sy] = spots[i];
      if (sx < 0 || sy < 0 || sx >= size || sy >= size) continue;
      const index = indexFor(sx, sy);
      if (state.placed[index]) continue;
      const jitterSeed = pseudoRandom(`${state.selectedPattern.id}-${index}-${Date.now()}`);
      const orientation = Math.random() < 0.5 ? "h" : "v";
      return { index, code, jitterSeed, orientation };
    }
    return null;
  }

  function applyIronHeat(x, y, dt, distance) {
    const layout = currentLayout();
    const cell = boardCellFromPoint(x, y);
    if (!cell) return;
    const speed = distance / Math.max(dt, 1);
    const speedFactor = clamp(1.42 - speed * 1.45, 0.42, 1.55);
    const pressure = state.pressure / 58;
    const temp = state.temperature / 62;
    const base = (dt / 16) * pressure * temp * speedFactor * 0.6;
    const radius = layout.cell * 1.65;
    const size = state.selectedPattern.size;

    for (let cy = cell.y - 2; cy <= cell.y + 2; cy += 1) {
      for (let cx = cell.x - 2; cx <= cell.x + 2; cx += 1) {
        if (cx < 0 || cy < 0 || cx >= size || cy >= size) continue;
        const index = indexFor(cx, cy);
        if (!state.placed[index]) continue;
        const centerX = layout.boardX + cx * layout.cell + layout.cell / 2;
        const centerY = layout.boardY + cy * layout.cell + layout.cell / 2;
        const falloff = clamp(1 - Math.hypot(centerX - x, centerY - y) / radius, 0, 1);
        const add = base * (0.35 + falloff * 0.9);
        state.heat[index] = clamp((state.heat[index] || 0) + add, 0, 138);
        if (state.heat[index] > 108) state.warp = clamp(state.warp + add * 0.022, 0, 80);
      }
    }
  }

  function runInspection() {
    state.errors = [];
    if (state.sandboxMode) return;
    const size = state.selectedPattern.size;
    for (let y = 0; y < size; y += 1) {
      for (let x = 0; x < size; x += 1) {
        const index = indexFor(x, y);
        const target = targetAt(x, y);
        const placed = state.placed[index];
        if (target && !placed) state.errors.push({ index, type: "missing" });
        if (target && placed && target !== placed) state.errors.push({ index, type: "wrong" });
        if (!target && placed) state.errors.push({ index, type: "extra" });
      }
    }
  }

  function inspectionSummary() {
    return state.errors.reduce((summary, error) => {
      summary[error.type] += 1;
      return summary;
    }, { missing: 0, wrong: 0, extra: 0 });
  }

  function placementAccuracy() {
    if (state.sandboxMode) return 1;
    const total = getTargetTotal();
    if (!total) return 1;
    let correct = 0;
    const size = state.selectedPattern.size;
    for (let y = 0; y < size; y += 1) {
      for (let x = 0; x < size; x += 1) {
        const target = targetAt(x, y);
        if (target && state.placed[indexFor(x, y)] === target) correct += 1;
      }
    }
    return correct / total;
  }

  function heatStats() {
    const total = getTargetTotal();
    let bonded = 0;
    let ideal = 0;
    let over = 0;
    let heated = 0;
    state.heat.forEach((heat, index) => {
      if (!state.placed[index]) return;
      if (heat > 8) heated += 1;
      if (heat >= 38) bonded += 1;
      if (heat >= 52 && heat <= 96) ideal += 1;
      if (heat > 108) over += 1;
    });
    return {
      total,
      bonded,
      ideal,
      over,
      heated,
      bondedPercent: total ? (bonded / total) * 100 : 0,
      idealPercent: total ? (ideal / total) * 100 : 0,
      overPercent: total ? (over / total) * 100 : 0,
    };
  }

  function estimateWarp() {
    const stats = heatStats();
    const under = Math.max(0, stats.total - stats.bonded);
    return clamp(14 + under * 0.08 + stats.over * 0.42, 0, 75);
  }

  function pressFlat() {
    const heat = heatStats();
    const heatedFactor = clamp(heat.heated / Math.max(1, heat.total), 0, 1);
    const bondedFactor = clamp(heat.bonded / Math.max(1, heat.total), 0, 1);
    const effective = clamp(heatedFactor * 0.45 + bondedFactor * 0.55, 0, 1);
    const flattenGain = lerp(5, 30, effective);
    const warpReduce = lerp(2, 12, effective);
    state.flattening = clamp(state.flattening + flattenGain, 0, 100);
    state.warp = clamp(state.warp - warpReduce, 0, 80);
    if (effective < 0.2) {
      showToast("受热不足，压平效果很小。再熨一会儿会更好压。");
    } else {
      showToast("压板压住作品，边缘更平了。");
    }
    markDirty();
  }

  function flipAndIron() {
    state.flipCount += 1;
    state.cooling = 20;
    state.heat = state.heat.map((heat) => heat * 0.82);
    showToast("翻面完成，再轻熨一次。");
    setPhase("iron");
  }

  function completeWork() {
    if (state.sandboxMode) {
      const placed = placedCount();
      const totalSlots = state.placed.length;
      if (placed === 0) {
        enterConceptEaster("empty");
        return;
      }
      if (placed === totalSlots && totalSlots > 0) {
        enterConceptEaster("full");
        return;
      }
    }
    setPhase("finish");
    saveCurrentWork();
  }

  function enterConceptEaster(type) {
    state.conceptEaster = true;
    state.conceptEasterType = type;
    if (type === "full") {
      unlockAchievement(fullBoardAchievement);
    } else {
      unlockAchievement(conceptAchievement);
    }
    setPhase("finish");
    state.savedCurrent = false;
    markDirty();
  }

  function saveCurrentWork() {
    const entry = {
      id: `${Date.now()}-${state.selectedPattern.id}`,
      name: state.selectedPattern.name,
      craft: state.craft,
      grade: finalGrade(),
      date: new Date().toLocaleDateString("zh-CN", { month: "2-digit", day: "2-digit" }),
    };
    if (!state.savedCurrent) {
      collection.unshift(entry);
      collection = collection.slice(0, 12);
      const stored = writeCollection();
      state.savedCurrent = true;
      if (stored) showToast("作品已收入作品集。");
    } else {
      showToast("这个版本已经保存过。");
    }
    markDirty();
  }

  function exportShareImage(format) {
    const portrait = format === "portrait";
    const canvas = document.createElement("canvas");
    canvas.width = portrait ? 1080 : 1080;
    canvas.height = portrait ? 1440 : 1080;
    const ctx = canvas.getContext("2d");
    drawShareImage(ctx, canvas.width, canvas.height, portrait);

    const filename = `拼豆工坊-${state.selectedPattern.name}-${portrait ? "竖图" : "方图"}.png`;
    const link = document.createElement("a");
    link.download = filename;
    link.href = canvas.toDataURL("image/png");
    link.click();
    showToast("已导出带水印分享图。");
  }

  function drawShareImage(ctx, w, h, portrait) {
    const bg = ctx.createLinearGradient(0, 0, w, h);
    bg.addColorStop(0, "#fff7f3");
    bg.addColorStop(0.52, "#eef8f5");
    bg.addColorStop(1, "#f6f1ff");
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, w, h);

    ctx.fillStyle = "rgba(231, 100, 95, 0.12)";
    for (let i = 0; i < 18; i += 1) {
      const x = (i * 137) % w;
      const y = (i * 211) % h;
      ctx.beginPath();
      ctx.arc(x, y, 18 + (i % 4) * 7, 0, Math.PI * 2);
      ctx.fill();
    }

    const margin = portrait ? 88 : 72;
    const artSize = portrait ? 760 : 610;
    const artX = (w - artSize) / 2;
    const artY = portrait ? 300 : 220;

    ctx.fillStyle = "#26242b";
    ctx.font = "800 54px Avenir Next, PingFang SC, Hiragino Sans GB, Microsoft YaHei, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("女朋友爱玩的拼豆", w / 2, portrait ? 126 : 108);
    ctx.font = "700 32px Avenir Next, PingFang SC, Hiragino Sans GB, Microsoft YaHei, sans-serif";
    ctx.fillStyle = "#686572";
    ctx.fillText(`今天做：${state.selectedPattern.name}`, w / 2, portrait ? 178 : 154);

    drawShareArtwork(ctx, artX, artY, artSize);

    const statsY = artY + artSize + (portrait ? 86 : 70);
    drawShareStats(ctx, margin, statsY, w - margin * 2);

    ctx.textAlign = "center";
    ctx.fillStyle = "rgba(38, 36, 43, 0.72)";
    ctx.font = "700 28px Avenir Next, PingFang SC, Hiragino Sans GB, Microsoft YaHei, sans-serif";
    ctx.fillText("拼豆工坊 · 浏览器手作模拟", w / 2, h - 76);
    ctx.font = "600 22px Avenir Next, PingFang SC, Hiragino Sans GB, Microsoft YaHei, sans-serif";
    ctx.fillStyle = "rgba(38, 36, 43, 0.46)";
    ctx.fillText("从散豆、豆筛、镊子到熨烫定型", w / 2, h - 42);

    ctx.save();
    ctx.translate(w - 42, h * 0.55);
    ctx.rotate(-Math.PI / 2);
    ctx.fillStyle = "rgba(38, 36, 43, 0.18)";
    ctx.font = "800 24px Avenir Next, PingFang SC, Hiragino Sans GB, Microsoft YaHei, sans-serif";
    ctx.fillText("拼豆工坊 WATERMARK", 0, 0);
    ctx.restore();
  }

  function drawShareArtwork(ctx, x, y, size) {
    ctx.save();
    ctx.shadowColor = "rgba(38, 36, 43, 0.2)";
    ctx.shadowBlur = 34;
    ctx.shadowOffsetY = 22;
    ctx.fillStyle = "rgba(255,255,255,0.86)";
    roundedPath(ctx, x - 26, y - 26, size + 52, size + 52, 22);
    ctx.fill();
    ctx.shadowColor = "transparent";

    ctx.fillStyle = "#fbfcfd";
    roundedPath(ctx, x, y, size, size, 16);
    ctx.fill();
    const pattern = state.selectedPattern;
    const cell = size / pattern.size;
    const hasPlaced = placedCount() > 0;
    for (let py = 0; py < pattern.size; py += 1) {
      for (let px = 0; px < pattern.size; px += 1) {
        const index = indexFor(px, py);
        const code = hasPlaced ? state.placed[index] : targetAt(px, py);
        const cx = x + px * cell + cell / 2;
        const cy = y + py * cell + cell / 2;
        ctx.strokeStyle = "rgba(117, 126, 139, 0.12)";
        ctx.strokeRect(x + px * cell, y + py * cell, cell, cell);
        if (!code) continue;
        const heat = state.heat[index] || (state.phase === "finish" ? 66 : 0);
        if (heat > 34 || state.phase === "finish") {
          ctx.fillStyle = fusedColor(code, Math.max(heat, 58));
          roundedPath(ctx, x + px * cell + cell * 0.04, y + py * cell + cell * 0.04, cell * 0.92, cell * 0.92, cell * 0.12);
          ctx.fill();
        } else {
          drawBead(ctx, cx, cy, cell * 0.39, code, heat, false);
        }
      }
    }
    ctx.strokeStyle = "rgba(38, 36, 43, 0.18)";
    ctx.lineWidth = 5;
    roundedPath(ctx, x, y, size, size, 16);
    ctx.stroke();
    ctx.restore();
  }

  function drawShareStats(ctx, x, y, w) {
    const stats = [
      ["图纸", state.selectedPattern.name],
      ["颗数", `${getTargetTotal()}颗`],
      ["色号", `${getPatternColors().length}色`],
      ["评级", finalGrade()],
    ];
    const gap = 14;
    const boxW = (w - gap * 3) / 4;
    stats.forEach(([label, value], i) => {
      const bx = x + i * (boxW + gap);
      ctx.fillStyle = "rgba(255,255,255,0.78)";
      roundedPath(ctx, bx, y, boxW, 92, 14);
      ctx.fill();
      ctx.fillStyle = "#8a8792";
      ctx.font = "700 20px Avenir Next, PingFang SC, Hiragino Sans GB, Microsoft YaHei, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(label, bx + boxW / 2, y + 32);
      ctx.fillStyle = "#26242b";
      ctx.font = "800 26px Avenir Next, PingFang SC, Hiragino Sans GB, Microsoft YaHei, sans-serif";
      ctx.fillText(value, bx + boxW / 2, y + 66);
    });
  }

  function copyShareText() {
    const text = [
      `女朋友爱玩的拼豆，我做成了浏览器小游戏。`,
      `今天做的是「${state.selectedPattern.name}」，${getTargetTotal()}颗、${getPatternColors().length}个色号，最后评级 ${finalGrade()}。`,
      `从豆盒选色、豆筛抖豆、镊子修正，到熨烫冷却定型，真的很像坐在桌前慢慢做手工。`,
      `#拼豆 #手作 #像素画 #情侣日常 #小游戏`,
    ].join("\n");
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(text).then(() => showToast("文案已复制。")).catch(() => fallbackCopy(text));
    } else {
      fallbackCopy(text);
    }
  }

  function fallbackCopy(text) {
    const area = document.createElement("textarea");
    area.value = text;
    document.body.appendChild(area);
    area.select();
    document.execCommand?.("copy");
    area.remove();
    showToast("文案已复制。");
  }

  function scoreLabel() {
    if (state.sandboxMode) return "沙盒";
    if (state.phase === "choose") return "未开始";
    if (state.phase === "finish") return `评级 ${finalGrade()}`;
    const accuracy = Math.round(placementAccuracy() * 100);
    return `${accuracy}%`;
  }

  function finalGrade() {
    if (state.sandboxMode) return "沙盒";
    const accuracy = placementAccuracy();
    const heat = heatStats();
    const mildYellow = Math.max(0, heat.overPercent - 8);
    const severeBurn = Math.max(0, heat.overPercent - 24);
    const yellowPenalty = mildYellow * 0.28 + severeBurn * 0.4;
    const heatScore = clamp(heat.idealPercent - yellowPenalty, 0, 100) / 100;
    const flat = clamp(100 - state.warp, 0, 100) / 100;
    const cool = clamp(state.cooling, 0, 100) / 100;
    const score = accuracy * 0.42 + heatScore * 0.36 + flat * 0.14 + cool * 0.08;
    if (score >= 0.93) return "S";
    if (score >= 0.84) return "A";
    if (score >= 0.72) return "B";
    if (score >= 0.58) return "C";
    return "D";
  }

  function statusText() {
    const phase = state.phase;
    if (state.sandboxMode && phase === "place") {
      return "沙盒模式：自由拼摆中。点豆筛取豆、任意排布，不受图纸限制。";
    }
    if (phase === "choose") return "选择一张图纸，开始今天的手作。";
    if (phase === "place") {
      if (state.spill) return "有豆子倒下来卡住了。可先继续摆放，熨烫前再处理。";
      if (state.tool === "needle") {
        if (!state.trayColor) return "针工具需要先把某个色号倒入豆筛。";
        return `针上 ${state.needleLoaded}/${needleCapacity()} · 豆筛 ${state.trayBeans} 颗 ${beadIds[state.trayColor]}。`;
      }
      return state.tweezerBead ? `镊子夹着 ${beadLabel(state.tweezerBead)}。` : "点豆筛夹一颗，或从板面取一颗，再放到板上。";
    }
    if (phase === "inspect") {
      if (state.spill) return "还有倒下的豆子未处理。继续熨烫会糊坏该位置。";
      return state.errors.length ? "检查到需要修正的位置。" : "板面检查通过，可以盖纸熨烫。";
    }
    if (phase === "iron") return "控制速度、压力和温度，让豆子刚好粘连。";
    if (phase === "cool") return "等待冷却，压平边缘，准备取下作品。";
    return `${state.selectedPattern.name}完成，已进入收藏阶段。`;
  }

  function tick(now) {
    const dt = Math.min(48, now - lastFrame);
    lastFrame = now;
    if (state.phase === "cool") {
      const heat = heatStats();
      const overPenalty = heat.overPercent > 18 ? 0.04 : 0;
      state.cooling = clamp(state.cooling + dt * (0.012 - overPenalty / 100), 0, 100);
      if (state.flattening > 0) state.flattening = clamp(state.flattening - dt * 0.008, 0, 100);
      if (now - state.meterRefreshAt > 500) {
        renderMeters();
        state.meterRefreshAt = now;
      }
    }
    render();
    requestAnimationFrame(tick);
  }

  function onResize() {
    markDirty();
    render();
  }

  sceneCanvas.addEventListener("pointerdown", onPointerDown);
  sceneCanvas.addEventListener("pointermove", onPointerMove);
  sceneCanvas.addEventListener("pointerup", onPointerUp);
  sceneCanvas.addEventListener("pointercancel", onPointerUp);
  sceneCanvas.addEventListener("contextmenu", (event) => event.preventDefault());

  els.resetButton.addEventListener("click", () => {
    loadPattern(state.selectedPattern);
    showToast("已重置当前作品。");
  });
  els.sandboxButton?.addEventListener("click", () => toggleSandboxMode());
  els.bgThemeSelect?.addEventListener("change", () => {
    applyBackgroundTheme(els.bgThemeSelect.value);
    showToast(`背景已切换为 ${currentBackgroundTheme().name}。`);
  });
  els.patternSizeSelect.addEventListener("change", () => {
    const size = normalizePatternSize(els.patternSizeSelect.value);
    els.patternSizeInput.value = String(size);
    applyPatternSize(size);
  });
  els.patternSizeButton.addEventListener("click", () => applyPatternSize(els.patternSizeInput.value));
  els.patternSizeInput.addEventListener("change", () => {
    const size = normalizePatternSize(els.patternSizeInput.value);
    els.patternSizeInput.value = String(size);
  });
  els.customImageButton.addEventListener("click", () => els.customImageInput.click());
  els.customImageInput.addEventListener("change", handleCustomImage);
  els.remapModalClose?.addEventListener("click", () => closeRemapModal());
  els.remapDoneButton?.addEventListener("click", () => closeRemapModal());
  els.remapResetButton?.addEventListener("click", () => resetPatternColorMapping());
  els.remapModal?.addEventListener("click", (event) => {
    if (event.target === els.remapModal) closeRemapModal();
  });
  els.controlsModalClose?.addEventListener("click", () => closeControlsModal());
  els.controlsModal?.addEventListener("click", (event) => {
    if (event.target === els.controlsModal) closeControlsModal();
  });
  window.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    if (state.remapModalOpen) closeRemapModal();
    if (state.controlsModalOpen) closeControlsModal();
  });

  window.addEventListener("resize", onResize);

  validatePatterns();
  loadPattern(resizePattern(patterns[0], state.patternSize));
  applyBackgroundTheme(state.bgTheme);
  renderUI();
  requestAnimationFrame(tick);
})();
