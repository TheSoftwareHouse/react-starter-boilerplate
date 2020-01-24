import { Action } from 'api/types';

export function fetchCurrentUserAction(): Action {
  return {
    method: 'GET',
    endpoint: '/users/me',
  };
}
