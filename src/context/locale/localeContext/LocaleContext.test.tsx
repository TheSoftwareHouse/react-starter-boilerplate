import React from 'react';

import { render } from 'tests';

import { LocaleContext } from './LocaleContext';

describe('LocaleContext', () => {
  test('is undefined by default', () => {
    const { getByTitle } = render(
      <LocaleContext.Consumer>{context => <div title="CONTEXT">{typeof context}</div>}</LocaleContext.Consumer>,
      {
        wrapper: ({ children }) => <>{children}</>,
      },
    );

    expect(getByTitle(/CONTEXT/)).toHaveTextContent('undefined');
  });
});
