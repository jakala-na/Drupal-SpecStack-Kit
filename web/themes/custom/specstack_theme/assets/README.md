# Theme static assets

| Folder | Role |
| --- | --- |
| `icons/` | Sprite icons. Every `*.svg` here (except `sprite.svg`) is compiled into the theme symbol sprite. |
| `featured-icons/` | Standalone artwork that needs a public URL (CSS `background-image`, `<img src>`). Not included in the sprite. |

Place fill/stroke on shapes inside sprite icons (not only on the root `<svg>`) so symbols paint after the wrapper is stripped.

Rebuild: theme `pnpm build`, or the icons pipeline via the theme build orchestrator.
