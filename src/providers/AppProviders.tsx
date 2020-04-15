import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { UserController } from 'context/auth/userController/UserController';
import { LocaleContextController } from 'context/locale/localeContextController/LocaleContextController';
import { ClientContextController } from 'context/client/clientContextController/ClientContextController';
import { AuthContextController } from 'context/auth/authContextController/AuthContextController';
import { ErrorBoundary } from 'app/errorBoundary/ErrorBoundary';

import { AppProvidersProps } from './AppProviders.types';

export const AppProviders = ({ children }: AppProvidersProps) => (
  <LocaleContextController>
    <ErrorBoundary>
      <AuthContextController>
        <ClientContextController>
          <UserController>
            <Router>{children}</Router>
          </UserController>
        </ClientContextController>
      </AuthContextController>
    </ErrorBoundary>
  </LocaleContextController>
);
