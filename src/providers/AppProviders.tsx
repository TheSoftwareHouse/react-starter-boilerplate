import { BrowserRouter as Router } from 'react-router-dom';

import { LocaleContextController } from 'context/locale/localeContextController/LocaleContextController';
import { AuthContextController } from 'context/auth/authContextController/AuthContextController';
import { ApiClientContextController } from '../context/apiClient/apiClientContextController/ApiClientContextController';

import { AppProvidersProps } from './AppProviders.types';

export const AppProviders = ({ children }: AppProvidersProps) => (
  <LocaleContextController>
    <ApiClientContextController>
      <AuthContextController>
        <Router>{children}</Router>
      </AuthContextController>
    </ApiClientContextController>
  </LocaleContextController>
);
