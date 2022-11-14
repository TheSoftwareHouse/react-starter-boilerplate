export type Split<
  S extends string,
  SplitBy extends string,
  Accumulator extends string = '',
> = S extends `${infer Head}${infer Rest}`
  ? Head extends SplitBy
    ? Accumulator | Split<Rest, SplitBy, ''>
    : Split<Rest, SplitBy, `${Accumulator}${Head}`>
  : Accumulator;
