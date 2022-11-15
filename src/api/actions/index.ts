import { authMutations } from './auth/authActions.mutations';
import { authQueries } from './auth/authActions.queries';

export const queries = {
  ...authQueries,
} as const;

export type AxiosQueriesType = typeof queries;

export const mutations = {
  ...authMutations,
} as const;

export type AxiosMutationsType = typeof mutations;
