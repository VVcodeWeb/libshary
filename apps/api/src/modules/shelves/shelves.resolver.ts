import { Resolver, Query, Mutation, Args, Info } from '@nestjs/graphql';
import { ShelvesService } from './shelves.service';
import { AuthUser } from '@api/shared/models/user.model';
import { User } from '@api/shared/decorators/user.decorator';
import { Logger, UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guards/gcl.guard';
import { GraphQLResolveInfo } from 'graphql';
import { ShelfModel } from '@api/modules/shelves/models/shelves.model';
import {
  CreateShelfInput,
  UpdateShelfInput,
} from '@api/modules/shelves/dto/shelves.input';

@Resolver(() => ShelfModel)
@UseGuards(GqlAuthGuard)
export class ShelvesResolver {
  private logger = new Logger(ShelvesResolver.name);
  constructor(private readonly shelvesService: ShelvesService) {}

  @Mutation(() => ShelfModel)
  createShelf(
    @Args('createShelfInput') createShelfInput: CreateShelfInput,
    @User() user: AuthUser,
    @Info() info: GraphQLResolveInfo,
  ): Promise<ShelfModel> {
    return this.shelvesService.create(createShelfInput, user, info);
  }

  @Query(() => ShelfModel, { nullable: true })
  async findShelf(
    @Args('id') id: string,
    @User() user: AuthUser,
    @Info() info: GraphQLResolveInfo,
  ): Promise<ShelfModel | null> {
    return this.shelvesService.findOne(id, user, info);
  }

  @Query(() => [ShelfModel], { nullable: true })
  async findAllShelves(
    @User() user: AuthUser,
    @Info() info: GraphQLResolveInfo,
  ): Promise<ShelfModel[]> {
    return this.shelvesService.findAll(user, info);
  }

  @Mutation(() => ShelfModel)
  updateShelf(
    @Args('id') id: string,
    @Args('updateShelfInput') updateShelfInput: UpdateShelfInput,
    @User() user: AuthUser,
    @Info() info: GraphQLResolveInfo,
  ): Promise<ShelfModel> {
    return this.shelvesService.update(id, updateShelfInput, user, info);
  }

  @Mutation(() => ShelfModel)
  removeShelf(
    @Args('id') id: string,
    @User() user: AuthUser,
    @Info() info: GraphQLResolveInfo,
  ): Promise<ShelfModel> {
    return this.shelvesService.remove(id, user, info);
  }
}
