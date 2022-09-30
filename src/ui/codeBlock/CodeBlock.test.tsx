import { render, screen } from 'tests';

import { CodeBlock } from './CodeBlock';

describe('CodeBlock', () => {
  test('renders its children', () => {
    render(<CodeBlock>TEST</CodeBlock>);
    const element = screen.getByText(/TEST/);
    expect(element).toBeInTheDocument();
  });

  test('passes down given className to the paragraph', () => {
    render(<CodeBlock className="foo">TEST</CodeBlock>);
    const element = screen.getByText(/TEST/);
    const parent = element.parentElement;
    expect(parent).toHaveClass('foo');
  });
});
