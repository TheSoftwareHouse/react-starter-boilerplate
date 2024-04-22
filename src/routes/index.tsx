import { createFileRoute } from '@tanstack/react-router';

import { Home } from 'routes/-components/Home';

export const Route = createFileRoute('/')({
  component: () => <Home />,
});
