import { AppLocale } from '../context/locale/AppLocale.enum';
import enMessages from './data/en.json';
import plMessages from './data/pl.json';

type KeyAsValue<T> = { [P in keyof T]: P };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const keysToValues = <T extends Record<string, any>>(source: T): KeyAsValue<typeof source> => {
  return (Object.keys(source) as Array<keyof T>).reduce((accumulated, current) => {
    accumulated[current] = current;
    return accumulated;
  }, {} as KeyAsValue<typeof source>);
};

export const AppMessages = {
  ...keysToValues(enMessages),
  ...keysToValues(plMessages),
};

export const translations: Record<AppLocale, Record<keyof typeof AppMessages, string>> = {
  [AppLocale.en]: enMessages,
  [AppLocale.pl]: plMessages,
};
