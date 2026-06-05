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
  function mixColor(hex, target, amount) {
    const a = parseInt(hex.slice(1), 16);
    const b = parseInt(target.slice(1), 16);
    const ar = a >> 16 & 255;
    const ag = a >> 8 & 255;
    const ab = a & 255;
    const br = b >> 16 & 255;
    const bg = b >> 8 & 255;
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
    const value = parseInt(hex.slice(1), 16);
    return {
      r: value >> 16 & 255,
      g: value >> 8 & 255,
      b: value & 255
    };
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
      size: 16,
      craft: "\u94A5\u5319\u6263",
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
        "................"
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
  var patterns = patternSeeds.map((seed) => ({
    ...seed,
    size: 24,
    rows: detailedRowsFromSeed(seed, 24),
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
          const index = queue[head++];
          const x = index % sourceSize;
          const y = Math.floor(index / sourceSize);
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
  var TRAY_DESKTOP_ROWS = 10;
  var TRAY_DESKTOP_COLS = 12;
  var TRAY_MOBILE_ROWS = 5;
  var TRAY_MOBILE_COLS = 24;
  var collectionKey = "beadWorkshopCollection.v1";
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
    patternSize: 24,
    customDenoiseLevel: 25,
    paletteSize: 221,
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
    collectionPageOpen: false,
    settingsModalOpen: false,
    onboardingModalOpen: false,
    shareModalOpen: false,
    gallerySubmitModalOpen: false,
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
    drawSizeValue: $("#drawSizeValue"),
    drawWidthInput: $("#drawWidthInput"),
    drawHeightInput: $("#drawHeightInput"),
    drawSizeApplyButton: $("#drawSizeApplyButton"),
    drawResizeModal: $("#drawResizeModal"),
    drawResizeModalTitle: $("#drawResizeModalTitle"),
    drawResizeConfirmBtn: $("#drawResizeConfirmBtn"),
    drawResizeCancelBtn: $("#drawResizeCancelBtn"),
    drawResizeCloseBtn: $("#drawResizeCloseBtn"),
    drawCodeModal: $("#drawCodeModal"),
    drawCodeModalTitle: $("#drawCodeModalTitle"),
    drawCodeHint: $("#drawCodeHint"),
    drawCodeCloseBtn: $("#drawCodeCloseBtn"),
    drawCodeCancelBtn: $("#drawCodeCancelBtn"),
    drawCodeCopyBtn: $("#drawCodeCopyBtn"),
    drawCodeImportConfirmBtn: $("#drawCodeImportConfirmBtn"),
    drawAnchorGrid: $("#drawAnchorGrid"),
    drawClearButton: $("#drawClearButton"),
    drawImportButton: $("#drawImportButton"),
    drawShortCodeButton: $("#drawShortCodeButton"),
    drawSubmitGalleryButton: $("#drawSubmitGalleryButton"),
    drawUsePatternButton: $("#drawUsePatternButton"),
    drawUndoButton: $("#drawUndoButton"),
    drawCodeInput: $("#drawCodeInput"),
    drawPaletteMeta: $("#drawPaletteMeta"),
    drawRecentColors: $("#drawRecentColors"),
    drawPalette: $("#drawPalette"),
    beadBackButton: $("#beadBackButton"),
    statusLine: $("#statusLine"),
    patternMeta: $("#patternMeta"),
    patternList: $("#patternList"),
    customImageInput: $("#customImageInput"),
    customWhiteToggle: $("#customWhiteToggle"),
    customDenoiseSlider: $("#customDenoiseSlider"),
    customDenoiseValue: $("#customDenoiseValue"),
    patternSizeSlider: $("#patternSizeSlider"),
    patternSizeValue: $("#patternSizeValue"),
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
    settingsButton: $("#settingsButton"),
    settingsDot: $("#settingsDot"),
    settingsModal: $("#settingsModal"),
    settingsModalClose: $("#settingsModalClose"),
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
    bgThemeSelect: $("#bgThemeSelect"),
    topToolStyleSelect: $("#topToolStyleSelect"),
    sandboxButton: $("#sandboxButton"),
    chooseStartButton: $("#chooseStartButton"),
    resetButton: $("#resetButton"),
    toast: $("#toast"),
    placeHint: $("#placeHint"),
    achievementToast: $("#achievementToast")
  };

  // src/notify.js
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
      showToast(`\u9690\u85CF\u6210\u5C31\u89E3\u9501\uFF1A${name}`);
      return;
    }
    window.clearTimeout(state.achievementTimer);
    els.achievementToast.innerHTML = `<span class="label">\u9690\u85CF\u6210\u5C31</span><strong>${name}</strong>`;
    els.achievementToast.classList.add("show");
    state.achievementTimer = window.setTimeout(() => {
      els.achievementToast.classList.remove("show");
    }, 2400);
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
  function indexFor(x, y) {
    return y * state.selectedPattern.size + x;
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
        [x, y - 1]
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
          grid[index] = waitOriginal ? baseMap[sourceCode] || sourceCode : null;
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
  function normalizePatternSize(value) {
    const parsed = Number.parseInt(value, 10);
    if (!Number.isFinite(parsed)) return 48;
    return clamp(parsed, 12, 100);
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
    if (craft === "\u51B0\u7BB1\u8D34") return "\u539F\u7248";
    return craftOptions.includes(craft) ? craft : "\u94A5\u5319\u6263";
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
  function findCustomPattern() {
    return patterns.find((item) => item.id.startsWith("custom-")) || null;
  }

  // src/render.js
  function useMobileTrayGrid() {
    return window.matchMedia("(max-width: 860px)").matches;
  }
  function useMobileDirectPlacement() {
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
  var autoSaveHook = null;
  function setAutoSaveHook(fn) {
    autoSaveHook = fn;
  }
  function markCanvasDirty(save = false) {
    state.renderDirty = true;
    if (save) autoSaveHook?.();
  }
  function markDirty() {
    state.renderDirty = true;
    state.uiDirty = true;
    autoSaveHook?.();
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
    const key = `${rect.width}x${rect.height}:${state.selectedPattern.size}`;
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
    const cx = layout.boardX + layout.boardSize * 0.5;
    const cy = layout.boardY + layout.boardSize * 0.5;
    return { scale, panX, panY, cx, cy };
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
  function computeLayout(rect) {
    const w = rect.width;
    const h = rect.height;
    if (useMobileDirectPlacement()) {
      const margin = 12;
      const rawBoard2 = clamp(Math.min(w - margin * 2, h - margin * 2), 240, 520);
      const boardSize2 = Math.floor(rawBoard2 / 8) * 8;
      const boardX2 = Math.floor((w - boardSize2) / 2);
      const boardY2 = Math.floor((h - boardSize2) / 2);
      return {
        w,
        h,
        boardX: boardX2,
        boardY: boardY2,
        boardSize: boardSize2,
        cell: boardSize2 / state.selectedPattern.size,
        refX: 0,
        refY: 0,
        refW: 0,
        refH: 0,
        trayX: 0,
        trayY: 0,
        trayW: 0,
        trayH: 0
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
    const trayX = boardX + boardSize + trayGap;
    const naturalTrayW = w - trayX - trayRightMargin;
    const trayW = Math.max(minTrayW, naturalTrayW);
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
      trayH: Math.max(220, boardY + boardSize - trayY)
    };
  }
  function setupHiDpiCanvas(canvas, ctx, rect = canvas.getBoundingClientRect()) {
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
    const sceneRect = sceneCanvas.getBoundingClientRect();
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
        drawFinishShowcase(layout);
        drawFinishLayer(layout);
      }
    } else {
      drawBoard(layout);
      if (!useMobileDirectPlacement()) drawReferenceSheet(layout);
      if ((state.phase === "place" || state.phase === "inspect") && shouldShowTray(layout)) {
        if (state.trayColor) syncTrayMatrixShape();
        drawTray(layout, true);
      }
      if (state.phase === "inspect") updateInspectAssistCanvases();
      if (state.phase === "iron") drawIronLayer(layout);
      if (state.phase === "cool") drawCoolingLayer(layout);
    }
    if (!useMobileDirectPlacement()) drawLampSwitch(layout);
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
    const activeBottom = trayH > 0 ? Math.max(boardY + boardSize + 24, trayY + trayH + 10) : Math.max(boardY + boardSize + 24, layout.refY + layout.refH + 14);
    const matBottom = Math.min(h - 90, activeBottom);
    const tableEdgeY = Math.min(h - 18, matBottom + 30);
    const floorTop = tableEdgeY;
    const floorGradient = ctx.createLinearGradient(0, floorTop, 0, h);
    floorGradient.addColorStop(0, "rgba(54, 60, 72, 0.20)");
    floorGradient.addColorStop(1, "rgba(40, 46, 56, 0.30)");
    ctx.fillStyle = floorGradient;
    ctx.fillRect(0, floorTop, w, h - floorTop);
    ctx.strokeStyle = "rgba(20, 24, 32, 0.10)";
    ctx.lineWidth = 1;
    for (let x = 0; x < w; x += 78) {
      ctx.beginPath();
      ctx.moveTo(x, floorTop);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
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
    ctx.fillStyle = "rgba(28, 32, 40, 0.18)";
    ctx.fillRect(0, floorTop - 4, w, 4);
    ctx.fillStyle = "rgba(28, 32, 40, 0.10)";
    ctx.fillRect(0, floorTop, w, 6);
    ctx.restore();
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
      const jitterY = (i % 3 - 1) * 0.26;
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
    const ctx = scene;
    const rect = lampSwitchRect(layout);
    const cx = rect.x + rect.w / 2;
    const cy = rect.y + rect.h / 2;
    const hover = pointInLampSwitch(state.pointer.x, state.pointer.y);
    const pressed = performance.now() < state.lampSwitchFlashUntil;
    const lift = pressed ? 0.95 : 1;
    const bodyR = rect.w * 0.34 * lift;
    ctx.save();
    const cordStartX = rect.x + rect.w * 0.5;
    const cordStartY = rect.y - 2;
    const cordEndX = layout.w - 22;
    const cordEndY = 2;
    {
      const cordGrad = ctx.createLinearGradient(cordStartX, cordStartY, cordEndX, cordEndY);
      cordGrad.addColorStop(0, "rgba(36, 40, 50, 0.44)");
      cordGrad.addColorStop(0.68, "rgba(36, 40, 50, 0.28)");
      cordGrad.addColorStop(1, "rgba(36, 40, 50, 0)");
      ctx.strokeStyle = cordGrad;
      ctx.lineWidth = 2.6;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(cordStartX, cordStartY);
      ctx.bezierCurveTo(
        cordStartX + 22,
        cordStartY - 50,
        cordEndX - 24,
        cordEndY + 80,
        cordEndX,
        cordEndY
      );
      ctx.stroke();
      const cordHighlight = ctx.createLinearGradient(cordStartX, cordStartY, cordEndX, cordEndY);
      cordHighlight.addColorStop(0, "rgba(255, 255, 255, 0.22)");
      cordHighlight.addColorStop(0.7, "rgba(255, 255, 255, 0.08)");
      cordHighlight.addColorStop(1, "rgba(255, 255, 255, 0)");
      ctx.strokeStyle = cordHighlight;
      ctx.lineWidth = 0.9;
      ctx.beginPath();
      ctx.moveTo(cordStartX, cordStartY);
      ctx.bezierCurveTo(
        cordStartX + 22,
        cordStartY - 50,
        cordEndX - 24,
        cordEndY + 80,
        cordEndX,
        cordEndY
      );
      ctx.stroke();
    }
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
    ctx.textAlign = "left";
    ctx.restore();
  }
  function drawToolEntities(w, h) {
    if (state.phase !== "place") return;
    const ctx = scene;
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
    ctx.save();
    ctx.globalAlpha = follow ? 0.46 : 0.72;
    ctx.fillStyle = "rgba(38, 36, 43, 0.62)";
    ctx.font = "700 11px Avenir Next, PingFang SC, Hiragino Sans GB, Microsoft YaHei, sans-serif";
    const infoX = follow ? clamp(state.toolPose.x - 16, 14, w - 172) : defaultX + 8;
    const infoY = follow ? clamp(state.toolPose.y - 14, 18, h - 62) : defaultY + 14;
    ctx.fillText("\u9488", infoX, infoY);
    ctx.fillText(`\u954A ${state.tweezerBead ? beadIds[state.tweezerBead] : "\u7A7A"}`, infoX, infoY + 14);
    ctx.restore();
  }
  function drawNeedleEntityAtTip(tipX, tipY) {
    drawNeedleEntity(tipX, tipY - 150);
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
    ctx.moveTo(x, y + 146);
    ctx.lineTo(x, y + 8);
    ctx.stroke();
    ctx.shadowColor = "transparent";
    ctx.strokeStyle = style.secondary;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x - 2.2, y + 134);
    ctx.lineTo(x - 2.2, y + 20);
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
    ctx.moveTo(x, y + 150);
    ctx.lineTo(x - 3.2, y + 140);
    ctx.lineTo(x + 3.2, y + 140);
    ctx.closePath();
    ctx.fill();
    for (let i = 0; i < cap; i += 1) {
      const by = y + 10 + i * 11.5;
      const fillStart = Math.max(0, cap - state.needleLoaded);
      if (i >= fillStart) {
        ctx.save();
        ctx.globalAlpha = 0.52;
        drawFallenBead(ctx, x, by, 12, loadedCode, "v");
        ctx.restore();
      } else {
        ctx.fillStyle = "rgba(102, 116, 128, 0.18)";
        roundedPath(ctx, x - 4.5, by - 5.75, 9, 11.5, 2.6);
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
    ctx.fillText("\u4ECA\u5929\u7684\u5DE5\u4F5C\u53F0\u5DF2\u7ECF\u6E05\u7A7A", x + 28, y + 48);
    ctx.fillStyle = "#686572";
    ctx.font = "15px Avenir Next, PingFang SC, Hiragino Sans GB, Microsoft YaHei, sans-serif";
    wrapText("\u4ECE\u5DE6\u4FA7\u6311\u4E00\u5F20\u56FE\u7EB8\uFF0C\u7167\u7740\u8272\u53F7\u4ECE\u8C46\u76D2\u53D6\u8C46\u3002\u8C46\u7B5B\u53EA\u6709\u4E00\u4E2A\uFF0C\u9488\u5DE5\u5177\u4ECE\u8C46\u7B5B\u53D6\u8C46\uFF0C\u954A\u5B50\u5FC5\u987B\u5148\u5939\u4F4F\u4E00\u9897\u518D\u653E\u4E0B\u3002", x + 28, y + 82, cardW - 56, 25);
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
    if (!useMobileDirectPlacement()) {
      ctx.shadowColor = "rgba(38, 36, 43, 0.15)";
      ctx.shadowBlur = 26;
      ctx.shadowOffsetY = 14;
    }
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
    const guideVisible = state.lampOn && !useMobileDirectPlacement() && (state.phase === "place" || state.phase === "inspect");
    const templateOpacity = guideVisible ? state.phase === "place" ? 0.1 : 0.08 : 0;
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
      mapSig
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
          [x, y + 1]
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
    if (state.craft === "\u539F\u7248") {
      drawFinishOriginal(layout, pieces);
      return;
    }
    if (state.craft === "\u94A5\u5319\u6263") {
      drawFinishKeychain(layout, pieces);
      return;
    }
    if (state.craft === "\u6446\u4EF6") {
      drawFinishFigurine(layout, pieces);
      return;
    }
    if (state.craft === "\u676F\u57AB") {
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
      maxBottom: h - 18
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
    const title = type === "full" ? "\u300A\u6EE1\u683C\u6784\u56FE\u300B" : "\u300A\u65E0\u9898\u300B";
    const paragraphs = type === "full" ? [
      { text: "2026", font: "500 15px Avenir Next, PingFang SC, Hiragino Sans GB, Microsoft YaHei, sans-serif", color: "#2f333b", lineHeight: 22 },
      { text: "\u5851\u6599\u62FC\u8C46\u3001\u7F51\u683C\u3001\u5B8C\u5168\u5360\u636E\u7684\u8868\u9762", font: "500 14px Avenir Next, PingFang SC, Hiragino Sans GB, Microsoft YaHei, sans-serif", color: "#4f5560", lineHeight: 22 },
      { gap: 10 },
      { text: "\u8FD9\u4EF6\u4F5C\u54C1\u62D2\u7EDD\u7559\u767D\uFF0C\u6574\u5757\u677F\u9762\u6210\u4E3A\u56FE\u50CF\u672C\u8EAB\u3002", font: "500 15px Avenir Next, PingFang SC, Hiragino Sans GB, Microsoft YaHei, sans-serif", color: "#2f333b", lineHeight: 22 },
      { text: "\u6BCF\u4E2A\u5B54\u4F4D\u90FD\u88AB\u5360\u636E\uFF0C\u6BCF\u4E2A\u4F4D\u7F6E\u90FD\u540C\u7B49\u91CD\u8981\u3002", font: "500 15px Avenir Next, PingFang SC, Hiragino Sans GB, Microsoft YaHei, sans-serif", color: "#2f333b", lineHeight: 22 }
    ] : [
      { text: "2026", font: "500 15px Avenir Next, PingFang SC, Hiragino Sans GB, Microsoft YaHei, sans-serif", color: "#2f333b", lineHeight: 22 },
      { text: "\u7A7A\u767D\u62FC\u8C46\u677F\u3001\u672A\u653E\u7F6E\u7684\u5851\u6599\u8C46\u3001\u73A9\u5BB6\u7684\u89C2\u770B", font: "500 14px Avenir Next, PingFang SC, Hiragino Sans GB, Microsoft YaHei, sans-serif", color: "#4f5560", lineHeight: 22 },
      { gap: 10 },
      { text: "\u6CA1\u6709\u989C\u8272\uFF0C\u4E5F\u662F\u4E00\u79CD\u7ED3\u6784\u3002", font: "500 15px Avenir Next, PingFang SC, Hiragino Sans GB, Microsoft YaHei, sans-serif", color: "#2f333b", lineHeight: 22 }
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
          y: target.y + (cellData.y - piece.centerY) * cell * scale
        })
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
      const firstTop = first.target.y - (first.piece.maxY - first.piece.minY + 1) * cell * first.scale / 2;
      ctx.lineWidth = Math.max(3, cell * 0.18);
      ctx.beginPath();
      ctx.moveTo(centerX, ringY + boardSize * 0.065);
      ctx.lineTo(centerX, firstTop - cell * 0.45);
      ctx.stroke();
    }
    if (placed.length > 1) {
      const top = placed[0];
      const bottom = placed[1];
      const topBottomY = top.target.y + (top.piece.maxY - top.piece.minY + 1) * cell * top.scale / 2;
      const bottomTopY = bottom.target.y - (bottom.piece.maxY - bottom.piece.minY + 1) * cell * bottom.scale / 2;
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
        resolveCenter: (cell2) => ({
          x: layout.boardX + cell2.x * layout.cell + layout.cell / 2,
          y: layout.boardY + cell2.y * layout.cell + layout.cell / 2
        })
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
          y: centerY + (cell.y - piece.centerY) * layout.cell * scale
        })
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
    const gradient = ctx.createLinearGradient(centerA.x, centerA.y, centerB.x, centerB.y);
    gradient.addColorStop(0, colorA);
    gradient.addColorStop(1, colorB);
    drawGradientCapsuleBridge(ctx, centerA, centerB, spread, lerp(spread / 2, 3, over), gradient, 0.9);
  }
  function drawGradientCapsuleBridge(ctx, centerA, centerB, width, radius, fillStyle, alpha = 1) {
    const dx = centerB.x - centerA.x;
    const dy = centerB.y - centerA.y;
    const length = Math.hypot(dx, dy);
    if (length < 1e-3) return;
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
  function isSpillDamagedIndex(index) {
    return state.spillDamages.some((damage) => damage.index === index);
  }
  function drawDamagedBead(ctx, x, y, r, code, heat = 0, fused = false, shape = null) {
    const base = palette[code] || "#999";
    const burnt = mixColor(base, "#6b4b44", 0.5);
    const pressRaw = fused ? state.phase === "cool" || state.phase === "finish" ? clamp(state.flattening / 100, 0, 1) : 0 : 0;
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
  function drawTrayBeadRandomized(ctx, x, y, r, code, angle = 0, tilt = 1, heightLift = 0) {
    const base = palette[code] || "#999";
    const length = r * 2.22;
    const thickness = r * 1.88 * tilt;
    const corner = Math.max(1.8, thickness * 0.2);
    ctx.save();
    ctx.translate(x, y - heightLift);
    ctx.rotate(angle);
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
          drawTrayBeadRandomized(ctx, x, y, beadR, color, angle, tilt, lift);
        }
      }
    }
    if (!color || state.trayBeans <= 0) {
      ctx.fillStyle = "rgba(75, 90, 98, 0.28)";
      ctx.font = "700 18px Avenir Next, PingFang SC, Hiragino Sans GB, Microsoft YaHei, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("\u7A7A", trayX + trayW / 2, trayY + trayH / 2 + 6);
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
      ctx.fillText(`\u8C46\u7B5B ${beadLabel(color)}`, trayX + 18, trayY + trayH - 14);
    } else {
      ctx.fillText("\u8C46\u7B5B \u7A7A", trayX + 18, trayY + trayH - 14);
    }
    ctx.restore();
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
    ctx.fillText(fitText(ctx, `${pattern.size}x${pattern.size} \xB7 ${getTargetTotal()} \u9897`, textAreaW), textX, metaY);
    const counts = getTargetCounts(pattern);
    const legendAreaW = textAreaW;
    const legendCols = preferSingleLegend || legendAreaW < 154 ? 1 : 2;
    const colW = legendCols === 1 ? legendAreaW : Math.max(60, Math.floor((legendAreaW - 8) / 2));
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
      ctx.lineWidth = Math.max(1.5, boardSize * 6e-3);
      roundedPath(ctx, cx - boardSize * 0.1, cy - boardSize * 0.1, boardSize * 0.2, boardSize * 0.2, boardSize * 8e-3);
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
        ctx.save();
        const trailH = startY - cy;
        if (trailH > 0) {
          const trailGrad = ctx.createLinearGradient(0, cy, 0, startY);
          trailGrad.addColorStop(0, "rgba(38, 36, 43, 0.18)");
          trailGrad.addColorStop(1, "rgba(38, 36, 43, 0)");
          ctx.fillStyle = trailGrad;
          ctx.fillRect(bladeX, cy, blade, trailH);
        }
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
        ctx.shadowColor = "transparent";
        ctx.fillStyle = "rgba(40, 46, 56, 0.8)";
        ctx.fillRect(bladeX + 2, cy - 1, blade - 4, 2);
        ctx.fillStyle = "rgba(255,255,255,0.6)";
        ctx.fillRect(bladeX + 6, cy + 4, blade - 12, 2);
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
    ctx.fillText(`\u8BC4\u7EA7 ${finalGrade()}`, boardX + boardSize - 64, boardY + boardSize - 23);
    ctx.restore();
  }
  function drawBead(ctx, x, y, r, code, heat = 0, fused = false, shape = null) {
    const base = palette[code] || "#999";
    const color = fusedColor(code, heat);
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
    if (beadIds[code] === "H1") {
      ctx.save();
      ctx.globalAlpha = 0.18;
      ctx.fillStyle = "rgba(0,0,0,0.3)";
      buildPath(x + r * 0.06, y + r * 0.1);
      ctx.fill();
      ctx.globalAlpha = 0.5;
      ctx.fillStyle = "#e8f4ff";
      buildPath(x, y);
      ctx.fill();
      ctx.globalAlpha = 0.5;
      ctx.strokeStyle = "rgba(100, 140, 195, 0.9)";
      ctx.lineWidth = Math.max(0.8, r * 0.1);
      buildPath(x, y);
      ctx.stroke();
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
    const pressRaw = fused ? state.phase === "cool" || state.phase === "finish" ? clamp(state.flattening / 100, 0, 1) : 0 : 0;
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
    const ellipsis = "\u2026";
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
      y: clamp(Math.floor((y - layout.y0) / layout.cell), 0, layout.size - 1)
    };
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
      const index2 = state.spill.index;
      const size = state.selectedPattern.size;
      return { x: index2 % size, y: Math.floor(index2 / size) };
    }
    if (state.errors.length) {
      const index2 = state.errors[0].index;
      const size = state.selectedPattern.size;
      return { x: index2 % size, y: Math.floor(index2 / size) };
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
    ctx.fillStyle = "#eef2f4";
    roundedPath(ctx, 0.5, 0.5, w - 1, h - 1, 10);
    ctx.fill();
    ctx.strokeStyle = "rgba(101, 115, 130, 0.28)";
    ctx.lineWidth = 1;
    ctx.stroke();
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
        ctx.fillStyle = "rgba(120, 128, 140, 0.28)";
        ctx.beginPath();
        ctx.arc(cx, cy, cell * 0.18, 0, Math.PI * 2);
        ctx.fill();
        if (target && !placed) {
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
          ctx.fillStyle = "rgba(0,0,0,0.16)";
          ctx.beginPath();
          ctx.arc(cx + cell * 0.04, cy + cell * 0.06, beadR, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = palette[placed] || "#bbb";
          ctx.beginPath();
          ctx.arc(cx, cy, beadR, 0, Math.PI * 2);
          ctx.fill();
          ctx.strokeStyle = "rgba(0,0,0,0.18)";
          ctx.lineWidth = Math.max(1, cell * 0.04);
          ctx.beginPath();
          ctx.arc(cx, cy, beadR, 0, Math.PI * 2);
          ctx.stroke();
          ctx.fillStyle = "rgba(255,255,255,0.34)";
          ctx.beginPath();
          ctx.arc(cx - beadR * 0.28, cy - beadR * 0.28, beadR * 0.22, 0, Math.PI * 2);
          ctx.fill();
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
      ctx.fillText("\u8FD8\u6CA1\u6709\u53EF\u9884\u89C8\u7684\u62FC\u8C46", w / 2, h / 2 + 4);
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
  function placedCount2() {
    return Object.values(getPlacedCounts()).reduce((sum, count) => sum + count, 0);
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
    const { boardX, boardY, boardSize, cell } = layout;
    const pad = Math.max(5, cell * 0.24);
    if (ux < boardX - pad || uy < boardY - pad || ux > boardX + boardSize + pad || uy > boardY + boardSize + pad) return null;
    const clampedX = clamp(ux, boardX, boardX + boardSize - 0.01);
    const clampedY = clamp(uy, boardY, boardY + boardSize - 0.01);
    return {
      x: clamp(Math.floor((clampedX - boardX) / cell), 0, state.selectedPattern.size - 1),
      y: clamp(Math.floor((clampedY - boardY) / cell), 0, state.selectedPattern.size - 1)
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
  function drawShareImage(ctx, w, h, portrait) {
    const bg = ctx.createLinearGradient(0, 0, w, h);
    bg.addColorStop(0, "#fff7f3");
    bg.addColorStop(0.52, "#eef8f5");
    bg.addColorStop(1, "#f6f1ff");
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = "rgba(231, 100, 95, 0.12)";
    for (let i = 0; i < 18; i += 1) {
      const x = i * 137 % w;
      const y = i * 211 % h;
      ctx.beginPath();
      ctx.arc(x, y, 18 + i % 4 * 7, 0, Math.PI * 2);
      ctx.fill();
    }
    const margin = portrait ? 88 : 72;
    const artSize = portrait ? 760 : 610;
    const artX = (w - artSize) / 2;
    const artY = portrait ? 300 : 220;
    ctx.fillStyle = "#26242b";
    ctx.font = "800 54px Avenir Next, PingFang SC, Hiragino Sans GB, Microsoft YaHei, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("\u5973\u670B\u53CB\u7231\u73A9\u7684\u62FC\u8C46", w / 2, portrait ? 126 : 108);
    ctx.font = "700 32px Avenir Next, PingFang SC, Hiragino Sans GB, Microsoft YaHei, sans-serif";
    ctx.fillStyle = "#686572";
    ctx.fillText(`\u4ECA\u5929\u505A\uFF1A${state.selectedPattern.name}`, w / 2, portrait ? 178 : 154);
    drawShareArtwork(ctx, artX, artY, artSize);
    const statsY = artY + artSize + (portrait ? 86 : 70);
    drawShareStats(ctx, margin, statsY, w - margin * 2);
    ctx.textAlign = "center";
    ctx.fillStyle = "rgba(38, 36, 43, 0.72)";
    ctx.font = "700 28px Avenir Next, PingFang SC, Hiragino Sans GB, Microsoft YaHei, sans-serif";
    ctx.fillText("\u62FC\u8C46\u5DE5\u574A \xB7 \u6D4F\u89C8\u5668\u624B\u4F5C\u6A21\u62DF", w / 2, h - 76);
    ctx.font = "600 22px Avenir Next, PingFang SC, Hiragino Sans GB, Microsoft YaHei, sans-serif";
    ctx.fillStyle = "rgba(38, 36, 43, 0.46)";
    ctx.fillText(useMobileDirectPlacement() ? "\u4ECE\u8C46\u76D2\u9009\u8272\u3001\u76F4\u63A5\u6446\u653E\u5230\u71A8\u70EB\u5B9A\u578B" : "\u4ECE\u6563\u8C46\u3001\u8C46\u7B5B\u3001\u954A\u5B50\u5230\u71A8\u70EB\u5B9A\u578B", w / 2, h - 42);
    ctx.save();
    ctx.translate(w - 42, h * 0.55);
    ctx.rotate(-Math.PI / 2);
    ctx.fillStyle = "rgba(38, 36, 43, 0.18)";
    ctx.font = "800 24px Avenir Next, PingFang SC, Hiragino Sans GB, Microsoft YaHei, sans-serif";
    ctx.fillText("\u62FC\u8C46\u5DE5\u574A WATERMARK", 0, 0);
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
    const hasPlaced = placedCount2() > 0;
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
      ["\u56FE\u7EB8", state.selectedPattern.name],
      ["\u9897\u6570", `${getTargetTotal()}\u9897`],
      ["\u8272\u53F7", `${getPatternColors().length}\u8272`],
      ["\u8BC4\u7EA7", finalGrade()]
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
  function statusText() {
    const phase = state.phase;
    if (state.sandboxMode && phase === "place") {
      return useMobileDirectPlacement() ? "\u6C99\u76D2\u6A21\u5F0F\uFF1A\u81EA\u7531\u62FC\u6446\u4E2D\u3002\u4ECE\u8C46\u76D2\u9009\u8272\uFF0C\u76F4\u63A5\u70B9\u683C\u5B50\u6446\u653E\u3002" : "\u6C99\u76D2\u6A21\u5F0F\uFF1A\u81EA\u7531\u62FC\u6446\u4E2D\u3002\u70B9\u8C46\u7B5B\u53D6\u8C46\u3001\u4EFB\u610F\u6392\u5E03\uFF0C\u4E0D\u53D7\u56FE\u7EB8\u9650\u5236\u3002";
    }
    if (phase === "choose") return "\u9009\u62E9\u4E00\u5F20\u56FE\u7EB8\uFF0C\u5F00\u59CB\u4ECA\u5929\u7684\u624B\u4F5C\u3002";
    if (phase === "place") {
      if (state.spill) return "\u6709\u8C46\u5B50\u5012\u4E0B\u6765\u5361\u4F4F\u4E86\u3002\u53EF\u5148\u7EE7\u7EED\u6446\u653E\uFF0C\u71A8\u70EB\u524D\u518D\u5904\u7406\u3002";
      if (useMobileDirectPlacement()) {
        return `\u5DF2\u9009 ${beadLabel(state.selectedColor)} \xB7 \u70B9\u683C\u5B50\u653E\u7F6E\u6216\u66FF\u6362\u3002${state.lampOn ? " \u6295\u5F71\u5F00" : ""}`;
      }
      if (state.tool === "needle") {
        if (!state.trayColor) return `\u9488\u5DE5\u5177\u9700\u8981\u5148\u628A\u67D0\u4E2A\u8272\u53F7\u5012\u5165\u8C46\u7B5B\u3002${state.lampOn ? " \u6295\u5F71\u8272\u7A3F\u5DF2\u5F00\u542F\u3002" : " \u53EF\u6253\u5F00\u5DE5\u4F5C\u706F\u67E5\u770B\u6295\u5F71\u8272\u7A3F\u3002"} `;
        return `\u8C46\u7B5B ${state.trayBeans} \u9897 ${beadIds[state.trayColor]} \xB7 ${state.lampOn ? "\u6295\u5F71\u5F00" : "\u6295\u5F71\u5173"}`;
      }
      return state.tweezerBead ? `\u954A\u5B50\u5939\u7740 ${beadLabel(state.tweezerBead)} \xB7 ${state.lampOn ? "\u6295\u5F71\u5F00" : "\u6295\u5F71\u5173"}` : `\u70B9\u8C46\u7B5B\u5939\u4E00\u9897\uFF0C\u6216\u4ECE\u677F\u9762\u53D6\u4E00\u9897\uFF0C\u518D\u653E\u5230\u677F\u4E0A\u3002${state.lampOn ? " \u6295\u5F71\u8272\u7A3F\u5DF2\u5F00\u542F\u3002" : ""}`;
    }
    if (phase === "inspect") {
      if (state.spill) return "\u8FD8\u6709\u5012\u4E0B\u7684\u8C46\u5B50\u672A\u5904\u7406\u3002\u7EE7\u7EED\u71A8\u70EB\u4F1A\u7CCA\u574F\u8BE5\u4F4D\u7F6E\u3002";
      return state.errors.length ? "\u68C0\u67E5\u5230\u9700\u8981\u4FEE\u6B63\u7684\u4F4D\u7F6E\u3002" : "\u677F\u9762\u68C0\u67E5\u901A\u8FC7\uFF0C\u53EF\u4EE5\u76D6\u7EB8\u71A8\u70EB\u3002";
    }
    if (phase === "iron") return "\u6162\u6162\u79FB\u52A8\u71A8\u6597\uFF0C\u8BA9\u8C46\u5B50\u521A\u597D\u7C98\u8FDE\u3002";
    if (phase === "cool") return "\u7B49\u5F85\u51B7\u5374\uFF0C\u538B\u5E73\u8FB9\u7F18\uFF0C\u518D\u51C6\u5907\u53D6\u4E0B\u4F5C\u54C1\u3002";
    return `${state.selectedPattern.name}\u5B8C\u6210\uFF0C\u5DF2\u8FDB\u5165\u6536\u85CF\u9636\u6BB5\u3002`;
  }

  // src/utils.js
  function escapeHtml(value) {
    return String(value ?? "").replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#39;");
  }
  function prefersReducedMotion() {
    return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
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
      { text: "\u77ED\u7801\u5BFC\u5165\u6210\u529F", weight: 45 },
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
    }
  };
  function setUIActions(nextActions = {}) {
    uiActions = { ...uiActions, ...nextActions };
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
      <button type="button" class="pattern-color-chip" data-source-code="${item.sourceCode}" title="\u70B9\u51FB\u6362\u8272\uFF1A${beadIds[item.targetCode] || item.targetCode}" aria-label="\u6362\u8272 ${beadIds[item.targetCode] || item.targetCode}">
        <span class="dot" style="background:${palette[item.targetCode]}"></span>
        <span class="code">${beadIds[item.targetCode] || item.targetCode}</span>
        <span class="count">${item.count}</span>
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
    const visible = state.phase !== "choose";
    els.sideReference.hidden = !visible;
    if (!visible) {
      sidebarReferenceRenderKey = "hidden";
      return;
    }
    const pattern = state.selectedPattern;
    const size = pattern.size;
    const ctx = sideReferenceCtx;
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
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, pixelW, pixelH);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const w = cssW;
    const h = cssH;
    const cell = Math.max(2, Math.floor(Math.min((w - 24) / size, (h - 24) / size)));
    const gridSize = cell * size;
    const x0 = Math.floor((w - gridSize) / 2);
    const y0 = Math.floor((h - gridSize) / 2);
    const rows = effective.rows;
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
      els.sideReferenceMeta.textContent = `${pattern.name} \xB7 ${size}x${size}`;
    }
    if (els.sideReferenceLegend) {
      const counts = getTargetCounts(pattern);
      const list = Object.entries(counts).sort((a, b) => b[1] - a[1] || (beadIds[a[0]] || a[0]).localeCompare(beadIds[b[0]] || b[0], "zh-Hans-CN", { numeric: true })).slice(0, 8);
      els.sideReferenceLegend.innerHTML = list.map(([code, count]) => `
        <span class="side-reference-chip">
          <i style="background:${palette[code]}"></i>
          <b>${beadIds[code] || code}</b>
          <em>${count}</em>
        </span>
      `).join("");
    }
  }
  function renderPatterns() {
    els.patternList.innerHTML = "";
    const customPattern = findCustomPattern();
    const importRow = document.createElement("div");
    importRow.className = "pattern-import-row";
    const imageButton = document.createElement("button");
    imageButton.className = `pattern-import-half${customPattern && state.selectedPattern.id.startsWith("custom-") ? " active" : ""}`;
    imageButton.type = "button";
    imageButton.textContent = "\u5BFC\u5165\u56FE\u7247";
    imageButton.addEventListener("click", () => els.customImageInput?.click());
    const codeButton = document.createElement("button");
    codeButton.className = "pattern-import-half";
    codeButton.type = "button";
    codeButton.textContent = "\u5BFC\u5165\u77ED\u7801";
    codeButton.addEventListener("click", () => {
      uiActions.openImportCodeModal();
    });
    importRow.appendChild(imageButton);
    importRow.appendChild(codeButton);
    els.patternList.appendChild(importRow);
    patterns.forEach((pattern) => {
      const isCustom = pattern.id.startsWith("custom-");
      const displayPattern = isCustom ? pattern : resizePattern(pattern, state.patternSize);
      const safePatternName = escapeHtml(pattern.name);
      const safePatternMeta = escapeHtml(displayPattern.note || `${displayPattern.size}x${displayPattern.size}`);
      const button = document.createElement("button");
      button.className = `pattern-card${baseIdFor(state.selectedPattern) === pattern.id ? " active" : ""}`;
      button.type = "button";
      button.innerHTML = `
        <canvas class="pattern-thumb" width="58" height="58" aria-hidden="true"></canvas>
        <span><strong>${safePatternName}</strong><span>${safePatternMeta}</span></span>
      `;
      button.addEventListener("click", () => {
        uiActions.loadPattern(displayPattern, state.phase !== "choose");
        if (state.phase !== "choose") uiActions.setPhase("place");
        showToast(`\u5DF2\u6362\u6210 ${pattern.name}`);
      });
      els.patternList.appendChild(button);
      drawPatternThumb(button.querySelector("canvas"), displayPattern);
    });
  }
  function drawPatternThumb(canvas, pattern) {
    const dpr = Math.min(3, Math.max(1, window.devicePixelRatio || 1));
    const cssSize = canvas.clientWidth || Number(canvas.getAttribute("width")) || 58;
    const dim = Math.round(cssSize * dpr);
    if (canvas.width !== dim || canvas.height !== dim) {
      canvas.width = dim;
      canvas.height = dim;
    }
    const ctx = canvas.getContext("2d");
    const cell = dim / pattern.size;
    const rows = pattern.rows || [];
    ctx.clearRect(0, 0, dim, dim);
    ctx.fillStyle = "#f4f6f8";
    ctx.fillRect(0, 0, dim, dim);
    rows.forEach((row, y) => {
      [...row].forEach((code, x) => {
        if (code === ".") return;
        const px = Math.round(x * cell);
        const py = Math.round(y * cell);
        const pw = Math.round((x + 1) * cell) - px;
        const ph = Math.round((y + 1) * cell) - py;
        ctx.fillStyle = palette[code];
        ctx.fillRect(px, py, pw, ph);
      });
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
          if ((placedCount2() > 0 || state.fusedPieces.length > 0) && !window.confirm("\u56DE\u5230\u9009\u56FE\u4F1A\u79BB\u5F00\u5F53\u524D\u4F5C\u54C1\u7684\u8FDB\u5EA6\uFF0C\u786E\u5B9A\u5417\uFF1F")) {
            return;
          }
          uiActions.setPhase("choose");
          return;
        }
        const losesFused = state.fusedPieces.length > 0 && (target === "place" || target === "inspect" || target === "iron");
        if (losesFused && !window.confirm("\u56DE\u9000\u5230\u8BE5\u6B65\u4F1A\u6E05\u9664\u5DF2\u71A8\u70EB/\u51B7\u5374\u7684\u7ED3\u679C\uFF0C\u786E\u5B9A\u5417\uFF1F")) {
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
      els.currentPatternMeta.textContent = `${state.selectedPattern.size}\xD7${state.selectedPattern.size} \xB7 ${getTargetTotal()}\u9897 \xB7 ${colorCount}\u8272`;
    }
    if (els.currentPatternThumb) {
      drawPatternThumb(els.currentPatternThumb, state.selectedPattern);
    }
  }
  function renderControls() {
    els.stageControls.innerHTML = "";
    els.controlTitle.textContent = phases.find((phase) => phase.id === state.phase)?.name || "\u5DE5\u5177\u53F0";
    els.toolMeta.textContent = state.phase === "place" && !useMobileDirectPlacement() ? state.tool === "needle" ? "\u8C46\u9488" : `\u954A\u5B50${state.tweezerBead ? ` \xB7 ${beadIds[state.tweezerBead]}` : " \xB7 \u7A7A\u5939"}` : "";
    if (state.phase === "choose") {
      return;
    }
    if (state.phase === "place") {
      const placeHintText = state.spill ? "\u6709\u4E00\u9897\u8C46\u5B50\u5012\u4E0B\u6765\u5361\u4F4F\u4E86\u3002\u4F60\u53EF\u4EE5\u5148\u7EE7\u7EED\u6446\u653E\uFF0C\u71A8\u70EB\u524D\u8BB0\u5F97\u5904\u7406\u3002" : useMobileDirectPlacement() ? "\u4ECE\u8C46\u76D2\u9009\u989C\u8272\uFF0C\u70B9\u683C\u5B50\u653E\u7F6E\u6216\u66FF\u6362\uFF1B\u540C\u8272\u518D\u70B9\u4E00\u6B21\u4F1A\u53D6\u4E0B\u3002" : state.tool === "needle" ? `\u70B9\u51FB\u8C46\u76D2\u5012\u8C46\u8FDB\u7B5B\uFF1B\u70B9\u8C46\u7B5B\u67D0\u6761\u69FD\u7ED9\u8C46\u9488\u4E0A\u8C46\uFF08\u6700\u591A ${needleCapacity()} \u9897\uFF09\u3002` : state.tweezerBead ? `\u954A\u5B50\u6B63\u5939\u7740 ${beadLabel(state.tweezerBead)}\uFF0C\u70B9\u51FB\u7A7A\u683C\u653E\u4E0B\u3002` : "\u954A\u5B50\u53EF\u4ECE\u8C46\u7B5B\u70B9\u53D6\u4E00\u9897\uFF0C\u6216\u4ECE\u677F\u9762\u5939\u8D77\u4E00\u9897\u518D\u653E\u4E0B\u3002";
      const placeHintKey = state.spill ? `spill:${state.spill.index}:${state.spill.code}` : useMobileDirectPlacement() ? `mobile:${state.selectedColor}` : `${state.tool}:${state.trayColor || "-"}:${state.trayBeans}:${state.needleLoaded}:${state.tweezerBead || "-"}`;
      showPlaceHint(placeHintText, placeHintKey);
      addButton("\u68C0\u67E5\u4F5C\u54C1", "primary-button", () => uiActions.setPhase("inspect"));
      addButton("\u6E05\u7A7A\u677F\u9762", "danger-text-button", () => uiActions.clearBoard?.());
      return;
    }
    if (state.phase === "inspect") {
      const summary = inspectionSummary();
      addHint(state.sandboxMode ? "\u6C99\u76D2\u6A21\u5F0F\u4E0D\u505A\u6F0F\u653E/\u9519\u8272\u6821\u9A8C\uFF0C\u53EF\u76F4\u63A5\u8FDB\u5165\u71A8\u70EB\u3002" : `\u6F0F\u653E ${summary.missing}\uFF0C\u9519\u8272 ${summary.wrong}\uFF0C\u591A\u653E ${summary.extra}\u3002`);
      if (state.spill) {
        addHint("\u8FD8\u6709\u5012\u4E0B\u7684\u8C46\u5B50\u6CA1\u5939\u8D77\u3002\u7EE7\u7EED\u71A8\u70EB\u4F1A\u628A\u8FD9\u9897\u8C46\u7CCA\u5728\u677F\u9762\u4E0A\u3002");
      }
      const hintsOn = state.showHints;
      addControlRow([
        [hintsOn ? "\u9690\u85CF\u63D0\u793A" : "\u663E\u793A\u63D0\u793A", `inspect-action-btn ${hintsOn ? "active" : ""}`, () => {
          state.showHints = !state.showHints;
          markDirty();
        }, false, {
          icon: hintsOn ? '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3l18 18"/><path d="M9.88 5.07A11 11 0 0 1 12 5c5.5 0 9.27 4.07 10 7-0.42 1.66-1.66 3.6-3.5 5.06"/><path d="M6.13 6.13C4.06 7.62 2.59 9.79 2 12c0.73 2.93 4.5 7 10 7 1.7 0 3.27-0.38 4.66-1"/><path d="M10.59 10.59A2 2 0 0 0 13.41 13.41"/></svg>' : '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg>',
          ariaLabel: hintsOn ? "\u9690\u85CF\u63D0\u793A" : "\u663E\u793A\u63D0\u793A",
          title: hintsOn ? "\u9690\u85CF\u63D0\u793A" : "\u663E\u793A\u63D0\u793A"
        }],
        ["\u8FD4\u56DE\u4FEE\u6B63", "inspect-action-btn", () => uiActions.setPhase("place"), false, {
          icon: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 14 4 9 9 4"/><path d="M20 20v-7a4 4 0 0 0-4-4H4"/></svg>',
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
      if (!state.sandboxMode && state.errors.length > 0 && placementAccuracy() < 0.72) {
        addHint("\u8BEF\u5DEE\u8F83\u591A\uFF0C\u5EFA\u8BAE\u5148\u4FEE\u6B63\u518D\u71A8\u70EB\u3002");
      }
      return;
    }
    if (state.phase === "iron") {
      addHint("\u6309\u4F4F\u5E76\u79FB\u52A8\u71A8\u6597\uFF0C\u6162\u4E00\u70B9\u3001\u7A33\u4E00\u70B9\uFF0C\u8BA9\u8C46\u5B50\u521A\u597D\u7C98\u8FDE\u3002");
      addControlRow([
        ["\u67E5\u770B\u68C0\u67E5", "", () => uiActions.setPhase("inspect")],
        ["\u8FDB\u5165\u51B7\u5374", "primary-button", () => uiActions.setPhase("cool")]
      ]);
      return;
    }
    if (state.phase === "cool") {
      addHint("\u51B7\u5374\u8FC7\u7A0B\u4E2D\u538B\u5E73\u53EF\u4EE5\u51CF\u5C11\u7FD8\u66F2\u3002\u7B49\u5B83\u6162\u6162\u7A33\u4E0B\u6765\u518D\u53D6\u4E0B\u4F5C\u54C1\u3002");
      addControlRow([
        ["\u538B\u5E73", "", () => uiActions.pressFlat()],
        ["\u7FFB\u9762\u518D\u71A8", "", () => uiActions.flipAndIron(), state.flipCount >= 1]
      ]);
      addButton("\u5B8C\u6210\u6536\u85CF", "primary-button", () => uiActions.completeWork());
      if (state.cooling < 78) addHint("\u63D0\u524D\u53D6\u4E0B\u4E5F\u80FD\u5B8C\u6210\uFF0C\u4F46\u51B7\u5374\u4E0D\u8DB3\u4F1A\u5F71\u54CD\u6700\u7EC8\u8BC4\u7EA7\u3002");
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
      addHint(`\u8BC4\u7EA7 ${finalGrade()}\u3002\u53EF\u4EE5\u6362\u4E00\u79CD\u6210\u54C1\u5F62\u5F0F\u540E\u518D\u6B21\u4FDD\u5B58\u3002`);
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
    const trayLabel = state.trayColor ? beadIds[state.trayColor] : "\u7A7A";
    const needleCap = needleCapacity();
    const needleSlots = Array.from({ length: needleCap }, (_, i) => i < state.needleLoaded ? state.trayColor : null);
    const tweezerSlots = [state.tweezerBead];
    const needleFoot = state.trayColor ? `\u8C46\u7B5B ${trayLabel} \xB7 \u5269\u4F59 ${state.trayBeans}` : "\u5148\u5012\u5165\u4E00\u79CD\u989C\u8272\uFF0C\u518D\u4ECE\u8C46\u7B5B\u53D6\u8C46";
    const needleFootText = state.spill ? "\u5148\u7528\u954A\u5B50\u5939\u8D77\u5361\u4F4F\u8C46" : needleFoot;
    const tweezerFoot = state.tweezerBead ? `\u5939\u7740 ${beadIds[state.tweezerBead]}` : `\u4ECE\u8C46\u76D2\u5939\u4E00\u9897 ${beadIds[state.selectedColor]}`;
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
  var paletteRenderKey = "";
  function renderPalette() {
    if (state.phase === "inspect") {
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
    const codes = isMobile ? allCodes.filter((code) => (counts[code] || 0) > 0) : allCodes;
    const key = ["place", isMobile ? "m" : "d", state.selectedColor, state.tweezerBead || "", state.placedVersion, getPatternAnalysis().key].join(":");
    if (key === paletteRenderKey) return;
    paletteRenderKey = key;
    els.colorPalette.innerHTML = "";
    codes.forEach((code) => {
      const placed = placedCounts[code] || 0;
      const needed = counts[code] || 0;
      const inPattern = needed > 0;
      const remaining = Math.max(0, needed - placed);
      const isSelected = state.selectedColor === code;
      const button = document.createElement("button");
      const isHeld = !isMobile && state.tweezerBead === code;
      button.className = `color-chip${isSelected ? " active" : ""}${inPattern && !isMobile ? " needed" : ""}${isHeld ? " held" : ""}`;
      button.type = "button";
      button.title = `${beadLabel(code)}\uFF1A${placed}/${needed}`;
      const isTransparent = beadIds[code] === "H1";
      button.innerHTML = `
        <span class="swatch${isTransparent ? " is-transparent" : ""}" style="${isTransparent ? "" : `background:${palette[code]}`}"></span>
        <span class="chip-label">${beadIds[code] || code}</span>
        ${inPattern && isSelected ? `<span class="chip-count">${remaining}</span>` : ""}
      `;
      button.addEventListener("click", () => {
        state.selectedColor = code;
        if (state.phase === "place" && !isMobile) uiActions.pourSelectedColor?.();
        markDirty();
      });
      els.colorPalette.appendChild(button);
    });
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
    row.className = "control-row";
    [
      ["\u5BFC\u51FA\u7AD6\u56FE", () => uiActions.exportShareImage("portrait")],
      ["\u5BFC\u51FA\u65B9\u56FE", () => uiActions.exportShareImage("square")]
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
    cloudButton.textContent = "\u751F\u6210\u77ED\u7801";
    cloudButton.addEventListener("click", async () => {
      cloudButton.disabled = true;
      cloudButton.textContent = "\u751F\u6210\u4E2D";
      cloudResult.textContent = "";
      try {
        const share = await uiActions.createCloudShare();
        if (share?.shortId) {
          cloudResult.innerHTML = `<strong>${share.shortId}</strong><span>7\u5929\u5185\u6709\u6548</span>`;
        }
      } finally {
        cloudButton.disabled = false;
        cloudButton.textContent = "\u751F\u6210\u77ED\u7801";
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
      <span>${list}${stats.colors.length > 8 ? " \xB7 ..." : ""}</span>
    `;
  }
  function renderCollection() {
    if (!els.collectionPanel) return;
    els.collectionPanel.innerHTML = "";
    const collection2 = uiActions.getCollection?.() || [];
    if (!collection2.length) {
      const empty = document.createElement("div");
      empty.className = "empty-state";
      empty.textContent = "\u8FD8\u6CA1\u6709\u5B8C\u6210\u54C1";
      els.collectionPanel.appendChild(empty);
      return;
    }
    const toolbar = document.createElement("div");
    toolbar.className = "collection-toolbar";
    toolbar.innerHTML = `
      <span class="collection-toolbar-count">\u5171 ${collection2.length} \u4EF6</span>
      <button type="button" class="danger-button collection-clear-all">\u6E05\u7A7A\u4F5C\u54C1\u96C6</button>
    `;
    toolbar.querySelector(".collection-clear-all").addEventListener("click", () => {
      if (!collection2.length) return;
      if (!window.confirm("\u786E\u5B9A\u6E05\u7A7A\u6240\u6709\u4F5C\u54C1\uFF1F\u6B64\u64CD\u4F5C\u4E0D\u53EF\u64A4\u9500\u3002")) return;
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
            <span>${normalizeCraft(item.craft)} \xB7 \u8BC4\u7EA7 ${item.grade} \xB7 ${item.date}</span>
          </div>
        </button>
        <button type="button" class="collection-tile-delete" aria-label="\u5220\u9664\u8FD9\u4EF6\u4F5C\u54C1" title="\u5220\u9664">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-2 14a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
        </button>
      `;
      tile.querySelector(".collection-tile-body").addEventListener("click", () => enlargeCollectionEntry(item));
      tile.querySelector(".collection-tile-delete").addEventListener("click", (event) => {
        event.stopPropagation();
        if (!window.confirm(`\u5220\u9664 ${item.name}\uFF1F`)) return;
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
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    setupHiDpiCanvas(canvas, ctx);
    const rect = canvas.getBoundingClientRect();
    const w = rect.width;
    const h = rect.height;
    ctx.clearRect(0, 0, w, h);
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
        ctx.fillStyle = palette[code] || "#bbb";
        ctx.fill();
        ctx.fillStyle = "rgba(255,255,255,0.16)";
        ctx.beginPath();
        ctx.arc(cx - cell * 0.18, cy - cell * 0.18, cell * 0.12, 0, Math.PI * 2);
        ctx.fill();
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
    if (!els.collectionScreen) return;
    let viewer = els.collectionScreen.querySelector(".collection-enlarged");
    if (!viewer) {
      viewer = document.createElement("div");
      viewer.className = "collection-enlarged";
      viewer.innerHTML = `
        <button type="button" class="collection-enlarged-close" aria-label="\u5173\u95ED\u653E\u5927">\xD7</button>
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
    canvas.style.width = "min(640px, 78vh)";
    canvas.style.height = "min(640px, 78vh)";
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
    renderControls();
    renderToolRack();
    renderPalette();
    renderCustomStats();
    renderPatternColorStats();
    renderSidebarReference();
    const collection2 = uiActions.getCollection?.() || [];
    const counts = getTargetCounts();
    const colorCount = Object.keys(counts).length;
    if (els.patternMeta) els.patternMeta.textContent = `${state.selectedPattern.size}x${state.selectedPattern.size}`;
    if (els.targetCount) els.targetCount.textContent = `${getTargetTotal()} \u9897 / ${colorCount} \u8272`;
    if (els.collectionCount) els.collectionCount.textContent = String(collection2.length);
    if (els.settingsDot) els.settingsDot.hidden = collection2.length === 0;
    if (els.colorMeta) els.colorMeta.textContent = state.phase === "inspect" ? "\u68C0\u67E5\u8F85\u52A9" : beadLabel(state.selectedColor);
    if (els.rightPanelTitle) els.rightPanelTitle.textContent = state.phase === "inspect" ? "\u68C0\u67E5\u53F0" : "\u8C46\u76D2";
    if (els.sandboxButton) {
      const beakerIcon = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 3h6"/><path d="M10 3v6.5L5 19a1.6 1.6 0 0 0 1.4 2.4h11.2A1.6 1.6 0 0 0 19 19l-5-9.5V3"/><path d="M7.5 14h9"/></svg>';
      const loupeIcon = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.2-3.2"/></svg>';
      const stateLabel = state.sandboxMode ? "\u5F00" : "\u5173";
      els.sandboxButton.innerHTML = `${state.sandboxMode ? beakerIcon : loupeIcon}<span class="sandbox-state">${stateLabel}</span>`;
      els.sandboxButton.title = state.sandboxMode ? "\u6C99\u76D2\uFF1A\u5F00\uFF08\u81EA\u7531\u62FC\u6446\u4E0D\u6821\u9A8C\uFF09" : "\u6C99\u76D2\uFF1A\u5173\uFF08\u6309\u56FE\u7EB8\u6821\u9A8C\uFF09";
      els.sandboxButton.setAttribute("aria-label", `\u6C99\u76D2\u6A21\u5F0F\uFF1A${stateLabel}`);
      els.sandboxButton.setAttribute("aria-pressed", state.sandboxMode ? "true" : "false");
      els.sandboxButton.classList.toggle("active", state.sandboxMode);
    }
    if (els.chooseStartButton) els.chooseStartButton.hidden = state.phase !== "choose";
    if (els.bgThemeSelect) els.bgThemeSelect.value = state.bgTheme;
    if (els.topToolStyleSelect) {
      if (!els.topToolStyleSelect.options.length) {
        const options = Object.entries(toolStyles).map(([id, style]) => `<option value="${id}">${style.name}</option>`).join("");
        els.topToolStyleSelect.innerHTML = options;
      }
      els.topToolStyleSelect.value = state.toolStyle;
    }
    const toolStyleField = els.topToolStyleSelect?.closest(".tool-style-picker");
    if (toolStyleField) {
      toolStyleField.style.display = state.appMode === "gallery" || useMobileDirectPlacement() ? "none" : "";
    }
    if (els.statusLine) {
      const phaseObj = phases.find((p) => p.id === state.phase);
      els.statusLine.textContent = phaseObj?.name ?? statusText();
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

  // src/pattern-code.js
  var PATTERN_CODE_PREFIX = "BEAM1";
  var VALUE_ALPHABET = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  var RUN_SEPARATOR = ".";
  var PALETTE_SEPARATOR = "_";
  var EMPTY_PALETTE = "-";
  var EMPTY_CELL = ".";
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
    if (width !== height) throw new Error("Pattern code currently supports square patterns only.");
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
    if (!width || !height || width !== height) {
      throw new Error("Pattern code currently supports square patterns only.");
    }
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
      size: width,
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
    const source = String(text || "").trim();
    if (cloudShortIdPattern.test(source)) return source;
    const match = source.match(/[23456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]{8}/);
    return match && cloudShortIdPattern.test(match[0]) ? match[0] : "";
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
  function renderGallery() {
    if (!els.galleryGrid || !els.galleryEmpty) return;
    els.galleryGrid.innerHTML = "";
    const items = Array.isArray(galleryItems) ? galleryItems : [];
    els.galleryEmpty.hidden = items.length > 0;
    if (items.length === 0) {
      const galleryIcon = '<svg class="gallery-empty-icon" viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7 8h.01"/><path d="m3 16 4.5-4.5a2 2 0 0 1 2.8 0L14 15"/><path d="m13 14 1.5-1.5a2 2 0 0 1 2.8 0L21 16"/></svg>';
      if (!galleryLoaded) {
        els.galleryEmpty.innerHTML = `<p class="gallery-empty-text">\u6B63\u5728\u8BFB\u53D6\u753B\u5ECA\u2026</p>`;
      } else if (galleryError) {
        els.galleryEmpty.innerHTML = `${galleryIcon}<p class="gallery-empty-text">\u753B\u5ECA\u8BFB\u53D6\u5931\u8D25</p><button type="button" class="ghost-button" data-gallery-retry>\u70B9\u6B64\u91CD\u8BD5</button>`;
        els.galleryEmpty.querySelector("[data-gallery-retry]")?.addEventListener("click", () => {
          void loadGallery();
        });
      } else {
        els.galleryEmpty.innerHTML = `${galleryIcon}<p class="gallery-empty-text">\u753B\u5ECA\u8FD8\u6CA1\u6709\u516C\u5F00\u56FE\u7EB8</p><p class="gallery-empty-sub">\u6765\u5F53\u7B2C\u4E00\u4E2A\u6295\u7A3F\u7684\u4EBA\u5427</p><button type="button" class="primary-button" data-gallery-submit>\u6295\u7A3F\u56FE\u7EB8</button>`;
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
      const safeSize = escapeHtml(`${pattern.size}x${pattern.size}`);
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
    const extracted = extractPatternCode(raw);
    if (extracted) {
      decodePatternCode(extracted);
      return extracted;
    }
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
      showToast("\u8BF7\u7C98\u8D34\u56FE\u7EB8\u7801\u6216\u77ED\u7801\u3002");
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
      showToast("\u6295\u7A3F\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5\u56FE\u7EB8\u7801\u6216\u7A0D\u540E\u518D\u8BD5\u3002");
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
  function applyImportedPattern(decoded, name = "\u5BFC\u5165\u56FE\u7EB8") {
    const seedText = `${name}|${decoded.size}|${(decoded.rows || []).join("")}`;
    const imported = {
      id: `custom-${Date.now()}`,
      name,
      size: decoded.size,
      rows: decoded.rows,
      craft: decoded.craft || state.craft,
      note: pickCustomPatternNote("imported", decoded.size, seedText)
    };
    for (let i = patterns.length - 1; i >= 0; i -= 1) {
      if (patterns[i].id.startsWith("custom-")) patterns.splice(i, 1);
    }
    patterns.unshift(imported);
    galleryActions.loadPattern(imported, false);
    state.patternsDirty = true;
    galleryActions.uiRenderUI();
    showToast(`\u5DF2\u5BFC\u5165\u56FE\u7EB8\uFF1A${decoded.size}x${decoded.size}\u3002`);
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
        await autoCopyText(
          share.shortId,
          `\u77ED\u7801\u5DF2\u590D\u5236\uFF1A${share.shortId}`,
          `\u77ED\u7801\u5DF2\u751F\u6210\uFF1A${share.shortId}\uFF08\u590D\u5236\u5931\u8D25\uFF0C\u8BF7\u624B\u52A8\u590D\u5236\uFF09`
        );
      }
      return share;
    } catch {
      showToast("\u77ED\u7801\u670D\u52A1\u6682\u65F6\u4E0D\u53EF\u7528\u3002");
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
    const localCode = extractPatternCode(raw);
    if (localCode) {
      try {
        const decoded = decodePatternCode(localCode);
        applyImportedPattern(decoded);
        return true;
      } catch {
        showToast("\u77ED\u7801\u65E0\u6548\uFF0C\u5BFC\u5165\u5931\u8D25\u3002");
        return false;
      }
    }
    const shortId = extractCloudShortId(raw);
    if (!shortId) {
      showToast("\u77ED\u7801\u65E0\u6548\u3002");
      return false;
    }
    try {
      const share = await requestShareApi("/api/share/open", { shortId });
      const decoded = decodePatternCode(share.patternCode, { name: share.name });
      applyImportedPattern(decoded, share.name || "\u5BFC\u5165\u56FE\u7EB8");
      return true;
    } catch {
      showToast("\u77ED\u7801\u65E0\u6548\u6216\u5DF2\u8FC7\u671F\u3002");
      return false;
    }
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
    size: 24,
    width: 24,
    height: 24,
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
    shapeDragEnd: null
  };
  var drawKbdNav = { up: false, down: false, left: false, right: false, zoomIn: false, zoomOut: false };
  var drawPointers = {};
  var drawGesture = null;
  var drawRenderKey = "";
  var minDrawDimension = 3;
  var maxDrawDimension = 100;
  function normalizeDrawDimension(value, fallback = 24) {
    const parsed = Number.parseInt(value, 10);
    const fallbackValue = Number.parseInt(fallback, 10);
    if (!Number.isFinite(parsed)) {
      return clamp(Number.isFinite(fallbackValue) ? fallbackValue : 24, minDrawDimension, maxDrawDimension);
    }
    return clamp(parsed, minDrawDimension, maxDrawDimension);
  }
  function normalizeDrawSizeValues(widthValue, heightValue, fallbackWidth = drawWidth(), fallbackHeight = drawHeight()) {
    return {
      width: normalizeDrawDimension(widthValue, fallbackWidth),
      height: normalizeDrawDimension(heightValue, fallbackHeight)
    };
  }
  function drawWidth() {
    return drawState.width || drawState.size || 24;
  }
  function drawHeight() {
    return drawState.height || drawState.size || 24;
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
    const cell = Math.floor(Math.min(cssW / width, cssH / height));
    const gridW = cell * width;
    const gridH = cell * height;
    const gridSize = Math.max(gridW, gridH);
    const x0 = Math.floor((cssW - gridW) / 2);
    const y0 = Math.floor((cssH - gridH) / 2);
    const cx = x0 + gridW / 2;
    const cy = y0 + gridH / 2;
    return { cssW, cssH, width, height, size: Math.max(width, height), cell, gridW, gridH, gridSize, x0, y0, cx, cy };
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
  function setDrawSizeControlValue(width = drawWidth(), height = drawHeight()) {
    const { width: normalizedWidth, height: normalizedHeight } = normalizeDrawSizeValues(width, height);
    if (els.drawSizeValue) els.drawSizeValue.textContent = `${normalizedWidth}\xD7${normalizedHeight}`;
    if (els.drawWidthInput) els.drawWidthInput.value = String(normalizedWidth);
    if (els.drawHeightInput) els.drawHeightInput.value = String(normalizedHeight);
  }
  function resizeDrawGrid(oldGrid, oldWidth, oldHeight, newWidth, newHeight, anchorRow, anchorCol) {
    const offsetX = Math.round(anchorCol / 2 * (newWidth - oldWidth));
    const offsetY = Math.round(anchorRow / 2 * (newHeight - oldHeight));
    const newGrid = [];
    for (let ny = 0; ny < newHeight; ny += 1) {
      for (let nx = 0; nx < newWidth; nx += 1) {
        const ox = nx - offsetX;
        const oy = ny - offsetY;
        newGrid.push(
          ox >= 0 && ox < oldWidth && oy >= 0 && oy < oldHeight ? oldGrid[oy * oldWidth + ox] : "."
        );
      }
    }
    return newGrid;
  }
  var drawResizePending = { width: 0, height: 0, anchorRow: 1, anchorCol: 1 };
  function openDrawResizeModal(newWidth, newHeight) {
    drawResizePending.width = newWidth;
    drawResizePending.height = newHeight;
    drawResizePending.anchorRow = 1;
    drawResizePending.anchorCol = 1;
    if (els.drawAnchorGrid) {
      els.drawAnchorGrid.querySelectorAll(".anchor-cell").forEach((btn) => {
        const r = Number(btn.dataset.row);
        const c = Number(btn.dataset.col);
        btn.setAttribute("aria-pressed", r === 1 && c === 1 ? "true" : "false");
      });
    }
    if (els.drawResizeModal) {
      els.drawResizeModal.classList.add("show");
      els.drawResizeModal.setAttribute("aria-hidden", "false");
    }
  }
  function closeDrawResizeModal(restoreSelectValue) {
    if (els.drawResizeModal) {
      els.drawResizeModal.classList.remove("show");
      els.drawResizeModal.setAttribute("aria-hidden", "true");
    }
    if (restoreSelectValue) setDrawSizeControlValue(drawWidth(), drawHeight());
  }
  var drawCodeMode = "import";
  function openDrawCodeModal(mode, value = "") {
    if (!els.drawCodeModal) return;
    drawCodeMode = mode;
    const isExport = mode === "export";
    const isBead = mode === "import-bead";
    if (els.drawCodeModalTitle) els.drawCodeModalTitle.textContent = isExport ? "\u5BFC\u51FA\u56FE\u7EB8" : "\u5BFC\u5165\u56FE\u7EB8";
    if (els.drawCodeHint) {
      els.drawCodeHint.textContent = isExport ? "\u5DF2\u751F\u6210\u56FE\u7EB8\u77ED\u7801\u6216\u56FE\u7EB8\u7801\uFF0C\u53EF\u76F4\u63A5\u590D\u5236\u5206\u4EAB\u3002" : isBead ? "\u7C98\u8D34\u56FE\u7EB8\u7801\u6216\u77ED\u7801\uFF0C\u5BFC\u5165\u5230\u62FC\u8C46\u53F0\u3002" : "\u7C98\u8D34\u56FE\u7EB8\u7801\u6216\u77ED\u7801\uFF0C\u7136\u540E\u5BFC\u5165\u5230\u7ED8\u56FE\u53F0\u3002";
    }
    if (els.drawCodeInput) {
      els.drawCodeInput.value = value;
      els.drawCodeInput.readOnly = isExport;
      els.drawCodeInput.placeholder = isExport ? "\u8FD9\u91CC\u4F1A\u663E\u793A\u5BFC\u51FA\u7684\u56FE\u7EB8\u7801\u6216\u77ED\u7801" : "\u7C98\u8D34\u56FE\u7EB8\u7801\u6216\u77ED\u7801";
    }
    if (els.drawCodeCopyBtn) els.drawCodeCopyBtn.hidden = !isExport;
    if (els.drawCodeImportConfirmBtn) els.drawCodeImportConfirmBtn.hidden = isExport;
    els.drawCodeModal.classList.add("show");
    els.drawCodeModal.setAttribute("aria-hidden", "false");
    requestAnimationFrame(() => {
      if (isExport) els.drawCodeCopyBtn?.focus();
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
  function squareDrawRowsFromGrid() {
    const rows = drawRowsFromGrid();
    const width = drawWidth();
    const height = drawHeight();
    const size = Math.max(width, height);
    return Array.from({ length: size }, (_, y) => {
      const row = y < height ? rows[y] : "";
      return row.padEnd(size, ".");
    });
  }
  function makeDrawPattern(name = "\u7ED8\u5236\u56FE\u7EB8") {
    ensureDrawGrid();
    const rows = squareDrawRowsFromGrid();
    const width = drawWidth();
    const height = drawHeight();
    const size = Math.max(width, height);
    return {
      id: "draw-export",
      name,
      size,
      width: size,
      height: size,
      sourceWidth: width,
      sourceHeight: height,
      rows,
      craft: "\u539F\u7248"
    };
  }
  function showDrawCodeOutput(value) {
    openDrawCodeModal("export", value);
  }
  async function exportDrawPatternCode(pattern, successMessage = "\u56FE\u7EB8\u7801\u5DF2\u590D\u5236\u3002") {
    const code = encodePatternCode(pattern);
    showDrawCodeOutput(code);
    await drawActions.autoCopyText(code, successMessage, "\u56FE\u7EB8\u7801\u5DF2\u751F\u6210\uFF08\u590D\u5236\u5931\u8D25\uFF0C\u8BF7\u624B\u52A8\u590D\u5236\uFF09\u3002");
  }
  function loadDrawRows(rows) {
    const height = rows.length;
    const width = Math.max(1, ...rows.map((row) => String(row || "").length));
    const normalizedSize = normalizeDrawSizeValues(width, height, 24, 24);
    drawState.width = normalizedSize.width;
    drawState.height = normalizedSize.height;
    drawState.size = Math.max(drawState.width, drawState.height);
    drawState.grid = [];
    for (let y = 0; y < drawState.height; y += 1) {
      const row = rows[y] || "";
      for (let x = 0; x < drawState.width; x += 1) {
        const code = row[x] || ".";
        drawState.grid.push(code === "." || palette[code] ? code : ".");
      }
    }
    setDrawSizeControlValue(drawState.width, drawState.height);
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
    drawState.undoStack.push([...drawState.grid]);
    if (drawState.undoStack.length > DRAW_UNDO_LIMIT) drawState.undoStack.shift();
    updateUndoButton();
  }
  function doUndo() {
    if (!drawState.undoStack.length) return;
    drawState.grid = drawState.undoStack.pop();
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
    return cells;
  }
  function applyDrawToolAt(x, y) {
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
    const ctx = canvas.getContext("2d");
    const dpr = Math.min(2, Math.max(1, window.devicePixelRatio || 1));
    const cssW = Math.max(220, Math.round(canvas.clientWidth || 640));
    const cssH = Math.max(220, Math.round(canvas.clientHeight || 640));
    const pxW = Math.round(cssW * dpr);
    const pxH = Math.round(cssH * dpr);
    if (canvas.width !== pxW || canvas.height !== pxH) {
      canvas.width = pxW;
      canvas.height = pxH;
    }
    const width = drawWidth();
    const height = drawHeight();
    const cell = Math.floor(Math.min(cssW / width, cssH / height));
    const gridW = cell * width;
    const gridH = cell * height;
    const x0 = Math.floor((cssW - gridW) / 2);
    const y0 = Math.floor((cssH - gridH) / 2);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, pxW, pxH);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.fillStyle = "#f5f8fb";
    ctx.fillRect(0, 0, cssW, cssH);
    const v = drawState.view;
    const cx = x0 + gridW / 2;
    const cy = y0 + gridH / 2;
    ctx.save();
    ctx.translate(cx + v.panX, cy + v.panY);
    ctx.scale(v.scale, v.scale);
    ctx.translate(-cx, -cy);
    for (let y = 0; y < height; y += 1) {
      for (let x = 0; x < width; x += 1) {
        const code = drawState.grid[drawIndex(x, y, width)];
        if (code && code !== ".") {
          ctx.fillStyle = palette[code] || "#9aa4b3";
          ctx.fillRect(x0 + x * cell, y0 + y * cell, cell, cell);
        } else {
          ctx.fillStyle = (x + y) % 2 ? "#f0f4f9" : "#ffffff";
          ctx.fillRect(x0 + x * cell, y0 + y * cell, cell, cell);
        }
      }
    }
    ctx.strokeStyle = "rgba(116, 126, 147, 0.26)";
    ctx.lineWidth = 1;
    for (let i = 0; i <= width; i += 1) {
      const offset = i * cell;
      ctx.beginPath();
      ctx.moveTo(x0 + offset + 0.5, y0 + 0.5);
      ctx.lineTo(x0 + offset + 0.5, y0 + gridH + 0.5);
      ctx.stroke();
    }
    for (let i = 0; i <= height; i += 1) {
      const offset = i * cell;
      ctx.beginPath();
      ctx.moveTo(x0 + 0.5, y0 + offset + 0.5);
      ctx.lineTo(x0 + gridW + 0.5, y0 + offset + 0.5);
      ctx.stroke();
    }
    ctx.strokeStyle = "rgba(69, 93, 122, 0.38)";
    ctx.lineWidth = 1.2;
    ctx.strokeRect(x0 + 0.5, y0 + 0.5, gridW, gridH);
    if (drawState.tool === "shape" && drawState.shapeDrag && drawState.shapeDragEnd) {
      const previewCells = getShapeCells(
        drawState.shapeDrag.x,
        drawState.shapeDrag.y,
        drawState.shapeDragEnd.x,
        drawState.shapeDragEnd.y
      );
      ctx.save();
      ctx.globalAlpha = 0.55;
      ctx.fillStyle = palette[drawState.selectedColor] || "#9aa4b3";
      for (const [px, py] of previewCells) {
        ctx.fillRect(x0 + px * cell, y0 + py * cell, cell, cell);
      }
      ctx.restore();
    }
    ctx.restore();
  }
  function renderDrawPalette() {
    if (!els.drawPalette) return;
    ensureDrawPaletteColor();
    const codes = allColorCodes();
    const key = `${drawState.selectedColor}:${drawState.recentColors.join(",")}:${codes.join(",")}`;
    if (key === drawRenderKey) return;
    drawRenderKey = key;
    if (els.drawPaletteMeta) {
      els.drawPaletteMeta.textContent = `221\u8272\u677F`;
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
      const active = button.dataset.drawTool === drawState.tool;
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", active ? "true" : "false");
    });
    const shapeBtn = els.drawingStudio.querySelector("[data-draw-tool='shape']");
    if (shapeBtn) {
      const isCircle = drawState.shapeMode === "circle";
      shapeBtn.setAttribute("aria-label", isCircle ? "\u5706\u5F62" : "\u77E9\u5F62");
      shapeBtn.innerHTML = isCircle ? `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/></svg>` : `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/></svg>`;
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
    const rows = squareDrawRowsFromGrid();
    const beadCount = rows.join("").replace(/\./g, "").length;
    if (!beadCount) {
      showToast("\u8BF7\u5148\u5728\u7ED8\u56FE\u53F0\u653E\u4E00\u4E9B\u989C\u8272\u3002");
      return;
    }
    const sourceWidth = drawWidth();
    const sourceHeight = drawHeight();
    const size = Math.max(sourceWidth, sourceHeight);
    const pattern = {
      id: "custom-draw",
      name: "\u7ED8\u5236\u56FE\u7EB8",
      size,
      width: size,
      height: size,
      craft: "\u539F\u7248",
      rows,
      sourceRows: rows,
      sourceSize: size,
      sourceWidth,
      sourceHeight,
      note: pickCustomPatternNote("draw", size, rows.join(""))
    };
    for (let i = patterns.length - 1; i >= 0; i -= 1) {
      if (patterns[i].id.startsWith("custom-")) patterns.splice(i, 1);
    }
    patterns.unshift(pattern);
    drawActions.loadPattern(pattern, false);
    drawActions.setAppMode("bead");
    showToast("\u7ED8\u56FE\u5DF2\u751F\u6210\u56FE\u7EB8\uFF0C\u5F00\u59CB\u62FC\u8C46\u3002");
  }
  function initDrawingStudioEvents() {
    els.drawingBackButton?.addEventListener("click", () => {
      drawActions.setAppMode("home");
    });
    els.drawSettingsButton?.addEventListener("click", () => drawActions.openSettingsModal());
    els.drawResetButton?.addEventListener("click", () => {
      ensureDrawGrid();
      const hasContent = drawState.grid.some((cell) => cell && cell !== ".");
      if (hasContent && !window.confirm("\u6E05\u7A7A\u4F1A\u4E22\u5931\u5F53\u524D\u7ED8\u56FE\uFF0C\u786E\u5B9A\u5417\uFF1F")) return;
      drawState.grid = createDrawGrid(drawWidth(), drawHeight());
      drawState.lastCellKey = "";
      paintDrawCanvas();
      showToast("\u7ED8\u56FE\u5DF2\u6E05\u7A7A\u3002");
    });
    function commitDrawSizeControlValue(widthValue = els.drawWidthInput?.value, heightValue = els.drawHeightInput?.value) {
      const { width: newWidth, height: newHeight } = normalizeDrawSizeValues(widthValue, heightValue);
      if (newWidth === drawWidth() && newHeight === drawHeight()) {
        setDrawSizeControlValue(drawWidth(), drawHeight());
        return;
      }
      setDrawSizeControlValue(newWidth, newHeight);
      openDrawResizeModal(newWidth, newHeight);
    }
    [els.drawWidthInput, els.drawHeightInput].forEach((input) => {
      input?.addEventListener("input", () => {
        const { width, height } = normalizeDrawSizeValues(
          els.drawWidthInput?.value,
          els.drawHeightInput?.value
        );
        if (els.drawSizeValue) els.drawSizeValue.textContent = `${width}\xD7${height}`;
      });
      input?.addEventListener("keydown", (event) => {
        if (event.key === "Enter") commitDrawSizeControlValue();
      });
    });
    els.drawSizeApplyButton?.addEventListener("click", () => {
      commitDrawSizeControlValue();
    });
    els.drawAnchorGrid?.addEventListener("click", (event) => {
      const cell = event.target.closest(".anchor-cell");
      if (!cell) return;
      drawResizePending.anchorRow = Number(cell.dataset.row);
      drawResizePending.anchorCol = Number(cell.dataset.col);
      els.drawAnchorGrid.querySelectorAll(".anchor-cell").forEach((btn) => {
        btn.setAttribute("aria-pressed", btn === cell ? "true" : "false");
      });
    });
    els.drawResizeConfirmBtn?.addEventListener("click", () => {
      const { width: newWidth, height: newHeight } = normalizeDrawSizeValues(
        drawResizePending.width,
        drawResizePending.height
      );
      const { anchorRow, anchorCol } = drawResizePending;
      const oldGrid = drawState.grid.slice();
      const oldWidth = drawWidth();
      const oldHeight = drawHeight();
      drawState.width = newWidth;
      drawState.height = newHeight;
      drawState.size = Math.max(newWidth, newHeight);
      drawState.grid = resizeDrawGrid(oldGrid, oldWidth, oldHeight, newWidth, newHeight, anchorRow, anchorCol);
      drawState.lastCellKey = "";
      drawState.undoStack = [];
      drawState.undoStrokeSnapshotTaken = false;
      if (els.drawUndoButton) els.drawUndoButton.disabled = true;
      setDrawSizeControlValue(newWidth, newHeight);
      closeDrawResizeModal(false);
      renderDrawStudio();
      showToast(`\u753B\u5E03\u5DF2\u8C03\u6574\u4E3A ${newWidth}x${newHeight}\u3002`);
    });
    [els.drawResizeCancelBtn, els.drawResizeCloseBtn].forEach((btn) => {
      btn?.addEventListener("click", () => closeDrawResizeModal(true));
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
        }
      }
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
    els.drawShortCodeButton?.addEventListener("click", async () => {
      const button = els.drawShortCodeButton;
      const pattern = makeDrawPattern();
      if (button) {
        button.disabled = true;
        button.textContent = "\u5BFC\u51FA\u4E2D";
      }
      const controller = new AbortController();
      const timeout = window.setTimeout(() => controller.abort(), 5e3);
      try {
        const share = await drawActions.requestCloudShareForPattern(pattern, { signal: controller.signal });
        window.clearTimeout(timeout);
        if (share?.shortId) {
          showDrawCodeOutput(share.shortId);
          await drawActions.autoCopyText(
            share.shortId,
            `\u77ED\u7801\u5DF2\u590D\u5236\uFF1A${share.shortId}`,
            `\u77ED\u7801\u5DF2\u751F\u6210\uFF1A${share.shortId}\uFF08\u590D\u5236\u5931\u8D25\uFF0C\u8BF7\u624B\u52A8\u590D\u5236\uFF09`
          );
        } else {
          await exportDrawPatternCode(pattern, "\u56FE\u7EB8\u7801\u5DF2\u590D\u5236\u3002");
        }
      } catch {
        window.clearTimeout(timeout);
        await exportDrawPatternCode(pattern, "\u77ED\u7801\u8FDE\u63A5\u5931\u8D25\uFF0C\u5DF2\u6539\u4E3A\u590D\u5236\u56FE\u7EB8\u7801\u3002");
      }
      if (button) {
        button.disabled = false;
        button.textContent = "\u5BFC\u51FA\u56FE\u7EB8";
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
      const extracted = extractPatternCode(raw);
      const shortId = extractCloudShortId(raw);
      if (!extracted && !shortId) {
        showToast("\u8BF7\u5148\u7C98\u8D34\u56FE\u7EB8\u7801\u6216\u77ED\u7801\u3002");
        return;
      }
      try {
        const code = extracted || (await requestShareApi("/api/share/open", { shortId })).patternCode;
        const decoded = decodePatternCode(code);
        loadDrawRows(decoded.rows);
        closeDrawCodeModal();
        showToast(`\u5DF2\u5BFC\u5165\u56FE\u7EB8\uFF1A${decoded.size}x${decoded.size}\u3002`);
      } catch (error) {
        showToast("\u56FE\u7EB8\u7801\u65E0\u6548\u6216\u5DF2\u8FC7\u671F\u3002");
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
        const rect = els.drawCanvas.getBoundingClientRect();
        drawPointers[event.pointerId] = { x: event.clientX - rect.left, y: event.clientY - rect.top };
        if (Object.keys(drawPointers).length >= 2) {
          drawState.drawing = false;
          drawState.lastCellKey = "";
          drawState.shapeDrag = null;
          startDrawGesture();
        } else if (drawState.tool === "shape") {
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
        if (drawState.tool === "shape") {
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
          if (drawState.tool === "shape" && drawState.shapeDrag && drawState.shapeDragEnd) {
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

  // src/image-convert.js
  function loadImageFromDataUrl(dataUrl) {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = reject;
      image.src = dataUrl;
    });
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
        const index = y * width + x;
        const r2 = data[offset];
        const g2 = data[offset + 1];
        const b2 = data[offset + 2];
        const a = data[offset + 3];
        if (a < 64) continue;
        if (removeWhite && externalWhiteMask?.[index]) continue;
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
    const passes = sourceProfile?.logoLike ? 1 : size <= 20 ? 2 : 3;
    const softThreshold = sourceProfile?.logoLike ? 26e-4 : 19e-4;
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
    const darkDetail = /* @__PURE__ */ new Set(["K", "k", "D", "d", "N", "n", "b"]);
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
        denoiseLevel: pattern.sourceDenoiseLevel ?? state.customDenoiseLevel,
        excludedCodes: hidden,
        allowPaletteExpansionOnExclude: true
      });
      state.customHiddenRecalcCache[id] = {
        signature,
        rows: result.rows,
        stats: result.stats
      };
      if (baseIdFor(state.selectedPattern) === id && customRecalcSignature(state.selectedPattern) === signature) {
        invalidateEffectiveMap(state.selectedPattern);
        state.previewDirty = true;
        const available = getPatternColors();
        if (!available.includes(state.selectedColor)) state.selectedColor = available[0] || state.selectedColor;
        showToast("\u5DF2\u6309\u539F\u56FE\u5B8C\u6210\u91CD\u7B97\u3002");
        markDirty();
      }
      return true;
    } catch (error) {
      showToast("\u6309\u539F\u56FE\u91CD\u7B97\u5931\u8D25\u3002");
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
  function setPatternSizePreview(size) {
    const normalized = normalizePatternSize(size);
    state.patternSize = normalized;
    setSizeControls(normalized);
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
    customPatternActions.loadPattern(resizePattern(base, normalized), state.phase !== "choose");
    showToast(`\u56FE\u7EB8\u5DF2\u8C03\u6574\u4E3A ${normalized}x${normalized}\u3002`);
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
          id: "custom-user",
          name: "\u81EA\u5B9A\u4E49\u56FE\u7EB8",
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
        for (let i = patterns.length - 1; i >= 0; i -= 1) {
          if (patterns[i].id.startsWith("custom-")) patterns.splice(i, 1);
        }
        patterns.unshift(pattern);
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
    let sizeSliderTimer = null;
    els.patternSizeSlider?.addEventListener("input", () => {
      const size = normalizePatternSize(els.patternSizeSlider.value);
      setPatternSizePreview(size);
      if (sizeSliderTimer) window.clearTimeout(sizeSliderTimer);
      sizeSliderTimer = window.setTimeout(() => applyPatternSize(size), 110);
    });
    els.patternSizeSlider?.addEventListener("change", () => {
      const size = normalizePatternSize(els.patternSizeSlider.value);
      setPatternSizePreview(size);
      applyPatternSize(size);
    });
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
  var autoSaveTimer = 0;
  function clearStoredSession() {
    try {
      localStorage.removeItem(sessionKey);
    } catch {
    }
  }
  function clearAutoSave() {
    window.clearTimeout(autoSaveTimer);
    clearStoredSession();
  }
  function normalizePlaced(placed, total) {
    if (!Array.isArray(placed)) return Array(total).fill(null);
    return Array.from({ length: total }, (_, index) => {
      const code = placed[index];
      return code && palette[code] ? code : null;
    });
  }
  function normalizeHeat(heat, total) {
    if (!Array.isArray(heat)) return Array(total).fill(0);
    return Array.from({ length: total }, (_, index) => Number(heat[index]) || 0);
  }
  function normalizePatternSizeFromSession(value, fallback) {
    if (value === void 0 || value === null) return normalizePatternSize(fallback);
    const parsed = Number.parseInt(value, 10);
    if (!Number.isFinite(parsed)) return null;
    return normalizePatternSize(parsed);
  }
  function normalizeSpill(spill, total = Number.MAX_SAFE_INTEGER) {
    if (!spill || typeof spill !== "object") return null;
    const index = Number(spill.index);
    const code = spill.code;
    if (!Number.isInteger(index) || index < 0 || index >= total) return null;
    if (!code || !palette[code]) return null;
    return {
      ...spill,
      index,
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
  function restoreCustomPattern(snapshot) {
    if (!snapshot || !snapshot.size) return null;
    const size = normalizePatternSize(snapshot.size);
    const rows = normalizeRows(snapshot.rows, size);
    if (!rows) return null;
    const sourceSize = normalizePatternSize(snapshot.sourceSize || size);
    const sourceRows = normalizeRows(snapshot.sourceRows || rows, sourceSize) || rows;
    const pattern = {
      ...snapshot,
      id: snapshot.id || "custom-session",
      name: snapshot.name || "\u81EA\u5B9A\u4E49\u56FE\u7EB8",
      craft: snapshot.craft || "\u539F\u7248",
      size,
      rows,
      sourceRows,
      sourceSize
    };
    for (let i = patterns.length - 1; i >= 0; i -= 1) {
      if (patterns[i].id.startsWith("custom-")) patterns.splice(i, 1);
    }
    patterns.unshift(pattern);
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
      sandboxMode: state.sandboxMode,
      lampOn: state.lampOn,
      selectedPatternId: state.selectedPattern ? baseIdFor(state.selectedPattern) : null,
      customPattern: snapshotCustomPattern(state.selectedPattern),
      patternColorMaps: state.patternColorMaps,
      patternHiddenSources: state.patternHiddenSources,
      patternSize,
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
  function scheduleAutoSave(delay = 550) {
    window.clearTimeout(autoSaveTimer);
    autoSaveTimer = window.setTimeout(autoSave, delay);
  }
  function flushAutoSave() {
    window.clearTimeout(autoSaveTimer);
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
      if (session.patternHiddenSources && typeof session.patternHiddenSources === "object") state.patternHiddenSources = session.patternHiddenSources;
      const restoredSize = normalizePatternSizeFromSession(session.patternSize, pattern.size);
      if (!restoredSize) {
        clearStoredSession();
        return false;
      }
      state.patternSize = restoredSize;
      const restoredPattern = resizePattern(pattern, state.patternSize);
      sessionActions.loadPattern(restoredPattern, true);
      state.phase = session.phase;
      state.sandboxMode = Boolean(session.sandboxMode);
      state.lampOn = Boolean(session.lampOn);
      state.patternSize = restoredPattern.size;
      const total = restoredPattern.size * restoredPattern.size;
      state.placed = normalizePlaced(session.placed, total);
      invalidatePlacedCounts();
      state.heat = normalizeHeat(session.heat, total);
      const spill = normalizeSpill(session.spill, total);
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
      state.errors = session.errors || [];
      state.warp = session.warp || 18;
      state.cooling = session.cooling || 0;
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
    const active = document.activeElement;
    if (active && active !== document.body && !active.closest(".remap-modal")) {
      state.modalReturnFocus = active;
    }
    const focusables = focusablesIn(modalEl);
    if (focusables.length) focusables[0].focus();
  }
  function restoreModalFocus() {
    if (getOpenModalEl()) return;
    const el = state.modalReturnFocus;
    state.modalReturnFocus = null;
    if (el && typeof el.focus === "function" && document.contains(el)) el.focus();
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
  function onboardingHtml() {
    const mobile = useMobileDirectPlacement();
    const steps = mobile ? [
      ["\u9009\u989C\u8272", "\u70B9\u4E0B\u65B9\u8C46\u76D2\u91CC\u7684\u8272\u53F7\uFF08\u53EA\u663E\u793A\u672C\u56FE\u7528\u5230\u7684\u8272\uFF09\u3002"],
      ["\u653E\u8C46", "\u70B9\u62FC\u8C46\u677F\u7684\u683C\u5B50\u653E\u4E0B\uFF1B\u540C\u8272\u518D\u70B9\u4E00\u6B21\u4F1A\u53D6\u4E0B\u3002"],
      ["\u5BF9\u7167", "\u7167\u7740\u53C2\u8003\u56FE\u7EB8\uFF0C\u628A\u6BCF\u4E2A\u683C\u5B50\u586B\u597D\u3002"],
      ["\u71A8\u70EB\u5B9A\u578B", "\u68C0\u67E5 \u2192 \u76D6\u7EB8\u71A8\u70EB \u2192 \u51B7\u5374\u538B\u5E73 \u2192 \u4FDD\u5B58\u5230\u4F5C\u54C1\u96C6\u3002"]
    ] : [
      ["\u9009\u989C\u8272", "\u70B9\u53F3\u4FA7\u8C46\u76D2\u91CC\u7684\u8272\u53F7\uFF0C\u628A\u8C46\u5B50\u5012\u8FDB\u8C46\u7B5B\u3002"],
      ["\u53D6\u8C46", "\u70B9\u8C46\u7B5B\u7ED9\u300C\u8C46\u9488\u300D\u4E0A\u8C46\u94FA\u5927\u9762\u79EF\uFF1B\u6216\u7528\u300C\u954A\u5B50\u300D\u4ECE\u8C46\u7B5B/\u677F\u9762\u5939\u5355\u9897\u3002"],
      ["\u6446\u653E", "\u5728\u62FC\u8C46\u677F\u5BF9\u5E94\u5B54\u4F4D\u653E\u4E0B\u8C46\u5B50\uFF0C\u7167\u7740\u5DE6\u4FA7\u53C2\u8003\u56FE\u7EB8\u62FC\u3002"],
      ["\u71A8\u70EB\u5B9A\u578B", "\u68C0\u67E5 \u2192 \u76D6\u7EB8\u71A8\u70EB \u2192 \u51B7\u5374\u538B\u5E73 \u2192 \u4FDD\u5B58\u5230\u4F5C\u54C1\u96C6\u3002"]
    ];
    const lead = mobile ? "\u5728\u624B\u673A\u4E0A\u62FC\u8C46\u5F88\u7B80\u5355\uFF1A" : "\u5728\u6D4F\u89C8\u5668\u91CC\u5B8C\u6574\u4F53\u9A8C\u62FC\u8C46\u624B\u4F5C\uFF1A";
    const tip = mobile ? "\u53CC\u6307\u53EF\u7F29\u653E\u677F\u9762\u3002" : "\u6309\u4F4F\u677F\u9762\u53EF\u62D6\u52A8\uFF0C\u6EDA\u8F6E\u7F29\u653E\u3002";
    const items = steps.map(([t, d], i) => `<li><span class="onboarding-step-no">${i + 1}</span><span><strong>${t}</strong>${d}</span></li>`).join("");
    return `<p class="onboarding-lead">${lead}</p><ol class="onboarding-steps">${items}</ol><p class="onboarding-tip">${tip}</p>`;
  }
  function openOnboardingModal() {
    if (!els.onboardingModal) return;
    if (els.onboardingBody) els.onboardingBody.innerHTML = onboardingHtml();
    state.onboardingModalOpen = true;
    els.onboardingModal.classList.add("show");
    els.onboardingModal.setAttribute("aria-hidden", "false");
    onModalOpened(els.onboardingModal);
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
    openOnboardingModal();
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

  // src/main.js
  var collection = readCollection();
  state.achievements = readAchievements();
  var lastFrame = performance.now();
  var IRON_DEFAULT_TEMPERATURE = 62;
  var IRON_DEFAULT_PRESSURE = 56;
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
    if (els.bgThemeSelect) els.bgThemeSelect.value = state.bgTheme;
    markDirty();
  }
  function applyScreenAria() {
    const mode = state.appMode;
    const beadActive = mode === "bead";
    [
      [els.startScreen, mode === "home"],
      [els.galleryScreen, mode === "gallery"],
      [els.collectionScreen, mode === "collection"],
      [els.drawingStudio, mode === "draw"],
      [document.querySelector(".bead-topbar"), beadActive],
      [els.studioGrid, beadActive]
    ].forEach(([el, active]) => {
      if (el) el.setAttribute("aria-hidden", active ? "false" : "true");
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
    collection: "--bg-collection-image"
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
  function setAppMode(mode) {
    state.appMode = mode === "draw" ? "draw" : mode === "bead" ? "bead" : mode === "gallery" ? "gallery" : mode === "collection" ? "collection" : "home";
    state.collectionPageOpen = state.appMode === "collection";
    document.body.dataset.appMode = state.appMode;
    applyScreenAria();
    updateFullBg();
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
    state.tool = "needle";
    state.needleTier = 1;
    const firstColor = getPatternColors(pattern)[0] || "K";
    state.selectedColor = firstColor;
    state.previewDirty = true;
    state.patternsDirty = true;
    if (!keepPhase) state.phase = "choose";
    markDirty();
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
    state.lampSwitchFlashUntil = performance.now() + 140;
    showToast(state.lampOn ? "\u5DE5\u4F5C\u706F\u5DF2\u6253\u5F00\uFF1A\u6295\u5F71\u8272\u7A3F\u53EF\u89C1\u3002" : "\u5DE5\u4F5C\u706F\u5DF2\u5173\u95ED\uFF1A\u5173\u95ED\u6295\u5F71\u8272\u7A3F\u3002");
    markDirty();
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
      spinDir: pseudoRandom(`${state.selectedPattern.id}-${x}-${y}-spin`) > 0.5 ? 1 : -1
    };
    state.floorDrops.push(drop);
    if (state.floorDrops.length > 52) state.floorDrops.shift();
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
    const hiddenCount = getPatternHiddenSourceList().length;
    const changed = sourceColors.some((code) => (map[code] || code) !== code) || hiddenCount > 0;
    if (!changed) {
      showToast("\u5F53\u524D\u5C31\u662F\u539F\u59CB\u914D\u8272\u3002");
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
    showToast(message);
    markDirty();
  }
  function dumpTray() {
    if (!state.trayColor) {
      showToast("\u8C46\u7B5B\u5DF2\u7ECF\u662F\u7A7A\u7684\u3002");
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
  function clearBoard() {
    const hasContent = placedCount() > 0 || state.trayBeans > 0 || state.needleLoaded > 0 || state.tweezerBead || state.spill || state.fusedPieces.length > 0;
    if (hasContent && !window.confirm("\u6E05\u7A7A\u677F\u9762\u4F1A\u79FB\u9664\u5DF2\u6446\u7684\u5168\u90E8\u8C46\u5B50\uFF0C\u786E\u5B9A\u5417\uFF1F")) return;
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
    if (state.phase !== "choose" && (placedCount() > 0 || state.trayBeans > 0 || state.needleLoaded > 0 || state.tweezerBead || state.spill)) {
      resetPlacementForRemap();
      showToast("\u56FE\u7EB8\u6362\u8272\u5DF2\u5E94\u7528\uFF0C\u5F53\u524D\u6446\u653E\u5DF2\u91CD\u7F6E\u3002");
    } else {
      showToast(`\u5DF2\u5C06 ${beadLabel(sourceCode)} \u6539\u4E3A ${beadLabel(targetCode)}\u3002`);
    }
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
    invalidatePlacedCounts();
    state.savedCurrent = false;
    updateSelectedPaletteCount();
    markCanvasDirty(true);
  }
  function useTweezers(x, y) {
    const index = indexFor(x, y);
    if (state.spill && state.spill.index === index) {
      if (state.tweezerBead) {
        showToast("\u954A\u5B50\u4E0A\u5DF2\u7ECF\u5939\u7740\u4E00\u9897\uFF0C\u5148\u653E\u4E0B\u6216\u653E\u56DE\u8C46\u76D2\u3002");
        return;
      }
      state.tweezerBead = state.spill.code;
      state.placed[index] = null;
      invalidatePlacedCounts();
      state.heat[index] = 0;
      state.spill = null;
      state.savedCurrent = false;
      showToast("\u5361\u4F4F\u7684\u8C46\u5B50\u5DF2\u7ECF\u5939\u8D77\uFF0C\u53EF\u4EE5\u7EE7\u7EED\u6446\u653E\u3002");
      markDirty();
      return;
    }
    if (state.placed[index]) {
      if (state.tweezerBead) {
        showToast("\u954A\u5B50\u4E0A\u5DF2\u7ECF\u5939\u7740\u4E00\u9897\uFF0C\u5148\u653E\u4E0B\u6216\u653E\u56DE\u8C46\u76D2\u3002");
        return;
      }
      state.tweezerBead = state.placed[index];
      state.placed[index] = null;
      invalidatePlacedCounts();
      state.heat[index] = 0;
      showToast("\u954A\u5B50\u53D6\u4E0B\u4E00\u9897\u8C46\u5B50\u3002");
    } else {
      if (!state.tweezerBead) {
        showToast("\u5148\u4ECE\u8C46\u76D2\u5939\u4E00\u9897\u8C46\u5B50\u3002");
        return;
      }
      state.placed[index] = state.tweezerBead;
      invalidatePlacedCounts();
      state.tweezerBead = null;
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
      if (cx < 0 || cy < 0 || cx >= state.selectedPattern.size || cy >= state.selectedPattern.size) return;
      const index = indexFor(cx, cy);
      if (state.placed[index]) return;
      state.placed[index] = state.trayColor;
      invalidatePlacedCounts();
      placedAny = true;
      used += 1;
    });
    if (placedAny) {
      state.needleLoaded = Math.max(0, state.needleLoaded - used);
      const drain = Math.max(0.1, used * 0.12);
      state.trayProgress = clamp(state.trayProgress - drain, 0, 100);
      state.savedCurrent = false;
      if (state.needleLoaded <= 0) showToast("\u8C46\u9488\u5DF2\u7A7A\uFF0C\u8BF7\u91CD\u65B0\u53D6\u8C46\u3002");
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
      [x - 1, y - 1]
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
    const base = dt / 16 * pressure * temp * speedFactor * 0.6;
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
  function pressFlat() {
    const heat = heatStats();
    const heatedFactor = clamp(heat.heated / Math.max(1, heat.total), 0, 1);
    const bondedFactor = clamp(heat.bonded / Math.max(1, heat.total), 0, 1);
    const effective = clamp(heatedFactor * 0.45 + bondedFactor * 0.55, 0, 1);
    const flattenGain = lerp(5, 30, effective);
    const warpReduce = lerp(2, 12, effective);
    state.flattening = clamp(state.flattening + flattenGain, 0, 100);
    state.warp = clamp(state.warp - warpReduce, 0, 80);
    state.pressAnim = { startedAt: performance.now(), duration: 820 };
    if (effective < 0.2) {
      showToast("\u53D7\u70ED\u4E0D\u8DB3\uFF0C\u538B\u5E73\u6548\u679C\u5F88\u5C0F\u3002\u518D\u71A8\u4E00\u4F1A\u513F\u4F1A\u66F4\u597D\u538B\u3002");
    } else {
      showToast("\u538B\u677F\u538B\u4F4F\u4F5C\u54C1\uFF0C\u8FB9\u7F18\u66F4\u5E73\u4E86\u3002");
    }
    markDirty();
  }
  function flipAndIron() {
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
      unlockAchievement(fullBoardAchievement, showAchievementToast);
    } else {
      unlockAchievement(conceptAchievement, showAchievementToast);
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
      placed: state.placed.slice()
    };
    if (!state.savedCurrent) {
      collection.unshift(entry);
      collection = collection.slice(0, collectionLimit);
      const stored = writeCollection(collection);
      state.savedCurrent = true;
      if (stored) showToast("\u4F5C\u54C1\u5DF2\u6536\u5165\u4F5C\u54C1\u96C6\u3002");
    } else {
      showToast("\u8FD9\u4E2A\u7248\u672C\u5DF2\u7ECF\u4FDD\u5B58\u8FC7\u3002");
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
    const filename = `\u62FC\u8C46\u5DE5\u574A-${state.selectedPattern.name}-${portrait ? "\u7AD6\u56FE" : "\u65B9\u56FE"}.png`;
    const link = document.createElement("a");
    link.download = filename;
    link.href = canvas.toDataURL("image/png");
    link.click();
    showToast("\u5DF2\u5BFC\u51FA\u5E26\u6C34\u5370\u5206\u4EAB\u56FE\u3002");
  }
  function copyShareText() {
    const flowText = useMobileDirectPlacement() ? `\u4ECE\u8C46\u76D2\u9009\u8272\u3001\u76F4\u63A5\u6446\u653E\uFF0C\u5230\u71A8\u70EB\u51B7\u5374\u5B9A\u578B\uFF0C\u771F\u7684\u5F88\u50CF\u5750\u5728\u684C\u524D\u6162\u6162\u505A\u624B\u5DE5\u3002` : `\u4ECE\u8C46\u76D2\u9009\u8272\u3001\u8C46\u7B5B\u6296\u8C46\u3001\u954A\u5B50\u4FEE\u6B63\uFF0C\u5230\u71A8\u70EB\u51B7\u5374\u5B9A\u578B\uFF0C\u771F\u7684\u5F88\u50CF\u5750\u5728\u684C\u524D\u6162\u6162\u505A\u624B\u5DE5\u3002`;
    const text = [
      `\u5973\u670B\u53CB\u7231\u73A9\u7684\u62FC\u8C46\uFF0C\u6211\u505A\u6210\u4E86\u6D4F\u89C8\u5668\u5C0F\u6E38\u620F\u3002`,
      `\u4ECA\u5929\u505A\u7684\u662F\u300C${state.selectedPattern.name}\u300D\uFF0C${getTargetTotal()}\u9897\u3001${getPatternColors().length}\u4E2A\u8272\u53F7\uFF0C\u6700\u540E\u8BC4\u7EA7 ${finalGrade()}\u3002`,
      flowText,
      `#\u62FC\u8C46 #\u624B\u4F5C #\u50CF\u7D20\u753B #\u60C5\u4FA3\u65E5\u5E38 #\u5C0F\u6E38\u620F`
    ].join("\n");
    autoCopyText(text, "\u6587\u6848\u5DF2\u590D\u5236\u3002", "\u590D\u5236\u5931\u8D25\uFF0C\u8BF7\u624B\u52A8\u590D\u5236\u3002");
  }
  function shouldAnimateCanvas(now) {
    if (state.pointer.down) return true;
    if (state.phase === "cool" && (state.cooling < 100 || state.flattening > 0)) return true;
    if (now < state.lampSwitchFlashUntil) return true;
    if (state.floorDrops.length > 0) return true;
    if (state.pressAnim && now - state.pressAnim.startedAt < state.pressAnim.duration) return true;
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
      render();
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
  sceneCanvas.addEventListener("contextmenu", (event) => event.preventDefault());
  sceneCanvas.addEventListener("wheel", (event) => {
    if (state.phase !== "place" && state.phase !== "inspect") return;
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
  els.resetButton.addEventListener("click", () => {
    const hasProgress = state.phase !== "choose" || placedCount() > 0;
    if (hasProgress && !window.confirm("\u91CD\u7F6E\u4F1A\u6E05\u7A7A\u5F53\u524D\u6240\u6709\u8FDB\u5EA6\uFF0C\u786E\u5B9A\u5417\uFF1F")) return;
    loadPattern(state.selectedPattern);
    clearAutoSave();
    showToast("\u5DF2\u91CD\u7F6E\u5F53\u524D\u4F5C\u54C1\u3002");
  });
  els.startBeadButton?.addEventListener("click", () => {
    setAppMode("bead");
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
    const hasProgress = state.phase !== "choose" || placedCount() > 0;
    if (hasProgress && !window.confirm("\u8FD4\u56DE\u9996\u9875\u5C06\u9000\u51FA\u5F53\u524D\u8FDB\u5EA6\uFF0C\u786E\u5B9A\u5417\uFF1F")) return;
    if (hasProgress) {
      loadPattern(state.selectedPattern);
      clearAutoSave();
    }
    setAppMode("home");
  });
  els.sandboxButton?.addEventListener("click", () => toggleSandboxMode());
  els.chooseStartButton?.addEventListener("click", () => {
    if (state.phase === "choose") {
      setPhase("place");
      flushAutoSave();
    }
  });
  previewCanvas.addEventListener("click", handlePreviewPickRemap);
  els.bgThemeSelect?.addEventListener("change", () => {
    applyBackgroundTheme(els.bgThemeSelect.value);
    showToast(`\u80CC\u666F\u5DF2\u5207\u6362\u4E3A ${currentBackgroundTheme().name}\u3002`);
  });
  els.topToolStyleSelect?.addEventListener("change", (event) => {
    const next = event.target.value;
    if (!toolStyles[next] || state.toolStyle === next) return;
    state.toolStyle = next;
    showToast(`\u5DE5\u5177\u6362\u6210${currentToolStyle().name}\u6B3E\u3002`);
    markDirty();
  });
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
  window.addEventListener("wheel", (e) => {
    if (e.ctrlKey || e.metaKey) e.preventDefault();
  }, { passive: false });
  window.addEventListener("keydown", (event) => {
    if ((event.ctrlKey || event.metaKey) && (event.key === "+" || event.key === "-" || event.key === "=" || event.key === "_")) {
      event.preventDefault();
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
    if (els.drawResizeModal?.classList.contains("show")) {
      closeDrawResizeModal(true);
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
    submitCurrentToGallery
  });
  validatePatterns();
  loadPattern(resizePattern(patterns[0], state.patternSize));
  setCustomDenoiseControls(state.customDenoiseLevel);
  applyBackgroundTheme(state.bgTheme);
  if (loadAutoSave()) {
    setAppMode("bead");
  } else {
    setAppMode("home");
    setPhase("choose");
  }
  setAutoSaveHook(scheduleAutoSave);
  window.addEventListener("pagehide", () => flushAutoSave());
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") flushAutoSave();
  });
  renderUI();
  requestAnimationFrame(tick);
})();
