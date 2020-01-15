import React from 'react';

import { LocalesEnum } from "i18n/locales.enum";

import { LocaleContextValueType } from "./LocaleContext.types";

// see https://create-react-app.dev/docs/adding-custom-environment-variables
export const defaultLocale: LocalesEnum = process.env.REACT_APP_DEFAULT_LOCALE as LocalesEnum;

// default value for this context will never be used, it's here to prevent TypeScript from complaining
export const defaultValue = {
    defaultLocale,
    locale: defaultLocale,
    setLocale: () => {}
};

const LocaleContext = React.createContext<LocaleContextValueType>(defaultValue);

export default LocaleContext;