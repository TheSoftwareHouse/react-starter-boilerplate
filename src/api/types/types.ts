export type HTTPMethod = 'GET' | 'DELETE' | 'HEAD' | 'OPTIONS' | 'POST' | 'PUT' | 'PATCH' | 'PURGE' | 'LINK' | 'UNLINK';

export type MutationHTTPMethod = 'DELETE' | 'POST' | 'PUT' | 'PATCH';

export type Query<TParams> = {
  endpoint: string;
  name: string;
  params: TParams;
};

export type QueryFn<TParams> = (params: TParams) => Query<TParams>;

/** @TODO In order to type it correctly then it is needed to take a look at useMutation from RFL it must propagate response, params types to library */
export type Mutation<TParams, TResponse> = {
  endpoint: string;
  params: TParams;
  method: MutationHTTPMethod;
};

export type MutationFn<TParams = Record<string, unknown>> = (params: TParams) => Mutation<TParams>;
