// Unified icon source (Lucide, stroke-based, viewBox 0 0 24 24).
//
// Single source of truth: every JS-injected icon goes through icon(name, opts).
// The static icons in index.html are an "inline mirror" of the same Lucide set — to avoid an
// icon flash on first paint and to keep purely decorative icons from depending on JS, they stay
// hand-written inline, but their paths match this table; keep both in sync when changing an icon.
//
// Spec: see DESIGN.md §6 — viewBox 0 0 24 24 / stroke=currentColor / icon buttons must carry aria-label.
// To swap in a new icon: `npx better-icons get lucide:<name>` to grab the path, strip any extra
// fill/stroke on child elements, keep only the geometry (d / rect / circle), and let the outer <svg>
// in this table apply the color and stroke uniformly.

const PATHS = {
  // —— Navigation / topbar ——
  "arrow-left": '<path d="m12 19l-7-7l7-7m7 7H5"/>',
  "arrow-right": '<path d="m12 5l7 7l-7 7m-7-7h14"/>',
  "chevron-right": '<path d="m9 18l6-6l-6-6"/>',
  search: '<circle cx="11" cy="11" r="8"/><path d="m21 21l-4.3-4.3"/>',
  settings:
    '<path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0a2.34 2.34 0 0 0 3.319 1.915a2.34 2.34 0 0 1 2.33 4.033a2.34 2.34 0 0 0 0 3.831a2.34 2.34 0 0 1-2.33 4.033a2.34 2.34 0 0 0-3.319 1.915a2.34 2.34 0 0 1-4.659 0a2.34 2.34 0 0 0-3.32-1.915a2.34 2.34 0 0 1-2.33-4.033a2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"/><circle cx="12" cy="12" r="3"/>',
  "refresh-cw":
    '<path d="M3 12a9 9 0 0 1 9-9a9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5m5 4a9 9 0 0 1-9 9a9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/>',
  "rotate-ccw": '<path d="M3 12a9 9 0 1 0 9-9a9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/>',

  // —— Entry (home four-up grid) ——
  // pegboard: bead board (custom, maps to the bead grid)
  pegboard:
    '<rect x="4" y="4" width="16" height="16" rx="2"/><path d="M4 10H20M4 14H20M10 4V20M14 4V20"/>',
  pencil:
    '<path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497zM15 5l4 4"/>',
  image:
    '<rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15l-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>',
  "clipboard-list":
    '<rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2m4 7h4m-4 5h4m-8-5h.01M8 16h.01"/>',
  "message-circle":
    '<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22z"/>',
  heart:
    '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2c-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>',

  // —— Drawing studio tools ——
  paintbrush:
    '<path d="m14.622 17.897l-10.68-2.913M18.376 2.622a1 1 0 1 1 3.002 3.002L17.36 9.643a.5.5 0 0 0 0 .707l.944.944a2.41 2.41 0 0 1 0 3.408l-.944.944a.5.5 0 0 1-.707 0L8.354 7.348a.5.5 0 0 1 0-.707l.944-.944a2.41 2.41 0 0 1 3.408 0l.944.944a.5.5 0 0 0 .707 0zM9 8c-1.804 2.71-3.97 3.46-6.583 3.948a.507.507 0 0 0-.302.819l7.32 8.883a1 1 0 0 0 1.185.204C12.735 20.405 16 16.792 16 15"/>',
  eraser:
    '<path d="M21 21H8a2 2 0 0 1-1.42-.587l-3.994-3.999a2 2 0 0 1 0-2.828l10-10a2 2 0 0 1 2.829 0l5.999 6a2 2 0 0 1 0 2.828L12.834 21m-7.752-9.91l8.828 8.828"/>',
  "paint-bucket":
    '<path d="M11 7L6 2m12.992 10H2.041m19.104 6.38A3.34 3.34 0 0 1 20 16.5a3.3 3.3 0 0 1-1.145 1.88c-.575.46-.855 1.02-.855 1.595A2 2 0 0 0 20 22a2 2 0 0 0 2-2.025c0-.58-.285-1.13-.855-1.595M8.5 4.5l2.148-2.148a1.205 1.205 0 0 1 1.704 0l7.296 7.296a1.205 1.205 0 0 1 0 1.704l-7.592 7.592a3.615 3.615 0 0 1-5.112 0l-3.888-3.888a3.615 3.615 0 0 1 0-5.112L5.67 7.33"/>',
  square: '<rect width="18" height="18" x="3" y="3" rx="2"/>',
  circle: '<circle cx="12" cy="12" r="10"/>',
  pipette:
    '<path d="m12 9l-8.414 8.414A2 2 0 0 0 3 18.828v1.344a2 2 0 0 1-.586 1.414A2 2 0 0 1 3.828 21h1.344a2 2 0 0 0 1.414-.586L15 12"/><path d="m18 9l.4.4a1 1 0 1 1-3 3l-3.8-3.8a1 1 0 1 1 3-3l.4.4l3.4-3.4a1 1 0 1 1 3 3zM2 22l.414-.414"/>',
  "undo-2":
    '<path d="M9 14L4 9l5-5"/><path d="M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5a5.5 5.5 0 0 1-5.5 5.5H11"/>',

  // —— Common actions ——
  "trash-2":
    '<path d="M10 11v6m4-6v6m5-11v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>',
  plus: '<path d="M5 12h14M12 5v14"/>',
  minus: '<path d="M5 12h14"/>',
  upload:
    '<path d="M12 3v12m5-7l-5-5l-5 5m14 7v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>',
  download:
    '<path d="M12 15V3m9 12v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10l5 5l5-5"/>',
  "share-2":
    '<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.59 13.51l6.83 3.98m-.01-10.98l-6.82 3.98"/>',
  copy:
    '<rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>',
  check: '<path d="M20 6L9 17l-5-5"/>',
  scaling:
    '<path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M14 15H9v-5m7-7h5v5m0-5L9 15"/>',
  sparkles:
    '<path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594zM20 2v4m2-2h-4"/><circle cx="4" cy="20" r="2"/>',

  // —— Inspect / settings states ——
  eye:
    '<path d="M2.062 12.348a1 1 0 0 1 0-.696a10.75 10.75 0 0 1 19.876 0a1 1 0 0 1 0 .696a10.75 10.75 0 0 1-19.876 0"/><circle cx="12" cy="12" r="3"/>',
  "eye-off":
    '<path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575a1 1 0 0 1 0 .696a10.8 10.8 0 0 1-1.444 2.49m-6.41-.679a3 3 0 0 1-4.242-4.242"/><path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151a1 1 0 0 1 0-.696a10.75 10.75 0 0 1 4.446-5.143M2 2l20 20"/>',
  reply: '<path d="M20 18v-2a4 4 0 0 0-4-4H4"/><path d="m9 17l-5-5l5-5"/>',
  "flask-conical":
    '<path d="M14 2v6a2 2 0 0 0 .245.96l5.51 10.08A2 2 0 0 1 18 22H6a2 2 0 0 1-1.755-2.96l5.51-10.08A2 2 0 0 0 10 8V2M6.453 15h11.094M8.5 2h7"/>',
  x: '<path d="M18 6L6 18M6 6l12 12"/>',
  "badge-check":
    '<path d="M3.85 8.62a4 4 0 0 1 4.78-4.77a4 4 0 0 1 6.74 0a4 4 0 0 1 4.78 4.78a4 4 0 0 1 0 6.74a4 4 0 0 1-4.77 4.78a4 4 0 0 1-6.75 0a4 4 0 0 1-4.78-4.77a4 4 0 0 1 0-6.76"/><path d="m9 12l2 2l4-4"/>',
  "badge-x":
    '<path d="M3.85 8.62a4 4 0 0 1 4.78-4.77a4 4 0 0 1 6.74 0a4 4 0 0 1 4.78 4.78a4 4 0 0 1 0 6.74a4 4 0 0 1-4.77 4.78a4 4 0 0 1-6.75 0a4 4 0 0 1-4.78-4.77a4 4 0 0 1 0-6.76M15 9l-6 6m0-6l6 6"/>',
};

