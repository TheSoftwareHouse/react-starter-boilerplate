import { useContext } from 'react';

import { ClientContext } from 'context/client/clientContext/ClientContext';

export const useClient = () => {
  const context = useContext(ClientContext);

  if (context === undefined) {
    throw new Error('AuthContext must be within AuthProvider');
  }

  return context;
};
