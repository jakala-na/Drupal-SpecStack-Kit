# specstack_theme

Drupal theme for SpecStack Kit. Builds with Vite 8 pipelines from `@specstack/vite`.

## Commands

```sh
pnpm build
pnpm build:dev
pnpm watch
```

## Structure

| Path                    | Role                                                                   |
| ----------------------- | ---------------------------------------------------------------------- |
| `src/css/**`            | Theme CSS entries → `dist/css/**` (nesting preserved)                  |
| `src/js/**/*.{ts,tsx}`  | Theme TypeScript entries → `dist/js/**/*.js` (nesting preserved)       |
| `src/react`             | React islands entry → `dist/js/react-app.js`                           |
| `components/*/src`      | SDC TypeScript/CSS sources → sibling compiled assets at component root |
| `assets/icons`          | Sprite icons                                                           |
| `assets/featured-icons` | Non-sprited artwork                                                    |
| `openapi_schemas`       | Merged OpenAPI JSON (codegen input for `@specstack/drupal-sdk`)        |
| `templates/icons`       | Sprite mount + icon Twig partial                                       |

Partials: basename `_*.css` / `_*.ts` / `_*.tsx` are imported only — not build entries.

Libraries: `global` (dist CSS/JS), `react_app` (ESM React bundle).

See `docs/theme-build.md` and `docs/js-classes.md`.
