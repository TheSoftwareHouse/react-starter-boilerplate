import React, { useEffect } from 'react';
import { useQuery } from 'react-fetching-library';

import { fetchCurrentUserAction } from 'api/actions/user/userActions';
import { Loader } from 'ui/loader/Loader';
import { useAuthDispatch } from 'hooks/useAuthDispatch/useAuthDispatch';
import { setAuthorized, setUnauthorized, startAuthorizing } from '../authActionCreators/authActionCreators';

import { UserControllerProps } from './UserController.types';

export const UserController = ({ children }: UserControllerProps) => {
  const dispatch = useAuthDispatch();

  const { loading, payload, error } = useQuery(fetchCurrentUserAction());

  useEffect(() => {
    dispatch(startAuthorizing());
  }, [dispatch]);

  useEffect(() => {
    if (!error && payload) {
      return dispatch(setAuthorized(payload));
    }

    return dispatch(setUnauthorized());
  }, [dispatch, error, payload]);

  if (loading) {
    return <Loader />;
  }

  return <>{children}</>;
};
