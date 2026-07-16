# Review Rules v2 + Pre-publish Verification Audit — Design

Status: Approved (user, 2026-07-16). Next step: implementation plan.
Scope owner: this spec. Process rules it revises: `docs/UI_REVIEW_PROTOCOL.md`, `AGENTS.md`, `docs/ui-audits/TEMPLATE.md`.

## Background

On 2026-07-16 a comprehensive UI review protocol was established (`d176ded`) and a
full product review was run under it and closed green
(`docs/ui-audits/2026-07-16-full-ui-review.md`, Gate D passed, 27/27 suites).
The user now intends to publish the product (Cloudflare Pages front end +
CloudBase backend). Examination of the protocol and its first run found real
strengths worth keeping and concrete defects worth fixing, plus stale planning
debris in the tree.

Decisions taken with the user:

1. Rules: right-size the protocol — keep its spine, add proportional tiers,
   fix defects, add a release gate and plan-file hygiene.
2. Pre-publish check: do **not** rerun full discovery; independently verify the
   closed review, upgrade its source-only cells to live evidence, then run the
   release gate.

### Keep (proven this week)

- Evidence bound to a candidate ID; later changes invalidate affected evidence.
- Review the running product, not source alone.
- Severity ladder P0–P3; P0/P1 never self-waived; P2 waiver needs the user.
- Update stale contracts (tests, docs) in the same change as the fix.
- Scenario rows instead of Cartesian matrices; append-only raw findings.

### Fix (observed defects)

- No lighter tier: any multi-screen request triggers the full 4-gate ceremony.
- Multi-agent role mandates degraded in practice (Reviewer A had no working
  browser; ceremony continued as paperwork).
- Evidence stored under `/private/tmp/...` — already unreachable after reboot.
- Ledger used result states the protocol never defined (`source-pass`,
  `tool-invalid`).
- Candidate fingerprint method over-engineered (SHA-256 manifests of untracked
  scratch files).
- No release/publish gate at all.
- Contradictory plan-file conventions: committed specs in
  `docs/superpowers/specs/` vs. "never commit me" root scratch plans vs.
  name-by-name `.gitignore` entries; one spec written in Chinese against the
  language policy.

## Deliverable A — `docs/UI_REVIEW_PROTOCOL.md` v2

Rewrite in place (English). Required content:

### A1. Tier router (new, at top)

| Tier | Trigger | Required process |
|---|---|---|
| 1 · Focused fix | 1–2 screens or one component family | No ledger, no gates. Four verification disciplines (A2) + desktop & mobile check (tablet landscape when shared canvas/layout code is touched) + focused regression + rebuild committed with source. |
| 2 · Multi-screen pass | Consistency/polish across several screens; no product-wide claim | Mini-ledger (scope, findings, evidence, results) + Tier 1 requirements + an independent-context verification pass before closing. |
| 3 · Full audit | Product-wide / exhaustive / maturity / redesign / **pre-release** | Full gates A–D as revised below, plus Gate R when the goal is release. |

Ambiguity rule: when in doubt between tiers, state the chosen tier and why in
the commit or ledger; the user can overrule.

### A2. Verification disciplines (all tiers)

Codify the 2026-07-07 rework lessons as named, mandatory checks:

1. **Sibling-screen check** — after changing any shared primitive
   (`.studio-shell` members, topbar, modal, shared tokens), verify at least one
   sibling screen that consumes it, not only the edited screen. The four
   library/gallery/collection/community screens share one layout contract; no
   per-screen width caps.
2. **Four async states** — any change touching gallery/community/collection
   must verify loading / empty / error / content visibility, forcing states via
   network interception or fixtures, not one static frame.
3. **Scroll/mask contract** — fade masks and overscroll rules live only on the
   actual scrolling element; when moving scroll containers, grep the old
   container name for leftovers.
4. **Modal self-description** — a modal reused by several entry points must
   state its destination in the title, not in small-print hints.

### A3. Gate revisions (Tier 3)

- **Independence, honestly:** verification requires an independent-context
  pass — a subagent, a fresh session, or at minimum a counterexample pass
  executed before reading the implementation narrative. Implementer ≠ verifier
  remains the default for batches; when tooling makes true independence
  impossible, record an explicit waiver in the ledger instead of degrading
  silently.
- **Candidate ID simplified:** `HEAD` short hash + clean-tree statement
  (`git status` output) + SHA-256 of `app.bundle.js` and `styles.css`. Drop
  bespoke fingerprint manifests.
- **Result states defined:** `not-run | pass:<candidate> | fail:<issue> |
  retest-pending:<issue> | waived:<decision> | n/a:<reason> |
  source-pass:<what remains unseen> | tool-invalid:<cause>`.
  `source-pass` and `tool-invalid` are **not terminal**: they must be upgraded
  to live evidence or explicitly user-waived before Gate D, and are forbidden
  in a Gate R sign-off.
- **Durable evidence:** evidence for frozen ledgers lives under
  `docs/ui-audits/evidence/<ledger-date>/` (compressed contact sheets, webp,
  small) and is committed. `/tmp` paths may be used mid-flight but never cited
  by a frozen ledger. Keep total size per audit modest (target < 2 MB); note
  that everything committed is publicly served once deployed.

