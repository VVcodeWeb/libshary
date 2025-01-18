import { getToken } from 'next-auth/jwt';
import {
  NextFetchEvent,
  NextMiddleware,
  NextRequest,
  NextResponse,
} from 'next/server';

//TODO: CSRF protection
export default function middleware(next: NextMiddleware): NextMiddleware {
  return async (req: NextRequest, _next: NextFetchEvent) => {
    const { pathname } = req.nextUrl;
    if (pathname.includes('/home')) {
      const token = await getToken({ req });
      console.log({ token });
      if (!token) {
        const signIn = '/api/auth/signin';
        const signInUrl = new URL(signIn, req.nextUrl.origin);
        signInUrl.searchParams.append('callbackUrl', req.url);
        return NextResponse.redirect(signInUrl);
      }
    }
    return next(req, _next);
  };
}
