export type LoginPayload = {
  username?: string;
  password?: string;
};

export type AuthorizeResponse = {
  accessToken: string;
  tokenType: string;
  expires: number;
  refreshToken: string;
};
