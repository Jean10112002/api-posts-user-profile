import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Posts } from './entities/posts.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports:[UsersModule,TypeOrmModule.forFeature([Posts])],
  providers: [PostsService],
  controllers: [PostsController]
})
export class PostsModule {}
