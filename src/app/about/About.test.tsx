import React from 'react';
import { render } from 'test-utils';

import About from './About';

test('renders heading', () => {
    const { getByText } = render(<About />);
    const element = getByText(/About/i);
    expect(element).toBeInTheDocument();
});
