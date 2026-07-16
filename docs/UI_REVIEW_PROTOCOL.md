# Comprehensive UI Review Protocol

Use this protocol for product-wide, exhaustive, cross-screen, maturity, redesign, or multi-screen consistency work. It governs process only; `PRODUCT.md` and `DESIGN.md` own product and design decisions.

## Core rules

- No UI edits before Gate B passes.
- Audit agents are read-only; shared-worktree implementation is single-writer and serialized.
- Review the running product, not source alone.
- The implementer cannot verify their own batch.
- A recorded issue is not a completed scenario.
- Existing documents and tests must be validated against confirmed user intent and live behavior; update stale contracts with the fix.
- Pre-existing dirty files remain primary-agent-owned unless explicit ownership is recorded.
- Evidence and sign-off are bound to a candidate ID: `HEAD` + product-worktree fingerprint + generated bundle hashes. Later relevant changes invalidate affected evidence.

For each full review, copy `docs/ui-audits/TEMPLATE.md` to a dated ledger.

## Gate A — Scope and baseline

Record:

- candidate ID and dirty paths;
- explicit in/out scope and observable success conditions;
- documents, source inventory, theme source, breakpoint source, and recent commit range reviewed;
- core journeys and evidence location;
- aggregate test command, resolved test list, and baseline result;
- reviewer assignments.

Run the current app and capture core-journey baselines. Record a decision only for a user/document/test conflict, a shared-system decision, or a waiver. Gate A passes when every field is concrete, the candidate is reproducible, and known failures/conflicts are recorded.

## Gate B — Independent discovery and coverage freeze

Use scenario rows, not a Cartesian matrix. Every inventoried surface, shared component family, and distinct behavior must map to at least one scenario.

Inventory at minimum: home; bead choose/place/inspect/iron/cool/finish; drawing; gallery; collection; community; modals; overlays/feedback; shared components; empty/loading/error/disabled/destructive states.

Core journeys default to phone portrait `390 x 844`, tablet landscape `1024 x 768`, and desktop `1440 x 1000`. Derive breakpoint-edge cases from current contracts. Add applicable mouse/hover/drag, touch, keyboard/focus/dialog, reduced-motion, zoom, and theme scenarios. Global token/material changes require all-theme coverage.

Each scenario records: ID, trigger/fixture, viewport, theme, input/state, observable expectation, evidence, primary reviewer, optional seam reviewer, and result:

`not-run | pass:<candidate> | fail:<issue> | retest-pending:<issue> | waived:<decision> | n/a:<reason>`

Run three independent lenses:

1. visual system and DOM/Canvas coherence;
2. interaction and accessibility;
3. responsive behavior and verification coverage.

Every scenario has one owner. High-risk seams—navigation, shared states, DOM/Canvas parity, hover/drag/touch, and breakpoints—receive a second cross-check. Reviewers work independently and return completed scope, commands/environment, raw findings, evidence-backed passes, justified N/A cases, and unchecked/blocked scenarios.

Keep raw findings append-only. Map them to canonical issues without deleting evidence; merge only when observation, expected behavior, and confirmed root cause agree.

Severity:

- P0: blocks a core journey, data safety, or security.
- P1: seriously breaks a frequent task, accessibility, or multiple surfaces.
- P2: visible inconsistency or polish/edge-state defect that materially reduces maturity.
- P3: optional low-impact preference.

P0/P1 cannot be self-waived. P2 waiver requires user approval. Issue states are `open | in-progress | ready-for-verification | verified | reopened | waived`.

For aesthetic findings, inspect hierarchy, composition, spacing, typography, color, material, icons, feedback, density, and copy. Each finding must cite a screenshot/contact sheet plus a sibling, contract, product principle, or named reference; “feels off” alone is insufficient. Side-by-side comparison is mandatory for repeated components/screens.

Gate B passes when all inventory items have scenarios, assignments and handoffs are complete, findings are synthesized with acceptance criteria, and scenario scope plus issue ledger v1 are frozen. Later findings receive targeted scenarios; only approved scope expansion restarts Gate B.

## Gate C — Batch implementation and acceptance

Each serialized batch declares issue IDs, owned paths/hunks, affected scenarios, sibling rechecks, acceptance criteria, and a non-author verifier. Parallel implementation requires isolated worktrees. The primary agent owns the ledger, shared primitives, builds, generated bundles, and integration.

Each batch is complete vertically: source, bundles, tests, affected contracts, browser reruns, console/page-error check, and same-state before/after evidence. The implementer sets `ready-for-verification`; only the verifier sets `verified` and `pass:<candidate>`.

Gate C passes when all P0–P2 issues are verified or authorized, affected scenarios pass on the current candidate, tests/contracts/bundles agree, and no new runtime error exists.

## Gate D — Independent closeout

Freeze the final candidate. A non-implementer performs:

1. a counterexample pass over the user goal, every changed/high-risk scenario, full-surface smoke inventory, and a predeclared sample of unaffected scenarios before reading the implementation narrative;
2. a targeted retest of every fix and sibling consumer.

Any new P0/P1 or change-induced P2 fails sign-off and reopens targeted work, not the whole audit. Later relevant changes invalidate affected sign-off.

Completion requires:

- every required scenario is `pass:<final-candidate>`, `waived:<decision>`, or justified `n/a`;
- no open P0/P1 and every P2 verified or user-waived;
- aggregate and registered tests pass;
- affected themes, viewports, inputs, reduced motion, and shared states are verified;
- documents/tests match final decisions;
- independent sign-off passes.

Otherwise report exact incomplete scenario IDs. Never replace full coverage with “major issues fixed.”
