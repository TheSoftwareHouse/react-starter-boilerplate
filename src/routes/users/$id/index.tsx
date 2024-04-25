import { createFileRoute } from '@tanstack/react-router';

import { User } from 'routes/users/$id/-components/User';

export const Route = createFileRoute('/users/$id/')({
  component: () => <User />,
  validateSearch: {},
});
