# Admin theme (Gin)

- Admin theme: `gin` (depends on `claro` as base — leave Claro installed)
- Front theme: `specstack_theme`
- Modules: `toolbar`, `gin_toolbar`
- Gin setting `classic_toolbar: vertical` — sidebar admin navigation

Front-theme CSS imports Tailwind theme + utilities only (no Preflight) and scopes document-base rules to `.dialog-off-canvas-main-canvas`, so Gin’s sidebar is unaffected on front-end pages.

Profile install config: `web/profiles/custom/specstack_kit/config/install/`. Exported tree: `config/sync/` (`system.theme.yml`, `gin.settings.yml`, Gin blocks, `core.extension.yml`).
