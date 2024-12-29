import { Injectable } from '@nestjs/common';
import { GoogleUser, NewUser } from '../types';

@Injectable()
export class UserMapperService {
  googleUserToUserDto(googleUser: GoogleUser): NewUser {
    return {
      email: googleUser.email,
      name: googleUser.firstName,
      icon: googleUser.picture,
    };
  }
}
