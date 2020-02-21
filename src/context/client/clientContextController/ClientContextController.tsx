import React, { useMemo } from 'react';
import { ClientContextProvider, createClient, RequestInterceptor, ResponseInterceptor } from 'react-fetching-library';

import { useAuthState } from 'hooks/useAuthState/useAuthState';
import { requestAuthInterceptor } from 'api/interceptors/requestAuthInterceptor/requestAuthInterceptor';
import { requestHostInterceptor } from 'api/interceptors/requestHostInterceptor/requestHostInterceptor';
import { ClientProviderProps } from './ClientContextController.types';

const requestInterceptors: RequestInterceptor[] = [];
const responseInterceptors: ResponseInterceptor[] = [];

export const ClientContextController = ({ children }: ClientProviderProps) => {
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
