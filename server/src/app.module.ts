import { Module } from '@nestjs/common';
import { BookModule } from './book/book.module';
import { MongooseModule } from '@nestjs/mongoose';
import { FileModule } from './file/file.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { SectionModule } from './section/section.module';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, 'static'),
    }),
    MongooseModule.forRoot(
      'mongodb+srv://smokrenko79:admin@cluster0.ipgdy9m.mongodb.net/?retryWrites=true&w=majority',
    ),
    BookModule,
    FileModule,
    UserModule,
    AuthModule,
    CategoryModule,
    SectionModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PassportModule.register({ session: true }),
  ],
})
export class AppModule {}
