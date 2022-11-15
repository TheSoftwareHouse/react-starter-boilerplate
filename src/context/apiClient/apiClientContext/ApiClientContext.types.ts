import { AxiosInstance } from 'axios';

export type ApiResponse<TData = unknown, TConfig = unknown> = {
  data: TData;
  config: TConfig | null;
};

export type ApiClientContextValue = {
  client: AxiosInstance;
};
