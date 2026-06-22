// Regression: active build-timer accumulation, restore, and label formatting.
import assert from 'node:assert/strict';
import {
  resetBuildTimer, startBuildTimer, pauseBuildTimer, buildElapsedMs,
  setBuildElapsedMs, isBuildTimerRunning, formatBuildTime,
} from '../src/build-timer.js';

// ── Accumulation across start/pause spans (injected clock) ────────────────────
resetBuildTimer();
assert.equal(buildElapsedMs(0), 0, 'fresh timer reads 0');
assert.equal(isBuildTimerRunning(), false);

startBuildTimer(1000);
assert.equal(isBuildTimerRunning(), true);
assert.equal(buildElapsedMs(4000), 3000, 'in-flight span counts');

// start is idempotent — a second start while running does not reset the span.
startBuildTimer(3500);
assert.equal(buildElapsedMs(4000), 3000, 'redundant start is ignored');

pauseBuildTimer(4000);
assert.equal(isBuildTimerRunning(), false);
assert.equal(buildElapsedMs(99999), 3000, 'paused timer freezes');

startBuildTimer(10000);
assert.equal(buildElapsedMs(12000), 5000, 'second span adds to accumulator');

// ── Restore (session reload) ──────────────────────────────────────────────────
setBuildElapsedMs(7000);
assert.equal(isBuildTimerRunning(), false, 'restore lands paused');
assert.equal(buildElapsedMs(123456), 7000, 'restored value is exact');
setBuildElapsedMs(-5);
assert.equal(buildElapsedMs(0), 0, 'negative restore clamps to 0');
setBuildElapsedMs(NaN);
assert.equal(buildElapsedMs(0), 0, 'NaN restore clamps to 0');

// ── Label formatting ──────────────────────────────────────────────────────────
assert.equal(formatBuildTime(0), '0秒');
assert.equal(formatBuildTime(45_000), '45秒');
assert.equal(formatBuildTime(59_000), '59秒');
assert.equal(formatBuildTime(60_000), '1分');
assert.equal(formatBuildTime(90_000), '2分');           // rounds to nearest minute
assert.equal(formatBuildTime(18 * 60_000), '18分');
assert.equal(formatBuildTime(60 * 60_000), '1时');
assert.equal(formatBuildTime(65 * 60_000), '1时5分');
assert.equal(formatBuildTime(-100), '0秒', 'negative ms clamps');

console.log('build-timer regression OK');
