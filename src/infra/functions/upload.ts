import { httpAdapt } from '@/infra/adapters/http';
import { RequestFile } from '@/types/file';

type Data = {
  file: RequestFile;
};

export const handler = httpAdapt<Data>(async (request) => {
  return {
    status: 200,
    data: {
      name: request.body.file?.filename,
    },
  };
});
