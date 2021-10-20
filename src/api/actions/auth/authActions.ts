import { AxiosInstance } from 'axios';

import { LoginActionArguments, LoginActionResponse } from './authActions.types';

export const loginAction = (client: AxiosInstance) => async (body: LoginActionArguments) =>
  await client.post<LoginActionResponse>('/authorize', body);
