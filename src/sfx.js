// Cozy craft "foley": synthesized sound effects (no audio assets, so it stays
// offline / file:// safe) paired with haptics. Sound + vibration fire from a
// single feedback() call so they're synchronized by construction.
//
// Platform note (2026): all iOS browsers AND in-app webviews (WeChat / Xiaohongshu)
// use WebKit, which has no Web Vibration API — so navigator.vibrate is absent there
// and vibrate() no-ops; iOS leans on sound + on-screen feedback. Android (incl.
// Chromium in-app webviews) gets both. If Apple ever ships navigator.vibrate, the
// feature-detect below lights it up with no code change.

let ctx = null;
let master = null;
let noiseBuf = null;

let sfxEnabled = true;
let hapticEnabled = true;
try { sfxEnabled = (localStorage.getItem("perler-sfx") ?? "on") !== "off"; } catch (e) { /* noop */ }
try { hapticEnabled = (localStorage.getItem("perler-haptic") ?? "on") !== "off"; } catch (e) { /* noop */ }

function persist(key, on) { try { localStorage.setItem(key, on ? "on" : "off"); } catch (e) { /* noop */ } }

export function isSfxEnabled() { return sfxEnabled; }
export function isHapticEnabled() { return hapticEnabled; }
export function setSfxEnabled(v) { sfxEnabled = !!v; persist("perler-sfx", sfxEnabled); }
export function setHapticEnabled(v) { hapticEnabled = !!v; persist("perler-haptic", hapticEnabled); }

