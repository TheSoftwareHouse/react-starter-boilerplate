import { render, screen } from 'tests';

import { AuthContext } from './AuthContext';

describe('AuthContext', () => {
  test('is undefined by default', () => {
    render(<AuthContext.Consumer>{(context) => <div title="CONTEXT">{typeof context}</div>}</AuthContext.Consumer>, {
      wrapper: ({ children }) => <>{children}</>,
    });

    expect(screen.getByTitle(/CONTEXT/)).toHaveTextContent('undefined');
  });
});
