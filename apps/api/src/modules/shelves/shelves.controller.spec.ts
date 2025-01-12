import { Test, TestingModule } from '@nestjs/testing';
import { ShelvesController } from './shelves.controller';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { JwtAuthGuardMock } from '../auth/__mocks__/jwt-auth.guard.mock';
import { PrismaServiceMock } from '../prisma/__mocks__/prisma.service.mock';
import { ShelvesServiceMock } from './__mocks__/shelves.service.mock';
describe('ShelvesController', () => {
  let controller: ShelvesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShelvesController],
      providers: [ShelvesServiceMock, PrismaServiceMock],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue(JwtAuthGuardMock)
      .compile();

    controller = module.get<ShelvesController>(ShelvesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
