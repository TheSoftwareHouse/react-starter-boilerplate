import React, { useMemo } from 'react';
import { ClientContextProvider, createClient, RequestInterceptor, ResponseInterceptor } from 'react-fetching-library';

import { requestAuthInterceptor, requestHostInterceptor } from 'api/interceptors';
import { authorizeMock, fetchCurrentUserMock } from 'api/mocks';
import { useAuthState } from 'hooks';

import { ClientProviderProps } from './clientContextController.types';

const requestInterceptors: RequestInterceptor[] = [];
const responseInterceptors: ResponseInterceptor[] = [];

if (process.env.NODE_ENV === 'development') {
  responseInterceptors.push(authorizeMock);
  // eslint-disable-next-line no-console
  console.log('authorizeMock has been added!');

  responseInterceptors.push(fetchCurrentUserMock);
  // eslint-disable-next-line no-console
  console.log('fetchCurrentUserMock has been added!');
}

export const ClientContextController: React.FC<ClientProviderProps> = ({ children }) => {
  const { accessToken } = useAuthState();

  requestInterceptors.push(requestHostInterceptor(String(process.env.REACT_APP_API_URL)));
  requestInterceptors.push(requestAuthInterceptor(accessToken));

  const client = useMemo(() => {
    return createClient({
      requestInterceptors,
      responseInterceptors,
    });
  }, []);

  return <ClientContextProvider client={client}>{children}</ClientContextProvider>;
};
