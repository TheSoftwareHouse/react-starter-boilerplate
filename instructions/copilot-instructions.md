# Copilot Instructions – Full Working Code Generation from Screenshot

## 1. General Purpose

These instructions define the exact process and standards for GitHub Copilot to generate **fully working, production-ready code** from a provided screenshot (e.g. exported from Figma or any other design source).
The generated code **must** be ready to run immediately without manual fixes, including:

- Complete page or component implementation
- Correct routing integration into the existing application
- Functional UI connected to the design system
- Unit tests in the main `tests` directory under the correct subfolder
- End-to-end tests (E2E) if an `e2e` folder exists in the repository
- Automatic linting and fixing of any code quality issues before final delivery

The output must meet **modern software engineering principles**:
**DRY**, **SOLID**, **KISS**, **branchless programming** where possible, **early exit** logic, and **maximum nesting depth of 2 levels**.
No `if–else` chains are allowed — each branch must be extracted into a separate function.

---

## 2. Image Analysis and Layout Reconstruction

When generating code from a screenshot:

1. **Analyse the layout** — Identify all containers, sections, and components from the screenshot.
2. **Recognise visual hierarchy** — Determine headings, subheadings, content areas, sidebars, and menus.
3. **Identify reusable UI patterns** — If a button, card, or form input is repeated, implement it as a reusable component.
4. **Preserve visual fidelity** — The generated UI must **look identical** to the screenshot within the constraints of the design system.
5. **Responsiveness** — Ensure the layout works on mobile, tablet, and desktop viewports using responsive design principles.

---

## 3. Code Generation Rules

When writing code:

- **Language & Framework**: Use **React** with **TypeScript** in strict mode.
- **Components**: Only functional components — no class components.
- **Design System**:
  - Import components exclusively from `@/shared/ui` and layout primitives from `@/shared/layout`.
  - Do not use any external UI libraries unless explicitly allowed.
- **Structure**:
  - Pages → `src/pages`
  - Page sections & feature components → `src/features/<page>/components`
  - Barrel exports in each `components` directory
- **Routing**:
  - If the project has a menu or navigation system, automatically integrate the new page into it.
  - Update the routing configuration so the page is accessible immediately.
- **Naming**:
  - Use PascalCase for component names.
  - Use kebab-case for route paths.

---

## 3a. Routing Implementation Standards (Mandatory)

When generating any new page or feature, **routing must be implemented immediately** as part of the task.
Failure to add routing is considered incomplete work. Follow these rules:

1. **Locate the routing configuration**:
   - If the project uses a central router file (e.g. `src/app/routes.tsx`, `src/app/router.ts`, `src/router/index.tsx`), locate it and add the new route entry there.
   - If routing is feature-based, update the corresponding feature route configuration file.

2. **Route Path Naming**:
   - Use **kebab-case** for all route URLs (`/user-profile`, `/order-history`).
   - Path must reflect the page name or its purpose — no generic names like `/new-page`.

3. **Component Registration**:
   - Import the newly created page component into the router.
   - Ensure the import follows the project’s preferred method (e.g. **lazy loading** via `React.lazy` if already used elsewhere).
   - The route must render the exact page component without breaking other routes.

4. **Integration with Navigation Menu**:
   - If the project has a global navigation menu:
     - Add a new menu item linking to the new route.
     - Ensure the active state highlights correctly when on the new page.
     - Place the menu item in a logical position based on existing ordering.

5. **Authentication/Authorisation Rules**:
   - If the router uses protected routes, wrap the new route in the correct access control (e.g. `<PrivateRoute>`).
   - Do not expose protected pages as public.

6. **Testing Routing**:
   - Add a unit test that renders the router and verifies navigation to the new page works.
   - If E2E tests are in the project, create an E2E scenario that:
     - Navigates to the page via the menu link.
     - Confirms the correct component content is displayed.

7. **Error Handling**:
   - Ensure the route does not break 404 handling.
   - If dynamic routes are used (e.g. `/user/:id`), handle invalid params gracefully.

8. **Final Check Before Delivery**:
   - [ ] New route is accessible by direct URL in the browser.
   - [ ] New route is reachable via the menu (if applicable).
   - [ ] All related tests pass.
   - [ ] No unused imports remain after routing changes.

---

## 4. Styling Guidelines

