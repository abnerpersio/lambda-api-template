import { RequestFile } from '@/types/file';
import { HttpRequest, UseCase } from '@/types/http';

type Data = {
  file: RequestFile;
};

export class UploadUseCase implements UseCase {
  async execute(request: HttpRequest<Data>): Promise<HttpResponse> {
    return {
      status: 200,
      data: {
        name: request.body.file?.filename,
      },
    };
  }
}
