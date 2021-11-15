export type LoginMutationArguments = {
  username: string;
  password: string;
};

export type LoginMutationResponse = {
  accessToken: string;
  tokenType: string;
  expires: number;
  refreshToken: string;
};

export type GetMeQueryResponse = {
  firstName: string;
  lastName: string;
  username: string;
};

export type GetUsersResponse = {
  id: number;
  name: string;
};
