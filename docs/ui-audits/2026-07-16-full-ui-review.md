# UI Audit: full product UI review

Status: Gate D passed; final candidate independently signed off

## Charter

| Field | Value |
|---|---|
| Candidate ID | `9d4866c-c7ad76a6-dcb688c8` |
| HEAD | `9d4866c9c51d62614a054a1dfe1e62f1b4923bc0` |
| Product fingerprint | `89ae35f3a6adc2f44447b2245a3c9ef250e9a89a745bb34feded851dd5fea1ec` |
| Bundle hashes | `app.bundle.js` `c7ad76a69e70998bec9ca83baf099aaa8431cd6ba11d4039a5183d53d7c85747`; `styles.css` `dcb688c84f814419f0b9e2c87b19d0e883c50fe47b1b0194c50e5e82bf8b7dee` |
| Fingerprint method | SHA-256 of tracked binary diff excluding workflow/evidence files, plus SHA-256 manifests for `AUDIT_FIX_PLAN.md` and `docs/superpowers/specs/2026-07-08-sketch-ui-step2.md` |
| Pre-existing dirty product paths | `app.bundle.js`, `index.html`, `package.json`, `src/community.js`, `src/dom.js`, `src/draw.js`, `src/main.js`, `src/modal-controller.js`, `src/render.js`, `src/state.js`, `src/styles/components.css`, `src/styles/layout.css`, `src/styles/responsive.css`, `src/styles/screens.css`, `src/ui.js`, `styles.css`, `AUDIT_FIX_PLAN.md`, `docs/superpowers/specs/2026-07-08-sketch-ui-step2.md` |
| Evidence-only paths excluded | `AGENTS.md`, `docs/UI_REVIEW_PROTOCOL.md`, `docs/ui-audits/**` |
| In scope | All user-facing UI: home; six bead phases; drawing; gallery; collection; community; settings/modals/feedback; five themes; phone/tablet/desktop; mouse/touch/keyboard/reduced-motion; visible UI performance and accessibility |
| Out of scope | Cloud/API internals except visible states, pattern content data except presentation, audio rendering except controls, deployment infrastructure |
| Success conditions | Fix the reported home hover inconsistency and decorative dots; unify shared component/state vocabulary; no open P0-P2; all required scenarios pass; tests and independent sign-off pass |
| Sources reviewed | User brief; `PRODUCT.md`; `DESIGN.md`; `design-system/MASTER.md`; current tokens/themes/components; recent UI commits `4f20f6c..ce1e237`; pre-existing audit/spec documents |
| Theme source | `src/constants.js`: 雾青、奶杏、浅樱、晴蓝、草木 |
| Breakpoint source | `src/styles/tokens.css` and `src/styles/responsive.css`: 375, 420, 620, 860/861, 1179/1180, 1280 plus height/orientation cases |
| Core journeys | Home→choose→place→inspect→iron→cool→finish→collection; Home→drawing→create/import/export/start bead; gallery browse/import; collection browse/share; community tabs; settings/theme/tool style |
| Evidence directory | `/private/tmp/beam-ui-audit-2026-07-16/ce1e2376-89ae35f3` |
| Aggregate tests | `npm test` resolving all 27 registered `test:*` scripts |
| Baseline result | 24/25 pass outside sandbox; `test:ui-quality` fails stale assertion requiring mobile `#drawUsePatternButton { order:-1 }` although DOM order now provides accessible visual order |
| Reviewers | A: independent design critique; B: detector + technical/a11y/theming audit; C: responsive/scenario/test coverage; primary agent: synthesis only until Gate B freeze |

## Decisions

