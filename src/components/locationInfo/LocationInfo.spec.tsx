import React from 'react';
import { MemoryRouter as Router } from "react-router";
import { render } from 'test-utils';

import { LocationInfo } from './LocationInfo';

test('renders current location data', () => {
    const { getByText } = render(<LocationInfo>TEST</LocationInfo>, { wrapper: ({ children }) => <Router initialEntries={["/foo"]}>{children}</Router> });
    const element = getByText(/\/foo/i);
    expect(element).toBeInTheDocument();
});
