# State Management Instructions

## Overview

This project uses a **Context + Controller pattern** for global state management. Local component state is handled with useState/useReducer, while global state uses React Context with dedicated controller files.

## Context Architecture

### 1. Context Structure

Each context follows this structure:
```
src/context/[contextName]/
├── [contextName]Context/
│   ├── [ContextName]Context.ts       # Context definition
│   ├── [ContextName]Context.types.ts # TypeScript types
│   └── [ContextName]Context.test.tsx # Context tests
├── [contextName]Controller/
│   ├── [ContextName]Controller.ts       # Business logic
│   ├── [ContextName]Controller.types.ts # Controller types
│   └── [ContextName]Controller.test.ts  # Controller tests
└── use[ContextName]/
    ├── use[ContextName].tsx          # Hook to access context
    └── use[ContextName].test.tsx     # Hook tests
```

### 2. Context Implementation Pattern

**Context Definition:**
```typescript
// src/context/user/userContext/UserContext.ts
import { createContext } from 'react';
import { UserContextType } from './UserContext.types';

export const UserContext = createContext<UserContextType | null>(null);

UserContext.displayName = 'UserContext';
```

**Context Types:**
```typescript
// src/context/user/userContext/UserContext.types.ts
import { ReactNode } from 'react';
import { UserControllerType } from '../userController/UserController.types';

export interface UserContextType {
  controller: UserControllerType;
}

export interface UserContextProviderProps {
  children: ReactNode;
}
```

**Context Provider:**
```typescript
// src/context/user/userContext/UserContext.tsx
import { UserContext } from './UserContext';
import { UserContextProviderProps } from './UserContext.types';
import { useUserController } from '../userController/UserController';

export const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const controller = useUserController();

  return (
    <UserContext.Provider value={{ controller }}>
      {children}
    </UserContext.Provider>
  );
};
```

### 3. Controller Pattern

**Controller Implementation:**
```typescript
// src/context/user/userController/UserController.ts
import { useState, useCallback, useEffect } from 'react';
import { UserControllerType, UserState } from './UserController.types';
import { useQuery, useMutation } from 'hooks';

const initialState: UserState = {
  currentUser: null,
  preferences: {
    theme: 'light',
    language: 'en',
  },
  isAuthenticated: false,
};

export const useUserController = (): UserControllerType => {
  const [state, setState] = useState<UserState>(initialState);

  // API calls
  const { data: currentUser, isLoading } = useQuery('getCurrentUser', {
    enabled: state.isAuthenticated,
  });

  const { mutateAsync: updatePreferences } = useMutation('updateUserPreferences');
  const { mutateAsync: logout } = useMutation('logout');

  // Actions
  const login = useCallback(async (credentials: LoginCredentials) => {
    try {
      setState(prev => ({ ...prev, isAuthenticated: true }));
      // Login logic will trigger getCurrentUser query
    } catch (error) {
      setState(prev => ({ ...prev, isAuthenticated: false }));
      throw error;
    }
  }, []);

  const updateUserPreferences = useCallback(async (preferences: Partial<UserPreferences>) => {
    try {
      await updatePreferences(preferences);
      setState(prev => ({
        ...prev,
        preferences: { ...prev.preferences, ...preferences },
      }));
    } catch (error) {
      // Handle error
      throw error;
    }
  }, [updatePreferences]);

  const logoutUser = useCallback(async () => {
    try {
      await logout();
      setState(initialState);
    } catch (error) {
      // Handle error
    }
  }, [logout]);

  // Derived state
  const isUserLoading = isLoading;
  const userDisplayName = currentUser?.name || 'Unknown User';
  const isDarkMode = state.preferences.theme === 'dark';

  // Update state when API data changes
  useEffect(() => {
    if (currentUser) {
      setState(prev => ({ ...prev, currentUser }));
    }
  }, [currentUser]);

  return {
    // State
    state,
    
    // Derived state
    isUserLoading,
    userDisplayName,
    isDarkMode,
    
    // Actions
    login,
    logoutUser,
    updateUserPreferences,
  };
};
```

**Controller Types:**
```typescript
// src/context/user/userController/UserController.types.ts

export interface UserPreferences {
  theme: 'light' | 'dark';
  language: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface UserState {
  currentUser: User | null;
  preferences: UserPreferences;
  isAuthenticated: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface UserControllerType {
  // State
  state: UserState;
  
  // Derived state
  isUserLoading: boolean;
  userDisplayName: string;
  isDarkMode: boolean;
  
  // Actions
  login: (credentials: LoginCredentials) => Promise<void>;
  logoutUser: () => Promise<void>;
  updateUserPreferences: (preferences: Partial<UserPreferences>) => Promise<void>;
}
```

### 4. Hook for Context Access

