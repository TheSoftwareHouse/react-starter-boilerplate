import React, { ReactNode } from 'react';
import { renderHook } from '@testing-library/react-hooks';

import { AuthStateContext } from 'context/auth';
import { useAuthState } from './useAuthState';

describe('useAuthState', () => {
  const state = {
    isAuthorized: false,
    isAuthorizing: false,
    accessToken: null,
    refreshToken: null,
  };

  const wrapper = ({ children }: { children?: ReactNode }) => (
    <AuthStateContext.Provider value={state}>{children}</AuthStateContext.Provider>
  );
  test('returns authStateContext value', async () => {
    const { result } = renderHook(() => useAuthState(), {
      wrapper,
    });

    expect(result.current).toEqual(state);
  });

  test('throws error when used outside AuthContextController', async () => {
    const { result } = renderHook(() => useAuthState());

    expect(result.error).toEqual(Error('useAuthState must be used within an AuthContextController'));
  });
});
