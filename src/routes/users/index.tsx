import { SearchSchemaInput, createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';

import { UsersList } from 'routes/users/-components/UsersList';

const userSearchSchema = z.object({
  sort: z.enum(['asc', 'desc']).catch('asc'),
  page: z.number().catch(1),
});

export type UserSearch = z.infer<typeof userSearchSchema>;

export const Route = createFileRoute('/users/')({
  component: () => <UsersList />,
  validateSearch: (search: { sort?: string; page?: number } & SearchSchemaInput) => userSearchSchema.parse(search),
});
