import React from 'react';
import {render} from 'test-utils';

import { LocaleContext } from "i18n/localeContext/LocaleContext";

import { Home } from './Home';

test('renders heading', () => {
    const {getByText} = render(<Home/>);
    const element = getByText(/Home/);
    expect(element).toBeInTheDocument();
});

test('changes locale when "here" button is clicked', () => {
    const {getByText} = render(
        <LocaleContext.Consumer>
            {({locale}) => (
                <>
                    <span>LOCALE: {locale}</span>
                    <Home/>
                </>
            )}
        </LocaleContext.Consumer>
    );

    const initialText = getByText(/LOCALE/).textContent;

    getByText(/here/).click();

    expect(getByText(/LOCALE/).textContent).not.toBe(initialText);

    getByText(/here/).click();

    expect(getByText(/LOCALE/).textContent).toBe(initialText);
});
