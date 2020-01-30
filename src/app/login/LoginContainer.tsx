import React, { useContext, useCallback } from 'react';
import { ClientContext, useMutation } from 'react-fetching-library';

import { loginAction } from 'api/actions/auth/authActions';
import { fetchCurrentUserAction } from 'api/actions/user/userActions';
import { AuthorizeResponse, LoginPayload } from 'api/actions/auth/authActions.types';
import { FetchCurrentUserResponse } from 'api/actions/user/userActions.types';

import { useAuthState, useAuthDispatch } from 'hooks';
import { Redirect } from 'react-router-dom';
import { AppRoute } from 'app/routes/AppRoute.enum';
import {
  startAuthorizing,
  setTokens,
  setAuthorized,
  setUnauthorized,
} from 'context/auth/authActionCreators/authActionCreators';
import { FieldValues } from 'react-hook-form';
import { Login } from './Login';

export const LoginContainer: React.FC = () => {
  const dispatch = useAuthDispatch();

  const { isAuthorized, login } = useAuthState();

  const onSubmit = login;

  if (isAuthorized) {
    return <Redirect to={AppRoute.home} />;
  }
  return <Login onSubmit={onSubmit} />;
};
