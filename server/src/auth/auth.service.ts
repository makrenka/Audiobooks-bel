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
import * as generator from 'generate-password';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

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
        'Карыстальнік з такім email ужо ёсьць',
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
    throw new UnauthorizedException({ message: 'Няправільны email ці пароль' });
  }

  async forgottenPassword(email: string) {
    const password = generator.generate({
      length: 6,
      numbers: true,
    });
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new UnauthorizedException({ message: 'Няправільны email' });
    }

    await this.mailService.sendMailForgottenPassword(
      email,
      user.name,
      password,
    );

    const hashPassword = await bcrypt.hash(password, 5);
    user.password = hashPassword;
    await user.save();
    return user;
  }
}
