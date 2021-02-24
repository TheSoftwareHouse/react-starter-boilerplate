import { SET_AUTHORIZED, SET_TOKENS, SET_UNAUTHORIZED, START_AUTHORIZING, LOGOUT } from '../authReducer/authReducer';
import { AuthAction, User } from '../authReducer/authReducer.types';

export const setAuthorized: (user: User) => AuthAction = (user) => ({
  type: SET_AUTHORIZED,
  user,
});

export const setUnauthorized: () => AuthAction = () => ({
  type: SET_UNAUTHORIZED,
});

export const setTokens: (accessToken: string, refreshToken: string, expires: number) => AuthAction = (
  accessToken,
  refreshToken,
  expires,
) => ({
  type: SET_TOKENS,
  accessToken,
  refreshToken,
  expires,
});

export const logout: () => AuthAction = () => ({
  type: LOGOUT,
});

export const startAuthorizing: () => AuthAction = () => ({
  type: START_AUTHORIZING,
});
