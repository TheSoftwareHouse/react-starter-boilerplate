import { AxiosInstance } from 'axios';

import { BASE_URL } from 'api/axios';

import {
  LoginMutationArguments,
  LoginMutationResponse,
  // MUTATION_TYPE_IMPORTS
} from './auth.types';

export const authMutations = {
  loginMutation: (client: AxiosInstance) => async (body: LoginMutationArguments) => {
    return (await client.post<LoginMutationResponse>('/authorize', body)).data;
  },
  // MUTATION_FUNCTIONS_SETUP
};

export const refreshTokenUrl = `${BASE_URL}/users/refresh-token`;
