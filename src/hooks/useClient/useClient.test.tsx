import { renderHook } from '@testing-library/react-hooks';

import { mockServer } from 'api/mocks/mock-server';
import { ClientContextController } from 'context/client/clientContextController/ClientContextController';
import { authStorage } from 'context/auth/authStorage/AuthStorage';

import { useClient } from './useClient';

describe('useClient', () => {
  afterEach(() => {
    authStorage.accessToken = null;
  });
  test("adds token to the header if it's set up in local storage", async () => {
    authStorage.accessToken = 'test';
    mockServer();
    const { result } = renderHook(() => useClient(), {
      wrapper: ({ children }) => <ClientContextController>{children}</ClientContextController>,
    });

    const req = await result.current?.get('/me');
    expect(req?.request.requestHeaders.Authorization).toBe('Bearer test');
  });

  test('sends request without an authorization header', async () => {
    const { result } = renderHook(() => useClient(), {
      wrapper: ({ children }) => <ClientContextController>{children}</ClientContextController>,
    });

    const req = await result.current?.get('/me');
    expect(req?.request.requestHeaders.Authorization).toBe(undefined);
  });
});
