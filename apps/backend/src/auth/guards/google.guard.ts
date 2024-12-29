import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GoogleStrategy } from '../strategies/google.strategy';

@Injectable()
export class GoogleOauthGuard extends AuthGuard('google') {
  constructor(private readonly googleStrategy: GoogleStrategy) {
    super();
  }
}
