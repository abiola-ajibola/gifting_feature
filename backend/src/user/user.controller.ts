import bcrypt from 'bcrypt';
import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { Post, Put, Delete, Param, Body } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dtos/user.dto';

const saltRounds = 10;

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getAllUsers() {
    return this.userService.findAll();
  }
  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    const hash = await bcrypt.hash(createUserDto.password, saltRounds);
    return this.userService.create({ ...createUserDto, password: hash });
  }

  @Get(':id')
  getUserById(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Put(':id')
  updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
