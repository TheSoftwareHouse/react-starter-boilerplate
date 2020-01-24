import { AppLocale } from 'context/locale/AppLocale.enum';

import { messages } from './messages';

test('has object entries for all locales', () => {
  const value = Object.fromEntries(Object.entries(messages).map(entry => [entry[0], typeof entry[1]]));
  const expectedValue: Record<AppLocale, 'object'> = {
    [AppLocale.en]: 'object',
    [AppLocale.pl]: 'object',
  };

  expect(value).toEqual(expectedValue);
});
