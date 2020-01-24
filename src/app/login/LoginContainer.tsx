import React, { useContext } from 'react';
import { ClientContext, useMutation } from 'react-fetching-library';

import { loginAction } from 'api/actions/auth/authActions';
import { fetchCurrentUserAction } from 'api/actions/user/userActions';
import { AuthorizeResponse, LoginPayload } from 'api/actions/auth/authActions.types';
import { FetchCurrentUserResponse } from 'api/actions/user/userActions.types';

import { Login } from './Login';

export const LoginContainer: React.FC = () => {
  const { query } = useContext(ClientContext);

  const { mutate } = useMutation<AuthorizeResponse, LoginPayload>(loginAction);
  const fetchCurrentUser = query<FetchCurrentUserResponse>(fetchCurrentUserAction());

  return <Login onSubmit={mutate} fetchCurrentUser={fetchCurrentUser} />;
};
