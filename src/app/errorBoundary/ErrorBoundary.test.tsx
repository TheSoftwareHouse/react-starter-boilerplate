import React from 'react';

import { render } from 'tests';

import { ErrorBoundary } from './ErrorBoundary';

describe('ErrorBoundary', () => {
  test('returns children when no error', () => {
    const { getByText } = render(<ErrorBoundary>children</ErrorBoundary>);
    const element = getByText(/children/);
    expect(element).toBeInTheDocument();
  });

  test('catches error inside children', () => {
    const spy = jest.spyOn(console, 'error');
    spy.mockImplementation(() => {});

    const ChildrenWithError = () => {
      throw new Error('bad');
    };

    const { getByText } = render(
      <ErrorBoundary>
        <ChildrenWithError />
      </ErrorBoundary>,
    );
    const element = getByText(/Something went wrong/);
    expect(element).toBeInTheDocument();

    spy.mockRestore();
  });
});
