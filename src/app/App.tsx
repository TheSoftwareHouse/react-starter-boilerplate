import React from 'react';
import { Link } from 'react-router-dom';

import { AppRoutes } from './routes/AppRoutes';
import { AppRoute } from './routes/AppRoute.enum';
import { AppProviders } from './providers/AppProviders';

import logo from './assets/images/logo.svg';

import './App.css';

export const App: React.FC = () => {
  return (
    <AppProviders>
      <div className="app">
        <header className="app__header">
          <img src={logo} className="app__logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a className="app__link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
            Learn React
          </a>
        </header>
        <nav className="app__navigation">
          <ul className="app__menu">
            <li className="app__menu-item">
              <Link className="app__menu-link" to={AppRoute.home}>
                Home
              </Link>
            </li>
            <li className="app__menu-item">
              <Link className="app__menu-link" to={AppRoute.about}>
                About
              </Link>
            </li>
            <li className="app__menu-item">
              <Link className="app__menu-link" to={AppRoute.help}>
                Help
              </Link>
            </li>
            <li className="app__menu-item">
              <Link className="app__menu-link" to={AppRoute.login}>
                Login
              </Link>
            </li>
          </ul>
        </nav>
        <main className="app__main">
          <AppRoutes />
        </main>
      </div>
    </AppProviders>
  );
};
