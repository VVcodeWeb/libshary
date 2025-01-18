import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { BooksRepository } from './books.repository';
import { BookSearchArgs } from './dto/book-search.args';
import { firstValueFrom } from 'rxjs';
import { ConfigurationService } from '@api/config/configuration.service';
import { HttpService } from '@nestjs/axios';
import { BookFindArgs } from './dto/book-find.args';

@Injectable()
export class BooksService {
  private logger = new Logger(BooksService.name);
  constructor(
    private booksRepository: BooksRepository,
    private configurationService: ConfigurationService,
    private httpService: HttpService,
  ) {}

  async findOne(bookFindArgs: BookFindArgs) {
    return await this.booksRepository.findOne({
      where: {
        OR: [
          { id: bookFindArgs.id },
          { googleBookId: bookFindArgs.googleBookId },
        ],
      },
    });
  }

  async search(bookSearchArgs: BookSearchArgs) {
    const { q, api } = bookSearchArgs;
    let url = this.configurationService.book_search_url.concat(
      '/search',
      `?q=${q}`,
    );
    if (api) url += `&api=${api}`;
    try {
      const response = await firstValueFrom(this.httpService.get(url));
      this.logger.log(`HTTP request to book search service succeeded`);
      return response.data;
    } catch (error) {
      this.logger.error(`HTTP request to book search service failed`, error);
      throw new InternalServerErrorException(
        `HTTP request to book search service failed`,
      );
    }
  }
}
