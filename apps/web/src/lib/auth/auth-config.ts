import { PrismaAdapter } from '@auth/prisma-adapter';
import { NextAuthOptions } from 'next-auth';
import { signJwt } from './jwt';
import { prisma } from '../prisma/temp-prisma';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET || 'secret',
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  adapter: PrismaAdapter(prisma),
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.auth_token = signJwt({
          sub: token.sub,
          access_token: account.access_token,
          expires_at: account.expires_at,
        });
      }
      return token;
    },
    async session({ session, token }) {
      session.auth_token = token.auth_token as string;
      return session;
    },
  },
} as NextAuthOptions;
