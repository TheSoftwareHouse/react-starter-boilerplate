import React from 'react';

import { render } from 'tests';

import { AxiosContext } from './AxiosContext';

describe('AxiosContext', () => {
  test('is axios by default', () => {
    const { getByTitle } = render(
      <AxiosContext.Consumer>{(context) => <div title="CONTEXT">{typeof context}</div>}</AxiosContext.Consumer>,
      {
        wrapper: ({ children }) => <>{children}</>,
      },
    );

    expect(getByTitle(/CONTEXT/)).toBeInTheDocument();
  });
});
