import Axios, { AxiosRequestConfig } from 'axios';
import { useMemo } from 'react';

import { AxiosContext } from '../axiosContext/AxiosContext';
import { authStorage } from '../../auth/authStorage/AuthStorage';

import { AxiosProviderProps } from './AxiosContextController.types';

export const AxiosContextController = ({ children }: AxiosProviderProps) => {
  const axios = useMemo(() => {
    const axios = Axios.create({
      headers: {
        'Content-Type': 'application/json',
      },
      baseURL: `${process.env.REACT_APP_API_URL}`,
    });

    axios.interceptors.request.use(
      (config: AxiosRequestConfig): AxiosRequestConfig => {
        if (authStorage.accessToken) {
          config.headers.Authorization = `Bearer ${authStorage.accessToken}`;
          config.withCredentials = true;
        }
        return config;
      },
    );

    axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        return Promise.reject(error);
      },
    );

    return axios;
  }, []);

  return <AxiosContext.Provider value={axios}>{children}</AxiosContext.Provider>;
};
