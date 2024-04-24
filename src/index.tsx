if (import.meta.env.DEV) {
  import.meta.glob('./wdyr.ts', { eager: true });
}
import React from 'react';
import { createRoot } from 'react-dom/client';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import 'assets/styles/main.css';
import { AppProviders } from 'providers/AppProviders';
import { AppRoutes } from 'routing/AppRoutes';
import { enableMocking } from 'setupMSW';
import { logger } from 'integrations/logger';

const openReactQueryDevtools = import.meta.env.DEV;

if (import.meta.env.VITE_SENTRY_DSN) {
  logger.init();
}

const container = document.getElementById('root');
const root = createRoot(container as Element);

enableMocking().then(() =>
  root.render(
    <AppProviders>
      <AppRoutes />
      {openReactQueryDevtools && <ReactQueryDevtools initialIsOpen={false} />}
    </AppProviders>,
  ),
);