**Context Hook:**
```typescript
// src/context/user/useUser/useUser.tsx
import { useContext } from 'react';
import { UserContext } from '../userContext/UserContext';

export const useUser = () => {
  const context = useContext(UserContext);
  
  if (!context) {
    throw new Error('useUser must be used within UserContextProvider');
  }
  
  return context.controller;
};
```

**Hook Tests:**
```typescript
// src/context/user/useUser/useUser.test.tsx
import { renderHook } from '@testing-library/react';
import { useUser } from './useUser';
import { UserContextProvider } from '../userContext/UserContext';

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <UserContextProvider>{children}</UserContextProvider>
);

describe('useUser', () => {
  it('returns user controller', () => {
    const { result } = renderHook(() => useUser(), { wrapper });
    
    expect(result.current).toHaveProperty('state');
    expect(result.current).toHaveProperty('login');
    expect(result.current).toHaveProperty('logoutUser');
  });

  it('throws error when used outside provider', () => {
    expect(() => {
      renderHook(() => useUser());
    }).toThrow('useUser must be used within UserContextProvider');
  });
});
```

## Local State Patterns

### 1. Simple State with useState

```typescript
const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });

  const handleEdit = () => setIsEditing(true);
  const handleCancel = () => {
    setIsEditing(false);
    setFormData({ name: '', email: '' });
  };

  return (
    <div>
      {isEditing ? (
        <EditForm 
          data={formData} 
          onChange={setFormData}
          onCancel={handleCancel}
        />
      ) : (
        <ViewProfile onEdit={handleEdit} />
      )}
    </div>
  );
};
```

### 2. Complex State with useReducer

```typescript
// State and actions
interface TodoState {
  todos: Todo[];
  filter: 'all' | 'active' | 'completed';
  isLoading: boolean;
}

type TodoAction =
  | { type: 'ADD_TODO'; payload: Todo }
  | { type: 'TOGGLE_TODO'; payload: string }
  | { type: 'DELETE_TODO'; payload: string }
  | { type: 'SET_FILTER'; payload: 'all' | 'active' | 'completed' }
  | { type: 'SET_LOADING'; payload: boolean };

const todoReducer = (state: TodoState, action: TodoAction): TodoState => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };
      
    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        ),
      };
      
    case 'DELETE_TODO':
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload),
      };
      
    case 'SET_FILTER':
      return {
        ...state,
        filter: action.payload,
      };
      
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };
      
    default:
      return state;
  }
};

// Component usage
const TodoApp = () => {
  const [state, dispatch] = useReducer(todoReducer, {
    todos: [],
    filter: 'all',
    isLoading: false,
  });

  const addTodo = (text: string) => {
    const newTodo = {
      id: Date.now().toString(),
      text,
      completed: false,
    };
    dispatch({ type: 'ADD_TODO', payload: newTodo });
  };

  const toggleTodo = (id: string) => {
    dispatch({ type: 'TOGGLE_TODO', payload: id });
  };

  // Filter todos based on current filter
  const filteredTodos = state.todos.filter(todo => {
    switch (state.filter) {
      case 'active':
        return !todo.completed;
      case 'completed':
        return todo.completed;
      default:
        return true;
    }
  });

  return (
    <div>
      <TodoInput onAdd={addTodo} />
      <TodoFilter 
        current={state.filter} 
        onChange={(filter) => dispatch({ type: 'SET_FILTER', payload: filter })}
      />
      <TodoList todos={filteredTodos} onToggle={toggleTodo} />
    </div>
  );
};
```

### 3. Custom State Hook

```typescript
// src/hooks/useToggle/useToggle.tsx
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

// Usage
const Modal = () => {
  const { value: isOpen, toggle, setFalse } = useToggle();
  
  return (
    <>
      <Button onClick={toggle}>Open Modal</Button>
      {isOpen && (
        <ModalComponent onClose={setFalse}>
          <p>Modal content</p>
        </ModalComponent>
      )}
    </>
  );
};
```

## Data Flow Patterns

### 1. Parent-Child Communication

**Props Down, Events Up:**
```typescript
// Parent component
const UsersList = () => {
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const { data: users } = useQuery('getUsers');

  const handleUserSelect = (userId: string) => {
    setSelectedUser(userId);
  };

  return (
    <div>
      <UserGrid users={users} onUserSelect={handleUserSelect} />
      {selectedUser && <UserDetails userId={selectedUser} />}
    </div>
  );
};

// Child component
interface UserGridProps {
  users: User[];
  onUserSelect: (userId: string) => void;
}

const UserGrid = ({ users, onUserSelect }: UserGridProps) => {
  return (
    <div className="user-grid">
      {users.map(user => (
        <UserCard 
          key={user.id}
          user={user}
          onClick={() => onUserSelect(user.id)}
        />
      ))}
    </div>
  );
};
```

