import { NavigateOptions as ReactNavigateOptions } from 'react-router-dom';

import { Split } from './split';

export type PathParams<Path extends string> = Record<ParamsOnly<Split<Path, '/'>>, string>;

export type ParamsOnly<S extends string> = S extends `:${infer Rest}` ? Rest : never;

export type GetParams<Path extends string> = ParamsOnly<Split<Path, '/'>>;

export type HasParams<Path extends string> = GetParams<Path> extends never ? false : true;

export type NavigateOptions<Params extends object> = { params: Params } & ReactNavigateOptions;
