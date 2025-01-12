import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ConfigurationType } from './configuration';

@Injectable()
export class ConfigurationService {
  constructor(private configService: ConfigService<ConfigurationType>) {}

  get jwt_secret() {
    return this.configService.get<string>('jwt_secret') as string;
  }
  get google_books_url() {
    return this.configService.get<string>('google_books_url') as string;
  }
  get google_books_api_key() {
    return this.configService.get<string>('google_books_api_key') as string;
  }
  get open_libary_url() {
    return this.configService.get<string>('open_libary_url') as string;
  }
  get data() {
    return this.configService.get<string>('process_api_data') as string;
  }
  get google_client_secret() {
    return this.configService.get<string>('google_client_secret') as string;
  }
  get google_client_id() {
    return this.configService.get<string>('google_client_id') as string;
  }
  get google_redirect_url() {
    return this.configService.get<string>('google_redirect_url') as string;
  }
}
