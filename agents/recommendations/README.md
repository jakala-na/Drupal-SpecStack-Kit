# Adoption recommendations

These skills are **optional** and SpecStack-specific. Use them when the project shape diverges from the default monorepo kit. Open only the skill that matches.

They assume general Drupal knowledge (or installed Drupal agent skills). They do not restate core Drupal setup.

| Skill | When to open |
| --- | --- |
| [theme-centric-consolidation](theme-centric-consolidation/SKILL.md) | Single site/theme; prefer React + generated client inside the theme |
| [multilingual](multilingual/SKILL.md) | Locale-aware SpecStack APIs and islands |
| [multisite](multisite/SKILL.md) | Multiple sites sharing SpecStack packages/themes |
| [headless-or-decoupled](headless-or-decoupled/SKILL.md) | Primary UI outside Drupal libraries |
| [graphql-alongside-rest](graphql-alongside-rest/SKILL.md) | GraphQL consumers exist but REST+OpenAPI remains the contract source |

Default day-to-day work stays in `agents/skills/`. Frontend-first still applies under every recommendation (`docs/frontend-first.md`).