### 2. Context for Global State

```typescript
// Usage in components
const Header = () => {
  const { state, logoutUser, isDarkMode } = useUser();
  
  return (
    <header className={`header ${isDarkMode ? 'dark' : 'light'}`}>
      <h1>My App</h1>
      {state.isAuthenticated ? (
        <div>
          <span>Welcome, {state.currentUser?.name}</span>
          <Button onClick={logoutUser}>Logout</Button>
        </div>
      ) : (
        <LoginButton />
      )}
    </header>
  );
};

const Settings = () => {
  const { updateUserPreferences, state } = useUser();
  
  const handleThemeChange = (theme: 'light' | 'dark') => {
    updateUserPreferences({ theme });
  };
  
  return (
    <div>
      <h2>Settings</h2>
      <ThemeSelector 
        current={state.preferences.theme}
        onChange={handleThemeChange}
      />
    </div>
  );
};
```

## Provider Setup

### 1. AppProviders Configuration

```typescript
// src/providers/AppProviders.tsx
import { UserContextProvider } from 'context/user/userContext/UserContext';
import { NotificationContextProvider } from 'context/notification/notificationContext/NotificationContext';

export const AppProviders = ({ children }: { children: ReactNode }) => {
  return (
    <UserContextProvider>
      <NotificationContextProvider>
        {children}
      </NotificationContextProvider>
    </UserContextProvider>
  );
};
```

### 2. Root App Setup

```typescript
// src/index.tsx
import { AppProviders } from 'providers/AppProviders';

const App = () => {
  return (
    <AppProviders>
      <Router />
    </AppProviders>
  );
};
```

## Code Generation

### 1. Generate Context with Plop

```bash
npm run plop
# Select: "React Context"
# Enter name: "notification"
```

This generates:
- Context definition and provider
- Controller with business logic
- Custom hook for accessing context
- Type definitions
- Test files

## Best Practices

### 1. Context Design

✅ **Do:**
- Keep contexts focused and small
- Use controllers for business logic
- Provide proper TypeScript types
- Write tests for contexts and controllers
- Use derived state in controllers
- Separate concerns (auth, UI state, etc.)

❌ **Don't:**
- Create monolithic contexts
- Put all global state in one context
- Skip error boundaries around providers
- Use context for data that changes frequently
- Access context outside of components

### 2. Local State

✅ **Do:**
- Use useState for simple state
- Use useReducer for complex state logic
- Create custom hooks for reusable state logic
- Keep state as close to where it's used as possible
- Use proper TypeScript types

❌ **Don't:**
- Over-complicate simple state with useReducer
- Store derived state unnecessarily
- Create unnecessary re-renders
- Skip memoization for expensive computations

### 3. State Updates

✅ **Do:**
- Use functional updates with useState
- Handle async operations properly
- Provide loading and error states
- Use optimistic updates where appropriate
- Validate state changes

❌ **Don't:**
- Mutate state directly
- Forget to handle errors in async operations
- Skip loading states for long operations
- Update state after component unmount

## Common Patterns

### 1. Optimistic Updates

```typescript
const { mutateAsync: updateUser } = useMutation('updateUser');

const handleUpdate = async (userData: Partial<User>) => {
  // Optimistic update
  setState(prev => ({
    ...prev,
    currentUser: prev.currentUser ? { ...prev.currentUser, ...userData } : null,
  }));

  try {
    const updatedUser = await updateUser(userData);
    setState(prev => ({ ...prev, currentUser: updatedUser }));
  } catch (error) {
    // Revert optimistic update
    setState(prev => ({ ...prev, currentUser: originalUser }));
    throw error;
  }
};
```

### 2. Debounced State Updates

```typescript
import { useDebouncedCallback } from 'use-debounce';

const SearchComponent = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

  const debouncedSearch = useDebouncedCallback(
    (value: string) => setDebouncedSearchTerm(value),
    300
  );

  useEffect(() => {
    debouncedSearch(searchTerm);
  }, [searchTerm, debouncedSearch]);

  const { data: results } = useQuery('searchItems', {
    variables: debouncedSearchTerm,
    enabled: !!debouncedSearchTerm,
  });

  return (
    <div>
      <input 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search..."
      />
      {results && <SearchResults results={results} />}
    </div>
  );
};
```

### 3. State Persistence

```typescript
const usePersistedState = <T>(key: string, defaultValue: T) => {
  const [state, setState] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch {
      return defaultValue;
    }
  });

  const setPersistedState = (value: T | ((prev: T) => T)) => {
    setState(prev => {
      const newValue = typeof value === 'function' ? (value as (prev: T) => T)(prev) : value;
      localStorage.setItem(key, JSON.stringify(newValue));
      return newValue;
    });
  };

  return [state, setPersistedState] as const;
};
```