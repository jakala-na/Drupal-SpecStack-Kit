---
name: scaffold
description: >-
  Scaffold SpecStack Kit building blocks: SDC, React UI block, Drupal
  programmatic block, OpenAPI schema fragment, or REST resource.
---

# SpecStack scaffold

Keep generated code minimal, demo-friendly, and easy to extend. Before scaffolding a second component for a new content type or API, check `agents/skills/frontend-first` — identical displays share one implementation.

Class/token prefixes: `ssk` (short) / `specstack` (long) — `docs/naming.md`. Non-React JS hooks: `js-*` — `docs/js-classes.md`.

## Create an SDC

1. Create `web/themes/custom/specstack_theme/components/<name>/`.
2. Add `<name>.component.yml`, `<name>.twig`, and optional `src/<name>.css` / `src/<name>.ts` (TypeScript only for scripts).
3. Put Tailwind utilities in `src/`; the theme build compiles to the component root for Drupal auto-discovery. Do not list compiled paths in `component.yml`.
4. Use `_`-prefixed partials for shared CSS/TS imported by the entry; they are not compiled alone.
5. If the SDC ships classic JS (not React), mark hooks with `.js-*` classes in Twig and select those in the script — never style `js-*`.

## Create a React block island

1. Create `packages/ui/src/blocks/<Name>/<Name>.tsx`.
2. Export from `packages/ui/src/blocks/<Name>/index.ts`.
3. Map a mount key in `packages/ui/src/config/blocks.config.tsx` (consumed via `data-specstack-react-app`).
4. Accept `ReactSettings` when values come from `data-react-settings`.

## Create a Drupal programmatic block

1. Create `web/modules/custom/<module>/src/Plugin/Block/<Name>Block.php`.
2. Return a render array with the React mount attribute, optional `data-react-settings`, and `specstack_theme/react_app`.

## Create an OpenAPI schema fragment

1. Create `web/modules/custom/<module>/openapi_schema/<feature>.yml`.
2. Define `paths` and reusable `components.schemas`.
3. Prefer response schemas like `<Feature>CollectionResponse` that reference item schemas.
4. Regenerate: `ddev openapi-ts` (or `drush specstack:openapi:generate` → `pnpm openapi-ts`).

## Create a REST resource

1. Create `web/modules/custom/<module>/src/Plugin/rest/resource/<Feature>Resource.php`.
2. Use stable `/api/v1/...` paths.
3. Return explicit payload arrays, not raw entities.
4. Validate responses with `Drupal\specstack_api\OpenApi\SchemaValidator` when a component schema exists.
