import { Resolver, Query, Mutation, Args, Info } from '@nestjs/graphql';
import { ShelvesService } from './shelves.service';
import { AuthUser } from '@api/shared/models/user.model';
import { Shelf } from '@prisma/client';
import { User } from '@api/shared/decorators/user.decorator';
import { CreateShelfInput, UpdateShelfInput } from './dto/shelves.input';
import { ShelfModel } from './models/shelves.model';
import { Logger, UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guards/gcl.guard';
import { GraphQLResolveInfo } from 'graphql';
import { parseResolveInfo } from 'graphql-parse-resolve-info';

@Resolver(() => ShelfModel)
@UseGuards(GqlAuthGuard)
export class ShelvesResolver {
  private logger = new Logger(ShelvesResolver.name);
  constructor(private readonly shelvesService: ShelvesService) {}

  @Mutation(() => ShelfModel)
  createShelf(
    @Args('createShelfInput') createShelfInput: CreateShelfInput,
    @User() user: AuthUser,
  ): Promise<Shelf> {
    return this.shelvesService.create(createShelfInput, user);
  }

  @Query(() => ShelfModel, { nullable: true })
  async findShelf(
    @Args('id') id: string,
    @User() user: AuthUser,
    @Info() info: GraphQLResolveInfo,
  ): Promise<Shelf | null> {
    return this.shelvesService.findOne(id, user);
  }

  @Query(() => [ShelfModel], { nullable: true })
  async findAllShelves(
    @User() user: AuthUser,
    @Info() info: GraphQLResolveInfo,
  ): Promise<Shelf[]> {
    const parsedInfo = parseResolveInfo(info, {
      deep: true,
    });
    this.logger.log({ parsedInfo });
    return this.shelvesService.findAll(user);
  }

  @Mutation(() => ShelfModel)
  updateShelf(
    @Args('id') id: string,
    @Args('updateShelfInput') updateShelfInput: UpdateShelfInput,
    @User() user: AuthUser,
  ): Promise<Shelf> {
    return this.shelvesService.update(id, updateShelfInput, user);
  }

  @Mutation(() => ShelfModel)
  removeShelf(@Args('id') id: string, @User() user: AuthUser): Promise<Shelf> {
    return this.shelvesService.remove(id, user);
  }
}
