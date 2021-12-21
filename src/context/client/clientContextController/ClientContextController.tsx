import React, { useCallback, useMemo } from 'react';
import Axios from 'axios';
import { QueryClient, QueryClientProvider, QueryFunction } from 'react-query';

import { ClientContext } from '../clientContext/ClientContext';
import { ClientResponse } from 'api/types/types';

import { requestSuccessInterceptor } from './interceptors/requestInterceptors';
import { responseFailureInterceptor, responseSuccessInterceptor } from './interceptors/responseInterceptors';
import { ClientProviderProps } from './ClientContextController.types';

export const ClientContextController = ({ children }: ClientProviderProps) => {
  const axios = useMemo(() => {
    const axios = Axios.create({
      headers: {
        'Content-Type': 'application/json',
      },
      baseURL: `${process.env.REACT_APP_API_URL}`,
    });

    axios.interceptors.request.use(requestSuccessInterceptor);
    axios.interceptors.response.use(responseSuccessInterceptor, responseFailureInterceptor);

    return axios;
  }, []);

  // This function will be used to fetch the data with react-query useQuery, useInfiniteQuery, useQueries methods
  // So the developers won't have to specify query function
  const queryFn: QueryFunction<ClientResponse> = useCallback(
    async ({ queryKey: [url] }) => {
      if (typeof url === 'string') {
        const lowerCaseUrl = url.toLowerCase();
        return await axios.get<ClientResponse>(lowerCaseUrl);
      }
      throw new Error('Invalid QueryKey');
    },
    [axios],
  );

  const queryClient = useMemo(() => {
    return new QueryClient({
      defaultOptions: {
        queries: {
          queryFn,
        },
      },
    });
  }, [queryFn]);

  return (
    <ClientContext.Provider value={axios}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </ClientContext.Provider>
  );
};
