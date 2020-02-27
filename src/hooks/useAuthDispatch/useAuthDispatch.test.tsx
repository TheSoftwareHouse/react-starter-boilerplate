import React, { ReactNode } from 'react';
import { renderHook } from '@testing-library/react-hooks';

import { AuthDispatchContext } from 'context/auth/authContext/AuthContext';

import { useAuthDispatch } from './useAuthDispatch';

describe('useAuthDispatch', () => {
  const dispatch = jest.fn();

  const wrapper = ({ children }: { children?: ReactNode }) => (
    <AuthDispatchContext.Provider value={dispatch}>{children}</AuthDispatchContext.Provider>
  );
  test('returns authDispatchContext value', async () => {
    const { result } = renderHook(() => useAuthDispatch(), {
      wrapper,
    });

    expect(result.current).toEqual(dispatch);
  });

  test('throws error when used outside AuthContextController', async () => {
    const { result } = renderHook(() => useAuthDispatch());

    expect(result.error).toEqual(Error('useAuthDispatch must be used within an AuthContextController'));
  });
});
