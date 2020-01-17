// see https://testing-library.com/docs/react-testing-library/setup#custom-render
import React from 'react';
import {MemoryRouter as Router} from "react-router-dom";
import {render, RenderOptions, RenderResult} from '@testing-library/react'
import { Queries } from "@testing-library/dom";
import { defaultLocale } from "./i18n/defaultLocale";
import { LocaleContext } from "./i18n/localeContext/LocaleContext";
import { IntlProvider } from "react-intl";
import { LocalesEnum } from "./i18n/locales.enum";

const Wrapper: React.FC = ({children}) => {
    const [locale, setLocale] = React.useState<LocalesEnum>(defaultLocale);

    return (
      <IntlProvider onError={() => {}} defaultLocale={defaultLocale} locale={locale}>
        <LocaleContext.Provider value={{ defaultLocale, locale, setLocale }}>
          <Router>
            {children}
          </Router>
        </LocaleContext.Provider>
      </IntlProvider>
    )
};

function customRender(ui: React.ReactElement, options?: Omit<RenderOptions, 'queries'>): RenderResult;
function customRender<Q extends Queries>(ui: React.ReactElement, options: RenderOptions<Q>): RenderResult<Q>;
function customRender<Q extends Queries>(ui: React.ReactElement, options?: RenderOptions<Q> | Omit<RenderOptions, 'queries'>): RenderResult<Q> | RenderResult {
    return render<Q>(ui, {wrapper: options?.wrapper ?? Wrapper, ...options})
}

// re-export everything
export * from '@testing-library/react'

// override render method
export {customRender as render}