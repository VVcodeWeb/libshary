import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { AuthUser } from '@api/shared/models/user.model';
import { PrismaService } from '../prisma/prisma.service';
import { firstValueFrom, Observable } from 'rxjs';
import { SectionsBooksRepository } from './sections-books.repository';
import {
  CreateSectionBookInput,
  UpdateSectionBookInput,
} from './dto/section-book.input';
import { AuthorizationService } from '@api/shared/services/authorization.service';
import { ClientGrpc } from '@nestjs/microservices';
import { transientBookToBook } from '@api/shared/mappers/grpc.mapper';
import {
  BookSearchClient,
  BookSearchByIdRequest,
  SearchApi,
  BookSearchByIdResponse,
} from '@api/__generated_proto__/booksearch';

@Injectable()
export class SectionsBooksService {
  private bookSearchClient: BookSearchClient;

  constructor(
    private sectionBooksRepository: SectionsBooksRepository,
    private prisma: PrismaService,
    private authorizationService: AuthorizationService,
    @Inject('BOOKSEARCH') private client: ClientGrpc,
  ) {}
  private logger = new Logger(SectionsBooksService.name);

  onModuleInit() {
    this.bookSearchClient =
      this.client.getService<BookSearchClient>('BookSearch');
  }

  async create(
    createSectionBookInput: CreateSectionBookInput,
    user: AuthUser,
    include: Record<string, any>,
  ) {
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
    this.logger.log({ bookExists });
    if (bookExists) {
      return this.sectionBooksRepository.create({
        data: {
          bookId: bookExists.id,
          sectionId,
        },
        include,
      });
    }
    const request: BookSearchByIdRequest = {
      id: googleBookId,
      apiProvider: SearchApi.GOOGLE_BOOKS,
    };
    try {
      const response = await firstValueFrom(
        this.bookSearchClient.searchById(
          request,
        ) as Observable<BookSearchByIdResponse>,
      );
      const transientBook = response.book;
      if (!transientBook) {
        throw new BadRequestException(`Book with id ${googleBookId} not found`);
      }
      const book = transientBookToBook(transientBook);
      return this.sectionBooksRepository.create({
        data: {
          book: {
            connectOrCreate: {
              where: { googleBookId: book.googleBookId },
              create: {
                ...book,
                title: book.title,
              },
            },
          },
          section: {
            connect: {
              id: sectionId,
            },
          },
        },
        include,
      });
    } catch (error) {
      this.logger.error(
        `Error fetching book with id ${googleBookId} from gRPC service. Message: ${error}`,
      );
      throw new InternalServerErrorException('Error finding the book');
    }
  }

  async find(sectionId: string, user: AuthUser, include: Record<string, any>) {
    return this.sectionBooksRepository.find({
      where: {
        sectionId,
        section: {
          shelf: {
            ownerId: user.id,
          },
        },
      },
      include,
    });
  }

  async findAll(user: AuthUser, include: Record<string, any>) {
    return this.sectionBooksRepository.find({
      where: {
        section: {
          shelf: {
            ownerId: user.id,
          },
        },
      },
      include,
    });
  }

  async update(
    id: string,
    updateSectionBookInput: UpdateSectionBookInput,
    user: AuthUser,
    include: Record<string, any>,
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
      include,
    });
  }

  async remove(
    sectionId: string,
    bookId: string,
    user: AuthUser,
    include: Record<string, any>,
  ) {
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
      include,
    });
  }

  #throwNotFoundOrNoPermission = (sectionId: string) => {
    throw new BadRequestException(
      `Section with id ${sectionId} not found or you do not have permission to access it`,
    );
  };
}
