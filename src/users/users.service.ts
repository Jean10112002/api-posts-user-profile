import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { createUserDto, updateUserDto } from './dto/user.dto';
import { createProfileDto } from './dto/profile.dto';
import { Profile } from './entities/profile.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Profile)
    private profilesRepository: Repository<Profile>,
  ) {}
  getUsers(): Promise<User[]> {
    return this.usersRepository.find({relations:['posts','profile']});
  }
  async getUser(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id },relations:['posts','profile'] });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }
  async postUser(userDto: createUserDto): Promise<User> {
    const userFound = await this.usersRepository.findOne({
      where: { userName: userDto.userName },
    });
    if (userFound) {
      throw new HttpException('Usuario ya existe', HttpStatus.CONFLICT);
    }
    const user = this.usersRepository.create(userDto);
    return this.usersRepository.save(user);
  }
  async editUser(id: number, userDto: updateUserDto): Promise<updateUserDto> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new Error(`User with ID ${id} not found`);
    }
    const updateUser=Object.assign(user, userDto);
    return await this.usersRepository.save(updateUser);
  }
  async deleteUser(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new Error(`User with ID ${id} not found`);
    }
    return this.usersRepository.remove(user);
  }

  async createProfile(userId:number,profile:createProfileDto):Promise<User>{
    const user = await this.usersRepository.findOne({where:{id:userId}});
    if(!user){
      throw new HttpException(`User with ID ${userId} not found`,HttpStatus.NOT_FOUND);
    }
   const newProfile=this.profilesRepository.create(profile);
   const savedProfile= await this.profilesRepository.save(newProfile);
   user.profile=savedProfile;
    return await this.usersRepository.save(user);
  }
}
