# UI Audit: workbench adaptive layout restart

Status: Gate D passed; adaptive-layout review complete

## Charter

| Field | Value |
|---|---|
| Baseline candidate ID | `bc376ee67559-316cf6ac-908fbb2a-c7ad76a6-b6ca24bb` |
| HEAD | `bc376ee67559f4f144f87435ad0cc0f32bd74e2c` |
| Product-worktree fingerprint | Tracked binary diff SHA-256 `316cf6ac0314dbc17736fc0e3933b845dcff17da99530e0ba87a5983a3fa6960`; obsolete layout-spec SHA-256 `908fbb2a9d920ef81d24bd94974d66accdaf2766474979833fe0720bae157ca7` |
| Baseline bundle hashes | `app.bundle.js` `c7ad76a69e70998bec9ca83baf099aaa8431cd6ba11d4039a5183d53d7c85747`; `styles.css` `b6ca24bbbd690cfcbb7d449ec55d487f1b689bb5a453e0e1e1824e654790ec5e` |
| Pre-existing dirty product paths | `src/styles/components.css`, `src/styles/responsive.css`, `src/styles/tokens.css`, `styles.css`, `AUDIT_FIX_PLAN.md`, `docs/superpowers/specs/2026-07-08-sketch-ui-step2.md`, `docs/superpowers/specs/2026-07-17-layout-system.md` |
| In scope | Replace the obsolete 2026-07-17 layout spec; define a source-backed, measurable adaptive-layout contract; update `DESIGN.md`; implement and regress the bead working phases and drawing studio shared workbench layouts; protect phone behavior; update generated CSS and affected tests |
| Out of scope | Duo mode; pattern-library content design; gallery/collection/community redesign; visual skin, colors, fonts, canvas art direction, cloud/API behavior; unrelated pre-existing library-card footer edits |
| Observable success conditions | Within one topology, same-aspect window scaling keeps column shares approximately stable; the primary work surface never becomes unusably narrow while two supporting rails remain open; layout topology changes before any pane violates its measured minimum; all controls remain reachable; no horizontal page overflow; phone remains behaviorally unchanged; all registered tests and independent sign-off pass |
| Sources reviewed | User corrections in this thread; `AGENTS.md`; `PRODUCT.md`; `DESIGN.md`; `design-system/MASTER.md`; `docs/UI_REVIEW_PROTOCOL.md`; current layout source and renderer geometry; commits `60b194c..bc376ee`; Apple HIG Layout/Sidebars; Android Material canonical supporting-pane and window-size guidance; Microsoft responsive-layout guidance; WCAG 2.2 Reflow |
| Theme source | `src/constants.js`: 雾青、奶杏、浅樱、晴蓝、草木; layout change must remain token- and theme-neutral |
| Breakpoint source | Current: `src/styles/tokens.css` and `src/styles/responsive.css` at 860/861, 1179/1180, 1280 plus orientation/height queries. Replacement breakpoints must be derived from pane feasibility, not copied from device labels. |
| Core journeys | Home → bead choose → place → inspect → iron → cool → finish; Home → drawing; smoke gallery/collection/community; settings/modal/feedback; pointer desktop, touch tablet, keyboard/focus, reduced motion, 200% zoom |
| Baseline evidence | `/private/tmp/beam-ui-audit-2026-07-17/baseline` (20 screenshots plus `measurements.json`) |
| Aggregate tests | `npm test`, resolving all 27 registered `test:*` suites |
| Baseline test result | Sandbox run: 21/27 passed and six browser suites failed only because the sandbox denied temporary loopback listeners (`EPERM`). Approved outside-sandbox rerun reached the browser suites without those listener failures; a clean final aggregate result is required before Gate C completion. |
| Reviewers | VA: `/root/visual_canvas_audit`, visual-system and DOM/Canvas coherence; IA: `/root/interaction_a11y_audit`, interaction/accessibility; RC: `/root/responsive_coverage_audit`, responsive behavior/test coverage; primary agent: synthesis, ledger, spec, serialized implementation, build/integration only |

