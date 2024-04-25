import { render, screen } from 'tests';

import { LocationInfo } from './LocationInfo';

describe('Location info', () => {
  test('renders current location data', async () => {
    render(<LocationInfo />, {
      routerConfig: { routerPath: '/foo' },
    });
    const element = await screen.findByText(/\/foo/);
    expect(element).toBeInTheDocument();
  });
});
