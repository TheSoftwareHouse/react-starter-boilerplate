
export type Action<TVariables> = {
  endpoint: string;
  name: string;
  params: TVariables;
};

export type ActionFn<TVariables> = (variables: TVariables) => Action<TVariables>;
