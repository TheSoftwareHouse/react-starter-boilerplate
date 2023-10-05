import { PrimitiveType } from 'react-intl';

import { Translation } from 'i18n/messages';

export type TranslationProps = {
  id: Translation;
  values?: Record<string, PrimitiveType>;
};
