import axios, { InternalAxiosRequestConfig } from 'axios';
import decode from 'jwt-decode';

import { authStorage } from 'context/auth/authStorage/AuthStorage';
import { RefreshMutationResponse } from 'api/actions/auth/authActions.types';

export const requestSuccessInterceptor = async (config: InternalAxiosRequestConfig) => {
  if (authStorage.accessToken && authStorage.expires !== null) {
    const secondsSinceEpoch = Math.round(new Date().getTime() / 1000);
    const isTokenExpired = secondsSinceEpoch >= authStorage.expires;

    if (isTokenExpired) {
      await axios
        .post<RefreshMutationResponse>(`${import.meta.env.VITE_SECURITY_API_URL}/users/refresh-token`, {
          accessToken: authStorage.accessToken,
          refreshToken: authStorage.refreshToken,
        })
        .then(({ data }) => {
          const { exp } = decode(data.accessToken) as { exp: number };

          authStorage.accessToken = data.accessToken;
          authStorage.expires = exp;
          authStorage.refreshToken = data.refreshToken;
        })
        .catch(() => {
          authStorage.accessToken = null;
          authStorage.expires = null;
          authStorage.refreshToken = null;
        });
    }

    return {
      ...config,
      headers: {
        ...config.headers,
        Authorization: `Bearer ${authStorage.accessToken}`,
      },
      withCredentials: false,
    };
  }

  return config;
};
