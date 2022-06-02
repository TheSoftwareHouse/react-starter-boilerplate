import { Route, Routes } from 'react-router-dom';

import { Layout } from 'app/layout/Layout';
import { About } from 'app/about/About';
import { Help } from 'app/help/Help';
import { Home } from 'app/home/Home';

import { AppRoute } from './AppRoute.enum';

export const AppRoutes = () => (
  <Routes>
    <Route path={AppRoute.home} element={<Layout />}>
      <Route path={AppRoute.home} element={<Home />} />
      <Route path={AppRoute.about} element={<About />} />
      <Route path={AppRoute.help} element={<Help />} />
      <Route path="*" element={<Home />} />
    </Route>
  </Routes>
);
