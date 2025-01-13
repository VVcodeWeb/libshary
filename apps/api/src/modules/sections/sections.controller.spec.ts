import { Test, TestingModule } from '@nestjs/testing';
import { SectionsController } from './sections.controller';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { JwtAuthGuardMock } from '../auth/__mocks__/jwt-auth.guard.mock';
import { SectionsServiceMock } from './__mocks__/sections.service.mock';

describe('SectionsController', () => {
  let controller: SectionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SectionsController],
      providers: [SectionsServiceMock],
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
