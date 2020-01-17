import React from 'react';
import { render } from 'test-utils';

import { CodeBlock } from './CodeBlock';

test('renders its children', () => {
    const { getByText } = render(<CodeBlock>TEST</CodeBlock>);
    const element = getByText(/TEST/);
    expect(element).toBeInTheDocument();
});

test('passes down given className to the first child element', () => {
    const { container } = render(<CodeBlock className="foo" />);
    expect(container.firstElementChild?.classList?.contains('foo')).toBe(true);
});
