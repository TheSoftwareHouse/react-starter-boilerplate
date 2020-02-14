import { createContext } from 'react';

import { LocaleContextValueType } from './LocaleContext.types';

export const LocaleContext = createContext<LocaleContextValueType | undefined>(undefined);
