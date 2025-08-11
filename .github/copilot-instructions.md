# React Starter — Copilot Instructions (Authoritative Project Rules)

> **Goal:** Copilot must always produce a **complete, runnable** implementation (pages, routing, components, exports, tests) that **passes typecheck, lint and tests** without manual fixes. No internal generators, no CLI helpers — **generate everything in code**.

---

## 1) Framework & Language

* **React + TypeScript** in **strict** mode. No JS files.
* **Functional components only**.
* UI imports **only** from `@/shared/ui`; layout primitives from `@/shared/layout`.
* Do **not** add external UI libraries.
* Comments/strings in **British English**.

---

## 2) Architecture, Quality & Style

* Principles: **DRY, SOLID, KISS**, early‑exit, prefer **branchless** patterns when reasonable.
* **No `else` blocks** in business/UI logic. Split branches into **separate small functions**. Max nesting: **2 levels**.
* Keep components **presentational**; lift state when needed. Memoise where useful (`React.memo`, `useMemo`, `useCallback`).
* Explicit types everywhere; no `any`.

---

## 3) Project Structure & Naming

* **Pages:** `src/pages/<PageName>.tsx` (one entry per page).
* **Features/sections:** `src/features/<page>/components/<ComponentName>/`.
* **Inside a component folder:**

  * `ComponentName.tsx`
  * `index.ts` (barrel)
* **Tests:**

  * **Unit:** `tests/unit/<page>/<ComponentName>.test.tsx` (Vitest)
  * **E2E (only if repo has `e2e/`):** `e2e/<page>/<feature>.spec.ts` (match repo runner: Playwright/Cypress)
* Prefer **named exports**; re‑export via barrel files.
* Use TS path aliases (e.g. `@/shared/ui`). Avoid deep relative paths (`../../..`).

---

## 4) Routing (must include)

* Use **React Router v6+** (or the router already used in repo; detect imports). Create/update:

  * `src/app/router.tsx` with route objects and lazy‑loaded pages.
  * `src/app/App.tsx` hosting `<RouterProvider>` / `<BrowserRouter>`.
  * Update `src/main.tsx` (or equivalent) to render `<App />`.
* Include **404** route and basic **error boundary**.

---

## 5) Layout, Spacing & Styling

* Layout via **CSS Grid / Flexbox** only. Avoid absolute positioning unless essential.
* Spacing via **design tokens** only (e.g. `gap-1 .. gap-8`, `p-1 .. p-8`).
* Typography & colours via **semantic tokens** (e.g. `text.h1`, `colour.primary.600`).
* **Forbidden:** inline styles, hard‑coded pixels/colours, ad‑hoc CSS.

---

## 6) Accessibility (non‑negotiable)

* All controls must be **keyboard focusable** with visible focus.
* Accurate `aria-*` attributes; labels associated with inputs; meaningful `alt` text.
* Semantic HTML (`<h1…h6>`, `<p>`, lists) and landmarks where appropriate.

---

## 7) Image → Code Workflow (no generators)

* When given a **Figma screenshot**, infer layout and map elements to the design system:

  * **Cards / elevation** → `<Card elevation="sm|md|lg" />`.
  * **Buttons** → `<Button variant="primary|secondary|ghost" size="sm|md|lg" />`.
  * **Inputs** → `<TextField/>`, `<Select/>`, `<Checkbox/>`, `<Switch/>`.
  * **Tables** → `<DataTable columns={…} data={…} />` (columns from visible headers).
  * **Avatars / Icons** → `<Avatar/>`, `<Icon name="…"/>`.
* If no exact mapping exists, pick the **closest semantic** component from `@/shared/ui`. Do **not** invent bespoke styles.

---

## 8) Testing (Unit & E2E) and Storybook

* **Unit tests** (Vitest) for each new component/page in `tests/unit/...`:

  * Render snapshot + one behaviour/assertion (e.g. CTA click, conditional render).
* **E2E tests** **only if `e2e/` exists**; add a smoke test for the new route and critical interactions.
* **Storybook (CSF3)** stories for significant variants/states **when Storybook is present**.
* Tests/stories import from the **public API** (barrels), not deep paths.

---

## 9) Performance & States

* Provide **empty**, **loading** and **error** states if data is involved.
* Avoid prop drilling; compose components. Defer expensive work; memoise thoughtfully.

---

## 10) Copilot Output Contract (critical)

Copilot must output:

1. **File tree** to be created/updated, including routing files.
2. **Complete code blocks** for every new/changed file — no placeholders or TODOs.
3. **Barrel export** updates (exact lines to add).
4. **Tests** in `tests/unit/...` and **e2e** in `e2e/...` if folder exists.
5. **Validation & auto‑fix commands** (and confirm they pass locally):

   ```bash
   pnpm typecheck && pnpm lint --fix && pnpm test
   # If Storybook exists in this repo:
   pnpm build:storybook
   ```
6. State explicitly that all checks **passed** with zero TypeScript/ESLint errors and green tests.

---

## 11) Pull Requests & CI Gates

* Conventional commit titles (e.g. `feat(dashboard): add StatsGrid route + components`).
* PR description must include:

  * Source (screenshot/Figma frame id/name).
  * Any deviations from design + rationale.
  * Confirmation that unit/e2e tests were added (if applicable) and all CI commands passed.

---

## 12) Quick Checklist (paste into PR)

* [ ] React + TS (strict), functional only; British English
* [ ] Routing added/updated with lazy pages, 404, error boundary
* [ ] Components use `@/shared/ui` & tokens only; no inline styles
* [ ] Max nesting ≤ 2; no `else` blocks; early exits; branchless where reasonable
* [ ] Unit tests in `tests/unit/...` (and e2e if `e2e/` exists)
* [ ] Barrels updated; no deep relative imports
* [ ] `pnpm typecheck && pnpm lint --fix && pnpm test` all green (and Storybook build if present)
