# Choose-Screen Pattern Library Reshape — Design

Date: 2026-06-27
Status: Approved (pending spec review)

## Problem

The bead studio's choose phase (图纸库 / pattern library, rendered by
`renderPatterns()` in `src/ui.js`) reads like a CRUD file manager rather than the
North Star "桃面糖豆手作 / Cozy Pastel Bead Tray". Concretely, grounded in
real-app screenshots (desktop 1280, mobile 390):

1. **Every card permanently wears a ⭐ + 🗑 chip floating over the artwork preview.**
   Semi-transparent white pills sit directly on the pixel art — the single biggest
   source of visual noise, and they cover the work that should be the star of the
   screen.
2. **「导入分享码」, the screen's only primary action, is a thin, faint text button**
   pinned at the footer. It has no CTA presence.
3. **The top workflow stepper (`#workflowProgress`) looks dead-grey/cluttered** in
   choose because only step 1 is active and upcoming steps render as flat grey.
4. **Cards are flat (thin border + pale gradient) and thumbnails carry a busy grid
   底纹**, giving the whole screen a uniform "Material/AI-generated grid" feel that
   DESIGN.md explicitly rejects (§6 Don't: 生成感 / 同质化等大卡片网格).

User goal: **reshape this screen** (not a light touch, not a structural rethink),
fix all four ugly points, and keep it **cohesive with the existing system and
refined — explicitly not AI-flavored**.

## Decisions (locked with user)

1. **Ambition = reshape this one screen.** Functions unchanged (load-to-bead,
   star/pin, rename, delete, import code, restore defaults). Visual language only.
2. **Targets = all four:** card ⭐/🗑 chips, 「导入分享码」 button, top grey stepper,
   and the card/thumbnail itself. Plus the cross-cutting constraint: stay cohesive
   with the 糖豆托盘 system, refined, no AI aesthetic.
3. **Approach A — 糖豆托盘卡 (chosen).** Reframe each card as a small bead tray:
   clean artwork, management moved off the art into a quiet footer row, real CTA,
   calmer stepper. (Approach B "only move buttons" rejected as too small; Approach
   C "big-preview + chooser strip" rejected as a structural rethink with AI-redesign
   smell and risk to the stable working layout.)
4. **Stepper handled globally but state-only.** It is a shared component across all
   bead phases. We restyle its *upcoming/active state appearance* (which benefits
   every phase), we do **not** change its DOM structure, and we verify no regression
   by screenshotting each phase.

## Scope

In scope:
- `src/ui.js` — `renderPatterns()` / `buildLibraryGrid()` card and footer DOM:
  remove the over-art controls overlay; add a quiet footer action row (star · name ·
  delete); make 导入分享码 the primary CTA and 恢复默认 a secondary ghost.
- `src/styles/components.css` — 图纸库 block (`.library-*`): tray-card styling,
  themed preview mat, footer action row, primary CTA, empty state polish.
- Thumbnail grid alpha — soften the pegboard grid lines in the library preview.
  `drawPixelPatternPreview` lives in `src/board-skin.js`; the library thumb call is
  `drawPatternThumb` → `src/ui.js:362`. Add an optional lighter-grid flag/param so
  only the library preview is softened (current/mobile selection thumbs unchanged).
- Workflow stepper state styling — `.workflow-progress` upcoming/active/completed
  states in `src/styles/components.css` (+ any mobile overrides in
  `src/styles/responsive.css`); restyle only, DOM structure untouched.

Out of scope:
- The choose-phase *layout* (flex column: `.library-scroll` + `.library-footer`),
  the mobile working/board model, any phase other than choose for layout.
- Stepper DOM structure or step logic.
- Data layer (`pattern-library.js`) — no behavior change; its regression test stays
  green unchanged.

## Behavior / Design Detail

### ① Card = 糖豆托盘 (tray)
- **Artwork preview is fully clean** — no star, no delete, no overlay on the art.
  The preview button (`.library-card-open`, tap = load + start beading) stays, only
  its overlay children move out.
- Preview sits on a **theme-tinted mat** (`--brand-tint` / `--surface-2`, so it
  re-tints per theme) instead of a cold white box.
- **Footer action row under the preview** replaces the floating controls:
  - Left: ⭐ pin toggle (outline → amber-filled when starred).
  - Center: name (cute font, tap = rename modal, ellipsis on overflow).
  - Right: 🗑 delete (quiet muted → coral on hover/focus).
  - Visual size ~28px; touch target expanded to ≥44px via the existing transparent
    `::before` inset overlay (no visual enlargement, no layout shift).
  - Default low-contrast; star/delete only "light up" on hover / active / pressed.
  - On narrow mobile (2-col), name keeps a readable middle width via ellipsis;
    chips stay visually small so the name is not crushed.
- Card keeps soft-clay shadow + hover lift (`translateY(-1px)` + `--sh-card-hover`)
  and the brand-edge inset ring on `.active` (current pattern).

### ② Thumbnail grid
- Lower the pegboard grid-line alpha by one step for the library preview so the
  pixel art reads as the subject while the board hint stays faint. Tune at the
  draw call; do not change geometry/letterboxing (`pixelPatternPreviewLayout`).

### ③ Primary CTA 「导入分享码」
- Becomes the screen's single primary CTA: cute font + `upload` icon + brand cta
  gradient (`linear-gradient(180deg, --brand-cta, --brand-cta-strong)`) + white
  text + `--sh-inset` top highlight + soft brand shadow, `--r-sm`, height `--tap-min`,
  full footer width.
- 「恢复默认」 (only when defaults were deleted) is a secondary ghost button beside
  it (white/ink, `--r-sm`). Preserves the "≤1 primary CTA per screen" rule.

### ④ Workflow stepper (shared, state-only)
- Upcoming steps: from dead grey → calm "to-do" (lighter label + `--brand-tint`
  dot). Current step: brand-colored. Completed (in later phases): brand check/fill.
- No DOM/structure/logic change. Verify all phases (choose/place/inspect/iron/
  cool/finish) visually unchanged-or-improved via screenshots.

### ⑤ Anti-AI / cohesion
- Keep the library grid (correct for a gallery of saved patterns). The non-AI feel
  comes from: tray framing, themed preview mats, cute-marker section heading, and
  soft-clay shadows — not from flat, identical Material cards. All colors via
  tokens (Theme-Token Rule); icons stay SVG; no emoji as UI.

## Constraints (from DESIGN.md / PRODUCT.md)
- Theme-Token Rule: never hardcode mint; all colors via `var(--brand…)` etc.
- Touch targets ≥44×44px; body/small text ≥4.5:1; cta gradient only on large text.
- `≤1` primary CTA per screen; hover changes color/shadow only (no scale).
- Two-font system: cute for the CTA / name / heading; clear for any small/number.
- Wrap any new animation in `prefers-reduced-motion`.

## Testing / Verification
- `npm run test:pattern-library` stays green (data layer untouched).
- `npm run test:ui-quality` re-run (and extend if it asserts on `.library-*`).
- Playwright re-shoot: choose phase desktop (1280) + mobile (390) before/after; and
  one screenshot per bead phase to confirm the stepper restyle has no regression.
- Manual contrast spot-check on the themed preview mat across the 5 themes.

## Open Questions
None — direction and stepper handling approved by user.
