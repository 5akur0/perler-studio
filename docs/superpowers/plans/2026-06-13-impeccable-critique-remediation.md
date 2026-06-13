# Impeccable Critique Remediation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Resolve the valid critique findings while preserving the intended platform split: mobile uses direct placement with current-pattern colors, while desktop bead placement and the drawing studio retain the full MARD 221-color palette.

**Architecture:** Keep the existing `useMobileDirectPlacement()` boundary as the platform policy. Changes should improve release hygiene, accessibility, mobile orientation, mobile selection continuity, and tactile feedback without sharing desktop tray/tool UI with mobile or reducing the desktop palette.

**Tech Stack:** Static HTML, modular JavaScript bundled by esbuild, CSS, Canvas 2D, Node regression scripts.

---

## Confirmed Non-Goals

- Do not add the bead tray, bead needle, or tweezers to mobile.
- Do not reduce the desktop bead palette from 221 colors.
- Do not reduce the drawing-studio palette from 221 colors.
- Do not change mobile bead placement from current-pattern colors to the full palette.
- Do not merge the platform-specific placement interactions into one compromised layout.

## Priority Order

1. **P1:** Remove Impeccable live/variant residue from the production page and CSP.
2. **P1:** Restore browser zoom and make bead placement keyboard-completable.
3. **P2:** Add compact mobile workflow orientation.
4. **P2:** Remove the mobile pattern-selection scroll-and-recall loop.
5. **P3:** Strengthen tactile feedback for mobile direct placement.

## Task 1: Production Release Hygiene

**Files:**
- Modify: `index.html`
- Modify: `_headers`
- Modify: `package.json`
- Create: `scripts/release-regression.mjs`

- [x] Add a regression script that reads `index.html` and `_headers`, then fails when it finds `impeccable-live`, `impeccable-variants`, `localhost:8400`, `live.js`, or `data-impeccable-variant`.
- [x] Run `node scripts/release-regression.mjs` and verify it fails against the current page.
- [x] Remove the Impeccable live script and variant experiment from `index.html`.
- [x] Remove the localhost live-server allowances from both CSP copies in `index.html` and `_headers`.
- [x] Add `"test:release": "node scripts/release-regression.mjs"` to `package.json`.
- [x] Run `npm run test:release` and verify it passes.
- [x] Run `npm run build`, `npm run test:icons`, and `npm run test:session`.

## Task 2: Zoom and Keyboard Accessibility

**Files:**
- Modify: `index.html`
- Modify: `src/main.js`
- Modify: `src/state.js`
- Modify: `src/ui.js`
- Modify: `src/render.js`
- Modify: `src/styles/components.css`
- Modify: `scripts/session-regression.mjs`
- Create: `scripts/keyboard-regression.mjs`
- Modify: `package.json`

- [x] Add a regression assertion proving Ctrl/Cmd `+`, `-`, `=`, `_`, and Ctrl/Cmd-wheel are not cancelled by application handlers.
- [x] Remove the browser-zoom prevention listeners from `src/main.js`.
- [x] Make `#sceneCanvas` focusable and activate the bead-grid cursor only while that canvas owns keyboard focus.
- [x] Define a keyboard bead cursor in state with row, column, and visibility.
- [x] Add keyboard commands for bead placement: arrows move the grid cursor, Space/Enter places or removes the selected bead, and Escape clears the cursor before leaving the screen.
- [x] Render the visible board-cell focus indicator in `src/render.js` without changing canvas dimensions or pointer interaction.
- [x] Announce cursor position, selected MARD color, and placement/removal through the existing polite status channel.
- [x] Keep WASD pan and Z/X board zoom available when the grid cursor is inactive.
- [x] Run `npm run build`, `node scripts/keyboard-regression.mjs`, and existing regression scripts.

## Task 3: Compact Mobile Workflow Orientation

**Files:**
- Modify: `index.html`
- Modify: `src/ui.js`
- Modify: `src/styles/components.css`
- Modify: `src/styles/responsive.css`
- Modify: `scripts/session-regression.mjs`

- [x] Add a compact mobile-only progress element inside the bead top bar.
- [x] Render `当前序号/总数 · 当前阶段` and the next stage label when one exists.
- [x] Keep the desktop workflow rail unchanged.
- [x] Preserve a compact current-pattern thumbnail and name after leaving selection.
- [ ] Verify 375px portrait width has no horizontal overflow and top-bar controls remain at least 44px.
- [x] Verify the indicator updates from current phase state, including backward navigation and restored sessions.

## Task 4: Mobile Pattern Selection Continuity

**Files:**
- Modify: `index.html`
- Modify: `src/ui.js`
- Modify: `src/styles/screens.css`
- Modify: `src/styles/responsive.css`
- Modify: `src/custom-pattern.js`

- [x] Add a mobile sticky selection summary containing the chosen pattern name, size, color count, thumbnail, and “开始拼豆”.
- [x] Keep the full preview canvas available above, but remove the need to scroll back to it after selecting a lower list item.
- [x] Show denoise and white-background controls only after the custom-image path is activated.
- [x] Keep desktop selection layout and controls unchanged.
- [ ] Test built-in patterns, imported images, resized patterns, and returning from placement to selection.

## Task 5: Mobile Direct-Placement Tactile Feedback

**Files:**
- Modify: `src/main.js`
- Modify: `src/render.js`
- Modify: `src/styles/components.css`
- Modify: `src/styles/responsive.css`
- Modify: `src/utils.js`

- [x] Preserve the current mobile color filtering in `renderPalette()`: only codes with `getTargetCounts()[code] > 0`.
- [x] Add a short held-color acknowledgement when a mobile color chip is selected.
- [x] Add a lightweight bead settle response in `src/render.js` after successful direct placement, using Canvas drawing state rather than a new DOM layer.
- [x] Avoid adding persistent tool panels, tray controls, or extra placement steps.
- [x] Add a reduced-motion path that keeps state feedback but removes movement.
- [ ] Verify rapid taps, replacement, same-color removal, wrong-color placement, and 100×100 boards remain responsive.

## Final Verification

- [x] Run `npm run build`.
- [x] Run `npm run test:release`.
- [x] Run `npm run test:icons`.
- [x] Run `npm run test:session`.
- [x] Run the new keyboard regression.
- [ ] Inspect mobile widths at 375 and 430 pixels.
- [ ] Inspect desktop widths at 1024 and 1440 pixels.
- [x] Confirm mobile placement code filters to current-pattern colors.
- [x] Confirm desktop placement code retains the full color set with current-pattern highlighting.
- [x] Confirm the drawing studio code uses the full color set.
- [ ] Re-run `$impeccable critique index.html`.

Automated verification completed on 2026-06-13. Browser viewport inspection and the full visual critique remain open because the in-app browser was unavailable in this environment. The static Impeccable detector was rerun and reported only the existing single-font warning.
