import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

import './App.css';
import logo from './logo.svg';

import About from './about/About';
import Help from './help/Help';
import Home from './home/Home';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
        <nav className="App-navigation">
          <ul className="App-menu">
            <li className="App-menuItem">
              <Link className="App-menuLink" to="/">Home</Link>
            </li>
            <li className="App-menuItem">
              <Link className="App-menuLink" to="/about">About</Link>
            </li>
            <li className="App-menuItem">
              <Link className="App-menuLink" to="/help">Help</Link>
            </li>
          </ul>
        </nav>
        <main className="App-main">
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
    </Router>
  );
};

export default App;
