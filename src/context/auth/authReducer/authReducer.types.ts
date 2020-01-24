export type AuthAction = {
  type: string;
  user?: User;
  accessToken?: string;
  refreshToken?: string;
};

export type User = {
  username: string;
  firstName: string;
  lastName: string;
};
