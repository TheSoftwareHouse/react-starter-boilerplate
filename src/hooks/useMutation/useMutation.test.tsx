import axiosClient from 'api/axios';
import { AppProviders } from 'providers/AppProviders';
import { act, renderHook, waitFor } from 'tests';

import { useMutation } from './useMutation';

const mockMutationResponse = {
  token: '87sa6dsa7dfsa8d87',
};

describe('useMutation', () => {
  test('returns the data fetched from api on mutation', async () => {
    const response = { status: 200, data: mockMutationResponse };
    vitest.spyOn(axiosClient, 'post').mockResolvedValue(response);

    const { result } = renderHook(() => useMutation('loginMutation', {}), {
      wrapper: ({ children }) => (
        <AppProviders>
          <>{children}</>,
        </AppProviders>
      ),
    });

    expect(result.current.data).toBeUndefined();
    act(() => result.current?.mutate({ password: 'foo', username: 'bar' }));
    await waitFor(() => {
      expect(result.current.data).toBe(mockMutationResponse);
    });
  });
});
