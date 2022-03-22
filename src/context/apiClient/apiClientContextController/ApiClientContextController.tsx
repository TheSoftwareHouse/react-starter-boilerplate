import React, { useMemo } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

import { useAxiosStrategy } from 'hooks/useAxiosStrategy/useAxiosStrategy';
import { ApiClientContext } from 'context/apiClient/apiClientContext/ApiClientContext';
import { ApiClientContextValue } from 'context/apiClient/apiClientContext/ApiClientContext.types';
/** example of usage of another strategy **/
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useKyStrategy } from 'hooks/useKyStrategy/useKyStrategy';

import { ApiClientControllerProps } from './ApiClientContextController.types';

export const ApiClientContextController = ({ children }: ApiClientControllerProps) => {
  const { queryFn, mutationFn, infiniteQueryFn } = useAxiosStrategy();
  /** example of usage of another strategy **/
  // const { queryFn, mutationFn, infiniteQueryFn } = useKyStrategy();

  const queryClient = useMemo(() => {
    return new QueryClient({
      defaultOptions: {
        queries: {
          queryFn: queryFn(),
        },
      },
    });
  }, [queryFn]);

  const ctxValue: ApiClientContextValue = useMemo(
    () => ({
      queryFn,
      mutationFn,
      infiniteQueryFn,
    }),
    [queryFn, mutationFn, infiniteQueryFn],
  );

  return (
    <ApiClientContext.Provider value={ctxValue}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </ApiClientContext.Provider>
  );
};
