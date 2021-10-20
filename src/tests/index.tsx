// see https://testing-library.com/docs/react-testing-library/setup#custom-render
import React, { ReactNode } from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { render, RenderOptions, RenderResult } from '@testing-library/react';
import { Queries } from '@testing-library/dom';
import { IntlProvider } from 'react-intl';

import { AppLocale } from '../context/locale/AppLocale.enum';
import { defaultLocale } from '../context/locale/defaultLocale';
import { LocaleContext } from '../context/locale/localeContext/LocaleContext';
// @TODO: https://bitbucket.org/thesoftwarehouse/react-starter-boilerplate/pull-requests/5/rss-9-add-login-page/diff#comment-132626297
const Wrapper = ({ children }: { children?: ReactNode }) => {
  const [locale, setLocale] = React.useState<AppLocale>(defaultLocale);

  return (
    <IntlProvider onError={() => {}} defaultLocale={defaultLocale} locale={locale}>
      <LocaleContext.Provider value={{ defaultLocale, locale, setLocale }}>
        <Router>{children}</Router>
      </LocaleContext.Provider>
    </IntlProvider>
  );
};

function customRender(ui: React.ReactElement, options?: Omit<RenderOptions, 'queries'>): RenderResult;
function customRender<Q extends Queries>(ui: React.ReactElement, options: RenderOptions<Q>): RenderResult<Q>;
function customRender<Q extends Queries>(
  ui: React.ReactElement,
  options?: RenderOptions<Q> | Omit<RenderOptions, 'queries'>,
): RenderResult<Q> | RenderResult {
  return render<Q>(ui, { wrapper: options?.wrapper ?? Wrapper, ...options });
}

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
