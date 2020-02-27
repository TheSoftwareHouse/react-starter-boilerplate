import { Action } from 'api/types';

import { LoginPayload, AuthorizeResponse } from './authActions.types';

export function loginAction(values: LoginPayload): Action<AuthorizeResponse> {
  return {
    method: 'POST',
    endpoint: '/authorize',
    body: values,
  };
}
