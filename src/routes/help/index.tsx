import { createFileRoute } from '@tanstack/react-router';

import { Help } from 'routes/help/-components/Help';

export const Route = createFileRoute('/help/')({
  component: () => <Help />,
});
