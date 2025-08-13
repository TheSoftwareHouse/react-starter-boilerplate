# ChatGPT — Recipes for Our Frontend
> Follow ALL rules in `instructions/_base-rules.md`.

## Generate a page from a screenshot
Analyse the screenshot and produce `src/pages/<kebab>.tsx`:
- use `@/shared/ui` and `@/shared/layout` only,
- extract repeats to `src/features/<page>/components`,
- add router entry + menu link (same PR),
- add unit tests (Vitest+RTL) and e2e (Playwright if repo has `e2e/`),
- DS tokens only; no inline styles; no external UI libs,
- ≤2 nesting levels, early returns, no if–else chains.

## Refactor / Tests / A11y / Perf
(identical to VS Code recipes, but shorter prompts)
