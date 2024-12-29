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
import { UserMapperService } from './mapper/user-mapper.service';
import { GoogleOauthGuard } from './guards/google.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userMapperService: UserMapperService,
  ) {}

  @Get('google')
  @UseGuards(GoogleOauthGuard)
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async auth() {}

  @Get('google/redirect')
  @UseGuards(GoogleOauthGuard)
  async googleAuthCallback(@Req() req, @Res() res: Response) {
    console.log('Redirected from google');
    console.log(req.user);
    const user = this.userMapperService.googleUserToUserDto(req.user);
    const token = this.authService.login(user);
    res.cookie('shelves_access_token', token, {
      maxAge: 2592000000,
      sameSite: true,
      secure: false,
      httpOnly: true,
    });

    return res.status(HttpStatus.OK);
  }
}
