import { AxiosResponse } from 'axios';

export const responseSuccessInterceptor = (response: AxiosResponse) => response;

export const responseFailureInterceptor = async (error: any) => Promise.reject(error); // eslint-disable-line @typescript-eslint/no-explicit-any
