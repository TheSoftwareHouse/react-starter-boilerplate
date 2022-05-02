import { render } from 'tests';

import { ApiClientContext } from './ApiClientContext';

describe('ApiClientContext', () => {
  test('correctly receive strategy', () => {
    const { getByTitle } = render(
      <ApiClientContext.Consumer>{(context) => <div title="CONTEXT">{typeof context}</div>}</ApiClientContext.Consumer>,
      {
        wrapper: ({ children }) => <>{children}</>,
      },
    );

    expect(getByTitle(/CONTEXT/)).toBeInTheDocument();
  });
});
