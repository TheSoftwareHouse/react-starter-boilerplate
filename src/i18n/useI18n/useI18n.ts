import React from 'react';
import { IntlShape, useIntl } from 'react-intl';

import { LocaleContext } from 'i18n/localeContext/LocaleContext';
import { LocaleContextValueType } from 'i18n/localeContext/LocaleContext.types';

export const useI18n = (): IntlShape & LocaleContextValueType => {
  const intl = useIntl();
  const localeContext = React.useContext(LocaleContext);

  if (localeContext === undefined) {
    throw new Error('LocaleContext is unavailable, make sure you are using i18n provider component');
  }

  return {
    ...intl,
    ...localeContext,
  };
};
