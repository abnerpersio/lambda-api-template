import { httpAdapt } from '../infra/adapters/http';
import { RequestFile } from '../types/file';

type Data = {
  file: RequestFile;
};

export const handler = httpAdapt<Data>(async (request) => {
  return {
    statusCode: 200,
    body: {
      name: request.body.file?.filename,
    },
  };
});
