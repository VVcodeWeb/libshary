import { SearchApi, TransientBookModel } from '@bookshary/shared-types';
import { Observable, of } from 'rxjs';
import { BookSearchService } from '../book-search.service';
export class BookSearchMock {
  search(query: string, api: SearchApi): Observable<TransientBookModel[]> {
    return of([
      {
        id: '1',
        title: 'Mock Book',
        authors: ['Mock Author'],
        publishedDate: '2021-01-01',
        description: 'This is a mock book description.',
        googleBookId: 'mock-google-book-id',
      },
    ]);
  }

  findById(id: string, api: SearchApi): Observable<TransientBookModel> {
    return of({
      id: '1',
      title: 'Mock Book',
      authors: ['Mock Author'],
      publishedDate: '2021-01-01',
      description: 'This is a mock book description.',
      googleBookId: 'mock-google-book-id',
    });
  }
}
export const BookSearchServiceMock = {
  provide: BookSearchService,
  useValue: BookSearchMock,
};
