import React, { useMemo } from 'react';
import { ClientContextProvider, createClient, RequestInterceptor, ResponseInterceptor } from 'react-fetching-library';

import { useAuthState } from 'hooks/useAuthState/useAuthState';
import { requestAuthInterceptor } from 'api/interceptors/requestAuthInterceptor/requestAuthInterceptor';
import { requestHostInterceptor } from 'api/interceptors/requestHostInterceptor/requestHostInterceptor';
import { useAuthDispatch } from '../../../hooks/useAuthDispatch/useAuthDispatch';
import { responseRefreshTokenInterceptor } from '../../../api/interceptors/responseRefreshTokenInterceptor/responseRefreshTokenInterceptor';

import { ClientProviderProps } from './ClientContextController.types';

const requestInterceptors: RequestInterceptor[] = [];
const responseInterceptors: ResponseInterceptor[] = [];

export const ClientContextController = ({ children }: ClientProviderProps) => {
  const { accessToken, refreshToken } = useAuthState();
  const dispatch = useAuthDispatch();

  const baseUrl = String(process.env.REACT_APP_API_URL);

  const client = useMemo(() => {
    return createClient({
      requestInterceptors: [
        ...requestInterceptors,
        requestHostInterceptor(baseUrl),
        requestAuthInterceptor(accessToken),
      ],
      responseInterceptors: [...responseInterceptors, responseRefreshTokenInterceptor(refreshToken ?? '', dispatch)],
    });
  }, [accessToken, baseUrl, dispatch, refreshToken]);

  return <ClientContextProvider client={client}>{children}</ClientContextProvider>;
};
