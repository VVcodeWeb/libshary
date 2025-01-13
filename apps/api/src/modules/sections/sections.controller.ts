import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { SectionsService } from './sections.service';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { AuthUser } from '@api/shared/models/user.model';
import { User } from '@api/shared/decorators/user.decorator';
import {
  CreateSectionBookDto,
  createSectionBookSchema,
  CreateSectionDto,
  createSectionSchema,
  UpdateSectionBookDto,
  updateSectionBookSchema,
  UpdateSectionDto,
  updateSectionSchema,
} from '@libshary/shared-types';
import { ZodPipe } from '@api/shared/pipes/zod.pipe';

@UseGuards(JwtAuthGuard)
@Controller('sections')
export class SectionsController {
  constructor(private readonly sectionsService: SectionsService) {}

  @Post()
  create(
    @Body(new ZodPipe(createSectionSchema)) createSectionDto: CreateSectionDto,
    @User() user: AuthUser,
  ) {
    return this.sectionsService.create(createSectionDto, user);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body(new ZodPipe(updateSectionSchema)) updateSectionDto: UpdateSectionDto,
    @User() user: AuthUser,
  ) {
    return this.sectionsService.update(id, updateSectionDto, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @User() user: AuthUser) {
    return this.sectionsService.remove(id, user);
  }

  @Get(':id/books')
  findSectionBooks(@Param('id') sectionId: string, @User() user: AuthUser) {
    return this.sectionsService.findSectionBooks(sectionId, user);
  }
  @Post(':id/books')
  createSectionBook(
    @Param('id') sectionId: string,
    @Body(new ZodPipe(createSectionBookSchema))
    createSectionBookDto: CreateSectionBookDto,
    @User() user: AuthUser,
  ) {
    return this.sectionsService.createSectionBook(
      sectionId,
      createSectionBookDto,
      user,
    );
  }

  @Patch(':id/books/:bookId')
  updateSectionBook(
    @Param('id') id: string,
    @Param('bookId') bookId: string,
    @User() user: AuthUser,
    @Body(new ZodPipe(updateSectionBookSchema))
    updateSectionBookDto: UpdateSectionBookDto,
  ) {
    return this.sectionsService.updateSectionBook(
      id,
      updateSectionBookDto,
      user,
      bookId,
    );
  }
  @Delete(':id/books/:bookId')
  removeSectionBook(
    @Param('id') id: string,
    @Param('bookId') bookId: string,
    @User() user: AuthUser,
  ) {
    return this.sectionsService.removeSectionBook(id, bookId, user);
  }
}
