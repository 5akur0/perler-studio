globalThis.window = {
  clearTimeout,
  setTimeout,
};

let store = {};
globalThis.localStorage = {
  getItem: (key) => store[key] || null,
  setItem: (key, value) => {
    store[key] = String(value);
  },
  removeItem: (key) => {
    delete store[key];
  },
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
  state.phase = "choose";
  state.patternSize = 24;
  state.selectedPattern = basePattern;
  state.patternColorMaps = {};
  state.placed = [];
  state.heat = [];
  state.trayColor = null;
  state.trayBeans = 0;
  state.trayMatrix = [];
  state.tweezerBead = null;
  state.needleLoaded = 0;
  state.errors = [];
  state.warp = 18;
  state.cooling = 0;
  state.spill = null;
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

run("tray-only session is cleared", () => {
  writeSession({
    phase: "place",
    selectedPatternId: "berry-cat",
    patternSize: 24,
    placed: Array(24 * 24).fill(null),
    heat: Array(24 * 24).fill(0),
    trayBeans: 8,
  });
  assert(loadAutoSave() === false, "tray-only session should not restore");
  assert(readSession() === null, "tray-only session should be cleared");
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
  const placed = Array(24 * 24).fill(null);
  placed[0] = "K";
  writeSession({
    phase: "place",
    selectedPatternId: "berry-cat-24",
    patternSize: 24,
    placed,
    heat: Array(24 * 24).fill(0),
  });
  assert(loadAutoSave() === true, "legacy missing-version session should restore");
  assert(state.selectedPattern.size === 24, "legacy session should keep saved size");
  assert(state.placed[0] === "K", "legacy placed bead should survive restore");
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

run("invalid spill does not trigger restore", () => {
  writeSession({
    version: 2,
    phase: "place",
    selectedPatternId: "berry-cat",
    patternSize: 24,
    placed: Array(24 * 24).fill(null),
    heat: Array(24 * 24).fill(0),
    spill: { index: -1, code: "K" },
  });
  assert(loadAutoSave() === false, "invalid spill should not count as progress");
  assert(readSession() === null, "invalid spill session should be cleared");
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

run("invalid placed data is cleared", () => {
  const placed = Array(24 * 24).fill(null);
  placed[0] = "NOPE";
  writeSession({
    phase: "place",
    selectedPatternId: "berry-cat",
    patternSize: 24,
    placed,
    heat: Array(24 * 24).fill(0),
  });
  assert(loadAutoSave() === false, "invalid placed data should not restore");
  assert(readSession() === null, "invalid session should be cleared");
});

run("autosave writes base id for built-in pattern", () => {
  state.phase = "place";
  state.selectedPattern = resizePattern(basePattern, 24);
  state.patternSize = 24;
  state.placed = Array(24 * 24).fill(null);
  state.placed[0] = "K";
  state.heat = Array(24 * 24).fill(0);
  assert(autoSave() === true, "autosave should write active progress");
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
  state.placed[0] = "K";
  state.heat = Array(12 * 12).fill(0);
  assert(autoSave() === true, "custom autosave should write active progress");
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
  state.placed[0] = "K";
  state.heat = Array(24 * 24).fill(0);
  scheduleAutoSave(10000);
  assert(flushAutoSave() === true, "flushAutoSave should write active progress immediately");
  assert(readSession()?.placed?.[0] === "K", "flushed session should include placed bead");
});

run("clearAutoSave removes stored progress", () => {
  localStorage.setItem(sessionKey, "{}");
  clearAutoSave();
  assert(readSession() === null, "clearAutoSave should remove stored session");
});