function escapeAttribute(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

/**
 * Build a uniform icon SVG string.
 * @param {string} name an icon name from PATHS
 * @param {{size?:number, strokeWidth?:number, class?:string, label?:string}} [opts]
 *   - size: width/height (px), default 18
 *   - strokeWidth: stroke width, default 2 (uniform across the app, don't change lightly)
 *   - class: extra class
 *   - label: if given, renders a readable icon (role="img" + aria-label); otherwise aria-hidden (default, for use alongside a button's own aria-label)
 * @returns {string}
 */
export function icon(name, opts = {}) {
  const body = PATHS[name];
  if (!body) {
    if (typeof console !== "undefined") console.warn(`[icons] unknown icon: ${name}`);
    return "";
  }
  const size = Number(opts.size) > 0 ? Number(opts.size) : 18;
  const sw = Number(opts.strokeWidth) > 0 ? Number(opts.strokeWidth) : 2;
  const classes = `${opts.class || ""} lucide-icon`.trim().split(/\s+/).filter(Boolean);
  const cls = ` class="${escapeAttribute([...new Set(classes)].join(" "))}"`;
  const a11y = opts.label
    ? ` role="img" aria-label="${escapeAttribute(opts.label)}"`
    : ' aria-hidden="true"';
  return `<svg${cls} viewBox="0 0 24 24" width="${size}" height="${size}" fill="none" stroke="currentColor" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round"${a11y}>${body}</svg>`;
}

export function hasIcon(name) {
  return Object.prototype.hasOwnProperty.call(PATHS, name);
}

/**
 * Replace data-lucide-icon placeholders in static HTML with registry SVGs.
 * Unknown icons keep their original node, making them easy to spot during development.
 * @param {ParentNode} [root]
 * @returns {number} the number of icons replaced
 */
export function hydrateIcons(root = document) {
  if (!root?.querySelectorAll) return 0;
  let hydrated = 0;
  root.querySelectorAll("[data-lucide-icon]").forEach((placeholder) => {
    const name = placeholder.dataset.lucideIcon;
    if (!hasIcon(name)) {
      if (typeof console !== "undefined") console.warn(`[icons] unknown icon: ${name}`);
      return;
    }
    const className = [
      typeof placeholder.className === "string" ? placeholder.className : "",
      placeholder.dataset.iconClass || "",
    ].filter(Boolean).join(" ");
    placeholder.outerHTML = icon(name, {
      size: placeholder.dataset.iconSize,
      strokeWidth: placeholder.dataset.iconStrokeWidth,
      class: className,
      label: placeholder.dataset.iconLabel,
    });
    hydrated += 1;
  });
  return hydrated;
}
