import { Dispatch } from 'react';

import { AuthAction, User } from '../authReducer/authReducer.types';
import { LoginPayload } from 'api/actions/auth/authActions.types';

export type AuthStateContextType = {
  isAuthorized: boolean;
  isAuthorizing: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  user?: User;
  login: (body: LoginPayload) => Promise<boolean>;
};

export type AuthDispatchContextType = Dispatch<AuthAction>;
