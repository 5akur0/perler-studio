// Active build-time tracking for the current piece.
//
// Accumulates only the time the player is *actively* making the current work —
// running while in the bead studio's working phases (place/inspect/iron/cool)
// and the tab is visible, paused on home/gallery, tab hide, or completion.
// main.js drives start/pause via syncBuildTimer(); the value feeds the share
// card's "用时" KPI and is persisted with the session and the saved entry.

let accumMs = 0;
let runningSince = null; // monotonic timestamp while running, else null

/** Reset for a freshly loaded pattern (new work). */
export function resetBuildTimer() {
  accumMs = 0;
  runningSince = null;
}

/** Begin counting if not already running. */
export function startBuildTimer(now = performance.now()) {
  if (runningSince === null) runningSince = now;
}

/** Fold the running span into the accumulator and stop counting. */
export function pauseBuildTimer(now = performance.now()) {
  if (runningSince !== null) {
    accumMs += Math.max(0, now - runningSince);
    runningSince = null;
  }
}

/** Total active milliseconds so far (including the in-flight span). */
export function buildElapsedMs(now = performance.now()) {
  return accumMs + (runningSince !== null ? Math.max(0, now - runningSince) : 0);
}

/** Restore a persisted elapsed value (paused). */
export function setBuildElapsedMs(ms) {
  accumMs = Number.isFinite(ms) && ms > 0 ? ms : 0;
  runningSince = null;
}

export function isBuildTimerRunning() {
  return runningSince !== null;
}

/** Compact Chinese label for the KPI: "45秒" / "18分" / "1时5分". */
export function formatBuildTime(ms) {
  const totalSec = Math.max(0, Math.round((Number(ms) || 0) / 1000));
  if (totalSec < 60) return `${totalSec}秒`;
  const totalMin = Math.round(totalSec / 60);
  if (totalMin < 60) return `${totalMin}分`;
  const h = Math.floor(totalMin / 60);
  const m = totalMin % 60;
  return m ? `${h}时${m}分` : `${h}时`;
}
