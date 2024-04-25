import { render, screen } from 'tests';

import { Help } from './Help';

describe('Help', () => {
  test('renders heading', async () => {
    render(<Help />);

    const element = await screen.findByText(/Help/);
    expect(element).toBeInTheDocument();
  });
});