| ID | Conflict/question | Evidence | Decision/rationale | Affected contracts | Approver |
|---|---|---|---|---|---|
| D-001 | Should only 拼豆台 gain a tinted hover fill? | User reports inconsistency; `screens.css` gives only bead a fill; `ui-quality-regression` asserts it | Revise: sibling home entries need one coherent hover vocabulary; category color may remain secondary, not unequal interaction weight | `src/styles/screens.css`, `scripts/ui-quality-regression.mjs`, generated CSS | User brief |
| D-002 | Keep the colored bead scatter on the right of 拼豆台? | User explicitly asks removal; `.start-row-bead::after`; DESIGN Quiet Tray rule | Remove; it competes with hierarchy and is not functional | `src/styles/screens.css`, generated CSS | User brief |
| D-003 | Rounded/glass prose vs square ink-paper implementation | PRODUCT brand prose retains older rounded/glass wording; DESIGN and commits `4f20f6c..ce1e237` establish straight ink-paper language | Use the newer measurable straight ink-paper contract; flag stale prose for contract update if it affects implementation | `PRODUCT.md`, `DESIGN.md`, shared tokens/styles | Evidence synthesis |
| D-004 | Preserve the current two-font role system? | DESIGN assigns cute font to identity/moments and clear font to information; current product register guidance is generic | Keep role-based pairing, audit misuse and readability instead of replacing it wholesale | Typography rules and consumers | Evidence synthesis |

## Inventory and scenarios

Legend: `pass`, `fail(ISSUE)`, `source-pass`, `tool-invalid`.

| Surface/state | Phone 390x844 | Tablet 1024x768 | Desktop 1280x720 | Input/state notes |
|---|---|---|---|---|
| Home | `pass` | `pass` | `pass` | Unified row feedback; 200% reflow covered by `test:home-reflow` |
| Bead choose | `pass` | `pass` | `pass` | Live DOM plus screenshots |
| Bead place | `pass` | `pass` | `pass` | Live DOM, screenshots, keyboard/mobile regressions |
| Bead inspect/iron/cool/finish | `pass` | `pass` | `pass` | Each phase traversed live in sandbox mode and captured |
| Drawing idle/palette | `source-pass` | `source-pass` | `pass` | Mobile palette captured; `test:drawing-mobile`, keyboard and tab-order pass |
| Gallery loading/empty | `pass` | `source-pass` | `pass` | Loading and empty captured; error/retry/content branches source-reviewed |
| Collection empty/populated/viewer | `pass` | `pass` | `pass` | Square material plus dialog, inert-background and focus lifecycle regression |
| Community compose/tabs/states | `pass` | `source-pass` | `pass` | Loading/empty captured; failure/rollback and keyboard tabs source/test pass |
| Settings and five themes | `source-pass` | `source-pass` | `pass` | Mobile and two theme-modal screenshots are compositor-invalid; DOM bounds and token source are valid |
| Modals/import/export | `pass` | `pass` | `pass` | Persistent mode-appropriate label plus shared modal behavior |
| Touch/keyboard/focus | `pass` | `pass` | `pass` | Carousel indicators are noninteractive; modal and tab-order regressions pass |
| Reduced motion | `pass` | `pass` | `pass` | CSS global reduction and carousel JS guard verified |
| Breakpoint seams/orientation | `source-pass` | `source-pass` | `source-pass` | Responsive source plus mobile regressions; 200% is separately failed as UI-002 |

Reviewer A could not obtain an isolated browser binding and its initial screenshots were invalidated by stale browser zoom. Its source-backed home finding was retained; all visual cells were reassigned to the primary evidence capture and reviewer C. Reviewer B completed the detector/technical pass. Reviewer C completed the responsive/spacing pass.

## Findings and issues

Raw findings remain represented by their reviewer IDs in the mapping below.

