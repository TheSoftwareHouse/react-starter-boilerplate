import React, { ReactNode } from 'react';

import { render } from 'tests';

import { ApiClientContextController } from './ApiClientContextController';

describe('ApiClientContextController', () => {
  const wrapper = ({ children }: { children?: ReactNode }) => <>{children}</>;

  test('renders its children', () => {
    const { getByText } = render(
      <ApiClientContextController>
        <span>TEST</span>
      </ApiClientContextController>,
      { wrapper },
    );

    expect(getByText(/TEST/)).toBeInTheDocument();
  });
});
