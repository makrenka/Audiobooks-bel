import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from './schemas/category.schema';
import { Model, ObjectId } from 'mongoose';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<Category>,
  ) {}

  async createCategory(dto: CreateCategoryDto): Promise<Category> {
    const category = await this.categoryModel.create({ ...dto });
    return category;
  }

  async getCategories(): Promise<Category[]> {
    const categories = await this.categoryModel.find();
    return categories;
  }

  async getOneCategory(id: ObjectId): Promise<Category> {
    const category = await this.categoryModel.findById(id);
    return category;
  }

  async deleteCategory(id: ObjectId): Promise<Category> {
    const category = await this.categoryModel.findByIdAndDelete(id);
    return category;
  }
}
