import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { SearchApi } from '@libshary/shared-types';
import { HttpService } from '@nestjs/axios';
import { ConfigurationService } from '@api/config/configuration.service';
import { firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
@Injectable()
export class BooksService {
  private readonly logger = new Logger(BooksService.name);
  constructor(
    private httpService: HttpService,
    private configurationService: ConfigurationService,
  ) {}

  create() {
    return 'This action adds a new book';
  }

  findAll() {
    return `This action returns all books`;
  }

  findOne(id: string) {
    return `This action returns a #${id} book`;
  }

  update(id: string) {
    return `This action updates a #${id} book`;
  }

  remove(id: string) {
    return `This action removes a #${id} book`;
  }

  async search(query: string, api: SearchApi) {
    let url = this.configurationService.book_search_url.concat(
      '/search',
      `?q=${query}`,
    );
    if (api) url += `&api=${api}`;
    try {
      const response = await firstValueFrom(this.httpService.get(url));
      return response.data;
    } catch (error) {
      this.logger.error(`HTTP request to book search service failed`);
      throw new InternalServerErrorException(
        `HTTP request to book search service failed`,
      );
    }
  }
}
