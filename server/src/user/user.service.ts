import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model, ObjectId } from 'mongoose';
import { Role } from './schemas/role.schema';
import { CreateRoleDto } from './dto/create-role.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';
import { UnBanUserDto } from './dto/unban-user.dto';
import { AddBookUserDto } from './dto/add-book-user.dto';
import { Book } from 'src/book/schemas/book.schema';
import { AddCategoryUserDto } from './dto/add-category-user.dto';
import { Category } from 'src/book/schemas/category.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Role.name) private roleModel: Model<Role>,
    @InjectModel(Book.name) private bookModel: Model<Book>,
    @InjectModel(Category.name) private categoryModel: Model<Category>,
  ) {}

  async createRole(dto: CreateRoleDto): Promise<Role> {
    const role = await this.roleModel.create({ ...dto });
    return role;
  }

  async createUser(dto: CreateUserDto): Promise<User> {
    const user = await this.userModel.create({ ...dto });
    const role = await this.roleModel.findOne({ value: 'USER' });
    user.roles.push(role);
    await user.save();
    return user;
  }

  async getAllUsers(): Promise<User[]> {
    const users = await this.userModel.find().populate('roles');
    return users;
  }

  async getOneUser(id: ObjectId): Promise<User> {
    const user = await this.userModel
      .findById(id)
      .populate('roles')
      .populate('categories');
    return user;
  }

  async getUserByEmail(email: string): Promise<User> {
    const user = await this.userModel.findOne({ email }).populate('roles');
    return user;
  }

  async deleteUser(id: ObjectId): Promise<User> {
    const user = await this.userModel.findByIdAndDelete(id);
    return user;
  }

  async addRole(dto: AddRoleDto): Promise<User> {
    const user = await this.userModel.findById(dto.userId);
    const role = await this.roleModel.findOne({ value: dto.value });
    if (role && user) {
      user.roles.push(role);
      await user.save();
      return user;
    }
    throw new HttpException(
      'Пользователь или роль не найдены',
      HttpStatus.NOT_FOUND,
    );
  }

  async ban(dto: BanUserDto): Promise<User> {
    const user = await this.userModel.findById(dto.userId);
    if (!user) {
      throw new HttpException('User is not found', HttpStatus.NOT_FOUND);
    }
    user.banned = true;
    user.banReason = dto.banReason;
    await user.save();
    return user;
  }

  async unBan(dto: UnBanUserDto): Promise<User> {
    const user = await this.userModel.findById(dto.userId);
    if (!user) {
      throw new HttpException('User is not found', HttpStatus.NOT_FOUND);
    }
    user.banned = false;
    user.banReason = '';
    await user.save();
    return user;
  }

  async addBook(dto: AddBookUserDto): Promise<User> {
    const user = await this.userModel.findById(dto.userId);
    const book = await this.bookModel.findById(dto.bookId);
    user.books.push(book);
    await user.save();
    return user;
  }

  async addCategory(dto: AddCategoryUserDto): Promise<User> {
    const user = await this.userModel.findById(dto.userId);
    user.categories = [];
    await dto.categories.forEach((_, index) => {
      const category = dto.categories.map((item) =>
        this.categoryModel.findOne({ name: item }),
      )[index];
      user.categories.push(category);
    });
    // for (let i = 0; i < dto.categories.length; i++) {
    //   const category = await dto.categories.map((item) =>
    //     this.categoryModel.findOne({ name: item }),
    //   )[i];
    //   user.categories.push(category);
    // }
    await user.save();
    return user;
  }
}
