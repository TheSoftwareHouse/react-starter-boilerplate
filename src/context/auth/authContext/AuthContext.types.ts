export type AuthContextValueType = {
  isAuthenticated: boolean;
  login: ({ password, username }: { password: string; username: string }) => void;
};
