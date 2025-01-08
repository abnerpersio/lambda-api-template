import { MiddlewareObj } from '@middy/core';

export function errorHandler(): MiddlewareObj {
  return {
    onError: () => {},
  };
}
