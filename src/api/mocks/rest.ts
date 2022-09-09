import { rest as baseRest } from 'msw';

const BASE_URL = process.env.REACT_APP_API_URL;

const createRestHandler = <MethodType extends keyof typeof baseRest>(
  method: MethodType,
): typeof baseRest[MethodType] => {
  const wrapperFn = ((...params: Parameters<typeof baseRest[MethodType]>) => {
    const [path, resolver] = params;

    const url = new RegExp('^(?:[a-z+]+:)?//', 'i').test(path.toString()) ? path : `/${BASE_URL}${path}`;

    return baseRest[method](url, resolver);
  }) as typeof baseRest[MethodType];

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
