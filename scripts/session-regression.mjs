globalThis.window = {
  clearTimeout,
  setTimeout,
};

let store = {};
globalThis.localStorage = {
  getItem: (key) => store[key] || null,
  setItem: (key, value) => {
    if (globalThis.localStorage.throwOnSet) throw new Error("setItem failed");
    store[key] = String(value);
  },
  removeItem: (key) => {
    delete store[key];
  },
  throwOnSet: false,
};

const { patterns } = await import("../src/patterns-data.js");
const { state } = await import("../src/state.js");
const { resizePattern } = await import("../src/pattern.js");
const {
  autoSave,
  clearAutoSave,
  flushAutoSave,
  loadAutoSave,
  scheduleAutoSave,
  setSessionActions,
} = await import("../src/session.js");

const sessionKey = "beadWorkshopSession.v1";
const basePattern = patterns.find((pattern) => pattern.id === "berry-cat") || patterns[0];

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function clearStore() {
  store = {};
}

function removeCustomPatterns() {
  for (let i = patterns.length - 1; i >= 0; i -= 1) {
    if (patterns[i].id.startsWith("custom-")) patterns.splice(i, 1);
  }
}

function setDefaultSessionActions() {
  setSessionActions({
    loadPattern: (pattern) => {
      state.selectedPattern = pattern;
      state.placed = Array(pattern.size * pattern.size).fill(null);
      state.heat = Array(pattern.size * pattern.size).fill(0);
    },
    setPhase: (phase) => {
      state.phase = phase;
    },
  });
}

function resetState() {
  setDefaultSessionActions();
  removeCustomPatterns();
  clearStore();
  globalThis.localStorage.throwOnSet = false;
  state.phase = "choose";
  state.patternSize = 24;
  state.selectedPattern = basePattern;
  state.patternColorMaps = {};
  state.patternHiddenSources = {};
  state.selectedColor = "K";
  state.lampOn = false;
  state.placed = [];
  state.heat = [];
  state.tool = "needle";
  state.trayColor = null;
  state.trayProgress = 0;
  state.trayBeans = 0;
  state.trayCapacity = 0;
  state.trayMatrix = [];
  state.trayPourId = 0;
  state.tweezerBead = null;
  state.needleLoaded = 0;
  state.toolPose = { x: 0, y: 0, visible: false };
  state.lastMoveDir = { x: 1, y: 0 };
  state.errors = [];
  state.warp = 18;
  state.cooling = 0;
  state.spill = null;
  state.boardView = { scale: 1, panX: 0, panY: 0, velX: 0, velY: 0, velScale: 0 };
}

function writeSession(session) {
  localStorage.setItem(sessionKey, JSON.stringify(session));
}

function readSession() {
  const raw = localStorage.getItem(sessionKey);
  return raw ? JSON.parse(raw) : null;
}

function makeRows(size) {
  return Array.from({ length: size }, (_, y) => "K".repeat(y + 1).padEnd(size, "."));
}

function restoreSavedSession() {
  const saved = localStorage.getItem(sessionKey);
  resetState();
  localStorage.setItem(sessionKey, saved);
  return loadAutoSave();
}

function run(name, fn) {
  resetState();
  fn();
  console.log(`ok - ${name}`);
}

run("bad JSON is cleared", () => {
  localStorage.setItem(sessionKey, "{not json");
  assert(loadAutoSave() === false, "bad JSON should not restore");
  assert(localStorage.getItem(sessionKey) === null, "bad JSON should be cleared");
});

run("restore throw clears session", () => {
  const placed = Array(24 * 24).fill(null);
  placed[0] = "K";
  writeSession({
    version: 2,
    phase: "place",
    selectedPatternId: "berry-cat",
    patternSize: 24,
    placed,
    heat: Array(24 * 24).fill(0),
  });
  setSessionActions({
    loadPattern: () => {
      throw new Error("boom");
    },
  });
  assert(loadAutoSave() === false, "restore errors should not restore");
  assert(readSession() === null, "restore errors should clear session");
});

