import { AxiosInstance } from 'axios';

import { LoginMutationArguments, LoginMutationResponse } from './authActions.types';

export const authMutations = {
  loginMutation: (client: AxiosInstance) => async (body: LoginMutationArguments) => {
    return (await client.post<LoginMutationResponse>('/authorize', body)).data;
  },
};
