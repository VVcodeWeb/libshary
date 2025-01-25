import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/auth-config';
import { setContext } from '@apollo/client/link/context';
import {
  registerApolloClient,
  ApolloClient,
  InMemoryCache,
} from '@apollo/experimental-nextjs-app-support';
import { createHttpLink } from '@apollo/client';

const httpLink = createHttpLink({
  uri: `${process.env.NEXT_PUBLIC_API_URL}/graphql`,
});

const authLink = setContext(async (_, { headers }) => {
  const session = await getServerSession(authOptions);
  const token = `Bearer ${session?.auth_token}`;
  return {
    headers: {
      ...headers,
      authorization: token,
    },
  };
});
/**
 * Server client
 */
export const { getClient, query, PreloadQuery } = registerApolloClient(() => {
  return new ApolloClient<InMemoryCache>({
    cache: new InMemoryCache(),
    link: authLink.concat(httpLink),
  });
});
