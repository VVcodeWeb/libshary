import { Controller, Query, UseGuards } from '@nestjs/common';
import { Body, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ShelvesService } from './shelves.service';
import { JwtAuthGuard } from '@api/modules/auth/guards/jwt.guard';
import { User } from '@api/shared/decorators/user.decorator';
import { AuthUser } from '@api/shared/models/user.model';
import { ZodPipe } from '@api/shared/pipes/zod.pipe';
import {
  createShelfSchema,
  updateShelfSchema,
  UpdateShelfDto,
  CreateShelfDto,
  shelfQuerySchema,
} from '@bookshary/shared-types';

@UseGuards(JwtAuthGuard)
@Controller('shelves')
export class ShelvesController {
  constructor(private readonly shelvesService: ShelvesService) {}

  @Post()
  create(
    @Body(new ZodPipe(createShelfSchema)) createShelfDto: CreateShelfDto,
    @User() user: AuthUser,
  ) {
    return this.shelvesService.create(createShelfDto, user);
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @User() user: AuthUser,
    @Query(new ZodPipe(shelfQuerySchema)) includeAll: boolean,
  ) {
    return this.shelvesService.findOne(id, user, includeAll);
  }

  @Get('')
  findAll(@User() user: AuthUser) {
    return this.shelvesService.findAll(user);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body(new ZodPipe(updateShelfSchema)) updateShelfDto: UpdateShelfDto,
    @User() user: AuthUser,
  ) {
    return this.shelvesService.update(id, updateShelfDto, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @User() user: AuthUser) {
    return this.shelvesService.remove(id, user);
  }
}
