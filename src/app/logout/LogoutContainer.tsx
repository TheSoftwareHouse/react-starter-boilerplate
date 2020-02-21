import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import { logout } from 'context/auth/authActionCreators/authActionCreators';
import { authStorage } from 'context/auth/authStorage/AuthStorage';

import { useAuthDispatch } from 'hooks/useAuthDispatch/useAuthDispatch';
import { AppRoute } from '../routes/AppRoute.enum';

export const LogoutContainer = () => {
  const dispatch = useAuthDispatch();

  useEffect(() => {
    authStorage.accessToken = null;
    authStorage.refreshToken = null;

    dispatch(logout());
  }, [dispatch]);

  return <Redirect to={AppRoute.login} />;
};
