# Icons

| Location | Purpose |
| --- | --- |
| `assets/icons/*.svg` | Compiled into the symbol sprite |
| `assets/featured-icons/` | Public URL / CSS background artwork (not sprited) |

Include once from `templates/html.html.twig`. Render with `@specstack_theme/icons/icon.html.twig`. Symbol ids are `#ssk-icon-{name}`.

Put stroke/fill on shapes inside the SVG so symbols paint after the root wrapper is stripped.
