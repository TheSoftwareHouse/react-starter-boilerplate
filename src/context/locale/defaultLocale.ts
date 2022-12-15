// see https://create-react-app.dev/docs/adding-custom-environment-variables
import { AppLocale } from './AppLocale.enum';

export const defaultLocale: AppLocale = import.meta.env.VITE_DEFAULT_LOCALE as AppLocale;
