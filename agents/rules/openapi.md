# OpenAPI rules

- Unique path+method and component names across all module fragments.
- Export destination: theme `openapi_schemas/openapi.json`.
- Commit export JSON + generated TS with contract changes.
- Use `--check` in CI to catch drift.
- Validate PHP responses with `SchemaValidator` when a schema component exists.
