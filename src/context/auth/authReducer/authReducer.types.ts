export type AuthState = {
  accessToken: string | null;
  refreshToken: string | null;
  expires: number | null;
};
