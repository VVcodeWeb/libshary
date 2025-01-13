import axios from 'axios';
import { Observable, from } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { GoogleBooksVolumes, GoogleBooksVolume } from '../dto/google-books';
import { OpenLibBookResponse } from '../dto/openlib-books';
import {
  googleToTransientBook,
  openLibBookToBook,
} from '../utils/books-mapper';
import {
  TransientBookModel,
  GoogleQuery,
  OpenLibQuery,
  SearchApi,
} from '@libshary/shared-types';
import { FastifyInstance } from 'fastify';

export class BookSearchService {
  private logger = console;
  constructor(
    private config: any, //FastifyInstance['appConfig'],
    private log: any,
  ) {
    if (log) this.logger = log;
  }

  search(query: string, api?: SearchApi): Observable<TransientBookModel[]> {
    if (api === SearchApi.openlib) return this.#openLibrarySearch(query);
    return this.#googleBooksSearch(query);
  }

  findById(id: string, api: SearchApi): Observable<TransientBookModel> {
    if (api === SearchApi.openlib) {
      throw new Error(`Api ${api} is not implemented yet`);
    }
    return this.#googleBookFindById(id);
  }

  #buildGoogleQuery(queryObj: GoogleQuery): string {
    let url = this.config.google_books_url;
    url += '/volumes';
    if (queryObj.volumeId) {
      url += `/${queryObj.volumeId}`;
      url += `?key=${this.config.google_books_api_key}`;
      return url;
    }
    url += `?key=${this.config.google_books_api_key}`;
    if (queryObj.q) {
      url += `&q=${encodeURIComponent(queryObj.q)}`;
    }
    if (queryObj.maxResults) {
      url += `&maxResults=${queryObj.maxResults}`;
    }
    return url;
  }

  #googleBooksFetch<T>(url: string): Observable<T> {
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

  #googleBooksSearch(query: string): Observable<TransientBookModel[]> {
    const url = this.#buildGoogleQuery({ q: query });
    return this.#googleBooksFetch<GoogleBooksVolumes>(url).pipe(
      map((data) => {
        if (data.kind !== 'books#volumes' || !data.items) {
          this.logger.error(`Unexpected response from Google Books API`, {
            data,
          });
          throw new Error(`Unexpected response from Google Books API`);
        }
        const books = data.items.map((item) => googleToTransientBook(item));
        return books;
      }),
    );
  }

  #googleBookFindById(id: string): Observable<TransientBookModel> {
    const url = this.#buildGoogleQuery({ volumeId: id });
    return this.#googleBooksFetch<GoogleBooksVolume>(url).pipe(
      map((data) => {
        if (data.kind !== 'books#volume') {
          throw new Error(`Unexpected response kind: ${data.kind}`);
        }
        return googleToTransientBook(data);
      }),
    );
  }

  #buildOpenLibQuery(queryObj: OpenLibQuery): string {
    let url = this.config.open_library_url;
    url = url.concat(`?q=${encodeURIComponent(queryObj.q)}`);
    if (queryObj.limit) {
      url = url.concat(`&limit=${queryObj.limit}`);
    }
    if (queryObj.page) {
      url = url.concat(`&page=${queryObj.page}`);
    }
    return url;
  }

  #openLibraryFetch<T>(url: string): Observable<T> {
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

  #openLibrarySearch(query: string): Observable<TransientBookModel[]> {
    const url = this.#buildOpenLibQuery({ q: query, page: 1, limit: 20 });
    return this.#openLibraryFetch<OpenLibBookResponse>(url).pipe(
      map((data) => {
        if (data.numFound !== 0 && !data.docs) {
          this.logger.error(`Unexpected response from Open Library API`, {
            data,
          });
          throw new Error(`Unexpected response from Open Library API`);
        }
        const books = data.docs.map((item) => openLibBookToBook(item));
        return books;
      }),
    );
  }
}
