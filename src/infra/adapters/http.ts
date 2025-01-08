import { errorHandler } from '@/infra/middlewares/error-handler';
import { DefaultBody, HttpRequest, HttpResponse } from '@/types/http';
import middy from '@middy/core';
import httpJsonBodyParser from '@middy/http-json-body-parser';
import httpMultipartBodyParser from '@middy/http-multipart-body-parser';
import httpResponseSerializer from '@middy/http-response-serializer';

type Handler<TBody extends DefaultBody> = (event: HttpRequest<TBody>) => Promise<HttpResponse>;

export function httpAdapt<TBody extends DefaultBody>(handler: Handler<TBody>) {
  return middy()
    .use(httpJsonBodyParser({ disableContentTypeError: true }))
    .use(httpMultipartBodyParser({ disableContentTypeError: true }))
    .use(errorHandler())
    .use(
      httpResponseSerializer({
        defaultContentType: 'application/json',
        serializers: [
          {
            regex: /^application\/json$/,
            serializer: ({ body }) => JSON.stringify(body),
          },
        ],
      }),
    )
    .handler(handler as any);
}
