import { routesAdapt } from '@/infra/adapters/routes';
import { listUsersHandler } from './list-users';

export const handler = routesAdapt([
  {
    path: '/users',
    method: 'GET',
    handler: listUsersHandler,
  },
]);
