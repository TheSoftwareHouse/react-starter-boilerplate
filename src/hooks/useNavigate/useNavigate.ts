import { NavigateOptions as ReactNavigateOptions, useNavigate as ReactUseNavigate } from 'react-router-dom';

import { HasParams, NavigateOptions, PathParams } from 'types/params-utils';

export const useNavigate = () => {
  const navigate = ReactUseNavigate();

  return <Path extends string>(
    ...[path, options]: HasParams<Path> extends true
      ? [path: Path, options: NavigateOptions<PathParams<Path>>]
      : [path: Path, options?: ReactNavigateOptions]
  ) => {
    let parsedPath: string = path;
    if (options && 'params' in options) {
      Object.entries(options.params).forEach(([key, value]) => {
        parsedPath = parsedPath.replace(`:${key}`, value as string);
      });
    }

    navigate(parsedPath);
  };
};
