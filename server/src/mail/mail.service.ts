import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private mailService: MailerService) {}

  async sendMailForgottenPassword(
    email: string,
    name: string,
    password: string,
  ) {
    await this.mailService.sendMail({
      to: email,
      subject: 'Аўдыёкнігі. Пароль для ўваходу',
      template: './forgottenPassword',
      context: {
        name: name,
        password,
      },
    });
  }
}
