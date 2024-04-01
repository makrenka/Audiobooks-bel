import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ForgottenPasswordDto } from 'src/auth/dto/forgotten-password.dto';
import { User } from 'src/user/schemas/user.schema';

@Injectable()
export class MailService {
  constructor(private mailService: MailerService) {}

  async sendMailForgottenPassword(dto: ForgottenPasswordDto, password: string) {
    await this.mailService.sendMail({
      to: dto.email,
      subject: 'Аўдыёкнігі. Пароль для ўваходу',
      template: './forgottenPassword',
      context: {
        name: dto.name,
        password,
      },
    });
  }
}
