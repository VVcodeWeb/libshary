import { AuthUser } from '@api/shared/models/user.model';
import {
  CreateShelfDto,
  UpdateShelfDto,
  ShelfWithSections,
} from '@libshary/shared-types';
import { Shelf, Section } from '@prisma/client';
import { ShelvesService } from '../shelves.service';

export class ShelvesMock {
  private shelves: Shelf[] = [];
  private sections: Section[] = [];

  async create(createShelfDto: CreateShelfDto, user: AuthUser): Promise<Shelf> {
    const newShelf: Shelf = {
      id: 'mock-shelf-id',
      name: createShelfDto.name,
      description: createShelfDto.description ?? null,
      private: createShelfDto.private,
      ownerId: user.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.shelves.push(newShelf);
    return newShelf;
  }

  async findOne(
    id: string,
    user: AuthUser,
    includeAll: boolean = false,
  ): Promise<Shelf | null> {
    return (
      this.shelves.find(
        (shelf) => shelf.id === id && shelf.ownerId === user.id,
      ) || null
    );
  }

  async update(
    id: string,
    updateShelfDto: UpdateShelfDto,
    user: AuthUser,
  ): Promise<Shelf> {
    const shelfIndex = this.shelves.findIndex(
      (shelf) => shelf.id === id && shelf.ownerId === user.id,
    );
    if (shelfIndex === -1) {
      throw new Error('Shelf not found');
    }
    const updatedShelf = { ...this.shelves[shelfIndex], ...updateShelfDto };
    this.shelves[shelfIndex] = updatedShelf;
    return updatedShelf;
  }

  async remove(id: string, user: AuthUser): Promise<Shelf> {
    const shelfIndex = this.shelves.findIndex(
      (shelf) => shelf.id === id && shelf.ownerId === user.id,
    );
    if (shelfIndex === -1) {
      throw new Error('Shelf not found');
    }
    const removedShelf = this.shelves.splice(shelfIndex, 1)[0];
    return removedShelf;
  }

  async findAll(user: AuthUser): Promise<ShelfWithSections[]> {
    return this.shelves
      .filter((shelf) => shelf.ownerId === user.id)
      .map((shelf) => ({
        ...shelf,
        sections: this.sections.filter(
          (section) => section.shelfId === shelf.id,
        ),
      }));
  }
}

export const ShelvesServiceMock = {
  provide: ShelvesService,
  useValue: ShelvesMock,
};
