# CLAUDE.md

Perler Studio is a static browser craft game built from ES modules and CSS with esbuild. It runs from committed `app.bundle.js` and `styles.css`, including through `file://`; CloudBase provides gallery review and short-code sharing APIs.

## Required Reading

Follow `AGENTS.md` first for repository workflow, build, test, style, security, and commit rules.

Before product or UI work, read:

- `PRODUCT.md` — product strategy, users, platform intent, and accessibility goals.
- `DESIGN.md` — current visual and interaction contracts; it wins over older design notes.
- `design-system/MASTER.md` — deeper implementation history and supporting details.

Deployment and CloudBase administration are documented in `DEPLOY_CLOUDFLARE_PAGES.md` and `README.md`.

## Claude-Specific Notes

- `/impeccable ...` commands read `PRODUCT.md` and `DESIGN.md` automatically.
- Live design configuration lives at `.impeccable/live/config.json`.
- Agent-facing instructions, implementation specs, plans, code comments, JSDoc, test comments, and commit messages use English. Product/design documentation and UI copy remain Chinese.
