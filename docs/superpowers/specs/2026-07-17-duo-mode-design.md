# Duo Mode (双人同拼) — Design Spec

- **Date:** 2026-07-17
- **Status:** Approved design, parked — do not implement until explicitly scheduled.
- **Scope:** Phase 1 of realtime co-beading. Long-term goal is full-flow sync; this spec deliberately covers bead placement only.

## Motivation

Couples (and close friends) want to place beads on the same pattern together, each on their own device, seeing each other's beads land in real time. This serves the product's emotional core (治愈 · 温润 · 沉浸) and its shareability goal: a finished piece both partners keep.

## Verified Feasibility (2026-07-17 experiment)

A minimal experiment (browser js-sdk 2.17.5, anonymous auth, document `watch()`) against the production CloudBase env `beam-prod-d7g2xz88ee6532631` (体验版 tier) confirmed:

- Realtime database watch **works on the current free tier**.
- Steady-state cross-client latency **254–463 ms** measured from overseas to ap-shanghai; domestic users should see well under 200 ms. First message pays ~1.8 s channel warm-up; anonymous sign-in ~2.5 s once per session.
- Write ack 250–680 ms.
- Caveat: node-sdk watch via CLI temporary credentials fails with `SYS_ERR` — a credential-path limitation, **not** an env capability limit. Do not let it mislead future testing.

Decision: **Route A — CloudBase realtime database.** HTTP polling rejected as primary (2–3 s latency, burns function-invocation quota: ~7k calls per hour-long session). WebRTC P2P rejected (domestic mobile NAT traversal unreliability would require TURN relays; disproportionate complexity).

## Architecture

- **Sync channel:** CloudBase realtime database via `@cloudbase/js-sdk`, bundled by esbuild into `app.bundle.js` (no CDN dependency; keeps the offline `file://` bundle self-contained). The duo entry point is disabled when offline / `file://`.
- **Identity:** existing anonymous model — CloudBase anonymous login plus the existing per-device `clientId` (`community-api.js`). No account system.
- **Room create/join:** two new routes on the existing `share-api` cloud function (`/api/room/create`, `/api/room/join`). Server-side responsibilities: short-code generation and collision avoidance, member-count enforcement, rate limiting. Reuses the established short-code conventions.
- **In-room sync:** after joining, clients bypass the cloud function entirely — they `watch()` the room document and write cell updates directly. Lowest latency, zero function-invocation cost during play.

## Data Model

Collection `rooms`, one document per room:

```
{
  _id, code,                    // 6-char short code
  pattern: {...},               // pattern snapshot (available on join, independent of peer presence)
  members: [{ clientId, uid, nickname, joinedAt, lastSeen }],  // list structure, leaves room for >2 later
  cells: { "r12_c07": "H07", ... },  // board state keyed by cell
  stage: "placing",             // constant in phase 1; reserved for future full-flow sync
  createdAt, expiresAt
}
```

- Product exposes **two members max** in phase 1; the protocol does not hard-code A/B slots.
- **Place/remove bead** = field-level update/remove on `cells.<key>`; **cell-level last-write-wins**. Two-player same-cell collisions are rare; later write overwrites — intuitive, no CRDT needed.
- **Optimistic local apply:** own beads render immediately, write happens async. Remote beads are diffed out of watch snapshots and rendered with the existing bead-drop animation.
- **Reconnect:** SDK auto-reconnects; on watch recovery, reconcile against the full snapshot (cloud wins, then replay unacknowledged local writes).
- **Presence:** `lastSeen` heartbeat (~30 s). No realtime cursor in phase 1 (write-frequency cost vs. unproven value); presence chip + remote bead-drop animation carry the "together" feeling.

## User Flow

1. **Invite:** player A, from the beading table (or after pattern selection), taps 「邀请一起拼」 → gets short code + QR (reuse `share-qr.js`) → sends to B.
2. **Join:** B enters the code (or opens the parameterized link) at the same entry → lands in the room with pattern and current progress.
3. **Co-bead:** both place freely; peer nickname + online status shown; each remote bead lands with a gentle drop animation.
4. **Finish:** sync covers up to the inspection stage. Ironing, cooling, and collecting happen locally for each player — **both can collect the shared piece into their own gallery**.
5. **Room lifecycle:** expires after 24 h (`expiresAt` + lazy cleanup); either player may leave and rejoin with the code.

## Security, Cost, Edge Cases

- **Security rules:** tighten `rooms` to members-only read/write (uid ∈ members) — not the experiment's `auth != null`. Short codes non-enumerable; creation rate-limited in the cloud function.
- **CSP:** add SDK auth endpoints and the `wss://` realtime domain to **both** `_headers` and the `index.html` meta tag (capture exact domains during implementation).
- **Quota watch:** free-tier realtime connections/reads suffice for duo rooms, but monitor `tcb env usage` after launch; upgrading to pay-as-you-go requires no protocol change.
- **Errors:** clear messaging for room missing/expired/full; failed writes toast + auto-retry; a peer going offline never blocks local play.

## Testing

- Sync core (snapshot diff, LWW merge, reconnect reconciliation) implemented as pure functions; new `scripts/duo-regression.mjs` + `test:duo` entry in `package.json`.
- Interaction verified separately on desktop and mobile per house rules; two browser windows reproduce a live session for manual QA.

## Experiment Leftovers (cleanup list if the feature is dropped)

- Anonymous login enabled on the env (`tcb env login set --anonymous-login false` to revert).
- Collection `mp_test_rooms` (security rule `auth != null`) — delete.
- Static hosting file `mp-test/index.html` — delete.

## Out of Scope (phase 1)

- Full-flow stage sync (selection, ironing, cooling as shared ceremony) — future phase; `stage` field reserved.
- Rooms of 3+ (data model ready, product intentionally duo-only).
- Realtime cursors / touch trails.
- Text or voice chat.
