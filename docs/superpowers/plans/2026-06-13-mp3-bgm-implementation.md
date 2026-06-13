# MP3 BGM Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Play the supplied compressed MP3 through the existing background-music switch.

**Architecture:** Replace oscillator synthesis in `src/bgm.js` with a single lazy `HTMLAudioElement`. Preserve the public BGM API, but await `play()` so saved state matches actual playback; keep fading internal to the module.

**Tech Stack:** Browser `HTMLAudioElement`, JavaScript modules, Node regression scripts, esbuild.

---

### Task 1: Add Regression Coverage

**Files:**
- Create: `scripts/bgm-regression.mjs`
- Modify: `package.json`

- [ ] Write a regression script that stubs `Audio` and verifies source, looping, preload, target volume, stop/pause behavior, rejected playback, asset presence, and MP3 MIME configuration.
- [ ] Add `test:bgm` to `package.json`.
- [ ] Run `npm run test:bgm` and verify it fails because `src/bgm.js` still uses Web Audio synthesis.

### Task 2: Replace The Synthesized Player

**Files:**
- Modify: `src/bgm.js`
- Modify: `src/main.js`
- Modify: `server.js`

- [ ] Implement a lazy looping `Audio("./audio/background.mp3")` instance with target volume `0.4`.
- [ ] Add short request-animation-frame fades and guard them against start/stop races.
- [ ] Make `startBgm()` and `toggleBgm()` report the resolved playback state.
- [ ] Await BGM toggles in `src/main.js` before persisting and reflecting switch state.
- [ ] Add `.mp3: "audio/mpeg"` to the local server MIME map.
- [ ] Run `npm run test:bgm` and verify it passes.

### Task 3: Build And Verify

**Files:**
- Modify: `app.bundle.js`

- [ ] Run `npm run build:js`.
- [ ] Run the BGM regression test and existing regression scripts.
- [ ] Start the local server and verify `/audio/background.mp3` is served as `audio/mpeg`.
- [ ] Verify the settings switch plays, loops, and stops the MP3 in the browser.
