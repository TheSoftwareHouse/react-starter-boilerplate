# Frontend Development Instructions

## Overview

This project follows specific patterns for component development, state management, and UI composition. Always use the established patterns and Plop generators.

## Component Architecture

### 1. Component Types

**UI Components** (`src/ui/`):
- Pure, reusable components
- No business logic
- Flat structure (no nested folders)

**Route Components** (`src/routes/`):
- Page-level components
- Can contain business logic
- Organized by route structure

**Container Components**:
- Wrap UI components with data fetching logic
- Handle state management for specific features

### 2. Component Development Patterns

**UI Component Structure:**
```typescript
// src/ui/button/Button.tsx
import { ButtonProps } from './Button.types';
import './Button.css';

export const Button = ({ variant = 'primary', children, ...props }: ButtonProps) => {
  return (
    <button 
      className={`button button--${variant}`} 
      {...props}
    >
      {children}
    </button>
  );
};
```

**Component Types:**
```typescript
// src/ui/button/Button.types.ts
import { ButtonHTMLAttributes, ReactNode } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  children: ReactNode;
}
```

**Component Tests:**
```typescript
// src/ui/button/Button.test.tsx
import { render, screen } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders with correct text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
  });

  it('applies variant class', () => {
    render(<Button variant="secondary">Test</Button>);
    expect(screen.getByRole('button')).toHaveClass('button--secondary');
  });
});
```

### 3. Route Component Patterns

**Route Component Structure:**
```typescript
// src/routes/users/-components/UsersList.tsx
import { useQuery } from 'hooks/useQuery/useQuery';
import { UserCard } from 'ui/userCard/UserCard';
import { Loader } from 'ui/loader/Loader';

export const UsersList = () => {
  const { data: users, isLoading, error } = useQuery('getUsers');

  if (isLoading) return <Loader />;
  if (error) return <div>Error loading users</div>;

  return (
    <div className="users-list">
      <h2>Users</h2>
      <div className="users-grid">
        {users?.map(user => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
};
```

**Route with Data Loading:**
```typescript
// src/routes/users/user.$userId.tsx
import { createFileRoute } from '@tanstack/react-router';
import { UserProfile } from './-components/UserProfile';

export const Route = createFileRoute('/users/$userId')({
  component: UserProfile,
  loader: ({ params }) => {
    // Pre-load data if needed
    return { userId: params.userId };
  },
});
```

## Custom Hooks

### 1. Hook Development Patterns

**Data Fetching Hook:**
```typescript
// src/hooks/useUserProfile/useUserProfile.tsx
import { useQuery } from 'hooks/useQuery/useQuery';
import { useParams } from '@tanstack/react-router';

export const useUserProfile = () => {
  const { userId } = useParams({ from: '/users/$userId' });
  
  const { data: user, isLoading, error } = useQuery('getUser', {
    variables: userId,
    enabled: !!userId,
  });

  return {
    user,
    isLoading,
    error,
    isLoggedInUser: user?.id === 'current-user-id', // Example derived state
  };
};
```

**Hook with Local State:**
```typescript
// src/hooks/useToggle/useToggle.tsx
import { useState, useCallback } from 'react';

export const useToggle = (initialValue: boolean = false) => {
  const [value, setValue] = useState(initialValue);

  const toggle = useCallback(() => setValue(prev => !prev), []);
  const setTrue = useCallback(() => setValue(true), []);
  const setFalse = useCallback(() => setValue(false), []);

  return {
    value,
    toggle,
    setTrue,
    setFalse,
    setValue,
  };
};
```

**Hook Tests:**
```typescript
// src/hooks/useToggle/useToggle.test.tsx
import { renderHook, act } from '@testing-library/react';
import { useToggle } from './useToggle';

describe('useToggle', () => {
  it('initializes with default value', () => {
    const { result } = renderHook(() => useToggle());
    expect(result.current.value).toBe(false);
  });

  it('toggles value correctly', () => {
    const { result } = renderHook(() => useToggle());
    
    act(() => {
      result.current.toggle();
    });
    
    expect(result.current.value).toBe(true);
  });
});
```

### 2. Hook Export Pattern

Always export hooks from the main hooks index:

```typescript
// src/hooks/index.ts
export * from './useToggle/useToggle';
export * from './useUserProfile/useUserProfile';
export * from './useLocalStorage/useLocalStorage';
```

## Styling Guidelines

### 1. CSS Modules Pattern

```css
/* src/ui/button/Button.css */
.button {
  padding: 12px 24px;
  border: none;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.button--primary {
  background-color: #007bff;
  color: white;
}

.button--primary:hover {
  background-color: #0056b3;
}

.button--secondary {
  background-color: #6c757d;
  color: white;
}

.button--danger {
  background-color: #dc3545;
  color: white;
}
```

### 2. Responsive Design

```css
.users-grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
}

@media (max-width: 768px) {
  .users-grid {
    grid-template-columns: 1fr;
  }
}
```

## Form Handling

### 1. Controlled Components

