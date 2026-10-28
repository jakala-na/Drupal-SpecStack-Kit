---
name: document-base
description: >-
  SpecStack document-base typography: :root tokens and element selectors for
  WYSIWYG/paper-like HTML; custom widgets reset locally.
---

# Document base typography

1. Keep brand tokens on `:root` as `--ssk-*` in `src/css/global.css` (see `docs/naming.md`).
2. Style bare document elements (`h1`–`h6`, `p`, lists, `a`, `button`, `table`, `blockquote`, `q`) under `.dialog-off-canvas-main-canvas` with full margin boxes so content HTML looks finished without utility classes — never target those elements globally (toolbar/Gin are outside the canvas).
3. When building a menu, card, or React island, reset/override under that component’s class — do not gut the canvas document-base styles for the whole site.
4. Prefer token changes over rewriting element rules when adapting a client brand.
5. Human doc: `docs/document-base.md`.
