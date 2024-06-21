import { useSearch, useNavigate } from '@tanstack/react-router';

import { CodeBlock } from 'ui/codeBlock/CodeBlock';
import { useQuery } from 'hooks/useQuery/useQuery';
import { UserSortType } from 'routes/users';
import { authQueries } from 'api/actions/auth/auth.queries';

export const UsersList = () => {
  const { sort, page } = useSearch({ from: '/users/' });
  const navigate = useNavigate();

  const { data: usersResponse, isFetched: areUsersFetched } = useQuery({
    ...authQueries.list({ page: page.toString() }),
    select: (data) => {
      return { ...data, users: data.users.sort((a, b) => (sort === 'desc' ? +b.id - +a.id : +a.id - +b.id)) };
    },
  });

  const sortUsers = (type: UserSortType) => {
    navigate({
      search: {
        sort: type,
      },
    });
  };

  const goToNextPage = () => {
    navigate({
      search: (prev) => ({
        ...prev,
        page: page + 1,
      }),
    });
  };

  const goToPrevPage = () => {
    const newPage = page <= 1 ? undefined : page - 1;

    navigate({
      search: (prev) => ({
        ...prev,
        page: newPage,
      }),
    });
  };

  return (
    <>
      <h2>Users</h2>
      <div>This is an example how to use useSearch() from tanstack-router</div>
      <div>
        Current searchParams (provided by{' '}
        <a
          href="https://tanstack.com/router/latest/docs/framework/react/guide/search-params#search-params-in-components"
          target="_blank"
          rel="noopener noreferrer"
        >
          useSearch()
        </a>{' '}
        hook)
        <CodeBlock>{JSON.stringify({ sort, page })}</CodeBlock>
      </div>
      <div style={{ marginTop: '24px' }}>
        <label htmlFor="sort">Sort by: </label>
        <select id="sort" onChange={(e) => sortUsers(e.target.value as UserSortType)}>
          <option value="asc">ASC</option>
          <option value="desc">DESC</option>
        </select>
        <ul>{areUsersFetched && usersResponse?.users.map((u) => <li key={u.id}>{u.name}</li>)}</ul>
        <button onClick={goToPrevPage} disabled={page <= 1}>
          Prev page
        </button>
        <button onClick={goToNextPage} disabled={!usersResponse?.nextPage}>
          Next page
        </button>
      </div>
    </>
  );
};
