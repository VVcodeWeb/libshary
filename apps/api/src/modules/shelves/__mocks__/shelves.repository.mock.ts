import { ShelvesRepository } from '../shelves.repository';

class Mock {
  async create(args: any) {
    return { id: 1, ...args.data };
  }

  async findOne(args: any) {
    return { id: 1, ...args.where };
  }

  async findAll(args: any) {
    return [{ id: 1, ...args.where }];
  }

  async update(args: any) {
    return { id: 1, ...args.data };
  }

  async remove(args: any) {
    return { id: 1, ...args.where };
  }
}

export const ShelvesRepositoryMock = {
  provide: ShelvesRepository,
  useValue: Mock,
};
