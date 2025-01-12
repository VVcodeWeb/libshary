import { Test, TestingModule } from '@nestjs/testing';
import { BooksService } from './books.service';
import { BookSearchService } from '../book-search/book-search.service';
import { BookSearchServiceMock } from '../book-search/__mocks__/book-search.service.mock';

describe('BooksService', () => {
  let service: BooksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BooksService, BookSearchServiceMock],
    }).compile();

    service = module.get<BooksService>(BooksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
