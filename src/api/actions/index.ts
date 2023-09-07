import { authMutations } from './auth/auth.mutations';
import { authQueries } from './auth/auth.queries';
// API_COLLECTION_IMPORTS

export const queries = {
  ...authQueries,
  // API_COLLECTION_QUERIES
} as const;

export type AxiosQueriesType = typeof queries;

export type AxiosInfiniteQueriesType = Pick<AxiosQueriesType, 'getUsersInfinite'>;

export const mutations = {
  ...authMutations,
  // API_COLLECTION_MUTATIONS
} as const;

export type AxiosMutationsType = typeof mutations;
