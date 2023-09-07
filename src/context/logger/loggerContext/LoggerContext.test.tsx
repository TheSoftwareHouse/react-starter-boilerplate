import { render, screen } from 'tests';

import { LoggerContext } from './LoggerContext';

describe('LoggerContext', () => {
  test('is undefined by default', () => {
    render(
      <LoggerContext.Consumer>{(context) => <div title="CONTEXT">{typeof context}</div>}</LoggerContext.Consumer>,
      {
        wrapper: ({ children }) => <>{children}</>,
      },
    );

    expect(screen.getByTitle(/CONTEXT/)).toHaveTextContent('undefined');
  });
});
