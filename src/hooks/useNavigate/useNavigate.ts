import { NavigateOptions as ReactNavigateOptions, useNavigate as ReactUseNavigate } from 'react-router-dom';

import { HasParams, NavigateOptions, PathParams } from 'types/params-utils';

export const useNavigate = () => {
  const navigate = ReactUseNavigate();

  return <Path extends string>(
    ...[path, options]: HasParams<Path> extends true
      ? [path: Path, options: NavigateOptions<PathParams<Path>>]
      : [path: Path, options?: ReactNavigateOptions]
  ) => {
    if (options && 'params' in options) {
      const parsedPath = Object.entries(options.params).reduce((acc, [key, value]) => {
        return acc.replace(`:${key}`, value as string);
      }, path as string);

      return navigate(parsedPath);
    }

    navigate(path);
  };
};
