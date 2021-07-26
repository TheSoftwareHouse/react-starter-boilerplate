import { AxiosInstance, AxiosResponse } from 'axios';

import { LoginActionArguments, LoginActionResponse } from './authActions.types';

export const loginAction = (client: AxiosInstance) => async ({ username, password }: LoginActionArguments) => {
  const response = await client.post<LoginActionResponse>('/authorize', { username, password });
  return response;
};
