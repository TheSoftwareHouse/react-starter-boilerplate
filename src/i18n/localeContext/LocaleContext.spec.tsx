import { render } from 'test-utils';
import React from 'react';

import { LocalesEnum } from 'i18n/locales.enum';

import { LocaleContext } from './LocaleContext';

test("has default value with a setter that doesn't work", () => {
  const { getByText } = render(
    <LocaleContext.Consumer>
      {({ locale, setLocale }) => (
        <>
          <span>LOCALE: {locale}</span>
          <button onClick={() => setLocale(LocalesEnum.pl)}>SET LOCALE</button>
        </>
      )}
    </LocaleContext.Consumer>,
    { wrapper: ({ children }) => <>{children}</> },
  );

  expect(getByText(/LOCALE: en/)).toBeInTheDocument();

  getByText(/SET LOCALE/).click();

  expect(getByText(/LOCALE: en/)).toBeInTheDocument();
});
