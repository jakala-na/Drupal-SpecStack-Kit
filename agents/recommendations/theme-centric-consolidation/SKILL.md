---
name: theme-centric-consolidation
description: >-
  Fold packages/ui and the generated API client into the theme for a
  single-site project; keep shared Vite/ox tooling only.
---

# Theme-centric consolidation

Use when one website/theme owns all frontend code and the workspace packages add friction.

## Do

1. Move React islands to `web/themes/custom/<theme>/src/react/` (or `src/blocks/`).
2. Move OpenAPI codegen output to `src/api/generated/` with `openapi.config.ts` in the theme; keep `openapi_schemas/openapi.json` next to it.
3. Point theme `package.json` scripts at local source; remove `@specstack/ui` / `@specstack/drupal-sdk` workspace deps once migrated.
4. Keep `@specstack/vite` (or copy pipelines into `theme/scripts/`) plus oxlint/oxfmt/typescript shared configs if useful.
5. Update Turbo/`pnpm-workspace.yaml` to the theme package (and remaining tooling packages only).

## Keep

- Module-owned `openapi_schema/*.yml` and Drush merge.
- Icons sprite + featured-icons convention.
- Tailwind v4 + multi-pipeline build (base / sdc / react / icons).
