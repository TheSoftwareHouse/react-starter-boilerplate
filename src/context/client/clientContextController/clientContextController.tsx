import React, { useMemo } from 'react';
import { ClientContextProvider, createClient, RequestInterceptor, ResponseInterceptor } from 'react-fetching-library';

import { requestAuthInterceptor, requestHostInterceptor } from 'api/interceptors';
import { useAuthState } from 'hooks';
import { ClientProviderProps } from './clientContextController.types';

const requestInterceptors: RequestInterceptor[] = [];
const responseInterceptors: ResponseInterceptor[] = [];

export const ClientContextController: React.FC<ClientProviderProps> = ({ children }) => {
  const { accessToken } = useAuthState();

  const client = useMemo(() => {
    return createClient({
      requestInterceptors: [
        ...requestInterceptors,
        requestHostInterceptor(String(process.env.REACT_APP_API_URL)),
        requestAuthInterceptor(accessToken),
      ],
      responseInterceptors: [...responseInterceptors],
    });
  }, [accessToken]);

  return <ClientContextProvider client={client}>{children}</ClientContextProvider>;
};
