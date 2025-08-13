# JetBrains + Copilot — Recipes for Our Frontend

> Read and follow our baseline rules in `instructions/_base-rules.md` (Design System, structure, tests, a11y/perf).
> This file provides **prompt recipes** optimised for JetBrains Copilot (inline + chat).

## Core reminders
- React + TypeScript (strict), functional components only.
- UI/layout only from `@/shared/ui` and `@/shared/layout`. No external UI libs.
- No inline styles, no hard-coded colours/pixels — DS tokens only.
- Add routing + menu in the **same PR**. Provide unit (Vitest+RTL) and e2e (Playwright) tests.
- Max 2 levels nesting, early returns, no if–else chains.

## Recipe — generate a page from a screenshot
“Analyse this screenshot and generate `src/pages/<kebab>.tsx`:
- use components from `@/shared/ui` and layout from `@/shared/layout`,
- extract repeating blocks to `src/features/<page>/components`,
- integrate router + menu,
- add unit tests in `tests/<page>/...` and e2e in `e2e/<page>/...`,
- keep 1:1 fidelity via DS tokens,
- avoid if–else chains; prefer early returns and small helpers.”

## Recipe — refactor logic
“Refactor to:
- ≤2 nesting levels,
- extract branches to helpers,
- remove unused imports/dead code,
- replace `any` with proper types,
- memoise only where it measurably helps.”

## Recipe — unit tests
“Write Vitest+RTL tests:
- verify render, props, interactions,
- prefer role/name selectors (a11y),
- add basic routing test for `/<kebab>` → `<Page>`.”

## Recipe — e2e (Playwright)
“Create a test:
- open via menu link,
- assert heading visible,
- complete one happy-path flow.”

## Recipe — a11y/perf pass
“Review for a11y/perf:
- labels for inputs, alt text for images, aria-label for icon buttons, skip link,
- lazy-load heavy sections, debounce scroll/resize, stable keys, remove unused assets.”

## Commit style
- `feat(page): add dashboard route + components + tests`
- `fix(ui): correct focus state on buttons`
- `test(e2e): add dashboard happy path`
