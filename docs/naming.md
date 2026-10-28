# Naming conventions

SpecStack Kit uses two project prefixes. Pick by length and context — do not invent a third short prefix.

| Prefix | Use when | Examples |
| --- | --- | --- |
| **`ssk`** | Short machine tokens: CSS classes, CSS custom properties, SVG symbol ids, Tailwind-oriented prefixes, compact BEM roots, short Drush aliases | `--ssk-color-accent`, `.ssk-card`, `#ssk-icon-search`, `.ssk-hello-world-block`, `drush ssk-openapi` |
| **`specstack`** | Longer machine names: Drupal modules/themes/profiles, Composer/npm package scopes, Twig namespaces, library names, data attributes, primary Drush command namespaces | `specstack_theme`, `specstack_api`, `@specstack/ui`, `@specstack_theme/icons/icon.html.twig`, `data-specstack-react-app`, `drush specstack:openapi:generate` |
| **`js-`** | Non-React JS attachment hooks only — never for CSS | `.js-ssk-theme`, `.js-ssk-accordion-trigger` |

## Rules

1. New CSS design tokens on `:root` use `--ssk-*`.
2. New theme/component class roots use `ssk-` (e.g. `.ssk-card__title`).
3. Icon sprite symbol ids use `#ssk-icon-{name}`; the sprite root class is `ssk-icon-sprite`.
4. Drupal extension machine names stay `specstack_*` (or the client rename from `agents/skills/adapt-project`).
5. Workspace packages stay `@specstack/*` until a client rename.
6. Non-React behaviors attach via `js-*` only; never style `js-*` classes (`docs/js-classes.md`).
7. Do not invent alternate short prefixes. CSS next to `--ssk-*` / `.ssk-*` may use unprefixed utilities; long names stay `specstack_*`.

When adapting the kit to a client project, replace both prefixes consistently (`ssk` → client short code, `specstack` → client long name) as described in `agents/skills/adapt-project`.
