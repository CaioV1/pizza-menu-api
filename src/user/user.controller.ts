import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import CreateUserDto from './dto/create-user.dto';
import UpdateUserDto from './dto/update-user.dto';

import { User } from './schemas/user.schema';
import { UserService } from './user.service';
import { UserToResponse } from './interfaces/user.interface';
import { Public } from 'src/auth/constants';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @Public()
  insertOne(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.insertOne(createUserDto);
  }

  @Get()
  findAll(): Promise<Array<UserToResponse>> {
    return this.userService.findAll();
  }

  @Patch()
  updateOne(@Body() updateUserDto: UpdateUserDto): Promise<UserToResponse> {
    return this.userService.updateOne(updateUserDto);
  }

  @Delete(':id')
  async deleteOne(@Param('id') id: string): Promise<string> {
    await this.userService.deleteOne(id);
    return `${id} foi removido com sucesso`;
  }
}
