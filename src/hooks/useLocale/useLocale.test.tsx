import { renderHook } from '@testing-library/react-hooks';
import { IntlProvider } from 'react-intl';

import { useLocale } from './useLocale';

describe('useLocale', () => {
  test('throws when locale context is unavailable', () => {
    const { result } = renderHook(() => useLocale(), {
      wrapper: ({ children }) => (
        <IntlProvider onError={() => {}} locale="">
          {children}
        </IntlProvider>
      ),
    });

    expect(result.error).toEqual(
      Error('LocaleContext is unavailable, make sure you are using LocaleContextController'),
    );
  });
});
