import { useParams } from 'hooks/useParams/useParams';
import { AppRoute } from 'routing/AppRoute.enum';
import { CodeBlock } from 'ui/codeBlock/CodeBlock';

export const User = () => {
  const params = useParams<AppRoute.user>();

  return (
    <>
      <h2>User</h2>
      <CodeBlock>Params extracted from url: {JSON.stringify(params, null, 4)}</CodeBlock>
    </>
  );
};
