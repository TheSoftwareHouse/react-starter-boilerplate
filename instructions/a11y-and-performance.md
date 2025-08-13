# Accessibility and Performance Standards

These are **mandatory standards** for all frontend code.
They combine WCAG accessibility requirements, screen reader support for blind users, and performance best practices.

---

## Accessibility (WCAG & screen reader support)

- **Semantic structure**
  - Use semantic headings in logical order (`h1` → `h6`).
  - Apply landmarks (`main`, `nav`, `header`, `footer`, `aside`, `section`, `article`) to help screen readers navigate.
- **Forms and inputs**
  - Every form input must have a clear, programmatically associated label (`<label>` or `aria-label`).
  - Group related inputs with `<fieldset>` and `<legend>`.
  - Error messages must be linked with `aria-describedby` so they are announced by screen readers.
- **Images and media**
  - All images must have meaningful `alt` text.
    - If decorative → use empty `alt=""` (never leave it out).
    - If complex (charts, diagrams) → provide longer description via `aria-describedby` or linked text.
  - Videos must include captions or transcripts.
- **Colour and contrast**
  - Ensure sufficient colour contrast (minimum WCAG AA).
  - Never use colour alone to convey meaning.
    - Example: errors must include icon or text, not just red highlight.
- **Keyboard support**
  - All functionality must be available using only the keyboard.
    - Focus order must follow logical reading order.
    - Provide visible focus indicators, aligned with the DS.
    - Add a “skip to content” link at the top of the page.
- **ARIA usage**
  - Use ARIA attributes only if semantic HTML is insufficient.
  - Ensure ARIA roles match actual behaviour (no fake buttons/links).
  - Announce dynamic updates (e.g. new notifications) with `aria-live` regions.
- **Screen readers (blind users)**
  - Provide **descriptive link and button text** (avoid “click here”, “read more”).
  - For icons, always provide an accessible label (`aria-label`).
  - Ensure modals and dialogues trap focus and are announced with correct role (`role="dialog"`, `aria-modal="true"`).
  - Hide decorative icons from screen readers with `aria-hidden="true"`.
  - Ensure tables have `<th>` headers, `scope="col/row"`, and summaries for complex data.
  - Test navigation with screen reader software (NVDA, JAWS, VoiceOver).
- **Testing accessibility**
  - Use `role` and `name` selectors in tests for accessibility consistency.
  - Run automated accessibility checks (axe, pa11y, or similar) where configured.
  - Manual keyboard and screen reader test required for major features.

---

## Performance (budget & optimisation)

- **Rendering**
  - Keep component trees shallow; avoid deeply nested renders.
  - Split large components into smaller, reusable parts.
  - Use `React.memo`, `useMemo`, and `useCallback` only when profiling proves benefit.
  - Ensure stable keys in lists to avoid re-renders.
- **Code splitting**
  - Lazy load heavy routes and rarely used sections.
  - Apply dynamic imports for large third-party dependencies.
- **Assets**
  - Optimise images (prefer WebP/AVIF if supported).
  - Provide multiple resolutions for responsive images (`srcset`, `sizes`).
  - Compress and optimise SVGs before committing.
  - Do not embed large base64 images inline.
- **Event handling**
  - Debounce or throttle expensive handlers (scroll, resize, input).
  - Avoid heavy computations in render paths — offload to Web Workers if needed.
- **Bundle size**
  - Keep initial bundle size within the project’s performance budget (target < 250KB initial).
  - Regularly analyse bundle size (`webpack-bundle-analyser`, `vite-bundle-visualiser`).
  - Remove unused dependencies with tools like `depcheck`.
- **Network performance**
  - Use proper caching headers for static assets.
  - Deduplicate API calls and apply caching where applicable.
  - Avoid blocking synchronous requests.
- **Build & CI**
  - CI must run linting and type checking successfully.
  - CI must run tests (unit + e2e).
  - Optional: fail builds if performance budgets are exceeded.
- **Runtime**
  - Use async/await instead of blocking loops.
  - Avoid unnecessary polyfills or duplicate libraries.

---

✅ **Final checklist before PR merge**
- [ ] Semantic page structure (landmarks, headings, roles).
- [ ] All images and icons are accessible (alt text or aria).
- [ ] All interactive elements are keyboard accessible.
- [ ] Screen reader users can navigate forms, tables, modals, and dynamic content.
- [ ] Colour contrast and focus states validated.
- [ ] No unnecessary re-renders or performance bottlenecks.
- [ ] Routes and heavy assets lazy loaded if possible.
- [ ] Images and media optimised.
- [ ] CI passes lint, type check, tests, and performance budgets.
