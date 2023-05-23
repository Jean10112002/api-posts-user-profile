import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { createUserDto, updateUserDto } from './dto/user.dto';
import { DeleteResult, UpdateResult } from 'typeorm';
import { createProfileDto } from './dto/profile.dto';

@Controller('users')
export class UsersController {
  constructor(private userService:UsersService) {}

  @Get()
  getUsers():Promise<User[]>{
    return this.userService.getUsers();
  }
  @Get(':id')
  getUser(@Param('id',ParseIntPipe)id:number): Promise<User> {
    return this.userService.getUser(id);
  }

  @HttpCode(HttpStatus.OK)
  @Post()
  postUser(@Body() userDto:createUserDto):Promise<User>{
    return this.userService.postUser(userDto);
  }
   @Put(':id')
  editUser(@Param('id',ParseIntPipe) id:number,@Body() userDto:updateUserDto):Promise<updateUserDto>{
    return this.userService.editUser(id,userDto);
  }
  @Delete(':id')
  deleteUser(@Param('id',ParseIntPipe) id:number):Promise<User>{
    return this.userService.deleteUser(id);
  } 

  
  @HttpCode(HttpStatus.OK)
  @Post('create-profile/:id')
  creatProfile(@Param('id',ParseIntPipe)id:number,@Body() profileDto:createProfileDto):Promise<User>{
    return this.userService.createProfile(id,profileDto);
  }
}
