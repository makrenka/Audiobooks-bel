import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { ObjectId } from 'mongoose';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';
import { UnBanUserDto } from './dto/unban-user.dto';
import { AddBookUserDto } from './dto/add-book-user.dto';
import { AddCategoryUserDto } from './dto/add-category-user.dto';

@Controller('/users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/createrole')
  createRole(@Body() dto: CreateRoleDto) {
    return this.userService.createRole(dto);
  }

  @Post()
  createUser(@Body() dto: CreateUserDto) {
    return this.userService.createUser(dto);
  }

  @Get()
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Get(':id')
  getOneUser(@Param('id') id: ObjectId) {
    return this.userService.getOneUser(id);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: ObjectId) {
    return this.userService.deleteUser(id);
  }

  @Post('/addrole')
  addRole(@Body() dto: AddRoleDto) {
    return this.userService.addRole(dto);
  }

  @Post('/ban')
  ban(@Body() dto: BanUserDto) {
    return this.userService.ban(dto);
  }

  @Post('/unban')
  unBan(@Body() dto: UnBanUserDto) {
    return this.userService.unBan(dto);
  }

  @Post('/book')
  addBook(@Body() dto: AddBookUserDto) {
    return this.userService.addBook(dto);
  }

  @Post('/category')
  addCategory(@Body() dto: AddCategoryUserDto) {
    return this.userService.addCategory(dto);
  }
}
