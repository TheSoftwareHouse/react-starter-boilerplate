import React, { useCallback, useMemo } from 'react';

import { AuthContext } from '../authContext/AuthContext';
import { loginMutation } from '../../../api/actions/auth/authActions';
import { authStorage } from '../authStorage/AuthStorage';
import { useMutation } from '../../../hooks/useMutation/useMutation';
import { LoginMutationArguments } from '../../../api/actions/auth/authActions.types';

import { AuthContextControllerProps } from './AuthContextController.types';

export const AuthContextController = ({ children }: AuthContextControllerProps) => {
  const { mutateAsync, isSuccess, isLoading } = useMutation('login', loginMutation, {
    onSuccess: (res) => {
      authStorage.accessToken = res.data.accessToken;
      authStorage.expires = res.data.expires;
      authStorage.refreshToken = res.data.refreshToken;
    },
    onError: () => {},
  });

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
