# Circular Projection Spot Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Render the pegboard projection guide through a centered, soft-edged circular light spot.

**Architecture:** Keep projection pixels in the existing offscreen cache. After drawing the guide, apply a radial alpha mask with `destination-in`; size the radius from the cache's shorter dimension so rectangular boards retain a true circle.

**Tech Stack:** Vanilla JavaScript, Canvas 2D, Node regression script, esbuild.

---

### Task 1: Projection Mask Regression

**Files:**
- Create: `scripts/projection-regression.mjs`
- Modify: `package.json`

- [ ] Assert that the projection cache creates a radial gradient.
- [ ] Assert that the cache applies the gradient through `destination-in`.
- [ ] Assert that the radius derives from `Math.min(canvasW, canvasH)`.
- [ ] Run `npm run test:projection` and confirm it fails before implementation.

### Task 2: Circular Soft Mask

**Files:**
- Modify: `src/render.js`

- [ ] Add a centered radial mask after the cached guide pixels are drawn.
- [ ] Keep full opacity through the inner portion and fade to transparent at the circle edge.
- [ ] Include both cache width and height in the projection cache key.
- [ ] Run `npm run test:projection` and confirm it passes.

### Task 3: Verification

**Files:**
- Regenerate: `app.bundle.js`

- [ ] Run the full build and regression suite.
- [ ] Open the local app, enable the work light, and visually verify the circular feathered spot.
