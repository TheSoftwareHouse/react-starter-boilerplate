import React from 'react';
import { createRoot } from 'react-dom/client';
import * as Sentry from '@sentry/browser';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import 'assets/styles/main.css';

import { AppProviders } from 'providers/AppProviders';
import { AppRoutes } from 'routing/AppRoutes';
import { worker } from 'api/mocks/mock-worker';

const openReactQueryDevtools = import.meta.env.DEV;

if (import.meta.env.DEV) {
  const { default: wdyr } = await import('@welldone-software/why-did-you-render');
  wdyr(React);

  worker.start({ onUnhandledRequest: 'bypass' });
}

if (import.meta.env.VITE_SENTRY_DSN) {
  Sentry.init({ dsn: import.meta.env.VITE_SENTRY_DSN });
}

const container = document.getElementById('root');
const root = createRoot(container as Element);
root.render(
  <AppProviders>
    <AppRoutes />
    {openReactQueryDevtools && <ReactQueryDevtools initialIsOpen={false} />}
  </AppProviders>,
);
