import fp from 'fastify-plugin';
import * as grpc from '@grpc/grpc-js';
import { GoogleBooks } from '../services/googlebooks';
import { OpenLibrary } from '../services/openlibrary';
import {
  BookSearchService,
  BookSearchServer,
  BookSearchResponse,
  BookSearchByIdResponse,
  SearchApi,
} from '@libshary/grpc/generated/booksearch';
import fastify, { FastifyInstance } from 'fastify';

const googleBooksService = new GoogleBooks({
  url: process.env.GOOGLE_BOOKS_URL,
  key: process.env.GOOGLE_BOOKS_API_KEY,
  log: console,
});
const openLibraryService = new OpenLibrary({
  url: process.env.OPEN_LIBRARY_URL,
  log: console,
});

const createServiceHandlers = (fastify: FastifyInstance): BookSearchServer => {
  return {
    search(call, callback) {
      const request = call.request;
      const query = request;
      if (!query.q) {
        callback(new Error('Query is required'));
      }
      fastify.log.info(query);
      googleBooksService.search(query).subscribe({
        next: (response) => {
          const searchResponse: BookSearchResponse = {
            apiProvider: SearchApi.GOOGLE_BOOKS,
            totalNumber: response.totalNumber,
            limit: query.limit ?? googleBooksService.defaultLimit,
            offset: query.offset ?? googleBooksService.defaultOffset,
            result: response.result,
          };
          callback(null, searchResponse);
        },
        error: (err) => {
          callback(err);
        },
      });
    },
    searchById(call, callback) {
      const id = call.request.id;
      if (!id) {
        callback(new Error('ID is required'));
      }
      googleBooksService.findById(id).subscribe({
        next: (book) => {
          const response: BookSearchByIdResponse = {
            book: book ?? undefined,
          };
          callback(null, response);
        },
        error: (err) => {
          callback(err);
        },
      });
    },
  };
};

const applyInterceptors = (
  fastify: FastifyInstance,
  handler: grpc.handleUnaryCall<any, any>,
): grpc.handleUnaryCall<any, any> => {
  return (call, callback) => {
    const wrappedCallback: grpc.sendUnaryData<any> = (error, value) => {
      if (error) {
        callback(error, null);
      } else {
        callback(null, value);
      }
    };

    fastify.grpcMetricsInterceptor(call, wrappedCallback, async () => {
      fastify.rateLimitInterceptor(call, wrappedCallback, async () => {
        handler(call, wrappedCallback);
      });
    });
  };
};

async function grpcClient(fastify: FastifyInstance, options) {
  const server = new grpc.Server();
  const handlers = createServiceHandlers(fastify);
  const wrappedHandlers = Object.fromEntries(
    Object.entries(handlers).map(([method, handler]) => [
      method,
      applyInterceptors(fastify, handler as grpc.handleUnaryCall<any, any>),
    ]),
  );
  server.addService(BookSearchService, wrappedHandlers);

  const port = fastify.config.grpc_port;
  server.bindAsync(
    `0.0.0.0:${port}`,
    grpc.ServerCredentials.createInsecure(),
    () => {
      console.log(`gRPC server running at http://0.0.0.0:${port}`);
    },
  );
}

export default fp(grpcClient, {
  dependencies: ['rate-limit', 'config', 'metrics'],
});
