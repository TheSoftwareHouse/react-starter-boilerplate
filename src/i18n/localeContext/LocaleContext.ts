import React from 'react';

import { LocaleContextValueType } from './LocaleContext.types';

export const LocaleContext = React.createContext<LocaleContextValueType | undefined>(undefined);
