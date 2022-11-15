import { useMemo } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { ApiClientContext } from 'context/apiClient/apiClientContext/ApiClientContext';
import { ApiClientContextValue } from 'context/apiClient/apiClientContext/ApiClientContext.types';
import axiosClient from 'api/axios';

import { ApiClientControllerProps } from './ApiClientContextController.types';

export const ApiClientContextController = ({ children }: ApiClientControllerProps) => {
  const queryClient = useMemo(
    () => new QueryClient({ defaultOptions: { queries: { refetchOnWindowFocus: false } } }),
    [],
  );

  const ctx: ApiClientContextValue = { client: axiosClient };

  return (
    <ApiClientContext.Provider value={ctx}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </ApiClientContext.Provider>
  );
};
