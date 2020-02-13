import React from 'react';
import { render } from 'tests';

import { Home } from './Home';
import { LocaleContext } from '../../context/locale';

test('renders heading', () => {
  const { getByText } = render(<Home />);
  const element = getByText(/Home/);
  expect(element).toBeInTheDocument();
});

test('changes locale when "here" button is clicked', () => {
  const { getByText } = render(
    <LocaleContext.Consumer>
      {({ locale }) => (
        <>
          <span>LOCALE: {locale}</span>
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
