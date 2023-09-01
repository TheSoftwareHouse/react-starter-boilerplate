import { act, renderHook } from 'tests';
import { AppProviders } from 'providers/AppProviders';
import axiosClient from 'api/axios';

import { useAuth } from './useAuth';

const mockedTokens = {
  accessToken: 'MTQ0NjJkZmQ5OTM2NDE1ZTZjNGZmZjI3',
};

describe('useAuth', () => {
  test('removes token from session storage', async () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: ({ children }) => (
        <AppProviders>
          <>{children}</>,
        </AppProviders>
      ),
    });

    act(() => global.sessionStorage.setItem('accessToken', mockedTokens.accessToken));
    act(() => result.current.logout());
    expect(global.sessionStorage.getItem('accessToken')).toBeNull();
  });

  test('adds token to session storage', async () => {
    const response = { status: 200, data: mockedTokens };
    vitest.spyOn(axiosClient, 'post').mockResolvedValue(response);

    const { result } = renderHook(() => useAuth(), {
      wrapper: ({ children }) => (
        <AppProviders>
          <>{children}</>,
        </AppProviders>
      ),
    });

    await act(() => result.current?.login({ password: 'foo', username: 'bar' }));
    expect(global.sessionStorage.getItem('accessToken')).toBe('MTQ0NjJkZmQ5OTM2NDE1ZTZjNGZmZjI3');
  });
});
