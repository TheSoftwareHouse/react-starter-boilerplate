export async function enableMocking() {
  if (!import.meta.env.DEV) {
    return;
  }
  // static import will cause msw to be bundled into production code and significantly increase bundle size
  const { worker } = await import('api/mocks/mock-worker');
  return worker.start({ onUnhandledRequest: 'bypass' });
}
