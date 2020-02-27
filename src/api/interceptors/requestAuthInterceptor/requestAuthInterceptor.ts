import { RequestInterceptor } from 'react-fetching-library';

import { Action } from 'api/types';

export const requestAuthInterceptor: (accessToken: string | null) => RequestInterceptor = accessToken => () => async (
  action: Action<unknown>,
) => {
  if (action.config && action.config.skipAuthorization) {
    return action;
  }

  return {
    ...action,
    headers: {
      Authorization: `Bearer ${accessToken ? accessToken : ''}`,
      ...action.headers,
    },
  };
};
