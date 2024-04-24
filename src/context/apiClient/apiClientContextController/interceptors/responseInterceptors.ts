import axios, { type AxiosError, AxiosResponse } from 'axios';
import { jwtDecode } from 'jwt-decode';

import { authStorage } from 'context/auth/authStorage/AuthStorage';
import { getStandardizedApiError } from 'context/apiClient/apiClientContextController/apiError/apiError';
import { ExtendedAxiosRequestConfig } from 'api/types/types';
import { RefreshTokenMutationResponse } from 'api/actions/auth/auth.types';
import { refreshTokenUrl } from 'api/actions/auth/auth.mutations';

export const responseSuccessInterceptor = (response: AxiosResponse) => response;

export const responseFailureInterceptor = async (error: AxiosError<unknown>) => {
  const standarizedError = getStandardizedApiError(error);

  const originalRequest = error.config as ExtendedAxiosRequestConfig;

  if (standarizedError.statusCode === 401 && originalRequest?._retry) {
    authStorage.accessToken = null;
    authStorage.expires = null;
    authStorage.refreshToken = null;

    window.location.replace('/login');

    return Promise.reject(standarizedError);
  }

  if (standarizedError.statusCode === 401 && originalRequest) {
    originalRequest._retry = true;

    try {
      const { data } = await axios.post<RefreshTokenMutationResponse>(refreshTokenUrl, {
        accessToken: authStorage.accessToken,
        refreshToken: authStorage.refreshToken,
      });
      const { exp } = jwtDecode<{ exp: number }>(data.accessToken);

      authStorage.accessToken = data.accessToken;
      authStorage.expires = exp;
      authStorage.refreshToken = data.refreshToken;

      return axios(originalRequest);
    } catch {
      authStorage.accessToken = null;
      authStorage.expires = null;
      authStorage.refreshToken = null;
      window.location.replace('/login');

      return Promise.reject(standarizedError);
    }
  }

  return Promise.reject(standarizedError);
};
