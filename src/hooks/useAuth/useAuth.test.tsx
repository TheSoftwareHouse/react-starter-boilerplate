import { act, renderHook } from 'tests';
import { AppProviders } from 'providers/AppProviders';

import { useAuth } from './useAuth';

describe('useAuth', () => {
  test('adds token to session storage', async () => {
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
