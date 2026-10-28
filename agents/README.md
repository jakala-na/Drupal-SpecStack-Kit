# SpecStack Kit agent guidance

This directory is **project-specific**. It teaches agents how SpecStack Kit expects features to be designed and shipped — contracts, theme pipelines, React islands, naming, and frontend-first architecture.

## What belongs here

- How this monorepo is laid out and which commands to run
- SpecStack OpenAPI → SDK → UI flow
- Theme Vite pipelines, document-base, icons, SDC/React conventions
- Naming (`ssk` / `specstack`) and frontend-first feature design
- Optional adoption paths under `recommendations/` when a project diverges from the default kit

## What does not belong here

Do **not** duplicate universal Drupal guidance (hooks, plugins, Form API, Entity API, Twig basics, coding standards, config sync, migrations, security). Prefer:

1. Installed Drupal agent skills (for example from [AI Best Practices for Drupal](https://www.drupal.org/project/ai_best_practices) / Drupal package `.ai/skills/`)
2. Drupal core and contrib documentation
3. The agent’s existing Drupal knowledge

If a skill here explains general Drupal mechanics more than SpecStack Kit conventions, trim it or replace it with a pointer to Drupal skills/docs.

## Layout

| Path | Role |
| --- | --- |
| `skills/` | Day-to-day SpecStack workflows |
| `rules/` | Short invariants agents must respect |
| `recommendations/` | Optional topology / product-shape forks |

Start from root [`AGENTS.md`](../AGENTS.md).
