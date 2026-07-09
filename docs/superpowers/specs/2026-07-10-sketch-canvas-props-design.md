# Sketch-Language Canvas Props Restyle — Design

Date: 2026-07-10
Status: approved by user (scope, form language, and edge cases confirmed in brainstorming)

## Background

The 2026-07 sketch redesign moved every CSS surface from the three-layer glass
language to hand-drawn paper+ink: solid paper fills, square corners, solid ink
outlines (`--ink-line`), and hard sticker shadows (`--sketch-shadow*`, zero
blur). The canvas-drawn workbench props (bead tray, pegboard skin, reference
sheet, lamp switch, tools, iron, finish-stand props, share poster) still use
the old realistic treatment — linear/radial gradients, `shadowBlur` soft
shadows, rounded corners — and now clash with the surrounding UI. The desk and
floor (`paintWorkbench`) were already converted to flat line-art.

## Decisions (user-confirmed)

1. **Scope: props only, beads untouched.** Beads (`drawBead`,
   `drawTrayBeadRandomized`, `drawFallenBead`, contact shadows, H1 frosted
   treatment) are player-facing artwork content — same exemption class as the
   theme background photos. They keep their current rendering.
2. **Form language: fully aligned with the CSS tokens.** Square corners, solid
   flat fills, solid ink outlines, hard offset shadows (solid color, zero
   blur). No wobble, no jitter, no soft shadows, no gradient faces.
3. **Gameplay feedback effects stay untouched.** Lamp glow, iron heat tint,
   steam, cooling shimmer/trails, fusion inspection bridges, artwork sheen,
   progress bars, pour/scatter animations, brand-tinted 10×10 checkerboard,
   board guides, empty-state copy. Only the prop “shells” around them change.
4. **Finish-stand props are in scope** (wood-grain frame, cork board, metal
   hanging ring, gradient base) — they are stage props like the tray/board.
   The artwork’s own sheen stays (content exemption).
5. **The share poster (`render-export.js`) is in scope** and gets a proper
   sketch-language redesign (see §4), not a naive gradient strip-out. It is an
   outward-facing asset: user accepts a real exported image separately.

## 1. Sketch primitives (`render-primitives.js`)

JS constants mirroring `tokens.css` (annotated back-references, same precedent
as `constants.js` mirroring `--table`):

```js
export const SKETCH_INK = "#26242b";              // = --ink / --ink-line
export const SKETCH_INK_SOFT = "rgba(38,36,43,0.55)"; // = --ink-line-soft (hard-shadow ink)
export const SKETCH_PAPER = "#ffffff";            // paper white, same as SCENE_DESK
export const SKETCH_BW = 2;                       // = --sketch-bw (container outline, CSS px)
export const SKETCH_BW_CTL = 1.5;                 // = --sketch-bw-ctl (small control outline)
export const SKETCH_SHADOW = 3;                   // = --sketch-shadow offset
export const SKETCH_SHADOW_SM = 2;                // = --sketch-shadow-sm offset
```

Core helper — every prop shell goes through it:

```js
sketchRect(ctx, x, y, w, h, { fill = SKETCH_PAPER, bw = SKETCH_BW, shadow = SKETCH_SHADOW })
```

Draws, in order: (1) a solid `SKETCH_INK_SOFT` shadow block at
`(x+shadow, y+shadow)` — replaces `shadowBlur`; (2) the square-cornered flat
body fill; (3) the ink outline. `shadow: 0` skips the shadow block. Line
widths are CSS-pixel values (contexts are already dpr-scaled); callers that
render at poster resolution scale `bw`/`shadow` proportionally.

## 2. Main workbench props

| Prop | Treatment |
|---|---|
| Bead tray `drawTray` (render-tray.js) | Body gradient → paper-white flat; 20px soft shadow → 3px hard block; radius 8 → square. Grooves stay (functional slots) but lose the white highlight stroke — single flat light-ink line. Remove the two decorative rgba inlay fills. Dump-button shell → square ink outline + small hard shadow. Keep: progress bar, pour/scatter animation, empty-state copy, bead rendering. |
| Pegboard `drawBoardSkin` (board-skin.js) | Frame gradient → flat fill + ink outline + hard shadow; soft shadow → hard block; outer/inner radius → 0. Keep: brand-tinted checkerboard, guides. Propagates to every pattern thumbnail (choose cards, gallery, collection) — intended unification, verify via screenshots. `drawPixelPatternPreview` background gradient → flat `table[1]`. |
| Paper / reference sheet `drawPaper` / `drawReferenceSheet` | Paper gradients → paper-white flat + ink outline + hard shadow; tape gradient → flat translucent block + thin ink edge; radial correction patches → flat fills. |
| Lamp switch `drawLampSwitch` | Plate gradient + soft shadow → paper flat + ink outline + hard shadow + square corners. Cord double stroke (gradient + white highlight) → one thin ink line, keeping the far-end fade-out (avoids a hard cut). Bulb radial gradient → flat state color (on = warm yellow / off = grey-white) + ink ring. Keep: the on-state radial glow (gameplay feedback). |
| Tools (needle / tweezers) | Drop soft shadows entirely (pointer-following entities; a hard shadow would jump). Metal gradients → flat fills + ink outlines. |
| Iron + cooling layer | Iron shell → flat + ink + hard shadow. Keep: heat tint, steam, cooling shimmer, trail gradients. |
| Inspect stage (render-inspect.js) | Background gradient → flat fill. Keep: inspection capsule bridges. |
| Drawing screen (draw.js:725) | Three-stop desk gradient → flat `theme.table[1]` (same approach as `paintWorkbench`). |

## 3. Finish stand (`render-finish.js`)

Wood-grain gradient frame → flat colored frame + ink outline + hard shadow.
Cork-board gradient → flat warm brown + ink outline. Metal-gradient hanging
ring → flat grey + ink ring. Two-gradient base → two flat faces. Keep the
artwork sheen (content exemption, same as the tray-stage sheen kept in the
CSS migration).

## 4. Share poster (`render-export.js`) — redesign

Reframed as an “artwork card on paper”, not a gradient strip-out:

- Background dual glow + gradient → plain paper-white ground with generous
  margins, like a real card.
- Gradient badge → flat brand-color badge + ink outline + small hard shadow.
- 48px soft shadow around the artwork → ink frame + hard sticker shadow at
  `--sketch-shadow-lg` proportions (5px base, scaled to poster resolution).
- Typography unchanged; artwork sheen kept.
- Acceptance: user reviews an actual exported image separately.

## 5. Explicit keep-list (do not touch)

Beads (`drawBead`, tray beads, fallen beads and their contact shadows), fusion
bridges and sheen, cooling effects, lamp glow, heat tint, checkerboard,
guides, progress bars, empty-state copy, desk/floor (`paintWorkbench`, already
line-art).

## 6. Implementation order & acceptance

1. Primitives → **tray + pegboard** → browser check (**first checkpoint**, the
   two props the user called out).
2. Then roll out: paper/lamp/tools/iron → inspect/drawing screen → finish
   stand → poster (screenshot check each).
3. Docs: add a “canvas prop sketch language” section to `DESIGN.md`; also pay
   down the pending `design-system/MASTER.md` §2/§5 sync debt.
4. Acceptance: desktop / mobile / tablet-landscape (shared canvas code —
   CLAUDE.md hard rule), `npm test` all green, `npm run build` with rebuilt
   bundles committed alongside the source.

Out of scope: any bead-rendering change, poster typography redesign beyond the
surface treatment, background photo changes.
