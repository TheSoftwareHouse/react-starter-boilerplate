import { render, screen } from 'tests';

import { CodeBlock } from './CodeBlock';

describe('CodeBlock', () => {
  test('renders its children', async () => {
    render(<CodeBlock>TEST</CodeBlock>);
    const element = await screen.findByText(/TEST/);
    expect(element).toBeInTheDocument();
  });

  test('passes down given className to the paragraph', async () => {
    render(<CodeBlock className="foo">TEST</CodeBlock>);
    const element = await screen.findByText(/TEST/);
    const parent = element.parentElement;
    expect(parent).toHaveClass('foo');
  });
});
