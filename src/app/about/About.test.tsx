import { render, screen } from 'tests';

import { About } from './About';

describe('About', () => {
  test('renders heading', () => {
    render(<About />);
    const element = screen.getByText(/About/);
    expect(element).toBeInTheDocument();
  });
});
