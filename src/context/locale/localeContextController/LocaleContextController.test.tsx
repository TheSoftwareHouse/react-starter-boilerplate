import React from 'react';
import { render } from 'tests';

import { LocaleContext, LocaleContextController } from 'context/locale';
import { defaultLocale } from '../defaultLocale';
import { AppLocale } from '../AppLocale.enum';

describe('LocaleContextController', () => {
  const wrapper: React.FC = ({ children }) => <>{children}</>;

  const TestComponent: React.FC = () => {
    const context = React.useContext(LocaleContext);

    return (
      <>
        <button onClick={() => context?.setLocale(AppLocale.pl)}>SET LOCALE</button>
        <div title="CONTEXT">{JSON.stringify(context)}</div>
      </>
    );
  };

  test('renders its children', () => {
    const { getByText } = render(
      <LocaleContextController>
        <span>TEST</span>
      </LocaleContextController>,
      { wrapper },
    );

    expect(getByText(/TEST/)).toBeInTheDocument();
  });

  test('provides functioning locale context', () => {
    const { getByTitle, getByText } = render(
      <LocaleContextController>
        <TestComponent />
      </LocaleContextController>,
      { wrapper },
    );

    expect(getByTitle(/CONTEXT/)).toHaveTextContent(
      JSON.stringify({
        defaultLocale,
        locale: defaultLocale,
      }),
    );

    getByText(/SET LOCALE/).click();

    expect(getByTitle(/CONTEXT/)).toHaveTextContent(
      JSON.stringify({
        defaultLocale,
        locale: AppLocale.pl,
      }),
    );
  });
});
