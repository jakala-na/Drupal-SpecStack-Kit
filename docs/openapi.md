# OpenAPI contracts

## Authoring

Place fragments at `web/modules/custom/<module>/openapi_schema/*.yml` with `paths` and `components`. Operation and component names must be unique across modules.

## Export and codegen

End-to-end (Drush export + TypeScript client):

```sh
ddev openapi-ts              # both steps in DDEV
ddev openapi-ts --local      # Drush via DDEV; pnpm openapi-ts on the host (NVM)
ddev openapi-ts-local        # same as --local
ddev openapi-ts --check      # drift-check committed JSON only
```

Or run the steps separately:

```sh
drush specstack:openapi:generate
drush specstack:openapi:generate --check
pnpm openapi-ts
```


Default export path:

`web/themes/custom/specstack_theme/openapi_schemas/openapi.json`

Generated client:

`packages/drupal-sdk/src/openapi-clients/specstack/`

Swagger UI uses the same merged document via `ContractRestGenerator`.

## Validation

PHP: `Drupal\specstack_api\OpenApi\SchemaValidator` (JSON Schema subset; OpenAPI `nullable` normalized).

Commit the JSON export and generated TypeScript with contract changes.
