import { Module } from '@nestjs/common';
import { BookModule } from './book/book.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://smokrenko79:admin@cluster0.ipgdy9m.mongodb.net/?retryWrites=true&w=majority',
    ),
    BookModule,
  ],
})
export class AppModule {}
