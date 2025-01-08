import { httpAdapt } from '../infra/adapters/http';

type Data = {
  name: string;
};

export const handler = httpAdapt<Data>(async (request) => {
  return {
    statusCode: 200,
    body: {
      message: `Hello ${request.body.name}`,
    },
  };
});
