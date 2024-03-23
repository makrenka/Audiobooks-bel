import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { ObjectId } from 'mongoose';
import { CreateReviewDto } from './dto/create-review.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { CreateSectionDto } from './dto/create-section.dto';
import { AddCategoryBookDto } from './dto/add-category-book.dto';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateCategoryDto } from './dto/create-category.dto';

@Controller('/books')
export class BookController {
  constructor(private bookService: BookService) {}

  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'cover', maxCount: 1 },
      { name: 'audio', maxCount: 1 },
      { name: 'coverBigSize', maxCount: 1 },
    ]),
  )
  create(@UploadedFiles() files, @Body() dto: CreateBookDto) {
    const { cover, audio, coverBigSize } = files;
    return this.bookService.create(dto, cover[0], audio[0], coverBigSize[0]);
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

  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Delete(':id')
  delete(@Param('id') id: ObjectId) {
    return this.bookService.delete(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/review')
  addReview(@Body() dto: CreateReviewDto) {
    return this.bookService.addReview(dto);
  }

  @Post('/listen/:id')
  listen(@Param('id') id: ObjectId) {
    return this.bookService.listen(id);
  }

  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post('/section')
  addSection(@Body() dto: CreateSectionDto) {
    return this.bookService.addSection(dto);
  }

  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post('/category')
  createCategory(@Body() dto: CreateCategoryDto) {
    return this.bookService.createCategory(dto);
  }

  // @Roles('ADMIN')
  // @UseGuards(RolesGuard)
  // @Post('/category')
  // addCategoryBook(@Body() dto: AddCategoryBookDto) {
  //   return this.bookService.addCategoryBook(dto);
  // }

  @Delete('/category/:id')
  deleteCategory(@Param('id') id: ObjectId) {
    return this.bookService.deleteCategory(id);
  }

  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Get('/categories')
  getCategories() {
    return this.bookService.getCategories();
  }

  @Get('/category/:id')
  getOneCategoty(@Param('id') id: ObjectId) {
    return this.bookService.getOneCategory(id);
  }
}
