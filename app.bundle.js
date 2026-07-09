(() => {
  // mard-palette.js
  var MARD_COLOR_DATA = {
    "A1": "#FAF4C8",
    "A2": "#FFFFD5",
    "A3": "#FEFF8B",
    "A4": "#FBED56",
    "A5": "#F4D738",
    "A6": "#FEAC4C",
    "A7": "#FE8B4C",
    "A8": "#FFDA45",
    "A9": "#FF995B",
    "A10": "#F77C31",
    "A11": "#FFDD99",
    "A12": "#FE9F72",
    "A13": "#FFC365",
    "A14": "#FD543D",
    "A15": "#FFF365",
    "A16": "#FFFF9F",
    "A17": "#FFE36E",
    "A18": "#FEBE7D",
    "A19": "#FD7C72",
    "A20": "#FFD568",
    "A21": "#FFE395",
    "A22": "#F4F57D",
    "A23": "#E6C9B7",
    "A24": "#F7F8A2",
    "A25": "#FFD67D",
    "A26": "#FFC830",
    "B1": "#E6EE31",
    "B2": "#63F347",
    "B3": "#9EF780",
    "B4": "#5DE035",
    "B5": "#35E352",
    "B6": "#65E2A6",
    "B7": "#3DAF80",
    "B8": "#1C9C4F",
    "B9": "#27523A",
    "B10": "#95D3C2",
    "B11": "#5D722A",
    "B12": "#166F41",
    "B13": "#CAEB7B",
    "B14": "#ADE946",
    "B15": "#2E5132",
    "B16": "#C5ED9C",
    "B17": "#9BB13A",
    "B18": "#E6EE49",
    "B19": "#24B88C",
    "B20": "#C2F0CC",
    "B21": "#156A6B",
    "B22": "#0B3C43",
    "B23": "#303A21",
    "B24": "#EEFCA5",
    "B25": "#4E846D",
    "B26": "#8D7A35",
    "B27": "#CCE1AF",
    "B28": "#9EE5B9",
    "B29": "#C5E254",
    "B30": "#E2FCB1",
    "B31": "#B0E792",
    "B32": "#9CAB5A",
    "C1": "#E8FFE7",
    "C2": "#A9F9FC",
    "C3": "#A0E2FB",
    "C4": "#41CCFF",
    "C5": "#01ACEB",
    "C6": "#50AAF0",
    "C7": "#3677D2",
    "C8": "#0F54C0",
    "C9": "#324BCA",
    "C10": "#3EBCE2",
    "C11": "#28DDDE",
    "C12": "#1C334D",
    "C13": "#CDE8FF",
    "C14": "#D5FDFF",
    "C15": "#22C4C6",
    "C16": "#1557A8",
    "C17": "#04D1F6",
    "C18": "#1D3344",
    "C19": "#1887A2",
    "C20": "#176DAF",
    "C21": "#BEDDFF",
    "C22": "#67B4BE",
    "C23": "#C8E2FF",
    "C24": "#7CC4FF",
    "C25": "#A9E5E5",
    "C26": "#3CAED8",
    "C27": "#D3DFFA",
    "C28": "#BBCFED",
    "C29": "#34488E",
    "D1": "#AEB4F2",
    "D2": "#858EDD",
    "D3": "#2F54AF",
    "D4": "#182A84",
    "D5": "#B843C5",
    "D6": "#AC7BDE",
    "D7": "#8854B3",
    "D8": "#E2D3FF",
    "D9": "#D5B9F8",
    "D10": "#361851",
    "D11": "#B9BAE1",
    "D12": "#DE9AD4",
    "D13": "#B90095",
    "D14": "#8B279B",
    "D15": "#2F1F90",
    "D16": "#E3E1EE",
    "D17": "#C4D4F6",
    "D18": "#D8C3D7",
    "D19": "#D8C3D7",
    "D20": "#9C32B2",
    "D21": "#9A009B",
    "D22": "#333A95",
    "D23": "#EBDAFC",
    "D24": "#7786E5",
    "D25": "#494FC7",
    "D26": "#DFC2F8",
    "E1": "#FDD3CC",
    "E2": "#FEC0DF",
    "E3": "#FFB7E7",
    "E4": "#E8649E",
    "E5": "#F551A2",
    "E6": "#F13D74",
    "E7": "#C63478",
    "E8": "#FFDBE9",
    "E9": "#E970CC",
    "E10": "#D33793",
    "E11": "#FCDDD2",
    "E12": "#F78FC3",
    "E13": "#B5006D",
    "E14": "#FFD1BA",
    "E15": "#F8C7C9",
    "E16": "#FFF3EB",
    "E17": "#FFE2EA",
    "E18": "#FFC7DB",
    "E19": "#FEBAD5",
    "E20": "#D8C7D1",
    "E21": "#BD9DA1",
    "E22": "#B785A1",
    "E23": "#937A8D",
    "E24": "#E1BCE8",
    "F1": "#FD957B",
    "F2": "#FC3D46",
    "F3": "#F74941",
    "F4": "#FC283C",
    "F5": "#E7002F",
    "F6": "#943630",
    "F7": "#971937",
    "F8": "#BC0028",
    "F9": "#E2677A",
    "F10": "#8A4526",
    "F11": "#5A2121",
    "F12": "#FD4E6A",
    "F13": "#F35744",
    "F14": "#FFA9AD",
    "F15": "#D30022",
    "F16": "#FEC2A6",
    "F17": "#E69C79",
    "F18": "#D37C46",
    "F19": "#C1444A",
    "F20": "#CD9391",
    "F21": "#F7B4C6",
    "F22": "#FDC0D0",
    "F23": "#F67E66",
    "F24": "#E698AA",
    "F25": "#E54B4F",
    "G1": "#FFE2CE",
    "G2": "#FFC4AA",
    "G3": "#F4C3A5",
    "G4": "#E1B383",
    "G5": "#EDB045",
    "G6": "#E99C17",
    "G7": "#9D5B3E",
    "G8": "#753832",
    "G9": "#E6B483",
    "G10": "#D98C39",
    "G11": "#E0C593",
    "G12": "#FFC890",
    "G13": "#B7714A",
    "G14": "#8D614C",
    "G15": "#FCF9E0",
    "G16": "#F2D9BA",
    "G17": "#78524B",
    "G18": "#FFE4CC",
    "G19": "#E07935",
    "G20": "#A94023",
    "G21": "#B88558",
    "H1": "#FDFBFF",
    "H2": "#FEFFFF",
    "H3": "#B6B1BA",
    "H4": "#89858C",
    "H5": "#48464E",
    "H6": "#2F2B2F",
    "H7": "#000000",
    "H8": "#E7D6DB",
    "H9": "#EDEDED",
    "H10": "#EEE9EA",
    "H11": "#CECDD5",
    "H12": "#FFF5ED",
    "H13": "#F5ECD2",
    "H14": "#CFD7D3",
    "H15": "#98A6A8",
    "H16": "#1D1414",
    "H17": "#F1EDED",
    "H18": "#FFFDF0",
    "H19": "#F6EFE2",
    "H20": "#949FA3",
    "H21": "#FFFBE1",
    "H22": "#CACAD4",
    "H23": "#9A9D94",
    "M1": "#BCC6B8",
    "M2": "#8AA386",
    "M3": "#697D80",
    "M4": "#E3D2BC",
    "M5": "#D0CCAA",
    "M6": "#B0A782",
    "M7": "#B4A497",
    "M8": "#B38281",
    "M9": "#A58767",
    "M10": "#C5B2BC",
    "M11": "#9F7594",
    "M12": "#644749",
    "M13": "#D19066",
    "M14": "#C77362",
    "M15": "#757D78",
    "P1": "#FCF7F8",
    "P2": "#B0A9AC",
    "P3": "#AFDCAB",
    "P4": "#FEA49F",
    "P5": "#EE8C3E",
    "P6": "#5FD0A7",
    "P7": "#EB9270",
    "P8": "#F0D958",
    "P9": "#D9D9D9",
    "P10": "#D9C7EA",
    "P11": "#F3ECC9",
    "P12": "#E6EEF2",
    "P13": "#AACBEF",
    "P14": "#337680",
    "P15": "#668575",
    "P16": "#FEBF45",
    "P17": "#FEA324",
    "P18": "#FEB89F",
    "P19": "#FFFEEC",
    "P20": "#FEBECF",
    "P21": "#ECBEBF",
    "P22": "#E4A89F",
    "P23": "#A56268",
    "Q1": "#F2A5E8",
    "Q2": "#E9EC91",
    "Q3": "#FFFF00",
    "Q4": "#FFEBFA",
    "Q5": "#76CEDE",
    "R1": "#D50D21",
    "R2": "#F92F83",
    "R3": "#FD8324",
    "R4": "#F8EC31",
    "R5": "#35C75B",
    "R6": "#238891",
    "R7": "#19779D",
    "R8": "#1A60C3",
    "R9": "#9A56B4",
    "R10": "#FFDB4C",
    "R11": "#FFEBFA",
    "R12": "#D8D5CE",
    "R13": "#55514C",
    "R14": "#9FE4DF",
    "R15": "#77CEE9",
    "R16": "#3ECFCA",
    "R17": "#4A867A",
    "R18": "#7FCD9D",
    "R19": "#CDE55D",
    "R21": "#AD6F3C",
    "R22": "#6C372F",
    "R23": "#FEB872",
    "R24": "#F3C1C0",
    "R25": "#C9675E",
    "R26": "#D293BE",
    "R27": "#EA8CB1",
    "R28": "#9C87D6",
    "T1": "#FFFFFF",
    "Y1": "#FD6FB4",
    "Y2": "#FEB481",
    "Y3": "#D7FAA0",
    "Y4": "#8BDBFA",
    "Y5": "#E987EA",
    "ZG1": "#DAABB3",
    "ZG2": "#D6AA87",
    "ZG3": "#C1BD8D",
    "ZG4": "#96869F",
    "ZG5": "#8490A6",
    "ZG6": "#94BFE2",
    "ZG7": "#E2A9D2",
    "ZG8": "#AB91C0"
  };

  // src/palette.js
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
  var palette = {
    Q: "#FAF4C8",
    q: "#FFFFFF",
    U: "#FDFBFF",
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
    z: "#EDB045"
  };
  var beadIds = {
    Q: "A1",
    q: "T1",
    U: "H1",
    W: "H2",
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
    D: "F7"
  };
  var mardColorData = MARD_COLOR_DATA;
  var mardCodeToWorkshopCode = {};
  Object.entries(beadIds).forEach(([code, mardCode]) => {
    mardCodeToWorkshopCode[normalizeMardCode(mardCode)] = code;
  });
  var basePaletteMardCodes = Object.values(beadIds).map(normalizeMardCode);
  var nextExtendedColorCode = 0;
  Object.entries(mardColorData).forEach(([mardCode, hex]) => {
    const normalized = normalizeMardCode(mardCode);
    const internalCode = mardCodeToWorkshopCode[normalized] || String.fromCharCode(57344 + nextExtendedColorCode++);
    mardCodeToWorkshopCode[normalized] = internalCode;
    palette[internalCode] = hex;
    beadIds[internalCode] = normalized;
  });
  function workshopCodeForMard(mardCode) {
    return mardCodeToWorkshopCode[normalizeMardCode(mardCode)] || normalizeMardCode(mardCode);
  }
  var sortedColorCodes = Object.keys(palette).sort((a, b) => (beadIds[a] || a).localeCompare(beadIds[b] || b, "zh-Hans-CN", { numeric: true }));
  var mardCodes = Object.keys(mardColorData).map(normalizeMardCode).sort(mardCodeSort);
  var MARD_SET_48 = [
    "A4",
    "A6",
    "A7",
    "A10",
    "A11",
    "A13",
    "B3",
    "B5",
    "B8",
    "B12",
    "C2",
    "C3",
    "C5",
    "C6",
    "C7",
    "C8",
    "C10",
    "C11",
    "C13",
    "D3",
    "D6",
    "D7",
    "D9",
    "D13",
    "D15",
    "D18",
    "D19",
    "D21",
    "E2",
    "E3",
    "E4",
    "E7",
    "E8",
    "F5",
    "F8",
    "F13",
    "G1",
    "G5",
    "G7",
    "G8",
    "G9",
    "G13",
    "H1",
    "H2",
    "H3",
    "H4",
    "H5",
    "H7"
  ];
  var MARD_SET_96 = [
    "A3",
    "A4",
    "A6",
    "A7",
    "A10",
    "A11",
    "A13",
    "A14",
    "B3",
    "B5",
    "B7",
    "B8",
    "B10",
    "B12",
    "B14",
    "B17",
    "B18",
    "B19",
    "B20",
    "C2",
    "C3",
    "C5",
    "C6",
    "C7",
    "C8",
    "C10",
    "C11",
    "C13",
    "C16",
    "D2",
    "D3",
    "D5",
    "D6",
    "D7",
    "D8",
    "D9",
    "D11",
    "D12",
    "D13",
    "D14",
    "D15",
    "D16",
    "D18",
    "D19",
    "D20",
    "D21",
    "E1",
    "E2",
    "E3",
    "E4",
    "E5",
    "E6",
    "E7",
    "E8",
    "E9",
    "E10",
    "E11",
    "E12",
    "E13",
    "E14",
    "E15",
    "F1",
    "F2",
    "F3",
    "F4",
    "F5",
    "F6",
    "F7",
    "F8",
    "F9",
    "F10",
    "F11",
    "F12",
    "F13",
    "F14",
    "G1",
    "G2",
    "G3",
    "G5",
    "G7",
    "G8",
    "G9",
    "G13",
    "G14",
    "G17",
    "H1",
    "H2",
    "H3",
    "H4",
    "H5",
    "H6",
    "H7",
    "M5",
    "M6",
    "M9",
    "M12"
  ];
  var palettePresetMardCodes = {
    48: MARD_SET_48.map(normalizeMardCode).sort(mardCodeSort),
    96: MARD_SET_96.map(normalizeMardCode).sort(mardCodeSort),
    221: mardCodes.filter((code) => /^[A-HM]\d+$/.test(code)).sort(mardCodeSort)
  };

  // src/color-utils.js
  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }
  function lerp(a, b, t) {
    return a + (b - a) * t;
  }
  function easeOut(t) {
    return 1 - Math.pow(1 - clamp(t, 0, 1), 3);
  }
  function parseColor(color) {
    if (typeof color === "string") {
      const rgbMatch = color.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/i);
      if (rgbMatch) {
        return { r: +rgbMatch[1], g: +rgbMatch[2], b: +rgbMatch[3] };
      }
      if (color[0] === "#") {
        const value = parseInt(color.slice(1), 16);
        if (Number.isFinite(value)) {
          return { r: value >> 16 & 255, g: value >> 8 & 255, b: value & 255 };
        }
      }
    }
    return { r: 153, g: 153, b: 153 };
  }
  function mixColor(hex, target, amount) {
    const a = parseColor(hex);
    const b = parseColor(target);
    const rr = Math.round(lerp(a.r, b.r, amount));
    const rg = Math.round(lerp(a.g, b.g, amount));
    const rb = Math.round(lerp(a.b, b.b, amount));
    return `rgb(${rr}, ${rg}, ${rb})`;
  }
  function fadedPrintColor(hex) {
    return mixColor(hex, "#eadfc6", 0.58);
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
      b: 0.0259040371 * l3 + 0.7827717662 * m3 - 0.808675766 * s3
    };
  }
  function oklabDistance(a, b) {
    const dl = (a.l - b.l) * 1.05;
    const da = (a.a - b.a) * 1.35;
    const db = (a.b - b.b) * 1.25;
    return dl * dl + da * da + db * db;
  }
  function hexToRgb(hex) {
    return parseColor(hex);
  }
  var beadOklabCache = {};
  function beadOklab(code) {
    if (!beadOklabCache[code]) {
      const rgb = hexToRgb(palette[code]);
      beadOklabCache[code] = rgbToOklab(rgb.r, rgb.g, rgb.b);
    }
    return beadOklabCache[code];
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
    return best;
  }

  // src/patterns-data.js
  var patternSeeds = [
    {
      id: "berry-cat",
      name: "\u8393\u679C\u5C0F\u732B",
      size: 24,
      craft: "\u94A5\u5319\u6263",
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
        "........................"
      ],
      note: "\u732B\u732B\u8E6D\u5230\u679C\u6C41\u5566"
    },
    {
      id: "rocket",
      name: "\u684C\u9762\u706B\u7BAD",
      size: 16,
      craft: "\u51B0\u7BB1\u8D34",
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
        "................"
      ],
      note: "\u8D34\u5728\u51B0\u7BB1\u4E5F\u4F1A\u98DE"
    },
    {
      id: "lake-whale",
      name: "\u70ED\u5E26\u5C0F\u9C7C",
      size: 16,
      craft: "\u676F\u57AB",
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
        "................"
      ],
      note: "\u4E0D\u7528\u5582\u7684\u5C0F\u9C7C"
    },
    {
      id: "sweet-heart",
      name: "\u5FC3\u52A8\u4FE1\u53F7",
      size: 16,
      craft: "\u94A5\u5319\u6263",
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
        "................"
      ],
      note: "\u5FC3\u8DF3\u6709\u70B9\u5FEB"
    },
    {
      id: "milk-tea",
      name: "\u5976\u8336\u7EA6\u4F1A",
      size: 16,
      craft: "\u51B0\u7BB1\u8D34",
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
        "................"
      ],
      note: "\u4E24\u676F\u521A\u521A\u597D"
    },
    {
      id: "ribbon-clip",
      name: "\u8774\u8776\u7ED3\u53D1\u5939",
      size: 16,
      craft: "\u94A5\u5319\u6263",
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
        "................"
      ],
      note: "\u6234\u4E0A\u5C31\u597D\u770B"
    },
    {
      id: "game-date",
      name: "\u53CC\u4EBA\u624B\u67C4",
      size: 16,
      craft: "\u6446\u4EF6",
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
        "................"
      ],
      note: "\u627E\u4E2A\u4EBA\u4E00\u8D77\u73A9"
    },
    {
      id: "mini-bouquet",
      name: "\u8FF7\u4F60\u82B1\u675F",
      size: 16,
      craft: "\u51B0\u7BB1\u8D34",
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
        "................"
      ],
      note: "\u9001\u8C01\u90FD\u5408\u9002"
    },
    {
      id: "instant-photo",
      name: "\u62CD\u7ACB\u5F97\u56DE\u5FC6",
      size: 16,
      craft: "\u676F\u57AB",
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
        "................"
      ],
      note: "\u50CF\u521A\u51B2\u51FA\u6765"
    },
    {
      id: "panda",
      name: "\u7AF9\u6797\u718A\u732B",
      size: 16,
      craft: "\u94A5\u5319\u6263",
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
        "................"
      ],
      note: "\u5403\u9971\u5C31\u53D1\u5446"
    },
    {
      id: "mushroom",
      name: "\u8611\u83C7\u5C4B",
      size: 16,
      craft: "\u51B0\u7BB1\u8D34",
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
        "................"
      ],
      note: "\u4E0B\u96E8\u6B63\u597D\u8EB2"
    },
    {
      id: "strawberry",
      name: "\u751C\u5FC3\u8349\u8393",
      size: 16,
      craft: "\u94A5\u5319\u6263",
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
        "......RRRR......"
      ],
      note: "\u5C1D\u4E86\uFF0C\u4E0D\u9178"
    },
    {
      id: "boba",
      name: "\u73CD\u73E0\u5976\u8336",
      size: 16,
      craft: "\u51B0\u7BB1\u8D34",
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
        "................"
      ],
      note: "\u73CD\u73E0\u591A\u52A0\u70B9"
    },
    {
      id: "ghost",
      name: "\u5C0F\u5E7D\u7075",
      size: 16,
      craft: "\u94A5\u5319\u6263",
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
        "................"
      ],
      note: "\u4E0D\u5413\u4EBA\uFF0C\u8FD8\u4E56"
    },
    {
      id: "moon",
      name: "\u591C\u7A7A\u5F2F\u6708",
      size: 16,
      craft: "\u676F\u57AB",
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
        "................"
      ],
      note: "\u4ECA\u665A\u6708\u4EAE\u4E0D\u9519"
    }
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
  function padRowsTo(rows, target) {
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
  var patterns = patternSeeds.map((seed) => ({
    ...seed,
    size: 30,
    width: 30,
    height: 30,
    rows: padRowsTo(detailedRowsFromSeed(seed, 24), 30),
    note: seed.note || ""
  }));
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
        const tieRank = (code) => {
          if (code === ".") return 0;
          if (code === "W" || code === "q") return 1;
          return 2;
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
          if (pick === "." && centerCode !== "." && centerWeight > 0 && bestWeight / centerWeight < 1.25) {
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
          const index2 = queue[head++];
          const x = index2 % sourceSize;
          const y = Math.floor(index2 / sourceSize);
          const neighbors = [
            [x + 1, y],
            [x - 1, y],
            [x, y + 1],
            [x, y - 1]
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
        const targetVotes = /* @__PURE__ */ new Map();
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
  function validatePatterns() {
    patterns.forEach((pattern) => {
      const badRow = pattern.rows.findIndex((row) => row.length !== pattern.size);
      if (badRow >= 0) {
        throw new Error(`${pattern.name} \u7B2C ${badRow + 1} \u884C\u957F\u5EA6\u4E0D\u662F ${pattern.size}`);
      }
      const unknownCodes = [...new Set(pattern.rows.join("").replace(/\./g, "").split(""))].filter((code) => !palette[code] || !beadIds[code]);
      if (unknownCodes.length) {
        throw new Error(`${pattern.name} \u4F7F\u7528\u4E86\u672A\u767B\u8BB0\u989C\u8272\uFF1A${unknownCodes.join(", ")}`);
      }
    });
  }

  // src/constants.js
  var phases = [
    { id: "choose", name: "\u9009\u56FE" },
    { id: "place", name: "\u6446\u653E" },
    { id: "inspect", name: "\u68C0\u67E5" },
    { id: "iron", name: "\u71A8\u70EB" },
    { id: "cool", name: "\u51B7\u5374" },
    { id: "finish", name: "\u6536\u85CF" }
  ];
  var backgroundThemes = {
    mist: {
      name: "\u96FE\u9752",
      pageBase: "#eef2f4",
      pageGlowA: "rgba(87, 184, 167, 0.14)",
      pageGlowB: "rgba(231, 100, 95, 0.11)",
      table: ["#e4eceb", "#d7e2e0", "#c8d6d5"],
      brand: "#57b8a7",
      cta: ["#3D9C8C", "#389586"],
      scrim: "rgba(215, 226, 224, 0.52)",
      brandInk: "#1f6153",
      brandEdge: "#3f988b",
      brandTint: "rgba(87, 184, 167, 0.16)",
      brandTintStrong: "rgba(87, 184, 167, 0.25)",
      matFill: "rgba(60, 133, 119, 0.12)",
      matStroke: "rgba(40, 96, 87, 0.16)",
      gridStroke: "rgba(255, 255, 255, 0.22)"
    },
    apricot: {
      name: "\u5976\u674F",
      pageBase: "#f6f0e8",
      pageGlowA: "rgba(216, 170, 92, 0.16)",
      pageGlowB: "rgba(119, 170, 143, 0.11)",
      table: ["#eee8dc", "#e4dbc9", "#d7cfbf"],
      brand: "#d8aa5c",
      cta: ["#AC8749", "#A48146"],
      scrim: "rgba(228, 219, 201, 0.52)",
      brandInk: "#8a5f23",
      brandEdge: "#c48f41",
      brandTint: "rgba(216, 170, 92, 0.16)",
      brandTintStrong: "rgba(216, 170, 92, 0.26)",
      matFill: "rgba(191, 151, 88, 0.13)",
      matStroke: "rgba(139, 111, 69, 0.16)",
      gridStroke: "rgba(255, 255, 255, 0.2)"
    },
    sakura: {
      name: "\u6D45\u6A31",
      pageBase: "#f6eef0",
      pageGlowA: "rgba(231, 142, 150, 0.14)",
      pageGlowB: "rgba(105, 166, 158, 0.1)",
      table: ["#efe4e6", "#e4d8dc", "#d8cbd1"],
      brand: "#e78e96",
      cta: ["#C4787F", "#BA7379"],
      scrim: "rgba(228, 216, 220, 0.52)",
      brandInk: "#9a4757",
      brandEdge: "#d56b78",
      brandTint: "rgba(231, 142, 150, 0.16)",
      brandTintStrong: "rgba(231, 142, 150, 0.26)",
      matFill: "rgba(195, 120, 132, 0.12)",
      matStroke: "rgba(151, 84, 97, 0.15)",
      gridStroke: "rgba(255, 255, 255, 0.23)"
    },
    sky: {
      name: "\u6674\u84DD",
      pageBase: "#edf4f7",
      pageGlowA: "rgba(101, 157, 194, 0.14)",
      pageGlowB: "rgba(219, 176, 101, 0.1)",
      table: ["#e2edf1", "#d4e4ea", "#c7d8df"],
      brand: "#659dc2",
      cta: ["#5F93B6", "#5A8CAD"],
      scrim: "rgba(212, 228, 234, 0.52)",
      brandInk: "#365c79",
      brandEdge: "#4f8fb8",
      brandTint: "rgba(101, 157, 194, 0.16)",
      brandTintStrong: "rgba(101, 157, 194, 0.25)",
      matFill: "rgba(75, 132, 163, 0.12)",
      matStroke: "rgba(54, 99, 124, 0.15)",
      gridStroke: "rgba(255, 255, 255, 0.22)"
    },
    herb: {
      name: "\u8349\u6728",
      pageBase: "#eef3ec",
      pageGlowA: "rgba(116, 158, 112, 0.16)",
      pageGlowB: "rgba(213, 165, 96, 0.11)",
      table: ["#e4eadf", "#d8e1d2", "#cbd6c4"],
      brand: "#749e70",
      cta: ["#6F976B", "#6A9066"],
      scrim: "rgba(216, 225, 210, 0.52)",
      brandInk: "#40673f",
      brandEdge: "#5d8458",
      brandTint: "rgba(116, 158, 112, 0.16)",
      brandTintStrong: "rgba(116, 158, 112, 0.25)",
      matFill: "rgba(94, 135, 86, 0.13)",
      matStroke: "rgba(68, 104, 64, 0.15)",
      gridStroke: "rgba(255, 255, 255, 0.21)"
    }
  };
  var toolStyles = {
    candy: { name: "\u7CD6\u679C", primary: "#f08a9d", secondary: "#ffd5dc", accent: "#fff0a8", tip: "#5c5264", deco: "heart" },
    mint: { name: "\u8584\u8377", primary: "#57b8a7", secondary: "#c8f0e8", accent: "#fff6bf", tip: "#455f60", deco: "leaf" },
    sky: { name: "\u6674\u7A7A", primary: "#6daedb", secondary: "#d6ecf8", accent: "#f7d28b", tip: "#465e72", deco: "cloud" },
    lavender: { name: "\u85B0\u8863\u8349", primary: "#9b8bd3", secondary: "#e2dbff", accent: "#f2c4d6", tip: "#5d5673", deco: "flower" }
  };
  var craftOptions = ["\u539F\u7248", "\u94A5\u5319\u6263", "\u676F\u57AB", "\u6446\u4EF6"];
  var BOARD_SIZE = 30;
  var HEAT_LEVELS = Object.freeze({
    visible: 8,
    bonded: 38,
    idealMin: 52,
    idealMax: 96,
    over: 108,
    scorched: 124
  });
  var TRAY_DESKTOP_ROWS = 10;
  var TRAY_DESKTOP_COLS = 12;
  var TRAY_MOBILE_ROWS = 5;
  var TRAY_MOBILE_COLS = 24;
  var APP_VERSION = "1.0.0";
  var clientIdKey = "beadWorkshopClientId.v1";
  var collectionKey = "beadWorkshopCollection.v1";
  var patternLibraryKey = "beadWorkshopPatternLibrary.v1";
  var sessionKey = "beadWorkshopSession.v1";
  var collectionLimit = 24;
  var achievementKey = "beadWorkshopAchievements.v1";
  var onboardingKey = "beadWorkshopOnboarding.v1";
  var conceptAchievement = "\u89C2\u5FF5\u5148\u4E8E\u71A8\u70EB";
  var fullBoardAchievement = "\u6CA1\u6709\u4E00\u4E2A\u5B54\u4F4D\u662F\u65E0\u8F9C\u7684";
  var needleLoadSortThreshold = 70;

  // src/state.js
  var state = {
    appMode: "home",
    phase: "choose",
    patternSize: 30,
    customDenoiseLevel: 25,
    paletteSize: 221,
    selectedPattern: patterns[0],
    patternColorMaps: {},
    patternColorMap: {},
    patternEffectiveMapCache: {},
    patternAnalysisCache: {},
    remapFocusSource: null,
    remapModalOpen: false,
    collectionModalOpen: false,
    collectionPageOpen: false,
    settingsModalOpen: false,
    onboardingModalOpen: false,
    shareModalOpen: false,
    gallerySubmitModalOpen: false,
    confirmModalOpen: false,
    textInputModalOpen: false,
    modalReturnFocus: null,
    sandboxMode: false,
    bgTheme: "mist",
    toolStyle: "candy",
    lampOn: false,
    lampSwitchFlashUntil: 0,
    pressAnim: null,
    // { startedAt, duration } — scraper sliding bottom→up
    projectedGuideCache: null,
    selectedColor: "K",
    mobileColorPulseId: 0,
    mobileColorPulsePending: false,
    mobileBeadSettle: null,
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
    craft: "\u94A5\u5319\u6263",
    craftSwitchAt: 0,
    savedCurrent: false,
    buildMs: 0,
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
      lastT: 0
    },
    boardView: {
      scale: 1,
      panX: 0,
      panY: 0,
      velX: 0,
      // keyboard pan velocity (px/s)
      velY: 0,
      velScale: 0
      // keyboard zoom velocity (scale/s)
    },
    kbdNav: {
      up: false,
      down: false,
      left: false,
      right: false,
      zoomIn: false,
      zoomOut: false
    },
    keyboardGrid: {
      x: 0,
      y: 0,
      visible: false
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
      startMidY: 0
    },
    toolPose: {
      x: 0,
      y: 0,
      visible: false
    },
    toastTimer: null,
    placeHintTimer: null,
    lastPlaceHintKey: "",
    achievementTimer: null,
    celebrateTimer: null,
    renderDirty: true,
    uiDirty: true,
    previewDirty: true,
    patternsDirty: true,
    pendingWorkflowScroll: true,
    pendingPageReset: false,
    placedVersion: 0
  };

  // src/dom.js
  var $ = (selector) => document.querySelector(selector);
  var sceneCanvas = $("#sceneCanvas");
  var scene = sceneCanvas.getContext("2d");
  var previewCanvas = $("#previewCanvas");
  var preview = previewCanvas.getContext("2d");
  var sideReferenceCanvas = $("#sideReferenceCanvas");
  var sideReferenceCtx = sideReferenceCanvas?.getContext("2d");
  var els = {
    startScreen: $("#startScreen"),
    startBeadButton: $("#startBeadButton"),
    startDrawButton: $("#startDrawButton"),
    startGalleryButton: $("#startGalleryButton"),
    startShowcaseButton: $("#startShowcaseButton"),
    startShowcaseCanvas: $("#startShowcaseCanvas"),
    startShowcaseDots: $("#startShowcaseDots"),
    startShowcaseName: $("#startShowcaseName"),
    startShowcaseCraft: $("#startShowcaseCraft"),
    galleryScreen: $("#galleryScreen"),
    galleryBackButton: $("#galleryBackButton"),
    gallerySettingsButton: $("#gallerySettingsButton"),
    gallerySubmitButton: $("#gallerySubmitButton"),
    galleryRefreshButton: $("#galleryRefreshButton"),
    galleryGrid: $("#galleryGrid"),
    galleryEmpty: $("#galleryEmpty"),
    gallerySubmitModal: $("#gallerySubmitModal"),
    gallerySubmitCloseBtn: $("#gallerySubmitCloseBtn"),
    gallerySubmitCancelBtn: $("#gallerySubmitCancelBtn"),
    gallerySubmitConfirmBtn: $("#gallerySubmitConfirmBtn"),
    gallerySubmitName: $("#gallerySubmitName"),
    gallerySubmitAuthor: $("#gallerySubmitAuthor"),
    gallerySubmitCode: $("#gallerySubmitCode"),
    collectionScreen: $("#collectionScreen"),
    collectionBackButton: $("#collectionBackButton"),
    collectionSettingsButton: $("#collectionSettingsButton"),
    collectionRefreshButton: $("#collectionRefreshButton"),
    drawingStudio: $("#drawingStudio"),
    drawingBackButton: $("#drawingBackButton"),
    drawSettingsButton: $("#drawSettingsButton"),
    drawResetButton: $("#drawResetButton"),
    drawCanvas: $("#drawCanvas"),
    drawCodeModal: $("#drawCodeModal"),
    drawCodeModalTitle: $("#drawCodeModalTitle"),
    drawCodeHint: $("#drawCodeHint"),
    drawCodeCloseBtn: $("#drawCodeCloseBtn"),
    drawCodeCancelBtn: $("#drawCodeCancelBtn"),
    drawCodeCopyBtn: $("#drawCodeCopyBtn"),
    drawCodeGenerateBtn: $("#drawCodeGenerateBtn"),
    drawCodeImportConfirmBtn: $("#drawCodeImportConfirmBtn"),
    drawCodeTitleField: $("#drawCodeTitleField"),
    drawCodeTitleInput: $("#drawCodeTitleInput"),
    drawClearButton: $("#drawClearButton"),
    drawImportButton: $("#drawImportButton"),
    drawShortCodeButton: $("#drawShortCodeButton"),
    drawImageStampButton: $("#drawImageStampButton"),
    drawImageInput: $("#drawImageInput"),
    drawSubmitGalleryButton: $("#drawSubmitGalleryButton"),
    drawUsePatternButton: $("#drawUsePatternButton"),
    drawUndoButton: $("#drawUndoButton"),
    drawCodeInput: $("#drawCodeInput"),
    drawPaletteMeta: $("#drawPaletteMeta"),
    drawRecentColors: $("#drawRecentColors"),
    drawPalette: $("#drawPalette"),
    drawPaletteSearch: $("#drawPaletteSearch"),
    drawColorTrigger: $("#drawColorTrigger"),
    drawColorTriggerSwatch: $("#drawColorTriggerSwatch"),
    drawColorTriggerCode: $("#drawColorTriggerCode"),
    drawingPalettePanel: $("#drawingPalettePanel"),
    drawPaletteBackdrop: $("#drawPaletteBackdrop"),
    drawPaletteCloseButton: $("#drawPaletteCloseButton"),
    beadBackButton: $("#beadBackButton"),
    patternMeta: $("#patternMeta"),
    patternList: $("#patternList"),
    mobileSelectionSummary: $("#mobileSelectionSummary"),
    mobileSelectionThumb: $("#mobileSelectionThumb"),
    mobileSelectionName: $("#mobileSelectionName"),
    mobileSelectionMeta: $("#mobileSelectionMeta"),
    mobileSelectionStartButton: $("#mobileSelectionStartButton"),
    customImageControls: $("#customImageControls"),
    customImageInput: $("#customImageInput"),
    customWhiteToggle: $("#customWhiteToggle"),
    customDenoiseSlider: $("#customDenoiseSlider"),
    customDenoiseValue: $("#customDenoiseValue"),
    customSizeMeta: $("#customSizeMeta"),
    customStats: $("#customStats"),
    patternColorStats: $("#patternColorStats"),
    targetCount: $("#targetCount"),
    controlTitle: $("#controlTitle"),
    toolMeta: $("#toolMeta"),
    stageControls: $("#stageControls"),
    mobileActionHost: $("#mobileActionHost"),
    sideReference: $("#sideReference"),
    sideReferenceMeta: $("#sideReferenceMeta"),
    sideReferenceLegend: $("#sideReferenceLegend"),
    studioGrid: $("#studioGrid"),
    workflowProgress: $("#workflowProgress"),
    mobileWorkflowSummary: $("#mobileWorkflowSummary"),
    mobilePatternThumb: $("#mobilePatternThumb"),
    mobilePatternName: $("#mobilePatternName"),
    mobileWorkflowCurrent: $("#mobileWorkflowCurrent"),
    mobileWorkflowNext: $("#mobileWorkflowNext"),
    currentPatternChip: $("#currentPatternChip"),
    currentPatternThumb: document.querySelector("#currentPatternChip .current-pattern-thumb"),
    currentPatternName: $("#currentPatternName"),
    currentPatternMeta: $("#currentPatternMeta"),
    collectionButton: $("#collectionButton"),
    startCommunityButton: $("#startCommunityButton"),
    communityScreen: $("#communityScreen"),
    communityBackButton: $("#communityBackButton"),
    communitySettingsButton: $("#communitySettingsButton"),
    communityRefreshButton: $("#communityRefreshButton"),
    communityTabMessages: $("#communityTabMessages"),
    communityTabRoadmap: $("#communityTabRoadmap"),
    communityMessages: $("#communityMessages"),
    communityRoadmap: $("#communityRoadmap"),
    settingsButton: $("#settingsButton"),
    settingsDot: $("#settingsDot"),
    settingsModal: $("#settingsModal"),
    settingsModalClose: $("#settingsModalClose"),
    bgmButton: $("#bgmButton"),
    sfxButton: $("#sfxButton"),
    hapticButton: $("#hapticButton"),
    confirmModal: $("#confirmModal"),
    confirmModalMessage: $("#confirmModalMessage"),
    confirmModalTitle: $("#confirmModalTitle"),
    confirmModalOk: $("#confirmModalOk"),
    confirmModalCancel: $("#confirmModalCancel"),
    textInputModal: $("#textInputModal"),
    textInputModalTitle: $("#textInputModalTitle"),
    textInputModalClose: $("#textInputModalClose"),
    textInputModalLabel: $("#textInputModalLabel"),
    textInputModalInput: $("#textInputModalInput"),
    textInputModalHint: $("#textInputModalHint"),
    textInputModalCancel: $("#textInputModalCancel"),
    textInputModalOk: $("#textInputModalOk"),
    onboardingModal: $("#onboardingModal"),
    onboardingBody: $("#onboardingBody"),
    onboardingDoneBtn: $("#onboardingDoneBtn"),
    onboardingCloseBtn: $("#onboardingCloseBtn"),
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
    bgThemeChips: $("#bgThemeChips"),
    toolStyleChips: $("#toolStyleChips"),
    toolStyleField: $("#toolStyleField"),
    sandboxButton: $("#sandboxButton"),
    chooseStartButton: $("#chooseStartButton"),
    resetButton: $("#resetButton"),
    toast: $("#toast"),
    placeHint: $("#placeHint"),
    achievementToast: $("#achievementToast"),
    celebrateLayer: $("#celebrateLayer")
  };

  // src/notify.js
  function showToast(message) {
    window.clearTimeout(state.toastTimer);
    els.toast.textContent = message;
    els.toast.classList.add("show");
    state.toastTimer = window.setTimeout(() => {
      els.toast.classList.remove("show");
    }, 2e3);
  }
  function hidePlaceHint() {
    if (!els.placeHint) return;
    els.placeHint.classList.remove("show");
  }
  function showPlaceHint(message, key = message, duration = 2e3) {
    if (!els.placeHint || !message) return;
    if (state.appMode !== "bead") return;
    if (state.lastPlaceHintKey === key) return;
    state.lastPlaceHintKey = key;
    window.clearTimeout(state.placeHintTimer);
    els.placeHint.textContent = message;
    els.placeHint.classList.add("show");
    state.placeHintTimer = window.setTimeout(() => {
      hidePlaceHint();
    }, duration);
  }
  function celebrate() {
    const layer = els.celebrateLayer;
    if (!layer) return;
    window.clearTimeout(state.celebrateTimer);
    layer.classList.remove("show");
    void layer.offsetWidth;
    layer.classList.add("show");
    state.celebrateTimer = window.setTimeout(() => {
      layer.classList.remove("show");
    }, 760);
  }
  function showAchievementToast(name) {
    if (!els.achievementToast) {
      showToast(`\u9690\u85CF\u6210\u5C31\u89E3\u9501\uFF1A${name}`);
      return;
    }
    window.clearTimeout(state.achievementTimer);
    els.achievementToast.innerHTML = `<span class="label">\u9690\u85CF\u6210\u5C31</span><strong>${name}</strong>`;
    els.achievementToast.classList.add("show");
    state.achievementTimer = window.setTimeout(() => {
      els.achievementToast.classList.remove("show");
    }, 2600);
  }

  // src/storage.js
  function readCollection() {
    try {
      const parsed = JSON.parse(localStorage.getItem(collectionKey) || "[]");
      if (!Array.isArray(parsed)) return [];
      return parsed.slice(0, collectionLimit);
    } catch (error) {
      return [];
    }
  }
  function writeCollection(coll) {
    try {
      localStorage.setItem(collectionKey, JSON.stringify(coll.slice(0, collectionLimit)));
      return true;
    } catch (error) {
      showToast("\u6D4F\u89C8\u5668\u963B\u6B62\u4E86\u672C\u5730\u4FDD\u5B58\uFF0C\u4F46\u4F5C\u54C1\u5DF2\u7ECF\u5B8C\u6210\u3002");
      return false;
    }
  }

  // src/bgm.js
  var BGM_SOURCE = "./audio/background.mp3";
  var TARGET_VOLUME = 0.4;
  var FADE_IN_MS = 600;
  var FADE_OUT_MS = 400;
  var audio = null;
  var playing = false;
  var fadeGeneration = 0;
  function ensureAudio() {
    if (audio) return audio;
    if (typeof Audio !== "function") return null;
    try {
      audio = new Audio(BGM_SOURCE);
      audio.loop = true;
      audio.preload = "auto";
      audio.volume = 0;
      return audio;
    } catch (error) {
      return null;
    }
  }
  function requestFrame(callback) {
    if (typeof requestAnimationFrame === "function") {
      return requestAnimationFrame(callback);
    }
    return setTimeout(() => callback(Date.now()), 16);
  }
  function fadeVolume(track, target, duration, generation, onComplete) {
    const initial = track.volume;
    let startedAt = null;
    const step = (timestamp) => {
      if (generation !== fadeGeneration) return;
      if (startedAt === null) startedAt = timestamp;
      const progress = Math.min(1, (timestamp - startedAt) / duration);
      track.volume = initial + (target - initial) * progress;
      if (progress < 1) {
        requestFrame(step);
        return;
      }
      track.volume = target;
      onComplete?.();
    };
    requestFrame(step);
  }
  function isBgmPlaying() {
    return playing;
  }
  async function startBgm() {
    if (playing) return true;
    const track = ensureAudio();
    if (!track) return false;
    const generation = ++fadeGeneration;
    track.volume = 0;
    try {
      await track.play();
    } catch (error) {
      if (generation === fadeGeneration) {
        track.pause();
        track.volume = 0;
        playing = false;
      }
      return false;
    }
    if (generation !== fadeGeneration) {
      track.pause();
      return false;
    }
    playing = true;
    fadeVolume(track, TARGET_VOLUME, FADE_IN_MS, generation);
    return true;
  }
  function stopBgm() {
    playing = false;
    const track = audio;
    if (!track) return false;
    const generation = ++fadeGeneration;
    fadeVolume(track, 0, FADE_OUT_MS, generation, () => {
      track.pause();
    });
    return false;
  }
  async function toggleBgm(next = !playing) {
    return next ? startBgm() : stopBgm();
  }

  // src/sfx.js
  var ctx = null;
  var master = null;
  var noiseBuf = null;
  var sfxEnabled = true;
  var hapticEnabled = true;
  try {
    sfxEnabled = (localStorage.getItem("perler-sfx") ?? "on") !== "off";
  } catch (e) {
  }
  try {
    hapticEnabled = (localStorage.getItem("perler-haptic") ?? "on") !== "off";
  } catch (e) {
  }
  function persist(key, on) {
    try {
      localStorage.setItem(key, on ? "on" : "off");
    } catch (e) {
    }
  }
  function isSfxEnabled() {
    return sfxEnabled;
  }
  function isHapticEnabled() {
    return hapticEnabled;
  }
  function setSfxEnabled(v) {
    sfxEnabled = !!v;
    persist("perler-sfx", sfxEnabled);
  }
  function setHapticEnabled(v) {
    hapticEnabled = !!v;
    persist("perler-haptic", hapticEnabled);
  }
  function ensureCtx() {
    if (ctx) return ctx;
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    try {
      ctx = new AC();
      master = ctx.createGain();
      master.gain.value = 0.32;
      const comp = ctx.createDynamicsCompressor();
      master.connect(comp);
      comp.connect(ctx.destination);
    } catch (e) {
      ctx = null;
    }
    return ctx;
  }
  function noise() {
    if (noiseBuf) return noiseBuf;
    const len = Math.floor(ctx.sampleRate * 0.5);
    noiseBuf = ctx.createBuffer(1, len, ctx.sampleRate);
    const d = noiseBuf.getChannelData(0);
    for (let i = 0; i < len; i += 1) d[i] = Math.random() * 2 - 1;
    return noiseBuf;
  }
  var rand = (a, b) => a + Math.random() * (b - a);
  function tone(t0, { freq = 440, type = "sine", dur = 0.08, gain = 0.6, glideTo = null, attack = 4e-3 }) {
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = type;
    o.frequency.setValueAtTime(freq, t0);
    if (glideTo) o.frequency.exponentialRampToValueAtTime(Math.max(1, glideTo), t0 + dur);
    g.gain.setValueAtTime(1e-4, t0);
    g.gain.exponentialRampToValueAtTime(gain, t0 + attack);
    g.gain.exponentialRampToValueAtTime(1e-4, t0 + dur);
    o.connect(g);
    g.connect(master);
    o.start(t0);
    o.stop(t0 + dur + 0.02);
  }
  function noiseHit(t0, { dur = 0.18, gain = 0.4, type = "bandpass", freq = 2600, q = 0.8, attack = 0.01, tremolo = 0, glideTo = null }) {
    const src = ctx.createBufferSource();
    src.buffer = noise();
    const f = ctx.createBiquadFilter();
    f.type = type;
    f.frequency.setValueAtTime(freq, t0);
    if (glideTo) f.frequency.exponentialRampToValueAtTime(Math.max(20, glideTo), t0 + dur);
    f.Q.value = q;
    const g = ctx.createGain();
    g.gain.setValueAtTime(1e-4, t0);
    g.gain.exponentialRampToValueAtTime(gain, t0 + attack);
    g.gain.exponentialRampToValueAtTime(1e-4, t0 + dur);
    src.connect(f);
    f.connect(g);
    g.connect(master);
    if (tremolo > 0) {
      const lfo = ctx.createOscillator();
      const lg = ctx.createGain();
      lfo.frequency.value = tremolo;
      lg.gain.value = gain * 0.5;
      lfo.connect(lg);
      lg.connect(g.gain);
      lfo.start(t0);
      lfo.stop(t0 + dur + 0.02);
    }
    src.start(t0);
    src.stop(t0 + dur + 0.02);
  }
  var recipes = {
    "bead-place"(t) {
      const f = rand(380, 520);
      noiseHit(t, { dur: 0.03, gain: 0.22, type: "highpass", freq: 3e3, attack: 2e-3 });
      tone(t, { freq: f, type: "triangle", dur: 0.06, gain: 0.3, glideTo: f * 0.7 });
    },
    "bead-remove"(t) {
      tone(t, { freq: rand(200, 260), type: "sine", dur: 0.07, gain: 0.24, glideTo: 150 });
    },
    pour(t) {
      for (let i = 0; i < 7; i += 1) {
        const tt = t + i * rand(0.018, 0.05);
        const f = rand(360, 560);
        noiseHit(tt, { dur: 0.025, gain: 0.2, type: "highpass", freq: 3200, attack: 2e-3 });
        tone(tt, { freq: f, type: "triangle", dur: 0.05, gain: 0.24, glideTo: f * 0.7 });
      }
    },
    // Tray shake / sorting
    sift(t) {
      noiseHit(t, { dur: 0.34, gain: 0.24, type: "bandpass", freq: 3200, q: 0.7, attack: 0.03, tremolo: 18 });
    },
    // Scoop beads onto needle / tweezers / from the box
    grab(t) {
      noiseHit(t, { dur: 0.13, gain: 0.22, type: "bandpass", freq: 1600, q: 0.6, attack: 0.02, glideTo: 2600 });
      tone(t + 0.02, { freq: rand(300, 380), type: "triangle", dur: 0.05, gain: 0.22, glideTo: 220 });
    },
    pick(t) {
      noiseHit(t, { dur: 0.03, gain: 0.26, type: "highpass", freq: 4200, attack: 2e-3 });
    },
    drop(t) {
      tone(t, { freq: 300, type: "sine", dur: 0.06, gain: 0.26, glideTo: 180 });
    },
    // A loose bead bouncing onto the floor
    "floor-drop"(t) {
      tone(t, { freq: 360, type: "sine", dur: 0.07, gain: 0.26, glideTo: 200 });
      tone(t + 0.09, { freq: 280, type: "sine", dur: 0.06, gain: 0.16, glideTo: 170 });
      noiseHit(t, { dur: 0.03, gain: 0.14, type: "highpass", freq: 3500, attack: 2e-3 });
    },
    // Empty the tray
    dump(t) {
      for (let i = 0; i < 9; i += 1) {
        const tt = t + i * rand(0.012, 0.03);
        noiseHit(tt, { dur: 0.03, gain: 0.18, type: "bandpass", freq: 2600 - i * 140, q: 0.6, attack: 2e-3 });
      }
    },
    iron(t) {
      noiseHit(t, { dur: 0.26, gain: 0.24, type: "lowpass", freq: 1100, q: 0.5, attack: 0.06 });
      noiseHit(t, { dur: 0.2, gain: 0.12, type: "bandpass", freq: 3200, q: 0.8, attack: 0.05 });
    },
    // Flip the board over for a second pass
    flip(t) {
      noiseHit(t, { dur: 0.2, gain: 0.22, type: "lowpass", freq: 700, q: 0.4, attack: 0.04, glideTo: 1800 });
    },
    cool(t) {
      noiseHit(t, { dur: 0.5, gain: 0.14, type: "highpass", freq: 5e3, attack: 0.08 });
      tone(t, { freq: 520, type: "sine", dur: 0.5, gain: 0.16, glideTo: 320, attack: 0.05 });
    },
    // Press the board flat while cooling — a crisp, firm press (bright contact + a short settle), not a muffled thud.
    press(t) {
      noiseHit(t, { dur: 0.04, gain: 0.18, type: "highpass", freq: 4200, attack: 2e-3 });
      noiseHit(t, { dur: 0.24, gain: 0.15, type: "bandpass", freq: 1900, q: 0.6, attack: 0.04, glideTo: 1100 });
      tone(t + 0.02, { freq: 240, type: "triangle", dur: 0.16, gain: 0.22, glideTo: 150, attack: 0.015 });
      tone(t + 0.13, { freq: 430, type: "triangle", dur: 0.1, gain: 0.1, glideTo: 300, attack: 0.012 });
    },
    finish(t) {
      [659.25, 783.99, 1046.5].forEach((nf, i) => (
        // E5 - G5 - C6, gentle arpeggio
        tone(t + i * 0.12, { freq: nf, type: "sine", dur: 0.5, gain: 0.2, attack: 0.01 })
      ));
    },
    // Achievement unlocked — brighter & sparklier than finish
    achievement(t) {
      [1046.5, 1318.5, 1567.98].forEach((nf, i) => {
        tone(t + i * 0.1, { freq: nf, type: "sine", dur: 0.45, gain: 0.18, attack: 8e-3 });
        tone(t + i * 0.1, { freq: nf * 2, type: "sine", dur: 0.3, gain: 0.05, attack: 8e-3 });
      });
    },
    // Desk-lamp switch
    lamp(t) {
      noiseHit(t, { dur: 0.02, gain: 0.18, type: "highpass", freq: 5e3, attack: 1e-3 });
      tone(t + 0.01, { freq: 180, type: "square", dur: 0.04, gain: 0.12, glideTo: 120 });
    },
    // Switching pages / app modes — soft swish (kept gentle, just no longer inaudible)
    nav(t) {
      noiseHit(t, { dur: 0.12, gain: 0.13, type: "bandpass", freq: 1200, q: 0.5, attack: 0.03, glideTo: 2400 });
    },
    // Dialog/modal opening — soft rising swell
    "modal-open"(t) {
      noiseHit(t, { dur: 0.16, gain: 0.15, type: "lowpass", freq: 600, q: 0.4, attack: 0.03, glideTo: 1800 });
      tone(t + 0.02, { freq: 360, type: "sine", dur: 0.1, gain: 0.15, glideTo: 520, attack: 0.02 });
    },
    // Dialog/modal closing — soft falling
    "modal-close"(t) {
      noiseHit(t, { dur: 0.14, gain: 0.14, type: "lowpass", freq: 1600, q: 0.4, attack: 0.02, glideTo: 500 });
      tone(t + 0.02, { freq: 460, type: "sine", dur: 0.1, gain: 0.14, glideTo: 300, attack: 0.02 });
    },
    // Inspection found issues — neutral scan tick (not punishing)
    inspect(t) {
      noiseHit(t, { dur: 0.05, gain: 0.18, type: "bandpass", freq: 2e3, q: 1, attack: 4e-3 });
      tone(t + 0.06, { freq: 440, type: "sine", dur: 0.08, gain: 0.2, glideTo: 360 });
    },
    // Inspection perfect / positive confirmation — gentle rising two-note
    success(t) {
      tone(t, { freq: 659.25, type: "sine", dur: 0.18, gain: 0.18, attack: 0.01 });
      tone(t + 0.1, { freq: 987.77, type: "sine", dur: 0.32, gain: 0.18, attack: 0.01 });
    },
    spill(t) {
      tone(t, { freq: 150, type: "sine", dur: 0.16, gain: 0.28, glideTo: 70 });
      noiseHit(t, { dur: 0.12, gain: 0.13, type: "lowpass", freq: 500 });
    },
    error(t) {
      tone(t, { freq: 320, type: "sine", dur: 0.1, gain: 0.2, glideTo: 240 });
      tone(t + 0.09, { freq: 240, type: "sine", dur: 0.12, gain: 0.2, glideTo: 180 });
    },
    "ui-tap"(t) {
      tone(t, { freq: 520, type: "sine", dur: 0.05, gain: 0.15, glideTo: 380 });
    }
  };
  var haptics = {
    "bead-place": 5,
    "bead-remove": 4,
    pour: [4, 26, 4, 26, 4],
    sift: [8, 22, 8],
    grab: 5,
    pick: 4,
    drop: 6,
    "floor-drop": [3, 20, 3],
    dump: [4, 18, 4, 18, 4],
    iron: 6,
    flip: 8,
    press: [10, 40, 8],
    finish: [12, 40, 12, 40, 18],
    achievement: [10, 30, 10, 30, 12],
    lamp: 6,
    nav: 0,
    "modal-open": 4,
    "modal-close": 3,
    inspect: [6, 24, 6],
    success: [10, 40, 14],
    spill: [15, 30, 15],
    error: [15, 30, 15],
    "ui-tap": 4
  };
  var throttleMs = { iron: 90, sift: 200, nav: 140, grab: 40, "bead-place": 18, press: 120 };
  var lastAt = {};
  function playSfx(name) {
    if (!sfxEnabled) return;
    const recipe = recipes[name];
    if (!recipe) return;
    const c = ensureCtx();
    if (!c) return;
    if (c.state === "suspended") c.resume();
    const now = performance.now();
    const min = throttleMs[name];
    if (min && lastAt[name] && now - lastAt[name] < min) return;
    lastAt[name] = now;
    try {
      recipe(c.currentTime + 1e-3);
    } catch (e) {
    }
  }
  function vibrate(pattern) {
    if (!hapticEnabled || !pattern) return;
    if (typeof navigator === "undefined" || typeof navigator.vibrate !== "function") return;
    try {
      navigator.vibrate(pattern);
    } catch (e) {
    }
  }
  function feedback(name) {
    playSfx(name);
    vibrate(haptics[name]);
  }

  // src/achievements.js
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
  function unlockAchievement(name, onToast) {
    if (hasAchievement(name)) return false;
    state.achievements.unshift(name);
    state.achievements = [...new Set(state.achievements)].slice(0, 24);
    writeAchievements();
    onToast?.(name);
    return true;
  }

  // src/theme.js
  function currentBackgroundTheme() {
    return backgroundThemes[state.bgTheme] || backgroundThemes.mist;
  }
  function currentToolStyle() {
    return toolStyles[state.toolStyle] || toolStyles.candy;
  }

  // src/pattern.js
  var transparentWhiteCode = workshopCodeForMard("H1");
  var opaqueWhiteCode = workshopCodeForMard("H2");
  var builtInTransparentWhitePatternIds = /* @__PURE__ */ new Set(["ghost", "milk-tea", "sweet-heart"]);
  function targetAt(x, y) {
    const pattern = state.selectedPattern;
    const row = getEffectiveTargetRows(pattern)[y];
    if (!row) return null;
    const code = row[x] || ".";
    return code === "." ? null : code;
  }
  function boardCols(pattern = state.selectedPattern) {
    return pattern?.width || pattern?.size || BOARD_SIZE;
  }
  function boardRows(pattern = state.selectedPattern) {
    return pattern?.height || pattern?.size || BOARD_SIZE;
  }
  function indexFor(x, y) {
    return y * boardCols() + x;
  }
  function isActiveTileCell(x, y, pattern = state.selectedPattern) {
    const tiles = pattern?.tiles;
    if (!tiles || tiles.length === 0) return true;
    const originX = pattern.tileOriginX ?? 0;
    const originY = pattern.tileOriginY ?? 0;
    const tx = Math.floor(x / BOARD_SIZE) + originX;
    const ty = Math.floor(y / BOARD_SIZE) + originY;
    const key = `${tx},${ty}`;
    return Array.isArray(tiles) ? tiles.includes(key) : tiles.has(key);
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
  function invalidatePatternDataCaches(pattern = state.selectedPattern) {
    if (!pattern) return;
    delete pattern.__gridFingerprint;
    delete pattern.__sourceAnalysis;
    invalidateEffectiveMap(pattern);
  }
  function isCustomFromImagePattern(pattern = state.selectedPattern) {
    return baseIdFor(pattern).startsWith("custom-") && Boolean(pattern.sourceImageDataUrl);
  }
  function getEffectiveTargetRows(pattern = state.selectedPattern) {
    return getEffectivePatternResult(pattern).rows;
  }
  function getEffectivePatternResult(pattern = state.selectedPattern) {
    const id = baseIdFor(pattern);
    const fingerprint = patternFingerprint(pattern);
    const sourceColors = getSourcePatternColors(pattern);
    const map = getPatternColorMap(pattern);
    const mapSignature = sourceColors.map((code) => `${code}:${map[code] || code}`).join("|");
    const cacheKey = `${fingerprint}:${mapSignature}`;
    const cached = state.patternEffectiveMapCache[id];
    if (cached?.key === cacheKey) return cached;
    const baseMap = {};
    const activeCodes = new Set(allColorCodes());
    sourceColors.forEach((code) => {
      const mapped = map[code];
      baseMap[code] = mapped && activeCodes.has(mapped) ? mapped : code;
    });
    const cols = boardCols(pattern);
    const rowsCount = boardRows(pattern);
    const sourceRows = pattern.rows || [];
    const grid = Array(cols * rowsCount).fill(".");
    for (let y = 0; y < rowsCount; y += 1) {
      for (let x = 0; x < cols; x += 1) {
        const sourceCode = sourceRows[y]?.[x] || ".";
        const index2 = y * cols + x;
        grid[index2] = sourceCode === "." ? "." : baseMap[sourceCode] || sourceCode;
      }
    }
    const rows = [];
    for (let y = 0; y < rowsCount; y += 1) {
      rows.push(grid.slice(y * cols, y * cols + cols).map((code) => code || ".").join(""));
    }
    const result = { key: cacheKey, map: { ...baseMap }, rows };
    state.patternEffectiveMapCache[id] = result;
    return result;
  }
  function getTargetCounts(pattern = state.selectedPattern) {
    return getPatternAnalysis(pattern).counts;
  }
  function getTargetTotal(pattern = state.selectedPattern) {
    return getPatternAnalysis(pattern).total;
  }
  var colorCodesCache = null;
  function allColorCodes() {
    if (colorCodesCache) return colorCodesCache;
    const preset = palettePresetMardCodes[221];
    colorCodesCache = [...new Set(preset.map(workshopCodeForMard).filter((code) => palette[code]))].sort((a, b) => (beadIds[a] || a).localeCompare(beadIds[b] || b, "zh-Hans-CN", { numeric: true }));
    return colorCodesCache;
  }
  function beadLabel(code) {
    return beadIds[code] || code;
  }
  function normalizePatternColorMapForActivePalette(pattern = state.selectedPattern) {
    const patternId = baseIdFor(pattern);
    const activeCodes = new Set(allColorCodes());
    const activeCodesArr = [...activeCodes];
    const previousMap = state.patternColorMaps[patternId] || {};
    const normalizedMap = {};
    const lockOpaqueWhite = !patternId.startsWith("custom-") && !builtInTransparentWhitePatternIds.has(patternId);
    getSourcePatternColors(pattern).forEach((code) => {
      const mapped = previousMap[code];
      if (lockOpaqueWhite && code === opaqueWhiteCode) {
        normalizedMap[code] = opaqueWhiteCode;
        return;
      }
      if (lockOpaqueWhite && code === transparentWhiteCode) {
        normalizedMap[code] = opaqueWhiteCode;
        return;
      }
      if (mapped && activeCodes.has(mapped)) {
        normalizedMap[code] = mapped;
      } else if (activeCodes.has(code)) {
        normalizedMap[code] = code;
      } else {
        normalizedMap[code] = nearestCodeFromSet(beadOklab(code), activeCodesArr);
      }
    });
    state.patternColorMaps[patternId] = normalizedMap;
    if (baseIdFor(state.selectedPattern) === patternId) state.patternColorMap = normalizedMap;
    return normalizedMap;
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
    const colors = Object.keys(counts).sort((a, b) => (beadIds[a] || a).localeCompare(beadIds[b] || b, "zh-Hans-CN", { numeric: true }));
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
    const colors = Object.keys(counts).sort((a, b) => (beadIds[a] || a).localeCompare(beadIds[b] || b, "zh-Hans-CN", { numeric: true }));
    const total = Object.values(counts).reduce((sum, count) => sum + count, 0);
    pattern.__sourceAnalysis = { key: fingerprint, counts, colors, total };
    return pattern.__sourceAnalysis;
  }
  var placedCountsCacheVersion = -1;
  var placedCountsCache = {};
  function invalidatePlacedCounts() {
    state.placedVersion += 1;
  }
  function getPlacedCounts() {
    if (placedCountsCacheVersion === state.placedVersion) return placedCountsCache;
    const counts = {};
    state.placed.forEach((code) => {
      if (!code) return;
      counts[code] = (counts[code] || 0) + 1;
    });
    placedCountsCache = counts;
    placedCountsCacheVersion = state.placedVersion;
    return placedCountsCache;
  }
  function placedCount() {
    return Object.values(getPlacedCounts()).reduce((sum, count) => sum + count, 0);
  }
  function normalizePatternSize() {
    return BOARD_SIZE;
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
    pattern.__gridFingerprint = `${boardCols(pattern)}x${boardRows(pattern)}:${(hash >>> 0).toString(36)}`;
    return pattern.__gridFingerprint;
  }
  function normalizeCraft(craft) {
    if (craft === "\u51B0\u7BB1\u8D34") return "\u539F\u7248";
    return craftOptions.includes(craft) ? craft : "\u94A5\u5319\u6263";
  }
  function resizePattern(pattern, targetSize) {
    const width = boardCols(pattern);
    const height = boardRows(pattern);
    if (width > BOARD_SIZE || height > BOARD_SIZE || width !== height) {
      return {
        ...pattern,
        sourceId: baseIdFor(pattern),
        size: Math.max(width, height),
        width,
        height,
        sourceRows: pattern.sourceRows || pattern.rows,
        sourceSize: pattern.sourceSize || Math.max(width, height)
      };
    }
    const size = normalizePatternSize(targetSize);
    const sourceRows = pattern.sourceRows || pattern.rows;
    const sourceSize = pattern.sourceSize || pattern.size;
    if (sourceSize === size) {
      return {
        ...pattern,
        id: pattern.id,
        sourceId: baseIdFor(pattern),
        sourceSize,
        sourceRows
      };
    }
    const rows = resamplePatternRows(sourceRows, sourceSize, size);
    const resized = {
      ...pattern,
      id: `${baseIdFor(pattern)}-${size}`,
      sourceId: baseIdFor(pattern),
      sourceSize,
      sourceRows,
      size,
      width: size,
      height: size,
      rows,
      note: pattern.note || ""
    };
    delete resized.__gridFingerprint;
    delete resized.__sourceAnalysis;
    return resized;
  }
  function findBasePattern(pattern = state.selectedPattern) {
    const id = baseIdFor(pattern);
    return patterns.find((item) => item.id === id) || pattern;
  }

  // src/pattern-library.js
  var defaultIds = new Set(patternSeeds.map((seed) => seed.id));
  var store = { imported: [], stars: {}, hidden: {}, renames: {} };
  function readStore() {
    try {
      const parsed = JSON.parse(localStorage.getItem(patternLibraryKey) || "null");
      if (!parsed || typeof parsed !== "object") return { imported: [], stars: {}, hidden: {}, renames: {} };
      return {
        imported: Array.isArray(parsed.imported) ? parsed.imported : [],
        stars: parsed.stars && typeof parsed.stars === "object" ? parsed.stars : {},
        hidden: parsed.hidden && typeof parsed.hidden === "object" ? parsed.hidden : {},
        renames: parsed.renames && typeof parsed.renames === "object" ? parsed.renames : {}
      };
    } catch (error) {
      return { imported: [], stars: {}, hidden: {}, renames: {} };
    }
  }
  function isDefaultPatternId(id) {
    return defaultIds.has(id);
  }
  function toStorable(pattern) {
    const {
      sourceImageDataUrl,
      conversionStats,
      __gridFingerprint,
      __effectiveMap,
      ...rest
    } = pattern;
    return { ...rest };
  }
  function poolIndexOf(id) {
    return patterns.findIndex((p) => p.id === id);
  }
  function upsertPoolPattern(pattern) {
    const at = poolIndexOf(pattern.id);
    if (at >= 0) patterns[at] = pattern;
    else patterns.push(pattern);
    return pattern;
  }
  function removeFromPool(id) {
    const at = poolIndexOf(id);
    if (at >= 0) patterns.splice(at, 1);
  }
  function syncPool() {
    for (let i = patterns.length - 1; i >= 0; i -= 1) {
      const p = patterns[i];
      if (defaultIds.has(p.id) && store.hidden[p.id]) patterns.splice(i, 1);
    }
    patternSeeds.forEach((seed) => {
      if (store.hidden[seed.id]) return;
      if (poolIndexOf(seed.id) < 0) {
        const original = defaultPoolSnapshot.get(seed.id);
        if (original) patterns.push({ ...original });
      }
    });
    store.imported.forEach((p) => upsertPoolPattern({ ...p }));
    patterns.forEach((p) => {
      if (store.renames[p.id]) p.name = store.renames[p.id];
    });
  }
  var defaultPoolSnapshot = new Map(
    patterns.filter((p) => defaultIds.has(p.id)).map((p) => [p.id, { ...p }])
  );
  function loadLibrary() {
    store = readStore();
    syncPool();
    return store;
  }
  function persist2() {
    try {
      localStorage.setItem(patternLibraryKey, JSON.stringify({
        imported: store.imported,
        stars: store.stars,
        hidden: store.hidden,
        renames: store.renames
      }));
    } catch (error) {
      if (typeof console !== "undefined") console.warn("[pattern-library] persist failed", error);
    }
  }
  function effectiveName(pattern) {
    return store.renames[pattern.id] || pattern.name || "\u672A\u547D\u540D";
  }
  function isStarred(id) {
    return Boolean(store.stars[id]);
  }
  var starSeq = 0;
  function nextStarOrder() {
    starSeq = Math.max(Date.now(), starSeq + 1);
    return starSeq;
  }
  function starOrder(id) {
    return Number(store.stars[id]) || 0;
  }
  function getLibraryView() {
    const defaults = patterns.filter((p) => defaultIds.has(p.id) && !store.hidden[p.id]);
    const items = [...defaults, ...store.imported].map((p) => ({
      ...p,
      starred: isStarred(p.id),
      displayName: effectiveName(p)
    }));
    items.sort((a, b) => {
      if (a.starred !== b.starred) return a.starred ? -1 : 1;
      if (a.starred && b.starred) {
        const byRecency = starOrder(b.id) - starOrder(a.id);
        if (byRecency) return byRecency;
      }
      return a.displayName.localeCompare(b.displayName, "zh-CN");
    });
    return items;
  }
  function addToLibrary(pattern) {
    const storable = toStorable(pattern);
    if (!storable.name) storable.name = "\u672A\u547D\u540D";
    const existing = store.imported.findIndex((p) => p.id === storable.id);
    if (existing >= 0) store.imported[existing] = storable;
    else store.imported.push(storable);
    upsertPoolPattern({ ...pattern });
    persist2();
    return storable;
  }
  function removeFromLibrary(id) {
    if (defaultIds.has(id)) {
      store.hidden[id] = true;
    } else {
      store.imported = store.imported.filter((p) => p.id !== id);
    }
    delete store.stars[id];
    delete store.renames[id];
    removeFromPool(id);
    persist2();
  }
  function toggleStar(id) {
    if (store.stars[id]) delete store.stars[id];
    else store.stars[id] = nextStarOrder();
    persist2();
    return Boolean(store.stars[id]);
  }
  function renameInLibrary(id, rawName) {
    const name = String(rawName || "").trim().slice(0, 20);
    if (!name) return false;
    store.renames[id] = name;
    const imported = store.imported.find((p) => p.id === id);
    if (imported) imported.name = name;
    const at = poolIndexOf(id);
    if (at >= 0) patterns[at].name = name;
    persist2();
    return true;
  }
  function restoreDefaults() {
    store.hidden = {};
    syncPool();
    persist2();
  }
  function hasHiddenDefaults() {
    return Object.keys(store.hidden).length > 0;
  }
  function newLibraryId(prefix = "custom") {
    return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
  }

  // src/utils.js
  function escapeHtml(value) {
    return String(value ?? "").replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#39;");
  }
  function prefersReducedMotion() {
    return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
  }
  function beadSettleScale(elapsed, duration = 180, reducedMotion = false) {
    if (reducedMotion) return 1;
    const safeDuration = Math.max(1, Number(duration) || 180);
    const t = Math.max(0, Math.min(1, (Number(elapsed) || 0) / safeDuration));
    const eased = 1 - Math.pow(1 - t, 4);
    return 0.72 + (1 - 0.72) * eased;
  }
  function stableHash(text) {
    const source = String(text || "");
    let hash = 2166136261 >>> 0;
    for (let i = 0; i < source.length; i += 1) {
      hash ^= source.charCodeAt(i);
      hash = Math.imul(hash, 16777619);
    }
    return hash >>> 0;
  }
  function pickWeightedText(entries, fallback = "", seedText = "") {
    if (!Array.isArray(entries) || !entries.length) return fallback;
    const normalized = entries.map((entry) => ({ text: String(entry?.text || ""), weight: Number(entry?.weight) > 0 ? Number(entry.weight) : 0 })).filter((entry) => entry.text && entry.weight > 0);
    if (!normalized.length) return fallback;
    const total = normalized.reduce((sum, entry) => sum + entry.weight, 0);
    const ratio = (stableHash(seedText) + 0.5) / 4294967296;
    let cursor = ratio * total;
    for (let i = 0; i < normalized.length; i += 1) {
      cursor -= normalized[i].weight;
      if (cursor <= 0) return normalized[i].text;
    }
    return normalized[normalized.length - 1].text || fallback;
  }
  var sharedNotes = [
    { text: "\u8FD9\u5F20\u56FE\u53EF\u4EE5\u76F4\u63A5\u5F00\u62FC", weight: 30 },
    { text: "\u4ECA\u5929\u5C31\u505A\u8FD9\u5F20\u5427", weight: 24 },
    { text: "\u770B\u7740\u5C31\u60F3\u5F00\u5DE5", weight: 18 },
    { text: "\u5148\u6536\u7740\uFF0C\u665A\u70B9\u62FC", weight: 14 },
    { text: "\u914D\u8272\u770B\u7740\u5F88\u987A\u773C", weight: 10 },
    { text: "\u8FD9\u5F20\u6709\u70B9\u4E0A\u5934", weight: 4 }
  ];
  var customPatternNotePool = {
    draw: [
      { text: "\u624B\u7ED8\u5B8C\u6210\uFF0C\u51C6\u5907\u5F00\u62FC", weight: 40 },
      { text: "\u81EA\u5DF1\u753B\u7684\uFF0C\u8D8A\u770B\u8D8A\u987A\u773C", weight: 35 },
      { text: "\u521A\u753B\u5B8C\uFF0C\u624B\u611F\u6B63\u70ED", weight: 25 },
      ...sharedNotes
    ],
    image: [
      { text: "\u56FE\u7247\u8F6C\u597D\u4E86\uFF0C\u76F4\u63A5\u5F00\u62FC", weight: 45 },
      { text: "\u8FD9\u5F20\u8F6C\u51FA\u6765\u8FD8\u4E0D\u9519", weight: 35 },
      { text: "\u914D\u8272\u5DF2\u7ECF\u6574\u7406\u597D", weight: 20 },
      ...sharedNotes
    ],
    imported: [
      { text: "\u5206\u4EAB\u7801\u5BFC\u5165\u6210\u529F", weight: 45 },
      { text: "\u65B0\u56FE\u7EB8\u5DF2\u5C31\u4F4D", weight: 35 },
      { text: "\u8FD9\u5F20\u5148\u653E\u5230\u5F85\u62FC", weight: 20 },
      ...sharedNotes
    ]
  };
  function pickCustomPatternNote(kind = "generic", size = 0, seedText = "") {
    const pool = customPatternNotePool[kind] || [...customPatternNotePool.draw, ...customPatternNotePool.image, ...customPatternNotePool.imported];
    const fallbackSize = Number(size);
    const fallback = Number.isFinite(fallbackSize) && fallbackSize > 0 ? `\u81EA\u5B9A\u4E49\u56FE\u7EB8 ${fallbackSize}x${fallbackSize}` : "\u81EA\u5B9A\u4E49\u56FE\u7EB8";
    return pickWeightedText(pool, fallback, seedText);
  }

  // src/build-timer.js
  var accumMs = 0;
  var runningSince = null;
  function resetBuildTimer() {
    accumMs = 0;
    runningSince = null;
  }
  function startBuildTimer(now = performance.now()) {
    if (runningSince === null) runningSince = now;
  }
  function pauseBuildTimer(now = performance.now()) {
    if (runningSince !== null) {
      accumMs += Math.max(0, now - runningSince);
      runningSince = null;
    }
  }
  function buildElapsedMs(now = performance.now()) {
    return accumMs + (runningSince !== null ? Math.max(0, now - runningSince) : 0);
  }
  function setBuildElapsedMs(ms) {
    accumMs = Number.isFinite(ms) && ms > 0 ? ms : 0;
    runningSince = null;
  }
  function formatBuildTime(ms) {
    const totalSec = Math.max(0, Math.round((Number(ms) || 0) / 1e3));
    if (totalSec < 60) return `${totalSec}\u79D2`;
    const totalMin = Math.round(totalSec / 60);
    if (totalMin < 60) return `${totalMin}\u5206`;
    const h = Math.floor(totalMin / 60);
    const m = totalMin % 60;
    return m ? `${h}\u65F6${m}\u5206` : `${h}\u65F6`;
  }

  // src/sketch-style.js
  var SKETCH_INK = "#26242b";
  var SKETCH_INK_SOFT = "rgba(38, 36, 43, 0.55)";
  var SKETCH_PAPER = "#ffffff";
  var SKETCH_BW = 2;
  var SKETCH_BW_CTL = 1.5;
  var SKETCH_SHADOW = 3;
  var SKETCH_SHADOW_SM = 2;
  function sketchRect(ctx2, x, y, w, h, {
    fill = SKETCH_PAPER,
    bw = SKETCH_BW,
    shadow = SKETCH_SHADOW,
    ink = SKETCH_INK,
    shadowColor = SKETCH_INK_SOFT
  } = {}) {
    if (shadow > 0) {
      ctx2.fillStyle = shadowColor;
      ctx2.fillRect(x + shadow, y + shadow, w, h);
    }
    if (fill) {
      ctx2.fillStyle = fill;
      ctx2.fillRect(x, y, w, h);
    }
    if (bw > 0) {
      ctx2.strokeStyle = ink;
      ctx2.lineWidth = bw;
      ctx2.strokeRect(x + bw / 2, y + bw / 2, w - bw, h - bw);
    }
  }

  // src/board-skin.js
  function traceBoardPath(ctx2, layout, radius = 6) {
    const boardW = layout.boardW || layout.boardSize;
    const boardH = layout.boardH || layout.boardSize;
    const r = Math.min(radius, boardW / 2, boardH / 2);
    const { boardX, boardY } = layout;
    ctx2.beginPath();
    ctx2.moveTo(boardX + r, boardY);
    ctx2.lineTo(boardX + boardW - r, boardY);
    ctx2.quadraticCurveTo(boardX + boardW, boardY, boardX + boardW, boardY + r);
    ctx2.lineTo(boardX + boardW, boardY + boardH - r);
    ctx2.quadraticCurveTo(boardX + boardW, boardY + boardH, boardX + boardW - r, boardY + boardH);
    ctx2.lineTo(boardX + r, boardY + boardH);
    ctx2.quadraticCurveTo(boardX, boardY + boardH, boardX, boardY + boardH - r);
    ctx2.lineTo(boardX, boardY + r);
    ctx2.quadraticCurveTo(boardX, boardY, boardX + r, boardY);
  }
  function drawBoardGuides(ctx2, layout, cols, rows, scale = 1) {
    const { boardX, boardY, cell } = layout;
    const boardW = layout.boardW || layout.boardSize;
    const boardH = layout.boardH || layout.boardSize;
    ctx2.save();
    const stroke = (n, vertical) => {
      const major = n % 10 === 0;
      ctx2.strokeStyle = major ? "rgba(70, 84, 96, 0.5)" : "rgba(70, 84, 96, 0.26)";
      ctx2.lineWidth = major ? Math.max(1.2 / scale, cell * 0.07) : 1 / scale;
      ctx2.setLineDash(major ? [] : [cell * 0.32, cell * 0.32]);
      ctx2.beginPath();
      if (vertical) {
        const px = boardX + n * cell;
        ctx2.moveTo(px, boardY);
        ctx2.lineTo(px, boardY + boardH);
      } else {
        const py = boardY + n * cell;
        ctx2.moveTo(boardX, py);
        ctx2.lineTo(boardX + boardW, py);
      }
      ctx2.stroke();
    };
    for (let x = 5; x < cols; x += 5) stroke(x, true);
    for (let y = 5; y < rows; y += 5) stroke(y, false);
    ctx2.setLineDash([]);
    ctx2.restore();
  }
  function drawBoardSkin(ctx2, layout, options = {}) {
    const {
      cols,
      rows,
      brand = "#57b8a7",
      shadow = true,
      guides = true,
      frameInset = 14,
      blockOffsetX = 0,
      blockOffsetY = 0
    } = options;
    const { boardX, boardY, cell } = layout;
    const boardW = layout.boardW || layout.boardSize;
    const boardH = layout.boardH || layout.boardSize;
    ctx2.save();
    const compactSkin = frameInset < 10;
    const bw = compactSkin ? 1 : SKETCH_BW;
    const shadowOff = shadow ? compactSkin ? SKETCH_SHADOW_SM : SKETCH_SHADOW : 0;
    sketchRect(
      ctx2,
      boardX - frameInset,
      boardY - frameInset,
      boardW + frameInset * 2,
      boardH + frameInset * 2,
      { fill: "#f2f5f7", bw, shadow: shadowOff }
    );
    ctx2.fillStyle = "#fbfcfd";
    ctx2.fillRect(boardX, boardY, boardW, boardH);
    ctx2.strokeStyle = "rgba(38, 36, 43, 0.22)";
    ctx2.lineWidth = 1;
    ctx2.strokeRect(boardX + 0.5, boardY + 0.5, boardW - 1, boardH - 1);
    ctx2.save();
    traceBoardPath(ctx2, layout, 0);
    ctx2.clip();
    const tintLight = mixColor("#ffffff", brand, 0.06);
    const tintDark = mixColor("#ffffff", brand, 0.15);
    for (let by = 0; by * 10 < rows; by += 1) {
      for (let bx = 0; bx * 10 < cols; bx += 1) {
        ctx2.fillStyle = (blockOffsetX + bx + blockOffsetY + by) % 2 ? tintDark : tintLight;
        const px = boardX + bx * 10 * cell;
        const py = boardY + by * 10 * cell;
        const pw = Math.min(10, cols - bx * 10) * cell;
        const ph = Math.min(10, rows - by * 10) * cell;
        ctx2.fillRect(px, py, pw, ph);
      }
    }
    ctx2.restore();
    if (guides) drawBoardGuides(ctx2, layout, cols, rows);
    ctx2.restore();
  }
  function pixelPatternPreviewLayout(width, height, cols, rows, options = {}) {
    const minSide = Math.max(1, Math.min(width, height));
    const compact = options.compact ?? minSide < 120;
    const frameInset = options.frameInset ?? (compact ? Math.max(2, Math.min(5, minSide * 0.055)) : Math.max(7, Math.min(14, minSide * 0.035)));
    const padding = options.padding ?? (compact ? Math.max(1, minSide * 0.025) : Math.max(8, minSide * 0.025));
    const availableW = Math.max(1, width - (padding + frameInset) * 2);
    const availableH = Math.max(1, height - (padding + frameInset) * 2);
    const cell = Math.max(0.01, Math.min(availableW / cols, availableH / rows));
    const boardW = cell * cols;
    const boardH = cell * rows;
    return {
      boardX: (width - boardW) / 2,
      boardY: (height - boardH) / 2,
      boardW,
      boardH,
      boardSize: Math.max(boardW, boardH),
      cell,
      frameInset,
      compact
    };
  }
  function drawPixelPatternPreview(ctx2, options = {}) {
    const {
      width,
      height,
      cols,
      rows,
      pixels = [],
      colors = {},
      brand = "#57b8a7",
      table = ["#eef2f4", "#e4eceb", "#d7e2e0"]
    } = options;
    const layout = pixelPatternPreviewLayout(width, height, cols, rows, options);
    const showGuides = options.guides ?? layout.cell >= 4;
    const showCellGrid = options.cellGrid ?? layout.cell >= 2.5;
    const shadow = options.shadow ?? !layout.compact;
    ctx2.save();
    ctx2.fillStyle = table[1] || table[0];
    ctx2.fillRect(0, 0, width, height);
    drawBoardSkin(ctx2, layout, {
      cols,
      rows,
      brand,
      shadow,
      guides: false,
      frameInset: layout.frameInset
    });
    ctx2.save();
    traceBoardPath(ctx2, layout, 0);
    ctx2.clip();
    for (let y = 0; y < rows; y += 1) {
      const row = pixels[y] || "";
      for (let x = 0; x < cols; x += 1) {
        const code = row[x] || ".";
        if (code === ".") continue;
        const px = layout.boardX + x * layout.cell;
        const py = layout.boardY + y * layout.cell;
        ctx2.fillStyle = colors[code] || "#9aa4b3";
        ctx2.fillRect(px, py, layout.cell, layout.cell);
      }
    }
    if (showCellGrid) {
      ctx2.strokeStyle = "rgba(70, 84, 96, 0.13)";
      ctx2.lineWidth = Math.min(1, Math.max(0.5, layout.cell * 0.06));
      for (let x = 1; x < cols; x += 1) {
        const px = layout.boardX + x * layout.cell;
        ctx2.beginPath();
        ctx2.moveTo(px, layout.boardY);
        ctx2.lineTo(px, layout.boardY + layout.boardH);
        ctx2.stroke();
      }
      for (let y = 1; y < rows; y += 1) {
        const py = layout.boardY + y * layout.cell;
        ctx2.beginPath();
        ctx2.moveTo(layout.boardX, py);
        ctx2.lineTo(layout.boardX + layout.boardW, py);
        ctx2.stroke();
      }
    }
    ctx2.restore();
    if (showGuides) drawBoardGuides(ctx2, layout, cols, rows);
    ctx2.restore();
    return layout;
  }

  // src/board-layout.js
  function tileKey(tx, ty) {
    return `${tx},${ty}`;
  }
  function shouldUseBoardPegCache(scale) {
    return Number.isFinite(scale) && scale <= 1.001;
  }
  function visibleBoardCellRange(layout, view, cols, rows) {
    const scale = Math.max(1e-4, Number(view?.scale) || 1);
    const cx = Number(view?.cx) || 0;
    const cy = Number(view?.cy) || 0;
    const panX = Number(view?.panX) || 0;
    const panY = Number(view?.panY) || 0;
    const cell = Math.max(1e-4, Number(layout?.cell) || 1);
    const boardX = Number(layout?.boardX) || 0;
    const boardY = Number(layout?.boardY) || 0;
    const viewportW = Math.max(0, Number(layout?.w) || 0);
    const viewportH = Math.max(0, Number(layout?.h) || 0);
    const columnCount = Math.max(0, Number.parseInt(cols, 10) || 0);
    const rowCount = Math.max(0, Number.parseInt(rows, 10) || 0);
    const localLeft = (0 - cx - panX) / scale + cx;
    const localRight = (viewportW - cx - panX) / scale + cx;
    const localTop = (0 - cy - panY) / scale + cy;
    const localBottom = (viewportH - cy - panY) / scale + cy;
    const clampIndex = (value, max) => Math.min(max, Math.max(0, value));
    return {
      startCol: clampIndex(Math.floor((localLeft - boardX) / cell), columnCount),
      endCol: clampIndex(Math.ceil((localRight - boardX) / cell), columnCount),
      startRow: clampIndex(Math.floor((localTop - boardY) / cell), rowCount),
      endRow: clampIndex(Math.ceil((localBottom - boardY) / cell), rowCount)
    };
  }
  function fitGridToBoardTiles(rows, sourceWidth, sourceHeight, tileSize, maxDimension) {
    const tile = Number.parseInt(tileSize, 10);
    const max = Number.parseInt(maxDimension, 10);
    const rawWidth = Math.max(1, Number.parseInt(sourceWidth, 10) || 1);
    const rawHeight = Math.max(1, Number.parseInt(sourceHeight, 10) || 1);
    const width = Math.min(max, Math.max(tile, Math.ceil(rawWidth / tile) * tile));
    const height = Math.min(max, Math.max(tile, Math.ceil(rawHeight / tile) * tile));
    const offsetX = Math.floor((width - rawWidth) / 2);
    const offsetY = Math.floor((height - rawHeight) / 2);
    const fittedRows = Array.from({ length: height }, (_, y) => {
      const sourceY = y - offsetY;
      const sourceRow = sourceY >= 0 && sourceY < rawHeight ? String(rows?.[sourceY] || "") : "";
      return Array.from({ length: width }, (_2, x) => {
        const sourceX = x - offsetX;
        return sourceX >= 0 && sourceX < rawWidth ? sourceRow[sourceX] || "." : ".";
      }).join("");
    });
    return { width, height, rows: fittedRows };
  }

  // src/render-primitives.js
  function fusedColor(code, heat) {
    const base = palette[code] || "#999";
    const hotAmount = clamp((heat - 105) / 60, 0, 0.34);
    return heat > 105 ? mixColor(base, "#e8a472", hotAmount) : base;
  }
  function roundedRect(x, y, w, h, r) {
    const ctx2 = scene;
    const radius = Math.min(r, w / 2, h / 2);
    ctx2.beginPath();
    ctx2.moveTo(x + radius, y);
    ctx2.lineTo(x + w - radius, y);
    ctx2.quadraticCurveTo(x + w, y, x + w, y + radius);
    ctx2.lineTo(x + w, y + h - radius);
    ctx2.quadraticCurveTo(x + w, y + h, x + w - radius, y + h);
    ctx2.lineTo(x + radius, y + h);
    ctx2.quadraticCurveTo(x, y + h, x, y + h - radius);
    ctx2.lineTo(x, y + radius);
    ctx2.quadraticCurveTo(x, y, x + radius, y);
  }
  function roundedPath(ctx2, x, y, w, h, r) {
    const radius = Math.min(r, w / 2, h / 2);
    ctx2.beginPath();
    ctx2.moveTo(x + radius, y);
    ctx2.lineTo(x + w - radius, y);
    ctx2.quadraticCurveTo(x + w, y, x + w, y + radius);
    ctx2.lineTo(x + w, y + h - radius);
    ctx2.quadraticCurveTo(x + w, y + h, x + w - radius, y + h);
    ctx2.lineTo(x + radius, y + h);
    ctx2.quadraticCurveTo(x, y + h, x, y + h - radius);
    ctx2.lineTo(x, y + radius);
    ctx2.quadraticCurveTo(x, y, x + radius, y);
  }
  function wrapText(text, x, y, maxWidth, lineHeight) {
    const ctx2 = scene;
    let line = "";
    const chars = [...text];
    chars.forEach((char) => {
      const test = line + char;
      if (ctx2.measureText(test).width > maxWidth && line) {
        ctx2.fillText(line, x, y);
        line = char;
        y += lineHeight;
      } else {
        line = test;
      }
    });
    if (line) ctx2.fillText(line, x, y);
  }
  function fitText(ctx2, text, maxWidth) {
    if (maxWidth <= 0) return "";
    if (ctx2.measureText(text).width <= maxWidth) return text;
    const ellipsis = "\u2026";
    let out = text;
    while (out.length > 0 && ctx2.measureText(`${out}${ellipsis}`).width > maxWidth) {
      out = out.slice(0, -1);
    }
    return out ? `${out}${ellipsis}` : ellipsis;
  }

  // src/render-stats.js
  function placedCount2() {
    return Object.values(getPlacedCounts()).reduce((sum, count) => sum + count, 0);
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
    const cols = boardCols();
    const rows = boardRows();
    for (let y = 0; y < rows; y += 1) {
      for (let x = 0; x < cols; x += 1) {
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
    state.heat.forEach((heat, index2) => {
      if (!state.placed[index2]) return;
      if (heat > HEAT_LEVELS.visible) heated += 1;
      if (heat >= HEAT_LEVELS.bonded) bonded += 1;
      if (heat >= HEAT_LEVELS.idealMin && heat <= HEAT_LEVELS.idealMax) ideal += 1;
      if (heat > HEAT_LEVELS.over) over += 1;
    });
    return {
      total,
      bonded,
      ideal,
      over,
      heated,
      bondedPercent: total ? bonded / total * 100 : 0,
      idealPercent: total ? ideal / total * 100 : 0,
      overPercent: total ? over / total * 100 : 0
    };
  }
  function estimateWarp() {
    const stats = heatStats();
    const under = Math.max(0, stats.total - stats.bonded);
    return clamp(14 + under * 0.08 + stats.over * 0.42, 0, 75);
  }
  function scoreLabel() {
    if (state.sandboxMode) return "\u6C99\u76D2";
    if (state.phase === "choose") return "\u672A\u5F00\u59CB";
    if (state.phase === "finish") return `\u8BC4\u7EA7 ${finalGrade()}`;
    const acc = placementAccuracy();
    if (acc >= 0.92) return "\u51FA\u8272";
    if (acc >= 0.78) return "\u826F\u597D";
    if (acc >= 0.55) return "\u4E00\u822C";
    return "\u9700\u8C03\u6574";
  }
  function finalGrade() {
    if (state.sandboxMode) return "\u6C99\u76D2";
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

  // src/render-export.js
  var POSTER_BW = 4;
  var POSTER_SHADOW = 10;
  var SHARE_SLOGANS = [
    "\u60F3\u62FC\u5C31\u62FC\uFF0C\u8D70\u5230\u54EA\u62FC\u5230\u54EA",
    "\u788E\u7247\u65F6\u95F4\uFF0C\u73A9\u4F1A\u8D5B\u535A\u62FC\u8C46",
    "\u4E00\u90E8\u624B\u673A\uFF0C\u968F\u8EAB\u7684\u62FC\u8C46\u53F0"
  ];
  function sharePalette() {
    const t = currentBackgroundTheme() || backgroundThemes.mist;
    const ink = mixColor(t.brandInk, "#2c2630", 0.5);
    return {
      pageA: t.pageBase,
      pageB: mixColor(t.pageBase, t.brand, 0.12),
      well: "#ffffff",
      wellEdge: t.brandTintStrong,
      chip: "rgba(255, 255, 255, 0.82)",
      chipEdge: t.brandTint,
      glow: t.brandTint,
      accent: t.brand,
      accentDeep: t.brandEdge,
      ink,
      muted: mixColor(ink, "#ffffff", 0.46)
    };
  }
  function drawShareGrid(ctx2, x, y, size) {
    const pattern = state.selectedPattern;
    const cols = boardCols(pattern);
    const rows = boardRows(pattern);
    const cell = size / Math.max(cols, rows);
    const gx = x + (size - cell * cols) / 2;
    const gy = y + (size - cell * rows) / 2;
    const hasPlaced = placedCount2() > 0;
    for (let py = 0; py < rows; py += 1) {
      for (let px = 0; px < cols; px += 1) {
        const index2 = indexFor(px, py);
        const code = hasPlaced ? state.placed[index2] : targetAt(px, py);
        if (!code) continue;
        const cx = gx + px * cell + cell / 2;
        const cy = gy + py * cell + cell / 2;
        const heat = state.heat[index2] || (state.phase === "finish" ? 66 : 0);
        if (heat > 34 || state.phase === "finish") {
          ctx2.fillStyle = fusedColor(code, Math.max(heat, 58));
          roundedPath(ctx2, gx + px * cell + cell * 0.04, gy + py * cell + cell * 0.04, cell * 0.92, cell * 0.92, cell * 0.18);
          ctx2.fill();
        } else {
          drawBead(ctx2, cx, cy, cell * 0.42, code, heat, false, null, index2);
        }
      }
    }
  }
  function drawShareImage(ctx2, w, h, portrait, qrImg = null, variant = "card", logoImg = null) {
    const p = sharePalette();
    const PAD = 80;
    const innerW = w - PAD * 2;
    ctx2.fillStyle = "#ffffff";
    ctx2.fillRect(0, 0, w, h);
    if (variant === "clean") {
      drawCleanVariant(ctx2, w, h, PAD, innerW, p, qrImg, logoImg);
      ctx2.textBaseline = "alphabetic";
      ctx2.textAlign = "left";
      return;
    }
    const top = 80;
    const badgeSize = 148;
    const badgeX = w - PAD - badgeSize;
    ctx2.textBaseline = "alphabetic";
    ctx2.fillStyle = SKETCH_INK_SOFT;
    ctx2.fillRect(badgeX + POSTER_SHADOW, top + POSTER_SHADOW, badgeSize, badgeSize);
    ctx2.fillStyle = p.accent;
    ctx2.fillRect(badgeX, top, badgeSize, badgeSize);
    ctx2.strokeStyle = SKETCH_INK;
    ctx2.lineWidth = POSTER_BW;
    ctx2.strokeRect(badgeX + POSTER_BW / 2, top + POSTER_BW / 2, badgeSize - POSTER_BW, badgeSize - POSTER_BW);
    ctx2.fillStyle = "#ffffff";
    ctx2.textAlign = "center";
    ctx2.font = `84px ${CANVAS_CUTE_FONT}`;
    ctx2.fillText(finalGrade(), badgeX + badgeSize / 2, top + 96);
    ctx2.font = `500 24px ${CANVAS_CLEAR_FONT}`;
    ctx2.globalAlpha = 0.92;
    ctx2.fillText("\u8BC4\u7EA7", badgeX + badgeSize / 2, top + 128);
    ctx2.globalAlpha = 1;
    const titleMaxW = badgeX - PAD - 28;
    ctx2.textAlign = "left";
    ctx2.fillStyle = p.ink;
    let titleSize = 92;
    ctx2.font = `${titleSize}px ${CANVAS_CUTE_FONT}`;
    while (titleSize > 52 && ctx2.measureText(state.selectedPattern.name).width > titleMaxW) {
      titleSize -= 4;
      ctx2.font = `${titleSize}px ${CANVAS_CUTE_FONT}`;
    }
    ctx2.fillText(fitText(ctx2, state.selectedPattern.name, titleMaxW), PAD, top + badgeSize / 2 + titleSize * 0.34);
    const gap = 32;
    const kpiH = 116;
    const footerH = 210;
    const wellTop = top + badgeSize + 40;
    const wellBottom = h - 64 - footerH - gap - kpiH - gap;
    const wellH = wellBottom - wellTop;
    ctx2.fillStyle = SKETCH_INK_SOFT;
    ctx2.fillRect(PAD + POSTER_SHADOW, wellTop + POSTER_SHADOW, innerW, wellH);
    ctx2.fillStyle = p.well;
    ctx2.fillRect(PAD, wellTop, innerW, wellH);
    ctx2.strokeStyle = SKETCH_INK;
    ctx2.lineWidth = POSTER_BW;
    ctx2.strokeRect(PAD + POSTER_BW / 2, wellTop + POSTER_BW / 2, innerW - POSTER_BW, wellH - POSTER_BW);
    const wellPad = 40;
    const gridSize = Math.min(innerW - wellPad * 2, wellH - wellPad * 2, 600);
    const artX = PAD + (innerW - gridSize) / 2;
    const artY = wellTop + (wellH - gridSize) / 2;
    drawShareGrid(ctx2, artX, artY, gridSize);
    const craftName = state.craft || state.selectedPattern.craft || "";
    if (craftName && craftName !== "\u539F\u7248") {
      ctx2.save();
      roundedPath(ctx2, artX, artY, gridSize, gridSize, 26);
      ctx2.clip();
      const sheen = ctx2.createLinearGradient(artX, artY, artX + gridSize * 0.7, artY + gridSize * 0.62);
      sheen.addColorStop(0, "rgba(255,255,255,0.26)");
      sheen.addColorStop(0.38, "rgba(255,255,255,0.09)");
      sheen.addColorStop(0.6, "rgba(255,255,255,0)");
      ctx2.fillStyle = sheen;
      ctx2.fillRect(artX, artY, gridSize, gridSize);
      ctx2.restore();
    }
    const craft = state.craft || state.selectedPattern.craft || "\u94A5\u5319\u6263";
    ctx2.font = `26px ${CANVAS_CUTE_FONT}`;
    const craftW = ctx2.measureText(craft).width + 40;
    const craftH = 46;
    const craftX = PAD + innerW - 30 - craftW;
    const craftY = wellTop + wellH - 30 - craftH;
    ctx2.fillStyle = p.chip;
    roundedPath(ctx2, craftX, craftY, craftW, craftH, craftH / 2);
    ctx2.fill();
    ctx2.strokeStyle = p.chipEdge;
    ctx2.lineWidth = 1.5;
    roundedPath(ctx2, craftX, craftY, craftW, craftH, craftH / 2);
    ctx2.stroke();
    ctx2.fillStyle = p.accentDeep;
    ctx2.textAlign = "center";
    ctx2.fillText(craft, craftX + craftW / 2, craftY + craftH / 2 + 9);
    const kpis = [
      [`${boardCols(state.selectedPattern)}\xD7${boardRows(state.selectedPattern)}`, "\u5C3A\u5BF8"],
      [`${getTargetTotal()}`, "\u9897\u6570"],
      [`${getPatternColors().length}`, "\u8272\u53F7"],
      [state.buildMs > 0 ? formatBuildTime(state.buildMs) : "\u2014", "\u7528\u65F6"]
    ];
    const kpiGap = 16;
    const kpiW = (innerW - kpiGap * 3) / 4;
    const kpiY = wellBottom + gap;
    kpis.forEach(([value, label], i) => {
      const kx = PAD + i * (kpiW + kpiGap);
      ctx2.fillStyle = p.glow;
      roundedPath(ctx2, kx, kpiY, kpiW, kpiH, kpiH / 2);
      ctx2.fill();
      ctx2.textAlign = "center";
      ctx2.fillStyle = p.accentDeep;
      ctx2.font = `24px ${CANVAS_CLEAR_FONT}`;
      ctx2.fillText(label, kx + kpiW / 2, kpiY + 42);
      ctx2.fillStyle = p.ink;
      ctx2.font = `600 40px ${CANVAS_CLEAR_FONT}`;
      ctx2.fillText(value, kx + kpiW / 2, kpiY + 88);
    });
    const footTop = kpiY + kpiH + gap;
    const qrBox = footerH;
    ctx2.fillStyle = SKETCH_INK_SOFT;
    ctx2.fillRect(PAD + POSTER_SHADOW / 2, footTop + POSTER_SHADOW / 2, qrBox, qrBox);
    ctx2.fillStyle = "#ffffff";
    ctx2.fillRect(PAD, footTop, qrBox, qrBox);
    ctx2.strokeStyle = SKETCH_INK;
    ctx2.lineWidth = POSTER_BW / 2;
    ctx2.strokeRect(PAD + POSTER_BW / 4, footTop + POSTER_BW / 4, qrBox - POSTER_BW / 2, qrBox - POSTER_BW / 2);
    const qrImgSize = 150;
    if (qrImg) {
      ctx2.drawImage(qrImg, PAD + (qrBox - qrImgSize) / 2, footTop + 18, qrImgSize, qrImgSize);
    }
    ctx2.fillStyle = p.ink;
    ctx2.textAlign = "center";
    ctx2.font = `26px ${CANVAS_CUTE_FONT}`;
    ctx2.fillText("\u62FC\u8C46\u5DE5\u574A", PAD + qrBox / 2, footTop + qrBox - 18);
    const blockX = PAD + qrBox + 30;
    ctx2.textAlign = "left";
    let textX = blockX;
    if (logoImg) {
      const logoSize = 60;
      ctx2.drawImage(logoImg, blockX, footTop + 4, logoSize, logoSize);
      textX = blockX + logoSize + 18;
    }
    ctx2.fillStyle = p.ink;
    ctx2.font = `52px ${CANVAS_CUTE_FONT}`;
    ctx2.fillText("\u62FC\u8C46\u5DE5\u574A", textX, footTop + 56);
    const brandW = ctx2.measureText("\u62FC\u8C46\u5DE5\u574A").width;
    ctx2.fillStyle = p.muted;
    ctx2.font = `22px ${CANVAS_CLEAR_FONT}`;
    ctx2.fillText(`v${APP_VERSION}`, textX + brandW + 14, footTop + 56);
    ctx2.fillStyle = p.accentDeep;
    ctx2.font = `34px ${CANVAS_CUTE_FONT}`;
    const slogan = SHARE_SLOGANS[Math.floor(Math.random() * SHARE_SLOGANS.length)];
    ctx2.fillText(slogan, textX, footTop + 108);
    ctx2.fillStyle = p.muted;
    ctx2.font = `26px ${CANVAS_CLEAR_FONT}`;
    ctx2.fillText("\u626B\u7801 \xB7 \u5F00\u59CB\u4F60\u7684\u62FC\u8C46", textX, footTop + 150);
    ctx2.textBaseline = "alphabetic";
    ctx2.textAlign = "left";
  }
  function drawCleanVariant(ctx2, w, h, PAD, innerW, p, qrImg, logoImg = null) {
    const wellTop = PAD;
    const wellBottom = h - PAD;
    const wellH = wellBottom - wellTop;
    ctx2.fillStyle = SKETCH_INK_SOFT;
    ctx2.fillRect(PAD + POSTER_SHADOW, wellTop + POSTER_SHADOW, innerW, wellH);
    ctx2.fillStyle = p.well;
    ctx2.fillRect(PAD, wellTop, innerW, wellH);
    ctx2.strokeStyle = SKETCH_INK;
    ctx2.lineWidth = POSTER_BW;
    ctx2.strokeRect(PAD + POSTER_BW / 2, wellTop + POSTER_BW / 2, innerW - POSTER_BW, wellH - POSTER_BW);
    const wellPad = 56;
    const bottomBand = 64;
    const gridSize = Math.min(innerW - wellPad * 2, wellH - wellPad * 2 - bottomBand);
    drawShareGrid(
      ctx2,
      PAD + (innerW - gridSize) / 2,
      wellTop + (wellH - bottomBand - gridSize) / 2,
      gridSize
    );
    const markY = wellBottom - 34;
    ctx2.textBaseline = "alphabetic";
    ctx2.font = `28px ${CANVAS_CUTE_FONT}`;
    const markText = "\u62FC\u8C46\u5DE5\u574A \xB7 \u626B\u7801\u540C\u6B3E";
    const markTextW = ctx2.measureText(markText).width;
    const markLogo = logoImg ? 34 : 0;
    const markGap = logoImg ? 12 : 0;
    let markX = (w - (markLogo + markGap + markTextW)) / 2;
    if (logoImg) {
      ctx2.drawImage(logoImg, markX, markY - 27, markLogo, markLogo);
      markX += markLogo + markGap;
    }
    ctx2.textAlign = "left";
    ctx2.fillStyle = p.muted;
    ctx2.fillText(markText, markX, markY);
    if (qrImg) {
      const qrSize = 96;
      ctx2.globalAlpha = 0.92;
      ctx2.drawImage(qrImg, PAD + innerW - qrSize - 28, wellBottom - qrSize - 28, qrSize, qrSize);
      ctx2.globalAlpha = 1;
    }
  }

  // src/render-inspect.js
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
    const cols = boardCols();
    if (state.spill) {
      const index3 = state.spill.index;
      return { x: index3 % cols, y: Math.floor(index3 / cols) };
    }
    if (state.errors.length) {
      const index3 = state.errors[0].index;
      return { x: index3 % cols, y: Math.floor(index3 / cols) };
    }
    const index2 = state.placed.findIndex(Boolean);
    if (index2 >= 0) {
      return { x: index2 % cols, y: Math.floor(index2 / cols) };
    }
    return { x: Math.floor((cols - 1) / 2), y: Math.floor((boardRows() - 1) / 2) };
  }
  function drawInspectZoomCanvas(canvas) {
    const ctx2 = canvas.getContext("2d");
    if (!ctx2) return;
    setupHiDpiCanvas(canvas, ctx2);
    const rect = canvas.getBoundingClientRect();
    const w = Math.max(1, rect.width);
    const h = Math.max(1, rect.height);
    ctx2.clearRect(0, 0, w, h);
    const focus = inspectFocusCell();
    const cols = boardCols();
    const rows = boardRows();
    const radius = 3;
    const gridCount = radius * 2 + 1;
    const padding = 10;
    const cell = Math.floor(Math.min((w - padding * 2) / gridCount, (h - padding * 2) / gridCount));
    if (!Number.isFinite(cell) || cell <= 0) return;
    const gridW = cell * gridCount;
    const gridH = cell * gridCount;
    const x0 = Math.floor((w - gridW) / 2);
    const y0 = Math.floor((h - gridH) / 2);
    const errorMap = new Map(state.errors.map((error) => [error.index, error.type]));
    ctx2.fillStyle = "#eef2f4";
    roundedPath(ctx2, 0.5, 0.5, w - 1, h - 1, 10);
    ctx2.fill();
    ctx2.strokeStyle = "rgba(101, 115, 130, 0.28)";
    ctx2.lineWidth = 1;
    ctx2.stroke();
    const boardPad = 4;
    ctx2.fillStyle = "#cfd7d9";
    roundedPath(ctx2, x0 - boardPad, y0 - boardPad, gridW + boardPad * 2, gridH + boardPad * 2, 6);
    ctx2.fill();
    ctx2.strokeStyle = "rgba(99, 112, 132, 0.32)";
    ctx2.stroke();
    for (let gy = 0; gy < gridCount; gy += 1) {
      for (let gx = 0; gx < gridCount; gx += 1) {
        const bx = focus.x + gx - radius;
        const by = focus.y + gy - radius;
        const px = x0 + gx * cell;
        const py = y0 + gy * cell;
        const inRange = bx >= 0 && by >= 0 && bx < cols && by < rows;
        if (!inRange) continue;
        const index2 = indexFor(bx, by);
        const placed = state.placed[index2];
        const target = targetAt(bx, by);
        const cx = px + cell / 2;
        const cy = py + cell / 2;
        ctx2.fillStyle = "rgba(120, 128, 140, 0.28)";
        ctx2.beginPath();
        ctx2.arc(cx, cy, cell * 0.18, 0, Math.PI * 2);
        ctx2.fill();
        if (target && !placed) {
          ctx2.strokeStyle = palette[target] || "#bbb";
          ctx2.globalAlpha = 0.55;
          ctx2.lineWidth = Math.max(1.4, cell * 0.05);
          ctx2.beginPath();
          ctx2.arc(cx, cy, cell * 0.36, 0, Math.PI * 2);
          ctx2.stroke();
          ctx2.globalAlpha = 1;
        }
        if (placed) {
          const beadR = cell * 0.42;
          ctx2.fillStyle = "rgba(0,0,0,0.16)";
          ctx2.beginPath();
          ctx2.arc(cx + cell * 0.04, cy + cell * 0.06, beadR, 0, Math.PI * 2);
          ctx2.fill();
          ctx2.fillStyle = palette[placed] || "#bbb";
          ctx2.beginPath();
          ctx2.arc(cx, cy, beadR, 0, Math.PI * 2);
          ctx2.fill();
          ctx2.strokeStyle = "rgba(0,0,0,0.18)";
          ctx2.lineWidth = Math.max(1, cell * 0.04);
          ctx2.beginPath();
          ctx2.arc(cx, cy, beadR, 0, Math.PI * 2);
          ctx2.stroke();
          ctx2.fillStyle = "rgba(255,255,255,0.34)";
          ctx2.beginPath();
          ctx2.arc(cx - beadR * 0.28, cy - beadR * 0.28, beadR * 0.22, 0, Math.PI * 2);
          ctx2.fill();
          ctx2.fillStyle = "rgba(60, 68, 80, 0.36)";
          ctx2.beginPath();
          ctx2.arc(cx, cy, beadR * 0.24, 0, Math.PI * 2);
          ctx2.fill();
        }
        if (state.showHints && errorMap.has(index2)) {
          const type = errorMap.get(index2);
          ctx2.strokeStyle = type === "wrong" ? "rgba(220, 68, 76, 0.9)" : "rgba(217, 143, 48, 0.92)";
          ctx2.lineWidth = 2;
          ctx2.strokeRect(px + 1.5, py + 1.5, cell - 3, cell - 3);
        }
      }
    }
    const centerX = x0 + radius * cell + cell / 2;
    const centerY = y0 + radius * cell + cell / 2;
    ctx2.strokeStyle = "rgba(66, 96, 131, 0.85)";
    ctx2.lineWidth = 2;
    ctx2.strokeRect(centerX - cell / 2 + 1, centerY - cell / 2 + 1, cell - 2, cell - 2);
  }
  function drawInspectFusePreviewCanvas(canvas) {
    const ctx2 = canvas.getContext("2d");
    if (!ctx2) return;
    setupHiDpiCanvas(canvas, ctx2);
    const rect = canvas.getBoundingClientRect();
    const w = Math.max(1, rect.width);
    const h = Math.max(1, rect.height);
    ctx2.clearRect(0, 0, w, h);
    ctx2.fillStyle = "#f5f8fb";
    ctx2.fillRect(0, 0, w, h);
    ctx2.strokeStyle = "rgba(38, 36, 43, 0.75)";
    ctx2.lineWidth = 1.5;
    ctx2.strokeRect(0.75, 0.75, w - 1.5, h - 1.5);
    const cols = boardCols();
    const rows = boardRows();
    const cells = [];
    let minX = cols;
    let minY = rows;
    let maxX = -1;
    let maxY = -1;
    for (let y = 0; y < rows; y += 1) {
      for (let x = 0; x < cols; x += 1) {
        const index2 = indexFor(x, y);
        const code = state.placed[index2];
        if (!code) continue;
        cells.push({ x, y, index: index2, code });
        minX = Math.min(minX, x);
        minY = Math.min(minY, y);
        maxX = Math.max(maxX, x);
        maxY = Math.max(maxY, y);
      }
    }
    if (!cells.length) {
      ctx2.fillStyle = "rgba(67, 77, 91, 0.58)";
      ctx2.font = "600 13px " + CANVAS_CLEAR_FONT;
      ctx2.textAlign = "center";
      ctx2.fillText("\u8FD8\u6CA1\u6709\u53EF\u9884\u89C8\u7684\u62FC\u8C46", w / 2, h / 2 + 4);
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
    const centerMap = /* @__PURE__ */ new Map();
    cells.forEach((cellData) => {
      centerMap.set(`${cellData.x}:${cellData.y}`, {
        x: x0 + (cellData.x - minX) * cell + cell / 2,
        y: y0 + (cellData.y - minY) * cell + cell / 2
      });
    });
    cells.forEach((cellData) => {
      const { x, y, code, index: index2 } = cellData;
      const centerA = centerMap.get(`${x}:${y}`);
      const heatA = clamp((state.heat[index2] || 0) + 68, 0, 138);
      const colorA = fusedColor(code, heatA);
      const drawBridge = (nx, ny) => {
        if (!has(nx, ny)) return;
        const nIndex = indexFor(nx, ny);
        const heatB = clamp((state.heat[nIndex] || 0) + 68, 0, 138);
        const centerB = centerMap.get(`${nx}:${ny}`);
        if (!centerB) return;
        const colorB = fusedColor(state.placed[nIndex], heatB);
        const gradient = ctx2.createLinearGradient(centerA.x, centerA.y, centerB.x, centerB.y);
        gradient.addColorStop(0, colorA);
        gradient.addColorStop(1, colorB);
        const blendHeat = Math.min(heatA, heatB);
        const fuse = clamp((blendHeat - 30) / 58 + 0.32, 0, 1);
        const spread = lerp(cell * 0.44, cell * 0.86, easeOut(fuse));
        drawGradientCapsuleBridge(ctx2, centerA, centerB, spread, spread * 0.38, gradient, 0.96);
      };
      drawBridge(x + 1, y);
      drawBridge(x, y + 1);
    });
    cells.forEach((cellData) => {
      const { x, y, code, index: index2 } = cellData;
      const center = centerMap.get(`${x}:${y}`);
      const heat = clamp((state.heat[index2] || 0) + 68, 0, 138);
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
        ctx2.beginPath();
        ctx2.moveTo(left + rTL, top);
        ctx2.lineTo(right - rTR, top);
        ctx2.arcTo(right, top, right, top + rTR, rTR);
        ctx2.lineTo(right, bottom - rBR);
        ctx2.arcTo(right, bottom, right - rBR, bottom, rBR);
        ctx2.lineTo(left + rBL, bottom);
        ctx2.arcTo(left, bottom, left, bottom - rBL, rBL);
        ctx2.lineTo(left, top + rTL);
        ctx2.arcTo(left, top, left + rTL, top, rTL);
        ctx2.closePath();
      };
      ctx2.fillStyle = color;
      buildPath();
      ctx2.fill();
      ctx2.strokeStyle = edge;
      ctx2.lineWidth = Math.max(0.9, cell * 0.052);
      buildPath();
      ctx2.stroke();
    });
  }

  // src/render-fusion.js
  function buildFusedPiecesFromPlaced() {
    const cols = boardCols();
    const rows = boardRows();
    const total = cols * rows;
    const visited = Array(total).fill(false);
    const pieces = [];
    const boardCenterX = (cols - 1) / 2;
    const boardCenterY = (rows - 1) / 2;
    for (let index2 = 0; index2 < total; index2 += 1) {
      if (visited[index2] || !state.placed[index2]) continue;
      const queue = [index2];
      visited[index2] = true;
      const cells = [];
      let minX = cols;
      let minY = rows;
      let maxX = 0;
      let maxY = 0;
      let sumX = 0;
      let sumY = 0;
      for (let head = 0; head < queue.length; head += 1) {
        const current = queue[head];
        const code = state.placed[current];
        if (!code) continue;
        const x = current % cols;
        const y = Math.floor(current / cols);
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
          [x, y + 1]
        ];
        neighbors.forEach(([nx, ny]) => {
          if (nx < 0 || ny < 0 || nx >= cols || ny >= rows) return;
          const next = indexFor(nx, ny);
          if (visited[next] || !state.placed[next]) return;
          visited[next] = true;
          queue.push(next);
        });
      }
      if (!cells.length) continue;
      const centerX = sumX / cells.length;
      const centerY = sumY / cells.length;
      const dx = centerX - boardCenterX;
      const dy = centerY - boardCenterY;
      const dist = Math.hypot(dx, dy) || 1;
      const seed = `${state.selectedPattern.id}:${state.flipCount}:${minX}:${minY}:${cells.length}`;
      const jitterX = (pseudoRandom(`${seed}-jx`) - 0.5) * 0.05;
      const jitterY = (pseudoRandom(`${seed}-jy`) - 0.5) * 0.05;
      const offsetX = clamp(dx / dist * 0.08 + jitterX, -0.14, 0.14);
      const offsetY = clamp(dy / dist * 0.02 + jitterY, -0.06, 0.06);
      const lift = 0.14 + pseudoRandom(`${seed}-lift`) * 0.08;
      const map = {};
      const relCells = cells.map((cell) => {
        map[`${cell.x},${cell.y}`] = cell;
        return {
          ...cell,
          rx: cell.x - minX,
          ry: cell.y - minY
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
        lift
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
          y: layout.boardY + cell.y * layout.cell + layout.cell / 2 + dy
        })
      });
    });
  }
  function drawWaxSheenForPiece(layout, piece, { scale, resolveCenter }) {
    const ctx2 = scene;
    const centers = piece.cells.map((cell) => ({ cell, center: resolveCenter(cell, piece) }));
    if (!centers.length) return;
    const radius = layout.cell * scale * 0.52;
    const bridgeHalf = layout.cell * scale * 0.36;
    const xs = centers.map(({ center }) => center.x);
    const ys = centers.map(({ center }) => center.y);
    const left = Math.min(...xs) - radius;
    const top = Math.min(...ys) - radius;
    const right = Math.max(...xs) + radius;
    const bottom = Math.max(...ys) + radius;
    ctx2.save();
    ctx2.beginPath();
    centers.forEach(({ cell, center }) => {
      ctx2.moveTo(center.x + radius, center.y);
      ctx2.arc(center.x, center.y, radius, 0, Math.PI * 2);
      const rightCell = piece.map[`${cell.x + 1},${cell.y}`];
      if (rightCell) {
        const next = resolveCenter(rightCell, piece);
        ctx2.rect(center.x, center.y - bridgeHalf, next.x - center.x, bridgeHalf * 2);
      }
      const downCell = piece.map[`${cell.x},${cell.y + 1}`];
      if (downCell) {
        const next = resolveCenter(downCell, piece);
        ctx2.rect(center.x - bridgeHalf, center.y, bridgeHalf * 2, next.y - center.y);
      }
    });
    ctx2.clip();
    const sheen = ctx2.createLinearGradient(left, top, right, bottom);
    sheen.addColorStop(0, "rgba(255,248,235,0.075)");
    sheen.addColorStop(0.46, "rgba(255,248,235,0.025)");
    sheen.addColorStop(1, "rgba(255,248,235,0)");
    ctx2.fillStyle = sheen;
    ctx2.fillRect(left, top, right - left, bottom - top);
    ctx2.restore();
  }
  function drawDetachedFusionBridgeByCenters(ctx2, cellSize, cellA, cellB, centerA, centerB, material = null) {
    const heat = Math.min(cellA.heat || 0, cellB.heat || 0);
    const pressBoost = clamp(state.flattening / 100, 0, 1);
    const fuse = clamp((heat - 36) / 56 + pressBoost * 0.42, 0, 1);
    if (fuse <= 0) return;
    const spread = lerp(cellSize * 0.24, cellSize * (0.8 + pressBoost * 0.1), easeOut(fuse));
    const over = clamp((heat - 88) / 34, 0, 1);
    const colorA = finishMaterialColor(fusedColor(cellA.code, heat), material);
    const colorB = finishMaterialColor(fusedColor(cellB.code, heat), material);
    const gradient = ctx2.createLinearGradient(centerA.x, centerA.y, centerB.x, centerB.y);
    gradient.addColorStop(0, colorA);
    gradient.addColorStop(1, colorB);
    drawGradientCapsuleBridge(ctx2, centerA, centerB, spread, lerp(spread / 2, 3, over), gradient, 0.92);
  }
  function drawFusedPieceTransformed(layout, piece, options = {}) {
    const ctx2 = scene;
    const scale = clamp(options.scale ?? 1, 0.28, 1.4);
    const resolveCenter = options.resolveCenter;
    const material = options.material || null;
    if (!resolveCenter) return;
    piece.cells.forEach((cell) => {
      const right = piece.map[`${cell.x + 1},${cell.y}`];
      if (right) {
        const centerA = resolveCenter(cell, piece);
        const centerB = resolveCenter(right, piece);
        drawDetachedFusionBridgeByCenters(ctx2, layout.cell * scale, cell, right, centerA, centerB, material);
      }
      const down = piece.map[`${cell.x},${cell.y + 1}`];
      if (down) {
        const centerA = resolveCenter(cell, piece);
        const centerB = resolveCenter(down, piece);
        drawDetachedFusionBridgeByCenters(ctx2, layout.cell * scale, cell, down, centerA, centerB, material);
      }
    });
    piece.cells.forEach((cell) => {
      const center = resolveCenter(cell, piece);
      const shapeProfile = pieceFusionShapeProfile(piece, cell);
      if (isSpillDamagedIndex(cell.index)) {
        drawDamagedBead(ctx2, center.x, center.y, layout.cell * 0.43 * scale, cell.code, cell.heat, true, shapeProfile);
      } else {
        drawBead(ctx2, center.x, center.y, layout.cell * 0.43 * scale, cell.code, cell.heat, true, shapeProfile, cell.index, material);
      }
    });
    if (material === "wax") drawWaxSheenForPiece(layout, piece, { scale, resolveCenter });
  }
  function pieceFusionShapeProfile(piece, cell) {
    const has = (x, y) => Boolean(piece.map[`${x},${y}`]);
    const orth = Number(has(cell.x - 1, cell.y)) + Number(has(cell.x + 1, cell.y)) + Number(has(cell.x, cell.y - 1)) + Number(has(cell.x, cell.y + 1));
    const edges = {
      left: !has(cell.x - 1, cell.y),
      right: !has(cell.x + 1, cell.y),
      up: !has(cell.x, cell.y - 1),
      down: !has(cell.x, cell.y + 1)
    };
    const cluster = clamp(orth / 4, 0, 1);
    const edgeExposure = 1 - clamp(orth / 4, 0, 1);
    return { cluster, edgeExposure, edges };
  }
  function getFusedPieces() {
    if (!state.fusedPieces.length && placedCount2() > 0) {
      state.fusedPieces = buildFusedPiecesFromPlaced();
    }
    return state.fusedPieces;
  }
  function pieceSortByArea(pieces) {
    return [...pieces].sort((a, b) => b.cells.length - a.cells.length);
  }
  function getShowcaseBounds(pieces) {
    const bounds = {
      minX: Infinity,
      minY: Infinity,
      maxX: -Infinity,
      maxY: -Infinity
    };
    pieces.forEach((piece) => {
      bounds.minX = Math.min(bounds.minX, piece.minX);
      bounds.minY = Math.min(bounds.minY, piece.minY);
      bounds.maxX = Math.max(bounds.maxX, piece.maxX);
      bounds.maxY = Math.max(bounds.maxY, piece.maxY);
    });
    if (!Number.isFinite(bounds.minX)) return null;
    return {
      ...bounds,
      width: bounds.maxX - bounds.minX + 1,
      height: bounds.maxY - bounds.minY + 1,
      centerX: (bounds.minX + bounds.maxX) / 2,
      centerY: (bounds.minY + bounds.maxY) / 2
    };
  }

  // src/render-finish.js
  function drawMaterialHighlight(ctx2, { x, y, w, h, r, alpha = 0.18 }) {
    ctx2.save();
    roundedPath(ctx2, x, y, w, h, r);
    ctx2.clip();
    const shine = ctx2.createLinearGradient(x, y, x + w * 0.72, y + h * 0.62);
    shine.addColorStop(0, `rgba(255,255,255,${alpha})`);
    shine.addColorStop(0.36, `rgba(255,255,255,${alpha * 0.45})`);
    shine.addColorStop(0.58, "rgba(255,255,255,0)");
    ctx2.fillStyle = shine;
    ctx2.fillRect(x, y, w, h);
    ctx2.restore();
  }
  function drawAcrylicPlate(ctx2, { x, y, w, h, r = 14, shadow = true }) {
    ctx2.save();
    if (shadow) {
      ctx2.save();
      ctx2.fillStyle = SKETCH_INK_SOFT;
      roundedPath(ctx2, x + SKETCH_SHADOW_SM, y + SKETCH_SHADOW_SM, w, h, r);
      ctx2.fill();
      ctx2.restore();
    }
    ctx2.fillStyle = "rgba(255,255,255,0.82)";
    roundedPath(ctx2, x, y, w, h, r);
    ctx2.fill();
    ctx2.strokeStyle = "rgba(255,255,255,0.92)";
    ctx2.lineWidth = 2;
    roundedPath(ctx2, x + 1, y + 1, w - 2, h - 2, Math.max(2, r - 1));
    ctx2.stroke();
    ctx2.strokeStyle = "rgba(124,136,147,0.2)";
    ctx2.lineWidth = 1;
    roundedPath(ctx2, x + 2.5, y + 2.5, w - 5, h - 5, Math.max(2, r - 2));
    ctx2.stroke();
    ctx2.restore();
    drawMaterialHighlight(ctx2, { x, y, w, h, r, alpha: 0.24 });
  }
  function finishIntroProgress() {
    if (prefersReducedMotion() || !state.craftSwitchAt) return 1;
    const t = clamp((performance.now() - state.craftSwitchAt) / 260, 0, 1);
    return 1 - (1 - t) ** 3;
  }
  function drawFinishShowcase(layout) {
    const pieces = getFusedPieces();
    if (!pieces.length) return;
    const ctx2 = scene;
    const card = getFinishCardRect(layout);
    const intro = finishIntroProgress();
    const centerX = card.x + card.w / 2;
    const centerY = card.y + card.h / 2;
    ctx2.save();
    ctx2.globalAlpha = 0.6 + intro * 0.4;
    ctx2.translate(centerX, centerY);
    ctx2.scale(0.96 + intro * 0.04, 0.96 + intro * 0.04);
    ctx2.translate(-centerX, -centerY);
    sketchRect(ctx2, card.x, card.y, card.w, card.h, { fill: SKETCH_PAPER });
    if (state.craft === "\u539F\u7248") {
      drawFinishOriginal(layout, pieces);
    } else if (state.craft === "\u94A5\u5319\u6263") {
      drawFinishKeychain(layout, pieces);
    } else if (state.craft === "\u6446\u4EF6") {
      drawFinishFigurine(layout, pieces);
    } else if (state.craft === "\u676F\u57AB") {
      drawFinishCoaster(layout, pieces);
    } else {
      drawFinishOriginal(layout, pieces);
    }
    ctx2.restore();
  }
  function drawConceptEasterScene(layout) {
    const type = state.conceptEasterType || "empty";
    const ctx2 = scene;
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
    const cols = boardCols();
    const rows = boardRows();
    ctx2.save();
    ctx2.fillStyle = "#eef0f3";
    ctx2.fillRect(0, 0, w, h);
    ctx2.restore();
    ctx2.save();
    sketchRect(ctx2, bx - 18, by - 18, displaySize + 36, displaySize + 36);
    ctx2.fillStyle = "#fcfcfd";
    ctx2.fillRect(bx, by, displaySize, displaySize);
    ctx2.restore();
    const displayCell = displaySize / Math.max(cols, rows);
    const fullMode = type === "full";
    for (let y = 0; y < rows; y += 1) {
      for (let x = 0; x < cols; x += 1) {
        const px = bx + x * displayCell;
        const py = by + y * displayCell;
        const index2 = indexFor(x, y);
        const pegR = displayCell * 0.122;
        ctx2.fillStyle = "rgba(97, 107, 120, 0.22)";
        ctx2.beginPath();
        ctx2.arc(px + displayCell / 2, py + displayCell / 2, pegR, 0, Math.PI * 2);
        ctx2.fill();
        ctx2.fillStyle = "rgba(255,255,255,0.52)";
        ctx2.beginPath();
        ctx2.arc(px + displayCell / 2 - pegR * 0.22, py + displayCell / 2 - pegR * 0.22, pegR * 0.35, 0, Math.PI * 2);
        ctx2.fill();
        if (fullMode) {
          const code = state.placed[index2] || state.selectedColor;
          const heat = Math.max(62, state.heat[index2] || 0);
          drawBead(ctx2, px + displayCell / 2, py + displayCell / 2, displayCell * 0.43, code, heat, true, null, index2);
        }
      }
    }
    drawConceptMuseumLabel({
      x: bx,
      y: by + displaySize + 26,
      w: displaySize,
      type,
      maxBottom: h - 18
    });
  }
  function conceptWrappedLines(text, maxWidth, font) {
    const ctx2 = scene;
    if (!text) return [""];
    ctx2.save();
    ctx2.font = font;
    let line = "";
    const lines = [];
    [...text].forEach((ch) => {
      const test = line + ch;
      if (line && ctx2.measureText(test).width > maxWidth) {
        lines.push(line);
        line = ch;
      } else {
        line = test;
      }
    });
    if (line) lines.push(line);
    ctx2.restore();
    return lines.length ? lines : [text];
  }
  function buildConceptLabelMetrics(type, labelW) {
    const title = type === "full" ? "\u300A\u6EE1\u683C\u6784\u56FE\u300B" : "\u300A\u65E0\u9898\u300B";
    const paragraphs = type === "full" ? [
      { text: "2026", font: "500 15px " + CANVAS_CLEAR_FONT, color: "#2f333b", lineHeight: 22 },
      { text: "\u5851\u6599\u62FC\u8C46\u3001\u7F51\u683C\u3001\u5B8C\u5168\u5360\u636E\u7684\u8868\u9762", font: "500 14px " + CANVAS_CLEAR_FONT, color: "#4f5560", lineHeight: 22 },
      { gap: 10 },
      { text: "\u8FD9\u4EF6\u4F5C\u54C1\u62D2\u7EDD\u7559\u767D\uFF0C\u6574\u5757\u677F\u9762\u6210\u4E3A\u56FE\u50CF\u672C\u8EAB\u3002", font: "500 15px " + CANVAS_CLEAR_FONT, color: "#2f333b", lineHeight: 22 },
      { text: "\u6BCF\u4E2A\u5B54\u4F4D\u90FD\u88AB\u5360\u636E\uFF0C\u6BCF\u4E2A\u4F4D\u7F6E\u90FD\u540C\u7B49\u91CD\u8981\u3002", font: "500 15px " + CANVAS_CLEAR_FONT, color: "#2f333b", lineHeight: 22 }
    ] : [
      { text: "2026", font: "500 15px " + CANVAS_CLEAR_FONT, color: "#2f333b", lineHeight: 22 },
      { text: "\u7A7A\u767D\u62FC\u8C46\u677F\u3001\u672A\u653E\u7F6E\u7684\u5851\u6599\u8C46\u3001\u73A9\u5BB6\u7684\u89C2\u770B", font: "500 14px " + CANVAS_CLEAR_FONT, color: "#4f5560", lineHeight: 22 },
      { gap: 10 },
      { text: "\u6CA1\u6709\u989C\u8272\uFF0C\u4E5F\u662F\u4E00\u79CD\u7ED3\u6784\u3002", font: "500 15px " + CANVAS_CLEAR_FONT, color: "#2f333b", lineHeight: 22 }
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
          lineHeight: item.lineHeight
        });
      });
    });
    const boxH = 24 + 28 + 14 + rows.reduce((sum, row) => sum + (row.gap || row.lineHeight), 0) + 18;
    return { title, rows, boxH };
  }
  function drawConceptMuseumLabel({ x, y, w, type, maxBottom }) {
    const ctx2 = scene;
    const labelW = Math.min(w, 640);
    const labelX = x + (w - labelW) / 2;
    const metrics = buildConceptLabelMetrics(type, labelW);
    const { title, rows, boxH } = metrics;
    const labelY = Math.max(14, Math.min(y, maxBottom - boxH));
    ctx2.save();
    ctx2.fillStyle = "rgba(255,255,255,0.95)";
    roundedRect(labelX, labelY, labelW, boxH, 6);
    ctx2.fill();
    ctx2.strokeStyle = "rgba(38, 36, 43, 0.16)";
    ctx2.lineWidth = 1;
    roundedRect(labelX, labelY, labelW, boxH, 6);
    ctx2.stroke();
    ctx2.fillStyle = "#22242a";
    ctx2.font = "700 23px " + CANVAS_CLEAR_FONT;
    ctx2.fillText(title, labelX + 18, labelY + 36);
    let cursorY = labelY + 66;
    rows.forEach((row) => {
      if (row.gap) {
        cursorY += row.gap;
        return;
      }
      ctx2.fillStyle = row.color;
      ctx2.font = row.font;
      ctx2.fillText(row.text, labelX + 18, cursorY);
      cursorY += row.lineHeight;
    });
    ctx2.restore();
  }
  function drawFinishKeychain(layout, pieces) {
    const ctx2 = scene;
    const { boardX, boardY, boardW, boardH, cell } = layout;
    const selected = pieceSortByArea(pieces).slice(0, 2);
    const centerX = boardX + boardW / 2;
    const slots = selected.length === 1 ? [boardY + boardH * 0.57] : [boardY + boardH * 0.38, boardY + boardH * 0.73];
    const placed = [];
    selected.forEach((piece, index2) => {
      const pieceW = (piece.maxX - piece.minX + 1) * cell;
      const pieceH = (piece.maxY - piece.minY + 1) * cell;
      const maxW = boardW * (selected.length === 1 ? 0.58 : 0.46);
      const maxH = boardH * (selected.length === 1 ? 0.48 : 0.25);
      const scale = clamp(Math.min(maxW / pieceW, maxH / pieceH, 1.22), 0.48, 1.22);
      const pad = Math.max(cell * 0.68, 12);
      const plateW = pieceW * scale + pad * 2;
      const plateH = pieceH * scale + pad * 2.15;
      const target = { x: centerX, y: slots[index2] + pad * 0.2 };
      const plate = {
        x: centerX - plateW / 2,
        y: slots[index2] - plateH / 2,
        w: plateW,
        h: plateH,
        r: Math.max(12, cell * 0.72)
      };
      placed.push({ piece, scale, target, plate, pad });
      drawAcrylicPlate(ctx2, plate);
      const holeY = plate.y + pad * 0.52;
      ctx2.save();
      ctx2.fillStyle = "rgba(124,136,147,0.22)";
      ctx2.strokeStyle = "rgba(83,94,105,0.68)";
      ctx2.lineWidth = Math.max(1.5, cell * 0.09);
      ctx2.beginPath();
      ctx2.arc(centerX, holeY, Math.max(4, cell * 0.22), 0, Math.PI * 2);
      ctx2.fill();
      ctx2.stroke();
      ctx2.restore();
      drawFusedPieceTransformed(layout, piece, {
        scale,
        resolveCenter: (cellData) => ({
          x: target.x + (cellData.x - piece.centerX) * cell * scale,
          y: target.y + (cellData.y - piece.centerY) * cell * scale
        })
      });
      drawMaterialHighlight(ctx2, { ...plate, alpha: 0.14 });
    });
    const ringY = boardY + boardH * 0.1;
    const ringR = Math.max(18, boardW * 0.055);
    ctx2.save();
    ctx2.strokeStyle = "#9aa5b1";
    ctx2.lineWidth = Math.max(5, cell * 0.28);
    ctx2.beginPath();
    ctx2.arc(centerX, ringY, ringR, 0, Math.PI * 2);
    ctx2.stroke();
    if (placed.length) {
      const first = placed[0];
      const holeY = first.plate.y + first.pad * 0.52;
      const connectorTop = ringY + ringR * 0.76;
      const connectorH = Math.max(8, holeY - connectorTop + cell * 0.1);
      ctx2.fillStyle = "#9aa5b1";
      roundedPath(ctx2, centerX - Math.max(3, cell * 0.14), connectorTop, Math.max(6, cell * 0.28), connectorH, Math.max(3, cell * 0.14));
      ctx2.fill();
    }
    if (placed.length > 1) {
      const top = placed[0];
      const bottom = placed[1];
      const topBottomY = top.plate.y + top.plate.h;
      const bottomTopY = bottom.plate.y;
      ctx2.strokeStyle = "#9aa5b1";
      ctx2.lineCap = "round";
      ctx2.lineWidth = Math.max(2.8, cell * 0.16);
      ctx2.beginPath();
      ctx2.moveTo(centerX, topBottomY + cell * 0.06);
      ctx2.lineTo(centerX, bottomTopY - cell * 0.06);
      ctx2.stroke();
    }
    ctx2.restore();
  }
  function drawFinishOriginal(layout, pieces) {
    const ctx2 = scene;
    const { boardX, boardY, cell } = layout;
    const boardW = layout.boardW || layout.boardSize;
    const boardH = layout.boardH || layout.boardSize;
    const frame = 14;
    ctx2.save();
    sketchRect(ctx2, boardX - frame, boardY - frame, boardW + frame * 2, boardH + frame * 2, { fill: "#d8c8ad" });
    ctx2.fillStyle = "#fffdf8";
    ctx2.fillRect(boardX - 6, boardY - 6, boardW + 12, boardH + 12);
    ctx2.fillStyle = "#fbfcfd";
    ctx2.fillRect(boardX, boardY, boardW, boardH);
    const cols = boardCols();
    const rows = boardRows();
    const spillIndex = state.spill ? state.spill.index : -1;
    for (let y = 0; y < rows; y += 1) {
      for (let x = 0; x < cols; x += 1) {
        const index2 = indexFor(x, y);
        if (index2 === spillIndex) continue;
        const px = boardX + x * cell;
        const py = boardY + y * cell;
        const pegR = cell * 0.138;
        ctx2.fillStyle = "rgba(91, 104, 118, 0.16)";
        ctx2.beginPath();
        ctx2.arc(px + cell / 2, py + cell / 2, pegR, 0, Math.PI * 2);
        ctx2.fill();
      }
    }
    ctx2.restore();
    pieces.forEach((piece) => {
      drawFusedPieceTransformed(layout, piece, {
        scale: 1,
        resolveCenter: (cell2) => ({
          x: layout.boardX + cell2.x * layout.cell + layout.cell / 2,
          y: layout.boardY + cell2.y * layout.cell + layout.cell / 2
        })
      });
    });
    drawMaterialHighlight(ctx2, {
      x: boardX,
      y: boardY,
      w: boardW,
      h: boardH,
      r: 6,
      alpha: 0.12
    });
  }
  function drawFinishCoaster(layout, pieces) {
    const ctx2 = scene;
    const bounds = getShowcaseBounds(pieces);
    if (!bounds) return;
    const { boardX, boardY, boardW, boardH, cell } = layout;
    const side = Math.min(boardW, boardH) * 0.84;
    const pad = Math.max(cell * 1.05, side * 0.055);
    const scale = clamp(Math.min(
      (side - pad * 2) / (bounds.width * cell),
      (side - pad * 2) / (bounds.height * cell),
      1.08
    ), 0.42, 1.08);
    const left = boardX + (boardW - side) / 2;
    const top = boardY + (boardH - side) / 2;
    const thickness = Math.max(7, cell * 0.35);
    ctx2.save();
    ctx2.fillStyle = "#b08f5e";
    ctx2.fillRect(left, top + thickness, side, side);
    ctx2.fillStyle = "#d8b783";
    ctx2.fillRect(left, top, side, side);
    ctx2.beginPath();
    ctx2.rect(left, top, side, side);
    ctx2.clip();
    for (let i = 0; i < 150; i += 1) {
      const px = left + pseudoRandom(`coaster-x-${i}`) * side;
      const py = top + pseudoRandom(`coaster-y-${i}`) * side;
      const pr = 0.45 + pseudoRandom(`coaster-r-${i}`) * 1.25;
      ctx2.fillStyle = pseudoRandom(`coaster-c-${i}`) > 0.5 ? "rgba(113,70,47,0.16)" : "rgba(255,247,225,0.28)";
      ctx2.beginPath();
      ctx2.arc(px, py, pr, 0, Math.PI * 2);
      ctx2.fill();
    }
    ctx2.restore();
    const centerX = boardX + boardW / 2;
    const centerY = boardY + boardH / 2;
    pieces.forEach((piece) => {
      drawFusedPieceTransformed(layout, piece, {
        scale,
        material: "wax",
        resolveCenter: (cellData) => ({
          x: centerX + (cellData.x - bounds.centerX) * cell * scale,
          y: centerY + (cellData.y - bounds.centerY) * cell * scale
        })
      });
    });
    drawMaterialHighlight(ctx2, { x: left, y: top, w: side, h: side, r: 0, alpha: 0.14 });
  }
  function drawFinishFigurine(layout, pieces) {
    const selected = pieceSortByArea(pieces).slice(0, Math.min(4, pieces.length));
    const count = selected.length;
    if (!count) return;
    const ctx2 = scene;
    const { boardX, boardY, boardW, boardH, cell } = layout;
    const baseline = boardY + boardH * 0.66;
    const slotW = boardW / count;
    selected.forEach((piece, i) => {
      const targetX = boardX + slotW * (i + 0.5);
      const pieceW = (piece.maxX - piece.minX + 1) * cell;
      const pieceH = (piece.maxY - piece.minY + 1) * cell;
      const maxW = slotW * (count === 1 ? 0.7 : 0.72);
      const maxH = boardH * (count === 1 ? 0.48 : 0.38);
      const scale = clamp(Math.min(maxW / pieceW, maxH / pieceH, count === 1 ? 1.22 : 1), 0.4, count === 1 ? 1.22 : 1);
      const pieceWidth = pieceW * scale;
      const pieceHeight = pieceH * scale;
      const platePad = Math.max(7, cell * 0.44);
      const plateW = pieceWidth + platePad * 2;
      const plateH = pieceHeight + platePad * 1.65;
      const plateBottom = baseline + cell * 0.18;
      const plate = {
        x: targetX - plateW / 2,
        y: plateBottom - plateH,
        w: plateW,
        h: plateH,
        r: Math.max(9, cell * 0.52)
      };
      const targetY = plateBottom - platePad * 0.72 - pieceHeight / 2;
      const baseW = clamp(pieceWidth * 1.05 + cell * 1.05, cell * 2.3, slotW * 0.9);
      const baseH = clamp(cell * 0.72, 12, 24);
      const baseY = baseline + cell * 0.12;
      ctx2.save();
      ctx2.fillStyle = "rgba(38,36,43,0.16)";
      ctx2.beginPath();
      ctx2.ellipse(targetX, baseY + baseH * 1.05, baseW * 0.48, Math.max(4, baseH * 0.38), 0, 0, Math.PI * 2);
      ctx2.fill();
      ctx2.restore();
      drawAcrylicPlate(ctx2, plate);
      drawFusedPieceTransformed(layout, piece, {
        scale,
        material: "wax",
        resolveCenter: (cellData) => ({
          x: targetX + (cellData.x - piece.centerX) * cell * scale,
          y: targetY + (cellData.y - piece.centerY) * cell * scale
        })
      });
      drawMaterialHighlight(ctx2, { ...plate, alpha: 0.13 });
      ctx2.save();
      ctx2.fillStyle = "#78502f";
      ctx2.fillRect(targetX - baseW / 2, baseY, baseW, baseH);
      ctx2.fillStyle = "#9b6d4c";
      ctx2.beginPath();
      ctx2.ellipse(targetX, baseY, baseW / 2, Math.max(4, baseH * 0.34), 0, 0, Math.PI * 2);
      ctx2.fill();
      ctx2.strokeStyle = "rgba(61,37,25,0.72)";
      ctx2.lineWidth = Math.max(1.4, cell * 0.08);
      ctx2.beginPath();
      ctx2.moveTo(targetX - Math.min(plateW * 0.38, baseW * 0.34), baseY - 0.5);
      ctx2.lineTo(targetX + Math.min(plateW * 0.38, baseW * 0.34), baseY - 0.5);
      ctx2.stroke();
      ctx2.restore();
    });
  }

  // src/render-tray.js
  function useMobileTrayGrid() {
    return window.matchMedia("(max-width: 860px)").matches;
  }
  function shouldShowTray(layout = currentLayout()) {
    return !useMobileDirectPlacement() && layout.trayW > 0 && layout.trayH > 0;
  }
  function trayDimensions() {
    return useMobileTrayGrid() ? { rows: TRAY_MOBILE_ROWS, cols: TRAY_MOBILE_COLS } : { rows: TRAY_DESKTOP_ROWS, cols: TRAY_DESKTOP_COLS };
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
    const count = clamp(amount ?? needed + 14, 8, traySlotCapacity());
    return Array.from({ length: count }, (_, i) => ({
      sx: pseudoRandom(`${state.selectedPattern.id}-${code}-${i}-x`),
      sy: pseudoRandom(`${state.selectedPattern.id}-${code}-${i}-y`),
      wobble: pseudoRandom(`${state.selectedPattern.id}-${code}-${i}-w`) * Math.PI * 2
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
      r: g.beadR
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
  function drawTrayBeadRandomized(ctx2, x, y, r, code, angle = 0, tilt = 1, heightLift = 0) {
    const base = palette[code] || "#999";
    const length = r * 2.22;
    const thickness = r * 1.88 * tilt;
    const corner = Math.max(1.8, thickness * 0.2);
    ctx2.save();
    ctx2.translate(x, y - heightLift);
    ctx2.rotate(angle);
    ctx2.fillStyle = "rgba(0,0,0,0.14)";
    ctx2.beginPath();
    ctx2.ellipse(0.3, thickness * 0.26, length * 0.42, Math.max(1.2, thickness * 0.22), 0, 0, Math.PI * 2);
    ctx2.fill();
    ctx2.fillStyle = base;
    roundedPath(ctx2, -length / 2, -thickness / 2, length, thickness, corner);
    ctx2.fill();
    ctx2.fillStyle = "rgba(255,255,255,0.2)";
    roundedPath(
      ctx2,
      -length * 0.4,
      -thickness * 0.34,
      length * 0.8,
      Math.max(1.1, thickness * 0.16),
      Math.max(1, corner * 0.45)
    );
    ctx2.fill();
    ctx2.strokeStyle = "rgba(0,0,0,0.16)";
    ctx2.lineWidth = Math.max(0.9, r * 0.15);
    roundedPath(ctx2, -length / 2, -thickness / 2, length, thickness, corner);
    ctx2.stroke();
    ctx2.restore();
  }
  function drawTray(layout, compact = false) {
    const ctx2 = scene;
    const { trayX, trayY, trayW, trayH } = layout;
    const color = state.trayColor;
    const progress = color ? state.trayProgress : 0;
    const p = easeOut(progress / 100);
    const g = trayGeometry(layout, compact);
    const beadR = g.beadR;
    ctx2.save();
    sketchRect(ctx2, trayX, trayY, trayW, trayH);
    for (let i = 0; i < g.rows; i += 1) {
      const y = g.startY + g.stepY * i;
      const grooveWidth = Math.max(7.6, beadR * 2.25, g.slotGap * 0.44);
      ctx2.strokeStyle = "rgba(38, 36, 43, 0.12)";
      ctx2.lineWidth = grooveWidth;
      ctx2.lineCap = "round";
      ctx2.beginPath();
      ctx2.moveTo(g.lineStartX, y);
      ctx2.lineTo(g.lineEndX, y);
      ctx2.stroke();
    }
    if (!color) {
      ctx2.save();
      ctx2.fillStyle = "rgba(63, 81, 91, 0.46)";
      ctx2.font = "600 12px " + CANVAS_CLEAR_FONT;
      ctx2.textAlign = "center";
      ctx2.textBaseline = "middle";
      ctx2.fillText("\u70B9\u8272\u53F7\u5012\u8C46", trayX + trayW / 2, trayY + trayH / 2 - 8);
      ctx2.fillText("\u8C46\u7B5B\u5C31\u6EE1\u5566", trayX + trayW / 2, trayY + trayH / 2 + 9);
      ctx2.restore();
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
          const lag = seedL * 0.58 + row / rowNormDiv * 0.14;
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
          drawTrayBeadRandomized(ctx2, x, y, beadR, color, angle, tilt, lift);
        }
      }
    }
    if (color) {
      ctx2.fillStyle = "rgba(38, 36, 43, 0.11)";
      ctx2.fillRect(trayX + 18, trayY + trayH - 30, trayW - 36, 7);
      ctx2.fillStyle = progress >= 70 ? "#57b8a7" : progress >= 35 ? "#d99b3d" : "#e7645f";
      ctx2.fillRect(trayX + 18, trayY + trayH - 30, (trayW - 36) * (progress / 100), 7);
    }
    const dump = trayDumpButtonRect(layout);
    const hoverDump = state.phase === "place" && pointInTrayDumpButton(state.pointer.x, state.pointer.y);
    sketchRect(ctx2, dump.x, dump.y, dump.w, dump.h, {
      fill: hoverDump ? "rgba(231, 100, 95, 0.22)" : SKETCH_PAPER,
      bw: SKETCH_BW_CTL,
      shadow: SKETCH_SHADOW_SM,
      ink: color ? "rgba(189, 72, 67, 0.88)" : SKETCH_INK
    });
    ctx2.strokeStyle = color ? "rgba(189, 72, 67, 0.88)" : "rgba(122, 130, 140, 0.65)";
    ctx2.fillStyle = "transparent";
    ctx2.lineWidth = 1.9;
    ctx2.lineCap = "round";
    const cx = dump.x + dump.w / 2;
    const cy = dump.y + dump.h / 2 + 1;
    ctx2.beginPath();
    ctx2.moveTo(cx - 5.5, cy - 5);
    ctx2.lineTo(cx + 5.5, cy - 5);
    ctx2.moveTo(cx - 4.2, cy - 5);
    ctx2.lineTo(cx - 3, cy + 4.8);
    ctx2.moveTo(cx, cy - 5);
    ctx2.lineTo(cx, cy + 5.2);
    ctx2.moveTo(cx + 4.2, cy - 5);
    ctx2.lineTo(cx + 3, cy + 4.8);
    ctx2.moveTo(cx - 1.8, cy - 7.2);
    ctx2.lineTo(cx + 1.8, cy - 7.2);
    ctx2.stroke();
    ctx2.restore();
  }

  // src/render.js
  var CANVAS_CLEAR_FONT = "Avenir Next, Noto Sans SC, PingFang SC, Hiragino Sans GB, Microsoft YaHei, sans-serif";
  var CANVAS_CUTE_FONT = "LXGW Marker Gothic, Avenir Next, Noto Sans SC, PingFang SC, Hiragino Sans GB, Microsoft YaHei, sans-serif";
  function useMobileDirectPlacement() {
    return isTouchDevice() || useStackedMobileLayout();
  }
  function useStackedMobileLayout() {
    return window.matchMedia("(max-width: 860px)").matches;
  }
  function isTouchDevice() {
    return window.matchMedia("(hover: none) and (pointer: coarse)").matches;
  }
  function maxBoardScale(layout = null) {
    const cell = Number(layout?.cell || 0);
    if (!Number.isFinite(cell) || cell <= 0) {
      return isTouchDevice() ? 6 : 2.8;
    }
    const targetCellPx = isTouchDevice() ? 56 : 48;
    return clamp(targetCellPx / cell, 1, isTouchDevice() ? 10 : 8);
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
    return (h >>> 0) % 1e4 / 1e4;
  }
  function markCanvasDirty() {
    state.renderDirty = true;
  }
  function markDirty() {
    state.renderDirty = true;
    state.uiDirty = true;
  }
  function quantizedCanvasRect(rect = sceneCanvas.getBoundingClientRect()) {
    const q = 8;
    return {
      width: Math.floor(rect.width / q) * q,
      height: Math.floor(rect.height / q) * q
    };
  }
  var _layoutCache = null;
  var _layoutCacheKey = "";
  function invalidateLayoutCache() {
    _layoutCache = null;
  }
  function currentLayout(canvasRect = null) {
    const rect = quantizedCanvasRect(canvasRect || sceneCanvas.getBoundingClientRect());
    const key = `${rect.width}x${rect.height}:${boardCols()}x${boardRows()}`;
    if (_layoutCache && _layoutCacheKey === key) return _layoutCache;
    _layoutCache = computeLayout(rect);
    _layoutCacheKey = key;
    return _layoutCache;
  }
  function boardViewTransform(layout = currentLayout()) {
    const scale = clamp(state.boardView.scale || 1, 1, maxBoardScale(layout));
    const extra = (layout.boardSize * scale - layout.boardSize) * 0.5;
    const basePan = isTouchDevice() ? layout.boardSize * 0.36 : 28;
    const maxPan = extra + basePan;
    const panX = clamp(state.boardView.panX || 0, -maxPan, maxPan);
    const panY = clamp(state.boardView.panY || 0, -maxPan, maxPan);
    state.boardView.scale = scale;
    state.boardView.panX = panX;
    state.boardView.panY = panY;
    const cx = layout.boardX + (layout.boardW || layout.boardSize) * 0.5;
    const cy = layout.boardY + (layout.boardH || layout.boardSize) * 0.5;
    return { scale, panX, panY, cx, cy };
  }
  function withBoardViewTransform(layout = currentLayout(), draw) {
    const view = boardViewTransform(layout);
    scene.save();
    scene.translate(view.cx + view.panX, view.cy + view.panY);
    scene.scale(view.scale, view.scale);
    scene.translate(-view.cx, -view.cy);
    try {
      return draw?.(view);
    } finally {
      scene.restore();
    }
  }
  function boardLocalPointFromCanvasPoint(layout = currentLayout(), point = null) {
    if (!point) return null;
    const view = boardViewTransform(layout);
    return {
      x: (point.x - (view.cx + view.panX)) / view.scale + view.cx,
      y: (point.y - (view.cy + view.panY)) / view.scale + view.cy
    };
  }
  function averageHeatUnderIron(layout = currentLayout(), ironPoint = null) {
    if (!ironPoint) return 0;
    const radius = layout.cell * 1.65;
    const cols = boardCols();
    const rows = boardRows();
    let total = 0;
    let weight = 0;
    for (let y = 0; y < rows; y += 1) {
      for (let x = 0; x < cols; x += 1) {
        const index2 = indexFor(x, y);
        if (!state.placed[index2]) continue;
        const cx = layout.boardX + x * layout.cell + layout.cell / 2;
        const cy = layout.boardY + y * layout.cell + layout.cell / 2;
        const falloff = clamp(1 - Math.hypot(cx - ironPoint.x, cy - ironPoint.y) / radius, 0, 1);
        if (falloff <= 0) continue;
        const cellWeight = 0.35 + falloff * 0.9;
        total += (state.heat[index2] || 0) * cellWeight;
        weight += cellWeight;
      }
    }
    return weight ? total / weight : 0;
  }
  function ironColorForHeat(heat = 0) {
    if (heat >= HEAT_LEVELS.scorched) return "#e7645f";
    if (heat > HEAT_LEVELS.idealMax) return "#d99b3d";
    if (heat >= HEAT_LEVELS.bonded) return "#57b8a7";
    return "#4d77b8";
  }
  function setBoardZoom(nextScale, nextPanX = state.boardView.panX, nextPanY = state.boardView.panY) {
    const layout = currentLayout();
    state.boardView.scale = clamp(nextScale, 1, maxBoardScale(layout));
    state.boardView.panX = nextPanX;
    state.boardView.panY = nextPanY;
    boardViewTransform(layout);
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
    const layout = currentLayout();
    const nextScale = clamp(
      state.gesture.startScale * (distance / Math.max(16, state.gesture.startDistance)),
      1,
      maxBoardScale(layout)
    );
    const cx = layout.boardX + layout.boardSize * 0.5;
    const cy = layout.boardY + layout.boardSize * 0.5;
    const startScale = Math.max(1e-4, state.gesture.startScale);
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
      y: touch.clientY - rect.top
    };
  }
  var MIN_LAYOUT_VIEWPORT = 320;
  function computeLayout(rect) {
    const w = Math.max(rect.width, MIN_LAYOUT_VIEWPORT);
    const h = Math.max(rect.height, MIN_LAYOUT_VIEWPORT);
    if (useMobileDirectPlacement()) {
      const cols = boardCols();
      const rows = boardRows();
      if (useStackedMobileLayout()) {
        const marginX = 16;
        const frameInset2 = 14;
        const visualDeskGap = 8;
        const restGap = frameInset2 + visualDeskGap;
        const floorTop2 = Math.round(h * 0.8);
        const availW2 = Math.max(1, w - marginX * 2);
        const availH2 = Math.max(1, floorTop2 - restGap * 2);
        const cellM2 = clamp(Math.min(availW2 / cols, availH2 / rows), 4, 64);
        const boardWM2 = cellM2 * cols;
        const boardHM2 = cellM2 * rows;
        const boardX2 = Math.floor((w - boardWM2) / 2);
        const boardY2 = Math.floor((floorTop2 - boardHM2) / 2);
        return {
          w,
          h,
          boardX: boardX2,
          boardY: boardY2,
          boardSize: Math.max(boardWM2, boardHM2),
          boardW: boardWM2,
          boardH: boardHM2,
          cell: cellM2,
          refX: 0,
          refY: 0,
          refW: 0,
          refH: 0,
          trayX: 0,
          trayY: 0,
          trayW: 0,
          trayH: 0,
          floorTop: floorTop2
        };
      }
      const margin = 12;
      const availW = Math.max(1, w - margin * 2);
      const availH = Math.max(1, h - margin * 2);
      const cellM = clamp(Math.min(availW / cols, availH / rows), 4, 64);
      const boardWM = cellM * cols;
      const boardHM = cellM * rows;
      return {
        w,
        h,
        boardX: Math.floor((w - boardWM) / 2),
        boardY: Math.floor((h - boardHM) / 2),
        boardSize: Math.max(boardWM, boardHM),
        boardW: boardWM,
        boardH: boardHM,
        cell: cellM,
        refX: 0,
        refY: 0,
        refW: 0,
        refH: 0,
        trayX: 0,
        trayY: 0,
        trayW: 0,
        trayH: 0,
        floorTop: h
      };
    }
    const boardX = 34;
    const boardY = 42;
    const trayGap = 34;
    const trayRightMargin = 12;
    const minTrayW = 180;
    const maxBoardForTray = w - boardX - trayGap - minTrayW - trayRightMargin;
    const rawBoard = Math.min(h - 78, w * 0.64, 590, maxBoardForTray);
    const boardSize = Math.floor(rawBoard / 8) * 8;
    const cell = boardSize / Math.max(boardCols(), boardRows());
    const boardW = cell * boardCols();
    const boardH = cell * boardRows();
    const trayX = boardX + boardSize + trayGap;
    const naturalTrayW = w - trayX - trayRightMargin;
    const trayW = Math.max(minTrayW, naturalTrayW);
    const frameInset = 14;
    const boardTopOuter = boardY - frameInset;
    const boardBottomOuter = boardY + boardH + frameInset;
    const refH = clamp(boardSize * 0.26, 130, 158);
    const refY = boardTopOuter;
    const trayY = refY + refH + 16;
    const trayH = Math.max(120, boardBottomOuter - trayY);
    const contentBottom = boardBottomOuter;
    const minFloorBand = 66;
    const floorTop = clamp(h - minFloorBand, contentBottom + 16, h - 18);
    return {
      w,
      h,
      boardX,
      boardY,
      boardSize,
      boardW,
      boardH,
      cell,
      refX: trayX,
      refY,
      refW: trayW,
      refH,
      trayX,
      trayY,
      trayW,
      trayH,
      floorTop
    };
  }
  function computeShowcaseLayout(rect) {
    const w = Math.max(rect.width, MIN_LAYOUT_VIEWPORT);
    const h = Math.max(rect.height, MIN_LAYOUT_VIEWPORT);
    const cols = boardCols();
    const rows = boardRows();
    const marginX = Math.max(24, w * 0.06);
    const marginTop = Math.max(28, h * 0.07);
    const marginBottom = Math.max(28, h * 0.07);
    const availW = w - marginX * 2;
    const availH = h - marginTop - marginBottom;
    const display = clamp(Math.min(availW, availH), 240, 760);
    const cell = display / Math.max(cols, rows);
    const boardW = cell * cols;
    const boardH = cell * rows;
    const boardX = Math.round((w - boardW) / 2);
    const boardY = Math.round(marginTop + (availH - boardH) / 2);
    return {
      w,
      h,
      boardX,
      boardY,
      boardSize: display,
      boardW,
      boardH,
      cell,
      refX: 0,
      refY: 0,
      refW: 0,
      refH: 0,
      trayX: 0,
      trayY: 0,
      trayW: 0,
      trayH: 0,
      floorTop: h
    };
  }
  function setupHiDpiCanvas(canvas, ctx2, rect = canvas.getBoundingClientRect()) {
    const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
    const width = Math.max(1, Math.round(rect.width * dpr));
    const height = Math.max(1, Math.round(rect.height * dpr));
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
    }
    ctx2.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  function canvasRenderable(canvas) {
    const rect = canvas.getBoundingClientRect();
    return rect.width > 0 && rect.height > 0;
  }
  function render() {
    if (state.previewDirty && canvasRenderable(previewCanvas)) {
      drawPreview();
      state.previewDirty = false;
    }
    const boardAspect = `${boardCols()} / ${boardRows()}`;
    if (sceneCanvas.style.getPropertyValue("--board-aspect") !== boardAspect) {
      sceneCanvas.style.setProperty("--board-aspect", boardAspect);
    }
    const sceneRect = sceneCanvas.getBoundingClientRect();
    if (sceneRect.width <= 0 || sceneRect.height <= 0) return;
    setupHiDpiCanvas(sceneCanvas, scene, sceneRect);
    const layout = currentLayout(sceneRect);
    scene.clearRect(0, 0, sceneRect.width, sceneRect.height);
    drawWorkbench(layout);
    if (state.phase !== "choose") drawFloorDrops(layout);
    if (state.phase === "choose") {
      drawChooseScene(layout);
    } else if (state.phase === "finish") {
      if (state.conceptEaster) {
        drawConceptEasterScene(layout);
      } else {
        const showcase = computeShowcaseLayout(sceneRect);
        drawFinishShowcase(showcase);
        drawFinishLayer(showcase);
      }
    } else {
      withBoardViewTransform(layout, () => {
        drawBoard(layout);
        if (state.phase === "iron") drawIronLayer(layout);
        if (state.phase === "cool") drawCoolingLayer(layout);
      });
      if (!useMobileDirectPlacement()) drawReferenceSheet(layout);
      if ((state.phase === "place" || state.phase === "inspect") && shouldShowTray(layout)) {
        if (state.trayColor) syncTrayMatrixShape();
        drawTray(layout, true);
      }
      if (state.phase === "inspect") updateInspectAssistCanvases();
    }
    if (!useMobileDirectPlacement()) drawLampSwitch(layout);
    if (!useMobileDirectPlacement()) drawToolEntities(layout.w, layout.h);
    state.renderDirty = false;
  }
  var _workbenchCache = null;
  function drawWorkbench(layout) {
    const { w, h, floorTop } = layout;
    const OVER = 8;
    const flat = useMobileDirectPlacement() && !useStackedMobileLayout();
    const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
    const key = `${Math.round(w)}x${Math.round(h)}|${Math.round(floorTop)}|${flat ? "f" : "d"}|${dpr}`;
    if (!_workbenchCache || _workbenchCache.key !== key) {
      const c = document.createElement("canvas");
      c.width = Math.max(1, Math.round((w + OVER) * dpr));
      c.height = Math.max(1, Math.round((h + OVER) * dpr));
      const cctx = c.getContext("2d");
      if (cctx) {
        cctx.scale(dpr, dpr);
        paintWorkbench(cctx, w, h, floorTop, flat);
      }
      _workbenchCache = { key, canvas: cctx ? c : null };
    }
    if (_workbenchCache.canvas) {
      scene.drawImage(_workbenchCache.canvas, 0, 0, w + OVER, h + OVER);
    } else {
      paintWorkbench(scene, w, h, floorTop, flat);
    }
  }
  var SCENE_DESK = "#ffffff";
  var SCENE_FLOOR = "#eef1f5";
  var SCENE_LINE = "#d6dae2";
  var SCENE_EDGE = "#b9bfca";
  function paintWorkbench(ctx2, w, h, floorTop, flat) {
    ctx2.save();
    const OVER = 8;
    const fw = w + OVER;
    if (flat) {
      ctx2.fillStyle = SCENE_DESK;
      ctx2.fillRect(0, 0, fw, h + OVER);
      ctx2.restore();
      return;
    }
    ctx2.fillStyle = SCENE_FLOOR;
    ctx2.fillRect(0, floorTop, fw, h - floorTop + OVER);
    ctx2.strokeStyle = SCENE_LINE;
    ctx2.lineWidth = 1.4;
    for (let x = 96; x < fw; x += 96) {
      ctx2.beginPath();
      ctx2.moveTo(x, floorTop);
      ctx2.lineTo(x, h + OVER);
      ctx2.stroke();
    }
    ctx2.fillStyle = SCENE_DESK;
    ctx2.fillRect(0, 0, fw, floorTop);
    ctx2.strokeStyle = SCENE_EDGE;
    ctx2.lineWidth = 2;
    ctx2.beginPath();
    ctx2.moveTo(0, floorTop + 1);
    ctx2.lineTo(fw, floorTop + 1);
    ctx2.stroke();
    ctx2.restore();
  }
  function drawFloorDrops(layout) {
    if (!state.floorDrops.length) return;
    const ctx2 = scene;
    const beadCell = Math.max(14, layout.cell * 0.92);
    const now = performance.now();
    const survivors = [];
    ctx2.save();
    state.floorDrops.forEach((drop, i) => {
      const bornAt = typeof drop.bornAt === "number" ? drop.bornAt : now;
      const duration = Math.max(380, Number(drop.duration) || 860);
      const t = clamp((now - bornAt) / duration, 0, 1);
      if (t >= 1) return;
      survivors.push(drop);
      const jitterX = (drop.seed - 0.5) * 1.8;
      const jitterY = (i % 3 - 1) * 0.26;
      const x = drop.x + jitterX;
      const y = drop.y + jitterY;
      const fade = 1 - t;
      const spin = (drop.spinDir || 1) * easeOut(t) * Math.PI * 1.7;
      const scale = lerp(1, 0.24, easeOut(t));
      ctx2.fillStyle = `rgba(34, 38, 48, ${0.14 * fade})`;
      ctx2.beginPath();
      ctx2.ellipse(
        x + (drop.orientation === "v" ? 0 : 1.4),
        y + beadCell * 0.36 * scale,
        beadCell * 0.42 * scale,
        beadCell * 0.16 * scale,
        0,
        0,
        Math.PI * 2
      );
      ctx2.fill();
      ctx2.save();
      ctx2.translate(x, y);
      ctx2.rotate(spin);
      ctx2.scale(scale, scale);
      ctx2.globalAlpha = fade;
      drawFallenBead(ctx2, 0, 0, beadCell, drop.code, drop.orientation);
      ctx2.restore();
    });
    if (survivors.length !== state.floorDrops.length) {
      state.floorDrops = survivors;
    }
    ctx2.restore();
  }
  function lampSwitchRect(layout = currentLayout()) {
    const margin = 12;
    const gap = 10;
    const floorTop = layout.floorTop ?? layout.h - 60;
    const room = layout.h - margin - (floorTop + gap);
    const size = clamp(Math.min(layout.boardSize * 0.1, room), 34, 46);
    return {
      x: layout.w - size - margin,
      y: layout.h - size - margin,
      // anchored to the bottom-right corner
      w: size,
      h: size
    };
  }
  function pointInLampSwitch(x, y) {
    if (!(state.phase === "place" || state.phase === "inspect")) return false;
    const rect = lampSwitchRect();
    return x >= rect.x && y >= rect.y && x <= rect.x + rect.w && y <= rect.y + rect.h;
  }
  function drawLampSwitch(layout) {
    if (!(state.phase === "place" || state.phase === "inspect")) return;
    const ctx2 = scene;
    const rect = lampSwitchRect(layout);
    const cx = rect.x + rect.w / 2;
    const cy = rect.y + rect.h / 2;
    const hover = pointInLampSwitch(state.pointer.x, state.pointer.y);
    const pressed = performance.now() < state.lampSwitchFlashUntil;
    const lift = pressed ? 0.95 : 1;
    const bodyR = rect.w * 0.34 * lift;
    ctx2.save();
    const cordStartX = rect.x + rect.w * 0.5;
    const cordStartY = rect.y - 2;
    const cordEndX = layout.w - 22;
    const cordEndY = 2;
    {
      const cordGrad = ctx2.createLinearGradient(cordStartX, cordStartY, cordEndX, cordEndY);
      cordGrad.addColorStop(0, "rgba(36, 40, 50, 0.44)");
      cordGrad.addColorStop(0.68, "rgba(36, 40, 50, 0.28)");
      cordGrad.addColorStop(1, "rgba(36, 40, 50, 0)");
      ctx2.strokeStyle = cordGrad;
      ctx2.lineWidth = 2.6;
      ctx2.lineCap = "round";
      ctx2.beginPath();
      ctx2.moveTo(cordStartX, cordStartY);
      ctx2.bezierCurveTo(
        cordStartX + 22,
        cordStartY - 50,
        cordEndX - 24,
        cordEndY + 80,
        cordEndX,
        cordEndY
      );
      ctx2.stroke();
    }
    if (state.lampOn) {
      const glow = ctx2.createRadialGradient(cx, cy, bodyR * 0.5, cx, cy, rect.w * 1.45);
      glow.addColorStop(0, "rgba(255, 235, 166, 0.34)");
      glow.addColorStop(0.55, "rgba(255, 238, 184, 0.16)");
      glow.addColorStop(1, "rgba(255, 238, 184, 0)");
      ctx2.fillStyle = glow;
      ctx2.beginPath();
      ctx2.arc(cx, cy, rect.w * 1.45, 0, Math.PI * 2);
      ctx2.fill();
    }
    sketchRect(ctx2, rect.x, rect.y, rect.w, rect.h, {
      bw: SKETCH_BW_CTL,
      shadow: SKETCH_SHADOW_SM,
      ink: hover ? "rgba(87, 184, 167, 0.9)" : SKETCH_INK
    });
    const baseW = rect.w * 0.28;
    const baseH = rect.h * 0.16 * lift;
    ctx2.fillStyle = "rgba(112, 121, 132, 0.85)";
    ctx2.fillRect(cx - baseW / 2, cy + rect.h * 0.09, baseW, baseH);
    ctx2.fillStyle = state.lampOn ? "#ffe9a8" : "#e7edf3";
    ctx2.beginPath();
    ctx2.arc(cx, cy - rect.h * 0.02, bodyR, 0, Math.PI * 2);
    ctx2.fill();
    ctx2.strokeStyle = state.lampOn ? "rgba(193, 141, 61, 0.76)" : "rgba(103, 117, 131, 0.55)";
    ctx2.lineWidth = 1.2;
    ctx2.stroke();
    ctx2.strokeStyle = state.lampOn ? "rgba(136, 92, 38, 0.62)" : "rgba(103, 117, 131, 0.52)";
    ctx2.lineWidth = 1.35;
    ctx2.lineCap = "round";
    ctx2.beginPath();
    ctx2.moveTo(cx - bodyR * 0.34, cy - rect.h * 0.06);
    ctx2.quadraticCurveTo(cx, cy + bodyR * 0.18, cx + bodyR * 0.34, cy - rect.h * 0.06);
    ctx2.stroke();
    ctx2.textAlign = "left";
    ctx2.restore();
  }
  function drawToolEntities(w, h) {
    if (state.phase !== "place") return;
    const ctx2 = scene;
    const follow = state.phase === "place" && state.toolPose.visible;
    const defaultX = clamp(w - 168, 24, Math.max(24, w - 96));
    const defaultY = clamp(h - 172, 24, Math.max(24, h - 152));
    const needleTipX = follow ? clamp(state.toolPose.x, 28, w - 28) : defaultX + 72;
    const needleTipY = follow ? clamp(state.toolPose.y, 148, h - 12) : defaultY + 146;
    const tweezerHeadX = follow ? clamp(state.toolPose.x, 20, w - 20) : defaultX + 46;
    const tweezerHeadY = follow ? clamp(state.toolPose.y, 30, h - 20) : defaultY + 90;
    if (state.tool === "needle") {
      drawNeedleEntityAtTip(needleTipX, needleTipY);
    } else {
      drawTweezersEntityAtHead(tweezerHeadX, tweezerHeadY);
    }
  }
  function drawNeedleEntityAtTip(tipX, tipY) {
    drawNeedleEntity(tipX, tipY - 150);
  }
  function drawNeedleEntity(x, y) {
    const ctx2 = scene;
    const loadedCode = state.trayColor || state.selectedColor;
    const cap = needleCapacity();
    const style = currentToolStyle();
    const inUse = state.phase === "place" && state.tool === "needle";
    ctx2.save();
    ctx2.globalAlpha = inUse ? 0.46 : 0.76;
    ctx2.strokeStyle = style.primary;
    ctx2.lineWidth = 5;
    ctx2.lineCap = "round";
    ctx2.beginPath();
    ctx2.moveTo(x, y + 146);
    ctx2.lineTo(x, y + 8);
    ctx2.stroke();
    ctx2.strokeStyle = style.secondary;
    ctx2.lineWidth = 2;
    ctx2.beginPath();
    ctx2.moveTo(x - 2.2, y + 134);
    ctx2.lineTo(x - 2.2, y + 20);
    ctx2.stroke();
    ctx2.fillStyle = style.secondary;
    ctx2.beginPath();
    ctx2.arc(x, y + 6, 6.5, 0, Math.PI * 2);
    ctx2.fill();
    ctx2.strokeStyle = style.primary;
    ctx2.stroke();
    drawToolDecoration(ctx2, x, y + 7, style);
    ctx2.fillStyle = style.tip;
    ctx2.beginPath();
    ctx2.moveTo(x, y + 150);
    ctx2.lineTo(x - 3.2, y + 140);
    ctx2.lineTo(x + 3.2, y + 140);
    ctx2.closePath();
    ctx2.fill();
    for (let i = 0; i < cap; i += 1) {
      const by = y + 10 + i * 11.5;
      const fillStart = Math.max(0, cap - state.needleLoaded);
      if (i >= fillStart) {
        ctx2.save();
        ctx2.globalAlpha = 0.52;
        drawFallenBead(ctx2, x, by, 12, loadedCode, "v");
        ctx2.restore();
      } else {
        ctx2.fillStyle = "rgba(102, 116, 128, 0.18)";
        roundedPath(ctx2, x - 4.5, by - 5.75, 9, 11.5, 2.6);
        ctx2.fill();
      }
    }
    drawToolDecoration(ctx2, x + 8, y + 42, style);
    ctx2.restore();
  }
  function drawTweezersEntity(x, y) {
    const ctx2 = scene;
    const style = currentToolStyle();
    const inUse = state.phase === "place" && state.tool === "tweezers";
    ctx2.save();
    const tweezerScale = 1.18;
    ctx2.translate(x + 46, y + 66);
    ctx2.scale(tweezerScale, tweezerScale);
    ctx2.translate(-(x + 46), -(y + 66));
    ctx2.globalAlpha = inUse ? 0.46 : 0.76;
    ctx2.strokeStyle = style.primary;
    ctx2.lineWidth = 5;
    ctx2.lineCap = "round";
    ctx2.beginPath();
    ctx2.moveTo(x + 8, y + 8);
    ctx2.lineTo(x + 42, y + 76);
    ctx2.moveTo(x + 30, y + 8);
    ctx2.lineTo(x + 52, y + 76);
    ctx2.stroke();
    ctx2.strokeStyle = style.secondary;
    ctx2.lineWidth = 1.4;
    ctx2.beginPath();
    ctx2.moveTo(x + 10, y + 10);
    ctx2.lineTo(x + 41, y + 72);
    ctx2.moveTo(x + 32, y + 10);
    ctx2.lineTo(x + 51, y + 72);
    ctx2.stroke();
    ctx2.fillStyle = style.accent;
    roundedPath(ctx2, x + 14, y + 1, 18, 10, 5);
    ctx2.fill();
    drawToolDecoration(ctx2, x + 24, y + 6, style);
    if (state.tweezerBead) {
      drawBead(ctx2, x + 46, y + 66, 7.2, state.tweezerBead, 0, false);
    } else {
      ctx2.fillStyle = "rgba(102, 116, 128, 0.2)";
      ctx2.beginPath();
      ctx2.arc(x + 46, y + 66, 6.2, 0, Math.PI * 2);
      ctx2.fill();
    }
    ctx2.restore();
  }
  function drawTweezersEntityAtHead(headX, headY) {
    drawTweezersEntity(headX - 46, headY - 66);
  }
  function drawToolDecoration(ctx2, x, y, style) {
    ctx2.save();
    ctx2.fillStyle = style.accent;
    ctx2.strokeStyle = "rgba(255,255,255,0.72)";
    ctx2.lineWidth = 1;
    if (style.deco === "heart") {
      ctx2.beginPath();
      ctx2.moveTo(x, y + 3.8);
      ctx2.bezierCurveTo(x - 7, y - 1.5, x - 3.8, y - 7, x, y - 3.2);
      ctx2.bezierCurveTo(x + 3.8, y - 7, x + 7, y - 1.5, x, y + 3.8);
      ctx2.fill();
      ctx2.stroke();
      ctx2.restore();
      return;
    }
    if (style.deco === "leaf") {
      ctx2.beginPath();
      ctx2.ellipse(x, y, 6, 3.2, -0.68, 0, Math.PI * 2);
      ctx2.fill();
      ctx2.stroke();
      ctx2.strokeStyle = "rgba(69, 122, 101, 0.42)";
      ctx2.beginPath();
      ctx2.moveTo(x - 4.4, y + 2.4);
      ctx2.lineTo(x + 4.8, y - 2.5);
      ctx2.stroke();
      ctx2.restore();
      return;
    }
    if (style.deco === "cloud") {
      ctx2.beginPath();
      ctx2.arc(x - 4, y + 1, 3.2, Math.PI * 0.6, Math.PI * 1.8);
      ctx2.arc(x, y - 1, 4.2, Math.PI, Math.PI * 2);
      ctx2.arc(x + 4.4, y + 1, 3, Math.PI * 1.15, Math.PI * 0.4);
      ctx2.lineTo(x - 5.8, y + 3.5);
      ctx2.closePath();
      ctx2.fill();
      ctx2.stroke();
      ctx2.restore();
      return;
    }
    if (style.deco === "flower") {
      for (let i = 0; i < 5; i += 1) {
        const angle = i * Math.PI * 2 / 5;
        ctx2.beginPath();
        ctx2.ellipse(x + Math.cos(angle) * 3.4, y + Math.sin(angle) * 3.4, 2.8, 1.8, angle, 0, Math.PI * 2);
        ctx2.fill();
        ctx2.stroke();
      }
      ctx2.fillStyle = "#fff7a8";
      ctx2.beginPath();
      ctx2.arc(x, y, 2, 0, Math.PI * 2);
      ctx2.fill();
      ctx2.restore();
      return;
    }
    ctx2.beginPath();
    for (let i = 0; i < 5; i += 1) {
      const angle = -Math.PI / 2 + i * (Math.PI * 2 / 5);
      const outerX = x + Math.cos(angle) * 4.2;
      const outerY = y + Math.sin(angle) * 4.2;
      const innerAngle = angle + Math.PI / 5;
      const innerX = x + Math.cos(innerAngle) * 1.9;
      const innerY = y + Math.sin(innerAngle) * 1.9;
      if (i === 0) ctx2.moveTo(outerX, outerY);
      else ctx2.lineTo(outerX, outerY);
      ctx2.lineTo(innerX, innerY);
    }
    ctx2.closePath();
    ctx2.fill();
    ctx2.stroke();
    ctx2.restore();
  }
  function drawChooseScene(layout) {
    const ctx2 = scene;
    const cardW = Math.min(540, layout.w - 60);
    const x = (layout.w - cardW) / 2;
    const y = Math.max(42, layout.h * 0.15);
    ctx2.save();
    drawPaper(x, y, cardW, 230);
    ctx2.fillStyle = "#26242b";
    ctx2.font = "700 28px " + CANVAS_CLEAR_FONT;
    ctx2.fillText("\u4ECA\u5929\u7684\u5DE5\u4F5C\u53F0\u5DF2\u7ECF\u6E05\u7A7A", x + 28, y + 48);
    ctx2.fillStyle = "#686572";
    ctx2.font = "15px " + CANVAS_CLEAR_FONT;
    wrapText("\u4ECE\u5DE6\u4FA7\u6311\u4E00\u5F20\u56FE\u7EB8\uFF0C\u7167\u7740\u8272\u53F7\u4ECE\u8C46\u76D2\u53D6\u8C46\u3002\u8C46\u7B5B\u53EA\u6709\u4E00\u4E2A\uFF0C\u9488\u5DE5\u5177\u4ECE\u8C46\u7B5B\u53D6\u8C46\uFF0C\u954A\u5B50\u5FC5\u987B\u5148\u5939\u4F4F\u4E00\u9897\u518D\u653E\u4E0B\u3002", x + 28, y + 82, cardW - 56, 25);
    drawMiniSupplies(x + 32, y + 145, cardW - 64, 54);
    ctx2.restore();
  }
  function drawPaper(x, y, w, h) {
    const ctx2 = scene;
    ctx2.save();
    sketchRect(ctx2, x, y, w, h, { fill: "#fffdf8" });
    ctx2.restore();
  }
  function drawMiniSupplies(x, y, w, h) {
    const ctx2 = scene;
    ctx2.save();
    const colors = getPatternColors();
    colors.forEach((code, i) => {
      const cx = x + 16 + i * Math.min(38, w / Math.max(colors.length, 1));
      drawBead(ctx2, cx, y + h / 2, 12, code, 0, false);
    });
    ctx2.strokeStyle = "rgba(38, 36, 43, 0.28)";
    ctx2.lineWidth = 2;
    ctx2.beginPath();
    ctx2.moveTo(x + w - 96, y + 46);
    ctx2.lineTo(x + w - 70, y + 6);
    ctx2.moveTo(x + w - 58, y + 46);
    ctx2.lineTo(x + w - 70, y + 6);
    ctx2.moveTo(x + w - 34, y + 46);
    ctx2.lineTo(x + w - 20, y + 8);
    ctx2.stroke();
    ctx2.restore();
  }
  var _boardPegCache = null;
  function getBoardPegCache(layout, cols, rows, patTiles) {
    const boardW = layout.boardW || layout.boardSize;
    const boardH = layout.boardH || layout.boardSize;
    const cell = layout.cell;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
    const tileSig = patTiles ? `${state.selectedPattern?.tileOriginX ?? 0},${state.selectedPattern?.tileOriginY ?? 0}:${[...patTiles].sort().join("|")}` : "";
    const key = `${cols}x${rows}|${Math.round(boardW)}x${Math.round(boardH)}|${Math.round(cell * 100)}|${dpr}|${tileSig}`;
    if (_boardPegCache && _boardPegCache.key === key) return _boardPegCache.canvas;
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round(boardW * dpr));
    canvas.height = Math.max(1, Math.round(boardH * dpr));
    const ctx2 = canvas.getContext("2d");
    if (!ctx2) {
      _boardPegCache = { key, canvas: null };
      return null;
    }
    ctx2.scale(dpr, dpr);
    const pegR = cell * 0.138;
    for (let y = 0; y < rows; y += 1) {
      for (let x = 0; x < cols; x += 1) {
        if (patTiles && !isActiveTileCell(x, y)) continue;
        const cx = x * cell + cell / 2;
        const cy = y * cell + cell / 2;
        ctx2.fillStyle = "rgba(91, 104, 118, 0.32)";
        ctx2.beginPath();
        ctx2.arc(cx, cy, pegR, 0, Math.PI * 2);
        ctx2.fill();
        ctx2.fillStyle = "rgba(255,255,255,0.58)";
        ctx2.beginPath();
        ctx2.arc(cx - pegR * 0.22, cy - pegR * 0.22, pegR * 0.36, 0, Math.PI * 2);
        ctx2.fill();
      }
    }
    _boardPegCache = { key, canvas };
    return canvas;
  }
  function drawVisibleBoardPegs(ctx2, layout, view, cols, rows, patTiles) {
    const { startCol, endCol, startRow, endRow } = visibleBoardCellRange(layout, view, cols, rows);
    const { boardX, boardY, cell } = layout;
    const pegR = cell * 0.138;
    for (let y = startRow; y < endRow; y += 1) {
      for (let x = startCol; x < endCol; x += 1) {
        if (patTiles && !isActiveTileCell(x, y)) continue;
        const cx = boardX + x * cell + cell / 2;
        const cy = boardY + y * cell + cell / 2;
        ctx2.fillStyle = "rgba(91, 104, 118, 0.32)";
        ctx2.beginPath();
        ctx2.arc(cx, cy, pegR, 0, Math.PI * 2);
        ctx2.fill();
        ctx2.fillStyle = "rgba(255,255,255,0.58)";
        ctx2.beginPath();
        ctx2.arc(cx - pegR * 0.22, cy - pegR * 0.22, pegR * 0.36, 0, Math.PI * 2);
        ctx2.fill();
      }
    }
  }
  function drawBoard(layout) {
    const ctx2 = scene;
    const { boardX, boardY, cell } = layout;
    const boardW = layout.boardW || layout.boardSize;
    const boardH = layout.boardH || layout.boardSize;
    const cols = boardCols();
    const rows = boardRows();
    const boardView = boardViewTransform(layout);
    const theme = currentBackgroundTheme();
    const brand = theme.brand || "#57b8a7";
    const patTiles = state.selectedPattern?.tiles ? new Set(state.selectedPattern.tiles) : null;
    const patOriginX = state.selectedPattern?.tileOriginX ?? 0;
    const patOriginY = state.selectedPattern?.tileOriginY ?? 0;
    const T = BOARD_SIZE;
    if (patTiles) {
      const tileW = T * cell;
      const tileH = T * cell;
      const tintLight = mixColor("#ffffff", brand, 0.06);
      const tintDark = mixColor("#ffffff", brand, 0.15);
      const blocksPerTile = T / 10;
      for (const key of patTiles) {
        const [tx, ty] = key.split(",").map(Number);
        const tbx = boardX + (tx - patOriginX) * tileW;
        const tby = boardY + (ty - patOriginY) * tileH;
        ctx2.fillStyle = "#fbfcfd";
        ctx2.fillRect(tbx, tby, tileW, tileH);
        for (let by = 0; by < blocksPerTile; by++) {
          for (let bx = 0; bx < blocksPerTile; bx++) {
            ctx2.fillStyle = (bx + by) % 2 ? tintDark : tintLight;
            ctx2.fillRect(tbx + bx * 10 * cell, tby + by * 10 * cell, 10 * cell, 10 * cell);
          }
        }
      }
      ctx2.strokeStyle = "rgba(70, 84, 96, 0.35)";
      ctx2.lineWidth = 1.5 / boardView.scale;
      for (const key of patTiles) {
        const [tx, ty] = key.split(",").map(Number);
        const tbx = boardX + (tx - patOriginX) * tileW;
        const tby = boardY + (ty - patOriginY) * tileH;
        if (!patTiles.has(`${tx},${ty - 1}`)) {
          ctx2.beginPath();
          ctx2.moveTo(tbx, tby);
          ctx2.lineTo(tbx + tileW, tby);
          ctx2.stroke();
        }
        if (!patTiles.has(`${tx + 1},${ty}`)) {
          ctx2.beginPath();
          ctx2.moveTo(tbx + tileW, tby);
          ctx2.lineTo(tbx + tileW, tby + tileH);
          ctx2.stroke();
        }
        if (!patTiles.has(`${tx},${ty + 1}`)) {
          ctx2.beginPath();
          ctx2.moveTo(tbx, tby + tileH);
          ctx2.lineTo(tbx + tileW, tby + tileH);
          ctx2.stroke();
        }
        if (!patTiles.has(`${tx - 1},${ty}`)) {
          ctx2.beginPath();
          ctx2.moveTo(tbx, tby);
          ctx2.lineTo(tbx, tby + tileH);
          ctx2.stroke();
        }
      }
    } else {
      drawBoardSkin(ctx2, layout, { cols, rows, brand, shadow: true, guides: false });
    }
    const guideVisible = (state.lampOn || useMobileDirectPlacement()) && (state.phase === "place" || state.phase === "inspect");
    const templateOpacity = guideVisible ? state.phase === "place" ? 0.1 : 0.08 : 0;
    if (guideVisible) {
      drawProjectedGuide(layout, templateOpacity);
    }
    if (shouldUseBoardPegCache(boardView.scale)) {
      const pegCanvas = getBoardPegCache(layout, cols, rows, patTiles);
      if (pegCanvas) ctx2.drawImage(pegCanvas, boardX, boardY, boardW, boardH);
    } else {
      drawVisibleBoardPegs(ctx2, layout, boardView, cols, rows, patTiles);
    }
    if (patTiles) {
      const tileW = T * cell;
      const tileH = T * cell;
      for (const key of patTiles) {
        const [tx, ty] = key.split(",").map(Number);
        const tbx = boardX + (tx - patOriginX) * tileW;
        const tby = boardY + (ty - patOriginY) * tileH;
        drawBoardGuides(ctx2, { boardX: tbx, boardY: tby, boardW: tileW, boardH: tileH, boardSize: Math.max(tileW, tileH), cell }, T, T, boardView.scale);
      }
    } else {
      drawBoardGuides(ctx2, layout, cols, rows, boardView.scale);
    }
    const boardFusedPhase = state.phase === "iron";
    const detachedPhase = state.phase === "cool" || state.phase === "finish";
    if (boardFusedPhase) drawFusionBridges(layout);
    if (detachedPhase) {
      drawDetachedFusedPieces(layout);
    } else {
      state.placed.forEach((code, index2) => {
        if (!code) return;
        const x = index2 % cols;
        const y = Math.floor(index2 / cols);
        const heat = state.heat[index2] || 0;
        const cx = boardX + x * cell + cell / 2;
        const cy = boardY + y * cell + cell / 2;
        if (state.spill && state.spill.index === index2) {
          drawFallenBead(ctx2, cx, cy, cell, code, state.spill.orientation || "h");
          return;
        }
        const shapeProfile = boardFusionShapeProfile(x, y);
        const settle = state.mobileBeadSettle?.index === index2 ? state.mobileBeadSettle : null;
        const settleElapsed = settle ? performance.now() - settle.startedAt : 0;
        const settleScale = settle ? beadSettleScale(settleElapsed, settle.duration, false) : 1;
        if (settle) {
          ctx2.save();
          ctx2.translate(cx, cy);
          ctx2.scale(settleScale, settleScale);
          ctx2.translate(-cx, -cy);
        }
        if (isSpillDamagedIndex(index2)) {
          drawDamagedBead(ctx2, cx, cy, cell * 0.43, code, heat, boardFusedPhase, shapeProfile);
        } else {
          drawBead(ctx2, cx, cy, cell * 0.43, code, heat, boardFusedPhase, shapeProfile, index2);
        }
        drawPegInBead(ctx2, cx, cy, cell * 0.43, heat, boardFusedPhase);
        if (settle) {
          ctx2.restore();
          if (settleElapsed >= settle.duration) state.mobileBeadSettle = null;
        }
      });
    }
    if (state.phase === "inspect" && state.showHints) {
      drawInspectionHints(layout);
    }
    if (state.phase === "place" && state.keyboardGrid.visible) {
      const x = clamp(state.keyboardGrid.x, 0, cols - 1);
      const y = clamp(state.keyboardGrid.y, 0, rows - 1);
      const px = boardX + x * cell;
      const py = boardY + y * cell;
      ctx2.save();
      ctx2.strokeStyle = "rgba(31, 97, 83, 0.96)";
      ctx2.lineWidth = Math.max(2, cell * 0.09);
      ctx2.strokeRect(px + 2, py + 2, Math.max(1, cell - 4), Math.max(1, cell - 4));
      ctx2.strokeStyle = "rgba(255, 255, 255, 0.96)";
      ctx2.lineWidth = Math.max(1, cell * 0.04);
      ctx2.strokeRect(px + 5, py + 5, Math.max(1, cell - 10), Math.max(1, cell - 10));
      ctx2.restore();
    }
  }
  function drawProjectedGuide(layout, templateOpacity = 0) {
    const key = projectedGuideCacheKey(layout, templateOpacity);
    if (!state.projectedGuideCache || state.projectedGuideCache.key !== key) {
      state.projectedGuideCache = buildProjectedGuideCache(layout, key, templateOpacity);
    }
    if (!state.projectedGuideCache?.canvas) return;
    scene.drawImage(
      state.projectedGuideCache.canvas,
      layout.boardX,
      layout.boardY,
      layout.boardW || layout.boardSize,
      layout.boardH || layout.boardSize
    );
  }
  function projectedGuideCacheKey(layout, templateOpacity = 0) {
    const map = getPatternColorMap();
    const mapSig = Object.keys(map).sort().map((code) => `${code}:${map[code]}`).join(",");
    return [
      baseIdFor(state.selectedPattern),
      `${boardCols()}x${boardRows()}`,
      Math.round(layout.boardW || layout.boardSize),
      Math.round(layout.boardH || layout.boardSize),
      // Cache is rasterised at device pixels, so it must rebuild if the DPR changes.
      Math.min(window.devicePixelRatio || 1, 1.75),
      Math.round(templateOpacity * 1e3),
      mapSig
    ].join("|");
  }
  function projectedGuideLightness(code) {
    const rgb = hexToRgb(palette[code] || "#bbbbbb");
    return (Math.max(rgb.r, rgb.g, rgb.b) + Math.min(rgb.r, rgb.g, rgb.b)) / 2;
  }
  function projectedGuideColor(code) {
    return palette[code] || "#bbbbbb";
  }
  function projectedGuideAlpha(code, alpha) {
    const lightness = projectedGuideLightness(code);
    if (lightness >= 228) return Math.min(alpha * 2.2, 0.6);
    if (lightness >= 205) return Math.min(alpha * 1.7, 0.5);
    return alpha;
  }
  function drawProjectedTemplateLayer(ctx2, cols, rows, cell, templateOpacity) {
    if (templateOpacity <= 0) return;
    const projectedBeadRadius = cell * 0.49;
    ctx2.save();
    for (let y = 0; y < rows; y += 1) {
      for (let x = 0; x < cols; x += 1) {
        const code = targetAt(x, y);
        if (!code) continue;
        const cx = x * cell + cell / 2;
        const cy = y * cell + cell / 2;
        ctx2.fillStyle = projectedGuideColor(code);
        ctx2.globalAlpha = projectedGuideAlpha(code, templateOpacity);
        ctx2.beginPath();
        ctx2.arc(cx, cy, projectedBeadRadius, 0, Math.PI * 2);
        ctx2.fill();
      }
    }
    ctx2.restore();
  }
  function buildProjectedGuideCache(layout, key, templateOpacity = 0) {
    const cols = boardCols();
    const rows = boardRows();
    const cell = (layout.boardW || layout.boardSize) / cols;
    const canvasW = Math.max(1, Math.round(layout.boardW || layout.boardSize));
    const canvasH = Math.max(1, Math.round(layout.boardH || layout.boardSize));
    const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round(canvasW * dpr));
    canvas.height = Math.max(1, Math.round(canvasH * dpr));
    const ctx2 = canvas.getContext("2d");
    if (!ctx2) return { key, canvas: null };
    ctx2.scale(dpr, dpr);
    const blur = Math.max(1.45, cell * 0.24);
    const projectedBeadRadius = cell * 0.49;
    const spotCx = canvasW / 2;
    const spotCy = canvasH / 2;
    const spotRadius = Math.min(canvasW, canvasH) * 0.425;
    ctx2.fillStyle = "rgba(255, 255, 255, 0.14)";
    ctx2.fillRect(0, 0, canvasW, canvasH);
    ctx2.save();
    ctx2.filter = `blur(${blur}px)`;
    for (let y = 0; y < rows; y += 1) {
      for (let x = 0; x < cols; x += 1) {
        const code = targetAt(x, y);
        if (!code) continue;
        const cx = x * cell + cell / 2;
        const cy = y * cell + cell / 2;
        ctx2.fillStyle = projectedGuideColor(code);
        ctx2.globalAlpha = projectedGuideAlpha(code, 0.28);
        ctx2.beginPath();
        ctx2.arc(cx, cy, projectedBeadRadius, 0, Math.PI * 2);
        ctx2.fill();
      }
    }
    ctx2.filter = "none";
    ctx2.globalAlpha = 0.16;
    for (let y = 0; y < rows; y += 1) {
      for (let x = 0; x < cols; x += 1) {
        const code = targetAt(x, y);
        if (!code) continue;
        const cx = x * cell + cell / 2;
        const cy = y * cell + cell / 2;
        ctx2.fillStyle = projectedGuideColor(code);
        ctx2.globalAlpha = projectedGuideAlpha(code, 0.14);
        ctx2.beginPath();
        ctx2.arc(cx, cy, projectedBeadRadius, 0, Math.PI * 2);
        ctx2.fill();
      }
    }
    ctx2.restore();
    drawProjectedTemplateLayer(ctx2, cols, rows, cell, templateOpacity);
    ctx2.save();
    ctx2.globalCompositeOperation = "destination-in";
    ctx2.fillStyle = "#000";
    ctx2.beginPath();
    ctx2.arc(spotCx, spotCy, spotRadius, 0, Math.PI * 2);
    ctx2.fill();
    ctx2.restore();
    return { key, canvas };
  }
  function drawFusionBridges(layout) {
    const ctx2 = scene;
    const cols = boardCols();
    const rows = boardRows();
    ctx2.save();
    for (let y = 0; y < rows; y += 1) {
      for (let x = 0; x < cols; x += 1) {
        const index2 = indexFor(x, y);
        const code = state.placed[index2];
        if (!code) continue;
        drawFusionBridgeTo(ctx2, layout, x, y, x + 1, y);
        drawFusionBridgeTo(ctx2, layout, x, y, x, y + 1);
      }
    }
    ctx2.restore();
  }
  function boardFusionShapeProfile(x, y) {
    const cols = boardCols();
    const rows = boardRows();
    const has = (cx, cy) => {
      if (cx < 0 || cy < 0 || cx >= cols || cy >= rows) return false;
      return Boolean(state.placed[indexFor(cx, cy)]);
    };
    const orth = Number(has(x - 1, y)) + Number(has(x + 1, y)) + Number(has(x, y - 1)) + Number(has(x, y + 1));
    const edges = {
      left: !has(x - 1, y),
      right: !has(x + 1, y),
      up: !has(x, y - 1),
      down: !has(x, y + 1)
    };
    const cluster = clamp(orth / 4, 0, 1);
    const edgeExposure = 1 - clamp(orth / 4, 0, 1);
    return { cluster, edgeExposure, edges };
  }
  function finishMaterialColor(color, material) {
    return material === "wax" ? mixColor(color, "#8f877c", 0.11) : color;
  }
  function getFinishCardRect(layout, craft = state.craft) {
    const { boardX, boardY, boardW, boardH } = layout;
    if (craft === "\u94A5\u5319\u6263") {
      return {
        x: boardX + boardW * 0.1,
        y: boardY - 10,
        w: boardW * 0.8,
        h: boardH + 20
      };
    }
    if (craft === "\u6446\u4EF6") {
      return {
        x: boardX + boardW * 0.035,
        y: boardY + boardH * 0.14,
        w: boardW * 0.93,
        h: boardH * 0.72
      };
    }
    return {
      x: boardX - 18,
      y: boardY - 18,
      w: boardW + 36,
      h: boardH + 36
    };
  }
  function drawFusionBridgeTo(ctx2, layout, x1, y1, x2, y2) {
    if (x2 < 0 || y2 < 0 || x2 >= boardCols() || y2 >= boardRows()) return;
    const indexA = indexFor(x1, y1);
    const indexB = indexFor(x2, y2);
    const codeA = state.placed[indexA];
    const codeB = state.placed[indexB];
    if (!codeA || !codeB) return;
    const heat = Math.min(state.heat[indexA] || 0, state.heat[indexB] || 0);
    const pressBoost = state.phase === "cool" || state.phase === "finish" ? clamp(state.flattening / 100, 0, 1) : 0;
    const fuse = clamp((heat - 36) / 56 + pressBoost * 0.42, 0, 1);
    if (fuse <= 0) return;
    const { boardX, boardY, cell } = layout;
    const centerA = {
      x: boardX + x1 * cell + cell / 2,
      y: boardY + y1 * cell + cell / 2
    };
    const centerB = {
      x: boardX + x2 * cell + cell / 2,
      y: boardY + y2 * cell + cell / 2
    };
    const spread = lerp(cell * 0.24, cell * (0.8 + pressBoost * 0.1), easeOut(fuse));
    const over = clamp((heat - 88) / 34, 0, 1);
    const colorA = fusedColor(codeA, heat);
    const colorB = fusedColor(codeB, heat);
    const gradient = ctx2.createLinearGradient(centerA.x, centerA.y, centerB.x, centerB.y);
    gradient.addColorStop(0, colorA);
    gradient.addColorStop(1, colorB);
    drawGradientCapsuleBridge(ctx2, centerA, centerB, spread, lerp(spread / 2, 3, over), gradient, 0.9);
  }
  function drawGradientCapsuleBridge(ctx2, centerA, centerB, width, radius, fillStyle, alpha = 1) {
    const dx = centerB.x - centerA.x;
    const dy = centerB.y - centerA.y;
    const length = Math.hypot(dx, dy);
    if (length < 1e-3) return;
    const safeRadius = Math.max(0.8, Math.min(radius, width * 0.5));
    ctx2.save();
    ctx2.translate(centerA.x, centerA.y);
    ctx2.rotate(Math.atan2(dy, dx));
    ctx2.globalAlpha = alpha;
    ctx2.fillStyle = fillStyle;
    roundedPath(ctx2, 0, -width / 2, length, width, safeRadius);
    ctx2.fill();
    ctx2.restore();
  }
  function drawInspectionHints(layout) {
    const ctx2 = scene;
    const { boardX, boardY, cell } = layout;
    const limit = state.errors.length > 22 ? 22 : state.errors.length;
    ctx2.save();
    ctx2.lineWidth = Math.max(2, cell * 0.08);
    state.errors.slice(0, limit).forEach((error) => {
      const x = error.index % boardCols();
      const y = Math.floor(error.index / boardCols());
      ctx2.strokeStyle = error.type === "missing" ? "#d99b3d" : "#e7645f";
      ctx2.strokeRect(boardX + x * cell + 2, boardY + y * cell + 2, cell - 4, cell - 4);
    });
    ctx2.restore();
  }
  function isSpillDamagedIndex(index2) {
    return state.spillDamages.some((damage) => damage.index === index2);
  }
  function drawDamagedBead(ctx2, x, y, r, code, heat = 0, fused = false, shape = null) {
    const base = palette[code] || "#999";
    const burnt = mixColor(base, "#b86f4f", 0.7);
    const pressRaw = fused ? state.phase === "cool" || state.phase === "finish" ? clamp(state.flattening / 100, 0, 1) : 0 : 0;
    const spread = clamp((heat - 30) / 50 + pressRaw * 0.5, 0.35, 1);
    const cluster = shape?.cluster ?? 0.5;
    const edgeExposure = shape?.edgeExposure ?? 0.5;
    const width = r * lerp(2.12, 2.38, spread);
    const height = r * lerp(2.02, 2.24, spread);
    const cornerMin = r * lerp(0.3, 0.14, cluster);
    const corner = lerp(r * 0.58, cornerMin, clamp(spread + (1 - edgeExposure) * 0.18, 0, 1));
    ctx2.save();
    ctx2.fillStyle = "rgba(62, 39, 34, 0.26)";
    roundedPath(ctx2, x - width / 2 + r * 0.06, y - height / 2 + r * 0.11, width, height, corner);
    ctx2.fill();
    ctx2.fillStyle = burnt;
    roundedPath(ctx2, x - width / 2, y - height / 2, width, height, corner);
    ctx2.fill();
    ctx2.fillStyle = "rgba(255, 188, 129, 0.18)";
    roundedPath(ctx2, x - width * 0.34, y - height * 0.31, width * 0.68, Math.max(1.6, height * 0.12), Math.max(1, corner * 0.45));
    ctx2.fill();
    ctx2.strokeStyle = "rgba(56, 33, 30, 0.38)";
    ctx2.lineWidth = Math.max(1, r * 0.07);
    roundedPath(ctx2, x - width / 2, y - height / 2, width, height, corner);
    ctx2.stroke();
    ctx2.restore();
  }
  function drawFallenBead(ctx2, x, y, cell, code, orientation = "h") {
    const base = palette[code] || "#999";
    const diameter = cell * 0.8;
    const length = diameter * 1.22;
    const thickness = diameter;
    const angle = orientation === "v" ? Math.PI * 0.5 : 0;
    const corner = Math.max(2.2, thickness * 0.16);
    ctx2.save();
    ctx2.translate(x, y);
    ctx2.rotate(angle);
    ctx2.fillStyle = base;
    roundedPath(ctx2, -length / 2, -thickness / 2, length, thickness, corner);
    ctx2.fill();
    ctx2.fillStyle = "rgba(255,255,255,0.18)";
    roundedPath(ctx2, -length * 0.42, -thickness * 0.34, length * 0.84, thickness * 0.18, Math.max(1.2, corner * 0.45));
    ctx2.fill();
    ctx2.strokeStyle = "rgba(0,0,0,0.16)";
    ctx2.lineWidth = Math.max(1, cell * 0.045);
    roundedPath(ctx2, -length / 2, -thickness / 2, length, thickness, corner);
    ctx2.stroke();
    ctx2.restore();
  }
  var _paperTextureCache = null;
  function getPaperTexture(w, h) {
    const key = `${Math.round(w)}x${Math.round(h)}`;
    if (_paperTextureCache && _paperTextureCache.key === key) return _paperTextureCache.canvas;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round(w * dpr));
    canvas.height = Math.max(1, Math.round(h * dpr));
    const p = canvas.getContext("2d");
    p.scale(dpr, dpr);
    p.fillStyle = "#faf5e9";
    p.fillRect(0, 0, w, h);
    let seed = 0;
    const rnd = () => {
      seed += 1;
      const r = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
      return r - Math.floor(r);
    };
    p.lineCap = "round";
    const softStroke = (x1, y1, cx, cy, x2, y2, rgb, peak) => {
      const passes = [[5.5, peak * 0.4], [3, peak * 0.65], [1.5, peak]];
      for (const [lw, a] of passes) {
        p.strokeStyle = `rgba(${rgb},${a.toFixed(3)})`;
        p.lineWidth = lw;
        p.beginPath();
        p.moveTo(x1, y1);
        p.quadraticCurveTo(cx, cy, x2, y2);
        p.stroke();
      }
    };
    const creases = 6;
    for (let i = 0; i < creases; i += 1) {
      const vertical = rnd() > 0.5;
      let x1;
      let y1;
      let x2;
      let y2;
      let cx;
      let cy;
      if (vertical) {
        x1 = w * (0.15 + rnd() * 0.7);
        x2 = x1 + (rnd() * 70 - 35);
        y1 = -8;
        y2 = h + 8;
        cx = (x1 + x2) / 2 + (rnd() * 44 - 22);
        cy = h * (0.3 + rnd() * 0.4);
      } else {
        y1 = h * (0.15 + rnd() * 0.7);
        y2 = y1 + (rnd() * 44 - 22);
        x1 = -8;
        x2 = w + 8;
        cx = w * (0.3 + rnd() * 0.4);
        cy = (y1 + y2) / 2 + (rnd() * 30 - 15);
      }
      const inten = 0.6 + rnd() * 0.5;
      softStroke(x1, y1, cx, cy, x2, y2, "108,92,64", 0.055 * inten);
      softStroke(x1 + 2.2, y1 + 0.8, cx + 2.2, cy + 0.8, x2 + 2.2, y2 + 0.8, "255,253,246", 0.07 * inten);
    }
    p.lineCap = "butt";
    const specks = Math.floor(w * h / 150);
    for (let i = 0; i < specks; i += 1) {
      const sx = rnd() * w;
      const sy = rnd() * h;
      const a = 0.015 + rnd() * 0.03;
      p.fillStyle = rnd() > 0.5 ? `rgba(138, 122, 92, ${a.toFixed(3)})` : `rgba(255, 255, 255, ${(a * 1.4).toFixed(3)})`;
      p.fillRect(sx, sy, 1, 1);
    }
    p.strokeStyle = "rgba(120, 100, 70, 0.10)";
    p.lineWidth = 2;
    p.strokeRect(1, 1, w - 2, h - 2);
    _paperTextureCache = { key, canvas };
    return canvas;
  }
  function tapeTornPath(ctx2, halfW, halfH) {
    const teeth = 6;
    ctx2.beginPath();
    ctx2.moveTo(-halfW - 3.4, -halfH);
    for (let i = 0; i <= teeth; i += 1) {
      const t = i / teeth;
      const y = -halfH + 2 * halfH * t;
      ctx2.lineTo(-halfW + (i % 2 ? 3.6 : -3.4), y);
    }
    for (let i = 0; i <= teeth; i += 1) {
      const t = i / teeth;
      const y = halfH - 2 * halfH * t;
      ctx2.lineTo(halfW + (i % 2 ? -3.6 : 3.4), y);
    }
    ctx2.closePath();
  }
  function tornPaperPath(ctx2, x, y, w, h, seedBase) {
    let s = seedBase;
    const rnd = () => {
      s += 1;
      const r = Math.sin(s * 78.233 + 12.9898) * 43758.5453;
      return r - Math.floor(r);
    };
    const pts = [];
    const edge = (x1, y1, x2, y2, nx, ny) => {
      const len = Math.hypot(x2 - x1, y2 - y1);
      const ux = (x2 - x1) / len;
      const uy = (y2 - y1) / len;
      let d = 0;
      let toggle = 0;
      while (d < len - 0.5) {
        d = Math.min(len, d + 26 + rnd() * 24);
        const out = toggle % 2 === 0 ? 5 + rnd() * 7 : -(rnd() * 2.6);
        pts.push([x1 + ux * d + nx * out, y1 + uy * d + ny * out]);
        toggle += 1;
      }
    };
    edge(x, y, x + w, y, 0, -1);
    edge(x + w, y, x + w, y + h, 1, 0);
    edge(x + w, y + h, x, y + h, 0, 1);
    edge(x, y + h, x, y, -1, 0);
    ctx2.beginPath();
    ctx2.moveTo(pts[0][0], pts[0][1]);
    for (let i = 1; i < pts.length; i += 1) ctx2.lineTo(pts[i][0], pts[i][1]);
    ctx2.closePath();
  }
  function drawReferenceTape(cx, cy, angle) {
    const ctx2 = scene;
    const halfW = 43;
    const halfH = 13;
    ctx2.save();
    ctx2.translate(cx, cy);
    ctx2.rotate(angle);
    ctx2.fillStyle = "rgba(216, 190, 124, 0.34)";
    tapeTornPath(ctx2, halfW, halfH);
    ctx2.fill();
    ctx2.strokeStyle = "rgba(38, 36, 43, 0.35)";
    ctx2.lineWidth = 1;
    tapeTornPath(ctx2, halfW, halfH);
    ctx2.stroke();
    ctx2.restore();
  }
  function drawReferenceSheet(layout) {
    const ctx2 = scene;
    const { refX, refY, refW, refH } = layout;
    if (!refW || !refH) return;
    const pattern = state.selectedPattern;
    const legendAll = getPatternColors(pattern);
    const preferSingleLegend = legendAll.length <= 6;
    let nameHash = 0;
    for (const ch of pattern?.name || "note") nameHash = (nameHash * 31 + ch.charCodeAt(0)) % 1e5;
    const tearSeed = nameHash + Math.round(refW) * 7 + Math.round(refH) * 3 + 1;
    const pad = 13;
    const contentTop = refY + pad;
    const contentH = refH - pad * 2;
    const gridSize = Math.min(contentH, refW * 0.4);
    const cols = boardCols(pattern);
    const rowCount = boardRows(pattern);
    const cell = gridSize / Math.max(cols, rowCount);
    const gridW = cell * cols;
    const gridH = cell * rowCount;
    const gridX = refX + pad + (gridSize - gridW) / 2;
    const gridY = contentTop + (contentH - gridH) / 2;
    const px = refX + 5;
    const py = refY + 5;
    const pw = refW - 10;
    const ph = refH - 10;
    ctx2.save();
    ctx2.save();
    ctx2.translate(SKETCH_SHADOW, SKETCH_SHADOW);
    ctx2.fillStyle = SKETCH_INK_SOFT;
    tornPaperPath(ctx2, px, py, pw, ph, tearSeed);
    ctx2.fill();
    ctx2.restore();
    ctx2.fillStyle = "#fbf6ea";
    tornPaperPath(ctx2, px, py, pw, ph, tearSeed);
    ctx2.fill();
    ctx2.strokeStyle = "rgba(38, 36, 43, 0.75)";
    ctx2.lineWidth = 1.5;
    tornPaperPath(ctx2, px, py, pw, ph, tearSeed);
    ctx2.stroke();
    drawReferenceTape(px + 38, py - 3, -0.12);
    drawReferenceTape(px + pw - 38, py - 3, 0.13);
    ctx2.save();
    tornPaperPath(ctx2, px, py, pw, ph, tearSeed);
    ctx2.clip();
    ctx2.drawImage(getPaperTexture(refW, refH), refX, refY, refW, refH);
    ctx2.strokeStyle = "rgba(120, 108, 86, 0.30)";
    ctx2.lineWidth = 1;
    ctx2.strokeRect(gridX - 4, gridY - 4, gridW + 8, gridH + 8);
    const rows = getEffectiveTargetRows(pattern);
    let ink = tearSeed;
    const inkRnd = () => {
      ink += 1;
      const r = Math.sin(ink * 53.17 + 7.13) * 43758.5453;
      return r - Math.floor(r);
    };
    ctx2.save();
    rows.forEach((row, y) => {
      [...row].forEach((code, x) => {
        if (code === ".") return;
        ctx2.fillStyle = fadedPrintColor(palette[code]);
        ctx2.fillRect(gridX + x * cell, gridY + y * cell, cell + 0.4, cell + 0.4);
      });
    });
    ctx2.restore();
    ctx2.save();
    ctx2.beginPath();
    ctx2.rect(gridX, gridY, gridW, gridH);
    ctx2.clip();
    const dotSize = Math.max(1.1, Math.min(1.7, cell * 0.25));
    ctx2.fillStyle = "rgba(62, 50, 34, 0.12)";
    for (let yy = gridY + 1; yy < gridY + gridH; yy += 3) {
      for (let xx = gridX + 1; xx < gridX + gridW; xx += 3) {
        ctx2.fillRect(xx, yy, dotSize, dotSize);
      }
    }
    ctx2.restore();
    ctx2.strokeStyle = "rgba(92, 76, 50, 0.26)";
    ctx2.lineWidth = 0.7;
    for (let gx = 0; gx <= cols; gx += 1) {
      if (gx % 10 === 0) continue;
      ctx2.beginPath();
      ctx2.moveTo(gridX + gx * cell, gridY);
      ctx2.lineTo(gridX + gx * cell, gridY + gridH);
      ctx2.stroke();
    }
    for (let gy = 0; gy <= rowCount; gy += 1) {
      if (gy % 10 === 0) continue;
      ctx2.beginPath();
      ctx2.moveTo(gridX, gridY + gy * cell);
      ctx2.lineTo(gridX + gridW, gridY + gy * cell);
      ctx2.stroke();
    }
    ctx2.strokeStyle = "rgba(54, 42, 26, 0.58)";
    ctx2.lineWidth = 1.05;
    for (let gx = 0; gx <= cols; gx += 10) {
      ctx2.beginPath();
      ctx2.moveTo(gridX + gx * cell, gridY);
      ctx2.lineTo(gridX + gx * cell, gridY + gridH);
      ctx2.stroke();
    }
    for (let gy = 0; gy <= rowCount; gy += 10) {
      ctx2.beginPath();
      ctx2.moveTo(gridX, gridY + gy * cell);
      ctx2.lineTo(gridX + gridW, gridY + gy * cell);
      ctx2.stroke();
    }
    const textX = gridX + gridW + 18;
    const textAreaW = Math.max(64, refX + refW - pad - textX);
    let nameSize = preferSingleLegend ? 13 : 12;
    while (nameSize > 10.5) {
      ctx2.font = `700 ${nameSize}px ${CANVAS_CUTE_FONT}`;
      if (ctx2.measureText(pattern.name).width <= textAreaW) break;
      nameSize -= 0.5;
    }
    const metaSize = preferSingleLegend ? 9.5 : 9;
    const nameY = contentTop + nameSize + 1;
    const metaY = nameY + 13;
    const legendStartY = metaY + 15;
    ctx2.textBaseline = "alphabetic";
    ctx2.fillStyle = "rgba(58, 50, 38, 0.72)";
    ctx2.font = `700 ${nameSize}px ${CANVAS_CUTE_FONT}`;
    ctx2.fillText(fitText(ctx2, pattern.name, textAreaW), textX, nameY);
    ctx2.fillStyle = "rgba(94, 80, 58, 0.60)";
    ctx2.font = `600 ${metaSize}px ${CANVAS_CLEAR_FONT}`;
    ctx2.fillText(fitText(ctx2, `${cols}\xD7${rowCount} \xB7 ${getTargetTotal()} \u9897 \xB7 ${legendAll.length} \u8272`, textAreaW), textX, metaY);
    ctx2.strokeStyle = "rgba(122, 108, 82, 0.16)";
    ctx2.lineWidth = 1;
    ctx2.beginPath();
    ctx2.moveTo(textX, metaY + 6);
    ctx2.lineTo(textX + textAreaW, metaY + 6);
    ctx2.stroke();
    const counts = getTargetCounts(pattern);
    const legendCols = preferSingleLegend || textAreaW < 150 ? 1 : 2;
    const colW = legendCols === 1 ? textAreaW : Math.max(60, Math.floor((textAreaW - 8) / 2));
    const legendBottom = refY + refH - pad;
    const availableLegendH = Math.max(1, legendBottom - legendStartY);
    const rowH = preferSingleLegend ? clamp(availableLegendH / Math.max(1, legendAll.length - 0.15), 11.5, 16) : 16;
    const rowsThatFit = Math.max(1, Math.floor(availableLegendH / rowH) + 1);
    const maxRows = preferSingleLegend ? Math.min(6, legendAll.length) : Math.min(5, rowsThatFit);
    const maxLegend = legendCols * maxRows;
    const truncated = legendAll.length > maxLegend;
    const shown = truncated ? maxLegend - 1 : Math.min(legendAll.length, maxLegend);
    const colors = legendAll.slice(0, shown);
    colors.forEach((code, i) => {
      const col = i % legendCols;
      const row = Math.floor(i / legendCols);
      const x = textX + col * (colW + 8);
      const y = legendStartY + row * rowH;
      ctx2.fillStyle = fadedPrintColor(palette[code]);
      ctx2.beginPath();
      ctx2.arc(x + 4, y - 4, legendCols === 1 ? 5.1 : 4.8, 0, Math.PI * 2);
      ctx2.fill();
      ctx2.strokeStyle = "rgba(80, 74, 62, 0.22)";
      ctx2.lineWidth = 0.8;
      ctx2.stroke();
      ctx2.fillStyle = "rgba(86, 78, 60, 0.64)";
      ctx2.font = `${legendCols === 1 ? 12 : 11.5}px ${CANVAS_CLEAR_FONT}`;
      const label = fitText(ctx2, `${beadIds[code] || code} \xD7${counts[code] || 0}`, Math.max(22, colW - 16));
      ctx2.fillText(label, x + 13, y);
    });
    if (truncated) {
      const i = shown;
      const col = i % legendCols;
      const row = Math.floor(i / legendCols);
      ctx2.fillStyle = "#9a9484";
      ctx2.font = `${legendCols === 1 ? 12 : 11.5}px ${CANVAS_CLEAR_FONT}`;
      ctx2.fillText(`+${legendAll.length - shown} \u8272`, textX + col * (colW + 8), legendStartY + row * rowH);
    }
    ctx2.restore();
    ctx2.restore();
  }
  function drawIronLayer(layout) {
    const ctx2 = scene;
    const { boardX, boardY, boardSize, cell } = layout;
    ctx2.save();
    ctx2.fillStyle = "rgba(255, 255, 255, 0.42)";
    ctx2.fillRect(boardX - 2, boardY - 2, boardSize + 4, boardSize + 4);
    ctx2.strokeStyle = "rgba(150, 132, 98, 0.18)";
    ctx2.lineWidth = 1.2;
    for (let i = 0; i < 7; i += 1) {
      const y = boardY + 18 + i * (boardSize - 36) / 6;
      ctx2.beginPath();
      ctx2.moveTo(boardX + 10, y + Math.sin(i) * 3);
      ctx2.bezierCurveTo(boardX + boardSize * 0.34, y - 7, boardX + boardSize * 0.62, y + 8, boardX + boardSize - 10, y - 2);
      ctx2.stroke();
    }
    for (let y = 0; y < boardRows(); y += 1) {
      for (let x = 0; x < boardCols(); x += 1) {
        const index2 = indexFor(x, y);
        if (!state.placed[index2]) continue;
        const heat = state.heat[index2] || 0;
        if (heat < HEAT_LEVELS.visible) continue;
        ctx2.globalAlpha = clamp(heat / 140, 0, 0.5);
        ctx2.fillStyle = heat >= HEAT_LEVELS.scorched ? "#e7645f" : heat > HEAT_LEVELS.idealMax ? "#d99b3d" : "#57b8a7";
        ctx2.fillRect(boardX + x * cell + 2, boardY + y * cell + 2, cell - 4, cell - 4);
      }
    }
    ctx2.globalAlpha = 1;
    if (state.emptyIronEaster) {
      const cx = boardX + boardSize * 0.5;
      const cy = boardY + boardSize * 0.5;
      ctx2.save();
      ctx2.globalAlpha = 0.24;
      ctx2.fillStyle = "#d9dadd";
      roundedPath(ctx2, cx - boardSize * 0.14, cy - boardSize * 0.14, boardSize * 0.28, boardSize * 0.28, boardSize * 0.014);
      ctx2.fill();
      ctx2.globalAlpha = 0.38;
      ctx2.strokeStyle = "rgba(88, 95, 105, 0.32)";
      ctx2.lineWidth = Math.max(1.5, boardSize * 6e-3);
      roundedPath(ctx2, cx - boardSize * 0.1, cy - boardSize * 0.1, boardSize * 0.2, boardSize * 0.2, boardSize * 8e-3);
      ctx2.stroke();
      ctx2.restore();
    }
    if (state.ironPos) {
      const ironPoint = boardLocalPointFromCanvasPoint(layout, state.ironPos);
      drawIron(ironPoint.x, ironPoint.y, ironColorForHeat(averageHeatUnderIron(layout, ironPoint)));
    } else {
      drawIron(boardX + boardSize + 42, boardY + 64, "#4d77b8");
    }
    ctx2.restore();
  }
  function drawIron(x, y, color) {
    const ctx2 = scene;
    ctx2.save();
    ctx2.translate(x, y);
    ctx2.rotate(-0.14);
    sketchRect(ctx2, -42, -25, 84, 50, { fill: "#f4f7fa", bw: SKETCH_BW_CTL, shadow: SKETCH_SHADOW_SM });
    ctx2.fillStyle = "#d7e0e5";
    ctx2.fillRect(-40, 11, 80, 15);
    ctx2.fillStyle = color;
    ctx2.fillRect(-30, -15, 60, 30);
    ctx2.strokeStyle = "rgba(38, 36, 43, 0.75)";
    ctx2.lineWidth = 3;
    ctx2.beginPath();
    ctx2.moveTo(-22, -22);
    ctx2.quadraticCurveTo(0, -45, 22, -22);
    ctx2.stroke();
    ctx2.restore();
  }
  function drawCoolingLayer(layout) {
    const ctx2 = scene;
    const { boardX, boardY, boardSize } = layout;
    ctx2.save();
    ctx2.fillStyle = `rgba(128, 201, 222, ${0.08 + state.cooling / 280})`;
    roundedRect(boardX - 10, boardY - 10, boardSize + 20, boardSize + 20, 8);
    ctx2.fill();
    ctx2.strokeStyle = `rgba(77, 119, 184, ${0.12 + state.cooling / 520})`;
    ctx2.lineWidth = 2;
    for (let i = 0; i < 5; i += 1) {
      const y = boardY + 28 + i * (boardSize - 56) / 4;
      ctx2.beginPath();
      ctx2.moveTo(boardX + 18, y);
      ctx2.bezierCurveTo(boardX + boardSize * 0.28, y - 10, boardX + boardSize * 0.63, y + 12, boardX + boardSize - 18, y - 4);
      ctx2.stroke();
    }
    if (state.flattening > 5) {
      ctx2.fillStyle = "rgba(50, 58, 68, 0.16)";
      ctx2.fillRect(boardX + 20, boardY + boardSize * 0.32, boardSize - 40, boardSize * 0.26);
      ctx2.fillStyle = "rgba(255,255,255,0.28)";
      ctx2.fillRect(boardX + 32, boardY + boardSize * 0.35, boardSize - 64, 4);
      ctx2.fillStyle = "rgba(38,36,43,0.16)";
      ctx2.fillRect(boardX + 34, boardY + boardSize * 0.32, 8, boardSize * 0.26);
    }
    if (state.pressAnim) {
      const elapsed = performance.now() - state.pressAnim.startedAt;
      const dur = state.pressAnim.duration;
      const t = clamp(elapsed / dur, 0, 1);
      if (t >= 1) {
        state.pressAnim = null;
      } else {
        const ease = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
        const startY = boardY + boardSize + 60;
        const endY = boardY - 24;
        const cy = lerp(startY, endY, ease);
        const blade = boardSize + 32;
        const bladeX = boardX - 16;
        const bladeH = 22;
        ctx2.save();
        const trailH = startY - cy;
        if (trailH > 0) {
          const trailGrad = ctx2.createLinearGradient(0, cy, 0, startY);
          trailGrad.addColorStop(0, "rgba(38, 36, 43, 0.18)");
          trailGrad.addColorStop(1, "rgba(38, 36, 43, 0)");
          ctx2.fillStyle = trailGrad;
          ctx2.fillRect(bladeX, cy, blade, trailH);
        }
        sketchRect(ctx2, bladeX, cy, blade, bladeH, { fill: "#aeb8c6", bw: SKETCH_BW_CTL, shadow: 0 });
        ctx2.fillStyle = "rgba(40, 46, 56, 0.8)";
        ctx2.fillRect(bladeX + 2, cy - 1, blade - 4, 2);
        ctx2.fillStyle = "rgba(60, 68, 80, 0.55)";
        const dotY = cy + bladeH * 0.55;
        for (let i = 0; i < 5; i += 1) {
          const dx = bladeX + blade * 0.5 + (i - 2) * 18;
          ctx2.beginPath();
          ctx2.arc(dx, dotY, 1.6, 0, Math.PI * 2);
          ctx2.fill();
        }
        ctx2.restore();
      }
    }
    ctx2.restore();
  }
  function drawFinishLayer(layout) {
    const ctx2 = scene;
    const card = getFinishCardRect(layout);
    const badgeW = 76;
    const badgeH = 30;
    const bx = card.x + card.w - badgeW - 8;
    const by = card.y + card.h - badgeH - 8;
    ctx2.save();
    sketchRect(ctx2, bx, by, badgeW, badgeH, { bw: SKETCH_BW_CTL, shadow: SKETCH_SHADOW_SM });
    ctx2.fillStyle = "#26242b";
    ctx2.font = "800 14px " + CANVAS_CLEAR_FONT;
    ctx2.textAlign = "center";
    ctx2.textBaseline = "middle";
    ctx2.fillText(`\u8BC4\u7EA7 ${finalGrade()}`, bx + badgeW / 2, by + badgeH / 2 + 0.5);
    ctx2.restore();
  }
  function drawBead(ctx2, x, y, r, code, heat = 0, fused = false, shape = null, seed = null, material = null) {
    const base = palette[code] || "#999";
    const color = finishMaterialColor(fusedColor(code, heat), material);
    const pressRaw = fused ? state.phase === "cool" || state.phase === "finish" ? clamp(state.flattening / 100, 0, 1) : 0 : 0;
    const heatWeight = clamp((heat - 28) / 46, 0, 1);
    const pressBoost = pressRaw * (0.12 + heatWeight * 0.88);
    const melt = fused ? clamp((heat - 30) / 70 + pressBoost * 0.6, 0, 1) : 0;
    const edges = shape?.edges || { left: true, right: true, up: true, down: true };
    const exposedCount = (edges.left ? 1 : 0) + (edges.right ? 1 : 0) + (edges.up ? 1 : 0) + (edges.down ? 1 : 0);
    const halfConnected = r * lerp(1, 1.18, melt);
    const halfExposed = r * lerp(1, 1.32, melt);
    const halfL = edges.left ? halfExposed : halfConnected;
    const halfR = edges.right ? halfExposed : halfConnected;
    const halfU = edges.up ? halfExposed : halfConnected;
    const halfD = edges.down ? halfExposed : halfConnected;
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
      ctx2.beginPath();
      ctx2.moveTo(left + rTL, top);
      ctx2.lineTo(right - rTR, top);
      ctx2.arcTo(right, top, right, top + rTR, rTR);
      ctx2.lineTo(right, bottom - rBR);
      ctx2.arcTo(right, bottom, right - rBR, bottom, rBR);
      ctx2.lineTo(left + rBL, bottom);
      ctx2.arcTo(left, bottom, left, bottom - rBL, rBL);
      ctx2.lineTo(left, top + rTL);
      ctx2.arcTo(left, top, left + rTL, top, rTL);
      ctx2.closePath();
    };
    const strokeExposedEdges = (cx, cy, style, lw) => {
      const left = cx - halfL, right = cx + halfR, top = cy - halfU, bottom = cy + halfD;
      ctx2.strokeStyle = style;
      ctx2.lineWidth = lw;
      ctx2.lineCap = "round";
      ctx2.beginPath();
      if (edges.up) {
        ctx2.moveTo(left + rTL, top);
        ctx2.lineTo(right - rTR, top);
      }
      if (edges.right) {
        ctx2.moveTo(right, top + rTR);
        ctx2.lineTo(right, bottom - rBR);
      }
      if (edges.down) {
        ctx2.moveTo(right - rBR, bottom);
        ctx2.lineTo(left + rBL, bottom);
      }
      if (edges.left) {
        ctx2.moveTo(left, bottom - rBL);
        ctx2.lineTo(left, top + rTL);
      }
      ctx2.stroke();
    };
    if (beadIds[code] === "H1") {
      ctx2.save();
      ctx2.globalAlpha = 0.18;
      ctx2.fillStyle = "rgba(0,0,0,0.3)";
      buildPath(x + r * 0.06, y + r * 0.1);
      ctx2.fill();
      ctx2.globalAlpha = 0.5;
      ctx2.fillStyle = "#e8f4ff";
      buildPath(x, y);
      ctx2.fill();
      ctx2.globalAlpha = 0.5;
      ctx2.strokeStyle = "rgba(100, 140, 195, 0.9)";
      ctx2.lineWidth = Math.max(0.8, r * 0.1);
      buildPath(x, y);
      ctx2.stroke();
      ctx2.globalAlpha = 0.85;
      ctx2.fillStyle = "rgba(255,255,255,0.95)";
      ctx2.beginPath();
      ctx2.arc(x - r * 0.28, y - r * 0.28, r * 0.22, 0, Math.PI * 2);
      ctx2.fill();
      ctx2.restore();
      return;
    }
    ctx2.save();
    const seamShadowAlpha = fused ? 0.12 * (1 - melt * 0.85) : 0.12;
    if (seamShadowAlpha > 4e-3) {
      ctx2.fillStyle = `rgba(0,0,0,${seamShadowAlpha})`;
      buildPath(x + r * 0.08, y + r * 0.13);
      ctx2.fill();
    }
    ctx2.fillStyle = color;
    buildPath(x, y);
    ctx2.fill();
    const holeFade = fused ? clamp((heat - 42) / 52 + pressBoost * 0.95, 0, 1) : 0;
    const holeR = r * clamp(0.39 - heat / 250 - pressBoost * 0.18, 0, 0.39);
    if (holeR > r * 0.035 && holeFade < 0.98) {
      const holeColor = mixColor("#f6f8fa", color, holeFade);
      ctx2.globalAlpha = 1 - holeFade * 0.72;
      ctx2.fillStyle = heat > 112 ? mixColor(base, "#6b4b44", 0.35) : holeColor;
      if (exposedCount === 0 && melt > 0.5 && heat < 108) {
        roundedPath(ctx2, x - holeR, y - holeR, holeR * 2, holeR * 2, holeR * 0.38);
        ctx2.fill();
      } else {
        ctx2.beginPath();
        ctx2.arc(x, y, holeR, 0, Math.PI * 2);
        ctx2.fill();
      }
      ctx2.globalAlpha = 1;
    }
    if (fused) {
      strokeExposedEdges(x, y, "rgba(0,0,0,0.12)", Math.max(1, r * 0.07));
    } else {
      ctx2.strokeStyle = "rgba(0,0,0,0.12)";
      ctx2.lineWidth = Math.max(1, r * 0.07);
      buildPath(x, y);
      ctx2.stroke();
    }
    ctx2.restore();
  }
  function drawPegInBead(ctx2, x, y, r, heat = 0, fused = false) {
    const pressRaw = fused ? state.phase === "cool" || state.phase === "finish" ? clamp(state.flattening / 100, 0, 1) : 0 : 0;
    const heatWeight = clamp((heat - 28) / 46, 0, 1);
    const pressBoost = pressRaw * (0.12 + heatWeight * 0.88);
    const holeFade = fused ? clamp((heat - 42) / 52 + pressBoost * 0.95, 0, 1) : 0;
    const holeR = r * clamp(0.39 - heat / 250 - pressBoost * 0.18, 0, 0.39);
    if (holeR <= r * 0.035 || holeFade >= 0.98) return;
    const pegR = holeR * 0.8;
    ctx2.save();
    ctx2.globalAlpha = 1 - holeFade * 0.66;
    ctx2.fillStyle = "rgba(99, 112, 126, 0.5)";
    ctx2.beginPath();
    ctx2.arc(x, y, pegR, 0, Math.PI * 2);
    ctx2.fill();
    ctx2.fillStyle = "rgba(255,255,255,0.42)";
    ctx2.beginPath();
    ctx2.arc(x - pegR * 0.22, y - pegR * 0.22, pegR * 0.36, 0, Math.PI * 2);
    ctx2.fill();
    ctx2.restore();
  }
  function drawPreview() {
    setupHiDpiCanvas(previewCanvas, preview);
    const { w, h, cols, rows: rowCount } = getPreviewLayout();
    const pattern = state.selectedPattern;
    const rows = getEffectiveTargetRows(pattern);
    const theme = currentBackgroundTheme();
    drawPixelPatternPreview(preview, {
      width: w,
      height: h,
      cols,
      rows: rowCount,
      pixels: rows,
      colors: palette,
      brand: theme.brand,
      table: theme.table
    });
  }
  function getPreviewLayout() {
    const rect = previewCanvas.getBoundingClientRect();
    const w = rect.width;
    const h = rect.height;
    const cols = boardCols();
    const rows = boardRows();
    const layout = pixelPatternPreviewLayout(w, h, cols, rows);
    return {
      w,
      h,
      cell: layout.cell,
      x0: layout.boardX,
      y0: layout.boardY,
      cols,
      rows,
      boardW: layout.boardW,
      boardH: layout.boardH,
      size: Math.max(cols, rows)
    };
  }
  function previewCellFromPoint(clientX, clientY) {
    const rect = previewCanvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    const layout = getPreviewLayout();
    if (x < layout.x0 || y < layout.y0) return null;
    if (x > layout.x0 + layout.boardW || y > layout.y0 + layout.boardH) return null;
    return {
      x: clamp(Math.floor((x - layout.x0) / layout.cell), 0, layout.cols - 1),
      y: clamp(Math.floor((y - layout.y0) / layout.cell), 0, layout.rows - 1)
    };
  }
  function pointerToCanvas(event) {
    const rect = sceneCanvas.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    };
  }
  function boardCellFromPoint(x, y) {
    const layout = currentLayout();
    const view = boardViewTransform(layout);
    const ux = (x - (view.cx + view.panX)) / view.scale + view.cx;
    const uy = (y - (view.cy + view.panY)) / view.scale + view.cy;
    const { boardX, boardY, cell } = layout;
    const boardW = layout.boardW || layout.boardSize;
    const boardH = layout.boardH || layout.boardSize;
    const pad = Math.max(5, cell * 0.24);
    if (ux < boardX - pad || uy < boardY - pad || ux > boardX + boardW + pad || uy > boardY + boardH + pad) return null;
    const clampedX = clamp(ux, boardX, boardX + boardW - 0.01);
    const clampedY = clamp(uy, boardY, boardY + boardH - 0.01);
    return {
      x: clamp(Math.floor((clampedX - boardX) / cell), 0, boardCols() - 1),
      y: clamp(Math.floor((clampedY - boardY) / cell), 0, boardRows() - 1)
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
      h: size
    };
  }
  function pointInTrayDumpButton(x, y) {
    const rect = trayDumpButtonRect();
    return x >= rect.x && y >= rect.y && x <= rect.x + rect.w && y <= rect.y + rect.h;
  }

  // src/modal-controller.js
  var modalActions = {
    renderRemapModal: () => {
    },
    uiRenderSharePanel: () => {
    }
  };
  function setModalActions(actions = {}) {
    Object.assign(modalActions, actions);
  }
  function getOpenModalEl() {
    if (state.confirmModalOpen) return els.confirmModal;
    if (state.textInputModalOpen) return els.textInputModal;
    if (state.remapModalOpen) return els.remapModal;
    if (state.settingsModalOpen) return els.settingsModal;
    if (state.onboardingModalOpen) return els.onboardingModal;
    if (state.shareModalOpen) return els.shareModal;
    if (state.gallerySubmitModalOpen) return els.gallerySubmitModal;
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
    const active2 = document.activeElement;
    if (active2 && active2 !== document.body && !active2.closest(".remap-modal")) {
      state.modalReturnFocus = active2;
    }
    document.body.classList.add("modal-open");
    playSfx("modal-open");
    const focusables = focusablesIn(modalEl);
    if (focusables.length) focusables[0].focus();
  }
  function restoreModalFocus() {
    if (getOpenModalEl()) return;
    document.body.classList.remove("modal-open");
    playSfx("modal-close");
    const el = state.modalReturnFocus;
    state.modalReturnFocus = null;
    if (el && typeof el.focus === "function" && document.contains(el)) el.focus();
    const active2 = document.activeElement;
    if (active2 && active2.closest && active2.closest(".remap-modal")) {
      const anchor = [...document.querySelectorAll(".topbar button:not([disabled])")].find((b) => b.offsetParent !== null);
      if (anchor && typeof anchor.focus === "function") anchor.focus();
      else if (typeof active2.blur === "function") active2.blur();
    }
  }
  var confirmResolve = null;
  var textInputResolve = null;
  function confirmModal({ message, okText = "\u786E\u5B9A", cancelText = "\u53D6\u6D88", danger = false, title = "\u786E\u8BA4\u4E00\u4E0B" } = {}) {
    return new Promise((resolve) => {
      const modal = els.confirmModal;
      if (!modal || !els.confirmModalOk) {
        console.warn("Confirm dialog is unavailable; cancelling guarded action.");
        resolve(false);
        return;
      }
      if (els.confirmModalTitle) els.confirmModalTitle.textContent = title;
      if (els.confirmModalMessage) els.confirmModalMessage.textContent = message;
      els.confirmModalOk.textContent = okText;
      if (els.confirmModalCancel) els.confirmModalCancel.textContent = cancelText;
      els.confirmModalOk.classList.toggle("danger-button", danger);
      els.confirmModalOk.classList.toggle("primary-button", !danger);
      confirmResolve = resolve;
      state.confirmModalOpen = true;
      modal.classList.add("show");
      modal.setAttribute("aria-hidden", "false");
      onModalOpened(modal);
      if (els.confirmModalCancel) els.confirmModalCancel.focus();
    });
  }
  function resolveConfirm(result) {
    if (!state.confirmModalOpen) return;
    state.confirmModalOpen = false;
    if (els.confirmModal) {
      els.confirmModal.classList.remove("show");
      els.confirmModal.setAttribute("aria-hidden", "true");
    }
    const resolve = confirmResolve;
    confirmResolve = null;
    restoreModalFocus();
    if (resolve) resolve(Boolean(result));
  }
  function textInputModal({
    title = "\u6539\u4E2A\u540D\u5B57",
    label = "\u540D\u79F0",
    value = "",
    hint = "",
    okText = "\u4FDD\u5B58",
    cancelText = "\u53D6\u6D88",
    maxLength = 20
  } = {}) {
    return new Promise((resolve) => {
      const modal = els.textInputModal;
      const input = els.textInputModalInput;
      if (!modal || !input || !els.textInputModalOk) {
        console.warn("Text input dialog is unavailable; cancelling input action.");
        resolve(null);
        return;
      }
      if (els.textInputModalTitle) els.textInputModalTitle.textContent = title;
      if (els.textInputModalLabel) els.textInputModalLabel.textContent = label;
      if (els.textInputModalHint) {
        els.textInputModalHint.textContent = hint || "";
        els.textInputModalHint.hidden = !hint;
      }
      input.value = String(value || "");
      input.maxLength = Math.max(1, Number(maxLength) || 20);
      els.textInputModalOk.textContent = okText;
      if (els.textInputModalCancel) els.textInputModalCancel.textContent = cancelText;
      textInputResolve = resolve;
      state.textInputModalOpen = true;
      modal.classList.add("show");
      modal.setAttribute("aria-hidden", "false");
      onModalOpened(modal);
      input.focus();
      input.select();
    });
  }
  function resolveTextInput(result) {
    if (!state.textInputModalOpen) return;
    const value = result ? els.textInputModalInput?.value ?? "" : null;
    state.textInputModalOpen = false;
    if (els.textInputModal) {
      els.textInputModal.classList.remove("show");
      els.textInputModal.setAttribute("aria-hidden", "true");
    }
    const resolve = textInputResolve;
    textInputResolve = null;
    restoreModalFocus();
    if (resolve) resolve(value);
  }
  function openShareModal() {
    if (!els.shareModal) return;
    state.shareModalOpen = true;
    els.shareModal.classList.add("show");
    els.shareModal.setAttribute("aria-hidden", "false");
    modalActions.uiRenderSharePanel();
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
  function closeOnboardingModal() {
    if (!els.onboardingModal) return;
    state.onboardingModalOpen = false;
    els.onboardingModal.classList.remove("show");
    els.onboardingModal.setAttribute("aria-hidden", "true");
    try {
      localStorage.setItem(onboardingKey, "seen");
    } catch {
    }
    restoreModalFocus();
  }
  function maybeShowOnboarding() {
    if (state.sandboxMode) return;
    if (getOpenModalEl()) return;
    let seen = false;
    try {
      seen = localStorage.getItem(onboardingKey) === "seen";
    } catch {
      seen = false;
    }
    if (seen) return;
    try {
      localStorage.setItem(onboardingKey, "seen");
    } catch {
    }
  }
  function openRemapModal(focusSource = null) {
    if (state.phase !== "choose") return;
    state.remapFocusSource = focusSource || null;
    state.remapModalOpen = true;
    if (els.remapModal) {
      els.remapModal.classList.add("show");
      els.remapModal.setAttribute("aria-hidden", "false");
    }
    modalActions.renderRemapModal();
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

  // src/icons.js
  var PATHS = {
    // —— Navigation / topbar ——
    "arrow-left": '<path d="m12 19l-7-7l7-7m7 7H5"/>',
    "arrow-right": '<path d="m12 5l7 7l-7 7m-7-7h14"/>',
    "chevron-right": '<path d="m9 18l6-6l-6-6"/>',
    search: '<circle cx="11" cy="11" r="8"/><path d="m21 21l-4.3-4.3"/>',
    settings: '<path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0a2.34 2.34 0 0 0 3.319 1.915a2.34 2.34 0 0 1 2.33 4.033a2.34 2.34 0 0 0 0 3.831a2.34 2.34 0 0 1-2.33 4.033a2.34 2.34 0 0 0-3.319 1.915a2.34 2.34 0 0 1-4.659 0a2.34 2.34 0 0 0-3.32-1.915a2.34 2.34 0 0 1-2.33-4.033a2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"/><circle cx="12" cy="12" r="3"/>',
    "refresh-cw": '<path d="M3 12a9 9 0 0 1 9-9a9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5m5 4a9 9 0 0 1-9 9a9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/>',
    "rotate-ccw": '<path d="M3 12a9 9 0 1 0 9-9a9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/>',
    // —— Entry (home four-up grid) ——
    // pegboard: bead board (custom, maps to the bead grid)
    pegboard: '<rect x="4" y="4" width="16" height="16" rx="2"/><path d="M4 10H20M4 14H20M10 4V20M14 4V20"/>',
    pencil: '<path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497zM15 5l4 4"/>',
    image: '<rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15l-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>',
    "clipboard-list": '<rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2m4 7h4m-4 5h4m-8-5h.01M8 16h.01"/>',
    "message-circle": '<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22z"/>',
    heart: '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2c-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>',
    // —— Drawing studio tools ——
    paintbrush: '<path d="m14.622 17.897l-10.68-2.913M18.376 2.622a1 1 0 1 1 3.002 3.002L17.36 9.643a.5.5 0 0 0 0 .707l.944.944a2.41 2.41 0 0 1 0 3.408l-.944.944a.5.5 0 0 1-.707 0L8.354 7.348a.5.5 0 0 1 0-.707l.944-.944a2.41 2.41 0 0 1 3.408 0l.944.944a.5.5 0 0 0 .707 0zM9 8c-1.804 2.71-3.97 3.46-6.583 3.948a.507.507 0 0 0-.302.819l7.32 8.883a1 1 0 0 0 1.185.204C12.735 20.405 16 16.792 16 15"/>',
    eraser: '<path d="M21 21H8a2 2 0 0 1-1.42-.587l-3.994-3.999a2 2 0 0 1 0-2.828l10-10a2 2 0 0 1 2.829 0l5.999 6a2 2 0 0 1 0 2.828L12.834 21m-7.752-9.91l8.828 8.828"/>',
    "paint-bucket": '<path d="M11 7L6 2m12.992 10H2.041m19.104 6.38A3.34 3.34 0 0 1 20 16.5a3.3 3.3 0 0 1-1.145 1.88c-.575.46-.855 1.02-.855 1.595A2 2 0 0 0 20 22a2 2 0 0 0 2-2.025c0-.58-.285-1.13-.855-1.595M8.5 4.5l2.148-2.148a1.205 1.205 0 0 1 1.704 0l7.296 7.296a1.205 1.205 0 0 1 0 1.704l-7.592 7.592a3.615 3.615 0 0 1-5.112 0l-3.888-3.888a3.615 3.615 0 0 1 0-5.112L5.67 7.33"/>',
    square: '<rect width="18" height="18" x="3" y="3" rx="2"/>',
    circle: '<circle cx="12" cy="12" r="10"/>',
    pipette: '<path d="m12 9l-8.414 8.414A2 2 0 0 0 3 18.828v1.344a2 2 0 0 1-.586 1.414A2 2 0 0 1 3.828 21h1.344a2 2 0 0 0 1.414-.586L15 12"/><path d="m18 9l.4.4a1 1 0 1 1-3 3l-3.8-3.8a1 1 0 1 1 3-3l.4.4l3.4-3.4a1 1 0 1 1 3 3zM2 22l.414-.414"/>',
    "undo-2": '<path d="M9 14L4 9l5-5"/><path d="M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5a5.5 5.5 0 0 1-5.5 5.5H11"/>',
    // —— Common actions ——
    "trash-2": '<path d="M10 11v6m4-6v6m5-11v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>',
    plus: '<path d="M5 12h14M12 5v14"/>',
    minus: '<path d="M5 12h14"/>',
    // star: library pin/favorite. Fill via CSS (fill:currentColor) when active.
    star: '<path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.12 2.12 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.12 2.12 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.12 2.12 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.12 2.12 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.12 2.12 0 0 0 1.597-1.16z"/>',
    upload: '<path d="M12 3v12m5-7l-5-5l-5 5m14 7v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>',
    download: '<path d="M12 15V3m9 12v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10l5 5l5-5"/>',
    "share-2": '<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.59 13.51l6.83 3.98m-.01-10.98l-6.82 3.98"/>',
    copy: '<rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>',
    check: '<path d="M20 6L9 17l-5-5"/>',
    scaling: '<path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M14 15H9v-5m7-7h5v5m0-5L9 15"/>',
    sparkles: '<path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594zM20 2v4m2-2h-4"/><circle cx="4" cy="20" r="2"/>',
    // —— Inspect / settings states ——
    eye: '<path d="M2.062 12.348a1 1 0 0 1 0-.696a10.75 10.75 0 0 1 19.876 0a1 1 0 0 1 0 .696a10.75 10.75 0 0 1-19.876 0"/><circle cx="12" cy="12" r="3"/>',
    "eye-off": '<path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575a1 1 0 0 1 0 .696a10.8 10.8 0 0 1-1.444 2.49m-6.41-.679a3 3 0 0 1-4.242-4.242"/><path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151a1 1 0 0 1 0-.696a10.75 10.75 0 0 1 4.446-5.143M2 2l20 20"/>',
    reply: '<path d="M20 18v-2a4 4 0 0 0-4-4H4"/><path d="m9 17l-5-5l5-5"/>',
    "flask-conical": '<path d="M14 2v6a2 2 0 0 0 .245.96l5.51 10.08A2 2 0 0 1 18 22H6a2 2 0 0 1-1.755-2.96l5.51-10.08A2 2 0 0 0 10 8V2M6.453 15h11.094M8.5 2h7"/>',
    x: '<path d="M18 6L6 18M6 6l12 12"/>',
    "badge-check": '<path d="M3.85 8.62a4 4 0 0 1 4.78-4.77a4 4 0 0 1 6.74 0a4 4 0 0 1 4.78 4.78a4 4 0 0 1 0 6.74a4 4 0 0 1-4.77 4.78a4 4 0 0 1-6.75 0a4 4 0 0 1-4.78-4.77a4 4 0 0 1 0-6.76"/><path d="m9 12l2 2l4-4"/>',
    "badge-x": '<path d="M3.85 8.62a4 4 0 0 1 4.78-4.77a4 4 0 0 1 6.74 0a4 4 0 0 1 4.78 4.78a4 4 0 0 1 0 6.74a4 4 0 0 1-4.77 4.78a4 4 0 0 1-6.75 0a4 4 0 0 1-4.78-4.77a4 4 0 0 1 0-6.76M15 9l-6 6m0-6l6 6"/>'
  };
  function escapeAttribute(value) {
    return String(value).replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
  }
  function icon(name, opts = {}) {
    const body = PATHS[name];
    if (!body) {
      if (typeof console !== "undefined") console.warn(`[icons] unknown icon: ${name}`);
      return "";
    }
    const size = Number(opts.size) > 0 ? Number(opts.size) : 18;
    const sw = Number(opts.strokeWidth) > 0 ? Number(opts.strokeWidth) : 2;
    const classes = `${opts.class || ""} lucide-icon`.trim().split(/\s+/).filter(Boolean);
    const cls = ` class="${escapeAttribute([...new Set(classes)].join(" "))}"`;
    const a11y = opts.label ? ` role="img" aria-label="${escapeAttribute(opts.label)}"` : ' aria-hidden="true"';
    return `<svg${cls} viewBox="0 0 24 24" width="${size}" height="${size}" fill="none" stroke="currentColor" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round"${a11y}>${body}</svg>`;
  }
  function hasIcon(name) {
    return Object.prototype.hasOwnProperty.call(PATHS, name);
  }
  function hydrateIcons(root = document) {
    if (!root?.querySelectorAll) return 0;
    let hydrated = 0;
    root.querySelectorAll("[data-lucide-icon]").forEach((placeholder) => {
      const name = placeholder.dataset.lucideIcon;
      if (!hasIcon(name)) {
        if (typeof console !== "undefined") console.warn(`[icons] unknown icon: ${name}`);
        return;
      }
      const className = [
        typeof placeholder.className === "string" ? placeholder.className : "",
        placeholder.dataset.iconClass || ""
      ].filter(Boolean).join(" ");
      placeholder.outerHTML = icon(name, {
        size: placeholder.dataset.iconSize,
        strokeWidth: placeholder.dataset.iconStrokeWidth,
        class: className,
        label: placeholder.dataset.iconLabel
      });
      hydrated += 1;
    });
    return hydrated;
  }

  // src/workflow.js
  function workflowSummary(phases2, phaseId) {
    const index2 = Math.max(0, phases2.findIndex((phase) => phase.id === phaseId));
    return {
      index: index2,
      total: phases2.length,
      current: phases2[index2]?.name || "",
      next: phases2[index2 + 1]?.name || ""
    };
  }

  // src/ui.js
  var uiActions = {
    getCollection: () => [],
    updateCollection: () => {
    },
    loadPattern: () => {
    },
    setPhase: () => {
    },
    openRemapModal: () => {
    },
    setPatternColorMapping: () => {
    },
    resetPatternColorMapping: () => {
    },
    pourSelectedColor: () => {
    },
    clearBoard: () => {
    },
    startIroning: () => {
    },
    pressFlat: () => {
    },
    flipAndIron: () => {
    },
    completeWork: () => {
    },
    saveCurrentWork: () => {
    },
    openShareModal: () => {
    },
    openCollectionEntry: () => {
    },
    exportShareImage: () => {
    },
    copyShareText: () => {
    },
    createCloudShare: async () => null,
    importPatternCode: async () => false,
    openImportCodeModal: () => {
    },
    submitCurrentToGallery: () => {
    },
    triggerHaptic: () => {
    },
    returnTweezerBead: () => {
    },
    tweezerFromBox: () => {
    }
  };
  function setUIActions(nextActions = {}) {
    uiActions = { ...uiActions, ...nextActions };
  }
  var desktopActionSlot = els.stageControls?.parentElement || null;
  var desktopActionSlotNext = els.stageControls?.nextElementSibling || null;
  var mobileActionSlot = els.mobileActionHost || document.getElementById("mobileActionHost");
  function mountActionControls() {
    if (!els.stageControls) return;
    const mobileWorking = useStackedMobileLayout() && state.phase !== "choose";
    els.stageControls.dataset.mobilePhase = mobileWorking ? state.phase : "";
    const host = mobileWorking ? mobileActionSlot : desktopActionSlot;
    if (!host || els.stageControls.parentElement === host) return;
    if (!mobileWorking && desktopActionSlotNext?.parentElement === host) {
      host.insertBefore(els.stageControls, desktopActionSlotNext);
    } else {
      host.appendChild(els.stageControls);
    }
  }
  if (typeof window !== "undefined" && window.matchMedia) {
    const mq = window.matchMedia("(max-width: 860px)");
    mq.addEventListener?.("change", () => mountActionControls());
  }
  function setSizeControls(size) {
    const normalized = Number(size);
    if (els.patternSizeSlider) {
      els.patternSizeSlider.value = String(normalized);
      const min = Number(els.patternSizeSlider.min) || 12;
      const max = Number(els.patternSizeSlider.max) || 100;
      const progress = Math.max(0, Math.min(1, (normalized - min) / Math.max(1, max - min)));
      els.patternSizeSlider.style.setProperty("--size-progress", `${Math.round(progress * 100)}%`);
    }
    if (els.patternSizeValue) els.patternSizeValue.textContent = String(normalized);
    if (els.customSizeMeta) els.customSizeMeta.textContent = `${normalized}x${normalized}`;
  }
  var patternColorStatsRenderKey = "";
  function renderPatternColorStats() {
    if (!els.patternColorStats) return;
    const sourceCounts = getSourceCounts();
    const map = state.patternColorMap || {};
    const activeCodes = new Set(allColorCodes());
    const items = Object.entries(sourceCounts).map(([sourceCode, count]) => {
      const targetCode = activeCodes.has(map[sourceCode]) ? map[sourceCode] : sourceCode;
      return { sourceCode, targetCode, count };
    }).sort((a, b) => b.count - a.count || (beadIds[a.targetCode] || a.targetCode).localeCompare(beadIds[b.targetCode] || b.targetCode, "zh-Hans-CN", { numeric: true })).slice(0, 10);
    const key = items.map((item) => `${item.sourceCode}:${item.targetCode}:${item.count}`).join("|");
    if (key === patternColorStatsRenderKey) return;
    patternColorStatsRenderKey = key;
    els.patternColorStats.innerHTML = items.map((item) => `
      <button type="button" class="pattern-color-chip" data-source-code="${escapeHtml(item.sourceCode)}" title="\u70B9\u51FB\u6362\u8272\uFF1A${escapeHtml(beadIds[item.targetCode] || item.targetCode)}" aria-label="\u6362\u8272 ${escapeHtml(beadIds[item.targetCode] || item.targetCode)}">
        <span class="dot" style="background:${escapeHtml(palette[item.targetCode])}"></span>
        <span class="code">${escapeHtml(beadIds[item.targetCode] || item.targetCode)}</span>
        <span class="count">${Number(item.count) || 0}</span>
      </button>
    `).join("");
    els.patternColorStats.querySelectorAll(".pattern-color-chip[data-source-code]").forEach((button) => {
      button.addEventListener("click", () => {
        const sourceCode = button.getAttribute("data-source-code");
        if (sourceCode) uiActions.openRemapModal(sourceCode);
      });
    });
  }
  var sidebarReferenceRenderKey = "";
  function renderSidebarReference() {
    if (!els.sideReference || !sideReferenceCanvas || !sideReferenceCtx) return;
    const visible = !["choose", "cool", "finish"].includes(state.phase);
    els.sideReference.hidden = !visible;
    els.sideReference.style.display = visible ? "" : "none";
    if (!visible) {
      sidebarReferenceRenderKey = "hidden";
      return;
    }
    const pattern = state.selectedPattern;
    const cols = boardCols(pattern);
    const rowCount = boardRows(pattern);
    const ctx2 = sideReferenceCtx;
    const rect = sideReferenceCanvas.getBoundingClientRect();
    const cssW = Math.max(1, Math.round(rect.width || 300));
    const cssH = Math.max(1, Math.round(rect.height || cssW));
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const pixelW = Math.max(1, Math.round(cssW * dpr));
    const pixelH = Math.max(1, Math.round(cssH * dpr));
    const effective = getEffectivePatternResult(pattern);
    const key = `${baseIdFor(pattern)}:${effective.key}:${cssW}x${cssH}:${dpr}`;
    if (key === sidebarReferenceRenderKey) return;
    sidebarReferenceRenderKey = key;
    if (sideReferenceCanvas.width !== pixelW || sideReferenceCanvas.height !== pixelH) {
      sideReferenceCanvas.width = pixelW;
      sideReferenceCanvas.height = pixelH;
    }
    ctx2.setTransform(1, 0, 0, 1, 0, 0);
    ctx2.clearRect(0, 0, pixelW, pixelH);
    ctx2.setTransform(dpr, 0, 0, dpr, 0, 0);
    const w = cssW;
    const h = cssH;
    const rows = effective.rows;
    const theme = currentBackgroundTheme();
    drawPixelPatternPreview(ctx2, {
      width: w,
      height: h,
      cols,
      rows: rowCount,
      pixels: rows,
      colors: palette,
      brand: theme.brand,
      table: theme.table
    });
    if (els.sideReferenceMeta) {
      els.sideReferenceMeta.textContent = `${pattern.name} \xB7 ${cols}x${rowCount}`;
    }
    if (els.sideReferenceLegend) {
      const counts = getTargetCounts(pattern);
      const list = Object.entries(counts).sort((a, b) => b[1] - a[1] || (beadIds[a[0]] || a[0]).localeCompare(beadIds[b[0]] || b[0], "zh-Hans-CN", { numeric: true })).slice(0, 8);
      els.sideReferenceLegend.innerHTML = list.map(([code, count]) => `
        <span class="side-reference-chip">
          <i style="background:${escapeHtml(palette[code])}"></i>
          <b>${escapeHtml(beadIds[code] || code)}</b>
          <em>${Number(count) || 0}</em>
        </span>
      `).join("");
    }
  }
  function makeLibraryToolbarButton(label, iconName, onClick, extraClass = "") {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `library-tool-button${extraClass ? ` ${extraClass}` : ""}`;
    button.innerHTML = `${icon(iconName, { size: 16 })}<span>${escapeHtml(label)}</span>`;
    button.addEventListener("click", onClick);
    return button;
  }
  function renderPatterns() {
    const prevScroll = els.patternList.querySelector(".library-scroll")?.scrollTop || 0;
    els.patternList.innerHTML = "";
    const view = getLibraryView();
    if (els.patternMeta) els.patternMeta.textContent = view.length ? `${view.length} \u5F20\u56FE\u7EB8` : "";
    const scroll = document.createElement("div");
    scroll.className = "library-scroll";
    if (!view.length) {
      const empty = document.createElement("div");
      empty.className = "library-empty";
      empty.innerHTML = `<strong>\u56FE\u7EB8\u5E93\u662F\u7A7A\u7684</strong><span>\u7528\u4E0B\u65B9\u7684\u5206\u4EAB\u7801\u5BFC\u5165\u4E00\u5F20\u56FE\u7EB8\u5427\u3002</span>`;
      scroll.appendChild(empty);
    } else {
      scroll.appendChild(buildLibraryGrid(view));
    }
    els.patternList.appendChild(scroll);
    scroll.scrollTop = prevScroll;
    const footer = document.createElement("div");
    footer.className = "library-footer";
    footer.append(makeLibraryToolbarButton(
      "\u5BFC\u5165\u5206\u4EAB\u7801",
      "upload",
      () => uiActions.openImportCodeModal(),
      "library-add-code"
    ));
    if (hasHiddenDefaults()) {
      footer.append(makeLibraryToolbarButton("\u6062\u590D\u9ED8\u8BA4", "refresh-cw", () => {
        restoreDefaults();
        renderPatterns();
        showToast("\u5DF2\u6062\u590D\u9ED8\u8BA4\u56FE\u7EB8\u3002");
      }, "library-tool-button-restore"));
    }
    els.patternList.appendChild(footer);
  }
  function buildLibraryGrid(view) {
    const grid = document.createElement("div");
    grid.className = "library-grid";
    const activeId = baseIdFor(state.selectedPattern);
    view.forEach((pattern) => {
      const isCustom = !isDefaultPatternId(pattern.id);
      const displayPattern = isCustom ? pattern : resizePattern(pattern, state.patternSize);
      const card = document.createElement("div");
      card.className = `library-card${activeId === pattern.id ? " active" : ""}`;
      const open = document.createElement("button");
      open.type = "button";
      open.className = "library-card-open";
      open.setAttribute("aria-label", `\u5F00\u59CB\u62FC ${pattern.displayName}`);
      open.innerHTML = `<canvas class="pattern-thumb" width="120" height="120" aria-hidden="true"></canvas>`;
      open.addEventListener("click", () => {
        uiActions.loadPattern(displayPattern, true);
        uiActions.setPhase("place");
        showToast(`\u5F00\u59CB\u62FC ${pattern.displayName}`);
      });
      const actions = document.createElement("div");
      actions.className = "library-card-actions";
      const star = document.createElement("button");
      star.type = "button";
      star.className = `library-card-star${pattern.starred ? " is-on" : ""}`;
      star.setAttribute("aria-label", pattern.starred ? "\u53D6\u6D88\u7F6E\u9876" : "\u661F\u6807\u7F6E\u9876");
      star.setAttribute("aria-pressed", String(pattern.starred));
      star.innerHTML = icon("star", { size: 16 });
      star.addEventListener("click", () => {
        toggleStar(pattern.id);
        renderPatterns();
      });
      const name = document.createElement("button");
      name.type = "button";
      name.className = "library-card-name";
      name.setAttribute("aria-label", `\u91CD\u547D\u540D ${pattern.displayName}`);
      name.innerHTML = `<strong>${escapeHtml(pattern.displayName)}</strong>`;
      name.addEventListener("click", async () => {
        const next = await textInputModal({
          title: "\u91CD\u547D\u540D\u56FE\u7EB8",
          label: "\u56FE\u7EB8\u540D",
          value: pattern.displayName,
          okText: "\u4FDD\u5B58",
          maxLength: 20
        });
        if (next == null) return;
        if (renameInLibrary(pattern.id, next)) renderPatterns();
      });
      const del = document.createElement("button");
      del.type = "button";
      del.className = "library-card-del";
      del.setAttribute("aria-label", `\u5220\u9664 ${pattern.displayName}`);
      del.innerHTML = icon("trash-2", { size: 15 });
      del.addEventListener("click", async () => {
        const ok = await confirmModal({
          message: `\u4ECE\u56FE\u7EB8\u5E93\u5220\u9664\u300C${pattern.displayName}\u300D\uFF1F`,
          okText: "\u5220\u9664",
          danger: true
        });
        if (!ok) return;
        removeFromLibrary(pattern.id);
        renderPatterns();
        showToast("\u5DF2\u4ECE\u56FE\u7EB8\u5E93\u5220\u9664\u3002");
      });
      actions.append(star, name, del);
      card.append(open, actions);
      grid.appendChild(card);
      drawPatternThumb(card.querySelector("canvas"), displayPattern, { referenceBoard: true });
    });
    return grid;
  }
  function drawPatternThumb(canvas, pattern, { referenceBoard = false } = {}) {
    const dpr = Math.min(3, Math.max(1, window.devicePixelRatio || 1));
    const fallback = Number(canvas.getAttribute("width")) || 58;
    const cssW = canvas.clientWidth || fallback;
    const cssH = canvas.clientHeight || cssW;
    const w = Math.round(cssW * dpr);
    const h = Math.round(cssH * dpr);
    if (canvas.width !== w) canvas.width = w;
    if (canvas.height !== h) canvas.height = h;
    const ctx2 = canvas.getContext("2d");
    const cols = boardCols(pattern);
    const rowCount = boardRows(pattern);
    const rows = pattern.rows || [];
    ctx2.clearRect(0, 0, w, h);
    const theme = currentBackgroundTheme();
    if (referenceBoard) {
      drawPixelPatternPreview(ctx2, {
        width: w,
        height: h,
        cols,
        rows: rowCount,
        pixels: rows,
        colors: palette,
        brand: theme.brand,
        table: theme.table
      });
      return;
    }
    drawPixelPatternPreview(ctx2, {
      width: w,
      height: h,
      cols,
      rows: rowCount,
      pixels: rows,
      colors: palette,
      brand: theme.brand,
      table: theme.table,
      compact: true,
      shadow: false
    });
  }
  function resetPhaseViewport() {
    const reset = () => {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    };
    reset();
    window.requestAnimationFrame(() => {
      reset();
      window.requestAnimationFrame(reset);
    });
    window.setTimeout(reset, 120);
  }
  function renderPhases() {
    if (!els.workflowProgress) return;
    const activeIndex = phases.findIndex((phase) => phase.id === state.phase);
    els.workflowProgress.innerHTML = "";
    phases.forEach((phase, index2) => {
      if (index2 > 0) {
        const sep = document.createElement("span");
        sep.className = "workflow-sep";
        sep.setAttribute("aria-hidden", "true");
        els.workflowProgress.appendChild(sep);
      }
      const item = document.createElement("button");
      item.type = "button";
      item.className = `workflow-step${index2 === activeIndex ? " active" : ""}${index2 < activeIndex ? " done" : ""}`;
      item.setAttribute("aria-label", `${index2 + 1} ${phase.name}`);
      item.innerHTML = `<span class="step-dot">${index2 + 1}</span><span>${phase.name}</span>`;
      item.disabled = index2 >= activeIndex;
      item.addEventListener("click", async () => {
        if (index2 >= activeIndex) return;
        const target = phase.id;
        if (target === "choose") {
          if ((placedCount2() > 0 || state.fusedPieces.length > 0) && !await confirmModal({ message: "\u56DE\u5230\u9009\u56FE\u4F1A\u79BB\u5F00\u5F53\u524D\u4F5C\u54C1\u7684\u8FDB\u5EA6\uFF0C\u786E\u5B9A\u5417\uFF1F", okText: "\u56DE\u5230\u9009\u56FE", danger: true })) {
            return;
          }
          uiActions.setPhase("choose");
          return;
        }
        const losesFused = state.fusedPieces.length > 0 && (target === "place" || target === "inspect" || target === "iron");
        if (losesFused && !await confirmModal({ message: "\u56DE\u9000\u5230\u8BE5\u6B65\u4F1A\u6E05\u9664\u5DF2\u71A8\u70EB/\u51B7\u5374\u7684\u7ED3\u679C\uFF0C\u786E\u5B9A\u5417\uFF1F", okText: "\u56DE\u9000", danger: true })) {
          return;
        }
        uiActions.setPhase(target);
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
        behavior: prefersReducedMotion() ? "auto" : "smooth"
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
      els.currentPatternMeta.textContent = `${boardCols()}\xD7${boardRows()} \xB7 ${getTargetTotal()}\u9897 \xB7 ${colorCount}\u8272`;
    }
    if (els.currentPatternThumb) {
      drawPatternThumb(els.currentPatternThumb, state.selectedPattern);
    }
  }
  function renderMobileWorkflowSummary() {
    if (!els.mobileWorkflowSummary) return;
    const visible = state.phase !== "choose";
    els.mobileWorkflowSummary.hidden = !visible;
    if (!visible) return;
    const summary = workflowSummary(phases, state.phase);
    if (els.mobilePatternName) els.mobilePatternName.textContent = state.selectedPattern.name;
    if (els.mobileWorkflowCurrent) {
      els.mobileWorkflowCurrent.textContent = `${summary.index + 1}/${summary.total} \xB7 ${summary.current}`;
    }
    if (els.mobileWorkflowNext) {
      els.mobileWorkflowNext.textContent = summary.next ? `\u4E0B\u4E00\u6B65 ${summary.next}` : "\u6700\u540E\u4E00\u6B65";
    }
    if (els.mobilePatternThumb) drawPatternThumb(els.mobilePatternThumb, state.selectedPattern);
  }
  function renderMobileSelectionSummary() {
    if (!els.mobileSelectionSummary) return;
    const visible = state.phase === "choose";
    els.mobileSelectionSummary.hidden = !visible;
    if (!visible) return;
    const counts = getTargetCounts();
    if (els.mobileSelectionName) els.mobileSelectionName.textContent = state.selectedPattern.name;
    if (els.mobileSelectionMeta) {
      els.mobileSelectionMeta.textContent = `${boardCols()}\xD7${boardRows()} \xB7 ${getTargetTotal()}\u9897 \xB7 ${Object.keys(counts).length}\u8272`;
    }
    if (els.mobileSelectionThumb) drawPatternThumb(els.mobileSelectionThumb, state.selectedPattern);
  }
  function renderControls() {
    mountActionControls();
    els.stageControls.innerHTML = "";
    els.controlTitle.textContent = phases.find((phase) => phase.id === state.phase)?.name || "\u5DE5\u5177\u53F0";
    els.toolMeta.textContent = state.phase === "place" && !useMobileDirectPlacement() ? state.tool === "needle" ? "\u8C46\u9488" : `\u954A\u5B50${state.tweezerBead ? ` \xB7 ${beadIds[state.tweezerBead]}` : " \xB7 \u7A7A\u5939"}` : "";
    if (state.phase === "choose") {
      return;
    }
    if (state.phase === "place") {
      if (state.spill) {
        showPlaceHint(
          "\u6709\u4E00\u9897\u8C46\u5B50\u5012\u4E0B\u6765\u5361\u4F4F\u4E86\u3002\u4F60\u53EF\u4EE5\u5148\u7EE7\u7EED\u6446\u653E\uFF0C\u71A8\u70EB\u524D\u8BB0\u5F97\u5904\u7406\u3002",
          `spill:${state.spill.index}:${state.spill.code}`
        );
      } else {
        hidePlaceHint();
      }
      addButton("\u68C0\u67E5\u4F5C\u54C1", "primary-button", () => uiActions.setPhase("inspect"));
      addButton("\u6E05\u7A7A\u677F\u9762", "danger-text-button", () => uiActions.clearBoard?.(), false, {
        icon: icon("trash-2", { size: 16 })
      });
      return;
    }
    if (state.phase === "inspect") {
      const summary = inspectionSummary();
      if (!state.sandboxMode) {
        addInspectStats(summary);
      }
      if (state.spill) {
        addHint("\u8FD8\u6709\u5012\u4E0B\u7684\u8C46\u5B50\u6CA1\u5939\u8D77\u3002\u7EE7\u7EED\u71A8\u70EB\u4F1A\u628A\u8FD9\u9897\u8C46\u7CCA\u5728\u677F\u9762\u4E0A\u3002");
      }
      const hintsOn = state.showHints;
      addControlRow([
        [hintsOn ? "\u9690\u85CF\u63D0\u793A" : "\u663E\u793A\u63D0\u793A", `inspect-action-btn ${hintsOn ? "active" : ""}`, () => {
          state.showHints = !state.showHints;
          markDirty();
        }, false, {
          icon: icon(hintsOn ? "eye-off" : "eye", { size: 16 }),
          ariaLabel: hintsOn ? "\u9690\u85CF\u63D0\u793A" : "\u663E\u793A\u63D0\u793A",
          title: hintsOn ? "\u9690\u85CF\u63D0\u793A" : "\u663E\u793A\u63D0\u793A"
        }],
        ["\u8FD4\u56DE\u4FEE\u6B63", "inspect-action-btn", () => uiActions.setPhase("place"), false, {
          icon: icon("reply", { size: 16 }),
          ariaLabel: "\u8FD4\u56DE\u4FEE\u6B63",
          title: "\u8FD4\u56DE\u4FEE\u6B63"
        }]
      ], "control-row-icons");
      if (state.spill) {
        addControlRow([
          ["\u5148\u53BB\u5939\u8D77", "", () => uiActions.setPhase("place")],
          ["\u4ECD\u7136\u71A8\u70EB", "danger-button", () => uiActions.startIroning(true)]
        ]);
      } else {
        addButton("\u76D6\u7EB8\u71A8\u70EB", "primary-button", () => uiActions.startIroning(false), !state.sandboxMode && state.errors.length > 0 && placementAccuracy() < 0.72);
      }
      return;
    }
    if (state.phase === "iron") {
      addControlRow([
        ["\u67E5\u770B\u68C0\u67E5", "", () => uiActions.setPhase("inspect")],
        ["\u8FDB\u5165\u51B7\u5374", "primary-button", () => uiActions.setPhase("cool")]
      ]);
      return;
    }
    if (state.phase === "cool") {
      addControlRow([
        ["\u538B\u5E73", "", () => uiActions.pressFlat()],
        ["\u7FFB\u9762\u518D\u71A8", "", () => uiActions.flipAndIron(), state.flipCount >= 1]
      ]);
      addButton("\u5B8C\u6210\u6536\u85CF", "primary-button", () => uiActions.completeWork());
      return;
    }
    if (state.phase === "finish") {
      if (state.conceptEaster) {
        const full = state.conceptEasterType === "full";
        addHint(full ? "\u6EE1\u677F\u5F69\u86CB\u5DF2\u89E3\u9501\u3002" : "\u7A7A\u677F\u5F69\u86CB\u5DF2\u89E3\u9501\u3002");
        addHint(`\u9690\u85CF\u6210\u5C31\uFF1A${full ? "\u6EE1\u677F" : "\u7A7A\u677F"}`);
        addControlRow([
          ["\u4FDD\u5B58\u4F5C\u54C1", "primary-button", () => uiActions.saveCurrentWork()],
          ["\u518D\u505A\u4E00\u5F20", "", () => {
            uiActions.loadPattern(state.selectedPattern);
            uiActions.setPhase("choose");
          }]
        ]);
        addButton("\u5206\u4EAB\u5C0F\u7EA2\u4E66", "", () => uiActions.openShareModal());
        return;
      }
      addCraftToggle();
      addControlRow([
        ["\u4FDD\u5B58\u4F5C\u54C1", "primary-button", () => uiActions.saveCurrentWork()],
        ["\u518D\u505A\u4E00\u5F20", "", () => {
          uiActions.loadPattern(state.selectedPattern);
          uiActions.setPhase("choose");
        }]
      ]);
      addButton("\u5206\u4EAB\u5C0F\u7EA2\u4E66", "", () => uiActions.openShareModal());
    }
  }
  function addButton(label, className, handler, disabled = false, options = {}) {
    const button = document.createElement("button");
    button.type = "button";
    if (options.icon) {
      button.innerHTML = `<span class="btn-glyph" aria-hidden="true">${options.icon}</span><span class="btn-label">${escapeHtml(label)}</span>`;
      button.classList.add("icon-text-button");
    } else {
      button.textContent = label;
    }
    button.className = `${button.className} ${className || ""}`.trim();
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
  function addInspectStats(summary) {
    const wrap = document.createElement("div");
    wrap.className = "inspect-stats";
    wrap.setAttribute("role", "group");
    wrap.setAttribute("aria-label", "\u68C0\u67E5\u7ED3\u679C");
    const stats = [
      { key: "missing", label: "\u6F0F\u653E", value: summary.missing },
      { key: "wrong", label: "\u9519\u8272", value: summary.wrong },
      { key: "extra", label: "\u591A\u653E", value: summary.extra }
    ];
    wrap.innerHTML = stats.map(({ key, label, value }) => `<span class="inspect-stat is-${key}${value > 0 ? "" : " is-zero"}">${label}<b>${value}</b></span>`).join("");
    els.stageControls.appendChild(wrap);
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
        state.craftSwitchAt = performance.now();
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
    const trayLabel = state.trayColor ? beadIds[state.trayColor] : "\u7A7A";
    const needleCap = needleCapacity();
    const needleSlots = Array.from({ length: needleCap }, (_, i) => i < state.needleLoaded ? state.trayColor : null);
    const tweezerSlots = [state.tweezerBead];
    const needleFoot = state.trayColor ? `\u8C46\u7B5B ${trayLabel} \xB7 \u5269\u4F59 ${state.trayBeans}` : "\u5148\u5012\u5165\u4E00\u79CD\u989C\u8272\uFF0C\u518D\u4ECE\u8C46\u7B5B\u53D6\u8C46";
    const needleFootText = state.spill ? "\u5148\u7528\u954A\u5B50\u5939\u8D77\u5361\u4F4F\u8C46" : needleFoot;
    const tweezerFoot = state.tweezerBead ? `\u5939\u7740 ${beadIds[state.tweezerBead]} \xB7 \u70B9\u6B64\u653E\u56DE` : `\u70B9\u8C46\u76D2\u8272\u53F7\u76F4\u63A5\u5939\u8D77`;
    els.toolRack.innerHTML = `
      <button type="button" class="tool-card${state.tool === "needle" ? " active" : ""}" data-tool="needle">
        <div class="tool-head"><span>\u8C46\u9488</span></div>
        ${renderBeadStrip(needleSlots)}
        <div class="tool-foot">${needleFootText}</div>
      </button>
      <button type="button" class="tool-card${state.tool === "tweezers" ? " active" : ""}" data-tool="tweezers">
        <div class="tool-head"><span>\u954A\u5B50</span><span class="tool-count">${state.tweezerBead ? "1/1" : "0/1"}</span></div>
        ${renderBeadStrip(tweezerSlots)}
        <div class="tool-foot">${tweezerFoot}</div>
      </button>
    `;
    els.toolRack.querySelectorAll("[data-tool]").forEach((button) => {
      button.addEventListener("click", () => {
        const tool = button.getAttribute("data-tool");
        if (!tool) return;
        if (state.tool === tool) {
          if (tool === "tweezers" && state.tweezerBead) uiActions.returnTweezerBead?.();
          return;
        }
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
  var paletteRenderKey = "";
  function renderPalette() {
    if (state.phase === "inspect") {
      if (useMobileDirectPlacement()) {
        els.colorPalette.classList.remove("inspect-mode");
        if (paletteRenderKey !== "inspect:mobile-hidden") {
          els.colorPalette.innerHTML = "";
          paletteRenderKey = "inspect:mobile-hidden";
        }
        return;
      }
      els.colorPalette.classList.add("inspect-mode");
      renderInspectAssistPanel();
      paletteRenderKey = "inspect";
      return;
    }
    els.colorPalette.classList.remove("inspect-mode");
    if (state.phase !== "place") {
      if (paletteRenderKey !== `phase:${state.phase}`) {
        els.colorPalette.innerHTML = "";
        paletteRenderKey = `phase:${state.phase}`;
      }
      return;
    }
    const isMobile = useMobileDirectPlacement();
    const counts = getTargetCounts();
    const placedCounts = getPlacedCounts();
    const allCodes = allColorCodes();
    const neededCodes = isMobile ? [] : allCodes.filter((code) => (counts[code] || 0) > 0);
    const neededSet = new Set(neededCodes);
    const rest = isMobile ? allCodes.filter((code) => (counts[code] || 0) > 0) : allCodes.filter((code) => !neededSet.has(code));
    const codes = isMobile ? rest : [...neededCodes, ...rest];
    const hasNeededGroup = !isMobile && neededCodes.length > 0;
    const neededHeaderAt = hasNeededGroup ? 0 : -1;
    const restHeaderAt = hasNeededGroup ? neededCodes.length : -1;
    const key = [
      "place",
      isMobile ? "m" : "d",
      state.selectedColor,
      state.tweezerBead || "",
      state.placedVersion,
      state.mobileColorPulseId,
      getPatternAnalysis().key
    ].join(":");
    if (key === paletteRenderKey) return;
    paletteRenderKey = key;
    els.colorPalette.innerHTML = "";
    const addHeader = (text) => {
      const h = document.createElement("div");
      h.className = "palette-group-head";
      h.setAttribute("aria-hidden", "true");
      h.textContent = text;
      els.colorPalette.appendChild(h);
    };
    codes.forEach((code, idx) => {
      if (idx === neededHeaderAt) addHeader(`\u672C\u56FE\u7528\u8272 \xB7 ${neededCodes.length}`);
      if (idx === restHeaderAt) addHeader("\u5168\u90E8\u989C\u8272");
      const placed = placedCounts[code] || 0;
      const needed = counts[code] || 0;
      const inPattern = needed > 0;
      const remaining = Math.max(0, needed - placed);
      const isSelected = state.selectedColor === code;
      const button = document.createElement("button");
      const isHeld = !isMobile && state.tweezerBead === code;
      const picked = isMobile && isSelected && state.mobileColorPulsePending;
      button.className = `color-chip${isSelected ? " active" : ""}${inPattern && !isMobile ? " needed" : ""}${isHeld ? " held" : ""}${picked ? " picked" : ""}`;
      button.type = "button";
      button.title = `${beadLabel(code)}\uFF1A${placed}/${needed}`;
      const isTransparent = beadIds[code] === "H1";
      button.innerHTML = `
        <span class="swatch${isTransparent ? " is-transparent" : ""}" style="${isTransparent ? "" : `background:${palette[code]}`}"></span>
        <span class="chip-label">${beadIds[code] || code}</span>
        ${inPattern && isSelected ? `<span class="chip-count">${remaining}</span>` : ""}
      `;
      button.addEventListener("click", () => {
        if (isMobile) {
          if (state.selectedColor === code) {
            state.selectedColor = null;
          } else {
            state.selectedColor = code;
            state.mobileColorPulseId += 1;
            state.mobileColorPulsePending = true;
            uiActions.triggerHaptic("light");
          }
        } else {
          state.selectedColor = code;
          if (state.phase === "place") {
            if (state.tool === "tweezers") uiActions.tweezerFromBox?.(code);
            else uiActions.pourSelectedColor?.();
          }
        }
        markDirty();
      });
      els.colorPalette.appendChild(button);
    });
    state.mobileColorPulsePending = false;
  }
  function updateSelectedPaletteCount() {
    if (!els.colorPalette || state.phase !== "place") return;
    const chip = els.colorPalette.querySelector(".color-chip.active");
    if (!chip) return;
    const counts = getTargetCounts();
    const placedCounts = getPlacedCounts();
    const placed = placedCounts[state.selectedColor] || 0;
    const needed = counts[state.selectedColor] || 0;
    const remaining = Math.max(0, needed - placed);
    chip.title = `${beadLabel(state.selectedColor)}\uFF1A${placed}/${needed}`;
    const count = chip.querySelector(".chip-count");
    if (count) count.textContent = String(remaining);
  }
  function renderInspectAssistPanel() {
    if (!els.colorPalette) return;
    if (!els.colorPalette.querySelector(".inspect-assist")) {
      els.colorPalette.innerHTML = `
        <div class="inspect-assist">
          <section class="inspect-card">
            <div class="inspect-card-head">
              <strong>\u5C40\u90E8\u653E\u5927\u955C</strong>
              <span>\u67E5\u770B\u5F53\u524D\u5B54\u4F4D\u4E0E\u90BB\u57DF</span>
            </div>
            <canvas class="inspect-canvas inspect-zoom" width="360" height="212" aria-label="\u5C40\u90E8\u653E\u5927\u955C"></canvas>
          </section>
          <section class="inspect-card">
            <div class="inspect-card-head">
              <strong>\u70EB\u5B8C\u9884\u89C8\u56FE</strong>
              <span>\u878D\u5408\u8F6E\u5ED3\u9884\u4F30</span>
            </div>
            <canvas class="inspect-canvas inspect-fuse" width="360" height="212" aria-label="\u70EB\u5B8C\u9884\u89C8\u56FE"></canvas>
          </section>
        </div>
      `;
    }
    updateInspectAssistCanvases();
  }
  function renderSharePanel() {
    els.sharePanel.innerHTML = "";
    const safePatternName = escapeHtml(state.selectedPattern.name);
    const card = document.createElement("div");
    card.className = "share-card";
    card.innerHTML = `
      <strong>${safePatternName}</strong>
      <span>${normalizeCraft(state.selectedPattern.craft)} \xB7 \u8BC4\u7EA7 ${state.phase === "finish" ? finalGrade() : scoreLabel()} \xB7 ${placedCount2()}/${getTargetTotal()} \u9897</span>
    `;
    els.sharePanel.appendChild(card);
    const row = document.createElement("div");
    row.className = "control-row three";
    [
      ["\u5BFC\u51FA\u7AD6\u56FE", () => uiActions.exportShareImage("portrait")],
      ["\u5BFC\u51FA\u65B9\u56FE", () => uiActions.exportShareImage("square")],
      ["\u7EAF\u4F5C\u54C1\u56FE", () => uiActions.exportShareImage("clean")]
    ].forEach(([label, handler]) => {
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = label;
      button.addEventListener("click", handler);
      row.appendChild(button);
    });
    els.sharePanel.appendChild(row);
    const cloudResult = document.createElement("div");
    cloudResult.className = "share-code-result";
    const cloudButton = document.createElement("button");
    cloudButton.type = "button";
    cloudButton.className = "primary-button";
    cloudButton.textContent = "\u751F\u6210\u5206\u4EAB\u7801";
    cloudButton.addEventListener("click", async () => {
      cloudButton.disabled = true;
      cloudButton.textContent = "\u751F\u6210\u4E2D";
      cloudResult.textContent = "";
      try {
        const share = await uiActions.createCloudShare();
        if (share?.shortId) {
          const title = String(share.name || state.selectedPattern?.name || "").trim().slice(0, 10);
          const display = title ? `\u3010${title}\u3011${share.shortId}` : share.shortId;
          cloudResult.innerHTML = `<strong>${escapeHtml(display)}</strong><span>7\u5929\u5185\u6709\u6548</span>`;
        }
      } finally {
        cloudButton.disabled = false;
        cloudButton.textContent = "\u751F\u6210\u5206\u4EAB\u7801";
      }
    });
    els.sharePanel.appendChild(cloudButton);
    els.sharePanel.appendChild(cloudResult);
    addShareButton("\u6295\u7A3F\u753B\u5ECA", () => uiActions.submitCurrentToGallery());
    addShareButton("\u590D\u5236\u6587\u6848", () => uiActions.copyShareText());
  }
  function addShareButton(label, handler) {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = label;
    button.addEventListener("click", handler);
    els.sharePanel.appendChild(button);
  }
  function renderCustomStats() {
    if (!els.customStats) return;
    const stats = state.selectedPattern.conversionStats;
    if (!stats) {
      els.customStats.classList.add("is-empty");
      els.customStats.innerHTML = "";
      return;
    }
    els.customStats.classList.remove("is-empty");
    const list = stats.colors.slice(0, 8).map((item) => `${beadIds[item.code]} ${item.count}`).join(" \xB7 ");
    els.customStats.innerHTML = `
      <strong>${stats.size}x${stats.size} \xB7 ${stats.total}\u9897 \xB7 ${stats.colors.length}\u8272</strong>
      <span>\u6E90\u56FE\u4F30\u8BA1 ${stats.sourceSignificantCount} \u8272 \xB7 \u805A\u7C7B ${stats.simplifiedColorCount} \u8272 \xB7 \u6E05\u7406\u524D ${stats.preCleanupColorCount} \u8272</span>
      <span>${stats.denoised ? "\u5DF2\u542F\u7528\u8F7B\u5EA6\u964D\u566A" : "\u4FDD\u7559\u50CF\u7D20\u8FB9\u7F18\uFF08\u672A\u964D\u566A\uFF09"}</span>
      <span>${list}${stats.colors.length > 8 ? " \xB7 \u2026" : ""}</span>
    `;
  }
  function renderCollection() {
    if (!els.collectionPanel) return;
    els.collectionPanel.innerHTML = "";
    const collection2 = uiActions.getCollection?.() || [];
    if (!collection2.length) {
      const empty = document.createElement("div");
      empty.className = "empty-state";
      empty.innerHTML = `${icon("clipboard-list", { size: 44, strokeWidth: 1.8, class: "empty-state-icon" })}<p class="empty-state-text">\u8FD8\u6CA1\u6709\u5B8C\u6210\u54C1</p><p class="empty-state-sub">\u505A\u5B8C\u7B2C\u4E00\u4EF6\uFF0C\u5B83\u5C31\u4F1A\u6446\u5728\u8FD9\u91CC\u3002</p><button type="button" class="primary-button" data-collection-start>\u53BB\u62FC\u8C46</button>`;
      empty.querySelector("[data-collection-start]")?.addEventListener("click", () => els.startBeadButton?.click());
      els.collectionPanel.appendChild(empty);
      return;
    }
    const toolbar = document.createElement("div");
    toolbar.className = "collection-toolbar";
    toolbar.innerHTML = `
      <span class="collection-toolbar-count">\u5171 ${collection2.length} \u4EF6</span>
      <button type="button" class="danger-text-button icon-text-button collection-clear-all">
        <span class="btn-glyph" aria-hidden="true">${icon("trash-2", { size: 16 })}</span>
        <span class="btn-label">\u6E05\u7A7A\u4F5C\u54C1\u96C6</span>
      </button>
    `;
    toolbar.querySelector(".collection-clear-all").addEventListener("click", async () => {
      if (!collection2.length) return;
      if (!await confirmModal({ message: "\u786E\u5B9A\u6E05\u7A7A\u6240\u6709\u4F5C\u54C1\uFF1F\u6B64\u64CD\u4F5C\u4E0D\u53EF\u64A4\u9500\u3002", okText: "\u6E05\u7A7A", danger: true })) return;
      uiActions.updateCollection([]);
      renderCollection();
      showToast("\u4F5C\u54C1\u96C6\u5DF2\u6E05\u7A7A\u3002");
    });
    els.collectionPanel.appendChild(toolbar);
    const grid = document.createElement("div");
    grid.className = "collection-grid";
    els.collectionPanel.appendChild(grid);
    collection2.forEach((item) => {
      const safeItemName = escapeHtml(item.name);
      const tile = document.createElement("div");
      tile.className = "collection-tile";
      const thumbSize = 168;
      tile.innerHTML = `
        <button type="button" class="collection-tile-body" aria-label="\u653E\u5927 ${safeItemName}">
          <canvas class="collection-thumb" width="${thumbSize}" height="${thumbSize}" aria-hidden="true"></canvas>
          <div class="collection-tile-meta">
            <strong>${safeItemName}</strong>
            <span>${normalizeCraft(item.craft)} \xB7 \u8BC4\u7EA7 ${escapeHtml(item.grade)} \xB7 ${escapeHtml(item.date)}</span>
          </div>
        </button>
        <button type="button" class="collection-tile-delete" aria-label="\u5220\u9664\u8FD9\u4EF6\u4F5C\u54C1" title="\u5220\u9664">
          ${icon("trash-2", { size: 14 })}
        </button>
      `;
      tile.querySelector(".collection-tile-body").addEventListener("click", () => enlargeCollectionEntry(item));
      tile.querySelector(".collection-tile-delete").addEventListener("click", async (event) => {
        event.stopPropagation();
        if (!await confirmModal({ message: `\u5220\u9664\u4F5C\u54C1\u300C${item.name}\u300D\uFF1F`, okText: "\u5220\u9664", danger: true })) return;
        uiActions.updateCollection(collection2.filter((entry) => entry.id !== item.id));
        renderCollection();
        showToast("\u5DF2\u5220\u9664\u3002");
      });
      grid.appendChild(tile);
      const canvas = tile.querySelector("canvas");
      drawCollectionThumb(canvas, item);
    });
  }
  function drawCollectionThumb(canvas, item) {
    const ctx2 = canvas.getContext("2d");
    if (!ctx2) return;
    setupHiDpiCanvas(canvas, ctx2);
    const rect = canvas.getBoundingClientRect();
    const w = rect.width;
    const h = rect.height;
    ctx2.clearRect(0, 0, w, h);
    ctx2.fillStyle = "#f3f5f8";
    ctx2.fillRect(0, 0, w, h);
    const cols = item.width || item.size || 30;
    const rowCount = item.height || item.size || 30;
    const placed = item.placed || [];
    const fallback = !placed.length ? patterns.find((p) => p.id === (item.id || "").split("-").slice(1).join("-")) : null;
    const pad = 10;
    const cell = Math.floor(Math.min((w - pad * 2) / cols, (h - pad * 2) / rowCount));
    const gridW = cell * cols;
    const gridH = cell * rowCount;
    const x0 = Math.floor((w - gridW) / 2);
    const y0 = Math.floor((h - gridH) / 2);
    const cellCode = (x, y) => {
      if (x < 0 || y < 0 || x >= cols || y >= rowCount) return null;
      if (placed.length) {
        const c = placed[y * cols + x];
        return c && c !== "." ? c : null;
      }
      if (fallback) {
        const c = (fallback.rows[y] || "")[x];
        return c && c !== "." ? c : null;
      }
      return null;
    };
    for (let y = 0; y < rowCount; y += 1) {
      for (let x = 0; x < cols; x += 1) {
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
          down: !cellCode(x, y + 1)
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
        ctx2.beginPath();
        ctx2.moveTo(left + rTL, top);
        ctx2.lineTo(right - rTR, top);
        ctx2.arcTo(right, top, right, top + rTR, rTR);
        ctx2.lineTo(right, bottom - rBR);
        ctx2.arcTo(right, bottom, right - rBR, bottom, rBR);
        ctx2.lineTo(left + rBL, bottom);
        ctx2.arcTo(left, bottom, left, bottom - rBL, rBL);
        ctx2.lineTo(left, top + rTL);
        ctx2.arcTo(left, top, left + rTL, top, rTL);
        ctx2.closePath();
        ctx2.fillStyle = palette[code] || "#bbb";
        ctx2.fill();
        ctx2.fillStyle = "rgba(255,255,255,0.16)";
        ctx2.beginPath();
        ctx2.arc(cx - cell * 0.18, cy - cell * 0.18, cell * 0.12, 0, Math.PI * 2);
        ctx2.fill();
        const exposedCount = (edges.left ? 1 : 0) + (edges.right ? 1 : 0) + (edges.up ? 1 : 0) + (edges.down ? 1 : 0);
        if (exposedCount >= 3 && cell >= 8) {
          ctx2.fillStyle = "rgba(0,0,0,0.18)";
          ctx2.beginPath();
          ctx2.arc(cx, cy, cell * 0.14, 0, Math.PI * 2);
          ctx2.fill();
        }
      }
    }
  }
  function enlargeCollectionEntry(entry) {
    if (!els.collectionScreen) return;
    let viewer = els.collectionScreen.querySelector(".collection-enlarged");
    if (!viewer) {
      viewer = document.createElement("div");
      viewer.className = "collection-enlarged";
      viewer.innerHTML = `
        <button type="button" class="collection-enlarged-close" aria-label="\u5173\u95ED\u653E\u5927">${icon("x", { size: 18 })}</button>
        <canvas class="collection-enlarged-canvas" width="640" height="640"></canvas>
        <div class="collection-enlarged-meta"></div>
        <div class="collection-enlarged-actions">
          <button type="button" class="primary-button collection-enlarged-open">\u6253\u5F00\u8FD9\u5F20\u56FE\u7EB8</button>
        </div>
      `;
      els.collectionScreen.appendChild(viewer);
      viewer.querySelector(".collection-enlarged-close").addEventListener("click", () => {
        viewer.classList.remove("show");
      });
    }
    viewer.classList.add("show");
    const canvas = viewer.querySelector("canvas");
    const previewSize = "min(640px, 78vh, 86vw)";
    canvas.style.width = previewSize;
    canvas.style.height = previewSize;
    requestAnimationFrame(() => drawCollectionThumb(canvas, entry));
    viewer.querySelector(".collection-enlarged-meta").textContent = `${entry.name} \xB7 ${normalizeCraft(entry.craft)} \xB7 \u8BC4\u7EA7 ${entry.grade} \xB7 ${entry.date}`;
    const openBtn = viewer.querySelector(".collection-enlarged-open");
    const newBtn = openBtn.cloneNode(true);
    openBtn.replaceWith(newBtn);
    newBtn.addEventListener("click", () => {
      viewer.classList.remove("show");
      uiActions.openCollectionEntry(entry);
    });
  }
  function renderUI() {
    if (els.studioGrid) els.studioGrid.dataset.phase = state.phase;
    renderPatterns();
    renderPhases();
    renderCurrentPatternChip();
    renderMobileWorkflowSummary();
    renderMobileSelectionSummary();
    renderControls();
    renderToolRack();
    renderPalette();
    renderCustomStats();
    renderPatternColorStats();
    renderSidebarReference();
    const collection2 = uiActions.getCollection?.() || [];
    const counts = getTargetCounts();
    const colorCount = Object.keys(counts).length;
    if (els.patternMeta && state.phase !== "choose") els.patternMeta.textContent = `${boardCols()}\xD7${boardRows()}`;
    if (els.targetCount) els.targetCount.textContent = `${getTargetTotal()} \u9897 / ${colorCount} \u8272`;
    if (els.collectionCount) els.collectionCount.textContent = String(collection2.length);
    if (els.settingsDot) els.settingsDot.hidden = collection2.length === 0;
    if (els.colorMeta) els.colorMeta.textContent = state.phase === "inspect" ? "\u68C0\u67E5\u8F85\u52A9" : beadLabel(state.selectedColor);
    if (els.rightPanelTitle) els.rightPanelTitle.textContent = state.phase === "inspect" ? "\u68C0\u67E5\u53F0" : "\u8C46\u76D2";
    if (els.sandboxButton) {
      const stateLabel = state.sandboxMode ? "\u5F00" : "\u5173";
      els.sandboxButton.title = state.sandboxMode ? "\u6C99\u76D2\u6A21\u5F0F\uFF1A\u5F00\uFF08\u81EA\u7531\u62FC\u6446\u4E0D\u6821\u9A8C\uFF09" : "\u6C99\u76D2\u6A21\u5F0F\uFF1A\u5173\uFF08\u6309\u56FE\u7EB8\u6821\u9A8C\uFF09";
      els.sandboxButton.setAttribute("aria-label", `\u6C99\u76D2\u6A21\u5F0F\uFF1A${stateLabel}`);
      els.sandboxButton.setAttribute("aria-pressed", state.sandboxMode ? "true" : "false");
      els.sandboxButton.classList.toggle("active", state.sandboxMode);
    }
    if (els.chooseStartButton) els.chooseStartButton.hidden = state.phase !== "choose";
    if (els.mobileSelectionStartButton) els.mobileSelectionStartButton.hidden = state.phase !== "choose";
    if (els.customImageControls) {
      els.customImageControls.hidden = !state.selectedPattern?.sourceImageDataUrl;
    }
    if (els.bgThemeChips) {
      if (!els.bgThemeChips.children.length) {
        els.bgThemeChips.innerHTML = Object.entries(backgroundThemes).map(([id, t]) => `<button type="button" role="radio" class="swatch-pick" data-theme="${id}" aria-checked="${id === state.bgTheme}" aria-label="${t.name}\u4E3B\u9898" title="${t.name}">
          <span class="swatch-pick-chip" style="--a:${t.pageBase};--b:${t.brand}"></span>
          <span class="swatch-pick-name">${t.name}</span>
        </button>`).join("");
      }
      for (const b of els.bgThemeChips.children) {
        b.setAttribute("aria-checked", b.dataset.theme === state.bgTheme ? "true" : "false");
      }
    }
    if (els.toolStyleChips) {
      if (!els.toolStyleChips.children.length) {
        els.toolStyleChips.innerHTML = Object.entries(toolStyles).map(([id, s]) => `<button type="button" role="radio" class="swatch-pick tool-pick" data-tool="${id}" aria-checked="${id === state.toolStyle}" aria-label="${s.name}\u6B3E\u5DE5\u5177" title="${s.name}">
          <span class="swatch-pick-chip" style="--a:${s.secondary};--b:${s.primary};--c:${s.accent}"></span>
          <span class="swatch-pick-name">${s.name}</span>
        </button>`).join("");
      }
      for (const b of els.toolStyleChips.children) {
        b.setAttribute("aria-checked", b.dataset.tool === state.toolStyle ? "true" : "false");
      }
    }
    if (els.toolStyleField) {
      els.toolStyleField.style.display = state.appMode === "gallery" || useMobileDirectPlacement() ? "none" : "";
    }
    const showPlacementUi = state.phase === "place";
    const showToolUi = showPlacementUi && !useMobileDirectPlacement();
    if (!showPlacementUi) {
      state.lastPlaceHintKey = "";
      hidePlaceHint();
    }
    const showRightPanelUi = state.phase === "place" || state.phase === "inspect";
    if (els.toolRack) els.toolRack.style.display = showToolUi ? "" : "none";
    if (els.colorPalette) els.colorPalette.style.display = showRightPanelUi ? "" : "none";
    if (els.colorMeta) els.colorMeta.style.display = showRightPanelUi ? "" : "none";
    if (els.toolMeta) els.toolMeta.style.display = showToolUi ? "" : "none";
  }

  // src/start-showcase.js
  var FEATURED_COUNT = 5;
  var ROTATE_MS = 4200;
  var featured = [];
  var index = 0;
  var timer = null;
  var active = false;
  var onPick = null;
  function todayKey() {
    const d = /* @__PURE__ */ new Date();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${d.getFullYear()}-${m}-${day}`;
  }
  function resolveFeatured() {
    const pool = patterns.slice();
    if (pool.length <= FEATURED_COUNT) return pool;
    const key = todayKey();
    for (let i = pool.length - 1; i > 0; i -= 1) {
      const j = stableHash(`${key}:${i}`) % (i + 1);
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    return pool.slice(0, FEATURED_COUNT);
  }
  function buildDots() {
    const host = els.startShowcaseDots;
    if (!host) return;
    host.textContent = "";
    featured.forEach((_, i) => {
      const dot = document.createElement("span");
      dot.className = "start-showcase-dot";
      host.appendChild(dot);
    });
  }
  function paint() {
    const pattern = featured[index];
    if (!pattern || !els.startShowcaseCanvas) return;
    drawPatternThumb(els.startShowcaseCanvas, pattern);
    if (els.startShowcaseName) els.startShowcaseName.textContent = pattern.name;
    if (els.startShowcaseCraft) {
      const craft = pattern.craft ? `${pattern.craft} \xB7 ` : "";
      els.startShowcaseCraft.textContent = `${craft}${pattern.width}\xD7${pattern.height}`;
    }
    if (els.startShowcaseDots) {
      const dots = els.startShowcaseDots.children;
      for (let i = 0; i < dots.length; i += 1) {
        dots[i].classList.toggle("is-active", i === index);
      }
    }
  }
  function show(next, { animate = true } = {}) {
    index = (next + featured.length) % featured.length;
    const canvas = els.startShowcaseCanvas;
    if (!canvas || !animate || prefersReducedMotion()) {
      paint();
      return;
    }
    canvas.classList.add("is-swapping");
    window.setTimeout(() => {
      paint();
      canvas.classList.remove("is-swapping");
    }, 160);
  }
  function stopTimer() {
    if (timer) {
      window.clearInterval(timer);
      timer = null;
    }
  }
  function startTimer() {
    stopTimer();
    if (!active || prefersReducedMotion() || featured.length < 2) return;
    timer = window.setInterval(() => show(index + 1), ROTATE_MS);
  }
  function initStartShowcase(options = {}) {
    onPick = typeof options.onPick === "function" ? options.onPick : null;
    featured = resolveFeatured();
    if (!featured.length) return;
    buildDots();
    els.startShowcaseDots?.addEventListener("click", (e) => {
      const dots = Array.from(els.startShowcaseDots.children);
      const i = dots.indexOf(e.target.closest(".start-showcase-dot"));
      if (i >= 0) {
        e.stopPropagation();
        show(i);
        startTimer();
      }
    });
    els.startShowcaseButton?.addEventListener("click", () => {
      const pattern = featured[index];
      if (pattern && onPick) onPick(pattern);
    });
    paint();
  }
  function refreshShowcaseTheme() {
    if (featured.length) paint();
  }
  function setShowcaseActive(isActive) {
    active = !!isActive;
    if (active) {
      paint();
      startTimer();
    } else {
      stopTimer();
    }
  }

  // src/pattern-code.js
  var PATTERN_CODE_PREFIX = "BEAM1";
  var VALUE_ALPHABET = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  var RUN_SEPARATOR = ".";
  var PALETTE_SEPARATOR = "_";
  var EMPTY_PALETTE = "-";
  var EMPTY_CELL = ".";
  var MAX_PATTERN_DIMENSION = 90;
  var MAX_PATTERN_CELLS = MAX_PATTERN_DIMENSION * MAX_PATTERN_DIMENSION;
  function assertPatternBounds(width, height) {
    if (!Number.isInteger(width) || !Number.isInteger(height) || width < 1 || height < 1 || width > MAX_PATTERN_DIMENSION || height > MAX_PATTERN_DIMENSION || width * height > MAX_PATTERN_CELLS) {
      throw new Error("Pattern code dimensions are out of range.");
    }
  }
  function valueTokenWidth(maxValue) {
    let width = 1;
    let capacity = VALUE_ALPHABET.length;
    while (capacity <= maxValue) {
      width += 1;
      capacity *= VALUE_ALPHABET.length;
    }
    return width;
  }
  function encodeFixedValue(value, width) {
    if (!Number.isInteger(value) || value < 0) {
      throw new Error("Pattern code value must be a non-negative integer.");
    }
    let remaining = value;
    let token = "";
    for (let i = 0; i < width; i += 1) {
      token = VALUE_ALPHABET[remaining % VALUE_ALPHABET.length] + token;
      remaining = Math.floor(remaining / VALUE_ALPHABET.length);
    }
    if (remaining > 0) throw new Error("Pattern code value exceeds token width.");
    return token;
  }
  function decodeFixedValue(token) {
    let value = 0;
    for (const char of token) {
      const digit = VALUE_ALPHABET.indexOf(char);
      if (digit < 0) throw new Error("Pattern code contains an invalid value token.");
      value = value * VALUE_ALPHABET.length + digit;
    }
    return value;
  }
  function normalizeDimension(value, fallback = 0) {
    const normalized = Number.parseInt(value, 10);
    return Number.isFinite(normalized) && normalized > 0 ? normalized : fallback;
  }
  function rowToCells(row) {
    return Array.isArray(row) ? row.slice() : Array.from(String(row || ""));
  }
  function patternDimensions(pattern) {
    const rows = Array.isArray(pattern?.rows) ? pattern.rows : [];
    const firstRowWidth = rows.length ? rowToCells(rows[0]).length : 0;
    const width = normalizeDimension(pattern?.width, normalizeDimension(pattern?.size, firstRowWidth));
    const height = normalizeDimension(pattern?.height, normalizeDimension(pattern?.size, rows.length));
    if (!width || !height || !rows.length) throw new Error("Pattern code needs a non-empty pattern.");
    if (rows.length !== height) throw new Error("Pattern row count does not match pattern height.");
    rows.forEach((row) => {
      if (rowToCells(row).length !== width) {
        throw new Error("Pattern row width does not match pattern width.");
      }
    });
    return { width, height, rows };
  }
  function cellToMardCode(cell) {
    if (!cell || cell === EMPTY_CELL) return null;
    if (palette[cell]) {
      const beadId = beadIds[cell];
      if (!beadId) throw new Error(`Pattern colour ${cell} has no MARD bead id.`);
      return normalizeMardCode(beadId);
    }
    const normalized = normalizeMardCode(cell);
    const workshopCode = workshopCodeForMard(normalized);
    if (palette[workshopCode]) return normalized;
    throw new Error(`Pattern colour ${cell} is not available in the palette.`);
  }
  function mardCodeToCell(code) {
    const normalized = normalizeMardCode(code);
    const workshopCode = workshopCodeForMard(normalized);
    if (!palette[workshopCode]) throw new Error(`Pattern code colour ${normalized} is not available.`);
    return workshopCode;
  }
  function encodeRuns(values, paletteSize) {
    if (!values.length) return "";
    const width = valueTokenWidth(paletteSize);
    const runs = [];
    let current = values[0];
    let count = 1;
    const pushRun = () => {
      runs.push(`${count.toString(36).toUpperCase()}${encodeFixedValue(current, width)}`);
    };
    for (let i = 1; i < values.length; i += 1) {
      if (values[i] === current) {
        count += 1;
      } else {
        pushRun();
        current = values[i];
        count = 1;
      }
    }
    pushRun();
    return runs.join(RUN_SEPARATOR);
  }
  function decodeRuns(runText, paletteSize, expectedLength) {
    if (!runText) throw new Error("Pattern code is missing cell data.");
    const width = valueTokenWidth(paletteSize);
    const values = [];
    runText.split(RUN_SEPARATOR).forEach((token) => {
      if (token.length <= width) throw new Error("Pattern code contains an invalid run.");
      const count = Number.parseInt(token.slice(0, -width), 36);
      const value = decodeFixedValue(token.slice(-width));
      if (!Number.isFinite(count) || count <= 0) throw new Error("Pattern code contains an invalid run length.");
      if (value > paletteSize) throw new Error("Pattern code references a missing colour.");
      if (values.length + count > expectedLength) throw new Error("Pattern code has too many cells.");
      for (let i = 0; i < count; i += 1) values.push(value);
    });
    if (values.length !== expectedLength) throw new Error("Pattern code cell count does not match its size.");
    return values;
  }
  function extractPatternCode(text) {
    const source = String(text || "").trim();
    const match = source.match(/\bBEAM1:[^\s，。；;]+/);
    return match ? match[0].replace(/[,.!?！？、，。]+$/, "") : "";
  }
  function encodePatternCode(pattern) {
    const { width, height, rows } = patternDimensions(pattern);
    const paletteCodes = [];
    const paletteIndex = /* @__PURE__ */ new Map();
    const values = [];
    rows.forEach((row) => {
      rowToCells(row).forEach((cell) => {
        const mardCode = cellToMardCode(cell);
        if (!mardCode) {
          values.push(0);
          return;
        }
        if (!paletteIndex.has(mardCode)) {
          paletteCodes.push(mardCode);
          paletteIndex.set(mardCode, paletteCodes.length);
        }
        values.push(paletteIndex.get(mardCode));
      });
    });
    const paletteText = paletteCodes.length ? paletteCodes.join(PALETTE_SEPARATOR) : EMPTY_PALETTE;
    return [
      PATTERN_CODE_PREFIX,
      `${width}x${height}`,
      paletteText,
      encodeRuns(values, paletteCodes.length)
    ].join(":");
  }
  function decodePatternCode(input, options = {}) {
    const code = extractPatternCode(input) || String(input || "").trim();
    const parts = code.split(":");
    if (parts.length !== 4 || parts[0] !== PATTERN_CODE_PREFIX) {
      throw new Error("Pattern code must start with BEAM1.");
    }
    const sizeMatch = parts[1].match(/^(\d+)x(\d+)$/);
    if (!sizeMatch) throw new Error("Pattern code has an invalid size.");
    const width = Number.parseInt(sizeMatch[1], 10);
    const height = Number.parseInt(sizeMatch[2], 10);
    if (!width || !height) throw new Error("Pattern code has invalid dimensions.");
    assertPatternBounds(width, height);
    const paletteCodes = parts[2] === EMPTY_PALETTE ? [] : parts[2].split(PALETTE_SEPARATOR).map(normalizeMardCode);
    const values = decodeRuns(parts[3], paletteCodes.length, width * height);
    const rows = [];
    for (let y = 0; y < height; y += 1) {
      let row = "";
      for (let x = 0; x < width; x += 1) {
        const value = values[y * width + x];
        row += value === 0 ? EMPTY_CELL : mardCodeToCell(paletteCodes[value - 1]);
      }
      rows.push(row);
    }
    return {
      id: options.id || "shared-pattern",
      name: options.name || "\u5206\u4EAB\u56FE\u7EB8",
      size: Math.max(width, height),
      width,
      height,
      craft: options.craft || "\u94A5\u5319\u6263",
      rows,
      note: "",
      sourceFormat: PATTERN_CODE_PREFIX,
      mardPalette: paletteCodes
    };
  }

  // src/gallery.js
  var galleryActions = {
    loadPattern: () => {
    },
    setAppMode: () => {
    },
    onModalOpened: () => {
    },
    restoreModalFocus: () => {
    },
    uiRenderUI: () => {
    }
  };
  function setGalleryActions(actions) {
    galleryActions = { ...galleryActions, ...actions };
  }
  function readShareApiBase() {
    const metaBase = document.querySelector('meta[name="beam-share-api-base"]')?.content || window.BEAM_SHARE_API_BASE || "";
    return String(metaBase).replace(/\/+$/, "");
  }
  var shareApiBase = readShareApiBase();
  var cloudShortIdPattern = /^[23456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]{8}$/;
  var galleryItems = [];
  var galleryLoaded = false;
  var galleryError = false;
  function shareApiUrl(path) {
    return `${shareApiBase}${path}`;
  }
  function extractCloudShortId(text) {
    const raw = String(text || "").trim();
    const source = raw.replace(/^【[^】]*】\s*/, "");
    if (cloudShortIdPattern.test(source)) return source;
    const matches = source.match(/[23456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]{8}/g);
    const candidate = matches ? matches[matches.length - 1] : "";
    return cloudShortIdPattern.test(candidate) ? candidate : "";
  }
  async function requestShareApi(path, payload, options = {}) {
    const response = await fetch(shareApiUrl(path), {
      method: "POST",
      headers: { "content-type": "application/json" },
      signal: options.signal,
      body: JSON.stringify(payload)
    });
    const json = await response.json().catch(() => null);
    if (!response.ok || !json?.ok) {
      throw new Error(json?.error?.message || "Share request failed.");
    }
    return json.data;
  }
  function shareApiConfigured() {
    return Boolean(shareApiBase);
  }
  async function requestGalleryApi(path, payload = {}, options = {}) {
    return requestShareApi(path, payload, options);
  }
  function normalizeGalleryText(value, fallback = "") {
    return String(value || fallback).replace(/[\u0000-\u001F\u007F]/g, "").trim();
  }
  function patternFromGalleryItem(item) {
    const decoded = decodePatternCode(item.patternCode, { name: item.name || "\u753B\u5ECA\u56FE\u7EB8" });
    return {
      ...decoded,
      id: `gallery-${item.id || item._id || stableHash(item.patternCode)}`,
      name: item.name || decoded.name || "\u753B\u5ECA\u56FE\u7EB8",
      note: item.author ? `\u6765\u81EA ${item.author}` : "\u753B\u5ECA\u56FE\u7EB8",
      craft: decoded.craft || "\u539F\u7248"
    };
  }
  function galleryColumnCount(fallback = 4) {
    if (!els.galleryGrid) return fallback;
    const tracks = getComputedStyle(els.galleryGrid).gridTemplateColumns;
    if (!tracks || tracks === "none" || tracks.includes("(")) return fallback;
    const n = tracks.split(" ").filter(Boolean).length;
    return n > 0 ? n : fallback;
  }
  function renderGallery() {
    if (!els.galleryGrid || !els.galleryEmpty) return;
    els.galleryGrid.innerHTML = "";
    const items = Array.isArray(galleryItems) ? galleryItems : [];
    if (els.gallerySubmitButton) {
      els.gallerySubmitButton.hidden = !galleryLoaded || items.length === 0 && !galleryError;
    }
    if (items.length === 0 && !galleryLoaded) {
      els.galleryEmpty.hidden = true;
      els.galleryGrid.innerHTML = Array.from({ length: galleryColumnCount() * 2 }, () => `
      <article class="gallery-card gallery-card-skeleton" aria-hidden="true">
        <div class="gallery-skeleton-thumb"></div>
        <div class="gallery-skeleton-meta">
          <span class="gallery-skeleton-line"></span>
          <span class="gallery-skeleton-line short"></span>
        </div>
      </article>`).join("");
      return;
    }
    els.galleryEmpty.hidden = items.length > 0;
    if (items.length === 0) {
      const galleryIcon = icon("image", { size: 40, strokeWidth: 1.8, class: "gallery-empty-icon" });
      const galleryBadge = `<span class="gallery-empty-badge">${galleryIcon}</span>`;
      if (galleryError) {
        els.galleryEmpty.innerHTML = `${galleryBadge}<p class="gallery-empty-text">\u753B\u5ECA\u8BFB\u53D6\u5931\u8D25</p><button type="button" class="ghost-button" data-gallery-retry>\u70B9\u6B64\u91CD\u8BD5</button>`;
        els.galleryEmpty.querySelector("[data-gallery-retry]")?.addEventListener("click", () => {
          void loadGallery();
        });
      } else {
        els.galleryEmpty.innerHTML = `${galleryBadge}<p class="gallery-empty-text">\u753B\u5ECA\u8FD8\u6CA1\u6709\u516C\u5F00\u56FE\u7EB8</p><p class="gallery-empty-sub">\u6765\u5F53\u7B2C\u4E00\u4E2A\u6295\u7A3F\u7684\u4EBA\u5427</p><button type="button" class="primary-button" data-gallery-submit>\u6295\u7A3F\u56FE\u7EB8</button>`;
        els.galleryEmpty.querySelector("[data-gallery-submit]")?.addEventListener("click", () => openGallerySubmitModal());
      }
    }
    items.forEach((item) => {
      let pattern = null;
      try {
        pattern = patternFromGalleryItem(item);
      } catch {
        return;
      }
      const card = document.createElement("article");
      card.className = "gallery-card";
      const safeName = escapeHtml(item.name || pattern.name || "\u753B\u5ECA\u56FE\u7EB8");
      const safeAuthor = escapeHtml(item.author || "\u533F\u540D\u6295\u7A3F");
      const safeSize = escapeHtml(`${pattern.width || pattern.size}x${pattern.height || pattern.size}`);
      card.innerHTML = `
      <button type="button" class="gallery-card-body" aria-label="\u6253\u5F00 ${safeName}">
        <canvas class="gallery-thumb" width="180" height="180" aria-hidden="true"></canvas>
        <span class="gallery-card-meta">
          <strong>${safeName}</strong>
          <span>${safeSize} \xB7 ${safeAuthor}</span>
        </span>
      </button>
    `;
      card.querySelector(".gallery-card-body").addEventListener("click", () => {
        galleryActions.loadPattern(pattern, false);
        galleryActions.setAppMode("bead");
        showToast(`\u5DF2\u6253\u5F00\u753B\u5ECA\u56FE\u7EB8\uFF1A${pattern.name}`);
      });
      els.galleryGrid.appendChild(card);
      drawPatternThumb(card.querySelector("canvas"), pattern);
    });
  }
  async function loadGallery({ silent = false } = {}) {
    if (!shareApiBase) {
      galleryLoaded = true;
      galleryItems = [];
      renderGallery();
      if (!silent) showToast("\u753B\u5ECA\u670D\u52A1\u8FD8\u6CA1\u6709\u914D\u7F6E\u3002");
      return;
    }
    if (!silent) {
      galleryLoaded = false;
      renderGallery();
    }
    try {
      const data = await requestGalleryApi("/api/gallery/list", { limit: 48 });
      galleryItems = Array.isArray(data?.items) ? data.items : [];
      galleryError = false;
      galleryLoaded = true;
      renderGallery();
    } catch {
      galleryLoaded = true;
      galleryError = true;
      galleryItems = [];
      renderGallery();
      if (!silent) showToast("\u753B\u5ECA\u8BFB\u53D6\u5931\u8D25\uFF0C\u8BF7\u7A0D\u540E\u518D\u8BD5\u3002");
    }
  }
  function enterGalleryMode() {
    renderGallery();
    if (!galleryLoaded) void loadGallery({ silent: true });
  }
  async function resolvePatternCodeInput(raw) {
    const shortId = extractCloudShortId(raw);
    if (!shortId) throw new Error("missing_pattern_code");
    const share = await requestShareApi("/api/share/open", { shortId });
    const code = share.patternCode;
    decodePatternCode(code);
    return code;
  }
  function openGallerySubmitModal(options = {}) {
    if (!els.gallerySubmitModal) return;
    const name = normalizeGalleryText(options.name || state.selectedPattern?.name || "", "\u81EA\u5B9A\u4E49\u56FE\u7EB8");
    if (els.gallerySubmitName) els.gallerySubmitName.value = name;
    if (els.gallerySubmitAuthor && !els.gallerySubmitAuthor.value) els.gallerySubmitAuthor.value = "";
    if (els.gallerySubmitCode) {
      els.gallerySubmitCode.value = options.patternCode || "";
      els.gallerySubmitCode.readOnly = Boolean(options.patternCode);
    }
    state.gallerySubmitModalOpen = true;
    els.gallerySubmitModal.classList.add("show");
    els.gallerySubmitModal.setAttribute("aria-hidden", "false");
    galleryActions.onModalOpened(els.gallerySubmitModal);
  }
  function closeGallerySubmitModal() {
    if (!els.gallerySubmitModal) return;
    state.gallerySubmitModalOpen = false;
    els.gallerySubmitModal.classList.remove("show");
    els.gallerySubmitModal.setAttribute("aria-hidden", "true");
    if (els.gallerySubmitCode) els.gallerySubmitCode.readOnly = false;
    galleryActions.restoreModalFocus();
  }
  async function submitGalleryPattern() {
    const button = els.gallerySubmitConfirmBtn;
    const name = normalizeGalleryText(els.gallerySubmitName?.value, "\u81EA\u5B9A\u4E49\u56FE\u7EB8");
    const author = normalizeGalleryText(els.gallerySubmitAuthor?.value);
    const raw = els.gallerySubmitCode?.value || "";
    if (!name) {
      showToast("\u8BF7\u586B\u5199\u56FE\u7EB8\u540D\u79F0\u3002");
      return;
    }
    if (!raw.trim()) {
      showToast("\u8BF7\u7C98\u8D34\u5206\u4EAB\u7801\u3002");
      return;
    }
    if (!shareApiBase) {
      showToast("\u6295\u7A3F\u670D\u52A1\u8FD8\u6CA1\u6709\u914D\u7F6E\u3002");
      return;
    }
    if (button) {
      button.disabled = true;
      button.textContent = "\u63D0\u4EA4\u4E2D";
    }
    try {
      const patternCode = await resolvePatternCodeInput(raw);
      const decoded = decodePatternCode(patternCode);
      await requestGalleryApi("/api/gallery/submit", { name, author, patternCode, size: decoded.size });
      closeGallerySubmitModal();
      showToast("\u6295\u7A3F\u5DF2\u8FDB\u5165\u5BA1\u6838\u961F\u5217\u3002");
    } catch {
      showToast("\u6295\u7A3F\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5\u5206\u4EAB\u7801\u6216\u7A0D\u540E\u518D\u8BD5\u3002");
    } finally {
      if (button) {
        button.disabled = false;
        button.textContent = "\u63D0\u4EA4\u5BA1\u6838";
      }
    }
  }
  function fallbackCopyText(text) {
    try {
      const area = document.createElement("textarea");
      area.value = text;
      document.body.appendChild(area);
      area.select();
      const copied = Boolean(document.execCommand?.("copy"));
      area.remove();
      return copied;
    } catch {
      return false;
    }
  }
  async function autoCopyText(text, successMessage, failureMessage) {
    const content = String(text || "");
    if (!content) return false;
    if (navigator.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText(content);
        showToast(successMessage);
        return true;
      } catch {
      }
    }
    if (fallbackCopyText(content)) {
      showToast(successMessage);
      return true;
    }
    showToast(failureMessage);
    return false;
  }
  function applyImportedPattern(decoded, name = "") {
    const width = decoded.width || decoded.size;
    const height = decoded.height || decoded.size;
    const finalName = String(name || "").trim() || "\u672A\u547D\u540D";
    const seedText = `${finalName}|${width}x${height}|${(decoded.rows || []).join("")}`;
    const imported = {
      id: newLibraryId("custom"),
      name: finalName,
      size: decoded.size,
      width,
      height,
      rows: decoded.rows,
      sourceRows: decoded.rows,
      sourceSize: decoded.size,
      sourceWidth: width,
      sourceHeight: height,
      craft: decoded.craft || state.craft,
      note: pickCustomPatternNote("imported", decoded.size, seedText)
    };
    addToLibrary(imported);
    galleryActions.loadPattern(imported, false);
    state.patternsDirty = true;
    galleryActions.uiRenderUI();
    showToast(`\u5DF2\u5BFC\u5165\u56FE\u7EB8\uFF1A${width}x${height}\u3002`);
    return imported;
  }
  async function requestCloudShareForPattern(pattern, options = {}) {
    const patternCode = encodePatternCode(pattern);
    return requestShareApi("/api/share/create", { name: pattern.name, patternCode }, options);
  }
  async function createCloudShareForPattern(pattern) {
    try {
      const share = await requestCloudShareForPattern(pattern);
      if (share?.shortId) {
        const title = String(pattern?.name || "").trim().slice(0, 10);
        const display = title ? `\u3010${title}\u3011${share.shortId}` : share.shortId;
        await autoCopyText(
          display,
          `\u5206\u4EAB\u7801\u5DF2\u590D\u5236\uFF1A${display}`,
          `\u5206\u4EAB\u7801\u5DF2\u751F\u6210\uFF1A${display}\uFF08\u590D\u5236\u5931\u8D25\uFF0C\u8BF7\u624B\u52A8\u590D\u5236\uFF09`
        );
      }
      return share;
    } catch {
      showToast("\u670D\u52A1\u5668\u7E41\u5FD9\uFF0C\u8BF7\u7A0D\u540E\u518D\u8BD5\u3002");
      return null;
    }
  }
  async function createCloudShare() {
    return createCloudShareForPattern(state.selectedPattern);
  }
  function submitCurrentToGallery() {
    try {
      openGallerySubmitModal({
        name: state.selectedPattern?.name || "\u81EA\u5B9A\u4E49\u56FE\u7EB8",
        patternCode: encodePatternCode(state.selectedPattern)
      });
    } catch {
      showToast("\u5F53\u524D\u56FE\u7EB8\u65E0\u6CD5\u6295\u7A3F\u3002");
    }
  }
  async function importPatternCode(raw) {
    const shortId = extractCloudShortId(raw);
    if (!shortId) {
      showToast("\u5206\u4EAB\u7801\u65E0\u6548\u3002");
      return false;
    }
    try {
      const share = await requestShareApi("/api/share/open", { shortId });
      const decoded = decodePatternCode(share.patternCode, { name: share.name });
      applyImportedPattern(decoded, share.name || "\u5BFC\u5165\u56FE\u7EB8");
      return true;
    } catch {
      showToast("\u5206\u4EAB\u7801\u65E0\u6548\u6216\u5DF2\u8FC7\u671F\u3002");
      return false;
    }
  }

  // src/image-convert.js
  function loadImageFromDataUrl(dataUrl) {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = reject;
      image.src = dataUrl;
    });
  }
  function convertImageToRectRows(image, targetW, targetH, options = {}) {
    const w = Math.max(1, Math.round(targetW));
    const h = Math.max(1, Math.round(targetH));
    const removeWhite = options.removeWhite === true;
    const codes = allColorCodes();
    if (!codes.length) return Array.from({ length: h }, () => ".".repeat(w));
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx2 = canvas.getContext("2d", { willReadFrequently: true });
    ctx2.imageSmoothingEnabled = true;
    ctx2.imageSmoothingQuality = "high";
    const targetAspect = w / h;
    const iw = image.naturalWidth || image.width || 1;
    const ih = image.naturalHeight || image.height || 1;
    const imgAspect = iw / ih;
    let sw = iw;
    let sh = ih;
    let sx = 0;
    let sy = 0;
    if (imgAspect > targetAspect) {
      sw = ih * targetAspect;
      sx = (iw - sw) / 2;
    } else {
      sh = iw / targetAspect;
      sy = (ih - sh) / 2;
    }
    ctx2.drawImage(image, sx, sy, sw, sh, 0, 0, w, h);
    const data = ctx2.getImageData(0, 0, w, h).data;
    const rows = [];
    for (let y = 0; y < h; y += 1) {
      let row = "";
      for (let x = 0; x < w; x += 1) {
        const o = (y * w + x) * 4;
        const a = data[o + 3];
        const r = data[o];
        const g = data[o + 1];
        const b = data[o + 2];
        if (a < 32 || removeWhite && isWhiteLike(r, g, b, a)) {
          row += ".";
          continue;
        }
        row += nearestCodeFromSet2(rgbToOklab(r, g, b), codes) || ".";
      }
      rows.push(row);
    }
    return rows;
  }
  function convertImageToPattern(image, options = {}) {
    const targetSize = normalizePatternSize(options.size || state.patternSize);
    const removeWhite = options.removeWhite !== false;
    const denoiseSliderLevel = clamp(Math.round(Number(options.denoiseLevel) || 0), 0, 100);
    const denoiseLevel = clamp(denoiseSliderLevel + 25, 0, 100);
    const denoiseEffect = denoiseLevel - 50;
    const excludedCodes = new Set((options.excludedCodes || []).filter((code) => palette[code]));
    const allowExpansion = Boolean(options.allowPaletteExpansionOnExclude) && excludedCodes.size > 0;
    const raw = sampleImageToRgba(image, targetSize, false);
    const rawMask = buildActiveMask(raw, removeWhite);
    const sourceProfile = estimateSourceProfile(raw, rawMask);
    if (denoiseEffect > 0) sourceProfile.useDenoise = true;
    if (denoiseEffect < 0) sourceProfile.useDenoise = false;
    const dominant = convertImageToDominantGrid(
      image,
      targetSize,
      removeWhite,
      sourceProfile,
      excludedCodes,
      allowExpansion,
      denoiseEffect
    );
    if (!dominant.activeCells.length) {
      return makeConversionResult(Array(targetSize).fill(".".repeat(targetSize)), targetSize, 0, 0, sourceProfile, denoiseSliderLevel);
    }
    const grid = dominant.grid;
    const preCleanupColorCount = countGridColors(grid).colors.length;
    const speckRounds = denoiseEffect > 0 ? 1 + Math.floor(denoiseEffect / 20) : 0;
    let cleaned = speckRounds > 0 ? removeSpeckles(grid, targetSize, speckRounds, sourceProfile) : grid.slice();
    if (denoiseEffect >= 15) cleaned = cleanupSmallComponents(cleaned, targetSize, sourceProfile);
    if (denoiseEffect >= 30) cleaned = cleanupSmallComponents(cleaned, targetSize, { ...sourceProfile, likelyPixelArt: false });
    if (denoiseEffect >= 40) cleaned = consensusRebalanceGrid(cleaned, targetSize, sourceProfile);
    if (sourceProfile.logoLike || targetSize <= 16) {
      cleaned = bridgeLineGaps(cleaned, targetSize, sourceProfile);
    }
    cleaned = collapseToPalette(cleaned, targetSize, dominant.lockedPalette);
    const rows = gridToRows(cleaned, targetSize);
    return makeConversionResult(rows, targetSize, dominant.lockedPalette.length, preCleanupColorCount, sourceProfile, denoiseSliderLevel);
  }
  function convertImageToDominantGrid(image, targetSize, removeWhite, sourceProfile, excludedCodes, allowExpansion, denoiseEffect = 0) {
    const analysisSize = clamp(
      Math.round(targetSize * (sourceProfile.logoLike ? 7.5 : sourceProfile.likelyPixelArt ? 6.5 : 6)),
      targetSize,
      960
    );
    const analysis = sampleImageToRgba(image, analysisSize, true);
    const externalWhiteMask = removeWhite ? buildExternalWhiteMask(analysis) : null;
    const transparentWhiteCode2 = workshopCodeForMard("H1");
    const opaqueWhiteCode2 = workshopCodeForMard("H2");
    const avoidTransparentWhite = transparentWhiteCode2 && opaqueWhiteCode2 && !excludedCodes.has(opaqueWhiteCode2);
    const effectiveExcluded = new Set(excludedCodes);
    if (avoidTransparentWhite) effectiveExcluded.add(transparentWhiteCode2);
    const availableCodes = allColorCodes().filter((code) => !effectiveExcluded.has(code));
    if (!availableCodes.length) {
      return { grid: Array(targetSize * targetSize).fill("."), activeCells: [], lockedPalette: [] };
    }
    const activeCells = [];
    for (let y = 0; y < targetSize; y += 1) {
      const y0 = Math.floor(y * analysisSize / targetSize);
      const y1 = Math.max(y0 + 1, Math.floor((y + 1) * analysisSize / targetSize));
      for (let x = 0; x < targetSize; x += 1) {
        const x0 = Math.floor(x * analysisSize / targetSize);
        const x1 = Math.max(x0 + 1, Math.floor((x + 1) * analysisSize / targetSize));
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
          lab: rgbToOklab(dominant.r, dominant.g, dominant.b)
        });
      }
    }
    if (!activeCells.length) {
      return { grid: Array(targetSize * targetSize).fill("."), activeCells: [], lockedPalette: [] };
    }
    let maxColors = chooseSimplifiedColorCount(targetSize, activeCells.length, sourceProfile);
    if (allowExpansion) maxColors = clamp(maxColors + 2, 2, 16);
    maxColors = applyDenoiseColorCompression(maxColors, denoiseEffect);
    const clusters = simplifyColors(activeCells, maxColors);
    const paletteHint = getPaletteLimitHint(sourceProfile);
    let finalPaletteCap = chooseFinalPaletteCap(targetSize, activeCells.length, sourceProfile, clusters.length);
    if (allowExpansion) finalPaletteCap = clamp(finalPaletteCap + 2, 2, 14);
    finalPaletteCap = applyDenoiseColorCompression(finalPaletteCap, denoiseEffect);
    if (paletteHint <= 3) finalPaletteCap = Math.min(finalPaletteCap, paletteHint);
    const lockedPalette = selectPaletteCodes(clusters, finalPaletteCap, effectiveExcluded);
    if (!lockedPalette.length) {
      return { grid: Array(targetSize * targetSize).fill("."), activeCells, lockedPalette: [] };
    }
    const grid = Array(targetSize * targetSize).fill(".");
    activeCells.forEach((cell) => {
      grid[cell.index] = nearestCodeFromSet2(cell.lab, lockedPalette, effectiveExcluded);
    });
    return { grid, activeCells, lockedPalette };
  }
  function applyDenoiseColorCompression(limit, denoiseEffect = 0) {
    const effect = clamp(Math.round(Number(denoiseEffect) || 0), -50, 50);
    if (effect === 0) return limit;
    if (effect < 0) {
      let expanded = Math.round(limit * (1 + Math.abs(effect) * 45e-4));
      if (effect <= -20) expanded += 1;
      if (effect <= -40) expanded += 1;
      return clamp(expanded, 2, 14);
    }
    let compressed = Math.max(2, Math.round(limit * (1 - effect * 68e-4)));
    if (effect >= 24) compressed = Math.min(compressed, limit - 1);
    if (effect >= 34) compressed = Math.min(compressed, limit - 2);
    if (effect >= 42) compressed = Math.min(compressed, limit - 3);
    if (effect >= 48) compressed = Math.min(compressed, limit - 4);
    return clamp(compressed, 2, 14);
  }
  function dominantColorInRegion(data, width, startX, startY, endX, endY, removeWhite, externalWhiteMask = null) {
    const buckets = /* @__PURE__ */ new Map();
    let nonExternalCount = 0;
    const area = Math.max(1, (endX - startX) * (endY - startY));
    for (let y = startY; y < endY; y += 1) {
      for (let x = startX; x < endX; x += 1) {
        const offset = (y * width + x) * 4;
        const index2 = y * width + x;
        const r2 = data[offset];
        const g2 = data[offset + 1];
        const b2 = data[offset + 2];
        const a = data[offset + 3];
        if (a < 64) continue;
        if (removeWhite && externalWhiteMask?.[index2]) continue;
        nonExternalCount += 1;
        const key = `${r2 >> 3}:${g2 >> 3}:${b2 >> 3}`;
        const bucket = buckets.get(key) || { count: 0, r: 0, g: 0, b: 0 };
        bucket.count += 1;
        bucket.r += r2;
        bucket.g += g2;
        bucket.b += b2;
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
    const ctx2 = canvas.getContext("2d", { willReadFrequently: true });
    ctx2.imageSmoothingEnabled = smooth;
    ctx2.imageSmoothingQuality = smooth ? "high" : "low";
    ctx2.fillStyle = "#ffffff";
    ctx2.fillRect(0, 0, targetSize, targetSize);
    const crop = Math.min(image.width, image.height);
    const sx = (image.width - crop) / 2;
    const sy = (image.height - crop) / 2;
    ctx2.drawImage(image, sx, sy, crop, crop, 0, 0, targetSize, targetSize);
    return Array.from(ctx2.getImageData(0, 0, targetSize, targetSize).data);
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
      const index2 = y * side + x;
      if (visited[index2]) return;
      const offset = index2 * 4;
      const r = data[offset];
      const g = data[offset + 1];
      const b = data[offset + 2];
      const a = data[offset + 3];
      if (!isBackgroundLike(r, g, b, a)) return;
      visited[index2] = true;
      stack.push(index2);
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
      const index2 = stack.pop();
      external[index2] = true;
      const x = index2 % side;
      const y = Math.floor(index2 / side);
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
    const activeCount = mask.reduce((sum, active2) => sum + (active2 ? 1 : 0), 0);
    if (!activeCount) {
      return {
        activeCount: 0,
        coarseCount: 0,
        significantCount: 0,
        topTwoRatio: 0,
        likelyPixelArt: true,
        useDenoise: false
      };
    }
    const bins = countCoarseColorBins(data, mask, 4);
    const sorted = [...bins.values()].sort((a, b) => b - a);
    const threshold = Math.max(2, Math.round(activeCount * 7e-3));
    const significantCount = sorted.filter((count) => count >= threshold).length || 1;
    const topTwoRatio = ((sorted[0] || 0) + (sorted[1] || 0)) / activeCount;
    const coarseCount = bins.size;
    const likelyPixelArt = coarseCount <= 18 || coarseCount <= 26 && topTwoRatio >= 0.78;
    const logoLike = significantCount <= 4 && topTwoRatio >= 0.72 && coarseCount <= 28;
    const useDenoise = !likelyPixelArt && coarseCount >= 12;
    return {
      activeCount,
      coarseCount,
      significantCount,
      topTwoRatio,
      likelyPixelArt,
      logoLike,
      useDenoise
    };
  }
  function countCoarseColorBins(data, mask, shift) {
    const bins = /* @__PURE__ */ new Map();
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
    const weighted = /* @__PURE__ */ new Map();
    clusters.forEach((cluster) => {
      const code = nearestColorCode(cluster.r, cluster.g, cluster.b, excludedCodes);
      if (!code) return;
      weighted.set(code, (weighted.get(code) || 0) + (cluster.count || 1));
    });
    const sorted = [...weighted.entries()].sort((a, b) => b[1] - a[1] || (beadIds[a[0]] || a[0]).localeCompare(beadIds[b[0]] || b[0], "zh-Hans-CN", { numeric: true })).map(([code]) => code);
    const selected = sorted.slice(0, Math.max(1, paletteCap));
    if (selected.length) return selected;
    const fallback = clusters.slice().sort((a, b) => (b.count || 0) - (a.count || 0)).map((cluster) => nearestColorCode(cluster.r, cluster.g, cluster.b, excludedCodes)).find((code) => Boolean(code));
    return fallback ? [fallback] : [];
  }
  function nearestCodeFromSet2(lab, codes, excludedCodes = null) {
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
        clusters.forEach((cluster, index2) => {
          const distance = oklabDistance(pixel.lab, cluster.lab);
          if (distance < bestDistance) {
            bestDistance = distance;
            best = index2;
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
      clusters = clusters.map((cluster, index2) => {
        const sum = sums[index2];
        if (!sum.count) return cluster;
        const lab = { l: sum.l / sum.count, a: sum.a / sum.count, b: sum.b / sum.count };
        return { lab, r: Math.round(sum.r / sum.count), g: Math.round(sum.g / sum.count), b: Math.round(sum.blue / sum.count), count: sum.count };
      });
    }
    return clusters.filter((cluster) => cluster.count !== 0);
  }
  function seedClusters(pixels, maxColors) {
    const buckets = /* @__PURE__ */ new Map();
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
      count: bucket.count
    })).sort((a, b) => b.count - a.count);
    const seeds = [];
    candidates.forEach((candidate) => {
      if (seeds.length >= maxColors) return;
      const farEnough = seeds.every((seed) => oklabDistance(seed.lab, candidate.lab) > 9e-4);
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
    const effectiveRounds = sourceProfile?.logoLike || sourceProfile?.likelyPixelArt && size <= 16 ? Math.min(1, rounds) : rounds;
    for (let round = 0; round < effectiveRounds; round += 1) {
      const next = current.slice();
      for (let y = 0; y < size; y += 1) {
        for (let x = 0; x < size; x += 1) {
          const index2 = y * size + x;
          const code = current[index2];
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
            next[index2] = majority;
          } else if (code !== "." && same8 <= 1 && same4 === 0 && majorityCount >= (strict ? 6 : 5)) {
            next[index2] = majority;
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
    for (let index2 = 0; index2 < out.length; index2 += 1) {
      if (visited[index2] || out[index2] === ".") continue;
      const component = collectComponent(out, size, index2, visited);
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
    const passes = sourceProfile?.logoLike ? 1 : size <= 20 ? 2 : 3;
    const softThreshold = sourceProfile?.logoLike ? 26e-4 : 19e-4;
    for (let pass = 0; pass < passes; pass += 1) {
      const next = out.slice();
      for (let y = 1; y < size - 1; y += 1) {
        for (let x = 1; x < size - 1; x += 1) {
          const index2 = y * size + x;
          const code = out[index2];
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
            next[index2] = candidate;
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
        const index2 = y * size + x;
        if (out[index2] !== ".") continue;
        const left = out[y * size + (x - 1)];
        const right = out[y * size + (x + 1)];
        const up = out[(y - 1) * size + x];
        const down = out[(y + 1) * size + x];
        const ul = out[(y - 1) * size + (x - 1)];
        const ur = out[(y - 1) * size + (x + 1)];
        const dl = out[(y + 1) * size + (x - 1)];
        const dr = out[(y + 1) * size + (x + 1)];
        if (left !== "." && left === right) {
          out[index2] = left;
          continue;
        }
        if (up !== "." && up === down) {
          out[index2] = up;
          continue;
        }
        if (ul !== "." && ul === dr) {
          out[index2] = ul;
          continue;
        }
        if (ur !== "." && ur === dl) {
          out[index2] = ur;
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
      const index2 = stack.pop();
      cells.push(index2);
      const x = index2 % size;
      const y = Math.floor(index2 / size);
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
    const darkDetail = /* @__PURE__ */ new Set(["K", "k", "D", "d", "N", "n", "b"]);
    const lowPalette = getPaletteLimitHint(sourceProfile || { significantCount: 99, topTwoRatio: 0, likelyPixelArt: false }) <= 3;
    const xs = component.cells.map((index2) => index2 % size);
    const ys = component.cells.map((index2) => Math.floor(index2 / size));
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
    return lineLike || singlePixel || highContrastDot || lowPaletteDot || darkDetail.has(component.code) && embedded;
  }
  function shouldKeepIsolatedFeature(grid, size, x, y, code, neighbors8, same4, same8) {
    if (same4 >= 1 || same8 >= 2) return false;
    const darkDetail = /* @__PURE__ */ new Set(["K", "k", "D", "d", "N", "n", "b"]);
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
        if (oklabDistance(selfLab, beadOklab(code)) > 38e-4) contrasted += 1;
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
  function neighborCodes(grid, size, x, y, includeDiagonal) {
    const dirs = includeDiagonal ? [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [1, -1], [-1, 1], [-1, -1]] : [[1, 0], [-1, 0], [0, 1], [0, -1]];
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
    const colors = Object.entries(counts).map(([code, count]) => ({ code, count })).sort((a, b) => b.count - a.count || (beadIds[a.code] || a.code).localeCompare(beadIds[b.code] || b.code, "zh-Hans-CN", { numeric: true }));
    return {
      colors,
      total: colors.reduce((sum, item) => sum + item.count, 0)
    };
  }
  function makeConversionResult(rows, size, simplifiedColorCount, preCleanupColorCount, sourceProfile = null, denoiseLevel = 0) {
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
        denoiseLevel: clamp(Math.round(Number(denoiseLevel) || 0), 0, 100)
      }
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

  // src/draw.js
  var drawActions = {
    loadPattern: () => {
    },
    setAppMode: () => {
    },
    openSettingsModal: () => {
    },
    openGallerySubmitModal: () => {
    },
    importPatternCode: async () => false,
    autoCopyText: async () => false,
    requestCloudShareForPattern: async () => null
  };
  function setDrawActions(actions) {
    Object.assign(drawActions, actions);
  }
  function getDrawKeyboardNav() {
    return drawKbdNav;
  }
  var drawState = {
    size: BOARD_SIZE,
    width: BOARD_SIZE,
    height: BOARD_SIZE,
    tiles: /* @__PURE__ */ new Set([tileKey(0, 0)]),
    tileOriginX: 0,
    tileOriginY: 0,
    tool: "brush",
    shapeMode: "rect",
    selectedColor: "K",
    grid: [],
    drawing: false,
    lastCellKey: "",
    view: { scale: 1, panX: 0, panY: 0, velX: 0, velY: 0, velScale: 0 },
    recentColors: [],
    undoStack: [],
    undoStrokeSnapshotTaken: false,
    shapeDrag: null,
    shapeDragEnd: null,
    stampImage: null,
    paletteQuery: ""
  };
  var drawKbdNav = { up: false, down: false, left: false, right: false, zoomIn: false, zoomOut: false };
  var drawPointers = {};
  var drawGesture = null;
  var drawRenderKey = "";
  var MAX_DRAW_DIMENSION = BOARD_SIZE * 3;
  function drawWidth() {
    return drawState.width || drawState.size || BOARD_SIZE;
  }
  function drawHeight() {
    return drawState.height || drawState.size || BOARD_SIZE;
  }
  function drawSquareSize() {
    return Math.max(drawWidth(), drawHeight());
  }
  function createDrawGrid(width, height = width, fill = ".") {
    return Array(width * height).fill(fill);
  }
  function drawIndex(x, y, width = drawWidth()) {
    return y * width + x;
  }
  function recordRecentColor(code) {
    if (!code || code === ".") return false;
    const arr = drawState.recentColors;
    const i = arr.indexOf(code);
    if (i === 0) return false;
    if (i !== -1) arr.splice(i, 1);
    arr.unshift(code);
    if (arr.length > 5) arr.length = 5;
    return true;
  }
  function ensureDrawPaletteColor() {
    const codes = allColorCodes();
    if (!codes.length) return;
    if (!codes.includes(drawState.selectedColor)) {
      drawState.selectedColor = codes[0];
    }
  }
  function ensureDrawGrid() {
    const width = drawWidth();
    const height = drawHeight();
    drawState.size = drawSquareSize();
    if (drawState.grid.length !== width * height) {
      drawState.grid = createDrawGrid(width, height);
    }
  }
  function getDrawGeometry() {
    const canvas = els.drawCanvas;
    if (!canvas) return null;
    const cssW = Math.max(220, Math.round(canvas.clientWidth || 640));
    const cssH = Math.max(220, Math.round(canvas.clientHeight || 640));
    const width = drawWidth();
    const height = drawHeight();
    const tabSpace = 44;
    const cell = Math.max(1, Math.floor(Math.min((cssW - tabSpace * 2) / width, (cssH - tabSpace * 2) / height)));
    const gridW = cell * width;
    const gridH = cell * height;
    const gridSize = Math.max(gridW, gridH);
    const x0 = Math.floor((cssW - gridW) / 2);
    const y0 = Math.floor((cssH - gridH) / 2);
    const cx = x0 + gridW / 2;
    const cy = y0 + gridH / 2;
    return { cssW, cssH, width, height, size: Math.max(width, height), cell, gridW, gridH, gridSize, x0, y0, cx, cy };
  }
  function isCellActive(x, y) {
    const tx = Math.floor(x / BOARD_SIZE) + drawState.tileOriginX;
    const ty = Math.floor(y / BOARD_SIZE) + drawState.tileOriginY;
    return drawState.tiles.has(tileKey(tx, ty));
  }
  function addTileAt(tx, ty) {
    const T = BOARD_SIZE;
    const oldMinTx = drawState.tileOriginX;
    const oldMinTy = drawState.tileOriginY;
    const oldWidth = drawWidth();
    const oldHeight = drawHeight();
    const newMinTx = Math.min(oldMinTx, tx);
    const newMinTy = Math.min(oldMinTy, ty);
    const newMaxTx = Math.max(oldMinTx + oldWidth / T - 1, tx);
    const newMaxTy = Math.max(oldMinTy + oldHeight / T - 1, ty);
    const newWidth = (newMaxTx - newMinTx + 1) * T;
    const newHeight = (newMaxTy - newMinTy + 1) * T;
    const offsetX = (oldMinTx - newMinTx) * T;
    const offsetY = (oldMinTy - newMinTy) * T;
    const newGrid = Array(newWidth * newHeight).fill(".");
    for (let oy = 0; oy < oldHeight; oy++) {
      for (let ox = 0; ox < oldWidth; ox++) {
        const val = drawState.grid[oy * oldWidth + ox];
        if (val && val !== ".") {
          newGrid[(oy + offsetY) * newWidth + (ox + offsetX)] = val;
        }
      }
    }
    drawState.tiles.add(tileKey(tx, ty));
    drawState.tileOriginX = newMinTx;
    drawState.tileOriginY = newMinTy;
    drawState.width = newWidth;
    drawState.height = newHeight;
    drawState.size = Math.max(newWidth, newHeight);
    drawState.grid = newGrid;
    drawState.lastCellKey = "";
  }
  function drawBoardTabRects(geometry = getDrawGeometry()) {
    if (!geometry) return [];
    const { x0, y0, cell } = geometry;
    const T = BOARD_SIZE;
    const tileW = T * cell;
    const tileH = T * cell;
    const long = cell * 3;
    const short = cell * 1.1;
    const tabOverlap = cell * 0.22;
    const tabs = [];
    const curMaxTx = drawState.tileOriginX + drawWidth() / T - 1;
    const curMaxTy = drawState.tileOriginY + drawHeight() / T - 1;
    for (const key of drawState.tiles) {
      const [tx, ty] = key.split(",").map(Number);
      const bx = x0 + (tx - drawState.tileOriginX) * tileW;
      const by = y0 + (ty - drawState.tileOriginY) * tileH;
      const candidates = [
        {
          targetTx: tx,
          targetTy: ty - 1,
          rect: { x: bx + tileW / 2 - long / 2, y: by - short, w: long, h: short + tabOverlap }
        },
        {
          targetTx: tx + 1,
          targetTy: ty,
          rect: { x: bx + tileW - tabOverlap, y: by + tileH / 2 - long / 2, w: short + tabOverlap, h: long }
        },
        {
          targetTx: tx,
          targetTy: ty + 1,
          rect: { x: bx + tileW / 2 - long / 2, y: by + tileH - tabOverlap, w: long, h: short + tabOverlap }
        },
        {
          targetTx: tx - 1,
          targetTy: ty,
          rect: { x: bx - short, y: by + tileH / 2 - long / 2, w: short + tabOverlap, h: long }
        }
      ];
      for (const { targetTx, targetTy, rect } of candidates) {
        if (drawState.tiles.has(tileKey(targetTx, targetTy))) continue;
        const newMinTx = Math.min(drawState.tileOriginX, targetTx);
        const newMinTy = Math.min(drawState.tileOriginY, targetTy);
        const nextWidth = (Math.max(curMaxTx, targetTx) - newMinTx + 1) * T;
        const nextHeight = (Math.max(curMaxTy, targetTy) - newMinTy + 1) * T;
        if (nextWidth <= MAX_DRAW_DIMENSION && nextHeight <= MAX_DRAW_DIMENSION) {
          tabs.push({ targetTx, targetTy, ...rect });
        }
      }
    }
    return tabs;
  }
  function drawBoardTabAtPointer(event) {
    if (!els.drawCanvas) return null;
    const rect = els.drawCanvas.getBoundingClientRect();
    const geometry = getDrawGeometry();
    if (!rect.width || !rect.height || !geometry) return null;
    const rawX = event.clientX - rect.left;
    const rawY = event.clientY - rect.top;
    const { cx, cy, cell } = geometry;
    const view = drawState.view;
    const x = (rawX - cx - view.panX) / view.scale + cx;
    const y = (rawY - cy - view.panY) / view.scale + cy;
    const hitPadding = cell * 0.6;
    const tabs = drawBoardTabRects(geometry);
    const hit = tabs.find(
      (tab) => x >= tab.x - hitPadding && x <= tab.x + tab.w + hitPadding && y >= tab.y - hitPadding && y <= tab.y + tab.h + hitPadding
    );
    return hit ? { tx: hit.targetTx, ty: hit.targetTy } : null;
  }
  function clampDrawView() {
    const v = drawState.view;
    const g = getDrawGeometry();
    if (g) v.scale = clamp(v.scale, 1, maxBoardScale(g));
    if (v.scale <= 1.001) {
      v.scale = 1;
      v.panX = 0;
      v.panY = 0;
      return;
    }
    if (!g) return;
    const maxPan = g.gridSize * (v.scale - 1) / 2 + 32;
    v.panX = clamp(v.panX, -maxPan, maxPan);
    v.panY = clamp(v.panY, -maxPan, maxPan);
  }
  function setDrawZoom(nextScale, nextPanX, nextPanY) {
    const v = drawState.view;
    const g = getDrawGeometry();
    v.scale = clamp(nextScale, 1, maxBoardScale(g));
    v.panX = nextPanX ?? v.panX;
    v.panY = nextPanY ?? v.panY;
    clampDrawView();
    paintDrawCanvas();
  }
  function tickDrawKbdNav(dtSec) {
    if (state.appMode !== "draw") return;
    const nav = drawKbdNav;
    const v = drawState.view;
    const PAN_ACCEL = 2200;
    const PAN_DECEL = 5e3;
    const PAN_MAX = 560;
    const ZOOM_ACCEL = 4.5;
    const ZOOM_DECEL = 10;
    const ZOOM_MAX = maxBoardScale(getDrawGeometry()) - 1;
    const wantLeft = nav.left && !nav.right;
    const wantRight = nav.right && !nav.left;
    if (wantLeft) v.velX = Math.min(PAN_MAX, v.velX + PAN_ACCEL * dtSec);
    else if (wantRight) v.velX = Math.max(-PAN_MAX, v.velX - PAN_ACCEL * dtSec);
    else if (v.velX > 0) v.velX = Math.max(0, v.velX - PAN_DECEL * dtSec);
    else if (v.velX < 0) v.velX = Math.min(0, v.velX + PAN_DECEL * dtSec);
    const wantUp = nav.up && !nav.down;
    const wantDown = nav.down && !nav.up;
    if (wantUp) v.velY = Math.min(PAN_MAX, v.velY + PAN_ACCEL * dtSec);
    else if (wantDown) v.velY = Math.max(-PAN_MAX, v.velY - PAN_ACCEL * dtSec);
    else if (v.velY > 0) v.velY = Math.max(0, v.velY - PAN_DECEL * dtSec);
    else if (v.velY < 0) v.velY = Math.min(0, v.velY + PAN_DECEL * dtSec);
    const wantIn = nav.zoomIn && !nav.zoomOut;
    const wantOut = nav.zoomOut && !nav.zoomIn;
    if (wantIn) v.velScale = Math.min(ZOOM_MAX, v.velScale + ZOOM_ACCEL * dtSec);
    else if (wantOut) v.velScale = Math.max(-ZOOM_MAX, v.velScale - ZOOM_ACCEL * dtSec);
    else if (v.velScale > 0) v.velScale = Math.max(0, v.velScale - ZOOM_DECEL * dtSec);
    else if (v.velScale < 0) v.velScale = Math.min(0, v.velScale + ZOOM_DECEL * dtSec);
    const movingPan = Math.abs(v.velX) > 0.5 || Math.abs(v.velY) > 0.5;
    const movingZoom = Math.abs(v.velScale) > 1e-3;
    if (movingPan || movingZoom) {
      const prevX = v.panX;
      const prevY = v.panY;
      setDrawZoom(v.scale + v.velScale * dtSec, v.panX + v.velX * dtSec, v.panY + v.velY * dtSec);
      if (v.panX === prevX) v.velX = 0;
      if (v.panY === prevY) v.velY = 0;
    }
  }
  function startDrawGesture() {
    const ids = Object.keys(drawPointers);
    if (ids.length < 2) return;
    const p1 = drawPointers[ids[0]];
    const p2 = drawPointers[ids[1]];
    const mid = { x: (p1.x + p2.x) / 2, y: (p1.y + p2.y) / 2 };
    const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
    drawGesture = {
      active: true,
      startDist: Math.max(16, dist),
      startScale: drawState.view.scale,
      startPanX: drawState.view.panX,
      startPanY: drawState.view.panY,
      startMidX: mid.x,
      startMidY: mid.y
    };
  }
  function updateDrawGesture() {
    if (!drawGesture?.active) return;
    const ids = Object.keys(drawPointers);
    if (ids.length < 2) return;
    const p1 = drawPointers[ids[0]];
    const p2 = drawPointers[ids[1]];
    const mid = { x: (p1.x + p2.x) / 2, y: (p1.y + p2.y) / 2 };
    const dist = Math.max(16, Math.hypot(p1.x - p2.x, p1.y - p2.y));
    const g = getDrawGeometry();
    if (!g) return;
    const nextScale = clamp(drawGesture.startScale * (dist / drawGesture.startDist), 1, maxBoardScale(g));
    const { cx, cy } = g;
    const startScale = Math.max(1e-4, drawGesture.startScale);
    const anchorX = (drawGesture.startMidX - cx - drawGesture.startPanX) / startScale + cx;
    const anchorY = (drawGesture.startMidY - cy - drawGesture.startPanY) / startScale + cy;
    drawState.view.panX = mid.x - cx - (anchorX - cx) * nextScale;
    drawState.view.panY = mid.y - cy - (anchorY - cy) * nextScale;
    drawState.view.scale = nextScale;
    clampDrawView();
    paintDrawCanvas();
  }
  function resetDrawView() {
    drawState.view.scale = 1;
    drawState.view.panX = 0;
    drawState.view.panY = 0;
  }
  var drawCodeMode = "import";
  function openDrawCodeModal(mode, value = "") {
    if (!els.drawCodeModal) return;
    drawCodeMode = mode;
    const isExport = mode === "export";
    const isBead = mode === "import-bead";
    if (els.drawCodeModalTitle) {
      els.drawCodeModalTitle.textContent = isExport ? "\u5BFC\u51FA\u56FE\u7EB8" : isBead ? "\u5BFC\u5165\u5230\u62FC\u8C46\u53F0" : "\u5BFC\u5165\u5230\u7ED8\u56FE\u53F0";
    }
    if (els.drawCodeHint) {
      els.drawCodeHint.textContent = isExport ? "\u751F\u6210\u5206\u4EAB\u7801" : "";
      els.drawCodeHint.hidden = !isExport;
    }
    if (els.drawCodeTitleField) els.drawCodeTitleField.hidden = !isExport;
    if (isExport && els.drawCodeTitleInput) els.drawCodeTitleInput.value = "";
    if (els.drawCodeInput) {
      els.drawCodeInput.value = value;
      els.drawCodeInput.readOnly = isExport;
      els.drawCodeInput.placeholder = isExport ? "\u751F\u6210\u540E\u8FD9\u91CC\u663E\u793A\u5206\u4EAB\u7801" : "\u7C98\u8D34\u5206\u4EAB\u7801";
    }
    if (els.drawCodeCopyBtn) els.drawCodeCopyBtn.hidden = isExport ? !value : true;
    if (els.drawCodeGenerateBtn) els.drawCodeGenerateBtn.hidden = !isExport;
    if (els.drawCodeImportConfirmBtn) els.drawCodeImportConfirmBtn.hidden = isExport;
    els.drawCodeModal.classList.add("show");
    els.drawCodeModal.setAttribute("aria-hidden", "false");
    requestAnimationFrame(() => {
      if (isExport) els.drawCodeTitleInput?.focus();
      else els.drawCodeInput?.focus();
    });
  }
  function closeDrawCodeModal() {
    if (!els.drawCodeModal) return;
    els.drawCodeModal.classList.remove("show");
    els.drawCodeModal.setAttribute("aria-hidden", "true");
  }
  function drawRowsFromGrid() {
    const width = drawWidth();
    const height = drawHeight();
    const rows = [];
    for (let y = 0; y < height; y += 1) {
      rows.push(drawState.grid.slice(y * width, (y + 1) * width).join(""));
    }
    return rows;
  }
  function makeDrawPattern(name = "\u7ED8\u5236\u56FE\u7EB8") {
    ensureDrawGrid();
    const rows = drawRowsFromGrid();
    const width = drawWidth();
    const height = drawHeight();
    const size = Math.max(width, height);
    return {
      id: "draw-export",
      name,
      size,
      width,
      height,
      sourceWidth: width,
      sourceHeight: height,
      rows,
      craft: "\u539F\u7248",
      tiles: [...drawState.tiles],
      tileOriginX: drawState.tileOriginX,
      tileOriginY: drawState.tileOriginY
    };
  }
  function showDrawCodeOutput(value) {
    if (els.drawCodeInput) els.drawCodeInput.value = value;
    if (els.drawCodeCopyBtn) els.drawCodeCopyBtn.hidden = false;
  }
  function loadDrawPattern(pattern) {
    const rows = Array.isArray(pattern?.rows) ? pattern.rows : [];
    const srcHeight = Number.parseInt(pattern?.height, 10) || rows.length;
    const srcWidth = Number.parseInt(pattern?.width, 10) || Math.max(1, ...rows.map((row) => String(row || "").length));
    const fitted = fitGridToBoardTiles(rows, srcWidth, srcHeight, BOARD_SIZE, MAX_DRAW_DIMENSION);
    drawState.width = fitted.width;
    drawState.height = fitted.height;
    drawState.size = Math.max(fitted.width, fitted.height);
    drawState.grid = fitted.rows.join("").split("").map((code) => code === "." || palette[code] ? code : ".");
    const tilesX = fitted.width / BOARD_SIZE;
    const tilesY = fitted.height / BOARD_SIZE;
    drawState.tiles = /* @__PURE__ */ new Set();
    for (let ty = 0; ty < tilesY; ty++) {
      for (let tx = 0; tx < tilesX; tx++) {
        drawState.tiles.add(tileKey(tx, ty));
      }
    }
    drawState.tileOriginX = 0;
    drawState.tileOriginY = 0;
    drawState.lastCellKey = "";
    drawState.undoStack = [];
    drawState.undoStrokeSnapshotTaken = false;
    if (els.drawUndoButton) els.drawUndoButton.disabled = true;
    resetDrawView();
    ensureDrawPaletteColor();
    renderDrawStudio();
  }
  function drawCellFromPointer(event) {
    if (!els.drawCanvas) return null;
    const rect = els.drawCanvas.getBoundingClientRect();
    if (!rect.width || !rect.height) return null;
    const g = getDrawGeometry();
    if (!g) return null;
    const { x0, y0, cell, width, height, cx, cy } = g;
    const v = drawState.view;
    const rawX = event.clientX - rect.left;
    const rawY = event.clientY - rect.top;
    const logX = (rawX - cx - v.panX) / v.scale + cx;
    const logY = (rawY - cy - v.panY) / v.scale + cy;
    const x = clamp(Math.floor((logX - x0) / cell), 0, width - 1);
    const y = clamp(Math.floor((logY - y0) / cell), 0, height - 1);
    return { x, y };
  }
  function paintDrawCell(x, y, code) {
    const idx = drawIndex(x, y);
    if (drawState.grid[idx] === code) return false;
    drawState.grid[idx] = code;
    return true;
  }
  function floodFillDraw(x, y, fillCode) {
    const width = drawWidth();
    const height = drawHeight();
    const start = drawState.grid[drawIndex(x, y, width)];
    if (start === fillCode) return false;
    const queue = [[x, y]];
    const seen = /* @__PURE__ */ new Set();
    let changed = false;
    while (queue.length) {
      const [cx, cy] = queue.pop();
      const key = `${cx},${cy}`;
      if (seen.has(key)) continue;
      seen.add(key);
      if (!isCellActive(cx, cy)) continue;
      const idx = drawIndex(cx, cy, width);
      if (drawState.grid[idx] !== start) continue;
      drawState.grid[idx] = fillCode;
      changed = true;
      if (cx > 0) queue.push([cx - 1, cy]);
      if (cx < width - 1) queue.push([cx + 1, cy]);
      if (cy > 0) queue.push([cx, cy - 1]);
      if (cy < height - 1) queue.push([cx, cy + 1]);
    }
    return changed;
  }
  var DRAW_UNDO_LIMIT = 40;
  function updateUndoButton() {
    if (els.drawUndoButton) els.drawUndoButton.disabled = drawState.undoStack.length === 0;
  }
  function saveUndoSnapshot() {
    drawState.undoStack.push({
      grid: [...drawState.grid],
      width: drawWidth(),
      height: drawHeight(),
      tiles: new Set(drawState.tiles),
      tileOriginX: drawState.tileOriginX,
      tileOriginY: drawState.tileOriginY
    });
    if (drawState.undoStack.length > DRAW_UNDO_LIMIT) drawState.undoStack.shift();
    updateUndoButton();
  }
  function doUndo() {
    if (!drawState.undoStack.length) return;
    const snapshot = drawState.undoStack.pop();
    drawState.grid = [...snapshot.grid];
    drawState.width = snapshot.width;
    drawState.height = snapshot.height;
    drawState.size = Math.max(snapshot.width, snapshot.height);
    if (snapshot.tiles) {
      drawState.tiles = new Set(snapshot.tiles);
      drawState.tileOriginX = snapshot.tileOriginX ?? 0;
      drawState.tileOriginY = snapshot.tileOriginY ?? 0;
    }
    drawState.lastCellKey = "";
    drawState.undoStrokeSnapshotTaken = false;
    paintDrawCanvas();
    updateUndoButton();
  }
  function getShapeCells(sx, sy, ex, ey) {
    const width = drawWidth();
    const height = drawHeight();
    const cells = [];
    if (drawState.shapeMode === "circle") {
      const r = Math.sqrt((ex - sx) ** 2 + (ey - sy) ** 2);
      const minX = Math.max(0, Math.floor(sx - r));
      const maxX = Math.min(width - 1, Math.ceil(sx + r));
      const minY = Math.max(0, Math.floor(sy - r));
      const maxY = Math.min(height - 1, Math.ceil(sy + r));
      for (let cy = minY; cy <= maxY; cy++) {
        for (let cx = minX; cx <= maxX; cx++) {
          if (Math.sqrt((cx - sx) ** 2 + (cy - sy) ** 2) <= r + 0.5) cells.push([cx, cy]);
        }
      }
    } else {
      const x0 = Math.max(0, Math.min(sx, ex));
      const x1 = Math.min(width - 1, Math.max(sx, ex));
      const y0 = Math.max(0, Math.min(sy, ey));
      const y1 = Math.min(height - 1, Math.max(sy, ey));
      for (let cy = y0; cy <= y1; cy++) {
        for (let cx = x0; cx <= x1; cx++) cells.push([cx, cy]);
      }
    }
    return cells.filter(([cx, cy]) => isCellActive(cx, cy));
  }
  function readFileAsDataUrl(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }
  function imageStampBox(sx, sy, ex, ey) {
    const img = drawState.stampImage;
    if (!img) return null;
    const boardW = drawWidth();
    const boardH = drawHeight();
    const aspect = (img.naturalWidth || img.width || 1) / (img.naturalHeight || img.height || 1);
    const dirX = ex >= sx ? 1 : -1;
    const dirY = ey >= sy ? 1 : -1;
    const dragW = Math.abs(ex - sx) + 1;
    const dragH = Math.abs(ey - sy) + 1;
    let w;
    let h;
    if (dragW / dragH >= aspect) {
      w = dragW;
      h = Math.max(1, Math.round(w / aspect));
    } else {
      h = dragH;
      w = Math.max(1, Math.round(h * aspect));
    }
    if (w > boardW || h > boardH) {
      const s = Math.min(boardW / w, boardH / h);
      w = Math.max(1, Math.floor(w * s));
      h = Math.max(1, Math.floor(h * s));
    }
    let x0 = dirX > 0 ? sx : sx - (w - 1);
    let y0 = dirY > 0 ? sy : sy - (h - 1);
    x0 = clamp(x0, 0, boardW - w);
    y0 = clamp(y0, 0, boardH - h);
    return { x0, y0, w, h };
  }
  function commitImageStamp() {
    const drag = drawState.shapeDrag;
    const end = drawState.shapeDragEnd;
    drawState.shapeDrag = null;
    drawState.shapeDragEnd = null;
    if (!drag || !end || !drawState.stampImage) {
      paintDrawCanvas();
      return;
    }
    const box = imageStampBox(drag.x, drag.y, end.x, end.y);
    if (!box || box.w < 1 || box.h < 1) {
      paintDrawCanvas();
      return;
    }
    const rows = convertImageToRectRows(drawState.stampImage, box.w, box.h, { removeWhite: false });
    const width = drawWidth();
    let painted = false;
    saveUndoSnapshot();
    for (let ry = 0; ry < box.h; ry += 1) {
      const row = rows[ry] || "";
      for (let rx = 0; rx < box.w; rx += 1) {
        const code = row[rx] || ".";
        if (code === ".") continue;
        drawState.grid[drawIndex(box.x0 + rx, box.y0 + ry, width)] = code;
        painted = true;
      }
    }
    if (!painted) {
      drawState.undoStack.pop();
      updateUndoButton();
    }
    drawState.lastCellKey = "";
    paintDrawCanvas();
    if (painted) showToast(`\u5DF2\u653E\u5165\u56FE\u7247\uFF1A${box.w}\xD7${box.h} \u8C46\u3002`);
  }
  function applyDrawToolAt(x, y) {
    if (!isCellActive(x, y)) return false;
    const key = `${x},${y}`;
    if (drawState.tool !== "fill" && drawState.tool !== "picker" && drawState.lastCellKey === key) return false;
    drawState.lastCellKey = key;
    if (drawState.tool === "eraser") {
      if (drawState.grid[drawIndex(x, y)] === ".") return false;
      if (!drawState.undoStrokeSnapshotTaken) {
        saveUndoSnapshot();
        drawState.undoStrokeSnapshotTaken = true;
      }
      return paintDrawCell(x, y, ".");
    }
    if (drawState.tool === "picker") {
      const pick = drawState.grid[drawIndex(x, y)];
      if (pick && pick !== "." && pick !== drawState.selectedColor) {
        drawState.selectedColor = pick;
        recordRecentColor(pick);
        renderDrawStudio();
      }
      return false;
    }
    if (drawState.tool === "fill") {
      const start = drawState.grid[drawIndex(x, y)];
      if (start === drawState.selectedColor) return false;
      saveUndoSnapshot();
      drawState.undoStrokeSnapshotTaken = true;
      const result2 = floodFillDraw(x, y, drawState.selectedColor);
      if (result2 && recordRecentColor(drawState.selectedColor)) {
        drawRenderKey = "";
        renderDrawPalette();
      }
      return result2;
    }
    if (drawState.grid[drawIndex(x, y)] === drawState.selectedColor) return false;
    if (!drawState.undoStrokeSnapshotTaken) {
      saveUndoSnapshot();
      drawState.undoStrokeSnapshotTaken = true;
    }
    const result = paintDrawCell(x, y, drawState.selectedColor);
    if (result && recordRecentColor(drawState.selectedColor)) {
      drawRenderKey = "";
      renderDrawPalette();
    }
    return result;
  }
  function paintDrawCanvas() {
    if (!els.drawCanvas) return;
    ensureDrawGrid();
    const canvas = els.drawCanvas;
    const ctx2 = canvas.getContext("2d");
    const dpr = Math.min(2, Math.max(1, window.devicePixelRatio || 1));
    const geometry = getDrawGeometry();
    if (!geometry) return;
    const { cssW, cssH, width, height, cell, gridW, gridH, x0, y0, cx, cy } = geometry;
    const pxW = Math.round(cssW * dpr);
    const pxH = Math.round(cssH * dpr);
    if (canvas.width !== pxW || canvas.height !== pxH) {
      canvas.width = pxW;
      canvas.height = pxH;
    }
    ctx2.setTransform(1, 0, 0, 1, 0, 0);
    ctx2.clearRect(0, 0, pxW, pxH);
    ctx2.setTransform(dpr, 0, 0, dpr, 0, 0);
    const theme = currentBackgroundTheme();
    ctx2.fillStyle = theme.table[1];
    ctx2.fillRect(0, 0, cssW, cssH);
    const v = drawState.view;
    ctx2.save();
    ctx2.translate(cx + v.panX, cy + v.panY);
    ctx2.scale(v.scale, v.scale);
    ctx2.translate(-cx, -cy);
    const T = BOARD_SIZE;
    const tileW = T * cell;
    const tileH = T * cell;
    const blocksPerTile = T / 10;
    for (const key of drawState.tiles) {
      const [tx, ty] = key.split(",").map(Number);
      const tileBoardX = x0 + (tx - drawState.tileOriginX) * tileW;
      const tileBoardY = y0 + (ty - drawState.tileOriginY) * tileH;
      drawBoardSkin(ctx2, {
        boardX: tileBoardX,
        boardY: tileBoardY,
        boardW: tileW,
        boardH: tileH,
        boardSize: Math.max(tileW, tileH),
        cell
      }, {
        cols: T,
        rows: T,
        brand: theme.brand,
        shadow: false,
        guides: false,
        frameInset: 0,
        outerRadius: 0,
        innerRadius: 0,
        blockOffsetX: (tx - drawState.tileOriginX) * blocksPerTile,
        blockOffsetY: (ty - drawState.tileOriginY) * blocksPerTile
      });
    }
    const pegR = cell * 0.138;
    const pegCenters = [];
    for (const key of drawState.tiles) {
      const [tx, ty] = key.split(",").map(Number);
      const tileBoardX = x0 + (tx - drawState.tileOriginX) * tileW;
      const tileBoardY = y0 + (ty - drawState.tileOriginY) * tileH;
      const startX = (tx - drawState.tileOriginX) * T;
      const startY = (ty - drawState.tileOriginY) * T;
      for (let ly = 0; ly < T; ly++) {
        for (let lx = 0; lx < T; lx++) {
          const code = drawState.grid[drawIndex(startX + lx, startY + ly, width)];
          if (code && code !== ".") continue;
          pegCenters.push([tileBoardX + lx * cell + cell / 2, tileBoardY + ly * cell + cell / 2]);
        }
      }
    }
    if (pegCenters.length) {
      ctx2.beginPath();
      for (const [pcx, pcy] of pegCenters) {
        ctx2.moveTo(pcx + pegR, pcy);
        ctx2.arc(pcx, pcy, pegR, 0, Math.PI * 2);
      }
      ctx2.fillStyle = "rgba(91, 104, 118, 0.30)";
      ctx2.fill();
      const hlR = pegR * 0.36;
      const hlOff = pegR * 0.22;
      ctx2.beginPath();
      for (const [pcx, pcy] of pegCenters) {
        ctx2.moveTo(pcx - hlOff + hlR, pcy - hlOff);
        ctx2.arc(pcx - hlOff, pcy - hlOff, hlR, 0, Math.PI * 2);
      }
      ctx2.fillStyle = "rgba(255, 255, 255, 0.55)";
      ctx2.fill();
    }
    for (const key of drawState.tiles) {
      const [tx, ty] = key.split(",").map(Number);
      const tileBoardX = x0 + (tx - drawState.tileOriginX) * tileW;
      const tileBoardY = y0 + (ty - drawState.tileOriginY) * tileH;
      const tileLayout = { boardX: tileBoardX, boardY: tileBoardY, boardW: tileW, boardH: tileH, boardSize: Math.max(tileW, tileH), cell };
      const startX = (tx - drawState.tileOriginX) * T;
      const startY = (ty - drawState.tileOriginY) * T;
      for (let ly = 0; ly < T; ly++) {
        for (let lx = 0; lx < T; lx++) {
          const code = drawState.grid[drawIndex(startX + lx, startY + ly, width)];
          if (code && code !== ".") {
            ctx2.fillStyle = palette[code] || "#9aa4b3";
            ctx2.fillRect(tileBoardX + lx * cell, tileBoardY + ly * cell, cell, cell);
          }
        }
      }
      ctx2.strokeStyle = "rgba(70, 84, 96, 0.08)";
      ctx2.lineWidth = 1 / v.scale;
      for (let i = 0; i <= T; i++) {
        const offset = i * cell;
        ctx2.beginPath();
        ctx2.moveTo(tileBoardX + offset, tileBoardY);
        ctx2.lineTo(tileBoardX + offset, tileBoardY + tileH);
        ctx2.stroke();
      }
      for (let i = 0; i <= T; i++) {
        const offset = i * cell;
        ctx2.beginPath();
        ctx2.moveTo(tileBoardX, tileBoardY + offset);
        ctx2.lineTo(tileBoardX + tileW, tileBoardY + offset);
        ctx2.stroke();
      }
      drawBoardGuides(ctx2, tileLayout, T, T, v.scale);
    }
    ctx2.save();
    ctx2.strokeStyle = "rgba(70, 84, 96, 0.16)";
    ctx2.lineWidth = 1 / v.scale;
    ctx2.lineJoin = "round";
    const tabLen = cell * 0.9;
    const tabDepth = cell * 0.5;
    for (const key of drawState.tiles) {
      const [tx, ty] = key.split(",").map(Number);
      const bx = x0 + (tx - drawState.tileOriginX) * tileW;
      const by = y0 + (ty - drawState.tileOriginY) * tileH;
      if (drawState.tiles.has(tileKey(tx + 1, ty))) {
        const sx = bx + tileW;
        const c1 = by + tileH / 3;
        const c2 = by + tileH * 2 / 3;
        ctx2.beginPath();
        ctx2.moveTo(sx, by);
        ctx2.lineTo(sx, c1 - tabLen);
        ctx2.lineTo(sx + tabDepth, c1 - tabLen);
        ctx2.lineTo(sx + tabDepth, c1 + tabLen);
        ctx2.lineTo(sx, c1 + tabLen);
        ctx2.lineTo(sx, c2 - tabLen);
        ctx2.lineTo(sx - tabDepth, c2 - tabLen);
        ctx2.lineTo(sx - tabDepth, c2 + tabLen);
        ctx2.lineTo(sx, c2 + tabLen);
        ctx2.lineTo(sx, by + tileH);
        ctx2.stroke();
      }
      if (drawState.tiles.has(tileKey(tx, ty + 1))) {
        const sy = by + tileH;
        const c1 = bx + tileW / 3;
        const c2 = bx + tileW * 2 / 3;
        ctx2.beginPath();
        ctx2.moveTo(bx, sy);
        ctx2.lineTo(c1 - tabLen, sy);
        ctx2.lineTo(c1 - tabLen, sy + tabDepth);
        ctx2.lineTo(c1 + tabLen, sy + tabDepth);
        ctx2.lineTo(c1 + tabLen, sy);
        ctx2.lineTo(c2 - tabLen, sy);
        ctx2.lineTo(c2 - tabLen, sy - tabDepth);
        ctx2.lineTo(c2 + tabLen, sy - tabDepth);
        ctx2.lineTo(c2 + tabLen, sy);
        ctx2.lineTo(bx + tileW, sy);
        ctx2.stroke();
      }
    }
    ctx2.restore();
    ctx2.strokeStyle = "rgba(70, 84, 96, 0.35)";
    ctx2.lineWidth = 1.5 / v.scale;
    for (const key of drawState.tiles) {
      const [tx, ty] = key.split(",").map(Number);
      const tileBoardX = x0 + (tx - drawState.tileOriginX) * tileW;
      const tileBoardY = y0 + (ty - drawState.tileOriginY) * tileH;
      if (!drawState.tiles.has(tileKey(tx, ty - 1))) {
        ctx2.beginPath();
        ctx2.moveTo(tileBoardX, tileBoardY);
        ctx2.lineTo(tileBoardX + tileW, tileBoardY);
        ctx2.stroke();
      }
      if (!drawState.tiles.has(tileKey(tx + 1, ty))) {
        ctx2.beginPath();
        ctx2.moveTo(tileBoardX + tileW, tileBoardY);
        ctx2.lineTo(tileBoardX + tileW, tileBoardY + tileH);
        ctx2.stroke();
      }
      if (!drawState.tiles.has(tileKey(tx, ty + 1))) {
        ctx2.beginPath();
        ctx2.moveTo(tileBoardX, tileBoardY + tileH);
        ctx2.lineTo(tileBoardX + tileW, tileBoardY + tileH);
        ctx2.stroke();
      }
      if (!drawState.tiles.has(tileKey(tx - 1, ty))) {
        ctx2.beginPath();
        ctx2.moveTo(tileBoardX, tileBoardY);
        ctx2.lineTo(tileBoardX, tileBoardY + tileH);
        ctx2.stroke();
      }
    }
    const tabs = drawBoardTabRects(geometry);
    ctx2.fillStyle = "#ffffff";
    ctx2.strokeStyle = "rgba(69, 93, 122, 0.38)";
    ctx2.lineWidth = Math.max(0.45, cell * 0.08);
    tabs.forEach((tab) => {
      ctx2.beginPath();
      ctx2.roundRect(tab.x, tab.y, tab.w, tab.h, Math.min(tab.w, tab.h) * 0.35);
      ctx2.fill();
      ctx2.stroke();
      const tabCx = tab.x + tab.w / 2;
      const tabCy = tab.y + tab.h / 2;
      const arm = Math.min(tab.w, tab.h) * 0.24;
      ctx2.beginPath();
      ctx2.moveTo(tabCx - arm, tabCy);
      ctx2.lineTo(tabCx + arm, tabCy);
      ctx2.moveTo(tabCx, tabCy - arm);
      ctx2.lineTo(tabCx, tabCy + arm);
      ctx2.stroke();
    });
    if (drawState.tool === "shape" && drawState.shapeDrag && drawState.shapeDragEnd) {
      const previewCells = getShapeCells(
        drawState.shapeDrag.x,
        drawState.shapeDrag.y,
        drawState.shapeDragEnd.x,
        drawState.shapeDragEnd.y
      );
      ctx2.save();
      ctx2.globalAlpha = 0.55;
      ctx2.fillStyle = palette[drawState.selectedColor] || "#9aa4b3";
      for (const [px, py] of previewCells) {
        ctx2.fillRect(x0 + px * cell, y0 + py * cell, cell, cell);
      }
      ctx2.restore();
    }
    if (drawState.tool === "image" && drawState.stampImage && drawState.shapeDrag && drawState.shapeDragEnd) {
      const box = imageStampBox(drawState.shapeDrag.x, drawState.shapeDrag.y, drawState.shapeDragEnd.x, drawState.shapeDragEnd.y);
      if (box) {
        const px = x0 + box.x0 * cell;
        const py = y0 + box.y0 * cell;
        const pw = box.w * cell;
        const ph = box.h * cell;
        ctx2.save();
        ctx2.globalAlpha = 0.88;
        ctx2.imageSmoothingEnabled = true;
        ctx2.drawImage(drawState.stampImage, px, py, pw, ph);
        ctx2.restore();
        ctx2.save();
        ctx2.strokeStyle = theme.brand || "#57b8a7";
        ctx2.lineWidth = 2;
        ctx2.strokeRect(px + 1, py + 1, pw - 2, ph - 2);
        ctx2.restore();
      }
    }
    ctx2.restore();
  }
  function openDrawPaletteSheet() {
    els.drawingPalettePanel?.classList.add("is-open");
    if (els.drawPaletteBackdrop) els.drawPaletteBackdrop.hidden = false;
    els.drawColorTrigger?.setAttribute("aria-expanded", "true");
  }
  function closeDrawPaletteSheet() {
    els.drawingPalettePanel?.classList.remove("is-open");
    if (els.drawPaletteBackdrop) els.drawPaletteBackdrop.hidden = true;
    els.drawColorTrigger?.setAttribute("aria-expanded", "false");
  }
  function updateDrawColorTrigger() {
    const code = drawState.selectedColor;
    const isTransparent = beadIds[code] === "H1";
    if (els.drawColorTriggerSwatch) {
      els.drawColorTriggerSwatch.style.background = isTransparent ? "" : palette[code] || "#9aa4b3";
      els.drawColorTriggerSwatch.classList.toggle("is-transparent", isTransparent);
    }
    if (els.drawColorTriggerCode) els.drawColorTriggerCode.textContent = beadIds[code] || code || "";
  }
  function renderDrawPalette() {
    if (!els.drawPalette) return;
    ensureDrawPaletteColor();
    updateDrawColorTrigger();
    const allCodes = allColorCodes();
    const query = (drawState.paletteQuery || "").trim().toUpperCase().replace(/\s+/g, "");
    const codes = query ? allCodes.filter((code) => (beadIds[code] || code).toUpperCase().includes(query)) : allCodes;
    const key = `${drawState.selectedColor}:${drawState.recentColors.join(",")}:${query}:${allCodes.join(",")}`;
    if (key === drawRenderKey) return;
    drawRenderKey = key;
    if (els.drawPaletteMeta) {
      els.drawPaletteMeta.textContent = query ? `${codes.length} / ${allCodes.length} \u8272` : `221\u8272\u677F`;
    }
    if (els.drawRecentColors) {
      els.drawRecentColors.innerHTML = drawState.recentColors.map((code) => {
        const selected = drawState.selectedColor === code;
        const label = beadIds[code] || code;
        const isTransparent = beadIds[code] === "H1";
        return `<button type="button" class="color-chip${selected ? " active" : ""}" data-draw-code="${code}" aria-label="\u9009\u62E9 ${label}" title="${label}">
        <span class="swatch${isTransparent ? " is-transparent" : ""}" style="${isTransparent ? "" : `background:${palette[code]}`}"></span>
        <span class="chip-label">${label}</span>
      </button>`;
      }).join("");
    }
    if (!codes.length) {
      els.drawPalette.innerHTML = `<p class="palette-empty">\u6CA1\u6709\u5339\u914D\u300C${escapeHtml(drawState.paletteQuery || "")}\u300D\u7684\u8272\u53F7</p>`;
      return;
    }
    els.drawPalette.innerHTML = codes.map((code) => {
      const selected = drawState.selectedColor === code;
      const label = beadIds[code] || code;
      const isTransparent = beadIds[code] === "H1";
      return `<button type="button" class="color-chip${selected ? " active" : ""}" data-draw-code="${code}" aria-label="\u9009\u62E9 ${label}" title="${label}">
      <span class="swatch${isTransparent ? " is-transparent" : ""}" style="${isTransparent ? "" : `background:${palette[code]}`}"></span>
      <span class="chip-label">${label}</span>
    </button>`;
    }).join("");
  }
  function renderDrawToolButtons() {
    if (!els.drawingStudio) return;
    els.drawingStudio.querySelectorAll("[data-draw-tool]").forEach((button) => {
      const active2 = button.dataset.drawTool === drawState.tool;
      button.classList.toggle("active", active2);
      button.setAttribute("aria-pressed", active2 ? "true" : "false");
    });
    const shapeBtn = els.drawingStudio.querySelector("[data-draw-tool='shape']");
    if (shapeBtn) {
      const isCircle = drawState.shapeMode === "circle";
      shapeBtn.setAttribute("aria-label", isCircle ? "\u5706\u5F62" : "\u77E9\u5F62");
      shapeBtn.innerHTML = icon(isCircle ? "circle" : "square", { size: 16 });
    }
    if (els.drawImageStampButton) {
      els.drawImageStampButton.classList.toggle("active", drawState.tool === "image");
    }
    if (els.drawUndoButton) els.drawUndoButton.disabled = drawState.undoStack.length === 0;
  }
  function renderDrawStudio() {
    if (state.appMode !== "draw") return;
    ensureDrawGrid();
    renderDrawPalette();
    renderDrawToolButtons();
    paintDrawCanvas();
  }
  function enterDrawMode() {
    ensureDrawPaletteColor();
    renderDrawStudio();
  }
  function useDrawPattern() {
    ensureDrawGrid();
    const rows = drawRowsFromGrid();
    const beadCount = rows.join("").replace(/\./g, "").length;
    if (!beadCount) {
      showToast("\u8BF7\u5148\u5728\u7ED8\u56FE\u53F0\u653E\u4E00\u4E9B\u989C\u8272\u3002");
      return;
    }
    const sourceWidth = drawWidth();
    const sourceHeight = drawHeight();
    const size = Math.max(sourceWidth, sourceHeight);
    const pattern = {
      id: newLibraryId("draw"),
      name: "\u7ED8\u5236\u56FE\u7EB8",
      size,
      width: sourceWidth,
      height: sourceHeight,
      craft: "\u539F\u7248",
      rows,
      sourceRows: rows,
      sourceSize: size,
      sourceWidth,
      sourceHeight,
      note: pickCustomPatternNote("draw", size, rows.join("")),
      tiles: [...drawState.tiles],
      tileOriginX: drawState.tileOriginX,
      tileOriginY: drawState.tileOriginY
    };
    addToLibrary(pattern);
    drawActions.loadPattern(pattern, false);
    drawActions.setAppMode("bead");
    showToast("\u7ED8\u56FE\u5DF2\u5B58\u5165\u56FE\u7EB8\u5E93\uFF0C\u5F00\u59CB\u62FC\u8C46\u3002");
  }
  function initDrawingStudioEvents() {
    els.drawingBackButton?.addEventListener("click", () => {
      drawActions.setAppMode("home");
    });
    els.drawSettingsButton?.addEventListener("click", () => drawActions.openSettingsModal());
    els.drawResetButton?.addEventListener("click", async () => {
      ensureDrawGrid();
      const hasContent = drawState.grid.some((cell) => cell && cell !== ".");
      if (hasContent && !await confirmModal({ message: "\u6E05\u7A7A\u4F1A\u4E22\u5931\u5F53\u524D\u7ED8\u56FE\uFF0C\u786E\u5B9A\u5417\uFF1F", okText: "\u6E05\u7A7A", danger: true })) return;
      drawState.grid = createDrawGrid(drawWidth(), drawHeight());
      drawState.lastCellKey = "";
      paintDrawCanvas();
      showToast("\u7ED8\u56FE\u5DF2\u6E05\u7A7A\u3002");
    });
    els.drawingStudio?.addEventListener("click", (event) => {
      const actionBtn = event.target.closest("[data-draw-action]");
      if (actionBtn?.dataset.drawAction === "undo") {
        doUndo();
        return;
      }
      const toolBtn = event.target.closest("[data-draw-tool]");
      if (toolBtn) {
        const tool = toolBtn.dataset.drawTool || "brush";
        if (tool === "shape" && drawState.tool === "shape") {
          drawState.shapeMode = drawState.shapeMode === "rect" ? "circle" : "rect";
        } else {
          drawState.tool = tool;
          drawState.lastCellKey = "";
        }
        renderDrawToolButtons();
        return;
      }
      const colorBtn = event.target.closest("[data-draw-code]");
      if (colorBtn) {
        const code = colorBtn.dataset.drawCode;
        if (code && palette[code]) {
          drawState.selectedColor = code;
          drawRenderKey = "";
          renderDrawPalette();
          closeDrawPaletteSheet();
        }
      }
    });
    els.drawColorTrigger?.addEventListener("click", openDrawPaletteSheet);
    els.drawPaletteCloseButton?.addEventListener("click", closeDrawPaletteSheet);
    els.drawPaletteBackdrop?.addEventListener("click", closeDrawPaletteSheet);
    els.drawPaletteSearch?.addEventListener("input", (event) => {
      drawState.paletteQuery = event.target.value || "";
      drawRenderKey = "";
      renderDrawPalette();
    });
    els.drawClearButton?.addEventListener("click", () => {
      ensureDrawGrid();
      drawState.grid = createDrawGrid(drawWidth(), drawHeight());
      drawState.lastCellKey = "";
      drawState.undoStack = [];
      drawState.undoStrokeSnapshotTaken = false;
      if (els.drawUndoButton) els.drawUndoButton.disabled = true;
      paintDrawCanvas();
      showToast("\u7ED8\u56FE\u5DF2\u6E05\u7A7A\u3002");
    });
    els.drawUsePatternButton?.addEventListener("click", () => {
      useDrawPattern();
    });
    els.drawImageStampButton?.addEventListener("click", () => {
      els.drawImageInput?.click();
    });
    els.drawImageInput?.addEventListener("change", async (event) => {
      const file = event.target.files?.[0];
      event.target.value = "";
      if (!file) return;
      try {
        const dataUrl = await readFileAsDataUrl(file);
        const image = await loadImageFromDataUrl(dataUrl);
        drawState.stampImage = image;
        drawState.tool = "image";
        drawState.lastCellKey = "";
        drawState.shapeDrag = null;
        drawState.shapeDragEnd = null;
        renderDrawToolButtons();
      } catch {
        showToast("\u56FE\u7247\u8BFB\u53D6\u5931\u8D25\uFF0C\u6362\u4E00\u5F20\u8BD5\u8BD5\u3002");
      }
    });
    els.drawShortCodeButton?.addEventListener("click", () => {
      openDrawCodeModal("export");
    });
    els.drawCodeGenerateBtn?.addEventListener("click", async () => {
      const title = (els.drawCodeTitleInput?.value || "").trim();
      if (!title) {
        showToast("\u8BF7\u5148\u7ED9\u56FE\u7EB8\u8D77\u4E2A\u540D\u5B57\uFF08\u6700\u591A 10 \u5B57\uFF09\u3002");
        els.drawCodeTitleInput?.focus();
        return;
      }
      const pattern = makeDrawPattern(title);
      const beadCount = pattern.rows.join("").replace(/\./g, "").length;
      if (!beadCount) {
        showToast("\u8BF7\u5148\u5728\u7ED8\u56FE\u53F0\u653E\u4E00\u4E9B\u989C\u8272\u3002");
        return;
      }
      const button = els.drawCodeGenerateBtn;
      if (button) {
        button.disabled = true;
        button.textContent = "\u751F\u6210\u4E2D";
      }
      const controller = new AbortController();
      const timeout = window.setTimeout(() => controller.abort(), 5e3);
      try {
        const share = await drawActions.requestCloudShareForPattern(pattern, { signal: controller.signal });
        window.clearTimeout(timeout);
        if (share?.shortId) {
          const display = `\u3010${title}\u3011${share.shortId}`;
          showDrawCodeOutput(display);
          await drawActions.autoCopyText(
            display,
            `\u5206\u4EAB\u7801\u5DF2\u590D\u5236\uFF1A${display}`,
            `\u5206\u4EAB\u7801\u5DF2\u751F\u6210\uFF1A${display}\uFF08\u590D\u5236\u5931\u8D25\uFF0C\u8BF7\u624B\u52A8\u590D\u5236\uFF09`
          );
        } else {
          showToast("\u670D\u52A1\u5668\u7E41\u5FD9\uFF0C\u8BF7\u7A0D\u540E\u518D\u8BD5\u3002");
        }
      } catch {
        window.clearTimeout(timeout);
        showToast("\u670D\u52A1\u5668\u7E41\u5FD9\uFF0C\u8BF7\u7A0D\u540E\u518D\u8BD5\u3002");
      } finally {
        if (button) {
          button.disabled = false;
          button.textContent = "\u751F\u6210\u5206\u4EAB\u7801";
        }
      }
    });
    els.drawSubmitGalleryButton?.addEventListener("click", () => {
      const pattern = makeDrawPattern("\u7ED8\u5236\u56FE\u7EB8");
      const beadCount = pattern.rows.join("").replace(/\./g, "").length;
      if (!beadCount) {
        showToast("\u8BF7\u5148\u5728\u7ED8\u56FE\u53F0\u653E\u4E00\u4E9B\u989C\u8272\u3002");
        return;
      }
      try {
        drawActions.openGallerySubmitModal({
          name: pattern.name,
          patternCode: encodePatternCode(pattern)
        });
      } catch {
        showToast("\u5F53\u524D\u56FE\u7EB8\u65E0\u6CD5\u6295\u7A3F\u3002");
      }
    });
    els.drawImportButton?.addEventListener("click", async () => {
      openDrawCodeModal("import");
    });
    els.drawCodeImportConfirmBtn?.addEventListener("click", async () => {
      const raw = els.drawCodeInput?.value || "";
      if (drawCodeMode === "import-bead") {
        const ok = await drawActions.importPatternCode(raw);
        if (ok) closeDrawCodeModal();
        return;
      }
      const shortId = extractCloudShortId(raw);
      if (!shortId) {
        showToast("\u8BF7\u5148\u7C98\u8D34\u5206\u4EAB\u7801\u3002");
        return;
      }
      try {
        const code = (await requestShareApi("/api/share/open", { shortId })).patternCode;
        const decoded = decodePatternCode(code);
        loadDrawPattern(decoded);
        closeDrawCodeModal();
        showToast(`\u5DF2\u5BFC\u5165\u56FE\u7EB8\uFF1A${decoded.width}x${decoded.height}\u3002`);
      } catch (error) {
        showToast("\u5206\u4EAB\u7801\u65E0\u6548\u6216\u5DF2\u8FC7\u671F\u3002");
      }
    });
    els.drawCodeCopyBtn?.addEventListener("click", async () => {
      await drawActions.autoCopyText(els.drawCodeInput?.value || "", "\u5DF2\u590D\u5236\u3002", "\u590D\u5236\u5931\u8D25\uFF0C\u8BF7\u624B\u52A8\u590D\u5236\u3002");
    });
    [els.drawCodeCancelBtn, els.drawCodeCloseBtn].forEach((btn) => {
      btn?.addEventListener("click", closeDrawCodeModal);
    });
    const handleDrawPointer = (event) => {
      const cell = drawCellFromPointer(event);
      if (!cell) return;
      const changed = applyDrawToolAt(cell.x, cell.y);
      if (changed || drawState.tool === "fill") paintDrawCanvas();
    };
    if (els.drawCanvas) {
      els.drawCanvas.addEventListener("pointerdown", (event) => {
        els.drawCanvas.setPointerCapture(event.pointerId);
        const tileToAdd = drawBoardTabAtPointer(event);
        if (tileToAdd) {
          const { tx, ty } = tileToAdd;
          saveUndoSnapshot();
          addTileAt(tx, ty);
          resetDrawView();
          paintDrawCanvas();
          showToast("\u5DF2\u6DFB\u52A0\u4E00\u5757\u677F\u3002");
          return;
        }
        const rect = els.drawCanvas.getBoundingClientRect();
        drawPointers[event.pointerId] = { x: event.clientX - rect.left, y: event.clientY - rect.top };
        if (Object.keys(drawPointers).length >= 2) {
          drawState.drawing = false;
          drawState.lastCellKey = "";
          drawState.shapeDrag = null;
          startDrawGesture();
        } else if (drawState.tool === "shape" || drawState.tool === "image") {
          const cell = drawCellFromPointer(event);
          if (cell) {
            drawState.undoStrokeSnapshotTaken = false;
            drawState.shapeDrag = { x: cell.x, y: cell.y };
            drawState.shapeDragEnd = { x: cell.x, y: cell.y };
            drawState.drawing = true;
          }
        } else {
          drawState.undoStrokeSnapshotTaken = false;
          drawState.drawing = true;
          drawState.lastCellKey = "";
          handleDrawPointer(event);
        }
      });
      els.drawCanvas.addEventListener("pointermove", (event) => {
        const rect = els.drawCanvas.getBoundingClientRect();
        if (drawPointers[event.pointerId]) {
          drawPointers[event.pointerId] = { x: event.clientX - rect.left, y: event.clientY - rect.top };
        }
        if (Object.keys(drawPointers).length >= 2 && drawGesture?.active) {
          updateDrawGesture();
          return;
        }
        if (!drawState.drawing) return;
        if (drawState.tool === "shape" || drawState.tool === "image") {
          const cell = drawCellFromPointer(event);
          if (cell && drawState.shapeDrag) {
            drawState.shapeDragEnd = { x: cell.x, y: cell.y };
            paintDrawCanvas();
          }
          return;
        }
        if (drawState.tool === "fill" || drawState.tool === "picker") return;
        handleDrawPointer(event);
      });
      const endDrawPointer = (event) => {
        delete drawPointers[event.pointerId];
        if (Object.keys(drawPointers).length < 2 && drawGesture) {
          drawGesture.active = false;
        }
        if (Object.keys(drawPointers).length === 0) {
          if (drawState.tool === "image" && drawState.shapeDrag && drawState.shapeDragEnd) {
            commitImageStamp();
          } else if (drawState.tool === "shape" && drawState.shapeDrag && drawState.shapeDragEnd) {
            const cells = getShapeCells(
              drawState.shapeDrag.x,
              drawState.shapeDrag.y,
              drawState.shapeDragEnd.x,
              drawState.shapeDragEnd.y
            );
            const code = drawState.selectedColor;
            const shouldSaveUndo = cells.some(([cx, cy]) => drawState.grid[drawIndex(cx, cy)] !== code);
            if (shouldSaveUndo) saveUndoSnapshot();
            let painted = false;
            for (const [cx, cy] of cells) painted = paintDrawCell(cx, cy, code) || painted;
            if (painted) {
              recordRecentColor(code);
              drawRenderKey = "";
              renderDrawPalette();
            }
            drawState.shapeDrag = null;
            drawState.shapeDragEnd = null;
            paintDrawCanvas();
          }
          drawState.drawing = false;
          drawState.lastCellKey = "";
          drawState.undoStrokeSnapshotTaken = false;
        }
      };
      els.drawCanvas.addEventListener("pointerup", endDrawPointer);
      els.drawCanvas.addEventListener("pointerleave", (event) => {
        endDrawPointer(event);
      });
      els.drawCanvas.addEventListener("pointercancel", endDrawPointer);
      els.drawCanvas.addEventListener("wheel", (event) => {
        event.preventDefault();
        const rect = els.drawCanvas.getBoundingClientRect();
        const mx = event.clientX - rect.left;
        const my = event.clientY - rect.top;
        const g = getDrawGeometry();
        if (!g) return;
        const { cx, cy } = g;
        const v = drawState.view;
        const factor = event.deltaY < 0 ? 1.15 : 1 / 1.15;
        const nextScale = clamp(v.scale * factor, 1, maxBoardScale(g));
        const ratio = nextScale / v.scale;
        const nextPanX = mx - cx - (mx - cx - v.panX) * ratio;
        const nextPanY = my - cy - (my - cy - v.panY) * ratio;
        setDrawZoom(nextScale, nextPanX, nextPanY);
      }, { passive: false });
      els.drawCanvas.addEventListener("dblclick", () => {
        resetDrawView();
        paintDrawCanvas();
      });
    }
  }

  // src/custom-pattern.js
  var customPatternActions = {
    loadPattern: () => {
    }
  };
  function setCustomPatternActions(actions = {}) {
    Object.assign(customPatternActions, actions);
  }
  function normalizedCustomDenoiseLevel(value) {
    return clamp(Math.round(Number(value) || 0), 0, 100);
  }
  function setCustomDenoiseControls(level) {
    const normalized = normalizedCustomDenoiseLevel(level);
    state.customDenoiseLevel = normalized;
    if (els.customDenoiseSlider) els.customDenoiseSlider.value = String(normalized);
    if (els.customDenoiseValue) els.customDenoiseValue.textContent = `${normalized}%`;
    return normalized;
  }
  async function reconvertCustomPatternAtSize(basePattern, size, keepPhase = false) {
    try {
      const image = await loadImageFromDataUrl(basePattern.sourceImageDataUrl);
      const removeWhite = basePattern.sourceRemoveWhite !== false;
      const denoiseLevel = normalizedCustomDenoiseLevel(basePattern.sourceDenoiseLevel ?? state.customDenoiseLevel);
      const result = convertImageToPattern(image, { removeWhite, size, denoiseLevel });
      const rows = result.rows;
      const beadCount = rows.join("").replace(/\./g, "").length;
      if (!beadCount) {
        showToast("\u8FD9\u4E2A\u5C3A\u5BF8\u4E0B\u8BC6\u522B\u4E0D\u5230\u53EF\u7528\u8C46\u5B50\u3002");
        return;
      }
      const updated = {
        ...basePattern,
        size,
        rows,
        sourceRows: rows,
        sourceSize: size,
        sourceDenoiseLevel: denoiseLevel,
        conversionStats: result.stats,
        note: pickCustomPatternNote(
          "image",
          size,
          basePattern.sourceImageDataUrl || `${size}|${rows.join("")}`
        )
      };
      invalidatePatternDataCaches(updated);
      const idx = patterns.findIndex((item) => baseIdFor(item) === baseIdFor(basePattern));
      if (idx >= 0) patterns[idx] = updated;
      state.lastConversionStats = result.stats;
      customPatternActions.loadPattern(updated, keepPhase);
      showToast(`\u5DF2\u6309 ${size}x${size} \u91CD\u65B0\u8BC6\u522B\u56FE\u7247\u56FE\u7EB8\u3002`);
    } catch (error) {
      showToast("\u56FE\u7247\u91CD\u65B0\u8BC6\u522B\u5931\u8D25\u3002");
    }
  }
  var MAX_IMAGE_BYTES = 8 * 1024 * 1024;
  var MAX_SOURCE_PIXELS = 24e6;
  function handleCustomImage(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      showToast("\u8BF7\u9009\u62E9\u56FE\u7247\u6587\u4EF6\u3002");
      event.target.value = "";
      return;
    }
    if (file.size > MAX_IMAGE_BYTES) {
      showToast("\u56FE\u7247\u592A\u5927\uFF0C\u8BF7\u9009\u62E9 8MB \u4EE5\u5185\u7684\u56FE\u7247\u3002");
      event.target.value = "";
      return;
    }
    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const sourceImageDataUrl = String(reader.result || "");
        const image = await loadImageFromDataUrl(sourceImageDataUrl);
        if (image.naturalWidth * image.naturalHeight > MAX_SOURCE_PIXELS) {
          showToast("\u56FE\u7247\u50CF\u7D20\u592A\u591A\uFF0C\u8BF7\u6362\u4E00\u5F20\u66F4\u5C0F\u7684\u56FE\u7247\u3002");
          return;
        }
        const size = normalizePatternSize();
        const removeWhite = els.customWhiteToggle.checked;
        const denoiseLevel = setCustomDenoiseControls(els.customDenoiseSlider?.value ?? state.customDenoiseLevel);
        setSizeControls(size);
        await new Promise((resolve) => setTimeout(resolve, 16));
        const result = convertImageToPattern(image, {
          removeWhite,
          size,
          denoiseLevel
        });
        const rows = result.rows;
        const beadCount = rows.join("").replace(/\./g, "").length;
        if (!beadCount) {
          showToast("\u8FD9\u5F20\u56FE\u8F6C\u6362\u540E\u6CA1\u6709\u53EF\u7528\u8C46\u5B50\u3002");
          return;
        }
        const pattern = {
          id: newLibraryId("img"),
          name: "\u672A\u547D\u540D",
          size,
          craft: "\u539F\u7248",
          rows,
          sourceRows: rows,
          sourceSize: size,
          sourceImageDataUrl,
          sourceRemoveWhite: removeWhite,
          sourceDenoiseLevel: denoiseLevel,
          conversionStats: result.stats,
          note: pickCustomPatternNote("image", size, sourceImageDataUrl)
        };
        state.lastConversionStats = result.stats;
        addToLibrary(pattern);
        customPatternActions.loadPattern(pattern);
        showToast(`\u81EA\u5B9A\u4E49\u56FE\u7EB8\u5DF2\u751F\u6210\uFF1A${result.stats.total}\u9897 / ${result.stats.colors.length}\u8272\u3002`);
      } catch (error) {
        showToast("\u56FE\u7247\u8BFB\u53D6\u5931\u8D25\u3002");
      } finally {
        event.target.value = "";
      }
    };
    reader.onerror = () => {
      showToast("\u56FE\u7247\u8BFB\u53D6\u5931\u8D25\u3002");
      event.target.value = "";
    };
    showToast("\u6B63\u5728\u8BC6\u522B\u56FE\u7247\u2026");
    reader.readAsDataURL(file);
  }
  function initCustomPatternEvents() {
    let customDenoiseTimer = null;
    els.customDenoiseSlider?.addEventListener("input", () => {
      const level = setCustomDenoiseControls(els.customDenoiseSlider.value);
      const current = state.selectedPattern;
      if (!isCustomFromImagePattern(current)) return;
      if (customDenoiseTimer) window.clearTimeout(customDenoiseTimer);
      customDenoiseTimer = window.setTimeout(() => {
        const base = findBasePattern(current);
        base.sourceDenoiseLevel = level;
        reconvertCustomPatternAtSize(base, current.size, state.phase !== "choose");
      }, 140);
    });
    els.customDenoiseSlider?.addEventListener("change", () => {
      const level = setCustomDenoiseControls(els.customDenoiseSlider.value);
      const current = state.selectedPattern;
      if (!isCustomFromImagePattern(current)) return;
      if (customDenoiseTimer) {
        window.clearTimeout(customDenoiseTimer);
        customDenoiseTimer = null;
      }
      const base = findBasePattern(current);
      base.sourceDenoiseLevel = level;
      reconvertCustomPatternAtSize(base, current.size, state.phase !== "choose");
    });
    els.customImageInput?.addEventListener("change", handleCustomImage);
  }

  // src/session.js
  var sessionVersion = 2;
  var restorablePhases = /* @__PURE__ */ new Set(["place", "inspect", "iron", "cool", "finish"]);
  var sessionActions = {
    loadPattern: () => {
    },
    setPhase: () => {
    }
  };
  function setSessionActions(actions = {}) {
    Object.assign(sessionActions, actions);
  }
  function clearStoredSession() {
    try {
      localStorage.removeItem(sessionKey);
    } catch {
    }
  }
  function clearAutoSave() {
    clearStoredSession();
  }
  function normalizePlaced(placed, total) {
    if (!Array.isArray(placed)) return Array(total).fill(null);
    return Array.from({ length: total }, (_, index2) => {
      const code = placed[index2];
      return code && palette[code] ? code : null;
    });
  }
  function normalizeHeat(heat, total) {
    if (!Array.isArray(heat)) return Array(total).fill(0);
    return Array.from({ length: total }, (_, index2) => Number(heat[index2]) || 0);
  }
  function regridRows(rows, fromSize, toSize) {
    if (!Array.isArray(rows)) return null;
    const offset = Math.floor((toSize - fromSize) / 2);
    const out = [];
    for (let ty = 0; ty < toSize; ty += 1) {
      const sy = ty - offset;
      let line = "";
      for (let tx = 0; tx < toSize; tx += 1) {
        const sx = tx - offset;
        const code = sy >= 0 && sy < fromSize && sx >= 0 && sx < fromSize ? rows[sy]?.[sx] : ".";
        line += code && code !== "." ? code : ".";
      }
      out.push(line);
    }
    return out;
  }
  function padGridTo(oldRows, oldW, oldH, newW, newH) {
    const out = [];
    for (let y = 0; y < newH; y += 1) {
      let line = "";
      for (let x = 0; x < newW; x += 1) {
        line += y < oldH && x < oldW ? oldRows[y]?.[x] || "." : ".";
      }
      out.push(line);
    }
    return out;
  }
  function applyBoardGeometry(pattern, session) {
    const bw = Number.parseInt(session.boardWidth, 10);
    const bh = Number.parseInt(session.boardHeight, 10);
    if (!Number.isFinite(bw) || !Number.isFinite(bh) || bw <= 0 || bh <= 0) return;
    if (bw === boardCols(pattern) && bh === boardRows(pattern)) return;
    let rows = null;
    if (Array.isArray(session.boardRows) && session.boardRows.length === bh) {
      const candidate = session.boardRows.map((r) => String(r || "").slice(0, bw).padEnd(bw, "."));
      if (candidate.every((r) => [...r].every((c) => c === "." || palette[c]))) rows = candidate;
    }
    if (!rows) rows = padGridTo(pattern.rows || [], boardCols(pattern), boardRows(pattern), bw, bh);
    pattern.rows = rows;
    pattern.sourceRows = rows;
    pattern.width = bw;
    pattern.height = bh;
    pattern.size = Math.max(bw, bh);
    pattern.sourceSize = pattern.size;
    invalidatePatternDataCaches(pattern);
  }
  function regridSquare(arr, fromSize, toSize, fill) {
    const out = Array(toSize * toSize).fill(fill);
    if (!Array.isArray(arr)) return out;
    const offset = Math.floor((toSize - fromSize) / 2);
    for (let y = 0; y < fromSize; y += 1) {
      const ty = y + offset;
      if (ty < 0 || ty >= toSize) continue;
      for (let x = 0; x < fromSize; x += 1) {
        const tx = x + offset;
        if (tx < 0 || tx >= toSize) continue;
        out[ty * toSize + tx] = arr[y * fromSize + x];
      }
    }
    return out;
  }
  function normalizePatternSizeFromSession(value, fallback) {
    if (value === void 0 || value === null) return normalizePatternSize(fallback);
    const parsed = Number.parseInt(value, 10);
    if (!Number.isFinite(parsed)) return null;
    return normalizePatternSize(parsed);
  }
  function normalizeSpill(spill, total = Number.MAX_SAFE_INTEGER) {
    if (!spill || typeof spill !== "object") return null;
    const index2 = Number(spill.index);
    const code = spill.code;
    if (!Number.isInteger(index2) || index2 < 0 || index2 >= total) return null;
    if (!code || !palette[code]) return null;
    return {
      ...spill,
      index: index2,
      code
    };
  }
  function normalizeTrayMatrix(matrix) {
    if (!Array.isArray(matrix)) return [];
    return matrix.filter((row) => Array.isArray(row)).map((row) => row.map(Boolean));
  }
  function normalizeBoardView(boardView) {
    if (!boardView || typeof boardView !== "object") return { scale: 1, panX: 0, panY: 0 };
    const scale = Number(boardView.scale);
    const panX = Number(boardView.panX);
    const panY = Number(boardView.panY);
    return {
      scale: Number.isFinite(scale) && scale > 0 ? Math.min(scale, 8) : 1,
      panX: Number.isFinite(panX) ? panX : 0,
      panY: Number.isFinite(panY) ? panY : 0
    };
  }
  function normalizeToolPose(toolPose) {
    if (!toolPose || typeof toolPose !== "object") return { x: 0, y: 0, visible: false };
    return {
      x: Number(toolPose.x) || 0,
      y: Number(toolPose.y) || 0,
      visible: Boolean(toolPose.visible)
    };
  }
  function normalizeMoveDir(dir) {
    if (!dir || typeof dir !== "object") return { x: 1, y: 0 };
    const x = Math.sign(Number(dir.x) || 0);
    const y = Math.sign(Number(dir.y) || 0);
    return x || y ? { x, y } : { x: 1, y: 0 };
  }
  function snapshotCustomPattern(pattern) {
    if (!pattern || !baseIdFor(pattern).startsWith("custom-")) return null;
    return {
      kind: "custom-pattern",
      sourceKind: pattern.sourceImageDataUrl ? "image" : "rows",
      sourceWasImage: Boolean(pattern.sourceImageDataUrl),
      id: baseIdFor(pattern),
      name: pattern.name,
      size: pattern.size,
      width: pattern.width,
      height: pattern.height,
      craft: pattern.craft,
      rows: pattern.rows,
      sourceRows: pattern.sourceRows,
      sourceSize: pattern.sourceSize,
      sourceWidth: pattern.sourceWidth,
      sourceHeight: pattern.sourceHeight,
      sourceRemoveWhite: pattern.sourceRemoveWhite,
      sourceDenoiseLevel: pattern.sourceDenoiseLevel,
      conversionStats: pattern.conversionStats,
      note: pattern.note
    };
  }
  function normalizeRows(rows, size) {
    if (!Array.isArray(rows) || rows.length !== size) return null;
    const normalized = rows.map((row) => String(row || "").slice(0, size).padEnd(size, "."));
    const valid = normalized.every((row) => row.length === size && [...row].every((code) => code === "." || palette[code]));
    return valid ? normalized : null;
  }
  function normalizeRectRows(rows, width, height) {
    if (!Array.isArray(rows) || rows.length !== height) return null;
    const normalized = rows.map((row) => String(row || "").slice(0, width).padEnd(width, "."));
    const valid = normalized.every((row) => row.length === width && [...row].every((code) => code === "." || palette[code]));
    return valid ? normalized : null;
  }
  function restoreCustomPattern(snapshot) {
    if (!snapshot || !snapshot.size) return null;
    const savedWidth = Number.parseInt(snapshot.width, 10);
    const savedHeight = Number.parseInt(snapshot.height, 10);
    const isBoardLayout = Number.isFinite(savedWidth) && Number.isFinite(savedHeight) && savedWidth >= BOARD_SIZE && savedHeight >= BOARD_SIZE && savedWidth % BOARD_SIZE === 0 && savedHeight % BOARD_SIZE === 0;
    if (isBoardLayout) {
      const rows2 = normalizeRectRows(snapshot.rows, savedWidth, savedHeight);
      if (!rows2) return null;
      const pattern2 = {
        ...snapshot,
        id: snapshot.id || "custom-session",
        name: snapshot.name || "\u81EA\u5B9A\u4E49\u56FE\u7EB8",
        craft: snapshot.craft || "\u539F\u7248",
        size: Math.max(savedWidth, savedHeight),
        width: savedWidth,
        height: savedHeight,
        rows: rows2,
        sourceRows: rows2,
        sourceSize: Math.max(savedWidth, savedHeight),
        sourceWidth: savedWidth,
        sourceHeight: savedHeight
      };
      upsertPoolPattern(pattern2);
      state.patternsDirty = true;
      return pattern2;
    }
    const size = normalizePatternSize();
    const fitRows = (src, fromValue) => {
      if (!Array.isArray(src)) return null;
      const direct = normalizeRows(src, size);
      if (direct) return direct;
      const fromSize = Number.parseInt(fromValue, 10);
      if (Number.isFinite(fromSize) && fromSize > 0 && fromSize !== size) {
        return normalizeRows(regridRows(src, fromSize, size), size);
      }
      return null;
    };
    const rows = fitRows(snapshot.rows, snapshot.size);
    if (!rows) return null;
    const sourceRows = fitRows(snapshot.sourceRows || snapshot.rows, snapshot.sourceSize || snapshot.size) || rows;
    const pattern = {
      ...snapshot,
      id: snapshot.id || "custom-session",
      name: snapshot.name || "\u81EA\u5B9A\u4E49\u56FE\u7EB8",
      craft: snapshot.craft || "\u539F\u7248",
      size,
      width: size,
      height: size,
      rows,
      sourceRows,
      sourceSize: size
    };
    upsertPoolPattern(pattern);
    state.patternsDirty = true;
    return pattern;
  }
  function findStoredPattern(id) {
    const storedId = String(id || "");
    const fallbackId = storedId.replace(/-\d+$/, "");
    return patterns.find((pattern) => pattern.id === storedId || pattern.id === fallbackId) || null;
  }
  function isSupportedSessionVersion(version) {
    if (version === void 0 || version === null) return true;
    return Number.isInteger(version) && version > 0 && version <= sessionVersion;
  }
  function captureSession() {
    const patternSize = state.selectedPattern?.size || state.patternSize;
    return {
      version: sessionVersion,
      phase: state.phase,
      buildMs: buildElapsedMs(),
      sandboxMode: state.sandboxMode,
      lampOn: state.lampOn,
      selectedPatternId: state.selectedPattern ? baseIdFor(state.selectedPattern) : null,
      customPattern: snapshotCustomPattern(state.selectedPattern),
      patternColorMaps: state.patternColorMaps,
      patternSize,
      boardWidth: boardCols(state.selectedPattern),
      boardHeight: boardRows(state.selectedPattern),
      // Stored only for grown multi-tile boards so they restore exactly.
      boardRows: boardCols(state.selectedPattern) !== boardRows(state.selectedPattern) || boardCols(state.selectedPattern) > BOARD_SIZE || boardRows(state.selectedPattern) > BOARD_SIZE ? state.selectedPattern?.rows : void 0,
      placed: state.placed,
      heat: state.heat,
      tool: state.tool,
      selectedColor: state.selectedColor,
      trayColor: state.trayColor,
      trayProgress: state.trayProgress,
      trayBeans: state.trayBeans,
      trayCapacity: state.trayCapacity,
      trayMatrix: state.trayMatrix,
      trayPourId: state.trayPourId,
      tweezerBead: state.tweezerBead,
      needleLoaded: state.needleLoaded,
      toolPose: state.toolPose,
      lastMoveDir: state.lastMoveDir,
      errors: state.errors,
      warp: state.warp,
      cooling: state.cooling,
      spill: state.spill,
      boardView: {
        scale: state.boardView.scale,
        panX: state.boardView.panX,
        panY: state.boardView.panY
      }
    };
  }
  function autoSave() {
    if (state.phase === "choose") {
      clearStoredSession();
      return false;
    }
    if (!restorablePhases.has(state.phase) || !state.selectedPattern) return false;
    try {
      localStorage.setItem(sessionKey, JSON.stringify(captureSession()));
      return true;
    } catch {
      clearStoredSession();
      return false;
    }
  }
  function flushAutoSave() {
    return autoSave();
  }
  function loadAutoSave() {
    try {
      const data = localStorage.getItem(sessionKey);
      if (!data) return false;
      const session = JSON.parse(data);
      if (!session || !isSupportedSessionVersion(session.version) || !restorablePhases.has(session.phase)) {
        clearStoredSession();
        return false;
      }
      const pattern = restoreCustomPattern(session.customPattern) || findStoredPattern(session.selectedPatternId);
      if (!pattern) {
        clearStoredSession();
        return false;
      }
      if (session.patternColorMaps && typeof session.patternColorMaps === "object") state.patternColorMaps = session.patternColorMaps;
      const restoredSize = normalizePatternSizeFromSession(session.patternSize, pattern.size);
      if (!restoredSize) {
        clearStoredSession();
        return false;
      }
      state.patternSize = restoredSize;
      const restoredPattern = resizePattern(pattern, state.patternSize);
      applyBoardGeometry(restoredPattern, session);
      sessionActions.loadPattern(restoredPattern, true);
      state.phase = session.phase;
      state.sandboxMode = Boolean(session.sandboxMode);
      state.lampOn = Boolean(session.lampOn);
      state.patternSize = restoredPattern.size;
      const cols = boardCols(restoredPattern);
      const rows = boardRows(restoredPattern);
      const total = cols * rows;
      const savedSize = Number.parseInt(session.patternSize, 10);
      const isGrown = cols !== rows || cols > BOARD_SIZE || rows > BOARD_SIZE;
      const needRegrid = !isGrown && Number.isFinite(savedSize) && savedSize > 0 && savedSize !== cols;
      const placedSource = needRegrid ? regridSquare(session.placed, savedSize, cols, null) : session.placed;
      const heatSource = needRegrid ? regridSquare(session.heat, savedSize, cols, 0) : session.heat;
      state.placed = normalizePlaced(placedSource, total);
      invalidatePlacedCounts();
      state.heat = normalizeHeat(heatSource, total);
      const spill = needRegrid ? null : normalizeSpill(session.spill, total);
      state.tool = session.tool === "tweezers" ? "tweezers" : "needle";
      state.selectedColor = session.selectedColor && palette[session.selectedColor] ? session.selectedColor : state.selectedColor;
      state.trayColor = session.trayColor && palette[session.trayColor] ? session.trayColor : null;
      state.trayProgress = Math.max(0, Number(session.trayProgress) || 0);
      state.trayBeans = Math.max(0, Number(session.trayBeans) || 0);
      state.trayCapacity = Math.max(0, Number(session.trayCapacity) || 0);
      state.trayMatrix = normalizeTrayMatrix(session.trayMatrix);
      state.trayPourId = Math.max(0, Number(session.trayPourId) || 0);
      state.tweezerBead = session.tweezerBead && palette[session.tweezerBead] ? session.tweezerBead : null;
      state.needleLoaded = Math.max(0, Number(session.needleLoaded) || 0);
      state.toolPose = normalizeToolPose(session.toolPose);
      state.lastMoveDir = normalizeMoveDir(session.lastMoveDir);
      state.errors = needRegrid ? [] : session.errors || [];
      state.warp = session.warp || 18;
      state.cooling = session.cooling || 0;
      setBuildElapsedMs(Number(session.buildMs) || 0);
      state.buildMs = buildElapsedMs();
      state.spill = spill;
      state.boardView = {
        ...state.boardView,
        ...normalizeBoardView(session.boardView)
      };
      sessionActions.setPhase(state.phase);
      return true;
    } catch {
      clearStoredSession();
      return false;
    }
  }

  // src/logo.js
  var LOGO_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" aria-hidden="true" focusable="false">
  <rect width="64" height="64" rx="14" fill="#F8FBF9"/>
  <path d="M17 18c0-4.4 3.6-8 8-8h14c4.4 0 8 3.6 8 8v28c0 4.4-3.6 8-8 8H25c-4.4 0-8-3.6-8-8V18z" fill="#DDEBE7"/>
  <circle cx="26" cy="22" r="9" fill="#57B8A7"/>
  <circle cx="40" cy="22" r="9" fill="#E7645F"/>
  <circle cx="26" cy="40" r="9" fill="#D99B3D"/>
  <circle cx="40" cy="40" r="9" fill="#4D77B8"/>
  <circle cx="26" cy="22" r="3.4" fill="#F8FBF9"/>
  <circle cx="40" cy="22" r="3.4" fill="#F8FBF9"/>
  <circle cx="26" cy="40" r="3.4" fill="#F8FBF9"/>
  <circle cx="40" cy="40" r="3.4" fill="#F8FBF9"/>
  <path d="M49 13l4 4-4 4-4-4 4-4z" fill="#FFF0A8" stroke="#D99B3D" stroke-width="1.5"/>
</svg>`;
  var LOGO_DATA_URL = `data:image/svg+xml,${encodeURIComponent(LOGO_SVG)}`;
  function hydrateLogo(root = document) {
    if (!root?.querySelectorAll) return 0;
    let count = 0;
    root.querySelectorAll(".brand-mark").forEach((node) => {
      node.innerHTML = LOGO_SVG;
      count += 1;
    });
    return count;
  }
  var logoImagePromise = null;
  function loadLogoImage() {
    if (!logoImagePromise) {
      logoImagePromise = new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = () => resolve(null);
        img.src = LOGO_DATA_URL;
      });
    }
    return logoImagePromise;
  }

  // src/keyboard-grid.js
  function normalizeGridCursor(cursor, cols, rows = cols) {
    const maxX = Math.max(0, Number(cols) - 1);
    const maxY = Math.max(0, Number(rows) - 1);
    return {
      x: clamp(Math.round(Number(cursor?.x) || 0), 0, maxX),
      y: clamp(Math.round(Number(cursor?.y) || 0), 0, maxY)
    };
  }
  function moveGridCursor(cursor, key, cols, rows = cols) {
    const next = normalizeGridCursor(cursor, cols, rows);
    if (key === "ArrowLeft") next.x -= 1;
    if (key === "ArrowRight") next.x += 1;
    if (key === "ArrowUp") next.y -= 1;
    if (key === "ArrowDown") next.y += 1;
    return normalizeGridCursor(next, cols, rows);
  }
  function keyboardGridAction(key) {
    if (key === " " || key === "Enter") return "place";
    if (key === "Escape") return "clear";
    return null;
  }

  // src/share-qr.js
  var SHARE_QR_DATA_URL = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/Pg0KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MDAiIGhlaWdodD0iNjAwIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmlld0JveD0iMCAwIDYwMCA2MDAiPjxkZWZzPjxjbGlwUGF0aCBpZD0iY2xpcC1wYXRoLWJhY2tncm91bmQtY29sb3ItMCI+PHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjYwMCIgaGVpZ2h0PSI2MDAiLz48L2NsaXBQYXRoPjxjbGlwUGF0aCBpZD0iY2xpcC1wYXRoLWRvdC1jb2xvci0wIj48cGF0aCBkPSJNIDE3MiA1MnYgMTVoIDE1diAtNy41YSA3LjUgNy41LCAwLCAwLCAwLCAtNy41IC03LjUiIHRyYW5zZm9ybT0icm90YXRlKC05MCwxNzkuNSw1OS41KSIvPjxwYXRoIGQ9Ik0gMTg3IDUydiAxNWggMTV2IC03LjVhIDcuNSA3LjUsIDAsIDAsIDAsIC03LjUgLTcuNSIgdHJhbnNmb3JtPSJyb3RhdGUoMCwxOTQuNSw1OS41KSIvPjxwYXRoIGQ9Ik0gMjYyIDUydiAxNWggNy41YSA3LjUgNy41LCAwLCAwLCAwLCAwIC0xNSIgdHJhbnNmb3JtPSJyb3RhdGUoMTgwLDI2OS41LDU5LjUpIi8+PHBhdGggZD0iTSAyNzcgNTJ2IDE1aCA3LjVhIDcuNSA3LjUsIDAsIDAsIDAsIDAgLTE1IiB0cmFuc2Zvcm09InJvdGF0ZSgwLDI4NC41LDU5LjUpIi8+PHBhdGggZD0iTSAzMDcgNTJ2IDE1aCA3LjVhIDcuNSA3LjUsIDAsIDAsIDAsIDAgLTE1IiB0cmFuc2Zvcm09InJvdGF0ZSgxODAsMzE0LjUsNTkuNSkiLz48cmVjdCB4PSIzMjIiIHk9IjUyIiB3aWR0aD0iMTUiIGhlaWdodD0iMTUiIHRyYW5zZm9ybT0icm90YXRlKDAsMzI5LjUsNTkuNSkiLz48cGF0aCBkPSJNIDMzNyA1MnYgMTVoIDE1diAtNy41YSA3LjUgNy41LCAwLCAwLCAwLCAtNy41IC03LjUiIHRyYW5zZm9ybT0icm90YXRlKDAsMzQ0LjUsNTkuNSkiLz48cGF0aCBkPSJNIDM2NyA1MnYgMTVoIDE1diAtNy41YSA3LjUgNy41LCAwLCAwLCAwLCAtNy41IC03LjUiIHRyYW5zZm9ybT0icm90YXRlKC05MCwzNzQuNSw1OS41KSIvPjxyZWN0IHg9IjM4MiIgeT0iNTIiIHdpZHRoPSIxNSIgaGVpZ2h0PSIxNSIgdHJhbnNmb3JtPSJyb3RhdGUoMCwzODkuNSw1OS41KSIvPjxyZWN0IHg9IjM5NyIgeT0iNTIiIHdpZHRoPSIxNSIgaGVpZ2h0PSIxNSIgdHJhbnNmb3JtPSJyb3RhdGUoMCw0MDQuNSw1OS41KSIvPjxwYXRoIGQ9Ik0gNDEyIDUydiAxNWggNy41YSA3LjUgNy41LCAwLCAwLCAwLCAwIC0xNSIgdHJhbnNmb3JtPSJyb3RhdGUoMCw0MTkuNSw1OS41KSIvPjxwYXRoIGQ9Ik0gMTcyIDY3diAxNWggMTV2IC03LjVhIDcuNSA3LjUsIDAsIDAsIDAsIC03LjUgLTcuNSIgdHJhbnNmb3JtPSJyb3RhdGUoMTgwLDE3OS41LDc0LjUpIi8+PHJlY3QgeD0iMTg3IiB5PSI2NyIgd2lkdGg9IjE1IiBoZWlnaHQ9IjE1IiB0cmFuc2Zvcm09InJvdGF0ZSgwLDE5NC41LDc0LjUpIi8+PHJlY3QgeD0iMjAyIiB5PSI2NyIgd2lkdGg9IjE1IiBoZWlnaHQ9IjE1IiB0cmFuc2Zvcm09InJvdGF0ZSgwLDIwOS41LDc0LjUpIi8+PHBhdGggZD0iTSAyMTcgNjd2IDE1aCAxNXYgLTcuNWEgNy41IDcuNSwgMCwgMCwgMCwgLTcuNSAtNy41IiB0cmFuc2Zvcm09InJvdGF0ZSgwLDIyNC41LDc0LjUpIi8+PHBhdGggZD0iTSAyNDcgNjd2IDE1aCA3LjVhIDcuNSA3LjUsIDAsIDAsIDAsIDAgLTE1IiB0cmFuc2Zvcm09InJvdGF0ZSgtOTAsMjU0LjUsNzQuNSkiLz48cGF0aCBkPSJNIDMyMiA2N3YgMTVoIDE1diAtNy41YSA3LjUgNy41LCAwLCAwLCAwLCAtNy41IC03LjUiIHRyYW5zZm9ybT0icm90YXRlKDE4MCwzMjkuNSw3NC41KSIvPjxwYXRoIGQ9Ik0gMzM3IDY3diAxNWggMTV2IC03LjVhIDcuNSA3LjUsIDAsIDAsIDAsIC03LjUgLTcuNSIgdHJhbnNmb3JtPSJyb3RhdGUoOTAsMzQ0LjUsNzQuNSkiLz48cGF0aCBkPSJNIDM2NyA2N3YgMTVoIDcuNWEgNy41IDcuNSwgMCwgMCwgMCwgMCAtMTUiIHRyYW5zZm9ybT0icm90YXRlKDkwLDM3NC41LDc0LjUpIi8+PHBhdGggZD0iTSAzOTcgNjd2IDE1aCA3LjVhIDcuNSA3LjUsIDAsIDAsIDAsIDAgLTE1IiB0cmFuc2Zvcm09InJvdGF0ZSg5MCw0MDQuNSw3NC41KSIvPjxwYXRoIGQ9Ik0gMTg3IDgydiAxNWggMTV2IC03LjVhIDcuNSA3LjUsIDAsIDAsIDAsIC03LjUgLTcuNSIgdHJhbnNmb3JtPSJyb3RhdGUoMTgwLDE5NC41LDg5LjUpIi8+PHJlY3QgeD0iMjAyIiB5PSI4MiIgd2lkdGg9IjE1IiBoZWlnaHQ9IjE1IiB0cmFuc2Zvcm09InJvdGF0ZSgwLDIwOS41LDg5LjUpIi8+PHJlY3QgeD0iMjE3IiB5PSI4MiIgd2lkdGg9IjE1IiBoZWlnaHQ9IjE1IiB0cmFuc2Zvcm09InJvdGF0ZSgwLDIyNC41LDg5LjUpIi8+PHJlY3QgeD0iMjMyIiB5PSI4MiIgd2lkdGg9IjE1IiBoZWlnaHQ9IjE1IiB0cmFuc2Zvcm09InJvdGF0ZSgwLDIzOS41LDg5LjUpIi8+PHJlY3QgeD0iMjQ3IiB5PSI4MiIgd2lkdGg9IjE1IiBoZWlnaHQ9IjE1IiB0cmFuc2Zvcm09InJvdGF0ZSgwLDI1NC41LDg5LjUpIi8+PHBhdGggZD0iTSAyNzcgODJ2IDE1aCA3LjVhIDcuNSA3LjUsIDAsIDAsIDAsIDAgLTE1IiB0cmFuc2Zvcm09InJvdGF0ZSgtOTAsMjg0LjUsODkuNSkiLz48Y2lyY2xlIGN4PSI0MTkuNSIgY3k9Ijg5LjUiIHI9IjcuNSIgdHJhbnNmb3JtPSJyb3RhdGUoMCw0MTkuNSw4OS41KSIvPjxwYXRoIGQ9Ik0gMTcyIDk3diAxNWggNy41YSA3LjUgNy41LCAwLCAwLCAwLCAwIC0xNSIgdHJhbnNmb3JtPSJyb3RhdGUoLTkwLDE3OS41LDEwNC41KSIvPjxwYXRoIGQ9Ik0gMjAyIDk3diAxNWggMTV2IC03LjVhIDcuNSA3LjUsIDAsIDAsIDAsIC03LjUgLTcuNSIgdHJhbnNmb3JtPSJyb3RhdGUoMTgwLDIwOS41LDEwNC41KSIvPjxwYXRoIGQ9Ik0gMjE3IDk3diAxNWggMTV2IC03LjVhIDcuNSA3LjUsIDAsIDAsIDAsIC03LjUgLTcuNSIgdHJhbnNmb3JtPSJyb3RhdGUoOTAsMjI0LjUsMTA0LjUpIi8+PHJlY3QgeD0iMjQ3IiB5PSI5NyIgd2lkdGg9IjE1IiBoZWlnaHQ9IjE1IiB0cmFuc2Zvcm09InJvdGF0ZSgwLDI1NC41LDEwNC41KSIvPjxwYXRoIGQ9Ik0gMjc3IDk3diAxNWggMTV2IC03LjVhIDcuNSA3LjUsIDAsIDAsIDAsIC03LjUgLTcuNSIgdHJhbnNmb3JtPSJyb3RhdGUoMTgwLDI4NC41LDEwNC41KSIvPjxyZWN0IHg9IjI5MiIgeT0iOTciIHdpZHRoPSIxNSIgaGVpZ2h0PSIxNSIgdHJhbnNmb3JtPSJyb3RhdGUoMCwyOTkuNSwxMDQuNSkiLz48cmVjdCB4PSIzMDciIHk9Ijk3IiB3aWR0aD0iMTUiIGhlaWdodD0iMTUiIHRyYW5zZm9ybT0icm90YXRlKDAsMzE0LjUsMTA0LjUpIi8+PHBhdGggZD0iTSAzMjIgOTd2IDE1aCAxNXYgLTcuNWEgNy41IDcuNSwgMCwgMCwgMCwgLTcuNSAtNy41IiB0cmFuc2Zvcm09InJvdGF0ZSgwLDMyOS41LDEwNC41KSIvPjxwYXRoIGQ9Ik0gMzUyIDk3diAxNWggNy41YSA3LjUgNy41LCAwLCAwLCAwLCAwIC0xNSIgdHJhbnNmb3JtPSJyb3RhdGUoLTkwLDM1OS41LDEwNC41KSIvPjxwYXRoIGQ9Ik0gMzgyIDk3diAxNWggNy41YSA3LjUgNy41LCAwLCAwLCAwLCAwIC0xNSIgdHJhbnNmb3JtPSJyb3RhdGUoLTkwLDM4OS41LDEwNC41KSIvPjxyZWN0IHg9IjE3MiIgeT0iMTEyIiB3aWR0aD0iMTUiIGhlaWdodD0iMTUiIHRyYW5zZm9ybT0icm90YXRlKDAsMTc5LjUsMTE5LjUpIi8+PHBhdGggZD0iTSAxODcgMTEydiAxNWggNy41YSA3LjUgNy41LCAwLCAwLCAwLCAwIC0xNSIgdHJhbnNmb3JtPSJyb3RhdGUoMCwxOTQuNSwxMTkuNSkiLz48cmVjdCB4PSIyNDciIHk9IjExMiIgd2lkdGg9IjE1IiBoZWlnaHQ9IjE1IiB0cmFuc2Zvcm09InJvdGF0ZSgwLDI1NC41LDExOS41KSIvPjxwYXRoIGQ9Ik0gMzIyIDExMnYgMTVoIDcuNWEgNy41IDcuNSwgMCwgMCwgMCwgMCAtMTUiIHRyYW5zZm9ybT0icm90YXRlKDkwLDMyOS41LDExOS41KSIvPjxyZWN0IHg9IjM1MiIgeT0iMTEyIiB3aWR0aD0iMTUiIGhlaWdodD0iMTUiIHRyYW5zZm9ybT0icm90YXRlKDAsMzU5LjUsMTE5LjUpIi8+PHBhdGggZD0iTSAzODIgMTEydiAxNWggNy41YSA3LjUgNy41LCAwLCAwLCAwLCAwIC0xNSIgdHJhbnNmb3JtPSJyb3RhdGUoOTAsMzg5LjUsMTE5LjUpIi8+PHBhdGggZD0iTSA0MTIgMTEydiAxNWggNy41YSA3LjUgNy41LCAwLCAwLCAwLCAwIC0xNSIgdHJhbnNmb3JtPSJyb3RhdGUoLTkwLDQxOS41LDExOS41KSIvPjxyZWN0IHg9IjE3MiIgeT0iMTI3IiB3aWR0aD0iMTUiIGhlaWdodD0iMTUiIHRyYW5zZm9ybT0icm90YXRlKDAsMTc5LjUsMTM0LjUpIi8+PGNpcmNsZSBjeD0iMjI0LjUiIGN5PSIxMzQuNSIgcj0iNy41IiB0cmFuc2Zvcm09InJvdGF0ZSgwLDIyNC41LDEzNC41KSIvPjxwYXRoIGQ9Ik0gMjQ3IDEyN3YgMTVoIDE1diAtNy41YSA3LjUgNy41LCAwLCAwLCAwLCAtNy41IC03LjUiIHRyYW5zZm9ybT0icm90YXRlKDE4MCwyNTQuNSwxMzQuNSkiLz48cGF0aCBkPSJNIDI2MiAxMjd2IDE1aCAxNXYgLTcuNWEgNy41IDcuNSwgMCwgMCwgMCwgLTcuNSAtNy41IiB0cmFuc2Zvcm09InJvdGF0ZSgwLDI2OS41LDEzNC41KSIvPjxwYXRoIGQ9Ik0gMzM3IDEyN3YgMTVoIDcuNWEgNy41IDcuNSwgMCwgMCwgMCwgMCAtMTUiIHRyYW5zZm9ybT0icm90YXRlKDE4MCwzNDQuNSwxMzQuNSkiLz48cmVjdCB4PSIzNTIiIHk9IjEyNyIgd2lkdGg9IjE1IiBoZWlnaHQ9IjE1IiB0cmFuc2Zvcm09InJvdGF0ZSgwLDM1OS41LDEzNC41KSIvPjxwYXRoIGQ9Ik0gMzY3IDEyN3YgMTVoIDcuNWEgNy41IDcuNSwgMCwgMCwgMCwgMCAtMTUiIHRyYW5zZm9ybT0icm90YXRlKDAsMzc0LjUsMTM0LjUpIi8+PHJlY3QgeD0iNDEyIiB5PSIxMjciIHdpZHRoPSIxNSIgaGVpZ2h0PSIxNSIgdHJhbnNmb3JtPSJyb3RhdGUoMCw0MTkuNSwxMzQuNSkiLz48cGF0aCBkPSJNIDE3MiAxNDJ2IDE1aCA3LjVhIDcuNSA3LjUsIDAsIDAsIDAsIDAgLTE1IiB0cmFuc2Zvcm09InJvdGF0ZSg5MCwxNzkuNSwxNDkuNSkiLz48cGF0aCBkPSJNIDIwMiAxNDJ2IDE1aCA3LjVhIDcuNSA3LjUsIDAsIDAsIDAsIDAgLTE1IiB0cmFuc2Zvcm09InJvdGF0ZSgtOTAsMjA5LjUsMTQ5LjUpIi8+PGNpcmNsZSBjeD0iMjM5LjUiIGN5PSIxNDkuNSIgcj0iNy41IiB0cmFuc2Zvcm09InJvdGF0ZSgwLDIzOS41LDE0OS41KSIvPjxwYXRoIGQ9Ik0gMjYyIDE0MnYgMTVoIDcuNWEgNy41IDcuNSwgMCwgMCwgMCwgMCAtMTUiIHRyYW5zZm9ybT0icm90YXRlKDkwLDI2OS41LDE0OS41KSIvPjxjaXJjbGUgY3g9IjI5OS41IiBjeT0iMTQ5LjUiIHI9IjcuNSIgdHJhbnNmb3JtPSJyb3RhdGUoMCwyOTkuNSwxNDkuNSkiLz48cGF0aCBkPSJNIDMyMiAxNDJ2IDE1aCA3LjVhIDcuNSA3LjUsIDAsIDAsIDAsIDAgLTE1IiB0cmFuc2Zvcm09InJvdGF0ZSgtOTAsMzI5LjUsMTQ5LjUpIi8+PHBhdGggZD0iTSAzNTIgMTQydiAxNWggNy41YSA3LjUgNy41LCAwLCAwLCAwLCAwIC0xNSIgdHJhbnNmb3JtPSJyb3RhdGUoOTAsMzU5LjUsMTQ5LjUpIi8+PGNpcmNsZSBjeD0iMzg5LjUiIGN5PSIxNDkuNSIgcj0iNy41IiB0cmFuc2Zvcm09InJvdGF0ZSgwLDM4OS41LDE0OS41KSIvPjxyZWN0IHg9IjQxMiIgeT0iMTQyIiB3aWR0aD0iMTUiIGhlaWdodD0iMTUiIHRyYW5zZm9ybT0icm90YXRlKDAsNDE5LjUsMTQ5LjUpIi8+PHBhdGggZD0iTSAxODcgMTU3diAxNWggNy41YSA3LjUgNy41LCAwLCAwLCAwLCAwIC0xNSIgdHJhbnNmb3JtPSJyb3RhdGUoMTgwLDE5NC41LDE2NC41KSIvPjxyZWN0IHg9IjIwMiIgeT0iMTU3IiB3aWR0aD0iMTUiIGhlaWdodD0iMTUiIHRyYW5zZm9ybT0icm90YXRlKDAsMjA5LjUsMTY0LjUpIi8+PHBhdGggZD0iTSAyMTcgMTU3diAxNWggNy41YSA3LjUgNy41LCAwLCAwLCAwLCAwIC0xNSIgdHJhbnNmb3JtPSJyb3RhdGUoMCwyMjQuNSwxNjQuNSkiLz48cGF0aCBkPSJNIDMwNyAxNTd2IDE1aCA3LjVhIDcuNSA3LjUsIDAsIDAsIDAsIDAgLTE1IiB0cmFuc2Zvcm09InJvdGF0ZSgxODAsMzE0LjUsMTY0LjUpIi8+PHJlY3QgeD0iMzIyIiB5PSIxNTciIHdpZHRoPSIxNSIgaGVpZ2h0PSIxNSIgdHJhbnNmb3JtPSJyb3RhdGUoMCwzMjkuNSwxNjQuNSkiLz48cGF0aCBkPSJNIDM2NyAxNTd2IDE1aCA3LjVhIDcuNSA3LjUsIDAsIDAsIDAsIDAgLTE1IiB0cmFuc2Zvcm09InJvdGF0ZSgtOTAsMzc0LjUsMTY0LjUpIi8+PHJlY3QgeD0iNDEyIiB5PSIxNTciIHdpZHRoPSIxNSIgaGVpZ2h0PSIxNSIgdHJhbnNmb3JtPSJyb3RhdGUoMCw0MTkuNSwxNjQuNSkiLz48Y2lyY2xlIGN4PSIxMDQuNSIgY3k9IjE3OS41IiByPSI3LjUiIHRyYW5zZm9ybT0icm90YXRlKDAsMTA0LjUsMTc5LjUpIi8+PGNpcmNsZSBjeD0iMTQ5LjUiIGN5PSIxNzkuNSIgcj0iNy41IiB0cmFuc2Zvcm09InJvdGF0ZSgwLDE0OS41LDE3OS41KSIvPjxwYXRoIGQ9Ik0gMjQ3IDE3MnYgMTVoIDcuNWEgNy41IDcuNSwgMCwgMCwgMCwgMCAtMTUiIHRyYW5zZm9ybT0icm90YXRlKC05MCwyNTQuNSwxNzkuNSkiLz48cGF0aCBkPSJNIDI3NyAxNzJ2IDE1aCA3LjVhIDcuNSA3LjUsIDAsIDAsIDAsIDAgLTE1IiB0cmFuc2Zvcm09InJvdGF0ZSgxODAsMjg0LjUsMTc5LjUpIi8+PHBhdGggZD0iTSAyOTIgMTcydiAxNWggNy41YSA3LjUgNy41LCAwLCAwLCAwLCAwIC0xNSIgdHJhbnNmb3JtPSJyb3RhdGUoMCwyOTkuNSwxNzkuNSkiLz48cmVjdCB4PSIzMjIiIHk9IjE3MiIgd2lkdGg9IjE1IiBoZWlnaHQ9IjE1IiB0cmFuc2Zvcm09InJvdGF0ZSgwLDMyOS41LDE3OS41KSIvPjxwYXRoIGQ9Ik0gMzY3IDE3MnYgMTVoIDcuNWEgNy41IDcuNSwgMCwgMCwgMCwgMCAtMTUiIHRyYW5zZm9ybT0icm90YXRlKDkwLDM3NC41LDE3OS41KSIvPjxyZWN0IHg9IjQxMiIgeT0iMTcyIiB3aWR0aD0iMTUiIGhlaWdodD0iMTUiIHRyYW5zZm9ybT0icm90YXRlKDAsNDE5LjUsMTc5LjUpIi8+PHBhdGggZD0iTSA0NTcgMTcydiAxNWggNy41YSA3LjUgNy41LCAwLCAwLCAwLCAwIC0xNSIgdHJhbnNmb3JtPSJyb3RhdGUoMTgwLDQ2NC41LDE3OS41KSIvPjxyZWN0IHg9IjQ3MiIgeT0iMTcyIiB3aWR0aD0iMTUiIGhlaWdodD0iMTUiIHRyYW5zZm9ybT0icm90YXRlKDAsNDc5LjUsMTc5LjUpIi8+PHBhdGggZD0iTSA0ODcgMTcydiAxNWggNy41YSA3LjUgNy41LCAwLCAwLCAwLCAwIC0xNSIgdHJhbnNmb3JtPSJyb3RhdGUoMCw0OTQuNSwxNzkuNSkiLz48cGF0aCBkPSJNIDUxNyAxNzJ2IDE1aCAxNXYgLTcuNWEgNy41IDcuNSwgMCwgMCwgMCwgLTcuNSAtNy41IiB0cmFuc2Zvcm09InJvdGF0ZSgtOTAsNTI0LjUsMTc5LjUpIi8+PHBhdGggZD0iTSA1MzIgMTcydiAxNWggMTV2IC03LjVhIDcuNSA3LjUsIDAsIDAsIDAsIC03LjUgLTcuNSIgdHJhbnNmb3JtPSJyb3RhdGUoMCw1MzkuNSwxNzkuNSkiLz48cGF0aCBkPSJNIDUyIDE4N3YgMTVoIDcuNWEgNy41IDcuNSwgMCwgMCwgMCwgMCAtMTUiIHRyYW5zZm9ybT0icm90YXRlKDE4MCw1OS41LDE5NC41KSIvPjxwYXRoIGQ9Ik0gNjcgMTg3diAxNWggNy41YSA3LjUgNy41LCAwLCAwLCAwLCAwIC0xNSIgdHJhbnNmb3JtPSJyb3RhdGUoMCw3NC41LDE5NC41KSIvPjxwYXRoIGQ9Ik0gMTEyIDE4N3YgMTVoIDE1diAtNy41YSA3LjUgNy41LCAwLCAwLCAwLCAtNy41IC03LjUiIHRyYW5zZm9ybT0icm90YXRlKC05MCwxMTkuNSwxOTQuNSkiLz48cGF0aCBkPSJNIDEyNyAxODd2IDE1aCAxNXYgLTcuNWEgNy41IDcuNSwgMCwgMCwgMCwgLTcuNSAtNy41IiB0cmFuc2Zvcm09InJvdGF0ZSgwLDEzNC41LDE5NC41KSIvPjxjaXJjbGUgY3g9IjE3OS41IiBjeT0iMTk0LjUiIHI9IjcuNSIgdHJhbnNmb3JtPSJyb3RhdGUoMCwxNzkuNSwxOTQuNSkiLz48cGF0aCBkPSJNIDI0NyAxODd2IDE1aCA3LjVhIDcuNSA3LjUsIDAsIDAsIDAsIDAgLTE1IiB0cmFuc2Zvcm09InJvdGF0ZSg5MCwyNTQuNSwxOTQuNSkiLz48cGF0aCBkPSJNIDMyMiAxODd2IDE1aCAxNXYgLTcuNWEgNy41IDcuNSwgMCwgMCwgMCwgLTcuNSAtNy41IiB0cmFuc2Zvcm09InJvdGF0ZSgxODAsMzI5LjUsMTk0LjUpIi8+PHBhdGggZD0iTSAzMzcgMTg3diAxNWggNy41YSA3LjUgNy41LCAwLCAwLCAwLCAwIC0xNSIgdHJhbnNmb3JtPSJyb3RhdGUoMCwzNDQuNSwxOTQuNSkiLz48cmVjdCB4PSI0MTIiIHk9IjE4NyIgd2lkdGg9IjE1IiBoZWlnaHQ9IjE1IiB0cmFuc2Zvcm09InJvdGF0ZSgwLDQxOS41LDE5NC41KSIvPjxjaXJjbGUgY3g9IjQ0OS41IiBjeT0iMTk0LjUiIHI9IjcuNSIgdHJhbnNmb3JtPSJyb3RhdGUoMCw0NDkuNSwxOTQuNSkiLz48cGF0aCBkPSJNIDUxNyAxODd2IDE1aCAxNXYgLTcuNWEgNy41IDcuNSwgMCwgMCwgMCwgLTcuNSAtNy41IiB0cmFuc2Zvcm09InJvdGF0ZSgxODAsNTI0LjUsMTk0LjUpIi8+PHJlY3QgeD0iNTMyIiB5PSIxODciIHdpZHRoPSIxNSIgaGVpZ2h0PSIxNSIgdHJhbnNmb3JtPSJyb3RhdGUoMCw1MzkuNSwxOTQuNSkiLz48Y2lyY2xlIGN4PSI4OS41IiBjeT0iMjA5LjUiIHI9IjcuNSIgdHJhbnNmb3JtPSJyb3RhdGUoMCw4OS41LDIwOS41KSIvPjxwYXRoIGQ9Ik0gMTEyIDIwMnYgMTVoIDE1diAtNy41YSA3LjUgNy41LCAwLCAwLCAwLCAtNy41IC03LjUiIHRyYW5zZm9ybT0icm90YXRlKDE4MCwxMTkuNSwyMDkuNSkiLz48cmVjdCB4PSIxMjciIHk9IjIwMiIgd2lkdGg9IjE1IiBoZWlnaHQ9IjE1IiB0cmFuc2Zvcm09InJvdGF0ZSgwLDEzNC41LDIwOS41KSIvPjxwYXRoIGQ9Ik0gMTQyIDIwMnYgMTVoIDcuNWEgNy41IDcuNSwgMCwgMCwgMCwgMCAtMTUiIHRyYW5zZm9ybT0icm90YXRlKDAsMTQ5LjUsMjA5LjUpIi8+PHBhdGggZD0iTSAxODcgMjAydiAxNWggNy41YSA3LjUgNy41LCAwLCAwLCAwLCAwIC0xNSIgdHJhbnNmb3JtPSJyb3RhdGUoLTkwLDE5NC41LDIwOS41KSIvPjxwYXRoIGQ9Ik0gMjE3IDIwMnYgMTVoIDcuNWEgNy41IDcuNSwgMCwgMCwgMCwgMCAtMTUiIHRyYW5zZm9ybT0icm90YXRlKC05MCwyMjQuNSwyMDkuNSkiLz48cGF0aCBkPSJNIDI3NyAyMDJ2IDE1aCA3LjVhIDcuNSA3LjUsIDAsIDAsIDAsIDAgLTE1IiB0cmFuc2Zvcm09InJvdGF0ZSgxODAsMjg0LjUsMjA5LjUpIi8+PHJlY3QgeD0iMjkyIiB5PSIyMDIiIHdpZHRoPSIxNSIgaGVpZ2h0PSIxNSIgdHJhbnNmb3JtPSJyb3RhdGUoMCwyOTkuNSwyMDkuNSkiLz48cGF0aCBkPSJNIDMwNyAyMDJ2IDE1aCAxNXYgLTcuNWEgNy41IDcuNSwgMCwgMCwgMCwgLTcuNSAtNy41IiB0cmFuc2Zvcm09InJvdGF0ZSgwLDMxNC41LDIwOS41KSIvPjxwYXRoIGQ9Ik0gMzUyIDIwMnYgMTVoIDcuNWEgNy41IDcuNSwgMCwgMCwgMCwgMCAtMTUiIHRyYW5zZm9ybT0icm90YXRlKDE4MCwzNTkuNSwyMDkuNSkiLz48cmVjdCB4PSIzNjciIHk9IjIwMiIgd2lkdGg9IjE1IiBoZWlnaHQ9IjE1IiB0cmFuc2Zvcm09InJvdGF0ZSgwLDM3NC41LDIwOS41KSIvPjxwYXRoIGQ9Ik0gMzgyIDIwMnYgMTVoIDcuNWEgNy41IDcuNSwgMCwgMCwgMCwgMCAtMTUiIHRyYW5zZm9ybT0icm90YXRlKDAsMzg5LjUsMjA5LjUpIi8+PHBhdGggZD0iTSA0MTIgMjAydiAxNWggNy41YSA3LjUgNy41LCAwLCAwLCAwLCAwIC0xNSIgdHJhbnNmb3JtPSJyb3RhdGUoOTAsNDE5LjUsMjA5LjUpIi8+PHBhdGggZD0iTSA0ODcgMjAydiAxNWggMTV2IC03LjVhIDcuNSA3LjUsIDAsIDAsIDAsIC03LjUgLTcuNSIgdHJhbnNmb3JtPSJyb3RhdGUoLTkwLDQ5NC41LDIwOS41KSIvPjxwYXRoIGQ9Ik0gNTAyIDIwMnYgMTVoIDcuNWEgNy41IDcuNSwgMCwgMCwgMCwgMCAtMTUiIHRyYW5zZm9ybT0icm90YXRlKDAsNTA5LjUsMjA5LjUpIi8+PHJlY3QgeD0iNTMyIiB5PSIyMDIiIHdpZHRoPSIxNSIgaGVpZ2h0PSIxNSIgdHJhbnNmb3JtPSJyb3RhdGUoMCw1MzkuNSwyMDkuNSkiLz48cGF0aCBkPSJNIDUyIDIxN3YgMTVoIDE1diAtNy41YSA3LjUgNy41LCAwLCAwLCAwLCAtNy41IC03LjUiIHRyYW5zZm9ybT0icm90YXRlKC05MCw1OS41LDIyNC41KSIvPjxwYXRoIGQ9Ik0gNjcgMjE3diAxNWggMTV2IC03LjVhIDcuNSA3LjUsIDAsIDAsIDAsIC03LjUgLTcuNSIgdHJhbnNmb3JtPSJyb3RhdGUoMCw3NC41LDIyNC41KSIvPjxwYXRoIGQ9Ik0gOTcgMjE3diAxNWggNy41YSA3LjUgNy41LCAwLCAwLCAwLCAwIC0xNSIgdHJhbnNmb3JtPSJyb3RhdGUoLTkwLDEwNC41LDIyNC41KSIvPjxwYXRoIGQ9Ik0gMTU3IDIxN3YgMTVoIDcuNWEgNy41IDcuNSwgMCwgMCwgMCwgMCAtMTUiIHRyYW5zZm9ybT0icm90YXRlKDE4MCwxNjQuNSwyMjQuNSkiLz48cmVjdCB4PSIxNzIiIHk9IjIxNyIgd2lkdGg9IjE1IiBoZWlnaHQ9IjE1IiB0cmFuc2Zvcm09InJvdGF0ZSgwLDE3OS41LDIyNC41KSIvPjxyZWN0IHg9IjE4NyIgeT0iMjE3IiB3aWR0aD0iMTUiIGhlaWdodD0iMTUiIHRyYW5zZm9ybT0icm90YXRlKDAsMTk0LjUsMjI0LjUpIi8+PHJlY3QgeD0iMjAyIiB5PSIyMTciIHdpZHRoPSIxNSIgaGVpZ2h0PSIxNSIgdHJhbnNmb3JtPSJyb3RhdGUoMCwyMDkuNSwyMjQuNSkiLz48cGF0aCBkPSJNIDIxNyAyMTd2IDE1aCAxNXYgLTcuNWEgNy41IDcuNSwgMCwgMCwgMCwgLTcuNSAtNy41IiB0cmFuc2Zvcm09InJvdGF0ZSg5MCwyMjQuNSwyMjQuNSkiLz48cGF0aCBkPSJNIDI0NyAyMTd2IDE1aCA3LjVhIDcuNSA3LjUsIDAsIDAsIDAsIDAgLTE1IiB0cmFuc2Zvcm09InJvdGF0ZSgxODAsMjU0LjUsMjI0LjUpIi8+PHBhdGggZD0iTSAyNjIgMjE3diAxNWggNy41YSA3LjUgNy41LCAwLCAwLCAwLCAwIC0xNSIgdHJhbnNmb3JtPSJyb3RhdGUoMCwyNjkuNSwyMjQuNSkiLz48cmVjdCB4PSIyOTIiIHk9IjIxNyIgd2lkdGg9IjE1IiBoZWlnaHQ9IjE1IiB0cmFuc2Zvcm09InJvdGF0ZSgwLDI5OS41LDIyNC41KSIvPjxyZWN0IHg9IjMwNyIgeT0iMjE3IiB3aWR0aD0iMTUiIGhlaWdodD0iMTUiIHRyYW5zZm9ybT0icm90YXRlKDAsMzE0LjUsMjI0LjUpIi8+PHBhdGggZD0iTSAzMjIgMjE3diAxNWggMTV2IC03LjVhIDcuNSA3LjUsIDAsIDAsIDAsIC03LjUgLTcuNSIgdHJhbnNmb3JtPSJyb3RhdGUoMCwzMjkuNSwyMjQuNSkiLz48cGF0aCBkPSJNIDQyNyAyMTd2IDE1aCAxNXYgLTcuNWEgNy41IDcuNSwgMCwgMCwgMCwgLTcuNSAtNy41IiB0cmFuc2Zvcm09InJvdGF0ZSgtOTAsNDM0LjUsMjI0LjUpIi8+PHBhdGggZD0iTSA0NDIgMjE3diAxNWggMTV2IC03LjVhIDcuNSA3LjUsIDAsIDAsIDAsIC03LjUgLTcuNSIgdHJhbnNmb3JtPSJyb3RhdGUoMCw0NDkuNSwyMjQuNSkiLz48cGF0aCBkPSJNIDQ4NyAyMTd2IDE1aCA3LjVhIDcuNSA3LjUsIDAsIDAsIDAsIDAgLTE1IiB0cmFuc2Zvcm09InJvdGF0ZSg5MCw0OTQuNSwyMjQuNSkiLz48cGF0aCBkPSJNIDUxNyAyMTd2IDE1aCA3LjVhIDcuNSA3LjUsIDAsIDAsIDAsIDAgLTE1IiB0cmFuc2Zvcm09InJvdGF0ZSgxODAsNTI0LjUsMjI0LjUpIi8+PHJlY3QgeD0iNTMyIiB5PSIyMTciIHdpZHRoPSIxNSIgaGVpZ2h0PSIxNSIgdHJhbnNmb3JtPSJyb3RhdGUoMCw1MzkuNSwyMjQuNSkiLz48cGF0aCBkPSJNIDUyIDIzMnYgMTVoIDE1diAtNy41YSA3LjUgNy41LCAwLCAwLCAwLCAtNy41IC03LjUiIHRyYW5zZm9ybT0icm90YXRlKDE4MCw1OS41LDIzOS41KSIvPjxyZWN0IHg9IjY3IiB5PSIyMzIiIHdpZHRoPSIxNSIgaGVpZ2h0PSIxNSIgdHJhbnNmb3JtPSJyb3RhdGUoMCw3NC41LDIzOS41KSIvPjxyZWN0IHg9IjgyIiB5PSIyMzIiIHdpZHRoPSIxNSIgaGVpZ2h0PSIxNSIgdHJhbnNmb3JtPSJyb3RhdGUoMCw4OS41LDIzOS41KSIvPjxyZWN0IHg9Ijk3IiB5PSIyMzIiIHdpZHRoPSIxNSIgaGVpZ2h0PSIxNSIgdHJhbnNmb3JtPSJyb3RhdGUoMCwxMDQuNSwyMzkuNSkiLz48cmVjdCB4PSIxMTIiIHk9IjIzMiIgd2lkdGg9IjE1IiBoZWlnaHQ9IjE1IiB0cmFuc2Zvcm09InJvdGF0ZSgwLDExOS41LDIzOS41KSIvPjxyZWN0IHg9IjEyNyIgeT0iMjMyIiB3aWR0aD0iMTUiIGhlaWdodD0iMTUiIHRyYW5zZm9ybT0icm90YXRlKDAsMTM0LjUsMjM5LjUpIi8+PHBhdGggZD0iTSAxNDIgMjMydiAxNWggNy41YSA3LjUgNy41LCAwLCAwLCAwLCAwIC0xNSIgdHJhbnNmb3JtPSJyb3RhdGUoMCwxNDkuNSwyMzkuNSkiLz48cmVjdCB4PSIyMDIiIHk9IjIzMiIgd2lkdGg9IjE1IiBoZWlnaHQ9IjE1IiB0cmFuc2Zvcm09InJvdGF0ZSgwLDIwOS41LDIzOS41KSIvPjxwYXRoIGQ9Ik0gMjMyIDIzMnYgMTVoIDcuNWEgNy41IDcuNSwgMCwgMCwgMCwgMCAtMTUiIHRyYW5zZm9ybT0icm90YXRlKC05MCwyMzkuNSwyMzkuNSkiLz48cGF0aCBkPSJNIDI3NyAyMzJ2IDE1aCAxNXYgLTcuNWEgNy41IDcuNSwgMCwgMCwgMCwgLTcuNSAtNy41IiB0cmFuc2Zvcm09InJvdGF0ZSgtOTAsMjg0LjUsMjM5LjUpIi8+PHJlY3QgeD0iMjkyIiB5PSIyMzIiIHdpZHRoPSIxNSIgaGVpZ2h0PSIxNSIgdHJhbnNmb3JtPSJyb3RhdGUoMCwyOTkuNSwyMzkuNSkiLz48cmVjdCB4PSIzMjIiIHk9IjIzMiIgd2lkdGg9IjE1IiBoZWlnaHQ9IjE1IiB0cmFuc2Zvcm09InJvdGF0ZSgwLDMyOS41LDIzOS41KSIvPjxwYXRoIGQ9Ik0gNDEyIDIzMnYgMTVoIDcuNWEgNy41IDcuNSwgMCwgMCwgMCwgMCAtMTUiIHRyYW5zZm9ybT0icm90YXRlKDE4MCw0MTkuNSwyMzkuNSkiLz48cmVjdCB4PSI0MjciIHk9IjIzMiIgd2lkdGg9IjE1IiBoZWlnaHQ9IjE1IiB0cmFuc2Zvcm09InJvdGF0ZSgwLDQzNC41LDIzOS41KSIvPjxyZWN0IHg9IjQ0MiIgeT0iMjMyIiB3aWR0aD0iMTUiIGhlaWdodD0iMTUiIHRyYW5zZm9ybT0icm90YXRlKDAsNDQ5LjUsMjM5LjUpIi8+PHJlY3QgeD0iNTMyIiB5PSIyMzIiIHdpZHRoPSIxNSIgaGVpZ2h0PSIxNSIgdHJhbnNmb3JtPSJyb3RhdGUoMCw1MzkuNSwyMzkuNSkiLz48cmVjdCB4PSI2NyIgeT0iMjQ3IiB3aWR0aD0iMTUiIGhlaWdodD0iMTUiIHRyYW5zZm9ybT0icm90YXRlKDAsNzQuNSwyNTQuNSkiLz48cGF0aCBkPSJNIDgyIDI0N3YgMTVoIDE1diAtNy41YSA3LjUgNy41LCAwLCAwLCAwLCAtNy41IC03LjUiIHRyYW5zZm9ybT0icm90YXRlKDkwLDg5LjUsMjU0LjUpIi8+PHBhdGggZD0iTSAxNTcgMjQ3diAxNWggMTV2IC03LjVhIDcuNSA3LjUsIDAsIDAsIDAsIC03LjUgLTcuNSIgdHJhbnNmb3JtPSJyb3RhdGUoLTkwLDE2NC41LDI1NC41KSIvPjxwYXRoIGQ9Ik0gMTcyIDI0N3YgMTVoIDcuNWEgNy41IDcuNSwgMCwgMCwgMCwgMCAtMTUiIHRyYW5zZm9ybT0icm90YXRlKDAsMTc5LjUsMjU0LjUpIi8+PHJlY3QgeD0iMjAyIiB5PSIyNDciIHdpZHRoPSIxNSIgaGVpZ2h0PSIxNSIgdHJhbnNmb3JtPSJyb3RhdGUoMCwyMDkuNSwyNTQuNSkiLz48cmVjdCB4PSIyMTciIHk9IjI0NyIgd2lkdGg9IjE1IiBoZWlnaHQ9IjE1IiB0cmFuc2Zvcm09InJvdGF0ZSgwLDIyNC41LDI1NC41KSIvPjxwYXRoIGQ9Ik0gMjMyIDI0N3YgMTVoIDE1diAtNy41YSA3LjUgNy41LCAwLCAwLCAwLCAtNy41IC03LjUiIHRyYW5zZm9ybT0icm90YXRlKDkwLDIzOS41LDI1NC41KSIvPjxyZWN0IHg9IjI3NyIgeT0iMjQ3IiB3aWR0aD0iMTUiIGhlaWdodD0iMTUiIHRyYW5zZm9ybT0icm90YXRlKDAsMjg0LjUsMjU0LjUpIi8+PHBhdGggZD0iTSAyOTIgMjQ3diAxNWggMTV2IC03LjVhIDcuNSA3LjUsIDAsIDAsIDAsIC03LjUgLTcuNSIgdHJhbnNmb3JtPSJyb3RhdGUoOTAsMjk5LjUsMjU0LjUpIi8+PHBhdGggZD0iTSAzMjIgMjQ3diAxNWggNy41YSA3LjUgNy41LCAwLCAwLCAwLCAwIC0xNSIgdHJhbnNmb3JtPSJyb3RhdGUoOTAsMzI5LjUsMjU0LjUpIi8+PGNpcmNsZSBjeD0iMzU5LjUiIGN5PSIyNTQuNSIgcj0iNy41IiB0cmFuc2Zvcm09InJvdGF0ZSgwLDM1OS41LDI1NC41KSIvPjxjaXJjbGUgY3g9IjM4OS41IiBjeT0iMjU0LjUiIHI9IjcuNSIgdHJhbnNmb3JtPSJyb3RhdGUoMCwzODkuNSwyNTQuNSkiLz48cmVjdCB4PSI0NDIiIHk9IjI0NyIgd2lkdGg9IjE1IiBoZWlnaHQ9IjE1IiB0cmFuc2Zvcm09InJvdGF0ZSgwLDQ0OS41LDI1NC41KSIvPjxwYXRoIGQ9Ik0gNDcyIDI0N3YgMTVoIDE1diAtNy41YSA3LjUgNy41LCAwLCAwLCAwLCAtNy41IC03LjUiIHRyYW5zZm9ybT0icm90YXRlKC05MCw0NzkuNSwyNTQuNSkiLz48cGF0aCBkPSJNIDQ4NyAyNDd2IDE1aCA3LjVhIDcuNSA3LjUsIDAsIDAsIDAsIDAgLTE1IiB0cmFuc2Zvcm09InJvdGF0ZSgwLDQ5NC41LDI1NC41KSIvPjxwYXRoIGQ9Ik0gNTMyIDI0N3YgMTVoIDcuNWEgNy41IDcuNSwgMCwgMCwgMCwgMCAtMTUiIHRyYW5zZm9ybT0icm90YXRlKDkwLDUzOS41LDI1NC41KSIvPjxyZWN0IHg9IjY3IiB5PSIyNjIiIHdpZHRoPSIxNSIgaGVpZ2h0PSIxNSIgdHJhbnNmb3JtPSJyb3RhdGUoMCw3NC41LDI2OS41KSIvPjxwYXRoIGQ9Ik0gMTQyIDI2MnYgMTVoIDcuNWEgNy41IDcuNSwgMCwgMCwgMCwgMCAtMTUiIHRyYW5zZm9ybT0icm90YXRlKDE4MCwxNDkuNSwyNjkuNSkiLz48cGF0aCBkPSJNIDE1NyAyNjJ2IDE1aCAxNXYgLTcuNWEgNy41IDcuNSwgMCwgMCwgMCwgLTcuNSAtNy41IiB0cmFuc2Zvcm09InJvdGF0ZSg5MCwxNjQuNSwyNjkuNSkiLz48cGF0aCBkPSJNIDE4NyAyNjJ2IDE1aCA3LjVhIDcuNSA3LjUsIDAsIDAsIDAsIDAgLTE1IiB0cmFuc2Zvcm09InJvdGF0ZSgxODAsMTk0LjUsMjY5LjUpIi8+PHJlY3QgeD0iMjAyIiB5PSIyNjIiIHdpZHRoPSIxNSIgaGVpZ2h0PSIxNSIgdHJhbnNmb3JtPSJyb3RhdGUoMCwyMDkuNSwyNjkuNSkiLz48cGF0aCBkPSJNIDIxNyAyNjJ2IDE1aCAxNXYgLTcuNWEgNy41IDcuNSwgMCwgMCwgMCwgLTcuNSAtNy41IiB0cmFuc2Zvcm09InJvdGF0ZSg5MCwyMjQuNSwyNjkuNSkiLz48cGF0aCBkPSJNIDI2MiAyNjJ2IDE1aCAxNXYgLTcuNWEgNy41IDcuNSwgMCwgMCwgMCwgLTcuNSAtNy41IiB0cmFuc2Zvcm09InJvdGF0ZSgtOTAsMjY5LjUsMjY5LjUpIi8+PHJlY3QgeD0iMjc3IiB5PSIyNjIiIHdpZHRoPSIxNSIgaGVpZ2h0PSIxNSIgdHJhbnNmb3JtPSJyb3RhdGUoMCwyODQuNSwyNjkuNSkiLz48cGF0aCBkPSJNIDMwNyAyNjJ2IDE1aCA3LjVhIDcuNSA3LjUsIDAsIDAsIDAsIDAgLTE1IiB0cmFuc2Zvcm09InJvdGF0ZSgtOTAsMzE0LjUsMjY5LjUpIi8+PHBhdGggZD0iTSAzNjcgMjYydiAxNWggNy41YSA3LjUgNy41LCAwLCAwLCAwLCAwIC0xNSIgdHJhbnNmb3JtPSJyb3RhdGUoLTkwLDM3NC41LDI2OS41KSIvPjxwYXRoIGQ9Ik0gMzk3IDI2MnYgMTVoIDcuNWEgNy41IDcuNSwgMCwgMCwgMCwgMCAtMTUiIHRyYW5zZm9ybT0icm90YXRlKDE4MCw0MDQuNSwyNjkuNSkiLz48cmVjdCB4PSI0MTIiIHk9IjI2MiIgd2lkdGg9IjE1IiBoZWlnaHQ9IjE1IiB0cmFuc2Zvcm09InJvdGF0ZSgwLDQxOS41LDI2OS41KSIvPjxyZWN0IHg9IjQyNyIgeT0iMjYyIiB3aWR0aD0iMTUiIGhlaWdodD0iMTUiIHRyYW5zZm9ybT0icm90YXRlKDAsNDM0LjUsMjY5LjUpIi8+PHJlY3QgeD0iNDQyIiB5PSIyNjIiIHdpZHRoPSIxNSIgaGVpZ2h0PSIxNSIgdHJhbnNmb3JtPSJyb3RhdGUoMCw0NDkuNSwyNjkuNSkiLz48cGF0aCBkPSJNIDQ3MiAyNjJ2IDE1aCA3LjVhIDcuNSA3LjUsIDAsIDAsIDAsIDAgLTE1IiB0cmFuc2Zvcm09InJvdGF0ZSg5MCw0NzkuNSwyNjkuNSkiLz48cGF0aCBkPSJNIDUxNyAyNjJ2IDE1aCA3LjVhIDcuNSA3LjUsIDAsIDAsIDAsIDAgLTE1IiB0cmFuc2Zvcm09InJvdGF0ZSgtOTAsNTI0LjUsMjY5LjUpIi8+PHBhdGggZD0iTSA2NyAyNzd2IDE1aCAxNXYgLTcuNWEgNy41IDcuNSwgMCwgMCwgMCwgLTcuNSAtNy41IiB0cmFuc2Zvcm09InJvdGF0ZSgxODAsNzQuNSwyODQuNSkiLz48cmVjdCB4PSI4MiIgeT0iMjc3IiB3aWR0aD0iMTUiIGhlaWdodD0iMTUiIHRyYW5zZm9ybT0icm90YXRlKDAsODkuNSwyODQuNSkiLz48cmVjdCB4PSI5NyIgeT0iMjc3IiB3aWR0aD0iMTUiIGhlaWdodD0iMTUiIHRyYW5zZm9ybT0icm90YXRlKDAsMTA0LjUsMjg0LjUpIi8+PHJlY3QgeD0iMTEyIiB5PSIyNzciIHdpZHRoPSIxNSIgaGVpZ2h0PSIxNSIgdHJhbnNmb3JtPSJyb3RhdGUoMCwxMTkuNSwyODQuNSkiLz48cGF0aCBkPSJNIDEyNyAyNzd2IDE1aCAxNXYgLTcuNWEgNy41IDcuNSwgMCwgMCwgMCwgLTcuNSAtNy41IiB0cmFuc2Zvcm09InJvdGF0ZSgwLDEzNC41LDI4NC41KSIvPjxjaXJjbGUgY3g9IjE3OS41IiBjeT0iMjg0LjUiIHI9IjcuNSIgdHJhbnNmb3JtPSJyb3RhdGUoMCwxNzkuNSwyODQuNSkiLz48cGF0aCBkPSJNIDIwMiAyNzd2IDE1aCA3LjVhIDcuNSA3LjUsIDAsIDAsIDAsIDAgLTE1IiB0cmFuc2Zvcm09InJvdGF0ZSg5MCwyMDkuNSwyODQuNSkiLz48cGF0aCBkPSJNIDI2MiAyNzd2IDE1aCAxNXYgLTcuNWEgNy41IDcuNSwgMCwgMCwgMCwgLTcuNSAtNy41IiB0cmFuc2Zvcm09InJvdGF0ZSgxODAsMjY5LjUsMjg0LjUpIi8+PHJlY3QgeD0iMjc3IiB5PSIyNzciIHdpZHRoPSIxNSIgaGVpZ2h0PSIxNSIgdHJhbnNmb3JtPSJyb3RhdGUoMCwyODQuNSwyODQuNSkiLz48cGF0aCBkPSJNIDMwNyAyNzd2IDE1aCA3LjVhIDcuNSA3LjUsIDAsIDAsIDAsIDAgLTE1IiB0cmFuc2Zvcm09InJvdGF0ZSg5MCwzMTQuNSwyODQuNSkiLz48cGF0aCBkPSJNIDMzNyAyNzd2IDE1aCA3LjVhIDcuNSA3LjUsIDAsIDAsIDAsIDAgLTE1IiB0cmFuc2Zvcm09InJvdGF0ZSgxODAsMzQ0LjUsMjg0LjUpIi8+PHJlY3QgeD0iMzUyIiB5PSIyNzciIHdpZHRoPSIxNSIgaGVpZ2h0PSIxNSIgdHJhbnNmb3JtPSJyb3RhdGUoMCwzNTkuNSwyODQuNSkiLz48cmVjdCB4PSIzNjciIHk9IjI3NyIgd2lkdGg9IjE1IiBoZWlnaHQ9IjE1IiB0cmFuc2Zvcm09InJvdGF0ZSgwLDM3NC41LDI4NC41KSIvPjxwYXRoIGQ9Ik0gMzgyIDI3N3YgMTVoIDcuNWEgNy41IDcuNSwgMCwgMCwgMCwgMCAtMTUiIHRyYW5zZm9ybT0icm90YXRlKDAsMzg5LjUsMjg0LjUpIi8+PHJlY3QgeD0iNDQyIiB5PSIyNzciIHdpZHRoPSIxNSIgaGVpZ2h0PSIxNSIgdHJhbnNmb3JtPSJyb3RhdGUoMCw0NDkuNSwyODQuNSkiLz48Y2lyY2xlIGN4PSI0OTQuNSIgY3k9IjI4NC41IiByPSI3LjUiIHRyYW5zZm9ybT0icm90YXRlKDAsNDk0LjUsMjg0LjUpIi8+PHJlY3QgeD0iNTE3IiB5PSIyNzciIHdpZHRoPSIxNSIgaGVpZ2h0PSIxNSIgdHJhbnNmb3JtPSJyb3RhdGUoMCw1MjQuNSwyODQuNSkiLz48Y2lyY2xlIGN4PSI1OS41IiBjeT0iMjk5LjUiIHI9IjcuNSIgdHJhbnNmb3JtPSJyb3RhdGUoMCw1OS41LDI5OS41KSIvPjxwYXRoIGQ9Ik0gODIgMjkydiAxNWggNy41YSA3LjUgNy41LCAwLCAwLCAwLCAwIC0xNSIgdHJhbnNmb3JtPSJyb3RhdGUoOTAsODkuNSwyOTkuNSkiLz48cGF0aCBkPSJNIDExMiAyOTJ2IDE1aCAxNXYgLTcuNWEgNy41IDcuNSwgMCwgMCwgMCwgLTcuNSAtNy41IiB0cmFuc2Zvcm09InJvdGF0ZSgxODAsMTE5LjUsMjk5LjUpIi8+PHJlY3QgeD0iMTI3IiB5PSIyOTIiIHdpZHRoPSIxNSIgaGVpZ2h0PSIxNSIgdHJhbnNmb3JtPSJyb3RhdGUoMCwxMzQuNSwyOTkuNSkiLz48cGF0aCBkPSJNIDE0MiAyOTJ2IDE1aCA3LjVhIDcuNSA3LjUsIDAsIDAsIDAsIDAgLTE1IiB0cmFuc2Zvcm09InJvdGF0ZSgwLDE0OS41LDI5OS41KSIvPjxjaXJjbGUgY3g9IjE5NC41IiBjeT0iMjk5LjUiIHI9IjcuNSIgdHJhbnNmb3JtPSJyb3RhdGUoMCwxOTQuNSwyOTkuNSkiLz48cGF0aCBkPSJNIDI0NyAyOTJ2IDE1aCA3LjVhIDcuNSA3LjUsIDAsIDAsIDAsIDAgLTE1IiB0cmFuc2Zvcm09InJvdGF0ZSgtOTAsMjU0LjUsMjk5LjUpIi8+PHJlY3QgeD0iMjc3IiB5PSIyOTIiIHdpZHRoPSIxNSIgaGVpZ2h0PSIxNSIgdHJhbnNmb3JtPSJyb3RhdGUoMCwyODQuNSwyOTkuNSkiLz48cmVjdCB4PSIzNjciIHk9IjI5MiIgd2lkdGg9IjE1IiBoZWlnaHQ9IjE1IiB0cmFuc2Zvcm09InJvdGF0ZSgwLDM3NC41LDI5OS41KSIvPjxwYXRoIGQ9Ik0gNDI3IDI5MnYgMTVoIDE1diAtNy41YSA3LjUgNy41LCAwLCAwLCAwLCAtNy41IC03LjUiIHRyYW5zZm9ybT0icm90YXRlKC05MCw0MzQuNSwyOTkuNSkiLz48cGF0aCBkPSJNIDQ0MiAyOTJ2IDE1aCAxNXYgLTcuNWEgNy41IDcuNSwgMCwgMCwgMCwgLTcuNSAtNy41IiB0cmFuc2Zvcm09InJvdGF0ZSg5MCw0NDkuNSwyOTkuNSkiLz48Y2lyY2xlIGN4PSI0NzkuNSIgY3k9IjI5OS41IiByPSI3LjUiIHRyYW5zZm9ybT0icm90YXRlKDAsNDc5LjUsMjk5LjUpIi8+PHBhdGggZD0iTSA1MTcgMjkydiAxNWggMTV2IC03LjVhIDcuNSA3LjUsIDAsIDAsIDAsIC03LjUgLTcuNSIgdHJhbnNmb3JtPSJyb3RhdGUoMTgwLDUyNC41LDI5OS41KSIvPjxwYXRoIGQ9Ik0gNTMyIDI5MnYgMTVoIDcuNWEgNy41IDcuNSwgMCwgMCwgMCwgMCAtMTUiIHRyYW5zZm9ybT0icm90YXRlKDAsNTM5LjUsMjk5LjUpIi8+PHBhdGggZD0iTSAxNTcgMzA3diAxNWggNy41YSA3LjUgNy41LCAwLCAwLCAwLCAwIC0xNSIgdHJhbnNmb3JtPSJyb3RhdGUoMTgwLDE2NC41LDMxNC41KSIvPjxwYXRoIGQ9Ik0gMTcyIDMwN3YgMTVoIDE1diAtNy41YSA3LjUgNy41LCAwLCAwLCAwLCAtNy41IC03LjUiIHRyYW5zZm9ybT0icm90YXRlKDAsMTc5LjUsMzE0LjUpIi8+PHBhdGggZD0iTSAyMDIgMzA3diAxNWggMTV2IC03LjVhIDcuNSA3LjUsIDAsIDAsIDAsIC03LjUgLTcuNSIgdHJhbnNmb3JtPSJyb3RhdGUoLTkwLDIwOS41LDMxNC41KSIvPjxyZWN0IHg9IjIxNyIgeT0iMzA3IiB3aWR0aD0iMTUiIGhlaWdodD0iMTUiIHRyYW5zZm9ybT0icm90YXRlKDAsMjI0LjUsMzE0LjUpIi8+PHJlY3QgeD0iMjMyIiB5PSIzMDciIHdpZHRoPSIxNSIgaGVpZ2h0PSIxNSIgdHJhbnNmb3JtPSJyb3RhdGUoMCwyMzkuNSwzMTQuNSkiLz48cmVjdCB4PSIyNDciIHk9IjMwNyIgd2lkdGg9IjE1IiBoZWlnaHQ9IjE1IiB0cmFuc2Zvcm09InJvdGF0ZSgwLDI1NC41LDMxNC41KSIvPjxyZWN0IHg9IjI2MiIgeT0iMzA3IiB3aWR0aD0iMTUiIGhlaWdodD0iMTUiIHRyYW5zZm9ybT0icm90YXRlKDAsMjY5LjUsMzE0LjUpIi8+PHJlY3QgeD0iMjc3IiB5PSIzMDciIHdpZHRoPSIxNSIgaGVpZ2h0PSIxNSIgdHJhbnNmb3JtPSJyb3RhdGUoMCwyODQuNSwzMTQuNSkiLz48cGF0aCBkPSJNIDMwNyAzMDd2IDE1aCAxNXYgLTcuNWEgNy41IDcuNSwgMCwgMCwgMCwgLTcuNSAtNy41IiB0cmFuc2Zvcm09InJvdGF0ZSgtOTAsMzE0LjUsMzE0LjUpIi8+PHJlY3QgeD0iMzIyIiB5PSIzMDciIHdpZHRoPSIxNSIgaGVpZ2h0PSIxNSIgdHJhbnNmb3JtPSJyb3RhdGUoMCwzMjkuNSwzMTQuNSkiLz48cmVjdCB4PSIzMzciIHk9IjMwNyIgd2lkdGg9IjE1IiBoZWlnaHQ9IjE1IiB0cmFuc2Zvcm09InJvdGF0ZSgwLDM0NC41LDMxNC41KSIvPjxyZWN0IHg9IjM1MiIgeT0iMzA3IiB3aWR0aD0iMTUiIGhlaWdodD0iMTUiIHRyYW5zZm9ybT0icm90YXRlKDAsMzU5LjUsMzE0LjUpIi8+PHJlY3QgeD0iMzY3IiB5PSIzMDciIHdpZHRoPSIxNSIgaGVpZ2h0PSIxNSIgdHJhbnNmb3JtPSJyb3RhdGUoMCwzNzQuNSwzMTQuNSkiLz48Y2lyY2xlIGN4PSI0MDQuNSIgY3k9IjMxNC41IiByPSI3LjUiIHRyYW5zZm9ybT0icm90YXRlKDAsNDA0LjUsMzE0LjUpIi8+PHJlY3QgeD0iNDI3IiB5PSIzMDciIHdpZHRoPSIxNSIgaGVpZ2h0PSIxNSIgdHJhbnNmb3JtPSJyb3RhdGUoMCw0MzQuNSwzMTQuNSkiLz48cGF0aCBkPSJNIDUwMiAzMDd2IDE1aCA3LjVhIDcuNSA3LjUsIDAsIDAsIDAsIDAgLTE1IiB0cmFuc2Zvcm09InJvdGF0ZSgtOTAsNTA5LjUsMzE0LjUpIi8+PHBhdGggZD0iTSA5NyAzMjJ2IDE1aCAxNXYgLTcuNWEgNy41IDcuNSwgMCwgMCwgMCwgLTcuNSAtNy41IiB0cmFuc2Zvcm09InJvdGF0ZSgtOTAsMTA0LjUsMzI5LjUpIi8+PHJlY3QgeD0iMTEyIiB5PSIzMjIiIHdpZHRoPSIxNSIgaGVpZ2h0PSIxNSIgdHJhbnNmb3JtPSJyb3RhdGUoMCwxMTkuNSwzMjkuNSkiLz48cmVjdCB4PSIxMjciIHk9IjMyMiIgd2lkdGg9IjE1IiBoZWlnaHQ9IjE1IiB0cmFuc2Zvcm09InJvdGF0ZSgwLDEzNC41LDMyOS41KSIvPjxwYXRoIGQ9Ik0gMTQyIDMyMnYgMTVoIDcuNWEgNy41IDcuNSwgMCwgMCwgMCwgMCAtMTUiIHRyYW5zZm9ybT0icm90YXRlKDAsMTQ5LjUsMzI5LjUpIi8+PHBhdGggZD0iTSAxNzIgMzIydiAxNWggMTV2IC03LjVhIDcuNSA3LjUsIDAsIDAsIDAsIC03LjUgLTcuNSIgdHJhbnNmb3JtPSJyb3RhdGUoMTgwLDE3OS41LDMyOS41KSIvPjxyZWN0IHg9IjE4NyIgeT0iMzIyIiB3aWR0aD0iMTUiIGhlaWdodD0iMTUiIHRyYW5zZm9ybT0icm90YXRlKDAsMTk0LjUsMzI5LjUpIi8+PHBhdGggZD0iTSAyMDIgMzIydiAxNWggMTV2IC03LjVhIDcuNSA3LjUsIDAsIDAsIDAsIC03LjUgLTcuNSIgdHJhbnNmb3JtPSJyb3RhdGUoOTAsMjA5LjUsMzI5LjUpIi8+PHBhdGggZD0iTSAyMzIgMzIydiAxNWggMTV2IC03LjVhIDcuNSA3LjUsIDAsIDAsIDAsIC03LjUgLTcuNSIgdHJhbnNmb3JtPSJyb3RhdGUoMTgwLDIzOS41LDMyOS41KSIvPjxyZWN0IHg9IjI0NyIgeT0iMzIyIiB3aWR0aD0iMTUiIGhlaWdodD0iMTUiIHRyYW5zZm9ybT0icm90YXRlKDAsMjU0LjUsMzI5LjUpIi8+PHBhdGggZD0iTSAyNzcgMzIydiAxNWggNy41YSA3LjUgNy41LCAwLCAwLCAwLCAwIC0xNSIgdHJhbnNmb3JtPSJyb3RhdGUoOTAsMjg0LjUsMzI5LjUpIi8+PHJlY3QgeD0iMzA3IiB5PSIzMjIiIHdpZHRoPSIxNSIgaGVpZ2h0PSIxNSIgdHJhbnNmb3JtPSJyb3RhdGUoMCwzMTQuNSwzMjkuNSkiLz48cGF0aCBkPSJNIDMyMiAzMjJ2IDE1aCAxNXYgLTcuNWEgNy41IDcuNSwgMCwgMCwgMCwgLTcuNSAtNy41IiB0cmFuc2Zvcm09InJvdGF0ZSg5MCwzMjkuNSwzMjkuNSkiLz48cGF0aCBkPSJNIDM1MiAzMjJ2IDE1aCAxNXYgLTcuNWEgNy41IDcuNSwgMCwgMCwgMCwgLTcuNSAtNy41IiB0cmFuc2Zvcm09InJvdGF0ZSgxODAsMzU5LjUsMzI5LjUpIi8+PHJlY3QgeD0iMzY3IiB5PSIzMjIiIHdpZHRoPSIxNSIgaGVpZ2h0PSIxNSIgdHJhbnNmb3JtPSJyb3RhdGUoMCwzNzQuNSwzMjkuNSkiLz48cGF0aCBkPSJNIDM4MiAzMjJ2IDE1aCA3LjVhIDcuNSA3LjUsIDAsIDAsIDAsIDAgLTE1IiB0cmFuc2Zvcm09InJvdGF0ZSgwLDM4OS41LDMyOS41KSIvPjxyZWN0IHg9IjQyNyIgeT0iMzIyIiB3aWR0aD0iMTUiIGhlaWdodD0iMTUiIHRyYW5zZm9ybT0icm90YXRlKDAsNDM0LjUsMzI5LjUpIi8+PHJlY3QgeD0iNDQyIiB5PSIzMjIiIHdpZHRoPSIxNSIgaGVpZ2h0PSIxNSIgdHJhbnNmb3JtPSJyb3RhdGUoMCw0NDkuNSwzMjkuNSkiLz48cmVjdCB4PSI0NTciIHk9IjMyMiIgd2lkdGg9IjE1IiBoZWlnaHQ9IjE1IiB0cmFuc2Zvcm09InJvdGF0ZSgwLDQ2NC41LDMyOS41KSIvPjxwYXRoIGQ9Ik0gNDcyIDMyMnYgMTVoIDcuNWEgNy41IDcuNSwgMCwgMCwgMCwgMCAtMTUiIHRyYW5zZm9ybT0icm90YXRlKDAsNDc5LjUsMzI5LjUpIi8+PHBhdGggZD0iTSA1MDIgMzIydiAxNWggMTV2IC03LjVhIDcuNSA3LjUsIDAsIDAsIDAsIC03LjUgLTcuNSIgdHJhbnNmb3JtPSJyb3RhdGUoMTgwLDUwOS41LDMyOS41KSIvPjxyZWN0IHg9IjUxNyIgeT0iMzIyIiB3aWR0aD0iMTUiIGhlaWdodD0iMTUiIHRyYW5zZm9ybT0icm90YXRlKDAsNTI0LjUsMzI5LjUpIi8+PHBhdGggZD0iTSA1MzIgMzIydiAxNWggNy41YSA3LjUgNy41LCAwLCAwLCAwLCAwIC0xNSIgdHJhbnNmb3JtPSJyb3RhdGUoMCw1MzkuNSwzMjkuNSkiLz48cGF0aCBkPSJNIDUyIDMzN3YgMTVoIDcuNWEgNy41IDcuNSwgMCwgMCwgMCwgMCAtMTUiIHRyYW5zZm9ybT0icm90YXRlKDE4MCw1OS41LDM0NC41KSIvPjxwYXRoIGQ9Ik0gNjcgMzM3diAxNWggMTV2IC03LjVhIDcuNSA3LjUsIDAsIDAsIDAsIC03LjUgLTcuNSIgdHJhbnNmb3JtPSJyb3RhdGUoMCw3NC41LDM0NC41KSIvPjxyZWN0IHg9Ijk3IiB5PSIzMzciIHdpZHRoPSIxNSIgaGVpZ2h0PSIxNSIgdHJhbnNmb3JtPSJyb3RhdGUoMCwxMDQuNSwzNDQuNSkiLz48cmVjdCB4PSIxMTIiIHk9IjMzNyIgd2lkdGg9IjE1IiBoZWlnaHQ9IjE1IiB0cmFuc2Zvcm09InJvdGF0ZSgwLDExOS41LDM0NC41KSIvPjxwYXRoIGQ9Ik0gMTI3IDMzN3YgMTVoIDE1diAtNy41YSA3LjUgNy41LCAwLCAwLCAwLCAtNy41IC03LjUiIHRyYW5zZm9ybT0icm90YXRlKDkwLDEzNC41LDM0NC41KSIvPjxjaXJjbGUgY3g9IjE2NC41IiBjeT0iMzQ0LjUiIHI9IjcuNSIgdHJhbnNmb3JtPSJyb3RhdGUoMCwxNjQuNSwzNDQuNSkiLz48cGF0aCBkPSJNIDIxNyAzMzd2IDE1aCA3LjVhIDcuNSA3LjUsIDAsIDAsIDAsIDAgLTE1IiB0cmFuc2Zvcm09InJvdGF0ZSgtOTAsMjI0LjUsMzQ0LjUpIi8+PHJlY3QgeD0iMjQ3IiB5PSIzMzciIHdpZHRoPSIxNSIgaGVpZ2h0PSIxNSIgdHJhbnNmb3JtPSJyb3RhdGUoMCwyNTQuNSwzNDQuNSkiLz48cGF0aCBkPSJNIDI5MiAzMzd2IDE1aCA3LjVhIDcuNSA3LjUsIDAsIDAsIDAsIDAgLTE1IiB0cmFuc2Zvcm09InJvdGF0ZSgxODAsMjk5LjUsMzQ0LjUpIi8+PHJlY3QgeD0iMzA3IiB5PSIzMzciIHdpZHRoPSIxNSIgaGVpZ2h0PSIxNSIgdHJhbnNmb3JtPSJyb3RhdGUoMCwzMTQuNSwzNDQuNSkiLz48Y2lyY2xlIGN4PSIzNDQuNSIgY3k9IjM0NC41IiByPSI3LjUiIHRyYW5zZm9ybT0icm90YXRlKDAsMzQ0LjUsMzQ0LjUpIi8+PHJlY3QgeD0iMzY3IiB5PSIzMzciIHdpZHRoPSIxNSIgaGVpZ2h0PSIxNSIgdHJhbnNmb3JtPSJyb3RhdGUoMCwzNzQuNSwzNDQuNSkiLz48cmVjdCB4PSI0MjciIHk9IjMzNyIgd2lkdGg9IjE1IiBoZWlnaHQ9IjE1IiB0cmFuc2Zvcm09InJvdGF0ZSgwLDQzNC41LDM0NC41KSIvPjxwYXRoIGQ9Ik0gNDU3IDMzN3YgMTVoIDcuNWEgNy41IDcuNSwgMCwgMCwgMCwgMCAtMTUiIHRyYW5zZm9ybT0icm90YXRlKDkwLDQ2NC41LDM0NC41KSIvPjxyZWN0IHg9IjUxNyIgeT0iMzM3IiB3aWR0aD0iMTUiIGhlaWdodD0iMTUiIHRyYW5zZm9ybT0icm90YXRlKDAsNTI0LjUsMzQ0LjUpIi8+PHBhdGggZD0iTSA2NyAzNTJ2IDE1aCA3LjVhIDcuNSA3LjUsIDAsIDAsIDAsIDAgLTE1IiB0cmFuc2Zvcm09InJvdGF0ZSg5MCw3NC41LDM1OS41KSIvPjxwYXRoIGQ9Ik0gOTcgMzUydiAxNWggNy41YSA3LjUgNy41LCAwLCAwLCAwLCAwIC0xNSIgdHJhbnNmb3JtPSJyb3RhdGUoOTAsMTA0LjUsMzU5LjUpIi8+PGNpcmNsZSBjeD0iMTQ5LjUiIGN5PSIzNTkuNSIgcj0iNy41IiB0cmFuc2Zvcm09InJvdGF0ZSgwLDE0OS41LDM1OS41KSIvPjxwYXRoIGQ9Ik0gMTg3IDM1MnYgMTVoIDcuNWEgNy41IDcuNSwgMCwgMCwgMCwgMCAtMTUiIHRyYW5zZm9ybT0icm90YXRlKDE4MCwxOTQuNSwzNTkuNSkiLz48cmVjdCB4PSIyMDIiIHk9IjM1MiIgd2lkdGg9IjE1IiBoZWlnaHQ9IjE1IiB0cmFuc2Zvcm09InJvdGF0ZSgwLDIwOS41LDM1OS41KSIvPjxyZWN0IHg9IjIxNyIgeT0iMzUyIiB3aWR0aD0iMTUiIGhlaWdodD0iMTUiIHRyYW5zZm9ybT0icm90YXRlKDAsMjI0LjUsMzU5LjUpIi8+PHJlY3QgeD0iMjMyIiB5PSIzNTIiIHdpZHRoPSIxNSIgaGVpZ2h0PSIxNSIgdHJhbnNmb3JtPSJyb3RhdGUoMCwyMzkuNSwzNTkuNSkiLz48cmVjdCB4PSIyNDciIHk9IjM1MiIgd2lkdGg9IjE1IiBoZWlnaHQ9IjE1IiB0cmFuc2Zvcm09InJvdGF0ZSgwLDI1NC41LDM1OS41KSIvPjxyZWN0IHg9IjI2MiIgeT0iMzUyIiB3aWR0aD0iMTUiIGhlaWdodD0iMTUiIHRyYW5zZm9ybT0icm90YXRlKDAsMjY5LjUsMzU5LjUpIi8+PHBhdGggZD0iTSAyNzcgMzUydiAxNWggMTV2IC03LjVhIDcuNSA3LjUsIDAsIDAsIDAsIC03LjUgLTcuNSIgdHJhbnNmb3JtPSJyb3RhdGUoMCwyODQuNSwzNTkuNSkiLz48cmVjdCB4PSIzMDciIHk9IjM1MiIgd2lkdGg9IjE1IiBoZWlnaHQ9IjE1IiB0cmFuc2Zvcm09InJvdGF0ZSgwLDMxNC41LDM1OS41KSIvPjxwYXRoIGQ9Ik0gMzIyIDM1MnYgMTVoIDcuNWEgNy41IDcuNSwgMCwgMCwgMCwgMCAtMTUiIHRyYW5zZm9ybT0icm90YXRlKDAsMzI5LjUsMzU5LjUpIi8+PHJlY3QgeD0iMzY3IiB5PSIzNTIiIHdpZHRoPSIxNSIgaGVpZ2h0PSIxNSIgdHJhbnNmb3JtPSJyb3RhdGUoMCwzNzQuNSwzNTkuNSkiLz48cGF0aCBkPSJNIDM5NyAzNTJ2IDE1aCA3LjVhIDcuNSA3LjUsIDAsIDAsIDAsIDAgLTE1IiB0cmFuc2Zvcm09InJvdGF0ZSgxODAsNDA0LjUsMzU5LjUpIi8+PHJlY3QgeD0iNDEyIiB5PSIzNTIiIHdpZHRoPSIxNSIgaGVpZ2h0PSIxNSIgdHJhbnNmb3JtPSJyb3RhdGUoMCw0MTkuNSwzNTkuNSkiLz48cGF0aCBkPSJNIDQyNyAzNTJ2IDE1aCAxNXYgLTcuNWEgNy41IDcuNSwgMCwgMCwgMCwgLTcuNSAtNy41IiB0cmFuc2Zvcm09InJvdGF0ZSg5MCw0MzQuNSwzNTkuNSkiLz48cGF0aCBkPSJNIDUxNyAzNTJ2IDE1aCA3LjVhIDcuNSA3LjUsIDAsIDAsIDAsIDAgLTE1IiB0cmFuc2Zvcm09InJvdGF0ZSg5MCw1MjQuNSwzNTkuNSkiLz48cGF0aCBkPSJNIDExMiAzNjd2IDE1aCA3LjVhIDcuNSA3LjUsIDAsIDAsIDAsIDAgLTE1IiB0cmFuc2Zvcm09InJvdGF0ZSgtOTAsMTE5LjUsMzc0LjUpIi8+PGNpcmNsZSBjeD0iMTc5LjUiIGN5PSIzNzQuNSIgcj0iNy41IiB0cmFuc2Zvcm09InJvdGF0ZSgwLDE3OS41LDM3NC41KSIvPjxyZWN0IHg9IjIzMiIgeT0iMzY3IiB3aWR0aD0iMTUiIGhlaWdodD0iMTUiIHRyYW5zZm9ybT0icm90YXRlKDAsMjM5LjUsMzc0LjUpIi8+PHBhdGggZD0iTSAyNjIgMzY3diAxNWggMTV2IC03LjVhIDcuNSA3LjUsIDAsIDAsIDAsIC03LjUgLTcuNSIgdHJhbnNmb3JtPSJyb3RhdGUoMTgwLDI2OS41LDM3NC41KSIvPjxyZWN0IHg9IjI3NyIgeT0iMzY3IiB3aWR0aD0iMTUiIGhlaWdodD0iMTUiIHRyYW5zZm9ybT0icm90YXRlKDAsMjg0LjUsMzc0LjUpIi8+PHJlY3QgeD0iMjkyIiB5PSIzNjciIHdpZHRoPSIxNSIgaGVpZ2h0PSIxNSIgdHJhbnNmb3JtPSJyb3RhdGUoMCwyOTkuNSwzNzQuNSkiLz48cmVjdCB4PSIzMDciIHk9IjM2NyIgd2lkdGg9IjE1IiBoZWlnaHQ9IjE1IiB0cmFuc2Zvcm09InJvdGF0ZSgwLDMxNC41LDM3NC41KSIvPjxjaXJjbGUgY3g9IjM0NC41IiBjeT0iMzc0LjUiIHI9IjcuNSIgdHJhbnNmb3JtPSJyb3RhdGUoMCwzNDQuNSwzNzQuNSkiLz48cmVjdCB4PSIzNjciIHk9IjM2NyIgd2lkdGg9IjE1IiBoZWlnaHQ9IjE1IiB0cmFuc2Zvcm09InJvdGF0ZSgwLDM3NC41LDM3NC41KSIvPjxwYXRoIGQ9Ik0gMzgyIDM2N3YgMTVoIDE1diAtNy41YSA3LjUgNy41LCAwLCAwLCAwLCAtNy41IC03LjUiIHRyYW5zZm9ybT0icm90YXRlKDAsMzg5LjUsMzc0LjUpIi8+PHBhdGggZD0iTSA0NDIgMzY3diAxNWggNy41YSA3LjUgNy41LCAwLCAwLCAwLCAwIC0xNSIgdHJhbnNmb3JtPSJyb3RhdGUoLTkwLDQ0OS41LDM3NC41KSIvPjxwYXRoIGQ9Ik0gNTMyIDM2N3YgMTVoIDcuNWEgNy41IDcuNSwgMCwgMCwgMCwgMCAtMTUiIHRyYW5zZm9ybT0icm90YXRlKC05MCw1MzkuNSwzNzQuNSkiLz48cGF0aCBkPSJNIDUyIDM4MnYgMTVoIDcuNWEgNy41IDcuNSwgMCwgMCwgMCwgMCAtMTUiIHRyYW5zZm9ybT0icm90YXRlKDE4MCw1OS41LDM4OS41KSIvPjxyZWN0IHg9IjY3IiB5PSIzODIiIHdpZHRoPSIxNSIgaGVpZ2h0PSIxNSIgdHJhbnNmb3JtPSJyb3RhdGUoMCw3NC41LDM4OS41KSIvPjxyZWN0IHg9IjgyIiB5PSIzODIiIHdpZHRoPSIxNSIgaGVpZ2h0PSIxNSIgdHJhbnNmb3JtPSJyb3RhdGUoMCw4OS41LDM4OS41KSIvPjxyZWN0IHg9Ijk3IiB5PSIzODIiIHdpZHRoPSIxNSIgaGVpZ2h0PSIxNSIgdHJhbnNmb3JtPSJyb3RhdGUoMCwxMDQuNSwzODkuNSkiLz48cmVjdCB4PSIxMTIiIHk9IjM4MiIgd2lkdGg9IjE1IiBoZWlnaHQ9IjE1IiB0cmFuc2Zvcm09InJvdGF0ZSgwLDExOS41LDM4OS41KSIvPjxyZWN0IHg9IjEyNyIgeT0iMzgyIiB3aWR0aD0iMTUiIGhlaWdodD0iMTUiIHRyYW5zZm9ybT0icm90YXRlKDAsMTM0LjUsMzg5LjUpIi8+PHBhdGggZD0iTSAxNDIgMzgydiAxNWggNy41YSA3LjUgNy41LCAwLCAwLCAwLCAwIC0xNSIgdHJhbnNmb3JtPSJyb3RhdGUoMCwxNDkuNSwzODkuNSkiLz48Y2lyY2xlIGN4PSIxOTQuNSIgY3k9IjM4OS41IiByPSI3LjUiIHRyYW5zZm9ybT0icm90YXRlKDAsMTk0LjUsMzg5LjUpIi8+PHBhdGggZD0iTSAyMTcgMzgydiAxNWggNy41YSA3LjUgNy41LCAwLCAwLCAwLCAwIC0xNSIgdHJhbnNmb3JtPSJyb3RhdGUoMTgwLDIyNC41LDM4OS41KSIvPjxyZWN0IHg9IjIzMiIgeT0iMzgyIiB3aWR0aD0iMTUiIGhlaWdodD0iMTUiIHRyYW5zZm9ybT0icm90YXRlKDAsMjM5LjUsMzg5LjUpIi8+PHBhdGggZD0iTSAyNDcgMzgydiAxNWggNy41YSA3LjUgNy41LCAwLCAwLCAwLCAwIC0xNSIgdHJhbnNmb3JtPSJyb3RhdGUoMCwyNTQuNSwzODkuNSkiLz48cGF0aCBkPSJNIDMwNyAzODJ2IDE1aCA3LjVhIDcuNSA3LjUsIDAsIDAsIDAsIDAgLTE1IiB0cmFuc2Zvcm09InJvdGF0ZSg5MCwzMTQuNSwzODkuNSkiLz48cGF0aCBkPSJNIDM1MiAzODJ2IDE1aCA3LjVhIDcuNSA3LjUsIDAsIDAsIDAsIDAgLTE1IiB0cmFuc2Zvcm09InJvdGF0ZSgxODAsMzU5LjUsMzg5LjUpIi8+PHJlY3QgeD0iMzY3IiB5PSIzODIiIHdpZHRoPSIxNSIgaGVpZ2h0PSIxNSIgdHJhbnNmb3JtPSJyb3RhdGUoMCwzNzQuNSwzODkuNSkiLz48cmVjdCB4PSIzODIiIHk9IjM4MiIgd2lkdGg9IjE1IiBoZWlnaHQ9IjE1IiB0cmFuc2Zvcm09InJvdGF0ZSgwLDM4OS41LDM4OS41KSIvPjxwYXRoIGQ9Ik0gNDEyIDM4MnYgMTVoIDE1diAtNy41YSA3LjUgNy41LCAwLCAwLCAwLCAtNy41IC03LjUiIHRyYW5zZm9ybT0icm90YXRlKC05MCw0MTkuNSwzODkuNSkiLz48cmVjdCB4PSI0MjciIHk9IjM4MiIgd2lkdGg9IjE1IiBoZWlnaHQ9IjE1IiB0cmFuc2Zvcm09InJvdGF0ZSgwLDQzNC41LDM4OS41KSIvPjxyZWN0IHg9IjQ0MiIgeT0iMzgyIiB3aWR0aD0iMTUiIGhlaWdodD0iMTUiIHRyYW5zZm9ybT0icm90YXRlKDAsNDQ5LjUsMzg5LjUpIi8+PHBhdGggZD0iTSA0NzIgMzgydiAxNWggNy41YSA3LjUgNy41LCAwLCAwLCAwLCAwIC0xNSIgdHJhbnNmb3JtPSJyb3RhdGUoMTgwLDQ3OS41LDM4OS41KSIvPjxyZWN0IHg9IjQ4NyIgeT0iMzgyIiB3aWR0aD0iMTUiIGhlaWdodD0iMTUiIHRyYW5zZm9ybT0icm90YXRlKDAsNDk0LjUsMzg5LjUpIi8+PHBhdGggZD0iTSA1MDIgMzgydiAxNWggNy41YSA3LjUgNy41LCAwLCAwLCAwLCAwIC0xNSIgdHJhbnNmb3JtPSJyb3RhdGUoMCw1MDkuNSwzODkuNSkiLz48cmVjdCB4PSI1MzIiIHk9IjM4MiIgd2lkdGg9IjE1IiBoZWlnaHQ9IjE1IiB0cmFuc2Zvcm09InJvdGF0ZSgwLDUzOS41LDM4OS41KSIvPjxwYXRoIGQ9Ik0gNjcgMzk3diAxNWggNy41YSA3LjUgNy41LCAwLCAwLCAwLCAwIC0xNSIgdHJhbnNmb3JtPSJyb3RhdGUoOTAsNzQuNSw0MDQuNSkiLz48cGF0aCBkPSJNIDk3IDM5N3YgMTVoIDcuNWEgNy41IDcuNSwgMCwgMCwgMCwgMCAtMTUiIHRyYW5zZm9ybT0icm90YXRlKDkwLDEwNC41LDQwNC41KSIvPjxyZWN0IHg9IjEyNyIgeT0iMzk3IiB3aWR0aD0iMTUiIGhlaWdodD0iMTUiIHRyYW5zZm9ybT0icm90YXRlKDAsMTM0LjUsNDA0LjUpIi8+PGNpcmNsZSBjeD0iMTY0LjUiIGN5PSI0MDQuNSIgcj0iNy41IiB0cmFuc2Zvcm09InJvdGF0ZSgwLDE2NC41LDQwNC41KSIvPjxwYXRoIGQ9Ik0gMjYyIDM5N3YgMTVoIDcuNWEgNy41IDcuNSwgMCwgMCwgMCwgMCAtMTUiIHRyYW5zZm9ybT0icm90YXRlKDE4MCwyNjkuNSw0MDQuNSkiLz48cmVjdCB4PSIyNzciIHk9IjM5NyIgd2lkdGg9IjE1IiBoZWlnaHQ9IjE1IiB0cmFuc2Zvcm09InJvdGF0ZSgwLDI4NC41LDQwNC41KSIvPjxwYXRoIGQ9Ik0gMjkyIDM5N3YgMTVoIDE1diAtNy41YSA3LjUgNy41LCAwLCAwLCAwLCAtNy41IC03LjUiIHRyYW5zZm9ybT0icm90YXRlKDAsMjk5LjUsNDA0LjUpIi8+PHBhdGggZD0iTSAzMjIgMzk3diAxNWggMTV2IC03LjVhIDcuNSA3LjUsIDAsIDAsIDAsIC03LjUgLTcuNSIgdHJhbnNmb3JtPSJyb3RhdGUoLTkwLDMyOS41LDQwNC41KSIvPjxwYXRoIGQ9Ik0gMzM3IDM5N3YgMTVoIDE1diAtNy41YSA3LjUgNy41LCAwLCAwLCAwLCAtNy41IC03LjUiIHRyYW5zZm9ybT0icm90YXRlKDAsMzQ0LjUsNDA0LjUpIi8+PHJlY3QgeD0iMzY3IiB5PSIzOTciIHdpZHRoPSIxNSIgaGVpZ2h0PSIxNSIgdHJhbnNmb3JtPSJyb3RhdGUoMCwzNzQuNSw0MDQuNSkiLz48cmVjdCB4PSIzODIiIHk9IjM5NyIgd2lkdGg9IjE1IiBoZWlnaHQ9IjE1IiB0cmFuc2Zvcm09InJvdGF0ZSgwLDM4OS41LDQwNC41KSIvPjxyZWN0IHg9IjM5NyIgeT0iMzk3IiB3aWR0aD0iMTUiIGhlaWdodD0iMTUiIHRyYW5zZm9ybT0icm90YXRlKDAsNDA0LjUsNDA0LjUpIi8+PHJlY3QgeD0iNDEyIiB5PSIzOTciIHdpZHRoPSIxNSIgaGVpZ2h0PSIxNSIgdHJhbnNmb3JtPSJyb3RhdGUoMCw0MTkuNSw0MDQuNSkiLz48cmVjdCB4PSI0MjciIHk9IjM5NyIgd2lkdGg9IjE1IiBoZWlnaHQ9IjE1IiB0cmFuc2Zvcm09InJvdGF0ZSgwLDQzNC41LDQwNC41KSIvPjxyZWN0IHg9IjQ0MiIgeT0iMzk3IiB3aWR0aD0iMTUiIGhlaWdodD0iMTUiIHRyYW5zZm9ybT0icm90YXRlKDAsNDQ5LjUsNDA0LjUpIi8+PHBhdGggZD0iTSA0NTcgMzk3diAxNWggMTV2IC03LjVhIDcuNSA3LjUsIDAsIDAsIDAsIC03LjUgLTcuNSIgdHJhbnNmb3JtPSJyb3RhdGUoMCw0NjQuNSw0MDQuNSkiLz48cmVjdCB4PSI0ODciIHk9IjM5NyIgd2lkdGg9IjE1IiBoZWlnaHQ9IjE1IiB0cmFuc2Zvcm09InJvdGF0ZSgwLDQ5NC41LDQwNC41KSIvPjxwYXRoIGQ9Ik0gNTE3IDM5N3YgMTVoIDE1diAtNy41YSA3LjUgNy41LCAwLCAwLCAwLCAtNy41IC03LjUiIHRyYW5zZm9ybT0icm90YXRlKC05MCw1MjQuNSw0MDQuNSkiLz48cmVjdCB4PSI1MzIiIHk9IjM5NyIgd2lkdGg9IjE1IiBoZWlnaHQ9IjE1IiB0cmFuc2Zvcm09InJvdGF0ZSgwLDUzOS41LDQwNC41KSIvPjxjaXJjbGUgY3g9IjU5LjUiIGN5PSI0MTkuNSIgcj0iNy41IiB0cmFuc2Zvcm09InJvdGF0ZSgwLDU5LjUsNDE5LjUpIi8+PGNpcmNsZSBjeD0iODkuNSIgY3k9IjQxOS41IiByPSI3LjUiIHRyYW5zZm9ybT0icm90YXRlKDAsODkuNSw0MTkuNSkiLz48cGF0aCBkPSJNIDExMiA0MTJ2IDE1aCA3LjVhIDcuNSA3LjUsIDAsIDAsIDAsIDAgLTE1IiB0cmFuc2Zvcm09InJvdGF0ZSgxODAsMTE5LjUsNDE5LjUpIi8+PHJlY3QgeD0iMTI3IiB5PSI0MTIiIHdpZHRoPSIxNSIgaGVpZ2h0PSIxNSIgdHJhbnNmb3JtPSJyb3RhdGUoMCwxMzQuNSw0MTkuNSkiLz48cGF0aCBkPSJNIDE0MiA0MTJ2IDE1aCA3LjVhIDcuNSA3LjUsIDAsIDAsIDAsIDAgLTE1IiB0cmFuc2Zvcm09InJvdGF0ZSgwLDE0OS41LDQxOS41KSIvPjxwYXRoIGQ9Ik0gMTcyIDQxMnYgMTVoIDcuNWEgNy41IDcuNSwgMCwgMCwgMCwgMCAtMTUiIHRyYW5zZm9ybT0icm90YXRlKC05MCwxNzkuNSw0MTkuNSkiLz48cGF0aCBkPSJNIDIwMiA0MTJ2IDE1aCA3LjVhIDcuNSA3LjUsIDAsIDAsIDAsIDAgLTE1IiB0cmFuc2Zvcm09InJvdGF0ZSgtOTAsMjA5LjUsNDE5LjUpIi8+PHBhdGggZD0iTSAyOTIgNDEydiAxNWggMTV2IC03LjVhIDcuNSA3LjUsIDAsIDAsIDAsIC03LjUgLTcuNSIgdHJhbnNmb3JtPSJyb3RhdGUoMTgwLDI5OS41LDQxOS41KSIvPjxyZWN0IHg9IjMwNyIgeT0iNDEyIiB3aWR0aD0iMTUiIGhlaWdodD0iMTUiIHRyYW5zZm9ybT0icm90YXRlKDAsMzE0LjUsNDE5LjUpIi8+PHJlY3QgeD0iMzIyIiB5PSI0MTIiIHdpZHRoPSIxNSIgaGVpZ2h0PSIxNSIgdHJhbnNmb3JtPSJyb3RhdGUoMCwzMjkuNSw0MTkuNSkiLz48cmVjdCB4PSIzMzciIHk9IjQxMiIgd2lkdGg9IjE1IiBoZWlnaHQ9IjE1IiB0cmFuc2Zvcm09InJvdGF0ZSgwLDM0NC41LDQxOS41KSIvPjxyZWN0IHg9IjM1MiIgeT0iNDEyIiB3aWR0aD0iMTUiIGhlaWdodD0iMTUiIHRyYW5zZm9ybT0icm90YXRlKDAsMzU5LjUsNDE5LjUpIi8+PHJlY3QgeD0iMzY3IiB5PSI0MTIiIHdpZHRoPSIxNSIgaGVpZ2h0PSIxNSIgdHJhbnNmb3JtPSJyb3RhdGUoMCwzNzQuNSw0MTkuNSkiLz48cmVjdCB4PSI0MTIiIHk9IjQxMiIgd2lkdGg9IjE1IiBoZWlnaHQ9IjE1IiB0cmFuc2Zvcm09InJvdGF0ZSgwLDQxOS41LDQxOS41KSIvPjxyZWN0IHg9IjQyNyIgeT0iNDEyIiB3aWR0aD0iMTUiIGhlaWdodD0iMTUiIHRyYW5zZm9ybT0icm90YXRlKDAsNDM0LjUsNDE5LjUpIi8+PHJlY3QgeD0iNDQyIiB5PSI0MTIiIHdpZHRoPSIxNSIgaGVpZ2h0PSIxNSIgdHJhbnNmb3JtPSJyb3RhdGUoMCw0NDkuNSw0MTkuNSkiLz48cmVjdCB4PSI0NTciIHk9IjQxMiIgd2lkdGg9IjE1IiBoZWlnaHQ9IjE1IiB0cmFuc2Zvcm09InJvdGF0ZSgwLDQ2NC41LDQxOS41KSIvPjxyZWN0IHg9IjQ3MiIgeT0iNDEyIiB3aWR0aD0iMTUiIGhlaWdodD0iMTUiIHRyYW5zZm9ybT0icm90YXRlKDAsNDc5LjUsNDE5LjUpIi8+PHBhdGggZD0iTSA0ODcgNDEydiAxNWggMTV2IC03LjVhIDcuNSA3LjUsIDAsIDAsIDAsIC03LjUgLTcuNSIgdHJhbnNmb3JtPSJyb3RhdGUoOTAsNDk0LjUsNDE5LjUpIi8+PHJlY3QgeD0iNTE3IiB5PSI0MTIiIHdpZHRoPSIxNSIgaGVpZ2h0PSIxNSIgdHJhbnNmb3JtPSJyb3RhdGUoMCw1MjQuNSw0MTkuNSkiLz48cmVjdCB4PSI1MzIiIHk9IjQxMiIgd2lkdGg9IjE1IiBoZWlnaHQ9IjE1IiB0cmFuc2Zvcm09InJvdGF0ZSgwLDUzOS41LDQxOS41KSIvPjxwYXRoIGQ9Ik0gMTcyIDQyN3YgMTVoIDE1diAtNy41YSA3LjUgNy41LCAwLCAwLCAwLCAtNy41IC03LjUiIHRyYW5zZm9ybT0icm90YXRlKDE4MCwxNzkuNSw0MzQuNSkiLz48cmVjdCB4PSIxODciIHk9IjQyNyIgd2lkdGg9IjE1IiBoZWlnaHQ9IjE1IiB0cmFuc2Zvcm09InJvdGF0ZSgwLDE5NC41LDQzNC41KSIvPjxwYXRoIGQ9Ik0gMjAyIDQyN3YgMTVoIDE1diAtNy41YSA3LjUgNy41LCAwLCAwLCAwLCAtNy41IC03LjUiIHRyYW5zZm9ybT0icm90YXRlKDkwLDIwOS41LDQzNC41KSIvPjxjaXJjbGUgY3g9IjIzOS41IiBjeT0iNDM0LjUiIHI9IjcuNSIgdHJhbnNmb3JtPSJyb3RhdGUoMCwyMzkuNSw0MzQuNSkiLz48Y2lyY2xlIGN4PSIyNjkuNSIgY3k9IjQzNC41IiByPSI3LjUiIHRyYW5zZm9ybT0icm90YXRlKDAsMjY5LjUsNDM0LjUpIi8+PHJlY3QgeD0iMzUyIiB5PSI0MjciIHdpZHRoPSIxNSIgaGVpZ2h0PSIxNSIgdHJhbnNmb3JtPSJyb3RhdGUoMCwzNTkuNSw0MzQuNSkiLz48cmVjdCB4PSIzNjciIHk9IjQyNyIgd2lkdGg9IjE1IiBoZWlnaHQ9IjE1IiB0cmFuc2Zvcm09InJvdGF0ZSgwLDM3NC41LDQzNC41KSIvPjxwYXRoIGQ9Ik0gMzgyIDQyN3YgMTVoIDE1diAtNy41YSA3LjUgNy41LCAwLCAwLCAwLCAtNy41IC03LjUiIHRyYW5zZm9ybT0icm90YXRlKDAsMzg5LjUsNDM0LjUpIi8+PHJlY3QgeD0iNDEyIiB5PSI0MjciIHdpZHRoPSIxNSIgaGVpZ2h0PSIxNSIgdHJhbnNmb3JtPSJyb3RhdGUoMCw0MTkuNSw0MzQuNSkiLz48cmVjdCB4PSI0NzIiIHk9IjQyNyIgd2lkdGg9IjE1IiBoZWlnaHQ9IjE1IiB0cmFuc2Zvcm09InJvdGF0ZSgwLDQ3OS41LDQzNC41KSIvPjxyZWN0IHg9IjUxNyIgeT0iNDI3IiB3aWR0aD0iMTUiIGhlaWdodD0iMTUiIHRyYW5zZm9ybT0icm90YXRlKDAsNTI0LjUsNDM0LjUpIi8+PHBhdGggZD0iTSA1MzIgNDI3diAxNWggMTV2IC03LjVhIDcuNSA3LjUsIDAsIDAsIDAsIC03LjUgLTcuNSIgdHJhbnNmb3JtPSJyb3RhdGUoOTAsNTM5LjUsNDM0LjUpIi8+PHBhdGggZD0iTSAyNDcgNDQydiAxNWggNy41YSA3LjUgNy41LCAwLCAwLCAwLCAwIC0xNSIgdHJhbnNmb3JtPSJyb3RhdGUoLTkwLDI1NC41LDQ0OS41KSIvPjxjaXJjbGUgY3g9IjI5OS41IiBjeT0iNDQ5LjUiIHI9IjcuNSIgdHJhbnNmb3JtPSJyb3RhdGUoMCwyOTkuNSw0NDkuNSkiLz48cmVjdCB4PSIzNTIiIHk9IjQ0MiIgd2lkdGg9IjE1IiBoZWlnaHQ9IjE1IiB0cmFuc2Zvcm09InJvdGF0ZSgwLDM1OS41LDQ0OS41KSIvPjxyZWN0IHg9IjM4MiIgeT0iNDQyIiB3aWR0aD0iMTUiIGhlaWdodD0iMTUiIHRyYW5zZm9ybT0icm90YXRlKDAsMzg5LjUsNDQ5LjUpIi8+PHJlY3QgeD0iNDEyIiB5PSI0NDIiIHdpZHRoPSIxNSIgaGVpZ2h0PSIxNSIgdHJhbnNmb3JtPSJyb3RhdGUoMCw0MTkuNSw0NDkuNSkiLz48Y2lyY2xlIGN4PSI0NDkuNSIgY3k9IjQ0OS41IiByPSI3LjUiIHRyYW5zZm9ybT0icm90YXRlKDAsNDQ5LjUsNDQ5LjUpIi8+PHJlY3QgeD0iNDcyIiB5PSI0NDIiIHdpZHRoPSIxNSIgaGVpZ2h0PSIxNSIgdHJhbnNmb3JtPSJyb3RhdGUoMCw0NzkuNSw0NDkuNSkiLz48cmVjdCB4PSI0ODciIHk9IjQ0MiIgd2lkdGg9IjE1IiBoZWlnaHQ9IjE1IiB0cmFuc2Zvcm09InJvdGF0ZSgwLDQ5NC41LDQ0OS41KSIvPjxyZWN0IHg9IjUwMiIgeT0iNDQyIiB3aWR0aD0iMTUiIGhlaWdodD0iMTUiIHRyYW5zZm9ybT0icm90YXRlKDAsNTA5LjUsNDQ5LjUpIi8+PHBhdGggZD0iTSA1MTcgNDQydiAxNWggMTV2IC03LjVhIDcuNSA3LjUsIDAsIDAsIDAsIC03LjUgLTcuNSIgdHJhbnNmb3JtPSJyb3RhdGUoOTAsNTI0LjUsNDQ5LjUpIi8+PHBhdGggZD0iTSAyMzIgNDU3diAxNWggMTV2IC03LjVhIDcuNSA3LjUsIDAsIDAsIDAsIC03LjUgLTcuNSIgdHJhbnNmb3JtPSJyb3RhdGUoLTkwLDIzOS41LDQ2NC41KSIvPjxyZWN0IHg9IjI0NyIgeT0iNDU3IiB3aWR0aD0iMTUiIGhlaWdodD0iMTUiIHRyYW5zZm9ybT0icm90YXRlKDAsMjU0LjUsNDY0LjUpIi8+PHJlY3QgeD0iMjYyIiB5PSI0NTciIHdpZHRoPSIxNSIgaGVpZ2h0PSIxNSIgdHJhbnNmb3JtPSJyb3RhdGUoMCwyNjkuNSw0NjQuNSkiLz48cGF0aCBkPSJNIDI3NyA0NTd2IDE1aCA3LjVhIDcuNSA3LjUsIDAsIDAsIDAsIDAgLTE1IiB0cmFuc2Zvcm09InJvdGF0ZSgwLDI4NC41LDQ2NC41KSIvPjxjaXJjbGUgY3g9IjMyOS41IiBjeT0iNDY0LjUiIHI9IjcuNSIgdHJhbnNmb3JtPSJyb3RhdGUoMCwzMjkuNSw0NjQuNSkiLz48cmVjdCB4PSIzNTIiIHk9IjQ1NyIgd2lkdGg9IjE1IiBoZWlnaHQ9IjE1IiB0cmFuc2Zvcm09InJvdGF0ZSgwLDM1OS41LDQ2NC41KSIvPjxyZWN0IHg9IjM2NyIgeT0iNDU3IiB3aWR0aD0iMTUiIGhlaWdodD0iMTUiIHRyYW5zZm9ybT0icm90YXRlKDAsMzc0LjUsNDY0LjUpIi8+PHBhdGggZD0iTSAzODIgNDU3diAxNWggMTV2IC03LjVhIDcuNSA3LjUsIDAsIDAsIDAsIC03LjUgLTcuNSIgdHJhbnNmb3JtPSJyb3RhdGUoOTAsMzg5LjUsNDY0LjUpIi8+PHJlY3QgeD0iNDEyIiB5PSI0NTciIHdpZHRoPSIxNSIgaGVpZ2h0PSIxNSIgdHJhbnNmb3JtPSJyb3RhdGUoMCw0MTkuNSw0NjQuNSkiLz48cmVjdCB4PSI0NzIiIHk9IjQ1NyIgd2lkdGg9IjE1IiBoZWlnaHQ9IjE1IiB0cmFuc2Zvcm09InJvdGF0ZSgwLDQ3OS41LDQ2NC41KSIvPjxjaXJjbGUgY3g9IjUzOS41IiBjeT0iNDY0LjUiIHI9IjcuNSIgdHJhbnNmb3JtPSJyb3RhdGUoMCw1MzkuNSw0NjQuNSkiLz48Y2lyY2xlIGN4PSIyMDkuNSIgY3k9IjQ3OS41IiByPSI3LjUiIHRyYW5zZm9ybT0icm90YXRlKDAsMjA5LjUsNDc5LjUpIi8+PHJlY3QgeD0iMjMyIiB5PSI0NzIiIHdpZHRoPSIxNSIgaGVpZ2h0PSIxNSIgdHJhbnNmb3JtPSJyb3RhdGUoMCwyMzkuNSw0NzkuNSkiLz48cGF0aCBkPSJNIDI5MiA0NzJ2IDE1aCAxNXYgLTcuNWEgNy41IDcuNSwgMCwgMCwgMCwgLTcuNSAtNy41IiB0cmFuc2Zvcm09InJvdGF0ZSgtOTAsMjk5LjUsNDc5LjUpIi8+PHBhdGggZD0iTSAzMDcgNDcydiAxNWggMTV2IC03LjVhIDcuNSA3LjUsIDAsIDAsIDAsIC03LjUgLTcuNSIgdHJhbnNmb3JtPSJyb3RhdGUoMCwzMTQuNSw0NzkuNSkiLz48cGF0aCBkPSJNIDMzNyA0NzJ2IDE1aCA3LjVhIDcuNSA3LjUsIDAsIDAsIDAsIDAgLTE1IiB0cmFuc2Zvcm09InJvdGF0ZSgxODAsMzQ0LjUsNDc5LjUpIi8+PHBhdGggZD0iTSAzNTIgNDcydiAxNWggMTV2IC03LjVhIDcuNSA3LjUsIDAsIDAsIDAsIC03LjUgLTcuNSIgdHJhbnNmb3JtPSJyb3RhdGUoOTAsMzU5LjUsNDc5LjUpIi8+PHJlY3QgeD0iNDEyIiB5PSI0NzIiIHdpZHRoPSIxNSIgaGVpZ2h0PSIxNSIgdHJhbnNmb3JtPSJyb3RhdGUoMCw0MTkuNSw0NzkuNSkiLz48cmVjdCB4PSI0MjciIHk9IjQ3MiIgd2lkdGg9IjE1IiBoZWlnaHQ9IjE1IiB0cmFuc2Zvcm09InJvdGF0ZSgwLDQzNC41LDQ3OS41KSIvPjxyZWN0IHg9IjQ0MiIgeT0iNDcyIiB3aWR0aD0iMTUiIGhlaWdodD0iMTUiIHRyYW5zZm9ybT0icm90YXRlKDAsNDQ5LjUsNDc5LjUpIi8+PHJlY3QgeD0iNDU3IiB5PSI0NzIiIHdpZHRoPSIxNSIgaGVpZ2h0PSIxNSIgdHJhbnNmb3JtPSJyb3RhdGUoMCw0NjQuNSw0NzkuNSkiLz48cmVjdCB4PSI0NzIiIHk9IjQ3MiIgd2lkdGg9IjE1IiBoZWlnaHQ9IjE1IiB0cmFuc2Zvcm09InJvdGF0ZSgwLDQ3OS41LDQ3OS41KSIvPjxjaXJjbGUgY3g9IjE3OS41IiBjeT0iNDk0LjUiIHI9IjcuNSIgdHJhbnNmb3JtPSJyb3RhdGUoMCwxNzkuNSw0OTQuNSkiLz48cGF0aCBkPSJNIDIzMiA0ODd2IDE1aCAxNXYgLTcuNWEgNy41IDcuNSwgMCwgMCwgMCwgLTcuNSAtNy41IiB0cmFuc2Zvcm09InJvdGF0ZSgxODAsMjM5LjUsNDk0LjUpIi8+PHBhdGggZD0iTSAyNDcgNDg3diAxNWggMTV2IC03LjVhIDcuNSA3LjUsIDAsIDAsIDAsIC03LjUgLTcuNSIgdHJhbnNmb3JtPSJyb3RhdGUoMCwyNTQuNSw0OTQuNSkiLz48cGF0aCBkPSJNIDI3NyA0ODd2IDE1aCA3LjVhIDcuNSA3LjUsIDAsIDAsIDAsIDAgLTE1IiB0cmFuc2Zvcm09InJvdGF0ZSgxODAsMjg0LjUsNDk0LjUpIi8+PHJlY3QgeD0iMjkyIiB5PSI0ODciIHdpZHRoPSIxNSIgaGVpZ2h0PSIxNSIgdHJhbnNmb3JtPSJyb3RhdGUoMCwyOTkuNSw0OTQuNSkiLz48cGF0aCBkPSJNIDMwNyA0ODd2IDE1aCAxNXYgLTcuNWEgNy41IDcuNSwgMCwgMCwgMCwgLTcuNSAtNy41IiB0cmFuc2Zvcm09InJvdGF0ZSg5MCwzMTQuNSw0OTQuNSkiLz48cGF0aCBkPSJNIDM2NyA0ODd2IDE1aCA3LjVhIDcuNSA3LjUsIDAsIDAsIDAsIDAgLTE1IiB0cmFuc2Zvcm09InJvdGF0ZSgxODAsMzc0LjUsNDk0LjUpIi8+PHBhdGggZD0iTSAzODIgNDg3diAxNWggNy41YSA3LjUgNy41LCAwLCAwLCAwLCAwIC0xNSIgdHJhbnNmb3JtPSJyb3RhdGUoMCwzODkuNSw0OTQuNSkiLz48cGF0aCBkPSJNIDQxMiA0ODd2IDE1aCA3LjVhIDcuNSA3LjUsIDAsIDAsIDAsIDAgLTE1IiB0cmFuc2Zvcm09InJvdGF0ZSg5MCw0MTkuNSw0OTQuNSkiLz48cGF0aCBkPSJNIDQ0MiA0ODd2IDE1aCA3LjVhIDcuNSA3LjUsIDAsIDAsIDAsIDAgLTE1IiB0cmFuc2Zvcm09InJvdGF0ZSg5MCw0NDkuNSw0OTQuNSkiLz48cmVjdCB4PSI0NzIiIHk9IjQ4NyIgd2lkdGg9IjE1IiBoZWlnaHQ9IjE1IiB0cmFuc2Zvcm09InJvdGF0ZSgwLDQ3OS41LDQ5NC41KSIvPjxyZWN0IHg9IjQ4NyIgeT0iNDg3IiB3aWR0aD0iMTUiIGhlaWdodD0iMTUiIHRyYW5zZm9ybT0icm90YXRlKDAsNDk0LjUsNDk0LjUpIi8+PHJlY3QgeD0iNTAyIiB5PSI0ODciIHdpZHRoPSIxNSIgaGVpZ2h0PSIxNSIgdHJhbnNmb3JtPSJyb3RhdGUoMCw1MDkuNSw0OTQuNSkiLz48cGF0aCBkPSJNIDUxNyA0ODd2IDE1aCA3LjVhIDcuNSA3LjUsIDAsIDAsIDAsIDAgLTE1IiB0cmFuc2Zvcm09InJvdGF0ZSgwLDUyNC41LDQ5NC41KSIvPjxwYXRoIGQ9Ik0gMjQ3IDUwMnYgMTVoIDcuNWEgNy41IDcuNSwgMCwgMCwgMCwgMCAtMTUiIHRyYW5zZm9ybT0icm90YXRlKDkwLDI1NC41LDUwOS41KSIvPjxjaXJjbGUgY3g9IjQwNC41IiBjeT0iNTA5LjUiIHI9IjcuNSIgdHJhbnNmb3JtPSJyb3RhdGUoMCw0MDQuNSw1MDkuNSkiLz48cGF0aCBkPSJNIDQyNyA1MDJ2IDE1aCA3LjVhIDcuNSA3LjUsIDAsIDAsIDAsIDAgLTE1IiB0cmFuc2Zvcm09InJvdGF0ZSgtOTAsNDM0LjUsNTA5LjUpIi8+PHBhdGggZD0iTSA0NTcgNTAydiAxNWggMTV2IC03LjVhIDcuNSA3LjUsIDAsIDAsIDAsIC03LjUgLTcuNSIgdHJhbnNmb3JtPSJyb3RhdGUoLTkwLDQ2NC41LDUwOS41KSIvPjxyZWN0IHg9IjQ3MiIgeT0iNTAyIiB3aWR0aD0iMTUiIGhlaWdodD0iMTUiIHRyYW5zZm9ybT0icm90YXRlKDAsNDc5LjUsNTA5LjUpIi8+PGNpcmNsZSBjeD0iNTM5LjUiIGN5PSI1MDkuNSIgcj0iNy41IiB0cmFuc2Zvcm09InJvdGF0ZSgwLDUzOS41LDUwOS41KSIvPjxwYXRoIGQ9Ik0gMjAyIDUxN3YgMTVoIDcuNWEgNy41IDcuNSwgMCwgMCwgMCwgMCAtMTUiIHRyYW5zZm9ybT0icm90YXRlKDE4MCwyMDkuNSw1MjQuNSkiLz48cGF0aCBkPSJNIDIxNyA1MTd2IDE1aCA3LjVhIDcuNSA3LjUsIDAsIDAsIDAsIDAgLTE1IiB0cmFuc2Zvcm09InJvdGF0ZSgwLDIyNC41LDUyNC41KSIvPjxwYXRoIGQ9Ik0gMjc3IDUxN3YgMTVoIDE1diAtNy41YSA3LjUgNy41LCAwLCAwLCAwLCAtNy41IC03LjUiIHRyYW5zZm9ybT0icm90YXRlKC05MCwyODQuNSw1MjQuNSkiLz48cGF0aCBkPSJNIDI5MiA1MTd2IDE1aCA3LjVhIDcuNSA3LjUsIDAsIDAsIDAsIDAgLTE1IiB0cmFuc2Zvcm09InJvdGF0ZSgwLDI5OS41LDUyNC41KSIvPjxwYXRoIGQ9Ik0gMzIyIDUxN3YgMTVoIDcuNWEgNy41IDcuNSwgMCwgMCwgMCwgMCAtMTUiIHRyYW5zZm9ybT0icm90YXRlKDE4MCwzMjkuNSw1MjQuNSkiLz48cmVjdCB4PSIzMzciIHk9IjUxNyIgd2lkdGg9IjE1IiBoZWlnaHQ9IjE1IiB0cmFuc2Zvcm09InJvdGF0ZSgwLDM0NC41LDUyNC41KSIvPjxyZWN0IHg9IjM1MiIgeT0iNTE3IiB3aWR0aD0iMTUiIGhlaWdodD0iMTUiIHRyYW5zZm9ybT0icm90YXRlKDAsMzU5LjUsNTI0LjUpIi8+PHBhdGggZD0iTSAzNjcgNTE3diAxNWggNy41YSA3LjUgNy41LCAwLCAwLCAwLCAwIC0xNSIgdHJhbnNmb3JtPSJyb3RhdGUoMCwzNzQuNSw1MjQuNSkiLz48cGF0aCBkPSJNIDQxMiA1MTd2IDE1aCAxNXYgLTcuNWEgNy41IDcuNSwgMCwgMCwgMCwgLTcuNSAtNy41IiB0cmFuc2Zvcm09InJvdGF0ZSgtOTAsNDE5LjUsNTI0LjUpIi8+PHJlY3QgeD0iNDI3IiB5PSI1MTciIHdpZHRoPSIxNSIgaGVpZ2h0PSIxNSIgdHJhbnNmb3JtPSJyb3RhdGUoMCw0MzQuNSw1MjQuNSkiLz48cmVjdCB4PSI0NTciIHk9IjUxNyIgd2lkdGg9IjE1IiBoZWlnaHQ9IjE1IiB0cmFuc2Zvcm09InJvdGF0ZSgwLDQ2NC41LDUyNC41KSIvPjxyZWN0IHg9IjQ3MiIgeT0iNTE3IiB3aWR0aD0iMTUiIGhlaWdodD0iMTUiIHRyYW5zZm9ybT0icm90YXRlKDAsNDc5LjUsNTI0LjUpIi8+PGNpcmNsZSBjeD0iMjU0LjUiIGN5PSI1MzkuNSIgcj0iNy41IiB0cmFuc2Zvcm09InJvdGF0ZSgwLDI1NC41LDUzOS41KSIvPjxwYXRoIGQ9Ik0gMjc3IDUzMnYgMTVoIDcuNWEgNy41IDcuNSwgMCwgMCwgMCwgMCAtMTUiIHRyYW5zZm9ybT0icm90YXRlKDkwLDI4NC41LDUzOS41KSIvPjxwYXRoIGQ9Ik0gMzM3IDUzMnYgMTVoIDcuNWEgNy41IDcuNSwgMCwgMCwgMCwgMCAtMTUiIHRyYW5zZm9ybT0icm90YXRlKDkwLDM0NC41LDUzOS41KSIvPjxjaXJjbGUgY3g9IjM4OS41IiBjeT0iNTM5LjUiIHI9IjcuNSIgdHJhbnNmb3JtPSJyb3RhdGUoMCwzODkuNSw1MzkuNSkiLz48cGF0aCBkPSJNIDQxMiA1MzJ2IDE1aCAxNXYgLTcuNWEgNy41IDcuNSwgMCwgMCwgMCwgLTcuNSAtNy41IiB0cmFuc2Zvcm09InJvdGF0ZSgxODAsNDE5LjUsNTM5LjUpIi8+PHBhdGggZD0iTSA0MjcgNTMydiAxNWggMTV2IC03LjVhIDcuNSA3LjUsIDAsIDAsIDAsIC03LjUgLTcuNSIgdHJhbnNmb3JtPSJyb3RhdGUoOTAsNDM0LjUsNTM5LjUpIi8+PHBhdGggZD0iTSA0NTcgNTMydiAxNWggMTV2IC03LjVhIDcuNSA3LjUsIDAsIDAsIDAsIC03LjUgLTcuNSIgdHJhbnNmb3JtPSJyb3RhdGUoMTgwLDQ2NC41LDUzOS41KSIvPjxyZWN0IHg9IjQ3MiIgeT0iNTMyIiB3aWR0aD0iMTUiIGhlaWdodD0iMTUiIHRyYW5zZm9ybT0icm90YXRlKDAsNDc5LjUsNTM5LjUpIi8+PHBhdGggZD0iTSA0ODcgNTMydiAxNWggNy41YSA3LjUgNy41LCAwLCAwLCAwLCAwIC0xNSIgdHJhbnNmb3JtPSJyb3RhdGUoMCw0OTQuNSw1MzkuNSkiLz48Y2lyY2xlIGN4PSI1MjQuNSIgY3k9IjUzOS41IiByPSI3LjUiIHRyYW5zZm9ybT0icm90YXRlKDAsNTI0LjUsNTM5LjUpIi8+PC9jbGlwUGF0aD48Y2xpcFBhdGggaWQ9ImNsaXAtcGF0aC1jb3JuZXJzLXNxdWFyZS1jb2xvci0wLTAtMCI+PHBhdGggY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNIDEwNC41IDUyYSA1Mi41IDUyLjUgMCAxIDAgMC4xIDB6bSAwIDE1YSAzNy41IDM3LjUgMCAxIDEgLTAuMSAwWiIgdHJhbnNmb3JtPSJyb3RhdGUoMCwxMDQuNSwxMDQuNSkiLz48L2NsaXBQYXRoPjxjbGlwUGF0aCBpZD0iY2xpcC1wYXRoLWNvcm5lcnMtZG90LWNvbG9yLTAtMC0wIj48Y2lyY2xlIGN4PSIxMDQuNSIgY3k9IjEwNC41IiByPSIyMi41IiB0cmFuc2Zvcm09InJvdGF0ZSgwLDEwNC41LDEwNC41KSIvPjwvY2xpcFBhdGg+PGNsaXBQYXRoIGlkPSJjbGlwLXBhdGgtY29ybmVycy1zcXVhcmUtY29sb3ItMS0wLTAiPjxwYXRoIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTSA0OTQuNSA1MmEgNTIuNSA1Mi41IDAgMSAwIDAuMSAwem0gMCAxNWEgMzcuNSAzNy41IDAgMSAxIC0wLjEgMFoiIHRyYW5zZm9ybT0icm90YXRlKDkwLDQ5NC41LDEwNC41KSIvPjwvY2xpcFBhdGg+PGNsaXBQYXRoIGlkPSJjbGlwLXBhdGgtY29ybmVycy1kb3QtY29sb3ItMS0wLTAiPjxjaXJjbGUgY3g9IjQ5NC41IiBjeT0iMTA0LjUiIHI9IjIyLjUiIHRyYW5zZm9ybT0icm90YXRlKDkwLDQ5NC41LDEwNC41KSIvPjwvY2xpcFBhdGg+PGNsaXBQYXRoIGlkPSJjbGlwLXBhdGgtY29ybmVycy1zcXVhcmUtY29sb3ItMC0xLTAiPjxwYXRoIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTSAxMDQuNSA0NDJhIDUyLjUgNTIuNSAwIDEgMCAwLjEgMHptIDAgMTVhIDM3LjUgMzcuNSAwIDEgMSAtMC4xIDBaIiB0cmFuc2Zvcm09InJvdGF0ZSgtOTAsMTA0LjUsNDk0LjUpIi8+PC9jbGlwUGF0aD48Y2xpcFBhdGggaWQ9ImNsaXAtcGF0aC1jb3JuZXJzLWRvdC1jb2xvci0wLTEtMCI+PGNpcmNsZSBjeD0iMTA0LjUiIGN5PSI0OTQuNSIgcj0iMjIuNSIgdHJhbnNmb3JtPSJyb3RhdGUoLTkwLDEwNC41LDQ5NC41KSIvPjwvY2xpcFBhdGg+PC9kZWZzPjxyZWN0IHg9IjAiIHk9IjAiIGhlaWdodD0iNjAwIiB3aWR0aD0iNjAwIiBjbGlwLXBhdGg9InVybCgnI2NsaXAtcGF0aC1iYWNrZ3JvdW5kLWNvbG9yLTAnKSIgZmlsbD0idHJhbnNwYXJlbnQiLz48cmVjdCB4PSIwIiB5PSIwIiBoZWlnaHQ9IjYwMCIgd2lkdGg9IjYwMCIgY2xpcC1wYXRoPSJ1cmwoJyNjbGlwLXBhdGgtZG90LWNvbG9yLTAnKSIgZmlsbD0iIzU3YjhhNyIvPjxyZWN0IHg9IjUyIiB5PSI1MiIgaGVpZ2h0PSIxMDUiIHdpZHRoPSIxMDUiIGNsaXAtcGF0aD0idXJsKCcjY2xpcC1wYXRoLWNvcm5lcnMtc3F1YXJlLWNvbG9yLTAtMC0wJykiIGZpbGw9IiNlNzY0NWYiLz48cmVjdCB4PSI4MiIgeT0iODIiIGhlaWdodD0iNDUiIHdpZHRoPSI0NSIgY2xpcC1wYXRoPSJ1cmwoJyNjbGlwLXBhdGgtY29ybmVycy1kb3QtY29sb3ItMC0wLTAnKSIgZmlsbD0iIzRkNzdiOCIvPjxyZWN0IHg9IjQ0MiIgeT0iNTIiIGhlaWdodD0iMTA1IiB3aWR0aD0iMTA1IiBjbGlwLXBhdGg9InVybCgnI2NsaXAtcGF0aC1jb3JuZXJzLXNxdWFyZS1jb2xvci0xLTAtMCcpIiBmaWxsPSIjZTc2NDVmIi8+PHJlY3QgeD0iNDcyIiB5PSI4MiIgaGVpZ2h0PSI0NSIgd2lkdGg9IjQ1IiBjbGlwLXBhdGg9InVybCgnI2NsaXAtcGF0aC1jb3JuZXJzLWRvdC1jb2xvci0xLTAtMCcpIiBmaWxsPSIjNGQ3N2I4Ii8+PHJlY3QgeD0iNTIiIHk9IjQ0MiIgaGVpZ2h0PSIxMDUiIHdpZHRoPSIxMDUiIGNsaXAtcGF0aD0idXJsKCcjY2xpcC1wYXRoLWNvcm5lcnMtc3F1YXJlLWNvbG9yLTAtMS0wJykiIGZpbGw9IiNlNzY0NWYiLz48cmVjdCB4PSI4MiIgeT0iNDcyIiBoZWlnaHQ9IjQ1IiB3aWR0aD0iNDUiIGNsaXAtcGF0aD0idXJsKCcjY2xpcC1wYXRoLWNvcm5lcnMtZG90LWNvbG9yLTAtMS0wJykiIGZpbGw9IiM0ZDc3YjgiLz48aW1hZ2UgaHJlZj0iZGF0YTppbWFnZS9zdmcreG1sO2Jhc2U2NCxQSE4yWnlCNGJXeHVjejBpYUhSMGNEb3ZMM2QzZHk1M015NXZjbWN2TWpBd01DOXpkbWNpSUhacFpYZENiM2c5SWpBZ01DQTJOQ0EyTkNJZ2NtOXNaVDBpYVcxbklpQmhjbWxoTFd4aFltVnNQU0xtaTd6b3NZYmx0NlhsbllvZ2JHOW5ieUkrQ2lBZ1BISmxZM1FnZDJsa2RHZzlJalkwSWlCb1pXbG5hSFE5SWpZMElpQnllRDBpTVRRaUlHWnBiR3c5SWlOR09FWkNSamtpTHo0S0lDQThjR0YwYUNCa1BTSk5NVGNnTVRoak1DMDBMalFnTXk0MkxUZ2dPQzA0YURFMFl6UXVOQ0F3SURnZ015NDJJRGdnT0hZeU9HTXdJRFF1TkMwekxqWWdPQzA0SURoSU1qVmpMVFF1TkNBd0xUZ3RNeTQyTFRndE9GWXhPSG9pSUdacGJHdzlJaU5FUkVWQ1JUY2lMejRLSUNBOFkybHlZMnhsSUdONFBTSXlOaUlnWTNrOUlqSXlJaUJ5UFNJNUlpQm1hV3hzUFNJak5UZENPRUUzSWk4K0NpQWdQR05wY21Oc1pTQmplRDBpTkRBaUlHTjVQU0l5TWlJZ2NqMGlPU0lnWm1sc2JEMGlJMFUzTmpRMVJpSXZQZ29nSUR4amFYSmpiR1VnWTNnOUlqSTJJaUJqZVQwaU5EQWlJSEk5SWpraUlHWnBiR3c5SWlORU9UbENNMFFpTHo0S0lDQThZMmx5WTJ4bElHTjRQU0kwTUNJZ1kzazlJalF3SWlCeVBTSTVJaUJtYVd4c1BTSWpORVEzTjBJNElpOCtDaUFnUEdOcGNtTnNaU0JqZUQwaU1qWWlJR041UFNJeU1pSWdjajBpTXk0MElpQm1hV3hzUFNJalJqaEdRa1k1SWk4K0NpQWdQR05wY21Oc1pTQmplRDBpTkRBaUlHTjVQU0l5TWlJZ2NqMGlNeTQwSWlCbWFXeHNQU0lqUmpoR1FrWTVJaTgrQ2lBZ1BHTnBjbU5zWlNCamVEMGlNallpSUdONVBTSTBNQ0lnY2owaU15NDBJaUJtYVd4c1BTSWpSamhHUWtZNUlpOCtDaUFnUEdOcGNtTnNaU0JqZUQwaU5EQWlJR041UFNJME1DSWdjajBpTXk0MElpQm1hV3hzUFNJalJqaEdRa1k1SWk4K0NpQWdQSEJoZEdnZ1pEMGlUVFE1SURFemJEUWdOQzAwSURRdE5DMDBJRFF0TkhvaUlHWnBiR3c5SWlOR1JrWXdRVGdpSUhOMGNtOXJaVDBpSTBRNU9VSXpSQ0lnYzNSeWIydGxMWGRwWkhSb1BTSXhMalVpTHo0S1BDOXpkbWMrQ2c9PSIgeD0iMjEwIiB5PSIyMTAiIHdpZHRoPSIxODAiIGhlaWdodD0iMTgwIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJ4TWlkWU1pZCBtZWV0Ii8+PC9zdmc+";

  // src/share-copy.js
  var HOOKS = [
    // 治愈
    "\u4ECA\u5929\u4E5F\u7ED9\u81EA\u5DF1\u62FC\u4E86\u4E00\u9897\u7CD6 \u{1FAE7}",
    "\u6162\u6162\u6446\u8C46\u7684\u4E24\u5C0F\u65F6\uFF0C\u6BD4\u5237\u624B\u673A\u6CBB\u6108\u591A\u4E86",
    "\u7C89\u7C89\u5AE9\u5AE9\u4E00\u76D8\u8C46\uFF0C\u770B\u7740\u5C31\u89E3\u538B",
    // 打卡
    "\u8D5B\u535A\u62FC\u8C46\u6253\u5361\uFF0C\u4ECA\u5929\u53C8\u4E0A\u5934\u4E86",
    "\u624B\u4F5C\u6253\u5361 | \u4E00\u683C\u4E00\u683C\u6446\u51FA\u6765\u7684\u5C0F\u786E\u5E78",
    // 教程
    "\u96F6\u57FA\u7840\u4E5F\u80FD\u62FC\uFF0C\u624B\u673A\u70B9\u70B9\u5C31\u51FA\u7247",
    "\u65B0\u624B\u7B2C\u4E00\u5757\uFF0C\u5206\u4EAB\u4E0B\u6211\u7684\u914D\u8272\u601D\u8DEF",
    "\u60F3\u5165\u5751\u62FC\u8C46\u7684\u59D0\u59B9\uFF0C\u5148\u5728\u624B\u673A\u4E0A\u8BD5\u8BD5\u8FD9\u4E2A",
    // 解压
    "\u538B\u529B\u5927\u7684\u65F6\u5019\u5C31\u6765\u6446\u4E24\u9897\u8C46\u8C46",
    "\u65E0\u9650\u91CD\u5F00\u7684\u8D5B\u535A\u62FC\u8C46\uFF0C\u624B\u6B8B\u515A\u53CB\u597D"
  ];
  function pickHook() {
    return HOOKS[Math.floor(Math.random() * HOOKS.length)];
  }
  function buildShareText(values) {
    const { name, total, colors, grade, timeText = "" } = values;
    return [
      pickHook(),
      `\u4ECA\u5929\u62FC\u4E86\u300C${name}\u300D\uFF0C${total}\u9897\u3001${colors}\u4E2A\u8272\u53F7\uFF0C\u6700\u540E\u8BC4\u7EA7 ${grade}${timeText}\u3002`,
      "\u4E00\u90E8\u624B\u673A\u5C31\u80FD\u62FC\uFF0C\u788E\u7247\u65F6\u95F4\u968F\u624B\u6765\u4E00\u5757\uFF5E",
      "#\u62FC\u8C46 #\u624B\u4F5C #\u50CF\u7D20\u753B #\u89E3\u538B #\u5C0F\u6E38\u620F #\u62FC\u8C46\u5DE5\u574A"
    ].join("\n");
  }

  // src/community-api.js
  function getClientId() {
    try {
      let id = localStorage.getItem(clientIdKey);
      if (!id) {
        id = crypto?.randomUUID?.() || `c-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
        localStorage.setItem(clientIdKey, id);
      }
      return id;
    } catch {
      return `c-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
    }
  }
  function submitMessage({ nickname, content }) {
    return requestShareApi("/api/messages/submit", { nickname, content });
  }
  function listMessages({ limit = 20 } = {}) {
    return requestShareApi("/api/messages/list", { limit });
  }
  function listRoadmap() {
    return requestShareApi("/api/roadmap/list", { clientId: getClientId() });
  }
  function voteRoadmap(itemId) {
    return requestShareApi("/api/roadmap/vote", { itemId, clientId: getClientId() });
  }

  // src/community.js
  var ANON = "\u533F\u540D\u8C46\u53CB";
  var STATUS_LABEL = { planned: "\u8BA1\u5212\u4E2D", in_progress: "\u5F00\u53D1\u4E2D", shipped: "\u5DF2\u53D1\u5E03" };
  var messagesEl = null;
  var roadmapEl = null;
  var loadedMessages = false;
  var loadedRoadmap = false;
  function relativeTime(iso) {
    const then = new Date(iso).getTime();
    if (!Number.isFinite(then)) return "";
    const diff = Date.now() - then;
    const min = Math.floor(diff / 6e4);
    if (min < 1) return "\u521A\u521A";
    if (min < 60) return `${min} \u5206\u949F\u524D`;
    const hr = Math.floor(min / 60);
    if (hr < 24) return `${hr} \u5C0F\u65F6\u524D`;
    const day = Math.floor(hr / 24);
    if (day < 30) return `${day} \u5929\u524D`;
    return new Date(then).toLocaleDateString("zh-CN");
  }
  function notConfiguredHtml(text) {
    return `<div class="community-empty"><p class="community-empty-text">${escapeHtml(text)}</p></div>`;
  }
  function messageItemHtml(m) {
    const name = m.nickname ? escapeHtml(m.nickname) : ANON;
    return `<li class="community-message">
    <div class="community-message-head">
      <strong class="community-message-name">${name}</strong>
      <span class="community-message-time">${escapeHtml(relativeTime(m.createdAt))}</span>
    </div>
    <p class="community-message-body">${escapeHtml(m.content)}</p>
  </li>`;
  }
  function renderMessagesShell() {
    messagesEl.innerHTML = `
    <form class="community-compose" id="communityCompose" novalidate>
      <input class="community-nickname" id="communityNickname" type="text" maxlength="16"
        placeholder="\u6635\u79F0" aria-label="\u6635\u79F0" />
      <textarea class="community-textarea" id="communityContent" maxlength="200" rows="3"
        placeholder="\u7559\u4E2A\u8A00\u5427\uFF5E\u60F3\u770B\u4EC0\u4E48\u56FE\u7EB8\u3001\u54EA\u91CC\u4E0D\u597D\u7528\u90FD\u53EF\u4EE5\u8BF4" aria-label="\u7559\u8A00\u5185\u5BB9"></textarea>
      <div class="community-compose-foot">
        <span class="community-count" id="communityCount">0/200</span>
        <button class="primary-button" id="communitySendButton" type="submit">\u53D1\u9001\u7559\u8A00</button>
      </div>
    </form>
    <ul class="community-message-list" id="communityMessageList"></ul>
    <div class="community-list-state" id="communityMessagesState"></div>`;
    const content = messagesEl.querySelector("#communityContent");
    const count = messagesEl.querySelector("#communityCount");
    content.addEventListener("input", () => {
      count.textContent = `${content.value.length}/200`;
    });
    messagesEl.querySelector("#communityCompose").addEventListener("submit", onSubmitMessage);
  }
  async function onSubmitMessage(event) {
    event.preventDefault();
    const nickname = messagesEl.querySelector("#communityNickname").value.trim();
    const content = messagesEl.querySelector("#communityContent").value.trim();
    const button = messagesEl.querySelector("#communitySendButton");
    if (!content) {
      showToast("\u7559\u8A00\u4E0D\u80FD\u662F\u7A7A\u7684\u54E6\u3002");
      return;
    }
    button.disabled = true;
    button.textContent = "\u53D1\u9001\u4E2D";
    try {
      await submitMessage({ nickname, content });
      messagesEl.querySelector("#communityContent").value = "";
      messagesEl.querySelector("#communityNickname").value = "";
      messagesEl.querySelector("#communityCount").textContent = "0/200";
      showToast("\u7559\u8A00\u5DF2\u63D0\u4EA4\uFF0C\u5BA1\u6838\u901A\u8FC7\u540E\u5C31\u4F1A\u51FA\u73B0\uFF5E");
    } catch (err) {
      showToast(err?.message || "\u53D1\u9001\u5931\u8D25\uFF0C\u7A0D\u540E\u518D\u8BD5\u3002");
    } finally {
      button.disabled = false;
      button.textContent = "\u53D1\u9001\u7559\u8A00";
    }
  }
  async function loadMessages() {
    const list = messagesEl.querySelector("#communityMessageList");
    const stateEl = messagesEl.querySelector("#communityMessagesState");
    stateEl.textContent = "\u52A0\u8F7D\u4E2D\u2026";
    try {
      const data = await listMessages({ limit: 20 });
      const items = data?.items || [];
      list.innerHTML = items.map(messageItemHtml).join("");
      stateEl.textContent = items.length ? "" : "\u8FD8\u6CA1\u6709\u7559\u8A00\uFF0C\u6765\u5F53\u7B2C\u4E00\u4E2A\u5427\uFF5E";
    } catch (err) {
      stateEl.textContent = err?.message || "\u52A0\u8F7D\u5931\u8D25\uFF0C\u4E0B\u62C9\u5237\u65B0\u8BD5\u8BD5\u3002";
    }
  }
  function roadmapItemHtml(item) {
    const status = STATUS_LABEL[item.status] || STATUS_LABEL.planned;
    const ver = item.status === "shipped" && item.version ? ` v${escapeHtml(item.version)}` : "";
    const likeIcon = icon("heart", { size: 16 });
    return `<li class="community-road-item" data-road-id="${escapeHtml(item.id)}">
    <div class="community-road-main">
      <div class="community-road-head">
        <span class="community-road-pill community-road-pill-${escapeHtml(item.status)}">${status}${ver}</span>
        <strong class="community-road-title">${escapeHtml(item.title)}</strong>
      </div>
      ${item.desc ? `<p class="community-road-desc">${escapeHtml(item.desc)}</p>` : ""}
    </div>
    <button class="community-like ${item.voted ? "is-voted" : ""}" type="button"
      data-road-vote="${escapeHtml(item.id)}" aria-pressed="${item.voted ? "true" : "false"}"
      aria-label="\u70B9\u8D5E\u8FD9\u6761\u66F4\u65B0">${likeIcon}<span class="community-like-count">${Number(item.votes) || 0}</span></button>
  </li>`;
  }
  async function loadRoadmap() {
    roadmapEl.innerHTML = `
    <p class="community-road-version">\u5F53\u524D\u7248\u672C v${escapeHtml(APP_VERSION)}</p>
    <ul class="community-road-list" id="communityRoadList"></ul>
    <div class="community-list-state" id="communityRoadState">\u52A0\u8F7D\u4E2D\u2026</div>`;
    const list = roadmapEl.querySelector("#communityRoadList");
    const stateEl = roadmapEl.querySelector("#communityRoadState");
    try {
      const data = await listRoadmap();
      const items = data?.items || [];
      list.innerHTML = items.map(roadmapItemHtml).join("");
      stateEl.textContent = items.length ? "" : "\u66F4\u65B0\u8BA1\u5212\u9A6C\u4E0A\u5C31\u6765\uFF5E";
      list.querySelectorAll("[data-road-vote]").forEach((btn) => {
        btn.addEventListener("click", () => onVote(btn));
      });
    } catch (err) {
      stateEl.textContent = err?.message || "\u52A0\u8F7D\u5931\u8D25\uFF0C\u7A0D\u540E\u518D\u8BD5\u3002";
    }
  }
  async function onVote(button) {
    const id = button.dataset.roadVote;
    const countEl = button.querySelector(".community-like-count");
    const wasVoted = button.classList.contains("is-voted");
    button.classList.toggle("is-voted", !wasVoted);
    button.setAttribute("aria-pressed", String(!wasVoted));
    countEl.textContent = String((Number(countEl.textContent) || 0) + (wasVoted ? -1 : 1));
    button.disabled = true;
    try {
      const res = await voteRoadmap(id);
      button.classList.toggle("is-voted", Boolean(res?.voted));
      button.setAttribute("aria-pressed", String(Boolean(res?.voted)));
      if (typeof res?.votes === "number") countEl.textContent = String(res.votes);
    } catch (err) {
      button.classList.toggle("is-voted", wasVoted);
      button.setAttribute("aria-pressed", String(wasVoted));
      countEl.textContent = String((Number(countEl.textContent) || 0) + (wasVoted ? 1 : -1));
      showToast(err?.message || "\u64CD\u4F5C\u5931\u8D25\uFF0C\u7A0D\u540E\u518D\u8BD5\u3002");
    } finally {
      button.disabled = false;
    }
  }
  function initCommunity(els2) {
    messagesEl = els2.communityMessages;
    roadmapEl = els2.communityRoadmap;
    if (!messagesEl || !roadmapEl) return;
    const tabMsg = els2.communityTabMessages;
    const tabRoad = els2.communityTabRoadmap;
    const select = (which) => {
      const isMsg = which === "messages";
      tabMsg.setAttribute("aria-selected", String(isMsg));
      tabRoad.setAttribute("aria-selected", String(!isMsg));
      messagesEl.hidden = !isMsg;
      roadmapEl.hidden = isMsg;
      if (!isMsg && !loadedRoadmap) {
        loadedRoadmap = true;
        loadRoadmap();
      }
      if (isMsg && !loadedMessages) {
        loadedMessages = true;
        loadMessages();
      }
    };
    tabMsg?.addEventListener("click", () => select("messages"));
    tabRoad?.addEventListener("click", () => select("roadmap"));
    els2.communityRefreshButton?.addEventListener("click", () => {
      if (roadmapEl.hidden) loadMessages();
      else loadRoadmap();
    });
  }
  function enterCommunity() {
    if (!messagesEl) return;
    if (!shareApiConfigured()) {
      messagesEl.innerHTML = notConfiguredHtml("\u7559\u8A00\u670D\u52A1\u8FD8\u6CA1\u914D\u7F6E\uFF0C\u7A0D\u540E\u518D\u6765\u770B\u770B\uFF5E");
      roadmapEl.innerHTML = notConfiguredHtml("\u66F4\u65B0\u677F\u8FD8\u6CA1\u914D\u7F6E\u3002");
      return;
    }
    if (!messagesEl.querySelector("#communityCompose")) renderMessagesShell();
    if (!loadedMessages) {
      loadedMessages = true;
      loadMessages();
    }
  }

  // src/main.js
  hydrateIcons(document);
  hydrateLogo(document);
  loadLibrary();
  var collection = readCollection();
  state.achievements = readAchievements();
  var lastFrame = performance.now();
  var IRON_DEFAULT_TEMPERATURE = 62;
  var IRON_DEFAULT_PRESSURE = 56;
  function syncChipGroup(container, attr, value) {
    if (!container) return;
    for (const b of container.querySelectorAll('[role="radio"]')) {
      b.setAttribute("aria-checked", b.dataset[attr] === value ? "true" : "false");
    }
  }
  function chipRoving(event, container) {
    const radios = Array.from(container.querySelectorAll('[role="radio"]'));
    const i = radios.indexOf(document.activeElement);
    if (i < 0) return;
    let ni = -1;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") ni = (i + 1) % radios.length;
    else if (event.key === "ArrowLeft" || event.key === "ArrowUp") ni = (i - 1 + radios.length) % radios.length;
    if (ni < 0) return;
    event.preventDefault();
    radios[ni].focus();
    radios[ni].click();
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
    root.style.setProperty("--brand", theme.brand || "#57b8a7");
    root.style.setProperty("--brand-ink", theme.brandInk || "#1f6153");
    root.style.setProperty("--brand-edge", theme.brandEdge || "#3f988b");
    root.style.setProperty("--brand-tint", theme.brandTint || "rgba(87, 184, 167, 0.16)");
    root.style.setProperty("--brand-tint-strong", theme.brandTintStrong || "rgba(87, 184, 167, 0.25)");
    root.style.setProperty("--brand-cta", theme.cta?.[0] || "#3D9C8C");
    root.style.setProperty("--brand-cta-strong", theme.cta?.[1] || "#389586");
    root.style.setProperty("--bg-scrim", theme.scrim || "rgba(255, 255, 255, 0.16)");
    syncChipGroup(els.bgThemeChips, "theme", state.bgTheme);
    refreshShowcaseTheme();
    markDirty();
  }
  function applyScreenAria() {
    const mode = state.appMode;
    const beadActive = mode === "bead";
    [
      [els.startScreen, mode === "home"],
      [els.galleryScreen, mode === "gallery"],
      [els.collectionScreen, mode === "collection"],
      [els.communityScreen, mode === "community"],
      [els.drawingStudio, mode === "draw"],
      [document.querySelector(".bead-topbar"), beadActive],
      [els.studioGrid, beadActive]
    ].forEach(([el, active2]) => {
      if (el) el.setAttribute("aria-hidden", active2 ? "false" : "true");
    });
  }
  var PHASE_BG = {
    choose: "--bg-select-image",
    place: "--bg-place-image",
    inspect: "--bg-inspect-image",
    iron: "--bg-iron-image",
    cool: "--bg-cool-image",
    finish: "--bg-gallery-image"
  };
  var MODE_BG = {
    draw: "--bg-draw-image",
    gallery: "--bg-gallery-image",
    collection: "--bg-collection-image",
    community: "--bg-gallery-image"
  };
  function updateFullBg() {
    const v = state.appMode === "bead" ? PHASE_BG[state.phase] : MODE_BG[state.appMode];
    const root = document.documentElement;
    if (v) {
      root.style.setProperty("--bg-current", `var(${v})`);
      root.style.setProperty("--bg-current-on", "1");
    } else {
      root.style.setProperty("--bg-current-on", "0");
    }
  }
  var backgroundsPreloaded = false;
  function preloadBackgrounds() {
    if (backgroundsPreloaded) return;
    backgroundsPreloaded = true;
    if (navigator.connection && navigator.connection.saveData) return;
    const cs = getComputedStyle(document.documentElement);
    const seen = /* @__PURE__ */ new Set();
    for (const v of [...Object.values(PHASE_BG), ...Object.values(MODE_BG)]) {
      const m = cs.getPropertyValue(v).trim().match(/url\(["']?(.*?)["']?\)/);
      if (m && m[1] && !seen.has(m[1])) {
        seen.add(m[1]);
        new Image().src = m[1];
      }
    }
  }
  function setAppMode(mode) {
    const prevMode = state.appMode;
    state.appMode = mode === "draw" ? "draw" : mode === "bead" ? "bead" : mode === "gallery" ? "gallery" : mode === "collection" ? "collection" : mode === "community" ? "community" : "home";
    if (prevMode && prevMode !== state.appMode) playSfx("nav");
    state.collectionPageOpen = state.appMode === "collection";
    document.body.dataset.appMode = state.appMode;
    syncBuildTimer();
    if (state.appMode !== "bead") {
      state.lastPlaceHintKey = "";
      hidePlaceHint();
    }
    applyScreenAria();
    updateFullBg();
    setShowcaseActive(state.appMode === "home");
    if (state.appMode === "bead") {
      state.uiDirty = true;
      state.previewDirty = true;
      state.renderDirty = true;
      markDirty();
      return;
    }
    if (state.appMode === "draw") {
      enterDrawMode();
    }
    if (state.appMode === "gallery") {
      enterGalleryMode();
      return;
    }
    if (state.appMode === "collection") {
      state.collectionPageOpen = true;
      renderCollection();
    }
    if (state.appMode === "community") {
      enterCommunity();
    }
  }
  function loadPattern(pattern, keepPhase = false) {
    state.selectedPattern = pattern;
    if (baseIdFor(pattern).startsWith("custom-")) {
      setCustomDenoiseControls(pattern.sourceDenoiseLevel ?? state.customDenoiseLevel);
    }
    invalidateLayoutCache();
    if (baseIdFor(pattern).startsWith("custom-")) {
      closeRemapModal();
    }
    const normalizedMap = normalizePatternColorMapForActivePalette(pattern);
    invalidateEffectiveMap(pattern);
    state.patternColorMap = normalizedMap;
    setSizeControls(pattern.size);
    const total = boardCols(pattern) * boardRows(pattern);
    state.placed = Array(total).fill(null);
    invalidatePlacedCounts();
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
    resetBuildTimer();
    state.buildMs = 0;
    state.tool = "needle";
    state.needleTier = 1;
    const firstColor = getPatternColors(pattern)[0] || "K";
    state.selectedColor = firstColor;
    state.previewDirty = true;
    state.patternsDirty = true;
    if (!keepPhase) state.phase = "choose";
    markDirty();
  }
  function triggerHaptic(type = "light") {
    if (type === "error") return feedback("error");
    if (type === "heavy") return feedback("drop");
    return feedback("ui-tap");
  }
  var BUILD_PHASES = /* @__PURE__ */ new Set(["place", "inspect", "iron", "cool"]);
  function buildTimerShouldRun() {
    return state.appMode === "bead" && BUILD_PHASES.has(state.phase) && document.visibilityState !== "hidden";
  }
  function syncBuildTimer() {
    if (buildTimerShouldRun()) startBuildTimer();
    else pauseBuildTimer();
    state.buildMs = buildElapsedMs();
  }
  function setPhase(phase) {
    if (phase !== state.phase) {
      if (phase === "finish") feedback("finish");
      else if (phase === "cool") playSfx("cool");
    }
    state.phase = phase;
    state.pointer.down = false;
    state.pointer.mode = null;
    state.pointer.trayTapPending = false;
    state.pointer.pendingCell = null;
    state.gesture.active = false;
    state.gesture.touchActive = false;
    state.gesture.pointers = {};
    if (phase !== "place") state.keyboardGrid.visible = false;
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
    if (phase === "inspect") {
      runInspection();
      if (!state.sandboxMode) feedback(state.errors.length ? "inspect" : "success");
    }
    if (phase === "iron") {
      state.temperature = IRON_DEFAULT_TEMPERATURE;
      state.pressure = IRON_DEFAULT_PRESSURE;
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
    syncBuildTimer();
    markDirty();
    updateFullBg();
    if (phase === "place") maybeShowOnboarding();
  }
  function schedulePhaseViewportReset() {
    state.pendingPageReset = true;
  }
  function toggleSandboxMode(next = !state.sandboxMode) {
    const enabled = Boolean(next);
    if (state.sandboxMode === enabled) return;
    state.sandboxMode = enabled;
    state.errors = [];
    if (state.phase === "inspect") runInspection();
    showToast(enabled ? "\u6C99\u76D2\u6A21\u5F0F\u5DF2\u5F00\u542F\uFF1A\u81EA\u7531\u62FC\u6446\uFF0C\u4E0D\u505A\u56FE\u7EB8\u6821\u9A8C\u3002" : "\u6C99\u76D2\u6A21\u5F0F\u5DF2\u5173\u95ED\uFF1A\u6062\u590D\u56FE\u7EB8\u6821\u9A8C\u6D41\u7A0B\u3002");
    markDirty();
  }
  function toggleLamp(next = !state.lampOn) {
    state.lampOn = Boolean(next);
    feedback("lamp");
    state.lampSwitchFlashUntil = performance.now() + 140;
    showToast(state.lampOn ? "\u5DE5\u4F5C\u706F\u5DF2\u6253\u5F00\uFF1A\u6295\u5F71\u8272\u7A3F\u53EF\u89C1\u3002" : "\u5DE5\u4F5C\u706F\u5DF2\u5173\u95ED\uFF1A\u5173\u95ED\u6295\u5F71\u8272\u7A3F\u3002");
    markDirty();
  }
  function canDropToFloorAt(x, y) {
    if (boardCellFromPoint(x, y)) return false;
    if (shouldShowTray() && pointInTray(x, y)) return false;
    if (shouldShowTray() && pointInTrayDumpButton(x, y)) return false;
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
      spinDir: pseudoRandom(`${state.selectedPattern.id}-${x}-${y}-spin`) > 0.5 ? 1 : -1
    };
    state.floorDrops.push(drop);
    if (state.floorDrops.length > 52) state.floorDrops.shift();
    feedback("floor-drop");
    showToast(`${beadLabel(code)} \u6389\u5230\u5730\u677F\u4E0A\u4E86\u3002`);
    state.savedCurrent = false;
    markDirty();
    return true;
  }
  function handlePreviewPickRemap(event) {
    if (state.phase !== "choose") return;
    const cell = previewCellFromPoint(event.clientX, event.clientY);
    if (!cell) return;
    const sourceCode = state.selectedPattern.rows[cell.y]?.[cell.x] || ".";
    if (sourceCode === ".") return;
    openRemapModal(sourceCode);
  }
  function openCollectionPage() {
    if (!els.collectionScreen) return;
    state.collectionPageOpen = true;
    setAppMode("collection");
    renderCollection();
  }
  function closeCollectionPage() {
    if (!els.collectionScreen) return;
    state.collectionPageOpen = false;
    const viewer = els.collectionScreen.querySelector(".collection-enlarged");
    if (viewer) viewer.classList.remove("show");
    setAppMode("home");
    requestAnimationFrame(() => els.collectionButton?.focus?.());
  }
  function startIroning(forceSpill = false) {
    if (placedCount() <= 0) {
      state.emptyIronEaster = true;
      showToast("\u7A7A\u677F\u71A8\u70EB\u5F69\u86CB\u89E6\u53D1\uFF1A\u51FA\u73B0\u9690\u85CF\u538B\u7EB9\u3002");
      setPhase("iron");
      return;
    }
    if (state.spill && !forceSpill) {
      showToast("\u8FD8\u6709\u5012\u4E0B\u7684\u8C46\u5B50\u672A\u5904\u7406\u3002");
      return;
    }
    if (state.spill && forceSpill) {
      state.spillDamages.push({
        index: state.spill.index,
        code: state.spill.code
      });
      state.heat[state.spill.index] = Math.max(state.heat[state.spill.index] || 0, 118);
      state.spill = null;
      state.warp = clamp(state.warp + 8, 0, 80);
      showToast("\u4F60\u9009\u62E9\u76F4\u63A5\u71A8\u70EB\uFF0C\u5012\u4E0B\u7684\u8C46\u5B50\u5DF2\u7ECF\u7CCA\u5728\u4E00\u8D77\u3002");
    }
    state.temperature = IRON_DEFAULT_TEMPERATURE;
    state.pressure = IRON_DEFAULT_PRESSURE;
    setPhase("iron");
  }
  function resetPatternColorMapping() {
    const map = state.patternColorMap || {};
    const patternId = baseIdFor(state.selectedPattern);
    const sourceColors = getSourcePatternColors();
    const changed = sourceColors.some((code) => (map[code] || code) !== code);
    if (!changed) {
      showToast("\u5F53\u524D\u5C31\u662F\u539F\u59CB\u914D\u8272\u3002");
      return;
    }
    sourceColors.forEach((code) => {
      map[code] = code;
    });
    state.patternColorMaps[patternId] = map;
    invalidateEffectiveMap();
    state.previewDirty = true;
    if (state.phase !== "choose" && (placedCount() > 0 || state.trayBeans > 0 || state.needleLoaded > 0 || state.tweezerBead || state.spill)) {
      resetPlacementForRemap();
      showToast("\u5DF2\u6062\u590D\u539F\u8272\uFF0C\u5F53\u524D\u6446\u653E\u5DF2\u91CD\u7F6E\u3002");
    } else {
      showToast("\u5DF2\u6062\u590D\u5B98\u65B9\u539F\u8272\u3002");
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
      els.remapModalTitle.textContent = sourceColors.length === 1 ? `\u6362\u8272\uFF1A${beadIds[sourceColors[0]]}` : "\u56FE\u7EB8\u6362\u8272";
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
  function openCollectionEntry(entry) {
    const rawId = String(entry?.id || "");
    const firstDash = rawId.indexOf("-");
    const patternId = firstDash >= 0 ? rawId.slice(firstDash + 1) : "";
    const found = patterns.find((item) => item.id === patternId || baseIdFor(item) === patternId);
    if (!found) {
      showToast("\u8FD9\u6761\u6536\u85CF\u5BF9\u5E94\u7684\u56FE\u7EB8\u5F53\u524D\u4E0D\u53EF\u7528\u3002");
      return;
    }
    loadPattern(resizePattern(found, state.patternSize), false);
    setAppMode("bead");
    showToast(`\u5DF2\u6253\u5F00\u6536\u85CF\uFF1A${found.name}`);
  }
  function pourSelectedColor() {
    if (state.trayColor && state.trayColor !== state.selectedColor && state.trayBeans > 0) {
      showToast(`\u8C46\u7B5B\u91CC\u8FD8\u6709 ${beadLabel(state.trayColor)}\uFF0C\u5148\u5012\u6389\u624D\u80FD\u6362\u8272\u3002`);
      return;
    }
    if (state.trayColor === state.selectedColor && state.trayBeans > 0) {
      showToast(`${beadLabel(state.trayColor)} \u5DF2\u5728\u8C46\u7B5B\u4E2D\u3002`);
      return;
    }
    state.trayColor = state.selectedColor;
    state.trayCapacity = calcTrayFillAmount(state.trayColor);
    state.trayPourId += 1;
    feedback("pour");
    state.trayMatrix = makeTrayMatrix(state.trayCapacity);
    syncTrayBeans();
    state.traySeeds = makeTraySeeds(state.trayColor, state.trayCapacity);
    state.trayProgress = Math.max(state.trayProgress, 4);
    state.needleLoaded = 0;
    showToast(`${beadLabel(state.trayColor)} \u5012\u5165\u8C46\u7B5B\uFF08${state.trayBeans} \u9897\uFF09\u3002`);
    markDirty();
  }
  function improveSort(amount, message) {
    if (!state.trayColor) {
      showToast("\u8C46\u7B5B\u662F\u7A7A\u7684\uFF0C\u5148\u4ECE\u8C46\u76D2\u5012\u5165\u4E00\u79CD\u989C\u8272\u3002");
      return;
    }
    state.trayProgress = clamp(state.trayProgress + amount, 0, 100);
    feedback("sift");
    showToast(message);
    markDirty();
  }
  function dumpTray() {
    if (!state.trayColor) {
      showToast("\u8C46\u7B5B\u5DF2\u7ECF\u662F\u7A7A\u7684\u3002");
      return;
    }
    const oldColor = state.trayColor;
    feedback("dump");
    state.trayColor = null;
    state.trayProgress = 0;
    state.trayBeans = 0;
    state.trayCapacity = 0;
    state.trayMatrix = makeTrayMatrix(0);
    state.needleLoaded = 0;
    state.traySeeds = [];
    showToast(`${beadLabel(oldColor)} \u5DF2\u5012\u56DE\u8C46\u76D2\u3002`);
    markDirty();
  }
  function loadNeedleFromTray(rowIndex = null) {
    if (!state.trayColor || state.trayBeans <= 0) {
      showToast("\u8C46\u7B5B\u91CC\u6CA1\u6709\u53EF\u53D6\u7684\u8C46\u5B50\u3002");
      return;
    }
    if (state.trayProgress <= needleLoadSortThreshold) {
      showToast("\u8C46\u7B5B\u8FD8\u4E0D\u591F\u6574\u9F50\uFF0C\u591A\u7B5B\u51E0\u4E0B\u518D\u4E0A\u8C46\u9488\u3002");
      return;
    }
    const cap = needleCapacity();
    const need = cap - state.needleLoaded;
    if (need <= 0) {
      showToast("\u8C46\u9488\u5DF2\u88C5\u6EE1\u3002");
      return;
    }
    const row = rowIndex === null || rowIndex === void 0 ? 0 : clamp(rowIndex, 0, Math.max(0, state.trayMatrix.length - 1));
    const trayRow = state.trayMatrix[row] || [];
    let grabbed = 0;
    for (let col = trayRow.length - 1; col >= 0 && grabbed < need; col -= 1) {
      if (!trayRow[col]) continue;
      trayRow[col] = false;
      grabbed += 1;
    }
    if (!grabbed) {
      showToast("\u8FD9\u4E00\u6761\u69FD\u5DF2\u7ECF\u6CA1\u8C46\u5B50\u4E86\uFF0C\u70B9\u53E6\u4E00\u6761\u69FD\u3002");
      return;
    }
    state.needleLoaded += grabbed;
    feedback("grab");
    syncTrayBeans();
    state.trayProgress = clamp(state.trayProgress - grabbed * 0.12, 0, 100);
    showToast(`\u8C46\u9488\u4ECE\u7B2C ${row + 1} \u6761\u69FD\u53D6\u5230 ${grabbed} \u9897 ${beadIds[state.trayColor]}\u3002`);
    markDirty();
  }
  function loadTweezersFromTray(rowIndex = null, colIndex = null) {
    if (!state.trayColor || state.trayBeans <= 0) {
      showToast("\u8C46\u7B5B\u91CC\u6CA1\u6709\u53EF\u5939\u7684\u8C46\u5B50\u3002");
      return;
    }
    if (state.tweezerBead) {
      showToast("\u954A\u5B50\u4E0A\u5DF2\u7ECF\u5939\u7740\u4E00\u9897\uFF0C\u5148\u653E\u4E0B\u6216\u653E\u56DE\u8C46\u76D2\u3002");
      return;
    }
    let row = rowIndex;
    let col = colIndex;
    if (row === null || col === null || row === void 0 || col === void 0) {
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
      showToast("\u70B9\u51FB\u5230\u7684\u4F4D\u7F6E\u6CA1\u6709\u8C46\u5B50\u3002");
      return;
    }
    state.trayMatrix[row][col] = false;
    syncTrayBeans();
    state.tweezerBead = state.trayColor;
    feedback("grab");
    state.trayProgress = clamp(state.trayProgress - 0.08, 0, 100);
    showToast(`\u954A\u5B50\u4ECE\u8C46\u7B5B\u5939\u8D77 ${beadLabel(state.tweezerBead)}\u3002`);
    markDirty();
  }
  function handleTrayTap(pos) {
    if (!pos) return;
    setToolPose(pos.x, pos.y);
    const row = trayRowFromPoint(pos.x, pos.y, true);
    const cell = trayCellFromPoint(pos.x, pos.y, true);
    if (state.tool === "needle") {
      if (state.trayProgress <= needleLoadSortThreshold) {
        improveSort(7, "\u5148\u628A\u8C46\u7B5B\u6296\u6574\u9F50\uFF0C\u8C46\u9488\u624D\u80FD\u4E0A\u8C46\u3002");
        return;
      }
      loadNeedleFromTray(row);
      return;
    }
    if (!cell) {
      showToast("\u7528\u954A\u5B50\u65F6\u8BF7\u70B9\u5728\u8C46\u5B50\u4E0A\u3002");
      return;
    }
    loadTweezersFromTray(cell.row, cell.col);
  }
  function returnTweezerBead() {
    if (!state.tweezerBead) return false;
    const oldColor = state.tweezerBead;
    state.tweezerBead = null;
    feedback("drop");
    showToast(`${beadLabel(oldColor)} \u653E\u56DE\u8C46\u76D2\u3002`);
    markDirty();
    return true;
  }
  function tweezerFromBox(code) {
    if (!code) return;
    if (state.tweezerBead === code) {
      returnTweezerBead();
      return;
    }
    state.tweezerBead = code;
    feedback("grab");
    showToast(`\u954A\u5B50\u5939\u8D77 ${beadLabel(code)}\u3002`);
    markDirty();
  }
  async function clearBoard() {
    const hasContent = placedCount() > 0 || state.trayBeans > 0 || state.needleLoaded > 0 || state.tweezerBead || state.spill || state.fusedPieces.length > 0;
    if (hasContent && !await confirmModal({ message: "\u6E05\u7A7A\u677F\u9762\u4F1A\u79FB\u9664\u5DF2\u6446\u7684\u5168\u90E8\u8C46\u5B50\uFF0C\u786E\u5B9A\u5417\uFF1F", okText: "\u6E05\u7A7A", danger: true })) return;
    state.placed.fill(null);
    invalidatePlacedCounts();
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
    showToast("\u677F\u9762\u5DF2\u6E05\u7A7A\u3002");
    markDirty();
  }
  function resetPlacementForRemap() {
    state.placed.fill(null);
    invalidatePlacedCounts();
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
      showToast("\u56FE\u7EB8\u6362\u8272\u53EA\u80FD\u5728\u5F00\u59CB\u524D\u8BBE\u7F6E\u3002");
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
    showToast(`\u5DF2\u5C06 ${beadLabel(sourceCode)} \u6539\u4E3A ${beadLabel(targetCode)}\u3002`);
    const available = getPatternColors();
    if (!available.includes(state.selectedColor)) {
      state.selectedColor = available[0] || sourceCode;
    }
    markDirty();
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
    if (!useMobileDirectPlacement() && (state.phase === "place" || state.phase === "inspect") && pointInLampSwitch(pos.x, pos.y)) {
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
        if (isTouchDevice()) {
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
      const pending = state.pointer.pendingCell;
      if (pending) {
        handlePlaceAt(pending.x, pending.y, true);
        state.pointer.pendingCell = null;
      }
      state.pointer.mode = "place";
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
    const key = useMobileDirectPlacement() ? `${x}:${y}:mobile:${state.selectedColor}:${spillKey}` : `${x}:${y}:${state.tool}:${state.selectedColor}:${state.trayColor || "-"}:${state.tweezerBead || "-"}:${spillKey}`;
    if (!initial && key === state.lastCellKey) return;
    state.lastCellKey = key;
    if (useMobileDirectPlacement()) {
      placeSelectedBead(x, y, initial);
      return;
    }
    if (state.tool === "tweezers") {
      if (initial) useTweezers(x, y);
      return;
    }
    useNeedle(x, y);
  }
  function placeSelectedBead(x, y, initial = true) {
    if (!isActiveTileCell(x, y)) return;
    if (!state.selectedColor) {
      if (initial) showPlaceHint("\u5148\u5728\u8C46\u76D2\u91CC\u9009\u4E00\u4E2A\u989C\u8272\u518D\u653E\u7F6E\u3002", "place:no-color");
      return;
    }
    const index2 = indexFor(x, y);
    if (state.spill && state.spill.index === index2) {
      state.spill = null;
    }
    const current = state.placed[index2];
    if (!initial && current) return;
    const removing = current === state.selectedColor;
    if (removing) {
      state.placed[index2] = null;
      state.heat[index2] = 0;
    } else {
      state.placed[index2] = state.selectedColor;
      state.heat[index2] = 0;
    }
    feedback(removing ? "bead-remove" : "bead-place");
    if (useMobileDirectPlacement()) {
      state.mobileBeadSettle = !removing && !prefersReducedMotion() ? { index: index2, startedAt: performance.now(), duration: 180 } : null;
    }
    invalidatePlacedCounts();
    state.savedCurrent = false;
    updateSelectedPaletteCount();
    markCanvasDirty();
  }
  function announceKeyboardGrid(message) {
    showPlaceHint(message, `keyboard-grid:${message}`);
  }
  function showKeyboardGrid() {
    if (state.phase !== "place") return;
    if (!sceneCanvas.matches(":focus-visible")) return;
    const cursor = normalizeGridCursor(state.keyboardGrid, boardCols(), boardRows());
    state.keyboardGrid = { ...cursor, visible: true };
    announceKeyboardGrid(
      `\u952E\u76D8\u683C\u70B9\uFF1A\u7B2C ${cursor.y + 1} \u884C\uFF0C\u7B2C ${cursor.x + 1} \u5217\uFF0C\u5F53\u524D\u989C\u8272 ${beadLabel(state.selectedColor)}\u3002`
    );
    markCanvasDirty();
  }
  function hideKeyboardGrid() {
    if (!state.keyboardGrid.visible) return;
    state.keyboardGrid.visible = false;
    markCanvasDirty();
  }
  function handleKeyboardGridKey(event) {
    if (document.activeElement !== sceneCanvas || state.phase !== "place") return false;
    const action = keyboardGridAction(event.key);
    if (action === "clear") {
      event.preventDefault();
      hideKeyboardGrid();
      sceneCanvas.blur();
      return true;
    }
    if (event.key.startsWith("Arrow")) {
      event.preventDefault();
      const cursor = moveGridCursor(state.keyboardGrid, event.key, boardCols(), boardRows());
      state.keyboardGrid = { ...cursor, visible: true };
      announceKeyboardGrid(
        `\u7B2C ${cursor.y + 1} \u884C\uFF0C\u7B2C ${cursor.x + 1} \u5217\uFF0C\u5F53\u524D\u989C\u8272 ${beadLabel(state.selectedColor)}\u3002`
      );
      markCanvasDirty();
      return true;
    }
    if (action === "place") {
      event.preventDefault();
      const cursor = normalizeGridCursor(state.keyboardGrid, boardCols(), boardRows());
      const index2 = indexFor(cursor.x, cursor.y);
      const removed = state.placed[index2] === state.selectedColor;
      placeSelectedBead(cursor.x, cursor.y, true);
      announceKeyboardGrid(
        `${removed ? "\u5DF2\u53D6\u4E0B" : "\u5DF2\u653E\u7F6E"} ${beadLabel(state.selectedColor)}\uFF0C\u7B2C ${cursor.y + 1} \u884C\uFF0C\u7B2C ${cursor.x + 1} \u5217\u3002`
      );
      return true;
    }
    return false;
  }
  function useTweezers(x, y) {
    const index2 = indexFor(x, y);
    if (state.spill && state.spill.index === index2) {
      if (state.tweezerBead) {
        showToast("\u954A\u5B50\u4E0A\u5DF2\u7ECF\u5939\u7740\u4E00\u9897\uFF0C\u5148\u653E\u4E0B\u6216\u653E\u56DE\u8C46\u76D2\u3002");
        return;
      }
      state.tweezerBead = state.spill.code;
      state.placed[index2] = null;
      invalidatePlacedCounts();
      state.heat[index2] = 0;
      state.spill = null;
      state.savedCurrent = false;
      feedback("pick");
      showToast("\u5361\u4F4F\u7684\u8C46\u5B50\u5DF2\u7ECF\u5939\u8D77\uFF0C\u53EF\u4EE5\u7EE7\u7EED\u6446\u653E\u3002");
      markDirty();
      return;
    }
    if (state.placed[index2]) {
      if (state.tweezerBead) {
        showToast("\u954A\u5B50\u4E0A\u5DF2\u7ECF\u5939\u7740\u4E00\u9897\uFF0C\u5148\u653E\u4E0B\u6216\u653E\u56DE\u8C46\u76D2\u3002");
        return;
      }
      state.tweezerBead = state.placed[index2];
      state.placed[index2] = null;
      invalidatePlacedCounts();
      state.heat[index2] = 0;
      feedback("pick");
      showToast("\u954A\u5B50\u53D6\u4E0B\u4E00\u9897\u8C46\u5B50\u3002");
    } else {
      if (!state.tweezerBead) {
        showToast("\u5148\u4ECE\u8C46\u76D2\u5939\u4E00\u9897\u8C46\u5B50\u3002");
        return;
      }
      if (!isActiveTileCell(x, y)) return;
      state.placed[index2] = state.tweezerBead;
      invalidatePlacedCounts();
      state.tweezerBead = null;
      feedback("bead-place");
    }
    state.savedCurrent = false;
    markDirty();
  }
  function useNeedle(x, y) {
    if (!state.trayColor) {
      showToast("\u9488\u5DE5\u5177\u9700\u8981\u5148\u4ECE\u8C46\u76D2\u5012\u8C46\u8FDB\u8C46\u7B5B\u3002");
      return;
    }
    if (state.needleLoaded <= 0) {
      showToast("\u8C46\u9488\u7A7A\u4E86\uFF0C\u5148\u4ECE\u8C46\u7B5B\u53D6\u8C46\u3002");
      return;
    }
    const quality = state.trayProgress;
    if (quality < 12) {
      showToast("\u8C46\u7B5B\u8FD8\u6CA1\u6392\u9F50\uFF0C\u5148\u6296\u52A8\u4E00\u4E0B\u3002");
      return;
    }
    const spillChance = quality < 45 ? 0.12 : quality < 70 ? 0.07 : 0.035;
    if (!state.spill && Math.random() < spillChance) {
      const spill = createSpillAt(x, y, state.trayColor);
      if (spill) {
        state.spill = spill;
        state.placed[spill.index] = spill.code;
        invalidatePlacedCounts();
        state.heat[spill.index] = 0;
        state.needleLoaded = Math.max(0, state.needleLoaded - 1);
        state.trayProgress = clamp(state.trayProgress - 0.3, 0, 100);
        showToast("\u8C46\u5B50\u5012\u4E0B\u6765\u5361\u4F4F\u4E86\uFF0C\u5148\u7EE7\u7EED\u4E5F\u884C\uFF0C\u71A8\u70EB\u524D\u8BB0\u5F97\u5904\u7406\u3002");
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
      if (cx < 0 || cy < 0 || cx >= boardCols() || cy >= boardRows()) return;
      if (!isActiveTileCell(cx, cy)) return;
      const index2 = indexFor(cx, cy);
      if (state.placed[index2]) return;
      state.placed[index2] = state.trayColor;
      invalidatePlacedCounts();
      placedAny = true;
      used += 1;
    });
    if (placedAny) {
      feedback("bead-place");
      state.needleLoaded = Math.max(0, state.needleLoaded - used);
      const drain = Math.max(0.1, used * 0.12);
      state.trayProgress = clamp(state.trayProgress - drain, 0, 100);
      state.savedCurrent = false;
      if (state.needleLoaded <= 0) showToast("\u8C46\u9488\u5DF2\u7A7A\uFF0C\u8BF7\u91CD\u65B0\u53D6\u8C46\u3002");
      markDirty();
    }
  }
  function createSpillAt(x, y, code) {
    feedback("spill");
    const cols = boardCols();
    const rows = boardRows();
    const spots = [
      [x, y],
      [x + 1, y],
      [x - 1, y],
      [x, y + 1],
      [x, y - 1],
      [x + 1, y + 1],
      [x - 1, y + 1],
      [x + 1, y - 1],
      [x - 1, y - 1]
    ];
    for (let i = 0; i < spots.length; i += 1) {
      const [sx, sy] = spots[i];
      if (sx < 0 || sy < 0 || sx >= cols || sy >= rows) continue;
      if (!isActiveTileCell(sx, sy)) continue;
      const index2 = indexFor(sx, sy);
      if (state.placed[index2]) continue;
      const jitterSeed = pseudoRandom(`${state.selectedPattern.id}-${index2}-${Date.now()}`);
      const orientation = Math.random() < 0.5 ? "h" : "v";
      return { index: index2, code, jitterSeed, orientation };
    }
    return null;
  }
  function applyIronHeat(x, y, dt, distance) {
    const layout = currentLayout();
    const cell = boardCellFromPoint(x, y);
    if (!cell) return;
    feedback("iron");
    const speed = distance / Math.max(dt, 1);
    const speedFactor = clamp(1.42 - speed * 1.45, 0.42, 1.55);
    const pressure = state.pressure / 58;
    const temp = state.temperature / 62;
    const base = dt / 16 * pressure * temp * speedFactor * 0.6;
    const radius = layout.cell * 1.65;
    const cols = boardCols();
    const rows = boardRows();
    for (let cy = cell.y - 2; cy <= cell.y + 2; cy += 1) {
      for (let cx = cell.x - 2; cx <= cell.x + 2; cx += 1) {
        if (cx < 0 || cy < 0 || cx >= cols || cy >= rows) continue;
        const index2 = indexFor(cx, cy);
        if (!state.placed[index2]) continue;
        const centerX = layout.boardX + cx * layout.cell + layout.cell / 2;
        const centerY = layout.boardY + cy * layout.cell + layout.cell / 2;
        const falloff = clamp(1 - Math.hypot(centerX - x, centerY - y) / radius, 0, 1);
        const add = base * (0.35 + falloff * 0.9);
        state.heat[index2] = clamp((state.heat[index2] || 0) + add, 0, 138);
        if (state.heat[index2] > 108) state.warp = clamp(state.warp + add * 0.022, 0, 80);
      }
    }
  }
  function runInspection() {
    state.errors = [];
    if (state.sandboxMode) return;
    const cols = boardCols();
    const rows = boardRows();
    for (let y = 0; y < rows; y += 1) {
      for (let x = 0; x < cols; x += 1) {
        const index2 = indexFor(x, y);
        const target = targetAt(x, y);
        const placed = state.placed[index2];
        if (target && !placed) state.errors.push({ index: index2, type: "missing" });
        if (target && placed && target !== placed) state.errors.push({ index: index2, type: "wrong" });
        if (!target && placed) state.errors.push({ index: index2, type: "extra" });
      }
    }
  }
  function pressFlat() {
    const anim = state.pressAnim;
    if (anim && performance.now() - anim.startedAt < anim.duration) return;
    const heat = heatStats();
    const heatedFactor = clamp(heat.heated / Math.max(1, heat.total), 0, 1);
    const bondedFactor = clamp(heat.bonded / Math.max(1, heat.total), 0, 1);
    const effective = clamp(heatedFactor * 0.45 + bondedFactor * 0.55, 0, 1);
    const flattenGain = lerp(5, 30, effective);
    const warpReduce = lerp(2, 12, effective);
    state.flattening = clamp(state.flattening + flattenGain, 0, 100);
    state.warp = clamp(state.warp - warpReduce, 0, 80);
    feedback("press");
    state.pressAnim = { startedAt: performance.now(), duration: 820 };
    if (effective < 0.2) {
      showToast("\u53D7\u70ED\u4E0D\u8DB3\uFF0C\u538B\u5E73\u6548\u679C\u5F88\u5C0F\u3002\u518D\u71A8\u4E00\u4F1A\u513F\u4F1A\u66F4\u597D\u538B\u3002");
    } else {
      showToast("\u538B\u677F\u538B\u4F4F\u4F5C\u54C1\uFF0C\u8FB9\u7F18\u66F4\u5E73\u4E86\u3002");
    }
    markDirty();
  }
  function flipAndIron() {
    feedback("flip");
    state.flipCount += 1;
    state.cooling = 20;
    state.heat = state.heat.map((heat) => heat * 0.82);
    showToast("\u7FFB\u9762\u5B8C\u6210\uFF0C\u518D\u8F7B\u71A8\u4E00\u6B21\u3002");
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
      unlockAchievement(fullBoardAchievement, (a) => {
        feedback("achievement");
        showAchievementToast(a);
      });
    } else {
      unlockAchievement(conceptAchievement, (a) => {
        feedback("achievement");
        showAchievementToast(a);
      });
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
      date: (/* @__PURE__ */ new Date()).toLocaleDateString("zh-CN", { month: "2-digit", day: "2-digit" }),
      size: state.selectedPattern.size,
      width: boardCols(),
      height: boardRows(),
      buildMs: buildElapsedMs(),
      placed: state.placed.slice()
    };
    if (!state.savedCurrent) {
      collection.unshift(entry);
      collection = collection.slice(0, collectionLimit);
      const stored = writeCollection(collection);
      state.savedCurrent = true;
      if (stored) {
        showToast("\u4F5C\u54C1\u5DF2\u6536\u5165\u4F5C\u54C1\u96C6\u3002");
        celebrate();
      }
    } else {
      showToast("\u8FD9\u4E2A\u7248\u672C\u5DF2\u7ECF\u4FDD\u5B58\u8FC7\u3002");
    }
    markDirty();
  }
  function ensureShareFonts() {
    if (!document.fonts?.load) return Promise.resolve();
    return Promise.all([
      document.fonts.load("400 92px 'LXGW Marker Gothic'"),
      document.fonts.load("500 26px 'Noto Sans SC'"),
      document.fonts.load("700 42px 'Noto Sans SC'")
    ]).then(() => document.fonts.ready).catch(() => {
    });
  }
  var shareQrPromise = null;
  function loadShareQR() {
    if (!shareQrPromise) {
      shareQrPromise = new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = () => resolve(null);
        img.src = SHARE_QR_DATA_URL;
      });
    }
    return shareQrPromise;
  }
  async function exportShareImage(format) {
    const clean = format === "clean";
    const portrait = !clean && format !== "square";
    const [, qrImg, logoImg] = await Promise.all([ensureShareFonts(), loadShareQR(), loadLogoImage()]);
    const canvas = document.createElement("canvas");
    canvas.width = 1080;
    canvas.height = portrait ? 1440 : 1080;
    const ctx2 = canvas.getContext("2d");
    drawShareImage(ctx2, canvas.width, canvas.height, portrait, qrImg, clean ? "clean" : "card", logoImg);
    const variantLabel = clean ? "\u4F5C\u54C1\u56FE" : portrait ? "\u7AD6\u56FE" : "\u65B9\u56FE";
    const filename = `\u62FC\u8C46\u5DE5\u574A-${state.selectedPattern.name}-${variantLabel}.png`;
    const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/png"));
    if (!blob) {
      showToast("\u5BFC\u51FA\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5\u3002");
      return;
    }
    const file = new File([blob], filename, { type: "image/png" });
    if (navigator.canShare?.({ files: [file] })) {
      try {
        await navigator.share({ files: [file], title: "\u62FC\u8C46\u5DE5\u574A" });
        return;
      } catch (err) {
        if (err?.name === "AbortError") return;
      }
    }
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = filename;
    link.href = url;
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1e3);
    showToast("\u5DF2\u5BFC\u51FA\u5206\u4EAB\u56FE\u3002");
  }
  function copyShareText() {
    const timeText = state.buildMs > 0 ? `\uFF0C\u82B1\u4E86 ${formatBuildTime(state.buildMs)}` : "";
    const text = buildShareText({
      name: state.selectedPattern.name,
      total: getTargetTotal(),
      colors: getPatternColors().length,
      grade: finalGrade(),
      timeText
    });
    autoCopyText(text, "\u6587\u6848\u5DF2\u590D\u5236\u3002", "\u590D\u5236\u5931\u8D25\uFF0C\u8BF7\u624B\u52A8\u590D\u5236\u3002");
  }
  function shouldAnimateCanvas(now) {
    if (state.pointer.down) return true;
    if (state.phase === "cool" && (state.cooling < 100 || state.flattening > 0)) return true;
    if (now < state.lampSwitchFlashUntil) return true;
    if (state.floorDrops.length > 0) return true;
    if (state.pressAnim && now - state.pressAnim.startedAt < state.pressAnim.duration) return true;
    if (!prefersReducedMotion() && state.craftSwitchAt && now - state.craftSwitchAt < 260) return true;
    if (state.mobileBeadSettle && now - state.mobileBeadSettle.startedAt < state.mobileBeadSettle.duration) return true;
    const nav = state.kbdNav;
    if (nav.up || nav.down || nav.left || nav.right || nav.zoomIn || nav.zoomOut) return true;
    const bv = state.boardView;
    if (Math.abs(bv.velX) > 0.5 || Math.abs(bv.velY) > 0.5 || Math.abs(bv.velScale) > 1e-3) return true;
    return false;
  }
  function tickKbdNav(dtSec) {
    const nav = state.kbdNav;
    const bv = state.boardView;
    const boardPhase = state.phase === "place" || state.phase === "inspect";
    if (!boardPhase) return;
    const PAN_ACCEL = 2200;
    const PAN_DECEL = 5e3;
    const PAN_MAX = 560;
    const ZOOM_ACCEL = 4.5;
    const ZOOM_DECEL = 10;
    const ZOOM_MAX = maxBoardScale(currentLayout()) - 1;
    const wantLeft = nav.left && !nav.right;
    const wantRight = nav.right && !nav.left;
    if (wantLeft) bv.velX = Math.min(PAN_MAX, bv.velX + PAN_ACCEL * dtSec);
    else if (wantRight) bv.velX = Math.max(-PAN_MAX, bv.velX - PAN_ACCEL * dtSec);
    else if (bv.velX > 0) bv.velX = Math.max(0, bv.velX - PAN_DECEL * dtSec);
    else if (bv.velX < 0) bv.velX = Math.min(0, bv.velX + PAN_DECEL * dtSec);
    const wantUp = nav.up && !nav.down;
    const wantDown = nav.down && !nav.up;
    if (wantUp) bv.velY = Math.min(PAN_MAX, bv.velY + PAN_ACCEL * dtSec);
    else if (wantDown) bv.velY = Math.max(-PAN_MAX, bv.velY - PAN_ACCEL * dtSec);
    else if (bv.velY > 0) bv.velY = Math.max(0, bv.velY - PAN_DECEL * dtSec);
    else if (bv.velY < 0) bv.velY = Math.min(0, bv.velY + PAN_DECEL * dtSec);
    const wantIn = nav.zoomIn && !nav.zoomOut;
    const wantOut = nav.zoomOut && !nav.zoomIn;
    if (wantIn) bv.velScale = Math.min(ZOOM_MAX, bv.velScale + ZOOM_ACCEL * dtSec);
    else if (wantOut) bv.velScale = Math.max(-ZOOM_MAX, bv.velScale - ZOOM_ACCEL * dtSec);
    else if (bv.velScale > 0) bv.velScale = Math.max(0, bv.velScale - ZOOM_DECEL * dtSec);
    else if (bv.velScale < 0) bv.velScale = Math.min(0, bv.velScale + ZOOM_DECEL * dtSec);
    const movingPan = Math.abs(bv.velX) > 0.5 || Math.abs(bv.velY) > 0.5;
    const movingZoom = Math.abs(bv.velScale) > 1e-3;
    if (movingPan || movingZoom) {
      const prevX = bv.panX;
      const prevY = bv.panY;
      setBoardZoom(
        bv.scale + bv.velScale * dtSec,
        bv.panX + bv.velX * dtSec,
        bv.panY + bv.velY * dtSec
      );
      if (bv.panX === prevX) bv.velX = 0;
      if (bv.panY === prevY) bv.velY = 0;
    }
  }
  function tick(now) {
    const dt = Math.min(48, now - lastFrame);
    lastFrame = now;
    tickKbdNav(dt / 1e3);
    tickDrawKbdNav(dt / 1e3);
    if (state.phase === "cool") {
      const heat = heatStats();
      const overPenalty = heat.overPercent > 18 ? 0.04 : 0;
      const prevCooling = state.cooling;
      const prevFlatten = state.flattening;
      state.cooling = clamp(state.cooling + dt * (0.012 - overPenalty / 100), 0, 100);
      if (state.flattening > 0) state.flattening = clamp(state.flattening - dt * 8e-3, 0, 100);
      if (Math.abs(state.cooling - prevCooling) > 1e-4 || Math.abs(state.flattening - prevFlatten) > 1e-4) {
        state.renderDirty = true;
      }
    }
    if (state.uiDirty) {
      renderUI();
      state.uiDirty = false;
    }
    if (state.renderDirty || state.previewDirty || shouldAnimateCanvas(now)) {
      try {
        render();
      } catch (err) {
        console.error("[render] frame skipped after error:", err);
      }
    }
    requestAnimationFrame(tick);
  }
  function onResize() {
    invalidateLayoutCache();
    if (state.trayColor) syncTrayMatrixShape();
    markDirty();
    if (document.body.dataset.appMode === "draw") paintDrawCanvas();
  }
  sceneCanvas.addEventListener("pointerdown", onPointerDown);
  sceneCanvas.addEventListener("pointermove", onPointerMove);
  sceneCanvas.addEventListener("pointerup", onPointerUp);
  sceneCanvas.addEventListener("pointercancel", onPointerUp);
  sceneCanvas.addEventListener("touchstart", onTouchStart, { passive: false });
  sceneCanvas.addEventListener("touchmove", onTouchMove, { passive: false });
  sceneCanvas.addEventListener("touchend", onTouchEnd, { passive: false });
  sceneCanvas.addEventListener("touchcancel", onTouchEnd, { passive: false });
  sceneCanvas.addEventListener("contextmenu", (event) => {
    event.preventDefault();
    if (state.phase === "place" && state.tweezerBead) returnTweezerBead();
  });
  sceneCanvas.addEventListener("focus", showKeyboardGrid);
  sceneCanvas.addEventListener("blur", hideKeyboardGrid);
  sceneCanvas.addEventListener("wheel", (event) => {
    if (state.phase !== "place" && state.phase !== "inspect") return;
    if (event.ctrlKey || event.metaKey) return;
    event.preventDefault();
    const rect = sceneCanvas.getBoundingClientRect();
    const mx = event.clientX - rect.left;
    const my = event.clientY - rect.top;
    const layout = currentLayout();
    const view = boardViewTransform(layout);
    const factor = event.deltaY < 0 ? 1.15 : 1 / 1.15;
    const nextScale = clamp(view.scale * factor, 1, maxBoardScale(layout));
    const ratio = nextScale / view.scale;
    const nextPanX = mx - view.cx - (mx - view.cx - view.panX) * ratio;
    const nextPanY = my - view.cy - (my - view.cy - view.panY) * ratio;
    setBoardZoom(nextScale, nextPanX, nextPanY);
  }, { passive: false });
  els.resetButton.addEventListener("click", async () => {
    const hasProgress = state.phase !== "choose" || placedCount() > 0;
    if (hasProgress && !await confirmModal({ message: "\u91CD\u7F6E\u4F1A\u6E05\u7A7A\u5F53\u524D\u6240\u6709\u8FDB\u5EA6\uFF0C\u786E\u5B9A\u5417\uFF1F", okText: "\u91CD\u7F6E", danger: true })) return;
    loadPattern(state.selectedPattern);
    clearAutoSave();
    showToast("\u5DF2\u91CD\u7F6E\u5F53\u524D\u4F5C\u54C1\u3002");
  });
  els.startBeadButton?.addEventListener("click", () => {
    setAppMode("bead");
  });
  initStartShowcase({
    onPick: (pattern) => {
      loadPattern(pattern);
      setAppMode("bead");
    }
  });
  els.startDrawButton?.addEventListener("click", () => {
    setAppMode("draw");
  });
  els.startGalleryButton?.addEventListener("click", () => {
    setAppMode("gallery");
  });
  els.galleryBackButton?.addEventListener("click", () => {
    setAppMode("home");
  });
  els.gallerySettingsButton?.addEventListener("click", () => openSettingsModal());
  els.galleryRefreshButton?.addEventListener("click", () => {
    void loadGallery();
  });
  els.gallerySubmitButton?.addEventListener("click", () => {
    openGallerySubmitModal();
  });
  [els.gallerySubmitCancelBtn, els.gallerySubmitCloseBtn].forEach((btn) => {
    btn?.addEventListener("click", closeGallerySubmitModal);
  });
  els.gallerySubmitConfirmBtn?.addEventListener("click", () => {
    void submitGalleryPattern();
  });
  els.gallerySubmitModal?.addEventListener("click", (event) => {
    if (event.target === els.gallerySubmitModal) closeGallerySubmitModal();
  });
  els.beadBackButton?.addEventListener("click", () => {
    flushAutoSave();
    setAppMode("home");
  });
  els.sandboxButton?.addEventListener("click", () => toggleSandboxMode());
  function reflectBgmButton() {
    if (!els.bgmButton) return;
    const on = isBgmPlaying();
    els.bgmButton.setAttribute("aria-checked", on ? "true" : "false");
    els.bgmButton.setAttribute("aria-label", `\u80CC\u666F\u97F3\u4E50\uFF1A${on ? "\u5F00" : "\u5173"}`);
  }
  async function setBgm(next) {
    await toggleBgm(next);
    try {
      localStorage.setItem("perler-bgm", isBgmPlaying() ? "on" : "off");
    } catch (e) {
    }
    reflectBgmButton();
  }
  els.bgmButton?.addEventListener("click", () => {
    void setBgm(!isBgmPlaying());
  });
  var bgmPref = "off";
  try {
    bgmPref = localStorage.getItem("perler-bgm") || "off";
  } catch (e) {
  }
  if (bgmPref === "on") {
    const resume = () => {
      document.removeEventListener("pointerdown", resume);
      document.removeEventListener("keydown", resume);
      void setBgm(true);
    };
    document.addEventListener("pointerdown", resume, { once: true });
    document.addEventListener("keydown", resume, { once: true });
  }
  function reflectFxToggle(btn, on, label) {
    if (!btn) return;
    btn.setAttribute("aria-checked", on ? "true" : "false");
    btn.setAttribute("aria-label", `${label}\uFF1A${on ? "\u5F00" : "\u5173"}`);
  }
  reflectFxToggle(els.sfxButton, isSfxEnabled(), "\u97F3\u6548");
  reflectFxToggle(els.hapticButton, isHapticEnabled(), "\u9707\u52A8");
  els.sfxButton?.addEventListener("click", () => {
    setSfxEnabled(!isSfxEnabled());
    reflectFxToggle(els.sfxButton, isSfxEnabled(), "\u97F3\u6548");
    if (isSfxEnabled()) playSfx("ui-tap");
  });
  els.hapticButton?.addEventListener("click", () => {
    setHapticEnabled(!isHapticEnabled());
    reflectFxToggle(els.hapticButton, isHapticEnabled(), "\u9707\u52A8");
    if (isHapticEnabled()) vibrate(8);
  });
  document.addEventListener("click", (event) => {
    const el = event.target.closest?.(
      "button, [role='button'], .color-chip, .tool-card, .gallery-card, .collection-card, .tile, a.settings-link"
    );
    if (!el || el.closest(".settings-toggle")) return;
    playSfx("ui-tap");
  }, true);
  reflectBgmButton();
  var startSelectedPattern = () => {
    if (state.phase === "choose") {
      setPhase("place");
      flushAutoSave();
    }
  };
  els.chooseStartButton?.addEventListener("click", startSelectedPattern);
  els.mobileSelectionStartButton?.addEventListener("click", startSelectedPattern);
  previewCanvas.addEventListener("click", handlePreviewPickRemap);
  els.bgThemeChips?.addEventListener("click", (event) => {
    const btn = event.target.closest("[data-theme]");
    if (!btn || state.bgTheme === btn.dataset.theme) return;
    applyBackgroundTheme(btn.dataset.theme);
    showToast(`\u80CC\u666F\u5DF2\u5207\u6362\u4E3A ${currentBackgroundTheme().name}\u3002`);
  });
  els.toolStyleChips?.addEventListener("click", (event) => {
    const btn = event.target.closest("[data-tool]");
    if (!btn) return;
    const next = btn.dataset.tool;
    if (!toolStyles[next] || state.toolStyle === next) return;
    state.toolStyle = next;
    syncChipGroup(els.toolStyleChips, "tool", next);
    showToast(`\u5DE5\u5177\u6362\u6210${currentToolStyle().name}\u6B3E\u3002`);
    markDirty();
  });
  els.bgThemeChips?.addEventListener("keydown", (e) => chipRoving(e, els.bgThemeChips));
  els.toolStyleChips?.addEventListener("keydown", (e) => chipRoving(e, els.toolStyleChips));
  els.confirmModalOk?.addEventListener("click", () => resolveConfirm(true));
  els.confirmModalCancel?.addEventListener("click", () => resolveConfirm(false));
  els.confirmModal?.addEventListener("click", (event) => {
    if (event.target === els.confirmModal) resolveConfirm(false);
  });
  els.textInputModalOk?.addEventListener("click", () => resolveTextInput(true));
  els.textInputModalCancel?.addEventListener("click", () => resolveTextInput(false));
  els.textInputModalClose?.addEventListener("click", () => resolveTextInput(false));
  els.textInputModalInput?.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      resolveTextInput(true);
    }
  });
  els.textInputModal?.addEventListener("click", (event) => {
    if (event.target === els.textInputModal) resolveTextInput(false);
  });
  els.remapModalClose?.addEventListener("click", () => closeRemapModal());
  els.remapDoneButton?.addEventListener("click", () => closeRemapModal());
  els.remapResetButton?.addEventListener("click", () => resetPatternColorMapping());
  els.remapModal?.addEventListener("click", (event) => {
    if (event.target === els.remapModal) closeRemapModal();
  });
  els.settingsButton?.addEventListener("click", () => openSettingsModal());
  var settingsVersionEl = document.getElementById("settingsVersion");
  if (settingsVersionEl) settingsVersionEl.textContent = `\u62FC\u8C46\u5DE5\u574A v${APP_VERSION}`;
  initCommunity(els);
  els.startCommunityButton?.addEventListener("click", () => setAppMode("community"));
  els.communityBackButton?.addEventListener("click", () => setAppMode("home"));
  els.communitySettingsButton?.addEventListener("click", () => openSettingsModal());
  els.settingsModalClose?.addEventListener("click", () => closeSettingsModal());
  els.settingsModal?.addEventListener("click", (event) => {
    if (event.target === els.settingsModal) closeSettingsModal();
  });
  els.onboardingDoneBtn?.addEventListener("click", () => closeOnboardingModal());
  els.onboardingCloseBtn?.addEventListener("click", () => closeOnboardingModal());
  els.onboardingModal?.addEventListener("click", (event) => {
    if (event.target === els.onboardingModal) closeOnboardingModal();
  });
  els.collectionButton?.addEventListener("click", () => {
    openCollectionPage();
  });
  els.collectionBackButton?.addEventListener("click", () => closeCollectionPage());
  els.collectionSettingsButton?.addEventListener("click", () => openSettingsModal());
  els.collectionRefreshButton?.addEventListener("click", () => {
    renderCollection();
  });
  els.shareModalClose?.addEventListener("click", () => closeShareModal());
  els.shareModal?.addEventListener("click", (event) => {
    if (event.target === els.shareModal) closeShareModal();
  });
  window.addEventListener("keydown", (event) => {
    if (handleKeyboardGridKey(event)) return;
    if (event.key === "Escape" && !getOpenModalEl() && state.phase === "place" && state.tweezerBead) {
      event.preventDefault();
      returnTweezerBead();
      return;
    }
    if (!isTouchDevice()) {
      const tag = document.activeElement?.tagName;
      const inputFocused = tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT";
      if (!inputFocused && !getOpenModalEl()) {
        const k = event.key;
        const boardPhase = state.phase === "place" || state.phase === "inspect";
        if (boardPhase) {
          const nav = state.kbdNav;
          if (k === "w" || k === "W" || k === "ArrowUp") {
            event.preventDefault();
            nav.up = true;
            return;
          }
          if (k === "s" || k === "S" || k === "ArrowDown") {
            event.preventDefault();
            nav.down = true;
            return;
          }
          if (k === "a" || k === "A" || k === "ArrowLeft") {
            event.preventDefault();
            nav.left = true;
            return;
          }
          if (k === "d" || k === "D" || k === "ArrowRight") {
            event.preventDefault();
            nav.right = true;
            return;
          }
          if (k === "z" || k === "Z") {
            event.preventDefault();
            nav.zoomIn = true;
            return;
          }
          if (k === "x" || k === "X") {
            event.preventDefault();
            nav.zoomOut = true;
            return;
          }
        }
        if (state.appMode === "draw") {
          const k2 = event.key;
          const nav = getDrawKeyboardNav();
          if (k2 === "w" || k2 === "W" || k2 === "ArrowUp") {
            event.preventDefault();
            nav.up = true;
            return;
          }
          if (k2 === "s" || k2 === "S" || k2 === "ArrowDown") {
            event.preventDefault();
            nav.down = true;
            return;
          }
          if (k2 === "a" || k2 === "A" || k2 === "ArrowLeft") {
            event.preventDefault();
            nav.left = true;
            return;
          }
          if (k2 === "d" || k2 === "D" || k2 === "ArrowRight") {
            event.preventDefault();
            nav.right = true;
            return;
          }
          if (k2 === "z" || k2 === "Z") {
            event.preventDefault();
            nav.zoomIn = true;
            return;
          }
          if (k2 === "x" || k2 === "X") {
            event.preventDefault();
            nav.zoomOut = true;
            return;
          }
        }
      }
    }
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
    if (state.confirmModalOpen) {
      resolveConfirm(false);
      return;
    }
    if (state.textInputModalOpen) {
      resolveTextInput(false);
      return;
    }
    const enlarged = els.collectionScreen?.querySelector(".collection-enlarged.show");
    if (enlarged) {
      enlarged.classList.remove("show");
      return;
    }
    if (state.gallerySubmitModalOpen) {
      closeGallerySubmitModal();
      return;
    }
    if (els.drawCodeModal?.classList.contains("show")) {
      closeDrawCodeModal();
      return;
    }
    if (state.onboardingModalOpen) {
      closeOnboardingModal();
      return;
    }
    if (state.remapModalOpen) closeRemapModal();
    if (state.collectionPageOpen || state.appMode === "collection") {
      closeCollectionPage();
      return;
    }
    if (state.settingsModalOpen) closeSettingsModal();
    if (state.shareModalOpen) closeShareModal();
  });
  window.addEventListener("keyup", (event) => {
    const k = event.key;
    const nav = state.kbdNav;
    const drawNav = getDrawKeyboardNav();
    if (k === "w" || k === "W" || k === "ArrowUp") {
      nav.up = false;
      drawNav.up = false;
    }
    if (k === "s" || k === "S" || k === "ArrowDown") {
      nav.down = false;
      drawNav.down = false;
    }
    if (k === "a" || k === "A" || k === "ArrowLeft") {
      nav.left = false;
      drawNav.left = false;
    }
    if (k === "d" || k === "D" || k === "ArrowRight") {
      nav.right = false;
      drawNav.right = false;
    }
    if (k === "z" || k === "Z") {
      nav.zoomIn = false;
      drawNav.zoomIn = false;
    }
    if (k === "x" || k === "X") {
      nav.zoomOut = false;
      drawNav.zoomOut = false;
    }
  });
  window.addEventListener("resize", onResize);
  if (typeof ResizeObserver === "function") {
    let pending = false;
    const ro = new ResizeObserver(() => {
      if (pending) return;
      pending = true;
      requestAnimationFrame(() => {
        pending = false;
        onResize();
      });
    });
    ro.observe(sceneCanvas);
  }
  setSessionActions({
    loadPattern,
    setPhase
  });
  setModalActions({
    renderRemapModal,
    uiRenderSharePanel: renderSharePanel
  });
  setGalleryActions({ loadPattern, setAppMode, onModalOpened, restoreModalFocus, uiRenderUI: renderUI });
  setDrawActions({
    loadPattern,
    setAppMode,
    openSettingsModal,
    openGallerySubmitModal,
    importPatternCode,
    autoCopyText,
    requestCloudShareForPattern
  });
  initDrawingStudioEvents();
  setCustomPatternActions({ loadPattern });
  initCustomPatternEvents();
  setUIActions({
    getCollection: () => collection,
    updateCollection: (nextCollection) => {
      collection = nextCollection;
      writeCollection(collection);
    },
    loadPattern,
    setPhase,
    openRemapModal,
    setPatternColorMapping,
    resetPatternColorMapping,
    pourSelectedColor,
    clearBoard,
    startIroning,
    pressFlat,
    flipAndIron,
    completeWork,
    saveCurrentWork,
    openShareModal,
    openCollectionEntry,
    exportShareImage,
    copyShareText,
    createCloudShare,
    importPatternCode,
    openImportCodeModal: () => openDrawCodeModal("import-bead"),
    submitCurrentToGallery,
    triggerHaptic,
    returnTweezerBead,
    tweezerFromBox
  });
  validatePatterns();
  loadPattern(resizePattern(patterns[0], state.patternSize));
  setCustomDenoiseControls(state.customDenoiseLevel);
  applyBackgroundTheme(state.bgTheme);
  var sessionRestored = loadAutoSave();
  setAppMode("home");
  if (!sessionRestored) setPhase("choose");
  window.addEventListener("pagehide", () => flushAutoSave());
  document.addEventListener("visibilitychange", () => {
    syncBuildTimer();
    if (document.visibilityState === "hidden") flushAutoSave();
  });
  renderUI();
  requestAnimationFrame(tick);
  (window.requestIdleCallback || ((cb) => setTimeout(cb, 1200)))(preloadBackgrounds);
})();
