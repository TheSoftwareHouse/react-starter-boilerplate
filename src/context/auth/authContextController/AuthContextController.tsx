import React, { useReducer, useEffect } from 'react';
import { AuthDispatchContext, AuthStateContext } from 'context/auth/authContext/AuthContext';
import { authReducer } from 'context/auth/authReducer/authReducer';

import { authStorage } from '../authStorage/AuthStorage';
import { AuthContextControllerProps } from './AuthContextController.types';

export const AuthContextController: React.FC<AuthContextControllerProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    isAuthorized: false,
    isAuthorizing: false,
    user: undefined,
    accessToken: authStorage.accessToken,
    refreshToken: authStorage.refreshToken,
  });

  useEffect(() => {
    authStorage.accessToken = state.accessToken;
    authStorage.refreshToken = state.refreshToken;
  }, [state.accessToken, state.refreshToken]);

  return (
    <AuthStateContext.Provider value={state}>
      <AuthDispatchContext.Provider value={dispatch}>{children}</AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
};
