import { ReactNode } from 'react';

export type RouterConfig = {
  routerPath?: string;
  currentPath?: string;
};

export type ExtraRenderOptions = {
  routerConfig?: RouterConfig;
};

export type WrapperProps = {
  children: ReactNode;
  routerConfig?: RouterConfig;
};
