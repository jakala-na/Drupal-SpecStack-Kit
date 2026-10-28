# Scaffold rules

- React islands: `data-specstack-react-app` + optional `data-react-settings`; registry in `packages/ui`.
- Programmatic blocks attach `specstack_theme/react_app`.
- Non-React SDC/theme JS: TypeScript sources under `src/` or `components/*/src/`; attach with `.js-*` classes only; never style `js-*` (`docs/js-classes.md`, `docs/theme-build.md`).
- `_`-prefixed CSS/TS files are partials (import only), not entries.
- REST resources return explicit payload arrays, not raw entities.
- OpenAPI fragments: `web/modules/custom/<module>/openapi_schema/*.yml`.
- SDC compiled assets stay colocated at the component root; do not list them in `component.yml`.
