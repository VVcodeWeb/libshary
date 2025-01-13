import { Test, TestingModule } from '@nestjs/testing';
import { BooksController } from './books.controller';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { JwtAuthGuardMock } from '../auth/__mocks__/jwt-auth.guard.mock';
import { BooksServiceMock } from './__mocks__/books.service.mock';
describe('BooksController', () => {
  let controller: BooksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BooksController],
      providers: [BooksServiceMock],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue(JwtAuthGuardMock)
      .compile();

    controller = module.get<BooksController>(BooksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
