import { useMutation } from 'react-query';

import { AuthContext } from '../authContext/AuthContext';
import { loginAction } from '../../../api/actions/auth/authActions';
import { useAxios } from '../../../hooks/useAxios/useAxios';
import { authStorage } from '../authStorage/AuthStorage';

import { AuthContextControllerProps } from './AuthContextController.types';

export const AuthContextController = ({ children }: AuthContextControllerProps) => {
  const axios = useAxios();

  const loginQuery = useMutation(loginAction(axios), {
    onSuccess: (res) => {
      authStorage.accessToken = res.data.accessToken;
      authStorage.expires = res.data.expires;
      authStorage.refreshToken = res.data.refreshToken;
    },
    onError: (error) => {},
  });

  const login = async ({ password, username }: { password: string; username: string }) => {
    await loginQuery.mutateAsync({ password, username });
  };

  const isSuccess = loginQuery.isSuccess;
  const isAuthenticated = isSuccess && !!authStorage.accessToken;

  return <AuthContext.Provider value={{ isAuthenticated, login }}>{children}</AuthContext.Provider>;
};
