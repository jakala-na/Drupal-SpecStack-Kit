# Frontend-first rules

- One design → one frontend implementation. Never fork Twig/CSS/JS/React per content type or entity when the display is the same; adapt Drupal rendering or API payloads into the shared component.
- Name components for the UI (`card`, `listing`), not the backend (`node--article`).
- Prefer React islands when the feature is interactive or client-fetched; prefer Twig/SDC when the page is server-rendered or Form API–heavy.
- One implementation per design: do not ship parallel React and Twig versions of the same UI.
