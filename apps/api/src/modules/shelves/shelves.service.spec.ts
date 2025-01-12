import { Test, TestingModule } from '@nestjs/testing';
import { ShelvesService } from './shelves.service';
import { PrismaServiceMock } from '../prisma/__mocks__/prisma.service.mock';

describe('ShelvesService', () => {
  let service: ShelvesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShelvesService, PrismaServiceMock],
    }).compile();

    service = module.get<ShelvesService>(ShelvesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
