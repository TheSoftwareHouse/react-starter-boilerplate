# Code Quality Examples

This document shows **bad vs good practices** for frontend code.
All contributors must follow the **good examples**.

---

## 1) Component structure and readability

❌ Bad:
```tsx
function Dashboard() {
  return (
    <div>
      {data
        ? <div>
            {data.items.length > 0
              ? <ul>
                  {data.items.map(item =>
                    <li onClick={() => handleClick(item.id)}>
                      {item.title}
                    </li>
                  )}
                </ul>
              : <span>No items</span>}
          </div>
        : <span>Loading...</span>}
    </div>
  )
}
````

✅ Good:

```tsx
function Dashboard() {
  if (!data) return <LoadingSpinner />;
  if (data.items.length === 0) return <EmptyState />;

  return <ItemList items={data.items} onClick={handleClick} />;
}
```

---

## 2) Conditionals and branching

❌ Bad:

```tsx
if (status === "loading") {
  return <Spinner />;
} else {
  if (status === "error") {
    return <Error />;
  } else {
    if (status === "success") {
      return <DataView data={data} />;
    }
  }
}
```

✅ Good:

```tsx
switch (status) {
  case "loading":
    return <Spinner />;
  case "error":
    return <Error />;
  case "success":
    return <DataView data={data} />;
  default:
    return null;
}
```

(or split into helper functions with early returns).

---

## 3) Design System and styling

❌ Bad:

```tsx
<button style={{ background: "#3498db", marginTop: "13px" }}>
  Submit
</button>
```

✅ Good:

```tsx
<Button variant="primary" className="mt-4">
  Submit
</Button>
```

* Always use tokens and components from the Design System.
* No inline styles, no magic pixel values.

---

## 4) Routing and menu integration

❌ Bad:

* Page file created without adding a route.
* Missing link in the global menu.
* Active state not handled.

✅ Good:

* Add route in router config with lazy loading if used elsewhere.
* Add menu item with correct active state.
* Provide a routing test to confirm navigation works.

---

## 5) Unit tests

❌ Bad:

```tsx
test("renders correctly", () => {
  const { container } = render(<Dashboard />);
  expect(container).toMatchSnapshot();
});
```

✅ Good:

```tsx
test("shows empty state if no items", () => {
  render(<Dashboard data={{ items: [] }} />);
  expect(screen.getByText(/no items/i)).toBeInTheDocument();
});

test("renders item list", () => {
  render(<Dashboard data={{ items: [{ id: 1, title: "Item 1" }] }} />);
  expect(screen.getByRole("listitem", { name: /item 1/i })).toBeVisible();
});
```

---

## 6) End-to-End tests

❌ Bad:

* Navigate directly to URL only, no menu interaction.
* No assertion on content.

✅ Good:

```ts
test("user can open dashboard from menu", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: /dashboard/i }).click();
  await expect(page.getByRole("heading", { name: /dashboard/i })).toBeVisible();
});
```

---

## 7) Accessibility (a11y)

❌ Bad:

```tsx
<img src="/logo.png" />
<button><Icon /></button>
<a href="#">Click here</a>
```

✅ Good:

```tsx
<img src="/logo.png" alt="Company logo" />
<button aria-label="Open settings"><SettingsIcon /></button>
<a href="/pricing">See pricing plans</a>
```

Rules:

* Always provide alt text or mark decorative images with `alt=""`.
* Buttons with icons must have `aria-label`.
* Links must be descriptive.

---

## 8) Screen reader support (blind users)

❌ Bad:

```tsx
<div onClick={submit}>Submit</div>
```

✅ Good:

```tsx
<button type="submit">Submit</button>
```

❌ Bad:

```tsx
<div role="dialog">
  <h2>Modal</h2>
  ...
</div>
```

✅ Good:

```tsx
<div role="dialog" aria-modal="true" aria-labelledby="modal-title">
  <h2 id="modal-title">Confirm action</h2>
  ...
</div>
```

Rules:

* Use proper elements (button, input, link) instead of generic `div/span`.
* Dialogs and modals must trap focus and be announced correctly.
* Tables must use `<th>` with `scope="col/row"` and summaries for complex data.

---

## 9) Performance and optimisation

❌ Bad:

```tsx
{items.map(item => <ExpensiveComponent item={item} />)}
```

(re-renders everything on each update)

✅ Good:

```tsx
{items.map(item => (
  <MemoisedItem key={item.id} item={item} />
))}
```

* Wrap heavy components in `React.memo`.
* Use stable keys in lists.

❌ Bad:

```ts
window.addEventListener("scroll", () => {
  doHeavyCalculation();
});
```

✅ Good:

```ts
window.addEventListener("scroll", debounce(doHeavyCalculation, 200));
```

Rules:

* Always debounce/throttle expensive event handlers.
* Use Web Workers for heavy computations.
* Apply lazy loading for large routes and assets.

---

## 10) Imports and structure

❌ Bad:

```ts
import Button from "../../../../../ui/Button";
import moment from "moment"; // unused
```

✅ Good:

```ts
import { Button } from "@/shared/ui";
```

* Use absolute imports if configured.
* Remove unused imports immediately.
* Group imports: external → shared → features → local.

---

## 11) Commit messages

❌ Bad:

```
Update stuff
fix bug
```

✅ Good:

```
feat(dashboard): add statistics grid and unit tests
fix(ui): correct button spacing in header
refactor(auth): simplify token validation logic
```

---

✅ **Final rule:** Every example in “Bad” is forbidden.
Always follow the “Good” patterns above.
