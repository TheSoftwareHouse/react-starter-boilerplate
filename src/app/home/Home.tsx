import React from 'react';
import { Link } from 'react-router-dom';

import { useAuthState } from 'hooks';
import { LocationInfo } from 'ui/locationInfo/LocationInfo';
import { LocalesEnum } from 'i18n/locales.enum';
import { useI18n } from 'i18n/useI18n/useI18n';
import { AppRoute } from '../routes/AppRoute.enum';

export const Home: React.FC = () => {
  const { formatMessage, locale, setLocale } = useI18n();
  const { user } = useAuthState();

  return (
    <>
      <h2>Home</h2>
      <p>
        {formatMessage({ id: 'home.helloWorld' })}
        <span style={{ margin: '0 1rem' }}>&#x2190;</span>
        This text is translated using{' '}
        <a href="https://github.com/formatjs/react-intl/blob/master/docs/API.md#formatmessage">
          <code>formatMessage</code>
        </a>{' '}
        function from <a href="https://github.com/formatjs/react-intl">react-intl</a>. Click{' '}
        <button
          style={{ fontSize: 'inherit' }}
          onClick={() => setLocale(locale === LocalesEnum.pl ? LocalesEnum.en : LocalesEnum.pl)}
        >
          here
        </button>{' '}
        to change language.
      </p>
      <p>This is a starter project for TSH React application. Click on navigation links above to learn more.</p>
      <hr />
      <LocationInfo />
      <hr />
      Current logged in user: {user?.username}{' '}
      {user?.username && (
        <>
          Click <Link to={AppRoute.logout}>here</Link> to log out
        </>
      )}
    </>
  );
};
