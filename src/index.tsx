import React from 'react';
import ReactDOM from 'react-dom';

import { AppProviders } from 'app/providers/AppProviders';
import { App } from './app/App';

import * as serviceWorker from './serviceWorker';

import './app/assets/styles/main.css';

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
