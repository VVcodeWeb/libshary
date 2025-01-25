import { AuthorizationService } from '../authorization.service';

class Mock {
  async userHasAccessToShelf() {
    return true;
  }

  async userHasAccessToSection() {
    return true;
  }
}

export const AuthorizationServiceMock = {
  provide: AuthorizationService,
  useValue: Mock,
};
