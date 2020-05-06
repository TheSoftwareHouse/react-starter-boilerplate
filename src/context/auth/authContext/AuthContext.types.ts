import { Dispatch } from 'react';

import { AuthAction, User } from '../authReducer/authReducer.types';

export type AuthStateContextType = {
  isAuthorized: boolean;
  isAuthorizing: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  expires: number | null;
  user?: User;
};

export type AuthDispatchContextType = Dispatch<AuthAction>;
