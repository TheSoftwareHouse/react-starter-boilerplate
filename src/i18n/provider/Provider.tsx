import React from "react";
import { IntlProvider } from "react-intl";

import Context, { defaultLocale } from 'i18n/localeContext/LocaleContext';
import messages from "i18n/messages/messages";
import { LocalesEnum } from "i18n/locales.enum";

const Provider: React.FC = ({ children }) => {
    const [locale, setLocale] = React.useState<LocalesEnum>(defaultLocale);

    return (
        <IntlProvider defaultLocale={defaultLocale} locale={locale} messages={messages[locale]}>
            <Context.Provider value={{ defaultLocale, locale, setLocale }}>{children}</Context.Provider>
        </IntlProvider>
    )
};

export default Provider;