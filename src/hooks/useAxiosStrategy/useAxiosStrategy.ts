import { useCallback, useMemo } from 'react';
import Axios from 'axios';
import { QueryFunction } from 'react-query';

import { requestSuccessInterceptor } from '../../context/client/clientContextController/interceptors/requestInterceptors';
import {
  responseFailureInterceptor,
  responseSuccessInterceptor,
} from '../../context/client/clientContextController/interceptors/responseInterceptors';
import { ClientResponse } from '../../api/types/types';
import { ApiClientContextValue } from '../../context/apiClient/apiClientContext/ApiClientContext.types';

export const useAxiosStrategy = (): ApiClientContextValue => {
  const client = useMemo(() => {
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

  const queryFn: QueryFunction<ClientResponse> = useCallback(
    async ({ queryKey: [url] }) => {
      if (typeof url === 'string') {
        const lowerCaseUrl = url.toLowerCase();
        return await client.get<ClientResponse>(lowerCaseUrl);
      }
      throw new Error('Invalid QueryKey');
    },
    [client],
  );

  return {
    queryFn,
  };
};
