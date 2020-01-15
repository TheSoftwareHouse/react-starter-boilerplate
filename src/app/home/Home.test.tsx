import React from 'react';
import { render } from 'test-utils';

import Home from './Home';

test('renders heading', () => {
    const { getByText } = render(<Home />);
    const element = getByText(/Home/i);
    expect(element).toBeInTheDocument();
});
