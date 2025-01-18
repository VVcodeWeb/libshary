import { authOptions } from '@web/lib/auth/auth-config';
import NextAuth from 'next-auth/next';

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
