import axios from 'axios';
import { Observable, from, catchError } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  GoogleQuery,
  GoogleBooksVolumes,
  GoogleBooksVolume,
} from '../dto/google-books';
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

export class GoogleBooks {
  private readonly logger: any;
  private readonly key: string;
  private readonly url: string;
  readonly defaultLimit: number;
  readonly defaultOffset: number;
  constructor({
    url = 'https://www.googleapis.com/books/v1',
    key,
    log = console,
    limit = 10,
    offset = 0,
  }: {
    url?: string;
    key: string;
    log?: any;
    limit?: number;
    offset?: number;
  }) {
    this.logger = log;
    this.key = key;
    this.url = url;
    this.defaultLimit = limit;
    this.defaultOffset = offset;
  }

  search(
    serviceQuery: SearchQuery,
  ): Observable<{ totalNumber: number; result: TransientBook[] }> {
    const query = this.#queryToGoogleQuery(serviceQuery);
    const url = this.#buildUrl(query);
    return this.#fetch<GoogleBooksVolumes>(url).pipe(
      map((data: GoogleBooksVolumes) => {
        if (data.kind !== 'books#volumes') {
          this.logger.error(`Unexpected response from Google Books API`, {
            data,
          });
          return {
            result: [],
            totalNumber: 0,
          };
        }
        const books = data.items
          ? data.items.map((item) => this.#googleToTransientBook(item))
          : [];
        return {
          result: books,
          totalNumber: data.totalItems,
        };
      }),
    );
  }
  findById(id: string): Observable<TransientBook> {
    const url = this.#buildUrl({ volumeId: id });
    return this.#fetch<GoogleBooksVolume>(url).pipe(
      map((data) => {
        if (data.kind !== 'books#volume') {
          throw new Error(`Unexpected response kind: ${data.kind}`);
        }
        return this.#googleToTransientBook(data);
      }),
    );
  }

  #queryToGoogleQuery = (query: SearchQuery): GoogleQuery => {
    return {
      q: query.q,
      maxResults: query.limit ?? this.defaultLimit,
      startIndex: query.offset ?? this.defaultOffset,
    };
  };
  #buildUrl(query: GoogleQuery): string {
    const params = new URLSearchParams();
    params.append('key', this.key);

    if (query.volumeId) {
      return `${this.url}/volumes/${query.volumeId}?${params.toString()}`;
    }

    if (query.q) params.append('q', query.q);
    if (query.maxResults)
      params.append('maxResults', query.maxResults.toString());
    if (query.startIndex)
      params.append('startIndex', query.startIndex.toString());

    return `${this.url}/volumes?${params.toString()}`;
  }

  #fetch<T>(url: string): Observable<T> {
    return from(axios.get(url)).pipe(
      map((response) => response.data),
      catchError((error) => {
        this.logger.error(
          `Error getting data from Google Books API: ${error.message}`,
          { url, error },
        );
        throw new Error(
          `Failed to fetch data from Google Books API. Error: ${error.message}`,
        );
      }),
    );
  }

  #googleToTransientBook = (googleBook: GoogleBooksVolume): TransientBook => {
    const getISBN = (type: 'ISBN_10' | 'ISBN_13') => {
      return googleBook.volumeInfo.industryIdentifiers?.find(
        (id) => id.type === type,
      )?.identifier;
    };

    return {
      title: googleBook.volumeInfo.title,
      authors: googleBook.volumeInfo.authors ?? [],
      description: googleBook.volumeInfo.description ?? '',
      publishedAt: googleBook.volumeInfo.publishedDate ?? '',
      pageCount: googleBook.volumeInfo.pageCount ?? 0,
      imageLinks: googleBook.volumeInfo.imageLinks?.thumbnail ?? '',
      isbn10: getISBN('ISBN_10') ?? '',
      isbn13: getISBN('ISBN_13') ?? '',
      categories: googleBook.volumeInfo.categories ?? [],
      publisher: googleBook.volumeInfo.publisher ?? '',
      googleBookId: googleBook.id,
    };
  };
}
