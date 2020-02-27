import { AuthStateContextType } from '../authContext/AuthContext.types';

import { AuthAction } from './authReducer.types';

export const SET_AUTHORIZED = 'auth/set-authorized';
export const SET_UNAUTHORIZED = 'auth/set-unauthorized';
export const SET_TOKENS = 'auth/set-tokens';
export const START_AUTHORIZING = 'auth/start-authorizing';
export const LOGOUT = 'auth/logout';

export const authReducer: (state: AuthStateContextType, action: AuthAction) => AuthStateContextType = (
  state,
  action,
) => {
  const behaviours: Record<string, (state: AuthStateContextType, action: AuthAction) => AuthStateContextType> = {
    [START_AUTHORIZING]: state => ({
      ...state,
      isAuthorizing: true,
    }),
    [SET_AUTHORIZED]: (state, { user }) => ({
      ...state,
      user,
      isAuthorizing: false,
      isAuthorized: true,
    }),
    [SET_UNAUTHORIZED]: state => ({
      ...state,
      user: undefined,
      isAuthorizing: false,
      isAuthorized: false,
    }),
    [LOGOUT]: () => ({
      user: undefined,
      isAuthorizing: false,
      isAuthorized: false,
      accessToken: null,
      refreshToken: null,
    }),
    [SET_TOKENS]: state => {
      if (!action.accessToken) {
        throw new Error('Missing access token in authReducer');
      }

      if (!action.refreshToken) {
        throw new Error('Missing refresh token in authReducer');
      }

      return {
        ...state,
        accessToken: action.accessToken,
        refreshToken: action.refreshToken,
      };
    },
  };

  if (!behaviours[action.type]) {
    throw new Error(`Unhandled action type: ${action.type}`);
  }

  return behaviours[action.type](state, action);
};
