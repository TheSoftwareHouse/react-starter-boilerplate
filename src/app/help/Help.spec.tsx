import React from 'react';
import { render } from 'test-utils';

import Help from './Help';

test('renders heading', () => {
    const { getByText } = render(<Help />);
    const element = getByText(/Help/i);
    expect(element).toBeInTheDocument();
});
