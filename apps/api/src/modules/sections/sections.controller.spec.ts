import { Test, TestingModule } from '@nestjs/testing';
import { SectionsController } from './sections.controller';
import { SectionsService } from './sections.service';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { BookSearchServiceMock } from '../book-search/__mocks__/book-search.service.mock';
import { JwtAuthGuardMock } from '../auth/__mocks__/jwt-auth.guard.mock';
import { SectionsServiceMock } from './__mocks__/sections.service.mock';

describe('SectionsController', () => {
  let controller: SectionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SectionsController],
      providers: [SectionsServiceMock, BookSearchServiceMock],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue(JwtAuthGuardMock)
      .compile();

    controller = module.get<SectionsController>(SectionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
