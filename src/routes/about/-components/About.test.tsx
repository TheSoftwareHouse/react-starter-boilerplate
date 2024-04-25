import { render, screen } from 'tests';

import { About } from './About';

describe('About', () => {
  test('renders heading', async () => {
    render(<About />);
    const element = await screen.findByText(/About/);
    expect(element).toBeInTheDocument();
  });
});
