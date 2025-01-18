import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthUser } from '@api/shared/models/user.model';
import { CreateShelfInput, UpdateShelfInput } from './dto/shelves.input';
import { ShelvesRepository } from './shelves.repository';
import { AuthorizationService } from '@api/shared/services/authorization.service';

@Injectable()
export class ShelvesService {
  private logger = new Logger(ShelvesService.name);
  constructor(
    private shelvesRepository: ShelvesRepository,
    private authorizationService: AuthorizationService,
  ) {}

  async create(createShelfInput: CreateShelfInput, user: AuthUser) {
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
      });
    }
    return await this.shelvesRepository.create({
      data: { ...data, ownerId: user.id },
    });
  }

  async findOne(id: string, user: AuthUser) {
    const shelf = await this.shelvesRepository.findOne({
      where: {
        id,
      },
    });
    const hasAccess =
      shelf &&
      (await this.authorizationService.userHasAccessToShelf(shelf.id, user.id));

    if (!hasAccess) {
      this.#throwNotFoundOrNoPermission(id);
    }
    return shelf;
  }

  async findAll(user: AuthUser) {
    try {
      return await this.shelvesRepository.findAll({
        where: {
          ownerId: user.id,
        },
      });
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Error finding shelfs');
    }
  }

  async update(id: string, updateShelfInput: UpdateShelfInput, user: AuthUser) {
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
      });
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Error updating shelf');
    }
  }

  async remove(id: string, user: AuthUser) {
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
