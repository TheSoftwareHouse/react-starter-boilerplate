import React, { useEffect } from 'react';
import { useQuery } from 'react-fetching-library';

import { fetchCurrentUserAction } from 'api/actions/user/userActions';
import { setAuthorized, setUnauthorized, startAuthorizing } from 'context/auth/authActionCreators/authActionCreators';
import { useAuthDispatch, useAuthState } from 'hooks';
import { Loader } from 'ui/loader/Loader';

import { UserControllerProps } from './UserController.types';

export const UserController: React.FC<UserControllerProps> = ({ children }) => {
  const dispatch = useAuthDispatch();
  const { accessToken, isAuthorized, isAuthorizing } = useAuthState();

  const { loading, query } = useQuery(fetchCurrentUserAction(accessToken), false);
  console.log({loading, isAuthorized, isAuthorizing})
  useEffect(() => {
    dispatch(startAuthorizing());

    if (accessToken) {
      query().then(({ payload, error }) => {
        if (!error) {
          dispatch(setAuthorized(payload));
        } else {
          dispatch(setUnauthorized());
        }
      });
    } else {
      dispatch(setUnauthorized());
    }
  }, [accessToken, dispatch, query]);

  if (!isAuthorized && isAuthorizing) {
    return <Loader />;
  }

  return <>{children}</>;
};
