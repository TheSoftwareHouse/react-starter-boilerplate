import { createRootRoute, ScrollRestoration } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
const enableTanstackRouterDevtools = import.meta.env.DEV;

import { Layout } from 'routes/-layout/Layout';

export const Route = createRootRoute({
  component: () => (
    <>
      <ScrollRestoration />
      <Layout />
      {enableTanstackRouterDevtools && <TanStackRouterDevtools />}
    </>
  ),
});
