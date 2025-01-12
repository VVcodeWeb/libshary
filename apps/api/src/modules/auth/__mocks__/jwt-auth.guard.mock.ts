import { JwtAuthGuard } from '../guards/jwt.guard';

export const JwtAuthGuardMock = {
  canActivate(ctx) {
    const request = ctx.switchToHttp().getRequest();
    request.user = {
      id: '123',
      email: 'testemail@mail.com',
    };
    return true;
  },
} as JwtAuthGuard;
