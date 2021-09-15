import React from 'react';

import { render } from 'tests';

import { ClientContext } from './ClientContext';

describe('ClientContext', () => {
  test('is axios by default', () => {
    const { getByTitle } = render(
      <ClientContext.Consumer>{(context) => <div title="CONTEXT">{typeof context}</div>}</ClientContext.Consumer>,
      {
        wrapper: ({ children }) => <>{children}</>,
      },
    );

    expect(getByTitle(/CONTEXT/)).toBeInTheDocument();
  });
});
