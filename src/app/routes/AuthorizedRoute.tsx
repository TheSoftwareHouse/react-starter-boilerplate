import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { useAuthState } from 'hooks';

import { AppRoute } from './AppRoute.enum';
import { AuthorizedRouteProps } from './AuthorizedRoute.types';

export const AuthorizedRoute: React.FC<AuthorizedRouteProps> = props => {
  const { isAuthorized } = useAuthState();

  if (isAuthorized) {
    // eslint-disable-next-line react/jsx-props-no-spreading
    return <Route {...props} />;
  }

  return <Redirect to={AppRoute.login} />;
};
