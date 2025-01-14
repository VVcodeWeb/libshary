import axios from 'axios';
import {
  OpenLibBook,
  OpenLibBookResponse,
  OpenLibSearchQuery,
} from '../dto/openlib-books';
import {
  BookQueryReponseDto,
  BookQueryRequestDto,
  SearchApi,
  TransientBookModel,
} from '@libshary/shared-types';
import { catchError, from, map, Observable } from 'rxjs';

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
    serviceQuery: BookQueryRequestDto,
  ): Observable<{ total_number: number; result: TransientBookModel[] }> {
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

  #queryToOpenLibQuery(query: BookQueryRequestDto): OpenLibSearchQuery {
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
  #openLibBookToBook = (openLibBook: OpenLibBook): TransientBookModel => {
    return {
      title: 'not implemented',
      authors: [],
    };
  };
}

// return {
//   title: openLibBook.title,
//   authors: openLibBook.author_name,
//   description: '', // Open Library does not provide a description
//   publishedAt: new Date(openLibBook.first_publish_year),
//   pageCount: openLibBook.number_of_pages_median,
//   imageLinks: openLibBook.cover_i
//   isbn10: openLibBook.identifiers.isbn_10
//     ? openLibBook.identifiers.isbn_10[0]
//     : null,
//   isbn13: openLibBook.identifiers.isbn_13
//     ? openLibBook.identifiers.isbn_13[0]
//     : null,
//   publisher: openLibBook.
//   categories: openLibBook.subjects
// };
