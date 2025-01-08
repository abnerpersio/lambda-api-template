import { errorHandler } from '@/infra/middlewares/error-handler';
import { DefaultData, HttpRequest, HttpResponse } from '@/types/http';
import middy from '@middy/core';
import httpJsonBodyParser from '@middy/http-json-body-parser';
import httpMultipartBodyParser from '@middy/http-multipart-body-parser';
import httpResponseSerializer from '@middy/http-response-serializer';
import type { APIGatewayProxyEventV2WithJWTAuthorizer } from 'aws-lambda';

type MiddyEvent = Omit<APIGatewayProxyEventV2WithJWTAuthorizer, 'body'> & {
  body?: Record<string, unknown>;
};

export type Handler<TData extends DefaultData, TParams = Record<string, string>> = (
  request: HttpRequest<TData, TParams>,
) => Promise<HttpResponse>;

function prepareResponseBody(result: HttpResponse) {
  if (!result.data && !result.message) return undefined;

  if (result.message) {
    return { message: result.message };
  }

  return { data: result.data };
}

export function httpAdapt<TData extends DefaultData, TParams = Record<string, string>>(
  handler: Handler<TData, TParams>,
) {
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
    .handler(async (event: APIGatewayProxyEventV2WithJWTAuthorizer) => {
      const { body, queryStringParameters, pathParameters, requestContext } = event as MiddyEvent;
      const userId = (requestContext.authorizer?.jwt?.claims?.username as string | null) ?? null;

      const result = await handler({
        query: queryStringParameters as Record<string, string>,
        params: pathParameters as TParams,
        body: body as TData,
        userId,
      });

      return {
        statusCode: result.status,
        body: prepareResponseBody(result),
      };
    });
}
