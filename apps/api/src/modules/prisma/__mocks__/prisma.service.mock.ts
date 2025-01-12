import { PrismaService } from '../prisma.service';

export const prismaMock = {
  user: {
    findUnique: jest.fn(),
    findMany: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
  post: {
    findUnique: jest.fn(),
    findMany: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
};

export const PrismaServiceMock = {
  provide: PrismaService,
  useValue: prismaMock,
};
