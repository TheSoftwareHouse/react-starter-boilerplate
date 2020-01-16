import React from 'react';
import { render } from 'test-utils';

import App from './App';

test('renders learn react link', () => {
  const { getByText } = render(<App />);
  const element = getByText(/learn react/i);
  expect(element).toBeInTheDocument();
});
