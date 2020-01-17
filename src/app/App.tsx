import React from 'react';
import { Link } from "react-router-dom";

import { RoutesEnum } from "navigation/routes.enum";

import './App.css';
import { AppRoutes } from './AppRoutes';

import logo from './assets/logo.svg';

export const App: React.FC = () => {
  return (
    <div className="app">
      <header className="app__header">
        <img src={logo} className="app__logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="app__link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <nav className="app__navigation">
        <ul className="app__menu">
          <li className="app__menu-item">
            <Link className="app__menu-link" to={RoutesEnum.home}>Home</Link>
          </li>
          <li className="app__menu-item">
            <Link className="app__menu-link" to={RoutesEnum.about}>About</Link>
          </li>
          <li className="app__menu-item">
            <Link className="app__menu-link" to={RoutesEnum.help}>Help</Link>
          </li>
        </ul>
      </nav>
      <main className="app__main">
        <AppRoutes />
      </main>
    </div>
  );
};
