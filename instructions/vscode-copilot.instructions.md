# VS Code + Copilot — Recipes for Our Frontend

> Goal: generate **working** code that runs without manual fixes, fully aligned with our Design System and the rules
> defined in `copilot-instructions.md`.

---

## Core principles

- **Framework**: React + TypeScript (strict). Functional components only.
- **Design System**:
  - Use only components from `@/shared/ui`.
  - Use layout primitives from `@/shared/layout`.
  - **Never** import external UI libraries.
- **Styling**:
  - No inline styles.
  - No hard-coded colours or pixels — use DS tokens only.
- **Code quality**:
  - DRY, SOLID, KISS.
  - Maximum **two levels of nesting**.
  - No if–else chains — always extract logic into helper functions.
  - Use early returns.
- **Structure**:
  - Pages → `src/pages`.
  - Page sections/components → `src/features/<page>/components`.
  - Barrel exports per component directory.
- **Routing**:
  - Always add routing for new pages.
  - Add a link in the global menu (if present).
  - Routing and menu update must be in the **same PR**.
- **Testing**:
  - Unit tests: Vitest + RTL, in `tests/<page>/...`.
  - End-to-end: Playwright, in `e2e/<page>/...` if applicable.
- **Accessibility**:
  - Semantic HTML only.
  - Forms must have labels.
  - All images must have `alt` or empty `alt=""`.
  - Buttons/icons need `aria-label`.
  - Links must be descriptive.
- **Performance**:
  - Lazy load heavy routes.
  - Optimise assets.
  - Debounce/throttle expensive handlers.
  - Use memoisation sensibly.

---

## Prompt — generate a page from a screenshot

✅ Good prompt:

```
Analyse this screenshot and generate `src/pages/dashboard.tsx`:

* use only components from `@/shared/ui` and `@/shared/layout`,
* extract repeating blocks into `src/features/dashboard/components`,
* integrate into router and add a menu link,
* add unit tests in `tests/dashboard` and e2e tests in `e2e/dashboard`,
* preserve design fidelity using DS tokens,
* avoid if–else chains; prefer early returns and small functions.
```

❌ Bad prompt:

```
Create a page from screenshot
```

(too vague → Copilot may generate inline styles or external libraries).

---

## Prompt — refactor redundant logic

✅ Good:

```
Refactor this component:

* limit nesting to 2 levels,
* extract if–else chains into small helper functions,
* replace any with proper TypeScript types,
* remove unused imports,
* add memoisation only where meaningful.
```

❌ Bad:

```
Clean up this file
```

(too broad → unpredictable refactor).

---

## Prompt — write unit tests

✅ Good:

```
Write unit tests for this component using Vitest + RTL:

* verify render, props, and user interactions,
* prefer role/name selectors for a11y,
* add a routing test: navigating to /dashboard renders <DashboardPage>.
```

❌ Bad:

```
Add snapshot tests
```

(snapshot-only tests do not verify behaviour).

---

## Prompt — write e2e tests

✅ Good:

```
Write a Playwright test:

* navigate to the page via menu,
* assert that the page heading is visible,
* complete one happy-path form submission.
```

❌ Bad:

```
Check if the page loads
```

(too weak, doesn’t verify interaction).

---

## Prompt — ensure accessibility

✅ Good:

```
Review this component for accessibility:

* add alt text to images,
* ensure buttons with icons have aria-label,
* verify keyboard focus order,
* check that form fields are labelled.
```

---

## Prompt — optimise performance

✅ Good:

```
Optimise this list rendering:

* memoise expensive components,
* use stable keys in map,
* debounce scroll handler with 200ms delay,
* lazy load heavy child components.
```

---

## Additional recipes

- **Generate a reusable component**

```
Generate a <Card> component:

* use tokens from DS for spacing/typography,
* accept props for title, description, actions,
* add Storybook stories and unit tests.
```

- **Fix imports**

```
Refactor imports:

* use absolute imports (@/…),
* group external → shared → features → local,
* remove unused imports.
```

- **Add commit message**

```
Suggest a Conventional Commit message for:

* adding a new profile page with routing,
* adding unit + e2e tests.
```

---

## Commit style (Conventional Commits)

- `feat(page): add dashboard route + components + tests`
- `fix(ui): extract card into reusable component`
- `test(e2e): add dashboard happy path`
- `refactor(auth): simplify token validation logic`

---

## Final checklist before using Copilot output

- [ ] No inline styles.
- [ ] No hard-coded colours or pixels.
- [ ] All UI from DS components.
- [ ] Proper routing + menu integration.
- [ ] Unit and e2e tests included.
- [ ] Accessible for screen readers (labels, roles, alt text).
- [ ] Performance optimised (lazy load, debounce, memo).
- [ ] Imports clean and absolute.
- [ ] Commit message follows Conventional Commits.
