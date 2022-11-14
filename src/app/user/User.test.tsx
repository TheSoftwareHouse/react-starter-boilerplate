import { AppRoute } from 'routing/AppRoute.enum';
import { render, screen } from 'tests';

import { User } from './User';

describe('User', () => {
  test('renders params', async () => {
    render(<User />, {
      routerConfig: { routerHistory: ['users/1'], withRouter: true, path: AppRoute.user },
    });
    const element = screen.getByText(/"id": "1"/);
    expect(element).toBeInTheDocument();
  });
});
