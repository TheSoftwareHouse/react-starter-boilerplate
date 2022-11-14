import { NavigateOptions as ReactNavigateOptions } from 'react-router-dom';

import { Split } from './split';

export type ParamsOnly<S extends string> = S extends `:${infer Rest}` ? Rest : never;

export type ParamsKeys<Path extends string> = ParamsOnly<Split<Path, '/'>>;

export type PathParams<Path extends string> = Record<ParamsKeys<Path>, string>;

export type HasParams<Path extends string> = ParamsKeys<Path> extends never ? false : true;

export type NavigateOptions<Params extends object> = { params: Params } & ReactNavigateOptions;