### A4. Gate R — Release (new)

Required before any public deploy; run at the exact release candidate:

1. `npm test` — every registered suite green.
2. **Bundle parity** — `npm run build` produces byte-identical committed
   `app.bundle.js` / `styles.css` (`git status` clean afterwards).
3. `test:release` (no dev markers) and `test:csp-sync` (`_headers` ↔
   `index.html` meta) explicitly confirmed.
4. **Offline smoke** — open `index.html` via `file://`: app boots, core
   screens render, cloud-backed screens degrade gracefully, no console errors.
5. **Page metadata audit** — title, description, favicon, `lang`, viewport;
   check social/OG tags and recommend additions if absent (publishing targets
   social sharing).
6. **Console sweep** — core journeys on the served build with zero errors.
7. **Copy proofread** — Chinese UI copy pass against `PRODUCT.md` register.
8. **Backend state** — deployed CloudBase function code matches the repo;
   `ADMIN_TOKEN` set only as env; `ALLOWED_ORIGINS` matches the public origin.
   Credential-gated items become an explicit user handoff list, never silent
   skips.
9. No `source-pass` / `tool-invalid` cells remain anywhere in the ledger.

## Deliverable B — `AGENTS.md` changes

1. Replace the "Comprehensive UI Review Workflow" paragraph with a short tier
   router: what triggers Tier 1/2/3, pointer to the protocol, and the existing
   sentence-level rules that survive (no implementation before Gate B in
   Tier 3; contracts validated, not preserved blindly).
2. Add a **Plans & specs hygiene** subsection:
   - All plans/specs live in `docs/superpowers/specs/` (or `docs/ui-audits/`
     for ledgers), committed, written in English per the language policy.
   - Every plan starts with `Status: Draft | Approved | Executed <commit> |
     Obsolete <reason>` and the status is updated in the same session that
     changes it.
   - Root-level scratch plan files are forbidden; remove the now-dead
     name-by-name `.gitignore` entries when their files are gone.

## Deliverable C — `docs/ui-audits/TEMPLATE.md` changes

Add: tier field in the header, the full result-state legend, evidence-dir
convention, and a Gate R checklist section.

## Deliverable D — Housekeeping

- Delete `AUDIT_FIX_PLAN.md` (all four fixes verified present in code:
  `server.cjs:51`, `cloudbase/share-api/index.js:349`, `src/ui.js:132`,
  `admin.js:111`). Carry its live handoff item (CloudBase redeploy) into the
  audit ledger before deletion.
- Delete `docs/superpowers/specs/2026-07-08-sketch-ui-step2.md` (obsolete
  wobble-corner direction, superseded by the square-corner sketch language).
- Prune dead `.gitignore` scratch-plan entries if their files no longer exist.

## Deliverable E — Pre-publish verification audit (charter)

New ledger `docs/ui-audits/2026-07-16-prepublish-verification.md`, Tier 3 in
**verification mode**: discovery is replaced by the prior frozen ledger plus
its recorded gaps; Gates A (light) → C (only if fixes arise) → D → R.

- **Phase 0 · Housekeeping** — Deliverables A–D committed; ledger opened with
  simplified candidate ID.
- **Phase 1 · Spot-check the closed review** — re-verify each fixed issue
  (UI-001…005, 007…011) live at the current candidate against its acceptance
  criteria, on phone 390×844, tablet landscape 1024×768, desktop 1440×1000,
  with sibling-screen comparisons per discipline A2-1.
- **Phase 2 · Fill recorded gaps** — upgrade every `source-pass` /
  `tool-invalid` cell of the 2026-07-16 ledger to live evidence: drawing
  idle/palette (phone, tablet); gallery states incl. error/retry (tablet + all
  error branches live); community compose/tabs incl. failure/rollback
  (tablet); settings + all five themes (phone, tablet); breakpoint seams
  375/420/620/860–861/1179–1180/1280 and orientation; desktop hover vocabulary
  (never captured); reduced-motion respot; re-capture previously
  `tool-invalid` modal shots.
- **Phase 3 · Gate R** — full checklist A4. Credential-gated items (CloudBase
  redeploy carrying the CSPRNG share-code fix, `ALLOWED_ORIGINS`, Cloudflare
  Pages project, optional domain) are compiled into a numbered user handoff
  list with exact steps.
- **Phase 4 · Fix + closeout** — P0–P2 findings fixed in batches under the
  revised rules (source + rebuilt bundles in the same commit, suites green,
  contracts updated with fixes), independent-context counterexample pass, then
  sign-off. Remaining human step recorded for the user: real-device acceptance
  on the three form factors and one real poster export.

### Success criteria

- Rules v2 committed; stale files gone; hygiene rules active.
- Ledger closed: every scenario live-verified, user-waived, or justified n/a;
  no open P0–P2; no `source-pass`/`tool-invalid` anywhere.
- Gate R green except items on the user handoff list, delivered with steps.
- All registered suites green; bundle parity holds at the final candidate.

### Out of scope

- No new full-product discovery pass (that closed today).
- No deployment actions requiring credentials; those are handoffs.
- No product/design-direction changes beyond what fixes require; `DESIGN.md` /
  `PRODUCT.md` edits only as contract updates tied to fixes.
