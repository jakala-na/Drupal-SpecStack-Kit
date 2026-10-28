---
name: multilingual
description: >-
  SpecStack-specific guidance when APIs and React islands must respect locale;
  assumes Drupal language/translation is already configured.
---

# Multilingual (SpecStack)

Assumes Drupal language / content translation / interface translation are already set up (use Drupal skills/docs for that).

1. Keep OpenAPI contracts language-agnostic for resource shapes. Document language via one mechanism only (`Accept-Language`, path prefix, or query) when the product requires it — stay consistent.
2. Theme Twig chrome: `|t` / `{% trans %}`. Editorial SDC props stay translated in Drupal, not hard-coded in Twig.
3. React islands: pass language from `drupalSettings` or `data-react-settings`; configure the generated fetch client base URL/headers per locale if the API is locale-scoped.
4. Rebuild and regenerate contracts after adding locale-specific endpoints; do not fork schema ownership per language.
5. Frontend-first still applies: one locale-aware component, not per-language markup copies.
