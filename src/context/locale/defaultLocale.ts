// see https://create-react-app.dev/docs/adding-custom-environment-variables
import { AppLocale } from './AppLocale.enum';

export const defaultLocale: AppLocale = process.env.REACT_APP_DEFAULT_LOCALE as AppLocale;
