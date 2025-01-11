import authMiddleware from './middlewares/auth-middleware';
import init from './middlewares/init';
import langMiddleware from './middlewares/lang-middleware';
import { MiddlewareFactory } from './types/middleware-factory';

const middlewares: MiddlewareFactory[] = [authMiddleware, langMiddleware];
export default init(middlewares);

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next).*)',
  ],
};
