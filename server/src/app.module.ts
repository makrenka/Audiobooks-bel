import { Module } from '@nestjs/common';
import { BookModule } from './book/book.module';
import { MongooseModule } from '@nestjs/mongoose';
import { FileModule } from './file/file.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://smokrenko79:admin@cluster0.ipgdy9m.mongodb.net/?retryWrites=true&w=majority',
    ),
    BookModule,
    FileModule,
  ],
})
export class AppModule {}
