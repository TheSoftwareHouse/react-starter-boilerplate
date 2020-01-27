import { Action } from 'api/types';
import { LoginPayload } from './authActions.types';

export function loginAction(values: LoginPayload): Action {
  return {
    method: 'POST',
    endpoint: '/authorize',
    body: values,
  };
}
