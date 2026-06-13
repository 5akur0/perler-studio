// Background music uses a compressed static audio file; off by default, started by the settings toggle after a user gesture.

const BGM_SOURCE = "./audio/background.mp3";
const TARGET_VOLUME = 0.4;
const FADE_IN_MS = 600;
const FADE_OUT_MS = 400;

let audio = null;
let playing = false;
let fadeGeneration = 0;

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

export function isBgmPlaying() {
  return playing;
}

export async function startBgm() {
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

export function stopBgm() {
  playing = false;
  const track = audio;
  if (!track) return false;

  const generation = ++fadeGeneration;
  fadeVolume(track, 0, FADE_OUT_MS, generation, () => {
    track.pause();
  });
  return false;
}

export async function toggleBgm(next = !playing) {
  return next ? startBgm() : stopBgm();
}
