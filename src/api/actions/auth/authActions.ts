import { Action } from 'api/types';

import { LoginPayload, AuthorizeResponse, RefreshTokenResponse } from './authActions.types';

export function loginAction(values: LoginPayload): Action<AuthorizeResponse> {
  return {
    method: 'POST',
    endpoint: '/authorize',
    body: values,
  };
}

export function refreshTokenAction(refreshToken: string): Action<RefreshTokenResponse> {
  return {
    method: 'POST',
    endpoint: '/refresh-token',
    body: {
      refreshToken,
    },
  };
}
