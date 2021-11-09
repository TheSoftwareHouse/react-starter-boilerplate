export type HTTPMethod = 'GET' | 'DELETE' | 'HEAD' | 'OPTIONS' | 'POST' | 'PUT' | 'PATCH' | 'PURGE' | 'LINK' | 'UNLINK';

export type MutationHTTPMethod = 'DELETE' | 'POST' | 'PUT' | 'PATCH';

export type Query<TParams> = {
  endpoint: string;
  name: string;
  params: TParams;
};

export type QueryFn<TParams> = (params: TParams) => Query<TParams>;

export type Mutation<TParams> = {
  endpoint: string;
  name: string;
  params: TParams;
  method: MutationHTTPMethod;
};

export type MutationFn<TParams> = (params: TParams) => Mutation<TParams>;
