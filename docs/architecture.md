# Architecture

## Layout

```
packages/
  vite/           # Shared theme build pipelines (Vite 8)
  ui/             # React islands + DrupalRenderer
  drupal-sdk/     # OpenAPI client, hooks, React Query helpers
  typescript-config/
web/
  themes/custom/specstack_theme/
  modules/custom/specstack_api/
  modules/custom/specstack_hello_world/
agents/           # Tool-agnostic skills, rules, recommendations
docs/
```

## Default topology

The kit keeps a **packages monorepo**: shared UI and SDK packages plus a Drupal theme that consumes them. Theme assets build through `@specstack/vite`.

When a single-site project wants React and the generated client inside the theme only, follow `agents/recommendations/theme-centric-consolidation`.

## Frontend-first

Features are designed from the shared display inward. Identical UIs across content types or APIs share one SDC/Twig/React implementation; Drupal adapts storage and payloads to that contract. See `docs/frontend-first.md`.

## Naming

Short CSS/token/icon ids use `ssk`; modules, packages, and libraries use `specstack`. See `docs/naming.md`.

## Theme assets

`src/css` / `src/js` compile to `dist/css` / `dist/js` with nesting preserved; SDC sources live in `components/<name>/src/`. Partials use a `_` basename prefix. Script sources are TypeScript. See `docs/theme-build.md`.

## Data flow (API)

1. Feature modules declare REST plugins and `openapi_schema/*.yml`.
2. `specstack_api` merges fragments (`OpenApi\Document`).
3. Drush writes `web/themes/custom/specstack_theme/openapi_schemas/openapi.json`.
4. `pnpm openapi-ts` writes `packages/drupal-sdk/src/openapi-clients/specstack/`.
5. UI/theme consume the SDK; PHP validates with `SchemaValidator` when needed.
