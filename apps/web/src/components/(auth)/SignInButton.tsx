'use client';
import { signIn } from 'next-auth/react';
import React from 'react';

const SignInButton = () => {
  return <button onClick={() => signIn()}>Sign in</button>;
};

export default SignInButton;
