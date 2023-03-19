import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserEntity } from './user.entity';

import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PostEntity } from '../post/post.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, PostEntity])],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
