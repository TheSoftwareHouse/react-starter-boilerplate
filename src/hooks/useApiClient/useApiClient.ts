import { useContext } from 'react';

import { ApiClientContext } from '../../context/apiClient/apiClientContext/ApiClientContext';

export const useApiClient = () => {
  const ctx = useContext(ApiClientContext);

  if (typeof ctx === 'undefined') {
    throw new Error('useApiClient hook is not wrapped by ApiClient provider');
  }

  return ctx;
};