run("phase choose does not save and clears session", () => {
  localStorage.setItem(sessionKey, "{}");
  state.phase = "choose";
  state.selectedPattern = resizePattern(basePattern, 24);
  state.placed = Array(24 * 24).fill(null);
  state.heat = Array(24 * 24).fill(0);
  assert(autoSave() === false, "choose phase should not save");
  assert(readSession() === null, "choose phase should clear stored session");
});

run("autosave write failure clears old session", () => {
  localStorage.setItem(sessionKey, JSON.stringify({ phase: "place", selectedPatternId: "stale" }));
  state.phase = "place";
  state.selectedPattern = resizePattern(basePattern, 24);
  state.patternSize = 24;
  state.placed = Array(24 * 24).fill(null);
  state.heat = Array(24 * 24).fill(0);
  localStorage.throwOnSet = true;
  assert(autoSave() === false, "autosave should return false when setItem throws");
  localStorage.throwOnSet = false;
  assert(readSession() === null, "failed autosave should clear stale session");
});

run("empty place session autosaves and restores", () => {
  state.phase = "place";
  state.selectedPattern = resizePattern(basePattern, 24);
  state.patternSize = 24;
  state.placed = Array(24 * 24).fill(null);
  state.heat = Array(24 * 24).fill(0);
  state.trayColor = null;
  state.trayBeans = 0;
  state.trayMatrix = [];
  assert(autoSave() === true, "empty place phase should save");
  assert(restoreSavedSession() === true, "empty place session should restore");
  assert(state.phase === "place", "empty place session should restore phase");
  assert(state.placed.length === 24 * 24, "empty place session should restore board size");
  assert(state.placed.every((cell) => cell === null), "empty place board should remain empty");
});

run("tray-only session restores tray state", () => {
  const matrix = [
    [true, false, true],
    [false, true, false],
  ];
  writeSession({
    version: 2,
    phase: "place",
    selectedPatternId: "berry-cat",
    patternSize: 24,
    placed: Array(24 * 24).fill(null),
    heat: Array(24 * 24).fill(0),
    trayColor: "K",
    trayBeans: 3,
    trayMatrix: matrix,
  });
  assert(loadAutoSave() === true, "tray-only session should restore");
  assert(state.trayColor === "K", "tray color should restore");
  assert(state.trayBeans === 3, "tray bean count should restore");
  assert(JSON.stringify(state.trayMatrix) === JSON.stringify(matrix), "tray matrix should restore");
});

run("unknown future version is cleared", () => {
  const placed = Array(24 * 24).fill(null);
  placed[0] = "K";
  writeSession({
    version: 999,
    phase: "place",
    selectedPatternId: "berry-cat",
    patternSize: 24,
    placed,
    heat: Array(24 * 24).fill(0),
  });
  assert(loadAutoSave() === false, "future session version should not restore");
  assert(readSession() === null, "future session version should be cleared");
});

run("missing version legacy session restores", () => {
  writeSession({
    phase: "place",
    selectedPatternId: "berry-cat-24",
    patternSize: 24,
    placed: Array(24 * 24).fill(null),
    heat: Array(24 * 24).fill(0),
  });
  assert(loadAutoSave() === true, "legacy missing-version session should restore");
  assert(state.selectedPattern.size === 24, "legacy session should keep saved size");
  assert(state.placed.length === 24 * 24, "legacy empty board should restore");
  assert(state.sandboxMode === false, "legacy missing sandboxMode should restore as false");
});

run("built-in resized session restores", () => {
  const placed = Array(24 * 24).fill(null);
  placed[0] = "K";
  writeSession({
    phase: "place",
    selectedPatternId: "berry-cat-24",
    patternSize: 24,
    placed,
    heat: Array(24 * 24).fill(0),
  });
  assert(loadAutoSave() === true, "built-in session should restore");
  assert(state.selectedPattern.size === 24, "restored pattern should keep saved size");
  assert(state.placed.length === 24 * 24, "placed length should match restored size");
  assert(state.placed[0] === "K", "placed bead should survive restore");
});

