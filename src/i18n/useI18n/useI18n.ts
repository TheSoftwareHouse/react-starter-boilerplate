import React from 'react';
import { IntlShape, useIntl } from 'react-intl';

import { LocaleContext } from 'i18n/localeContext/LocaleContext';
import { LocaleContextValueType } from 'i18n/localeContext/LocaleContext.types';

export const useI18n = (): IntlShape & LocaleContextValueType => {
  const intl = useIntl();
  const localeContext = React.useContext(LocaleContext);

  return {
    ...intl,
    ...localeContext,
  };
};
