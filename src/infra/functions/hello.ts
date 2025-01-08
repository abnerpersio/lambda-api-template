import { httpAdapt } from '@/infra/adapters/http';

type Data = {
  name: string;
};

export const handler = httpAdapt<Data>(async (request) => {
  return {
    status: 200,
    data: {
      message: `Hello ${request.body.name}`,
    },
  };
});
