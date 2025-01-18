import { AuthUser } from '@api/shared/models/user.model';
import {
  CreateSectionDto,
  UpdateSectionDto,
  CreateSectionBookDto,
  UpdateSectionBookDto,
} from '@libshary/shared-types';
import { SectionsService } from '../sections-legacy.service';

class SectionsMock {
  create(createSectionDto: CreateSectionDto, user: AuthUser) {
    return Promise.resolve({
      id: 'mock-section-id',
      name: createSectionDto.name,
      shelfId: createSectionDto.shelfId,
    });
  }

  update(id: string, updateSectionDto: UpdateSectionDto, user: AuthUser) {
    return Promise.resolve({
      id,
      ...updateSectionDto,
    });
  }

  remove(id: string, user: AuthUser) {
    return Promise.resolve({
      id,
    });
  }

  findSectionBooks(sectionId: string, user: AuthUser) {
    return Promise.resolve([
      {
        id: 'mock-section-book-id',
        sectionId,
        book: {
          id: 'mock-book-id',
          title: 'Mock Book',
          authors: ['Mock Author'],
        },
      },
    ]);
  }

  createSectionBook(
    sectionId: string,
    createSectionBookDto: CreateSectionBookDto,
    user: AuthUser,
  ) {
    return Promise.resolve({
      id: 'mock-section-book-id',
      sectionId,
      bookId: 'mock-book-id',
    });
  }

  updateSectionBook(
    sectionId: string,
    updateSectionBookDto: UpdateSectionBookDto,
    user: AuthUser,
    bookId: string,
  ) {
    return Promise.resolve({
      sectionId,
      bookId,
      newSectionId: updateSectionBookDto.newSectionId,
    });
  }

  removeSectionBook(sectionId: string, bookId: string, user: AuthUser) {
    return Promise.resolve({
      sectionId,
      bookId,
    });
  }
}
export const SectionsServiceMock = {
  provide: SectionsService,
  useValue: SectionsMock,
};
