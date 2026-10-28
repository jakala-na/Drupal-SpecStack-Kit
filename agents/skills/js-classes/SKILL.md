---
name: js-classes
description: >-
  SpecStack js- class hooks for non-React theme/SDC JavaScript: attach via
  js-* only; never style those classes; presentation classes are separate.
---

# `js-` attachment hooks

1. When writing Drupal behaviors or other non-React page JS, select elements with a `.js-*` class only.
2. Put the `js-*` class in Twig/SDC markup next to presentational classes; do not invent a second selector for the same hook.
3. Do not write CSS rules that target `.js-*`. Style `.ssk-*` / utilities / state classes instead.
4. Behaviors may add or toggle presentation/state classes after attach; never reverse that (do not attach by styling class).
5. React islands continue to mount via `data-specstack-react-app` — see `agents/skills/scaffold`.
6. Author behaviors as TypeScript (`.ts`); see `docs/theme-build.md`.
7. Human doc: `docs/js-classes.md`. Kit example: `web/themes/custom/specstack_theme/src/js/global.ts` + `js-ssk-theme` on `<body>`.
