'use client';
import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';

export interface AuthContextProps {
  children: React.ReactNode;
  session?: Session | null;
}

export const AuthProvider = ({ children, session }: AuthContextProps) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};
