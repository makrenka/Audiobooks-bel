import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { ObjectId } from 'mongoose';
import { CreateReviewDto } from './dto/create-review.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { CreateSectionDto } from './dto/create-section.dto';
import { CreateCategoryDto } from './dto/create-category.dto';

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
  getAll(@Query('count') count: number, @Query('offset') offset: number) {
    return this.bookService.getAll(count, offset);
  }

  @Get('/search')
  search(@Query('query') query: string) {
    return this.bookService.search(query);
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

  @Post('/listen/:id')
  listen(@Param('id') id: ObjectId) {
    return this.bookService.listen(id);
  }

  @Post('/section')
  addSection(@Body() dto: CreateSectionDto) {
    return this.bookService.addSection(dto);
  }

  @Post('/category')
  addCategory(@Body() dto: CreateCategoryDto) {
    return this.bookService.addCategory(dto);
  }
}
