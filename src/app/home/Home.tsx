import { Fragment } from 'react';

import { AppRoute } from 'routing/AppRoute.enum';
import { AppLocale } from 'context/locale/AppLocale.enum';
import { useLocale } from 'hooks/useLocale/useLocale';
import { useAuth } from 'hooks/useAuth/useAuth';
import { useUsers } from 'hooks/useUsers/useUsers';
import { useNavigate } from 'hooks/useNavigate/useNavigate';
import { Translation } from 'ui/translation/Translation';
import { LocationInfo } from 'ui/locationInfo/LocationInfo';

export const Home = () => {
  const { locale, setLocale } = useLocale();
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
        <Translation id="home.helloWorld" />
        <span style={{ margin: '0 1rem' }}>&#x2190;</span>
        <span>
          This text is translated using <strong>Translation</strong> component.
        </span>
        <span>Click </span>
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
