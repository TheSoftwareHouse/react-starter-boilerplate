import { render, screen } from 'tests';

import { LocaleContext } from './LocaleContext';

describe('LocaleContext', () => {
  test('is undefined by default', () => {
    render(
      <LocaleContext.Consumer>{(context) => <div title="CONTEXT">{typeof context}</div>}</LocaleContext.Consumer>,
      {
        wrapper: ({ children }) => <>{children}</>,
      },
    );

    expect(screen.getByTitle(/CONTEXT/)).toHaveTextContent('undefined');
  });
});
