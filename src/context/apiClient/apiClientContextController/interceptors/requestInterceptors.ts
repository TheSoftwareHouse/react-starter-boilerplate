import axios, { AxiosRequestHeaders, InternalAxiosRequestConfig } from 'axios';
import { jwtDecode } from 'jwt-decode';

import { authStorage } from 'context/auth/authStorage/AuthStorage';
import { RefreshTokenMutationResponse } from 'api/actions/auth/auth.types';
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

      authStorage.tokenData = {
        accessToken: data.accessToken,
        expires: exp,
        refreshToken: data.refreshToken,
      };
    } catch (e) {
      authStorage.resetTokens();
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
