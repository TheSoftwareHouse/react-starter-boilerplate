import { IntlProvider } from 'react-intl';

import { renderHook } from 'tests';

import { useLocale } from './useLocale';

describe('useLocale', () => {
  test('throws when locale context is unavailable', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});

    const renderFn = () =>
      renderHook(() => useLocale(), {
        wrapper: ({ children }) => (
          <IntlProvider onError={() => {}} locale="">
            {children}
          </IntlProvider>
        ),
      });
    expect(renderFn).toThrow('LocaleContext is unavailable, make sure you are using LocaleContextController');
  });
});
