import { PrismaService } from '@api/modules/prisma/prisma.service';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map, catchError } from 'rxjs/operators';
import {
  GoogleBooksVolume,
  GoogleBooksVolumes,
} from './models/google-books.model';
import {
  googleToTransientBook,
  openLibBookToBook,
} from './mapper/books-mapper';
import { ConfigurationService } from '@api/config/configuration.service';
import { Observable } from 'rxjs';
import {
  TransientBookModel,
  GoogleQuery,
  OpenLibQuery,
  SearchApi,
} from '@bookshary/shared-types';
import { OpenLibBookResponse } from './models/openlib-books.model';

@Injectable()
export class BookSearchService {
  constructor(
    private readonly httpService: HttpService,
    private readonly prisma: PrismaService,
    private readonly configurationService: ConfigurationService,
  ) {}
  private logger = new Logger(BookSearchService.name);

  search(query: string, api: SearchApi) {
    if (api === SearchApi.openlib) return this.#openLibrarySearch(query);
    return this.#googleBooksSearch(query);
  }

  findById(id: string, api: SearchApi) {
    if (api === SearchApi.openlib)
      throw new InternalServerErrorException(`Api ${api} is implemented yet`);
    return this.#googleBookFindById(id);
  }

  /**
   * For now only /volumes endpoint.
   *
   * Base url https://www.googleapis.com/books/v1
   * @param queryObj
   * @returns
   */
  #buildGoogleQuery = (queryObj: GoogleQuery) => {
    let url = this.configurationService.google_books_url;
    url += '/volumes';
    if (queryObj.volumeId) {
      url += `/${queryObj.volumeId}`;
      url += `?key=${this.configurationService.google_books_api_key}`;
      return url;
    }
    url += `?key=${this.configurationService.google_books_api_key}`;
    if (queryObj.q) {
      url += `&q=${encodeURIComponent(queryObj.q)}`;
    }
    if (queryObj.maxResults) {
      url += `&maxResults=${queryObj.maxResults}`;
    }

    return url;
  };

  #googleBooksFetch<T>(url: string): Observable<T> {
    return this.httpService.get(url).pipe(
      map((response) => response.data),
      catchError((error) => {
        this.logger.error(
          `Error getting data from Google Books API: ${error.message}`,
          { url, error },
        );
        throw new InternalServerErrorException(
          `Failed to fetch data from Google Books API. Error: ${error.message}`,
        );
      }),
    );
  }

  #googleBooksSearch(query: string): Observable<TransientBookModel[]> {
    const url = this.#buildGoogleQuery({ q: query });
    return this.#googleBooksFetch<GoogleBooksVolumes>(url).pipe(
      map((data) => {
        if (data.kind !== 'books#volumes' || !data.items) {
          this.logger.error(`Unexpected response from Google Books API`, {
            data,
          });
          throw new InternalServerErrorException(
            `Unexpected response from Google Books API`,
          );
        }
        const books = data.items.map((item) => googleToTransientBook(item));
        if (this.configurationService.data)
          this.#handleGoogleSearchResults(books);
        return books;
      }),
    );
  }

  #googleBookFindById(id: string): Observable<TransientBookModel> {
    const url = this.#buildGoogleQuery({ volumeId: id });
    return this.#googleBooksFetch<GoogleBooksVolume>(url).pipe(
      map((data) => {
        if (data.kind !== 'books#volume') {
          throw new InternalServerErrorException(
            `Unexpected response kind: ${data.kind}`,
          );
        }
        return googleToTransientBook(data);
      }),
    );
  }

  #openLibraryFetch<T>(url: string): Observable<T> {
    return this.httpService.get(url).pipe(
      map((response) => response.data),
      catchError((error) => {
        this.logger.error(
          `Error getting data from Open Library API: ${error.message}`,
          { url, error },
        );
        throw new InternalServerErrorException(
          `Failed to fetch data from Open Library API. Error: ${error.message}`,
        );
      }),
    );
  }

  #buildOpenLibQuery = (queryObj: OpenLibQuery) => {
    let url = this.configurationService.open_libary_url;
    url = url.concat(`?q=${encodeURIComponent(queryObj.q)}`);
    if (queryObj.limit) {
      url = url.concat(`&limit=${queryObj.limit}`);
    }
    if (queryObj.page) {
      url = url.concat(`&page=${queryObj.page}`);
    }
    return url;
  };

  #openLibrarySearch(query: string): Observable<TransientBookModel[]> {
    const url = this.#buildOpenLibQuery({ q: query, page: 1, limit: 20 });
    return this.#openLibraryFetch<OpenLibBookResponse>(url).pipe(
      map((data) => {
        if (data.numFound !== 0 && !data.docs) {
          this.logger.error(`Unexpected response from Open Library API`, {
            data,
          });
          throw new InternalServerErrorException(
            `Unexpected response from Open Library API`,
          );
        }
        const books = data.docs.map((item) => openLibBookToBook(item));
        return books;
      }),
    );
  }

  //TODO: implement
  #_openLibraryFindById(id: string): Observable<TransientBookModel> {
    const url = `${this.configurationService.open_libary_url}/works/${id}.json`;
    return this.#openLibraryFetch<unknown>(url).pipe(
      map((data) => {
        if (!data) {
          throw new InternalServerErrorException(
            `Unexpected response from Open Library API`,
          );
        }
        return {} as TransientBookModel;
      }),
    );
  }

  async #handleGoogleSearchResults(books: TransientBookModel[]) {
    await Promise.allSettled(
      books.map((book) =>
        this.prisma.book
          .upsert({
            create: {
              ...book,
            },
            update: book,
            where: { googleBookId: book.googleBookId },
          })
          .catch((error) => this.logger.error(error)),
      ),
    );
  }
}
