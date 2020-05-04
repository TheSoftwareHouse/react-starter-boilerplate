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

export type RefreshTokenResponse = {
  accessToken: string;
  tokenType: string;
  refreshToken: string;
  expires: number;
};
