import { AxiosResponse } from 'axios';

export type MutationHTTPMethod = 'DELETE' | 'POST' | 'PUT' | 'PATCH';

// using Axios
export type ClientResponse<TResponse = unknown> = AxiosResponse<TResponse>;

//using Ky
// export type ClientResponse<TResponse = unknown> = TResponse;
