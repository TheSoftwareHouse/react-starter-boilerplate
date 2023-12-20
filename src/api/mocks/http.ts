import { http as baseHttp } from 'msw';

const BASE_URL = import.meta.env.VITE_API_URL;

const createRestHandler = <MethodType extends keyof typeof baseHttp>(
  method: MethodType,
): (typeof baseHttp)[MethodType] => {
  const wrapperFn = ((...params: Parameters<(typeof baseHttp)[MethodType]>) => {
    const [path, resolver] = params;

    const url = new RegExp('^(?:[a-z+]+:)?//', 'i').test(path.toString()) ? path : `${BASE_URL}${path}`;

    return baseHttp[method](url, resolver);
  }) as (typeof baseHttp)[MethodType];

  return wrapperFn;
};

export const http = {
  head: createRestHandler('head'),
  get: createRestHandler('get'),
  post: createRestHandler('post'),
  put: createRestHandler('put'),
  delete: createRestHandler('delete'),
  patch: createRestHandler('patch'),
  options: createRestHandler('options'),
};
