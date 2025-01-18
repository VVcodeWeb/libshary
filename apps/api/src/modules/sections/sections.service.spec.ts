import { Test, TestingModule } from '@nestjs/testing';
import { SectionsService } from './sections-legacy.service';
import { PrismaServiceMock } from '../prisma/__mocks__/prisma.service.mock';
import { HttpService } from '@nestjs/axios';
import { ConfigurationServiceMock } from '@api/config/__mock__/configuration.service.mock';

describe('SectionsService', () => {
  let service: SectionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SectionsService,
        PrismaServiceMock,
        ConfigurationServiceMock,
        {
          provide: HttpService,
          useValue: {
            get: jest.fn(),
            post: jest.fn(),
            put: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<SectionsService>(SectionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
