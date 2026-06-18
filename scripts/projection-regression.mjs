import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const renderSource = await readFile(new URL("../src/render.js", import.meta.url), "utf8");
const drawBoardSource = renderSource.match(/export function drawBoard[\s\S]*?export function drawProjectedGuide/)?.[0] || "";
const guideCacheSource = renderSource.match(/export function buildProjectedGuideCache[\s\S]*?export function drawFusionBridges/)?.[0] || "";

assert.doesNotMatch(
  guideCacheSource,
  /createRadialGradient/,
  "projection cache should not attenuate light or colours by radial distance",
);
assert.match(renderSource, /globalCompositeOperation\s*=\s*["']destination-in["']/);
assert.match(renderSource, /Math\.min\(canvasW,\s*canvasH\)/);
assert.match(
  guideCacheSource,
  /spotRadius\s*=\s*Math\.min\(canvasW,\s*canvasH\)\s*\*\s*0\.425/,
  "overall projection spot radius should stay tied to the board's shorter side",
);
assert.doesNotMatch(
  guideCacheSource,
  /spotRadius\s*=\s*Math\.min\(canvasW,\s*canvasH\)\s*\*\s*0\.425\s*\+\s*cell\s*\*\s*0\.43/,
  "do not enlarge the whole lamp spot by a bead radius",
);
assert.match(
  guideCacheSource,
  /projectedBeadRadius\s*=\s*cell\s*\*\s*0\.43/,
  "dark projected beads should use the same radius as real board beads",
);
assert.match(
  renderSource,
  /function projectedGuideColor[\s\S]*mixColor[\s\S]*#f3c04f/,
  "light projected colours should be warmed/saturated so white projection remains visible",
);
assert.match(
  renderSource,
  /function projectedGuideAlpha[\s\S]*lightness[\s\S]*1\.7/,
  "light projected colours should receive a stronger alpha than dark colours",
);
assert.match(renderSource, /projectedGuideCacheKey[\s\S]*layout\.boardH/);
assert.doesNotMatch(
  drawBoardSource,
  /fillRect\(px \+ 1,\s*py \+ 1,\s*cell - 2,\s*cell - 2\)/,
  "projected template colours must not be drawn as unmasked board-space cell rectangles",
);
assert.match(
  guideCacheSource,
  /templateOpacity[\s\S]*globalCompositeOperation\s*=\s*["']destination-in["']/,
  "the crisp template layer should be built in the same masked projection cache as the soft lamp guide",
);
assert.doesNotMatch(
  guideCacheSource,
  /spotRadius\s*\*\s*0\.7/,
  "projection mask should not fade by distance from the center",
);
assert.doesNotMatch(
  guideCacheSource,
  /const mask\s*=\s*ctx\.createRadialGradient/,
  "projection mask should be a solid circular crop, not a radial falloff",
);
assert.match(
  guideCacheSource,
  /globalCompositeOperation\s*=\s*["']destination-in["'][\s\S]*ctx\.arc\(spotCx,\s*spotCy,\s*spotRadius,\s*0,\s*Math\.PI\s*\*\s*2\)/,
  "projection mask should crop through a solid circle",
);

console.log("Projection regression checks passed.");
