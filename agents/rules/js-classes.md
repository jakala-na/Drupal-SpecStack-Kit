# `js-` class rules

- Non-React JS attaches only via classes prefixed with `js-` (e.g. `.js-ssk-accordion-trigger`).
- Never use `js-*` classes in CSS / Tailwind for styling.
- After attachment, scripts may add presentation or state classes (`ssk-*`, `is-*`); those classes are not attachment hooks.
- React islands keep using `data-specstack-react-app` / `data-react-settings` — that mount path is outside this rule.
- Human doc: `docs/js-classes.md`.