## Decisions

| ID | Conflict/question | Evidence | Decision/rationale | Affected contracts | Approver |
|---|---|---|---|---|---|
| D-001 | Does “delete the previous specifications” mean deleting all historical product specs? | User discussion concerns the newly written layout spec; repository contains unrelated duo, audio, sharing, and icon specs | Delete and replace only `docs/superpowers/specs/2026-07-17-layout-system.md`; retain unrelated specifications | Layout spec inventory | User intent, scoped by primary agent |
| D-002 | Can one external design system supply exact three-pane widths? | Apple, Material, Microsoft, and WCAG agree on primary-content priority and topology changes, but none knows this renderer or panel content | Cite external principles, then define local numeric contracts from measured content geometry | New layout spec and `DESIGN.md` | User approved this approach |
| D-003 | What wins when all three panes cannot fit? | User reports the center being squeezed; PRODUCT makes the work and screenshot the primary content; renderer reserves at least 260px beside the desktop board | Primary work surface wins. Supporting panes shrink only to validated minima, then a lower-priority pane is removed from the simultaneous layout before the center is squeezed below its minimum. | Grid tracks, breakpoint topology, tests | User intent |
| D-004 | Should phone be redesigned as part of the restart? | Existing product contract intentionally gives phone a separate direct-placement flow | Preserve the ≤860 phone topology and behavior; treat it as a regression boundary unless Gate B finds a change-induced blocker | Responsive CSS and mobile regressions | Product contract |
| D-005 | Where can the full three-column topology begin? | Independent responsive evidence shows the renderer and panel floors require `196 + 540 + 204 + 32 + 36 = 1008px` | Use a center-first compact topology from 861–1007 and enable the full three-column topology at 1008px | Layout tokens, responsive CSS, observable regression | Evidence synthesis |
| D-006 | Should the old 780px cap and automatic centering survive? | User reports missing top/bottom spacing; VA-003, IA-005, and RC-03 independently reproduce the regression | Remove the universal fixed-height cap and `margin-block:auto`; keep the authored 16px top gap and let working columns consume available height | Responsive CSS, new spec, DESIGN | User + evidence synthesis |

## Inventory and scenarios

| Inventory ID | Surface/component/behavior | Scenario IDs |
|---|---|---|
| INV-01 | Home and mode navigation | S-01, S-18 |
| INV-02 | Bead choose/library | S-02, S-18 |
| INV-03 | Bead place workbench | S-03, S-04, S-05, S-06, S-07, S-15, S-16, S-17 |
| INV-04 | Bead inspect/iron/cool/finish | S-08, S-15, S-16 |
| INV-05 | Drawing tools/canvas/palette | S-09, S-10, S-11, S-12, S-15, S-16, S-17 |
| INV-06 | Gallery | S-13, S-18 |
| INV-07 | Collection | S-13, S-18 |
| INV-08 | Community | S-13, S-18 |
| INV-09 | Modals, overlays, feedback | S-14, S-15, S-16 |
| INV-10 | Shared panels, scroll areas, controls, tokens | S-03 through S-17 |
| INV-11 | Empty/loading/error/disabled/destructive states | S-13, S-14, S-18 |
| INV-12 | Theme, input, motion, zoom, breakpoint seams | S-15, S-16, S-17, S-18 |