- All styling must come from **design system tokens**.
- **Prohibited**:
  - Inline styles
  - Hard-coded pixel values or colours
- **Spacing**:
  - Use spacing tokens: e.g. `gap-4`, `p-6`
- **Typography**:
  - Use semantic tokens for headings (`text.h1`, `text.h2`, etc.)
- **Colours**:
  - Use semantic tokens like `colour.primary.600`
- **Layout**:
  - Use Flexbox or CSS Grid exclusively
  - No unnecessary absolute positioning

---

## 5. Integration Requirements

When generating a page or component:

- **Menu integration**:
  - If a global menu exists, automatically add a link to the new page.
  - Ensure active state highlighting works correctly.
- **Routing**:
  - Update the router to include the new route.
  - Ensure lazy loading if used in the project.
- **Assets**:
  - Save any required images in the appropriate `public` or assets directory.
- **Imports**:
  - No unused imports.
  - Absolute imports preferred over relative if configured.

---

## 6. Testing Requirements

- **Unit tests**:
  - Create tests in `tests/<feature>` folder.
  - Use Vitest or the project’s configured test runner.
  - Minimum coverage: rendering, props handling, event handling.
- **E2E tests**:
  - If an `e2e` folder exists, create a matching test that visits the new page and verifies critical UI elements.
- **Storybook**:
  - Create a `.stories.tsx` file for each component using CSF3 format.

---

## 7. Optimisation and Linting

Before finalising:

1. Run the project’s lint command (`pnpm lint` or equivalent).
2. Fix **all** linting errors.
3. Optimise code for performance — no unnecessary re-renders.
4. Ensure all TypeScript types are explicit — no `any` unless strictly necessary.
5. Apply branchless patterns where possible.

---

## 8. Error Handling and Resilience

- Validate all props and inputs.
- Use `try/catch` for API calls.
- Show meaningful error messages to users if something fails.
- Avoid silent failures.

---

## 9. Final Delivery Checklist

Before considering the task complete, ensure:

- [ ] The generated page/component exactly matches the screenshot visually.
- [ ] All components use the design system and tokens.
- [ ] Routing is updated and working.
- [ ] Menu integration works (if applicable).
- [ ] All assets are placed correctly.
- [ ] Unit tests are created and pass.
- [ ] E2E tests are created and pass (if applicable).
- [ ] Linting passes with zero errors.
- [ ] Code follows DRY, SOLID, KISS principles.
- [ ] No `if–else` — only early returns or extracted functions.
- [ ] Nesting depth ≤ 2.
- [ ] No unused variables, imports, or dead code.

---

## 10. Example Workflow

1. Receive screenshot of `Dashboard` page.
2. Analyse layout — header, stats grid, activity feed, sidebar.
3. Create `src/pages/dashboard.tsx` with full UI.
4. Extract repeating patterns into `src/features/dashboard/components`.
5. Integrate into menu and router.
6. Add tests in `tests/dashboard`.
7. Add E2E test in `e2e/dashboard` (if folder exists).
8. Run lint and fix issues.
9. Verify visual match.
10. Commit and push.

---

**Important**: The output must be **ready to run without manual intervention**.

## Accessibility
- Always use semantic HTML elements and landmarks (`main`, `nav`, `footer`, headings in proper order).
- Provide descriptive `alt` text for images.
- Ensure sufficient colour contrast based on Design System tokens.
- All interactive elements must have visible focus states.
- In tests prefer selectors based on `role` or accessible `name` attributes.

## Performance
- Keep component structure shallow and avoid unnecessary re-renders.
- Apply lazy loading for heavy routes or components where appropriate.
- Remove unused imports, assets and dead code.
- CI must include linting and type checking; both must pass without errors.

## Import conventions
- Prefer absolute imports (`@/…`) over relative paths.
- Group imports in the following order:
  1. External libraries
  2. Shared libraries / utilities
  3. Features / domain-specific code
  4. Local files
- Remove unused imports immediately.

## Commit conventions
- Follow Conventional Commits for clarity and consistency:
  - `feat(page): add dashboard route + components + tests`
  - `fix(ui): extract card into reusable component`
  - `refactor(auth): simplify token validation`
  - `test(e2e): add dashboard happy path`
  - `chore(deps): update eslint to v9`
