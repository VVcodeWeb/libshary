import { TransientBookModel } from '@libshary/shared-types';
import { Observable } from 'rxjs';

export class NytBooks {
  constructor() {}
  search(query: string): Observable<TransientBookModel[]> {
    return new Observable<TransientBookModel[]>((subscriber) => {});
  }
}
