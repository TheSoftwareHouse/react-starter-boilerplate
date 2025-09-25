# API Development Instructions

## Overview

This project uses a **custom React Query abstraction** that simplifies API development. Always use the project's custom hooks instead of TanStack Query directly.

## Core API Patterns

### 1. API Actions Structure

All API functions are organized in collections under `src/api/actions/`:

```
src/api/actions/
├── users/
│   ├── users.queries.ts    # GET operations
│   ├── users.mutations.ts  # POST/PUT/DELETE operations
│   └── users.types.ts      # TypeScript types
└── auth/
    ├── auth.queries.ts
    ├── auth.mutations.ts
    └── auth.types.ts
```

### 2. Query Development

**Always define queries in the collection's `.queries.ts` file using the Query Factory pattern:**

```typescript
// src/api/actions/users/users.queries.ts
import { AxiosInstance } from 'axios';
import { stringify } from 'qs';
import { queryFactoryOptions, infiniteQueryFactoryOptions } from '../../utils/queryFactoryOptions';
import { GetUsersResponse, GetUserResponse, GetUsersListArgs } from './users.types';

// Query functions
const getUsersList = 
  (client: AxiosInstance, { page = '1', limit = '10' }: GetUsersListArgs) =>
  async () => {
    const queryParams = stringify({ page, limit }, { addQueryPrefix: true });
    return (await client.get<GetUsersResponse>(`/users${queryParams}`)).data;
  };

const getUser = 
  (client: AxiosInstance, userId: string) =>
  async () => {
    return (await client.get<GetUserResponse>(`/users/${userId}`)).data;
  };

// Query factory with keys and options
export const usersQueries = {
  all: () => ['users'],
  lists: () => [...usersQueries.all(), 'list'],
  list: (params: GetUsersListArgs) =>
    queryFactoryOptions({
      queryKey: [...usersQueries.lists(), params],
      queryFn: (client) => getUsersList(client, params),
    }),
  details: () => [...usersQueries.all(), 'detail'],
  detail: (userId: string) =>
    queryFactoryOptions({
      queryKey: [...usersQueries.details(), userId],
      queryFn: (client) => getUser(client, userId),
    }),
};
```

**Usage in components:**

```typescript
import { useQuery } from 'hooks/useQuery/useQuery';
import { usersQueries } from 'api/actions/users/users.queries';

const UsersList = () => {
  // List with parameters using query factory
  const { data: usersResponse, isLoading } = useQuery({
    ...usersQueries.list({ page: '1', limit: '10' }),
  });
  
  // Single user detail
  const { data: user } = useQuery({
    ...usersQueries.detail('user-123'),
    enabled: !!userId,
  });
  
  // With additional options
  const { data: cachedUsers } = useQuery({
    ...usersQueries.list({ page: '1' }),
    staleTime: 5 * 60 * 1000, // 5 minutes
    select: (data) => data.users.filter(user => user.isActive),
  });
};
```

### 3. Mutation Development

**Always define mutations in the collection's `.mutations.ts` file:**

```typescript
// src/api/actions/users/users.mutations.ts
import { AxiosInstance } from 'axios';
import { CreateUserPayload, UpdateUserPayload, UserResponse } from './users.types';

export const usersMutations = {
  // Create operation
  createUser: (client: AxiosInstance) => async (payload: CreateUserPayload) => {
    return (await client.post<UserResponse>('/users', payload)).data;
  },

  // Update operation
  updateUser: (client: AxiosInstance) => async ({ id, ...payload }: UpdateUserPayload) => {
    return (await client.put<UserResponse>(`/users/${id}`, payload)).data;
  },

  // Delete operation
  deleteUser: (client: AxiosInstance) => async (userId: string) => {
    return (await client.delete(`/users/${userId}`)).data;
  },
};
```

**Usage in components:**

```typescript
import { useMutation } from 'hooks/useMutation/useMutation';

const UserForm = () => {
  const { mutateAsync: createUser, isLoading } = useMutation('createUser');
  const { mutateAsync: updateUser } = useMutation('updateUser');
  
  const handleSubmit = async (formData) => {
    try {
      const newUser = await createUser(formData);
      // Handle success
    } catch (error) {
      // Handle error
    }
  };
};
```

### 4. Infinite Queries

**For paginated data using the infinite query factory:**

