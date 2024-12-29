import { Book as _Book } from './book';
import { User as _User } from './user';
import { Shelf as _Shelf } from './shelf';
import { ShelfBook as _ShelfBook } from './shelf_book';
import { InProgressShelfBook as _InProgressShelfBook } from './in_progress_shelf_book';
import { FutureReadShelfBook as _FutureReadShelfBook } from './future_read_shelf_book';
import { PastReadShelfBook as _PastReadShelfBook } from './past_read_shelf_book';

export namespace PrismaModel {
  export class Book extends _Book {}
  export class User extends _User {}
  export class Shelf extends _Shelf {}
  export class ShelfBook extends _ShelfBook {}
  export class InProgressShelfBook extends _InProgressShelfBook {}
  export class FutureReadShelfBook extends _FutureReadShelfBook {}
  export class PastReadShelfBook extends _PastReadShelfBook {}

  export const extraModels = [
    Book,
    User,
    Shelf,
    ShelfBook,
    InProgressShelfBook,
    FutureReadShelfBook,
    PastReadShelfBook,
  ];
}
