# GitHub Copilot Instructions

You are working on a **React Starter Boilerplate** project - a modern, production-ready React application foundation built by The Software House.

## Project Overview

This is a carefully crafted React starter template featuring:
- **Vite** for fast development and building
- **TypeScript** for type safety
- **TanStack Router** for type-safe routing
- **TanStack Query** with custom abstraction layer
- **React Intl** for internationalization
- **Vitest** for unit testing
- **Playwright** for E2E testing
- **Plop** for code generation
- **MSW** for API mocking

## Key Architecture Principles

1. **Type Safety First**: All code should be fully typed with TypeScript
2. **Custom Abstractions**: Use project-specific abstractions (especially for API calls)
3. **Code Generation**: Prefer using Plop generators for creating new components/features
4. **Testing**: Write tests for all new functionality
5. **Documentation**: Keep docs updated when adding new patterns

## Specialized Instructions

For detailed guidance on specific areas, refer to these specialized instruction files:

- **[API Development](instructions/api.instructions.md)** - API patterns, React Query usage, data fetching
- **[Frontend Development](instructions/frontend.instructions.md)** - Component patterns, hooks, UI development
- **[State Management](instructions/state.instructions.md)** - Context patterns, global state management
- **[E2E Testing](instructions/e2e.instructions.md)** - End-to-end testing patterns and best practices

## Quick Reference

### Project Structure
```
src/
├── api/          # API layer with custom abstractions
├── routes/       # TanStack Router pages and components
├── hooks/        # Custom hooks (flat structure)
├── ui/           # Reusable UI components (flat structure)
├── context/      # Global contexts with controllers
├── utils/        # Utility functions
├── types/        # Global type definitions
└── i18n/         # Internationalization setup
```

### Common Commands
- Generate components: `npm run plop`
- Run tests: `npm test`
- Run E2E: `npm run e2e:open`
- Start dev server: `npm start`

## General Guidelines

1. **Always use existing patterns** - Check `/docs/` for project-specific patterns
2. **Generate don't write** - Use Plop generators when available
3. **Follow naming conventions** - camelCase for files, PascalCase for components
4. **Import from correct locations** - Use project's custom hooks, not library directly
5. **Write tests** - Every new component/hook should have tests