```typescript
// In queries file
const getUsersInfinite =
  (client: AxiosInstance, { limit = '10' }: GetUsersInfiniteArgs) =>
  async ({ pageParam = '1' }) => {
    const queryParams = stringify({ page: pageParam, limit }, { addQueryPrefix: true });
    return (await client.get<GetUsersResponse>(`/users${queryParams}`)).data;
  };

export const usersQueries = {
  // ... other queries
  listsInfinite: () => [...usersQueries.lists(), 'infinite'],
  listInfinite: (params: GetUsersInfiniteArgs) =>
    infiniteQueryFactoryOptions({
      queryKey: [...usersQueries.listsInfinite(), params],
      queryFn: (client) => getUsersInfinite(client, params),
      initialPageParam: '1',
      getNextPageParam: ({ nextPage }) => nextPage?.toString(),
    }),
};
```

**Usage:**

```typescript
import { useInfiniteQuery } from 'hooks/useInfiniteQuery/useInfiniteQuery';
import { usersQueries } from 'api/actions/users/users.queries';

const InfiniteUsersList = () => {
  const { 
    data, 
    fetchNextPage, 
    hasNextPage, 
    isFetching 
  } = useInfiniteQuery({
    ...usersQueries.listInfinite({ limit: '20' }),
  });

  const allUsers = data?.pages.flatMap(page => page.users) ?? [];

  return (
    <div>
      {allUsers.map(user => (
        <UserCard key={user.id} user={user} />
      ))}
      {hasNextPage && (
        <button onClick={fetchNextPage} disabled={isFetching}>
          Load More
        </button>
      )}
    </div>
  );
};
```

## Type Definitions

**Always define comprehensive types in `.types.ts` files:**

```typescript
// src/api/actions/users/users.types.ts

// Request types
export interface CreateUserPayload {
  name: string;
  email: string;
  role: 'admin' | 'user';
}

export interface UpdateUserPayload extends Partial<CreateUserPayload> {
  id: string;
}

export interface SearchUsersParams {
  name?: string;
  role?: string;
  limit?: string;
  page?: string;
}

// Response types
export interface UserResponse {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export interface GetUsersResponse {
  users: UserResponse[];
  total: number;
  page: number;
  totalPages: number;
  nextPage?: string;
}
```

## Error Handling

**Use the built-in error handling:**

```typescript
import { useHandleQueryErrors } from 'hooks/useHandleQueryErrors/useHandleQueryErrors';

const UsersList = () => {
  const { data, error, isError } = useQuery('getUsers');
  
  // Automatic error handling
  useHandleQueryErrors(error);
  
  if (isError) {
    return <div>Failed to load users</div>;
  }
};
```

## Code Generation

**Always use Plop generators for new API collections:**

```bash
# Create new API collection
npm run plop
# Select: "API actions collection"
# Enter collection name: "products"

# Add new query to existing collection
npm run plop
# Select: "API query"
# Select collection: "products"
# Enter query name: "getProduct"

# Add new mutation to existing collection
npm run plop
# Select: "API mutation" 
# Select collection: "products"
# Enter mutation name: "createProduct"
```

## Best Practices

1. **Use descriptive names**: `getUserProfile` not `getUser`
2. **Group related operations**: Keep all user operations in `users` collection
3. **Type everything**: Never use `any` - define proper interfaces
4. **Handle loading states**: Always show loading indicators
5. **Handle errors gracefully**: Use `useHandleQueryErrors` or custom error handling
6. **Cache efficiently**: Leverage React Query's built-in caching
7. **Use optimistic updates**: For mutations that should feel instant

## Common Patterns

### Dependent Queries
```typescript
const { data: user } = useQuery({
  ...usersQueries.detail(userId),
  enabled: !!userId,
});

const { data: posts } = useQuery({
  ...postsQueries.userPosts(userId),
  enabled: !!user, // Only run when user is loaded
});
```

### Invalidating Cache
```typescript
import { useQueryClient } from '@tanstack/react-query';

const { mutateAsync: updateUser } = useMutation('updateUser', {
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: usersQueries.all() });
    queryClient.invalidateQueries({ queryKey: usersQueries.detail(userId) });
  }
});
```

### Background Refetching
```typescript
const { data } = useQuery({
  ...usersQueries.list({ page: '1' }),
  refetchInterval: 30000, // Refetch every 30 seconds
  staleTime: 10000, // Consider data stale after 10 seconds
});
```

## Don'ts

❌ Don't import from `@tanstack/react-query` directly
❌ Don't create API calls outside the `api/actions` structure  
❌ Don't skip type definitions
❌ Don't forget to handle loading and error states
❌ Don't create API functions without using Plop generators