| Canonical ID | Raw IDs | Severity | Issue and acceptance criteria | Status |
|---|---|---:|---|---|
| UI-001 | user, VA-004 | P2 | Home siblings use unequal hover treatments and 拼豆台 alone has decorative bead scatter. Remove `.start-row-bead::after`; give all five rows one structural hover/focus vocabulary with aligned border, fill and shadow. | verified — `78ab672` |
| UI-002 | RC-001 | P1 | Viewport locking can hide home content at 200% zoom. At 1280x720 and 1440x1000 at 200%, all destinations and featured work remain vertically reachable with no horizontal overflow. | verified — `78ab672`, `test:home-reflow` |
| UI-003 | TB-001, TB-006 | P1 | Enlarged collection viewer lacks dialog/focus lifecycle and uses stale soft-shadow material. Move it into shared modal semantics and square ink-paper tokens; trap/restore focus and make the background inert. | verified — `c2d0eac`, `test:modal-accessibility` |
| UI-004 | TB-002 | P1 | Showcase pagination dots are nested mouse-only 7px controls. Make them non-interactive indicators or independent labeled 44px controls; no nested interaction. | verified — `78ab672` |
| UI-005 | TB-003 | P1 | Share-code textarea is unnamed. Provide a persistent, mode-appropriate programmatic label. | verified — `c2d0eac`, `test:modal-accessibility` |
| UI-006 | TB-004 | P2 | Mobile drawing color chips were reported as 34px targets. Source and live regression show that selector is unused; actual `.color-chip` controls meet the 44px contract. | dismissed — detector false positive |
| UI-007 | TB-005 | P2 | `test:ui-quality` pins stale CSS `order:-1` despite corrected DOM order. Replace with DOM/live tab-order coverage and keep both UI-quality and mobile-tab-order green. | verified — `9786906` |
| UI-008 | TB-007 | P2 | Choose/remap status components contain undocumented fixed neutral colors. Replace with semantic/existing theme tokens and verify five-theme contrast/coherence. | verified — `3e9a87b` |
| UI-009 | RC-002 | P2 | Primary drawing and bead work squares use mismatched line/shadow hierarchy. Define and apply a shared primary-work-frame tier while keeping dense thumbnail frames quieter. | verified — `3e9a87b`, `9d4866c` |
| UI-010 | RC-003 | P2 | Collection empty state uses a one-off dashed/light square frame. Remove it or map it to a documented frame tier. | verified — `3e9a87b` |
| UI-011 | D-003 | P2 | `PRODUCT.md` still describes the retired rounded/glass language. Update it to the straight ink-paper contract so future UI work does not regress. | verified — `3e9a87b` |

No P0 was found. Detector false positives for the two-font system, `new Image()` usage, and deliberate canvas/logo colors were dismissed. Existing strong passes include core mobile structure, phase semantics, keyboard canvas operation, reduced motion, error/loading branches, theme token architecture, and event-driven canvas rendering.

## Batches

1. Complete — preserve and verify the pre-existing accessibility/performance candidate; fix stale regression UI-007 (`9786906`).
2. Complete — home interaction and reflow: UI-001, UI-002, UI-004 (`78ab672`).
3. Complete — shared square-frame/tokens and spacing: UI-006, UI-008, UI-009, UI-010, UI-011 (`3e9a87b`).
4. Complete — modal accessibility/material: UI-003, UI-005 (`c2d0eac`).
5. Complete — full regression and independent closeout; initial Gate D found two sibling-card P2 counterexamples, repaired in `9d4866c`, then independently retested.

## Sign-off

Gate D passed for candidate `9d4866c-c7ad76a6-dcb688c8`. The independent reviewer first failed candidate `c2d0eac` for a double-heavy gallery thumbnail frame and a moving library-card hover. Both were corrected in `9d4866c`; the targeted retest confirmed coherent outer/inner frame tiers, stationary card hover, generated bundle parity, and meaningful regression assertions. No open P0–P2 remains.

Commands run / coverage / P3 items / waivers / risks:

- Baseline: `npm test` (outside sandbox) passed 24/25 suites; the single stale UI-quality contract was repaired in `9786906`.
- Final candidate: `npm test` passed all 27 registered suites, including new home reflow and modal accessibility regressions.
- Corrected screenshots use 100% browser zoom. The in-app browser intermittently corrupts modal screenshots; affected captures are marked tool-invalid and are never treated as product defects.
- Remaining limitation: fresh final-candidate pointer-hover screenshots could not be captured because the in-app browser binding was unavailable. Deterministic CSS, generated bundle output, sibling selectors, and focused regressions were independently verified; this was accepted as non-blocking.
