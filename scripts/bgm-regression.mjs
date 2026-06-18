import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";

const instances = [];
let rejectPlayback = false;

class FakeAudio {
  constructor(src) {
    this.src = src;
    this.loop = false;
    this.preload = "";
    this.volume = 1;
    this.playCalls = 0;
    this.pauseCalls = 0;
    instances.push(this);
  }

  play() {
    this.playCalls += 1;
    return rejectPlayback ? Promise.reject(new Error("blocked")) : Promise.resolve();
  }

  pause() {
    this.pauseCalls += 1;
  }
}

let frameTime = 0;
globalThis.Audio = FakeAudio;
globalThis.requestAnimationFrame = (callback) => {
  frameTime += 100;
  callback(frameTime);
  return frameTime;
};

const asset = await stat(new URL("../audio/background.mp3", import.meta.url));
assert.ok(asset.size > 0, "compressed BGM asset should exist");

const packageSource = await readFile(new URL("../package.json", import.meta.url), "utf8");
const packageJson = JSON.parse(packageSource);
assert.equal(packageJson.type, "module", "root package should declare ESM so src/*.js tests do not reparse with warnings");
assert.match(packageJson.scripts.dev, /server\.cjs/, "dev server should stay CommonJS under an ESM package");
assert.match(packageJson.scripts.start, /server\.cjs/, "start server should stay CommonJS under an ESM package");

const serverSource = await readFile(new URL("../server.cjs", import.meta.url), "utf8");
assert.match(serverSource, /"\.mp3":\s*"audio\/mpeg"/, "server should serve MP3 as audio/mpeg");

const bgmSource = await readFile(new URL("../src/bgm.js", import.meta.url), "utf8");
const moduleUrl = (label) => (
  `data:text/javascript;base64,${Buffer.from(`${bgmSource}\n// ${label}`).toString("base64")}`
);

const bgm = await import(moduleUrl(`success-${Date.now()}`));
assert.equal(bgm.isBgmPlaying(), false, "BGM should start disabled");
assert.equal(await bgm.startBgm(), true, "successful playback should report enabled");

const track = instances[0];
assert.ok(track, "BGM should create an Audio element");
assert.match(track.src, /audio\/background\.mp3$/, "BGM should use the compressed MP3");
assert.equal(track.loop, true, "BGM should loop");
assert.equal(track.preload, "auto", "BGM should preload");
assert.equal(track.playCalls, 1, "BGM should start the audio once");
assert.equal(track.volume, 0.4, "BGM should fade to the configured volume");
assert.equal(bgm.isBgmPlaying(), true, "successful playback should update state");

assert.equal(bgm.stopBgm(), false, "stopping should report disabled");
assert.equal(track.pauseCalls, 1, "stopping should pause after fading out");
assert.equal(track.volume, 0, "stopping should fade to silence");
assert.equal(bgm.isBgmPlaying(), false, "stopping should update state immediately");

rejectPlayback = true;
const rejected = await import(moduleUrl(`rejected-${Date.now()}`));
assert.equal(await rejected.startBgm(), false, "rejected playback should remain disabled");
assert.equal(rejected.isBgmPlaying(), false, "rejected playback should not set playing state");

console.log("BGM regression checks passed.");
