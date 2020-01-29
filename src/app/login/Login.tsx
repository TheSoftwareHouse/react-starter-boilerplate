import React, { useState, useCallback } from 'react';
import { Redirect } from 'react-router-dom';
import { FieldValues, useForm } from 'react-hook-form';

import { useAuthDispatch, useAuthState } from 'hooks';
import {
  setAuthorized,
  setTokens,
  startAuthorizing,
  setUnauthorized,
} from 'context/auth/authActionCreators/authActionCreators';
import { authStorage } from 'context/auth/authStorage/AuthStorage';

import { AppRoute } from '../routes/AppRoute.enum';
import { LoginProps } from './Login.types';

/*
 * TODO:
 *   - create re-usable Input/Button components and replace inputs and/or button with them
 *     you can use React.forwardRef in order to pass reference to the proper element
 *     https://pl.reactjs.org/docs/forwarding-refs.html
 * */

export const Login: React.FC<LoginProps> = ({ fetchCurrentUser, onSubmit }) => {
  const { register, handleSubmit, errors } = useForm();
  const { isAuthorized, isAuthorizing } = useAuthState();

  const dispatch = useAuthDispatch();
  const [error, setError] = useState(false);

  const setAuthorizationError = useCallback(() => {
    setError(true);
    dispatch(setUnauthorized());
    authStorage.accessToken = null;
    authStorage.refreshToken = null;
  }, [dispatch]);

  const handleSubmitCallback = useCallback(
    async function handleSubmitCallback(body: FieldValues): Promise<void> {
      dispatch(startAuthorizing());

      const { payload, error: submitError } = await onSubmit(body);

      if (!submitError && payload) {
        const { accessToken, refreshToken } = payload;
        authStorage.accessToken = accessToken;
        authStorage.refreshToken = refreshToken;
        dispatch(setTokens(accessToken, refreshToken));

        const { payload: currentUser, error: fetchError } = await fetchCurrentUser(accessToken);

        if (!fetchError && currentUser) {
          dispatch(setAuthorized(currentUser));
        }

        if (fetchError) {
          setAuthorizationError();
        }
      }

      if (submitError) {
        setAuthorizationError();
      }
    },
    [dispatch, fetchCurrentUser, onSubmit, setAuthorizationError],
  );

  if (isAuthorized) {
    return <Redirect to={AppRoute.home} />;
  }

  return (
    <>
      <h2>Login</h2>
      {error && <div>Invalid username and/or password</div>}
      <form onSubmit={handleSubmit(handleSubmitCallback)}>
        <div>
          <label>
            username:
            <input name="username" ref={register({ required: true })} />
          </label>
          {errors.username && <span>This field is required</span>}
        </div>
        <div>
          <label>
            password:
            <input name="password" type="password" ref={register({ required: true })} />
          </label>
          {errors.password && <span>This field is required</span>}
        </div>
        <button type="submit" disabled={isAuthorizing}>
          submit
        </button>
      </form>
    </>
  );
};
