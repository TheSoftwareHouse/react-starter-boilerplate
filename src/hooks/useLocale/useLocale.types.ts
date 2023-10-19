import type { IntlShape } from 'react-intl';

import type { TranslateFn } from 'i18n/messages';
import type { LocaleContextValueType } from 'context/locale/localeContext/LocaleContext.types';

export type WithTranslateFn = {
  t: TranslateFn;
};

export type UseLocaleReturnType = () => IntlShape & LocaleContextValueType & WithTranslateFn;
