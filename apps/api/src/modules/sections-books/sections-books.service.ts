import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { AuthUser } from '@api/shared/models/user.model';
import { PrismaService } from '../prisma/prisma.service';
import { firstValueFrom } from 'rxjs';
import { SearchApi, TransientBookModel } from '@libshary/shared-types';
import { HttpService } from '@nestjs/axios';
import { ConfigurationService } from '@api/config/configuration.service';
import { AxiosError } from 'axios';
import { SectionsBooksRepository } from './sections-books.repository';
import {
  CreateSectionBookInput,
  UpdateSectionBookInput,
} from './dto/section-book.input';
import { AuthorizationService } from '@api/shared/services/authorization.service';

@Injectable()
export class SectionsBooksService {
  constructor(
    private httpService: HttpService,
    private configurationService: ConfigurationService,
    private sectionBooksRepository: SectionsBooksRepository,
    private prisma: PrismaService,
    private authorizationService: AuthorizationService,
  ) {}
  private logger = new Logger(SectionsBooksService.name);

  async create(createSectionBookInput: CreateSectionBookInput, user: AuthUser) {
    const { sectionId, googleBookId } = createSectionBookInput;
    const hasAccess = await this.authorizationService.userHasAccessToSection(
      sectionId,
      user.id,
    );
    if (!hasAccess) {
      this.#throwNotFoundOrNoPermission(sectionId);
    }
    const bookExists = await this.prisma.book.findUnique({
      where: {
        googleBookId,
      },
    });
    if (bookExists) {
      return this.sectionBooksRepository.create({
        data: {
          bookId: bookExists.id,
          sectionId,
        },
      });
    }

    const bookSearchUrl = this.configurationService.book_search_url.concat(
      '/search',
      `?bookId=${googleBookId}`,
      `&api=${SearchApi.google_books}`,
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

      return this.sectionBooksRepository.create({
        data: {
          book: {
            connectOrCreate: {
              where: { googleBookId: book.googleBookId },
              create: {
                ...book,
                title: book.title || 'Untitled',
              },
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

  async find(sectionId: string, user: AuthUser) {
    return this.sectionBooksRepository.find({
      where: {
        sectionId,
        section: {
          shelf: {
            ownerId: user.id,
          },
        },
      },
    });
  }
  async findAll(user: AuthUser) {
    return this.sectionBooksRepository.find({
      where: {
        section: {
          shelf: {
            ownerId: user.id,
          },
        },
      },
    });
  }

  async update(
    id: string,
    updateSectionBookInput: UpdateSectionBookInput,
    user: AuthUser,
  ) {
    const { sectionId } = updateSectionBookInput;
    const hasAccess = await this.authorizationService.userHasAccessToSection(
      sectionId,
      user.id,
    );
    if (!hasAccess) {
      this.#throwNotFoundOrNoPermission(sectionId);
    }
    return this.sectionBooksRepository.update({
      where: {
        id,
      },
      data: {
        sectionId,
      },
    });
  }

  async remove(sectionId: string, bookId: string, user: AuthUser) {
    const hasAccess = await this.authorizationService.userHasAccessToSection(
      sectionId,
      user.id,
    );
    if (!hasAccess) {
      this.#throwNotFoundOrNoPermission(sectionId);
    }
    return this.sectionBooksRepository.remove({
      where: {
        sectionId_bookId: {
          sectionId,
          bookId,
        },
      },
    });
  }

  #throwNotFoundOrNoPermission = (sectionId: string) => {
    throw new BadRequestException(
      `Section with id ${sectionId} not found or you do not have permission to access it`,
    );
  };
}
