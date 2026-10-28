/**
 * Theme behaviors attach only via `.js-*` classes (never via presentation classes).
 *
 * @see docs/js-classes.md
 */

((drupal: typeof Drupal, onceFn: typeof once) => {
  drupal.behaviors.specstackThemeGlobal = {
    attach(context) {
      onceFn("specstack-theme-global", ".js-ssk-theme", context).forEach((element) => {
        // Presentation / state classes are fine after attachment — not for hooks.
        element.classList.add("ssk-theme--ready");
      });
    },
  };
})(Drupal, once);