| Scenario ID | Trigger/fixture | Viewport | Theme | Input/state | Observable expectation | Evidence | Primary/cross-check | Result |
|---|---|---|---|---|---|---|---|---|
| S-01 | Load home | 390×844, 1024×768, 1440×900 | 雾青 | touch/pointer | Destinations remain reachable; no page overflow | candidate screenshots + aggregate regressions | VA / IA | pass |
| S-02 | Open bead pattern library | 390×844, 1024×768, 1440×900 | 雾青 | choose | Library remains usable and is not altered by working-layout rules | candidate screenshots + pattern-library regression | VA / RC | pass |
| S-03 | Start bead place | 390×844 | 雾青 | touch | Existing single-column board/actions/palette order and reachability remain unchanged | candidate screenshot + mobile regressions | IA / RC | pass |
| S-04 | Start bead place | 1024×768 | 雾青 | touch landscape | Board stays legible and reachable; any simultaneous supporting panes satisfy feasibility rules | candidate screenshot + geometry | RC / VA | pass |
| S-05 | Start bead place | 1000×625 | 雾青 | pointer, short window | Center does not collapse behind two persistent rails; all controls remain reachable | candidate screenshot; center 708px | RC / IA | pass |
| S-06 | Start bead place | 1440×900 | 雾青 | pointer | Stable three-pane composition, internal scroll only where intended | candidate screenshot + geometry | VA / RC | pass |
| S-07 | Start bead place | 1600×1000 and same-aspect smaller pair | 雾青 | pointer | Same topology preserves approximate column shares under uniform window scaling | candidate geometry + workbench regression | RC / VA | pass |
| S-08 | Traverse inspect/iron/cool/finish | 390×844, 1024×768, 1440×900 | 雾青 | touch/pointer | Phase changes do not move or shrink the primary stage unexpectedly; hidden rails do not reserve harmful space | phase smoke + mobile-unification regression; shared phase-independent track | VA / IA | pass |
| S-09 | Open drawing studio | 390×844 | 雾青 | touch | Existing mobile canvas and palette-sheet behavior remains reachable | candidate screenshot + drawing-mobile regression | IA / VA | pass |
| S-10 | Open drawing studio | 1024×768 | 雾青 | touch landscape | Canvas remains primary; tools/palette adapt before the square becomes unusable | candidate screenshot + geometry | RC / IA | pass |
| S-11 | Open drawing studio | 1000×625 | 雾青 | pointer | Square canvas remains operable; side panes do not consume the work surface | candidate screenshot; center 708px | RC / VA | pass |
| S-12 | Open drawing studio | 1440×900 and 1600×1000 | 雾青 | pointer | Stable wide composition; no unjustified fixed-rail share drift | candidate screenshots + geometry | VA / RC | pass |
| S-13 | Open gallery, collection, community | 390×844, 1024×768, 1440×900 | 雾青 | loading/empty/content/error where available | Unrelated surfaces smoke-pass without layout regression | independent baseline smoke + aggregate UI regressions | VA / IA | pass for available fixtures; missing backend fixtures documented |
| S-14 | Open settings and representative modal/feedback | 390×844, 1024×768, 1440×900 | 雾青 | keyboard/touch/pointer | Focus, scroll containment, dismissal, overlay stacking, and destructive affordances remain intact | modal-accessibility + keyboard regressions | IA / VA | pass |
| S-15 | Workbench interaction sweep | 390×844, 1024×768, 1440×900 | 雾青 | keyboard, focus, touch, hover/drag | All essential controls and valid board cells remain reachable; ≥44px touch targets where required | keyboard, mobile-tab-order, mobile-ui, projection regressions | IA / RC | pass |
| S-16 | Accessibility sweep | 1280×720 at 200%, representative normal sizes | 雾青 | zoom and reduced motion | No loss of essential function; two-dimensional editor exception remains bounded to the work surface | 640×360 workbench regression + reduced-motion source/test coverage | IA / RC | pass |
| S-17 | Breakpoint/aspect sweep | 860/861, derived feasibility edges, 1179/1180, short/tall, 4K | 雾青 | pointer and touch variants | Topology switches before pane minima fail; no discontinuity, clipping, or horizontal page overflow | exact 861/1007/1008 regression; same-aspect pair; candidate matrix | RC / VA | pass |
| S-18 | Five-theme and unaffected-surface sample | 390×844, 1024×768, 1440×900 | all five | representative states | Layout remains theme-neutral; unaffected surfaces retain material and behavior | geometry-only token/source review + unaffected aggregate regressions | VA / IA | pass; no visual token changed |

