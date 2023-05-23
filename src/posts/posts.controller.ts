import { Body, Controller, Get, Post } from '@nestjs/common';
import { PostsService } from './posts.service';
import { Posts } from './entities/posts.entity';
import { createPostDto } from './dto/posts.dto';

@Controller('posts')
export class PostsController {
    constructor(private postService:PostsService) {
    }
    @Post()
    createPost(@Body()post:createPostDto){
        return this.postService.createPost(post);
    }
    @Get()
    getPosts():Promise<Posts[]>{
        return this.postService.getPosts();
    }
}
