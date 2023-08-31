import { Link, Outlet } from 'react-router-dom';

import logo from 'assets/images/logo.svg';
import { AppRoute } from 'routing/AppRoute.enum';
import { ReactComponent as ViteLogo } from 'assets/images/vite-logo.svg';
import { ReactComponent as VitestLogo } from 'assets/images/vitest-logo.svg';
import './Layout.css';

export const Layout = () => {
  return (
    <div className="app">
      <header className="app__header">
        <img src={logo} className="app__logo" alt="logo" />
        <p>
          Edit <code>src/layout/Layout.tsx</code> and save to reload.
        </p>
        <a className="app__link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </a>
        <p style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <a className="app__link" href="https://vitejs.dev" target="_blank" rel="noopener noreferrer">
            <ViteLogo />
          </a>
          <a className="app__link" href="https://vitest.dev/" target="_blank" rel="noopener noreferrer">
            <VitestLogo />
          </a>
        </p>
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
            <Link className="app__menu-link" to={AppRoute.users}>
              Users
            </Link>
          </li>
          <li className="app__menu-item">
            <Link className="app__menu-link" to={AppRoute.help}>
              Help
            </Link>
          </li>
        </ul>
      </nav>
      <main className="app__main">
        <Outlet />
      </main>
    </div>
  );
};