## Findings and issues

| Raw ID | Reviewer | Severity | Scenarios | Observation/expected | Evidence | Root-cause hypothesis | Gaps/conflicts |
|---|---|---|---|---|---|---|---|
| BASE-001 | primary | P1 candidate | S-04, S-05, S-10, S-11 | At 1024×768 and 1000×625, the center receives only 49.1%/49.0% of the grid (485px/472px) while both supporting panes remain open. Expected: primary stage remains above its validated functional minimum or topology changes. | baseline `measurements.json` and screenshots | Shared `clamp(...vw...max)` rails reserve about half of the grid before center feasibility is evaluated | Gate B must validate minimums and severity |
| BASE-002 | primary | P2 candidate | S-06, S-07, S-12 | Center share drifts from 49% at compact sizes to 58.3% at 1600 because rails hit fixed maxima; expected approximate same-topology continuity under uniform scaling. | baseline `measurements.json` | Non-homogeneous rail clamps plus independent height cap | Need exact same-aspect pair and visual cross-check |
| VA-001 / IA-001 / RC-01 | independent lenses | P1 | S-04, S-05, S-10, S-11, S-17 | Full three columns at 861px collapse the desktop board to about 104px. The main stage must meet the 540px full-layout floor or use the compact topology. | reviewer A/B/C evidence directories | Legacy device breakpoint ignores content feasibility | Confirmed by all three lenses |
| VA-002 / RC-04 | independent lenses | P2 | S-06, S-07, S-12 | Same-aspect center share drifts by 9.3 percentage points. Same-topology track shares must remain within ±2 points until content-max. | reviewer A/C comparisons | Fixed rail ceilings | Confirmed |
| VA-003 / IA-005 / RC-03 | independent lenses | P2 | S-06, S-07, S-12 | Fixed 780px height and automatic centering remove the authored top gap and create viewport-dependent letterboxing. | reviewer A/B/C evidence | Universal block-axis cap | Confirmed; user also reported live |
| IA-002 / RC-02 | independent lenses | P1 | S-16 | At the 640×360 200%-zoom proxy, the board collapses to 2px with no scroll escape. | reviewer B/C evidence | Fixed mobile dock consumes the locked short viewport | Confirmed |
| VA-004 / RC-06 | independent lenses | P2 | all affected | DESIGN, obsolete spec, source comments, and tests disagree. | source audit | Stale contracts | Confirmed |
| IA-003 | interaction/a11y lens | P1, pre-existing/out of scope | drawing mobile palette sheet | The color sheet lacks complete keyboard-dialog behavior. | reviewer B evidence | Sheet does not use the shared modal controller | Separate accessibility task; not caused by this layout change |
| IA-004 | interaction/a11y lens | P1, pre-existing/out of scope | forced-orientation overlays | Underlying controls remain keyboard reachable behind the overlay. | reviewer B evidence | Overlay is visual-only and does not inert the app | Separate accessibility task; not caused by this layout change |
| IA-006 | interaction/a11y lens | P2, pre-existing/out of scope | community phone | Nickname input is 42px high versus the 44px project floor. | reviewer B evidence | Community-specific sizing bypasses shared field token | Separate community/accessibility task; not caused by this layout change |

