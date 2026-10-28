---
name: multisite
description: >-
  SpecStack on Drupal multisite: shared packages vs site themes, asset bases,
  and OpenAPI exports. Assumes multisite itself is already configured.
---

# Multisite (SpecStack)

Assumes Drupal multisite / config split are already set up (use Drupal skills/docs for that).

1. Prefer one custom theme per site (or shared base theme + thin site theme). Point each theme’s React `basePath` at that theme’s `/themes/custom/<theme>/dist/`.
2. Share `@specstack/vite`, oxlint/oxfmt, and optionally `@specstack/drupal-sdk` when APIs are shared; give site-specific UI its own package or theme `src/`.
3. OpenAPI: shared modules contribute shared fragments; site-only modules contribute site-only fragments. Export per consumer that needs a client (theme or package).
4. Do not encode site names into Vite package names unless required.
5. CI: build each theme that ships; cache Turbo outputs per package.
6. Frontend-first: share display components across sites when the design matches; site-specific backends still map into those components.
