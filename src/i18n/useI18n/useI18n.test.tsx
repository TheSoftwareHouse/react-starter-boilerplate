import { renderHook } from '@testing-library/react-hooks';
import { IntlProvider } from 'react-intl';
import React from 'react';
import { useI18n } from './useI18n';

test('throws when locale context is unavailable', () => {
  const { result } = renderHook(() => useI18n(), {
    wrapper: ({ children }) => (
      <IntlProvider onError={() => {}} locale="">
        {children}
      </IntlProvider>
    ),
  });

  expect(result.error).toBeTruthy();
});
