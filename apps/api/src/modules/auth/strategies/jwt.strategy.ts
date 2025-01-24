import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '@api/modules/prisma/prisma.service';
import configuration from '@api/config/configuration';

type JwtPayload = {
  sub: string;
  email: string;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  private logger = new Logger(JwtStrategy.name);
  constructor(private prisma: PrismaService) {
    const extractJwtFromCookie = (req) => {
      let token = null;
      if (req && req.cookies) {
        token = req.cookies['access_token'];
      }
      return token || ExtractJwt.fromAuthHeaderAsBearerToken()(req);
    };

    super({
      ignoreExpiration: true,
      secretOrKey: configuration().jwt_secret,
      jwtFromRequest: extractJwtFromCookie,
      passReqToCallback: true,
    });
  }

  async validate(payload: JwtPayload) {
    const user = await this.prisma.user.findFirst({
      where: { id: payload.sub },
    });

    if (!user) throw new UnauthorizedException('Not logged in');
    return {
      id: user.id,
      email: user.email,
    };
  }
}
