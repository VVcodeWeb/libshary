import * as path from 'path';
import { FastifyInstance } from 'fastify';
import AutoLoad from '@fastify/autoload';
import rabbitmq from './plugins/rabbitmq';
import config from './plugins/config';
import sensible from './plugins/sensible';
/* eslint-disable-next-line */
export interface AppOptions {}

export async function app(fastify: FastifyInstance, opts: AppOptions) {
  await fastify.register(config, {
    config: {
      open_library_url: 'https://openlibrary.org/search.json',
      google_books_url: 'https://www.googleapis.com/books/v1',
      google_books_api_key: process.env.GOOGLE_BOOKS_API_KEY as string,
      rabbitmq_url: process.env.RABBITMQ_URL as string,
      node_env: (process.env.NODE_ENV = 'development'),
    },
  });

  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    options: { ...opts },
    ignoreFilter(path) {
      return path.includes('config');
    },
  });

  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'routes'),
    options: { ...opts },
  });
}
