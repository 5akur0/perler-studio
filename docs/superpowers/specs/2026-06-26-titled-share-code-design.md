# Titled Share Code — Design

Date: 2026-06-26
Status: Approved (pending spec review)

## Problem

When a maker shares a pattern, the recipient sees only an opaque code string and
cannot tell what the pattern is until they import it. There is also no enforced
title on a pattern. We want every shared code to be self-describing.

## Decisions (locked with user)

1. **Title is mandatory and capped at 10 characters** before a pattern can be shared.
   Empty title blocks code generation.
2. **The offline `BEAM1:` text code is removed as a user-facing artifact.** The cloud
   short code (`shortId`) is the only share code shown to users.
   - `encodePatternCode` / `decodePatternCode` remain *internal* — they are the wire
     format the share server stores and returns. They are never surfaced to the user.
3. **The shared code string is `【标题】+短码`** (e.g. `【小猫】ABCD2345`). The title also
   travels to the server as `name` (already the case), so the recipient's card name is
   server-authoritative; the bracket prefix is the human-readable hint on the raw string.
4. **On share-API failure, show `服务器繁忙，请稍后再试`.** No silent fallback to an
   offline text code.
5. **Import accepts only `【标题】+短码`.** Pasting a legacy raw `BEAM1:` text code is
   rejected (complete removal — no backward compatibility for old text codes).
6. **Cards display the name** — already rendered from the server `name`; imported
   patterns inherit `share.name`. Verify the path, no new data plumbing expected.

## Scope

In scope: the draw studio share/import flow (`#drawCodeModal`, `drawShortCodeButton`,
`drawImportButton`, draw code import confirm).

Out of scope changes that nonetheless need copy alignment: the gallery submit modal
(`gallerySubmitCode`) and gallery import paths still resolve via short code; their UI
copy must drop "BEAM1 图纸码" wording, and their raw-text-code import branch is removed
to match decision 5.

## Behavior

### Export (draw studio "导出图纸")
1. Click opens `#drawCodeModal` in export mode showing a **title input** (`maxlength=10`,
   empty by default) and a **生成分享码** action. The read-only code field is empty until
   a code is generated.
2. 生成分享码:
   - Trim title. If empty → toast `请先给图纸起个名字（≤10字）`, keep modal open, do nothing.
   - Build the pattern with `name = title`.
   - Call the cloud share API (existing `requestCloudShareForPattern`, which already sends
     `name`). On success with `shortId`:
     - Compose `display = 【${title}】${shortId}`.
     - Put `display` in the code field and auto-copy it; toast `分享码已复制：${display}`.
   - On failure / no `shortId` / network abort → toast `服务器繁忙，请稍后再试`. No offline code.

### Import (draw studio + gallery)
- Parse with `extractCloudShortId` only (it already extracts the 8-char id out of a
  `【标题】…` wrapper). If no valid short id → toast `请粘贴分享码`. Remove the
  `extractPatternCode` raw-text branch.
- Resolve via `/api/share/open`, decode `share.patternCode`, set `name = share.name`.

### Copy alignment
- `#drawCodeHint`, `#drawCodeInput` placeholder, `#gallerySubmitCode` placeholder/label,
  and any toast strings change from "图纸码 / BEAM1" to "分享码".

## Files

- `index.html` — add title input + label to draw code modal (export-only); rename the
  generate action; update placeholders/hints.
- `src/dom.js` — register the new title input + generate button elements.
- `src/draw.js` — export modal export-mode title field show/hide; title validation; build
  `【标题】+短码`; remove `exportDrawPatternCode` and the BEAM1 fallback; `服务器繁忙` toast;
  drop `extractPatternCode` from the import confirm handler.
- `src/gallery.js` — drop `extractPatternCode` raw-text branch from `resolvePatternCodeInput`
  and `importPatternCode`; copy alignment.
- `src/styles/*` — style the title input with existing tokens (no new brand colors).
- `scripts/<area>-regression.mjs` — add/adjust a check: short code is wrapped as
  `【标题】+短码`, empty title is blocked, import tolerates the bracket prefix and rejects
  raw `BEAM1:` text. Update any release/copy regression that asserts removed strings.
- Rebuild `app.bundle.js` + `styles.css` via `npm run build`.

## Testing

- Empty title blocks generation (no API call, toast shown).
- Title >10 chars is prevented by `maxlength`; trimmed title used.
- Successful share yields `【标题】+短码`, auto-copied.
- API failure path shows `服务器繁忙，请稍后再试` and produces no offline code.
- Import of `【标题】ABCD2345` resolves the short id; raw `BEAM1:` paste is rejected.
- Desktop + mobile modal layout verified (draw studio is a shared/responsive surface).

## Non-goals

- No change to the internal pattern serialization format or the share server.
- No new title field on gallery cards beyond the existing server `name` display.
