import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

import { LocaleContextController } from 'context/locale/localeContextController/LocaleContextController';
import { ClientContextController } from '../context/client/clientContextController/ClientContextController';
import { AuthContextController } from '../context/auth/authContextController/AuthContextController';

import { AppProvidersProps } from './AppProviders.types';

const queryClient = new QueryClient();

export const AppProviders = ({ children }: AppProvidersProps) => (
  <LocaleContextController>
    <ClientContextController>
      <QueryClientProvider client={queryClient}>
        <AuthContextController>
          <Router>{children}</Router>
        </AuthContextController>
      </QueryClientProvider>
    </ClientContextController>
  </LocaleContextController>
);
