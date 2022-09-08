import React, { useCallback, useEffect, useMemo, useReducer } from 'react';

import { AuthContext } from '../authContext/AuthContext';
import { loginMutation, loginQueryKey } from 'api/actions/auth/authActions';
import { authStorage } from '../authStorage/AuthStorage';
import { useMutation } from 'hooks/useMutation/useMutation';
import { LoginMutationArguments, LoginMutationResponse } from 'api/actions/auth/authActions.types';
import { authReducer } from '../authReducer/authReducer';
import { resetTokens, setTokens } from '../authActionCreators/authActionCreators';
import { AuthContextValue } from '../authContext/AuthContext.types';
import { useUser } from '../../../hooks/useUser/useUser';

import { AuthContextControllerProps } from './AuthContextController.types';

export const AuthContextController = ({ children }: AuthContextControllerProps) => {
  const [state, dispatch] = useReducer(authReducer, {
    accessToken: authStorage.accessToken,
    refreshToken: authStorage.refreshToken,
    expires: authStorage.expires,
  });

  const { mutateAsync: login, isLoading: isAuthenticating } = useMutation<
    LoginMutationResponse,
    unknown,
    LoginMutationArguments
  >(loginQueryKey, loginMutation, {
    onSuccess: (res) => {
      dispatch(
        setTokens({
          accessToken: res.accessToken,
          refreshToken: res.refreshToken,
          expires: res.expires,
        }),
      );
    },
    onError: () => {
      dispatch(resetTokens());
      resetUser();
    },
  });

  const {
    data: user,
    isLoading: isLoadingUser,
    isSuccess: isUserSuccess,
    remove: resetUser,
  } = useUser({
    enabled: !!state.accessToken,
    onError: () => {
      dispatch(resetTokens());
    },
  });

  const logout = useCallback(() => {
    resetUser();
    dispatch(resetTokens());
  }, [resetUser]);

  useEffect(() => {
    authStorage.accessToken = state.accessToken;
    authStorage.expires = state.expires;
    authStorage.refreshToken = state.refreshToken;
  }, [state]);

  const value: AuthContextValue = useMemo(
    () => ({
      ...state,
      isAuthenticating: isAuthenticating || (isLoadingUser && !!state.accessToken),
      isAuthenticated: isUserSuccess,
      login,
      logout,
      user,
    }),
    [state, isAuthenticating, isLoadingUser, isUserSuccess, login, logout, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
