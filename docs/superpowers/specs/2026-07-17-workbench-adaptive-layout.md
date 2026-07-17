# Workbench Adaptive Layout Specification

Date: 2026-07-17  
Status: authoritative for the bead working phases and drawing studio

## 1. Purpose

The workbench must preserve the usefulness and visual priority of the primary
stage while the window changes size. This does **not** mean scaling every pixel as
one bitmap. It means keeping stable proportions inside a feasible topology, then
changing topology before any pane becomes too small to perform its job.

This document replaces `2026-07-17-layout-system.md`. `DESIGN.md` remains the
repository-level contract and is synchronized with this specification.

## 2. Source principles

The contract combines established platform guidance with measurements from this
product:

- [Material canonical layouts](https://developer.android.com/develop/adaptive-apps/guides/canonical-layouts?hl=en): supporting panes can be side-by-side when space permits and become hidden or overlaid when it does not.
- [Apple layout guidance](https://developer.apple.com/design/human-interface-guidelines/layout): preserve the primary task and simplify the composition when the complete layout no longer fits.
- [Apple sidebar guidance](https://developer.apple.com/design/human-interface-guidelines/sidebars?changes=_8): sidebars consume substantial space and need compact alternatives.
- [Microsoft responsive design](https://learn.microsoft.com/en-us/windows/apps/design/layout/responsive-design): responsive products resize, reflow, show/hide, and re-architect according to available space.
- [WCAG 2.2 Reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html): content and controls must remain reachable at narrow effective viewports; a two-dimensional editor may keep a bounded two-axis work surface.

No external system knows Beam's renderer geometry, so local pane floors come from
measured content and canvas needs rather than copied device labels.

## 3. Priority hierarchy

1. The primary stage (`.workbench`) owns the largest useful share.
2. Essential stage controls remain visible and reachable.
3. Tool and palette panes support the stage; they never squeeze it below its floor.
4. Decorative empty space and simultaneous visibility of all supporting panes are expendable.

When these priorities conflict, change topology before shrinking the primary stage.

## 4. Layout modes

### Phone: up to 860px

- Preserve the existing single-column product flow.
- At ordinary phone heights the app remains viewport-contained.
- At an effective viewport height of 520px or less, including the 640×360 proxy
  for a 1280×720 window at 200% zoom, allow vertical page reflow.
- The bead or drawing canvas module must remain at least 320px high; controls below
  it remain reachable through vertical scrolling.

### Compact workbench: 861–1007px

- Use two columns: `minmax(0, 1fr) 240px`.
- The workbench occupies the first column and spans both rows.
- The tool pane and palette pane share the 240px supporting rail, one above the other.
- This mode applies equally to bead working phases and the drawing studio.
- The choose/library phase is not a workbench and keeps its existing browse layout.

### Full workbench: 1008px and wider

- Use three simultaneous panes with tracks:
  `minmax(196px, 22fr) minmax(540px, 54fr) minmax(204px, 24fr)`.
- The feasibility boundary is content-derived:
  `196 + 540 + 204 + (2 × 16 gap) + (2 × 18 shell inset) = 1008px`.
- After the minimum floors clear, the tracks converge to 22/54/24. Under uniform
  same-aspect window scaling, each track share may drift by no more than two
  percentage points before the outer `--content-max` ceiling is reached.

The 1007→1008 transition intentionally changes topology. Continuity is required
inside each topology, not across the topology boundary.

## 5. Block-axis behavior

- The topbar keeps its authored relationship to the workbench: 16px between the
  two regions where that gap is part of the screen composition.
- Working grids consume the remaining available height.
- Do not impose a universal fixed workbench height or use `margin-block:auto` to
  create automatic letterboxing.
- Tall windows may make the workbench taller; the canvas renderer continues to fit
  its artifact inside the measured stage while panels scroll internally.

## 6. Shared implementation contract

The bead working layouts and drawing studio consume the same tokens:

```css
--studio-compact-rail: 240px;
--studio-cols-compact: minmax(0, 1fr) var(--studio-compact-rail);
--studio-cols-work: minmax(196px, 22fr) minmax(540px, 54fr) minmax(204px, 24fr);
```

Breakpoints change placement; components do not fork their own rail recipes.
Supporting panels own their internal overflow. The page must not overflow
horizontally in any mode.

## 7. Acceptance matrix

| Case | Required result |
|---|---|
| 860px | Existing phone topology |
| 861px and 1007px | Compact two-column topology; workbench at least 540px wide |
| 1008px | Full three-column topology; panes at least 196/540/204px |
| 1440×900 and 1600×1000 | Full-track shares differ by at most 2 percentage points |
| Taller same-topology viewport | Working grid height grows; no 780px cap or automatic centering |
| 640×360 | Canvas module at least 320px high with vertical scroll escape |
| Bead place through finish | Primary stage remains stable and controls remain reachable |
| Drawing studio | Same breakpoint and track behavior as bead working |
| All cases | No horizontal page overflow or new runtime errors |

## 8. Non-goals

- No change to product color, typography, or sketch visual language.
- No redesign of the pattern library, gallery, collection, community, or duo mode.
- No renderer rewrite and no uniform pixel scaling of the entire interface.
