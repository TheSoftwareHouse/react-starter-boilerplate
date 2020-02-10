import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { ClientContextController } from 'context/client/clientContextController/clientContextController';
import { AuthContextController } from 'context/auth/authContextController/AuthContextController';
import { Provider as I18nProvider } from '../../i18n/provider/Provider';
import { UserController } from '../user/UserController';

import { AppProvidersProps } from './AppProviders.types';

export const AppProviders: React.FC<AppProvidersProps> = ({ children }) => (
  <I18nProvider>
    <AuthContextController>
      <ClientContextController>
        <UserController>
          <Router>{children}</Router>
        </UserController>
      </ClientContextController>
    </AuthContextController>
  </I18nProvider>
);
