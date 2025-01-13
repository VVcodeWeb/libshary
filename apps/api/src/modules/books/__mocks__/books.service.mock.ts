import { Injectable } from '@nestjs/common';
import { SearchApi } from '@libshary/shared-types';
import { BooksService } from '../books.service';

class BooksMock {
  create() {
    return 'This action adds a new book (mock)';
  }

  findAll() {
    return `This action returns all books (mock)`;
  }

  findOne(id: string) {
    return `This action returns a #${id} book (mock)`;
  }

  update(id: string) {
    return `This action updates a #${id} book (mock)`;
  }

  remove(id: string) {
    return `This action removes a #${id} book (mock)`;
  }

  async search(query: string, api: SearchApi) {
    return `This action searches for books with query "${query}" using API "${api}" (mock)`;
  }
}
export const BooksServiceMock = {
  provide: BooksService,
  useValue: BooksMock,
};
