import { RequestInterceptor } from 'react-fetching-library';

import { Action } from 'api/types';

export const requestHostInterceptor: (host: string) => RequestInterceptor = host => () => async (
  action: Action<unknown>,
) => {
  if (action.endpoint.startsWith('http') || action.endpoint.startsWith('//')) {
    return action;
  }

  return {
    ...action,
    endpoint: `${host}${action.endpoint}`,
  };
};
