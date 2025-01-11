/* eslint-disable @typescript-eslint/no-unused-vars */
import { routing } from '@web/i18n/routing';
import createMiddleware from 'next-intl/middleware';
import { NextFetchEvent, NextMiddleware, NextRequest } from 'next/server';

const langMiddleware = createMiddleware(routing);
const langMiddlewareFactory = (next: NextMiddleware) => {
  return async (req: NextRequest, _next: NextFetchEvent) => {
    // console.log({ middleware: 'lang', msg: 'called' });
    return langMiddleware(req);
  };
};

export default langMiddlewareFactory;
