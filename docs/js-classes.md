# `js-` class hooks (non-React JavaScript)

Non-React theme/SDC JavaScript that finds elements, attaches listeners, or runs behaviors must hook the DOM through a class whose name starts with `js-`.

## Why

A `js-` class means: **removing this class stops a script from targeting this element**. Readers, reviewers, and debuggers can tell attachment hooks apart from presentational BEM/`ssk-` classes.

## Rules

1. **Attach only via `js-*`.** Drupal behaviors, `once()`, `querySelector`, and similar hooks use classes like `.js-ssk-accordion-trigger`.
2. **Never style `js-*`.** Put visual rules on presentation classes (`.ssk-*`, utilities, etc.). CSS must not select `.js-*`.
3. **Scripts may add presentation classes.** After attachment, a behavior can toggle `.is-open`, `.ssk-theme--ready`, and so on — but those classes must not be the selector that finds the element for the script.
4. **React islands are separate.** Mount React with `data-specstack-react-app` (and optional `data-react-settings`). The `js-` rule applies to classic theme/SDC/Drupal behavior JS, not to React’s data-attribute mount contract.

## Example

Twig / markup:

```html
<button type="button" class="ssk-accordion__trigger js-ssk-accordion-trigger">
  …
</button>
```

Behavior:

```js
once("ssk-accordion", ".js-ssk-accordion-trigger", context).forEach(
  (trigger) => {
    trigger.addEventListener("click", () => {
      trigger.classList.toggle("ssk-accordion__trigger--open");
    });
  },
);
```

Kit reference: `src/js/global.ts` attaches to `.js-ssk-theme` on `<body>` and may add `.ssk-theme--ready` afterward. Author behaviors as TypeScript (see `docs/theme-build.md`).

See also: `agents/rules/js-classes.md`, `docs/naming.md`.
