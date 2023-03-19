import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { PostEntity } from './post.entity';
import { CreatePostDto } from './dto/post.dto';
import { UserService } from '../user/user.service';
import { PaginationDto } from '../common/dto/pagination.dto';
import { Repository } from 'typeorm';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private postRepository: Repository<PostEntity>,
    private readonly userService: UserService,
  ) {}

  async createPost(createPostDto: CreatePostDto): Promise<PostEntity> {
    const { name, email, text } = createPostDto;

    const existingUser = await this.userService.getUserByEmail(email);

    const user =
      existingUser || (await this.userService.createUser({ name, email }));

    const post = new PostEntity();
    post.text = text;
    post.user = user;

    await post.save();
    return post;
  }

  async getAllPosts(pagination: PaginationDto): Promise<PostEntity[]> {
    try {
      const { page, limit } = pagination;
      const take = limit;
      const skip = (page - 1) * limit;
      const postList = await this.postRepository
        .createQueryBuilder('post')
        .addOrderBy('post.id', 'ASC')
        .leftJoin('post.user', 'user')
        .skip(skip)
        .take(take)
        .select(['post.id', 'post.text', 'post.createdAt', 'user.name'])
        .getMany();

      return postList;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async deletePost(post: PostEntity): Promise<void> {
    try {
      await post.remove();
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
