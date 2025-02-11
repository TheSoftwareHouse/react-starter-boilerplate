import { createRoot } from 'react-dom/client';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RouterProvider, createRouter } from '@tanstack/react-router';

import 'assets/styles/main.css';

import { AppProviders } from 'providers/AppProviders';
import { enableMocking } from 'setupMSW';
import { logger } from 'integrations/logger';

import { routeTree } from './routeTree.gen';
const openReactQueryDevtools = import.meta.env.DEV;

if (import.meta.env.VITE_SENTRY_DSN) {
  logger.init();
}

const container = document.getElementById('root');
const root = createRoot(container as Element);

export const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

enableMocking().then(() =>
  root.render(
    <AppProviders>
      <RouterProvider router={router} />
      {openReactQueryDevtools && <ReactQueryDevtools initialIsOpen={false} />}
    </AppProviders>,
  ),
);
