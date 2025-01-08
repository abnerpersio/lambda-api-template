import { UploadUseCase } from '@/domain/upload/use-cases/upload';
import { httpAdapt } from '@/infra/adapters/http';

export const handler = httpAdapt(new UploadUseCase());
