---
name: icons-sprite
description: >-
  SVG symbol sprite from assets/icons, featured-icons opt-out, Twig include
  helpers for SpecStack theme icons.
---

# Icons sprite

- Put monochrome UI glyphs in `web/themes/custom/specstack_theme/assets/icons/{name}.svg`.
- Put logo-like / CSS-url artwork in `assets/featured-icons/` (never sprited).
- Build writes `templates/icons/sprite.html.twig` and `dist/icons/sprite.svg`.
- `templates/html.html.twig` includes the sprite once.
- Render with `{% include '@specstack_theme/icons/icon.html.twig' with { name: 'search' } only %}`.
- Symbol ids: `#ssk-icon-{name}`. Put `stroke`/`fill` on shapes, not only the root `<svg>`.
