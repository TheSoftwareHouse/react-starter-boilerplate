import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { RoutesEnum } from 'navigation/routes.enum';

import { Home } from './home/Home';
import { About } from './about/About';
import { Help } from './help/Help';

export const AppRoutes: React.FC = () => {
  return (
    <Switch>
      <Route exact path={RoutesEnum.home}>
        <Home />
      </Route>
      <Route path={RoutesEnum.about}>
        <About />
      </Route>
      <Route path={RoutesEnum.help}>
        <Help />
      </Route>
      <Redirect to={RoutesEnum.home} />
    </Switch>
  );
};
