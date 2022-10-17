import { LocaleContext } from 'context/locale/localeContext/LocaleContext';
import { render, act, screen } from 'tests';

import { Home } from './Home';

describe('Home', () => {
  test('renders heading', () => {
    render(<Home />);
    const element = screen.getByText(/Home/);
    expect(element).toBeInTheDocument();
  });

  test('changes locale when "here" button is clicked', () => {
    render(
      <LocaleContext.Consumer>
        {(value) => (
          <>
            <span>LOCALE: {value?.locale}</span>
            <Home />
          </>
        )}
      </LocaleContext.Consumer>,
    );

    const initialText = screen.getByText(/LOCALE/).textContent as string;

    act(() => screen.getByText(/here/).click());

    expect(screen.getByText(/LOCALE/)).not.toHaveTextContent(initialText);

    act(() => screen.getByText(/here/).click());

    expect(screen.getByText(/LOCALE/)).toHaveTextContent(initialText);
  });
});
