import {
  Controller,
  Get,
  HttpStatus,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { GoogleOauthGuard } from './guards/google.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('google')
  @UseGuards(GoogleOauthGuard)
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async auth() {}

  @Get('google/redirect')
  @UseGuards(GoogleOauthGuard)
  async googleAuthCallback(@Req() req, @Res() res: Response) {
    const token = await this.authService.googleLogin(req.user);
    res.cookie('auth_token', token.access_token, {
      maxAge: 2592000000,
      sameSite: true,
      secure: false,
      httpOnly: true,
    });

    return res.status(HttpStatus.OK);
  }
}
