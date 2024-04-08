import { type AxiosError, AxiosResponse } from 'axios';

import { getStandarizedApiError } from 'context/apiClient/apiClientContextController/apiError/apiError';

export const responseSuccessInterceptor = (response: AxiosResponse) => response;

export const responseFailureInterceptor = async (error: AxiosError<unknown>) =>
  Promise.reject(getStandarizedApiError(error));
