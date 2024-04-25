import { render, screen } from 'tests';

import { User } from './User';

describe('User', () => {
  test('renders params', async () => {
    render(<User />, { routerConfig: { routerPath: '/users/$id/', currentPath: '/users/1' } });
    const element = await screen.findByText(/"id": "1"/);
    expect(element).toBeInTheDocument();
  });
});
