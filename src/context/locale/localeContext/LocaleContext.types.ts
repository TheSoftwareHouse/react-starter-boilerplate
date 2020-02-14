import { AppLocale } from '../AppLocale.enum';

export type LocaleContextValueType = {
  defaultLocale: AppLocale;
  locale: AppLocale;
  setLocale: (locale: AppLocale) => void;
};
