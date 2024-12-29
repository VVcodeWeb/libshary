import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { GoogleStrategy } from './strategies/google.strategy';
import { UserMapperService } from './mapper/user-mapper.service';

@Module({
  imports: [
    PrismaModule,
    JwtModule.register({
      secret: 'secret',
    }),
  ],
  providers: [AuthService, GoogleStrategy, UserMapperService],
  controllers: [AuthController],
})
export class AuthModule {}
