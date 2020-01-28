import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import { useAuthDispatch } from 'hooks';
import { logout } from 'context/auth/authActionCreators/authActionCreators';

import { authStorage } from 'context/auth/authStorage/AuthStorage';
import { AppRoute } from '../routes/AppRoute.enum';

export const LogoutContainer: React.FC = () => {
  const dispatch = useAuthDispatch();

  authStorage.accessToken = null;
  authStorage.refreshToken = null;

  useEffect(() => {
    dispatch(logout());
  }, [dispatch]);

  return <Redirect to={AppRoute.login} />;
};
