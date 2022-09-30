import { MemoryRouter as Router } from 'react-router';

import { render, screen } from 'tests';

import { LocationInfo } from './LocationInfo';

describe('Location info', () => {
  test('renders current location data', () => {
    render(<LocationInfo />, {
      wrapper: ({ children }) => <Router initialEntries={['/foo']}>{children}</Router>,
    });
    const element = screen.getByText(/\/foo/);
    expect(element).toBeInTheDocument();
  });
});
