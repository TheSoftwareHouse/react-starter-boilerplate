export type LoginActionArguments = {
  username: string;
  password: string;
};

export type LoginActionResponse = {
  accessToken: string;
  tokenType: string;
  expires: number;
  refreshToken: string;
};
