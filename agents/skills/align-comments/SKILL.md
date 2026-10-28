---
name: align-comments
description: >-
  Rewrite code comments and README prose so they describe the current system
  for a clear-minded developer, without history, rejected alternatives, or
  decision-log noise. Use when aligning comments, cleaning README wording,
  removing diff noise from docs, or before committing documentation.
---

# Align comments and README prose

Write comments and project docs for a developer reading the **current** code
with a clear mind. Document what exists and how to use it—not how we got here.

## Voice

- Present tense, current state only.
- Address a teammate scanning the file to work with it.
- Prefer short, concrete “what / where / how to extend” over narrative.

## Remove (diff noise / history)

Do **not** leave wording that:

- Names rejected options or debate outcomes (“Option A”, “we decided”, “instead of X”, “rather than cloning”, “avoids duplicating because…”)
- Contrasts with a past implementation (“no longer”, “formerly”, “old site used”, “previously”)
- Explains PHPStan/PHPCS/lint workarounds as a story (keep a one-line *why this code shape* only if it prevents a real footgun)
- Mentions chat, tickets, or temporary scaffolding unless it is still an active ops step (e.g. `drush updb` for an install hook)

## Keep (useful current-state notes)

Do keep:

- How to consume an API or attach a library
- Invariants the next editor must respect
- File/id conventions and attribute contracts
- Design-token or layout facts tied to the live UI (sizes, breakpoints)
- Brief notes that prevent breakage

## README shape

- Describe the public surface: libraries, attributes, chrome/mode values, consumers.
- Say what to do (`attach_library('specstack_theme/react_app')`, call the documented API).
- Phrase common mistakes as rules: “Import via the theme library, not a Vite import into each SDC bundle.”

## Checklist before finishing

1. Scan `README.md`, Twig `@file` headers, CSS/JS file headers, and PHP docblocks in the change set.
2. Rewrite any sentence that only makes sense if you know the conversation history.
3. Re-read once as a new hire: every remaining comment should still help.
