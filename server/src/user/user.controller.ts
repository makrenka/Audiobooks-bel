import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { ObjectId } from 'mongoose';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';
import { UnBanUserDto } from './dto/unban-user.dto';
import { AddBookUserDto } from './dto/add-book-user.dto';
import { AddCategoryUserDto } from './dto/add-category-user.dto';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ValidationPipe } from 'src/pipes/validation.pipe';

@Controller('/users')
export class UserController {
  constructor(private userService: UserService) {}

  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post('/createrole')
  createRole(@Body() dto: CreateRoleDto) {
    return this.userService.createRole(dto);
  }

  @UsePipes(ValidationPipe)
  @Post()
  createUser(@Body() dto: CreateUserDto) {
    return this.userService.createUser(dto);
  }

  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Get()
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Get(':id')
  getOneUser(@Param('id') id: ObjectId) {
    return this.userService.getOneUser(id);
  }

  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Delete(':id')
  deleteUser(@Param('id') id: ObjectId) {
    return this.userService.deleteUser(id);
  }

  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post('/addrole')
  addRole(@Body() dto: AddRoleDto) {
    return this.userService.addRole(dto);
  }

  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post('/ban')
  ban(@Body() dto: BanUserDto) {
    return this.userService.ban(dto);
  }

  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post('/unban')
  unBan(@Body() dto: UnBanUserDto) {
    return this.userService.unBan(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/book')
  addBook(@Body() dto: AddBookUserDto) {
    return this.userService.addBook(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/category')
  addCategory(@Body() dto: AddCategoryUserDto) {
    return this.userService.addCategory(dto);
  }
}
