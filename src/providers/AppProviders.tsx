import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { LocaleContextController } from 'context/locale/localeContextController/LocaleContextController';
import { ClientContextController } from 'context/client/clientContextController/ClientContextController';
import { AuthContextController } from 'context/auth/authContextController/AuthContextController';

import { AppProvidersProps } from './AppProviders.types';

export const AppProviders = ({ children }: AppProvidersProps) => (
  <LocaleContextController>
    <ClientContextController>
      <AuthContextController>
        <Router>{children}</Router>
      </AuthContextController>
    </ClientContextController>
  </LocaleContextController>
);
