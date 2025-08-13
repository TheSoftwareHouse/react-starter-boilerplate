# Base Rules for Frontend Code Generation

This document defines the **mandatory standards** for all code generated with AI assistants (Copilot, Cursor, Cody,
etc.) and for all manual contributions.
It is the **single source of truth**. Other instruction files (e.g. VS Code recipes, Cursor rules) **must reference this
file** instead of duplicating it.

---

## 1. Core principles

- **Framework**: React + TypeScript (strict mode).
- **Components**: Functional components only.
- **Design System**:
  - All UI must come from `@/shared/ui`.
  - All layout primitives must come from `@/shared/layout`.
  - **Do not use** external UI libraries.
- **Styling**:
  - No inline styles.
  - No hard-coded colours or pixels — always use DS tokens.
- **Architecture**:
  - Pages → `src/pages`
  - Page-level features/components → `src/features/<page>/components`
  - Barrel exports required per `components` directory
- **Code quality**:
  - DRY, SOLID, KISS.
  - Maximum **two levels of nesting**.
  - Use **early returns**.
  - No `if–else` chains — extract into helper functions.

---

## 2. Routing

- Every new page must:
  - Be added to the router.
  - Include a link in the global menu (if applicable).
- Routing and menu changes must be in the **same PR**.
- Use lazy loading for routes if already adopted in the project.
- Add a routing test: navigating to `/route` must render the correct page.

---

## 3. Testing

- **Unit tests**:
  - Use Vitest + React Testing Library.
  - Place tests in `tests/<feature>` folder.
  - Must verify rendering, props, and user interactions.
- **E2E tests**:
  - If `e2e/` folder exists, add Playwright scenarios for new pages.
  - Minimum: navigate via menu, assert heading, verify one happy-path flow.
- **Storybook**:
  - Every reusable component must have a `.stories.tsx` file in CSF3 format.

---

## 4. Accessibility (WCAG & screen reader support)

- Use semantic headings and landmarks (`main`, `nav`, `footer`, `section`).
- Every input must have a label (`<label>` or `aria-label`).
- All images must have `alt` text (or empty `alt=""` if decorative).
- Buttons with icons must have `aria-label`.
- Links must be descriptive (no “click here”).
- Provide skip links for complex layouts.
- Dialogues/modals must:
  - Trap focus,
  - Use `role="dialog"`, `aria-modal="true"`,
  - Have labelled headings.
- Tables must have `<th>` with `scope="col/row"` and summaries for complex data.
- Test with keyboard navigation and screen reader (NVDA/VoiceOver/JAWS).
- In automated tests: prefer `role`/`name` selectors over class or id.

---

## 5. Performance

- Keep component trees shallow.
- Split large components into smaller units.
- Use `React.memo`, `useMemo`, `useCallback` **only when profiling shows impact**.
- Lazy load heavy routes and rarely used features.
- Optimise assets (WebP/AVIF, responsive `srcset`, compressed SVGs).
- Debounce/throttle expensive event handlers (scroll, resize, input).
- Keep initial bundle size under performance budget (<250 KB target).
- Remove unused imports, dependencies, and assets regularly.
- CI must enforce linting, type checking, and may include bundle size checks.

---

## 6. Imports

- Prefer absolute imports (`@/...`) over relative.
- Group imports in order:
  1. External libraries
  2. Shared libraries/utilities
  3. Features/domain code
  4. Local files
- Remove unused imports immediately.

---

## 7. Commits

- Follow **Conventional Commits**. Examples:
  - `feat(dashboard): add statistics grid and unit tests`
  - `fix(ui): correct focus state on buttons`
  - `refactor(auth): simplify token validation`
  - `test(e2e): add dashboard happy path`
  - `chore(deps): update eslint to v9`

---

## 8. Final PR checklist

- [ ] Routing + menu integrated.
- [ ] Unit + e2e tests written and passing.
- [ ] No inline styles; only DS tokens.
- [ ] Accessibility validated (labels, alt, focus, screen readers).
- [ ] Performance validated (lazy load, debounce, memo where needed).
- [ ] Imports absolute, unused removed.
- [ ] Commit message follows Conventional Commits.
- [ ] Code runs without manual fixes.
