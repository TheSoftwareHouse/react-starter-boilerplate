import { LocalesEnum } from "i18n/locales.enum";

export type LocaleContextValueType = {
    defaultLocale: LocalesEnum,
    locale: LocalesEnum,
    setLocale: (locale: LocalesEnum) => void,
}