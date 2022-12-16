// see https://testing-library.com/docs/react-testing-library/setup#custom-render
import { Queries } from '@testing-library/dom';
import { render, RenderOptions, RenderResult } from '@testing-library/react';
import { useState } from 'react';
import { IntlProvider } from 'react-intl';
import { MemoryRouter as Router, Route, Routes } from 'react-router-dom';

import { ApiClientContextController } from 'context/apiClient/apiClientContextController/ApiClientContextController';
import { AuthContext } from 'context/auth/authContext/AuthContext';
import { AppLocale } from 'context/locale/AppLocale.enum';
import { defaultLocale } from 'context/locale/defaultLocale';
import { LocaleContext } from 'context/locale/localeContext/LocaleContext';

import { ExtraRenderOptions, WrapperProps } from './types';

const RouterForTests = ({ children, routerConfig }: WrapperProps) => {
  if (routerConfig?.withRouter) {
    // need to prefix the route with / for memory router
    const initialEntries = routerConfig.routerHistory.map((historyItem) =>
      historyItem.startsWith('/') ? historyItem : `/${historyItem}`,
    );

    const path = routerConfig.path.startsWith('/') ? routerConfig.path : `/${routerConfig.path}`;

    return (
      <Router initialEntries={initialEntries}>
        <Routes>
          <Route path={path} element={children} />
        </Routes>
      </Router>
    );
  }

  return <Router>{children}</Router>;
};

// @TODO: https://bitbucket.org/thesoftwarehouse/react-starter-boilerplate/pull-requests/5/rss-9-add-login-page/diff#comment-132626297
const _Wrapper = ({ children, routerConfig = { withRouter: false } }: WrapperProps) => {
  const [locale, setLocale] = useState<AppLocale>(defaultLocale);

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
            <RouterForTests routerConfig={routerConfig}>{children}</RouterForTests>
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
