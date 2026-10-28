# SpecStack Kit

Opinionated Drupal starterkit for native Drupal projects (classic, Canvas, REST, GraphQL, multisite). It standardizes a **frontend-first** feature mindset, theme structure, Vite asset builds, OpenAPI contracts shared by PHP and TypeScript, and a small React-islands stack.

## What it improves

- **Frontend-first architecture** — one shared display for identical UIs; Drupal backends adapt to the frontend contract (`docs/frontend-first.md`)
- **Contract-first APIs** — module-owned OpenAPI YAML, deterministic merge, Drush export, hey-api client + Zod in `@specstack/drupal-sdk`
- **Predictable theme builds** — icons sprite, base CSS/JS, SDC compile, optional React app (Vite 8 / Rolldown, Tailwind CSS v4)
- **Correct asset URLs** — fonts/images emitted where Drupal-served CSS/JS can resolve them
- **Fast lint/format** — oxlint + oxfmt
- **Agent-ready docs** — `AGENTS.md` + `agents/` for this kit’s workflow only (not a generic Drupal tutorial)

## Requirements

- PHP / Composer (Drupal 11)
- Node from `.nvmrc` and pnpm (`packageManager` in root `package.json`)
- DDEV recommended (`ddev theme` / `ddev theme-local` helpers)

## Fresh install (empty database)

```sh
composer install
pnpm install
pnpm build
ddev start   # or your own LAMP/DB; point settings.php at the database
ddev drush site:install specstack_kit \
  --account-name=admin \
  --account-pass=admin \
  --site-name="SpecStack Kit" \
  -y
```

The `specstack_kit` profile enables SpecStack modules, Gin + Gin Toolbar (vertical sidebar), `specstack_theme`, the hello-world demo block, and REST permissions for the demo API.

Optional: import the fuller exported tree from `config/sync/` after install (`drush cim`) when you need modules beyond the profile (for example JSON:API extras). Config sync path is set in `web/sites/default/settings.specstack.php`.

OpenAPI export + TypeScript codegen (end-to-end):

```sh
ddev openapi-ts              # Drush export + pnpm openapi-ts in DDEV
ddev openapi-ts --local      # same flow; TypeScript codegen on the host
ddev openapi-ts --check      # drift-check only
```

## Documentation

| Doc                                              | Topic                                                     |
| ------------------------------------------------ | --------------------------------------------------------- |
| [docs/architecture.md](docs/architecture.md)     | Layout and packages                                       |
| [docs/frontend-first.md](docs/frontend-first.md) | Shared display vs backend adapters; React vs Twig/SDC     |
| [docs/naming.md](docs/naming.md)                 | `ssk` vs `specstack` machine-name rules                   |
| [docs/js-classes.md](docs/js-classes.md)         | `js-*` hooks for non-React theme/SDC JavaScript           |
| [docs/theme-build.md](docs/theme-build.md)       | Vite pipelines, nesting, `_` partials, TypeScript sources |
| [docs/openapi.md](docs/openapi.md)               | Contracts and codegen                                     |
| [docs/icons.md](docs/icons.md)                   | Sprite vs featured icons                                  |
| [docs/document-base.md](docs/document-base.md)   | Token + element typography for WYSIWYG HTML               |
| [docs/admin-theme.md](docs/admin-theme.md)       | Gin + Gin Toolbar                                         |
| [AGENTS.md](AGENTS.md)                           | Entrypoint for coding agents                              |
| [agents/README.md](agents/README.md)             | What SpecStack agent skills cover (vs Drupal skills)      |

## Scripts

| Command                                       | Purpose                                                              |
| --------------------------------------------- | -------------------------------------------------------------------- |
| `pnpm build`                                  | Build theme (+ workspace tasks)                                      |
| `pnpm lint` / `pnpm lint:check`               | oxlint, oxfmt, TypeScript                                            |
| `pnpm openapi-ts`                             | Generate TS client from theme `openapi_schemas/openapi.json`         |
| `ddev openapi-ts` / `ddev openapi-ts --local` | Drush OpenAPI export + `pnpm openapi-ts` (container or host codegen) |
| `ddev theme` / `ddev theme --local`           | Frontend install + build (container or host)                         |
| `pnpm --filter @specstack/theme watch`        | Theme watch (dev)                                                    |
