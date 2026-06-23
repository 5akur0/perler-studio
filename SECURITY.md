# Security

Perler Studio is a static browser app (committed `app.bundle.js` + `styles.css`,
also runnable from `file://`). The only server-side surface is the CloudBase
cloud function under `cloudbase/share-api/`, which backs short-code sharing and
the gallery (submit / list / admin review). This document records the threat
model, the hardening that is in place, the operational secrets it depends on,
and the known backlog.

## Attack surface

- **Public, unauthenticated endpoints** (`/api/share/create`, `/api/share/open`,
  `/api/gallery/submit`, `/api/gallery/list`). CORS does **not** protect these —
  any HTTP client can call them — so rate limiting and input bounds are the only
  abuse controls.
- **Admin endpoints** (`/api/gallery/pending|approve|reject|unpublish|delete`)
  gated by a single bearer token in the `x-admin-token` header.
- **Untrusted data rendered in the browser**: gallery `name` / `author` and the
  `patternCode` carried by shares and gallery items.

## Hardening in place

### Server (`cloudbase/share-api/index.js`)
- **Input sanitisation**: `name` / `author` strip control chars and reject
  `< > " ' \` `\`; `patternCode` is shape-validated (`parseShareCode`) and bounded
  to 90×90 / 8100 cells, mirroring the client decoder so the server never stores
  a code the client would refuse to decode.
- **Rate limiting** (per-IP, transactional counters in the `rate_limits`
  collection): write paths `share/create` and `gallery/submit` at 12/min; read
  paths `share/open` and `gallery/list` at 60/min. The read limits close a
  CloudBase read-cost amplification DoS and unmetered short-code probing.
- **IPv6 bucketing**: per-IP keys collapse IPv6 to its `/64` prefix so one
  attacker cannot rotate through a routine `/64` allocation to evade the limiter
  or the admin lockout. IPv4 keying is unchanged.
- **Request body cap**: bodies over 128 KB are rejected (413) before
  `JSON.parse`, so a hostile multi-MB payload is never materialised.
- **Admin auth**: timing-safe token comparison; the token must travel in the
  header (a token in the JSON body is rejected outright, to keep it out of
  gateway/function logs); per-IP failure lockout (5 failures / 10 min → 15 min
  lock) plus an admin request budget.
- **Stored-IP privacy**: client IPs in gallery submissions are stored as a keyed
  HMAC (`IP_HASH_SECRET`), not plaintext or a reversible bare SHA-256.
- **Source-IP integrity**: the platform-provided source IP is preferred over the
  client-forgeable `X-Forwarded-For`, so limits/lockouts can't be bypassed by
  spoofing the header.

### Client / hosting
- **CSP** (`_headers`, mirrored in the `index.html <meta>` — kept byte-identical
  by `scripts/csp-sync-regression.mjs`): `script-src 'self'` (no `unsafe-inline`
  on scripts — the primary XSS backstop), `object-src 'none'`, `base-uri 'self'`.
- **Clickjacking**: `X-Frame-Options: DENY` and CSP `frame-ancestors 'none'`.
  `frame-ancestors` is header-only (ignored in `<meta>`), so it lives **only** in
  `_headers`; the csp-sync test strips it before comparing.
- **Defence in depth for rendered data**: gallery `name` / `author` are
  `escapeHtml`-escaped client-side in addition to server sanitisation; toasts use
  `textContent`, not `innerHTML`.
- Other headers: `X-Content-Type-Options: nosniff`, `Referrer-Policy`,
  `Permissions-Policy`, `Cross-Origin-Opener-Policy: same-origin`.

## Secrets (operational)

Managed as cloud-function environment variables. **Never commit real values** —
`cloudbaserc.json` is git-tracked, so set/rotate secrets in the CloudBase console
(Cloud Functions → `share-api` → environment variables), not via the config file.
`.env.example` documents the names only.

- `ADMIN_TOKEN` — admin bearer token. Rotate immediately if it ever appears in a
  log, terminal output, or transcript (a value that has left the secret store is
  no longer a secret). Generate with `openssl rand -base64 32`.
- `IP_HASH_SECRET` — HMAC key for stored submission IPs. Without it, `hashIp`
  falls back to a reversible bare SHA-256 over the small IPv4 space. Generate with
  `openssl rand -base64 32`.
- `ALLOWED_ORIGINS` — optional comma-separated CORS allowlist; falls back to the
  built-in defaults when unset.

After changing environment variables in the console, no code redeploy is needed;
new invocations pick up the new values.

## Deploying server changes

```bash
tcb fn deploy share-api --force        # envId read from cloudbaserc.json
```

`_headers` is a Cloudflare Pages artifact and ships with the **frontend** deploy,
not with `tcb`. Header changes (e.g. `frame-ancestors`) only go live after the
next Pages deploy; verify with `curl -I <site>`.

## Backlog

- **Remove `style-src 'unsafe-inline'`**: still required by ~10 dynamic inline
  `style="..."` attributes (palette swatch colours, grid templates, theme custom
  properties) and one `:root` block in `index.html`. CSP nonces/hashes cannot
  cover dynamic inline **style attributes**, so dropping `unsafe-inline` requires
  refactoring those render paths to CSSOM (`el.style.x = …`) plus full
  cross-device visual verification. Low marginal value (these styles carry only
  trusted palette colours and script execution is already blocked), so deferred.
- **Rate-limit granularity**: limits are per-IP. Shared NAT / mobile egress can
  cause collateral throttling; an attacker with many IPs (or IPv6 prefixes larger
  than `/64`) or a proxy pool can still distribute load. A CAPTCHA / proof-of-work
  step would be the next escalation if abuse appears.
- **Admin model**: a single long-lived shared token with no rotation schedule,
  expiry, or per-admin audit trail. Adequate at current scale; revisit if more
  reviewers are added.

## Verifying the live function

```bash
API="https://<your-share-api-base>"
# read rate limit (concurrent burst should surface 429s once >60/min)
seq 1 90 | xargs -P 30 -I{} curl -s -o /dev/null -w "%{http_code}\n" \
  -X POST "$API/api/share/open" -H 'content-type: application/json' \
  -d '{"shortId":"AAAAAAAA"}' | sort | uniq -c
# body cap → 413
head -c 200000 /dev/zero | tr '\0' 'a' | curl -s -o /dev/null -w "%{http_code}\n" \
  -X POST "$API/api/share/create" -H 'content-type: application/json' --data-binary @-
```
