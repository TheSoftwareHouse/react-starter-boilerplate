import { Fragment } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useUsers } from 'hooks/useUsers/useUsers';
import { CodeBlock } from 'ui/codeBlock/CodeBlock';

export const UsersList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data: usersResponse, isFetched: areUsersFetched } = useUsers({
    sort: searchParams.get('sort') as 'DESC' | 'ASC',
  });

  const sort = (type: 'DESC' | 'ASC') => {
    setSearchParams({ sort: type });
  };

  return (
    <>
      <h2>Users</h2>
      <div>This is an example how to use useSearchParams() from react-router</div>
      <div>
        Current sort (provided by{' '}
        <a href="https://reactrouter.com/en/main/hooks/use-search-params">useSearchParams()</a> hook)
        <CodeBlock>{JSON.stringify(searchParams.get('sort'))}</CodeBlock>
      </div>
      <div style={{ marginTop: '24px' }}>
        <button onClick={() => sort('DESC')}>Sort DESC</button>
        <button onClick={() => sort('ASC')}>Sort ASC</button>
        <ul>
          {areUsersFetched &&
            usersResponse?.pages.map((page, index) => {
              return (
                <Fragment key={index}>
                  {page.users.map((user) => {
                    return <li key={user.id}>{user.name}</li>;
                  })}
                </Fragment>
              );
            })}
        </ul>
      </div>
    </>
  );
};
