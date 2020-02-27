import React from 'react';
import ReactDOM from 'react-dom';

import 'assets/styles/main.css';
import { AppProviders } from 'providers/AppProviders';
import { mockServer } from 'api/mocks/mock-server';

import { App } from './app/App';
import * as serviceWorker from './serviceWorker';

if (+(process.env.REACT_APP_CI || 0) === 1 || process.env.NODE_ENV !== 'production') {
  mockServer();
}

if (process.env.NODE_ENV === 'development') {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const whyDidYouRender = require('@welldone-software/why-did-you-render');
  whyDidYouRender(React);
}

ReactDOM.render(
  <AppProviders>
    <App />
  </AppProviders>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
