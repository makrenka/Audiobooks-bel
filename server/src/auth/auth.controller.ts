import {
  Body,
  Controller,
  Get,
  Post,
  Req,
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

  @Get('/google/login')
  @UseGuards(GoogleAuthGuard)
  googleLogin() {
    return { msg: 'Google authentication' };
  }

  @Get('/google/redirect')
  @UseGuards(GoogleAuthGuard)
  googleRedirect() {
    // return response.redirect(process.env.ROUTE_TO_FE);
    return { msg: 'OK' };
  }

  @Get('/google/user')
  googleUser(@Req() request: any) {
    console.log('/google/user');
    console.log(request.user);
    if (request.user) {
      return { msg: 'Authenticated' };
    } else {
      return { msg: 'Not Authenticated' };
    }
    // return this.authService.googleLogin(request.user);
  }
}
