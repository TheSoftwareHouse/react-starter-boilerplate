import Axios from 'axios';
import { useMemo } from 'react';

import { ClientContext } from '../clientContext/ClientContext';

import { requestSuccessInterceptor } from './interceptors/requestInterceptors';
import { responseSuccessInterceptor, responseFailureInterceptor } from './interceptors/responseInterceptors';
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

  return <ClientContext.Provider value={axios}>{children}</ClientContext.Provider>;
};
