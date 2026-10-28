---
name: frontend-first
description: >-
  SpecStack frontend-first feature design: one shared display for identical UIs
  across backends; choose React islands vs Twig/SDC by interaction need.
---

# Frontend-first features

1. Design the UI contract first (component props/slots/states). Name it for the **display**, not the entity or content type.
2. If two backends need the same look and interaction, implement **one** SDC, Twig partial, or React island. Adapt Drupal (preprocess, view modes, REST DTOs, `data-react-settings`) to feed that contract — do not duplicate CSS/JS/markup per source.
3. Choose delivery by need:
   - Listings, CRUD widgets, client refresh → React island + OpenAPI/SDK and/or data attributes; backend owns fetching/hydration.
   - Form-heavy or mostly static pages (checkout panes, node detail) → Twig / Twig SDC; React only when reactivity is real, not as a Twig substitute.
4. Keep domain rules, permissions, and persistence in Drupal.
5. Human doc: `docs/frontend-first.md`.
