# Document base typography

The theme treats ordinary HTML as company “paper”: headings, paragraphs, lists, links, tables, quotes, and buttons carry complete default styles (including top and bottom margins) via element selectors scoped under `.dialog-off-canvas-main-canvas` (e.g. `.dialog-off-canvas-main-canvas h1`).

## Intent

- WYSIWYG and arbitrary HTML in content regions look on-brand without per-field classes.
- Tokens live on `:root` (`--ssk-*`) so projects rebrand by overriding variables.
- Custom UI (main menu, cards, React islands) owns its own reset/overrides under the component class.

## Selectors covered

`h1`–`h6`, `p`, `ul`, `ol`, `li`, `a`, `button`, `table` / `th` / `td`, `blockquote`, `q`.

Source: `web/themes/custom/specstack_theme/src/css/global.css` (compiled to `dist/css/global.css`).

## Custom components

Scope resets under a component class (e.g. `.ssk-card h2 { margin: 0; }`) or use Tailwind utilities in SDC/React CSS. Do not strip the global document base to accommodate one widget.

## Admin chrome / Tailwind

- Import Tailwind **theme + utilities only** (no Preflight). Preflight resets lists/links globally and breaks the Drupal toolbar on front-end pages.
- Document-base rules sit in `@layer base` and are **scoped to `.dialog-off-canvas-main-canvas`** (Drupal’s main page wrapper). Toolbar / Gin secondary are siblings of that node, so they never inherit document typography, lists, or link styles.
- Keep `html` / `body` almost bare (background + margin only) — do not set `font-family` / `color` on `html`, or those inherit into the toolbar.
