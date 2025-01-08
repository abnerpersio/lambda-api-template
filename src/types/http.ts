export type DefaultBody = Record<string, unknown> | undefined;

export type HttpRequest<TBody extends DefaultBody> = {
  body: TBody;
};

export type HttpResponse = {
  statusCode: number;
  body?: Record<string, unknown>;
};
