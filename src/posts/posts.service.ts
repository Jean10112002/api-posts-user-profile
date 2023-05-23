import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Posts } from './entities/posts.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { createPostDto } from './dto/posts.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Posts) private repositoryPosts: Repository<Posts>,
    private userService: UsersService,
  ) {}
  async createPost(post:createPostDto):Promise<Posts>{
    const userFound=await this.userService.getUser(post.authorId)
    if(!userFound) throw new HttpException('User not found',HttpStatus.NOT_FOUND);
    
    const newPost=this.repositoryPosts.create(post)
    return await this.repositoryPosts.save(newPost);

}
  getPosts():Promise<Posts[]>{
    return this.repositoryPosts.find({
        relations:['author']
    });
  }
}
