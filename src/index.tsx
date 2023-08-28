import React from 'react';
import { createRoot } from 'react-dom/client';
import * as Sentry from '@sentry/browser';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { HttpClient as HttpClientIntegration, CaptureConsole } from '@sentry/integrations';
import { BrowserTracing } from '@sentry/browser';

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
  Sentry.init({
    dsn: import.meta.env.VITE_SENTRY_DSN,

    integrations: [
      new HttpClientIntegration({
        failedRequestStatusCodes: [[400, 599]],
        failedRequestTargets: [/.*/],
      }),
      new CaptureConsole(),
      new BrowserTracing(),
    ],
    tracesSampleRate: 1.0,
  });
}

const container = document.getElementById('root');
const root = createRoot(container as Element);
root.render(
  <AppProviders>
    <AppRoutes />
    {openReactQueryDevtools && <ReactQueryDevtools initialIsOpen={false} />}
  </AppProviders>,
);
