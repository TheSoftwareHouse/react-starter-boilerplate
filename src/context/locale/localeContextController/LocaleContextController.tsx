import React, { useState } from 'react';
import { IntlProvider } from 'react-intl';

import { LocaleContext } from 'context/locale';
import { defaultLocale } from 'context/locale/defaultLocale';
import { AppLocale } from 'context/locale/AppLocale.enum';
import { messages } from 'i18n/messages';

export const LocaleContextController: React.FC = ({ children }) => {
  const [locale, setLocale] = useState<AppLocale>(defaultLocale);

  return (
    <IntlProvider defaultLocale={defaultLocale} locale={locale} messages={messages[locale]}>
      <LocaleContext.Provider value={{ defaultLocale, locale, setLocale }}>{children}</LocaleContext.Provider>
    </IntlProvider>
  );
};
