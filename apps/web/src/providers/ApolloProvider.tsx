'use client';
import React from 'react';
import { setContext } from '@apollo/client/link/context';
import { getSession } from 'next-auth/react';
import {
  ApolloClient,
  ApolloNextAppProvider,
} from '@apollo/experimental-nextjs-app-support';
import { HttpLink } from '@apollo/client';
import { InMemoryCache } from '@apollo/experimental-nextjs-app-support';
import { modalsVar } from '@web/lib/apollo/vars';

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        modals: {
          read() {
            return modalsVar();
          },
        },
      },
    },
  },
});
const makeClient = () => {
  const authLink = setContext(async (_, { headers }) => {
    const session = await getSession();
    const token = `Bearer ${session?.auth_token}`;
    return {
      headers: {
        ...headers,
        authorization: token,
      },
    };
  });
  const httpLink = new HttpLink({
    uri: `${process.env.NEXT_PUBLIC_API_URL}/graphql`,
  });

  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: cache,
  });
};

const ApolloProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
};

export default ApolloProvider;
