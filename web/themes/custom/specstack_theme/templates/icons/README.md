# Theme icons (sprite)

Only files in `assets/icons/` are compiled into the symbol sprite. Standalone /
featured artwork lives in `assets/featured-icons/` and is not sprite-built.

## Usage

```twig
{% include '@specstack_theme/icons/icon.html.twig' with { name: 'search' } only %}
```

- Sprite mount: `templates/html.html.twig` includes `sprite.html.twig` once
- Symbol ids: `#ssk-icon-{name}`
- Rebuild: theme build
