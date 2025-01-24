import type { CodegenConfig } from '@graphql-codegen/cli';
import { join } from 'path';

const cwdJoin = (path: string) => join(process.cwd(), path);

const config: CodegenConfig = {
  schema: cwdJoin('libs/graphql/src/schema.gql'),
  documents: cwdJoin('apps/web/src/**/*.{ts,tsx}'),
  generates: {
    [cwdJoin('apps/web/src/__generated__/')]: {
      preset: 'client',
      config: {},
      presetConfig: {
        gqlTagName: 'gql',
      },
    },
  },
  [cwdJoin('libs/graphql/src/schema.gql')]: {
    plugins: ['introspection'],
  },
  ignoreNoDocuments: true,
};
export default config;
