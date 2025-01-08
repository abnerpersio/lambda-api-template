import { ListUsersUseCase } from '@/domain/users/use-cases/list-users';
import { httpAdapt } from '@/infra/adapters/http';
import { routesAdapt } from '@/infra/adapters/routes';

export const handler = routesAdapt([
  {
    path: '/users',
    method: 'GET',
    handler: httpAdapt(new ListUsersUseCase()),
  },
]);
