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
import { GraphQLResolveInfo } from 'graphql';
import { generatePrismaInclude } from '@api/shared/utils/graphql-field-parser';

@Injectable()
export class SectionsService {
  private logger = new Logger(SectionsService.name);
  constructor(
    private sectionsRepository: SectionsRepository,
    private authorizationService: AuthorizationService,
  ) {}

  async create(
    createSectionInput: CreateSectionInput,
    user: AuthUser,
    include: Record<string, any>,
  ) {
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
      include,
    });
  }

  async findOne(id: string, user: AuthUser, include: Record<string, any>) {
    const section = await this.sectionsRepository.findOne({
      where: {
        id,
      },
      include,
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

  async findAll(user: AuthUser, include: Record<string, any>) {
    try {
      return this.sectionsRepository.findAll({
        where: {
          shelf: {
            ownerId: user.id,
          },
        },
        include,
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
    include: Record<string, any>,
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
        include,
      });
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Error updating section');
    }
  }

  async remove(id: string, user: AuthUser, include: Record<string, any>) {
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
        include,
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
