import { createLazyFileRoute } from '@tanstack/react-router';

import { Help } from 'routes/help/-components/Help';

export const Route = createLazyFileRoute('/help/')({
  component: () => <Help />,
});
