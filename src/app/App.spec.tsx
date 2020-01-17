import React from 'react';
import { render } from 'test-utils';

import { App } from './App';

test('renders learn react link', () => {
  const { getByText } = render(<App />);
  const element = getByText(/Learn React/);
  expect(element).toBeInTheDocument();
});
