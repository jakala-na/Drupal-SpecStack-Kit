---
name: adapt-project
description: >-
  Rename SpecStack demo theme/modules/packages for a client project and strip
  hello-world demo features while keeping build, OpenAPI, and lint tooling.
---

# Adapt SpecStack to a client project

1. Rename `specstack_theme`, `specstack_api`, `specstack_hello_world` (or delete the demo module) and `@specstack/*` package names to the project prefix.
2. Update `reactBasePath`, library names, Twig namespaces (`@specstack_theme` → `@your_theme`), icon symbol prefix (`ssk-icon-` → client short prefix), CSS `--ssk-*` / `.ssk-*` tokens/classes, and Drush destination paths. See `docs/naming.md`.
3. Replace hello-world OpenAPI fragments and REST resources with project contracts.
4. Keep `@specstack/vite` pipelines (or rename the package) — do not collapse build scripts unless following `agents/recommendations/theme-centric-consolidation`.
5. Run `pnpm install`, `drush specstack:openapi:generate` (or renamed command), `pnpm openapi-ts`, `pnpm build`, `pnpm lint:check`.
6. Apply `agents/skills/align-comments` to README/docs after renaming.
