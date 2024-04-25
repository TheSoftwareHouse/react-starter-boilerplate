import { useCallback, useEffect, useMemo, useReducer } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import { useMutation } from 'hooks/useMutation/useMutation';
import { useUser } from '../../../hooks/useUser/useUser';
import { resetTokens, setTokens } from '../authActionCreators/authActionCreators';
import { AuthContext } from '../authContext/AuthContext';
import { AuthContextValue } from '../authContext/AuthContext.types';
import { authReducer } from '../authReducer/authReducer';
import { authStorage } from '../authStorage/AuthStorage';
import { parseQueryKey } from 'utils/parseQueryKey';

import { AuthContextControllerProps } from './AuthContextController.types';

export const AuthContextController = ({ children }: AuthContextControllerProps) => {
  const queryClient = useQueryClient();
  const [state, dispatch] = useReducer(authReducer, {
    accessToken: authStorage.accessToken,
    refreshToken: authStorage.refreshToken,
    expires: authStorage.expires,
  });

  const { mutateAsync: login, isPending: isAuthenticating } = useMutation('loginMutation', {
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
    isLoadingAndEnabled,
    isSuccess: isUserSuccess,
    isError,
  } = useUser({
    enabled: !!state.accessToken,
  });

  const resetUser = useCallback(() => {
    queryClient.removeQueries({ queryKey: parseQueryKey('getCurrentUser', {}) }); //TODO: THIS LOOKS BAD, but might be necessary in some cases when there are additional arguments, there needs to be a better queryKey management,
  }, [queryClient]);

  const logout = useCallback(() => {
    resetUser();
    dispatch(resetTokens());
  }, [resetUser]);

  useEffect(() => {
    if (isError) {
      dispatch(resetTokens());
    }
  }, [isError]);

  useEffect(() => {
    authStorage.accessToken = state.accessToken;
    authStorage.expires = state.expires;
    authStorage.refreshToken = state.refreshToken;
  }, [state]);

  const value: AuthContextValue = useMemo(
    () => ({
      ...state,
      isAuthenticating: isAuthenticating || isLoadingAndEnabled,
      isAuthenticated: isUserSuccess,
      login,
      logout,
      user,
    }),
    [state, isAuthenticating, isUserSuccess, isLoadingAndEnabled, login, logout, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
