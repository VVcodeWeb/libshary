import axios from 'axios';
import {
  OpenLibBook,
  OpenLibBookResponse,
  OpenLibSearchQuery,
} from '../dto/openlib-books';
import { Observable, map, from, catchError } from 'rxjs';
import {
  SearchApi,
  TransientBook,
} from '@booksearch/__generated_proto__/booksearch';

export interface SearchQuery {
  q: string;
  api?: SearchApi;
  limit?: number;
  offset?: number;
  bookId?: string;
  tags?: string[];
}

export class OpenLibrary {
  private readonly logger: any;
  private readonly url: string;
  public readonly defaultLimit;
  public readonly defaultOffset;

  constructor({
    url = 'https://openlibrary.org/search.json',
    limit = 10,
    offset = 0,
    log,
  }: {
    url: string;
    log?: any;
    limit?: number;
    offset?: number;
  }) {
    this.logger = log;
    this.url = url;
    this.defaultLimit = limit;
    this.defaultOffset = offset;
  }

  search(
    serviceQuery: SearchQuery,
  ): Observable<{ total_number: number; result: TransientBook[] }> {
    const query = this.#queryToOpenLibQuery(serviceQuery);

    if (serviceQuery.bookId) {
      throw new Error('Not implemented');
    }
    return this.#search(query).pipe(
      map((data) => {
        const books = data.docs.map((item) => this.#openLibBookToBook(item));
        return {
          total_number: data.numFound,
          result: books,
        };
      }),
    );
  }

  #queryToOpenLibQuery(query: SearchQuery): OpenLibSearchQuery {
    return {
      q: query.q,
      limit: query.limit ?? this.defaultLimit,
      offset: query.offset ?? this.defaultOffset,
    };
  }

  #buildUrl(queryObj: OpenLibSearchQuery): string {
    let url = this.url;
    url += `?q=${encodeURIComponent(queryObj.q)}`;
    if (queryObj.limit) {
      url += `&limit=${queryObj.limit}`;
    }
    if (queryObj.offset) {
      url += `&offset=${queryObj.offset}`;
    }
    return url;
  }

  #fetch<T>(url: string): Observable<T> {
    return from(axios.get(url)).pipe(
      map((response) => response.data),
      catchError((error) => {
        this.logger.error(
          `Error getting data from Open Library API: ${error.message}`,
          { url, error },
        );
        throw new Error(
          `Failed to fetch data from Open Library API. Error: ${error.message}`,
        );
      }),
    );
  }

  #search(query: OpenLibSearchQuery): Observable<OpenLibBookResponse> {
    const url = this.#buildUrl(query);
    return this.#fetch<OpenLibBookResponse>(url).pipe(
      map((data) => {
        if (data.numFound !== 0 && !data.docs) {
          this.logger.error(`Unexpected response from Open Library API`, {
            data,
          });
          throw new Error(`Unexpected response from Open Library API`);
        }
        return data;
      }),
    );
  }

  #openLibBookToBook = (openLibBook: OpenLibBook): TransientBook => {
    let book: TransientBook;
    return book;
    // return {
    //   title: openLibBook.title,
    //   authors: openLibBook.author_name,
    //   description: '', // Open Library does not provide a description
    //   publishedAt: new Date(openLibBook.first_publish_year).toISOString(),
    //   pageCount: openLibBook.number_of_pages_median,
    //   imageLinks: openLibBook.cover_i
    //     ? `https://covers.openlibrary.org/b/id/${openLibBook.cover_i}-L.jpg`
    //     : '',
    //   isbn10: openLibBook.isbn ? openLibBook.isbn[0] : '',
    //   isbn13: openLibBook.isbn ? openLibBook.isbn[1] : '',
    //   categories: openLibBook.subject ? [openLibBook.subject] : [],
    //   publisher: openLibBook.publisher ? openLibBook.publisher[0] : '',
    //   googleBookId: openLibBook.key,
    // };
  };
}
