import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '@api/modules/prisma/prisma.service';
import { ShelfModel } from '@api/modules/shelves/models/shelves.model';
import { SectionModel } from '@api/modules/sections/models/section.model';

@Injectable()
export class AuthorizationService {
  constructor(@Inject() private readonly prisma: PrismaService) {}

  async userHasAccessToShelf(
    shelfOrId: ShelfModel | string,
    userId: string,
  ): Promise<boolean> {
    let shelf: ShelfModel | null;
    if (typeof shelfOrId === 'string') {
      shelf = await this.prisma.shelf.findFirst({ where: { id: shelfOrId } });
    } else {
      shelf = shelfOrId;
    }

    return shelf ? shelf.ownerId === userId : false;
  }

  async userHasAccessToSection(
    sectionOrId: SectionModel | string,
    userId: string,
  ): Promise<boolean> {
    let section: SectionModel | null;
    if (typeof sectionOrId === 'string') {
      section = await this.prisma.section.findFirst({
        where: { id: sectionOrId },
        include: { shelf: true },
      });
      if (!section) return false;
    } else {
      section = sectionOrId;
    }
    return this.userHasAccessToShelf(section.shelf, userId);
  }
}
