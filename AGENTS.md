# SpecStack Kit — guidance for coding agents

SpecStack Kit is a Drupal starterkit with an opinionated frontend build, OpenAPI-backed REST contracts, and shared TypeScript packages. Read this file first; then open the matching skill under `agents/`.

## Scope of this guidance

`agents/` documents **how to work in this kit** (frontend-first features, contracts, theme pipelines, naming). It does **not** teach general Drupal. For hooks, plugins, Form/Entity API, Twig basics, coding standards, config, migrations, and security, use installed Drupal agent skills (for example [AI Best Practices for Drupal](https://www.drupal.org/project/ai_best_practices)) and core/contrib docs. See `agents/README.md`.

## Core invariants

1. **Frontend-first.** One shared display for identical UIs across backends; adapt Drupal rendering/APIs to the frontend contract. Prefer React islands for interactive/client-fetched UI; Twig/SDC for server-rendered or Form API–heavy surfaces. See `docs/frontend-first.md` and `agents/skills/frontend-first`.
2. **Contracts live in modules.** Each feature module owns `openapi_schema/*.yml`. End-to-end: `ddev openapi-ts` (or `--local` for host codegen); or `drush specstack:openapi:generate` then `pnpm openapi-ts`.
3. **Theme build owns CSS/JS/SDC/React/icons.** `src/css` → `dist/css`, `src/js` → `dist/js` (nesting preserved); SDC sources in `components/<name>/src/` compile to the component root. `_`‑prefixed files are partials (not entries). Run `pnpm build` / `ddev theme`. Do not hand-edit `dist/` or generated sprite Twig. See `docs/theme-build.md`.
4. **TypeScript for all front-end script sources.** Theme, SDC, and packages use `.ts` / `.tsx` under strict `@specstack/typescript-config`. Plain `.js` / `.jsx` sources are not built.
5. **Sprite vs featured icons.** `assets/icons/*.svg` → symbol sprite. `assets/featured-icons/` → public URL assets (not sprited).
6. **React islands** register in `packages/ui` block config and mount via `data-specstack-react-app` plus optional `data-react-settings`. Attach `specstack_theme/react_app`.
7. **Lint/format** use oxlint and oxfmt (not ESLint/Prettier). Typecheck with `tsc`.
8. **Document base typography** — `:root` `--ssk-*` tokens plus element selectors scoped to `.dialog-off-canvas-main-canvas` so bare HTML reads like branded paper. Widgets reset locally; see `docs/document-base.md` and `agents/skills/document-base`.
9. **React library** is one ESM file. Do not re-enable async chunk splitting for the Drupal-attached entry without solving query-string dual-load.
10. **Naming** — short tokens `ssk` (`--ssk-*`, `.ssk-*`, `#ssk-icon-*`); long machine names `specstack` / `specstack_*` / `@specstack/*`. See `docs/naming.md`.
11. **`js-` hooks** — non-React page/SDC JS attaches only via `.js-*` classes; never style those classes; presentation classes are separate. React islands still use `data-specstack-react-app`. See `docs/js-classes.md` and `agents/skills/js-classes`.

## Where things live

| Concern                      | Path                                                     |
| ---------------------------- | -------------------------------------------------------- |
| Theme + Vite pipelines       | `web/themes/custom/specstack_theme/`, `packages/vite/`   |
| React UI blocks              | `packages/ui/`                                           |
| Generated API client + hooks | `packages/drupal-sdk/`                                   |
| OpenAPI merge / validation   | `web/modules/custom/specstack_api/`                      |
| Demo REST feature            | `web/modules/custom/specstack_hello_world/`              |
| Human docs                   | `README.md`, `docs/`                                     |
| Config sync                  | `config/sync/` (path from `settings.specstack.php`)      |
| Admin theme                  | Gin + Gin Toolbar + core Toolbar (`docs/admin-theme.md`) |
| Agent skills (day-to-day)    | `agents/skills/`                                         |
| Adoption recommendations     | `agents/recommendations/`                                |
| Comment/doc voice            | `agents/skills/align-comments/`                          |

## Default workflow

1. Agree the UI contract (shared component / island) before forking backends — see frontend-first.
2. Implement backend + `openapi_schema/*.yml` (or Twig/SDC mapping) to feed that contract.
3. `ddev openapi-ts` (or `drush specstack:openapi:generate` then `pnpm openapi-ts`) when the contract is REST-backed.
4. Consume generated types/SDK from `@specstack/drupal-sdk` in UI or theme JS.
5. `pnpm build` / `pnpm lint:check`.

## When requirements diverge

Open `agents/recommendations/README.md` and load only the skill that matches (theme-centric consolidation, multilingual, multisite, headless, GraphQL alongside REST). Do not invent a parallel stack.
