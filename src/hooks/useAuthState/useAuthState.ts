import { useContext } from 'react';

import { AuthStateContextType } from 'context/auth/authContext/AuthContext.types';
import { AuthStateContext } from 'context/auth/authContext/AuthContext';

export const useAuthState: () => AuthStateContextType = () => {
  const context = useContext(AuthStateContext);

  if (context === undefined) {
    throw new Error('useAuthState must be used within an AuthContextController');
  }

  return context;
};
