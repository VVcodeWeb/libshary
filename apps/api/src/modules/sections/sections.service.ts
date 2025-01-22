import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { AuthUser } from '@api/shared/models/user.model';
import { CreateSectionInput, UpdateSectionInput } from './dto/sections.input';
import { SectionsRepository } from './sections.repository';
import { AuthorizationService } from '@api/shared/services/authorization.service';

@Injectable()
export class SectionsService {
  private logger = new Logger(SectionsService.name);
  constructor(
    private sectionsRepository: SectionsRepository,
    private authorizationService: AuthorizationService,
  ) {}

  async create(createSectionInput: CreateSectionInput, user: AuthUser) {
    const hasAccess = await this.authorizationService.userHasAccessToShelf(
      createSectionInput.shelfId,
      user.id,
    );
    if (!hasAccess) {
      throw new BadRequestException(
        'Shelf not found or user does not have access to shelf',
      );
    }
    return this.sectionsRepository.create({
      data: {
        ...createSectionInput,
      },
    });
  }

  async findOne(id: string, user: AuthUser) {
    const section = await this.sectionsRepository.findOne({
      where: {
        id,
      },
    });
    const hasAccess =
      section &&
      (await this.authorizationService.userHasAccessToSection(
        section.id,
        user.id,
      ));

    if (!hasAccess) {
      this.#throwNotFoundOrNoPermission(id);
    }
    return section;
  }

  async findAll(user: AuthUser) {
    try {
      return this.sectionsRepository.findAll({
        where: {
          shelf: {
            ownerId: user.id,
          },
        },
      });
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Error finding sections');
    }
  }

  async update(
    id: string,
    updateSectionInput: UpdateSectionInput,
    user: AuthUser,
  ) {
    const hasAccess = await this.authorizationService.userHasAccessToSection(
      id,
      user.id,
    );
    if (!hasAccess) {
      this.#throwNotFoundOrNoPermission(id);
    }
    try {
      return this.sectionsRepository.update({
        where: {
          id,
        },
        data: updateSectionInput,
      });
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Error updating section');
    }
  }

  async remove(id: string, user: AuthUser) {
    const hasAccess = await this.authorizationService.userHasAccessToSection(
      id,
      user.id,
    );
    if (!hasAccess) {
      this.#throwNotFoundOrNoPermission(id);
    }
    try {
      return this.sectionsRepository.remove({
        where: {
          id,
        },
      });
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }

  #throwNotFoundOrNoPermission = (sectionId: string) => {
    throw new BadRequestException(
      `Section with id ${sectionId} not found or you do not have permission to access it`,
    );
  };
}
