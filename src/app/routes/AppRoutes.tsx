import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { Home } from '../home/Home';
import { About } from '../about/About';
import { Help } from '../help/Help';
import { LoginContainer } from '../login/LoginContainer';
import { LogoutContainer } from '../logout/LogoutContainer';

import { AppRoute } from './AppRoute.enum';

export const AppRoutes = () => {
  return (
    <Switch>
      <Route path={AppRoute.home} exact component={Home} />
      <Route path={AppRoute.about} component={About} />
      <Route path={AppRoute.help} component={Help} />

      <Route path={AppRoute.login} component={LoginContainer} />
      <Route path={AppRoute.logout} component={LogoutContainer} />

      <Redirect to={AppRoute.home} />
    </Switch>
  );
};
