# Style Guide

This style guide presents preferred syntax, conventions, and application structure.

## General
- before adding new package check if it is still maintained and how many dependencies it will install on [bundlephobia](https://bundlephobia.com/) 
- [CSS rules order](https://9elements.com/css-rule-order/) 

## Naming

- Use `.tsx` extension for React components
- Use **camelCase** for directories names
- Use **PascalCase** for components filenames and **camelCase** for other filenames

```
// bad
tooltip.jsx
tooltipContainer.tsx
tooltip-container.tsx
Tooltip.component.tsx

// good
Tooltip.tsx
TooltipContainer.tsx

// bad
AuthActions.ts
requestHost.interceptor.ts
use-locale.ts

// good
authActions.ts
requestHostInterceptor.ts
useLocale.ts
```

- Use dot to separate component connected filenames (e.g. styles, types)

```
// bad
TooltipStyles.ts
tooltipTypes.ts

// good
Tooltip.styles.ts
Tooltip.types.ts
```

- Don't use `index.tsx` for root components of directory

```typescript
// bad
import { Footer } from './footer';

// bad
import { Footer } from './footer/index';

// good
import { Footer } from './footer/Footer';
```

- Use `.test` suffix for filenames which contains tests

```
// bad
Tooltip.spec.tsx
useLocale.spec.ts

// good
Tooltip.test.tsx
useLocale.test.ts
```

- use hooks to read from context, dont use `useContext(ContextName)`

```typescript
// bad
const localeContext = useContext(LocaleContext);

// good
const localeContext = useLocale();
```

= use singular in enum names

```typescript
// bad
enum Days {SUNDAY, MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY}


// good
enum Day {SUNDAY, MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY}
```

## Placement

- Common components, like a button should be placed inside the `ui` directory

```typescript
// good
import { CodeBlock } from './ui/codeBlock/CodeBlock';

// bad
import { CodeBlock } from './app/codeBlock/CodeBlock';
```

- Feature specific components, like a page should be placed inside the `app` directory

```typescript
// bad
import { About } from './ui/about/About';

// good
import { About } from './app/about/About';
```

## Export & Imports

- Don't use default export to export component
```typescript
// bad
const About = ()=>{}
export default About

// good
export const About = ()=>{}
```
- Styles import `* as Styled` to distinguish styled components from normal ones
```typescript
// bad
import { Header } from './About.styles.ts'

// good
import * as Styled from './About.styles.ts'
```

## Typings
- Dont use React.FC - write your own type if you need it
```typescript
// bad
export const About: React.FC<Props> = ()=>{}

// good
export const About: AboutProps = ()=>{}
```
- you should write types instead of interface

```typescript
// bad
export interface Props {}

// good
export type Props = {}
```
- dont write `Type` in type name

```typescript
// bad
export type PropsType = {}

// good
export type Props = {}
```

## Testing

- avoid snapshots - use simple asserts
- more important is use case coverage ([How to know what to test - Kent C. Dodds](https://kentcdodds.com/blog/how-to-know-what-to-test))
- mark DOM elements with property `data-testid`
- import react-testing-library from `test` directory