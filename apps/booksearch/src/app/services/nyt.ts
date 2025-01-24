import { Observable } from 'rxjs';

export class NytBooks {
  constructor() {}
  search(query: string): Observable<any[]> {
    return new Observable<any[]>((subscriber) => {});
  }
}
