import { Test, TestingModule } from '@nestjs/testing';
import { BooksService } from './books.service';
import { ConfigurationServiceMock } from '@api/config/__mock__/configuration.service.mock';
import { BooksRepositoryMock } from './__mocks__/book.repository.mock';

describe('BooksService', () => {
  let service: BooksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BooksService, ConfigurationServiceMock, BooksRepositoryMock],
    }).compile();

    service = module.get<BooksService>(BooksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
