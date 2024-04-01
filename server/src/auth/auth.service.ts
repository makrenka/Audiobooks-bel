import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User } from 'src/user/schemas/user.schema';
import { MailService } from 'src/mail/mail.service';
import generator from 'generate-password';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ForgottenPasswordDto } from './dto/forgotten-password.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private mailService: MailService,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async login(dto: CreateUserDto) {
    const user = await this.validateUser(dto);
    return this.generateToken(user);
  }

  async registration(dto: CreateUserDto) {
    const candidate = await this.userService.getUserByEmail(dto.email);
    if (candidate) {
      throw new HttpException(
        'There is user with this email',
        HttpStatus.BAD_REQUEST,
      );
    }
    const hashPassword = await bcrypt.hash(dto.password, 5);
    const user = await this.userService.createUser({
      ...dto,
      password: hashPassword,
    });
    return this.generateToken(user);
  }

  private async generateToken(user: any) {
    const payload = {
      email: user.email,
      id: user.id,
      roles: user.roles,
      name: user.name,
    };
    return { token: this.jwtService.sign(payload) };
  }

  private async validateUser(dto: CreateUserDto) {
    const user = await this.userService.getUserByEmail(dto.email);
    const passwordEquals = await bcrypt.compare(dto.password, user.password);
    if (user && passwordEquals) {
      return user;
    }
    throw new UnauthorizedException({ message: 'Uncorrect email or password' });
  }

  async forgottenPassword(dto: ForgottenPasswordDto) {
    const password = generator.generate({
      length: 6,
      numbers: true,
    });

    await this.mailService.sendMailForgottenPassword(dto, password);

    const user = await this.userModel.findById(dto.userId);
    const hashPassword = await bcrypt.hash(password, 5);
    user.password = hashPassword;
    await user.save();
    return user;
  }
}
