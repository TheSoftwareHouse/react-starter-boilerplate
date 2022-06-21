import { IntlProvider } from 'react-intl';

import { renderHook } from 'tests';

import { useLocale } from './useLocale';

describe('useLocale', () => {
  test('throws when locale context is unavailable', () => {
    try {
      renderHook(() => useLocale(), {
        wrapper: ({ children }) => (
          <IntlProvider onError={() => {}} locale="">
            {children}
          </IntlProvider>
        ),
      });
    } catch (error) {
      expect(error).toEqual(Error('LocaleContext is unavailable, make sure you are using LocaleContextController'));
    }
  });
});
