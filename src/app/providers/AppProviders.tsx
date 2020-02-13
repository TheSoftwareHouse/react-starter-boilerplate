import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { ClientContextController } from 'context/client/clientContextController/clientContextController';
import { AuthContextController } from 'context/auth/authContextController/AuthContextController';
import { UserController } from '../user/UserController';

import { AppProvidersProps } from './AppProviders.types';
import { LocaleContextController } from '../../context/locale';

export const AppProviders: React.FC<AppProvidersProps> = ({ children }) => (
  <LocaleContextController>
    <AuthContextController>
      <ClientContextController>
        <UserController>
          <Router>{children}</Router>
        </UserController>
      </ClientContextController>
    </AuthContextController>
  </LocaleContextController>
);
