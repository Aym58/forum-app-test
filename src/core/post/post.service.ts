import {
  Injectable,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PostEntity } from './post.entity';
import { CreatePostDto } from './dto/post.dto';
import { UserService } from '../user/user.service';
import { PaginationDto } from '../common/dto/pagination.dto';
import { SortingDto } from '../common/dto/sorting.dto copy';
import { SortValues } from '../common/enum/sort.enum';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private postRepository: Repository<PostEntity>,
    private readonly userService: UserService,
  ) {}

  async createPost(createPostDto: CreatePostDto): Promise<PostEntity> {
    const { name, email, text, parentId, homePage } = createPostDto;

    const regex =
      /^(?:[^<]+|<([ai]|code|strong)(\s[a-z]+="[^"]*")*\s*(?:\/>|>[^<>]*<\/\1>))*$/g;

    if (!regex.test(text)) {
      throw new BadRequestException('Tags error');
    }

    const existingUser = await this.userService.getUserByEmail(email);
    const user =
      existingUser || (await this.userService.createUser({ name, email }));

    const post = new PostEntity();
    post.text = text;
    post.user = user;
    parentId && (post.parentId = parentId);
    homePage && (post.homePage = homePage);
    await post.save();

    if (parentId) {
      const parentPost = await this.postRepository.findOne({
        where: { id: parentId },
      });
      if (!parentPost) {
        throw new BadRequestException('Post not found');
      }

      if (!parentPost.replyIds) parentPost.replyIds = [];
      parentPost.replyIds.push(post.id);

      await parentPost.save();
    }

    return post;
  }

  async getPostList(
    pagination: PaginationDto,
    sorting: SortingDto,
  ): Promise<PostEntity[]> {
    console.log(sorting);
    try {
      const { page, limit } = pagination;
      const take = limit;
      const skip = (page - 1) * limit;

      const { sort, order } = sorting;

      const postList = await this.postRepository
        .createQueryBuilder('post')
        .leftJoin('post.user', 'user')
        .addOrderBy(
          sort === SortValues.DATE ? 'post.createdAt' : `user.${sort}`,
          order,
        )
        .where('post.parentId IS NULL')
        .skip(skip)
        .take(take)
        .select([
          'post.id',
          'post.text',
          'post.createdAt',
          'post.replyIds',
          'user.name',
        ])
        .getMany();

      return postList;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async getReplies(
    post: PostEntity,
    pagination: PaginationDto,
  ): Promise<PostEntity[]> {
    try {
      const { page, limit } = pagination;
      const { replyIds } = post;
      const take = limit;
      const skip = (page - 1) * limit;

      const repliesList = await this.postRepository
        .createQueryBuilder('post')
        .leftJoin('post.user', 'user')
        .addOrderBy('post.createdAt', 'DESC')
        .where('post.parentId IS NOT NULL')
        .andWhere('post.id IN (:...ids)', { ids: replyIds })
        .skip(skip)
        .take(take)
        .select([
          'post.id',
          'post.text',
          'post.createdAt',
          'post.replyIds',
          'user.name',
        ])
        .getMany();

      return repliesList;
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
