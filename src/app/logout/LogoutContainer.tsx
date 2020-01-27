import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import { useAuthDispatch } from 'hooks';
import { logout } from 'context/auth/authActionCreators/authActionCreators';

import { AppRoute } from '../routes/AppRoute.enum';

export const LogoutContainer: React.FC = () => {
  const dispatch = useAuthDispatch();

  useEffect(() => {
    dispatch(logout());
  }, [dispatch]);

  return <Redirect to={AppRoute.login} />;
};
