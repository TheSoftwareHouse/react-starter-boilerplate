import React from 'react';

import { defaultLocale } from 'i18n/defaultLocale';

import { LocaleContextValueType } from './LocaleContext.types';

// default value for this context will never be used, it's here to prevent TypeScript from complaining
const defaultValue = {
  defaultLocale,
  locale: defaultLocale,
  setLocale: () => {},
};

export const LocaleContext = React.createContext<LocaleContextValueType>(defaultValue);
