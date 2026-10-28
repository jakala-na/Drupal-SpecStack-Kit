# Theme build

Entry: `web/themes/custom/specstack_theme` → `node scripts/build.js`.

Pipelines run in order: **icons → base → sdc → react**.

## Commands

```sh
pnpm --filter @specstack/theme build
pnpm --filter @specstack/theme build:dev
pnpm --filter @specstack/theme watch
```

Root `pnpm build` runs the theme via Turbo. Prefer `ddev theme` / `ddev theme --local` when using DDEV.

## File structure and bundling

| Source                    | Output                           | Notes                                    |
| ------------------------- | -------------------------------- | ---------------------------------------- |
| `src/css/**/*.css`        | `dist/css/**` (same nesting)     | Full CSS entries only                    |
| `src/js/**/*.{ts,tsx}`    | `dist/js/**/*.js` (same nesting) | IIFE; TypeScript sources only            |
| `components/<name>/src/*` | `components/<name>/*.{css,js}`   | SDC auto-discovery at the component root |
| `src/react/main.tsx`      | `dist/js/react-app.js`           | Single ESM file for Drupal               |

Examples:

- `src/css/global.css` → `dist/css/global.css`
- `src/js/global.ts` → `dist/js/global.js`
- `src/js/nesting-demo/nesting-demo.ts` → `dist/js/nesting-demo/nesting-demo.js`
- `components/card/src/card.css` → `components/card/card.css`

Do not hand-edit `dist/` or compiled SDC siblings. Point `*.libraries.yml` at `dist/` for theme globals; do **not** list compiled SDC paths in `component.yml`.

## Partials (`_` prefix)

Files whose **basename** starts with `_` are **not** build entries. Import them from a full entry.

| Kind  | Entry                          | Partial (imported only)                            |
| ----- | ------------------------------ | -------------------------------------------------- |
| CSS   | `src/css/global.css`           | `src/css/_tokens.css`, `src/css/forms/_inputs.css` |
| JS/TS | `src/js/global.ts`             | `src/js/_helpers.ts`, `src/js/menu/_toggle.ts`     |
| SDC   | `components/card/src/card.css` | `components/card/src/_card-title.css`              |

Same rule under `components/*/src/`: `_*.css` / `_*.ts` / `_*.tsx` are skipped as entries.

## TypeScript

- Author theme, SDC, and package scripts as **TypeScript** (`.ts` / `.tsx`). Plain `.js` / `.jsx` sources are not built (the pipeline warns and skips them).
- Shared compiler defaults live in `@specstack/typescript-config` (`strict`, unused checks, etc.). Theme `tsconfig.json` includes `src` and `components/*/src`.
- Run `pnpm ts-check` / `pnpm lint:check` before shipping.

## Asset URL rules

- CSS compilation uses `base: "./"` so `url()` fonts and images resolve relative to the emitted CSS under Drupal.
- Fonts emit to a `fonts/` folder beside that CSS; images to `images/`.
- React ESM uses base `/themes/custom/specstack_theme/dist/`.

## Tailwind CSS v4

- Global entry (`src/css/global.css`): import `tailwindcss/theme.css` and `tailwindcss/utilities.css` only — **not** Preflight (toolbar/Gin stay intact).
- Component/partial CSS that needs utilities: `@reference "tailwindcss";`

## Non-React JS

Attach behaviors with `.js-*` classes only; never style those classes. See `docs/js-classes.md`.

See also `agents/skills/theme-build` and `docs/document-base.md`.
