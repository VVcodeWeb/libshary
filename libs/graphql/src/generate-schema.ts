import { NestFactory } from '@nestjs/core';
import {
  GraphQLSchemaBuilderModule,
  GraphQLSchemaFactory,
} from '@nestjs/graphql';
import { printSchema } from 'graphql';
import { writeFileSync } from 'fs';
import { SectionsResolver } from '@api/modules/sections/sections.resolver';
import { SectionsBooksResolver } from '@api/modules/sections-books/sections-books.resolver';
import { ShelvesResolver } from '@api/modules/shelves/shelves.resolver';
import { BooksResolver } from '@api/modules/books/books.resolver';

async function generateSchema() {
  const app = await NestFactory.create(GraphQLSchemaBuilderModule);

  const schemaFactory = app.get(GraphQLSchemaFactory);

  const resolvers = [
    SectionsResolver,
    SectionsBooksResolver,
    ShelvesResolver,
    BooksResolver,
  ];

  const schema = await schemaFactory.create(resolvers);

  const schemaFilePath = 'libs/graphql/src/schema.gql';

  writeFileSync(schemaFilePath, printSchema(schema));
  console.log(`Schema has been generated at ${schemaFilePath}`);
  await app.close();
}

// Run the schema generation
generateSchema().catch((err) => {
  console.error('Error generating schema:', err);
  process.exit(1);
});
