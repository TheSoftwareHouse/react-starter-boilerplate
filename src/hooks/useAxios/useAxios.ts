import { useContext } from 'react';

import { AxiosContext } from '../../context/axios/axiosContext/AxiosContext';

export const useAxios = () => {
  const context = useContext(AxiosContext);

  if (context === undefined) {
    throw new Error('AuthContext must be within AuthProvider');
  }

  return context;
};
