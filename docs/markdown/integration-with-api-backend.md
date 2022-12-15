# Integrating with an API Backend

All request to the API should be made using `react-query, which is a simple and powerful API client for React. Full
documentation is available [HERE](https://react-query.tanstack.com/).

### Actions

In order to add new request you have to create an **Action** and add it under `src/api/actions` directory. Instead of
creating plain actions you should export action creators - functions that returns an action based on the arguments
passed (e.g. payload which should be sent to the API).

All actions should be grouped by functionality they represent. Group name, which is also directory name and a prefix of
file, which helds the action creators, should be in singular form. Good examples of groups are: `auth`, `user` or
`article`.

### Interceptors

In order to create a logic which will be executed on all actions you can create an interceptor over api client e.g
`axios`. There are two types of interceptors ([read more](https://axios-http.com/docs/interceptors)):

- request interceptors
- response interceptors

the difference between them is that the first one is executed before action is handled by `axios` and the other one is
performed on the response returned by the server before it is resolved by a promise.

All interceptors should be added under `src/context/client/interceptors` directory. After creating new interceptor you
have to add it to the fetching client, which is created in **ClientContextController** inside `src/context/client`.

### Custom hooks

`react-query` library gives the possibility to call the API by specifying `query/mutation` function, which is
responsible for calling the fetching utility e.g. `axios` or `fetch`. This approach is fully correct, but in order to
make it easier to develop and maintain we have decided to prepare hooks that use already existing client in
**ClientContextController**. `useQuery, useQueries` hooks are extended by middleware called
[default query function](https://react-query.tanstack.com/guides/default-query-function), which simply uses client
declared in **ClientContextController**.

The hooks that needed rewrite are `src/hooks/useMutation` and `src/hooks/useInfiniteQuery` hook.

- `useMutation` - Allows to call the `POST/PUT/PATCH/DELETE` request with existing fetching client, also it has the very
  same functionalities as original [useMutation](https://react-query.tanstack.com/reference/useMutation) hook.
- `useInfiniteQuery` - Allows to the call `GET` request for pagination-like endpoints e.g. infinite loading, load more
  content. [useInfiniteQuery](https://react-query.tanstack.com/reference/useInfiniteQuery).

### Mocks

If you are working on a new functionality and the backend is not ready yet, you can create a mock which will simulate an
endpoint and return given response instead of the real one.

All mocks should be added under `src/api/mocks` directory, and used in the 'src/api/mocks/mock-server' mock server, made
with [Mock Service Worker](https://mswjs.io/). The mock server is enabled when NODE_ENV is not `production`, or when
VITE_CI=1.
