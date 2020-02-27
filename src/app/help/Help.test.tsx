import React from 'react';

import { render } from 'tests';

import { Help } from './Help';

test('renders heading', () => {
  const { getByText } = render(<Help />);
  const element = getByText(/Help/);
  expect(element).toBeInTheDocument();
});
