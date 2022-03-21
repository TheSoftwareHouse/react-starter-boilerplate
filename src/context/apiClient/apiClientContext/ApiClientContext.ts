import { createContext } from 'react';

import { ApiClientContextValue } from './ApiClientContext.types';

export const ApiClientContext = createContext<ApiClientContextValue | null>(null);
