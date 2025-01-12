import { errorHandler } from '@/infra/middlewares/error-handler';
import middy from '@middy/core';
import httpRouterHandler, { Route } from '@middy/http-router';

export function routesAdapt(routes: Route<any, any>[]) {
  return middy().use(errorHandler()).handler(httpRouterHandler(routes));
}
