import { AxiosResponse } from 'axios';

export type HTTPMethod = 'GET' | 'DELETE' | 'HEAD' | 'OPTIONS' | 'POST' | 'PUT' | 'PATCH' | 'PURGE' | 'LINK' | 'UNLINK';

export type MutationHTTPMethod = 'DELETE' | 'POST' | 'PUT' | 'PATCH';

export type ClientResponse<TResponse> = AxiosResponse<TResponse>;
