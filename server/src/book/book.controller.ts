import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { ObjectId } from 'mongoose';
import { CreateReviewDto } from './dto/create-review.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@Controller('/books')
export class BookController {
  constructor(private bookService: BookService) {}

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'cover', maxCount: 1 },
      { name: 'audio', maxCount: 1 },
    ]),
  )
  create(@UploadedFiles() files, @Body() dto: CreateBookDto) {
    const { cover, audio } = files;
    return this.bookService.create(dto, cover[0], audio[0]);
  }

  @Get()
  getAll() {
    return this.bookService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: ObjectId) {
    return this.bookService.getOne(id);
  }

  @Delete(':id')
  delete(@Param('id') id: ObjectId) {
    return this.bookService.delete(id);
  }

  @Post('/review')
  addReview(@Body() dto: CreateReviewDto) {
    return this.bookService.addReview(dto);
  }
}
