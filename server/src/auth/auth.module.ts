import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/user/schemas/user.schema';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { Role, RoleSchema } from 'src/user/schemas/role.schema';
import { Book, BookSchema } from 'src/book/schemas/book.schema';
import { Category, CategorySchema } from 'src/category/schemas/category.schema';
import { FileService } from 'src/file/file.service';
import { MailModule } from 'src/mail/mail.module';
import { GoogleStrategy } from './utils/GoogleStrategy';
import { SessionSerializer } from './utils/Serializer';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    UserService,
    FileService,
    GoogleStrategy,
    SessionSerializer,
    {
      provide: 'AUTH_SERVICE',
      useClass: AuthService,
    },
  ],
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Role.name, schema: RoleSchema }]),
    MongooseModule.forFeature([{ name: Book.name, schema: BookSchema }]),
    MongooseModule.forFeature([
      { name: Category.name, schema: CategorySchema },
    ]),
    JwtModule.register({
      secret: `${process.env.PRIVATE_KEY}`,
      // signOptions: {
      //   expiresIn: 5,
      // },
    }),
    MailModule,
  ],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
