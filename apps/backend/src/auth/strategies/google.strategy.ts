import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';

import { Injectable } from '@nestjs/common';
const config = {
  web: {
    client_id:
      '514944905436-2gkbm5aidudgmtadotoflo779jm1nfk2.apps.googleusercontent.com',
    project_id: 'shelves-445909',
    auth_uri: 'https://accounts.google.com/o/oauth2/auth',
    token_uri: 'https://oauth2.googleapis.com/token',
    auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
    client_secret: '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',
    redirect_uris: [
      'http://localhost:8080/api/auth/google/callback',
      'http://localhost:3000/auth/google/redirect',
    ],
    javascript_origins: ['http://localhost:3000'],
  },
};

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: config.web.client_id, //process.env.GOOGLE_CLIENT_ID,
      clientSecret: config.web.client_secret, //process.env.GOOGLE_SECRET,
      callbackURL: 'http://localhost:3000/auth/google/redirect',
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const { name, emails, photos } = profile;
    const user = {
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      picture: photos[0].value,
      accessToken,
    };
    done(null, user);
  }
}
