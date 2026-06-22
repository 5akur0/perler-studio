# Repository Guidelines

## Sources of Truth

- `AGENTS.md` owns shared engineering workflow, code style, build, test, and commit rules.
- `PRODUCT.md` owns product strategy and platform intent. It is maintained in Chinese.
- `DESIGN.md` owns measurable UI and interaction contracts. It is maintained in Chinese.
- `design-system/MASTER.md` contains deeper implementation history; `DESIGN.md` wins on conflict.
- `README.md` owns end-user usage details and general project setup.

## Language Policy

Use English for agent instructions, implementation specifications, plans, source comments, JSDoc, regression-test comments, and Conventional Commit messages. Keep `PRODUCT.md`, `DESIGN.md`, user-facing documentation, and interface copy in Chinese unless a document explicitly requires another language.

## Project Structure & Module Organization

`src/` contains the browser application as ES modules. `src/main.js` is the entry point; rendering, UI, state, storage, audio, patterns, and gallery behavior are split into focused sibling modules. Styles start at `src/styles/index.css`. esbuild produces the committed runtime assets `app.bundle.js` and `styles.css`, which `index.html` loads. Regression checks live in `scripts/*-regression.mjs`. Static media belongs in `images/` and `audio/`; CloudBase API code is under `cloudbase/share-api/`. Read `PRODUCT.md` and `DESIGN.md` before changing user-facing UI.

## Build, Test, and Development Commands

- `npm install` — install esbuild, Playwright, and deployment tooling.
- `npm run dev` — start `server.cjs` at `http://localhost:5173`.
- `npm run build` — rebuild both JavaScript and CSS bundles. Run this after every `src/` change and commit the updated generated files.
- `npm run watch:js` / `npm run watch:css` — rebuild one bundle continuously during development.
- `npm run test:session` — run the session persistence regression.
- `npm run test:release` — detect development-only markers in release files.
- `npm run test:<area>` — run a focused check such as `test:keyboard`, `test:mobile-ui`, or `test:projection`.

## Coding Style & Naming Conventions

Use modern JavaScript ES modules, two-space indentation, semicolons, and single quotes unless surrounding code uses double quotes. Prefer small, purpose-specific modules and named exports. Use `camelCase` for variables/functions, `PascalCase` only for constructors, and `UPPER_SNAKE_CASE` for true constants. Keep code comments and JSDoc in English. CSS must use the tokens defined in `src/styles/tokens.css`; do not hard-code theme brand colors. When changing CSP rules, update both `_headers` and the CSP meta tag in `index.html`.

## Testing Guidelines

Regression checks are standalone Node scripts using `node:assert`; UI checks may use Playwright. Name new checks `scripts/<area>-regression.mjs` and add a matching `test:<area>` script to `package.json`.

Prefer observable user behavior or stable public contracts. Do not require a private helper to live in a particular file, preserve a private variable name, or keep a source literal that has no product meaning. When an architectural change invalidates an old contract, update, merge, or remove its regression test in the same change.

Run the focused regression plus `npm run build` while developing. Before merging to main, run every registered `test:<area>` command. Known failing tests are not an acceptable baseline. For interaction or responsive changes, verify desktop and mobile behavior; include tablet landscape when the change affects shared canvas or layout code.

## Commit & Pull Request Guidelines

Follow the repository’s English Conventional Commit style: `feat(sfx): ...`, `fix(mobile): ...`, or `polish: ...`. Keep commits narrowly scoped and include rebuilt bundles when source changes require them. PRs should explain behavior changes, list commands run, link relevant issues, and attach before/after screenshots or recordings for visual work. Never commit real secrets such as `ADMIN_TOKEN`; document variable names in `.env.example` only.
