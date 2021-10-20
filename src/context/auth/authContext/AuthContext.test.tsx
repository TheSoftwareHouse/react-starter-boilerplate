import React from 'react';

import { render } from 'tests';

import { AuthContext } from './AuthContext';

describe('AuthContext', () => {
  test('is undefined by default', () => {
    const { getByTitle } = render(
      <AuthContext.Consumer>{(context) => <div title="CONTEXT">{typeof context}</div>}</AuthContext.Consumer>,
      {
        wrapper: ({ children }) => <>{children}</>,
      },
    );

    expect(getByTitle(/CONTEXT/)).toHaveTextContent('undefined');
  });
});
