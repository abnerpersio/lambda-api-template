import { httpAdapt } from '@/infra/adapters/http';
import { randomUUID } from 'node:crypto';

export const listUsersHandler = httpAdapt(async () => {
  return {
    status: 200,
    data: {
      data: [
        {
          id: randomUUID(),
          name: 'Test',
        },
      ],
    },
  };
});
