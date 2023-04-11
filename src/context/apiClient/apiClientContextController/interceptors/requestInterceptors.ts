import { AxiosRequestHeaders, InternalAxiosRequestConfig } from 'axios';

import { authStorage } from 'context/auth/authStorage/AuthStorage';

export const requestSuccessInterceptor = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  if (authStorage.accessToken) {
    return {
      ...config,
      withCredentials: true,
      headers: {
        ...config.headers,
        Authorization: `Bearer ${authStorage.accessToken}`,
      } as AxiosRequestHeaders,
    };
  }
  return config;
};
