import type { PrimitiveType } from 'intl-messageformat/src/formatters';

import { AppLocale } from 'context/locale/AppLocale.enum';

import enMessages from './data/en.json';
import plMessages from './data/pl.json';

type KeyAsValue<T> = { [P in keyof T]: P };

const keysToValues = <T extends Record<string, string | unknown>>(source: T): KeyAsValue<typeof source> =>
  (Object.keys(source) as Array<keyof T>).reduce(
    (accumulated, current) => {
      accumulated[current] = current;
      return accumulated;
    },
    {} as KeyAsValue<typeof source>,
  );

export const AppMessages = {
  ...keysToValues(enMessages),
  ...keysToValues(plMessages),
};

export type Translation = keyof typeof AppMessages;

export type TranslateFn = (id: Translation, value?: Record<string, PrimitiveType>) => string;

export const translations: Record<AppLocale, Record<Translation, string>> = {
  [AppLocale.en]: enMessages,
  [AppLocale.pl]: plMessages,
};
