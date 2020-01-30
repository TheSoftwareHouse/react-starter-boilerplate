import { Action } from 'api/types';

export function fetchCurrentUserAction(accessToken?: string | null): Action {
  return {
    method: 'GET',
    endpoint: '/users/me',
    ...(accessToken
      ? {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      : {}),
  };
}
