import React, { ReactNode } from 'react';

import { render } from 'tests';

import { AxiosContextController } from './AxiosContextController';

describe('AxiosContextController', () => {
  const wrapper = ({ children }: { children?: ReactNode }) => <>{children}</>;

  test('renders its children', () => {
    const { getByText } = render(
      <AxiosContextController>
        <span>TEST</span>
      </AxiosContextController>,
      { wrapper },
    );

    expect(getByText(/TEST/)).toBeInTheDocument();
  });
});
