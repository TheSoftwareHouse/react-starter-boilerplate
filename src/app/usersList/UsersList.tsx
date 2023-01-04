import { Fragment } from 'react';
import { useSearchParams } from 'react-router-dom';

import { CodeBlock } from 'ui/codeBlock/CodeBlock';
import { useQuery } from 'hooks/useQuery/useQuery';

type SortType = 'asc' | 'desc';

export const UsersList = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const sort = searchParams.get('sort') as SortType;
  const page = searchParams.get('page');

  const { data: usersResponse, isFetched: areUsersFetched } = useQuery(
    'getUsersList',
    { page: page || undefined },
    {
      select: (data) => {
        return { ...data, users: data.users.sort((a, b) => (sort === 'desc' ? +b.id - +a.id : +a.id - +b.id)) };
      },
    },
  );

  const sortUsers = (type: SortType) => {
    setSearchParams((prev) => {
      prev.set('sort', type);
      prev.delete('page');
      return prev;
    });
  };

  const goToNextPage = () => {
    setSearchParams((prev) => {
      const current = prev.get('page');
      const nextPage = !!current ? +current + 1 : 1;
      prev.set('page', nextPage.toString());
      return prev;
    });
  };

  const goToPrevPage = () => {
    setSearchParams((prev) => {
      const current = prev.get('page');
      const prevPage = current !== null ? +current - 1 : 0;
      prev.set('page', prevPage.toString());
      return prev;
    });
  };

  return (
    <>
      <h2>Users</h2>
      <div>This is an example how to use useSearchParams() from react-router</div>
      <div>
        Current searchParams (provided by{' '}
        <a href="https://reactrouter.com/en/main/hooks/use-search-params">useSearchParams()</a> hook)
        <CodeBlock>{JSON.stringify({ sort: searchParams.get('sort'), page: searchParams.get('page') })}</CodeBlock>
      </div>
      <div style={{ marginTop: '24px' }}>
        <label htmlFor="sort">Sort by: </label>
        <select id="sort" onChange={(e) => sortUsers(e.target.value as SortType)}>
          <option value="asc">ASC</option>
          <option value="desc">DESC</option>
        </select>
        <ul>{areUsersFetched && usersResponse?.users.map((u) => <li key={u.id}>{u.name}</li>)}</ul>
        <button onClick={goToPrevPage} disabled={page === '0'}>
          Prev page
        </button>
        <button onClick={goToNextPage} disabled={!usersResponse?.nextPage}>
          Next page
        </button>
      </div>
    </>
  );
};