function ensureCtx() {
  if (ctx) return ctx;
  const AC = window.AudioContext || window.webkitAudioContext;
  if (!AC) return null;
  try {
    ctx = new AC();
    master = ctx.createGain();
    master.gain.value = 0.22;                       // calm overall level
    const comp = ctx.createDynamicsCompressor();    // guard against clipping on rapid hits
    master.connect(comp);
    comp.connect(ctx.destination);
  } catch (e) { ctx = null; }
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

const rand = (a, b) => a + Math.random() * (b - a);

// --- primitives ---
function tone(t0, { freq = 440, type = "sine", dur = 0.08, gain = 0.6, glideTo = null, attack = 0.004 }) {
  const o = ctx.createOscillator();
  const g = ctx.createGain();
  o.type = type;
  o.frequency.setValueAtTime(freq, t0);
  if (glideTo) o.frequency.exponentialRampToValueAtTime(Math.max(1, glideTo), t0 + dur);
  g.gain.setValueAtTime(0.0001, t0);
  g.gain.exponentialRampToValueAtTime(gain, t0 + attack);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  o.connect(g); g.connect(master);
  o.start(t0); o.stop(t0 + dur + 0.02);
}

function noiseHit(t0, { dur = 0.18, gain = 0.4, type = "bandpass", freq = 2600, q = 0.8, attack = 0.01, tremolo = 0, glideTo = null }) {
  const src = ctx.createBufferSource();
  src.buffer = noise();
  const f = ctx.createBiquadFilter();
  f.type = type; f.frequency.setValueAtTime(freq, t0);
  if (glideTo) f.frequency.exponentialRampToValueAtTime(Math.max(20, glideTo), t0 + dur);
  f.Q.value = q;
  const g = ctx.createGain();
  g.gain.setValueAtTime(0.0001, t0);
  g.gain.exponentialRampToValueAtTime(gain, t0 + attack);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  src.connect(f); f.connect(g); g.connect(master);
  if (tremolo > 0) {
    const lfo = ctx.createOscillator();
    const lg = ctx.createGain();
    lfo.frequency.value = tremolo; lg.gain.value = gain * 0.5;
    lfo.connect(lg); lg.connect(g.gain);
    lfo.start(t0); lfo.stop(t0 + dur + 0.02);
  }
  src.start(t0); src.stop(t0 + dur + 0.02);
}

// --- per-action recipes (warm, plastic, handmade — never a digital "beep") ---
const recipes = {
  "bead-place"(t) {
    const f = rand(380, 520);
    noiseHit(t, { dur: 0.03, gain: 0.22, type: "highpass", freq: 3000, attack: 0.002 });
    tone(t, { freq: f, type: "triangle", dur: 0.06, gain: 0.3, glideTo: f * 0.7 });
  },
  "bead-remove"(t) {
    tone(t, { freq: rand(200, 260), type: "sine", dur: 0.07, gain: 0.24, glideTo: 150 });
  },
  pour(t) {
    for (let i = 0; i < 7; i += 1) {
      const tt = t + i * rand(0.018, 0.05);
      const f = rand(360, 560);
      noiseHit(tt, { dur: 0.025, gain: 0.14, type: "highpass", freq: 3200, attack: 0.002 });
      tone(tt, { freq: f, type: "triangle", dur: 0.05, gain: 0.18, glideTo: f * 0.7 });
    }
  },
  // Tray shake / sorting
  sift(t) {
    noiseHit(t, { dur: 0.34, gain: 0.16, type: "bandpass", freq: 3200, q: 0.7, attack: 0.03, tremolo: 18 });
  },
  // Scoop beads onto needle / tweezers / from the box
  grab(t) {
    noiseHit(t, { dur: 0.13, gain: 0.16, type: "bandpass", freq: 1600, q: 0.6, attack: 0.02, glideTo: 2600 });
    tone(t + 0.02, { freq: rand(300, 380), type: "triangle", dur: 0.05, gain: 0.16, glideTo: 220 });
  },
  pick(t) { noiseHit(t, { dur: 0.03, gain: 0.16, type: "highpass", freq: 4200, attack: 0.002 }); },
  drop(t) { tone(t, { freq: 300, type: "sine", dur: 0.06, gain: 0.22, glideTo: 180 }); },
  // A loose bead bouncing onto the floor
  "floor-drop"(t) {
    tone(t, { freq: 360, type: "sine", dur: 0.07, gain: 0.22, glideTo: 200 });
    tone(t + 0.09, { freq: 280, type: "sine", dur: 0.06, gain: 0.13, glideTo: 170 });
    noiseHit(t, { dur: 0.03, gain: 0.1, type: "highpass", freq: 3500, attack: 0.002 });
  },
  // Empty the tray
  dump(t) {
    for (let i = 0; i < 9; i += 1) {
      const tt = t + i * rand(0.012, 0.03);
      noiseHit(tt, { dur: 0.03, gain: 0.12, type: "bandpass", freq: 2600 - i * 140, q: 0.6, attack: 0.002 });
    }
  },
  iron(t) {
    noiseHit(t, { dur: 0.22, gain: 0.11, type: "lowpass", freq: 900, q: 0.5, attack: 0.06 });
  },
  // Flip the board over for a second pass
  flip(t) {
    noiseHit(t, { dur: 0.2, gain: 0.14, type: "lowpass", freq: 700, q: 0.4, attack: 0.04, glideTo: 1800 });
  },
  cool(t) {
    noiseHit(t, { dur: 0.5, gain: 0.09, type: "highpass", freq: 5000, attack: 0.08 });
    tone(t, { freq: 520, type: "sine", dur: 0.5, gain: 0.11, glideTo: 320, attack: 0.05 });
  },
  finish(t) {
    [659.25, 783.99, 1046.5].forEach((nf, i) => // E5 - G5 - C6, gentle arpeggio
      tone(t + i * 0.12, { freq: nf, type: "sine", dur: 0.5, gain: 0.2, attack: 0.01 }));
  },
  // Achievement unlocked — brighter & sparklier than finish
  achievement(t) {
    [1046.5, 1318.5, 1567.98].forEach((nf, i) => { // C6 - E6 - G6
      tone(t + i * 0.1, { freq: nf, type: "sine", dur: 0.45, gain: 0.18, attack: 0.008 });
      tone(t + i * 0.1, { freq: nf * 2, type: "sine", dur: 0.3, gain: 0.05, attack: 0.008 }); // shimmer
    });
  },
  // Desk-lamp switch
  lamp(t) {
    noiseHit(t, { dur: 0.02, gain: 0.18, type: "highpass", freq: 5000, attack: 0.001 });
    tone(t + 0.01, { freq: 180, type: "square", dur: 0.04, gain: 0.12, glideTo: 120 });
  },
  // Switching pages / app modes — very soft swish
  nav(t) {
    noiseHit(t, { dur: 0.12, gain: 0.08, type: "bandpass", freq: 1200, q: 0.5, attack: 0.03, glideTo: 2400 });
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
  },
};

// Haptic pattern paired with each event (ms). Absent = no vibration.
const haptics = {
  "bead-place": 5, "bead-remove": 4, pour: [4, 26, 4, 26, 4], sift: [8, 22, 8],
  grab: 5, pick: 4, drop: 6, "floor-drop": [3, 20, 3], dump: [4, 18, 4, 18, 4],
  iron: 6, flip: 8, finish: [12, 40, 12, 40, 18], achievement: [10, 30, 10, 30, 12],
  lamp: 6, spill: [15, 30, 15], error: [15, 30, 15], "ui-tap": 4,
};

// Throttle chatty / continuous events so drags don't machine-gun the mixer.
const throttleMs = { iron: 90, sift: 200, nav: 140, grab: 40, "bead-place": 18 };
const lastAt = {};

export function playSfx(name) {
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
  try { recipe(c.currentTime + 0.001); } catch (e) { /* noop */ }
}

export function vibrate(pattern) {
  if (!hapticEnabled || !pattern) return;
  if (typeof navigator === "undefined" || typeof navigator.vibrate !== "function") return; // iOS: no API
  try { navigator.vibrate(pattern); } catch (e) { /* noop */ }
}

// Fire sound + matching haptic together (synchronized by being one call).
export function feedback(name) {
  playSfx(name);
  vibrate(haptics[name]);
}
