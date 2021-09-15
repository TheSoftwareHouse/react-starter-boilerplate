import React, { ReactNode } from 'react';

import { render } from 'tests';

import { ClientContextController } from './ClientContextController';

describe('ClientContextController', () => {
  const wrapper = ({ children }: { children?: ReactNode }) => <>{children}</>;

  test('renders its children', () => {
    const { getByText } = render(
      <ClientContextController>
        <span>TEST</span>
      </ClientContextController>,
      { wrapper },
    );

    expect(getByText(/TEST/)).toBeInTheDocument();
  });
});
