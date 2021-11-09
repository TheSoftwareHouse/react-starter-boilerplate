import React from 'react';

import { AuthContext } from '../authContext/AuthContext';
import { loginAction } from '../../../api/actions/auth/authActions';
import { authStorage } from '../authStorage/AuthStorage';
import { useMutation } from '../../../hooks/useMutation/useMutation';
import { LoginActionResponse } from '../../../api/actions/auth/authActions.types';

import { AuthContextControllerProps } from './AuthContextController.types';

export const AuthContextController = ({ children }: AuthContextControllerProps) => {
  const loginQuery = useMutation<LoginActionResponse>(loginAction, {
    onSuccess: (res) => {
      authStorage.accessToken = res.data.accessToken;
      authStorage.expires = res.data.expires;
      authStorage.refreshToken = res.data.refreshToken;
    },
    onError: () => {},
  });

  const login = async ({ password, username }: { password: string; username: string }) => {
    await loginQuery.mutateAsync({ password, username });
  };

  const isSuccess = loginQuery.isSuccess;
  const isAuthenticated = isSuccess && !!authStorage.accessToken;

  return <AuthContext.Provider value={{ isAuthenticated, login }}>{children}</AuthContext.Provider>;
};
