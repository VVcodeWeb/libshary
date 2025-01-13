import { SearchApi, TransientBookModel } from '@libshary/shared-types';
import { Observable, of } from 'rxjs';
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
