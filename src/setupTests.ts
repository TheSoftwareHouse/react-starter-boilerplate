// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';
import { server } from 'api/mocks/mock-server';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    interface Global {
      MutationObserver: typeof MutationObserver;
    }
  }
}

global.MutationObserver = class {
  disconnect(): void {}
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  observe(target: Node, options?: MutationObserverInit): void {}
  takeRecords(): MutationRecord[] {
    return [];
  }
};

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
