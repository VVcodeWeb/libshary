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

const ApolloProvider = ({
  children,
  apiUrl,
}: {
  apiUrl: string;
  children: React.ReactNode;
}) => {
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
      uri: `${apiUrl}/graphql`,
    });
    console.log({ httpLink });

    return new ApolloClient({
      link: authLink.concat(httpLink),
      cache: cache,
    });
  };
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
};

export default ApolloProvider;
