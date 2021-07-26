import React from 'react';
import { renderHook } from '@testing-library/react-hooks';

import { mockServer } from '../../api/mocks/mock-server';
import { AxiosContextController } from '../../context/axios/axiosContextController/AxiosContextController';
import { authStorage } from '../../context/auth/authStorage/AuthStorage';

import { useAxios } from './useAxios';

describe('useAxios', () => {
  afterEach(() => {
    authStorage.accessToken = null;
  });
  test("adds token to the header if it's set up in local storage", async () => {
    authStorage.accessToken = 'test';
    mockServer();
    const { result } = renderHook(() => useAxios(), {
      wrapper: ({ children }) => <AxiosContextController>{children}</AxiosContextController>,
    });

    const req = await result.current?.get('/users');
    expect(req?.request.requestHeaders.Authorization).toBe('Bearer test');
  });

  test('sends request without an authorization header', async () => {
    const { result } = renderHook(() => useAxios(), {
      wrapper: ({ children }) => <AxiosContextController>{children}</AxiosContextController>,
    });

    const req = await result.current?.get('/users');
    expect(req?.request.requestHeaders.Authorization).toBe(undefined);
  });
});
