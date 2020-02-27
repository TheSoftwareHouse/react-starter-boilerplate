import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import { AppRoute } from 'routing/AppRoute.enum';
import { logout } from 'context/auth/authActionCreators/authActionCreators';
import { authStorage } from 'context/auth/authStorage/AuthStorage';
import { useAuthDispatch } from 'hooks/useAuthDispatch/useAuthDispatch';

export const LogoutContainer = () => {
  const dispatch = useAuthDispatch();

  useEffect(() => {
    authStorage.accessToken = null;
    authStorage.refreshToken = null;

    dispatch(logout());
  }, [dispatch]);

  return <Redirect to={AppRoute.login} />;
};
