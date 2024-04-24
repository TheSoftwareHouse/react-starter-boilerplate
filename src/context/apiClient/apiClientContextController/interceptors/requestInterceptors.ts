import axios, { AxiosRequestHeaders, InternalAxiosRequestConfig } from 'axios';
import { jwtDecode } from 'jwt-decode';

import { RefreshTokenMutationResponse } from 'api/actions/auth/auth.types';
import { authStorage } from 'context/auth/authStorage/AuthStorage';
import { refreshTokenUrl } from 'api/actions/auth/auth.mutations';

export const requestSuccessInterceptor = async (
  config: InternalAxiosRequestConfig,
): Promise<InternalAxiosRequestConfig> => {
  if (!authStorage.accessToken || authStorage.expires === null) {
    return config;
  }

  const secondsSinceEpoch = Math.round(new Date().getTime() / 1000);
  const isTokenExpired = secondsSinceEpoch >= authStorage.expires;

  if (isTokenExpired) {
    try {
      const { data } = await axios.post<RefreshTokenMutationResponse>(refreshTokenUrl, {
        accessToken: authStorage.accessToken,
        refreshToken: authStorage.refreshToken,
      });

      const { exp } = jwtDecode<{ exp: number }>(data.accessToken);

      authStorage.accessToken = data.accessToken;
      authStorage.expires = exp;
      authStorage.refreshToken = data.refreshToken;
    } catch (e) {
      authStorage.accessToken = null;
      authStorage.expires = null;
      authStorage.refreshToken = null;
    }

    return {
      ...config,
      withCredentials: false,
      headers: {
        ...config.headers,
        Authorization: `Bearer ${authStorage.accessToken}`,
      } as AxiosRequestHeaders,
    };
  }

  return config;
};
