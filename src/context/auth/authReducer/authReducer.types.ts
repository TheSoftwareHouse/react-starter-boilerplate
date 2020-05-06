export type AuthAction = {
  type: string;
  user?: User;
  accessToken?: string;
  refreshToken?: string;
  expires?: number;
};

export type User = {
  username: string;
  firstName: string;
  lastName: string;
};
