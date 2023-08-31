import axiosClient from 'api/axios';
import { AppProviders } from 'providers/AppProviders';
import { renderHook, waitFor } from 'tests';

import { useQuery } from './useQuery';

const mockCurrentUser = {
  firstName: 'Test',
  lastName: 'User',
  username: 'testUser',
};

const mockApiResponse = (data: unknown, method: 'get' | 'post') => {
  const response = { status: 200, data: data };
  vitest.spyOn(axiosClient, method).mockResolvedValue(response);
};

describe('useQuery', () => {
  test('returns the data fetched from api', async () => {
    mockApiResponse(mockCurrentUser, 'get');

    const { result } = renderHook(() => useQuery('getCurrentUser', {}), {
      wrapper: ({ children }) => (
        <AppProviders>
          <>{children}</>,
        </AppProviders>
      ),
    });

    expect(result.current.data).toBeUndefined();
    await waitFor(() => {
      expect(result.current.data).toBe(mockCurrentUser);
    });
  });

  test('returns proper loading state', async () => {
    mockApiResponse(mockCurrentUser, 'get');

    const { result } = renderHook(() => useQuery('getCurrentUser', {}), {
      wrapper: ({ children }) => (
        <AppProviders>
          <>{children}</>,
        </AppProviders>
      ),
    });

    expect(result.current.isLoading).toBe(true);
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });
  });

  test('returns error status properly', async () => {
    const response = { status: 401 };
    vitest.spyOn(axiosClient, 'get').mockRejectedValue(response);

    const { result } = renderHook(() => useQuery('getCurrentUser', {}, { retry: false }), {
      wrapper: ({ children }) => (
        <AppProviders>
          <>{children}</>,
        </AppProviders>
      ),
    });

    expect(result.current.status).toBe('loading');
    await waitFor(() => {
      expect(result.current.status).toBe('error');
    });
  });
});
