import { useCallback, useEffect, useMemo, useSyncExternalStore } from 'react';

import { useMutation } from 'hooks/useMutation/useMutation';
import { useUser } from '../../../hooks/useUser/useUser';
import { AuthContext } from '../authContext/AuthContext';
import { AuthContextValue } from '../authContext/AuthContext.types';
import { authStorage } from 'context/auth/authStorage/AuthStorage';

import { AuthContextControllerProps } from './AuthContextController.types';

export const AuthContextController = ({ children }: AuthContextControllerProps) => {
  const authStorageData = useSyncExternalStore(authStorage.subscribe, authStorage.getTokenData);

  const {
    data: user,
    isLoadingAndEnabled,
    isSuccess: isUserSuccess,
    isError,
    resetUser,
  } = useUser({
    enabled: !!authStorageData.accessToken,
  });

  const { mutateAsync: login, isPending: isAuthenticating } = useMutation('loginMutation', {
    onSuccess: (res) => {
      authStorage.tokenData = {
        accessToken: res.accessToken,
        refreshToken: res.refreshToken,
        expires: res.expires,
      };
    },
    onError: () => {
      authStorage.resetTokens();
      resetUser();
    },
  });

  const logout = useCallback(() => {
    resetUser();
    authStorage.resetTokens();
  }, [resetUser]);

  useEffect(() => {
    if (isError) {
      authStorage.resetTokens();
    }
  }, [isError]);

  const value: AuthContextValue = useMemo(
    () => ({
      ...authStorageData,
      isAuthenticating: isAuthenticating || isLoadingAndEnabled,
      isAuthenticated: isUserSuccess,
      login,
      logout,
      user,
    }),
    [authStorageData, isAuthenticating, isUserSuccess, isLoadingAndEnabled, login, logout, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
