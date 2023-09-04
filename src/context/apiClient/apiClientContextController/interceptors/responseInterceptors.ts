import axios, { AxiosError, AxiosResponse } from 'axios';
import decode from 'jwt-decode';

import { RefreshMutationResponse } from 'api/actions/auth/authActions.types';
import { authStorage } from 'context/auth/authStorage/AuthStorage';
import { APIErrorOutput, ExtendedAxiosRequestConfig } from 'api/types/types';
import { responseErrorHandler } from 'api/axios/ApiErrorStrategy';

export const responseSuccessInterceptor = (response: AxiosResponse) => response;

export const responseFailureInterceptor = async (error: AxiosError): Promise<APIErrorOutput> => {
  const getErrorResponse = responseErrorHandler.handleError(error);
  const status = getErrorResponse.status || 500;
  const errorData = {
    status,
    code: getErrorResponse.code,
    message: getErrorResponse.message,
  };

  const originalRequest = error.config as ExtendedAxiosRequestConfig;

  if (status === 401 && originalRequest?._retry) {
    authStorage.accessToken = null;
    authStorage.expires = null;
    authStorage.refreshToken = null;

    window.location.replace('/login');

    return Promise.reject(errorData);
  }

  if (status === 401 && originalRequest) {
    originalRequest._retry = true;

    try {
      const { data } = await axios.post<RefreshMutationResponse>(
        `${import.meta.env.VITE_SECURITY_API_URL}/users/refresh-token`,
        {
          accessToken: authStorage.accessToken,
          refreshToken: authStorage.refreshToken,
        },
      );
      const { exp } = decode(data.accessToken) as { exp: number };

      authStorage.accessToken = data.accessToken;
      authStorage.expires = exp;
      authStorage.refreshToken = data.refreshToken;

      return axios(originalRequest);
    } catch {
      authStorage.accessToken = null;
      authStorage.expires = null;
      authStorage.refreshToken = null;
      window.location.replace('/login');

      return Promise.reject(errorData);
    }
  }

  return Promise.reject(errorData);
};
