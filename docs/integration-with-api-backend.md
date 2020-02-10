# Integrating with an API Backend

All request to the API should be made using `react-fetching-library`, which is a simple and powerful API client for
React. Full documentation is available [HERE](https://marcin-piela.github.io/react-fetching-library).

### Actions

In order to add new request you have to create an **Action** and add it under `src/api/actions` directory. Instead of
creating plain actions you should export action creators - functions that returns an action based on the arguments
passed (e.g. payload which should be sent to the API).

All actions should be grouped by functionality they represent. Group name, which is also directory name and a prefix of
file, which helds the action creators, should be in singular form. Good examples of groups are: `auth`, `user` or
`article`.

### Interceptors

In order to create a logic which will be executed on all actions you can create an interceptor. There are two types of
interceptors:

- request interceptors ([read more](https://marcin-piela.github.io/react-fetching-library/#/?id=request-interceptors))
- response interceptors ([read more](https://marcin-piela.github.io/react-fetching-library/#/?id=response-interceptors))

the difference between them is that the first one is executed before action is handled by `fetch` and the other one is
performed on the response returned by the server before it is resolved by a promise.

All interceptors should be added under `src/api/interceptors` directory. After creating new interceptor you have to add it to the fetching client, which is
created in **ClientContextController** inside `src/context/client`.

### Mocks

If you are working on a new functionallity and the backend is not ready yet, you can create a mock which will simulate
an endpoint and return given response instead of the real one. 

All mocks should be added under `src/api/mocks` directory, and used in the 'src/api/mocks/mock-server' mock server, made with [mirage.js](https://github.com/miragejs/miragejs). The mock server is enabled when NODE_ENV is not `production`, or when REACT_APP_CI=1.

### Types

If you would like to modify default `react-fetching-library` types, you can do it inside `src/api/types` directory. This
is perfect place for extending action with additional parameters:

```typescript
import { Action as BaseAction } from 'react-fetching-library';

export type AdditionalProperties = {
  skipAuthorization?: boolean;
};

export type Action = BaseAction<AdditionalProperties>;
```
