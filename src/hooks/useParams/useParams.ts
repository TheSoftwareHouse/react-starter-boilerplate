import { useParams as ReactUseParams } from 'react-router-dom';

import { PathParams } from 'types/params-utils';
import { Simplify } from 'types/simplify';

function assertParamsAreValid<Path extends string>(
  params: ReturnType<typeof ReactUseParams<PathParams<Path>>>,
): asserts params is PathParams<Path> extends string ? never : PathParams<Path> {
  Object.entries(params).forEach(([param, paramValue]) => {
    if (paramValue === undefined) {
      throw new Error(`No param: ${param}, value: ${paramValue}`);
    }
  });
}

export const useParams = <Path extends string>() => {
  const params = ReactUseParams<PathParams<Path>>();
  assertParamsAreValid(params);
  return params as Simplify<typeof params>;
};
