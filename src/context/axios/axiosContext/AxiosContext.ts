import { createContext } from 'react';
import axios, { AxiosInstance } from 'axios';

export const AxiosContext = createContext<AxiosInstance>(axios);
