import { ConfigurationService } from '../configuration.service';

class configurationService {
  private readonly mockConfig = {
    jwt_secret: 'mockJwtSecret',
    process_api_data: 'mockProcessApiData',
    google_client_secret: 'mockGoogleClientSecret',
    google_client_id: 'mockGoogleClientId',
    google_redirect_url: 'mockGoogleRedirectUrl',
  };

  get jwt_secret() {
    return this.mockConfig.jwt_secret;
  }
  get data() {
    return this.mockConfig.process_api_data;
  }
  get google_client_secret() {
    return this.mockConfig.google_client_secret;
  }
  get google_client_id() {
    return this.mockConfig.google_client_id;
  }
  get google_redirect_url() {
    return this.mockConfig.google_redirect_url;
  }
}
export const ConfigurationServiceMock = {
  provide: ConfigurationService,
  useClass: configurationService,
};
