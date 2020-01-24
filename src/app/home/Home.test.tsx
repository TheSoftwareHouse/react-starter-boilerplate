import React from 'react';
import { render } from 'tests';

import { LocaleContext } from 'context/locale';

import { Home } from './Home';

describe('Home', () => {
  test('renders heading', () => {
    const { getByText } = render(<Home />);
    const element = getByText(/Home/);
    expect(element).toBeInTheDocument();
  });

  test('changes locale when "here" button is clicked', () => {
    const { getByText } = render(
      <LocaleContext.Consumer>
        {value => (
          <>
            <span>LOCALE: {value?.locale}</span>
            <Home />
          </>
        )}
      </LocaleContext.Consumer>,
    );

    const initialText = getByText(/LOCALE/).textContent;

    getByText(/here/).click();

    expect(getByText(/LOCALE/).textContent).not.toBe(initialText);

    getByText(/here/).click();

    expect(getByText(/LOCALE/).textContent).toBe(initialText);
  });
});
