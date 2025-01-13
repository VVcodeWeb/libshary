import {
  BookQueryDto,
  BookQueryScheme,
  SearchApi,
  TransientBookSchema,
} from '@libshary/shared-types';
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { BookSearchService } from '../services/search';
import { firstValueFrom } from 'rxjs';

export default async function search(fastify: FastifyInstance) {
  const bookSearchService = new BookSearchService(fastify.config, fastify.log);
  fastify.route({
    method: 'GET',
    url: '/search',
    schema: {
      response: {
        200: {
          type: 'array',
          items: {
            properties: TransientBookSchema._type,
          },
        },
      },
      querystring: BookQueryScheme._type,
    },
    handler: onSearch,
  });

  async function onSearch(
    request: FastifyRequest<{ Querystring: BookQueryDto }>,
    reply: FastifyReply,
  ) {
    const { q, api } = request.query;
    const books = await firstValueFrom(bookSearchService.search(q, api));
    reply.send(books);
  }

  fastify.route({
    method: 'GET',
    url: '/book/:id',
    schema: {
      response: {
        200: TransientBookSchema._type,
      },
      querystring: {
        api: { type: SearchApi },
      },
    },
    handler: onSearchById,
  });

  async function onSearchById(
    request: FastifyRequest<{
      Params: { id: string };
      Querystring: { api: SearchApi };
    }>,
    reply: FastifyReply,
  ) {
    const { id } = request.params;
    const { api } = request.query;
    const book = await firstValueFrom(bookSearchService.findById(id, api));
    reply.send(book);
  }
}
