import { User } from '@prisma/client';

export type NewUser = Omit<User, 'id'>;
export type GoogleUser = {
  email: string;
  firstName: string;
  picture?: string;
  lastName?: string;
  accessToken: string;
};

export type JwtPayload = {
  sub: string;
  email: string;
};
