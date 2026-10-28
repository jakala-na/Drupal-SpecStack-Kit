# Frontend-first feature architecture

SpecStack Kit uses a **frontend-first** product mindset. The display layer is the shared surface; Drupal storage and APIs adapt to serve that surface.

## Core rule

If two backend sources share the same visual/interaction design, they share **one** frontend implementation (markup, CSS, JS, React island, or SDC). Do not fork templates or styles per content type, entity type, or REST resource when the UI is the same.

Example: `blog` and `article` nodes are different entity bundles with different fields/storage, but the teaser card looks identical. Implement **one** card component (SDC or React). Map each backend source into that component’s props or render array via preprocess, a view mode, a normalizer, REST payload shaping, or `data-react-settings`.

## Who decides: display vs data

| Situation | Prefer | Backend role |
| --- | --- | --- |
| Same UI, different storage or APIs | One frontend component | Adapt Drupal rendering / payloads to the component contract |
| Listing, filterable table, interactive CRUD, live refresh | React island (+ OpenAPI/SDK or data attributes) | Own data: REST/JSON:API, Views serialization, or hydrate via `data-react-settings` / `drupalSettings` |
| Checkout pane, node detail, mostly static chrome, heavy Form API / entity forms | Twig template or Twig SDC (React only if interactivity is real) | Own structure and server render; frontend supplies presentation |

Backend complexity can push a feature toward Twig/SDC even when a listing nearby is React. That is expected. The invariant is **no duplicate display stacks** for the same design.

## Practical patterns

1. **Define the UI contract first** — props, slots, states (empty, loading, error). Name it for the design (`card`, `listing-row`), not the entity (`node--blog`).
2. **Map backends into that contract** — preprocess, theme suggestions that include the same SDC, REST resource DTOs aligned to the OpenAPI schema the island already consumes.
3. **Choose the delivery vehicle by interaction need**, not by which module owns the data:
   - Interactive / client-fetched → React island + `specstack_theme/react_app` + `@specstack/drupal-sdk`
   - Server-rendered / form-heavy → Twig or SDC; attach theme CSS/JS libraries as needed
4. **One implementation per design** — do not ship parallel React and Twig versions of the same UI. If a migration is in progress, keep a single active path and a clear end state.

## What this is not

Frontend-first does **not** mean “put business rules in the browser” or “ignore Drupal APIs.” Domain validation, permissions, and persistence stay in Drupal. It means the **presentation system** is designed once and backends are adapters into it.

See also: `agents/skills/frontend-first`, `docs/architecture.md`, `docs/naming.md`.
