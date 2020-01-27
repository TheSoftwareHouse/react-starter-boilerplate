import { useContext } from 'react';

import { AuthStateContext } from 'context/auth';
import { AuthStateContextType } from 'context/auth/authContext/AuthContext.types';

export const useAuthState: () => AuthStateContextType = () => {
  const context = useContext(AuthStateContext);

  if (context === undefined) {
    throw new Error('useAuthState must be used within an AuthContextController');
  }

  return context;
};
