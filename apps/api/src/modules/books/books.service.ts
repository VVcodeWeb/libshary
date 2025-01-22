import { Injectable, Logger, Inject, OnModuleInit } from '@nestjs/common';
import { BooksRepository } from './books.repository';
import { BookSearchArgs } from './dto/book-search.args';
import { firstValueFrom, Observable } from 'rxjs';
import { ClientGrpc } from '@nestjs/microservices';
import { BookFindArgs } from './dto/book-find.args';
import { SearchResponseDto } from './models/search-response.model';
import {
  searchApiToProviderName,
  transientBookToBook,
} from '@api/shared/mappers/grpc.mapper';
import {
  BookSearchClient,
  BookSearchRequest,
  SearchApi,
  BookSearchResponse,
} from '@libshary/grpc/generated/booksearch';

@Injectable()
export class BooksService implements OnModuleInit {
  private bookSearchClient: BookSearchClient;
  private logger = new Logger(BooksService.name);

  constructor(
    private booksRepository: BooksRepository,
    @Inject('BOOKSEARCH') private client: ClientGrpc,
  ) {}

  onModuleInit() {
    this.bookSearchClient =
      this.client.getService<BookSearchClient>('BookSearch');
  }

  async findOne(bookFindArgs: BookFindArgs) {
    return await this.booksRepository.findOne({
      where: {
        OR: [
          { id: bookFindArgs.id },
          { googleBookId: bookFindArgs.googleBookId },
        ],
      },
    });
  }

  async search(bookSearchArgs: BookSearchArgs) {
    const { q, limit, offset } = bookSearchArgs;
    const request: BookSearchRequest = {
      q,
      apiProvider: SearchApi.GOOGLE_BOOKS,
      limit,
      offset,
      tags: [],
    };
    try {
      const response: BookSearchResponse = await firstValueFrom(
        this.bookSearchClient.search(request) as Observable<BookSearchResponse>,
      );
      return this.#mapGrpcToDto(response);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
  #mapGrpcToDto(response: BookSearchResponse): SearchResponseDto {
    return {
      apiProvider: searchApiToProviderName(response.apiProvider),
      totalNumber: response.totalNumber,
      limit: response.limit ?? 0,
      offset: response.offset ?? 0,
      result: response.result
        ? response.result.map((transientBook) => {
            const bookNoId = transientBookToBook(transientBook);
            return {
              ...bookNoId,
              id: transientBook.googleBookId,
            };
          })
        : [],
    };
  }
}
