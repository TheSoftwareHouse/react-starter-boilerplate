import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { AuthContextController } from 'context/auth';
import { ClientContextController } from 'context/client';
import { LocaleContextController } from 'context/locale';
import { UserController } from '../user/UserController';

import { AppProvidersProps } from './AppProviders.types';

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
