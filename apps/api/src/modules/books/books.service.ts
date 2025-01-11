import { Injectable, Logger } from '@nestjs/common';
import { BookSearchService } from '@api/modules/book-search/book-search.service';
import { SearchApi } from '@bookshary/shared-types';
@Injectable()
export class BooksService {
  private readonly logger = new Logger(BooksService.name);
  constructor(private booksSearchService: BookSearchService) {}

  create() {
    return 'This action adds a new book';
  }

  findAll() {
    return `This action returns all books`;
  }

  findOne(id: string) {
    return `This action returns a #${id} book`;
  }

  update(id: string) {
    return `This action updates a #${id} book`;
  }

  remove(id: string) {
    return `This action removes a #${id} book`;
  }

  async search(query: string, api: SearchApi) {
    return this.booksSearchService.search(query, api);
  }
}
