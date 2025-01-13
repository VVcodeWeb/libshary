import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { AuthUser } from '@api/shared/models/user.model';
import { PrismaService } from '../prisma/prisma.service';
import { firstValueFrom } from 'rxjs';
import {
  CreateSectionBookDto,
  CreateSectionDto,
  SearchApi,
  TransientBookModel,
  UpdateSectionBookDto,
  UpdateSectionDto,
} from '@libshary/shared-types';
import { HttpService } from '@nestjs/axios';
import { ConfigurationService } from '@api/config/configuration.service';
import { AxiosError } from 'axios';

//TODO: CRUD handle different prisma errors
@Injectable()
export class SectionsService {
  constructor(
    private readonly prisma: PrismaService,
    private httpService: HttpService,
    private configurationService: ConfigurationService,
  ) {}
  private logger = new Logger(SectionsService.name);

  async create(createSectionDto: CreateSectionDto, user: AuthUser) {
    const shelf = await this.prisma.shelf.findUnique({
      where: {
        id: createSectionDto.shelfId,
        ownerId: user.id,
      },
    });
    if (!shelf) {
      throw new BadRequestException(
        `Shelf with id ${createSectionDto.shelfId} not found or you do not have permission to access it`,
      );
    }
    return this.prisma.section
      .create({
        data: {
          name: createSectionDto.name,
          shelfId: shelf.id,
        },
      })
      .catch((e) => {
        this.logger.error(e);
        throw new InternalServerErrorException(`Error creating section`);
      });
  }

  async update(id: string, updateSectionDto: UpdateSectionDto, user: AuthUser) {
    return this.prisma.section
      .update({
        where: {
          id,
          shelf: {
            ownerId: user.id,
          },
        },
        data: {
          ...updateSectionDto,
        },
      })
      .catch((e) => {
        this.logger.error(e);
        throw new InternalServerErrorException(`Error updating section ${id}`);
      });
  }

  async remove(id: string, user: AuthUser) {
    return this.prisma.section
      .delete({
        where: {
          id,
          shelf: {
            ownerId: user.id,
          },
        },
      })
      .catch((e) => {
        this.logger.error(e);
        throw new InternalServerErrorException(`Error removing section ${id}`);
      });
  }

  async findSectionBooks(sectionId: string, user: AuthUser) {
    return this.prisma.sectionBook
      .findMany({
        where: {
          sectionId,
          section: {
            shelf: {
              ownerId: user.id,
            },
          },
        },
        include: {
          book: true,
        },
      })
      .catch((e) => {
        this.logger.error(e);
        throw new InternalServerErrorException(e);
      });
  }

  async createSectionBook(
    sectionId: string,
    createSectionBookDto: CreateSectionBookDto,
    user: AuthUser,
  ) {
    if (!this.#userHasAccessToSection(sectionId, user.id)) {
      this.#throwNotFoundOrNoPermission(sectionId);
    }
    const googleBookId = createSectionBookDto.googleBookId;
    const bookExists = await this.prisma.book.findUnique({
      where: {
        googleBookId,
      },
    });
    if (bookExists) {
      return this.prisma.sectionBook.create({
        data: {
          bookId: bookExists.id,
          sectionId,
        },
      });
    }

    const bookSearchUrl = this.configurationService.book_search_url.concat(
      '/book/',
      googleBookId,
      `?api=${SearchApi.google_books}`,
    );
    try {
      const response = await firstValueFrom(
        this.httpService.get(bookSearchUrl),
      );
      const book = response.data as TransientBookModel;
      if (!book) {
        throw new BadRequestException({
          message: `BOOK_NOT_FOUND`,
        });
      }
      return this.prisma.sectionBook.create({
        data: {
          book: {
            connectOrCreate: {
              where: { googleBookId: book.googleBookId },
              create: book,
            },
          },
          section: {
            connect: {
              id: sectionId,
            },
          },
        },
      });
    } catch (error) {
      if (
        error instanceof BadRequestException &&
        error.message === 'BOOK_NOT_FOUND'
      ) {
        throw new BadRequestException(
          `Book with id ${googleBookId} not found in Google Books API or database`,
        );
      }
      if (error instanceof AxiosError) {
        this.logger.error(
          `HTTP request to book search service failed. 
         URL: ${bookSearchUrl}, 
         Status: ${error.response?.status || 'unknown'}, 
         Message: ${error.message}`,
        );
        throw new InternalServerErrorException(
          `Unable to fetch book with id ${googleBookId} details from the book search service. Please try again later.`,
        );
      }
      this.logger.error(
        `Unexpected error while creating section book. Message: ${error}`,
      );
      throw new InternalServerErrorException(`Error creating section book`);
    }
  }

  async updateSectionBook(
    sectionId: string,
    updateSectionBookDto: UpdateSectionBookDto,
    user: AuthUser,
    bookId: string,
  ) {
    if (!this.#userHasAccessToSection(sectionId, user.id)) {
      this.#throwNotFoundOrNoPermission(sectionId);
    }
    return this.prisma.sectionBook
      .update({
        where: {
          sectionId_bookId: {
            sectionId,
            bookId,
          },
        },
        data: {
          sectionId: updateSectionBookDto.newSectionId,
        },
      })
      .catch((e) => {
        this.logger.error(e);
        throw new InternalServerErrorException(
          `Error updating section ${sectionId} book ${bookId}`,
        );
      });
  }

  async removeSectionBook(sectionId: string, bookId: string, user: AuthUser) {
    if (!this.#userHasAccessToSection(sectionId, user.id)) {
      this.#throwNotFoundOrNoPermission(sectionId);
    }
    return this.prisma.sectionBook
      .delete({
        where: {
          sectionId_bookId: {
            sectionId,
            bookId,
          },
        },
      })
      .catch((e) => {
        this.logger.error(e);
        throw new BadRequestException(e);
      });
  }

  #userHasAccessToSection = async (sectionId: string, userId: string) => {
    const section = await this.prisma.section.findUnique({
      where: { id: sectionId },
      include: {
        shelf: true,
      },
    });
    return Boolean(section && section.shelf.ownerId === userId);
  };

  #throwNotFoundOrNoPermission = (sectionId: string) => {
    throw new BadRequestException(
      `Section with id ${sectionId} not found or you do not have permission to access it`,
    );
  };
}
