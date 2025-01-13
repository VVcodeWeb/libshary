import { PrismaService } from '@api/modules/prisma/prisma.service';
import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { AuthUser } from '@api/shared/models/user.model';
import {
  BookWithSection,
  CreateShelfDto,
  ShelfWithSections,
  ShelfWithSectionsBooks,
  UpdateShelfDto,
} from '@libshary/shared-types';
import { Section, Shelf } from '@prisma/client';

//TODO: move it
const defaultSections = ['read', 'currently_reading', 'want_to_read'];

@Injectable()
export class ShelvesService {
  private logger = new Logger(ShelvesService.name);
  constructor(private prisma: PrismaService) {}

  //TODO: icon&colour
  async create(createShelfDto: CreateShelfDto, user: AuthUser) {
    const res = await this.prisma.$transaction(async (prisma) => {
      const shelf = await this.prisma.shelf
        .create({
          data: {
            private: createShelfDto.private,
            description: createShelfDto.description,
            name: createShelfDto.name,
            ownerId: user.id,
          },
        })
        .catch((error) => {
          this.logger.error(error);
          throw new InternalServerErrorException('Error creating shelf');
        });
      if (createShelfDto.defaultSections) {
        return prisma.section
          .createMany({
            data: defaultSections.map((sectionName) => ({
              name: sectionName,
              shelfId: shelf.id,
            })),
          })
          .catch((error) => {
            this.logger.error(error);
            throw new InternalServerErrorException(
              'Error creating default sections',
            );
          });
      }
      return shelf;
    });
    this.logger.log({ res });
    return res;
  }
  /**
   * @returns Retrieves shelf -> sections -> books
   */
  async findOne(
    id: string,
    user: AuthUser,
    includeAll: boolean,
  ): Promise<
    | Shelf
    | null
    | { shelf: Shelf; sections: Section[]; books: BookWithSection[] }
  > {
    const baseWhere = {
      id,
      ownerId: user.id,
    };
    if (!includeAll) {
      return await this.prisma.shelf.findUnique({
        where: baseWhere,
      });
    }
    const shelfSectionBooks = await this.prisma.shelf.findUnique({
      where: baseWhere,
      include: {
        sections: {
          include: {
            books: {
              include: {
                book: true,
              },
            },
          },
        },
      },
    });

    if (shelfSectionBooks) {
      const { sections, ...shelf } = shelfSectionBooks;
      const books = sections.flatMap((section) =>
        section.books.map((book) => ({
          ...book.book,
          sectionId: section.id,
        })),
      );
      const sectionsWithoutBooks = sections.map(
        ({ books: _, ...sectionProps }) => sectionProps,
      );
      return {
        shelf,
        sections: sectionsWithoutBooks,
        books,
      };
    }

    return shelfSectionBooks;
  }

  async update(id: string, updateShelfDto: UpdateShelfDto, user: AuthUser) {
    try {
      return await this.prisma.shelf.update({
        where: {
          id,
          ownerId: user.id,
        },
        data: updateShelfDto,
      });
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Error updating shelf');
    }
  }

  async remove(id: string, user: AuthUser) {
    try {
      return await this.prisma.shelf.delete({
        where: {
          id,
          ownerId: user.id,
        },
      });
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }
  /**
   * @returns Retrieves shelf and associated sections
   */
  async findAll(user: AuthUser): Promise<ShelfWithSections[]> {
    try {
      return await this.prisma.shelf.findMany({
        where: {
          ownerId: user.id,
        },
        include: {
          sections: true,
        },
      });
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Error finding shelfs');
    }
  }
}
