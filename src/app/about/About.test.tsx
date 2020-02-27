import React from 'react';

import { render } from 'tests';

import { About } from './About';

test('renders heading', () => {
  const { getByText } = render(<About />);
  const element = getByText(/About/);
  expect(element).toBeInTheDocument();
});
