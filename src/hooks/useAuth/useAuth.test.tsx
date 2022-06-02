import { renderHook } from '@testing-library/react-hooks';
import { act } from 'react-test-renderer';

import { mockServer } from 'api/mocks/mock-server';
import { AppProviders } from 'providers/AppProviders';

import { useAuth } from './useAuth';

describe('useAuth', () => {
  test('adds token to session storage', async () => {
    mockServer();
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
