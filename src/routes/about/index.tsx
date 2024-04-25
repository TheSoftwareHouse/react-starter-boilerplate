import { createFileRoute } from '@tanstack/react-router';

import { About } from 'routes/about/-components/About';

export const Route = createFileRoute('/about/')({
  component: () => <About />,
});
