import { Test, TestingModule } from '@nestjs/testing';
import { PrismaServiceMock } from '../prisma/__mocks__/prisma.service.mock';
import { HttpService } from '@nestjs/axios';
import { ConfigurationServiceMock } from '@api/config/__mock__/configuration.service.mock';
import { SectionsService } from './sections.service';
import { SectionsRepositoryMock } from './__mocks__/sections.repository.mock';
import { AuthorizationServiceMock } from '@api/shared/services/__mocks__/authorization.service.mock';

describe('SectionsService', () => {
  let service: SectionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SectionsService,
        PrismaServiceMock,
        SectionsRepositoryMock,
        AuthorizationServiceMock,
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
