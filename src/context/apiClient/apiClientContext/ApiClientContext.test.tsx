import { render, screen } from 'tests';

import { ApiClientContext } from './ApiClientContext';

describe('ApiClientContext', () => {
  test('correctly receive strategy', () => {
    render(
      <ApiClientContext.Consumer>{(context) => <div title="CONTEXT">{typeof context}</div>}</ApiClientContext.Consumer>,
      {
        wrapper: ({ children }) => <>{children}</>,
      },
    );

    expect(screen.getByTitle(/CONTEXT/)).toBeInTheDocument();
  });
});
