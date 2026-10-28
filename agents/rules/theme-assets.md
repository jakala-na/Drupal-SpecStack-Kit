# Theme asset rules

- Build with the theme orchestrator (`pnpm build`); never hand-edit `dist/` or generated `sprite.html.twig`.
- **Layout:** `src/css/` → `dist/css/`, `src/js/` → `dist/js/` (folder nesting preserved). SDC sources live in `components/<name>/src/` and compile to siblings at the component root.
- **Partials:** basename `_*.css` / `_*.ts` / `_*.tsx` are not entries — import them from a full entry (theme and SDC).
- **TypeScript only** for theme/SDC script sources (`.ts` / `.tsx`). Plain `.js` / `.jsx` sources are not built.
- CSS `url()` fonts/images must go through Vite so emission paths stay correct (`base: "./"` for CSS pipelines).
- `assets/icons/` → sprite; `assets/featured-icons/` → public URL only.
- Tailwind v4 is the default: theme + utilities only (no Preflight). Full entries use the split imports in `global.css`; SDC/partials that need utilities use `@reference "tailwindcss"`.
- Document base: `:root` `--ssk-*` tokens and `@layer base` element selectors scoped to `.dialog-off-canvas-main-canvas` for WYSIWYG HTML; custom widgets reset locally (`docs/document-base.md`).
- React app builds as a **single** ESM file (`codeSplitting: false`) so Drupal’s `?{query_string}` on the library URL cannot fork the module graph.
- Non-React theme/SDC JS attaches via `.js-*` classes only; never style those classes (`docs/js-classes.md`).
