// see https://testing-library.com/docs/react-testing-library/setup#custom-render
import { Queries } from '@testing-library/dom';
import { render, RenderOptions, RenderResult } from '@testing-library/react';
import { useState } from 'react';
import { IntlProvider } from 'react-intl';
import {
  RouterProvider,
  createRootRoute,
  Outlet,
  createRoute,
  createRouter,
  createMemoryHistory,
} from '@tanstack/react-router';

import { ApiClientContextController } from 'context/apiClient/apiClientContextController/ApiClientContextController';
import { AuthContext } from 'context/auth/authContext/AuthContext';
import { AppLocale } from 'context/locale/AppLocale.enum';
import { defaultLocale } from 'context/locale/defaultLocale';
import { LocaleContext } from 'context/locale/localeContext/LocaleContext';

import { ExtraRenderOptions, WrapperProps } from './types';

// @TODO: https://bitbucket.org/thesoftwarehouse/react-starter-boilerplate/pull-requests/5/rss-9-add-login-page/diff#comment-132626297
const _Wrapper = ({ children, routerConfig }: WrapperProps) => {
  const [locale, setLocale] = useState<AppLocale>(defaultLocale);
  const { routerPath = '/', currentPath = routerPath } = routerConfig || {};

  const rootRoute = createRootRoute({ component: () => <Outlet /> });

  const componentRoute = createRoute({
    path: routerPath,
    getParentRoute: () => rootRoute,
    component: () => children,
  });
  const router = createRouter({
    history: createMemoryHistory({
      initialEntries: [currentPath],
    }),
    routeTree: rootRoute.addChildren([componentRoute]),
  });

  return (
    <ApiClientContextController>
      <AuthContext.Provider
        value={{
          accessToken: null,
          refreshToken: null,
          expires: null,
          isAuthenticating: false,
          isAuthenticated: false,
          login: vi.fn(),
          logout: vi.fn(),
          user: undefined,
        }}
      >
        <IntlProvider onError={() => {}} defaultLocale={defaultLocale} locale={locale}>
          <LocaleContext.Provider value={{ defaultLocale, locale, setLocale }}>
            {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
            {/* @ts-ignore */}
            <RouterProvider router={router} />
          </LocaleContext.Provider>
        </IntlProvider>
      </AuthContext.Provider>
    </ApiClientContextController>
  );
};

function customRender(
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'queries'> & ExtraRenderOptions,
): RenderResult;
function customRender<Q extends Queries>(
  ui: React.ReactElement,
  options: RenderOptions<Q> & ExtraRenderOptions,
): RenderResult<Q>;
function customRender<Q extends Queries>(
  ui: React.ReactElement,
  options?: (RenderOptions<Q> | Omit<RenderOptions, 'queries'>) & ExtraRenderOptions,
): RenderResult<Q> | RenderResult {
  const Wrapper = ({ children }: Pick<WrapperProps, 'children'>) => (
    <_Wrapper routerConfig={options?.routerConfig}>{children}</_Wrapper>
  );

  return render<Q>(ui, { wrapper: options?.wrapper ?? Wrapper, ...options });
}

// re-export everything
export * from '@testing-library/react';
// override render method
export { customRender as render };