run("selected color and tool restore", () => {
  writeSession({
    version: 2,
    phase: "place",
    selectedPatternId: "berry-cat",
    patternSize: 24,
    placed: Array(24 * 24).fill(null),
    heat: Array(24 * 24).fill(0),
    selectedColor: "P",
    tool: "tweezers",
  });
  assert(loadAutoSave() === true, "selected color/tool session should restore");
  assert(state.selectedColor === "P", "selected color should restore");
  assert(state.tool === "tweezers", "tool should restore");
});

run("needleLoaded restores", () => {
  writeSession({
    version: 2,
    phase: "place",
    selectedPatternId: "berry-cat",
    patternSize: 24,
    placed: Array(24 * 24).fill(null),
    heat: Array(24 * 24).fill(0),
    trayColor: "K",
    needleLoaded: 5,
  });
  assert(loadAutoSave() === true, "needle session should restore");
  assert(state.needleLoaded === 5, "needleLoaded should restore");
  assert(state.trayColor === "K", "needle color source should restore");
});

run("tweezerBead restores", () => {
  writeSession({
    version: 2,
    phase: "place",
    selectedPatternId: "berry-cat",
    patternSize: 24,
    placed: Array(24 * 24).fill(null),
    heat: Array(24 * 24).fill(0),
    tool: "tweezers",
    tweezerBead: "K",
  });
  assert(loadAutoSave() === true, "tweezer session should restore");
  assert(state.tweezerBead === "K", "tweezerBead should restore");
  assert(state.tool === "tweezers", "tweezer tool should restore");
});

run("board view restores", () => {
  writeSession({
    version: 2,
    phase: "place",
    selectedPatternId: "berry-cat",
    patternSize: 24,
    placed: Array(24 * 24).fill(null),
    heat: Array(24 * 24).fill(0),
    boardView: { scale: 2.2, panX: 12, panY: -8 },
  });
  assert(loadAutoSave() === true, "board view session should restore");
  assert(state.boardView.scale === 2.2, "board scale should restore");
  assert(state.boardView.panX === 12, "board panX should restore");
  assert(state.boardView.panY === -8, "board panY should restore");
});

run("board view invalid values normalize", () => {
  writeSession({
    version: 2,
    phase: "place",
    selectedPatternId: "berry-cat",
    patternSize: 24,
    placed: Array(24 * 24).fill(null),
    heat: Array(24 * 24).fill(0),
    boardView: { scale: -2, panX: Number.NaN, panY: Number.POSITIVE_INFINITY },
  });
  assert(loadAutoSave() === true, "invalid board view session should restore");
  assert(state.boardView.scale === 1, "negative board scale should normalize to 1");
  assert(state.boardView.panX === 0, "NaN panX should normalize to 0");
  assert(state.boardView.panY === 0, "Infinity panY should normalize to 0");
});

run("board view zero infinity and huge scale normalize", () => {
  writeSession({
    version: 2,
    phase: "place",
    selectedPatternId: "berry-cat",
    patternSize: 24,
    placed: Array(24 * 24).fill(null),
    heat: Array(24 * 24).fill(0),
    boardView: { scale: 0, panX: 4, panY: -5 },
  });
  assert(loadAutoSave() === true, "zero board scale session should restore");
  assert(state.boardView.scale === 1, "zero board scale should normalize to 1");
  resetState();
  writeSession({
    version: 2,
    phase: "place",
    selectedPatternId: "berry-cat",
    patternSize: 24,
    placed: Array(24 * 24).fill(null),
    heat: Array(24 * 24).fill(0),
    boardView: { scale: Number.POSITIVE_INFINITY, panX: 1, panY: 2 },
  });
  assert(loadAutoSave() === true, "infinite board scale session should restore");
  assert(state.boardView.scale === 1, "infinite board scale should normalize to 1");
  resetState();
  writeSession({
    version: 2,
    phase: "place",
    selectedPatternId: "berry-cat",
    patternSize: 24,
    placed: Array(24 * 24).fill(null),
    heat: Array(24 * 24).fill(0),
    boardView: { scale: 99, panX: 1, panY: 2 },
  });
  assert(loadAutoSave() === true, "huge board scale session should restore");
  assert(state.boardView.scale === 8, "huge board scale should clamp to 8");
});

