---
name: graphql-alongside-rest
description: >-
  Keep REST OpenAPI contracts as SpecStack source of truth when GraphQL also
  exists; avoid forked schema ownership.
---

# GraphQL alongside REST

1. SpecStack’s enforced shared contract is **REST + OpenAPI** (`openapi_schema/*.yml` → export → TS/Zod).
2. If GraphQL is required, treat it as an additional consumer surface. Do not replace OpenAPI fragments with GraphQL SDL as the kit’s contract owner.
3. Prefer mapping GraphQL fields to the same domain models validated for REST, or generate GraphQL from a single schema pipeline the team owns outside ad-hoc duplication.
4. Frontend packages that use SpecStack islands continue to consume the hey-api client unless a dedicated GraphQL client is explicitly introduced for that feature.
5. Document which endpoints are REST-only vs GraphQL-only so agents do not invent parallel CRUD paths.
