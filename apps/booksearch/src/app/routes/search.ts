import {
  BookQueryRequestDto,
  BookQueryReponseSchema,
  BookQueryRequestSchema,
  SearchApi,
  BookQueryReponseDto,
  TransientBookSchema,
} from '@libshary/shared-types';
import {
  FastifyBaseLogger,
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
  FastifyTypeProviderDefault,
  RawServerDefault,
  RouteGenericInterface,
} from 'fastify';
import { GoogleBooks } from '../services/googlebooks';
import { OpenLibrary } from '../services/openlibrary';
import { firstValueFrom, map } from 'rxjs';
import { ResolveFastifyRequestType } from 'fastify/types/type-provider';
import { IncomingMessage, ServerResponse } from 'http';

export default async function search(fastify: FastifyInstance) {
  const googleBooksService = new GoogleBooks({
    url: fastify.config.google_books_url,
    key: fastify.config.google_books_api_key,
    log: fastify.log,
  });
  const openLibraryService = new OpenLibrary({
    url: fastify.config.open_library_url,
    log: fastify.log,
  });

  fastify.route({
    method: 'GET',
    url: '/search',
    schema: {
      querystring: {
        type: 'object',
        properties: {
          q: { type: 'string' },
          api: { type: 'string', enum: Object.values(SearchApi) },
          limit: { type: 'number' },
          offset: { type: 'number' },
          bookId: { type: 'string' },
          tags: { type: 'array', items: { type: 'string' } },
        },
        required: ['q'],
      },
    },
    handler: onSearch,
  });

  async function onSearch(
    request: FastifyRequest<{ Querystring: BookQueryRequestDto }>,
    reply: FastifyReply,
  ) {
    const { api, bookId } = request.query;
    if (api === SearchApi.openlib) {
      if (bookId) {
        return reply
          .status(501)
          .send(`Find book by id is not implemented for ${api}`);
      } else {
        const books = await firstValueFrom(
          openLibraryService.search(request.query),
        );
        const response: BookQueryReponseDto = {
          api_provider: SearchApi.openlib,
          limit: request.query.limit ?? openLibraryService.defaultLimit,
          offset: request.query.offset ?? openLibraryService.defaultOffset,
          result: books.result,
          total_number: books.total_number,
        };
        return reply.send(response);
      }
    }
    if (bookId) {
      const book = await firstValueFrom(googleBooksService.findById(bookId));
      const response: BookQueryReponseDto = {
        api_provider: SearchApi.google_books,
        limit: 1,
        offset: 0,
        total_number: 1,
        result: [book],
      };
      return reply.send(response);
    }
    const books = await firstValueFrom(
      googleBooksService.search(request.query),
    );
    const response: BookQueryReponseDto = {
      api_provider: SearchApi.google_books,
      limit: request.query.limit ?? googleBooksService.defaultLimit,
      offset: request.query.offset ?? googleBooksService.defaultOffset,
      result: books.result,
      total_number: books.total_number,
    };
    return reply.send(response);
  }
}
