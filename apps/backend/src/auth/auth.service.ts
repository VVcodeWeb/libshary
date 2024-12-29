import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtPayload, NewUser } from './types';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  generateJwt(payload: JwtPayload) {
    return this.jwtService.sign(payload);
  }

  async getUser(email: string): Promise<User | null> {
    try {
      return await this.prisma.user.findUnique({
        where: {
          email: email,
        },
      });
    } catch (e) {
      throw new InternalServerErrorException('Error checking if user exists');
    }
  }

  async login(user: NewUser) {
    if (!user.email) {
      throw new BadRequestException('Cant generate token without email');
    }
    let existingUser = await this.getUser(user.email);
    if (!existingUser) {
      existingUser = await this.signUp(user);
    }

    return this.generateJwt({
      sub: existingUser.id,
      email: existingUser.email,
    });
  }

  async signUp(newUser: NewUser): Promise<User> {
    try {
      return await this.prisma.user.create({
        data: {
          name: newUser.name,
          email: newUser.email,
          icon: newUser.icon,
        },
      });
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException("Couldn't create user");
    }
  }
}
