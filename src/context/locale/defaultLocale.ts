// see https://vitejs.dev/guide/env-and-mode.html
import { AppLocale } from './AppLocale.enum';

export const defaultLocale: AppLocale = import.meta.env.VITE_DEFAULT_LOCALE as AppLocale;
