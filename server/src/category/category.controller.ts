import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Roles } from 'src/auth/roles-auth.decorator';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoryService } from './category.service';
import { RolesGuard } from 'src/auth/roles.guard';
import { ObjectId } from 'mongoose';

@Controller('/categories')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post()
  createCategory(@Body() dto: CreateCategoryDto) {
    return this.categoryService.createCategory(dto);
  }

  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Delete(':id')
  deleteCategory(@Param('id') id: ObjectId) {
    return this.categoryService.deleteCategory(id);
  }

  @Get()
  getCategories() {
    return this.categoryService.getCategories();
  }

  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Get(':id')
  getOneCategory(@Param('id') id: ObjectId) {
    return this.categoryService.getOneCategory(id);
  }
}
