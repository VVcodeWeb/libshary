import { Book, Prisma } from '@prisma/client';

export type ShelfWithSections = Prisma.ShelfGetPayload<{
  include: {
    sections: true;
  };
}>;

export type ShelfWithSectionsBooks = Prisma.ShelfGetPayload<{
  include: {
    sections: {
      include: {
        books: {
          include: {
            book: true;
          };
        };
      };
    };
  };
}>;

export type BookWithSection = Book & { sectionId: string };