run("lamp tray tool pose and needle direction restore", () => {
  const matrix = [
    [true, false, true],
    [false, true, true],
  ];
  writeSession({
    version: 2,
    phase: "place",
    sandboxMode: true,
    lampOn: true,
    selectedPatternId: "berry-cat",
    patternSize: 24,
    placed: Array(24 * 24).fill(null),
    heat: Array(24 * 24).fill(0),
    selectedColor: "P",
    tool: "tweezers",
    trayColor: "K",
    trayProgress: 42,
    trayBeans: 4,
    trayCapacity: 9,
    trayMatrix: matrix,
    trayPourId: 7,
    needleLoaded: 3,
    tweezerBead: "W",
    toolPose: { x: 123.5, y: 234.25, visible: true },
    lastMoveDir: { x: 0, y: -1 },
  });
  assert(loadAutoSave() === true, "extended workbench session should restore");
  assert(state.sandboxMode === true, "sandbox mode should restore");
  assert(state.lampOn === true, "lamp state should restore");
  assert(state.selectedColor === "P", "selected color should restore");
  assert(state.tool === "tweezers", "tool should restore");
  assert(state.trayColor === "K", "tray color should restore");
  assert(state.trayProgress === 42, "tray progress should restore");
  assert(state.trayBeans === 4, "tray bean count should restore");
  assert(state.trayCapacity === 9, "tray capacity should restore");
  assert(JSON.stringify(state.trayMatrix) === JSON.stringify(matrix), "tray matrix should restore");
  assert(state.trayPourId === 7, "tray pour id should restore");
  assert(state.needleLoaded === 3, "needle loaded count should restore");
  assert(state.tweezerBead === "W", "tweezer bead should restore");
  assert(state.toolPose.x === 123.5 && state.toolPose.y === 234.25 && state.toolPose.visible === true, "tool pose should restore");
  assert(state.lastMoveDir.x === 0 && state.lastMoveDir.y === -1, "last move direction should restore");
});

run("invalid spill normalizes to null without blocking restore", () => {
  writeSession({
    version: 2,
    phase: "place",
    selectedPatternId: "berry-cat",
    patternSize: 24,
    placed: Array(24 * 24).fill(null),
    heat: Array(24 * 24).fill(0),
    spill: { index: -1, code: "K" },
  });
  assert(loadAutoSave() === true, "invalid spill should not block session restore");
  assert(state.spill === null, "invalid spill should normalize to null");
});

run("valid spill restores", () => {
  writeSession({
    version: 2,
    phase: "place",
    selectedPatternId: "berry-cat",
    patternSize: 24,
    placed: Array(24 * 24).fill(null),
    heat: Array(24 * 24).fill(0),
    spill: { index: 4, code: "K", x: 10 },
  });
  assert(loadAutoSave() === true, "valid spill should count as progress");
  assert(state.spill?.index === 4, "valid spill index should restore");
  assert(state.spill?.code === "K", "valid spill code should restore");
});

run("custom pattern session restores", () => {
  const rows = makeRows(12);
  const placed = Array(12 * 12).fill(null);
  placed[0] = "K";
  writeSession({
    phase: "place",
    selectedPatternId: "custom-user",
    customPattern: {
      id: "custom-user",
      name: "自定义图纸",
      size: 12,
      rows,
      sourceRows: rows,
      sourceSize: 12,
      craft: "原版",
    },
    patternSize: 12,
    placed,
    heat: Array(12 * 12).fill(0),
  });
  assert(loadAutoSave() === true, "custom session should restore");
  assert(state.selectedPattern.id === "custom-user", "custom pattern should be reinserted");
  assert(state.selectedPattern.size === 12, "custom pattern size should restore");
  assert(state.placed[0] === "K", "custom placed bead should survive restore");
});

