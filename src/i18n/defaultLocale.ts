// see https://create-react-app.dev/docs/adding-custom-environment-variables
import { LocalesEnum } from './locales.enum';

export const defaultLocale: LocalesEnum = process.env.REACT_APP_DEFAULT_LOCALE as LocalesEnum;
