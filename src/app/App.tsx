import React from 'react';
import { Switch, Route, Link, Redirect } from "react-router-dom";

import './App.css';

import logo from './assets/logo.svg';
import About from './about/About';
import Help from './help/Help';
import Home from './home/Home';

const App: React.FC = () => {
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
            <Link className="app__menu-link" to="/">Home</Link>
          </li>
          <li className="app__menu-item">
            <Link className="app__menu-link" to="/about">About</Link>
          </li>
          <li className="app__menu-item">
            <Link className="app__menu-link" to="/help">Help</Link>
          </li>
        </ul>
      </nav>
      <main className="app__main">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/help">
            <Help />
          </Route>
          <Redirect to="/" />
        </Switch>
      </main>
    </div>
  );
};

export default App;
