import React from 'react';

import { useLocale } from 'hooks/useLocale/useLocale';
import { AppLocale } from 'context/locale/AppLocale.enum';
import { AppMessages } from 'i18n/messages';
import { LocationInfo } from 'ui/locationInfo/LocationInfo';
import { useQuery } from '../../hooks/useQuery/useQuery';
import { getMeQuery } from '../../api/actions/auth/authActions';
import { useAuth } from '../../hooks/useAuth/useAuth';

export const Home = () => {
  const { formatMessage, locale, setLocale } = useLocale();
  const { login, isAuthenticated, isAuthenticating } = useAuth();

  const { data: meResponse, isLoading, isFetched } = useQuery('me', getMeQuery, { enabled: isAuthenticated });

  return (
    <>
      <h2>Home</h2>
      <p>
        {formatMessage({ id: AppMessages['home.helloWorld'] })}
        <span style={{ margin: '0 1rem' }}>&#x2190;</span>
        This text is translated using{' '}
        <a href="https://github.com/formatjs/react-intl/blob/master/docs/API.md#formatmessage">
          <code>formatMessage</code>
        </a>{' '}
        function from <a href="https://github.com/formatjs/react-intl">react-intl</a>. Click{' '}
        <button
          style={{ fontSize: 'inherit' }}
          onClick={() => setLocale(locale === AppLocale.pl ? AppLocale.en : AppLocale.pl)}
        >
          here
        </button>{' '}
        to change language.
      </p>
      <p>This is a starter project for TSH React application. Click on navigation links above to learn more.</p>
      <hr />
      <LocationInfo />
      <hr />
      <div>
        <p>User information &#129489;</p>
        <div style={{ marginBottom: '2rem' }}>
          <button
            disabled={isAuthenticating || isAuthenticated}
            onClick={() => login({ password: 'tsh-react-starter', username: 'tsh' })}
          >
            {isAuthenticating ? 'Logging in...' : 'Click to login'}
          </button>
        </div>
        {isLoading && <p>Loading...</p>}
        {isFetched && (
          <code style={{ background: '#BADA55', padding: '1rem' }}>{JSON.stringify(meResponse?.data, null, 2)}</code>
        )}
      </div>
    </>
  );
};