```typescript
interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export const ContactForm = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: '',
  });

  const { mutateAsync: submitForm, isLoading } = useMutation('submitContact');

  const handleChange = (field: keyof ContactFormData) => 
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData(prev => ({
        ...prev,
        [field]: event.target.value,
      }));
    };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    
    try {
      await submitForm(formData);
      setFormData({ name: '', email: '', message: '' }); // Reset form
    } catch (error) {
      // Handle error
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={formData.name}
        onChange={handleChange('name')}
        placeholder="Name"
        required
      />
      <input
        type="email"
        value={formData.email}
        onChange={handleChange('email')}
        placeholder="Email"
        required
      />
      <textarea
        value={formData.message}
        onChange={handleChange('message')}
        placeholder="Message"
        required
      />
      <Button type="submit" disabled={isLoading}>
        {isLoading ? 'Sending...' : 'Send Message'}
      </Button>
    </form>
  );
};
```

## Internationalization

### 1. Using the Custom useLocale Hook

This project has a custom `useLocale` hook that wraps React Intl and provides additional functionality:

```typescript
import { useLocale } from 'hooks/useLocale/useLocale';

export const WelcomeMessage = ({ userName }: { userName: string }) => {
  const { t, formatMessage, locale, setLocale } = useLocale();

  return (
    <div>
      <h1>
        {/* Using the shorthand 't' function */}
        {t('welcome.title', { userName })}
      </h1>
      <p>
        {/* Using formatMessage directly */}
        {formatMessage({ id: 'welcome.description' })}
      </p>
      
      {/* Current locale info */}
      <p>Current locale: {locale}</p>
      
      {/* Language switcher */}
      <button onClick={() => setLocale('en')}>English</button>
      <button onClick={() => setLocale('pl')}>Polski</button>
    </div>
  );
};
```

### 2. Using the Translation Component

For simple translations, you can use the `Translation` component:

```typescript
import { Translation } from 'ui/translation/Translation';

export const SimpleMessage = () => {
  return (
    <div>
      <h2><Translation id="home.helloWorld" /></h2>
      <p><Translation id="user.welcome" values={{ name: 'John' }} /></p>
    </div>
  );
};
```

### 3. Message Definitions

Define translations in JSON files with type safety:

```json
// src/i18n/data/en.json
{
  "home.helloWorld": "Hello World",
  "welcome.title": "Welcome, {userName}!",
  "welcome.description": "Thank you for using our application.",
  "user.welcome": "Hello {name}, nice to see you!"
}
```

```json
// src/i18n/data/pl.json
{
  "home.helloWorld": "Witaj Świecie",
  "welcome.title": "Witaj, {userName}!",
  "welcome.description": "Dziękujemy za korzystanie z naszej aplikacji.",
  "user.welcome": "Cześć {name}, miło Cię widzieć!"
}
```

### 4. Type-Safe Translation Keys

The project provides type safety for translation keys through the `AppMessages` object:

```typescript
import { AppMessages } from 'i18n/messages';
import type { Translation } from 'i18n/messages';

// Translation keys are type-safe
const key: Translation = 'home.helloWorld'; // ✅ Valid
const invalidKey: Translation = 'invalid.key'; // ❌ TypeScript error
```

## Error Boundaries

### 1. Component Error Boundary

```typescript
// src/ui/errorBoundary/ErrorBoundary.tsx
import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div>
          <h2>Something went wrong</h2>
          <p>Please refresh the page or contact support.</p>
        </div>
      );
    }

    return this.props.children;
  }
}
```

## Code Generation

### 1. Using Plop Generators

**Create UI Component:**
```bash
npm run plop
# Select: "React UI component"
# Enter name: "userCard"
```

**Create Route Component:**
```bash
npm run plop
# Select: "React app component"
# Select directory: "users"
# Enter name: "userProfile"
```

**Create Custom Hook:**
```bash
npm run plop
# Select: "Custom hook"
# Enter name: "useUserProfile"
```

## Best Practices

### 1. Component Design

✅ **Do:**
- Keep components small and focused
- Use TypeScript for all props and state
- Write tests for every component
- Use descriptive prop names
- Handle loading and error states
- Make components reusable when possible

❌ **Don't:**
- Create deeply nested component folders
- Mix business logic with UI components
- Skip TypeScript types
- Create components without tests
- Forget accessibility attributes

### 2. Performance

✅ **Do:**
- Use React.memo for expensive components
- Implement proper key props in lists
- Use useCallback for expensive functions
- Implement proper loading states
- Lazy load routes and heavy components

❌ **Don't:**
- Re-render components unnecessarily
- Create inline objects in JSX
- Skip optimization for list components
- Load all routes synchronously

### 3. Accessibility

✅ **Do:**
- Use semantic HTML elements
- Add proper ARIA labels
- Ensure keyboard navigation
- Provide alt text for images
- Use proper heading hierarchy

❌ **Don't:**
- Use divs for interactive elements
- Skip focus management
- Forget screen reader support
- Use color only for important information

## Common Patterns

### 1. Conditional Rendering

```typescript
// Loading state
if (isLoading) return <Loader />;

// Error state
if (error) return <ErrorMessage error={error} />;

// Empty state
if (!data?.length) return <EmptyState message="No users found" />;

// Success state
return <UsersList users={data} />;
```

### 2. List Rendering

```typescript
{users?.map(user => (
  <UserCard 
    key={user.id} 
    user={user}
    onEdit={() => handleEdit(user.id)}
    onDelete={() => handleDelete(user.id)}
  />
))}
```

### 3. Event Handling

```typescript
// Inline handler for simple actions
<button onClick={() => setIsOpen(true)}>Open Modal</button>

// Separate handler for complex logic
const handleUserSelect = useCallback((userId: string) => {
  setSelectedUser(userId);
  navigate(`/users/${userId}`);
}, [navigate]);

<UserCard onSelect={handleUserSelect} />
```