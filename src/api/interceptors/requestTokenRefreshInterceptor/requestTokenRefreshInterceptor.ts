import { RequestInterceptor } from 'react-fetching-library';
import { Dispatch } from 'react';

import { Action } from 'api/types';
import { AuthAction } from '../../../context/auth/authReducer/authReducer.types';
import { isTokenExpired } from '../../../context/auth/helpers';
import { setTokens } from '../../../context/auth/authActionCreators/authActionCreators';

type TokenProps = {
  accessToken: string | null;
  refreshToken: string | null;
  expires: number | null;
};

export const requestTokenRefreshInterceptor: (
  refreshUrl: string,
  token: TokenProps,
  dispatch: Dispatch<AuthAction>,
) => RequestInterceptor = (refreshUrl, token, dispatch) => () => async (action: Action<unknown>) => {
  if (action.config && action.config.skipAuthorization) {
    return action;
  }

  if (token.expires && token.refreshToken && isTokenExpired(token.expires)) {
    const response = await fetch(refreshUrl, {
      method: 'POST',
      body: JSON.stringify({ refreshToken: token.refreshToken }),
    });

    const { accessToken, refreshToken, expires } = await response.json();
    dispatch(setTokens(accessToken, refreshToken, expires));

    return {
      ...action,
      headers: {
        ...action.headers,
        Authorization: `Bearer ${accessToken}`,
      },
    };
  }

  return action;
};
