import React, { useCallback, useMemo } from 'react';

import { AuthContext } from '../authContext/AuthContext';
import { loginMutation } from 'api/actions/auth/authActions';
import { authStorage } from '../authStorage/AuthStorage';
import { useMutation } from 'hooks/useMutation/useMutation';
import { LoginMutationArguments, LoginMutationResponse } from 'api/actions/auth/authActions.types';

import { AuthContextControllerProps } from './AuthContextController.types';

export const AuthContextController = ({ children }: AuthContextControllerProps) => {
  const { mutateAsync, isSuccess, isLoading } = useMutation<LoginMutationResponse, unknown, LoginMutationArguments>(
    'login',
    loginMutation,
    {
      onSuccess: (res) => {
        authStorage.accessToken = res.accessToken;
        authStorage.expires = res.expires;
        authStorage.refreshToken = res.refreshToken;
      },
      onError: () => {},
    },
  );

  const login = useCallback(
    async (params: LoginMutationArguments) => {
      await mutateAsync(params);
    },
    [mutateAsync],
  );

  const isAuthenticated = useMemo(() => isSuccess && !!authStorage.accessToken, [isSuccess]);

  const contextValue = useMemo(
    () => ({
      isAuthenticated,
      isAuthenticating: isLoading,
      login,
    }),
    [isAuthenticated, isLoading, login],
  );

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};
