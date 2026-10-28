---
name: headless-or-decoupled
description: >-
  When the primary UI is outside Drupal theme libraries, keep OpenAPI as the
  shared boundary and adapt SpecStack packages accordingly.
---

# Headless or decoupled

1. Keep module-owned OpenAPI YAML + Drush export as the contract source of truth.
2. Generate the client into a package consumed by the external app (can remain `@specstack/drupal-sdk` or a renamed package). Theme React build becomes optional.
3. Auth/CSRF: document cookie vs token flows for the external origin; do not assume Drupal attaches `react_app`.
4. SDC/Twig remain for any Drupal-rendered pages. Frontend-first still applies: one design system / component set shared with the external app when possible (`docs/frontend-first.md`).
5. CORS and base URL belong in environment config, not hard-coded in generated clients.
