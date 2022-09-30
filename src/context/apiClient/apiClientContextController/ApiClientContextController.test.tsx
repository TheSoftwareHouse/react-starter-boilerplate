import { ReactNode } from 'react';

import { render, screen } from 'tests';

import { ApiClientContextController } from './ApiClientContextController';

describe('ApiClientContextController', () => {
  const wrapper = ({ children }: { children?: ReactNode }) => <>{children}</>;

  test('renders its children', () => {
    render(
      <ApiClientContextController>
        <span>TEST</span>
      </ApiClientContextController>,
      { wrapper },
    );

    expect(screen.getByText(/TEST/)).toBeInTheDocument();
  });
});
