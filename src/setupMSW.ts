import { worker } from 'api/mocks/mock-worker';

if (import.meta.env.DEV) {
  worker.start({ onUnhandledRequest: 'bypass' });
}
