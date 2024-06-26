import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
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
import { Category } from 'src/category/schemas/category.schema';
import { FileService, FileType } from 'src/file/file.service';
import { AddPhotoDto } from './dto/add-photo.dto';
import { ChangeNameDto } from './dto/change-name.dto';
import { ChangeEmailDto } from './dto/change-email.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Role.name) private roleModel: Model<Role>,
    @InjectModel(Book.name) private bookModel: Model<Book>,
    @InjectModel(Category.name) private categoryModel: Model<Category>,
    private fileService: FileService,
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

  async addPhoto(dto: AddPhotoDto, img): Promise<User> {
    const imgPath = this.fileService.createFile(FileType.IMAGE, img);
    const user = await this.userModel.findById(dto.userId);
    if (!user) {
      throw new HttpException('User is not found', HttpStatus.NOT_FOUND);
    }
    user.img = imgPath;
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
    for (const item of dto.categories) {
      const category = await this.categoryModel.findOne({ name: item });
      user.categories.push(category);
    }
    await user.save();
    return user;
  }

  async changeName(dto: ChangeNameDto): Promise<User> {
    const user = await this.userModel.findById(dto.userId);
    user.name = dto.name;
    await user.save();
    return user;
  }

  async changeEmail(dto: ChangeEmailDto): Promise<User> {
    const user = await this.userModel.findById(dto.userId);
    user.email = dto.email;
    await user.save();
    return user;
  }

  async changePassword(dto: ChangePasswordDto): Promise<User> {
    const user = await this.userModel.findById(dto.userId);
    const oldPasswordEquals = await bcrypt.compare(
      dto.oldPassword,
      user.password,
    );
    const hashPassword = await bcrypt.hash(dto.newPassword, 5);
    if (!oldPasswordEquals) {
      throw new UnauthorizedException({ message: 'Uncorrect old password' });
    }
    if (dto.newPassword !== dto.newPasswordRepeat) {
      throw new HttpException(
        'Uncorrect repeat new password',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (dto.oldPassword === dto.newPassword) {
      throw new HttpException(
        'New password equals old password',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (
      oldPasswordEquals &&
      dto.newPassword === dto.newPasswordRepeat &&
      dto.oldPassword !== dto.newPassword
    ) {
      user.password = hashPassword;
    }
    await user.save();
    return user;
  }
}
