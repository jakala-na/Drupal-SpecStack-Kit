---
name: theme-build
description: >-
  SpecStack theme Vite pipelines: icons sprite, base CSS/JS, SDC compile,
  React app, nesting, _ partials, TypeScript-only sources, asset url() handling.
---

# Theme build

Orchestrator: `web/themes/custom/specstack_theme/scripts/build.js` → `@specstack/vite/build`.

| Pipeline | Input                                | Output                                                      |
| -------- | ------------------------------------ | ----------------------------------------------------------- |
| icons    | `assets/icons/*.svg`                 | `templates/icons/sprite.html.twig`, `dist/icons/sprite.svg` |
| base     | `src/css/**`, `src/js/**/*.{ts,tsx}` | `dist/css/**`, `dist/js/**/*.js` (IIFE; nesting preserved)  |
| sdc      | `components/*/src`                   | sibling `.css`/`.js` at component root                      |
| react    | `src/react/main.tsx`                 | `dist/js/react-app.js` (single ESM; no async chunks)        |

Flags: `--dev`, `--watch`.

## Structure

- Theme CSS: `src/css/` → `dist/css/` (folders nest 1:1).
- Theme JS: `src/js/` → `dist/js/` (folders nest 1:1). Author **TypeScript only**.
- SDC: put sources in `components/<name>/src/`; build emits compiled assets beside the Twig/YML for Drupal discovery.
- Never hand-edit `dist/` or compiled SDC siblings; do not list those paths in `component.yml`.

## Partials (`_` prefix)

Basenames starting with `_` are not entries for CSS or TS/JS (`_tokens.css`, `_helpers.ts`). Import them from a full entry. Applies to theme `src/` and `components/*/src/`.

## TypeScript

- Do not add plain `.js` / `.jsx` theme or SDC sources — the build skips them and warns.
- Keep `@specstack/typescript-config` strict options; typecheck with `pnpm ts-check`.

## Assets

- CSS builds use `base: "./"` so fonts/images resolve next to emitted CSS.
- Fonts → `fonts/[name][extname]`; raster/svg images → `images/[name][extname]`.
- React build uses absolute Drupal base `/themes/custom/specstack_theme/dist/`.
- Tailwind v4: full entries import theme + utilities only (no Preflight); component/partials that need utilities use `@reference "tailwindcss"`.

## Libraries

`specstack_theme.libraries.yml` points at `dist/` for global and `react_app`. SDC compiled files are auto-discovered.

## Non-React JS

Theme/SDC behaviors attach via `.js-*` classes only (`docs/js-classes.md`). Example: `src/js/global.ts` + `js-ssk-theme` on `<body>`.

Human doc: `docs/theme-build.md`.
