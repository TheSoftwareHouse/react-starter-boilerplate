import { Action } from 'api/types';
import { FetchCurrentUserResponse } from './userActions.types';

export function fetchCurrentUserAction(accessToken?: string): Action<FetchCurrentUserResponse> {
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
