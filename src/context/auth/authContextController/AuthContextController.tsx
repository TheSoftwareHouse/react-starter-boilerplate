import React, { useReducer, useEffect, useMemo, useCallback } from 'react';
import { AuthDispatchContext, AuthStateContext } from 'context/auth/authContext/AuthContext';
import { authReducer } from 'context/auth/authReducer/authReducer';

import { authStorage } from '../authStorage/AuthStorage';
import { AuthContextControllerProps } from './AuthContextController.types';
import { useMutation } from 'react-fetching-library';
import { AuthorizeResponse, LoginPayload } from 'api/actions/auth/authActions.types';
import { loginAction } from 'api/actions/auth/authActions';
import { startAuthorizing, setTokens, setUnauthorized } from '../authActionCreators/authActionCreators';

export const AuthContextController: React.FC<AuthContextControllerProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    isAuthorized: false,
    isAuthorizing: true,
    user: undefined,
    accessToken: authStorage.accessToken,
    refreshToken: authStorage.refreshToken,
  });

  const { mutate } = useMutation<AuthorizeResponse, LoginPayload>(loginAction);

  useEffect(() => {
    authStorage.accessToken = state.accessToken;
    authStorage.refreshToken = state.refreshToken;
  }, [state.accessToken, state.refreshToken]);

  const login = useCallback(
    async (body: LoginPayload) => {
      dispatch(startAuthorizing());
      const { payload, error } = await mutate(body);
      if (error && payload) {
        const { accessToken, refreshToken } = payload;
        dispatch(setTokens(accessToken, refreshToken));
        return true;
      }
      dispatch(setUnauthorized());
      return false;
    },
    [mutate],
  );

  const value = useMemo(
    () => ({
      ...state,
      login,
    }),
    [login, state],
  );
  return (
    <AuthStateContext.Provider value={value}>
      <AuthDispatchContext.Provider value={dispatch}>{children}</AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
};
