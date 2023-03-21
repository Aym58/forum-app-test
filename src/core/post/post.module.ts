import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PostEntity } from './post.entity';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { UserService } from '../user/user.service';
import { UserEntity } from '../user/user.entity';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [TypeOrmModule.forFeature([PostEntity, UserEntity]), HttpModule],
  providers: [PostService, UserService],
  controllers: [PostController],
})
export class PostModule {}
