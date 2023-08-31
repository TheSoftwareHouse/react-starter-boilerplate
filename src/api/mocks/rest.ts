import { rest as baseRest } from 'msw';

const BASE_URL = import.meta.env.VITE_API_URL;

type BaseRest = typeof baseRest;
const createRestHandler = <MethodType extends keyof BaseRest>(method: MethodType): BaseRest[MethodType] => {
  const wrapperFn = ((...params: Parameters<BaseRest[MethodType]>) => {
    const [path, resolver] = params;

    const url = new RegExp('^(?:[a-z+]+:)?//', 'i').test(path.toString()) ? path : `${BASE_URL}${path}`;

    return baseRest[method](url, resolver);
  }) as BaseRest[MethodType];

  return wrapperFn;
};

export const rest = {
  head: createRestHandler('head'),
  get: createRestHandler('get'),
  post: createRestHandler('post'),
  put: createRestHandler('put'),
  delete: createRestHandler('delete'),
  patch: createRestHandler('patch'),
  options: createRestHandler('options'),
};
