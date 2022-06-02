import { createContext } from 'react';

import { AuthContextValueType } from './AuthContext.types';

export const AuthContext = createContext<AuthContextValueType | undefined>(undefined);
