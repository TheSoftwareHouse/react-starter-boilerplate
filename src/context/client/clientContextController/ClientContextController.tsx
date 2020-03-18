import React, { useMemo } from 'react';
import { ClientContextProvider, createClient, RequestInterceptor, ResponseInterceptor } from 'react-fetching-library';

import { useAuthState } from 'hooks/useAuthState/useAuthState';
import { requestAuthInterceptor } from 'api/interceptors/requestAuthInterceptor/requestAuthInterceptor';
import { requestHostInterceptor } from 'api/interceptors/requestHostInterceptor/requestHostInterceptor';
import { useAuthDispatch } from '../../../hooks/useAuthDispatch/useAuthDispatch';
import { requestTokenRefreshInterceptor } from '../../../api/interceptors/requestTokenRefreshInterceptor/requestTokenRefreshInterceptor';

import { ClientProviderProps } from './ClientContextController.types';

const requestInterceptors: RequestInterceptor[] = [];
const responseInterceptors: ResponseInterceptor[] = [];

export const ClientContextController = ({ children }: ClientProviderProps) => {
  const { accessToken, refreshToken, expires } = useAuthState();
  const dispatch = useAuthDispatch();

  const baseUrl = String(process.env.REACT_APP_API_URL);
  const refreshUrl = `${baseUrl}/refresh-token`;

  const client = useMemo(() => {
    return createClient({
      requestInterceptors: [
        ...requestInterceptors,
        requestHostInterceptor(baseUrl),
        requestAuthInterceptor(accessToken),
        requestTokenRefreshInterceptor(refreshUrl, { accessToken, refreshToken, expires }, dispatch),
      ],
      responseInterceptors: [...responseInterceptors],
    });
  }, [accessToken, baseUrl, dispatch, expires, refreshToken, refreshUrl]);

  return <ClientContextProvider client={client}>{children}</ClientContextProvider>;
};
