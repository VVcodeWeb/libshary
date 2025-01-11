import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { GoogleLoginUserDto } from './dto/google-user.dto';
import { ConfigurationService } from '@api/config/configuration.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
    private configService: ConfigurationService,
  ) {}

  signJwt(
    userId: string,
    access_token: string,
    expires_at: number,
    expiresIn = '1d',
  ): Promise<string> {
    const payload = {
      sub: userId,
      access_token,
      expires_at,
    };
    return this.jwtService.signAsync(payload, {
      expiresIn,
      secret: this.configService.jwt_secret,
    });
  }

  async googleLogin(user: GoogleLoginUserDto) {
    if (!user) {
      throw new UnauthorizedException('No user from google');
    }
    const {
      firstName,
      lastName,
      email,
      email_verified,
      expires_in,
      picture,
      providerAccountId,
      accessToken,
      refreshToken,
      id_token,
    } = user;
    const userData = await this.prisma.user.findFirst({
      where: { email },
      include: { accounts: true },
    });

    if (!userData) {
      const newUserData = await this.prisma.user.create({
        data: {
          name: `${firstName} ${lastName}`,
          email: email,
          emailVerified: email_verified ? new Date().toISOString() : null,
          image: picture,
          accounts: {
            create: {
              type: 'oauth',
              provider: 'google',
              providerAccountId: providerAccountId,
              access_token: accessToken,
              refresh_token: refreshToken,
              id_token: id_token,
              expires_at: expires_in,
            },
          },
        },
      });
      const access_token = await this.signJwt(
        newUserData.id,
        accessToken,
        expires_in,
      );
      return { access_token };
    }
    const access_token = await this.signJwt(
      userData.id,
      accessToken,
      expires_in,
    );
    return { access_token };
  }
}
