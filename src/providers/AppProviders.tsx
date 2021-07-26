import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

import { LocaleContextController } from 'context/locale/localeContextController/LocaleContextController';
import { AxiosContextController } from '../context/axios/axiosContextController/AxiosContextController';
import { AuthContextController } from '../context/auth/authContextController/AuthContextController';

import { AppProvidersProps } from './AppProviders.types';

const queryClient = new QueryClient();

export const AppProviders = ({ children }: AppProvidersProps) => (
  <LocaleContextController>
    <AxiosContextController>
      <QueryClientProvider client={queryClient}>
        <AuthContextController>
          <Router>{children}</Router>
        </AuthContextController>
      </QueryClientProvider>
    </AxiosContextController>
  </LocaleContextController>
);
