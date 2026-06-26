// Single source of truth for the 拼豆工坊 brand mark (the rounded "bead tray" card
// with four perler beads + a sparkle). Both the in-app topbar logo and the
// exported share-card logo render from this exact markup, so the brand stays
// identical everywhere. The repo's `favicon.svg` is the same artwork for the
// browser tab icon — keep the two in sync when the mark changes.
//
// Colors are concrete (default 雾青 theme) rather than theme tokens on purpose:
// a logo reads as one fixed brand mark, and the canvas export has no CSS context
// to resolve `var(--brand)` against anyway.
export const LOGO_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" aria-hidden="true" focusable="false">
  <rect width="64" height="64" rx="14" fill="#F8FBF9"/>
  <path d="M17 18c0-4.4 3.6-8 8-8h14c4.4 0 8 3.6 8 8v28c0 4.4-3.6 8-8 8H25c-4.4 0-8-3.6-8-8V18z" fill="#DDEBE7"/>
  <circle cx="26" cy="22" r="9" fill="#57B8A7"/>
  <circle cx="40" cy="22" r="9" fill="#E7645F"/>
  <circle cx="26" cy="40" r="9" fill="#D99B3D"/>
  <circle cx="40" cy="40" r="9" fill="#4D77B8"/>
  <circle cx="26" cy="22" r="3.4" fill="#F8FBF9"/>
  <circle cx="40" cy="22" r="3.4" fill="#F8FBF9"/>
  <circle cx="26" cy="40" r="3.4" fill="#F8FBF9"/>
  <circle cx="40" cy="40" r="3.4" fill="#F8FBF9"/>
  <path d="M49 13l4 4-4 4-4-4 4-4z" fill="#FFF0A8" stroke="#D99B3D" stroke-width="1.5"/>
</svg>`;

// data: URL form for <img>/canvas. A data URL (not a fetched file) keeps the
// canvas untainted so the share export's toBlob() works — and works over file://,
// matching how the share QR is embedded.
export const LOGO_DATA_URL = `data:image/svg+xml,${encodeURIComponent(LOGO_SVG)}`;

// Replace the placeholder .brand-mark nodes in static HTML with the SVG mark.
// Mirrors hydrateIcons(): the markup ships inert and gets the real art at startup.
export function hydrateLogo(root = document) {
  if (!root?.querySelectorAll) return 0;
  let count = 0;
  root.querySelectorAll(".brand-mark").forEach((node) => {
    node.innerHTML = LOGO_SVG;
    count += 1;
  });
  return count;
}

// Decode the logo once into an <img> for canvas drawing (share export). Resolves
// to null on failure so callers can fall back to a text wordmark.
let logoImagePromise = null;
export function loadLogoImage() {
  if (!logoImagePromise) {
    logoImagePromise = new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => resolve(null);
      img.src = LOGO_DATA_URL;
    });
  }
  return logoImagePromise;
}
