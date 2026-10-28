---
name: openapi-contract
description: >-
  Module-owned OpenAPI YAML contracts, Drush merge/export, hey-api codegen into
  @specstack/drupal-sdk, and PHP SchemaValidator usage.
---

# OpenAPI contracts

1. Author `web/modules/custom/<module>/openapi_schema/*.yml` (paths + components).
2. `specstack_api` merges enabled modules into one OpenAPI 3.0.3 document (`Document`).
3. End-to-end: `ddev openapi-ts` (or `ddev openapi-ts --local` for host codegen). Export lands at `web/themes/custom/specstack_theme/openapi_schemas/openapi.json`; client at `packages/drupal-sdk/src/openapi-clients/specstack/`.
4. Drift check: `ddev openapi-ts --check` (or `drush specstack:openapi:generate --check`).
5. Steps alone: `drush specstack:openapi:generate` then `pnpm openapi-ts`.
6. Hand-written hooks live beside generated clients under `packages/drupal-sdk/src/apis/`.

Swagger UI and the exported JSON use the same merged document (`ContractRestGenerator`).

Validate PHP payloads with `Drupal\specstack_api\OpenApi\SchemaValidator::errors()`.
Commit the theme `openapi.json` and generated TS alongside contract changes.
