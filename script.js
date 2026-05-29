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

  // colorNames is kept as an empty object for API compatibility;
  // MARD codes (beadIds) are the sole display labels.
  const colorNames = {};

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

  const mardColorData = window.MARD_COLOR_DATA || {};
  const basePaletteMardCodes = Object.values(beadIds).map(normalizeMardCode);
  const mardCodeToWorkshopCode = {};
  Object.entries(beadIds).forEach(([code, mardCode]) => {
    mardCodeToWorkshopCode[normalizeMardCode(mardCode)] = code;
  });
  let nextExtendedColorCode = 0;
  Object.entries(mardColorData).forEach(([mardCode, hex]) => {
    const normalized = normalizeMardCode(mardCode);
    const internalCode = mardCodeToWorkshopCode[normalized] || String.fromCharCode(0xe000 + nextExtendedColorCode++);
    mardCodeToWorkshopCode[normalized] = internalCode;
    palette[internalCode] = hex;
    beadIds[internalCode] = normalized;
    if (!colorNames[internalCode]) colorNames[internalCode] = normalized;
  });

  const paletteSizeOptions = [48, 96, 221];
  const paletteSizeKey = "beadWorkshopPaletteSize.v1";

  function normalizeMardCode(code) {
    return String(code || "").replace(/^([A-Z]+)0?(\d+)$/, "$1$2");
  }

  function mardCodeSort(a, b) {
    const matchA = normalizeMardCode(a).match(/^([A-Z]+)(\d+)$/);
    const matchB = normalizeMardCode(b).match(/^([A-Z]+)(\d+)$/);
    if (matchA && matchB) {
      if (matchA[1] !== matchB[1]) return matchA[1].localeCompare(matchB[1]);
      return Number(matchA[2]) - Number(matchB[2]);
    }
    return String(a).localeCompare(String(b), "zh-Hans-CN", { numeric: true });
  }

  function readPaletteSize() {
    const stored = Number.parseInt(localStorage.getItem(paletteSizeKey) || "", 10);
    return paletteSizeOptions.includes(stored) ? stored : 48;
  }

  function workshopCodeForMard(mardCode) {
    return mardCodeToWorkshopCode[normalizeMardCode(mardCode)] || normalizeMardCode(mardCode);
  }

  const patternSeeds = [
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

  function darkerVariant(code) {
    const upper = code.toUpperCase();
    const lower = code.toLowerCase();
    if (code === lower && upper !== lower && palette[upper]) return upper;
    return code;
  }

  function detailedRowsFromSeed(seed, targetSize = 24) {
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

  const patterns = patternSeeds.map((seed) => ({
    ...seed,
    size: 24,
    rows: detailedRowsFromSeed(seed, 24),
    note: "",
  }));

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
  const sideReferenceCanvas = $("#sideReferenceCanvas");
  const sideReferenceCtx = sideReferenceCanvas?.getContext("2d");

  const els = {
    statusLine: $("#statusLine"),
    patternMeta: $("#patternMeta"),
    patternList: $("#patternList"),
    customImageInput: $("#customImageInput"),
    customWhiteToggle: $("#customWhiteToggle"),
    patternSizeSlider: $("#patternSizeSlider"),
    patternSizeValue: $("#patternSizeValue"),
    paletteSizePicker: $("#paletteSizePicker"),
    settingsPaletteSizePicker: $("#settingsPaletteSizePicker"),
    customSizeMeta: $("#customSizeMeta"),
    customStats: $("#customStats"),
    patternColorStats: $("#patternColorStats"),
    targetCount: $("#targetCount"),
    controlTitle: $("#controlTitle"),
    toolMeta: $("#toolMeta"),
    stageControls: $("#stageControls"),
    sideReference: $("#sideReference"),
    sideReferenceMeta: $("#sideReferenceMeta"),
    sideReferenceLegend: $("#sideReferenceLegend"),
    studioGrid: $("#studioGrid"),
    workflowProgress: $("#workflowProgress"),
    currentPatternChip: $("#currentPatternChip"),
    currentPatternThumb: document.querySelector("#currentPatternChip .current-pattern-thumb"),
    currentPatternName: $("#currentPatternName"),
    currentPatternMeta: $("#currentPatternMeta"),
    collectionButton: $("#collectionButton"),
    collectionModal: $("#collectionModal"),
    collectionModalClose: $("#collectionModalClose"),
    settingsButton: $("#settingsButton"),
    settingsDot: $("#settingsDot"),
    settingsModal: $("#settingsModal"),
    settingsModalClose: $("#settingsModalClose"),
    shareModal: $("#shareModal"),
    shareModalClose: $("#shareModalClose"),
    remapModal: $("#remapModal"),
    remapModalTitle: $("#remapModalTitle"),
    remapModalBody: $("#remapModalBody"),
    remapModalClose: $("#remapModalClose"),
    remapDoneButton: $("#remapDoneButton"),
    remapResetButton: $("#remapResetButton"),
    toolRack: $("#toolRack"),
    rightPanelTitle: $("#rightPanelTitle"),
    colorPalette: $("#colorPalette"),
    colorMeta: $("#colorMeta"),
    sharePanel: $("#sharePanel"),
    collectionPanel: $("#collectionPanel"),
    collectionCount: $("#collectionCount"),
    bgThemeSelect: $("#bgThemeSelect"),
    topToolStyleSelect: $("#topToolStyleSelect"),
    sandboxButton: $("#sandboxButton"),
    chooseStartButton: $("#chooseStartButton"),
    boardZoomControls: $("#boardZoomControls"),
    zoomOutButton: $("#zoomOutButton"),
    zoomInButton: $("#zoomInButton"),
    zoomResetButton: $("#zoomResetButton"),
    resetButton: $("#resetButton"),
    toast: $("#toast"),
    placeHint: $("#placeHint"),
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
  const sortedColorCodes = Object.keys(palette).sort((a, b) => (beadIds[a] || a).localeCompare(beadIds[b] || b, "zh-Hans-CN", { numeric: true }));
  const mardCodes = Object.keys(mardColorData).map(normalizeMardCode).sort(mardCodeSort);

  // Explicit MARD colour sets — 48 ⊂ 96 ⊂ 221
  // 48-colour starter palette (47 distinct codes, branded as "48色")
  const MARD_SET_48 = [
    "A4","A6","A7","A10","A11","A13",
    "B3","B5","B8","B12",
    "C2","C3","C5","C6","C7","C8","C10","C11","C13",
    "D3","D6","D7","D9","D13","D15","D18","D19","D21",
    "E2","E3","E4","E7","E8",
    "F5","F8","F13",
    "G1","G5","G7","G8","G9","G13",
    "H1","H2","H3","H4","H5","H7",
  ];
  // 96-colour expanded palette — strict superset of 48
  const MARD_SET_96 = [
    "A3","A4","A6","A7","A10","A11","A13","A14",
    "B3","B5","B7","B8","B10","B12","B14","B17","B18","B19","B20",
    "C2","C3","C5","C6","C7","C8","C10","C11","C13","C16",
    "D2","D3","D5","D6","D7","D8","D9","D11","D12","D13","D14","D15","D16","D18","D19","D20","D21",
    "E1","E2","E3","E4","E5","E6","E7","E8","E9","E10","E11","E12","E13","E14","E15",
    "F1","F2","F3","F4","F5","F6","F7","F8","F9","F10","F11","F12","F13","F14",
    "G1","G2","G3","G5","G7","G8","G9","G13","G14","G17",
    "H1","H2","H3","H4","H5","H6","H7",
    "M5","M6","M9","M12",
  ];

  const palettePresetMardCodes = {
    48: MARD_SET_48.map(normalizeMardCode).sort(mardCodeSort),
    96: MARD_SET_96.map(normalizeMardCode).sort(mardCodeSort),
    221: mardCodes.filter((code) => /^[A-HM]\d+$/.test(code)).sort(mardCodeSort),
  };
  const TRAY_DESKTOP_ROWS = 10;
  const TRAY_DESKTOP_COLS = 12;
  const TRAY_MOBILE_ROWS = 5;
  const TRAY_MOBILE_COLS = 24;

  const state = {
    phase: "choose",
    patternSize: 24,
    paletteSize: readPaletteSize(),
    selectedPattern: patterns[0],
    patternColorMaps: {},
    patternColorMap: {},
    patternHiddenSources: {},
    patternEffectiveMapCache: {},
    patternAnalysisCache: {},
    customHiddenRecalcCache: {},
    customHiddenRecalcPending: {},
    customHiddenRecalcQueued: {},
    remapFocusSource: null,
    remapModalOpen: false,
    collectionModalOpen: false,
    settingsModalOpen: false,
    shareModalOpen: false,
    modalReturnFocus: null,
    sandboxMode: false,
    bgTheme: "mist",
    toolStyle: "candy",
    lampOn: false,
    lampSwitchFlashUntil: 0,
    pressAnim: null, // { startedAt, duration } — scraper sliding bottom→up
    projectedGuideCache: null,
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
    floorDrops: [],
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
      pendingCell: null,
      x: 0,
      y: 0,
      lastX: 0,
      lastY: 0,
      lastT: 0,
    },
    boardView: {
      scale: 1,
      panX: 0,
      panY: 0,
    },
    gesture: {
      active: false,
      touchActive: false,
      pointers: {},
      startDistance: 0,
      startScale: 1,
      startPanX: 0,
      startPanY: 0,
      startMidX: 0,
      startMidY: 0,
    },
    toolPose: {
      x: 0,
      y: 0,
      visible: false,
    },
    toastTimer: null,
    placeHintTimer: null,
    lastPlaceHintKey: "",
    achievementTimer: null,
    renderDirty: true,
    uiDirty: true,
    previewDirty: true,
    patternsDirty: true,
    pendingWorkflowScroll: true,
    pendingPageReset: false,
  };

  const collectionKey = "beadWorkshopCollection.v1";
  const collectionLimit = 24;
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
      const unknownCodes = [...new Set(pattern.rows.join("").replace(/\./g, "").split(""))].filter((code) => !palette[code] || !beadIds[code]);
      if (unknownCodes.length) {
        throw new Error(`${pattern.name} 使用了未登记颜色：${unknownCodes.join(", ")}`);
      }
    });
  }

  function readCollection() {
    try {
      const parsed = JSON.parse(localStorage.getItem(collectionKey) || "[]");
      if (!Array.isArray(parsed)) return [];
      return parsed.slice(0, collectionLimit);
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
      localStorage.setItem(collectionKey, JSON.stringify(collection.slice(0, collectionLimit)));
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
    const pattern = state.selectedPattern;
    const row = getEffectiveTargetRows(pattern)[y];
    if (!row) return null;
    const code = row[x] || ".";
    return code === "." ? null : code;
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

  function invalidateEffectiveMap(pattern = state.selectedPattern) {
    if (!pattern) return;
    const id = baseIdFor(pattern);
    delete state.patternEffectiveMapCache[id];
    delete state.patternAnalysisCache[id];
  }

  function getPatternHiddenSourceList(pattern = state.selectedPattern) {
    const id = baseIdFor(pattern);
    if (state.patternHiddenSources[id]?.length) {
      state.patternHiddenSources[id] = [];
      delete state.customHiddenRecalcCache[id];
      delete state.customHiddenRecalcPending[id];
      delete state.customHiddenRecalcQueued[id];
      invalidateEffectiveMap(pattern);
    }
    return [];
  }

  function getPatternHiddenSourceSet(pattern = state.selectedPattern) {
    return new Set(getPatternHiddenSourceList(pattern));
  }

  function hiddenSignature(list) {
    return list.slice().sort((a, b) => (beadIds[a] || a).localeCompare(beadIds[b] || b, "zh-Hans-CN", { numeric: true })).join("|");
  }

  function customRecalcSignature(pattern = state.selectedPattern, hiddenList = null) {
    const hidden = hiddenList || getPatternHiddenSourceList(pattern);
    return `${pattern.size}:${hiddenSignature(hidden)}:${pattern.sourceRemoveWhite !== false ? 1 : 0}`;
  }

  function isCustomFromImagePattern(pattern = state.selectedPattern) {
    return baseIdFor(pattern).startsWith("custom-") && Boolean(pattern.sourceImageDataUrl);
  }

  function findPatternByBaseId(id) {
    if (!id) return null;
    if (baseIdFor(state.selectedPattern) === id) return state.selectedPattern;
    return patterns.find((item) => baseIdFor(item) === id) || null;
  }

  function getCustomRecalcRowsIfReady(pattern = state.selectedPattern, hiddenList = null) {
    if (!isCustomFromImagePattern(pattern)) return null;
    const hidden = hiddenList || getPatternHiddenSourceList(pattern);
    if (!hidden.length) return null;
    const id = baseIdFor(pattern);
    const expectedSignature = customRecalcSignature(pattern, hidden);
    const entry = state.customHiddenRecalcCache[id];
    if (!entry || entry.signature !== expectedSignature) return null;
    return entry.rows;
  }

  async function recomputeCustomHiddenRowsFromOriginal(pattern = state.selectedPattern) {
    if (!isCustomFromImagePattern(pattern)) return false;
    const hidden = getPatternHiddenSourceList(pattern);
    const id = baseIdFor(pattern);
    if (!hidden.length) {
      delete state.customHiddenRecalcCache[id];
      invalidateEffectiveMap(pattern);
      return true;
    }
    const signature = customRecalcSignature(pattern, hidden);
    if (state.customHiddenRecalcCache[id]?.signature === signature) return true;
    if (state.customHiddenRecalcPending[id]) {
      if (state.customHiddenRecalcPending[id] !== signature) {
        state.customHiddenRecalcQueued[id] = signature;
      }
      return false;
    }
    state.customHiddenRecalcPending[id] = signature;
    try {
      const image = await loadImageFromDataUrl(pattern.sourceImageDataUrl);
      const result = convertImageToPattern(image, {
        removeWhite: pattern.sourceRemoveWhite !== false,
        size: pattern.size,
        excludedCodes: hidden,
        allowPaletteExpansionOnExclude: true,
      });
      state.customHiddenRecalcCache[id] = {
        signature,
        rows: result.rows,
        stats: result.stats,
      };
      if (baseIdFor(state.selectedPattern) === id && customRecalcSignature(state.selectedPattern) === signature) {
        invalidateEffectiveMap(state.selectedPattern);
        state.previewDirty = true;
        const available = getPatternColors();
        if (!available.includes(state.selectedColor)) state.selectedColor = available[0] || state.selectedColor;
        showToast("已按原图完成重算。");
        markDirty();
      }
      return true;
    } catch (error) {
      showToast("按原图重算失败。");
      return false;
    } finally {
      if (state.customHiddenRecalcPending[id] === signature) {
        delete state.customHiddenRecalcPending[id];
      }
      const queued = state.customHiddenRecalcQueued[id];
      if (queued && queued !== signature) {
        delete state.customHiddenRecalcQueued[id];
        const nextPattern = findPatternByBaseId(id);
        if (nextPattern) {
          void recomputeCustomHiddenRowsFromOriginal(nextPattern);
        }
      }
    }
  }

  function hiddenNeighborVotes(grid, size, x, y) {
    const votes = {};
    for (let dy = -1; dy <= 1; dy += 1) {
      for (let dx = -1; dx <= 1; dx += 1) {
        if (dx === 0 && dy === 0) continue;
        const nx = x + dx;
        const ny = y + dy;
        if (nx < 0 || ny < 0 || nx >= size || ny >= size) continue;
        const neighbor = grid[ny * size + nx];
        if (!neighbor || neighbor === ".") continue;
        const weight = dx === 0 || dy === 0 ? 2 : 1;
        votes[neighbor] = (votes[neighbor] || 0) + weight;
      }
    }
    return votes;
  }

  function voteWinner(votes) {
    let winner = null;
    let best = -1;
    Object.entries(votes).forEach(([code, score]) => {
      if (score > best) {
        winner = code;
        best = score;
      }
    });
    return winner;
  }

  function fillNullCellsByBfs(grid, size) {
    const nearest = Array(grid.length).fill(null);
    const queue = [];
    for (let i = 0; i < grid.length; i += 1) {
      const code = grid[i];
      if (!code || code === ".") continue;
      nearest[i] = code;
      queue.push(i);
    }
    let head = 0;
    while (head < queue.length) {
      const index = queue[head++];
      const code = nearest[index];
      const x = index % size;
      const y = Math.floor(index / size);
      const neighbors = [
        [x + 1, y],
        [x - 1, y],
        [x, y + 1],
        [x, y - 1],
      ];
      neighbors.forEach(([nx, ny]) => {
        if (nx < 0 || ny < 0 || nx >= size || ny >= size) return;
        const next = ny * size + nx;
        if (nearest[next] || grid[next] === ".") return;
        nearest[next] = code;
        queue.push(next);
      });
    }
    for (let i = 0; i < grid.length; i += 1) {
      if (grid[i] === null) grid[i] = nearest[i];
    }
  }

  function recomputeHiddenCells(grid, sourceRows, size, hiddenSet) {
    if (!hiddenSet.size) return;
    const hiddenMask = Array(grid.length).fill(false);
    for (let y = 0; y < size; y += 1) {
      const row = sourceRows[y];
      for (let x = 0; x < size; x += 1) {
        const sourceCode = row[x];
        if (sourceCode !== "." && hiddenSet.has(sourceCode)) {
          hiddenMask[y * size + x] = true;
        }
      }
    }
    let changed = false;
    for (let pass = 0; pass < 4; pass += 1) {
      const snapshot = grid.slice();
      let passChanged = false;
      for (let i = 0; i < snapshot.length; i += 1) {
        if (!hiddenMask[i] || snapshot[i] !== null) continue;
        const x = i % size;
        const y = Math.floor(i / size);
        const winner = voteWinner(hiddenNeighborVotes(snapshot, size, x, y));
        if (!winner) continue;
        grid[i] = winner;
        passChanged = true;
      }
      changed = changed || passChanged;
      if (!passChanged) break;
    }
    if (grid.some((code) => code === null)) fillNullCellsByBfs(grid, size);
    for (let pass = 0; pass < 2; pass += 1) {
      const snapshot = grid.slice();
      for (let i = 0; i < snapshot.length; i += 1) {
        if (!hiddenMask[i] || snapshot[i] === "." || snapshot[i] === null) continue;
        const x = i % size;
        const y = Math.floor(i / size);
        const votes = hiddenNeighborVotes(snapshot, size, x, y);
        const winner = voteWinner(votes);
        if (!winner) continue;
        if ((votes[winner] || 0) >= 5 && winner !== snapshot[i]) grid[i] = winner;
      }
    }
    if (!changed && hiddenSet.size) {
      const fallback = grid.find((code) => code && code !== ".");
      if (fallback) {
        for (let i = 0; i < grid.length; i += 1) {
          if (hiddenMask[i] && !grid[i]) grid[i] = fallback;
        }
      }
    }
  }

  function getEffectivePatternMap(pattern = state.selectedPattern) {
    return getEffectivePatternResult(pattern).map;
  }

  function getEffectiveTargetRows(pattern = state.selectedPattern) {
    return getEffectivePatternResult(pattern).rows;
  }

  function getEffectivePatternResult(pattern = state.selectedPattern) {
    const id = baseIdFor(pattern);
    const fingerprint = patternFingerprint(pattern);
    const sourceColors = getSourcePatternColors(pattern);
    const hidden = getPatternHiddenSourceList(pattern);
    const map = getPatternColorMap(pattern);
    const mapSignature = sourceColors.map((code) => `${code}:${map[code] || code}`).join("|");
    const hiddenKey = hiddenSignature(hidden);
    const customRows = getCustomRecalcRowsIfReady(pattern, hidden);
    const cacheKey = `${fingerprint}:${mapSignature}:${hiddenKey}:${customRows ? "orig" : "local"}`;
    const cached = state.patternEffectiveMapCache[id];
    if (cached?.key === cacheKey) return cached;

    const baseMap = {};
    const activeCodes = new Set(allColorCodes());
    sourceColors.forEach((code) => {
      const mapped = map[code];
      baseMap[code] = mapped && activeCodes.has(mapped) ? mapped : code;
    });
    const size = pattern.size;
    const sourceRows = pattern.rows;
    const workingRows = customRows || sourceRows;
    const hiddenSet = new Set(hidden);
    const waitOriginal = isCustomFromImagePattern(pattern) && hiddenSet.size > 0 && !customRows;
    const grid = Array(size * size).fill(".");
    for (let y = 0; y < size; y += 1) {
      const row = workingRows[y];
      for (let x = 0; x < size; x += 1) {
        const sourceCode = sourceRows[y][x];
        const index = y * size + x;
        if (sourceCode === ".") {
          grid[index] = ".";
        } else if (customRows) {
          grid[index] = row[x] || ".";
        } else if (hiddenSet.has(sourceCode)) {
          grid[index] = waitOriginal ? (baseMap[sourceCode] || sourceCode) : null;
        } else {
          grid[index] = baseMap[sourceCode] || sourceCode;
        }
      }
    }
    if (hiddenSet.size && !customRows && !waitOriginal) recomputeHiddenCells(grid, sourceRows, size, hiddenSet);
    const fallbackCode = grid.find((code) => code && code !== ".") || "K";
    for (let i = 0; i < grid.length; i += 1) {
      if (grid[i] === null) grid[i] = fallbackCode;
    }
    const rows = [];
    for (let y = 0; y < size; y += 1) rows.push(grid.slice(y * size, y * size + size).map((code) => code || ".").join(""));

    const effectiveMap = { ...baseMap };
    if (hiddenSet.size) {
      hidden.forEach((sourceCode) => {
        const votes = {};
        for (let y = 0; y < size; y += 1) {
          const row = sourceRows[y];
          for (let x = 0; x < size; x += 1) {
            if (row[x] !== sourceCode) continue;
            const code = grid[y * size + x];
            if (!code || code === ".") continue;
            votes[code] = (votes[code] || 0) + 1;
          }
        }
        const winner = voteWinner(votes);
        if (winner) effectiveMap[sourceCode] = winner;
      });
    }
    const result = { key: cacheKey, map: effectiveMap, rows };
    state.patternEffectiveMapCache[id] = result;
    return result;
  }

  function getTargetCounts(pattern = state.selectedPattern) {
    return getPatternAnalysis(pattern).counts;
  }

  function getTargetTotal(pattern = state.selectedPattern) {
    return getPatternAnalysis(pattern).total;
  }

  function allColorCodes() {
    const preset = palettePresetMardCodes[state.paletteSize] || palettePresetMardCodes[48];
    return [...new Set(preset.map(workshopCodeForMard).filter((code) => palette[code]))]
      .sort((a, b) => (beadIds[a] || a).localeCompare(beadIds[b] || b, "zh-Hans-CN", { numeric: true }));
  }

  function beadLabel(code) {
    return beadIds[code] || code;
  }

  function activePaletteColorCount() {
    return allColorCodes().length;
  }

  function normalizePatternColorMapForActivePalette(pattern = state.selectedPattern) {
    const patternId = baseIdFor(pattern);
    const activeCodes = new Set(allColorCodes());
    const activeCodesArr = [...activeCodes];
    const previousMap = state.patternColorMaps[patternId] || {};
    const normalizedMap = {};
    getSourcePatternColors(pattern).forEach((code) => {
      const mapped = previousMap[code];
      if (mapped && activeCodes.has(mapped)) {
        // user's manual remap is still valid
        normalizedMap[code] = mapped;
      } else if (activeCodes.has(code)) {
        // colour is directly in the active palette — use as-is
        normalizedMap[code] = code;
      } else {
        // colour not in active palette → auto-remap to perceptually nearest
        normalizedMap[code] = nearestCodeFromSet(beadOklab(code), activeCodesArr);
      }
    });
    state.patternColorMaps[patternId] = normalizedMap;
    if (baseIdFor(state.selectedPattern) === patternId) state.patternColorMap = normalizedMap;
    return normalizedMap;
  }

  function renderPaletteSizeControls() {
    [els.paletteSizePicker, els.settingsPaletteSizePicker].forEach((picker) => {
      if (!picker) return;
      picker.querySelectorAll("[data-palette-size]").forEach((button) => {
        const size = Number.parseInt(button.dataset.paletteSize, 10);
        const active = size === state.paletteSize;
        button.classList.toggle("active", active);
        button.setAttribute("aria-pressed", active ? "true" : "false");
      });
    });
  }

  async function setPaletteSize(size, silent = false) {
    const next = Number.parseInt(size, 10);
    if (!paletteSizeOptions.includes(next) || next === state.paletteSize) return;
    state.paletteSize = next;
    localStorage.setItem(paletteSizeKey, String(next));
    const codes = allColorCodes();
    if (!codes.includes(state.selectedColor)) {
      state.selectedColor = codes[0] || "K";
    }
    state.trayColor = null;
    state.trayBeans = 0;
    state.trayCapacity = 0;
    state.trayMatrix = [];
    state.tweezerBead = null;
    invalidateEffectiveMap();
    state.previewDirty = true;
    state.uiDirty = true;
    if (isCustomFromImagePattern(state.selectedPattern)) {
      try {
        const image = await loadImageFromDataUrl(state.selectedPattern.sourceImageDataUrl);
        const result = convertImageToPattern(image, {
          removeWhite: state.selectedPattern.sourceRemoveWhite !== false,
          size: state.selectedPattern.size,
        });
        Object.assign(state.selectedPattern, {
          rows: result.rows,
          sourceRows: result.rows,
          conversionStats: result.stats,
        });
        state.lastConversionStats = result.stats;
      } catch (error) {
        showToast("色板已切换，但自定义图纸重算失败。");
      }
    }
    normalizePatternColorMapForActivePalette();
    invalidateEffectiveMap();
    const patternColors = getPatternColors();
    if (!patternColors.includes(state.selectedColor)) {
      state.selectedColor = patternColors[0] || codes[0] || "K";
    }
    if (!silent) showToast(`色板已切换为 ${next} 色。`);
    markDirty();
  }

  function getPatternColors(pattern = state.selectedPattern) {
    return getPatternAnalysis(pattern).colors.slice();
  }

  function getPatternAnalysis(pattern = state.selectedPattern) {
    const id = baseIdFor(pattern);
    const effective = getEffectivePatternResult(pattern);
    const cache = state.patternAnalysisCache[id];
    if (cache?.key === effective.key) return cache;
    const counts = {};
    effective.rows.forEach((row) => {
      [...row].forEach((code) => {
        if (code === ".") return;
        counts[code] = (counts[code] || 0) + 1;
      });
    });
    const colors = Object.keys(counts)
      .sort((a, b) => (beadIds[a] || a).localeCompare(beadIds[b] || b, "zh-Hans-CN", { numeric: true }));
    const total = Object.values(counts).reduce((sum, count) => sum + count, 0);
    const next = { key: effective.key, counts, colors, total };
    state.patternAnalysisCache[id] = next;
    return next;
  }

  function getSourceCounts(pattern = state.selectedPattern) {
    return getSourcePatternAnalysis(pattern).counts;
  }

  function getSourcePatternColors(pattern = state.selectedPattern) {
    return getSourcePatternAnalysis(pattern).colors.slice();
  }

  function getSourcePatternAnalysis(pattern = state.selectedPattern) {
    const fingerprint = patternFingerprint(pattern);
    if (pattern.__sourceAnalysis?.key === fingerprint) return pattern.__sourceAnalysis;
    const counts = {};
    pattern.rows.forEach((row) => {
      [...row].forEach((code) => {
        if (code !== ".") counts[code] = (counts[code] || 0) + 1;
      });
    });
    const colors = Object.keys(counts)
      .sort((a, b) => (beadIds[a] || a).localeCompare(beadIds[b] || b, "zh-Hans-CN", { numeric: true }));
    const total = Object.values(counts).reduce((sum, count) => sum + count, 0);
    pattern.__sourceAnalysis = { key: fingerprint, counts, colors, total };
    return pattern.__sourceAnalysis;
  }

  function getPlacedCounts() {
    const counts = {};
    state.placed.forEach((code) => {
      if (!code) return;
      counts[code] = (counts[code] || 0) + 1;
    });
    return counts;
  }

  function normalizePatternSize(value) {
    const parsed = Number.parseInt(value, 10);
    if (!Number.isFinite(parsed)) return 48;
    return clamp(parsed, 12, 200);
  }

  function baseIdFor(pattern) {
    return pattern.sourceId || pattern.id;
  }

  function patternFingerprint(pattern) {
    if (pattern.__gridFingerprint) return pattern.__gridFingerprint;
    const rows = pattern.rows || [];
    let hash = 2166136261 >>> 0;
    for (let y = 0; y < rows.length; y += 1) {
      const row = rows[y] || "";
      for (let i = 0; i < row.length; i += 1) {
        hash ^= row.charCodeAt(i);
        hash = Math.imul(hash, 16777619);
      }
      hash ^= 124;
      hash = Math.imul(hash, 16777619);
    }
    pattern.__gridFingerprint = `${pattern.size}:${rows.length}:${(hash >>> 0).toString(36)}`;
    return pattern.__gridFingerprint;
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
      note: "",
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

  function findBasePattern(pattern = state.selectedPattern) {
    const id = baseIdFor(pattern);
    return patterns.find((item) => item.id === id) || pattern;
  }

  function findCustomPattern() {
    return patterns.find((item) => item.id.startsWith("custom-")) || null;
  }

  function setSizeControls(size) {
    const normalized = normalizePatternSize(size);
    state.patternSize = normalized;
    if (els.patternSizeSlider) {
      els.patternSizeSlider.value = String(normalized);
      const min = Number(els.patternSizeSlider.min) || 12;
      const max = Number(els.patternSizeSlider.max) || 48;
      const progress = clamp((normalized - min) / Math.max(1, max - min), 0, 1);
      els.patternSizeSlider.style.setProperty("--size-progress", `${Math.round(progress * 100)}%`);
    }
    if (els.patternSizeValue) els.patternSizeValue.textContent = String(normalized);
    if (els.customSizeMeta) els.customSizeMeta.textContent = `${normalized}x${normalized}`;
  }

  function applyPatternSize(size) {
    const normalized = normalizePatternSize(size);
    if (normalized === state.selectedPattern.size) {
      setSizeControls(normalized);
      return;
    }
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
    invalidateLayoutCache();
    if (baseIdFor(pattern).startsWith("custom-")) {
      closeRemapModal();
    }
    const patternId = baseIdFor(pattern);
    const previousHidden = state.patternHiddenSources[patternId] || [];
    const sourceColors = getSourcePatternColors(pattern);
    const normalizedMap = normalizePatternColorMapForActivePalette(pattern);
    state.patternHiddenSources[patternId] = [...new Set(previousHidden.filter((code) => sourceColors.includes(code)))];
    invalidateEffectiveMap(pattern);
    if (isCustomFromImagePattern(pattern) && state.patternHiddenSources[patternId].length) {
      void recomputeCustomHiddenRowsFromOriginal(pattern);
    }
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
    state.floorDrops = [];
    state.conceptEaster = false;
    state.conceptEasterType = null;
    state.projectedGuideCache = null;
    state.lampOn = false;
    state.boardView.scale = 1;
    state.boardView.panX = 0;
    state.boardView.panY = 0;
    state.gesture.active = false;
    state.gesture.touchActive = false;
    state.gesture.pointers = {};
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
    state.previewDirty = true;
    state.patternsDirty = true;
    if (!keepPhase) state.phase = "choose";
    markDirty();
  }

  function useMobileTrayGrid() {
    return window.matchMedia("(max-width: 860px)").matches;
  }

  function useMobileDirectPlacement() {
    return window.matchMedia("(max-width: 860px)").matches;
  }

  function maxBoardScale() {
    return useMobileDirectPlacement() ? 6 : 2.8;
  }

  function shouldShowTray(layout = currentLayout()) {
    return !useMobileDirectPlacement() && layout.trayW > 0 && layout.trayH > 0;
  }

  function trayDimensions() {
    return useMobileTrayGrid()
      ? { rows: TRAY_MOBILE_ROWS, cols: TRAY_MOBILE_COLS }
      : { rows: TRAY_DESKTOP_ROWS, cols: TRAY_DESKTOP_COLS };
  }

  function traySlotCapacity() {
    const { rows, cols } = trayDimensions();
    return rows * cols;
  }

  function makeTrayMatrix(count = 0, rowsOverride = null, colsOverride = null) {
    const rows = rowsOverride ?? trayDimensions().rows;
    const cols = colsOverride ?? trayDimensions().cols;
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

  function makeTraySeeds(code, amount = null) {
    const needed = getTargetCounts()[code] || 12;
    const count = clamp(amount ?? (needed + 14), 8, traySlotCapacity());
    return Array.from({ length: count }, (_, i) => ({
      sx: pseudoRandom(`${state.selectedPattern.id}-${code}-${i}-x`),
      sy: pseudoRandom(`${state.selectedPattern.id}-${code}-${i}-y`),
      wobble: pseudoRandom(`${state.selectedPattern.id}-${code}-${i}-w`) * Math.PI * 2,
    }));
  }

  function syncTrayMatrixShape() {
    const { rows, cols } = trayDimensions();
    const matrix = state.trayMatrix || [];
    const sameRows = matrix.length === rows;
    const sameCols = sameRows && matrix.every((row) => row.length === cols);
    if (sameCols) return;
    const count = matrix.reduce((sum, row) => sum + row.filter(Boolean).length, 0);
    state.trayMatrix = makeTrayMatrix(count, rows, cols);
    state.trayBeans = countTrayBeans();
  }

  function countTrayBeans() {
    return state.trayMatrix.reduce((sum, row) => sum + row.filter(Boolean).length, 0);
  }

  function syncTrayBeans() {
    state.trayBeans = countTrayBeans();
  }

  function trayGeometry(layout, compact = false) {
    const { rows, cols } = trayDimensions();
    const inset = compact ? 18 : 24;
    const slotGap = (layout.trayH - inset * 2) / rows;
    const lineStartX = layout.trayX + 22;
    const lineEndX = layout.trayX + layout.trayW - 24;
    const startY = layout.trayY + inset + slotGap * 0.5;
    const startX = lineStartX + 10;
    const endX = lineEndX - 10;
    const stepX = cols > 1 ? (endX - startX) / (cols - 1) : 0;
    const stepY = slotGap;
    const beadR = clamp(Math.min(stepX * 0.41, slotGap * 0.25), 4.9, compact ? 8.2 : 9.3);
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
    return traySlotCapacity();
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


  // --- Audio & Haptics ---
  let audioCtx = null;
  function initAudio() {
    if (!audioCtx) {
      try {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      } catch (e) { }
    }
  }

  function playClickSound(type = "light") {
    if (!audioCtx) return;
    if (audioCtx.state === "suspended") audioCtx.resume();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    
    if (type === "light") {
      osc.type = "sine";
      osc.frequency.setValueAtTime(800, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, audioCtx.currentTime + 0.04);
      gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.04);
      osc.start(audioCtx.currentTime);
      osc.stop(audioCtx.currentTime + 0.04);
    } else if (type === "heavy") {
      osc.type = "triangle";
      osc.frequency.setValueAtTime(200, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(50, audioCtx.currentTime + 0.06);
      gain.gain.setValueAtTime(0.4, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.06);
      osc.start(audioCtx.currentTime);
      osc.stop(audioCtx.currentTime + 0.06);
    }
  }

  function triggerHaptic(type = "light") {
    initAudio();
    if (navigator.vibrate) {
      if (type === "light") navigator.vibrate(5);
      else if (type === "heavy") navigator.vibrate(10);
      else if (type === "error") navigator.vibrate([15, 30, 15]);
    }
    playClickSound(type);
  }

  function setPhase(phase) {
    state.phase = phase;
    state.pointer.down = false;
    state.pointer.mode = null;
    state.pointer.trayTapPending = false;
    state.pointer.pendingCell = null;
    state.gesture.active = false;
    state.gesture.touchActive = false;
    state.gesture.pointers = {};
    if (phase !== "place" && phase !== "inspect") {
      if (state.boardView.scale > 1.01) {
        state.boardView.scale = 1;
        state.boardView.panX = 0;
        state.boardView.panY = 0;
      }
    }
    state.ironPos = null;
    if (phase !== "iron") state.emptyIronEaster = false;
    if (phase !== "finish") state.conceptEaster = false;
    if (phase !== "finish") state.conceptEasterType = null;
    if (phase !== "cool" && phase !== "finish") state.fusedPieces = [];
    if (phase !== "place") state.tweezerBead = null;
    if (phase !== "choose" && state.remapModalOpen) closeRemapModal();
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
    state.pendingWorkflowScroll = true;
    schedulePhaseViewportReset();
    markDirty();
  }

  function prefersReducedMotion() {
    return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
  }

  function schedulePhaseViewportReset() {
    state.pendingPageReset = true;
  }

  function resetPhaseViewport() {
    const reset = () => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "auto",
      });
    };
    reset();
    window.requestAnimationFrame(() => {
      reset();
      window.requestAnimationFrame(reset);
    });
    window.setTimeout(reset, 120);
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

  function toggleLamp(next = !state.lampOn) {
    state.lampOn = Boolean(next);
    state.lampSwitchFlashUntil = performance.now() + 140;
    showToast(state.lampOn ? "工作灯已打开：投影色稿可见。" : "工作灯已关闭：关闭投影色稿。");
    markDirty();
  }


  // --- Auto Save ---
  function autoSave() {
    if (state.phase === "choose") {
      localStorage.removeItem("beadWorkshopSession.v1");
      return;
    }
    const session = {
      phase: state.phase,
      sandboxMode: state.sandboxMode,
      selectedPatternId: state.selectedPattern ? state.selectedPattern.id : null,
      patternColorMaps: state.patternColorMaps,
      patternSize: state.patternSize,
      placed: state.placed,
      heat: state.heat,
      tool: state.tool,
      trayColor: state.trayColor,
      trayBeans: state.trayBeans,
      trayMatrix: state.trayMatrix,
      tweezerBead: state.tweezerBead,
      needleLoaded: state.needleLoaded,
      errors: state.errors,
      temperature: state.temperature,
      pressure: state.pressure,
      warp: state.warp,
      cooling: state.cooling,
      spill: state.spill
    };
    try {
      localStorage.setItem("beadWorkshopSession.v1", JSON.stringify(session));
    } catch(e) {}
  }

  function loadAutoSave() {
    try {
      const data = localStorage.getItem("beadWorkshopSession.v1");
      if (!data) return false;
      const session = JSON.parse(data);
      if (!session || session.phase === "choose") return false;
      
      const pattern = patterns.find(p => p.id === session.selectedPatternId);
      if (!pattern && !session.sandboxMode) return false;
      
      state.phase = session.phase;
      state.sandboxMode = session.sandboxMode;
      state.selectedPattern = pattern;
      if (session.patternColorMaps) state.patternColorMaps = session.patternColorMaps;
      if (session.patternSize) state.patternSize = session.patternSize;
      state.placed = session.placed || [];
      state.heat = session.heat || [];
      state.tool = session.tool || "needle";
      state.trayColor = session.trayColor || null;
      state.trayBeans = ~~session.trayBeans;
      state.trayMatrix = session.trayMatrix || [];
      state.tweezerBead = session.tweezerBead || null;
      state.needleLoaded = ~~session.needleLoaded;
      state.errors = session.errors || [];
      state.temperature = session.temperature || 62;
      state.pressure = session.pressure || 56;
      state.warp = session.warp || 18;
      state.cooling = session.cooling || 0;
      state.spill = session.spill || null;
      
      // restore transient states
      if (state.selectedPattern) loadPattern(state.selectedPattern);
      if (state.phase !== "choose") compileCurrentPattern();
      syncFusionMatrix();
      setPhase(state.phase);
      return true;
    } catch(e) {
      return false;
    }
  }

  function markDirty() {
    state.renderDirty = true;
    state.uiDirty = true;
    requestAnimationFrame(autoSave);
  }

  function markCanvasDirty() {
    state.renderDirty = true;
  }

  function showToast(message) {
    window.clearTimeout(state.toastTimer);
    els.toast.textContent = message;
    els.toast.classList.add("show");
    state.toastTimer = window.setTimeout(() => {
      els.toast.classList.remove("show");
    }, 1900);
  }

  function hidePlaceHint() {
    if (!els.placeHint) return;
    els.placeHint.classList.remove("show");
  }

  function showPlaceHint(message, key = message, duration = 1800) {
    if (!els.placeHint || !message) return;
    if (state.lastPlaceHintKey === key) return;
    state.lastPlaceHintKey = key;
    window.clearTimeout(state.placeHintTimer);
    els.placeHint.textContent = message;
    els.placeHint.classList.add("show");
    state.placeHintTimer = window.setTimeout(() => {
      hidePlaceHint();
    }, duration);
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

  // Quantize the canvas bounding rect so 1–2 px wiggles (e.g. from right-panel
   // content changing height between place↔inspect) don't recompute boardSize
   // and make the board visibly resize between phases.
  function quantizedCanvasRect() {
    const rect = sceneCanvas.getBoundingClientRect();
    const q = 8;
    return {
      width: Math.floor(rect.width / q) * q,
      height: Math.floor(rect.height / q) * q,
    };
  }

  let _layoutCache = null;
  let _layoutCacheKey = "";
  function invalidateLayoutCache() {
    _layoutCache = null;
  }

  function currentLayout() {
    const rect = quantizedCanvasRect();
    const key = `${rect.width}x${rect.height}:${state.selectedPattern.size}`;
    if (_layoutCache && _layoutCacheKey === key) return _layoutCache;
    _layoutCache = computeLayout(rect);
    _layoutCacheKey = key;
    return _layoutCache;
  }

  function boardViewTransform(layout = currentLayout()) {
    const scale = clamp(state.boardView.scale || 1, 1, maxBoardScale());
    const extra = (layout.boardSize * scale - layout.boardSize) * 0.5;
    const basePan = useMobileDirectPlacement() ? layout.boardSize * 0.36 : 28;
    const maxPan = extra + basePan;
    const panX = clamp(state.boardView.panX || 0, -maxPan, maxPan);
    const panY = clamp(state.boardView.panY || 0, -maxPan, maxPan);
    state.boardView.scale = scale;
    state.boardView.panX = panX;
    state.boardView.panY = panY;
    const cx = layout.boardX + layout.boardSize * 0.5;
    const cy = layout.boardY + layout.boardSize * 0.5;
    return { scale, panX, panY, cx, cy };
  }

  function setBoardZoom(nextScale, nextPanX = state.boardView.panX, nextPanY = state.boardView.panY) {
    state.boardView.scale = clamp(nextScale, 1, maxBoardScale());
    state.boardView.panX = nextPanX;
    state.boardView.panY = nextPanY;
    boardViewTransform();
    markCanvasDirty();
  }

  function resetBoardView() {
    state.boardView.scale = 1;
    state.boardView.panX = 0;
    state.boardView.panY = 0;
    markCanvasDirty();
  }

  function gesturePointerCount() {
    return Object.keys(state.gesture.pointers).length;
  }

  function gesturePrimaryPair() {
    const ids = Object.keys(state.gesture.pointers);
    if (ids.length < 2) return null;
    return [state.gesture.pointers[ids[0]], state.gesture.pointers[ids[1]]];
  }

  function pointerDistance(a, b) {
    return Math.hypot(a.x - b.x, a.y - b.y);
  }

  function pointerMid(a, b) {
    return { x: (a.x + b.x) * 0.5, y: (a.y + b.y) * 0.5 };
  }

  function startBoardGesture(p1, p2, touchActive = false) {
    const mid = pointerMid(p1, p2);
    state.gesture.active = true;
    state.gesture.touchActive = Boolean(touchActive);
    state.gesture.startDistance = Math.max(16, pointerDistance(p1, p2));
    state.gesture.startScale = state.boardView.scale;
    state.gesture.startPanX = state.boardView.panX;
    state.gesture.startPanY = state.boardView.panY;
    state.gesture.startMidX = mid.x;
    state.gesture.startMidY = mid.y;
    state.pointer.down = false;
    state.pointer.mode = "gesture";
    state.pointer.trayTapPending = false;
    state.pointer.pendingCell = null;
    markCanvasDirty();
  }

  function updateBoardGesture(p1, p2) {
    const mid = pointerMid(p1, p2);
    const distance = Math.max(16, pointerDistance(p1, p2));
    const nextScale = clamp(
      state.gesture.startScale * (distance / Math.max(16, state.gesture.startDistance)),
      1,
      maxBoardScale()
    );
    // Anchor the zoom on the fingers: keep the board point that was under the
    // initial two-finger midpoint locked under the current midpoint. This makes
    // pinch feel natural (zoom toward the pinch center) and folds pure two-finger
    // panning into the same formula (when distance is unchanged).
    const layout = currentLayout();
    const cx = layout.boardX + layout.boardSize * 0.5;
    const cy = layout.boardY + layout.boardSize * 0.5;
    const startScale = Math.max(0.0001, state.gesture.startScale);
    const anchorX = (state.gesture.startMidX - cx - state.gesture.startPanX) / startScale + cx;
    const anchorY = (state.gesture.startMidY - cy - state.gesture.startPanY) / startScale + cy;
    const panX = mid.x - cx - (anchorX - cx) * nextScale;
    const panY = mid.y - cy - (anchorY - cy) * nextScale;
    setBoardZoom(nextScale, panX, panY);
  }

  function touchToCanvas(touch) {
    const rect = sceneCanvas.getBoundingClientRect();
    return {
      x: touch.clientX - rect.left,
      y: touch.clientY - rect.top,
    };
  }

  function computeLayout(rect) {
    const w = rect.width;
    const h = rect.height;
    if (useMobileDirectPlacement()) {
      const boardY = 16;
      const refH = clamp(Math.round(h * 0.18), 92, 124);
      const maxBoardByHeight = h - boardY - 14 - refH - 18;
      const rawBoard = clamp(maxBoardByHeight, 240, Math.min(w - 24, 468));
      const boardSize = Math.floor(rawBoard / 8) * 8;
      const boardX = Math.floor((w - boardSize) / 2);
      const refX = 12;
      const refY = boardY + boardSize + 14;
      const refW = w - 24;
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
        trayX: 0,
        trayY: 0,
        trayW: 0,
        trayH: 0,
      };
    }
    const rawBoard = Math.min(h - 78, w * 0.64, 590);
    const boardSize = Math.floor(rawBoard / 8) * 8;
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
    const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
    const width = Math.max(1, Math.round(rect.width * dpr));
    const height = Math.max(1, Math.round(rect.height * dpr));
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function render() {
    if (state.uiDirty) {
      renderUI();
      state.uiDirty = false;
    }
    setupHiDpiCanvas(sceneCanvas, scene);
    const layout = currentLayout();
    scene.clearRect(0, 0, layout.w, layout.h);
    drawWorkbench(layout);
    if (state.phase !== "choose") drawFloorDrops(layout);

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
      if ((state.phase === "place" || state.phase === "inspect") && shouldShowTray(layout)) {
        if (state.trayColor) syncTrayMatrixShape();
        drawTray(layout, true);
      }
      if (state.phase === "inspect") updateInspectAssistCanvases();
      if (state.phase === "iron") drawIronLayer(layout);
      if (state.phase === "cool") drawCoolingLayer(layout);
    }
    drawLampSwitch(layout);
    if (!useMobileDirectPlacement()) drawToolEntities(layout.w, layout.h);

    if (state.previewDirty) {
      drawPreview();
      state.previewDirty = false;
    }
    state.renderDirty = false;
  }

  function drawWorkbench(layout) {
    const { w, h, boardX, boardY, boardSize, trayX, trayY, trayW, trayH } = layout;
    const ctx = scene;
    const theme = currentBackgroundTheme();
    ctx.save();

    // Table edge: stop the table at this Y; below it is the floor.
    const activeBottom = trayH > 0 ? Math.max(boardY + boardSize + 24, trayY + trayH + 10) : Math.max(boardY + boardSize + 24, layout.refY + layout.refH + 14);
    const matBottom = Math.min(h - 90, activeBottom);
    const tableEdgeY = Math.min(h - 18, matBottom + 30);
    const floorTop = tableEdgeY;

    // Floor (a slightly cooler shade than table)
    const floorGradient = ctx.createLinearGradient(0, floorTop, 0, h);
    floorGradient.addColorStop(0, "rgba(54, 60, 72, 0.20)");
    floorGradient.addColorStop(1, "rgba(40, 46, 56, 0.30)");
    ctx.fillStyle = floorGradient;
    ctx.fillRect(0, floorTop, w, h - floorTop);

    // Floor planks (subtle vertical seams)
    ctx.strokeStyle = "rgba(20, 24, 32, 0.10)";
    ctx.lineWidth = 1;
    for (let x = 0; x < w; x += 78) {
      ctx.beginPath();
      ctx.moveTo(x, floorTop);
      ctx.lineTo(x, h);
      ctx.stroke();
    }

    // Table
    const tableGradient = ctx.createLinearGradient(0, 0, w, floorTop);
    tableGradient.addColorStop(0, theme.table[0]);
    tableGradient.addColorStop(0.48, theme.table[1]);
    tableGradient.addColorStop(1, theme.table[2]);
    ctx.fillStyle = tableGradient;
    ctx.fillRect(0, 0, w, floorTop);

    ctx.fillStyle = "rgba(255, 255, 255, 0.26)";
    for (let y = 0; y < floorTop; y += 34) {
      ctx.fillRect(0, y, w, 1);
    }
    ctx.strokeStyle = "rgba(71, 86, 91, 0.07)";
    ctx.lineWidth = 1;
    for (let x = -floorTop; x < w; x += 42) {
      ctx.beginPath();
      ctx.moveTo(x, floorTop);
      ctx.lineTo(x + floorTop, 0);
      ctx.stroke();
    }

    // Table front edge shadow
    ctx.fillStyle = "rgba(28, 32, 40, 0.18)";
    ctx.fillRect(0, floorTop - 4, w, 4);
    ctx.fillStyle = "rgba(28, 32, 40, 0.10)";
    ctx.fillRect(0, floorTop, w, 6);

    ctx.restore();
  }

  function pointInReferenceSheet(x, y) {
    const layout = currentLayout();
    return x >= layout.refX && y >= layout.refY && x <= layout.refX + layout.refW && y <= layout.refY + layout.refH;
  }

  function canDropToFloorAt(x, y) {
    if (boardCellFromPoint(x, y)) return false;
    if (shouldShowTray() && pointInTray(x, y)) return false;
    if (shouldShowTray() && pointInTrayDumpButton(x, y)) return false;
    if (pointInReferenceSheet(x, y)) return false;
    if (pointInLampSwitch(x, y)) return false;
    return true;
  }

  function dropHeldBeadToFloor(x, y) {
    if (state.phase !== "place") return false;
    if (useMobileDirectPlacement()) return false;
    if (!canDropToFloorAt(x, y)) return false;
    let code = null;
    if (state.tool === "tweezers") {
      if (!state.tweezerBead) return false;
      code = state.tweezerBead;
      state.tweezerBead = null;
    } else {
      if (!state.needleLoaded || !state.trayColor) return false;
      code = state.trayColor;
      state.needleLoaded = Math.max(0, state.needleLoaded - 1);
      state.trayProgress = clamp(state.trayProgress - 0.06, 0, 100);
    }
    const drop = {
      x,
      y,
      code,
      orientation: Math.random() < 0.5 ? "h" : "v",
      seed: pseudoRandom(`${state.selectedPattern.id}-${Date.now()}-${x}-${y}`),
      bornAt: performance.now(),
      duration: 760 + Math.round(pseudoRandom(`${state.selectedPattern.id}-${x}-${y}-dur`) * 260),
      spinDir: pseudoRandom(`${state.selectedPattern.id}-${x}-${y}-spin`) > 0.5 ? 1 : -1,
    };
    state.floorDrops.push(drop);
    if (state.floorDrops.length > 52) state.floorDrops.shift();
    showToast(`${beadLabel(code)} 掉到地板上了。`);
    state.savedCurrent = false;
    markDirty();
    return true;
  }

  function drawFloorDrops(layout) {
    if (!state.floorDrops.length) return;
    const ctx = scene;
    const beadCell = Math.max(14, layout.cell * 0.92);
    const now = performance.now();
    const survivors = [];
    ctx.save();
    state.floorDrops.forEach((drop, i) => {
      const bornAt = typeof drop.bornAt === "number" ? drop.bornAt : now;
      const duration = Math.max(380, Number(drop.duration) || 860);
      const t = clamp((now - bornAt) / duration, 0, 1);
      if (t >= 1) return;
      survivors.push(drop);
      const jitterX = (drop.seed - 0.5) * 1.8;
      const jitterY = ((i % 3) - 1) * 0.26;
      const x = drop.x + jitterX;
      const y = drop.y + jitterY;
      const fade = 1 - t;
      const spin = (drop.spinDir || 1) * easeOut(t) * Math.PI * 1.7;
      const scale = lerp(1, 0.24, easeOut(t));
      ctx.fillStyle = `rgba(34, 38, 48, ${0.14 * fade})`;
      ctx.beginPath();
      ctx.ellipse(
        x + (drop.orientation === "v" ? 0 : 1.4),
        y + beadCell * 0.36 * scale,
        beadCell * 0.42 * scale,
        beadCell * 0.16 * scale,
        0,
        0,
        Math.PI * 2
      );
      ctx.fill();
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(spin);
      ctx.scale(scale, scale);
      ctx.globalAlpha = fade;
      drawFallenBead(ctx, 0, 0, beadCell, drop.code, drop.orientation);
      ctx.restore();
    });
    if (survivors.length !== state.floorDrops.length) {
      state.floorDrops = survivors;
    }
    ctx.restore();
  }

  function lampSwitchRect(layout = currentLayout()) {
    const size = clamp(layout.boardSize * 0.09, 34, 56);
    return {
      x: layout.w - size - 14,
      y: layout.h - size - 14,
      w: size,
      h: size,
    };
  }

  function pointInLampSwitch(x, y) {
    if (!(state.phase === "place" || state.phase === "inspect")) return false;
    const rect = lampSwitchRect();
    return x >= rect.x && y >= rect.y && x <= rect.x + rect.w && y <= rect.y + rect.h;
  }

  function drawLampSwitch(layout) {
    if (!(state.phase === "place" || state.phase === "inspect")) return;
    const ctx = scene;
    const rect = lampSwitchRect(layout);
    const cx = rect.x + rect.w / 2;
    const cy = rect.y + rect.h / 2;
    const hover = pointInLampSwitch(state.pointer.x, state.pointer.y);
    const pressed = performance.now() < state.lampSwitchFlashUntil;
    const lift = pressed ? 0.95 : 1;
    const bodyR = rect.w * 0.34 * lift;

    ctx.save();

    // Power cord runs upward from the switch and vanishes at the table top edge
    // (the lamp body is conceptually behind/above the workspace).
    const cordStartX = rect.x + rect.w * 0.5;
    const cordStartY = rect.y - 2;
    const cordEndX = layout.w - 22;
    const cordEndY = 2;
    ctx.strokeStyle = "rgba(36, 40, 50, 0.42)";
    ctx.lineWidth = 2.6;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(cordStartX, cordStartY);
    ctx.bezierCurveTo(
      cordStartX + 22, cordStartY - 50,
      cordEndX - 24, cordEndY + 80,
      cordEndX, cordEndY
    );
    ctx.stroke();
    ctx.strokeStyle = "rgba(255, 255, 255, 0.22)";
    ctx.lineWidth = 0.9;
    ctx.beginPath();
    ctx.moveTo(cordStartX, cordStartY);
    ctx.bezierCurveTo(
      cordStartX + 22, cordStartY - 50,
      cordEndX - 24, cordEndY + 80,
      cordEndX, cordEndY
    );
    ctx.stroke();
    if (state.lampOn) {
      const glow = ctx.createRadialGradient(cx, cy, bodyR * 0.5, cx, cy, rect.w * 1.45);
      glow.addColorStop(0, "rgba(255, 235, 166, 0.34)");
      glow.addColorStop(0.55, "rgba(255, 238, 184, 0.16)");
      glow.addColorStop(1, "rgba(255, 238, 184, 0)");
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(cx, cy, rect.w * 1.45, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.shadowColor = "rgba(30, 36, 44, 0.2)";
    ctx.shadowBlur = hover ? 16 : 11;
    ctx.shadowOffsetY = hover ? 5 : 4;
    const plate = ctx.createLinearGradient(rect.x, rect.y, rect.x, rect.y + rect.h);
    plate.addColorStop(0, "rgba(255,255,255,0.95)");
    plate.addColorStop(1, "rgba(228, 235, 240, 0.95)");
    ctx.fillStyle = plate;
    roundedPath(ctx, rect.x, rect.y, rect.w, rect.h, rect.w * 0.29);
    ctx.fill();
    ctx.shadowColor = "transparent";
    ctx.strokeStyle = hover ? "rgba(87, 184, 167, 0.58)" : "rgba(96, 110, 122, 0.36)";
    ctx.lineWidth = 1.2;
    roundedPath(ctx, rect.x, rect.y, rect.w, rect.h, rect.w * 0.29);
    ctx.stroke();

    const baseW = rect.w * 0.28;
    const baseH = rect.h * 0.16 * lift;
    ctx.fillStyle = "rgba(112, 121, 132, 0.85)";
    roundedPath(ctx, cx - baseW / 2, cy + rect.h * 0.09, baseW, baseH, baseH * 0.45);
    ctx.fill();

    const bulb = ctx.createRadialGradient(cx - bodyR * 0.2, cy - bodyR * 0.28, bodyR * 0.2, cx, cy, bodyR);
    bulb.addColorStop(0, state.lampOn ? "#fffdf3" : "#f8fbff");
    bulb.addColorStop(0.58, state.lampOn ? "#ffe9a8" : "#dfe7ef");
    bulb.addColorStop(1, state.lampOn ? "#efbe65" : "#bcc8d4");
    ctx.fillStyle = bulb;
    ctx.beginPath();
    ctx.arc(cx, cy - rect.h * 0.02, bodyR, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = state.lampOn ? "rgba(193, 141, 61, 0.76)" : "rgba(103, 117, 131, 0.55)";
    ctx.lineWidth = 1.2;
    ctx.stroke();

    ctx.strokeStyle = state.lampOn ? "rgba(136, 92, 38, 0.62)" : "rgba(103, 117, 131, 0.52)";
    ctx.lineWidth = 1.35;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(cx - bodyR * 0.34, cy - rect.h * 0.06);
    ctx.quadraticCurveTo(cx, cy + bodyR * 0.18, cx + bodyR * 0.34, cy - rect.h * 0.06);
    ctx.stroke();

    ctx.fillStyle = "rgba(38, 36, 43, 0.72)";
    ctx.font = "700 10px Avenir Next, PingFang SC, Hiragino Sans GB, Microsoft YaHei, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(state.lampOn ? "ON" : "OFF", cx, rect.y + rect.h + 12);
    ctx.textAlign = "left";
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
    ctx.fillText("针", infoX, infoY);
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
      const by = y + 20 + i * 11.8;
      const fillStart = Math.max(0, cap - state.needleLoaded);
      if (i >= fillStart) {
        drawFallenBead(ctx, x, by, 12, loadedCode, "v");
      } else {
        ctx.fillStyle = "rgba(102, 116, 128, 0.18)";
        roundedPath(ctx, x - 4.5, by - 5.9, 9, 11.8, 2.6);
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
    const boardView = boardViewTransform(layout);
    const size = state.selectedPattern.size;
    ctx.save();
    ctx.translate(boardView.cx + boardView.panX, boardView.cy + boardView.panY);
    ctx.scale(boardView.scale, boardView.scale);
    ctx.translate(-boardView.cx, -boardView.cy);

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

    const guideVisible = state.lampOn && (state.phase === "place" || state.phase === "inspect");
    const templateOpacity = guideVisible ? (state.phase === "place" ? 0.1 : 0.08) : 0;
    if (guideVisible) {
      drawProjectedGuide(layout);
    }
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
          const pegR = cell * 0.138;
          ctx.fillStyle = "rgba(91, 104, 118, 0.32)";
          ctx.beginPath();
          ctx.arc(px + cell / 2, py + cell / 2, pegR, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = "rgba(255,255,255,0.58)";
          ctx.beginPath();
          ctx.arc(px + cell / 2 - pegR * 0.22, py + cell / 2 - pegR * 0.22, pegR * 0.36, 0, Math.PI * 2);
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
        const shapeProfile = boardFusionShapeProfile(x, y);
        if (isSpillDamagedIndex(index)) {
          drawDamagedBead(ctx, cx, cy, cell * 0.43, code, heat, boardFusedPhase, shapeProfile);
        } else {
          drawBead(ctx, cx, cy, cell * 0.43, code, heat, boardFusedPhase, shapeProfile);
        }
        drawPegInBead(ctx, cx, cy, cell * 0.43, heat, boardFusedPhase);
      });
    }

    if (state.phase === "inspect" && state.showHints) {
      drawInspectionHints(layout);
    }

    ctx.restore();
  }

  function drawProjectedGuide(layout) {
    const key = projectedGuideCacheKey(layout);
    if (!state.projectedGuideCache || state.projectedGuideCache.key !== key) {
      state.projectedGuideCache = buildProjectedGuideCache(layout, key);
    }
    if (!state.projectedGuideCache?.canvas) return;
    scene.drawImage(
      state.projectedGuideCache.canvas,
      layout.boardX,
      layout.boardY,
      layout.boardSize,
      layout.boardSize
    );
  }

  function projectedGuideCacheKey(layout) {
    const map = getPatternColorMap();
    const mapSig = Object.keys(map).sort().map((code) => `${code}:${map[code]}`).join(",");
    return [
      baseIdFor(state.selectedPattern),
      state.selectedPattern.size,
      Math.round(layout.boardSize),
      mapSig,
    ].join("|");
  }

  function buildProjectedGuideCache(layout, key) {
    const size = state.selectedPattern.size;
    const boardPx = Math.max(1, Math.round(layout.boardSize));
    const cell = boardPx / size;
    const canvas = document.createElement("canvas");
    canvas.width = boardPx;
    canvas.height = boardPx;
    const ctx = canvas.getContext("2d");
    if (!ctx) return { key, canvas: null };

    const blur = Math.max(1.45, cell * 0.24);

    ctx.save();
    ctx.filter = `blur(${blur}px)`;
    for (let y = 0; y < size; y += 1) {
      for (let x = 0; x < size; x += 1) {
        const code = targetAt(x, y);
        if (!code) continue;
        const cx = x * cell + cell / 2;
        const cy = y * cell + cell / 2;
        ctx.fillStyle = palette[code];
        ctx.globalAlpha = 0.28;
        ctx.beginPath();
        ctx.arc(cx, cy, cell * 0.44, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    ctx.filter = "none";
    ctx.globalAlpha = 0.16;
    for (let y = 0; y < size; y += 1) {
      for (let x = 0; x < size; x += 1) {
        const code = targetAt(x, y);
        if (!code) continue;
        const cx = x * cell + cell / 2;
        const cy = y * cell + cell / 2;
        ctx.fillStyle = palette[code];
        ctx.globalAlpha = 0.14;
        ctx.beginPath();
        ctx.arc(cx, cy, cell * 0.3, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    ctx.restore();

    return { key, canvas };
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

  function boardFusionShapeProfile(x, y) {
    const size = state.selectedPattern.size;
    const has = (cx, cy) => {
      if (cx < 0 || cy < 0 || cx >= size || cy >= size) return false;
      return Boolean(state.placed[indexFor(cx, cy)]);
    };
    const orth =
      Number(has(x - 1, y))
      + Number(has(x + 1, y))
      + Number(has(x, y - 1))
      + Number(has(x, y + 1));
    const edges = {
      left: !has(x - 1, y),
      right: !has(x + 1, y),
      up: !has(x, y - 1),
      down: !has(x, y + 1),
    };
    const cluster = clamp(orth / 4, 0, 1);
    const edgeExposure = 1 - clamp(orth / 4, 0, 1);
    return { cluster, edgeExposure, edges };
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

        const neighbors = [
          [x - 1, y],
          [x + 1, y],
          [x, y - 1],
          [x, y + 1],
        ];
        neighbors.forEach(([nx, ny]) => {
          if (nx < 0 || ny < 0 || nx >= size || ny >= size) return;
          const next = indexFor(nx, ny);
          if (visited[next] || !state.placed[next]) return;
          visited[next] = true;
          queue.push(next);
        });
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

    drawGradientCapsuleBridge(ctx, centerA, centerB, spread, lerp(spread / 2, 3, over), gradient, 0.92);
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
      const shapeProfile = pieceFusionShapeProfile(piece, cell);
      if (isSpillDamagedIndex(cell.index)) {
        drawDamagedBead(ctx, center.x, center.y, layout.cell * 0.43 * scale, cell.code, cell.heat, true, shapeProfile);
      } else {
        drawBead(ctx, center.x, center.y, layout.cell * 0.43 * scale, cell.code, cell.heat, true, shapeProfile);
      }
    });
  }

  function pieceFusionShapeProfile(piece, cell) {
    const has = (x, y) => Boolean(piece.map[`${x},${y}`]);
    const orth =
      Number(has(cell.x - 1, cell.y))
      + Number(has(cell.x + 1, cell.y))
      + Number(has(cell.x, cell.y - 1))
      + Number(has(cell.x, cell.y + 1));
    const edges = {
      left: !has(cell.x - 1, cell.y),
      right: !has(cell.x + 1, cell.y),
      up: !has(cell.x, cell.y - 1),
      down: !has(cell.x, cell.y + 1),
    };
    const cluster = clamp(orth / 4, 0, 1);
    const edgeExposure = 1 - clamp(orth / 4, 0, 1);
    return { cluster, edgeExposure, edges };
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
        const pegR = displayCell * 0.122;
        ctx.fillStyle = "rgba(97, 107, 120, 0.22)";
        ctx.beginPath();
        ctx.arc(px + displayCell / 2, py + displayCell / 2, pegR, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "rgba(255,255,255,0.52)";
        ctx.beginPath();
        ctx.arc(px + displayCell / 2 - pegR * 0.22, py + displayCell / 2 - pegR * 0.22, pegR * 0.35, 0, Math.PI * 2);
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
        const pegR = cell * 0.138;
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
    drawGradientCapsuleBridge(ctx, centerA, centerB, spread, lerp(spread / 2, 3, over), gradient, 0.9);
  }

  function drawGradientCapsuleBridge(ctx, centerA, centerB, width, radius, fillStyle, alpha = 1) {
    const dx = centerB.x - centerA.x;
    const dy = centerB.y - centerA.y;
    const length = Math.hypot(dx, dy);
    if (length < 0.001) return;
    const safeRadius = Math.max(0.8, Math.min(radius, width * 0.5));
    ctx.save();
    ctx.translate(centerA.x, centerA.y);
    ctx.rotate(Math.atan2(dy, dx));
    ctx.globalAlpha = alpha;
    ctx.fillStyle = fillStyle;
    roundedPath(ctx, 0, -width / 2, length, width, safeRadius);
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

  function drawDamagedBead(ctx, x, y, r, code, heat = 0, fused = false, shape = null) {
    const base = palette[code] || "#999";
    const burnt = mixColor(base, "#6b4b44", 0.5);
    const pressRaw = fused ? ((state.phase === "cool" || state.phase === "finish") ? clamp(state.flattening / 100, 0, 1) : 0) : 0;
    const spread = clamp((heat - 30) / 50 + pressRaw * 0.5, 0.35, 1);
    const cluster = shape?.cluster ?? 0.5;
    const edgeExposure = shape?.edgeExposure ?? 0.5;
    const width = r * lerp(2.12, 2.38, spread);
    const height = r * lerp(2.02, 2.24, spread);
    const cornerMin = r * lerp(0.3, 0.14, cluster);
    const corner = lerp(r * 0.58, cornerMin, clamp(spread + (1 - edgeExposure) * 0.18, 0, 1));
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

  function drawHorizontalBead(ctx, x, y, r, code) {
    const base = palette[code] || "#999";
    const length = r * 2.22;
    const thickness = r * 1.88;
    const corner = Math.max(1.8, thickness * 0.2);
    ctx.save();
    ctx.fillStyle = base;
    roundedPath(ctx, x - length / 2, y - thickness / 2, length, thickness, corner);
    ctx.fill();
    ctx.fillStyle = "rgba(255,255,255,0.2)";
    roundedPath(
      ctx,
      x - length * 0.4,
      y - thickness * 0.34,
      length * 0.8,
      Math.max(1.1, thickness * 0.16),
      Math.max(1, corner * 0.45)
    );
    ctx.fill();
    ctx.strokeStyle = "rgba(0,0,0,0.16)";
    ctx.lineWidth = Math.max(0.9, r * 0.15);
    roundedPath(ctx, x - length / 2, y - thickness / 2, length, thickness, corner);
    ctx.stroke();
    ctx.restore();
  }

  function drawTrayBeadRandomized(ctx, x, y, r, code, angle = 0, tilt = 1, heightLift = 0) {
    const base = palette[code] || "#999";
    const length = r * 2.22;
    const thickness = r * 1.88 * tilt;
    const corner = Math.max(1.8, thickness * 0.2);
    ctx.save();
    ctx.translate(x, y - heightLift);
    ctx.rotate(angle);

    // 接触阴影（模拟轻微悬浮和姿态变化）
    ctx.fillStyle = "rgba(0,0,0,0.14)";
    ctx.beginPath();
    ctx.ellipse(0.3, thickness * 0.26, length * 0.42, Math.max(1.2, thickness * 0.22), 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = base;
    roundedPath(ctx, -length / 2, -thickness / 2, length, thickness, corner);
    ctx.fill();
    ctx.fillStyle = "rgba(255,255,255,0.2)";
    roundedPath(
      ctx,
      -length * 0.4,
      -thickness * 0.34,
      length * 0.8,
      Math.max(1.1, thickness * 0.16),
      Math.max(1, corner * 0.45)
    );
    ctx.fill();
    ctx.strokeStyle = "rgba(0,0,0,0.16)";
    ctx.lineWidth = Math.max(0.9, r * 0.15);
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
      const grooveWidth = Math.max(7.6, beadR * 2.25, g.slotGap * 0.44);
      ctx.strokeStyle = "rgba(75, 90, 98, 0.22)";
      ctx.lineWidth = grooveWidth;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(g.lineStartX, y);
      ctx.lineTo(g.lineEndX, y);
      ctx.stroke();
      ctx.strokeStyle = "rgba(255,255,255,0.58)";
      ctx.lineWidth = Math.max(1, grooveWidth * 0.18);
      ctx.beginPath();
      ctx.moveTo(g.lineStartX + 2, y - 1);
      ctx.lineTo(g.lineEndX - 2, y - 1);
      ctx.stroke();
    }

    if (color) {
      const animateScatter = state.pointer.down && state.pointer.mode === "tray";
      const now = animateScatter ? performance.now() / 680 : 0;
      const rowNormDiv = Math.max(1, g.rows - 1);
      for (let row = 0; row < g.rows; row += 1) {
        for (let col = 0; col < g.cols; col += 1) {
          if (!state.trayMatrix[row]?.[col]) continue;
          const center = trayCellCenter(layout, row, col, compact);
          const seedX = pseudoRandom(`${state.selectedPattern.id}-${state.trayColor}-${state.trayPourId}-${row}-${col}-x`);
          const seedY = pseudoRandom(`${state.selectedPattern.id}-${state.trayColor}-${state.trayPourId}-${row}-${col}-y`);
          const seedA = pseudoRandom(`${state.selectedPattern.id}-${state.trayColor}-${state.trayPourId}-${row}-${col}-a`);
          const seedT = pseudoRandom(`${state.selectedPattern.id}-${state.trayColor}-${state.trayPourId}-${row}-${col}-t`);
          const seedH = pseudoRandom(`${state.selectedPattern.id}-${state.trayColor}-${state.trayPourId}-${row}-${col}-h`);
          const seedL = pseudoRandom(`${state.selectedPattern.id}-${state.trayColor}-${state.trayPourId}-${row}-${col}-l`);
          const randX = trayX + 20 + seedX * (trayW - 40);
          const randY = trayY + 20 + seedY * (trayH - 54);
          // 每颗豆独立收拢进度：避免“全体同步排齐”，更接近真实整理过程
          const lag = seedL * 0.58 + (row / rowNormDiv) * 0.14;
          const localP = p <= lag ? 0 : clamp((p - lag) / Math.max(0.08, 1 - lag), 0, 1);
          const settleNoiseX = (seedX - 0.5) * lerp(1.9, 0.55, localP);
          const settleNoiseY = (seedY - 0.5) * lerp(1.4, 0.4, localP);
          const targetX = center.x + settleNoiseX;
          const targetY = center.y + settleNoiseY;
          const jitterX = animateScatter ? Math.sin(now + row * 0.6 + col * 0.35) * (1 - localP) * 6.2 : 0;
          const jitterY = animateScatter ? Math.cos(now * 0.8 + row * 0.4 + col * 0.45) * (1 - localP) * 5.1 : 0;
          const x = lerp(randX, targetX, localP) + jitterX;
          const y = lerp(randY, targetY, localP) + jitterY;
          const chaos = 1 - localP;
          const randomAngle = (seedA - 0.5) * Math.PI * 0.95;
          const angle = randomAngle * (0.14 + chaos * 0.86);
          const randomTilt = 0.72 + seedT * 0.5;
          const tilt = lerp(randomTilt, 1 - (seedT - 0.5) * 0.12, localP);
          const lift = chaos * (seedH * 1.5);
          drawTrayBeadRandomized(ctx, x, y, beadR, color, angle, tilt, lift);
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
      ctx.fillText(`豆筛 ${beadLabel(color)}`, trayX + 18, trayY + trayH - 14);
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
    const legendAll = getPatternColors(pattern);
    const preferSingleLegend = legendAll.length <= 6;
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
    ctx.save();
    roundedPath(ctx, refX + 3, refY + 3, refW - 6, refH - 6, 6);
    ctx.clip();

    ctx.fillStyle = "#f7f4ec";
    roundedRect(gridX - 5, gridY - 5, gridSize + 10, gridSize + 10, 5);
    ctx.fill();
    const rows = getEffectiveTargetRows(pattern);
    rows.forEach((row, y) => {
      [...row].forEach((code, x) => {
        ctx.strokeStyle = "rgba(103, 98, 86, 0.12)";
        ctx.lineWidth = 0.7;
        ctx.strokeRect(gridX + x * cell, gridY + y * cell, cell, cell);
        if (code === ".") return;
        const px = gridX + x * cell + 0.5;
        const py = gridY + y * cell + 0.5;
        ctx.fillStyle = palette[code];
        ctx.fillRect(px, py, Math.max(1, cell - 1), Math.max(1, cell - 1));
      });
    });

    const textX = gridX + gridSize + 14;
    const textAreaW = Math.max(72, refX + refW - textX - 12);
    let nameSize = preferSingleLegend ? 16 : 14;
    while (nameSize > 12) {
      ctx.font = `700 ${nameSize}px Avenir Next, PingFang SC, Hiragino Sans GB, Microsoft YaHei, sans-serif`;
      if (ctx.measureText(pattern.name).width <= textAreaW) break;
      nameSize -= 1;
    }
    const metaSize = preferSingleLegend ? 12 : 11;
    const nameY = refY + 34;
    const metaY = nameY + 18;
    const legendStartY = metaY + 16;

    ctx.fillStyle = "#26242b";
    ctx.font = `700 ${nameSize}px Avenir Next, PingFang SC, Hiragino Sans GB, Microsoft YaHei, sans-serif`;
    ctx.fillText(fitText(ctx, pattern.name, textAreaW), textX, nameY);
    ctx.fillStyle = "#686572";
    ctx.font = `${metaSize}px Avenir Next, PingFang SC, Hiragino Sans GB, Microsoft YaHei, sans-serif`;
    ctx.fillText(fitText(ctx, `${pattern.size}x${pattern.size} · ${getTargetTotal()} 颗`, textAreaW), textX, metaY);

    const counts = getTargetCounts(pattern);
    const legendAreaW = textAreaW;
    const legendCols = (preferSingleLegend || legendAreaW < 154) ? 1 : 2;
    const colW = legendCols === 1
      ? legendAreaW
      : Math.max(60, Math.floor((legendAreaW - 8) / 2));
    const rowH = legendCols === 1 ? 16 : 15;
    const maxRows = 5;
    const maxLegend = legendCols * maxRows;
    const colors = legendAll.slice(0, maxLegend);
    colors.forEach((code, i) => {
      const col = i % legendCols;
      const row = Math.floor(i / legendCols);
      const x = textX + col * (colW + 8);
      const y = legendStartY + row * rowH;
      ctx.fillStyle = palette[code];
      ctx.beginPath();
      ctx.arc(x, y - 4, legendCols === 1 ? 5.1 : 4.8, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#686572";
      ctx.font = `${legendCols === 1 ? 12 : 11.5}px Avenir Next, PingFang SC, Hiragino Sans GB, Microsoft YaHei, sans-serif`;
      const label = fitText(ctx, `${beadIds[code] || code} x${counts[code] || 0}`, Math.max(22, colW - 12));
      ctx.fillText(label, x + 9, y);
    });
    ctx.restore();
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
        // Mostly green-tinted (well-melted); amber only when noticeably hot,
        // red only when truly scorched. Real perler beads tolerate a lot.
        ctx.globalAlpha = clamp(heat / 140, 0, 0.5);
        ctx.fillStyle = heat > 124 ? "#e7645f" : heat > 96 ? "#d99b3d" : "#57b8a7";
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

    // Scraper animation: a thin blade sliding from below the board up over it.
    if (state.pressAnim) {
      const elapsed = performance.now() - state.pressAnim.startedAt;
      const dur = state.pressAnim.duration;
      const t = clamp(elapsed / dur, 0, 1);
      if (t >= 1) {
        state.pressAnim = null;
      } else {
        // Ease in-out for the sweep
        const ease = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
        const startY = boardY + boardSize + 60; // start below board
        const endY = boardY - 24;               // exit above board
        const cy = lerp(startY, endY, ease);
        const blade = boardSize + 32;
        const bladeX = boardX - 16;
        const bladeH = 22;
        ctx.save();
        // Thin shadow trail showing where it pressed
        const trailH = startY - cy;
        if (trailH > 0) {
          const trailGrad = ctx.createLinearGradient(0, cy, 0, startY);
          trailGrad.addColorStop(0, "rgba(38, 36, 43, 0.18)");
          trailGrad.addColorStop(1, "rgba(38, 36, 43, 0)");
          ctx.fillStyle = trailGrad;
          ctx.fillRect(bladeX, cy, blade, trailH);
        }
        // Scraper body
        ctx.shadowColor = "rgba(0,0,0,0.32)";
        ctx.shadowBlur = 14;
        ctx.shadowOffsetY = 4;
        const bodyGrad = ctx.createLinearGradient(0, cy, 0, cy + bladeH);
        bodyGrad.addColorStop(0, "#dfe6ec");
        bodyGrad.addColorStop(0.5, "#aeb8c6");
        bodyGrad.addColorStop(1, "#828c9b");
        ctx.fillStyle = bodyGrad;
        roundedRect(bladeX, cy, blade, bladeH, 4);
        ctx.fill();
        // Blade edge (the pressing line)
        ctx.shadowColor = "transparent";
        ctx.fillStyle = "rgba(40, 46, 56, 0.8)";
        ctx.fillRect(bladeX + 2, cy - 1, blade - 4, 2);
        // Highlight
        ctx.fillStyle = "rgba(255,255,255,0.6)";
        ctx.fillRect(bladeX + 6, cy + 4, blade - 12, 2);
        // Handle grip dots
        ctx.fillStyle = "rgba(60, 68, 80, 0.55)";
        const dotY = cy + bladeH * 0.55;
        for (let i = 0; i < 5; i += 1) {
          const dx = bladeX + blade * 0.5 + (i - 2) * 18;
          ctx.beginPath();
          ctx.arc(dx, dotY, 1.6, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }
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

  function drawBead(ctx, x, y, r, code, heat = 0, fused = false, shape = null) {
    const base = palette[code] || "#999";
    const color = fusedColor(code, heat);
    const pressRaw = fused ? ((state.phase === "cool" || state.phase === "finish") ? clamp(state.flattening / 100, 0, 1) : 0) : 0;
    const heatWeight = clamp((heat - 28) / 46, 0, 1);
    const pressBoost = pressRaw * (0.12 + heatWeight * 0.88);
    // melt: 0 (raw cylinder) → 1 (fully fused).
    const melt = fused ? clamp((heat - 30) / 70 + pressBoost * 0.6, 0, 1) : 0;

    const edges = shape?.edges || { left: true, right: true, up: true, down: true };
    const exposedCount = (edges.left ? 1 : 0) + (edges.right ? 1 : 0) + (edges.up ? 1 : 0) + (edges.down ? 1 : 0);

    // 物理：贴邻居的一侧被挤平，恰好填到 cell 中线（r·1.18）；
    // 暴露的一侧无约束，融化的塑料向外溢出，凸出 cell 边界（r·1.32）。
    const halfConnected = r * lerp(1.0, 1.18, melt);
    const halfExposed = r * lerp(1.0, 1.32, melt);
    const halfL = edges.left ? halfExposed : halfConnected;
    const halfR = edges.right ? halfExposed : halfConnected;
    const halfU = edges.up ? halfExposed : halfConnected;
    const halfD = edges.down ? halfExposed : halfConnected;

    // 每个角的半径取决于相邻两边是否暴露；两边都暴露时取相邻 half 的较小者以形成完整四分之一圆。
    const cornerFor = (sideA, sideB, halfA, halfB) => {
      const a = edges[sideA];
      const b = edges[sideB];
      const cap = Math.min(halfA, halfB);
      let target;
      if (a && b) target = cap;
      else if (a || b) target = cap * 0.55;
      else target = cap * 0.08;
      return lerp(cap, target, melt);
    };
    const rTL = cornerFor("up", "left", halfU, halfL);
    const rTR = cornerFor("up", "right", halfU, halfR);
    const rBR = cornerFor("down", "right", halfD, halfR);
    const rBL = cornerFor("down", "left", halfD, halfL);

    const buildPath = (cx, cy) => {
      const left = cx - halfL;
      const right = cx + halfR;
      const top = cy - halfU;
      const bottom = cy + halfD;
      ctx.beginPath();
      ctx.moveTo(left + rTL, top);
      ctx.lineTo(right - rTR, top);
      ctx.arcTo(right, top, right, top + rTR, rTR);
      ctx.lineTo(right, bottom - rBR);
      ctx.arcTo(right, bottom, right - rBR, bottom, rBR);
      ctx.lineTo(left + rBL, bottom);
      ctx.arcTo(left, bottom, left, bottom - rBL, rBL);
      ctx.lineTo(left, top + rTL);
      ctx.arcTo(left, top, left + rTL, top, rTL);
      ctx.closePath();
    };

    // H1 = semi-transparent/frosted bead: visible but lets background show through
    if (beadIds[code] === "H1") {
      ctx.save();
      // soft shadow so it reads against the board
      ctx.globalAlpha = 0.18;
      ctx.fillStyle = "rgba(0,0,0,0.3)";
      buildPath(x + r * 0.06, y + r * 0.1);
      ctx.fill();
      // semi-transparent frosted body
      ctx.globalAlpha = 0.5;
      ctx.fillStyle = "#e8f4ff";
      buildPath(x, y);
      ctx.fill();
      // outline to define the shape
      ctx.globalAlpha = 0.5;
      ctx.strokeStyle = "rgba(100, 140, 195, 0.9)";
      ctx.lineWidth = Math.max(0.8, r * 0.1);
      buildPath(x, y);
      ctx.stroke();
      // specular highlight
      ctx.globalAlpha = 0.85;
      ctx.fillStyle = "rgba(255,255,255,0.95)";
      ctx.beginPath();
      ctx.arc(x - r * 0.28, y - r * 0.28, r * 0.22, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
      return;
    }

    ctx.save();
    ctx.fillStyle = "rgba(0,0,0,0.12)";
    buildPath(x + r * 0.08, y + r * 0.13);
    ctx.fill();

    ctx.fillStyle = color;
    buildPath(x, y);
    ctx.fill();

    ctx.fillStyle = "rgba(255,255,255,0.35)";
    ctx.beginPath();
    ctx.arc(x - r * 0.28, y - r * 0.28, r * lerp(0.25, 0.14, melt), 0, Math.PI * 2);
    ctx.fill();

    const holeFade = fused ? clamp((heat - 42) / 52 + pressBoost * 0.95, 0, 1) : 0;
    const holeR = r * clamp(0.39 - heat / 250 - pressBoost * 0.18, 0, 0.39);
    if (holeR > r * 0.035 && holeFade < 0.98) {
      const holeColor = mixColor("#f6f8fa", color, holeFade);
      ctx.globalAlpha = 1 - holeFade * 0.72;
      ctx.fillStyle = heat > 112 ? mixColor(base, "#6b4b44", 0.35) : holeColor;
      if (exposedCount === 0 && melt > 0.5 && heat < 108) {
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
    buildPath(x, y);
    ctx.stroke();
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
    // Only beads that are really cooked start tinting — real perler beads keep
    // their color through most of the iron pass and only yellow when scorched.
    const hotAmount = clamp((heat - 105) / 60, 0, 0.34);
    return heat > 105 ? mixColor(base, "#e8a472", hotAmount) : base;
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

  function fitText(ctx, text, maxWidth) {
    if (maxWidth <= 0) return "";
    if (ctx.measureText(text).width <= maxWidth) return text;
    const ellipsis = "…";
    let out = text;
    while (out.length > 0 && ctx.measureText(`${out}${ellipsis}`).width > maxWidth) {
      out = out.slice(0, -1);
    }
    return out ? `${out}${ellipsis}` : ellipsis;
  }

  function drawPreview() {
    setupHiDpiCanvas(previewCanvas, preview);
    const { w, h, cell, x0, y0 } = getPreviewLayout();
    preview.clearRect(0, 0, w, h);
    preview.fillStyle = "#f7f8fa";
    preview.fillRect(0, 0, w, h);
    const pattern = state.selectedPattern;
    preview.save();
    preview.fillStyle = "#fbfcfe";
    roundedPath(preview, x0 - 8, y0 - 8, cell * pattern.size + 16, cell * pattern.size + 16, 8);
    preview.fill();
    const rows = getEffectiveTargetRows(pattern);
    for (let y = 0; y < pattern.size; y += 1) {
      for (let x = 0; x < pattern.size; x += 1) {
        const code = rows[y]?.[x] || ".";
        const px = x0 + x * cell;
        const py = y0 + y * cell;
        if (code === ".") {
          preview.fillStyle = (x + y) % 2 === 0 ? "#e8edf3" : "#eef2f7";
          preview.fillRect(px, py, cell - 1, cell - 1);
          continue;
        }
        preview.fillStyle = palette[code] || "#bbb";
        preview.fillRect(px, py, cell - 1, cell - 1);
      }
    }
    preview.strokeStyle = "rgba(120, 132, 148, 0.3)";
    preview.lineWidth = 1;
    preview.strokeRect(x0 - 0.5, y0 - 0.5, cell * pattern.size + 1, cell * pattern.size + 1);
    preview.restore();
  }

  function getPreviewLayout() {
    const rect = previewCanvas.getBoundingClientRect();
    const w = rect.width;
    const h = rect.height;
    const size = state.selectedPattern.size;
    // Fix the board to a constant square footprint so changing the grid
    // resolution (size) only changes cell density, not the total board area.
    const boardSide = Math.max(1, Math.min(w - 28, h - 28));
    const cell = boardSide / size;
    const x0 = (w - boardSide) / 2;
    const y0 = (h - boardSide) / 2;
    return { w, h, cell, x0, y0, size };
  }

  function previewCellFromPoint(clientX, clientY) {
    const rect = previewCanvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    const layout = getPreviewLayout();
    if (x < layout.x0 || y < layout.y0) return null;
    if (x > layout.x0 + layout.cell * layout.size || y > layout.y0 + layout.cell * layout.size) return null;
    return {
      x: clamp(Math.floor((x - layout.x0) / layout.cell), 0, layout.size - 1),
      y: clamp(Math.floor((y - layout.y0) / layout.cell), 0, layout.size - 1),
    };
  }

  function handlePreviewPickRemap(event) {
    if (state.phase !== "choose") return;
    const cell = previewCellFromPoint(event.clientX, event.clientY);
    if (!cell) return;
    const sourceCode = state.selectedPattern.rows[cell.y]?.[cell.x] || ".";
    if (sourceCode === ".") return;
    openRemapModal(sourceCode);
  }

  function renderUI() {
    if (els.studioGrid) els.studioGrid.dataset.phase = state.phase;
    if (state.patternsDirty) {
      renderPatterns();
      state.patternsDirty = false;
    }
    renderPhases();
    renderCurrentPatternChip();
    renderControls();
    renderToolRack();
    renderPalette();
    renderPaletteSizeControls();
    renderCustomStats();
    renderPatternColorStats();
    renderSidebarReference();
    const counts = getTargetCounts();
    const colorCount = Object.keys(counts).length;
    els.patternMeta.textContent = `${state.selectedPattern.size}x${state.selectedPattern.size} · ${state.paletteSize}色板`;
    els.targetCount.textContent = `${getTargetTotal()} 颗 / ${colorCount} 色`;
    els.collectionCount.textContent = String(collection.length);
    if (els.settingsDot) els.settingsDot.hidden = collection.length === 0;
    if (state.phase === "inspect") {
      els.colorMeta.textContent = "检查辅助";
    } else {
      els.colorMeta.textContent = beadLabel(state.selectedColor);
    }
    if (els.rightPanelTitle) {
      els.rightPanelTitle.textContent = state.phase === "inspect" ? "检查台" : "豆盒";
    }
    if (els.sandboxButton) {
      const beakerIcon = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 3h6"/><path d="M10 3v6.5L5 19a1.6 1.6 0 0 0 1.4 2.4h11.2A1.6 1.6 0 0 0 19 19l-5-9.5V3"/><path d="M7.5 14h9"/></svg>';
      const loupeIcon = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.2-3.2"/></svg>';
      els.sandboxButton.innerHTML = state.sandboxMode ? beakerIcon : loupeIcon;
      els.sandboxButton.title = state.sandboxMode ? "沙盒：开（自由拼摆不校验）" : "沙盒：自由拼摆不校验";
      els.sandboxButton.setAttribute("aria-label", state.sandboxMode ? "沙盒模式：开" : "沙盒模式：关");
      els.sandboxButton.classList.toggle("active", state.sandboxMode);
    }
    if (els.chooseStartButton) els.chooseStartButton.hidden = state.phase !== "choose";
    if (els.bgThemeSelect) els.bgThemeSelect.value = state.bgTheme;
    if (els.topToolStyleSelect) {
      if (!els.topToolStyleSelect.options.length) {
        const options = Object.entries(toolStyles)
          .map(([id, style]) => `<option value="${id}">${style.name}</option>`)
          .join("");
        els.topToolStyleSelect.innerHTML = options;
      }
      els.topToolStyleSelect.value = state.toolStyle;
    }
    const toolStyleField = els.topToolStyleSelect?.closest(".tool-style-picker");
    if (toolStyleField) toolStyleField.style.display = useMobileDirectPlacement() ? "none" : "";
    els.statusLine.textContent = statusText();
    const showPlacementUi = state.phase === "place";
    const showToolUi = showPlacementUi && !useMobileDirectPlacement();
    const showBoardZoomUi = state.phase === "place" || state.phase === "inspect";
    if (!showPlacementUi) {
      state.lastPlaceHintKey = "";
      hidePlaceHint();
    }
    const showRightPanelUi = state.phase === "place" || state.phase === "inspect";
    if (els.toolRack) els.toolRack.style.display = showToolUi ? "" : "none";
    if (els.colorPalette) els.colorPalette.style.display = showRightPanelUi ? "" : "none";
    if (els.colorMeta) els.colorMeta.style.display = showRightPanelUi ? "" : "none";
    if (els.toolMeta) els.toolMeta.style.display = showToolUi ? "" : "none";
    if (els.boardZoomControls) els.boardZoomControls.hidden = !showBoardZoomUi;
    if (state.remapModalOpen) renderRemapModal();
  }

  function renderPatternColorStats() {
    if (!els.patternColorStats) return;
    const sourceCounts = getSourceCounts();
    const map = state.patternColorMap || {};
    const activeCodes = new Set(allColorCodes());
    const items = Object.entries(sourceCounts)
      .map(([sourceCode, count]) => {
        const targetCode = activeCodes.has(map[sourceCode]) ? map[sourceCode] : sourceCode;
        return { sourceCode, targetCode, count };
      })
      .sort((a, b) => b.count - a.count || (beadIds[a.targetCode] || a.targetCode).localeCompare(beadIds[b.targetCode] || b.targetCode, "zh-Hans-CN", { numeric: true }))
      .slice(0, 10);
    els.patternColorStats.innerHTML = items.map((item) => {
      return `
      <button type="button" class="pattern-color-chip" data-source-code="${item.sourceCode}" title="点击换色：${beadIds[item.targetCode] || item.targetCode}" aria-label="换色 ${beadIds[item.targetCode] || item.targetCode}">
        <span class="dot" style="background:${palette[item.targetCode]}"></span>
        <span class="code">${beadIds[item.targetCode] || item.targetCode}</span>
        <span class="count">${item.count}</span>
      </button>
    `;
    }).join("");
  }

  function renderSidebarReference() {
    if (!els.sideReference || !sideReferenceCanvas || !sideReferenceCtx) return;
    const visible = state.phase !== "choose";
    els.sideReference.hidden = !visible;
    if (!visible) return;

    const pattern = state.selectedPattern;
    const size = pattern.size;
    const ctx = sideReferenceCtx;
    const rect = sideReferenceCanvas.getBoundingClientRect();
    const cssW = Math.max(1, Math.round(rect.width || 300));
    const cssH = Math.max(1, Math.round(rect.height || cssW));
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const pixelW = Math.max(1, Math.round(cssW * dpr));
    const pixelH = Math.max(1, Math.round(cssH * dpr));
    if (sideReferenceCanvas.width !== pixelW || sideReferenceCanvas.height !== pixelH) {
      sideReferenceCanvas.width = pixelW;
      sideReferenceCanvas.height = pixelH;
    }
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, pixelW, pixelH);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const w = cssW;
    const h = cssH;
    const cell = Math.max(2, Math.floor(Math.min((w - 24) / size, (h - 24) / size)));
    const gridSize = cell * size;
    const x0 = Math.floor((w - gridSize) / 2);
    const y0 = Math.floor((h - gridSize) / 2);
    const rows = getEffectiveTargetRows(pattern);

    ctx.fillStyle = "#f7f9fc";
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(x0 - 6, y0 - 6, gridSize + 12, gridSize + 12);
    for (let y = 0; y < size; y += 1) {
      for (let x = 0; x < size; x += 1) {
        ctx.strokeStyle = "rgba(100, 109, 126, 0.16)";
        ctx.lineWidth = 1;
        ctx.strokeRect(x0 + x * cell, y0 + y * cell, cell, cell);
        const code = rows[y]?.[x] || ".";
        if (code === ".") continue;
        ctx.fillStyle = palette[code];
        ctx.fillRect(x0 + x * cell + 0.5, y0 + y * cell + 0.5, Math.max(1, cell - 1), Math.max(1, cell - 1));
      }
    }
    ctx.strokeStyle = "rgba(79, 92, 116, 0.32)";
    ctx.lineWidth = 1.2;
    ctx.strokeRect(x0 - 6, y0 - 6, gridSize + 12, gridSize + 12);

    if (els.sideReferenceMeta) {
      els.sideReferenceMeta.textContent = `${pattern.name} · ${size}x${size}`;
    }
    if (els.sideReferenceLegend) {
      const counts = getTargetCounts(pattern);
      const list = Object.entries(counts)
        .sort((a, b) => b[1] - a[1] || (beadIds[a[0]] || a[0]).localeCompare(beadIds[b[0]] || b[0], "zh-Hans-CN", { numeric: true }))
        .slice(0, 8);
      els.sideReferenceLegend.innerHTML = list.map(([code, count]) => `
        <span class="side-reference-chip">
          <i style="background:${palette[code]}"></i>
          <b>${beadIds[code] || code}</b>
          <em>${count}</em>
        </span>
      `).join("");
    }
  }

  function clearHiddenPreviewSources(silent = false) {
    const pattern = state.selectedPattern;
    const patternId = baseIdFor(pattern);
    const hidden = getPatternHiddenSourceList();
    if (!hidden.length) return false;
    state.patternHiddenSources[patternId] = [];
    if (isCustomFromImagePattern(pattern)) {
      delete state.customHiddenRecalcCache[patternId];
      delete state.customHiddenRecalcPending[patternId];
      delete state.customHiddenRecalcQueued[patternId];
    }
    invalidateEffectiveMap();
    state.previewDirty = true;
    const available = getPatternColors();
    if (!available.includes(state.selectedColor)) state.selectedColor = available[0] || state.selectedColor;
    if (!silent) showToast("已恢复所有隐藏颜色。");
    markDirty();
    return true;
  }

  function handlePatternColorChipToggle(event) {
    const button = event.target.closest(".pattern-color-chip[data-source-code]");
    if (!button) return;
    const sourceCode = button.getAttribute("data-source-code");
    if (!sourceCode) return;
    openRemapModal(sourceCode);
  }

  function renderPatterns() {
    els.patternList.innerHTML = "";
    const customPattern = findCustomPattern();
    const customButton = document.createElement("button");
    customButton.className = `pattern-card${state.selectedPattern.id.startsWith("custom-") ? " active" : ""}`;
    customButton.type = "button";
    customButton.innerHTML = `
      <canvas class="pattern-thumb" width="58" height="58" aria-hidden="true"></canvas>
      <span><strong>自定义图纸</strong><span>${customPattern ? `${customPattern.size}x${customPattern.size}` : "--"}</span></span>
    `;
    customButton.addEventListener("click", () => {
      const customSelected = state.selectedPattern.id.startsWith("custom-");
      if (!customPattern || customSelected) {
        els.customImageInput?.click();
        return;
      }
      loadPattern(customPattern, state.phase !== "choose");
      if (state.phase !== "choose") setPhase("place");
      showToast("已切换到自定义图纸。");
    });
    els.patternList.appendChild(customButton);
    if (customPattern) drawPatternThumb(customButton.querySelector("canvas"), customPattern);
    else drawCustomPatternPlaceholder(customButton.querySelector("canvas"));

    patterns.filter((item) => !item.id.startsWith("custom-")).forEach((pattern) => {
      const displayPattern = resizePattern(pattern, state.patternSize);
      const button = document.createElement("button");
      button.className = `pattern-card${baseIdFor(state.selectedPattern) === pattern.id ? " active" : ""}`;
      button.type = "button";
      button.innerHTML = `
        <canvas class="pattern-thumb" width="58" height="58" aria-hidden="true"></canvas>
        <span><strong>${pattern.name}</strong><span>${displayPattern.size}x${displayPattern.size}</span></span>
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
    const rows = getEffectiveTargetRows(pattern);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#f4f6f8";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    rows.forEach((row, y) => {
      [...row].forEach((code, x) => {
        if (code === ".") return;
        ctx.fillStyle = palette[code];
        ctx.fillRect(offset + x * cell, offset + y * cell, Math.max(1, cell - 1), Math.max(1, cell - 1));
      });
    });
  }

  function drawCustomPatternPlaceholder(canvas) {
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#f3f6fa";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "rgba(128, 140, 156, 0.46)";
    ctx.lineWidth = 1;
    ctx.strokeRect(6.5, 6.5, canvas.width - 13, canvas.height - 13);
    ctx.strokeStyle = "rgba(102, 116, 134, 0.72)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 18);
    ctx.lineTo(canvas.width / 2, canvas.height - 18);
    ctx.moveTo(18, canvas.height / 2);
    ctx.lineTo(canvas.width - 18, canvas.height / 2);
    ctx.stroke();
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
        const size = normalizePatternSize(els.patternSizeSlider?.value || state.patternSize);
        const removeWhite = els.customWhiteToggle.checked;
        setSizeControls(size);
        // Yield a frame so the "正在识别图片…" toast paints before the
        // synchronous conversion (which can briefly block on large images).
        await new Promise((resolve) => setTimeout(resolve, 16));
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
          id: "custom-user",
          name: "自定义图纸",
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
        for (let i = patterns.length - 1; i >= 0; i -= 1) {
          if (patterns[i].id.startsWith("custom-")) patterns.splice(i, 1);
        }
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
    showToast("正在识别图片…");
    reader.readAsDataURL(file);
  }

  function imageToPatternRows(image, removeWhite, size = state.patternSize) {
    return convertImageToPattern(image, { removeWhite, size }).rows;
  }

  function convertImageToPattern(image, options = {}) {
    const targetSize = normalizePatternSize(options.size || state.patternSize);
    const removeWhite = options.removeWhite !== false;
    const excludedCodes = new Set((options.excludedCodes || []).filter((code) => palette[code]));
    const allowExpansion = Boolean(options.allowPaletteExpansionOnExclude) && excludedCodes.size > 0;
    const raw = sampleImageToRgba(image, targetSize, false);
    const rawMask = buildActiveMask(raw, removeWhite);
    const sourceProfile = estimateSourceProfile(raw, rawMask);
    const dominant = convertImageToDominantGrid(
      image,
      targetSize,
      removeWhite,
      sourceProfile,
      excludedCodes,
      allowExpansion
    );
    if (!dominant.activeCells.length) {
      return makeConversionResult(Array(targetSize).fill(".".repeat(targetSize)), targetSize, 0, 0, sourceProfile);
    }
    const grid = dominant.grid;
    const preCleanupColorCount = countGridColors(grid).colors.length;
    let cleaned = removeSpeckles(grid, targetSize, 1, sourceProfile);
    if (sourceProfile.logoLike || targetSize <= 16) {
      cleaned = bridgeLineGaps(cleaned, targetSize, sourceProfile);
    }
    cleaned = collapseToPalette(cleaned, targetSize, dominant.lockedPalette);
    const rows = gridToRows(cleaned, targetSize);
    return makeConversionResult(rows, targetSize, dominant.lockedPalette.length, preCleanupColorCount, sourceProfile);
  }

  function convertImageToDominantGrid(image, targetSize, removeWhite, sourceProfile, excludedCodes, allowExpansion) {
    const analysisSize = clamp(
      Math.round(targetSize * (sourceProfile.logoLike ? 7.5 : sourceProfile.likelyPixelArt ? 6.5 : 6)),
      targetSize,
      960
    );
    const analysis = sampleImageToRgba(image, analysisSize, true);
    const externalWhiteMask = removeWhite ? buildExternalWhiteMask(analysis) : null;
    const availableCodes = allColorCodes().filter((code) => !excludedCodes.has(code));
    if (!availableCodes.length) {
      return { grid: Array(targetSize * targetSize).fill("."), activeCells: [], lockedPalette: [] };
    }
    const activeCells = [];
    for (let y = 0; y < targetSize; y += 1) {
      const y0 = Math.floor((y * analysisSize) / targetSize);
      const y1 = Math.max(y0 + 1, Math.floor(((y + 1) * analysisSize) / targetSize));
      for (let x = 0; x < targetSize; x += 1) {
        const x0 = Math.floor((x * analysisSize) / targetSize);
        const x1 = Math.max(x0 + 1, Math.floor(((x + 1) * analysisSize) / targetSize));
        const dominant = dominantColorInRegion(
          analysis,
          analysisSize,
          x0,
          y0,
          x1,
          y1,
          removeWhite,
          externalWhiteMask
        );
        if (!dominant) continue;
        activeCells.push({
          index: y * targetSize + x,
          r: dominant.r,
          g: dominant.g,
          b: dominant.b,
          lab: rgbToOklab(dominant.r, dominant.g, dominant.b),
        });
      }
    }
    if (!activeCells.length) {
      return { grid: Array(targetSize * targetSize).fill("."), activeCells: [], lockedPalette: [] };
    }
    let maxColors = chooseSimplifiedColorCount(targetSize, activeCells.length, sourceProfile);
    if (allowExpansion) maxColors = clamp(maxColors + 2, 2, 16);
    const clusters = simplifyColors(activeCells, maxColors);
    const paletteHint = getPaletteLimitHint(sourceProfile);
    let finalPaletteCap = chooseFinalPaletteCap(targetSize, activeCells.length, sourceProfile, clusters.length);
    if (allowExpansion) finalPaletteCap = clamp(finalPaletteCap + 2, 2, 14);
    if (paletteHint <= 3) finalPaletteCap = Math.min(finalPaletteCap, paletteHint);
    const lockedPalette = selectPaletteCodes(clusters, finalPaletteCap, excludedCodes);
    if (!lockedPalette.length) {
      return { grid: Array(targetSize * targetSize).fill("."), activeCells, lockedPalette: [] };
    }
    const grid = Array(targetSize * targetSize).fill(".");
    activeCells.forEach((cell) => {
      grid[cell.index] = nearestCodeFromSet(cell.lab, lockedPalette, excludedCodes);
    });
    return { grid, activeCells, lockedPalette };
  }

  function dominantColorInRegion(data, width, startX, startY, endX, endY, removeWhite, externalWhiteMask = null) {
    const buckets = new Map();
    let nonExternalCount = 0;
    const area = Math.max(1, (endX - startX) * (endY - startY));
    for (let y = startY; y < endY; y += 1) {
      for (let x = startX; x < endX; x += 1) {
        const offset = (y * width + x) * 4;
        const index = y * width + x;
        const r = data[offset];
        const g = data[offset + 1];
        const b = data[offset + 2];
        const a = data[offset + 3];
        if (a < 64) continue;
        if (removeWhite && externalWhiteMask?.[index]) continue;
        nonExternalCount += 1;
        const key = `${r >> 3}:${g >> 3}:${b >> 3}`;
        const bucket = buckets.get(key) || { count: 0, r: 0, g: 0, b: 0 };
        bucket.count += 1;
        bucket.r += r;
        bucket.g += g;
        bucket.b += b;
        buckets.set(key, bucket);
      }
    }
    if (!buckets.size) return null;
    if (removeWhite && nonExternalCount / area < 0.16) return null;
    let best = null;
    buckets.forEach((bucket) => {
      if (!best || bucket.count > best.count) best = bucket;
    });
    if (!best) return null;
    const r = Math.round(best.r / best.count);
    const g = Math.round(best.g / best.count);
    const b = Math.round(best.b / best.count);
    return { r, g, b };
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

  function isWhiteLike(r, g, b, a) {
    if (a < 72) return true;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const chroma = max - min;
    const luma = r * 0.299 + g * 0.587 + b * 0.114;
    const brightNeutral = luma >= 236 && chroma <= 26;
    const nearPaper = max >= 224 && min >= 206 && chroma <= 20;
    return brightNeutral || nearPaper;
  }

  function isBackgroundLike(r, g, b, a) {
    if (a < 96) return true;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const chroma = max - min;
    const luma = r * 0.299 + g * 0.587 + b * 0.114;
    if (luma >= 246 && chroma <= 36) return true;
    if (luma >= 232 && chroma <= 24) return true;
    if (luma >= 218 && chroma <= 14) return true;
    return false;
  }

  function inferSquareSizeFromRgba(data) {
    const pixels = Math.floor(data.length / 4);
    const side = Math.round(Math.sqrt(pixels));
    return side > 0 ? side : 1;
  }

  function buildExternalWhiteMask(data, size = null) {
    const side = size || inferSquareSizeFromRgba(data);
    const total = side * side;
    const external = Array(total).fill(false);
    const visited = Array(total).fill(false);
    const stack = [];

    function pushIfEdgeWhite(x, y) {
      if (x < 0 || y < 0 || x >= side || y >= side) return;
      const index = y * side + x;
      if (visited[index]) return;
      const offset = index * 4;
      const r = data[offset];
      const g = data[offset + 1];
      const b = data[offset + 2];
      const a = data[offset + 3];
      if (!isBackgroundLike(r, g, b, a)) return;
      visited[index] = true;
      stack.push(index);
    }

    for (let x = 0; x < side; x += 1) {
      pushIfEdgeWhite(x, 0);
      pushIfEdgeWhite(x, side - 1);
    }
    for (let y = 1; y < side - 1; y += 1) {
      pushIfEdgeWhite(0, y);
      pushIfEdgeWhite(side - 1, y);
    }

    while (stack.length) {
      const index = stack.pop();
      external[index] = true;
      const x = index % side;
      const y = Math.floor(index / side);
      [[1, 0], [-1, 0], [0, 1], [0, -1]].forEach(([dx, dy]) => {
        const nx = x + dx;
        const ny = y + dy;
        if (nx < 0 || ny < 0 || nx >= side || ny >= side) return;
        const next = ny * side + nx;
        if (visited[next]) return;
        const offset = next * 4;
        const r = data[offset];
        const g = data[offset + 1];
        const b = data[offset + 2];
        const a = data[offset + 3];
        if (!isBackgroundLike(r, g, b, a)) return;
        visited[next] = true;
        stack.push(next);
      });
    }

    return external;
  }

  function buildActiveMask(data, removeWhite) {
    const externalWhite = removeWhite ? buildExternalWhiteMask(data) : null;
    const mask = [];
    for (let i = 0, p = 0; i < data.length; i += 4, p += 1) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const a = data[i + 3];
      const externalWhiteCell = Boolean(removeWhite && externalWhite?.[p]);
      mask.push(!(a < 48 || externalWhiteCell));
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
    if (sourceProfile.topTwoRatio >= 0.9) return 2;
    if (hint <= 3 && sourceProfile.topTwoRatio >= 0.7) return 3;
    if (hint <= 4 && sourceProfile.topTwoRatio >= 0.62) return 4;
    if (hint <= 2) return 2;
    if (hint <= 4) return clamp(hint + 1, 2, 6);
    let maxColors = size <= 16 ? 8 : size <= 24 ? 10 : size <= 32 ? 11 : 12;
    if (density > 0.82) maxColors += 1;
    if (density < 0.22) maxColors -= 1;
    if (sourceProfile.coarseCount > 80) maxColors += 1;
    if (sourceProfile.coarseCount < 18) maxColors -= 1;
    if (sourceProfile.likelyPixelArt && hint <= 8) maxColors = Math.min(maxColors, hint + 2);
    maxColors = Math.min(maxColors, hint + 3);
    if (density < 0.3) maxColors -= 1;
    return clamp(maxColors, 2, 14);
  }

  function chooseFinalPaletteCap(size, activeCount, sourceProfile, clusterCount) {
    if (sourceProfile.logoLike) {
      return clamp(sourceProfile.topTwoRatio >= 0.86 ? 2 : 3, 2, 3);
    }
    const hint = sourceProfile.significantCount;
    if (sourceProfile.topTwoRatio >= 0.9) return 2;
    if (hint <= 3 && sourceProfile.topTwoRatio >= 0.7) return 3;
    if (hint <= 4 && sourceProfile.topTwoRatio >= 0.62) return 4;
    if (hint <= 2) return 2;
    if (hint <= 4) return clamp(hint + 1, 2, 6);
    let cap = size <= 16 ? 8 : size <= 24 ? 10 : size <= 32 ? 10 : 12;
    if (activeCount < 128) cap = Math.min(cap, 7);
    if (sourceProfile.coarseCount < 18) cap -= 1;
    if (sourceProfile.likelyPixelArt && hint <= 8) cap = Math.min(cap, hint + 2);
    cap = Math.min(cap, clusterCount, hint + 3);
    return clamp(cap, 2, 12);
  }

  function getPaletteLimitHint(sourceProfile) {
    if (sourceProfile.significantCount <= 2) return 2;
    if (sourceProfile.topTwoRatio >= 0.9) return 2;
    if (sourceProfile.topTwoRatio >= 0.82 && sourceProfile.significantCount <= 6) return 3;
    if (sourceProfile.significantCount <= 4 && sourceProfile.topTwoRatio >= 0.62) return 4;
    if (sourceProfile.likelyPixelArt && sourceProfile.significantCount <= 8) return 6;
    return 12;
  }

  function selectPaletteCodes(clusters, paletteCap, excludedCodes = null) {
    const weighted = new Map();
    clusters.forEach((cluster) => {
      const code = nearestColorCode(cluster.r, cluster.g, cluster.b, excludedCodes);
      if (!code) return;
      weighted.set(code, (weighted.get(code) || 0) + (cluster.count || 1));
    });
    const sorted = [...weighted.entries()]
      .sort((a, b) => b[1] - a[1] || (beadIds[a[0]] || a[0]).localeCompare(beadIds[b[0]] || b[0], "zh-Hans-CN", { numeric: true }))
      .map(([code]) => code);
    const selected = sorted.slice(0, Math.max(1, paletteCap));
    if (selected.length) return selected;
    const fallback = clusters
      .slice()
      .sort((a, b) => (b.count || 0) - (a.count || 0))
      .map((cluster) => nearestColorCode(cluster.r, cluster.g, cluster.b, excludedCodes))
      .find((code) => Boolean(code));
    return fallback ? [fallback] : [];
  }

  function nearestCodeFromSet(lab, codes, excludedCodes = null) {
    let best = codes[0] || "K";
    let bestDistance = Infinity;
    codes.forEach((code) => {
      if (excludedCodes?.has(code)) return;
      const distance = oklabDistance(lab, beadOklab(code));
      if (distance < bestDistance) {
        bestDistance = distance;
        best = code;
      }
    });
    if (bestDistance === Infinity) return nearestColorCodeByLab(lab, excludedCodes);
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

  function nearestColorCodeByLab(lab, excludedCodes = null) {
    let best = "K";
    let bestDistance = Infinity;
    allColorCodes().forEach((code) => {
      if (excludedCodes?.has(code)) return;
      const distance = oklabDistance(lab, beadOklab(code));
      if (distance < bestDistance) {
        bestDistance = distance;
        best = code;
      }
    });
    if (bestDistance === Infinity) return null;
    return best;
  }

  function nearestColorCode(r, g, b, excludedCodes = null) {
    const lab = rgbToOklab(r, g, b);
    return nearestColorCodeByLab(lab, excludedCodes);
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
    if (!els.workflowProgress) return;
    const activeIndex = phases.findIndex((phase) => phase.id === state.phase);
    els.workflowProgress.innerHTML = "";
    phases.forEach((phase, index) => {
      if (index > 0) {
        const sep = document.createElement("span");
        sep.className = "workflow-sep";
        sep.setAttribute("aria-hidden", "true");
        els.workflowProgress.appendChild(sep);
      }
      const item = document.createElement("button");
      item.type = "button";
      item.className = `workflow-step${index === activeIndex ? " active" : ""}${index < activeIndex ? " done" : ""}`;
      item.setAttribute("aria-label", `${index + 1} ${phase.name}`);
      item.innerHTML = `<span class="step-dot">${index + 1}</span><span>${phase.name}</span>`;
      item.disabled = index >= activeIndex;
      item.addEventListener("click", () => {
        if (index >= activeIndex) return;
        const target = phase.id;
        if (target === "choose") {
          if (
            (placedCount() > 0 || state.fusedPieces.length > 0) &&
            !window.confirm("回到选图会离开当前作品的进度，确定吗？")
          ) {
            return;
          }
          setPhase("choose");
          return;
        }
        const losesFused =
          state.fusedPieces.length > 0 &&
          (target === "place" || target === "inspect" || target === "iron");
        if (losesFused && !window.confirm("回退到该步会清除已熨烫/冷却的结果，确定吗？")) {
          return;
        }
        setPhase(target);
      });
      els.workflowProgress.appendChild(item);
    });
    if (state.pendingWorkflowScroll) {
      state.pendingWorkflowScroll = false;
      scrollActiveWorkflowStep();
    }
    if (state.pendingPageReset) {
      state.pendingPageReset = false;
      resetPhaseViewport();
    }
  }

  function scrollActiveWorkflowStep() {
    const activeStep = els.workflowProgress?.querySelector(".workflow-step.active");
    if (!activeStep) return;
    window.requestAnimationFrame(() => {
      activeStep.scrollIntoView({
        block: "nearest",
        inline: "center",
        behavior: prefersReducedMotion() ? "auto" : "smooth",
      });
    });
  }

  function renderCurrentPatternChip() {
    if (!els.currentPatternChip) return;
    const visible = state.phase !== "choose";
    els.currentPatternChip.dataset.visible = visible ? "true" : "false";
    if (!visible) return;
    if (els.currentPatternName) els.currentPatternName.textContent = state.selectedPattern.name;
    if (els.currentPatternMeta) {
      const counts = getTargetCounts();
      const colorCount = Object.keys(counts).length;
      els.currentPatternMeta.textContent = `${state.selectedPattern.size}×${state.selectedPattern.size} · ${getTargetTotal()}颗 · ${colorCount}色`;
    }
    if (els.currentPatternThumb) {
      drawPatternThumb(els.currentPatternThumb, state.selectedPattern);
    }
  }


  // --- Modal focus management (a11y): trap focus and restore on close ---
  function getOpenModalEl() {
    if (state.remapModalOpen) return els.remapModal;
    if (state.collectionModalOpen) return els.collectionModal;
    if (state.settingsModalOpen) return els.settingsModal;
    if (state.shareModalOpen) return els.shareModal;
    return null;
  }

  function focusablesIn(modalEl) {
    if (!modalEl) return [];
    return [...modalEl.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )].filter((el) => !el.disabled && el.offsetParent !== null && el.getAttribute("aria-hidden") !== "true");
  }

  function onModalOpened(modalEl) {
    if (!modalEl) return;
    const active = document.activeElement;
    // Remember the real trigger (skip if focus is already inside any modal).
    if (active && active !== document.body && !active.closest(".remap-modal")) {
      state.modalReturnFocus = active;
    }
    const focusables = focusablesIn(modalEl);
    if (focusables.length) focusables[0].focus();
  }

  function restoreModalFocus() {
    if (getOpenModalEl()) return; // another modal is still open
    const el = state.modalReturnFocus;
    state.modalReturnFocus = null;
    if (el && typeof el.focus === "function" && document.contains(el)) el.focus();
  }

  function openCollectionModal() {
    if (!els.collectionModal) return;
    state.collectionModalOpen = true;
    els.collectionModal.classList.add("show");
    els.collectionModal.setAttribute("aria-hidden", "false");
    renderCollection();
    onModalOpened(els.collectionModal);
  }

  function closeCollectionModal() {
    if (!els.collectionModal) return;
    state.collectionModalOpen = false;
    els.collectionModal.classList.remove("show");
    els.collectionModal.setAttribute("aria-hidden", "true");
    const viewer = els.collectionModal.querySelector(".collection-enlarged");
    if (viewer) viewer.classList.remove("show");
    restoreModalFocus();
  }

  function openShareModal() {
    if (!els.shareModal) return;
    state.shareModalOpen = true;
    els.shareModal.classList.add("show");
    els.shareModal.setAttribute("aria-hidden", "false");
    renderSharePanel();
    onModalOpened(els.shareModal);
  }

  function closeShareModal() {
    if (!els.shareModal) return;
    state.shareModalOpen = false;
    els.shareModal.classList.remove("show");
    els.shareModal.setAttribute("aria-hidden", "true");
    restoreModalFocus();
  }

  function openSettingsModal() {
    if (!els.settingsModal) return;
    state.settingsModalOpen = true;
    els.settingsModal.classList.add("show");
    els.settingsModal.setAttribute("aria-hidden", "false");
    onModalOpened(els.settingsModal);
  }

  function closeSettingsModal() {
    if (!els.settingsModal) return;
    state.settingsModalOpen = false;
    els.settingsModal.classList.remove("show");
    els.settingsModal.setAttribute("aria-hidden", "true");
    restoreModalFocus();
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
    els.controlTitle.textContent = phases.find((phase) => phase.id === state.phase)?.name || "工具台";
    els.toolMeta.textContent = state.phase === "place" && !useMobileDirectPlacement()
      ? (state.tool === "needle"
        ? "豆针"
        : `镊子${state.tweezerBead ? ` · ${beadIds[state.tweezerBead]}` : " · 空夹"}`)
      : "";

    if (state.phase === "choose") {
      return;
    }

    if (state.phase === "place") {
      const placeHintText = state.spill
        ? "有一颗豆子倒下来卡住了。你可以先继续摆放，熨烫前记得处理。"
        : (useMobileDirectPlacement()
          ? "从豆盒选颜色，点格子放置或替换；同色再点一次会取下。"
          : (state.tool === "needle"
          ? `点击豆盒倒豆进筛；点豆筛某条槽给豆针上豆（最多 ${needleCapacity()} 颗）。`
          : (state.tweezerBead ? `镊子正夹着 ${beadLabel(state.tweezerBead)}，点击空格放下。` : "镊子可从豆筛点取一颗，或从板面夹起一颗再放下。")));
      const placeHintKey = state.spill
        ? `spill:${state.spill.index}:${state.spill.code}`
        : (useMobileDirectPlacement()
          ? `mobile:${state.selectedColor}`
          : `${state.tool}:${state.trayColor || "-"}:${state.trayBeans}:${state.needleLoaded}:${state.tweezerBead || "-"}`);
      showPlaceHint(placeHintText, placeHintKey);
      addControlRow([
        ["检查作品", "primary-button", () => setPhase("inspect")],
        ["清空板面", "danger-button", () => clearBoard()],
      ]);      return;
    }

    if (state.phase === "inspect") {
      const summary = inspectionSummary();
      addHint(state.sandboxMode
        ? "沙盒模式不做漏放/错色校验，可直接进入熨烫。"
        : `漏放 ${summary.missing}，错色 ${summary.wrong}，多放 ${summary.extra}。`);
      if (state.spill) {
        addHint("还有倒下的豆子没夹起。继续熨烫会把这颗豆糊在板面上。");
      }
      const hintsOn = state.showHints;
      addControlRow([
        ["", `icon-pill ${hintsOn ? "active" : ""}`, () => {
          state.showHints = !state.showHints;
          markDirty();
        }, false, {
          icon: hintsOn
            ? '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3l18 18"/><path d="M9.88 5.07A11 11 0 0 1 12 5c5.5 0 9.27 4.07 10 7-0.42 1.66-1.66 3.6-3.5 5.06"/><path d="M6.13 6.13C4.06 7.62 2.59 9.79 2 12c0.73 2.93 4.5 7 10 7 1.7 0 3.27-0.38 4.66-1"/><path d="M10.59 10.59A2 2 0 0 0 13.41 13.41"/></svg>'
            : '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg>',
          ariaLabel: hintsOn ? "隐藏提示" : "显示提示",
          title: hintsOn ? "隐藏提示" : "显示提示",
        }],
        ["", "icon-pill", () => setPhase("place"), false, {
          icon: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 14 4 9 9 4"/><path d="M20 20v-7a4 4 0 0 0-4-4H4"/></svg>',
          ariaLabel: "返回修正",
          title: "返回修正",
        }],
      ], "control-row-icons");
      if (state.spill) {
        addControlRow([
          ["先去夹起", "", () => setPhase("place")],
          ["仍然熨烫", "danger-button", () => startIroning(true)],
        ]);
      } else {
        addButton("盖纸熨烫", "primary-button", () => startIroning(false), !state.sandboxMode && state.errors.length > 0 && placementAccuracy() < 0.72);
      }
      if (!state.sandboxMode && state.errors.length > 0 && placementAccuracy() < 0.72) {
        addHint("误差较多，建议先修正再熨烫。");
      }      return;
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
      ]);      return;
    }

    if (state.phase === "cool") {
      addHint("冷却过程中压平可以减少翘曲。温度稳定后就能取下作品。");
      addControlRow([
        ["压平", "", () => pressFlat()],
        ["翻面再熨", "", () => flipAndIron(), state.flipCount >= 1],
      ]);
      addButton("完成收藏", "primary-button", () => completeWork());
      if (state.cooling < 78) addHint("提前取下也能完成，但冷却不足会影响最终评级。");      return;
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
        addButton("分享小红书", "", () => openShareModal());        return;
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
      addButton("分享小红书", "", () => openShareModal());    }
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
    items.forEach((entry) => {
      const button = document.createElement("button");
      button.type = "button";
      const [label, className, handler, disabled, options] = entry;
      const opts = options || {};
      if (opts.icon && label) {
        button.innerHTML = `<span class="btn-glyph" aria-hidden="true">${opts.icon}</span><span class="btn-label">${label}</span>`;
        button.classList.add("icon-text-button");
      } else if (opts.icon) {
        button.innerHTML = `<span class="btn-glyph" aria-hidden="true">${opts.icon}</span>`;
        button.classList.add("icon-only-button");
      } else {
        button.textContent = label;
      }
      if (opts.title) button.title = opts.title;
      if (opts.ariaLabel) button.setAttribute("aria-label", opts.ariaLabel);
      button.className = `${button.className} ${className || ""}`.trim();
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

  function openRemapModal(focusSource = null) {
    if (state.phase !== "choose") return;
    state.remapFocusSource = focusSource || null;
    state.remapModalOpen = true;
    if (els.remapModal) {
      els.remapModal.classList.add("show");
      els.remapModal.setAttribute("aria-hidden", "false");
    }
    renderRemapModal();
    onModalOpened(els.remapModal);
  }

  function closeRemapModal() {
    state.remapModalOpen = false;
    if (els.remapModal) {
      els.remapModal.classList.remove("show");
      els.remapModal.setAttribute("aria-hidden", "true");
    }
    restoreModalFocus();
  }

  function resetPatternColorMapping() {
    const map = state.patternColorMap || {};
    const patternId = baseIdFor(state.selectedPattern);
    const sourceColors = getSourcePatternColors();
    const hiddenCount = getPatternHiddenSourceList().length;
    const changed = sourceColors.some((code) => (map[code] || code) !== code) || hiddenCount > 0;
    if (!changed) {
      showToast("当前就是原始配色。");
      return;
    }
    sourceColors.forEach((code) => {
      map[code] = code;
    });
    state.patternColorMaps[patternId] = map;
    state.patternHiddenSources[patternId] = [];
    invalidateEffectiveMap();
    state.previewDirty = true;
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
    const allSourceColors = getSourcePatternColors();
    const focus = state.remapFocusSource;
    const sourceColors = focus && allSourceColors.includes(focus) ? [focus] : allSourceColors;
    if (!els.remapModalBody) return;
    if (!sourceColors.length) {
      els.remapModalBody.innerHTML = "";
      return;
    }
    if (els.remapModalTitle) {
      els.remapModalTitle.textContent = sourceColors.length === 1
        ? `换色：${beadIds[sourceColors[0]]}`
        : "图纸换色";
    }
    const map = state.patternColorMap || {};
    const allCodes = allColorCodes();
    const activeCodes = new Set(allCodes);
    els.remapModalBody.innerHTML = "";
    sourceColors.forEach((sourceCode) => {
      const card = document.createElement("div");
      card.className = "remap-card";
      const currentTarget = activeCodes.has(map[sourceCode]) ? map[sourceCode] : sourceCode;
      card.innerHTML = `
        <div class="remap-card-head">
          <span class="remap-to">
            <span class="remap-swatch${beadIds[currentTarget] === "H1" ? " is-transparent" : ""}" style="${beadIds[currentTarget] === "H1" ? "" : `background:${palette[currentTarget]}`}"></span>
            <span class="remap-label">${beadIds[currentTarget]}</span>
          </span>
        </div>
      `;
      const swatchGrid = document.createElement("div");
      swatchGrid.className = "swatch-grid";
      allCodes.forEach((code) => {
        const cell = document.createElement("button");
        cell.type = "button";
        const isCellTransparent = beadIds[code] === "H1";
        cell.className = `swatch-cell${currentTarget === code ? " active" : ""}${isCellTransparent ? " is-transparent" : ""}`;
        if (!isCellTransparent) cell.style.background = palette[code];
        cell.title = beadIds[code] || code;
        cell.setAttribute("aria-label", cell.title);
        cell.addEventListener("click", () => {
          setPatternColorMapping(sourceCode, code);
          renderRemapModal();
        });
        swatchGrid.appendChild(cell);
      });
      card.appendChild(swatchGrid);
      els.remapModalBody.appendChild(card);
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
    if (state.phase !== "place" || useMobileDirectPlacement()) {
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
    els.toolRack.innerHTML = `
      <button type="button" class="tool-card${state.tool === "needle" ? " active" : ""}" data-tool="needle">
        <div class="tool-head"><span>豆针</span></div>
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
    if (state.phase === "inspect") {
      els.colorPalette.classList.add("inspect-mode");
      renderInspectAssistPanel();
      return;
    }
    els.colorPalette.classList.remove("inspect-mode");
    if (state.phase !== "place") {
      els.colorPalette.innerHTML = "";
      return;
    }
    els.colorPalette.innerHTML = "";
    const counts = getTargetCounts();
    const placedCounts = getPlacedCounts();
    allColorCodes().forEach((code) => {
      const placed = placedCounts[code] || 0;
      const needed = counts[code] || 0;
      const inPattern = needed > 0;
      const remaining = Math.max(0, needed - placed);
      const isSelected = state.selectedColor === code;
      const button = document.createElement("button");
      const isHeld = !useMobileDirectPlacement() && state.tweezerBead === code;
      button.className = `color-chip${isSelected ? " active" : ""}${inPattern ? " needed" : ""}${isHeld ? " held" : ""}`;
      button.type = "button";
      button.title = `${beadLabel(code)}：${placed}/${needed}`;
      const isTransparent = beadIds[code] === "H1";
      button.innerHTML = `
        <span class="swatch${isTransparent ? " is-transparent" : ""}" style="${isTransparent ? "" : `background:${palette[code]}`}"></span>
        <span class="chip-label">${beadIds[code] || code}</span>
        ${inPattern && isSelected ? `<span class="chip-count">${remaining}</span>` : ""}
      `;
      button.addEventListener("click", () => {
        state.selectedColor = code;
        if (state.phase === "place" && !useMobileDirectPlacement()) pourSelectedColor();
        markDirty();
      });
      els.colorPalette.appendChild(button);
    });
  }

  function renderInspectAssistPanel() {
    if (!els.colorPalette) return;
    if (!els.colorPalette.querySelector(".inspect-assist")) {
      els.colorPalette.innerHTML = `
        <div class="inspect-assist">
          <section class="inspect-card">
            <div class="inspect-card-head">
              <strong>局部放大镜</strong>
              <span>查看当前孔位与邻域</span>
            </div>
            <canvas class="inspect-canvas inspect-zoom" width="360" height="212" aria-label="局部放大镜"></canvas>
          </section>
          <section class="inspect-card">
            <div class="inspect-card-head">
              <strong>烫完预览图</strong>
              <span>融合轮廓预估</span>
            </div>
            <canvas class="inspect-canvas inspect-fuse" width="360" height="212" aria-label="烫完预览图"></canvas>
          </section>
        </div>
      `;
    }
    updateInspectAssistCanvases();
  }

  function updateInspectAssistCanvases() {
    if (!els.colorPalette || state.phase !== "inspect") return;
    const zoomCanvas = els.colorPalette.querySelector(".inspect-zoom");
    const fuseCanvas = els.colorPalette.querySelector(".inspect-fuse");
    if (!zoomCanvas || !fuseCanvas) return;
    drawInspectZoomCanvas(zoomCanvas);
    drawInspectFusePreviewCanvas(fuseCanvas);
  }

  function inspectFocusCell() {
    const pointerCell = boardCellFromPoint(state.pointer.x, state.pointer.y);
    if (pointerCell) return pointerCell;
    if (state.spill) {
      const index = state.spill.index;
      const size = state.selectedPattern.size;
      return { x: index % size, y: Math.floor(index / size) };
    }
    if (state.errors.length) {
      const index = state.errors[0].index;
      const size = state.selectedPattern.size;
      return { x: index % size, y: Math.floor(index / size) };
    }
    const index = state.placed.findIndex(Boolean);
    if (index >= 0) {
      const size = state.selectedPattern.size;
      return { x: index % size, y: Math.floor(index / size) };
    }
    const center = Math.floor((state.selectedPattern.size - 1) / 2);
    return { x: center, y: center };
  }

  function drawInspectZoomCanvas(canvas) {
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    setupHiDpiCanvas(canvas, ctx);
    const rect = canvas.getBoundingClientRect();
    const w = Math.max(1, rect.width);
    const h = Math.max(1, rect.height);
    ctx.clearRect(0, 0, w, h);

    const focus = inspectFocusCell();
    const size = state.selectedPattern.size;
    const radius = 3;
    const gridCount = radius * 2 + 1;
    const padding = 10;
    const cell = Math.floor(Math.min((w - padding * 2) / gridCount, (h - padding * 2) / gridCount));
    const gridW = cell * gridCount;
    const gridH = cell * gridCount;
    const x0 = Math.floor((w - gridW) / 2);
    const y0 = Math.floor((h - gridH) / 2);
    const errorMap = new Map(state.errors.map((error) => [error.index, error.type]));

    // Looks like a zoomed-in slice of the real board: same matte board surface,
    // empty cells show a peg, placed cells show a real bead.
    ctx.fillStyle = "#eef2f4";
    roundedPath(ctx, 0.5, 0.5, w - 1, h - 1, 10);
    ctx.fill();
    ctx.strokeStyle = "rgba(101, 115, 130, 0.28)";
    ctx.lineWidth = 1;
    ctx.stroke();

    // Board panel under the grid
    const boardPad = 4;
    ctx.fillStyle = "#cfd7d9";
    roundedPath(ctx, x0 - boardPad, y0 - boardPad, gridW + boardPad * 2, gridH + boardPad * 2, 6);
    ctx.fill();
    ctx.strokeStyle = "rgba(99, 112, 132, 0.32)";
    ctx.stroke();

    for (let gy = 0; gy < gridCount; gy += 1) {
      for (let gx = 0; gx < gridCount; gx += 1) {
        const bx = focus.x + gx - radius;
        const by = focus.y + gy - radius;
        const px = x0 + gx * cell;
        const py = y0 + gy * cell;
        const inRange = bx >= 0 && by >= 0 && bx < size && by < size;
        if (!inRange) continue;

        const index = indexFor(bx, by);
        const placed = state.placed[index];
        const target = targetAt(bx, by);
        const cx = px + cell / 2;
        const cy = py + cell / 2;

        // Empty pegboard hole (looks like the real board)
        ctx.fillStyle = "rgba(120, 128, 140, 0.28)";
        ctx.beginPath();
        ctx.arc(cx, cy, cell * 0.18, 0, Math.PI * 2);
        ctx.fill();

        if (target && !placed) {
          // Target hint: faint colored ring
          ctx.strokeStyle = palette[target] || "#bbb";
          ctx.globalAlpha = 0.55;
          ctx.lineWidth = Math.max(1.4, cell * 0.05);
          ctx.beginPath();
          ctx.arc(cx, cy, cell * 0.36, 0, Math.PI * 2);
          ctx.stroke();
          ctx.globalAlpha = 1;
        }

        if (placed) {
          const beadR = cell * 0.42;
          // Soft drop shadow
          ctx.fillStyle = "rgba(0,0,0,0.16)";
          ctx.beginPath();
          ctx.arc(cx + cell * 0.04, cy + cell * 0.06, beadR, 0, Math.PI * 2);
          ctx.fill();
          // Bead body
          ctx.fillStyle = palette[placed] || "#bbb";
          ctx.beginPath();
          ctx.arc(cx, cy, beadR, 0, Math.PI * 2);
          ctx.fill();
          // Outline
          ctx.strokeStyle = "rgba(0,0,0,0.18)";
          ctx.lineWidth = Math.max(1, cell * 0.04);
          ctx.beginPath();
          ctx.arc(cx, cy, beadR, 0, Math.PI * 2);
          ctx.stroke();
          // Highlight
          ctx.fillStyle = "rgba(255,255,255,0.34)";
          ctx.beginPath();
          ctx.arc(cx - beadR * 0.28, cy - beadR * 0.28, beadR * 0.22, 0, Math.PI * 2);
          ctx.fill();
          // Center hole (matches real beads)
          ctx.fillStyle = "rgba(60, 68, 80, 0.36)";
          ctx.beginPath();
          ctx.arc(cx, cy, beadR * 0.24, 0, Math.PI * 2);
          ctx.fill();
        }

        if (state.showHints && errorMap.has(index)) {
          const type = errorMap.get(index);
          ctx.strokeStyle = type === "wrong" ? "rgba(220, 68, 76, 0.9)" : "rgba(217, 143, 48, 0.92)";
          ctx.lineWidth = 2;
          ctx.strokeRect(px + 1.5, py + 1.5, cell - 3, cell - 3);
        }
      }
    }

    // Center reticle marking the focus cell
    const centerX = x0 + radius * cell + cell / 2;
    const centerY = y0 + radius * cell + cell / 2;
    ctx.strokeStyle = "rgba(66, 96, 131, 0.85)";
    ctx.lineWidth = 2;
    ctx.strokeRect(centerX - cell / 2 + 1, centerY - cell / 2 + 1, cell - 2, cell - 2);
  }

  function drawInspectFusePreviewCanvas(canvas) {
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    setupHiDpiCanvas(canvas, ctx);
    const rect = canvas.getBoundingClientRect();
    const w = Math.max(1, rect.width);
    const h = Math.max(1, rect.height);
    ctx.clearRect(0, 0, w, h);
    const bg = ctx.createLinearGradient(0, 0, 0, h);
    bg.addColorStop(0, "#fbfcfe");
    bg.addColorStop(1, "#edf2f7");
    ctx.fillStyle = bg;
    roundedPath(ctx, 0.5, 0.5, w - 1, h - 1, 10);
    ctx.fill();
    ctx.strokeStyle = "rgba(101, 115, 130, 0.28)";
    ctx.lineWidth = 1;
    ctx.stroke();

    const size = state.selectedPattern.size;
    const cells = [];
    let minX = size;
    let minY = size;
    let maxX = -1;
    let maxY = -1;
    for (let y = 0; y < size; y += 1) {
      for (let x = 0; x < size; x += 1) {
        const index = indexFor(x, y);
        const code = state.placed[index];
        if (!code) continue;
        cells.push({ x, y, index, code });
        minX = Math.min(minX, x);
        minY = Math.min(minY, y);
        maxX = Math.max(maxX, x);
        maxY = Math.max(maxY, y);
      }
    }

    if (!cells.length) {
      ctx.fillStyle = "rgba(67, 77, 91, 0.58)";
      ctx.font = "600 13px Avenir Next, PingFang SC, Hiragino Sans GB, Microsoft YaHei, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("还没有可预览的拼豆", w / 2, h / 2 + 4);
      return;
    }

    const spanX = maxX - minX + 1;
    const spanY = maxY - minY + 1;
    const padding = 16;
    const cell = Math.max(4, Math.floor(Math.min((w - padding * 2) / spanX, (h - padding * 2) / spanY)));
    const drawW = spanX * cell;
    const drawH = spanY * cell;
    const x0 = Math.floor((w - drawW) / 2);
    const y0 = Math.floor((h - drawH) / 2);
    const placedSet = new Set(cells.map((cellData) => `${cellData.x}:${cellData.y}`));
    const has = (x, y) => placedSet.has(`${x}:${y}`);
    const centerMap = new Map();

    cells.forEach((cellData) => {
      centerMap.set(`${cellData.x}:${cellData.y}`, {
        x: x0 + (cellData.x - minX) * cell + cell / 2,
        y: y0 + (cellData.y - minY) * cell + cell / 2,
      });
    });

    cells.forEach((cellData) => {
      const { x, y, code, index } = cellData;
      const centerA = centerMap.get(`${x}:${y}`);
      const heatA = clamp((state.heat[index] || 0) + 68, 0, 138);
      const colorA = fusedColor(code, heatA);
      const drawBridge = (nx, ny) => {
        if (!has(nx, ny)) return;
        const nIndex = indexFor(nx, ny);
        const heatB = clamp((state.heat[nIndex] || 0) + 68, 0, 138);
        const centerB = centerMap.get(`${nx}:${ny}`);
        if (!centerB) return;
        const colorB = fusedColor(state.placed[nIndex], heatB);
        const gradient = ctx.createLinearGradient(centerA.x, centerA.y, centerB.x, centerB.y);
        gradient.addColorStop(0, colorA);
        gradient.addColorStop(1, colorB);
        const blendHeat = Math.min(heatA, heatB);
        const fuse = clamp((blendHeat - 30) / 58 + 0.32, 0, 1);
        const spread = lerp(cell * 0.44, cell * 0.86, easeOut(fuse));
        drawGradientCapsuleBridge(ctx, centerA, centerB, spread, spread * 0.38, gradient, 0.96);
      };

      drawBridge(x + 1, y);
      drawBridge(x, y + 1);
    });

    cells.forEach((cellData) => {
      const { x, y, code, index } = cellData;
      const center = centerMap.get(`${x}:${y}`);
      const heat = clamp((state.heat[index] || 0) + 68, 0, 138);
      const color = fusedColor(code, heat);
      const edge = mixColor(color, "#ffffff", 0.18);
      const shape = boardFusionShapeProfile(x, y);
      const edges = shape.edges;
      const halfConnected = cell * 0.5;
      const halfExposed = cell * 0.62;
      const halfL = edges.left ? halfExposed : halfConnected;
      const halfR = edges.right ? halfExposed : halfConnected;
      const halfU = edges.up ? halfExposed : halfConnected;
      const halfD = edges.down ? halfExposed : halfConnected;
      const cornerFor = (sideA, sideB, hA, hB) => {
        const a = edges[sideA];
        const b = edges[sideB];
        const cap = Math.min(hA, hB);
        if (a && b) return cap;
        if (a || b) return cap * 0.55;
        return cap * 0.08;
      };
      const rTL = cornerFor("up", "left", halfU, halfL);
      const rTR = cornerFor("up", "right", halfU, halfR);
      const rBR = cornerFor("down", "right", halfD, halfR);
      const rBL = cornerFor("down", "left", halfD, halfL);
      const buildPath = () => {
        const left = center.x - halfL;
        const right = center.x + halfR;
        const top = center.y - halfU;
        const bottom = center.y + halfD;
        ctx.beginPath();
        ctx.moveTo(left + rTL, top);
        ctx.lineTo(right - rTR, top);
        ctx.arcTo(right, top, right, top + rTR, rTR);
        ctx.lineTo(right, bottom - rBR);
        ctx.arcTo(right, bottom, right - rBR, bottom, rBR);
        ctx.lineTo(left + rBL, bottom);
        ctx.arcTo(left, bottom, left, bottom - rBL, rBL);
        ctx.lineTo(left, top + rTL);
        ctx.arcTo(left, top, left + rTL, top, rTL);
        ctx.closePath();
      };

      ctx.fillStyle = color;
      buildPath();
      ctx.fill();

      ctx.strokeStyle = edge;
      ctx.lineWidth = Math.max(0.9, cell * 0.052);
      buildPath();
      ctx.stroke();
    });
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
      els.customStats.classList.add("is-empty");
      els.customStats.innerHTML = "";
      return;
    }
    els.customStats.classList.remove("is-empty");
    const list = stats.colors.slice(0, 8).map((item) => `${beadIds[item.code]} ${item.count}`).join(" · ");
    els.customStats.innerHTML = `
      <strong>${stats.size}x${stats.size} · ${stats.total}颗 · ${stats.colors.length}色</strong>
      <span>源图估计 ${stats.sourceSignificantCount} 色 · 聚类 ${stats.simplifiedColorCount} 色 · 清理前 ${stats.preCleanupColorCount} 色</span>
      <span>${stats.denoised ? "已启用轻度降噪" : "保留像素边缘（未降噪）"}</span>
      <span>${list}${stats.colors.length > 8 ? " · ..." : ""}</span>
    `;
  }

  function renderCollection() {
    if (!els.collectionPanel) return;
    els.collectionPanel.innerHTML = "";
    if (!collection.length) {
      const empty = document.createElement("div");
      empty.className = "empty-state";
      empty.textContent = "还没有完成品";
      els.collectionPanel.appendChild(empty);
      return;
    }
    const toolbar = document.createElement("div");
    toolbar.className = "collection-toolbar";
    toolbar.innerHTML = `
      <span class="collection-toolbar-count">共 ${collection.length} 件</span>
      <button type="button" class="danger-button collection-clear-all">清空作品集</button>
    `;
    toolbar.querySelector(".collection-clear-all").addEventListener("click", () => {
      if (!collection.length) return;
      if (!window.confirm("确定清空所有作品？此操作不可撤销。")) return;
      collection = [];
      writeCollection();
      renderCollection();
      showToast("作品集已清空。");
    });
    els.collectionPanel.appendChild(toolbar);

    const grid = document.createElement("div");
    grid.className = "collection-grid";
    els.collectionPanel.appendChild(grid);

    collection.forEach((item) => {
      const tile = document.createElement("div");
      tile.className = "collection-tile";
      const thumbSize = 168;
      tile.innerHTML = `
        <button type="button" class="collection-tile-body" aria-label="放大 ${item.name}">
          <canvas class="collection-thumb" width="${thumbSize}" height="${thumbSize}" aria-hidden="true"></canvas>
          <div class="collection-tile-meta">
            <strong>${item.name}</strong>
            <span>${normalizeCraft(item.craft)} · 评级 ${item.grade} · ${item.date}</span>
          </div>
        </button>
        <button type="button" class="collection-tile-delete" aria-label="删除这件作品" title="删除">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-2 14a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
        </button>
      `;
      tile.querySelector(".collection-tile-body").addEventListener("click", () => enlargeCollectionEntry(item));
      tile.querySelector(".collection-tile-delete").addEventListener("click", (e) => {
        e.stopPropagation();
        if (!window.confirm(`删除 ${item.name}？`)) return;
        collection = collection.filter((entry) => entry.id !== item.id);
        writeCollection();
        renderCollection();
        showToast("已删除。");
      });
      grid.appendChild(tile);
      const canvas = tile.querySelector("canvas");
      drawCollectionThumb(canvas, item);
    });
  }

  function drawCollectionThumb(canvas, item) {
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    setupHiDpiCanvas(canvas, ctx);
    const rect = canvas.getBoundingClientRect();
    const w = rect.width;
    const h = rect.height;
    ctx.clearRect(0, 0, w, h);
    // Soft paper-ish background.
    ctx.fillStyle = "#f3f5f8";
    ctx.fillRect(0, 0, w, h);

    const size = item.size || state.selectedPattern.size || 16;
    const placed = item.placed || [];
    const fallback = !placed.length ? patterns.find((p) => p.id === (item.id || "").split("-").slice(1).join("-")) : null;
    const pad = 10;
    const cell = Math.floor(Math.min((w - pad * 2) / size, (h - pad * 2) / size));
    const gridSize = cell * size;
    const x0 = Math.floor((w - gridSize) / 2);
    const y0 = Math.floor((h - gridSize) / 2);

    // Per-cell helpers — render as if just ironed: rounded-square bead shapes
    // with neighbor-aware corners so it matches the in-game fused look.
    const cellCode = (x, y) => {
      if (x < 0 || y < 0 || x >= size || y >= size) return null;
      if (placed.length) {
        const c = placed[y * size + x];
        return c && c !== "." ? c : null;
      }
      if (fallback) {
        const c = (fallback.rows[y] || "")[x];
        return c && c !== "." ? c : null;
      }
      return null;
    };

    for (let y = 0; y < size; y += 1) {
      for (let x = 0; x < size; x += 1) {
        const code = cellCode(x, y);
        if (!code) continue;
        const px = x0 + x * cell;
        const py = y0 + y * cell;
        const cx = px + cell / 2;
        const cy = py + cell / 2;
        const edges = {
          left: !cellCode(x - 1, y),
          right: !cellCode(x + 1, y),
          up: !cellCode(x, y - 1),
          down: !cellCode(x, y + 1),
        };
        const halfConnected = cell * 0.5;
        const halfExposed = cell * 0.6;
        const halfL = edges.left ? halfExposed : halfConnected;
        const halfR = edges.right ? halfExposed : halfConnected;
        const halfU = edges.up ? halfExposed : halfConnected;
        const halfD = edges.down ? halfExposed : halfConnected;
        const cornerFor = (a, b, hA, hB) => {
          const cap = Math.min(hA, hB);
          if (a && b) return cap;
          if (a || b) return cap * 0.55;
          return cap * 0.08;
        };
        const rTL = cornerFor(edges.up, edges.left, halfU, halfL);
        const rTR = cornerFor(edges.up, edges.right, halfU, halfR);
        const rBR = cornerFor(edges.down, edges.right, halfD, halfR);
        const rBL = cornerFor(edges.down, edges.left, halfD, halfL);
        const left = cx - halfL;
        const right = cx + halfR;
        const top = cy - halfU;
        const bottom = cy + halfD;

        const path = () => {
          ctx.beginPath();
          ctx.moveTo(left + rTL, top);
          ctx.lineTo(right - rTR, top);
          ctx.arcTo(right, top, right, top + rTR, rTR);
          ctx.lineTo(right, bottom - rBR);
          ctx.arcTo(right, bottom, right - rBR, bottom, rBR);
          ctx.lineTo(left + rBL, bottom);
          ctx.arcTo(left, bottom, left, bottom - rBL, rBL);
          ctx.lineTo(left, top + rTL);
          ctx.arcTo(left, top, left + rTL, top, rTL);
          ctx.closePath();
        };

        ctx.fillStyle = palette[code] || "#bbb";
        path();
        ctx.fill();

        // Subtle highlight on isolated edge sides
        ctx.fillStyle = "rgba(255,255,255,0.16)";
        ctx.beginPath();
        ctx.arc(cx - cell * 0.18, cy - cell * 0.18, cell * 0.12, 0, Math.PI * 2);
        ctx.fill();

        // Center hole hint for fully exposed (isolated) beads only
        const exposedCount = (edges.left ? 1 : 0) + (edges.right ? 1 : 0) + (edges.up ? 1 : 0) + (edges.down ? 1 : 0);
        if (exposedCount >= 3 && cell >= 8) {
          ctx.fillStyle = "rgba(0,0,0,0.18)";
          ctx.beginPath();
          ctx.arc(cx, cy, cell * 0.14, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }
  }

  function enlargeCollectionEntry(entry) {
    if (!els.collectionModal) return;
    let viewer = els.collectionModal.querySelector(".collection-enlarged");
    if (!viewer) {
      viewer = document.createElement("div");
      viewer.className = "collection-enlarged";
      viewer.innerHTML = `
        <button type="button" class="collection-enlarged-close" aria-label="关闭放大">×</button>
        <canvas class="collection-enlarged-canvas" width="640" height="640"></canvas>
        <div class="collection-enlarged-meta"></div>
        <div class="collection-enlarged-actions">
          <button type="button" class="primary-button collection-enlarged-open">打开这张图纸</button>
        </div>
      `;
      els.collectionModal.appendChild(viewer);
      viewer.querySelector(".collection-enlarged-close").addEventListener("click", () => {
        viewer.classList.remove("show");
      });
    }
    viewer.classList.add("show");
    const canvas = viewer.querySelector("canvas");
    canvas.style.width = "min(640px, 78vh)";
    canvas.style.height = "min(640px, 78vh)";
    requestAnimationFrame(() => drawCollectionThumb(canvas, entry));
    viewer.querySelector(".collection-enlarged-meta").textContent =
      `${entry.name} · ${normalizeCraft(entry.craft)} · 评级 ${entry.grade} · ${entry.date}`;
    const openBtn = viewer.querySelector(".collection-enlarged-open");
    const newBtn = openBtn.cloneNode(true);
    openBtn.replaceWith(newBtn);
    newBtn.addEventListener("click", () => {
      viewer.classList.remove("show");
      openCollectionEntry(entry);
    });
  }

  function openCollectionEntry(entry) {
    const rawId = String(entry?.id || "");
    const firstDash = rawId.indexOf("-");
    const patternId = firstDash >= 0 ? rawId.slice(firstDash + 1) : "";
    const found = patterns.find((item) => item.id === patternId || baseIdFor(item) === patternId);
    if (!found) {
      showToast("这条收藏对应的图纸当前不可用。");
      return;
    }
    loadPattern(resizePattern(found, state.patternSize), false);
    setPhase("choose");
    closeCollectionModal();
    showToast(`已打开收藏：${found.name}`);
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
      showToast("豆筛还不够整齐，多筛几下再上豆针。");
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
        improveSort(7, "先把豆筛抖整齐，豆针才能上豆。");
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
    const hasContent =
      placedCount() > 0 ||
      state.trayBeans > 0 ||
      state.needleLoaded > 0 ||
      state.tweezerBead ||
      state.spill ||
      state.fusedPieces.length > 0;
    if (hasContent && !window.confirm("清空板面会移除已摆的全部豆子，确定吗？")) return;
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
    state.floorDrops = [];
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
    state.floorDrops = [];
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
    if (state.phase !== "choose") {
      showToast("图纸换色只能在开始前设置。");
      return;
    }
    const map = state.patternColorMap || {};
    if (!palette[sourceCode] || !allColorCodes().includes(targetCode)) return;
    if (map[sourceCode] === targetCode) return;
    map[sourceCode] = targetCode;
    const patternId = baseIdFor(state.selectedPattern);
    state.patternColorMaps[patternId] = map;
    invalidateEffectiveMap();
    state.previewDirty = true;
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
    const view = boardViewTransform(layout);
    const ux = (x - (view.cx + view.panX)) / view.scale + view.cx;
    const uy = (y - (view.cy + view.panY)) / view.scale + view.cy;
    const { boardX, boardY, boardSize, cell } = layout;
    const pad = Math.max(5, cell * 0.24);
    if (ux < boardX - pad || uy < boardY - pad || ux > boardX + boardSize + pad || uy > boardY + boardSize + pad) return null;
    const clampedX = clamp(ux, boardX, boardX + boardSize - 0.01);
    const clampedY = clamp(uy, boardY, boardY + boardSize - 0.01);
    return {
      x: clamp(Math.floor((clampedX - boardX) / cell), 0, state.selectedPattern.size - 1),
      y: clamp(Math.floor((clampedY - boardY) / cell), 0, state.selectedPattern.size - 1),
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
    const view = boardViewTransform(layout);
    const rawX = layout.boardX + x * layout.cell + layout.cell / 2;
    const rawY = layout.boardY + y * layout.cell + layout.cell / 2;
    setToolPose(
      (rawX - view.cx) * view.scale + view.cx + view.panX,
      (rawY - view.cy) * view.scale + view.cy + view.panY
    );
  }

  function onPointerDown(event) {
    event.preventDefault();
    if (state.gesture.touchActive) return;
    const pos = pointerToCanvas(event);
    if (state.phase === "place" || state.phase === "inspect") {
      state.gesture.pointers[event.pointerId] = { x: pos.x, y: pos.y };
    }
    state.pointer.down = true;
    state.pointer.x = pos.x;
    state.pointer.y = pos.y;
    state.pointer.lastX = pos.x;
    state.pointer.lastY = pos.y;
    state.pointer.lastT = performance.now();
    state.lastCellKey = "";
    sceneCanvas.setPointerCapture?.(event.pointerId);

    if ((state.phase === "place" || state.phase === "inspect") && gesturePointerCount() >= 2) {
      const pair = gesturePrimaryPair();
      if (pair) {
        const [p1, p2] = pair;
        startBoardGesture(p1, p2);
        return;
      }
    }

    if ((state.phase === "place" || state.phase === "inspect") && pointInLampSwitch(pos.x, pos.y)) {
      toggleLamp();
      state.pointer.down = false;
      state.pointer.mode = "lamp";
      state.pointer.trayTapPending = false;
      return;
    }

    if (state.phase === "place" && shouldShowTray() && pointInTrayDumpButton(pos.x, pos.y)) {
      dumpTray();
      state.pointer.mode = null;
      state.pointer.trayTapPending = false;
      state.pointer.pendingCell = null;
      return;
    }

    if (state.phase === "place" && shouldShowTray() && pointInTray(pos.x, pos.y)) {
      state.pointer.mode = "tray";
      state.pointer.trayTapPending = true;
      return;
    }

    if (state.phase === "place") {
      const cell = boardCellFromPoint(pos.x, pos.y);
      if (cell) {
        if (useMobileDirectPlacement()) {
          // Don't place immediately — wait to see if a second finger arrives.
          // Committed on first move (drag-paint) or on pointerup (tap).
          state.pointer.mode = "place-pending";
          state.pointer.pendingCell = { x: cell.x, y: cell.y };
          setToolPoseFromCell(cell.x, cell.y);
          return;
        }
        state.pointer.mode = "place";
        setToolPoseFromCell(cell.x, cell.y);
        handlePlaceAt(cell.x, cell.y, true);
      } else {
        dropHeldBeadToFloor(pos.x, pos.y);
      }
      return;
    }

    if (state.phase === "iron") {
      const cell = boardCellFromPoint(pos.x, pos.y);
      if (cell) {
        state.pointer.mode = "iron";
        state.ironPos = pos;
        applyIronHeat(pos.x, pos.y, 16, 0);
        markCanvasDirty();
      }
    }
  }

  function onPointerMove(event) {
    event.preventDefault();
    if (state.gesture.touchActive) return;
    const pos = pointerToCanvas(event);
    if (state.phase === "place" || state.phase === "inspect") {
      if (state.gesture.pointers[event.pointerId]) {
        state.gesture.pointers[event.pointerId] = { x: pos.x, y: pos.y };
      }
      if (state.gesture.active) {
        if (gesturePointerCount() < 2) {
          state.gesture.active = false;
        } else {
          const pair = gesturePrimaryPair();
          if (pair) {
            const [p1, p2] = pair;
            updateBoardGesture(p1, p2);
            return;
          }
        }
      }
    }
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
        markCanvasDirty();
      }
    }

    if (state.pointer.down && state.pointer.mode === "place-pending") {
      // Finger moved before a second finger arrived → commit the first bead and start continuous painting.
      const pending = state.pointer.pendingCell;
      if (pending) {
        handlePlaceAt(pending.x, pending.y, true);
        state.pointer.pendingCell = null;
      }
      state.pointer.mode = "place";
      // fall through to the "place" block below to also handle the current cell
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
      markCanvasDirty();
    }

    if (!state.pointer.down && (state.phase === "place" || state.phase === "inspect")) {
      markCanvasDirty();
    }

    state.pointer.lastX = pos.x;
    state.pointer.lastY = pos.y;
    state.pointer.lastT = performance.now();
  }

  function onPointerUp(event) {
    event.preventDefault();
    if (state.gesture.touchActive) return;
    const pos = pointerToCanvas(event);
    if (state.gesture.pointers[event.pointerId]) delete state.gesture.pointers[event.pointerId];
    if (state.gesture.active && gesturePointerCount() < 2) {
      state.gesture.active = false;
    }
    if (state.phase === "place" && state.pointer.mode === "tray" && state.pointer.trayTapPending) {
      handleTrayTap(pos);
    }
    // Commit a pending mobile tap (finger lifted without moving = single-bead tap).
    if (state.phase === "place" && state.pointer.mode === "place-pending") {
      const pending = state.pointer.pendingCell;
      if (pending) handlePlaceAt(pending.x, pending.y, true);
    }
    state.pointer.down = false;
    state.pointer.mode = null;
    state.pointer.trayTapPending = false;
    state.pointer.pendingCell = null;
    state.lastCellKey = "";
    if (state.phase === "iron") state.ironPos = pos;
    markCanvasDirty();
  }

  function onTouchStart(event) {
    if (state.phase !== "place" && state.phase !== "inspect") return;
    if (event.touches.length < 2) return;
    event.preventDefault();
    startBoardGesture(touchToCanvas(event.touches[0]), touchToCanvas(event.touches[1]), true);
  }

  function onTouchMove(event) {
    if (!state.gesture.touchActive) return;
    event.preventDefault();
    if (event.touches.length < 2) {
      state.gesture.active = false;
      state.gesture.touchActive = false;
      return;
    }
    updateBoardGesture(touchToCanvas(event.touches[0]), touchToCanvas(event.touches[1]));
  }

  function onTouchEnd(event) {
    if (!state.gesture.touchActive) return;
    event.preventDefault();
    if (event.touches.length >= 2) {
      startBoardGesture(touchToCanvas(event.touches[0]), touchToCanvas(event.touches[1]), true);
      return;
    }
    state.gesture.active = false;
    state.gesture.touchActive = false;
    state.gesture.pointers = {};
    state.pointer.down = false;
    state.pointer.mode = null;
    state.pointer.pendingCell = null;
    markCanvasDirty();
  }

  function handlePlaceAt(x, y, initial) {
    setToolPoseFromCell(x, y);
    const spillKey = state.spill ? `${state.spill.index}:${state.spill.code}` : "-";
    const key = useMobileDirectPlacement()
      ? `${x}:${y}:mobile:${state.selectedColor}:${spillKey}`
      : `${x}:${y}:${state.tool}:${state.selectedColor}:${state.trayColor || "-"}:${state.tweezerBead || "-"}:${spillKey}`;
    if (!initial && key === state.lastCellKey) return;
    state.lastCellKey = key;
    if (useMobileDirectPlacement()) {
      placeSelectedBead(x, y, initial);
      return;
    }
    if (state.tool === "tweezers") {
      useTweezers(x, y);
      return;
    }
    useNeedle(x, y);
  }

  function placeSelectedBead(x, y, initial = true) {
    const index = indexFor(x, y);
    if (state.spill && state.spill.index === index) {
      state.spill = null;
    }
    const current = state.placed[index];
    if (current === state.selectedColor && initial) {
      state.placed[index] = null;
      state.heat[index] = 0;
    } else if (current === state.selectedColor) {
      return;
    } else {
      state.placed[index] = state.selectedColor;
      state.heat[index] = 0;
    }
    state.savedCurrent = false;
    markDirty();
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
    // Trigger the scraper-from-bottom animation.
    state.pressAnim = { startedAt: performance.now(), duration: 820 };
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
      size: state.selectedPattern.size,
      placed: state.placed.slice(),
    };
    if (!state.savedCurrent) {
      collection.unshift(entry);
      collection = collection.slice(0, collectionLimit);
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
    ctx.fillText(useMobileDirectPlacement() ? "从豆盒选色、直接摆放到熨烫定型" : "从散豆、豆筛、镊子到熨烫定型", w / 2, h - 42);

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
    const flowText = useMobileDirectPlacement()
      ? `从豆盒选色、直接摆放，到熨烫冷却定型，真的很像坐在桌前慢慢做手工。`
      : `从豆盒选色、豆筛抖豆、镊子修正，到熨烫冷却定型，真的很像坐在桌前慢慢做手工。`;
    const text = [
      `女朋友爱玩的拼豆，我做成了浏览器小游戏。`,
      `今天做的是「${state.selectedPattern.name}」，${getTargetTotal()}颗、${getPatternColors().length}个色号，最后评级 ${finalGrade()}。`,
      flowText,
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
    const acc = placementAccuracy();
    if (acc >= 0.92) return "出色";
    if (acc >= 0.78) return "良好";
    if (acc >= 0.55) return "一般";
    return "需调整";
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
      return useMobileDirectPlacement()
        ? "沙盒模式：自由拼摆中。从豆盒选色，直接点格子摆放。"
        : "沙盒模式：自由拼摆中。点豆筛取豆、任意排布，不受图纸限制。";
    }
    if (phase === "choose") return "选择一张图纸，开始今天的手作。";
    if (phase === "place") {
      if (state.spill) return "有豆子倒下来卡住了。可先继续摆放，熨烫前再处理。";
      if (useMobileDirectPlacement()) {
        return `已选 ${beadLabel(state.selectedColor)} · 点格子放置或替换。${state.lampOn ? " 投影开" : ""}`;
      }
      if (state.tool === "needle") {
        if (!state.trayColor) return `针工具需要先把某个色号倒入豆筛。${state.lampOn ? " 投影色稿已开启。" : " 可打开工作灯查看投影色稿。"} `;
        return `豆筛 ${state.trayBeans} 颗 ${beadIds[state.trayColor]} · ${state.lampOn ? "投影开" : "投影关"}`;
      }
      return state.tweezerBead
        ? `镊子夹着 ${beadLabel(state.tweezerBead)} · ${state.lampOn ? "投影开" : "投影关"}`
        : `点豆筛夹一颗，或从板面取一颗，再放到板上。${state.lampOn ? " 投影色稿已开启。" : ""}`;
    }
    if (phase === "inspect") {
      if (state.spill) return "还有倒下的豆子未处理。继续熨烫会糊坏该位置。";
      return state.errors.length ? "检查到需要修正的位置。" : "板面检查通过，可以盖纸熨烫。";
    }
    if (phase === "iron") return "控制速度、压力和温度，让豆子刚好粘连。";
    if (phase === "cool") return "等待冷却，压平边缘，准备取下作品。";
    return `${state.selectedPattern.name}完成，已进入收藏阶段。`;
  }

  function shouldAnimateCanvas(now) {
    if (state.pointer.down) return true;
    if (state.phase === "cool" && (state.cooling < 100 || state.flattening > 0)) return true;
    if (now < state.lampSwitchFlashUntil) return true;
    if (state.floorDrops.length > 0) return true;
    if (state.pressAnim && now - state.pressAnim.startedAt < state.pressAnim.duration) return true;
    return false;
  }

  function tick(now) {
    const dt = Math.min(48, now - lastFrame);
    lastFrame = now;
    if (state.phase === "cool") {
      const heat = heatStats();
      const overPenalty = heat.overPercent > 18 ? 0.04 : 0;
      const prevCooling = state.cooling;
      const prevFlatten = state.flattening;
      state.cooling = clamp(state.cooling + dt * (0.012 - overPenalty / 100), 0, 100);
      if (state.flattening > 0) state.flattening = clamp(state.flattening - dt * 0.008, 0, 100);
      if (Math.abs(state.cooling - prevCooling) > 0.0001 || Math.abs(state.flattening - prevFlatten) > 0.0001) {
        state.renderDirty = true;
      }
    }
    if (state.renderDirty || state.uiDirty || state.previewDirty || shouldAnimateCanvas(now)) {
      render();
    }
    requestAnimationFrame(tick);
  }

  function onResize() {
    invalidateLayoutCache();
    if (state.trayColor) syncTrayMatrixShape();
    markDirty();
  }

  sceneCanvas.addEventListener("pointerdown", onPointerDown);
  sceneCanvas.addEventListener("pointermove", onPointerMove);
  sceneCanvas.addEventListener("pointerup", onPointerUp);
  sceneCanvas.addEventListener("pointercancel", onPointerUp);
  sceneCanvas.addEventListener("touchstart", onTouchStart, { passive: false });
  sceneCanvas.addEventListener("touchmove", onTouchMove, { passive: false });
  sceneCanvas.addEventListener("touchend", onTouchEnd, { passive: false });
  sceneCanvas.addEventListener("touchcancel", onTouchEnd, { passive: false });
  sceneCanvas.addEventListener("contextmenu", (event) => event.preventDefault());
  sceneCanvas.addEventListener("wheel", (event) => {
    if (state.phase !== "place" && state.phase !== "inspect") return;
    event.preventDefault();
    const delta = event.deltaY < 0 ? 0.14 : -0.14;
    setBoardZoom(state.boardView.scale + delta, state.boardView.panX, state.boardView.panY);
  }, { passive: false });

  els.resetButton.addEventListener("click", () => {
    const hasProgress = state.phase !== "choose" || placedCount() > 0;
    if (hasProgress && !window.confirm("重置会清空当前所有进度，确定吗？")) return;
    loadPattern(state.selectedPattern);
    showToast("已重置当前作品。");
  });
  els.sandboxButton?.addEventListener("click", () => toggleSandboxMode());
  els.chooseStartButton?.addEventListener("click", () => {
    if (state.phase === "choose") setPhase("place");
  });
  previewCanvas.addEventListener("click", handlePreviewPickRemap);
  els.patternColorStats?.addEventListener("click", handlePatternColorChipToggle);
  els.bgThemeSelect?.addEventListener("change", () => {
    applyBackgroundTheme(els.bgThemeSelect.value);
    showToast(`背景已切换为 ${currentBackgroundTheme().name}。`);
  });
  els.topToolStyleSelect?.addEventListener("change", (event) => {
    const next = event.target.value;
    if (!toolStyles[next] || state.toolStyle === next) return;
    state.toolStyle = next;
    showToast(`工具换成${currentToolStyle().name}款。`);
    markDirty();
  });
  let sizeSliderTimer = null;
  els.patternSizeSlider?.addEventListener("input", () => {
    const size = normalizePatternSize(els.patternSizeSlider.value);
    setSizeControls(size);
    if (sizeSliderTimer) window.clearTimeout(sizeSliderTimer);
    sizeSliderTimer = window.setTimeout(() => applyPatternSize(size), 110);
  });
  els.patternSizeSlider?.addEventListener("change", () => {
    const size = normalizePatternSize(els.patternSizeSlider.value);
    setSizeControls(size);
    applyPatternSize(size);
  });
  [els.paletteSizePicker, els.settingsPaletteSizePicker].forEach((picker) => {
    picker?.addEventListener("click", (event) => {
      const button = event.target.closest("[data-palette-size]");
      if (!button) return;
      setPaletteSize(button.dataset.paletteSize);
    });
  });
  els.zoomInButton?.addEventListener("click", () => {
    setBoardZoom(state.boardView.scale + 0.2, state.boardView.panX, state.boardView.panY);
  });
  els.zoomOutButton?.addEventListener("click", () => {
    setBoardZoom(state.boardView.scale - 0.2, state.boardView.panX, state.boardView.panY);
  });
  els.zoomResetButton?.addEventListener("click", () => {
    resetBoardView();
  });
  els.customImageInput.addEventListener("change", handleCustomImage);
  els.remapModalClose?.addEventListener("click", () => closeRemapModal());
  els.remapDoneButton?.addEventListener("click", () => closeRemapModal());
  els.remapResetButton?.addEventListener("click", () => resetPatternColorMapping());
  els.remapModal?.addEventListener("click", (event) => {
    if (event.target === els.remapModal) closeRemapModal();
  });
  els.settingsButton?.addEventListener("click", () => openSettingsModal());
  els.settingsModalClose?.addEventListener("click", () => closeSettingsModal());
  els.settingsModal?.addEventListener("click", (event) => {
    if (event.target === els.settingsModal) closeSettingsModal();
  });
  els.collectionButton?.addEventListener("click", () => {
    closeSettingsModal();
    openCollectionModal();
  });
  els.collectionModalClose?.addEventListener("click", () => closeCollectionModal());
  els.collectionModal?.addEventListener("click", (event) => {
    if (event.target === els.collectionModal) closeCollectionModal();
  });
  els.shareModalClose?.addEventListener("click", () => closeShareModal());
  els.shareModal?.addEventListener("click", (event) => {
    if (event.target === els.shareModal) closeShareModal();
  });
  window.addEventListener("keydown", (event) => {
    // Trap Tab focus within the open modal (a11y).
    if (event.key === "Tab") {
      const modal = getOpenModalEl();
      if (!modal) return;
      const focusables = focusablesIn(modal);
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (!modal.contains(document.activeElement)) {
        event.preventDefault();
        first.focus();
      } else if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
      return;
    }
    if (event.key !== "Escape") return;
    // If the enlarge viewer is open within the collection modal, close it first.
    const enlarged = els.collectionModal?.querySelector(".collection-enlarged.show");
    if (enlarged) { enlarged.classList.remove("show"); return; }
    if (state.remapModalOpen) closeRemapModal();
    if (state.collectionModalOpen) closeCollectionModal();
    if (state.settingsModalOpen) closeSettingsModal();
    if (state.shareModalOpen) closeShareModal();
  });

  window.addEventListener("resize", onResize);

  validatePatterns();
  loadPattern(resizePattern(patterns[0], state.patternSize));
  applyBackgroundTheme(state.bgTheme);
  if (!loadAutoSave()) {
    setPhase("choose");
  }
  renderUI();
  requestAnimationFrame(tick);
})();
