import { ReactNode, useContext } from 'react';

import { act, render, screen } from 'tests';
import { AppLocale } from '../AppLocale.enum';
import { defaultLocale } from '../defaultLocale';
import { LocaleContext } from '../localeContext/LocaleContext';

import { LocaleContextController } from './LocaleContextController';

describe('LocaleContextController', () => {
  const wrapper = ({ children }: { children?: ReactNode }) => <>{children}</>;

  const TestComponent = () => {
    const context = useContext(LocaleContext);

    return (
      <>
        <button onClick={() => context?.setLocale(AppLocale.pl)}>SET LOCALE</button>
        <div title="CONTEXT">{JSON.stringify(context)}</div>
      </>
    );
  };

  test('renders its children', () => {
    render(
      <LocaleContextController>
        <span>TEST</span>
      </LocaleContextController>,
      { wrapper },
    );

    expect(screen.getByText(/TEST/)).toBeInTheDocument();
  });

  test('provides functioning locale context', () => {
    render(
      <LocaleContextController>
        <TestComponent />
      </LocaleContextController>,
      { wrapper },
    );

    expect(screen.getByTitle(/CONTEXT/)).toHaveTextContent(
      JSON.stringify({
        defaultLocale,
        locale: defaultLocale,
      }),
    );

    act(() => screen.getByText(/SET LOCALE/).click());

    expect(screen.getByTitle(/CONTEXT/)).toHaveTextContent(
      JSON.stringify({
        defaultLocale,
        locale: AppLocale.pl,
      }),
    );
  });
});
