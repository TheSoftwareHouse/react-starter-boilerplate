import { AxiosResponse } from 'axios';

export type MutationHTTPMethod = 'DELETE' | 'POST' | 'PUT' | 'PATCH';

export type ClientResponse<TResponse = unknown> = AxiosResponse<TResponse>;
