import { Redirect, Route, Switch } from 'react-router-dom';

import { Home } from 'app/home/Home';
import { About } from 'app/about/About';
import { Help } from 'app/help/Help';

import { AppRoute } from './AppRoute.enum';

export const AppRoutes = () => {
  return (
    <Switch>
      <Route path={AppRoute.home} exact component={Home} />
      <Route path={AppRoute.about} component={About} />
      <Route path={AppRoute.help} component={Help} />

      <Redirect to={AppRoute.home} />
    </Switch>
  );
};
