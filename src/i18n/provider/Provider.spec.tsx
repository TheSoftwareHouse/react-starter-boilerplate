import React from "react";

import { render } from "test-utils";

import { Provider } from "./Provider";
import { LocaleContext } from "../localeContext/LocaleContext";
import { LocalesEnum } from "../locales.enum";
import { defaultLocale } from "../defaultLocale";

const wrapper: React.FC = ({ children }) => <>{children}</>;

const TestComponent: React.FC = () => {
  const context = React.useContext(LocaleContext);

  return (
    <>
      <button onClick={() => context.setLocale(LocalesEnum.pl)}>SET LOCALE</button>
      <div title="CONTEXT">{JSON.stringify(context)}</div>
    </>
  );
};

test('renders its children', () => {
  const { getByText } = render(<Provider><span>TEST</span></Provider>, { wrapper });

  expect(getByText(/TEST/)).toBeInTheDocument();
});

test('provides functioning locale context', () => {
  const { getByTitle, getByText } = render(<Provider><TestComponent /></Provider>, { wrapper });

  expect(getByTitle(/CONTEXT/)).toHaveTextContent(JSON.stringify({ defaultLocale, locale: defaultLocale }));

  getByText(/SET LOCALE/).click();

  expect(getByTitle(/CONTEXT/)).toHaveTextContent(JSON.stringify({ defaultLocale, locale: LocalesEnum.pl }));
});