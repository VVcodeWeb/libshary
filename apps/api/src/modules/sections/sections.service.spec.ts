import { Test, TestingModule } from '@nestjs/testing';
import { SectionsService } from './sections.service';
import { PrismaServiceMock } from '../prisma/__mocks__/prisma.service.mock';
import { BookSearchServiceMock } from '../book-search/__mocks__/book-search.service.mock';

describe('SectionsService', () => {
  let service: SectionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SectionsService, PrismaServiceMock, BookSearchServiceMock],
    }).compile();

    service = module.get<SectionsService>(SectionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
