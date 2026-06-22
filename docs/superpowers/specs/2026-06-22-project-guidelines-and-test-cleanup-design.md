# Project Guidelines and Regression Test Cleanup Design

## Goal

Give repository rules, product intent, design contracts, and automated tests one clear responsibility each. This prevents duplicated guidance from drifting and stops obsolete implementation-detail tests from blocking valid architectural changes.

The completed change should establish the following:

- `AGENTS.md` is the shared engineering guide for all coding agents.
- `CLAUDE.md` contains only Claude-specific entry points and project navigation.
- `PRODUCT.md` describes product intent without binding it to CSS variables or layout algorithms.
- `DESIGN.md` describes measurable interaction and visual outcomes without requiring the full mobile board to be visible initially.
- Regression tests protect user behavior, data correctness, and technical contracts that remain meaningful.
- The main branch does not retain known failing regression tests.

## Language Policy

- Agent-facing instructions use English: `AGENTS.md`, `CLAUDE.md`, implementation specifications, plans, code comments, JSDoc, and regression test comments.
- Product and design documentation remains Chinese: `PRODUCT.md`, `DESIGN.md`, and user-facing project documentation unless a document has a separate reason to use English.
- User-interface copy remains Chinese.
- Git commit messages remain English Conventional Commits.

## Document Responsibilities

### `AGENTS.md`: Shared Engineering Rules

Keep and strengthen the following guidance:

- Repository structure, coding style, generated assets, and the duplicated CSP update rule.
- Every change under `src/` must be followed by `npm run build`, and updated generated assets must be committed.
- Read `PRODUCT.md` and `DESIGN.md` before changing user-facing UI.
- New regression checks use `scripts/<area>-regression.mjs` with a matching `test:<area>` package script.
- Tests should prefer observable user behavior or stable public contracts. They must not require code to live in a particular file, use a particular private variable name, or preserve a source literal with no product meaning.
- When an architectural change invalidates an old contract, update, merge, or remove its regression test in the same change.
- Before merging to main, the focused tests and every currently registered regression test must pass. Known red tests are not an acceptable baseline.

### `CLAUDE.md`: Claude Project Entry Point

Reduce this file to:

- A short project description.
- A requirement to follow `AGENTS.md` first.
- Links to `PRODUCT.md`, `DESIGN.md`, `design-system/MASTER.md`, and deployment documentation.
- Claude- or impeccable-specific usage notes.
- No duplicated build commands, testing policy, commit style, CSP rules, or module map.

### `PRODUCT.md`: Product Intent

Add the following mobile board principles in Chinese:

- The mobile board is a zoomable and pannable workspace viewport. Its initial view does not need to show the complete board.
- Success means every active cell can be reached and edited through natural zooming and panning, not that the board is always shrunk to fit.
- Do not sacrifice bead legibility, placement accuracy, or immersion merely to provide an initial full-board view.
- Desktop, phone, and tablet may use different initial framing and tool density while sharing work state and phase semantics.

### `DESIGN.md`: Verifiable Design Contracts

Adjust the mobile workspace contract in Chinese:

- Treat the canvas as a viewport onto the board rather than a container that must always fit the entire board.
- The board may extend beyond the current viewport, but drawing, hit testing, zooming, and panning must use the same coordinate transform.
- Page-level layout must not expand without bounds because of board aspect ratio. Overflow belongs inside canvas navigation and must not push phase controls or the bead box out of the viewport.
- Phone controls and the bead box must remain reachable. Landscape tablet keeps its multi-column structure, but rectangular patterns must still respect available workspace height.
- Preserve the existing minimum 16px input font size and 44×44px touch-target requirements.

## Regression Test Cleanup

### Remove the Standalone `layout-ownership` Regression

Delete `scripts/layout-ownership-regression.mjs` and its package script. Its obsolete `--mobile-board-size` contract is no longer valid, and most of its remaining checks overlap with other mobile layout tests.

Move the still-useful check that forbids bare declarations inside CSS conditional groups into `ui-quality-regression.mjs`. Keep real DOM and keyboard order protected by `mobile-tab-order-regression.mjs`.

### Reduce `mobile-ui` to Stable Behavior

Remove source-regex assertions that require:

- A function call to appear in a particular source file.
- Haptic feedback to use one exact source string.
- DOM IDs or CSS class names whose existence does not prove correct user behavior and is already covered elsewhere.

Keep pure behavior checks such as workflow summaries and bead-settle calculations. Mobile interactions with user value should be covered by Playwright behavior tests.

### Update `mobile-unification`

Remove the assertion that `--mobile-board-size` must exist. Preserve tests for the unified board transform, heat model, mobile phase flow, and real browser interaction.

Do not require the initial mobile view to contain the complete board. Instead, verify that edge cells remain reachable after zooming and panning and that page-level canvas sizing does not push phase controls outside the viewport.

### Update `projection`

Keep projection mask, color enhancement, and cache-boundary checks. Update the projected bead radius contract to the current intentional `cell * 0.49`, which lets the guide halo remain visible around placed beads.

If this value becomes frequently adjustable, extract it to a named constant and test its visual relationship rather than repeatedly locking a private source literal.

## Verification

Implementation must complete all of the following:

1. Run `npm run build`.
2. Run every remaining registered `test:<area>` command.
3. Confirm there are no known failing tests.
4. Use Playwright to check phone portrait, tablet landscape, and desktop layouts.
5. Verify that mobile users can zoom, pan, and edit edge cells.
6. Verify that rectangular patterns do not make the canvas DOM element push controls outside the viewport.
7. Confirm `app.bundle.js` and `styles.css` match the source build.

## Non-Goals

This change does not redesign the visual language or alter gameplay, pattern data, ironing behavior, or theming. Modal focus management, orientation-overlay isolation, and other previously identified issues remain separate follow-up tasks.
