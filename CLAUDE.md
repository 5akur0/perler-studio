# CLAUDE.md

Perler Studio (拼豆工坊) is a static browser craft game: ES modules in `src/` bundled by esbuild into the **committed** runtime assets `app.bundle.js` and `styles.css`, so it runs offline via `file://`. CloudBase provides the gallery and short-code sharing APIs; deployment targets Cloudflare Pages.

## Hard Rules

- After any `src/` change, run `npm run build` and commit the rebuilt `app.bundle.js` / `styles.css` together with the source change. Without this, production loads stale code.
- Language policy: code comments, JSDoc, specs, plans, and Conventional Commit messages in English; `PRODUCT.md`, `DESIGN.md`, and all UI copy in Chinese.
- CSS must use the tokens in `src/styles/tokens.css` — never hard-code theme brand colors.
- CSP changes must update both `_headers` and the CSP meta tag in `index.html`.
- Interaction or responsive changes require verifying desktop and mobile separately (tablet landscape too when shared canvas/layout code is touched).

## Required Reading

`AGENTS.md` owns workflow, build, test, style, and commit rules — follow it first. Before product or UI work, read `PRODUCT.md` (product strategy and platform intent) and `DESIGN.md` (UI/interaction contracts; it wins over `design-system/MASTER.md`). Deployment details live in `DEPLOY_CLOUDFLARE_PAGES.md` and `README.md`.

## Commands

- `npm run dev` — serve at http://localhost:5173 (`server.cjs`).
- `npm run build` — rebuild both bundles (also `watch:js` / `watch:css`).
- `npm test` — run all registered regressions; `npm run test:<area>` for one (standalone Node scripts in `scripts/*-regression.mjs`, some Playwright).
- New regression checks: `scripts/<area>-regression.mjs` plus a matching `test:<area>` entry in `package.json`. All checks must pass before merging to `main`.
