import { Fragment } from 'react';

import { useLocale } from 'hooks/useLocale/useLocale';
import { AppLocale } from 'context/locale/AppLocale.enum';
import { AppMessages } from 'i18n/messages';
import { LocationInfo } from 'ui/locationInfo/LocationInfo';
import { useAuth } from 'hooks/useAuth/useAuth';
import { useUsers } from '../../hooks/useUsers/useUsers';
import { AppRoute } from 'routing/AppRoute.enum';
import { useNavigate } from 'hooks/useNavigate/useNavigate';

export const Home = () => {
  const { formatMessage, locale, setLocale } = useLocale();
  const { user, login, logout, isAuthenticated, isAuthenticating } = useAuth();

  const {
    data: usersResponse,
    isFetching: isFetchingUsers,
    isFetched: areUsersFetched,
    hasNextPage: hasMoreUsers,
    fetchNextPage: loadMoreUsers,
    isFetchingNextPage,
  } = useUsers();

  const navigate = useNavigate();

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
      <div style={{ marginBottom: '2rem' }}>
        <p>User information &#129489;</p>
        <div style={{ marginBottom: '2rem', display: 'flex', gap: '16px' }}>
          <button
            disabled={isAuthenticating || isAuthenticated}
            onClick={() => login({ password: 'tsh-react-starter', username: 'tsh' })}
          >
            {isAuthenticating ? 'Logging in...' : 'Click to login'}
          </button>
          <button disabled={!isAuthenticated} onClick={logout}>
            Click to logout
          </button>
        </div>
        {isAuthenticating && <p>Loading data about you...</p>}
        {isAuthenticated && (
          <code style={{ background: '#BADA55', padding: '1rem' }}>{JSON.stringify(user, null, 2)}</code>
        )}
      </div>
      <div>
        <p>List of users &#129489;</p>
        <div style={{ marginBottom: '2rem' }}>
          <ul>
            {areUsersFetched &&
              usersResponse?.pages?.map((page, index) => (
                <Fragment key={index}>
                  {page.users?.map((user) => (
                    <li key={user.id}>
                      <button
                        onClick={() => {
                          navigate(AppRoute.user, { params: { id: user.id } });
                        }}
                      >
                        User {user.id}
                      </button>
                    </li>
                  ))}
                </Fragment>
              ))}
          </ul>
          {isFetchingNextPage && <p>Loading more users...</p>}
          <button disabled={isFetchingNextPage || isFetchingUsers || !hasMoreUsers} onClick={() => loadMoreUsers()}>
            Load more
          </button>
        </div>
      </div>
    </>
  );
};
