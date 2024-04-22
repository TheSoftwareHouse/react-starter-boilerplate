import { useParams, Link } from '@tanstack/react-router';

import { CodeBlock } from 'ui/codeBlock/CodeBlock';

export const User = () => {
  const params = useParams({ from: '/users/$id/' });

  return (
    <>
      <Link to="/about">tttt</Link>
      <h2>User</h2>
      <CodeBlock>Params extracted from url: {JSON.stringify(params, null, 4)}</CodeBlock>
    </>
  );
};