run("invalid placed data normalizes to empty cells", () => {
  const placed = Array(24 * 24).fill(null);
  placed[0] = "NOPE";
  writeSession({
    phase: "place",
    selectedPatternId: "berry-cat",
    patternSize: 24,
    placed,
    heat: Array(24 * 24).fill(0),
  });
  assert(loadAutoSave() === true, "invalid placed cells should not block restore");
  assert(state.placed[0] === null, "invalid placed color should normalize to null");
});

run("autosave writes base id for built-in pattern", () => {
  state.phase = "place";
  state.selectedPattern = resizePattern(basePattern, 24);
  state.patternSize = 24;
  state.placed = Array(24 * 24).fill(null);
  state.heat = Array(24 * 24).fill(0);
  assert(autoSave() === true, "autosave should write active workbench session");
  const saved = readSession();
  assert(saved.version === 2, "saved session should use version 2");
  assert(saved.selectedPatternId === "berry-cat", "built-in session should save base id");
  assert(saved.customPattern === null, "built-in session should not include custom snapshot");
});

run("autosave keeps custom snapshot light", () => {
  const rows = makeRows(12);
  state.phase = "place";
  state.selectedPattern = {
    id: "custom-user",
    name: "自定义图纸",
    size: 12,
    rows,
    sourceRows: rows,
    sourceSize: 12,
    sourceImageDataUrl: "data:image/png;base64," + "A".repeat(1000),
  };
  state.patternSize = 12;
  state.placed = Array(12 * 12).fill(null);
  state.heat = Array(12 * 12).fill(0);
  assert(autoSave() === true, "custom autosave should write active workbench session");
  const saved = readSession();
  assert(saved.customPattern, "custom snapshot should be present");
  assert(saved.customPattern.sourceKind === "image", "custom image snapshot should keep lightweight source marker");
  assert(saved.customPattern.sourceWasImage === true, "custom image snapshot should keep sourceWasImage marker");
  assert(!("sourceImageDataUrl" in saved.customPattern), "custom snapshot should not store source image data");
});

run("restored image snapshot cannot pretend to re-read original image", () => {
  const rows = makeRows(12);
  const placed = Array(12 * 12).fill(null);
  placed[0] = "K";
  writeSession({
    version: 2,
    phase: "place",
    selectedPatternId: "custom-user",
    customPattern: {
      id: "custom-user",
      name: "自定义图纸",
      size: 12,
      rows,
      sourceRows: rows,
      sourceSize: 12,
      sourceKind: "image",
      sourceWasImage: true,
    },
    patternSize: 12,
    placed,
    heat: Array(12 * 12).fill(0),
  });
  assert(loadAutoSave() === true, "image custom snapshot should restore from rows");
  assert(state.selectedPattern.sourceWasImage === true, "restored pattern should keep image source marker");
  assert(!state.selectedPattern.sourceImageDataUrl, "restored pattern should not expose missing source image data");
});

run("flushAutoSave writes scheduled progress", () => {
  state.phase = "place";
  state.selectedPattern = resizePattern(basePattern, 24);
  state.patternSize = 24;
  state.placed = Array(24 * 24).fill(null);
  state.heat = Array(24 * 24).fill(0);
  state.selectedColor = "P";
  scheduleAutoSave(10000);
  assert(flushAutoSave() === true, "flushAutoSave should write active workbench immediately");
  assert(readSession()?.selectedColor === "P", "flushed session should include selected color");
});

run("clearAutoSave removes stored progress", () => {
  localStorage.setItem(sessionKey, "{}");
  clearAutoSave();
  assert(readSession() === null, "clearAutoSave should remove stored session");
});