| Issue ID | Raw IDs | Severity/reason | Acceptance criteria | Fix+sibling scope | Implementer | Verifier | Candidate | Status |
|---|---|---|---|---|---|---|---|---|
| LAYOUT-001 | BASE-001, VA-001, IA-001, RC-01 | P1: primary task becomes unusable near 861px | 861–1007 uses center-first compact topology; ≥1008 full tracks are at least 196/540/204; no horizontal overflow | Bead working + drawing siblings | primary | `/root/responsive_coverage_audit` | `adaptive-layout-fd054f23` | verified-pass |
| LAYOUT-002 | IA-002, RC-02 | P1: 200% proxy collapses canvas | 640×360 retains a ≥320px canvas module with vertical scroll escape and reachable controls | Phone working + drawing regression boundary | primary | `/root/responsive_coverage_audit` | `adaptive-layout-fd054f23` | verified-pass |
| LAYOUT-003 | BASE-002, VA-002, RC-04 | P2: same-aspect composition drifts | Full topology converges to 22/54/24 and each track share varies by no more than ±2 points before content-max | Shared working track | primary | `/root/responsive_coverage_audit` | `adaptive-layout-fd054f23` | verified-pass |
| LAYOUT-004 | VA-003, IA-005, RC-03 | P2: fixed cap removes spacing and creates letterboxing | Remove 780px/auto-centering; preserve authored top gap; working grid grows with available height | Both studios and all bead phases | primary | `/root/responsive_coverage_audit` | `adaptive-layout-fd054f23` | verified-pass |
| LAYOUT-005 | VA-004, RC-06 | P2: stale contracts and missing coverage | One replacement spec, synchronized DESIGN/tokens/comments, observable layout regression | Docs, source, tests, generated CSS | primary | `/root/responsive_coverage_audit` | `adaptive-layout-fd054f23` | verified-pass |

## Batches

| Batch | Issues | Owned paths | Tests/contracts/bundles | Scenarios/evidence | Runtime errors | Implementer | Verifier | Result |
|---|---|---|---|---|---|---|---|---|
| B-01 adaptive workbench restart | LAYOUT-001–005 | `tokens.css`, `responsive.css`, replacement spec, `DESIGN.md`, `MASTER.md`, design sidecar, regression, package script, generated bundles | `npm run build`; focused regression; all 29 registered suites | `/private/tmp/beam-ui-audit-2026-07-17/candidate-adaptive-layout`; exact breakpoint and zoom measurements | zero in candidate captures | primary | `/root/responsive_coverage_audit` | independent pass; no blocking counterexample |

## Sign-off

| Final candidate | Reviewer | Changed/high-risk cases | Smoke/sample cases | Counterexamples | Retest evidence | Verdict |
|---|---|---|---|---|---|---|
| `adaptive-layout-fd054f23` | `/root/responsive_coverage_audit` | exact 861/1007/1008 seams; 640×360; 1440×900 vs 1600×1000; bead+drawing; phase sweep | 19-case Playwright probe plus all 29 registered suites | none blocking | focused regression, aggregate suite, candidate screenshots and measurements | PASS |

Commands run / coverage / P3 items / waivers / risks:

- Baseline app served with `npm run dev` at `http://127.0.0.1:5173`.
- Baseline capture: `node /private/tmp/beam-layout-baseline.mjs` under approved browser privileges; zero console/page errors in captured journeys.
- Aggregate baseline: `npm test`; six in-sandbox browser-suite failures were environmental `EPERM` listener denials, not assertion failures. Approved rerun is retained as environment evidence; final candidate requires a complete clean aggregate result.
- No UI source edits are authorized before Gate B is frozen.
- Candidate bundle hashes after integrating concurrent user-owned achievement work: `app.bundle.js` `f31691ceb9ba4db40104305910374d16505d949cd07904901bf140990738185d`; `styles.css` `fd054f23e2268a4a00577ff26b84328948101ceded2855d277b87e6314822e4d`.
- Candidate aggregate: `npm test` passed all 29 registered suites, including `test:workbench-layout` and the concurrently added `test:achievements`.
- Independent final verification passed LAYOUT-001–005. The verifier added a 19-case Playwright probe across thresholds, aspects, short/tall windows, touch sizes, 200% proxy, phases, bead, and drawing; no blocking counterexample was found.
- IA-003, IA-004, and IA-006 are pre-existing accessibility findings outside the user-authorized adaptive-workbench scope. They are recorded above rather than silently expanded into this implementation.
