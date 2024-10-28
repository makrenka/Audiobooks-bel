import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  Res,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { ForgottenPasswordDto } from './dto/forgotten-password.dto';
import { GoogleAuthGuard } from './utils/Guards';

@Controller('/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UsePipes(ValidationPipe)
  @Post('/login')
  login(@Body() dto: CreateUserDto) {
    return this.authService.login(dto);
  }

  @UsePipes(ValidationPipe)
  @Post('/registration')
  registration(@Body() dto: CreateUserDto) {
    return this.authService.registration(dto);
  }

  @Post('/forgotten-password')
  forgottenPassword(@Body() dto: ForgottenPasswordDto) {
    return this.authService.forgottenPassword(dto);
  }

  @Get('/google/login/:role')
  @UseGuards(GoogleAuthGuard)
  googleLogin() {
    return { msg: 'Google authentication' };
  }

  @Get('/google/redirect')
  @UseGuards(GoogleAuthGuard)
  async googleRedirect(@Res() response: any, @Req() request: any) {
    const user = await this.authService.googleLogin(request.user);
    return response.redirect(
      `${process.env.GOOGLE_AUTH_REDIRECT}/${user.access_token}`,
    );
  }

  @Get('/google/user')
  googleUser(@Req() request: any) {
    return this.authService.googleLogin(request.user);
  }
}
