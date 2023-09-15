# React Query abstraction

React Starter Boilerplate implements special abstraction for base hooks from Tanstack Query library:
- `useQuery`,
- `useMutation`,
- `useInfiniteQuery`.

This abstraction allows us to create API actions (queries and mutations) in a simple way in `src/api` directory.

All you need is to create API functions in queries or mutation file and the name of API function you created will be automatically available to use in useQuery/useMutation hooks.

To make it work properly you need to use `useQuery`, `useMutation` and `useInfiniteQuery` hooks from `src/hooks` directory, not from the TanStack Query library.

## Examples

### useQuery

`src/api/auth.auth.queries.ts`
```ts
export const authQueries = {
  getCurrentUser: (client: AxiosInstance) => async () => {
    return (await client.get<GetMeQueryResponse>('/me')).data;
  },
};
```

Usage with `useQuery` hook:
```ts
import { useQuery } from 'hooks/useQuery/useQuery';

const TestComponent = () => {
  const { data, isLoading } = useQuery('getCurrentUser');

  ...
}
```

### useMutation

`src/api/auth/auth.mutations.ts`
```ts
export const authMutations = {
  login: (client: AxiosInstance) => async (body: LoginMutationArguments) => {
    return (await client.post<LoginMutationResponse>('/authorize', body)).data;
  },
};
```

Usage with `useMutation` hook:
```ts
import { useMutation } from 'hooks/useMutation/useMutation';

const TestComponent = () => {
  const { mutateAsync, isLoading } = useMutation('login');

  ...
}
```

### useInfiniteQuery

`src/api/auth/auth.queries.ts`
```ts
export const authQueries = {
  getUsersInfinite:
    (client: AxiosInstance) =>
    async ({ pageParam = '0', count = '5' }: GetUsersInfiniteArgs) => {
      const queryParams = stringify({ page: pageParam, count: count }, { addQueryPrefix: true });
      return (await client.get<GetUsersResponse>(`/users/${queryParams}`)).data;
    },
};
```

Usage with `useInfiniteQuery` hook:

```ts
import { useMutation } from 'hooks/useInfiniteQuery/useInfiniteQuery';

const TestComponent = () => {
  const { data, isFetching } = useInfiniteQuery('getUsersInfinite');

  ...
}

```
