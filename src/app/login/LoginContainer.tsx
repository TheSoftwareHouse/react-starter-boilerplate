import React, { useContext, useCallback } from 'react';
import { ClientContext, useMutation } from 'react-fetching-library';

import { loginAction } from 'api/actions/auth/authActions';
import { fetchCurrentUserAction } from 'api/actions/user/userActions';
import { AuthorizeResponse, LoginPayload } from 'api/actions/auth/authActions.types';
import { FetchCurrentUserResponse } from 'api/actions/user/userActions.types';

import { Redirect } from 'react-router-dom';
import { AppRoute } from 'app/routes/AppRoute.enum';
import {
  startAuthorizing,
  setTokens,
  setAuthorized,
  setUnauthorized,
} from 'context/auth/authActionCreators/authActionCreators';
import { FieldValues } from 'react-hook-form';
import { useAuthDispatch } from 'hooks/useAuthDispatch/useAuthDispatch';
import { useAuthState } from 'hooks/useAuthState/useAuthState';
import { Login } from './Login';

export const LoginContainer = () => {
  const { query } = useContext(ClientContext);

  const { mutate } = useMutation<AuthorizeResponse, LoginPayload>(loginAction);
  const dispatch = useAuthDispatch();

  const { isAuthorized } = useAuthState();

  const onSubmit = useCallback(
    async (body: FieldValues): Promise<boolean> => {
      dispatch(startAuthorizing());

      const { payload, error: submitError } = await mutate(body);
      if (!submitError && payload) {
        const { accessToken, refreshToken } = payload;
        dispatch(setTokens(accessToken, refreshToken));

        const { payload: currentUser, error: fetchError } = await query<FetchCurrentUserResponse>(
          fetchCurrentUserAction(accessToken),
        );

        if (!fetchError && currentUser) {
          dispatch(setAuthorized(currentUser));
          return true;
        }
      }
      dispatch(setUnauthorized());
      return false;
    },
    [dispatch, mutate, query],
  );

  if (isAuthorized) {
    return <Redirect to={AppRoute.home} />;
  }
  return <Login onSubmit={onSubmit} />;
};
