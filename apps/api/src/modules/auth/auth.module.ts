import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GoogleStrategy } from './strategies/google.strategy';
import { PrismaModule } from '@api/modules/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigurationModule } from '@api/config/configuration.module';
import configuration from '@api/config/configuration';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    PrismaModule,
    JwtModule.register({
      secret: configuration().auth_secret,
      signOptions: { expiresIn: '60s' },
    }),
    ConfigurationModule,
  ],
  providers: [AuthService, GoogleStrategy, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
