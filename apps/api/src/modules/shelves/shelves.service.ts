import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { AuthUser } from '@api/shared/models/user.model';
import { CreateShelfInput, UpdateShelfInput } from './dto/shelves.input';
import { ShelvesRepository } from './shelves.repository';
import { AuthorizationService } from '@api/shared/services/authorization.service';
import { GraphQLResolveInfo } from 'graphql';
import { generatePrismaInclude } from '@api/shared/utils/graphql-field-parser';

@Injectable()
export class ShelvesService {
  private logger = new Logger(ShelvesService.name);
  constructor(
    private shelvesRepository: ShelvesRepository,
    private authorizationService: AuthorizationService,
  ) {}

  async create(
    createShelfInput: CreateShelfInput,
    user: AuthUser,
    info: GraphQLResolveInfo,
  ) {
    const include = generatePrismaInclude(info);
    const DEFAULT_SECTIONS = ['Read', 'Currently reading', 'Want to read'];
    const { defaultSections, color, ...data } = createShelfInput;
    if (createShelfInput.defaultSections) {
      return await this.shelvesRepository.create({
        data: {
          ...data,
          ownerId: user.id,
          sections: {
            createMany: {
              data: DEFAULT_SECTIONS.map((name) => ({ name })),
            },
          },
        },
        include,
      });
    }
    return await this.shelvesRepository.create({
      data: { ...data, ownerId: user.id },
      include,
    });
  }

  async findOne(id: string, user: AuthUser, info: GraphQLResolveInfo) {
    const include = generatePrismaInclude(info);
    const shelf = await this.shelvesRepository.findOne({
      where: {
        id,
      },
      include,
    });
    const hasAccess =
      shelf &&
      (await this.authorizationService.userHasAccessToShelf(shelf.id, user.id));

    if (!hasAccess) {
      this.#throwNotFoundOrNoPermission(id);
    }
    return shelf;
  }

  async findAll(user: AuthUser, info: GraphQLResolveInfo) {
    const include = generatePrismaInclude(info);
    try {
      return await this.shelvesRepository.findAll({
        where: {
          ownerId: user.id,
        },
        include,
      });
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Error finding shelfs');
    }
  }

  async update(
    id: string,
    updateShelfInput: UpdateShelfInput,
    user: AuthUser,
    info: GraphQLResolveInfo,
  ) {
    const include = generatePrismaInclude(info);
    const hasAccess = await this.authorizationService.userHasAccessToShelf(
      id,
      user.id,
    );
    if (!hasAccess) {
      this.#throwNotFoundOrNoPermission(id);
    }
    try {
      return await this.shelvesRepository.update({
        where: {
          id,
        },
        data: updateShelfInput,
        include,
      });
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Error updating shelf');
    }
  }

  async remove(id: string, user: AuthUser, info: GraphQLResolveInfo) {
    const include = generatePrismaInclude(info);
    const hasAccess = await this.authorizationService.userHasAccessToShelf(
      id,
      user.id,
    );
    if (!hasAccess) {
      this.#throwNotFoundOrNoPermission(id);
    }
    try {
      return await this.shelvesRepository.remove({
        where: {
          id,
        },
        include,
      });
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }
  #throwNotFoundOrNoPermission = (shelfId: string) => {
    throw new BadRequestException(
      `Shelf with id ${shelfId} not found or you do not have permission to access it`,
    );
  };
}
