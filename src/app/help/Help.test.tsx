import React from 'react';

import { render } from 'tests';

import { Help } from './Help';

describe('Help', () => {
  test('renders heading', () => {
    const { getByText } = render(<Help />);
    const element = getByText(/Help/);
    expect(element).toBeInTheDocument();
  });
});
