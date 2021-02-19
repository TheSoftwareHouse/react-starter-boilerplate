import { QueryResponse, ResponseInterceptor } from 'react-fetching-library';
import { Dispatch } from 'react';

import { Action } from 'api/types';
import { AuthAction } from '../../../context/auth/authReducer/authReducer.types';
import { setTokens, setUnauthorized } from '../../../context/auth/authActionCreators/authActionCreators';
import { RefreshTokenResponse } from '../../actions/auth/authActions.types';
import { refreshTokenAction } from '../../actions/auth/authActions';

let refreshPromise: null | Promise<QueryResponse<RefreshTokenResponse>> = null;

export const responseRefreshTokenInterceptor: (
  refreshToken: string,
  dispatch: Dispatch<AuthAction>,
) => ResponseInterceptor = (refreshToken, dispatch) => (client) => async (
  action: Action,
  response: QueryResponse<unknown>,
) => {
  if (action.config && (action.config.skipAuthorization || action.config.skipRefreshToken)) {
    return response;
  }

  if (response.status === 401) {
    if (!refreshPromise) {
      refreshPromise = client.query<RefreshTokenResponse>(refreshTokenAction(refreshToken)).then((refreshResponse) => {
        if (refreshResponse.error || !refreshResponse.payload) {
          dispatch(setUnauthorized());

          refreshPromise = null;

          return refreshResponse;
        }

        dispatch(
          setTokens(
            refreshResponse.payload.accessToken,
            refreshResponse.payload.refreshToken,
            refreshResponse.payload.expires,
          ),
        );

        refreshPromise = null;

        return refreshResponse;
      });
    }

    const refreshResponse = await refreshPromise;

    if (refreshResponse.error || !refreshResponse.payload) {
      return response;
    }

    return client.query({
      ...action,
      headers: {
        ...action.headers,
        Authorization: refreshResponse.payload && `Bearer ${refreshResponse.payload.accessToken}`,
      },
    });
  }

  return response;
};
