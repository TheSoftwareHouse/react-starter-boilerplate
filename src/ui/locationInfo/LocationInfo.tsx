import { useRouterState } from '@tanstack/react-router';

import { CodeBlock } from 'ui/codeBlock/CodeBlock';

export const LocationInfo = () => {
  const location = useRouterState({ select: (state) => state.location });

  return (
    <div>
      <p>
        Current location (provided by{' '}
        <a href="https://reacttraining.com/react-router/web/api/Hooks/uselocation">
          <code>useLocation</code>
        </a>{' '}
        hook from <a href="https://github.com/ReactTraining/react-router">react-router</a>):
      </p>
      <CodeBlock>{JSON.stringify(location)}</CodeBlock>
    </div>
  );
};
