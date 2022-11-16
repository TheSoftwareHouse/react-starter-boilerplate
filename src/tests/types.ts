import { ReactNode } from 'react';

import { AppRoute } from 'routing/AppRoute.enum';

export type RouterConfig =
  | {
      withRouter: true;
      routerHistory: string[];
      path: AppRoute;
    }
  | { withRouter: false };

export type ExtraRenderOptions = {
  routerConfig?: RouterConfig;
};

export type WrapperProps = {
  children: ReactNode;
  routerConfig?: RouterConfig;
};
