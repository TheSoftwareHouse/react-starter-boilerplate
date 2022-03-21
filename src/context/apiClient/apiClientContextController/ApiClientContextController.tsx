import React, { useMemo } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

import { useAxiosStrategy } from '../../../hooks/useAxiosStrategy/useAxiosStrategy';
import { ApiClientContext } from '../apiClientContext/ApiClientContext';
import { ApiClientContextValue } from '../apiClientContext/ApiClientContext.types';

import { ApiClientControllerProps } from './ApiClientContextController.types';

export const ApiClientContextController = ({ children }: ApiClientControllerProps) => {
  const { queryFn } = useAxiosStrategy();

  const queryClient = useMemo(() => {
    return new QueryClient({
      defaultOptions: {
        queries: {
          queryFn,
        },
      },
    });
  }, [queryFn]);

  const ctxValue: ApiClientContextValue = useMemo(
    () => ({
      queryFn,
    }),
    [queryFn],
  );

  return (
    <ApiClientContext.Provider value={ctxValue}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </ApiClientContext.Provider>
  );
};
